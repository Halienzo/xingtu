import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileDown,
  Headphones,
  Layers,
  MessageCircle,
  PenLine,
  RotateCcw,
  Search,
  Volume2,
  X,
  XCircle,
} from 'lucide-react';
import canonicalDataJson from '../../data/ieltsCanonicalData.json';
import auditDataJson from '../../data/ieltsCanonicalAudit.json';
import { generatePDF, mergeWordsFromDays } from './beiduofenPdfEngine';
import { TopicFlashPanel } from './TopicFlashPanel';
import {
  loadTopicProgress,
  saveTopicProgress,
  toTopicPlannerWord,
  mapTopicWordToCalendarWord,
  type TopicFlashWord,
  type TopicProgressState,
} from './TopicFlashPanel';
import type { CalendarWord } from './BeiduofenVocabularyCalendar';
import {
  DEFAULT_IELTS_ANCHOR_DATE_ISO,
  IELTS_WORDS_PER_DAY,
  addDaysISO,
  addMonthsToKey,
  buildIeltsCalendarMonth,
  buildIeltsDayPlan,
  buildTopicDayPlan,
  getFirstCoreDateForWord,
  getMonthKey,
  getNextProgressForCorrect,
  getNextProgressForWrong,
  type IeltsDayPlan,
  type IeltsPlannerOptions,
  type IeltsPlannerProgressRecord,
  type IeltsPlannerProgressStatus,
  type IeltsTopicPlannerWord,
} from './ieltsStudyPlanner';

interface IeltsExample {
  english: string;
  chinese: string;
  raw: string;
  sourceEntryId?: string;
}

interface IeltsAppendixRef {
  topicId: string;
  section: string;
  topic: string;
  term: string;
  meaning: string;
}

interface IeltsReverseRef {
  id: string;
  rawLine: string;
}

interface IeltsSourceRef {
  sourceEntryId: string;
  sourceWord: string;
  unit: number;
  score: number;
  reasons: string[];
  sourceAligned: boolean;
  rawMarkdown: string;
}

export interface IeltsCanonicalWord {
  id: string;
  word: string;
  normalizedWord: string;
  unit: number;
  order: number;
  phonetic: string;
  pos: string;
  meaning: string;
  sourceMeaning: string;
  examples: IeltsExample[];
  memoryNotes: string[];
  synonyms: string[];
  antonyms: string[];
  distinctions: string[];
  proverbs: string[];
  supplements: string[];
  remarks: string[];
  appendixRefs: IeltsAppendixRef[];
  reverseIndexRefs: IeltsReverseRef[];
  sourceRefs: IeltsSourceRef[];
  sourceQualityFlags: string[];
  displayQuality: 'source-aligned' | 'dict-corrected' | 'dict-fallback' | 'source-only';
  learningFlags: string[];
}

export interface IeltsAppendixTerm {
  id: string;
  term: string;
  normalizedTerm: string;
  meaning: string;
  rawLine: string;
}

export interface IeltsAppendixTopic {
  id: string;
  sourceType: string;
  section: string;
  topic: string;
  topicNumber: string;
  sceneTags: string[];
  skillTags: string[];
  rawLines: string[];
  terms: IeltsAppendixTerm[];
}

interface IeltsUnstableFragment {
  id: string;
  sourceType: 'unstable-fragment';
  unit: number;
  text: string;
  rawMarkdown: string;
}

interface IeltsCanonicalDataset {
  sourceTitle: string;
  generatedAt: string;
  words: IeltsCanonicalWord[];
  appendixTopics: IeltsAppendixTopic[];
  unstableFragments: IeltsUnstableFragment[];
  audit: IeltsAudit;
}

type IeltsCalendarDay = IeltsDayPlan<IeltsCanonicalWord>;

interface IeltsAudit {
  generatedAt: string;
  sourceUnitEntries: number;
  canonicalWordCount: number;
  sourceAlignedCount: number;
  dictCorrectedCount: number;
  dictFallbackCount: number;
  sourceOnlyCount: number;
  missingSourceExampleCount: number;
  missingPhoneticCount: number;
  recoveredFromPageHeaderCount: number;
  orphanSourceEntryCount: number;
  orphanSourceEntries: Array<{ sourceEntryId: string; word: string; unit: number; reason: string }>;
}

type IeltsProgressStatus = IeltsPlannerProgressStatus;
type IeltsPracticeMode = 'spell' | 'meaning' | 'details';
type CheckResult = 'idle' | 'correct' | 'wrong';
type IeltsProgressRecord = IeltsPlannerProgressRecord & {
  status: IeltsProgressStatus;
  lastUpdated: string;
  reviewCount: number;
};
type IeltsProgressState = Record<string, IeltsProgressRecord>;
type StudyTab = 'calendar' | 'wrong' | 'search' | 'listening' | 'writing' | 'reading' | 'speaking';

const canonicalData = canonicalDataJson as IeltsCanonicalDataset;
const auditData = auditDataJson as IeltsAudit;
const IELTS_PROGRESS_KEY = 'beiduofen_ielts_calendar_progress_v2';

const TAB_META: Record<StudyTab, { label: string; icon: typeof CalendarDays }> = {
  calendar: { label: '日历', icon: CalendarDays },
  wrong: { label: '错词', icon: XCircle },
  search: { label: '检索', icon: Search },
  listening: { label: '听力', icon: Headphones },
  writing: { label: '写作', icon: PenLine },
  reading: { label: '阅读', icon: BookOpen },
  speaking: { label: '口语', icon: MessageCircle },
};

function loadProgress(): IeltsProgressState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(IELTS_PROGRESS_KEY);
    const parsed = raw ? JSON.parse(raw) as IeltsProgressState : {};
    return Object.fromEntries(Object.entries(parsed).map(([id, record]) => [
      id,
      {
        status: record.status || 'new',
        lastUpdated: record.lastUpdated || '',
        reviewCount: record.reviewCount || 0,
        spellingCorrect: Boolean(record.spellingCorrect),
        meaningCorrect: Boolean(record.meaningCorrect),
        wrongCount: record.wrongCount || 0,
        lastWrongAt: record.lastWrongAt,
        dueDate: record.dueDate,
        srsLevel: Number.isFinite(record.srsLevel) ? record.srsLevel : 0,
        firstSeenOn: record.firstSeenOn,
        lastSeenOn: record.lastSeenOn,
      },
    ]));
  } catch {
    return {};
  }
}

function saveProgress(progress: IeltsProgressState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(IELTS_PROGRESS_KEY, JSON.stringify(progress));
}

function formatNumber(value: number) {
  return value.toLocaleString('zh-CN');
}

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function cleanMeaningText(raw: string) {
  return raw.replace(/\\n/g, '；').replace(/；；+/g, '；').replace(/^[；，、\s]+/, '').replace(/[；，、\s]+$/, '');
}

function getMeaningLines(word: IeltsCanonicalWord) {
  return (word.sourceMeaning || word.meaning || '')
    .split(/\n|；|;/)
    .map((item) => cleanMeaningText(item.trim()))
    .filter(Boolean)
    .slice(0, 5);
}

function getPrimaryMeaning(word: IeltsCanonicalWord) {
  return getMeaningLines(word)[0] || word.meaning || word.sourceMeaning || '释义待复核';
}

function getPosText(word: IeltsCanonicalWord) {
  if (word.pos) return word.pos.replace(/\//g, ' / ');
  const text = word.sourceMeaning || word.meaning || '';
  const matches = [...text.matchAll(/\b(n|v|a|adj|adv|prep|conj|pron|num|int)\./gi)].map((match) => match[0].toLowerCase());
  return matches.length ? [...new Set(matches)].join(' / ') : 'IELTS';
}

function getWordSearchBlob(word: IeltsCanonicalWord) {
  return [
    word.word,
    word.phonetic,
    word.pos,
    word.meaning,
    word.sourceMeaning,
    word.examples.map((example) => `${example.english} ${example.chinese}`).join(' '),
    word.memoryNotes.join(' '),
    word.synonyms.join(' '),
    word.antonyms.join(' '),
    word.distinctions.join(' '),
    word.proverbs.join(' '),
    word.supplements.join(' '),
    word.remarks.join(' '),
    word.appendixRefs.map((ref) => `${ref.section} ${ref.topic} ${ref.term} ${ref.meaning}`).join(' '),
    word.sourceRefs.map((ref) => `${ref.sourceWord} ${ref.rawMarkdown}`).join(' '),
  ].join(' ').toLowerCase();
}

function speakWord(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-GB';
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

function mapToCalendarWord(word: IeltsCanonicalWord): CalendarWord {
  const meanings = getMeaningLines(word);
  const example = word.examples[0];
  return {
    word: word.word,
    phonetic: word.phonetic ? `[${word.phonetic}]` : '',
    syllables: word.word,
    syllableParts: [word.word],
    syllableColors: ['from-cyan-400 to-blue-500'],
    pos: getPosText(word),
    meanings: meanings.length ? meanings : [word.meaning || word.sourceMeaning || ''],
    phrases: [...word.memoryNotes, ...word.synonyms, ...word.antonyms, ...word.distinctions].slice(0, 6),
    example: example ? `${example.english} ${example.chinese}` : '',
    memoryTip: word.memoryNotes[0] || word.supplements[0] || '',
  };
}

function getWordStatus(word: IeltsCanonicalWord, progress: IeltsProgressState): IeltsProgressStatus {
  return progress[word.id]?.status || 'new';
}

function getStatusLabel(status: IeltsProgressStatus) {
  if (status === 'mastered') return '已会';
  if (status === 'wrong') return '错词';
  if (status === 'learning') return '练习中';
  return '新词';
}

function getStatusClass(status: IeltsProgressStatus) {
  if (status === 'mastered') return 'bg-emerald-400/15 text-emerald-200';
  if (status === 'wrong') return 'bg-amber-400/15 text-amber-200';
  if (status === 'learning') return 'bg-cyan-400/15 text-cyan-200';
  return 'bg-white/10 text-slate-300';
}

function getDayProgress(day: IeltsCalendarDay, progress: IeltsProgressState) {
  const mastered = day.words.filter((word) => getWordStatus(word, progress) === 'mastered').length;
  const wrong = day.words.filter((word) => getWordStatus(word, progress) === 'wrong').length;
  const wrongAttempts = day.words.reduce((sum, word) => sum + (progress[word.id]?.wrongCount || 0), 0);
  return { mastered, wrong, wrongAttempts, total: day.words.length };
}

function normalizeProgressRecord(record: IeltsPlannerProgressRecord): IeltsProgressRecord {
  return {
    ...record,
    status: record.status || 'learning',
    lastUpdated: record.lastUpdated || '',
    reviewCount: record.reviewCount || 0,
  };
}

function normalizeTerm(value = '') {
  return value.toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, ' ').trim();
}

function getSearchScore(word: IeltsCanonicalWord, query: string) {
  if (!query) return 0;
  const normalizedWord = word.normalizedWord.toLowerCase();
  if (normalizedWord === query) return 0;
  if (normalizedWord.startsWith(query)) return 1;
  if ((word.sourceMeaning || word.meaning || '').toLowerCase().includes(query)) return 2;
  return getWordSearchBlob(word).includes(query) ? 3 : 99;
}

function normalizeSpelling(value = '') {
  return value.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]/g, '').trim();
}

function isSpellingCorrect(answer: string, word: IeltsCanonicalWord) {
  return normalizeSpelling(answer) === normalizeSpelling(word.word);
}

function hashString(value = '') {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function buildMeaningChoices(word: IeltsCanonicalWord) {
  const correct = getPrimaryMeaning(word);
  const sameUnit = canonicalData.words.filter((item) => item.id !== word.id && item.unit === word.unit);
  const fallback = canonicalData.words.filter((item) => item.id !== word.id);
  const pool = (sameUnit.length >= 3 ? sameUnit : fallback)
    .filter((item) => getPrimaryMeaning(item) !== correct)
    .sort((a, b) => (hashString(`${word.id}-${a.id}`) - hashString(`${word.id}-${b.id}`)));
  const choices = [correct, ...pool.slice(0, 3).map(getPrimaryMeaning)];
  return choices
    .map((choice) => ({ choice, rank: hashString(`${word.id}-${choice}`) }))
    .sort((a, b) => a.rank - b.rank)
    .map((item) => item.choice);
}

export function BeiduofenIeltsVocabulary() {
  const [progress, setProgress] = useState<IeltsProgressState>(() => loadProgress());
  const [topicProgress, setTopicProgress] = useState<TopicProgressState>(() => loadTopicProgress());
  const todayDateISO = useMemo(() => todayISO(), []);
  const plannerOptions = useMemo<IeltsPlannerOptions>(() => ({
    anchorDateISO: DEFAULT_IELTS_ANCHOR_DATE_ISO,
    wordsPerDay: IELTS_WORDS_PER_DAY,
  }), []);
  const [activeTab, setActiveTab] = useState<StudyTab>('calendar');
  const [currentMonthKey, setCurrentMonthKey] = useState(() => getMonthKey(todayDateISO));
  const [selectedDateISO, setSelectedDateISO] = useState(todayDateISO);
  const [flashOpen, setFlashOpen] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceMode, setPracticeMode] = useState<IeltsPracticeMode>('spell');
  const [spellingInput, setSpellingInput] = useState('');
  const [spellingResult, setSpellingResult] = useState<CheckResult>('idle');
  const [selectedMeaning, setSelectedMeaning] = useState('');
  const [meaningResult, setMeaningResult] = useState<CheckResult>('idle');
  const [query, setQuery] = useState('');
  const [expandedTopicId, setExpandedTopicId] = useState<string>('');
  const [topicFlashOpen, setTopicFlashOpen] = useState(false);
  const [activeFlashTopic, setActiveFlashTopic] = useState<IeltsAppendixTopic | null>(null);
  const [showPdfModal, setShowPdfModal] = useState(false);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    saveTopicProgress(topicProgress);
  }, [topicProgress]);

  const wordsByNormalized = useMemo(() => {
    const map = new Map<string, IeltsCanonicalWord>();
    canonicalData.words.forEach((word) => map.set(word.normalizedWord, word));
    return map;
  }, []);

  const selectedDay = useMemo(
    () => buildIeltsDayPlan(selectedDateISO, canonicalData.words, progress, plannerOptions),
    [selectedDateISO, progress, plannerOptions],
  );
  const monthDays = useMemo(
    () => buildIeltsCalendarMonth(currentMonthKey, canonicalData.words, progress, plannerOptions),
    [currentMonthKey, progress, plannerOptions],
  );
  const monthLabel = useMemo(() => {
    const [year, month] = currentMonthKey.split('-');
    return year && month ? `${year}年${Number(month)}月` : '';
  }, [currentMonthKey]);
  const selectedProgress = getDayProgress(selectedDay, progress);
  const activeWord = selectedDay.words[cardIndex] || selectedDay.words[0];
  const activeWordProgress = activeWord ? progress[activeWord.id] : undefined;
  const meaningChoices = useMemo(() => activeWord ? buildMeaningChoices(activeWord) : [], [activeWord]);
  const wrongWords = useMemo(() => canonicalData.words
    .filter((word) => progress[word.id]?.status === 'wrong')
    .sort((a, b) => (progress[b.id]?.wrongCount || 0) - (progress[a.id]?.wrongCount || 0) || (a.unit - b.unit) || (a.order - b.order)), [progress]);

  const filteredWords = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return canonicalData.words.slice(0, 36);
    return canonicalData.words
      .map((word) => ({ word, score: getSearchScore(word, normalizedQuery) }))
      .filter((item) => item.score < 99)
      .sort((a, b) => (a.score - b.score) || (a.word.unit - b.word.unit) || (a.word.order - b.word.order))
      .map((item) => item.word)
      .slice(0, 80);
  }, [query]);

  const listeningTopics = useMemo(() => canonicalData.appendixTopics.filter((topic) => topic.section.includes('听力')), []);
  const writingTopics = useMemo(() => canonicalData.appendixTopics.filter((topic) => topic.section.includes('写作')), []);
  const readingTopics = useMemo(() => canonicalData.appendixTopics.filter((topic) => topic.section.includes('阅读')), []);
  const speakingTopics = useMemo(() => canonicalData.appendixTopics.filter((topic) => topic.section.includes('口语')), []);

  const allAppendixFlashWords = useMemo<TopicFlashWord[]>(() => {
    return canonicalData.appendixTopics.flatMap((topic) =>
      topic.terms.map((term) => ({
        termId: term.id,
        displayWord: term.term,
        normalizedWord: term.normalizedTerm,
        meaning: term.meaning || '',
        linkedWord: wordsByNormalized.get(term.normalizedTerm),
        topicId: topic.id,
        topicName: topic.topic,
        isMatched: wordsByNormalized.has(term.normalizedTerm),
      })),
    );
  }, [wordsByNormalized]);

  const allTopicPlannerWords = useMemo<IeltsTopicPlannerWord[]>(
    () => allAppendixFlashWords.map(toTopicPlannerWord),
    [allAppendixFlashWords],
  );

  const topicDayPlan = useMemo(
    () => buildTopicDayPlan(selectedDateISO, allTopicPlannerWords, topicProgress),
    [selectedDateISO, allTopicPlannerWords, topicProgress],
  );

  const overallTopicSummary = useMemo(() => {
    let total = 0;
    let mastered = 0;
    let wrong = 0;
    for (const tw of allTopicPlannerWords) {
      if (!tw.id) continue;
      total += 1;
      const rec = topicProgress[tw.id];
      if (rec?.status === 'mastered') mastered += 1;
      else if (rec?.status === 'wrong') wrong += 1;
    }
    return { total, mastered, wrong };
  }, [allTopicPlannerWords, topicProgress]);

  const resetCardPractice = (mode: IeltsPracticeMode = practiceMode) => {
    setShowAnswer(false);
    setPracticeMode(mode);
    setSpellingInput('');
    setSpellingResult('idle');
    setSelectedMeaning('');
    setMeaningResult('idle');
  };

  const updateWordProgress = (word: IeltsCanonicalWord, patch: Partial<IeltsProgressRecord>, forceStatus?: IeltsProgressStatus) => {
    setProgress((current) => ({
      ...current,
      [word.id]: normalizeProgressRecord(getNextProgressForCorrect(current[word.id], selectedDay.dateISO, patch, forceStatus)),
    }));
  };

  const markWordWrong = (word: IeltsCanonicalWord, patch: Partial<IeltsProgressRecord>) => {
    setProgress((current) => ({
      ...current,
      [word.id]: normalizeProgressRecord(getNextProgressForWrong(current[word.id], selectedDay.dateISO, patch)),
    }));
  };

  const checkSpelling = () => {
    if (!activeWord) return;
    const correct = isSpellingCorrect(spellingInput, activeWord);
    setSpellingResult(correct ? 'correct' : 'wrong');
    if (correct) {
      updateWordProgress(activeWord, { spellingCorrect: true });
      setShowAnswer(true);
    } else {
      markWordWrong(activeWord, { spellingCorrect: false });
    }
  };

  const chooseMeaning = (choice: string) => {
    if (!activeWord) return;
    setSelectedMeaning(choice);
    const correct = choice === getPrimaryMeaning(activeWord);
    setMeaningResult(correct ? 'correct' : 'wrong');
    if (correct) {
      updateWordProgress(activeWord, { meaningCorrect: true });
    } else {
      markWordWrong(activeWord, { meaningCorrect: false });
    }
  };

  const markWordStatus = (word: IeltsCanonicalWord, status: IeltsProgressStatus) => {
    if (status === 'mastered') {
      updateWordProgress(word, { spellingCorrect: true, meaningCorrect: true }, 'mastered');
      return;
    }
    markWordWrong(word, {});
  };

  const openFlashcards = (index = 0) => {
    setCardIndex(Math.max(index, 0));
    resetCardPractice('spell');
    setFlashOpen(true);
  };

  const openFlashcardsForDate = (dateISO: string, index = 0) => {
    setSelectedDateISO(dateISO);
    setCurrentMonthKey(getMonthKey(dateISO));
    setCardIndex(Math.max(index, 0));
    resetCardPractice('spell');
    setFlashOpen(true);
  };

  const openWordFlashcards = (word: IeltsCanonicalWord) => {
    const firstDateISO = getFirstCoreDateForWord(word.id, canonicalData.words, plannerOptions);
    const maxScanDays = Math.ceil(canonicalData.words.length / IELTS_WORDS_PER_DAY) + 14;

    for (let offset = 0; offset < maxScanDays; offset += 1) {
      const dateISO = addDaysISO(firstDateISO, offset);
      const plan = buildIeltsDayPlan(dateISO, canonicalData.words, progress, plannerOptions);
      const index = plan.words.findIndex((dayWord) => dayWord.id === word.id);
      if (index >= 0) {
        openFlashcardsForDate(dateISO, index);
        return;
      }
    }

    openFlashcardsForDate(firstDateISO, 0);
  };

  const moveCard = (direction: 1 | -1) => {
    setCardIndex((current) => Math.min(Math.max(current + direction, 0), selectedDay.words.length - 1));
    resetCardPractice('spell');
  };

  const moveMonth = (direction: 1 | -1) => {
    const nextMonth = addMonthsToKey(currentMonthKey, direction);
    setCurrentMonthKey(nextMonth);
    setSelectedDateISO(`${nextMonth}-01`);
  };

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[8px] border border-white/10 bg-slate-900/75 p-4 shadow-xl shadow-slate-950/25">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-[6px] bg-cyan-400/15 px-2.5 py-1 text-xs font-black text-cyan-200">雅思6.5+</span>
                <span className="rounded-[6px] bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-200">每天 {IELTS_WORDS_PER_DAY} 词</span>
              </div>
              <h1 className="mt-3 text-2xl font-black tracking-normal text-white sm:text-3xl">自然日历词汇闪卡</h1>
            </div>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-2">
                <div className="text-lg font-black text-white">{formatNumber(canonicalData.words.length)}</div>
                <div className="text-xs text-slate-400">词卡</div>
              </div>
              <div className="rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-2">
                <div className="text-lg font-black text-white">{IELTS_WORDS_PER_DAY}</div>
                <div className="text-xs text-slate-400">每日</div>
              </div>
              <div className="rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-2">
                <div className="text-lg font-black text-white">{formatNumber(wrongWords.length)}</div>
                <div className="text-xs text-slate-400">错词</div>
              </div>
              <div className="rounded-[8px] border border-violet-300/20 bg-violet-400/[0.06] px-3 py-2">
                <div className="text-lg font-black text-violet-200">{formatNumber(overallTopicSummary.mastered + overallTopicSummary.wrong)}</div>
                <div className="text-xs text-slate-400">分类</div>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-7">
            {(Object.keys(TAB_META) as StudyTab[]).map((key) => {
              const item = TAB_META[key];
              const Icon = item.icon;
              const active = activeTab === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActiveTab(key)}
                  className={`flex h-11 items-center justify-center gap-2 rounded-[8px] border text-sm font-black transition ${
                    active
                      ? 'border-cyan-300 bg-cyan-400/15 text-white'
                      : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-300/40 hover:bg-white/[0.07]'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[8px] border border-white/10 bg-slate-900/75 p-4 shadow-xl shadow-slate-950/25">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-black text-slate-300">计划 Day {selectedDay.day}</div>
              <div className="mt-1 text-2xl font-black text-white">{selectedDay.date}</div>
              <div className="mt-1 text-sm text-slate-400">
                {selectedDay.weekdayCn} · {selectedDay.holidayCn || `Unit ${selectedDay.coreWords[0]?.unit || selectedDay.words[0]?.unit || '-'}`}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowPdfModal(true)}
              className="inline-flex h-10 items-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-400/10"
            >
              <FileDown className="h-4 w-4" />
              PDF
            </button>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-300"
              style={{ width: `${selectedProgress.total ? (selectedProgress.mastered / selectedProgress.total) * 100 : 0}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-[6px] bg-emerald-400/10 px-2 py-2 text-emerald-200">掌握 {selectedProgress.mastered}</div>
            <div className="rounded-[6px] bg-rose-400/10 px-2 py-2 text-rose-200">错词 {selectedProgress.wrong}</div>
            <div className="rounded-[6px] bg-white/[0.04] px-2 py-2 text-slate-300">共 {selectedProgress.total}</div>
          </div>
          <button
            type="button"
            onClick={() => openFlashcards(0)}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-[8px] bg-cyan-300 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
          >
            <BookOpen className="h-4 w-4" />
            开始闪卡
          </button>
        </div>
      </section>

      {activeTab === 'calendar' && (
        <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[8px] border border-white/10 bg-slate-900/75 p-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => moveMonth(-1)}
                className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="text-lg font-black text-white">{monthLabel}</div>
              <button
                type="button"
                onClick={() => moveMonth(1)}
                className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-slate-200 transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400">
              {['日', '一', '二', '三', '四', '五', '六'].map((item) => <div key={item}>{item}</div>)}
            </div>
            <div className="mt-2 grid grid-cols-7 gap-2">
              {Array.from({ length: new Date(`${monthDays[0]?.dateISO || selectedDateISO}T00:00:00`).getDay() }).map((_, index) => (
                <div key={`empty-${index}`} className="min-h-[92px] sm:min-h-[108px]" />
              ))}
              {monthDays.map((day) => {
                const active = selectedDay.dateISO === day.dateISO;
                const dayProgress = getDayProgress(day, progress);
                const dayComplete = dayProgress.total > 0 && dayProgress.mastered === dayProgress.total && dayProgress.wrong === 0;
                const dayHasWrong = dayProgress.wrong > 0;
                const stateClass = dayHasWrong
                  ? 'border-amber-300 bg-amber-400/15 shadow-lg shadow-amber-950/30'
                  : dayComplete
                    ? 'border-emerald-300 bg-emerald-400/15 shadow-lg shadow-emerald-950/30'
                    : active
                      ? 'border-cyan-300 bg-cyan-400/15 shadow-lg shadow-cyan-950/30'
                      : 'border-white/10 bg-white/[0.035] hover:border-cyan-300/40 hover:bg-white/[0.07]';
                return (
                  <button
                    key={day.dateISO}
                    type="button"
                    onClick={() => openFlashcardsForDate(day.dateISO, 0)}
                    className={`relative min-h-[92px] rounded-[8px] border p-2 pb-7 text-left transition sm:min-h-[108px] ${stateClass}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-black text-white">{day.dayOfMonth}</span>
                      {dayHasWrong ? (
                        <span className="rounded-full bg-amber-300 px-1.5 py-0.5 text-[10px] font-black text-slate-950">错{dayProgress.wrong}</span>
                      ) : dayComplete ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-200" />
                      ) : day.dateISO === todayDateISO ? (
                        <span className="rounded-full bg-cyan-300 px-1.5 py-0.5 text-[10px] font-black text-slate-950">今</span>
                      ) : (
                        <span className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                    </div>
                    <div className="mt-2 text-[11px] font-bold leading-snug text-slate-300">
                      {day.weekdayCn} · {day.weekdayEn}
                    </div>
                    <div className="mt-1 line-clamp-2 min-h-[28px] text-[10px] leading-snug text-slate-400">
                      {day.holidayCn ? `${day.holidayCn}${day.holidayEn ? ` / ${day.holidayEn}` : ''}` : day.date}
                    </div>
                    {overallTopicSummary.total > 0 && overallTopicSummary.mastered + overallTopicSummary.wrong > 0 && (
                      <div className="absolute bottom-4 left-2 right-9 h-0.5 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={`h-full rounded-full ${overallTopicSummary.wrong > 0 ? 'bg-amber-300' : 'bg-violet-400'}`}
                          style={{ width: `${((overallTopicSummary.mastered + overallTopicSummary.wrong) / overallTopicSummary.total) * 100}%` }}
                        />
                      </div>
                    )}
                    <div className="absolute bottom-2 left-2 right-9 h-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className={`h-full rounded-full ${dayHasWrong ? 'bg-amber-300' : 'bg-emerald-300'}`}
                        style={{ width: `${dayProgress.total ? (dayProgress.mastered / dayProgress.total) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="absolute bottom-1.5 right-2 text-sm font-black text-emerald-300">6</span>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="rounded-[8px] border border-white/10 bg-slate-900/75 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-black text-slate-300">当天学习</div>
              <button
                type="button"
                onClick={() => {
                  setProgress((current) => {
                    const next = { ...current };
                    selectedDay.words.forEach((word) => delete next[word.id]);
                    return next;
                  });
                }}
                className="flex h-9 w-9 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-slate-300"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>

            {/* Core words */}
            <div className="mt-3 text-[10px] font-black text-slate-500">核心词 ({selectedDay.words.length})</div>
            <div className="mt-2 space-y-2">
              {selectedDay.words.map((word, index) => {
                const status = getWordStatus(word, progress);
                return (
                  <button
                    key={word.id}
                    type="button"
                    onClick={() => openFlashcards(index)}
                    className="flex w-full items-center justify-between gap-3 rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-3 text-left transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-black text-white">{word.word}</div>
                      <div className="mt-1 truncate text-xs text-slate-400">[{word.phonetic}]</div>
                    </div>
                    <span className={`rounded-full px-2 py-1 text-[10px] font-black ${getStatusClass(status)}`}>
                      {getStatusLabel(status)}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Topic review words */}
            {topicDayPlan.selectedTerms.length > 0 && (
              <>
                <div className="mt-4 border-t border-white/10 pt-4">
                  <div className="text-[10px] font-black text-slate-500">
                    分类词 ({topicDayPlan.selectedTerms.length})
                  </div>
                </div>
                <div className="mt-2 space-y-2">
                  {topicDayPlan.selectedTerms.map((tw) => {
                    const rec = tw.id ? topicProgress[tw.id] : undefined;
                    const status = rec?.status || 'new';
                    return (
                      <div key={tw.id} className="flex w-full items-center justify-between gap-3 rounded-[8px] border border-violet-300/20 bg-violet-400/[0.06] px-3 py-3 text-left">
                        <div className="min-w-0">
                          <div className="truncate text-sm font-black text-white">{tw.displayWord || tw.word}</div>
                          <div className="mt-1 truncate text-xs text-slate-400">{tw.topicName}</div>
                        </div>
                        <span className={`rounded-full px-2 py-1 text-[10px] font-black ${getStatusClass(status)}`}>
                          {getStatusLabel(status)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Topic flash button — navigates to the first skill tab with topics */}
            <button
              type="button"
              onClick={() => {
                if (listeningTopics.length > 0) setActiveTab('listening');
                else if (readingTopics.length > 0) setActiveTab('reading');
                else if (speakingTopics.length > 0) setActiveTab('speaking');
                else if (writingTopics.length > 0) setActiveTab('writing');
              }}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-[8px] border border-violet-300/30 bg-violet-400/10 text-sm font-black text-violet-200 transition hover:border-violet-300/50 hover:bg-violet-400/20"
            >
              <Layers className="h-4 w-4" />
              分类词进度 (已学 {overallTopicSummary.mastered + overallTopicSummary.wrong}/{overallTopicSummary.total})
            </button>
          </aside>
        </section>
      )}

      {activeTab === 'search' && (
        <section className="mt-5 rounded-[8px] border border-white/10 bg-slate-900/75 p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-11 w-full rounded-[8px] border border-white/10 bg-slate-950/60 pl-10 pr-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
              placeholder="搜索单词、释义、例句、同反义、场景"
            />
          </div>
          <WordGrid words={filteredWords} progress={progress} onOpen={openWordFlashcards} />
        </section>
      )}

      {activeTab === 'wrong' && (
        <WrongWordsPanel
          words={wrongWords}
          progress={progress}
          onOpen={openWordFlashcards}
          onClear={(word) => markWordStatus(word, 'mastered')}
        />
      )}

      {activeTab === 'listening' && (
        <TopicPanel
          topics={listeningTopics}
          wordsByNormalized={wordsByNormalized}
          expandedTopicId={expandedTopicId}
          onToggle={setExpandedTopicId}
          topicProgress={topicProgress}
          onStartFlash={(topic) => { setActiveFlashTopic(topic); setTopicFlashOpen(true); }}
        />
      )}

      {activeTab === 'writing' && (
        <TopicPanel
          topics={writingTopics}
          wordsByNormalized={wordsByNormalized}
          expandedTopicId={expandedTopicId}
          onToggle={setExpandedTopicId}
          topicProgress={topicProgress}
          onStartFlash={(topic) => { setActiveFlashTopic(topic); setTopicFlashOpen(true); }}
        />
      )}

      {activeTab === 'reading' && (
        <TopicPanel
          topics={readingTopics}
          wordsByNormalized={wordsByNormalized}
          expandedTopicId={expandedTopicId}
          onToggle={setExpandedTopicId}
          topicProgress={topicProgress}
          onStartFlash={(topic) => { setActiveFlashTopic(topic); setTopicFlashOpen(true); }}
        />
      )}

      {activeTab === 'speaking' && (
        <TopicPanel
          topics={speakingTopics}
          wordsByNormalized={wordsByNormalized}
          expandedTopicId={expandedTopicId}
          onToggle={setExpandedTopicId}
          topicProgress={topicProgress}
          onStartFlash={(topic) => { setActiveFlashTopic(topic); setTopicFlashOpen(true); }}
        />
      )}

      <details className="mt-5 rounded-[8px] border border-white/10 bg-slate-900/60 p-4 text-sm text-slate-300">
        <summary className="cursor-pointer font-black text-slate-200">数据维护</summary>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AuditItem label="源词条" value={auditData.sourceUnitEntries} />
          <AuditItem label="学习卡" value={auditData.canonicalWordCount} />
          <AuditItem label="校正卡" value={auditData.dictCorrectedCount} />
          <AuditItem label="保留片段" value={canonicalData.unstableFragments.length} />
        </div>
        <div className="mt-4 rounded-[8px] border border-white/10 bg-slate-950/50 p-3">
          <div className="text-xs font-black text-slate-400">未进入日历的源片段</div>
          <div className="mt-2 max-h-32 overflow-auto text-xs leading-relaxed text-slate-400">
            {auditData.orphanSourceEntries.map((entry) => `${entry.word} · Unit ${entry.unit}`).join(' / ') || '无'}
          </div>
        </div>
      </details>

      {flashOpen && activeWord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur">
          <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[8px] border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <div className="text-xs font-black text-cyan-200">Day {selectedDay.day} · {cardIndex + 1}/{selectedDay.words.length}</div>
                <div className="mt-1 text-sm text-slate-400">{selectedDay.date} · Unit {activeWord.unit}</div>
              </div>
              <button
                type="button"
                onClick={() => setFlashOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-slate-200"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-5">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { key: 'spell' as const, label: '拼写' },
                  { key: 'meaning' as const, label: '选义' },
                  { key: 'details' as const, label: '资料' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => resetCardPractice(item.key)}
                    className={`h-10 rounded-[8px] border text-sm font-black transition ${
                      practiceMode === item.key
                        ? 'border-cyan-300 bg-cyan-400/15 text-white'
                        : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-300/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <span className={`rounded-full px-2.5 py-1 font-black ${activeWordProgress?.spellingCorrect ? 'bg-emerald-400/15 text-emerald-200' : 'bg-white/10 text-slate-300'}`}>
                  拼写{activeWordProgress?.spellingCorrect ? '已过' : '未过'}
                </span>
                <span className={`rounded-full px-2.5 py-1 font-black ${activeWordProgress?.meaningCorrect ? 'bg-emerald-400/15 text-emerald-200' : 'bg-white/10 text-slate-300'}`}>
                  选义{activeWordProgress?.meaningCorrect ? '已过' : '未过'}
                </span>
                {(activeWordProgress?.wrongCount || 0) > 0 && (
                  <span className="rounded-full bg-amber-400/15 px-2.5 py-1 font-black text-amber-200">错 {activeWordProgress?.wrongCount} 次</span>
                )}
              </div>

              {practiceMode === 'spell' && (
                <div className="mt-4 space-y-4">
                  <button
                    type="button"
                    onClick={() => setShowAnswer((value) => !value)}
                    aria-label={showAnswer ? '切回中文释义面' : '翻到英文答案面'}
                    aria-pressed={showAnswer}
                    className="block w-full text-left"
                    style={{ perspective: '1200px' }}
                  >
                    <div
                      className="relative min-h-[260px] transition-transform duration-500"
                      style={{ transformStyle: 'preserve-3d', transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                    >
                      <div
                        className="absolute inset-0 rounded-[8px] border border-cyan-300/25 bg-cyan-400/10 p-5"
                        aria-hidden={showAnswer}
                        style={{ backfaceVisibility: 'hidden' }}
                      >
                        <div className="text-xs font-black text-cyan-200">看中文拼写英文</div>
                        <div className="mt-4 space-y-3">
                          {getMeaningLines(activeWord).map((meaning, index) => (
                            <div key={index} className="rounded-[8px] bg-slate-950/45 p-3 text-base font-bold leading-relaxed text-white">{meaning}</div>
                          ))}
                        </div>
                        <div className="mt-4 text-sm text-slate-400">点击卡片翻面查看英文和例句。</div>
                      </div>
                      <div
                        className="absolute inset-0 rounded-[8px] border border-emerald-300/25 bg-emerald-400/10 p-5"
                        aria-hidden={!showAnswer}
                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="break-words text-4xl font-black text-white">{activeWord.word}</div>
                            <div className="mt-2 text-sm font-bold text-emerald-100">[{activeWord.phonetic}] · {getPosText(activeWord)}</div>
                          </div>
                          <span className="rounded-[6px] bg-white/10 px-2.5 py-1 text-xs font-black text-slate-200">Unit {activeWord.unit}</span>
                        </div>
                        {activeWord.examples[0] && (
                          <div className="mt-5 rounded-[8px] bg-slate-950/45 p-3">
                            <div className="text-sm leading-relaxed text-white">{activeWord.examples[0].english}</div>
                            <div className="mt-1 text-xs leading-relaxed text-slate-400">{activeWord.examples[0].chinese}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </button>
                  <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                    <label className="text-xs font-black text-slate-400" htmlFor="ielts-spelling-answer">拼写检查</label>
                    <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                      <input
                        id="ielts-spelling-answer"
                        value={spellingInput}
                        onChange={(event) => {
                          setSpellingInput(event.target.value);
                          setSpellingResult('idle');
                        }}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') checkSpelling();
                        }}
                        className="h-11 min-w-0 flex-1 rounded-[8px] border border-white/10 bg-slate-950/60 px-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300"
                        placeholder="输入英文单词"
                      />
                      <button
                        type="button"
                        onClick={checkSpelling}
                        className="h-11 rounded-[8px] bg-cyan-300 px-4 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                      >
                        检查
                      </button>
                    </div>
                    {spellingResult !== 'idle' && (
                      <div className={`mt-3 rounded-[6px] px-3 py-2 text-sm font-bold ${spellingResult === 'correct' ? 'bg-emerald-400/15 text-emerald-200' : 'bg-amber-400/15 text-amber-200'}`}>
                        {spellingResult === 'correct' ? '拼写正确' : `拼写错误，正确答案：${activeWord.word}`}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {practiceMode === 'meaning' && (
                <div className="mt-4 rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
                  <div className="text-xs font-black text-slate-400">看英文选择中文</div>
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <div className="break-words text-4xl font-black text-white">{activeWord.word}</div>
                      <div className="mt-2 text-sm text-slate-400">[{activeWord.phonetic}] · {getPosText(activeWord)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => speakWord(activeWord.word)}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-cyan-300 text-slate-950"
                    >
                      <Volume2 className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-5 grid gap-2">
                    {meaningChoices.map((choice) => {
                      const selected = selectedMeaning === choice;
                      const correct = choice === getPrimaryMeaning(activeWord);
                      return (
                        <button
                          key={choice}
                          type="button"
                          onClick={() => chooseMeaning(choice)}
                          className={`rounded-[8px] border px-4 py-3 text-left text-sm font-bold leading-relaxed transition ${
                            selected
                              ? correct
                                ? 'border-emerald-300 bg-emerald-400/15 text-emerald-100'
                                : 'border-amber-300 bg-amber-400/15 text-amber-100'
                              : 'border-white/10 bg-slate-950/45 text-slate-200 hover:border-cyan-300/40'
                          }`}
                        >
                          {choice}
                        </button>
                      );
                    })}
                  </div>
                  {meaningResult !== 'idle' && (
                    <div className={`mt-3 rounded-[6px] px-3 py-2 text-sm font-bold ${meaningResult === 'correct' ? 'bg-emerald-400/15 text-emerald-200' : 'bg-amber-400/15 text-amber-200'}`}>
                      {meaningResult === 'correct' ? '选择正确' : `选择错误，正确答案：${getPrimaryMeaning(activeWord)}`}
                    </div>
                  )}
                </div>
              )}

              {practiceMode === 'details' && (
                <div className="mt-4 space-y-4">
                  <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center gap-3">
                      <h2 className="break-words text-4xl font-black tracking-normal text-white">{activeWord.word}</h2>
                      <button
                        type="button"
                        onClick={() => speakWord(activeWord.word)}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-cyan-300 text-slate-950"
                      >
                        <Volume2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-[6px] bg-white/10 px-2.5 py-1 text-sm font-bold text-slate-200">[{activeWord.phonetic}]</span>
                      <span className="rounded-[6px] bg-white/10 px-2.5 py-1 text-sm font-bold text-slate-200">{getPosText(activeWord)}</span>
                    </div>
                  </div>
                  <InfoBlock title="释义" items={getMeaningLines(activeWord)} />
                  {activeWord.examples.length > 0 && (
                    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                      <div className="text-xs font-black text-slate-400">例句</div>
                      <div className="mt-2 text-base leading-relaxed text-white">{activeWord.examples[0].english}</div>
                      <div className="mt-1 text-sm leading-relaxed text-slate-400">{activeWord.examples[0].chinese}</div>
                    </div>
                  )}
                  <InfoBlock title="记忆 / 搭配" items={[...activeWord.memoryNotes, ...activeWord.supplements].slice(0, 5)} />
                  <InfoBlock title="同反义 / 区别" items={[...activeWord.synonyms, ...activeWord.antonyms, ...activeWord.distinctions, ...activeWord.proverbs].slice(0, 8)} />
                  <details className="rounded-[8px] border border-white/10 bg-slate-950/50 p-4">
                    <summary className="cursor-pointer text-sm font-black text-slate-200">全部资料</summary>
                    <div className="mt-3 space-y-3 text-xs leading-relaxed text-slate-400">
                      {activeWord.sourceRefs.map((ref) => (
                        <pre key={`${ref.sourceEntryId}-${ref.sourceWord}`} className="max-h-56 overflow-auto whitespace-pre-wrap rounded-[6px] bg-slate-950 p-3">{ref.rawMarkdown}</pre>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => markWordStatus(activeWord, 'wrong')}
                  className="flex h-10 items-center justify-center gap-2 rounded-[8px] border border-rose-300/30 bg-rose-400/10 px-3 text-sm font-black text-rose-100"
                >
                  <XCircle className="h-4 w-4" />
                  错词
                </button>
                <button
                  type="button"
                  onClick={() => markWordStatus(activeWord, 'mastered')}
                  className="flex h-10 items-center justify-center gap-2 rounded-[8px] border border-emerald-300/30 bg-emerald-400/10 px-3 text-sm font-black text-emerald-100"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  掌握
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => moveCard(-1)}
                  disabled={cardIndex === 0}
                  className="flex h-10 items-center justify-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-slate-200 disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" />
                  上一个
                </button>
                <button
                  type="button"
                  onClick={() => moveCard(1)}
                  disabled={cardIndex === selectedDay.words.length - 1}
                  className="flex h-10 items-center justify-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-slate-200 disabled:opacity-40"
                >
                  下一个
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {topicFlashOpen && activeFlashTopic && (
        <TopicFlashPanel
          topic={activeFlashTopic}
          wordsByNormalized={wordsByNormalized}
          allAppendixTerms={allAppendixFlashWords}
          topicProgress={topicProgress}
          onTopicProgressChange={setTopicProgress}
          onClose={() => setTopicFlashOpen(false)}
        />
      )}

      {showPdfModal && (
        <IeltsPDFExportModal
          selectedDateISO={selectedDateISO}
          currentMonthKey={currentMonthKey}
          words={canonicalData.words}
          progress={progress}
          plannerOptions={plannerOptions}
          appendixTopics={canonicalData.appendixTopics}
          allAppendixFlashWords={allAppendixFlashWords}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </div>
  );
}

function AuditItem({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] px-3 py-2">
      <div className="text-lg font-black text-white">{formatNumber(value)}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  const visibleItems = items.map((item) => item.trim()).filter(Boolean);
  if (!visibleItems.length) return null;
  return (
    <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
      <div className="text-xs font-black text-slate-400">{title}</div>
      <div className="mt-2 space-y-2">
        {visibleItems.map((item, index) => (
          <div key={`${title}-${index}`} className="text-sm leading-relaxed text-slate-100">{item}</div>
        ))}
      </div>
    </div>
  );
}

function WordGrid({ words, progress, onOpen }: {
  words: IeltsCanonicalWord[];
  progress: IeltsProgressState;
  onOpen: (word: IeltsCanonicalWord) => void;
}) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {words.map((word) => {
        const status = getWordStatus(word, progress);
        return (
          <button
            key={word.id}
            type="button"
            onClick={() => onOpen(word)}
            className="min-h-[128px] rounded-[8px] border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-cyan-300/40 hover:bg-white/[0.07]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="break-words text-lg font-black text-white">{word.word}</div>
                <div className="mt-1 text-xs text-slate-400">[{word.phonetic}] · Unit {word.unit}</div>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${getStatusClass(status)}`}>
                {getStatusLabel(status)}
              </span>
            </div>
            <div className="mt-3 line-clamp-3 text-sm leading-relaxed text-slate-300">{getMeaningLines(word).join('；')}</div>
          </button>
        );
      })}
    </div>
  );
}

function WrongWordsPanel({ words, progress, onOpen, onClear }: {
  words: IeltsCanonicalWord[];
  progress: IeltsProgressState;
  onOpen: (word: IeltsCanonicalWord) => void;
  onClear: (word: IeltsCanonicalWord) => void;
}) {
  return (
    <section className="mt-5 rounded-[8px] border border-amber-300/20 bg-slate-900/75 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-lg font-black text-white">错词复习</div>
          <div className="mt-1 text-sm text-slate-400">拼写题或选义题出错的单词会进入这里，重新完成两项练习后自动退出。</div>
        </div>
        <div className="rounded-[8px] bg-amber-400/10 px-3 py-2 text-sm font-black text-amber-200">错词 {words.length}</div>
      </div>

      {words.length === 0 ? (
        <div className="mt-4 rounded-[8px] border border-white/10 bg-white/[0.04] p-6 text-center text-sm text-slate-300">
          当前没有错词。
        </div>
      ) : (
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {words.map((word) => {
            const record = progress[word.id];
            return (
              <div key={word.id} className="rounded-[8px] border border-amber-300/20 bg-amber-400/[0.06] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="break-words text-lg font-black text-white">{word.word}</div>
                    <div className="mt-1 text-xs text-slate-400">Unit {word.unit} · 错 {record?.wrongCount || 1} 次</div>
                  </div>
                  <span className="rounded-full bg-amber-300 px-2 py-1 text-[10px] font-black text-slate-950">复习</span>
                </div>
                <div className="mt-3 line-clamp-2 text-sm leading-relaxed text-slate-300">{getPrimaryMeaning(word)}</div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onOpen(word)}
                    className="h-10 rounded-[8px] bg-amber-300 text-sm font-black text-slate-950 transition hover:bg-amber-200"
                  >
                    重新练
                  </button>
                  <button
                    type="button"
                    onClick={() => onClear(word)}
                    className="h-10 rounded-[8px] border border-white/10 bg-white/[0.04] text-sm font-bold text-slate-200 transition hover:border-emerald-300/40 hover:bg-emerald-400/10"
                  >
                    已掌握
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

function TopicPanel({ topics, wordsByNormalized, topicProgress, expandedTopicId, onToggle, onStartFlash }: {
  topics: IeltsAppendixTopic[];
  wordsByNormalized: Map<string, IeltsCanonicalWord>;
  topicProgress: TopicProgressState;
  expandedTopicId: string;
  onToggle: (id: string) => void;
  onStartFlash: (topic: IeltsAppendixTopic) => void;
}) {
  // Compute topic-level summary from shared progress
  const topicSummary = useMemo(() => {
    const summary: Record<string, { mastered: number; wrong: number; learning: number }> = {};
    for (const [termId, record] of Object.entries(topicProgress)) {
      const topicId = termId.replace(/-term-\d+$/, '');
      if (!topicId) continue;
      summary[topicId] = summary[topicId] || { mastered: 0, wrong: 0, learning: 0 };
      if (record.status === 'mastered') summary[topicId].mastered += 1;
      else if (record.status === 'wrong') summary[topicId].wrong += 1;
      else if (record.status === 'learning') summary[topicId].learning += 1;
    }
    return summary;
  }, [topicProgress]);

  return (
    <section className="mt-5 grid gap-4 lg:grid-cols-2">
      {topics.map((topic) => {
        const expanded = expandedTopicId === topic.id;
        const matched = topic.terms.filter((term) => wordsByNormalized.has(normalizeTerm(term.term))).length;
        const tp = topicSummary[topic.id];
        return (
          <div key={topic.id} className="rounded-[8px] border border-white/10 bg-slate-900/75 p-4">
            <button
              type="button"
              onClick={() => onToggle(expanded ? '' : topic.id)}
              className="flex w-full items-start justify-between gap-4 text-left"
            >
              <div>
                <div className="text-base font-black text-white">{topic.topic}</div>
                <div className="mt-1 text-xs text-slate-400">
                  {topic.section} · {topic.terms.length} 项 · 已入卡 {matched}
                  {tp && (tp.mastered + tp.learning + tp.wrong) > 0 && (
                    <span className="ml-2">
                      · 练习 {tp.mastered + tp.learning + tp.wrong}
                      {tp.wrong > 0 && <span className="ml-1 text-amber-200">错{tp.wrong}</span>}
                    </span>
                  )}
                </div>
              </div>
              <Layers className="mt-1 h-4 w-4 shrink-0 text-slate-400" />
            </button>
            {expanded && (
              <>
                <div className="mt-4 grid gap-2">
                  {topic.terms.slice(0, 80).map((term) => {
                    const linkedWord = wordsByNormalized.get(normalizeTerm(term.term));
                    const termRec = topicProgress[term.id];
                    const termStatus = termRec?.status || 'new';
                    return (
                      <div key={term.id} className="flex items-center justify-between gap-3 rounded-[6px] border border-white/10 bg-white/[0.035] px-3 py-2">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="font-black text-white">{term.term}</span>
                            {linkedWord && <span className="text-xs text-cyan-200">Unit {linkedWord.unit}</span>}
                          </div>
                          <div className="mt-1 text-sm text-slate-400">{term.meaning || linkedWord?.meaning || ''}</div>
                        </div>
                        <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-black ${getStatusClass(termStatus as IeltsProgressStatus)}`}>
                          {getStatusLabel(termStatus as IeltsProgressStatus)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                {topic.terms.length > 0 && (
                  <button
                    type="button"
                    onClick={() => onStartFlash(topic)}
                    className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-[8px] bg-cyan-300 text-sm font-black text-slate-950 transition hover:bg-cyan-200"
                  >
                    <BookOpen className="h-4 w-4" />
                    开始闪卡（浏览 / 拼写 / 选义）
                  </button>
                )}
              </>
            )}
          </div>
        );
      })}
    </section>
  );
}

// ============================================
// 雅思PDF导出弹窗 — 与校内词汇完全一致的5种范围选择
// ============================================
function IeltsPDFExportModal({
  selectedDateISO,
  currentMonthKey,
  words,
  progress,
  plannerOptions,
  appendixTopics,
  allAppendixFlashWords,
  onClose,
}: {
  selectedDateISO: string;
  currentMonthKey: string;
  words: IeltsCanonicalWord[];
  progress: IeltsProgressState;
  plannerOptions: IeltsPlannerOptions;
  appendixTopics: IeltsAppendixTopic[];
  allAppendixFlashWords: TopicFlashWord[];
  onClose: () => void;
}) {
  const monthDays = useMemo(
    () => buildIeltsCalendarMonth(currentMonthKey, words, progress, plannerOptions),
    [currentMonthKey, words, progress, plannerOptions],
  );
  const todayPlan = useMemo(
    () => buildIeltsDayPlan(selectedDateISO, words, progress, plannerOptions),
    [selectedDateISO, words, progress, plannerOptions],
  );
  const currentDay = todayPlan.absoluteDay;
  const monthLabel = useMemo(() => {
    const [y, m] = currentMonthKey.split('-');
    return `${y}年${Number(m)}月`;
  }, [currentMonthKey]);

  type PdfRangeType = 'day' | 'week' | 'month' | 'custom' | 'selected' | 'topics';
  const [pdfRange, setPdfRange] = useState<PdfRangeType>('day');
  const [pdfDayStart, setPdfDayStart] = useState(Math.max(1, currentDay));
  const [pdfDayEnd, setPdfDayEnd] = useState(Math.max(1, currentDay));
  const [pdfSelectedDates, setPdfSelectedDates] = useState<string[]>([selectedDateISO]);
  const [pdfSelectedTopicIds, setPdfSelectedTopicIds] = useState<string[]>([]);
  const [pdfStudentName, setPdfStudentName] = useState('');
  const [pdfStudentClass, setPdfStudentClass] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [pdfExportMode, setPdfExportMode] = useState<'cn2en' | 'en2cn'>('cn2en');
  const [showPreview, setShowPreview] = useState(false);

  const computedPreview = useMemo(() => {
    let merged: CalendarWord[] = [];
    let dayRangeText = '';

    if (pdfRange === 'topics') {
      const selectedTerms = allAppendixFlashWords.filter(
        (fw) => pdfSelectedTopicIds.includes(fw.topicId),
      );
      merged = mergeWordsFromDays([{ words: selectedTerms.map(mapTopicWordToCalendarWord) }]);
      dayRangeText = pdfSelectedTopicIds
        .map((id) => appendixTopics.find((t) => t.id === id)?.topic || '')
        .filter(Boolean)
        .join('、');
    } else {
      let days: IeltsDayPlan<IeltsCanonicalWord>[];
      if (pdfRange === 'day') {
        days = [todayPlan];
      } else if (pdfRange === 'week') {
        days = monthDays.filter(d => {
          const offset = (new Date(d.dateISO).getTime() - new Date(selectedDateISO).getTime()) / 86400000;
          return offset <= 0 && offset > -7;
        });
      } else if (pdfRange === 'month') {
        days = monthDays;
      } else if (pdfRange === 'selected') {
        days = pdfSelectedDates.map(dateISO =>
          buildIeltsDayPlan(dateISO, words, progress, plannerOptions),
        );
      } else {
        const anchorDate = new Date(plannerOptions.anchorDateISO || DEFAULT_IELTS_ANCHOR_DATE_ISO);
        const startDate = addDaysISO(anchorDate.toISOString().slice(0, 10), pdfDayStart - 1);
        const endDate = addDaysISO(anchorDate.toISOString().slice(0, 10), pdfDayEnd - 1);
        const allDays: IeltsDayPlan<IeltsCanonicalWord>[] = [];
        let cursor = startDate;
        while (cursor <= endDate) {
          allDays.push(buildIeltsDayPlan(cursor, words, progress, plannerOptions));
          cursor = addDaysISO(cursor, 1);
        }
        days = allDays;
      }
      const calendarWords = days.flatMap(d => d.words.map(mapToCalendarWord));
      merged = mergeWordsFromDays([{ words: calendarWords }]);

      if (pdfRange === 'selected') {
        dayRangeText = pdfSelectedDates.join('、');
      } else if (pdfRange === 'day') {
        dayRangeText = todayPlan.date;
      } else {
        dayRangeText = `${days[0]?.date || ''} — ${days[days.length - 1]?.date || ''}`;
      }
    }

    const totalPages = Math.ceil(merged.length / 25);
    return { words: merged, dayRangeText, totalPages };
  }, [pdfRange, pdfDayStart, pdfDayEnd, pdfSelectedDates, pdfSelectedTopicIds, selectedDateISO, todayPlan, monthDays, words, progress, plannerOptions, allAppendixFlashWords, appendixTopics]);

  const handleEnterPreview = () => {
    if (pdfRange === 'selected' && pdfSelectedDates.length === 0) {
      alert('请至少选择一个日期');
      return;
    }
    if (pdfRange === 'topics' && pdfSelectedTopicIds.length === 0) {
      alert('请至少选择一个主题');
      return;
    }
    if (computedPreview.words.length === 0) {
      alert('选定范围内没有词汇');
      return;
    }
    if (pdfRange === 'topics' && computedPreview.words.length > 200) {
      alert(`分类词汇导出最多 200 词，当前 ${computedPreview.words.length} 词，请减少主题选择`);
      return;
    }
    setShowPreview(true);
  };

  const totalDays = Math.ceil(words.length / IELTS_WORDS_PER_DAY) + 14;

  const handleGenerate = async () => {
    setPdfGenerating(true);
    try {
      const todayStr = new Date().toLocaleDateString('zh-CN');

      const success = await generatePDF({
        words: computedPreview.words,
        exportType: 'test',
        exportMode: pdfExportMode,
        studentName: pdfStudentName,
        studentClass: pdfStudentClass,
        date: todayStr,
        semesterName: '雅思6.5+',
        dayRange: computedPreview.dayRangeText,
      });

      if (success) onClose();
      else alert('PDF生成失败，请重试');
    } catch (e) {
      console.error(e);
      alert('PDF生成出错');
    }
    setPdfGenerating(false);
  };

  function getPreviewText(word: IeltsCanonicalWord): string {
    if (pdfExportMode === 'en2cn') return word.word;
    const lines = getMeaningLines(word);
    const cleaned = lines.map(l => l.replace(/^\S+\s*→\s*/, '').replace(/^[a-z]+\/\S*\.\s*/, '').replace(/^[a-z]+\.\s*/, '').trim()).filter(Boolean);
    return [...new Set(cleaned)].join('；');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className={`bg-slate-800 rounded-2xl shadow-2xl ${showPreview ? 'max-w-2xl' : 'max-w-lg'} w-[90%] max-h-[90vh] overflow-y-auto border border-slate-700`} onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-slate-800 rounded-t-2xl p-5 border-b border-slate-700 flex items-center justify-between z-10">
          {showPreview ? (
            <>
              <button onClick={() => setShowPreview(false)} className="flex items-center gap-1.5 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                <ChevronLeft size={18} /> 返回修改
              </button>
              <h3 className="text-lg font-bold text-white flex items-center gap-2"><FileDown size={20} className="text-violet-400" /> 预览导出内容</h3>
            </>
          ) : (
            <h3 className="text-xl font-bold text-white flex items-center gap-2"><FileDown size={20} className="text-violet-400" /> 导出词汇测试单</h3>
          )}
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-5">
          {!showPreview ? (
            <>
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">选择时间范围</label>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  {[
                    { key: 'day' as const, label: '当天', desc: todayPlan.date },
                    { key: 'week' as const, label: '本周', desc: '近7天' },
                    { key: 'month' as const, label: '当月', desc: monthLabel },
                    { key: 'selected' as const, label: '多日期', desc: '自由选' },
                    { key: 'custom' as const, label: '自定义', desc: '选天数' },
                    { key: 'topics' as const, label: '分类词汇', desc: '选主题' },
                  ].map(r => (
                    <button key={r.key} onClick={() => setPdfRange(r.key as PdfRangeType)}
                      className={`p-2 rounded-lg text-center transition-all ${pdfRange === r.key ? 'bg-violet-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                    >
                      <div className="text-xs font-bold">{r.label}</div>
                      <div className="text-[10px] opacity-70">{r.desc}</div>
                    </button>
                  ))}
                </div>
                {pdfRange === 'selected' && (
                  <div className="bg-slate-700/50 rounded-lg p-3">
                    <div className="text-xs text-slate-400 mb-2">自由选择当月日期，可多选</div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {monthDays.map((day) => {
                        const active = pdfSelectedDates.includes(day.dateISO);
                        return (
                          <button
                            key={day.dateISO}
                            onClick={() => setPdfSelectedDates(prev =>
                              active ? prev.filter(d => d !== day.dateISO) : [...prev, day.dateISO].sort()
                            )}
                            className={`py-1.5 rounded-lg text-xs font-bold transition-all ${active ? 'bg-violet-500 text-white' : 'bg-slate-900 text-slate-400 hover:bg-slate-700'}`}
                          >
                            {day.dayOfMonth}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                {pdfRange === 'custom' && (
                  <div className="flex items-center gap-3 bg-slate-700/50 rounded-lg p-3">
                    <div className="flex-1">
                      <label className="text-xs text-slate-400 block mb-1">起始天</label>
                      <input type="number" min={1} max={totalDays} value={pdfDayStart}
                        onChange={e => setPdfDayStart(Math.max(1, Math.min(totalDays, parseInt(e.target.value) || 1)))}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-violet-500" />
                    </div>
                    <span className="text-slate-500 mt-5">~</span>
                    <div className="flex-1">
                      <label className="text-xs text-slate-400 block mb-1">结束天</label>
                      <input type="number" min={pdfDayStart} max={totalDays} value={pdfDayEnd}
                        onChange={e => setPdfDayEnd(Math.max(pdfDayStart, Math.min(totalDays, parseInt(e.target.value) || pdfDayStart)))}
                        className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-violet-500" />
                    </div>
                  </div>
                )}
                {pdfRange === 'topics' && (
                  <div className="bg-slate-700/50 rounded-lg p-3 max-h-56 overflow-y-auto">
                    <div className="text-xs text-slate-400 mb-2">
                      选择主题导出（可多选）· 已选 {pdfSelectedTopicIds.length} 个 · 约 {pdfSelectedTopicIds.reduce((sum, id) => sum + (appendixTopics.find(t => t.id === id)?.terms.length || 0), 0)} 词
                    </div>
                    {(['雅思听力生活类词汇', '雅思听力校园类词汇', '雅思写作名词精选', '雅思写作动词精选', '雅思写作形容词精选', '雅思写作关联词精选', '雅思阅读话题词汇', '雅思口语Part1分类词汇', '雅思口语Part2分类词汇', '雅思口语Part3分类词汇'] as const).map((section) => {
                      const sectionTopics = appendixTopics.filter((t) => t.section === section);
                      if (!sectionTopics.length) return null;
                      return (
                        <details key={section} className="mb-2">
                          <summary className="cursor-pointer text-xs font-bold text-slate-300 hover:text-white py-1">
                            {section} ({sectionTopics.length})
                          </summary>
                          <div className="mt-1 ml-3 space-y-1">
                            {sectionTopics.map((topic) => {
                              const active = pdfSelectedTopicIds.includes(topic.id);
                              const topicTermCount = allAppendixFlashWords.filter(fw => fw.topicId === topic.id).length;
                              return (
                                <button
                                  key={topic.id}
                                  onClick={() => setPdfSelectedTopicIds(prev =>
                                    active ? prev.filter(id => id !== topic.id) : [...prev, topic.id],
                                  )}
                                  className={`block w-full text-left rounded-lg px-2 py-1 text-xs transition ${active ? 'bg-violet-500/20 text-violet-200' : 'text-slate-400 hover:bg-slate-800'}`}
                                >
                                  {topic.topic}
                                  <span className="ml-1 text-slate-500">({topicTermCount})</span>
                                </button>
                              );
                            })}
                          </div>
                        </details>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 导出模式 */}
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">导出模式</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPdfExportMode('cn2en')}
                    className={`rounded-xl border-2 p-3 text-left transition-all ${
                      pdfExportMode === 'cn2en'
                        ? 'border-amber-400/60 bg-amber-500/10 shadow-lg shadow-amber-950/20'
                        : 'border-slate-700 bg-slate-800/55 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-sm font-black text-white">中译英</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">学生看中文释义 → 写出英文单词</div>
                    <div className="text-[10px] text-amber-300/60 mt-0.5">每题 3 分 · 主动回忆</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPdfExportMode('en2cn')}
                    className={`rounded-xl border-2 p-3 text-left transition-all ${
                      pdfExportMode === 'en2cn'
                        ? 'border-blue-400/60 bg-blue-500/10 shadow-lg shadow-blue-950/20'
                        : 'border-slate-700 bg-slate-800/55 hover:border-slate-500 hover:bg-slate-800'
                    }`}
                  >
                    <div className="text-sm font-black text-white">英译中</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">学生看英文单词 → 写出中文释义</div>
                    <div className="text-[10px] text-blue-300/60 mt-0.5">每题 2 分 · 词义确认</div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">姓名</label>
                  <input type="text" value={pdfStudentName} onChange={e => setPdfStudentName(e.target.value)}
                    placeholder="学生姓名" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 placeholder-slate-500" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-slate-300 mb-2 block">班级</label>
                  <input type="text" value={pdfStudentClass} onChange={e => setPdfStudentClass(e.target.value)}
                    placeholder="如：雅思冲刺班" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 placeholder-slate-500" />
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-xl p-4 space-y-1 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">词库</span><span className="text-white font-medium">雅思6.5+</span></div>
                <div className="flex justify-between"><span className="text-slate-400">导出类型</span><span className="text-white font-medium">词汇测试单</span></div>
                <div className="flex justify-between"><span className="text-slate-400">导出模式</span><span className={`font-medium ${pdfExportMode === 'cn2en' ? 'text-amber-200' : 'text-blue-200'}`}>{pdfExportMode === 'cn2en' ? '纯中译英' : '纯英译中'}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">时间范围</span><span className="text-white font-medium">
                  {pdfRange === 'topics' ? `${pdfSelectedTopicIds.length}个主题` : pdfRange === 'day' ? todayPlan.date : pdfRange === 'week' ? `近7天` : pdfRange === 'month' ? monthLabel : pdfRange === 'selected' ? `${pdfSelectedDates.length}个日期` : `Day ${pdfDayStart} — Day ${pdfDayEnd}`}
                </span></div>
                <div className="flex justify-between"><span className="text-slate-400">姓名</span><span className="text-white font-medium">{pdfStudentName || '未填写'}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">班级</span><span className="text-white font-medium">{pdfStudentClass || '未填写'}</span></div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-slate-700 text-slate-300 font-semibold hover:bg-slate-600 transition-colors">取消</button>
                <button onClick={handleEnterPreview} className="flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2 hover:from-violet-500 hover:to-purple-500 active:scale-95">
                  <FileDown size={16} /> 预览内容 ({computedPreview.words.length} 词)
                </button>
              </div>
            </>
          ) : (
            <>
              {/* 概览卡片 */}
              <div className="bg-slate-700/30 rounded-xl p-4 space-y-1.5 text-sm">
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="flex justify-between"><span className="text-slate-400">词库</span><span className="text-white font-medium">雅思6.5+</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">范围</span><span className="text-white font-medium">{computedPreview.dayRangeText}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">模式</span><span className={`font-medium ${pdfExportMode === 'cn2en' ? 'text-amber-200' : 'text-blue-200'}`}>{pdfExportMode === 'cn2en' ? '纯中译英（看中文写英文）' : '纯英译中（看英文写中文）'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">姓名</span><span className="text-white font-medium">{pdfStudentName || '未填写'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">班级</span><span className="text-white font-medium">{pdfStudentClass || '未填写'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">词汇总数</span><span className="text-white font-bold text-violet-300">{computedPreview.words.length} 词</span></div>
                  <div className="flex justify-between"><span className="text-slate-400">预计页数</span><span className="text-white font-medium">{computedPreview.totalPages} 页</span></div>
                </div>
              </div>

              {/* 词汇表格 */}
              <div>
                <label className="text-sm font-semibold text-slate-300 mb-2 block">词汇清单（共 {computedPreview.words.length} 词）</label>
                <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-700">
                  <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-slate-700">
                      <tr>
                        <th className="text-left py-2 px-3 text-xs font-bold text-slate-300 w-12">No.</th>
                        <th className="text-left py-2 px-3 text-xs font-bold text-slate-300">{pdfExportMode === 'cn2en' ? '中文释义（提示）' : '英文单词（提示）'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {computedPreview.words.map((w, i) => {
                        const src = words.find(x => x.normalizedWord === w.word.toLowerCase());
                        const display = src ? getPreviewText(src) : (pdfExportMode === 'en2cn' ? w.word : w.meanings?.join('；') || '');
                        return (
                          <tr key={w.word} className={i % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800/80'}>
                            <td className="py-1.5 px-3 text-slate-500 font-mono text-xs">{i + 1}</td>
                            <td className={`py-1.5 px-3 text-xs ${pdfExportMode === 'cn2en' ? 'text-amber-200/80' : 'text-white font-semibold font-serif'}`}>{display}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setShowPreview(false)} className="flex-1 py-2.5 rounded-xl bg-slate-700 text-slate-300 font-semibold hover:bg-slate-600 transition-colors flex items-center justify-center gap-1.5">
                  <ChevronLeft size={16} /> 返回修改
                </button>
                <button onClick={handleGenerate} disabled={pdfGenerating} className={`flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2 ${pdfGenerating ? 'opacity-60' : 'hover:from-violet-500 hover:to-purple-500 active:scale-95'}`}>
                  {pdfGenerating ? '正在生成PDF...' : (<><FileDown size={16} /> 确认生成PDF</>)}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
