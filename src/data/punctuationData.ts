// ============================================
// Stary Light, Stary Night - 标点符号系统数据
// 16种中英文标点符号完整对比 + 从句标点规则
// ============================================

export interface PunctuationRule {
  cnSymbol: string;
  enSymbol: string;
  cnName: string;
  enName: string;
  description: string;
  keyDifferences: string[];
  cnExamples: { text: string; explanation: string }[];
  enExamples: { text: string; explanation: string }[];
  commonMistakes: { wrong: string; correct: string; reason: string }[];
  quickTip: string;
}

export interface ClauseRule {
  type: string;
  enType: string;
  description: string;
  commaRule: string;
  examples: { sentence: string; explanation: string; translation: string }[];
  commonErrors: { wrong: string; correct: string; reason: string }[];
}

export interface QuizQuestion {
  id: number;
  type: 'single' | 'judge' | 'fill' | 'correct' | 'compare' | 'apply';
  difficulty: 1 | 2 | 3;
  question: string;
  options?: string[];
  answer: string;
  explanation: string;
  category: string;
  tags: string[];
}

export const PUNCTUATION_RULES: PunctuationRule[] = [
  // 1. 句号
  {
    cnSymbol: '。',
    enSymbol: '.',
    cnName: '句号',
    enName: 'Period',
    description: '用于陈述句末尾，表示一句话结束。',
    keyDifferences: [
      '中文句号是空心圆圈，英文句号是实心圆点',
      '英文句号后必须空一格，中文句号后不空格',
      '英文缩写（如Mr. Dr.）用句号，中文不用'
    ],
    cnExamples: [
      { text: '我喜欢英语。', explanation: '句号用于陈述句末尾' },
      { text: '他今年十二岁了。', explanation: '陈述事实，用句号' }
    ],
    enExamples: [
      { text: 'I like English.', explanation: 'Period at the end' },
      { text: 'Mr. Smith is my teacher.', explanation: 'Abbreviations use periods' }
    ],
    commonMistakes: [
      { wrong: 'I like English。', correct: 'I like English.', reason: '英文不用中文句号' },
      { wrong: 'I like English.He is my friend.', correct: 'I like English. He is my friend.', reason: '句号后必须空一格' }
    ],
    quickTip: '中文句号是"〇"形，英文句号是"·"点形'
  },

  // 2. 问号
  {
    cnSymbol: '？',
    enSymbol: '?',
    cnName: '问号',
    enName: 'Question Mark',
    description: '用于疑问句末尾，表示提问。',
    keyDifferences: [
      '间接疑问句不用问号（两者相同）',
      '英文反问句可用问号'
    ],
    cnExamples: [
      { text: '你喜欢英语吗？', explanation: '一般疑问句用问号' },
      { text: '他是谁？', explanation: '特殊疑问句用问号' }
    ],
    enExamples: [
      { text: 'Do you like English?', explanation: 'Yes/No questions' },
      { text: 'She asked if I liked English.', explanation: 'Indirect questions: NO question mark!' }
    ],
    commonMistakes: [
      { wrong: 'She asked if I liked English?', correct: 'She asked if I liked English.', reason: '间接疑问句不用问号' }
    ],
    quickTip: '记住：She asked if...后面不加问号'
  },

  // 3. 叹号
  {
    cnSymbol: '！',
    enSymbol: '!',
    cnName: '叹号',
    enName: 'Exclamation Mark',
    description: '用于感叹句、强烈情感的表达。',
    keyDifferences: [
      '英文中叹号不宜多用，正式写作中一般不用',
      '中文叹号使用更频繁'
    ],
    cnExamples: [
      { text: '太好了！', explanation: '表达喜悦' },
      { text: '快跑！', explanation: '祈使句表紧急' }
    ],
    enExamples: [
      { text: 'Great!', explanation: 'Expressing joy' },
      { text: 'What a beautiful day!', explanation: 'Exclamatory sentence' }
    ],
    commonMistakes: [
      { wrong: 'I love English! It is so fun! We learn every day!', correct: 'I love English. It is so fun. We learn every day.', reason: '正式写作中叹号不宜连用' }
    ],
    quickTip: '学术写作中尽量避免叹号'
  },

  // 4. 逗号
  {
    cnSymbol: '，',
    enSymbol: ',',
    cnName: '逗号',
    enName: 'Comma',
    description: '用于句子内部的停顿，是中英文标点差异最大的符号之一。',
    keyDifferences: [
      '中文并列词语之间用顿号、英文用逗号',
      '英文逗号后必须空一格',
      '英文中逗号不能连接两个独立句子（逗号拼接错误）',
      '英文FANBOYS连词前必须用逗号'
    ],
    cnExamples: [
      { text: '我喜欢跑步，游泳和打篮球。', explanation: '并列谓语用逗号分隔' },
      { text: '昨天，我去了图书馆。', explanation: '时间状语后用逗号' }
    ],
    enExamples: [
      { text: 'I like apples, bananas, and oranges.', explanation: 'Items in a series use commas' },
      { text: 'I was tired, so I went to bed.', explanation: 'Comma before FANBOYS' },
      { text: 'My brother, who lives in Beijing, is a doctor.', explanation: 'Commas around non-restrictive clause' }
    ],
    commonMistakes: [
      { wrong: 'I like apples、bananas and oranges.', correct: 'I like apples, bananas, and oranges.', reason: '英文没有顿号' },
      { wrong: 'I like tea, she likes coffee.', correct: 'I like tea; she likes coffee.', reason: '逗号不能连接两个独立句' }
    ],
    quickTip: '英文逗号不能代替句号连接两个完整句'
  },

  // 5. 顿号
  {
    cnSymbol: '、',
    enSymbol: '(none)',
    cnName: '顿号',
    enName: 'Enumeration Comma (Chinese only)',
    description: '用于并列词语之间的停顿，是中文特有的标点符号。',
    keyDifferences: [
      '英文没有顿号！并列词语一律用逗号',
      '中文并列词语用顿号，并列分句用逗号'
    ],
    cnExamples: [
      { text: '我喜欢苹果、香蕉和橙子。', explanation: '并列词语用顿号' },
      { text: '教室里坐着小明、小红、小刚。', explanation: '列举并列的人名' }
    ],
    enExamples: [
      { text: 'I like apples, bananas, and oranges.', explanation: 'NO enumeration comma' }
    ],
    commonMistakes: [
      { wrong: 'I like apples、bananas and oranges.', correct: 'I like apples, bananas, and oranges.', reason: '英文没有顿号' }
    ],
    quickTip: '看到顿号、→写成英文时换成逗号,'
  },

  // 6. 分号
  {
    cnSymbol: '；',
    enSymbol: ';',
    cnName: '分号',
    enName: 'Semicolon',
    description: '用于并列分句之间，表示比逗号更强的停顿。',
    keyDifferences: [
      '英文中分号比逗号正式得多',
      '英文分号连接两个相关但独立的句子',
      '英文分号用于复杂列表'
    ],
    cnExamples: [
      { text: '今天天气很好；我们决定去公园。', explanation: '并列分句用分号' }
    ],
    enExamples: [
      { text: 'I have a test tomorrow; I cannot go out.', explanation: 'Two independent clauses' },
      { text: 'The meeting includes John, the manager; Sue, the engineer.', explanation: 'Complex list' }
    ],
    commonMistakes: [
      { wrong: 'I like tea, however, I prefer coffee.', correct: 'I like tea; however, I prefer coffee.', reason: 'however是副词不是连词' }
    ],
    quickTip: '分号 = 句号+逗号的结合体'
  },

  // 7. 冒号
  {
    cnSymbol: '：',
    enSymbol: ':',
    cnName: '冒号',
    enName: 'Colon',
    description: '用于提示下文、引出解释或列举。',
    keyDifferences: [
      '英文时间用冒号：3:30 p.m.',
      '英文引语前用逗号不用冒号',
      '英文冒号后如接完整句首字母大写'
    ],
    cnExamples: [
      { text: '他有一个梦想：成为一名医生。', explanation: '引出具体内容' },
      { text: '老师说："同学们，上课了！"', explanation: '引出直接引语' }
    ],
    enExamples: [
      { text: 'I need three things: milk, bread, and eggs.', explanation: 'Introducing a list' },
      { text: 'He said, "I like English."', explanation: 'Comma before direct speech' },
      { text: 'The time is 3:30 p.m.', explanation: 'Time notation' }
    ],
    commonMistakes: [
      { wrong: 'He said: "I like English."', correct: 'He said, "I like English."', reason: '英文引语前用逗号' }
    ],
    quickTip: '英文引语前用逗号 He said, "..."'
  },

  // 8. 引号
  {
    cnSymbol: '\u201c\u201d \u2018\u2019',
    enSymbol: '"" \'\'',
    cnName: '引号',
    enName: 'Quotation Marks',
    description: '用于引用他人的话或特殊含义的词语。',
    keyDifferences: [
      '美式外双内单，英式外单内双',
      '美式逗号句号在引号内',
      '英式逗号句号在引号外'
    ],
    cnExamples: [
      { text: '\u4ed6\u8bf4\uff1a"\u6211\u559c\u6b22\u82f1\u8bed\u3002"', explanation: '直接引语用双引号' }
    ],
    enExamples: [
      { text: 'She said, "I know what love means."', explanation: 'American: double outside' },
      { text: 'She said, \'I know what "love" means.\'', explanation: 'British: single outside' },
      { text: '"Hello," she said.', explanation: 'Comma inside quotes (American)' }
    ],
    commonMistakes: [
      { wrong: '"Hello", she said.', correct: '"Hello," she said.', reason: '美式逗号在引号内' }
    ],
    quickTip: '美式"外双内单"逗号在内；英式外单内双逗号在外'
  },

  // 9. 括号
  {
    cnSymbol: '（）',
    enSymbol: '()',
    cnName: '括号',
    enName: 'Parentheses',
    description: '用于插入补充说明或注释内容。',
    keyDifferences: [
      '中文有方头括号【】，英文没有',
      '英文方括号[]用于引用注释'
    ],
    cnExamples: [
      { text: '他（小明）是我的同学。', explanation: '补充说明' }
    ],
    enExamples: [
      { text: 'He (Xiao Ming) is my classmate.', explanation: 'Additional information' },
      { text: 'See [Appendix 1] for details.', explanation: 'Square brackets for references' }
    ],
    commonMistakes: [
      { wrong: '(See page 10.)', correct: '(See page 10.)', reason: '括号内是完整句，句号在内' }
    ],
    quickTip: '括号内容是可删除的，去掉后句子仍完整'
  },

  // 10. 破折号
  {
    cnSymbol: '\u2014\u2014',
    enSymbol: '\u2014',
    cnName: '破折号',
    enName: 'Dash',
    description: '用于解释说明、话题转换或语气的延长。',
    keyDifferences: [
      '中文破折号占两个汉字位，英文占一个',
      '英文有em dash和en dash之分',
      'en dash用于数字范围'
    ],
    cnExamples: [
      { text: '\u4ed6\u2014\u2014\u6211\u7684\u597d\u670b\u53cb\u2014\u2014\u4eca\u5929\u6765\u6211\u5bb6\u3002', explanation: '夹注说明' }
    ],
    enExamples: [
      { text: 'My friend\u2014he is a doctor\u2014came to visit.', explanation: 'Em dash for parenthetical info' },
      { text: 'The years 2020\u20132023 were challenging.', explanation: 'En dash for number range' }
    ],
    commonMistakes: [
      { wrong: 'My friend -- he is a doctor -- came.', correct: 'My friend\u2014he is a doctor\u2014came.', reason: '用em dash不是两个短横线' }
    ],
    quickTip: 'Em dash解释说明，en dash数字范围，连字符连接词语'
  },

  // 11. 省略号
  {
    cnSymbol: '\u2026\u2026',
    enSymbol: '...',
    cnName: '省略号',
    enName: 'Ellipsis',
    description: '用于表示省略、语意未尽或说话断断续续。',
    keyDifferences: [
      '中文省略号6个点，英文3个点',
      '英文省略号如果句末，再加句号变成4个点'
    ],
    cnExamples: [
      { text: '\u4ed6\u8bf4\uff1a"\u6211\u2026\u2026\u6211\u4e0d\u786e\u5b9a\u3002"', explanation: '说话断断续续' }
    ],
    enExamples: [
      { text: '"I... I\'m not sure," he said.', explanation: 'Hesitation' },
      { text: '"Four score and seven years ago...".', explanation: 'Four dots at sentence end' }
    ],
    commonMistakes: [
      { wrong: 'I like apples\u2026\u2026', correct: 'I like apples...', reason: '英文省略号只有3个点' }
    ],
    quickTip: '中文6个点，英文3个点'
  },

  // 12. 书名号
  {
    cnSymbol: '\u300a\u300b',
    enSymbol: 'italics / ""',
    cnName: '书名号',
    enName: 'Book Title Marks',
    description: '用于标注书名、文章名等。',
    keyDifferences: [
      '英文没有书名号！用斜体或引号',
      '英文书名斜体，文章名引号'
    ],
    cnExamples: [
      { text: '\u6211\u6b63\u5728\u8bfb\u300a\u54c8\u5229\u00b7\u6ce2\u7279\u300b\u3002', explanation: '书名用书名号' }
    ],
    enExamples: [
      { text: 'I am reading *Harry Potter*.', explanation: 'Book titles in italics' },
      { text: 'I read "How to Learn English."', explanation: 'Article titles in quotes' }
    ],
    commonMistakes: [
      { wrong: 'I am reading \u300aHarry Potter\u300b.', correct: 'I am reading *Harry Potter*.', reason: '英文没有书名号' }
    ],
    quickTip: '英文书名斜体*Title*，文章名引号"Title"'
  },

  // 13. 连字符
  {
    cnSymbol: '-',
    enSymbol: '-',
    cnName: '连字符',
    enName: 'Hyphen',
    description: '用于连接复合词或单词断行。',
    keyDifferences: [
      '英文大量使用连字符',
      '中文基本不使用',
      '复合形容词修饰名词时必须用连字符'
    ],
    cnExamples: [
      { text: 'Coca-Cola', explanation: '音译用连字符' }
    ],
    enExamples: [
      { text: 'well-known', explanation: 'Compound adjective' },
      { text: 'a five-year-old boy', explanation: 'Compound adjective before noun' },
      { text: 'twenty-one', explanation: 'Numbers 21-99' }
    ],
    commonMistakes: [
      { wrong: 'a five year old boy', correct: 'a five-year-old boy', reason: '复合形容词必须用连字符' }
    ],
    quickTip: '形容词+名词修饰另一名词时→连字符'
  },

  // 14. 撇号
  {
    cnSymbol: "\u2019",
    enSymbol: "'",
    cnName: '撇号',
    enName: 'Apostrophe',
    description: '用于表示所有格、缩写或字母省略。',
    keyDifferences: [
      '英文独有！中文没有',
      '所有格：Tom\'s book',
      '缩写：I\'m, don\'t, it\'s'
    ],
    cnExamples: [
      { text: '\uff08\u4e2d\u6587\u65e0\u5bf9\u5e94\uff09', explanation: '\u4e2d\u6587\u7528\u201c\u7684\u201d\u8868\u793a\u6240\u6709\u683c' }
    ],
    enExamples: [
      { text: "Tom's book", explanation: "Singular possessive" },
      { text: "the students' desks", explanation: "Plural possessive" },
      { text: "it's (it is)", explanation: 'Contraction' }
    ],
    commonMistakes: [
      { wrong: 'Its a nice day.', correct: "It's a nice day.", reason: "It's = It is; Its = 它的" }
    ],
    quickTip: "it's = it is (有撇); its = 它的 (无撇)"
  },

  // 15. 间隔号
  {
    cnSymbol: '\u00b7',
    enSymbol: '(none)',
    cnName: '间隔号',
    enName: 'Middle Dot',
    description: '用于外国人名、书名等音译词的分界。',
    keyDifferences: [
      '中文特有标点',
      '用于外国人名中间',
      '用于书名和篇名之间'
    ],
    cnExamples: [
      { text: '\u7ea6\u7ff0\u00b7\u53f2\u5bc6\u65af', explanation: '外国人名音译' },
      { text: '\u300a\u53f2\u8bb0\u00b7\u9879\u7fbd\u672c\u7eaa\u300b', explanation: '书名\u00b7篇名' }
    ],
    enExamples: [
      { text: 'John Smith', explanation: 'English names use spaces' }
    ],
    commonMistakes: [
      { wrong: 'John\u00b7Smith', correct: 'John Smith', reason: '英文名字用空格' }
    ],
    quickTip: '\u4e2d\u6587\u540d\u7528\u00b7\uff0c\u82f1\u6587\u540d\u7528\u7a7a\u683c'
  },

  // 16. 英美差异
  {
    cnSymbol: '\u2014\u2014',
    enSymbol: '"" / \'\'',
    cnName: '英美引号差异',
    enName: 'British vs American',
    description: '英式和美式英语在引号使用上有显著差异。',
    keyDifferences: [
      '美式：外双内单',
      '英式：外单内双',
      '美式逗号句号在引号内',
      '英式逗号句号在引号外'
    ],
    cnExamples: [
      { text: '\u7f8e\u5f0f\uff1a\u4ed6\u8bf4\uff1a"\u6211\u77e5\u9053\u4ec0\u4e48\u662f\u2018\u7231\u2019\u3002"', explanation: '\u5916\u53cc\u5185\u5355' }
    ],
    enExamples: [
      { text: 'She said, "I know what \'love\' means."', explanation: 'American: double outside' },
      { text: "She said, 'I know what \"love\" means.'", explanation: 'British: single outside' },
      { text: '"Hello," she said.', explanation: 'American: comma inside' },
      { text: "'Hello', she said.", explanation: 'British: comma outside' }
    ],
    commonMistakes: [
      { wrong: "She said 'Hello.'", correct: 'She said, "Hello."', reason: '美式外引号用双引号' }
    ],
    quickTip: '\u7f8e\u5f0f\u5916\u53cc\u5185\u5355\uff0c\u82f1\u5f0f\u5916\u5355\u5185\u53cc'
  }
];

export const CLAUSE_RULES: ClauseRule[] = [
  {
    type: '\u5b9a\u8bed\u4ece\u53e5',
    enType: 'Relative Clause',
    description: '\u4fee\u9970\u540d\u8bcd\u6216\u4ee3\u8bcd\u7684\u4ece\u53e5\uff0c\u5206\u4e3a\u9650\u5236\u6027\u548c\u975e\u9650\u5236\u6027\u3002',
    commaRule: '\u9650\u5236\u6027\uff1a\u4e0d\u7528\u9017\u53f7\uff1b\u975e\u9650\u5236\u6027\uff1a\u524d\u540e\u90fd\u7528\u9017\u53f7\u3002',
    examples: [
      { sentence: 'The book that is on the table is mine.', explanation: '\u9650\u5236\u6027\uff1a\u6ca1\u6709\u9017\u53f7\u3002\u6307\u684c\u4e0a\u90a3\u672c\u4e66\u3002', translation: '\u684c\u4e0a\u90a3\u672c\u4e66\u662f\u6211\u7684\u3002' },
      { sentence: 'My brother, who lives in Beijing, is a doctor.', explanation: '\u975e\u9650\u5236\u6027\uff1a\u6709\u9017\u53f7\u3002\u53ea\u6709\u4e00\u4e2a\u54e5\u54e5\u3002', translation: '\u6211\u54e5\u54e5\u662f\u533b\u751f\uff0c\u4ed6\u4f4f\u5728\u5317\u4eac\u3002' },
      { sentence: 'My brother who lives in Beijing is a doctor.', explanation: '\u9650\u5236\u6027\uff1a\u6709\u591a\u4e2a\u54e5\u54e5\u3002', translation: '\u6211\u4f4f\u5728\u5317\u4eac\u7684\u90a3\u4e2a\u54e5\u54e5\u662f\u533b\u751f\u3002' }
    ],
    commonErrors: [
      { wrong: 'The book, that is on the table, is mine.', correct: 'The book, which is on the table, is mine.', reason: 'that\u4e0d\u80fd\u7528\u4e8e\u975e\u9650\u5236\u6027\u4ece\u53e5' }
    ]
  },
  {
    type: '\u72b6\u8bed\u4ece\u53e5',
    enType: 'Adverbial Clause',
    description: '\u4fee\u9970\u52a8\u8bcd\u3001\u5f62\u5bb9\u8bcd\u6216\u6574\u4e2a\u53e5\u5b50\u7684\u4ece\u53e5\u3002',
    commaRule: '\u4ece\u53e5\u5728\u4e3b\u53e5\u4e4b\u524d\u2192\u9017\u53f7\uff1b\u4e4b\u540e\u2192\u901a\u5e38\u4e0d\u52a0\u9017\u53f7\u3002',
    examples: [
      { sentence: 'When I was young, I lived in Beijing.', explanation: '\u4ece\u53e5\u5728\u524d\u2192\u9017\u53f7', translation: '\u6211\u5c0f\u7684\u65f6\u5019\uff0c\u4f4f\u5728\u5317\u4eac\u3002' },
      { sentence: 'I lived in Beijing when I was young.', explanation: '\u4ece\u53e5\u5728\u540e\u2192\u65e0\u9017\u53f7', translation: '\u6211\u4f4f\u5728\u5317\u4eac\uff0c\u5f53\u6211\u5e74\u8f7b\u7684\u65f6\u5019\u3002' }
    ],
    commonErrors: [
      { wrong: 'When I was young I lived in Beijing.', correct: 'When I was young, I lived in Beijing.', reason: '\u4ece\u53e5\u5728\u53e5\u9996\u65f6\u5fc5\u987b\u52a0\u9017\u53f7' }
    ]
  },
  {
    type: '\u540d\u8bcd\u6027\u4ece\u53e5',
    enType: 'Noun Clause',
    description: '\u5728\u53e5\u4e2d\u8d77\u540d\u8bcd\u4f5c\u7528\u7684\u4ece\u53e5\u3002',
    commaRule: '\u540d\u8bcd\u6027\u4ece\u53e5\u901a\u5e38\u4e0d\u7528\u9017\u53f7\u3002',
    examples: [
      { sentence: 'I believe that he will come.', explanation: '\u5bbe\u8bed\u4ece\u53e5\u524d\u4e0d\u52a0\u9017\u53f7', translation: '\u6211\u76f8\u4fe1\u4ed6\u4f1a\u6765\u3002' }
    ],
    commonErrors: [
      { wrong: 'I believe, that he will come.', correct: 'I believe that he will come.', reason: '\u5bbe\u8bed\u4ece\u53e5that\u524d\u4e0d\u52a0\u9017\u53f7' }
    ]
  },
  {
    type: '\u590d\u5408\u53e5\u6807\u70b9',
    enType: 'Compound Sentence',
    description: '\u4e24\u4e2a\u6216\u591a\u4e2a\u72ec\u7acb\u5b50\u53e5\u901a\u8fc7FANBOYS\u8fde\u63a5\u3002',
    commaRule: 'FANBOYS\u8fde\u63a5\u4e24\u4e2a\u72ec\u7acb\u5b50\u53e5\u65f6\uff0c\u524d\u9762\u52a0\u9017\u53f7\u3002',
    examples: [
      { sentence: 'I like tea, and she likes coffee.', explanation: 'And\u8fde\u63a5\u4e24\u4e2a\u72ec\u7acb\u53e5', translation: '\u6211\u559c\u6b22\u8336\uff0c\u5979\u559c\u6b22\u5496\u5561\u3002' }
    ],
    commonErrors: [
      { wrong: 'I like tea and she likes coffee.', correct: 'I like tea, and she likes coffee.', reason: 'FANBOYS\u8fde\u63a5\u72ec\u7acb\u53e5\u65f6\u524d\u9762\u5fc5\u987b\u52a0\u9017\u53f7' }
    ]
  },
  {
    type: '\u590d\u6742\u53e5\u6807\u70b9',
    enType: 'Complex Sentence',
    description: '\u5305\u542b\u4e00\u4e2a\u72ec\u7acb\u5b50\u53e5\u548c\u4e00\u4e2a\u6216\u591a\u4e2a\u4ece\u5c5e\u5b50\u53e5\u3002',
    commaRule: '\u4ece\u5c5e\u5b50\u53e5\u5728\u524d\u2192\u9017\u53f7\uff1b\u5728\u540e\u2192\u901a\u5e38\u65e0\u9017\u53f7\u3002',
    examples: [
      { sentence: 'Because she studied hard, she passed.', explanation: '\u4ece\u53e5\u5728\u524d\u2192\u9017\u53f7', translation: '\u56e0\u4e3a\u5979\u52aa\u529b\u5b66\u4e60\uff0c\u5979\u901a\u8fc7\u4e86\u3002' }
    ],
    commonErrors: [
      { wrong: 'Because she studied hard she passed.', correct: 'Because she studied hard, she passed.', reason: '\u4ece\u53e5\u5728\u53e5\u9996\u65f6\u5fc5\u987b\u52a0\u9017\u53f7' }
    ]
  },
  {
    type: '\u590d\u5408\u590d\u6742\u53e5',
    enType: 'Compound-Complex',
    description: '\u5305\u542b\u4e24\u4e2a\u6216\u591a\u4e2a\u72ec\u7acb\u5b50\u53e5\u548c\u81f3\u5c11\u4e00\u4e2a\u4ece\u5c5e\u5b50\u53e5\u3002',
    commaRule: '\u7ed3\u5408\u4e24\u79cd\u89c4\u5219\uff1a\u4ece\u53e5\u540e\u9017\u53f7 + FANBOYS\u524d\u9017\u53f7\u3002',
    examples: [
      { sentence: 'Although it was raining, we went out, and we had fun.', explanation: 'Although\u4ece\u53e5\uff08\u9017\u53f7\uff09+ we went out\uff08\u72ec\u7acb\u53e5\uff09+ ,and\uff08FANBOYS\u9017\u53f7\uff09', translation: '\u5c3d\u7ba1\u4e0b\u96e8\u4e86\uff0c\u6211\u4eec\u8fd8\u662f\u51fa\u53bb\u4e86\uff0c\u800c\u4e14\u73a9\u5f97\u5f88\u5f00\u5fc3\u3002' }
    ],
    commonErrors: [
      { wrong: 'Although it was raining we went out and we had fun.', correct: 'Although it was raining, we went out, and we had fun.', reason: '\u9700\u8981\u6240\u6709\u9017\u53f7\uff1a\u4ece\u53e5\u540e\u4e00\u4e2a\uff0cFANBOYS\u524d\u4e00\u4e2a' }
    ]
  }
];

export const GOLDEN_RULES = [
  { title: '\u9ec4\u91d1\u6cd5\u52191\uff1a\u975e\u9650\u5236\u6027\u4ece\u53e5 = \u9017\u53f7\u5939\u5fc3\u997c\u5e72', rule: '\u975e\u9650\u5236\u6027\u5b9a\u8bed\u4ece\u53e5\u524d\u540e\u90fd\u6709\u9017\u53f7\uff0c\u50cf\u5939\u5fc3\u997c\u5e72\u4e00\u6837\u5939\u4f4f\u4ece\u53e5\u3002', example: 'My brother, who lives in Beijing, is a doctor.', note: '\u53ea\u6709\u4e00\u4e2a\u54e5\u54e5\u2192\u5fc5\u987b\u7528\u9017\u53f7' },
  { title: '\u9ec4\u91d1\u6cd5\u52192\uff1a\u72b6\u8bed\u4ece\u53e5\u524d\u7f6e\u5fc5\u52a0\u9017\u53f7', rule: 'When/If/Because/Although\u7b49\u5f15\u5bfc\u7684\u4ece\u53e5\u5728\u53e5\u9996\u65f6\uff0c\u540e\u9762\u5fc5\u987b\u6709\u9017\u53f7', example: 'When I was young, I lived in Shanghai.', note: '\u4ece\u53e5\u5728\u53e5\u5c3e\u2192\u901a\u5e38\u4e0d\u52a0\u9017\u53f7' },
  { title: '\u9ec4\u91d1\u6cd5\u52193\uff1aFANBOYS\u524d\u52a0\u9017\u53f7', rule: 'For, And, Nor, But, Or, Yet, So\u8fde\u63a5\u4e24\u4e2a\u72ec\u7acb\u53e5\u65f6\uff0c\u524d\u9762\u52a0\u9017\u53f7', example: 'I was tired, so I went to bed early.', note: '\u8fde\u63a5\u8bcd\u8bed\u65f6\u4e0d\u52a0\u9017\u53f7' },
  { title: '\u9ec4\u91d1\u6cd5\u52194\uff1a\u82f1\u6587\u6ca1\u6709\u987f\u53f7', rule: '\u4e2d\u6587\u7528\u3001\u7684\u5730\u65b9\uff0c\u82f1\u6587\u4e00\u5f8b\u7528\u9017\u53f7', example: '\u82f9\u679c\u3001\u9999\u8549\u3001\u6a59\u5b50 \u2192 apples, bananas, and oranges', note: '\u8fd9\u662f\u4e2d\u82f1\u6807\u70b9\u6700\u5927\u5dee\u5f02' },
  { title: '\u9ec4\u91d1\u6cd5\u52195\uff1a\u95f4\u63a5\u7591\u95ee\u53e5\u4e0d\u7528\u95ee\u53f7', rule: 'She asked if... / I wonder whether... \u540e\u9762\u4e0d\u52a0\u95ee\u53f7', example: 'She asked if I liked English.\uff08\u53e5\u53f7\uff09', note: '\u76f4\u63a5\u7591\u95ee\u53e5\u624d\u7528\u95ee\u53f7' },
  { title: '\u9ec4\u91d1\u6cd5\u52196\uff1a\u5f15\u8bed\u524d\u7528\u9017\u53f7', rule: '\u82f1\u6587\u4e2d\u5f15\u51fa\u76f4\u63a5\u5f15\u8bed\u7528\u9017\u53f7\uff0c\u4e0d\u662f\u5192\u53f7', example: 'He said, "I like English."', note: '\u4e2d\u6587\u4e60\u60ef\u7528\u5192\u53f7\uff0c\u82f1\u6587\u7528\u9017\u53f7' },
  { title: '\u9ec4\u91d1\u6cd5\u52197\uff1a\u9017\u53f7\u4e0d\u80fd\u8fde\u63a5\u4e24\u4e2a\u72ec\u7acb\u53e5', rule: '\u4e24\u4e2a\u5b8c\u6574\u53e5\u5b50\u4e0d\u80fd\u7528\u9017\u53f7\u8fde\u63a5', example: 'I like tea. She likes coffee. / I like tea; she likes coffee.', note: '\u6700\u5e38\u89c1\u7684\u5199\u4f5c\u9519\u8bef\u4e4b\u4e00' },
  { title: '\u9ec4\u91d1\u6cd5\u52198\uff1athat\u4e0d\u80fd\u7528\u4e8e\u975e\u9650\u5236\u6027\u4ece\u53e5', rule: '\u9017\u53f7 + that = \u9519\u8bef\uff01\u975e\u9650\u5236\u6027\u4ece\u53e5\u7528which/who', example: 'The book, which is on the table, is mine.', note: '\u9650\u5236\u6027\u53ef\u4ee5\u7528that\uff1aThe book that is on the table is mine.' }
];

export default { PUNCTUATION_RULES, CLAUSE_RULES, GOLDEN_RULES };
