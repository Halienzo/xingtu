// ============================================
// 句子工厂数据 (SentenceFactoryData)
// 拖拽填空的候选词、句型模板、扩展成分
// ============================================

export interface SlotWord {
  text: string;
  pos: string;
  role: string; // S, V, O, C, A
}

export interface PatternTemplate {
  code: string;
  slots: { role: string; label: string; color: string }[];
  examples: { words: SlotWord[]; sentence: string }[];
}

// 七种句型的拖拽模板
export const patternTemplates: PatternTemplate[] = [
  {
    code: 'SV',
    slots: [
      { role: 'S', label: '主语', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { role: 'V', label: '谓语(不及物)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    ],
    examples: [
      { words: [{ text: 'She', pos: 'pron.', role: 'S' }, { text: 'laughed', pos: 'vi.', role: 'V' }], sentence: 'She laughed.' },
      { words: [{ text: 'The sun', pos: 'n.', role: 'S' }, { text: 'rises', pos: 'vi.', role: 'V' }], sentence: 'The sun rises.' },
    ],
  },
  {
    code: 'SVC',
    slots: [
      { role: 'S', label: '主语', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { role: 'V', label: '系动词', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      { role: 'C', label: '表语', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    ],
    examples: [
      { words: [{ text: 'He', pos: 'pron.', role: 'S' }, { text: 'is', pos: 'v.', role: 'V' }, { text: 'a doctor', pos: 'n.', role: 'C' }], sentence: 'He is a doctor.' },
      { words: [{ text: 'She', pos: 'pron.', role: 'S' }, { text: 'looks', pos: 'v.', role: 'V' }, { text: 'happy', pos: 'adj.', role: 'C' }], sentence: 'She looks happy.' },
    ],
  },
  {
    code: 'SVO',
    slots: [
      { role: 'S', label: '主语', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { role: 'V', label: '谓语(及物)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      { role: 'O', label: '宾语', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    ],
    examples: [
      { words: [{ text: 'She', pos: 'pron.', role: 'S' }, { text: 'reads', pos: 'vt.', role: 'V' }, { text: 'books', pos: 'n.', role: 'O' }], sentence: 'She reads books.' },
      { words: [{ text: 'I', pos: 'pron.', role: 'S' }, { text: 'love', pos: 'vt.', role: 'V' }, { text: 'music', pos: 'n.', role: 'O' }], sentence: 'I love music.' },
    ],
  },
  {
    code: 'SVOO',
    slots: [
      { role: 'S', label: '主语', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { role: 'V', label: '谓语(双及物)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      { role: 'IO', label: '间接宾语', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      { role: 'DO', label: '直接宾语', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
    ],
    examples: [
      { words: [{ text: 'He', pos: 'pron.', role: 'S' }, { text: 'gave', pos: 'vt.', role: 'V' }, { text: 'her', pos: 'pron.', role: 'IO' }, { text: 'a book', pos: 'n.', role: 'DO' }], sentence: 'He gave her a book.' },
    ],
  },
  {
    code: 'SVOC',
    slots: [
      { role: 'S', label: '主语', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
      { role: 'V', label: '谓语(复杂及物)', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
      { role: 'O', label: '宾语', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
      { role: 'C', label: '宾补', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    ],
    examples: [
      { words: [{ text: 'The movie', pos: 'n.', role: 'S' }, { text: 'made', pos: 'vt.', role: 'V' }, { text: 'me', pos: 'pron.', role: 'O' }, { text: 'sad', pos: 'adj.', role: 'C' }], sentence: 'The movie made me sad.' },
    ],
  },
];

// 拖拽候选词池
export const wordPool: SlotWord[] = [
  // 主语
  { text: 'She', pos: 'pron.', role: 'S' },
  { text: 'He', pos: 'pron.', role: 'S' },
  { text: 'The sun', pos: 'n.', role: 'S' },
  { text: 'The movie', pos: 'n.', role: 'S' },
  { text: 'I', pos: 'pron.', role: 'S' },
  { text: 'They', pos: 'pron.', role: 'S' },
  { text: 'My mother', pos: 'n.', role: 'S' },
  { text: 'The teacher', pos: 'n.', role: 'S' },
  { text: 'My father', pos: 'n.', role: 'S' },
  { text: 'The dog', pos: 'n.', role: 'S' },
  { text: 'My friend', pos: 'n.', role: 'S' },
  { text: 'The students', pos: 'n.', role: 'S' },
  { text: 'The doctor', pos: 'n.', role: 'S' },
  { text: 'The singer', pos: 'n.', role: 'S' },
  { text: 'The writer', pos: 'n.', role: 'S' },
  { text: 'The children', pos: 'n.', role: 'S' },
  { text: 'The team', pos: 'n.', role: 'S' },
  { text: 'The girl', pos: 'n.', role: 'S' },
  { text: 'The boy', pos: 'n.', role: 'S' },
  { text: 'The bird', pos: 'n.', role: 'S' },
  { text: 'The cat', pos: 'n.', role: 'S' },
  { text: 'The old man', pos: 'n.', role: 'S' },
  { text: 'The nurse', pos: 'n.', role: 'S' },
  { text: 'The driver', pos: 'n.', role: 'S' },
  { text: 'The artist', pos: 'n.', role: 'S' },
  { text: 'The scientist', pos: 'n.', role: 'S' },
  { text: 'The baker', pos: 'n.', role: 'S' },
  { text: 'The musician', pos: 'n.', role: 'S' },
  // 谓语
  { text: 'laughed', pos: 'vi.', role: 'V' },
  { text: 'rises', pos: 'vi.', role: 'V' },
  { text: 'is', pos: 'v.', role: 'V' },
  { text: 'looks', pos: 'v.', role: 'V' },
  { text: 'reads', pos: 'vt.', role: 'V' },
  { text: 'love', pos: 'vt.', role: 'V' },
  { text: 'gave', pos: 'vt.', role: 'V' },
  { text: 'made', pos: 'vt.', role: 'V' },
  { text: 'told', pos: 'vt.', role: 'V' },
  { text: 'found', pos: 'vt.', role: 'V' },
  { text: 'bought', pos: 'vt.', role: 'V' },
  { text: 'sleeps', pos: 'vi.', role: 'V' },
  { text: 'walks', pos: 'vi.', role: 'V' },
  { text: 'talks', pos: 'vi.', role: 'V' },
  { text: 'cries', pos: 'vi.', role: 'V' },
  { text: 'smiles', pos: 'vi.', role: 'V' },
  { text: 'runs', pos: 'vi.', role: 'V' },
  { text: 'swims', pos: 'vi.', role: 'V' },
  { text: 'dances', pos: 'vi.', role: 'V' },
  { text: 'sits', pos: 'vi.', role: 'V' },
  { text: 'stands', pos: 'vi.', role: 'V' },
  { text: 'eats', pos: 'vt.', role: 'V' },
  { text: 'drinks', pos: 'vt.', role: 'V' },
  { text: 'writes', pos: 'vt.', role: 'V' },
  { text: 'cooks', pos: 'vt.', role: 'V' },
  { text: 'cleans', pos: 'vt.', role: 'V' },
  { text: 'opens', pos: 'vt.', role: 'V' },
  { text: 'closes', pos: 'vt.', role: 'V' },
  { text: 'sends', pos: 'vt.', role: 'V' },
  { text: 'shows', pos: 'vt.', role: 'V' },
  { text: 'teaches', pos: 'vt.', role: 'V' },
  { text: 'catches', pos: 'vt.', role: 'V' },
  { text: 'draws', pos: 'vt.', role: 'V' },
  { text: 'builds', pos: 'vt.', role: 'V' },
  { text: 'fixes', pos: 'vt.', role: 'V' },
  { text: 'throws', pos: 'vt.', role: 'V' },
  { text: 'seems', pos: 'v.', role: 'V' },
  { text: 'feels', pos: 'v.', role: 'V' },
  { text: 'becomes', pos: 'v.', role: 'V' },
  { text: 'appears', pos: 'v.', role: 'V' },
  { text: 'sounds', pos: 'v.', role: 'V' },
  // 宾语
  { text: 'books', pos: 'n.', role: 'O' },
  { text: 'music', pos: 'n.', role: 'O' },
  { text: 'her', pos: 'pron.', role: 'O' },
  { text: 'me', pos: 'pron.', role: 'O' },
  { text: 'him', pos: 'pron.', role: 'O' },
  { text: 'a book', pos: 'n.', role: 'O' },
  { text: 'a story', pos: 'n.', role: 'O' },
  { text: 'the door', pos: 'n.', role: 'O' },
  { text: 'a letter', pos: 'n.', role: 'O' },
  { text: 'the newspaper', pos: 'n.', role: 'O' },
  { text: 'a cake', pos: 'n.', role: 'O' },
  { text: 'the window', pos: 'n.', role: 'O' },
  { text: 'a gift', pos: 'n.', role: 'O' },
  { text: 'a picture', pos: 'n.', role: 'O' },
  { text: 'the homework', pos: 'n.', role: 'O' },
  { text: 'a question', pos: 'n.', role: 'O' },
  { text: 'the answer', pos: 'n.', role: 'O' },
  { text: 'a song', pos: 'n.', role: 'O' },
  { text: 'the phone', pos: 'n.', role: 'O' },
  { text: 'a message', pos: 'n.', role: 'O' },
  { text: 'the bill', pos: 'n.', role: 'O' },
  { text: 'a ticket', pos: 'n.', role: 'O' },
  { text: 'the key', pos: 'n.', role: 'O' },
  { text: 'coffee', pos: 'n.', role: 'O' },
  { text: 'tea', pos: 'n.', role: 'O' },
  { text: 'the bus', pos: 'n.', role: 'O' },
  { text: 'a movie', pos: 'n.', role: 'O' },
  { text: 'dinner', pos: 'n.', role: 'O' },
  // 表语/宾补
  { text: 'a doctor', pos: 'n.', role: 'C' },
  { text: 'happy', pos: 'adj.', role: 'C' },
  { text: 'sad', pos: 'adj.', role: 'C' },
  { text: 'angry', pos: 'adj.', role: 'C' },
  { text: 'tired', pos: 'adj.', role: 'C' },
  { text: 'beautiful', pos: 'adj.', role: 'C' },
  { text: 'captain', pos: 'n.', role: 'C' },
  { text: 'sick', pos: 'adj.', role: 'C' },
  { text: 'hungry', pos: 'adj.', role: 'C' },
  { text: 'thirsty', pos: 'adj.', role: 'C' },
  { text: 'busy', pos: 'adj.', role: 'C' },
  { text: 'free', pos: 'adj.', role: 'C' },
  { text: 'lucky', pos: 'adj.', role: 'C' },
  { text: 'proud', pos: 'adj.', role: 'C' },
  { text: 'nervous', pos: 'adj.', role: 'C' },
  { text: 'excited', pos: 'adj.', role: 'C' },
  { text: 'bored', pos: 'adj.', role: 'C' },
  { text: 'a teacher', pos: 'n.', role: 'C' },
  { text: 'a student', pos: 'n.', role: 'C' },
  { text: 'a singer', pos: 'n.', role: 'C' },
  // 间接宾语
  { text: 'her', pos: 'pron.', role: 'IO' },
  { text: 'me', pos: 'pron.', role: 'IO' },
  { text: 'him', pos: 'pron.', role: 'IO' },
  { text: 'us', pos: 'pron.', role: 'IO' },
  { text: 'them', pos: 'pron.', role: 'IO' },
  { text: 'my sister', pos: 'n.', role: 'IO' },
  { text: 'my brother', pos: 'n.', role: 'IO' },
  { text: 'my friend', pos: 'n.', role: 'IO' },
  { text: 'the teacher', pos: 'n.', role: 'IO' },
  { text: 'my parents', pos: 'n.', role: 'IO' },
];

// 句子扩展成分
export interface ExpansionPiece {
  type: 'attribute' | 'adverbial' | 'appositive' | 'clause';
  label: string;
  description: string;
  example: string;
  before?: string; // 插入位置描述
  transform: (sentence: string) => string;
}

export const expansionPieces: ExpansionPiece[] = [
  {
    type: 'attribute',
    label: '添加定语（形容词）',
    description: '在名词前加形容词修饰',
    example: 'The [beautiful] flower blooms.',
    before: '名词前',
    transform: (s) => s.replace(/\b(\w+)\b/, '[beautiful] $1'),
  },
  {
    type: 'attribute',
    label: '添加定语（介词短语）',
    description: '用介词短语修饰名词',
    example: 'The man [in black] left.',
    before: '名词后',
    transform: (s) => s.replace(/(\w+)(?=\s+(?:reads|loves|made|gave|is|looks))/, '$1 [in the room]'),
  },
  {
    type: 'adverbial',
    label: '添加时间状语',
    description: '用介词短语说明时间',
    example: 'She reads books [every morning].',
    before: '句末',
    transform: (s) => s.replace(/\.$/, ' [every morning].'),
  },
  {
    type: 'adverbial',
    label: '添加地点状语',
    description: '用介词短语说明地点',
    example: 'He is a doctor [in Beijing].',
    before: '句末',
    transform: (s) => s.replace(/\.$/, ' [in the library].'),
  },
  {
    type: 'adverbial',
    label: '添加方式状语',
    description: '用副词说明方式',
    example: 'She reads books [carefully].',
    before: '句末',
    transform: (s) => s.replace(/\.$/, ' [carefully].'),
  },
  {
    type: 'clause',
    label: '添加定语从句',
    description: '用从句修饰名词',
    example: 'The book [that she bought] is good.',
    before: '名词后',
    transform: (s) => s.replace(/(\w+)(?=\s+(?:reads|loves|made|gave|is|looks))/, '$1 [that I like]'),
  },
];

// 句型特训题库
export interface PatternDrill {
  id: number;
  pattern: string;
  ceferLevel: string;
  type: 'fill' | 'identify' | 'transform';
  instruction: string;
  sentence: string;
  blanks: { position: number; answer: string; role: string }[];
  options: string[];
  explanation: string;
}

export const patternDrills: PatternDrill[] = [
  {
    id: 1, pattern: 'SV', ceferLevel: 'A1', type: 'fill',
    instruction: '填空完成 SV 句型（主语 + 不及物动词）',
    sentence: '_____ _____.', blanks: [{ position: 0, answer: 'She laughed', role: 'S+V' }],
    options: ['She laughed', 'She a book', 'She is happy', 'She reads'],
    explanation: 'SV 句型只需要主语和不及物动词，不需要宾语。',
  },
  {
    id: 2, pattern: 'SVC', ceferLevel: 'A1', type: 'identify',
    instruction: '标出下面 SVC 句型的表语（Complement）',
    sentence: 'He is a doctor.', blanks: [{ position: 0, answer: 'a doctor', role: 'C' }],
    options: ['He', 'is', 'a doctor'],
    explanation: 'SVC 句型中，系动词后的成分是表语，说明主语的身份或状态。',
  },
  {
    id: 3, pattern: 'SVO', ceferLevel: 'A1', type: 'fill',
    instruction: '选择正确的 SVO 句子',
    sentence: '', blanks: [],
    options: ['She reads books.', 'She reads.', 'She is books.', 'She reads happy.'],
    explanation: 'SVO 句型需要及物动词 + 宾语。reads 是及物动词，必须接宾语。',
  },
  {
    id: 4, pattern: 'SVOO', ceferLevel: 'A2', type: 'identify',
    instruction: '标出间接宾语（Indirect Object）',
    sentence: 'He gave her a book.', blanks: [{ position: 0, answer: 'her', role: 'IO' }],
    options: ['He', 'gave', 'her', 'a book'],
    explanation: 'SVOO 句型中，gave 后面先接间接宾语 her（人），再接直接宾语 a book（物）。',
  },
  {
    id: 5, pattern: 'SVOC', ceferLevel: 'B1', type: 'identify',
    instruction: '标出宾语补足语（Object Complement）',
    sentence: 'The movie made me sad.', blanks: [{ position: 0, answer: 'sad', role: 'OC' }],
    options: ['The movie', 'made', 'me', 'sad'],
    explanation: 'SVOC 句型中，made 后面接宾语 me 和宾补 sad。宾补说明宾语的状态。',
  },
  {
    id: 6, pattern: 'SVA', ceferLevel: 'A2', type: 'fill',
    instruction: '填空完成 SVA 句型（主语 + 系动词 + 状语）',
    sentence: 'The meeting _____ _____.', blanks: [{ position: 0, answer: 'is tomorrow', role: 'V+A' }],
    options: ['is tomorrow', 'is happy', 'reads books', 'gave her'],
    explanation: 'SVA 句型中，系动词后接地点或时间状语。',
  },
];
