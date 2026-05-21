const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../src/data/calendarData.json');
const raw = fs.readFileSync(dataPath, 'utf-8');
const data = JSON.parse(raw);

// ===== 1. SCAN ALL PRONOUN ISSUES =====
console.log('=== 扫描代词问题 ===\n');

const pronounWords = ['I','me','my','mine','myself','you','your','yours','yourself','yourselves',
  'he','him','his','himself','she','her','hers','herself','it','its','itself',
  'we','us','our','ours','ourselves','they','them','their','theirs','themselves',
  'who','whom','whose','what','which','this','that','these','those'];

const issues = [];

for (const [semesterKey, semester] of Object.entries(data)) {
  for (const day of semester.days || []) {
    for (const w of day.words || []) {
      const word = w.word.toLowerCase();
      if (pronounWords.includes(word)) {
        // Check for known bad patterns
        const meaningStr = (w.meanings || []).join('; ');
        const pos = w.pos || '';
        
        let issue = null;
        
        if (word === 'we' && meaningStr.includes('宾语是')) {
          issue = `meaning含"宾语是": "${meaningStr}"`;
        } else if (word === 'we' && meaningStr.includes('）')) {
          issue = `meaning含非法字符"）": "${meaningStr}"`;
        } else if (word === 'we' && pos === 'v.') {
          issue = `pos错误为"v.": meaning="${meaningStr}"`;
        } else if (word === 'us' && meaningStr === '美国') {
          issue = `us被当作"美国": meaning="${meaningStr}"`;
        } else if (word === 'mine' && meaningStr.includes('矿')) {
          issue = `mine含矿藏义: meaning="${meaningStr}"`;
        } else if (meaningStr === '他(她' || meaningStr.startsWith('他(她')) {
          issue = `meaning截断: "${meaningStr}"`;
        } else if (meaningStr === '他' && ['them','themselves'].includes(word)) {
          issue = `meaning截断为"他": "${meaningStr}"`;
        } else if (meaningStr.includes('主格)') || meaningStr.includes('主格)')) {
          issue = `meaning含"主格)": "${meaningStr}"`;
        } else if (meaningStr.includes('宾格 )') || meaningStr.includes('的宾格')) {
          issue = `meaning含"宾格"格式错误: "${meaningStr}"`;
        } else if (meaningStr === '他（她' || meaningStr.startsWith('他（她') || meaningStr.startsWith('他(她')) {
          issue = `meaning截断含"他（她": "${meaningStr}"`;
        }
        
        if (issue) {
          issues.push({ semester: semesterKey, day: day.day, word: w.word, pos, meaningStr, issue });
        }
      }
    }
  }
}

console.log(`发现 ${issues.length} 个问题条目:\n`);
issues.slice(0, 30).forEach(i => {
  console.log(`  ${i.semester} day${i.day} | ${i.word} [${i.pos}] | ${i.issue}`);
});
if (issues.length > 30) console.log(`  ... 还有 ${issues.length - 30} 个`);

// ===== 2. FIX ALL ISSUES =====
console.log('\n=== 开始修复 ===\n');

let fixCount = 0;
let usAdded = 0;

const fixes = {
  'we': {
    badMeanings: ['我们主格; 宾语是', '我们主格; 宾格是us'],
    fix: (w) => {
      if (w.meanings?.some(m => m.includes('宾语是') || m.includes('宾格'))) {
        w.meanings = ['我们'];
        if (w.posDetails?.[0]) {
          w.posDetails[0].meaning = '我们';
          w.posDetails[0].pos = 'pron.';
        }
        w.pos = 'pron.';
        return true;
      }
      if (w.pos === 'v.') {
        w.pos = 'pron.';
        w.meanings = ['我们'];
        if (w.posDetails?.[0]) {
          w.posDetails[0].pos = 'pron.';
          w.posDetails[0].meaning = '我们';
        }
        return true;
      }
      if (w.meanings?.some(m => m.includes('）'))) {
        w.meanings = ['我们'];
        if (w.posDetails?.[0]) w.posDetails[0].meaning = '我们';
        return true;
      }
      return false;
    }
  },
  'us': {
    fix: (w) => {
      if (w.meanings?.[0] === '美国') {
        // Keep US=美国, but check if lowercase "us" exists
        return false;
      }
      return false;
    }
  },
  'mine': {
    fix: (w) => {
      if (w.meanings?.some(m => m.includes('矿'))) {
        // Keep existing meanings but add pronoun meaning if not present
        if (!w.meanings.some(m => m === '我的' || m.includes('我的'))) {
          w.meanings.push('我的（东西）');
          if (w.posDetails?.[0]) {
            w.posDetails[0].meaning = w.meanings.join('；');
          }
          return true;
        }
      }
      return false;
    }
  },
  'their': {
    fix: (w) => {
      if (w.meanings?.some(m => m === '他(她' || m.startsWith('他(她') || m.startsWith('他（她'))) {
        w.meanings = ['他（她/它）们的'];
        if (w.posDetails?.[0]) w.posDetails[0].meaning = '他（她/它）们的';
        return true;
      }
      return false;
    }
  },
  'theirs': {
    fix: (w) => {
      if (w.meanings?.some(m => m === '他（她' || m.startsWith('他（她') || m.startsWith('他(她'))) {
        w.meanings = ['他（她/它）们的（所有物）'];
        if (w.posDetails?.[0]) w.posDetails[0].meaning = '他（她/它）们的（所有物）';
        return true;
      }
      return false;
    }
  },
  'them': {
    fix: (w) => {
      if (w.meanings?.[0] === '他' || w.meanings?.[0]?.startsWith('他')) {
        w.meanings = ['他（她/它）们（宾格）'];
        if (w.posDetails?.[0]) w.posDetails[0].meaning = '他（她/它）们（宾格）';
        return true;
      }
      return false;
    }
  },
  'themselves': {
    fix: (w) => {
      if (w.meanings?.[0] === '他' || w.meanings?.[0]?.startsWith('他')) {
        w.meanings = ['他（她/它）们自己'];
        if (w.posDetails?.[0]) w.posDetails[0].meaning = '他（她/它）们自己';
        return true;
      }
      return false;
    }
  },
  'whom': {
    fix: (w) => {
      if (w.meanings?.some(m => m.includes('宾格') || m.includes('的宾格'))) {
        w.meanings = ['谁（宾格）'];
        if (w.posDetails?.[0]) w.posDetails[0].meaning = '谁（宾格）';
        return true;
      }
      return false;
    }
  },
  'they': {
    fix: (w) => {
      if (w.meanings?.some(m => m.includes('主格)'))) {
        w.meanings = ['他（她/它）们'];
        if (w.posDetails?.[0]) w.posDetails[0].meaning = '他（她/它）们';
        return true;
      }
      return false;
    }
  }
};

for (const [semesterKey, semester] of Object.entries(data)) {
  for (const day of semester.days || []) {
    for (const w of day.words || []) {
      const word = w.word.toLowerCase();
      if (fixes[word]) {
        if (fixes[word].fix(w)) {
          fixCount++;
        }
      }
    }
  }
}

console.log(`直接修复了 ${fixCount} 个条目`);

// ===== 3. ADD MISSING "us" PRONOUN =====
// Find "we" entries and clone them to create "us" entries in same locations
console.log('\n=== 添加缺失的 "us" (宾格代词) ===');

const usClones = [];

for (const [semesterKey, semester] of Object.entries(data)) {
  for (const day of semester.days || []) {
    const weWords = day.words.filter(w => w.word.toLowerCase() === 'we');
    if (weWords.length > 0) {
      // Check if "us" already exists in this day
      const hasUs = day.words.some(w => w.word.toLowerCase() === 'us' && !w.meanings?.includes('美国'));
      if (!hasUs) {
        // Clone the first "we" entry to create "us"
        const we = weWords[0];
        const us = JSON.parse(JSON.stringify(we));
        us.word = 'us';
        us.meanings = ['我们（宾格）'];
        us.pos = 'pron.';
        us.phonetic = '[ʌs]';
        us.syllables = 'us';
        us.syllableParts = ['us'];
        if (us.posDetails?.[0]) {
          us.posDetails[0].word = 'us';
          us.posDetails[0].meaning = '我们（宾格）';
          us.posDetails[0].pos = 'pron.';
          us.posDetails[0].example = 'He saw us at the park.';
          us.posDetails[0].exampleCn = '他在公园看到了我们。';
        }
        us.example = 'He saw us at the park.';
        us.memoryTip = '';
        us.phrases = [];
        
        day.words.push(us);
        usAdded++;
        usClones.push({ semester: semesterKey, day: day.day });
      }
    }
  }
}

console.log(`添加了 ${usAdded} 个 "us" 条目（克隆自同一日的"we"）`);
if (usClones.length > 0) {
  console.log('添加位置示例:', usClones.slice(0, 10).map(c => `${c.semester}-day${c.day}`).join(', '));
}

// ===== 4. FIX "her" - split into object pronoun and possessive =====
// Currently "her" often has meanings ["她(宾格)", "她的"] mixed together
// We keep both meanings but ensure they're properly formatted
console.log('\n=== 修复 "her" ===');
let herFixCount = 0;
for (const [semesterKey, semester] of Object.entries(data)) {
  for (const day of semester.days || []) {
    for (const w of day.words || []) {
      if (w.word.toLowerCase() === 'her') {
        const oldMeanings = [...(w.meanings || [])];
        const newMeanings = oldMeanings.map(m => {
          if (m === '她(宾格)' || m === '她（宾格）') return '她（宾格）';
          if (m === '她的') return '她的';
          if (m.includes('宾格')) return '她（宾格）';
          return m;
        });
        // Remove duplicates
        const unique = [...new Set(newMeanings)];
        if (JSON.stringify(oldMeanings) !== JSON.stringify(unique)) {
          w.meanings = unique;
          if (w.posDetails?.[0]) w.posDetails[0].meaning = unique.join('；');
          herFixCount++;
        }
      }
    }
  }
}
console.log(`修复了 ${herFixCount} 个 "her" 条目`);

// ===== 5. SAVE =====
console.log('\n=== 保存数据 ===');
fs.writeFileSync(dataPath, JSON.stringify(data), 'utf-8');
console.log(`总计: 修复 ${fixCount} 个 + 添加 ${usAdded} 个 us + 修复 ${herFixCount} 个 her = ${fixCount + usAdded + herFixCount} 次修改`);
console.log('数据已保存到 calendarData.json');
