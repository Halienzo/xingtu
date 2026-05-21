// ============================================
// 句型骨架库 (SentencePatterns)
// 基于 British Council Clause Structure & Verb Patterns
// ============================================

export interface PatternSlot {
  role: string;
  label: string;
  accepts: string[];
  required: boolean;
  description: string;
}

export interface PatternExample {
  en: string;
  cn: string;
  slots: { text: string; role: string }[];
}

export interface SentencePattern {
  code: string;
  label: string;
  labelEn: string;
  structure: string;
  verbType: string;
  verbTypeCn: string;
  slots: PatternSlot[];
  examples: PatternExample[];
  commonVerbs: string[];
  ceferLevel: string;
  traps: { title: string; wrong: string; right: string }[];
}

export const sentencePatterns: SentencePattern[] = [
  {
    code: 'SV',
    label: '主谓',
    labelEn: 'Subject + Verb',
    structure: 'S + V',
    verbType: 'intransitive',
    verbTypeCn: '不及物动词',
    ceferLevel: 'A1',
    slots: [
      { role: 'S', label: '主语', accepts: ['名词', '代词', '动名词', '名词性从句'], required: true, description: '动作的发出者' },
      { role: 'V', label: '谓语', accepts: ['不及物动词'], required: true, description: '动词，后面不接宾语' },
    ],
    examples: [
      {
        en: 'She laughs.',
        cn: '她笑了。',
        slots: [
          { text: 'She', role: 'S' },
          { text: 'laughs', role: 'V' },
        ],
      },
      {
        en: 'The sun rises.',
        cn: '太阳升起。',
        slots: [
          { text: 'The sun', role: 'S' },
          { text: 'rises', role: 'V' },
        ],
      },
    ],
    commonVerbs: ['arrive', 'sleep', 'happen', 'rise', 'fall', 'run', 'cry', 'work', 'exist', 'disappear'],
    traps: [
      {
        title: '不及物动词不能直接加宾语',
        wrong: 'She arrived the airport.',
        right: 'She arrived at the airport.',
      },
    ],
  },
  {
    code: 'SVC',
    label: '主系表',
    labelEn: 'Subject + Verb + Complement',
    structure: 'S + V + C',
    verbType: 'copular',
    verbTypeCn: '系动词',
    ceferLevel: 'A1',
    slots: [
      { role: 'S', label: '主语', accepts: ['名词', '代词', '动名词', '名词性从句'], required: true, description: '被描述的主体' },
      { role: 'V', label: '系动词', accepts: ['系动词(be, seem, become, look等)'], required: true, description: '连接主语和表语' },
      { role: 'C', label: '表语', accepts: ['名词', '形容词', '介词短语', '副词', '不定式', '从句'], required: true, description: '说明主语的身份/状态/特征' },
    ],
    examples: [
      {
        en: 'He is a doctor.',
        cn: '他是医生。',
        slots: [
          { text: 'He', role: 'S' },
          { text: 'is', role: 'V' },
          { text: 'a doctor', role: 'C' },
        ],
      },
      {
        en: 'She looks happy.',
        cn: '她看起来很高兴。',
        slots: [
          { text: 'She', role: 'S' },
          { text: 'looks', role: 'V' },
          { text: 'happy', role: 'C' },
        ],
      },
    ],
    commonVerbs: ['be', 'seem', 'become', 'look', 'feel', 'sound', 'taste', 'smell', 'appear', 'remain'],
    traps: [
      {
        title: '系动词后接形容词而非副词',
        wrong: 'He looks happily.',
        right: 'He looks happy.',
      },
    ],
  },
  {
    code: 'SVA',
    label: '主系状',
    labelEn: 'Subject + Verb + Adverbial',
    structure: 'S + V + A',
    verbType: 'copular',
    verbTypeCn: '系动词',
    ceferLevel: 'A2',
    slots: [
      { role: 'S', label: '主语', accepts: ['名词', '代词', '动名词', '名词性从句'], required: true, description: '被描述的主体' },
      { role: 'V', label: '系动词', accepts: ['系动词(be, seem, become等)'], required: true, description: '连接主语和地点/时间状语' },
      { role: 'A', label: '状语', accepts: ['介词短语', '副词', '名词(表时间/地点)'], required: true, description: '说明主语的位置或时间' },
    ],
    examples: [
      {
        en: 'The book is on the table.',
        cn: '书在桌上。',
        slots: [
          { text: 'The book', role: 'S' },
          { text: 'is', role: 'V' },
          { text: 'on the table', role: 'A' },
        ],
      },
      {
        en: 'The meeting is tomorrow.',
        cn: '会议在明天。',
        slots: [
          { text: 'The meeting', role: 'S' },
          { text: 'is', role: 'V' },
          { text: 'tomorrow', role: 'A' },
        ],
      },
    ],
    commonVerbs: ['be', 'seem', 'appear', 'remain'],
    traps: [
      {
        title: 'SVA 的状语表示地点/时间，不是表语',
        wrong: 'The book is on the table happily. (副词修饰系动词无意义)',
        right: 'The book is on the table.',
      },
    ],
  },
  {
    code: 'SVO',
    label: '主谓宾',
    labelEn: 'Subject + Verb + Object',
    structure: 'S + V + O',
    verbType: 'monotransitive',
    verbTypeCn: '单及物动词',
    ceferLevel: 'A1',
    slots: [
      { role: 'S', label: '主语', accepts: ['名词', '代词', '动名词', '名词性从句'], required: true, description: '动作的发出者' },
      { role: 'V', label: '谓语', accepts: ['单及物动词'], required: true, description: '动词，后面必须接一个宾语' },
      { role: 'O', label: '宾语', accepts: ['名词', '代词', '不定式', '动名词', '从句'], required: true, description: '动作的承受者' },
    ],
    examples: [
      {
        en: 'She reads books.',
        cn: '她读书。',
        slots: [
          { text: 'She', role: 'S' },
          { text: 'reads', role: 'V' },
          { text: 'books', role: 'O' },
        ],
      },
      {
        en: 'I want to leave.',
        cn: '我想离开。',
        slots: [
          { text: 'I', role: 'S' },
          { text: 'want', role: 'V' },
          { text: 'to leave', role: 'O' },
        ],
      },
    ],
    commonVerbs: ['read', 'write', 'eat', 'drink', 'love', 'see', 'want', 'need', 'make', 'take', 'give(单宾)', 'find'],
    traps: [
      {
        title: '及物动词不能没有宾语',
        wrong: 'She reads every day. (如果read是及物用法，需要宾语)',
        right: 'She reads books every day.',
      },
    ],
  },
  {
    code: 'SVOO',
    label: '主谓双宾',
    labelEn: 'Subject + Verb + Indirect Object + Direct Object',
    structure: 'S + V + IO + DO',
    verbType: 'ditransitive',
    verbTypeCn: '双及物动词',
    ceferLevel: 'A2',
    slots: [
      { role: 'S', label: '主语', accepts: ['名词', '代词', '动名词', '名词性从句'], required: true, description: '动作的发出者' },
      { role: 'V', label: '谓语', accepts: ['双及物动词'], required: true, description: '动词，后面接两个宾语' },
      { role: 'IO', label: '间接宾语', accepts: ['名词', '代词'], required: true, description: '动作的对象（人）' },
      { role: 'DO', label: '直接宾语', accepts: ['名词', '代词', '从句'], required: true, description: '动作的内容（物）' },
    ],
    examples: [
      {
        en: 'He gave her a book.',
        cn: '他给了她一本书。',
        slots: [
          { text: 'He', role: 'S' },
          { text: 'gave', role: 'V' },
          { text: 'her', role: 'IO' },
          { text: 'a book', role: 'DO' },
        ],
      },
      {
        en: 'She told me a story.',
        cn: '她给我讲了个故事。',
        slots: [
          { text: 'She', role: 'S' },
          { text: 'told', role: 'V' },
          { text: 'me', role: 'IO' },
          { text: 'a story', role: 'DO' },
        ],
      },
    ],
    commonVerbs: ['give', 'send', 'tell', 'show', 'offer', 'bring', 'teach', 'buy', 'pass', 'lend'],
    traps: [
      {
        title: '双宾语可换位，但介词不能丢',
        wrong: 'He gave a book her.',
        right: 'He gave a book to her. / He gave her a book.',
      },
    ],
  },
  {
    code: 'SVOC',
    label: '主谓宾补',
    labelEn: 'Subject + Verb + Object + Object Complement',
    structure: 'S + V + O + C',
    verbType: 'complex-transitive',
    verbTypeCn: '复杂及物动词',
    ceferLevel: 'B1',
    slots: [
      { role: 'S', label: '主语', accepts: ['名词', '代词', '动名词', '名词性从句'], required: true, description: '动作的发出者' },
      { role: 'V', label: '谓语', accepts: ['复杂及物动词'], required: true, description: '动词，后面接宾语+宾补' },
      { role: 'O', label: '宾语', accepts: ['名词', '代词'], required: true, description: '被作用的对象' },
      { role: 'C', label: '宾补', accepts: ['名词', '形容词', '介词短语', '不定式', '现在分词', '过去分词'], required: true, description: '说明宾语的状态/身份/动作' },
    ],
    examples: [
      {
        en: 'The movie made me sad.',
        cn: '这部电影让我难过。',
        slots: [
          { text: 'The movie', role: 'S' },
          { text: 'made', role: 'V' },
          { text: 'me', role: 'O' },
          { text: 'sad', role: 'C' },
        ],
      },
      {
        en: 'We elected him president.',
        cn: '我们选他当总统。',
        slots: [
          { text: 'We', role: 'S' },
          { text: 'elected', role: 'V' },
          { text: 'him', role: 'O' },
          { text: 'president', role: 'C' },
        ],
      },
    ],
    commonVerbs: ['make', 'let', 'have', 'see', 'hear', 'find', 'elect', 'appoint', 'call', 'name', 'keep', 'get'],
    traps: [
      {
        title: '宾补和双宾语的区别',
        wrong: 'I made him a cake. (双宾语) vs I made him happy. (宾补) — 意思完全不同',
        right: 'I made him a cake. (我给他做了个蛋糕) / I made him happy. (我让他开心)',
      },
    ],
  },
  {
    code: 'SVOA',
    label: '主谓宾状',
    labelEn: 'Subject + Verb + Object + Adverbial',
    structure: 'S + V + O + A',
    verbType: 'complex-transitive',
    verbTypeCn: '复杂及物动词',
    ceferLevel: 'B1',
    slots: [
      { role: 'S', label: '主语', accepts: ['名词', '代词', '动名词', '名词性从句'], required: true, description: '动作的发出者' },
      { role: 'V', label: '谓语', accepts: ['复杂及物动词(接宾语+地点状语)'], required: true, description: '表示"放置/移动"类动词' },
      { role: 'O', label: '宾语', accepts: ['名词', '代词'], required: true, description: '被移动/放置的对象' },
      { role: 'A', label: '状语', accepts: ['介词短语', '副词'], required: true, description: '说明位置/方向/方式' },
    ],
    examples: [
      {
        en: 'She put the book on the shelf.',
        cn: '她把书放在架子上。',
        slots: [
          { text: 'She', role: 'S' },
          { text: 'put', role: 'V' },
          { text: 'the book', role: 'O' },
          { text: 'on the shelf', role: 'A' },
        ],
      },
      {
        en: 'He sent the letter by email.',
        cn: '他通过邮件发送了信。',
        slots: [
          { text: 'He', role: 'S' },
          { text: 'sent', role: 'V' },
          { text: 'the letter', role: 'O' },
          { text: 'by email', role: 'A' },
        ],
      },
    ],
    commonVerbs: ['put', 'place', 'send', 'take', 'bring', 'lay', 'set', 'push', 'pull'],
    traps: [
      {
        title: 'SVOA 的动词必须有地点/方式状语',
        wrong: 'She put the book. (缺少地点)',
        right: 'She put the book on the shelf.',
      },
    ],
  },
];

// 辅助函数
export function getPattern(code: string): SentencePattern | undefined {
  return sentencePatterns.find(p => p.code === code);
}

export function getPatternsByLevel(level: string): SentencePattern[] {
  const order = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  const idx = order.indexOf(level);
  if (idx === -1) return [];
  return sentencePatterns.filter(p => order.indexOf(p.ceferLevel) <= idx);
}
