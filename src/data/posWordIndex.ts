// ============================================
// 词性词汇索引 (PosWordIndex)
// 从 calendarData.json 构建 word -> profile 查找表
// 第二期核心：让任意系统词汇都能生成身份卡
// ============================================
import calendarDataJson from './calendarData.json';
import { cleanseMeaning, autoPriority } from '../lib/posDataCleaner';
import type { WordPosProfile, WordIdentity } from './wordPosProfiles';

// calendarData 类型定义
interface CalendarWord {
  word: string;
  phonetic?: string;
  syllables?: string;
  pos?: string;
  meanings?: string[];
  phrases?: string[];
  example?: string;
  memoryTip?: string;
  posDetails?: {
    pos: string;
    meaning: string;
    example: string;
    exampleCn: string;
  }[];
}

interface CalendarDay {
  day: number;
  date: string;
  words: CalendarWord[];
}

interface SemesterPlan {
  key: string;
  name: string;
  grade: string;
  term: string;
  days: CalendarDay[];
}

// ========== 懒加载全局索引 ==========
let wordProfileMap: Map<string, WordPosProfile> | null = null;
let allWordsList: string[] | null = null;
let indexStats = { totalWords: 0, multiPosWords: 0, posDetailCoverage: 0 };
let indexBuilt = false;

function ensureIndexBuilt() {
  if (indexBuilt) return;
  indexBuilt = true;

  wordProfileMap = new Map<string, WordPosProfile>();
  allWordsList = [];
  const semesters = calendarDataJson as Record<string, SemesterPlan>;
  const seen = new Set<string>();

  Object.values(semesters).forEach(semester => {
    semester.days?.forEach(day => {
      day.words?.forEach((w: CalendarWord) => {
        const key = w.word.trim().toLowerCase();
        if (!key || seen.has(key)) return;
        seen.add(key);
        indexStats.totalWords++;

        // 只处理有 posDetails 的词
        if (w.posDetails && w.posDetails.length > 0) {
          indexStats.posDetailCoverage++;
          if (w.posDetails.length > 1) indexStats.multiPosWords++;

          const profile = buildProfileFromCalendarWord(w);
          wordProfileMap!.set(key, profile);
          allWordsList!.push(w.word);
        }
      });
    });
  });

  console.log(`[PosWordIndex] 索引构建完成：${indexStats.totalWords} 唯一词, ${indexStats.posDetailCoverage} 有posDetails, ${indexStats.multiPosWords} 多词性词`);
}

function buildProfileFromCalendarWord(w: CalendarWord): WordPosProfile {
  const identities: WordIdentity[] = [];

  w.posDetails?.forEach((pd, idx) => {
    // 清洗释义
    const cleaned = cleanseMeaning(pd.meaning);

    identities.push({
      pos: pd.pos,
      posCode: normalizePosCode(pd.pos),
      meaning: cleaned.hidden ? `[已过滤] ${cleaned.reason}` : cleaned.meaning,
      sentenceRoles: inferSentenceRoles(pd.pos),
      examples: pd.example ? [
        { en: pd.example, cn: pd.exampleCn || '' }
      ] : [],
      collocations: w.phrases?.slice(0, 4) || [],
      traps: [],
      priority: autoPriority(cleaned.meaning),
      ceferLevel: inferCefrLevel(w.word, idx),
      hidden: cleaned.hidden,
    });
  });

  return {
    word: w.word,
    phonetic: w.phonetic ? `[${w.phonetic}]` : '',
    ceferLevel: 'A2', // 默认，后续可根据年级映射
    identities,
    wordForms: [],
    notes: w.posDetails && w.posDetails.length > 1
      ? [`该词有 ${w.posDetails.length} 个词性身份`]
      : [],
  };
}

// 标准化 pos code
function normalizePosCode(pos: string): string {
  const clean = pos.toLowerCase().replace(/\./g, '').trim();
  if (clean.includes('n')) return 'n';
  if (clean.includes('v') || clean.includes('vi') || clean.includes('vt')) return 'v';
  if (clean.includes('adj')) return 'adj';
  if (clean.includes('adv')) return 'adv';
  if (clean.includes('prep')) return 'prep';
  if (clean.includes('pron')) return 'pron';
  if (clean.includes('conj')) return 'conj';
  if (clean.includes('det')) return 'det';
  if (clean.includes('art')) return 'art';
  if (clean.includes('interj')) return 'interj';
  if (clean.includes('num')) return 'num';
  return clean;
}

// 推断句子角色
function inferSentenceRoles(pos: string): string[] {
  const p = pos.toLowerCase();
  if (p.includes('n')) return ['主语', '宾语', '表语'];
  if (p.includes('v')) return ['谓语'];
  if (p.includes('adj')) return ['定语', '表语', '宾补'];
  if (p.includes('adv')) return ['状语'];
  if (p.includes('prep')) return ['介词短语'];
  if (p.includes('pron')) return ['主语', '宾语', '表语'];
  if (p.includes('det') || p.includes('art')) return ['限定词'];
  if (p.includes('conj')) return ['连接词'];
  return [];
}

// 推断 CEFR 等级（简化版，后续可优化）
function inferCefrLevel(_word: string, identityIndex: number): string {
  // 身份索引0通常是最常用的，给A1-A2
  if (identityIndex === 0) return 'A1';
  if (identityIndex === 1) return 'A2';
  if (identityIndex === 2) return 'B1';
  return 'B2';
}

// ========== 导出 API ==========

/** 查找词的词性身份卡 */
export function lookupWordProfile(word: string): WordPosProfile | undefined {
  ensureIndexBuilt();
  return wordProfileMap!.get(word.trim().toLowerCase());
}

/** 模糊搜索词汇 */
export function searchWords(query: string, limit = 20): string[] {
  ensureIndexBuilt();
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const results: string[] = [];
  for (const word of allWordsList!) {
    if (word.toLowerCase().includes(q)) {
      results.push(word);
      if (results.length >= limit) break;
    }
  }
  return results;
}

/** 获取统计信息 */
export function getIndexStats() {
  ensureIndexBuilt();
  return { totalWords: indexStats.totalWords, posDetailCoverage: indexStats.posDetailCoverage, multiPosWords: indexStats.multiPosWords };
}

/** 获取所有有posDetails的词列表 */
export function getAllIndexedWords(): string[] {
  ensureIndexBuilt();
  return allWordsList!;
}

/** 获取多词性词列表 */
export function getMultiPosWordList(): string[] {
  ensureIndexBuilt();
  const results: string[] = [];
  for (const [, profile] of wordProfileMap!) {
    if (profile.identities.length > 1) {
      results.push(profile.word);
    }
  }
  return results;
}

/** 同步检查词是否在索引中（用于 UI 快速判断） */
export function hasWordInIndex(word: string): boolean {
  ensureIndexBuilt();
  return wordProfileMap!.has(word.trim().toLowerCase());
}
