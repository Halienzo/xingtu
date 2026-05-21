import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// ========== WORD-KEYWORD MAP (expanded for 9a) ==========
const wordKeywords = {
  'festival': ['节日', '庆典', '庆祝', '节庆'],
  'mooncake': ['月饼'],
  'lantern': ['灯笼', '灯'],
  'stranger': ['陌生人', '陌生'],
  'strange': ['奇怪', '陌生', '奇异'],
  'pound': ['磅', '英镑', '重击', '猛击', '捣烂'],
  'steal': ['偷', '窃取', '盗'],
  'tradition': ['传统', '惯例', '风俗'],
  'traditional': ['传统'],
  'trick': ['花招', '把戏', '诡计', '技巧', '戏法', '窍门'],
  'novel': ['小说', '新颖', '新奇'],
  'warn': ['警告', '警戒', '提醒'],
  'relative': ['亲戚', '亲属', '相对', '比较'],
  'garden': ['花园', '园子', '园艺', '园丁'],
  'admire': ['欣赏', '仰慕', '钦佩', '赞赏', '羡慕'],
  'tie': ['领带', '捆', '系', '绑', '平局', '联系', '束缚'],
  'haunt': ['闹鬼', '出没', '萦绕', '常去'],
  'haunted': ['闹鬼', '鬼魂'],
  'treat': ['款待', '招待', '治疗', '对待', '请客', '处理'],
  'fool': ['蠢人', '傻瓜', '愚弄', '愚蠢', '愚人'],
  'foolish': ['愚蠢', '傻'],
  'dead': ['死', '失去生命', '无生命的'],
  'die': ['死', '去世', '消亡'],
  'death': ['死', '死亡'],
  'business': ['生意', '商业', '事务', '业务'],
  'busy': ['忙碌', '繁忙'],
  'punish': ['处罚', '惩罚', '惩治'],
  'punishment': ['惩罚'],
  'present': ['现在', '礼物', '目前的', '出席', '呈现', '提交'],
  'presently': ['目前', '不久'],
  'warmth': ['温暖', '暖和', '热情'],
  'warm': ['温暖', '暖和', '热情'],
  'warmly': ['热情', '温暖'],
  'spread': ['传播', '展开', '蔓延', '涂抹', '散布', '蔓延'],
  'throw': ['扔', '抛', '投', '掷', '丢'],
  'notice': ['通知', '注意', '注意到', '意识到'],
  'much': ['许多', '多', '非常', '很'],
  'many': ['许多', '多'],
  'focus': ['集中', '聚焦', '焦点', '专注'],
  'folk': ['民间', '民俗', '民众'],
  'goddess': ['女神'],
  'lay': ['放置', '铺设', '产卵', '躺'],
  'lie': ['躺', '说谎', '位于', '谎言'],
  'dessert': ['甜点', '甜食', '甜品'],
  'lay out': ['摆开', '布置', '摆放', '设计'],
  'share': ['分享', '共用', '分担'],
  'become': ['变成', '成为', '变得'],
  'popular': ['流行', '受欢迎', '普及'],
  'sound': ['声音', '听起来', '似乎', '健全', '声响'],
  'hot': ['热', '炎热', '辣', '热门'],
  'used to': ['过去常常', '过去曾经', '习惯于'],
  'textbook': ['教科书', '教材', '课本'],
  'speaking': ['说', '讲', '口语'],
  'pronunciation': ['发音', '读音'],
  'expression': ['表达', '表情', '词语', '表示'],
  'grammar': ['语法'],
  'pal': ['朋友', '伙伴'],
  'chemistry': ['化学'],
  'increase': ['增加', '增长', '提高'],
  'born': ['出生', '诞生'],
  'brain': ['大脑', '头脑', '脑筋'],
  'connect': ['连接', '联系', '关联'],
  'lifelong': ['终身', '毕生', '一生'],
  'conversation': ['交谈', '谈话', '会话'],
  'aloud': ['大声', '出声'],
  'patient': ['耐心', '病人', '忍耐'],
  'discover': ['发现', '发觉'],
  'secret': ['秘密', '秘诀', '机密'],
  'repeat': ['重复', '重做', '重说'],
  'note': ['笔记', '记录', '注意', '指出', '便条'],
  'physics': ['物理', '物理学', '身体'],
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
  'invent': ['发明', '创造'],
  'find': ['找到', '发现', '寻找'],
  'important': ['重要'],
  'difficult': ['困难', '难'],
  'easy': ['容易', '简单'],
  'necessary': ['必要', '必须'],
  'mistake': ['错误', '过失', '误解'],
  'since': ['自从', '既然', '因为'],
  'for': ['为了', '因为', '对于', '持续'],
  'has gone to': ['去了', '未回'],
  'has been to': ['去过', '回来'],
  'has been in': ['在', '待了'],
  'throw into': ['扔进', '投入'],
  'take for a walk': ['散步', '遛'],
  'tie to': ['绑到', '系到', '拴'],
  'think of': ['想起', '认为', '考虑'],
  'learn from': ['学习', '向'],
  'communicate with': ['交流', '沟通'],
  'on vacation': ['度假'],
  'at least': ['至少'],
  'last week': ['上周'],
  'put up': ['张贴', '举起', '搭建', '提供住宿'],
  'write down': ['写下', '记下'],
  'invite sb to': ['邀请'],
  'hear of': ['听说'],
  'come over': ['过来', '顺便来访', '来访'],
  'plan to': ['计划', '打算'],
  'at the age of': ['在', '岁时'],
  'from a young age': ['从小', '年轻'],
  'take sb around': ['参观', '带'],
  'thanks to': ['多亏', '由于', '感谢'],
  'do well in': ['做得好', '擅长'],
  'say hello to': ['问好', '打招呼'],
  'because of': ['因为', '由于'],
  'fall down': ['摔倒', '跌倒', '倒塌'],
  'one by one': ['一个接一个', '逐个'],
  'each other': ['互相', '彼此'],
  'learn about': ['了解', '学习'],
  'hundreds of': ['数以百计', '成百上千'],
  'thousands of': ['数以千计', '成千上万'],
  'millions of': ['数以百万计', '数百万'],
  'a piece of': ['一块', '一片', '一条'],
  'no doubt': ['毫无疑问'],
  'be worth doing': ['值得'],
  'look forward to': ['期待', '盼望'],
  'be proud of': ['骄傲', '自豪'],
  'be interested in': ['感兴趣'],
  'be good at': ['擅长'],
  'be afraid of': ['害怕'],
  'be busy with': ['忙于'],
  'be similar to': ['相似'],
  'be different from': ['不同'],
  'be fond of': ['喜欢', '喜爱'],
  'be full of': ['充满'],
  'be famous for': ['著名', '闻名'],
  'be late for': ['迟到'],
  'be ready for': ['准备'],
  'be surprised at': ['惊讶'],
  'be worried about': ['担心'],
  'be strict with': ['严格'],
  'be angry with': ['生气'],
  'be pleased with': ['满意'],
  ' Christmas': ['圣诞节', '圣诞'],
  ' Halloween': ['万圣节', '万圣'],
  ' Thanksgiving': ['感恩节', '感恩'],
  ' Easter': ['复活节', '复活'],
  'hunt': ['寻找', '搜寻', '打猎'],
  'trick or treat': ['不给糖就捣蛋'],
  'spirit': ['精神', '心灵', '灵魂'],
  'present n': ['礼物', '礼品'],
  'present adj': ['现在', '目前', '出席'],
  'midnight': ['午夜', '半夜'],
  'expect': ['期待', '期望', '预料'],
  'around': ['周围', '大约', '到处'],
  'onion': ['洋葱', '葱头'],
  'laugh': ['笑', '笑声', '嘲笑'],
  'costume': ['服装', '戏服', '装束'],
  'candle': ['蜡烛', '烛'],
  'witch': ['女巫', '巫婆'],
  'ghost': ['鬼', '幽灵', '鬼魂'],
  'threat': ['威胁', '恐吓'],
  'adult': ['成年人', '成人'],
  'scare': ['惊吓', '害怕'],
  'alive': ['活着', '在世'],
  'heart': ['心', '心脏', '内心'],
  'cheer': ['欢呼', '喝彩', '使高兴'],
  'share': ['分享', '共用', '分担'],
  'meaning': ['意思', '含义', '意义'],
  'celebrate': ['庆祝', '庆贺'],
  'decorate': ['装饰', '布置'],
  'activity': ['活动', '活跃'],
  'custom': ['习俗', '风俗', '习惯'],
  'celebration': ['庆祝', '庆典'],
  'decoration': ['装饰', '装饰品'],
  'spirit': ['精神', '心灵', '灵魂', '情绪'],
  'stick': ['棍子', '粘贴', '刺'],
  'cover': ['覆盖', '盖子', '包括', '封面'],
  'leaf': ['叶子', '树叶'],
  'hole': ['洞', '孔'],
  'lie v': ['躺', '位于'],
  'lie n': ['谎言'],
  'wake': ['醒', '唤醒', '醒来'],
  'believe': ['相信', '认为'],
  'belong': ['属于', '归属'],
  'enjoy': ['享受', '喜爱', '欣赏'],
  'solve': ['解决', '解答'],
  'receive': ['收到', '接收', '得到'],
  'decide': ['决定', '决心'],
  'choose': ['选择', '挑选'],
  'describe': ['描述', '描写'],
  'explain': ['解释', '说明'],
  'compare': ['比较', '对比'],
  'improve': ['提高', '改善', '改进'],
  'prepare': ['准备', '预备'],
  'realize': ['意识到', '认识到', '实现'],
  'achieve': ['实现', '达到', '完成'],
  'succeed': ['成功'],
  'fail': ['失败'],
  'try': ['尝试', '努力', '试图'],
  'offer': ['提供', '主动提出'],
  'refuse': ['拒绝', '回绝'],
  'accept': ['接受', '同意'],
  'agree': ['同意', '赞成'],
  'disagree': ['不同意', '反对'],
  'allow': ['允许', '准许'],
  'encourage': ['鼓励', '激励'],
  'support': ['支持', '支撑', '拥护'],
  'suggest': ['建议', '暗示'],
  'advise': ['建议', '劝告'],
  'remind': ['提醒', '使想起'],
  'promise': ['承诺', '答应', '保证'],
  'predict': ['预测', '预言'],
  'prevent': ['阻止', '预防', '防止'],
  'protect': ['保护', '防护'],
  'fight': ['战斗', '打架', '斗争'],
  'beat': ['打败', '跳动', '敲打'],
  'win': ['赢', '获胜', '赢得'],
  'lose': ['输', '失去', '丢失'],
  'raise': ['提高', '举起', '筹集', '养育'],
  'rise': ['上升', '升起', '上涨'],
  'happen': ['发生', '碰巧'],
  'occur': ['发生', '出现'],
  'appear': ['出现', '似乎', '显得'],
  'disappear': ['消失', '不见'],
  'develop': ['发展', '开发', '养成'],
  'change': ['改变', '变化', '更换'],
  'grow': ['成长', '种植', '变得'],
  'raise v': ['提高', '举起', '筹集', '养育'],
  'rise v': ['上升', '升起', '上涨'],
  'happen v': ['发生', '碰巧'],
  'appear v': ['出现', '似乎', '显得'],
  'grow v': ['成长', '种植', '变得'],
};

function getKeywords(word) {
  if (wordKeywords[word]) return wordKeywords[word];
  // Try variations
  const base = word.replace(/ly$/, '').replace(/ed$/, '').replace(/ing$/, '').replace(/er$/, '').replace(/est$/, '');
  if (wordKeywords[base]) return wordKeywords[base];
  if (wordKeywords[base + 'e']) return wordKeywords[base + 'e'];
  return null;
}

function splitMeaning(word, meaning) {
  const keywords = getKeywords(word);
  if (!keywords) return [meaning]; // Unknown word, keep as is
  
  // Split by common delimiters
  const parts = meaning.split(/(?=[\u4e00-\u9fa5]{2,})/)
    .flatMap(p => p.split('；'))
    .flatMap(p => p.split(';'))
    .flatMap(p => p.split('----'))
    .flatMap(p => p.split('（'))
    .map(p => p.replace(/）/g, ''))
    .map(p => p.trim())
    .filter(p => p.length > 0);
  
  // Also try splitting by Chinese characters sequence
  const charParts = [];
  for (const part of parts) {
    // Split by non-Chinese sequences that are between Chinese phrases
    const matches = part.match(/[\u4e00-\u9fa5][^\u4e00-\u9fa5]*(?:[\u4e00-\u9fa5][^\u4e00-\u9fa5]*)*/g);
    if (matches) {
      for (const m of matches) {
        const trimmed = m.trim();
        if (trimmed.length >= 2) charParts.push(trimmed);
      }
    } else if (part.length >= 2) {
      charParts.push(part);
    }
  }
  
  // Filter parts that contain any keyword
  const validParts = charParts.filter(p => 
    keywords.some(kw => p.includes(kw))
  );
  
  if (validParts.length > 0) return validParts;
  return [meaning]; // Fallback
}

// ========== PROCESS 9a ==========
const report = { split: 0, noMatch: [], unchanged: 0 };

for (const day of data['9a'].days) {
  for (const w of day.words) {
    if (w.meanings?.length === 1) {
      const m = w.meanings[0];
      if (/[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}/.test(m)) {
        const parts = splitMeaning(w.word, m);
        if (parts.length > 1 || parts[0] !== m) {
          w.meanings = parts;
          report.split++;
        } else {
          report.noMatch.push({word: w.word, meaning: m});
        }
      } else {
        report.unchanged++;
      }
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');
fs.writeFileSync('scripts/split-report-9a.json', JSON.stringify(report, null, 2), 'utf8');

console.log('Split', report.split, 'merged meanings');
console.log('No keyword match:', report.noMatch.length);
console.log('Unchanged (single meaning):', report.unchanged);
console.log('\nNo match samples:');
for (const item of report.noMatch.slice(0, 20)) {
  console.log('  ' + item.word + ' => ' + item.meaning);
}
