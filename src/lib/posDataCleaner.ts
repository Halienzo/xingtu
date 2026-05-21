// ============================================
// 词性数据清洗引擎 (PosDataCleaner)
// 清洗规则：防止词典噪声误导学生
// ============================================

// 技术义项黑名单关键词 —— 遇到这些标签的释义默认隐藏
export const TECH_KEYWORDS = [
  'abbr', 'abbreviation',           // 缩写
  'computing', 'computer', 'IT',    // 计算机
  'Unix', 'Linux', 'DOS', 'Bash',   // 系统/命令
  'chemistry', 'physics',           // 过专科学
  'archaic', 'obsolete', 'dated',   // 古旧用法
  'dialect', 'slang', 'vulgar',     // 方言/俚语/粗俗
  'law', 'legal term',              // 法律术语（初中阶段隐藏）
  'medical', 'anatomy',             // 医学术语
  'biblical',                       // 圣经用语
];

// 过难义项标记 —— CEFR C2以上或罕见学术用法
export const ADVANCED_MARKERS = [
  '[formal]', '[literary]', '[technical]',
  '[specialized]', '[rare]', '[poetic]',
];

// 词性标签标准化映射
export const POS_NORMALIZATION: Record<string, string> = {
  'n': 'n.',
  'noun': 'n.',
  'v': 'v.',
  'verb': 'v.',
  'vi': 'vi.',
  'vt': 'vt.',
  'adj': 'adj.',
  'adjective': 'adj.',
  'adv': 'adv.',
  'adverb': 'adv.',
  'prep': 'prep.',
  'preposition': 'prep.',
  'pron': 'pron.',
  'pronoun': 'pron.',
  'conj': 'conj.',
  'conjunction': 'conj.',
  'det': 'det.',
  'determiner': 'det.',
  'interj': 'interj.',
  'interjection': 'interj.',
  'num': 'num.',
  'numeral': 'num.',
  'art': 'art.',
  'article': 'art.',
};

export interface CleanseResult {
  meaning: string;
  hidden: boolean;
  reason: string;
}

/**
 * 清洗单个释义
 * @param raw 原始释义字符串
 * @param pos 词性
 * @returns 清洗结果
 */
export function cleanseMeaning(raw: string, _pos?: string): CleanseResult {
  const lower = raw.toLowerCase();

  // 1. 检查技术义项
  for (const kw of TECH_KEYWORDS) {
    if (lower.includes(kw.toLowerCase())) {
      return {
        meaning: raw,
        hidden: true,
        reason: `技术义项: ${kw}`,
      };
    }
  }

  // 2. 检查过难标记
  for (const marker of ADVANCED_MARKERS) {
    if (lower.includes(marker.toLowerCase())) {
      return {
        meaning: raw,
        hidden: true,
        reason: `高级/专业用法: ${marker}`,
      };
    }
  }

  // 3. 清理括号内的频率/语域标注
  let cleaned = raw
    .replace(/\[\w+\]/g, '')      // [C] [U] [T] [I] 等
    .replace(/\(\w+\)/g, '')      // (formal) (literary) 等
    .replace(/\s+/g, ' ')
    .trim();

  // 4. 如果清理后为空，返回原始
  if (!cleaned) cleaned = raw;

  return {
    meaning: cleaned,
    hidden: false,
    reason: '',
  };
}

/**
 * 批量清洗释义列表
 */
export function cleanseMeanings(rawMeanings: string[], pos?: string): CleanseResult[] {
  return rawMeanings.map(m => cleanseMeaning(m, pos));
}

/**
 * 标准化词性标签
 */
export function normalizePos(pos: string): string {
  const key = pos.toLowerCase().replace(/\./g, '');
  return POS_NORMALIZATION[key] || pos;
}

/**
 * 判断词性是否需要细分 vi/vt
 * 动词身份超过1个时，建议区分及物/不及物
 */
export function shouldSplitVerbTransitivities(
  identities: { posCode: string; meaning: string }[]
): boolean {
  const verbs = identities.filter(i => i.posCode === 'v');
  return verbs.length >= 2;
}

/**
 * 从 ECDICT 原始数据生成清洗后的身份卡
 * （为第二期接入全量数据预留）
 */
export interface EcdictRawEntry {
  w: string;
  p?: string;
  t?: string;
  d?: string;
  pos?: string;
  tag?: string;
  frq?: number | '';
  bnc?: number | '';
}

export function buildProfileFromEcdict(raw: EcdictRawEntry) {
  // 第二期实现：解析 ECDICT 的 pos 和 translation 字段，
  // 应用清洗规则，生成 WordPosProfile
  // 当前版本返回空框架
  return {
    word: raw.w,
    phonetic: raw.p || '',
    ceferLevel: 'A2', // 默认，需根据 frq/bnc 映射
    identities: [] as { pos: string; meaning: string; hidden: boolean; reason: string }[],
    wordForms: [] as string[],
    notes: [] as string[],
  };
}

/**
 * 优先级自动判定（基于释义内容和词频）
 */
export function autoPriority(meaning: string, frequency?: number): number {
  // 频率高 -> 优先级1（初中必会）
  if (frequency && frequency > 5000) return 1;
  if (frequency && frequency > 1000) return 2;

  // 基础含义 -> 优先级1
  const basicWords = ['人', '东西', '做', '去', '来', '好', '大', '小', '说'];
  if (basicWords.some(bw => meaning.includes(bw))) return 1;

  // 抽象/学术含义 -> 优先级3
  const advancedWords = ['哲学', '物理', '化学', '法律', '医学', '术语'];
  if (advancedWords.some(aw => meaning.includes(aw))) return 3;

  return 2; // 默认高中
}

/**
 * 判断两个释义是否应合并
 */
export function shouldMergeMeanings(a: string, b: string): boolean {
  // 简单实现：如果共享50%以上字符或核心词相同
  const aWords = a.split(/[,;，；]/).map(s => s.trim());
  const bWords = b.split(/[,;，；]/).map(s => s.trim());
  const common = aWords.filter(w => bWords.includes(w));
  return common.length > 0;
}
