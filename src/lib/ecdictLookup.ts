// ============================================
// ECDICT 按需查询模块
// 从分块索引中按需加载词条，转换为 WordPosProfile
// ============================================

import type { WordPosProfile, WordIdentity } from '../data/wordPosProfiles';
import { autoPriority } from './posDataCleaner';

interface EcdictManifest {
  totalEntries: number;
  chunks: Record<string, { file: string; count: number; bytes: number }>;
}

interface EcdictEntry {
  w: string;
  s: string;
  p?: string;
  t?: string;
  d?: string;
  pos?: string;
  tag?: string;
  bnc?: number | '';
  frq?: number | '';
  forms?: string[];
}

let manifestPromise: Promise<EcdictManifest | null> | null = null;
const chunkCache = new Map<string, EcdictEntry[]>();

/** 加载 manifest */
async function loadManifest(): Promise<EcdictManifest | null> {
  if (manifestPromise) return manifestPromise;
  manifestPromise = fetch('/ecdict/manifest.json')
    .then(r => r.ok ? r.json() : null)
    .catch(() => null);
  return manifestPromise;
}

/** 获取 chunk key（前两个字母） */
function getChunkKey(word: string): string {
  const stripped = word.toLowerCase().replace(/^[^a-z]+/i, '');
  return stripped.slice(0, 2);
}

/** 加载指定 chunk */
async function loadChunk(key: string): Promise<EcdictEntry[]> {
  if (chunkCache.has(key)) return chunkCache.get(key)!;

  const manifest = await loadManifest();
  if (!manifest) return [];

  const chunkInfo = manifest.chunks[key];
  if (!chunkInfo) return [];

  try {
    const res = await fetch(`/${chunkInfo.file}`);
    if (!res.ok) return [];
    const data = await res.json();
    const entries: EcdictEntry[] = data.entries || [];
    chunkCache.set(key, entries);
    return entries;
  } catch {
    return [];
  }
}

/** 从 ECDICT 查找词条 */
async function findEcdictEntry(word: string): Promise<EcdictEntry | undefined> {
  const key = getChunkKey(word);
  const entries = await loadChunk(key);
  const lower = word.toLowerCase();

  // 精确匹配优先
  let entry = entries.find(e => e.w.toLowerCase() === lower);
  if (entry) return entry;

  // 尝试 stripped 匹配
  entry = entries.find(e => e.s.toLowerCase() === lower);
  return entry;
}

/** 将 ECDICT entry 转换为 WordPosProfile */
export async function lookupFromEcdict(word: string): Promise<WordPosProfile | undefined> {
  const entry = await findEcdictEntry(word);
  if (!entry) return undefined;

  const identities: WordIdentity[] = [];

  // 解析词性
  if (entry.pos) {
    const posCodes = entry.pos.split(/[\s\/]+/).filter(Boolean);
    posCodes.forEach((pos, idx) => {
      const cleanPos = normalizePosLabel(pos);
      identities.push({
        pos: cleanPos,
        posCode: normalizePosCode(pos),
        meaning: entry.t ? summarizeTranslation(entry.t, idx) : '（暂无释义）',
        sentenceRoles: inferRoles(cleanPos),
        examples: [],
        collocations: [],
        traps: [],
        priority: autoPriority(entry.t || '', typeof entry.frq === 'number' ? entry.frq : undefined),
        ceferLevel: 'A2',
        hidden: false,
      });
    });
  }

  // 如果没有解析出词性，但有一个释义，创建一个通用身份
  if (identities.length === 0 && entry.t) {
    identities.push({
      pos: 'n.',
      posCode: 'n',
      meaning: summarizeTranslation(entry.t, 0),
      sentenceRoles: ['主语', '宾语', '表语'],
      examples: [],
      collocations: [],
      traps: [],
      priority: 2,
      ceferLevel: 'A2',
      hidden: false,
    });
  }

  if (identities.length === 0) return undefined;

  return {
    word: entry.w,
    phonetic: entry.p ? `/${entry.p}/` : '',
    ceferLevel: 'A2',
    identities,
    wordForms: entry.forms || [],
    notes: entry.d ? [`ECDICT: ${entry.d.slice(0, 100)}`] : [],
  };
}

function normalizePosLabel(pos: string): string {
  const map: Record<string, string> = {
    n: 'n.', v: 'v.', vi: 'vi.', vt: 'vt.',
    adj: 'adj.', adv: 'adv.',
    prep: 'prep.', pron: 'pron.',
    conj: 'conj.', det: 'det.',
    art: 'art.', interj: 'interj.',
  };
  return map[pos.toLowerCase()] || `${pos}.`;
}

function normalizePosCode(pos: string): string {
  const clean = pos.toLowerCase().replace(/\./g, '');
  if (clean.startsWith('vi') || clean.startsWith('vt')) return 'v';
  if (clean.startsWith('n')) return 'n';
  if (clean.startsWith('adj')) return 'adj';
  if (clean.startsWith('adv')) return 'adv';
  if (clean.startsWith('prep')) return 'prep';
  if (clean.startsWith('pron')) return 'pron';
  if (clean.startsWith('conj')) return 'conj';
  if (clean.startsWith('det')) return 'det';
  if (clean.startsWith('art')) return 'art';
  if (clean.startsWith('interj')) return 'interj';
  return clean;
}

function inferRoles(pos: string): string[] {
  const p = pos.toLowerCase();
  if (p.includes('n')) return ['主语', '宾语', '表语'];
  if (p.includes('v')) return ['谓语'];
  if (p.includes('adj')) return ['定语', '表语', '宾补'];
  if (p.includes('adv')) return ['状语'];
  return [];
}

/** 摘要化翻译文本（ECDICT 的翻译字段通常很长） */
function summarizeTranslation(raw: string, index: number): string {
  if (!raw) return '（暂无释义）';
  // 按行分割，取前几个释义
  const lines = raw.split(/[\n\r]/).map(l => l.trim()).filter(Boolean);
  if (lines.length === 0) return '（暂无释义）';

  // 尝试取第 index 个释义，否则取第一个
  const targetLine = lines[index] || lines[0];

  // 清洗：去掉编号、括号内的频率标记等
  const cleaned = targetLine
    .replace(/^\d+\.\s*/, '')
    .replace(/\[[a-z]+\]/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  // 如果太长，截取前50个字符
  return cleaned.length > 50 ? cleaned.slice(0, 50) + '...' : cleaned;
}
