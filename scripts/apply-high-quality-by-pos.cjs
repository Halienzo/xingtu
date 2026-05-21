const fs = require('fs');

// ========== 加载所有批次（支持新旧格式）==========
function loadBatch(filename) {
  try {
    const mod = require(filename);
    return mod.HQ_EXAMPLES || mod.highQualityExamples || {};
  } catch (e) {
    console.log('  [跳过] ' + filename + ' - ' + e.message);
    return {};
  }
}

const batches = [];
for (let i = 1; i <= 20; i++) {
  const b = loadBatch('./high-quality-examples-batch' + i + '.cjs');
  if (Object.keys(b).length > 0) batches.push(b);
}

// 合并所有批次（后面的覆盖前面的）
const HQ_EXAMPLES = {};
for (const batch of batches) {
  for (const [word, data] of Object.entries(batch)) {
    const key = word.toLowerCase().trim();
    if (Array.isArray(data)) {
      // 旧格式：单性词数组
      HQ_EXAMPLES[key] = data;
    } else if (typeof data === 'object' && data !== null) {
      // 新格式：按词性分组的对象
      if (!HQ_EXAMPLES[key] || Array.isArray(HQ_EXAMPLES[key])) {
        HQ_EXAMPLES[key] = {};
      }
      for (const [pos, examples] of Object.entries(data)) {
        if (Array.isArray(examples)) {
          HQ_EXAMPLES[key][pos] = examples;
        }
      }
    }
  }
}

console.log('Loaded ' + batches.length + ' batches, ' + Object.keys(HQ_EXAMPLES).length + ' unique words.');

// ========== POS 解析 ==========
function parsePos(posStr) {
  if (!posStr || posStr === 'unknown') return ['unknown'];
  const s = posStr.toLowerCase();
  const parts = s.split(/[\/\.\,\s]+/).filter(p => p.length > 0);
  const result = [];
  for (const p of parts) {
    if (p === 'n') result.push('noun');
    else if (p === 'v') result.push('verb');
    else if (p === 'adj') result.push('adj');
    else if (p === 'adv') result.push('adv');
    else if (p === 'prep') result.push('prep');
    else if (p === 'pron') result.push('pron');
    else if (p === 'conj') result.push('conj');
    else if (p === 'int') result.push('int');
    else if (p === 'art') result.push('art');
    else if (p === 'num') result.push('num');
  }
  return result.length > 0 ? [...new Set(result)] : ['unknown'];
}

// ========== 加载数据 ==========
console.log('Loading calendarData.json...');
const data = JSON.parse(fs.readFileSync('../src/data/calendarData.json', 'utf8'));

let fixCount = 0;
let posMatchCount = 0;
let fallbackCount = 0;
const wordPosStats = {};

// 9a/9b 保留手写基线
const keys = Object.keys(data).sort().filter(k => k !== '9a' && k !== '9b');
const wordUsageCounters = {};

for (const key of keys) {
  const sem = data[key];
  for (let dayIdx = 0; dayIdx < sem.days.length; dayIdx++) {
    const day = sem.days[dayIdx];
    for (let wordIdx = 0; wordIdx < day.words.length; wordIdx++) {
      const w = day.words[wordIdx];
      if (!w.posDetails) continue;

      const wordKey = w.word.toLowerCase().trim();
      const examples = HQ_EXAMPLES[wordKey];
      if (!examples) continue;

      if (!wordUsageCounters[wordKey]) wordUsageCounters[wordKey] = {};

      for (const pd of w.posDetails) {
        const posStr = pd.pos || 'unknown';
        const poses = parsePos(posStr);

        let selectedExamples;
        let matchType = 'fallback';

        if (Array.isArray(examples)) {
          // 旧格式：单性词，直接用这个数组
          selectedExamples = examples;
          matchType = 'legacy';
        } else {
          // 新格式：按词性匹配
          for (const pos of poses) {
            if (examples[pos] && examples[pos].length > 0) {
              selectedExamples = examples[pos];
              matchType = 'pos-match';
              posMatchCount++;
              break;
            }
          }
          // 回退：用 default 或第一个可用词性
          if (!selectedExamples) {
            selectedExamples = examples.default || Object.values(examples).find(v => Array.isArray(v) && v.length > 0);
            fallbackCount++;
          }
        }

        if (!selectedExamples || selectedExamples.length === 0) continue;

        // 按词性分别计数，保证同一词的不同词性在不同日子能轮换
        const posKey = poses.join('-');
        if (!wordUsageCounters[wordKey][posKey]) wordUsageCounters[wordKey][posKey] = 0;
        const idx = wordUsageCounters[wordKey][posKey] % selectedExamples.length;
        wordUsageCounters[wordKey][posKey]++;

        const ex = selectedExamples[idx];
        pd.example = ex.en;
        pd.exampleCn = ex.cn;
        fixCount++;

        // 统计
        if (!wordPosStats[wordKey]) wordPosStats[wordKey] = {};
        wordPosStats[wordKey][posStr] = (wordPosStats[wordKey][posStr] || 0) + 1;
      }
    }
  }
}

console.log(`\nApplied high-quality examples to ${fixCount} entries.`);
console.log(`  - POS-matched: ${posMatchCount}`);
console.log(`  - Fallback/legacy: ${fallbackCount}`);
console.log(`Total words covered: ${Object.keys(wordUsageCounters).length}`);

// 输出多性词的覆盖情况
console.log('\n=== Multi-POS word coverage ===');
for (const [word, stats] of Object.entries(wordPosStats)) {
  const poses = Object.keys(stats);
  if (poses.length > 1) {
    console.log(word.padEnd(18) + ' -> ' + poses.map(p => p + '(' + stats[p] + ')').join(', '));
  }
}

console.log('\nWriting back to calendarData.json...');
fs.writeFileSync('../src/data/calendarData.json', JSON.stringify(data));
console.log('Done.');
