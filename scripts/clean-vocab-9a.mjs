import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// ========== STRICT GRAMMAR-NOTE PATTERNS (only remove these exact notes) ==========
const exactGrammarNotes = [
  '课标词汇',
  '注意英译汉',
  '语法词汇知其变',
  '注意词性变化',
  '重点短语知搭配',
  '注意固定短语的英汉互译',
  '核心单词知用法',
  '注意固定短语、句型和词块',
];

function isExactGrammarNote(m) {
  return exactGrammarNotes.some(note => m.includes(note));
}

// ========== WORD-MEANING VALIDATION MAP ==========
const wordMeaningKeywords = {
  'festival': ['节日', '庆典', '庆祝', '节庆'],
  'mooncake': ['月饼'],
  'lantern': ['灯笼', '灯'],
  'stranger': ['陌生人', '陌生'],
  'strange': ['奇怪', '陌生', '奇异'],
  'pound': ['磅', '英镑', '重击', '猛击'],
  'steal': ['偷', '窃取', '盗'],
  'tradition': ['传统', '惯例', '风俗'],
  'trick': ['花招', '把戏', '诡计', '技巧', '戏法'],
  'novel': ['小说', '新颖', '新奇'],
  'warn': ['警告', '警戒', '提醒'],
  'relative': ['亲戚', '亲属', '相对', '比较'],
  'garden': ['花园', '园子', '园艺', '园丁'],
  'admire': ['欣赏', '仰慕', '钦佩', '赞赏'],
  'tie': ['领带', '捆', '系', '绑', '平局', '联系'],
  'haunt': ['闹鬼', '出没', '萦绕', '常去'],
  'haunted': ['闹鬼', '鬼魂'],
  'treat': ['款待', '招待', '治疗', '对待', '请客'],
  'fool': ['蠢人', '傻瓜', '愚弄', '愚蠢', '愚人'],
  'foolish': ['愚蠢', '傻'],
  'dead': ['死', '失去生命', '无生命的'],
  'die': ['死', '去世', '消亡'],
  'business': ['生意', '商业', '事务', '业务'],
  'busy': ['忙碌', '繁忙'],
  'punish': ['处罚', '惩罚', '惩治'],
  'present': ['现在', '礼物', '目前的', '出席', '呈现'],
  'warmth': ['温暖', '暖和', '热情'],
  'warm': ['温暖', '暖和', '热情'],
  'warmly': ['热情', '温暖'],
  'spread': ['传播', '展开', '蔓延', '涂抹', '散布'],
  'from': ['从', '来自', '由', '离'],
  'throw': ['扔', '抛', '投', '掷', '丢'],
  'notice': ['通知', '注意', '注意到', '意识到'],
  'much': ['许多', '多', '非常', '很'],
  'many': ['许多', '多'],
  'focus': ['集中', '聚焦', '焦点', '专注'],
  'folk': ['民间', '民俗', '民众'],
  'goddess': ['女神'],
  'lay': ['放置', '铺设', '产卵', '躺'],
  'dessert': ['甜点', '甜食', '甜品'],
  'steal stole stolen': ['偷'],
  'lay out': ['摆开', '布置', '摆放'],
  'share': ['分享', '共用', '分担'],
  'Mother\'s Day': ['母亲节'],
  'Father\'s Day': ['父亲节'],
  'become': ['变成', '成为', '变得'],
  'popular': ['流行', '受欢迎', '普及'],
  'sound': ['声音', '听起来', '似乎', '健全'],
  'hot': ['热', '炎热', '辣', '热门'],
  'throw...into': ['扔进', '投入'],
  'take...for a walk': ['带……散步'],
  'tie...to': ['把……绑到'],
  'think of': ['想起', '认为', '考虑'],
  'used to': ['过去常常', '过去曾经'],
  'learn from': ['向……学习'],
  'communicate with': ['与……交流'],
  'on vacation': ['在度假'],
  'at least': ['至少'],
  'last week': ['上周'],
  'put up': ['张贴', '举起', '搭建'],
  'write down': ['写下', '记下'],
  'invite sb to': ['邀请某人去'],
  'hear of': ['听说'],
  'come over': ['过来', '顺便来访'],
  'plan to': ['计划'],
  'at the age of': ['在……岁时'],
  'from a young age': ['从小'],
  'take sb around': ['带某人参观'],
  'thanks to': ['多亏', '由于'],
  'do well in': ['在……方面做得好'],
  'say hello to': ['向……问好'],
  'because of': ['因为', '由于'],
  'fall down': ['摔倒', '跌倒'],
  'one by one': ['一个接一个'],
  'each other': ['互相', '彼此'],
  'learn about': ['了解', '学习关于'],
  'hundreds of': ['数以百计的'],
  'thousands of': ['数以千计的'],
  'millions of': ['数以百万计的'],
  'a piece of': ['一块', '一片', '一条'],
  'no doubt': ['毫无疑问'],
  'be worth doing': ['值得做'],
  'look forward to': ['期待', '盼望'],
  'be proud of': ['为……骄傲'],
  'be interested in': ['对……感兴趣'],
  'be good at': ['擅长'],
  'be afraid of': ['害怕'],
  'be busy with': ['忙于'],
  'be similar to': ['与……相似'],
  'be different from': ['与……不同'],
  'be fond of': ['喜欢', '喜爱'],
  'be full of': ['充满'],
  'be famous for': ['因……著名'],
  'be late for': ['迟到'],
  'be ready for': ['为……做好准备'],
  'be surprised at': ['对……惊讶'],
  'be worried about': ['担心'],
  'be strict with': ['对……严格'],
  'be angry with': ['对……生气'],
  'be pleased with': ['对……满意'],
};

function getKeywords(word) {
  if (wordMeaningKeywords[word]) return wordMeaningKeywords[word];
  // Try base form
  const base = word.replace(/ly$/, '').replace(/ed$/, '').replace(/ing$/, '').replace(/er$/, '').replace(/est$/, '');
  if (wordMeaningKeywords[base]) return wordMeaningKeywords[base];
  return null;
}

function isRelated(word, meaning) {
  const keywords = getKeywords(word);
  if (!keywords) return true; // Unknown word, keep all meanings
  const m = meaning.toLowerCase();
  return keywords.some(kw => m.includes(kw));
}

// ========== PROCESS 9a ONLY ==========

const sem = data['9a'];
const report = {
  removedGrammarNotes: 0,
  removedUnrelated: 0,
  mergedPhrases: 0,
  cleanedWords: 0,
  emptyAfterClean: [],
};

for (const day of sem.days) {
  for (const w of day.words) {
    let meanings = w.meanings || [];
    
    // Step 1: Remove exact grammar notes
    const before1 = meanings.length;
    meanings = meanings.filter(m => !isExactGrammarNote(m));
    report.removedGrammarNotes += (before1 - meanings.length);
    
    // Step 2: Merge split phrase meanings
    if (w.word && w.word.includes(' ') && meanings.length >= 2) {
      const avgLen = meanings.reduce((s, m) => s + m.length, 0) / meanings.length;
      if (avgLen < 8) {
        meanings = [meanings.join('')];
        report.mergedPhrases++;
      }
    }
    
    // Step 3: Filter unrelated meanings for known words
    const before3 = meanings.length;
    if (meanings.length > 1 && getKeywords(w.word)) {
      meanings = meanings.filter(m => isRelated(w.word, m));
      report.removedUnrelated += (before3 - meanings.length);
    }
    
    // Step 4: Clean up trailing dashes and extra spaces
    meanings = meanings.map(m => m.replace(/[-]+$/, '').trim()).filter(m => m.length > 0);
    
    w.meanings = meanings;
    report.cleanedWords++;
    
    if (meanings.length === 0) {
      report.emptyAfterClean.push({word: w.word, pos: w.pos});
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');
fs.writeFileSync('scripts/clean-report-9a.json', JSON.stringify(report, null, 2), 'utf8');

console.log('=== 9a Data Cleaning Complete ===');
console.log('Total words processed:', report.cleanedWords);
console.log('Grammar notes removed:', report.removedGrammarNotes);
console.log('Unrelated meanings removed:', report.removedUnrelated);
console.log('Phrase meanings merged:', report.mergedPhrases);
console.log('Empty after clean:', report.emptyAfterClean.length);
console.log('\nFirst 20 empty entries:');
for (const item of report.emptyAfterClean.slice(0, 20)) {
  console.log(`  ${item.word} | ${item.pos}`);
}
