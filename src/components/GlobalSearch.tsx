import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, BookOpen, BookmarkCheck, BookmarkPlus, Database, ExternalLink, Globe2, IdCard, Loader2, Search, Sparkles, Volume2, X } from 'lucide-react';
import type { Section } from '../App';
import HalienzoUniversePlayer from './HalienzoUniversePlayer';
import calendarDataJson from '../data/calendarData.json';
import { speakEnglish } from '../lib/ttsService';
import { allQuestions } from '../data/questions';
import { PUNCTUATION_RULES } from '../data/punctuationData';
import { quantifierKnowledge } from '../data/quantifierData';
import { aspectExplanation, tenseMatrix } from '../data/verbAspectData';
import { grammarKnowledgeCards, type SearchNavigationTarget } from '../data/grammarKnowledgeData';
import { getWordProfile } from '../data/wordPosProfiles';
import { hasWordInIndex } from '../data/posWordIndex';

interface CalendarWordLike {
  word: string;
  phonetic?: string;
  syllables?: string;
  pos?: string;
  meanings?: string[];
  phrases?: string[];
  example?: string;
  memoryTip?: string;
}

interface CalendarDayLike {
  day?: number;
  date?: string;
  words?: CalendarWordLike[];
}

interface SemesterPlanLike {
  name?: string;
  grade?: string;
  term?: string;
  days?: CalendarDayLike[];
}

type SearchSource = 'local' | 'online';

interface SearchResult {
  id: string;
  source: SearchSource;
  kind: string;
  title: string;
  subtitle: string;
  details: string[];
  tags: string[];
  aliases?: string[];
  footer?: string;
  url?: string;
  searchText: string;
  score?: number;
  target?: SearchNavigationTarget;
  retrievedAt?: string;
}

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

interface EcdictChunk {
  key: string;
  count: number;
  entries: EcdictEntry[];
}

const ONLINE_CACHE_KEY = 'xsc_global_search_online_cache_v1';
const ONLINE_FAVORITES_KEY = 'xsc_global_search_favorites_v1';
const HALIENZO_UNIVERSE_PASSWORDS = new Set(['2014131623', '198005211625']);
const ECDICT_CACHE = new Map<string, EcdictEntry[]>();
let ecdictManifestPromise: Promise<EcdictManifest | null> | null = null;

function normalizeText(text: string): string {
  return text.toLowerCase().replace(/\s+/g, ' ').trim();
}

function normalizePassword(text: string): string {
  return text.replace(/\s+/g, '');
}

function isHalienzoUniversePassword(text: string): boolean {
  return HALIENZO_UNIVERSE_PASSWORDS.has(normalizePassword(text));
}

function joinParts(parts: Array<string | undefined | null>): string {
  return parts.filter(Boolean).join(' ');
}

function withSearchText(result: Omit<SearchResult, 'searchText'>): SearchResult {
  const searchText = normalizeText(joinParts([
    result.title,
    result.subtitle,
    result.kind,
    result.footer,
    result.details.join(' '),
    result.tags.join(' '),
    result.aliases?.join(' '),
  ]));
  return { ...result, searchText };
}

function scoreResult(query: string, result: SearchResult): number {
  const q = normalizeText(query);
  if (!q) return 0;
  const tokens = q.split(' ').filter(Boolean);
  const title = normalizeText(result.title);
  const tags = normalizeText(result.tags.join(' '));
  if (title === q || result.tags.some(tag => normalizeText(tag) === q)) return 120;
  if (title.startsWith(q)) return 100;
  if (title.includes(q)) return 85;
  if (tags.includes(q)) return 70;
  if (result.searchText.includes(q)) return 45;
  if (tokens.length > 1 && tokens.every(token => result.searchText.includes(token))) return 30;
  return 0;
}

function publicAssetUrl(relativePath: string): string {
  const base = import.meta.env.BASE_URL || './';
  return `${base}${relativePath.replace(/^\/+/, '')}`;
}

async function loadEcdictManifest(): Promise<EcdictManifest | null> {
  if (!ecdictManifestPromise) {
    ecdictManifestPromise = fetch(publicAssetUrl('ecdict/manifest.json'))
      .then(response => response.ok ? response.json() : null)
      .catch(() => null);
  }
  return ecdictManifestPromise;
}

function stripDictionaryWord(value: string): string {
  return normalizeText(value).replace(/[^a-z0-9]+/g, '');
}

function ecdictChunkKey(query: string): string {
  const stripped = stripDictionaryWord(query);
  if (stripped.length < 2) return '';
  const prefix = stripped.slice(0, 2);
  if (/^[a-z][a-z0-9]?$/.test(prefix)) return prefix.padEnd(2, '_');
  if (/^[0-9]/.test(prefix)) return 'num';
  return '';
}

async function loadEcdictChunk(query: string): Promise<EcdictEntry[]> {
  const chunkKey = ecdictChunkKey(query);
  if (!chunkKey) return [];
  if (ECDICT_CACHE.has(chunkKey)) return ECDICT_CACHE.get(chunkKey) || [];

  const manifest = await loadEcdictManifest();
  const chunk = manifest?.chunks?.[chunkKey];
  if (!chunk) {
    ECDICT_CACHE.set(chunkKey, []);
    return [];
  }

  const response = await fetch(publicAssetUrl(`ecdict/${chunk.file}`));
  if (!response.ok) return [];
  const payload = await response.json() as EcdictChunk;
  ECDICT_CACHE.set(chunkKey, payload.entries || []);
  return payload.entries || [];
}

function scoreEcdictEntry(query: string, entry: EcdictEntry): number {
  const q = normalizeText(query);
  const stripped = stripDictionaryWord(query);
  const title = normalizeText(entry.w || '');
  const entryStrip = entry.s || stripDictionaryWord(entry.w || '');
  if (title === q) return 132;
  if (entryStrip === stripped) return 128;
  if (title.startsWith(q)) return 88;
  if (entryStrip.startsWith(stripped)) return 80;
  if (title.includes(q) || entryStrip.includes(stripped)) return 38;
  return 0;
}

function compactMultiline(value: string | undefined, limit = 4): string {
  return String(value || '')
    .split(/\n+/)
    .map(line => line.trim())
    .filter(Boolean)
    .slice(0, limit)
    .join('；');
}

function ecdictEntryToResult(entry: EcdictEntry, query: string, score: number): SearchResult {
  const translation = compactMultiline(entry.t, 5);
  const definition = compactMultiline(entry.d, 3);
  const frequency = [
    entry.bnc ? `BNC ${entry.bnc}` : '',
    entry.frq ? `FRQ ${entry.frq}` : '',
  ].filter(Boolean).join(' · ');
  return withSearchText({
    id: `ecdict:${entry.w}`,
    source: 'local',
    kind: 'ECDICT词典',
    title: entry.w,
    subtitle: [entry.p || '', translation || definition || 'ECDICT 本地词条'].filter(Boolean).join(' · '),
    details: [
      entry.p ? `音标：${entry.p}` : '',
      translation ? `中文释义：${translation}` : '',
      definition ? `英文释义：${definition}` : '',
      entry.forms?.length ? `词形变化：${entry.forms.join('；')}` : '',
      entry.tag ? `考试/语料标签：${entry.tag}` : '',
      frequency ? `词频：${frequency}` : '',
    ].filter(Boolean),
    tags: ['ECDICT', '本地词典', query, entry.pos || '', entry.tag || '', entry.w].filter(Boolean),
    aliases: [entry.s, entry.forms?.join(' ') || ''].filter(Boolean),
    footer: 'ECDICT 本地英汉词典',
    score,
  });
}

async function searchEcdict(query: string): Promise<SearchResult[]> {
  const trimmed = query.trim();
  if (!/^[a-zA-Z0-9][a-zA-Z0-9\s'’.-]*$/.test(trimmed)) return [];
  if (stripDictionaryWord(trimmed).length < 2) return [];

  const entries = await loadEcdictChunk(trimmed);
  return entries
    .map(entry => ({ entry, score: scoreEcdictEntry(trimmed, entry) }))
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score || a.entry.w.localeCompare(b.entry.w))
    .slice(0, 8)
    .map(item => ecdictEntryToResult(item.entry, trimmed, item.score));
}

function loadOnlineCache(): Record<string, SearchResult[]> {
  try {
    return JSON.parse(localStorage.getItem(ONLINE_CACHE_KEY) || '{}');
  } catch {
    return {};
  }
}

function saveOnlineCache(query: string, results: SearchResult[]) {
  const cache = loadOnlineCache();
  cache[normalizeText(query)] = results.map(result => ({
    ...result,
    retrievedAt: result.retrievedAt || new Date().toLocaleString('zh-CN'),
  }));
  const entries = Object.entries(cache).slice(-40);
  localStorage.setItem(ONLINE_CACHE_KEY, JSON.stringify(Object.fromEntries(entries)));
}

function loadFavoriteKnowledge(): SearchResult[] {
  try {
    return JSON.parse(localStorage.getItem(ONLINE_FAVORITES_KEY) || '[]');
  } catch {
    return [];
  }
}

function saveFavoriteKnowledge(results: SearchResult[]) {
  localStorage.setItem(ONLINE_FAVORITES_KEY, JSON.stringify(results.slice(0, 80)));
}

function buildLocalIndex(): SearchResult[] {
  const results: SearchResult[] = [];
  const wordMap = new Map<string, SearchResult>();
  const semesters = calendarDataJson as Record<string, SemesterPlanLike>;

  Object.entries(semesters).forEach(([semKey, semester]) => {
    semester.days?.forEach(day => {
      day.words?.forEach(word => {
        const key = word.word.trim().toLowerCase();
        if (!key || wordMap.has(key)) return;
        wordMap.set(key, withSearchText({
          id: `word:${key}`,
          source: 'local',
          kind: '系统词汇',
          title: word.word,
          subtitle: word.meanings?.join('；') || '系统词汇',
          details: [
            word.phonetic ? `音标：${word.phonetic}` : '',
            word.syllables ? `音节：${word.syllables}` : '',
            word.pos ? `词性：${word.pos}` : '',
            word.phrases?.length ? `短语：${word.phrases.slice(0, 4).join('；')}` : '',
            word.example ? `例句：${word.example}` : '',
            word.memoryTip ? `记忆提示：${word.memoryTip}` : '',
          ].filter(Boolean),
          tags: [semKey, semester.name || '', semester.grade || '', semester.term || '', word.pos || '', ...(word.meanings || []), ...(word.phrases || [])].filter(Boolean),
          footer: `${semester.name || semKey}${day.date ? ` · ${day.date}` : ''}`,
          target: { section: 'vocabulary', semKey, day: day.day, label: '进入当天闪卡' },
        }));
      });
    });
  });

  results.push(...wordMap.values());

  grammarKnowledgeCards.forEach(topic => results.push(withSearchText({ ...topic, source: 'local' })));

  tenseMatrix.forEach(item => {
    results.push(withSearchText({
      id: `tense:${item.name}`,
      source: 'local',
      kind: '时态语态',
      title: item.name,
      subtitle: `${item.time} · ${item.aspect} · ${item.structure}`,
      details: [
        `主动结构：${item.structure}`,
        `被动结构：${item.passive}`,
        `用法：${item.useCase}`,
        `英文名：${item.englishName}`,
        `温情解释：${item.warmExplanation}`,
        `例句：${item.example.replace(/\*\*/g, '')}`,
      ],
      tags: [item.name, item.englishName, item.aspect, item.time, item.structure, item.passive, item.highlight],
      footer: '知识库 · 时态语态矩阵',
      target: { section: 'knowledge', tab: 'verbaspect', label: '进入时态语态' },
    }));
  });

  aspectExplanation.aspects.forEach(aspect => {
    results.push(withSearchText({
      id: `aspect:${aspect.name}`,
      source: 'local',
      kind: '态逻辑',
      title: aspect.name,
      subtitle: aspect.description,
      details: [
        `特征：${aspect.features.join('；')}`,
        `例句：${aspect.examples.join(' / ')}`,
      ],
      tags: [aspect.name, ...aspect.features, ...aspect.examples],
      footer: '知识库 · 态的核心区别',
      target: { section: 'knowledge', tab: 'verbaspect', label: '进入五态详解' },
    }));
  });

  PUNCTUATION_RULES.forEach(rule => {
    results.push(withSearchText({
      id: `punctuation:${rule.enName}`,
      source: 'local',
      kind: '标点知识',
      title: `${rule.cnName} ${rule.enName}`,
      subtitle: `${rule.cnSymbol} / ${rule.enSymbol} · ${rule.description}`,
      details: [
        `关键差异：${rule.keyDifferences.join('；')}`,
        `英文例句：${rule.enExamples.slice(0, 2).map(example => example.text).join(' / ')}`,
        `易错提醒：${rule.commonMistakes.slice(0, 2).map(mistake => `${mistake.wrong} -> ${mistake.correct}`).join('；')}`,
        `速记：${rule.quickTip}`,
      ],
      tags: [rule.cnSymbol, rule.enSymbol, rule.cnName, rule.enName, ...rule.keyDifferences],
      footer: '知识库 · 标点符号',
      target: { section: 'knowledge', tab: 'punctuation', label: '进入标点知识' },
    }));
  });

  quantifierKnowledge.sections.forEach(section => {
    results.push(withSearchText({
      id: `quantifier:${section.title}`,
      source: 'local',
      kind: '量词知识',
      title: section.title,
      subtitle: quantifierKnowledge.title,
      details: section.items.slice(0, 8),
      tags: [quantifierKnowledge.title, section.title, ...section.items],
      footer: '知识库 · 量词与集合名词',
      target: { section: 'knowledge', tab: 'grammar', label: '进入语法体系' },
    }));
  });

  allQuestions.forEach(question => {
    results.push(withSearchText({
      id: `question:${question.id}`,
      source: 'local',
      kind: '题目解析',
      title: question.knowledge || question.subcategory || question.category,
      subtitle: question.question,
      details: [
        `解析：${question.explanation}`,
        question.trap ? `陷阱：${question.trap}` : '',
      ].filter(Boolean),
      tags: [question.category, question.subcategory, question.type, question.knowledge, question.question, question.explanation, question.trap || ''],
      footer: `练习题 #${question.id}`,
      target: { section: 'practice', category: question.category, questionId: question.id, label: '进入这道题' },
    }));
  });

  return results;
}

async function fetchDictionaryResult(query: string): Promise<SearchResult | null> {
  if (!/^[a-zA-Z][a-zA-Z\s'-]*$/.test(query.trim())) return null;
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(query.trim())}`);
  if (!response.ok) return null;
  const data = await response.json();
  const entry = Array.isArray(data) ? data[0] : null;
  if (!entry) return null;
  const meanings = Array.isArray(entry.meanings) ? entry.meanings.slice(0, 3) : [];
  const details = meanings.flatMap((meaning: any) => {
    const definitions = Array.isArray(meaning.definitions) ? meaning.definitions.slice(0, 2) : [];
    return definitions.map((definition: any) => `${meaning.partOfSpeech || 'word'}：${definition.definition}${definition.example ? ` Example: ${definition.example}` : ''}`);
  });
  const phonetic = entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || '';
  return withSearchText({
    id: `online:dictionary:${entry.word}`,
    source: 'online',
    kind: '联网词典',
    title: entry.word || query,
    subtitle: phonetic ? `English dictionary · ${phonetic}` : 'English dictionary',
    details: details.length ? details : ['联网词典返回了词条，但没有详细释义。'],
    tags: ['dictionary', 'online', query],
    footer: 'Dictionary API',
    url: `https://dictionaryapi.dev/`,
    retrievedAt: new Date().toLocaleString('zh-CN'),
  });
}

async function fetchWikiResult(query: string): Promise<SearchResult | null> {
  const hasChinese = /[\u4e00-\u9fa5]/.test(query);
  const host = hasChinese ? 'zh.wikipedia.org' : 'simple.wikipedia.org';
  const params = new URLSearchParams({
    action: 'query',
    origin: '*',
    format: 'json',
    generator: 'search',
    gsrsearch: query,
    gsrlimit: '1',
    prop: 'extracts|info',
    exintro: '1',
    explaintext: '1',
    inprop: 'url',
  });
  const response = await fetch(`https://${host}/w/api.php?${params.toString()}`);
  if (!response.ok) return null;
  const data = await response.json();
  const page = data?.query?.pages ? Object.values(data.query.pages)[0] as any : null;
  if (!page?.extract) return null;
  const extract = String(page.extract).replace(/\s+/g, ' ').trim();
  return withSearchText({
    id: `online:wiki:${page.pageid}`,
    source: 'online',
    kind: '联网百科',
    title: page.title || query,
    subtitle: hasChinese ? '中文维基百科摘要' : 'Simple English Wikipedia summary',
    details: [extract.length > 520 ? `${extract.slice(0, 520)}...` : extract],
    tags: ['wikipedia', 'online', query, page.title || ''],
    footer: hasChinese ? 'Wikipedia zh' : 'Wikipedia Simple English',
    url: page.fullurl,
    retrievedAt: new Date().toLocaleString('zh-CN'),
  });
}

async function fetchOnlineResults(query: string): Promise<SearchResult[]> {
  const settled = await Promise.allSettled([
    fetchDictionaryResult(query),
    fetchWikiResult(query),
  ]);
  return settled
    .map(item => item.status === 'fulfilled' ? item.value : null)
    .filter((item): item is SearchResult => Boolean(item));
}

interface GlobalSearchProps {
  onNavigate?: (section: Section, cat?: string) => void;
  navigateKnowledge?: (tab: string) => void;
}

export function GlobalSearch({ onNavigate, navigateKnowledge }: GlobalSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isUniverseOpen, setIsUniverseOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearchingOnline, setIsSearchingOnline] = useState(false);
  const [onlineQuery, setOnlineQuery] = useState('');
  const [onlineResults, setOnlineResults] = useState<SearchResult[]>([]);
  const [onlineError, setOnlineError] = useState('');
  const [dictionaryResults, setDictionaryResults] = useState<SearchResult[]>([]);
  const [isSearchingDictionary, setIsSearchingDictionary] = useState(false);
  const [favoriteKnowledge, setFavoriteKnowledge] = useState<SearchResult[]>(loadFavoriteKnowledge);
  const index = useMemo(buildLocalIndex, []);

  const systemResults = useMemo(() => {
    const trimmed = query.trim();
    if (trimmed.length < 1) return [];
    return index
      .map(result => ({ ...result, score: scoreResult(trimmed, result) }))
      .filter(result => (result.score || 0) > 0)
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 10);
  }, [index, query]);

  useEffect(() => {
    const trimmed = query.trim();
    let cancelled = false;
    setDictionaryResults([]);
    if (!trimmed || isHalienzoUniversePassword(trimmed) || stripDictionaryWord(trimmed).length < 2) {
      setIsSearchingDictionary(false);
      return;
    }
    if (!/^[a-zA-Z0-9][a-zA-Z0-9\s'’.-]*$/.test(trimmed)) {
      setIsSearchingDictionary(false);
      return;
    }

    setIsSearchingDictionary(true);
    const timeout = window.setTimeout(() => {
      searchEcdict(trimmed)
        .then(results => {
          if (!cancelled) setDictionaryResults(results);
        })
        .catch(() => {
          if (!cancelled) setDictionaryResults([]);
        })
        .finally(() => {
          if (!cancelled) setIsSearchingDictionary(false);
        });
    }, 120);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [query]);

  const localResults = useMemo(() => {
    const byId = new Map<string, SearchResult>();
    for (const result of [...systemResults, ...dictionaryResults]) {
      byId.set(result.id, result);
    }
    return Array.from(byId.values())
      .sort((a, b) => (b.score || 0) - (a.score || 0))
      .slice(0, 12);
  }, [systemResults, dictionaryResults]);

  const normalizedQuery = normalizeText(query);
  const visibleOnlineResults = onlineQuery === normalizedQuery ? onlineResults : [];
  const shouldShowOnlineState = query.trim().length > 0 && localResults.length === 0 && !isSearchingDictionary;

  const openHalienzoUniverse = () => {
    setIsOpen(false);
    setQuery('');
    setOnlineError('');
    setOnlineResults([]);
    setOnlineQuery('');
    setIsUniverseOpen(true);
  };

  const handleQueryChange = (value: string) => {
    if (isHalienzoUniversePassword(value)) {
      openHalienzoUniverse();
      return;
    }
    setQuery(value);
    setOnlineError('');
  };

  const runOnlineSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const cached = loadOnlineCache()[normalizeText(trimmed)];
    if (cached?.length) {
      setOnlineError('');
      setOnlineQuery(normalizeText(trimmed));
      setOnlineResults(cached);
      return;
    }
    setIsSearchingOnline(true);
    setOnlineError('');
    setOnlineResults([]);
    setOnlineQuery(normalizeText(trimmed));
    try {
      const results = await fetchOnlineResults(trimmed);
      setOnlineResults(results);
      if (results.length > 0) saveOnlineCache(trimmed, results);
      if (results.length === 0) {
        setOnlineError('联网未找到可展示的词条，请换一个关键词或使用英文原词再试。');
      }
    } catch {
      setOnlineError('联网检索失败。请检查网络后重试。');
    } finally {
      setIsSearchingOnline(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isHalienzoUniversePassword(query)) {
      openHalienzoUniverse();
      return;
    }
    if (localResults.length === 0 && !isSearchingDictionary) {
      runOnlineSearch();
    }
  };

  const resultsToShow = localResults.length > 0 ? localResults : visibleOnlineResults;

  const handleGoToResult = (result: SearchResult) => {
    if (!result.target || !onNavigate) return;
    setIsOpen(false);
    if (result.target.section === 'vocabulary') {
      sessionStorage.setItem('xsc_vocab_focus', JSON.stringify({
        semKey: result.target.semKey,
        day: result.target.day,
      }));
      window.dispatchEvent(new Event('xsc_vocab_focus_change'));
      onNavigate('vocabulary');
      return;
    }
    if (result.target.section === 'knowledge') {
      if (result.target.tab && navigateKnowledge) navigateKnowledge(result.target.tab);
      else onNavigate('knowledge');
      return;
    }
    if (result.target.section === 'practice') {
      sessionStorage.setItem('xsc_question_focus', JSON.stringify({
        questionId: result.target.questionId,
      }));
      window.dispatchEvent(new Event('xsc_question_focus_change'));
      onNavigate('practice', result.target.category);
      return;
    }
    if (result.target.section === 'pos') {
      sessionStorage.setItem('xsc_pos_focus', result.target.word || '');
      onNavigate('pos');
    }
  };

  const toggleFavoriteKnowledge = (result: SearchResult) => {
    const exists = favoriteKnowledge.some(item => item.id === result.id);
    const next = exists
      ? favoriteKnowledge.filter(item => item.id !== result.id)
      : [{ ...result, retrievedAt: result.retrievedAt || new Date().toLocaleString('zh-CN') }, ...favoriteKnowledge];
    setFavoriteKnowledge(next);
    saveFavoriteKnowledge(next);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-[72px] md:top-[88px] z-[90] flex items-center gap-2 rounded-full border border-cyan-300/30 bg-slate-950/85 px-3 py-2 text-xs font-bold text-cyan-100 shadow-xl shadow-cyan-950/30 backdrop-blur-md transition-all hover:border-cyan-300/70 hover:bg-slate-900"
        title="全局搜索"
      >
        <Search size={15} className="text-cyan-300" />
        <span className="hidden sm:inline">全局搜索</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/75 p-3 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
          <div className="mx-auto mt-16 w-full max-w-3xl rounded-2xl border border-cyan-300/20 bg-slate-950 shadow-2xl shadow-cyan-950/40" onClick={event => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles size={17} className="text-amber-300" />
                <div>
                  <div className="text-sm font-black text-white">全局搜索引擎</div>
                  <div className="text-[11px] text-slate-500">先搜系统内容和 ECDICT 本地词典，无本地结果时联网补全</div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 border-b border-slate-800 p-4">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  autoFocus
                  value={query}
                  onChange={event => handleQueryChange(event.target.value)}
                  placeholder="搜索单词、ECDICT词典、音标、语法点、题目解析、标点、量词..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-9 py-3 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-cyan-400"
                />
              </div>
              <button
                type="submit"
                disabled={!query.trim() || isSearchingOnline}
                className="rounded-xl bg-cyan-500 px-4 py-2 text-sm font-black text-slate-950 transition-all hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSearchingOnline ? <Loader2 size={16} className="animate-spin" /> : '搜索'}
              </button>
            </form>

            <div className="max-h-[68vh] overflow-y-auto p-4">
              {!query.trim() && (
                <div className="space-y-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 text-sm text-slate-400">
                    可以直接搜：balloon、grandma、被动语态、进行态、完成态、逗号、a piece of、从句系统。
                  </div>
                  {favoriteKnowledge.length > 0 && (
                    <div className="rounded-xl border border-amber-300/20 bg-amber-300/5 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-black text-amber-100">
                        <BookmarkCheck size={15} />
                        本地收藏知识卡
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {favoriteKnowledge.slice(0, 8).map(item => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setQuery(item.title)}
                            className="rounded-full border border-amber-300/20 bg-slate-900 px-3 py-1 text-xs text-amber-100 hover:bg-amber-300/10"
                          >
                            {item.title}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {shouldShowOnlineState && !isSearchingOnline && visibleOnlineResults.length === 0 && !onlineError && (
                <div className="rounded-xl border border-amber-400/25 bg-amber-500/10 p-4">
                  <div className="text-sm font-bold text-amber-200">系统内没有找到这个关键词</div>
                  <p className="mt-1 text-xs text-amber-100/70">按回车或点击“搜索”会联网生成知识卡。</p>
                </div>
              )}

              {isSearchingOnline && (
                <div className="flex items-center gap-2 rounded-xl border border-cyan-400/25 bg-cyan-500/10 p-4 text-cyan-100">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm font-bold">正在联网检索...</span>
                </div>
              )}

              {isSearchingDictionary && !isSearchingOnline && (
                <div className="flex items-center gap-2 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-emerald-100">
                  <Loader2 size={16} className="animate-spin" />
                  <span className="text-sm font-bold">正在检索本地 ECDICT 词典...</span>
                </div>
              )}

              {onlineError && (
                <div className="rounded-xl border border-red-400/25 bg-red-500/10 p-4 text-sm text-red-100">{onlineError}</div>
              )}

              {resultsToShow.length > 0 && (
                <div className="space-y-3">
                  {resultsToShow.map(result => (
                    <article key={result.id} className="rounded-xl border border-slate-700/70 bg-slate-900/80 p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-black ${result.source === 'local' ? 'border-emerald-300/40 bg-emerald-500/10 text-emerald-200' : 'border-cyan-300/40 bg-cyan-500/10 text-cyan-200'}`}>
                              {result.source === 'local' ? <Database size={11} /> : <Globe2 size={11} />}
                              {result.source === 'local' ? (result.kind === 'ECDICT词典' ? 'ECDICT' : '系统内') : '联网'}
                            </span>
                            <span className="rounded-full border border-slate-600 bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">{result.kind}</span>
                          </div>
                          <h3 className="mt-2 text-xl font-black text-white">{result.title}</h3>
                          <p className="mt-1 text-sm text-cyan-100/80">{result.subtitle}</p>
                        </div>
                        {(result.kind === '系统词汇' || result.kind === 'ECDICT词典') && (
                          <button
                            onClick={() => void speakEnglish(result.title, { accent: 'en-GB', source: 'youdao' })}
                            className="rounded-lg border border-cyan-400/30 bg-cyan-500/10 p-2 text-cyan-200 hover:bg-cyan-500/20"
                            title="发音"
                          >
                            <Volume2 size={16} />
                          </button>
                        )}
                      </div>
                      <div className="mt-3 space-y-2">
                        {result.details.slice(0, 6).map((detail, index) => (
                          <p key={index} className="rounded-lg bg-slate-950/55 px-3 py-2 text-sm leading-relaxed text-slate-200">{detail}</p>
                        ))}
                      </div>
                      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap gap-1">
                          {result.tags.slice(0, 6).map((tag, index) => (
                            <span key={`${tag}-${index}`} className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] text-slate-400">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-500">
                          <BookOpen size={12} />
                          <span>{result.footer}</span>
                          {result.retrievedAt && (
                            <span className="rounded-full bg-slate-800 px-2 py-0.5 text-slate-400">检索于 {result.retrievedAt}</span>
                          )}
                          {result.url && (
                            <a href={result.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-100">
                              来源 <ExternalLink size={11} />
                            </a>
                          )}
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap justify-end gap-2 border-t border-slate-800 pt-3">
                        {result.source === 'online' && (
                          <button
                            type="button"
                            onClick={() => toggleFavoriteKnowledge(result)}
                            className="inline-flex items-center gap-1 rounded-lg border border-amber-300/30 bg-amber-300/10 px-3 py-1.5 text-xs font-bold text-amber-100 hover:bg-amber-300/20"
                          >
                            {favoriteKnowledge.some(item => item.id === result.id) ? <BookmarkCheck size={13} /> : <BookmarkPlus size={13} />}
                            {favoriteKnowledge.some(item => item.id === result.id) ? '已收藏' : '收藏到本地知识库'}
                          </button>
                        )}
                        {/* 词性身份卡入口 */}
                        {(result.kind === '系统词汇' || result.kind === 'ECDICT词典') && (getWordProfile(result.title) || hasWordInIndex(result.title)) && (
                          <button
                            type="button"
                            onClick={() => {
                              sessionStorage.setItem('xsc_pos_focus', result.title);
                              setIsOpen(false);
                              onNavigate?.('pos');
                            }}
                            className="inline-flex items-center gap-1 rounded-lg border border-purple-300/30 bg-purple-500/10 px-3 py-1.5 text-xs font-bold text-purple-200 hover:bg-purple-500/20"
                          >
                            <IdCard size={13} />
                            查看词性身份卡
                          </button>
                        )}
                        {result.target && (
                          <button
                            type="button"
                            onClick={() => handleGoToResult(result)}
                            className="inline-flex items-center gap-1 rounded-lg bg-cyan-400 px-3 py-1.5 text-xs font-black text-slate-950 hover:bg-cyan-300"
                          >
                            {result.target.label}
                            <ArrowRight size={13} />
                          </button>
                        )}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <HalienzoUniversePlayer isOpen={isUniverseOpen} onClose={() => setIsUniverseOpen(false)} />
    </>
  );
}
