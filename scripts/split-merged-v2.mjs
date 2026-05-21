import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// ========== KEYWORD MAP for common 9a words ==========
const wordKeywords = {
  // Day 1-6 basics
  'textbook': ['教科书', '教材', '课本'],
  'speaking': ['说', '口语', '讲'],
  'pronunciation': ['发音', '读音'],
  'expression': ['表达', '表情', '词语'],
  'grammar': ['语法'],
  'pal': ['朋友', '伙伴', '伙伴'],
  'chemistry': ['化学'],
  'increase': ['增加', '增长', '提高'],
  'born': ['出生', '诞生'],
  'brain': ['大脑', '头脑'],
  'connect': ['连接', '联系', '关联'],
  'lifelong': ['终身', '毕生', '一生'],
  'conversation': ['交谈', '谈话', '会话'],
  'aloud': ['大声', '出声'],
  'patient': ['耐心', '病人', '忍耐'],
  'discover': ['发现', '发觉'],
  'secret': ['秘密', '秘诀', '机密'],
  'repeat': ['重复', '重做', '重说'],
  'note': ['笔记', '记录', '注意', '便条'],
  'physics': ['物理', '身体'],
  'memorize': ['记住', '记忆'],
  'speed': ['速度', '快', '迅速'],
  'partner': ['搭档', '同伴', '伙伴', '合伙'],
  'ability': ['能力', '才能', '本领'],
  'create': ['创造', '创建', '创作'],
  'active': ['活跃', '积极', '活动'],
  'review': ['回顾', '复习', '评论'],
  'knowledge': ['知识', '学问', '学识'],
  'wisely': ['聪明', '明智'],
  'loud': ['大声', '响亮', '喧闹'],
  // Day 7-11 festival
  'mooncake': ['月饼'],
  'pound': ['磅', '英镑'],
  'steal': ['偷', '窃取', '盗'],
  'tradition': ['传统', '惯例', '风俗'],
  'trick': ['花招', '把戏', '诡计', '技巧'],
  'novel': ['小说', '新颖'],
  'warn': ['警告', '警戒', '提醒'],
  'stranger': ['陌生人', '陌生'],
  'relative': ['亲戚', '亲属', '相对'],
  'garden': ['花园', '园子', '园艺'],
  'admire': ['欣赏', '仰慕', '钦佩'],
  'tie': ['领带', '捆', '系', '绑'],
  'haunted': ['闹鬼', '鬼魂'],
  'treat': ['款待', '招待', '治疗'],
  'fool': ['蠢人', '傻瓜', '愚蠢'],
  'foolish': ['愚蠢', '傻'],
  'dead': ['死', '失去生命'],
  'business': ['生意', '商业', '事务'],
  'punish': ['惩罚', '处罚'],
  'present': ['礼物', '现在', '目前'],
  'warmth': ['温暖', '暖和', '热情'],
  'spread': ['传播', '展开', '蔓延'],
  'throw': ['扔', '抛', '投', '丢'],
  'notice': ['注意', '通知'],
  'focus': ['集中', '聚焦', '专注'],
  'folk': ['民间', '民俗'],
  'goddess': ['女神'],
  'lay': ['放置', '铺设', '产卵'],
  'dessert': ['甜点', '甜食', '甜品'],
  'share': ['分享', '共用', '分担'],
  'become': ['变成', '成为', '变得'],
  'popular': ['流行', '受欢迎'],
  'sound': ['声音', '听起来'],
  'hot': ['热', '炎热', '辣'],
  // Countries
  'African': ['非洲'],
  'Asian': ['亚洲'],
  'Canadian': ['加拿大'],
  'European': ['欧洲'],
  'Italian': ['意大利'],
  // Other common words
  'absent': ['缺席', '不在'],
  'aloud': ['大声', '出声'],
  'ant': ['蚂蚁'],
  'avoid': ['避免', '回避'],
  'boss': ['老板'],
  'chopstick': ['筷子'],
  'competitor': ['参赛者', '竞争者'],
  'complete': ['完成', '完全'],
  'corner': ['角落', '拐角'],
  'correct': ['正确', '对的'],
  'deal': ['对付', '处理', '交易'],
  'dress': ['衣服', '穿', ' Dress'],
  'east': ['东', '东方'],
  'fair': ['展览会', '公平', '草地'],
  'fork': ['叉子'],
  'general': ['总的', '普遍的', '将军'],
  'guard': ['警卫', '看守', '保卫'],
  'heat': ['热', '高温', '加热'],
  'heel': ['鞋跟', '后跟'],
  'humorous': ['幽默', '风趣'],
  'inexpensive': ['不贵', '便宜'],
  'international': ['国际'],
  'interview': ['采访', '面试'],
  'introduce': ['介绍'],
  'keep': ['保持', '保留'],
  'lead': ['引导', '领导', '带领'],
  'musical': ['音乐', '乐器'],
  'national': ['国家', '民族'],
  'nearby': ['附近', '临近'],
  'normal': ['正常', '通常'],
  'operate': ['手术', '操作', '运转'],
  'pioneer': ['先锋', '先驱'],
  'postcard': ['明信片'],
  'process': ['加工', '处理', '过程'],
  'produce': ['生产', '制造'],
  'product': ['产品', '产物'],
  'public': ['公众', '公开', '民众'],
  'require': ['要求', '需要'],
  'restroom': ['厕所', '洗手间', '卫生间'],
  'ruler': ['统治者', '尺子'],
  'rush': ['仓促', '急促', '匆忙'],
  'scissors': ['剪刀'],
  'seem': ['似乎', '好像'],
  'send': ['发送', '寄', '送出'],
  'show': ['展示', '显示', '表演'],
  'silent': ['沉默', '安静'],
  'smell': ['气味', '闻', '嗅'],
  'sour': ['酸'],
  'spend': ['花费', '度过', '花'],
  'sudden': ['突然'],
  'ton': ['吨'],
  'trade': ['贸易', '交易'],
  'traffic': ['交通'],
  'uncrowded': ['不拥挤', '宽敞'],
  'used to do sth': ['过去', '曾经'],
  'widely': ['广泛', '广'],
  'wonder': ['想知道', '惊奇', '奇迹'],
  'zipper': ['拉链'],
};

function getKeywords(word) {
  if (wordKeywords[word]) return wordKeywords[word];
  // Try without hyphens
  const noHyphen = word.replace(/-/g, '');
  if (wordKeywords[noHyphen]) return wordKeywords[noHyphen];
  return null;
}

function countChinese(str) {
  return (str.match(/[\u4e00-\u9fa5]/g) || []).length;
}

function splitMeaning(word, meaning) {
  const keywords = getKeywords(word);
  
  // 1. Split by common delimiters
  const delimiters = ['；', ';', '----', '---', '--', '/', '|'];
  let parts = [meaning];
  for (const delim of delimiters) {
    if (meaning.includes(delim)) {
      parts = meaning.split(delim).map(p => p.trim()).filter(p => p.length > 0);
      break;
    }
  }
  
  // 2. If no delimiter, try to extract Chinese character sequences
  if (parts.length === 1) {
    const matches = meaning.match(/[\u4e00-\u9fa5]{2,}/g);
    if (matches && matches.length > 1) {
      parts = matches;
    }
  }
  
  // 3. Filter parts by heuristics
  const validParts = parts.filter(part => {
    const cc = countChinese(part);
    // Keep grammar explanations
    if (/表示|其后接|从句|谓语动词|时态|短语|意思|含义/.test(part) && cc >= 4) return true;
    // Normal meanings: 2-12 Chinese chars
    return cc >= 2 && cc <= 12;
  });
  
  if (validParts.length === 0) return [parts[0] || meaning];
  
  // 4. If we have keywords, filter by keyword match
  if (keywords) {
    const matched = validParts.filter(p => keywords.some(kw => p.includes(kw)));
    if (matched.length > 0) return matched;
  }
  
  // 5. If first part is significantly shorter, likely just the core meaning
  const first = validParts[0];
  const firstCC = countChinese(first);
  if (validParts.length > 1) {
    const otherCCs = validParts.slice(1).map(countChinese);
    const avgOther = otherCCs.reduce((a,b) => a+b, 0) / otherCCs.length;
    if (firstCC <= 6 && avgOther > firstCC * 1.3) {
      return [first];
    }
  }
  
  return validParts;
}

// ========== PROCESS 9a ==========
const report = { split: 0, unchanged: 0, samples: [] };

for (const day of data['9a'].days) {
  for (const w of day.words) {
    if (w.meanings?.length === 1) {
      const m = w.meanings[0];
      // Check if it looks like multiple unrelated meanings merged
      if (countChinese(m) >= 6 && /[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}/.test(m)) {
        const parts = splitMeaning(w.word, m);
        if (parts.length === 1 && parts[0] === m) {
          report.unchanged++;
        } else {
          w.meanings = parts;
          report.split++;
          if (report.samples.length < 30) {
            report.samples.push({word: w.word, before: m, after: parts});
          }
        }
      }
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');
fs.writeFileSync('scripts/split-v2-report.json', JSON.stringify(report, null, 2), 'utf8');

console.log('Split', report.split, 'merged meanings');
console.log('Unchanged:', report.unchanged);
console.log('\nSample splits:');
for (const s of report.samples) {
  console.log(`  ${s.word}: "${s.before}" → [${s.after.map(x => `"${x}"`).join(', ')}]`);
}
