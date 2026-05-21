// ============================================
// 单词词性身份卡数据 (WordPosProfiles)
// 样板词：balloon / book / close / fine / act / light / water
// 含CEFR等级标注和数据清洗规则
// ============================================

export interface WordIdentity {
  pos: string;
  posCode: string;
  meaning: string;
  sentenceRoles: string[];
  examples: { en: string; cn: string }[];
  collocations: string[];
  traps: string[];
  priority: number; // 1=初中必会(A1-A2), 2=高中(B1-B2), 3=拓展(C1-C2)
  ceferLevel: string;
  hidden: boolean;
}

export interface WordPosProfile {
  word: string;
  phonetic: string;
  ceferLevel: string; // 整体词汇等级
  identities: WordIdentity[];
  wordForms: string[];
  notes: string[];
}

// ============================================
// 样板词数据（经过清洗和优先级标注）
// ============================================

export const wordPosProfiles: WordPosProfile[] = [
  {
    word: 'balloon',
    phonetic: '/bəˈluːn/',
    ceferLevel: 'A2',
    wordForms: ['balloon', 'balloons', 'ballooned', 'ballooning'],
    notes: ['零派生高频词：同一词形可作名词、动词、形容词'],
    identities: [
      {
        pos: 'n.',
        posCode: 'n',
        meaning: '气球',
        sentenceRoles: ['主语', '宾语', '表语'],
        examples: [
          { en: 'The balloon rose into the sky.', cn: '气球升上了天空。' },
          { en: 'She blew up a red balloon.', cn: '她吹起了一个红气球。' },
          { en: 'The balloon burst with a loud bang.', cn: '气球砰的一声爆了。' },
        ],
        collocations: ['blow up a balloon', 'burst a balloon', 'helium balloon', 'hot-air balloon'],
        traps: ['可数名词，复数加 -s', '不要把 balloon 当动词时和名词混淆'],
        priority: 1,
        ceferLevel: 'A1',
        hidden: false,
      },
      {
        pos: 'vi.',
        posCode: 'v',
        meaning: '膨胀；激增（不及物）',
        sentenceRoles: ['谓语'],
        examples: [
          { en: 'Costs ballooned during the project.', cn: '项目期间成本激增。' },
          { en: 'The deficit has ballooned to $5 billion.', cn: '赤字已膨胀至50亿美元。' },
        ],
        collocations: ['balloon to/into', 'balloon out of control'],
        traps: ['不及物，不能直接接宾语', '主语通常是"数量/成本/债务"类抽象名词，不是人'],
        priority: 2,
        ceferLevel: 'B1',
        hidden: false,
      },
      {
        pos: 'vt.',
        posCode: 'v',
        meaning: '使膨胀；使激增（及物）',
        sentenceRoles: ['谓语'],
        examples: [
          { en: 'The scandal ballooned his debts.', cn: '丑闻使他的债务激增。' },
        ],
        collocations: ['balloon something'],
        traps: ['及物，必须接宾语', '此用法较正式，口语中较少见'],
        priority: 3,
        ceferLevel: 'C1',
        hidden: false,
      },
      {
        pos: 'adj.',
        posCode: 'adj',
        meaning: '气球状的；鼓起的',
        sentenceRoles: ['定语', '表语', '宾补'],
        examples: [
          { en: 'She wore a balloon sleeve.', cn: '她穿着一件灯笼袖。' },
          { en: 'The balloon payment is due next month.', cn: '大额尾款下个月到期。' },
        ],
        collocations: ['balloon sleeve', 'balloon payment', 'balloon skirt'],
        traps: ['常作复合名词的前置修饰语', 'balloon payment 是金融术语，意为"尾款"'],
        priority: 2,
        ceferLevel: 'B2',
        hidden: false,
      },
    ],
  },
  {
    word: 'book',
    phonetic: '/bʊk/',
    ceferLevel: 'A1',
    wordForms: ['book', 'books', 'booked', 'booking'],
    notes: ['最典型的零派生词之一，名词"书"和动词"预订"都是高频用法'],
    identities: [
      {
        pos: 'n.',
        posCode: 'n',
        meaning: '书；书籍；本子',
        sentenceRoles: ['主语', '宾语', '表语'],
        examples: [
          { en: 'I am reading a book.', cn: '我在读一本书。' },
          { en: 'This book is interesting.', cn: '这本书很有趣。' },
          { en: 'She wrote a book about China.', cn: '她写了一本关于中国的书。' },
        ],
        collocations: ['read a book', 'write a book', 'borrow a book', 'by the book'],
        traps: ['可数名词，复数加 -s', 'book 作"本子"讲时也是可数名词'],
        priority: 1,
        ceferLevel: 'A1',
        hidden: false,
      },
      {
        pos: 'vt.',
        posCode: 'v',
        meaning: '预订；预约',
        sentenceRoles: ['谓语'],
        examples: [
          { en: 'I need to book a hotel room.', cn: '我需要预订一个酒店房间。' },
          { en: 'She booked a table for two.', cn: '她预订了一张两人桌。' },
        ],
        collocations: ['book a room', 'book a ticket', 'book a table', 'book in advance'],
        traps: ['美式英语中常用 reserve 代替 book', 'book 的过去式和过去分词都是 booked'],
        priority: 1,
        ceferLevel: 'A2',
        hidden: false,
      },
      {
        pos: 'adj.',
        posCode: 'adj',
        meaning: '书面的；账面的（book 的派生，通常以复合词形式出现）',
        sentenceRoles: ['定语'],
        examples: [
          { en: 'The book value of the company.', cn: '公司的账面价值。' },
        ],
        collocations: ['book value', 'book smart'],
        traps: ['此用法较专业，初中阶段不常见', 'bookish 才是"书呆子气的"标准形容词'],
        priority: 3,
        ceferLevel: 'C1',
        hidden: false,
      },
    ],
  },
  {
    word: 'close',
    phonetic: '/kləʊz/ (v.) /kləʊs/ (adj./adv./n.)',
    ceferLevel: 'A1',
    wordForms: ['close', 'closes', 'closed', 'closing', 'closer', 'closest'],
    notes: ['发音随词性变化：动词 /kləʊz/，形容词/名词 /kləʊs/ — 这是区分词性的重要线索'],
    identities: [
      {
        pos: 'v.',
        posCode: 'v',
        meaning: '关闭；合上；结束',
        sentenceRoles: ['谓语'],
        examples: [
          { en: 'Please close the door.', cn: '请关门。' },
          { en: 'The store closes at 9 p.m.', cn: '商店晚上9点关门。' },
          { en: 'She closed her eyes.', cn: '她闭上了眼睛。' },
        ],
        collocations: ['close the door', 'close a deal', 'close your eyes', 'close down'],
        traps: ['发音 /kləʊz/，注意与形容词 /kləʊs/ 区分', 'close down 是"倒闭"，不是"向下关"'],
        priority: 1,
        ceferLevel: 'A1',
        hidden: false,
      },
      {
        pos: 'adj.',
        posCode: 'adj',
        meaning: '近的；亲密的；仔细的',
        sentenceRoles: ['定语', '表语', '宾补'],
        examples: [
          { en: 'The school is close to my home.', cn: '学校离我家很近。' },
          { en: 'They are close friends.', cn: '他们是亲密的朋友。' },
          { en: 'Keep a close watch on him.', cn: '密切监视他。' },
        ],
        collocations: ['close to', 'close friend', 'close look', 'close call'],
        traps: ['发音 /kləʊs/，注意与动词 /kləʊz/ 区分', 'close to 后接名词/代词，不能接动词原形'],
        priority: 1,
        ceferLevel: 'A2',
        hidden: false,
      },
      {
        pos: 'adv.',
        posCode: 'adv',
        meaning: '接近地；紧密地',
        sentenceRoles: ['状语'],
        examples: [
          { en: 'Come close so I can see you.', cn: '走近点让我能看到你。' },
          { en: 'They live close by.', cn: '他们住在附近。' },
        ],
        collocations: ['close by', 'close up', 'close behind'],
        traps: ['close 作副词时发音也是 /kləʊs/'],
        priority: 2,
        ceferLevel: 'B1',
        hidden: false,
      },
      {
        pos: 'n.',
        posCode: 'n',
        meaning: '结束；终结',
        sentenceRoles: ['主语', '宾语'],
        examples: [
          { en: 'At the close of the meeting...', cn: '在会议结束时……' },
          { en: 'The day came to a close.', cn: '这一天结束了。' },
        ],
        collocations: ['at the close of', 'come to a close', 'draw to a close'],
        traps: ['此用法较正式，常用 end/finish 代替', '发音 /kləʊs/'],
        priority: 2,
        ceferLevel: 'B2',
        hidden: false,
      },
    ],
  },
  {
    word: 'fine',
    phonetic: '/faɪn/',
    ceferLevel: 'A1',
    wordForms: ['fine', 'finer', 'finest', 'fined', 'fining'],
    notes: ['一词多义高频词：从形容词"好的"到名词"罚款"到动词"处以罚款"'],
    identities: [
      {
        pos: 'adj.',
        posCode: 'adj',
        meaning: '好的；健康的；晴朗的；精细的',
        sentenceRoles: ['定语', '表语', '宾补'],
        examples: [
          { en: 'I am fine, thank you.', cn: '我很好，谢谢。' },
          { en: 'It is a fine day today.', cn: '今天天气晴朗。' },
          { en: 'She has fine hair.', cn: '她有细软的头发。' },
        ],
        collocations: ['fine weather', 'fine art', 'fine details', 'fine line'],
        traps: ['回答 How are you? 用 fine 是礼貌但不够热情，日常口语中更常用 good/not bad', 'fine 的比较级和最高级是 finer/finest'],
        priority: 1,
        ceferLevel: 'A1',
        hidden: false,
      },
      {
        pos: 'n.',
        posCode: 'n',
        meaning: '罚款；罚金',
        sentenceRoles: ['主语', '宾语', '表语'],
        examples: [
          { en: 'He had to pay a fine of $100.', cn: '他必须支付100美元罚款。' },
          { en: 'The fine for parking here is high.', cn: '在这里停车的罚款很高。' },
        ],
        collocations: ['pay a fine', 'heavy fine', 'traffic fine'],
        traps: ['可数名词', '不要和形容词用法混淆'],
        priority: 2,
        ceferLevel: 'B1',
        hidden: false,
      },
      {
        pos: 'vt.',
        posCode: 'v',
        meaning: '对……处以罚款',
        sentenceRoles: ['谓语'],
        examples: [
          { en: 'The police fined him for speeding.', cn: '警察因超速对他处以罚款。' },
        ],
        collocations: ['fine somebody for something'],
        traps: ['及物动词，必须接宾语（被罚的人）'],
        priority: 2,
        ceferLevel: 'B1',
        hidden: false,
      },
      {
        pos: 'adv.',
        posCode: 'adv',
        meaning: '很好地；精巧地',
        sentenceRoles: ['状语'],
        examples: [
          { en: 'Cut it fine.', cn: '把它切细。' },
        ],
        collocations: ['cut it fine'],
        traps: ['副词用法较罕见，口语中常用 well 代替'],
        priority: 3,
        ceferLevel: 'C1',
        hidden: false,
      },
    ],
  },
  {
    word: 'act',
    phonetic: '/ækt/',
    ceferLevel: 'A2',
    wordForms: ['act', 'acts', 'acted', 'acting'],
    notes: ['名词"行为"和动词"行动/表演"都是高频用法，注意区分'],
    identities: [
      {
        pos: 'v.',
        posCode: 'v',
        meaning: '行动；表演；起作用',
        sentenceRoles: ['谓语'],
        examples: [
          { en: 'We must act now.', cn: '我们必须立即行动。' },
          { en: 'She acts in many films.', cn: '她在多部电影中演出。' },
          { en: 'The drug acts quickly.', cn: '这种药起效很快。' },
        ],
        collocations: ['act quickly', 'act as', 'act on', 'act out'],
        traps: ['act as 后接名词，表示"充当/作为"', 'act on 表示"按照……行动"'],
        priority: 1,
        ceferLevel: 'A2',
        hidden: false,
      },
      {
        pos: 'n.',
        posCode: 'n',
        meaning: '行为；举动；法案；（戏剧的）幕',
        sentenceRoles: ['主语', '宾语', '表语'],
        examples: [
          { en: 'It was a brave act.', cn: '那是一个勇敢的行为。' },
          { en: 'Act 1, Scene 2.', cn: '第一幕第二场。' },
          { en: 'The act was passed by Congress.', cn: '该法案由国会通过。' },
        ],
        collocations: ['a kind act', 'act of kindness', 'in the act of', 'get ones act together'],
        traps: ['act 作"法案"讲时首字母常大写（Act）', 'an act of God 是"不可抗力"的法律术语'],
        priority: 1,
        ceferLevel: 'A2',
        hidden: false,
      },
    ],
  },
  {
    word: 'light',
    phonetic: '/laɪt/',
    ceferLevel: 'A1',
    wordForms: ['light', 'lights', 'lit/lighted', 'lighting', 'lighter', 'lightest'],
    notes: ['light 的多词性展示了英语零派生的典型特征：名词"光"→动词"点燃"→形容词"轻的/明亮的"'],
    identities: [
      {
        pos: 'n.',
        posCode: 'n',
        meaning: '光；灯；光线',
        sentenceRoles: ['主语', '宾语', '表语'],
        examples: [
          { en: 'The light is too bright.', cn: '光线太亮了。' },
          { en: 'Turn on the light, please.', cn: '请开灯。' },
          { en: 'I prefer natural light.', cn: '我喜欢自然光。' },
        ],
        collocations: ['turn on/off the light', 'natural light', 'traffic light', 'in the light of'],
        traps: ['可数名词（灯）和不可数名词（光）两用', 'in the light of 是"鉴于/考虑到"，不是"在光里"'],
        priority: 1,
        ceferLevel: 'A1',
        hidden: false,
      },
      {
        pos: 'vt.',
        posCode: 'v',
        meaning: '点燃；照亮',
        sentenceRoles: ['谓语'],
        examples: [
          { en: 'She lit the candle.', cn: '她点燃了蜡烛。' },
          { en: 'The room was lighted by candles.', cn: '房间被蜡烛照亮。' },
        ],
        collocations: ['light a candle', 'light a fire', 'light up'],
        traps: ['过去式和过去分词：lit（英式常用）或 lighted（美式常用）', 'light up 可表示"点亮"或"（脸）露出喜色"'],
        priority: 1,
        ceferLevel: 'A2',
        hidden: false,
      },
      {
        pos: 'adj.',
        posCode: 'adj',
        meaning: '轻的；明亮的；浅色的；清淡的',
        sentenceRoles: ['定语', '表语', '宾补'],
        examples: [
          { en: 'This bag is very light.', cn: '这个包很轻。' },
          { en: 'She prefers light colors.', cn: '她喜欢浅色。' },
          { en: 'I would like a light meal.', cn: '我想要一顿清淡的饭。' },
        ],
        collocations: ['light weight', 'light blue', 'light meal', 'light sleeper'],
        traps: ['比较级和最高级：lighter/lightest', '作"轻的"讲时反义词是 heavy，作"明亮的"讲时反义词是 dark'],
        priority: 1,
        ceferLevel: 'A2',
        hidden: false,
      },
      {
        pos: 'adv.',
        posCode: 'adv',
        meaning: '轻地；轻便地（常用于复合词）',
        sentenceRoles: ['状语'],
        examples: [
          { en: 'Travel light.', cn: '轻装出行。' },
        ],
        collocations: ['travel light', 'sleep light'],
        traps: ['副词用法较少见，常与特定动词搭配'],
        priority: 3,
        ceferLevel: 'C1',
        hidden: false,
      },
    ],
  },
  {
    word: 'water',
    phonetic: '/ˈwɔːtə(r)/',
    ceferLevel: 'A1',
    wordForms: ['water', 'waters', 'watered', 'watering'],
    notes: ['不可数名词"水"→及物动词"浇水"，是中国学生最易掌握的零派生之一'],
    identities: [
      {
        pos: 'n.',
        posCode: 'n',
        meaning: '水；水域；海水',
        sentenceRoles: ['主语', '宾语', '表语'],
        examples: [
          { en: 'I need some water.', cn: '我需要一些水。' },
          { en: 'Water is essential for life.', cn: '水对生命至关重要。' },
          { en: 'The waters of the Pacific.', cn: '太平洋的水域。' },
        ],
        collocations: ['drink water', 'hot water', 'fresh water', 'under water'],
        traps: ['通常不可数，但 waters 可表示"大片水域/海域"', 'hot water 可比喻"困境"（in hot water）'],
        priority: 1,
        ceferLevel: 'A1',
        hidden: false,
      },
      {
        pos: 'vt.',
        posCode: 'v',
        meaning: '给……浇水；灌溉',
        sentenceRoles: ['谓语'],
        examples: [
          { en: 'Please water the plants.', cn: '请给植物浇水。' },
          { en: 'He waters the garden every morning.', cn: '他每天早上给花园浇水。' },
        ],
        collocations: ['water the plants', 'water the garden', 'water the flowers'],
        traps: ['及物动词，必须接宾语', '不要和名词用法混淆：I need to water（正确，动词）vs I need water（正确，名词）'],
        priority: 1,
        ceferLevel: 'A2',
        hidden: false,
      },
      {
        pos: 'adj.（派生）',
        posCode: 'adj',
        meaning: '含水的；水状的（watery）',
        sentenceRoles: ['定语', '表语'],
        examples: [
          { en: 'The soup is watery.', cn: '这汤很稀。' },
          { en: 'Her eyes were watery.', cn: '她的眼睛湿润了。' },
        ],
        collocations: ['watery soup', 'watery eyes'],
        traps: ['watery 才是标准形容词形式，不是 water 直接作形容词'],
        priority: 2,
        ceferLevel: 'B1',
        hidden: false,
      },
    ],
  },
];

// 辅助函数
export function getWordProfile(word: string): WordPosProfile | undefined {
  return wordPosProfiles.find(p => p.word.toLowerCase() === word.toLowerCase());
}

export function getAllWords(): string[] {
  return wordPosProfiles.map(p => p.word);
}

export function getWordsByLevel(level: string): WordPosProfile[] {
  const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const idx = order.indexOf(level);
  if (idx === -1) return [];
  return wordPosProfiles.filter(p => order.indexOf(p.ceferLevel) <= idx);
}

export function getMultiPosWords(): WordPosProfile[] {
  return wordPosProfiles.filter(p => p.identities.length > 1);
}

// ====== 第二期：动态索引集成 ======
// 延迟导入避免循环依赖，在调用时才加载索引
let indexModule: typeof import('./posWordIndex') | null = null;

async function getIndexModule() {
  if (!indexModule) {
    indexModule = await import('./posWordIndex');
  }
  return indexModule;
}

/** 查找词性身份卡（硬编码 + 自动生成索引 + ECDICT fallback） */
export async function lookupWordProfile(word: string): Promise<WordPosProfile | undefined> {
  // 1. 优先查硬编码样板数据（质量最高）
  const hardcoded = getWordProfile(word);
  if (hardcoded) return hardcoded;

  // 2. 查自动生成的 calendarData 索引
  const idx = await getIndexModule();
  const indexed = idx.lookupWordProfile(word);
  if (indexed) return indexed;

  // 3. ECDICT 词典兜底（770K+ 词条）
  const { lookupFromEcdict } = await import('../lib/ecdictLookup');
  return lookupFromEcdict(word);
}

/** 同步版本（用于已知在硬编码中的词） */
export function lookupWordProfileSync(word: string): WordPosProfile | undefined {
  const hardcoded = getWordProfile(word);
  if (hardcoded) return hardcoded;
  // 同步版本无法访问异步加载的索引，返回 undefined
  // 调用方应使用异步版本
  return undefined;
}

/** 搜索词汇（返回硬编码 + 索引中的匹配词） */
export async function searchAllWords(query: string, limit = 30): Promise<string[]> {
  const idx = await getIndexModule();
  const indexed = idx.searchWords(query, limit);
  const hardcoded = wordPosProfiles
    .map(p => p.word)
    .filter(w => w.toLowerCase().includes(query.toLowerCase()));
  // 合并去重
  return Array.from(new Set([...hardcoded, ...indexed])).slice(0, limit);
}

/** 获取多词性词总数（硬编码 + 索引） */
export async function getTotalMultiPosStats(): Promise<{ hardcoded: number; indexed: number; total: number }> {
  const idx = await getIndexModule();
  const indexedMulti = idx.getMultiPosWordList();
  return {
    hardcoded: wordPosProfiles.filter(p => p.identities.length > 1).length,
    indexed: indexedMulti.length,
    total: wordPosProfiles.length + idx.getIndexStats().posDetailCoverage,
  };
}
