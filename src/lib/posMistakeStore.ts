// ============================================
// 词性工坊错题本 (PosMistakeStore)
// 独立于主系统 WrongBook，专用于 POS 训练数据
// ============================================

export type PosMistakeType = 'output' | 'detective' | 'drill';

export interface PosMistake {
  id: string;
  type: PosMistakeType;
  timestamp: number;
  word?: string;
  pos?: string;
  patternCode?: string;
  userAnswer: string;
  correctInfo: string;
  score?: number;
  dimensions?: {
    sentencePattern?: number;
    targetWordUsage?: number;
    grammar?: number;
  };
  reviewed: boolean;
  reviewCount: number;
}

const STORAGE_KEY = 'xsc_pos_mistakes_v1';

function loadAll(): PosMistake[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAll(mistakes: PosMistake[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mistakes));
}

/** 保存一条错题 */
export function saveMistake(mistake: Omit<PosMistake, 'id' | 'timestamp' | 'reviewed' | 'reviewCount'>): PosMistake {
  const all = loadAll();
  const entry: PosMistake = {
    ...mistake,
    id: `${mistake.type}_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    timestamp: Date.now(),
    reviewed: false,
    reviewCount: 0,
  };
  // 同一天同类型同词去重
  const today = new Date().toDateString();
  const dup = all.find(m =>
    new Date(m.timestamp).toDateString() === today &&
    m.type === entry.type &&
    m.word === entry.word &&
    m.userAnswer === entry.userAnswer
  );
  if (!dup) {
    all.unshift(entry);
    saveAll(all.slice(0, 200));
  }
  return entry;
}

/** 获取所有错题 */
export function getMistakes(type?: PosMistakeType): PosMistake[] {
  const all = loadAll();
  return type ? all.filter(m => m.type === type) : all;
}

/** 标记已复习 */
export function markReviewed(id: string) {
  const all = loadAll();
  const m = all.find(x => x.id === id);
  if (m) {
    m.reviewed = true;
    m.reviewCount++;
    saveAll(all);
  }
}

/** 获取薄弱点统计 */
export function getWeakPoints(): { label: string; count: number; type: string }[] {
  const all = loadAll().filter(m => !m.reviewed);
  const map = new Map<string, { label: string; count: number; type: string }>();

  all.forEach(m => {
    const key = m.word ? `${m.word} (${m.pos || '?'})` : (m.patternCode || '未知');
    const label = m.word ? `${m.word} ${m.pos || ''}` : `句型 ${m.patternCode || ''}`;
    const existing = map.get(key);
    if (existing) {
      existing.count++;
    } else {
      map.set(key, { label, count: 1, type: m.type });
    }
  });

  return Array.from(map.values()).sort((a, b) => b.count - a.count);
}

/** 获取统计数据 */
export function getPosStats() {
  const all = loadAll();
  const unreviewed = all.filter(m => !m.reviewed);
  return {
    total: all.length,
    unreviewed: unreviewed.length,
    outputWrong: all.filter(m => m.type === 'output').length,
    detectiveWrong: all.filter(m => m.type === 'detective').length,
    drillWrong: all.filter(m => m.type === 'drill').length,
    avgScore: all.length > 0
      ? Math.round(all.reduce((s, m) => s + (m.score || 0), 0) / all.length)
      : 0,
    weakPoints: getWeakPoints().slice(0, 5),
  };
}

/** 清空所有 */
export function clearPosMistakes() {
  localStorage.removeItem(STORAGE_KEY);
}
