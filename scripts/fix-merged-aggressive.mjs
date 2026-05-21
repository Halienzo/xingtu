import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// ========== KEYWORD MAP (expanded) ==========
const wordKeywords = {
  'textbook': ['教科书', '教材', '课本'],
  'speaking': ['说', '口语', '讲'],
  'pronunciation': ['发音', '读音'],
  'expression': ['表达', '表情', '词语'],
  'grammar': ['语法'],
  'pal': ['朋友', '伙伴'],
  'chemistry': ['化学'],
  'increase': ['增加', '增长'],
  'born': ['出生', '诞生'],
  'brain': ['大脑', '头脑'],
  'connect': ['连接', '联系'],
  'lifelong': ['终身', '毕生'],
  'conversation': ['交谈', '谈话'],
  'aloud': ['大声', '出声'],
  'patient': ['耐心', '病人'],
  'discover': ['发现', '发觉'],
  'secret': ['秘密', '秘诀'],
  'repeat': ['重复', '重做'],
  'note': ['笔记', '记录', '注意'],
  'physics': ['物理'],
  'memorize': ['记住', '记忆'],
  'speed': ['速度', '快'],
  'partner': ['搭档', '同伴'],
  'ability': ['能力', '才能'],
  'create': ['创造', '创建'],
  'active': ['活跃', '积极'],
  'review': ['回顾', '复习'],
  'knowledge': ['知识', '学问'],
  'wisely': ['聪明', '明智'],
  'loud': ['大声', '响亮'],
  'mooncake': ['月饼'],
  'pound': ['磅', '英镑'],
  'steal': ['偷', '窃取'],
  'tradition': ['传统', '惯例'],
  'trick': ['花招', '把戏', '诡计'],
  'novel': ['小说', '新颖'],
  'warn': ['警告', '警戒'],
  'stranger': ['陌生人'],
  'relative': ['亲戚', '亲属'],
  'garden': ['花园', '园子'],
  'admire': ['欣赏', '仰慕'],
  'tie': ['领带', '捆', '系'],
  'haunted': ['闹鬼', '鬼魂'],
  'treat': ['款待', '招待', '治疗'],
  'fool': ['蠢人', '傻瓜'],
  'foolish': ['愚蠢', '傻'],
  'dead': ['死', '死亡'],
  'business': ['生意', '商业'],
  'punish': ['惩罚', '处罚'],
  'present': ['礼物', '现在', '目前'],
  'warmth': ['温暖', '热情'],
  'spread': ['传播', '展开'],
  'throw': ['扔', '抛', '投'],
  'notice': ['注意', '通知'],
  'focus': ['集中', '聚焦'],
  'folk': ['民间', '民俗'],
  'goddess': ['女神'],
  'lay': ['放置', '铺设'],
  'dessert': ['甜点', '甜食'],
  'share': ['分享', '共用'],
  'become': ['变成', '成为'],
  'popular': ['流行', '受欢迎'],
  'sound': ['声音', '听起来'],
  'hot': ['热', '炎热'],
  'African': ['非洲'],
  'Asian': ['亚洲'],
  'Canadian': ['加拿大'],
  'European': ['欧洲'],
  'Italian': ['意大利'],
  'absent': ['缺席', '不在'],
  'ant': ['蚂蚁'],
  'avoid': ['避免', '回避'],
  'boss': ['老板'],
  'chopstick': ['筷子'],
  'competitor': ['参赛者', '竞争者'],
  'complete': ['完成', '完全'],
  'corner': ['角落', '拐角'],
  'correct': ['正确', '对的'],
  'deal': ['对付', '处理'],
  'dress': ['衣服', '穿'],
  'east': ['东', '东方'],
  'fair': ['展览会', '公平'],
  'fork': ['叉子'],
  'general': ['总的', '普遍', '将军'],
  'guard': ['警卫', '看守'],
  'heat': ['热', '高温'],
  'heel': ['鞋跟', '后跟'],
  'humorous': ['幽默', '风趣'],
  'inexpensive': ['不贵', '便宜'],
  'international': ['国际'],
  'interview': ['采访', '面试'],
  'introduce': ['介绍'],
  'keep': ['保持', '保留'],
  'lead': ['引导', '带领'],
  'musical': ['音乐', '乐器'],
  'national': ['国家', '民族'],
  'nearby': ['附近', '临近'],
  'normal': ['正常', '通常'],
  'operate': ['手术', '操作'],
  'pioneer': ['先锋', '先驱'],
  'postcard': ['明信片'],
  'process': ['加工', '处理', '过程'],
  'produce': ['生产', '制造'],
  'product': ['产品', '产物'],
  'public': ['公众', '公开'],
  'require': ['要求', '需要'],
  'restroom': ['厕所', '洗手间'],
  'ruler': ['统治者', '尺子'],
  'rush': ['仓促', '急促', '匆忙'],
  'scissors': ['剪刀'],
  'seem': ['似乎', '好像'],
  'send': ['发送', '寄'],
  'show': ['展示', '显示'],
  'silent': ['沉默', '安静'],
  'smell': ['气味', '闻'],
  'sour': ['酸'],
  'spend': ['花费', '度过'],
  'sudden': ['突然'],
  'ton': ['吨'],
  'trade': ['贸易', '交易'],
  'traffic': ['交通'],
  'uncrowded': ['不拥挤'],
  'widely': ['广泛'],
  'wonder': ['想知道', '惊奇'],
  'zipper': ['拉链'],
};

function getKeywords(word) {
  return wordKeywords[word] || null;
}

function countChinese(str) {
  return (str.match(/[\u4e00-\u9fa5]/g) || []).length;
}

function extractFirstMeaning(meaning) {
  // Extract the first contiguous Chinese character sequence
  const match = meaning.match(/[\u4e00-\u9fa5]{2,}/);
  return match ? match[0] : meaning;
}

function fixMeaning(word, meaning) {
  const keywords = getKeywords(word);
  
  // 1. If it has delimiters, split and filter
  const delimiters = ['；', ';', '----', '---', '--', '/', '|'];
  let parts = [meaning];
  for (const delim of delimiters) {
    if (meaning.includes(delim)) {
      parts = meaning.split(delim).map(p => p.trim()).filter(p => p.length > 0);
      break;
    }
  }
  
  // 2. For each part, try to extract just the core meaning
  const cleaned = [];
  for (const part of parts) {
    const cc = countChinese(part);
    if (cc === 0) continue;
    
    // Grammar explanations: keep as-is but clean up
    if (/表示|其后接|从句|谓语动词|时态|短语|意思|含义/.test(part) && cc >= 4) {
      cleaned.push(part);
      continue;
    }
    
    // Try keyword match
    if (keywords) {
      const matched = keywords.filter(kw => part.includes(kw));
      if (matched.length > 0) {
        // Extract just the phrase around the keyword
        const kw = matched[0];
        const idx = part.indexOf(kw);
        // Take a window around the keyword
        const start = Math.max(0, idx - 4);
        const end = Math.min(part.length, idx + kw.length + 4);
        let extracted = part.substring(start, end);
        // Clean up partial characters at boundaries
        extracted = extracted.replace(/^[^\u4e00-\u9fa5]+/, '').replace(/[^\u4e00-\u9fa5]+$/, '');
        if (extracted.length >= 2) cleaned.push(extracted);
        continue;
      }
    }
    
    // Fallback: take first Chinese sequence
    const first = extractFirstMeaning(part);
    if (first && first.length >= 2) cleaned.push(first);
  }
  
  if (cleaned.length > 0) return cleaned;
  return [meaning];
}

// ========== PROCESS 9a ==========
const report = { fixed: 0, unchanged: 0, samples: [] };

for (const day of data['9a'].days) {
  for (const w of day.words) {
    if (w.meanings?.length >= 1) {
      const original = w.meanings;
      let newMeanings = [];
      let changed = false;
      
      for (const m of original) {
        const cc = countChinese(m);
        // Check if this meaning looks merged (multiple unrelated Chinese phrases)
        if (cc >= 6 && /[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}/.test(m)) {
          const fixed = fixMeaning(w.word, m);
          newMeanings.push(...fixed);
          if (fixed.length > 1 || fixed[0] !== m) changed = true;
        } else {
          newMeanings.push(m);
        }
      }
      
      if (changed) {
        w.meanings = [...new Set(newMeanings)]; // Remove duplicates
        report.fixed++;
        if (report.samples.length < 30) {
          report.samples.push({word: w.word, before: original, after: w.meanings});
        }
      } else {
        report.unchanged++;
      }
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');
fs.writeFileSync('scripts/fix-aggressive-report.json', JSON.stringify(report, null, 2), 'utf8');

console.log('Fixed', report.fixed, 'words');
console.log('Unchanged:', report.unchanged);
console.log('\nSample fixes:');
for (const s of report.samples) {
  console.log(`  ${s.word}: ${JSON.stringify(s.before)} → ${JSON.stringify(s.after)}`);
}
