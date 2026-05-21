// ============================================
// 词性知识库 (PosConcepts)
// 基于 Cambridge Grammar Word Classes & Phrase Classes
// ============================================

export interface PosTrap {
  title: string;
  description: string;
  wrongExample: string;
  rightExample: string;
}

export interface PosExample {
  en: string;
  cn: string;
  highlight: string;
}

export interface PosConcept {
  code: string;
  label: string;
  labelEn: string;
  category: 'open' | 'closed';
  ceferLevel: string; // 该词性首次系统学习的CEFR等级
  functions: string[];       // 可承担的句子成分
  canModify: string[];       // 能修饰谁
  canBeModifiedBy: string[]; // 能被谁修饰
  canHead: string[];         // 能作什么短语的 head
  traps: PosTrap[];
  examples: PosExample[];
  icon: string;
  color: string; // tailwind color class
}

export const posConcepts: PosConcept[] = [
  {
    code: 'n',
    label: '名词',
    labelEn: 'Noun',
    category: 'open',
    ceferLevel: 'A1',
    functions: ['主语(S)', '宾语(O)', '表语(C)', '同位语', '介词宾语'],
    canModify: ['无（被修饰）'],
    canBeModifiedBy: ['形容词', '限定词', '数词', '名词(作定语)', '介词短语', '从句'],
    canHead: ['名词短语(NP)'],
    icon: '■',
    color: 'bg-blue-500',
    traps: [
      {
        title: '不可数名词不能加 a/an',
        description: '抽象概念、液体、物质等通常不可数',
        wrongExample: 'I have a homework to do.',
        rightExample: 'I have some homework to do.',
      },
      {
        title: '名词作定语用单数',
        description: '名词修饰另一个名词时通常保持单数',
        wrongExample: 'I bought two shoes stores.',
        rightExample: 'I bought two shoe stores.',
      },
    ],
    examples: [
      { en: 'The **cat** sleeps.', cn: '猫在睡觉。', highlight: 'cat' },
      { en: 'I love **music**.', cn: '我爱音乐。', highlight: 'music' },
      { en: 'She is a **teacher**.', cn: '她是一名老师。', highlight: 'teacher' },
    ],
  },
  {
    code: 'v',
    label: '动词',
    labelEn: 'Verb',
    category: 'open',
    ceferLevel: 'A1',
    functions: ['谓语(V)'],
    canModify: ['无（核心）'],
    canBeModifiedBy: ['副词', '助动词', '情态动词'],
    canHead: ['动词短语(VP)'],
    icon: '▲',
    color: 'bg-emerald-500',
    traps: [
      {
        title: '不及物动词不能直接接宾语',
        description: 'arrive, happen, sleep 等是不及物动词',
        wrongExample: 'She arrived the airport.',
        rightExample: 'She arrived at the airport.',
      },
      {
        title: '系动词后接形容词而非副词',
        description: 'be, seem, become, look 等是系动词',
        wrongExample: 'He looks happily.',
        rightExample: 'He looks happy.',
      },
    ],
    examples: [
      { en: 'She **runs** every day.', cn: '她每天跑步。', highlight: 'runs' },
      { en: 'He **became** angry.', cn: '他生气了。', highlight: 'became' },
      { en: 'They **gave** me a book.', cn: '他们给了我一本书。', highlight: 'gave' },
    ],
  },
  {
    code: 'adj',
    label: '形容词',
    labelEn: 'Adjective',
    category: 'open',
    ceferLevel: 'A1',
    functions: ['定语', '表语(C)', '宾补(OC)'],
    canModify: ['名词'],
    canBeModifiedBy: ['副词(very, quite)', 'more/most', 'as...as'],
    canHead: ['形容词短语(AdjP)'],
    icon: '●',
    color: 'bg-amber-500',
    traps: [
      {
        title: '形容词不能直接修饰动词',
        description: '修饰动词必须用副词',
        wrongExample: 'She sings beautiful.',
        rightExample: 'She sings beautifully.',
      },
      {
        title: '形容词作表语时不能省略系动词',
        description: '中文可以说"她漂亮"，英文必须有系动词',
        wrongExample: 'She beautiful.',
        rightExample: 'She is beautiful.',
      },
    ],
    examples: [
      { en: 'A **beautiful** flower.', cn: '一朵美丽的花。', highlight: 'beautiful' },
      { en: 'He is **tall**.', cn: '他很高。', highlight: 'tall' },
      { en: 'I find it **difficult**.', cn: '我发现这很难。', highlight: 'difficult' },
    ],
  },
  {
    code: 'adv',
    label: '副词',
    labelEn: 'Adverb',
    category: 'open',
    ceferLevel: 'A2',
    functions: ['状语(A)', '修饰形容词/副词'],
    canModify: ['动词', '形容词', '副词', '整句'],
    canBeModifiedBy: ['副词(very, quite)', 'more/most'],
    canHead: ['副词短语(AdvP)'],
    icon: '◆',
    color: 'bg-purple-500',
    traps: [
      {
        title: '形容词和副词同形时易混淆',
        description: 'hard, fast, late 等既是adj也是adv，但大部分词要加-ly',
        wrongExample: 'He works good.',
        rightExample: 'He works well.',
      },
      {
        title: '副词位置影响句意',
        description: '频度副词通常在实义动词前、be动词后',
        wrongExample: 'She is often late. (正确) / She often is late. (别扭)',
        rightExample: 'She is often late. / She often arrives late.',
      },
    ],
    examples: [
      { en: 'He runs **fast**.', cn: '他跑得快。', highlight: 'fast' },
      { en: '**Very** good.', cn: '非常好。', highlight: 'Very' },
      { en: 'She speaks **softly**.', cn: '她轻声说话。', highlight: 'softly' },
    ],
  },
  {
    code: 'prep',
    label: '介词',
    labelEn: 'Preposition',
    category: 'closed',
    ceferLevel: 'A1',
    functions: ['构成介词短语，作定语/状语/补语'],
    canModify: ['无'],
    canBeModifiedBy: ['副词(right here, just before)'],
    canHead: ['介词短语(PrepP)'],
    icon: '→',
    color: 'bg-rose-500',
    traps: [
      {
        title: '介词后必须接名词/代词/动名词',
        description: '介词是"介系"，后面必须有宾语',
        wrongExample: 'I am good at swim.',
        rightExample: 'I am good at swimming.',
      },
      {
        title: '时间介词 in/on/at 混淆',
        description: 'in 接大时间，on 接具体日期，at 接时刻',
        wrongExample: 'I will meet you in Monday.',
        rightExample: 'I will meet you on Monday.',
      },
    ],
    examples: [
      { en: 'The book is **on** the table.', cn: '书在桌上。', highlight: 'on' },
      { en: 'I am interested **in** music.', cn: '我对音乐感兴趣。', highlight: 'in' },
      { en: 'She arrived **at** noon.', cn: '她中午到达。', highlight: 'at' },
    ],
  },
  {
    code: 'pron',
    label: '代词',
    labelEn: 'Pronoun',
    category: 'closed',
    ceferLevel: 'A1',
    functions: ['主语(S)', '宾语(O)', '表语(C)', '定语(物主代词)'],
    canModify: ['无（替代名词）'],
    canBeModifiedBy: ['无'],
    canHead: ['名词短语(NP)'],
    icon: '✦',
    color: 'bg-cyan-500',
    traps: [
      {
        title: '主格和宾格混淆',
        description: '主语用主格，宾语用宾格',
        wrongExample: 'He gave it to she.',
        rightExample: 'He gave it to her.',
      },
      {
        title: '反身代词不能单独作主语',
        description: 'myself, yourself 等不能单独作主语',
        wrongExample: 'Myself went to school.',
        rightExample: 'I went to school by myself.',
      },
    ],
    examples: [
      { en: '**She** loves him.', cn: '她爱他。', highlight: 'She' },
      { en: 'This is **mine**.', cn: '这是我的。', highlight: 'mine' },
      { en: '**Who** did you see?', cn: '你看到了谁？', highlight: 'Who' },
    ],
  },
  {
    code: 'det',
    label: '限定词',
    labelEn: 'Determiner',
    category: 'closed',
    ceferLevel: 'A1',
    functions: ['名词短语的前置修饰'],
    canModify: ['名词'],
    canBeModifiedBy: ['无'],
    canHead: ['无（修饰语）'],
    icon: '◇',
    color: 'bg-teal-500',
    traps: [
      {
        title: '限定词不能单独使用',
        description: '限定词必须修饰名词',
        wrongExample: 'I want this. (作代词用可以，但作限定词时必须接名词)',
        rightExample: 'I want this book.',
      },
      {
        title: 'a/an 后接单数可数名词',
        description: '不可数名词和复数名词不能用 a/an',
        wrongExample: 'I need a advice.',
        rightExample: 'I need some advice.',
      },
    ],
    examples: [
      { en: '**The** book is red.', cn: '这本书是红色的。', highlight: 'The' },
      { en: '**Some** water.', cn: '一些水。', highlight: 'Some' },
      { en: '**My** friend.', cn: '我的朋友。', highlight: 'My' },
    ],
  },
  {
    code: 'conj',
    label: '连词',
    labelEn: 'Conjunction',
    category: 'closed',
    ceferLevel: 'A2',
    functions: ['连接词/短语/从句'],
    canModify: ['无'],
    canBeModifiedBy: ['无'],
    canHead: ['无（连接语）'],
    icon: '∧',
    color: 'bg-indigo-500',
    traps: [
      {
        title: '并列连词连接的成分要对等',
        description: 'and, but, or 连接的成分必须是同类',
        wrongExample: 'She likes swimming and to run.',
        rightExample: 'She likes swimming and running.',
      },
      {
        title: '从属连词引导从句',
        description: 'because, when, if 等引导状语从句',
        wrongExample: 'I was tired. Because I studied hard.',
        rightExample: 'I was tired because I studied hard.',
      },
    ],
    examples: [
      { en: 'Tea **and** coffee.', cn: '茶和咖啡。', highlight: 'and' },
      { en: 'I left **because** it rained.', cn: '我离开了，因为下雨了。', highlight: 'because' },
      { en: '**If** you come, I will be happy.', cn: '如果你来，我会很高兴。', highlight: 'If' },
    ],
  },
  {
    code: 'interj',
    label: '感叹词',
    labelEn: 'Interjection',
    category: 'closed',
    ceferLevel: 'A1',
    functions: ['独立成分，表达情感'],
    canModify: ['无'],
    canBeModifiedBy: ['无'],
    canHead: ['无（独立语）'],
    icon: '!',
    color: 'bg-pink-500',
    traps: [
      {
        title: '感叹词独立于句子结构',
        description: '感叹词不充当句子成分，用逗号或感叹号隔开',
        wrongExample: 'Oh I dont know. (缺少标点)',
        rightExample: 'Oh, I dont know.',
      },
    ],
    examples: [
      { en: '**Oh**, I see!', cn: '哦，我明白了！', highlight: 'Oh' },
      { en: '**Wow**, thats amazing!', cn: '哇，太神奇了！', highlight: 'Wow' },
      { en: '**Ouch**, that hurts!', cn: '哎哟，好痛！', highlight: 'Ouch' },
    ],
  },
];

// 辅助函数：按 code 查找
export function getPosConcept(code: string): PosConcept | undefined {
  return posConcepts.find(p => p.code === code);
}

// 辅助函数：获取 open/closed class
export function getPosByCategory(category: 'open' | 'closed'): PosConcept[] {
  return posConcepts.filter(p => p.category === category);
}
