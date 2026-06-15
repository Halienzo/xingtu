import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  PenLine,
  Volume2,
  X,
  XCircle,
} from 'lucide-react';
import type { CalendarWord } from './BeiduofenVocabularyCalendar';
import type { IeltsAppendixTopic, IeltsCanonicalWord } from './BeiduofenIeltsVocabulary';
import {
  getNextProgressForCorrect,
  getNextProgressForWrong,
  type IeltsPlannerProgressRecord,
  type IeltsPlannerProgressStatus,
  type IeltsTopicPlannerWord,
} from './ieltsStudyPlanner';

// ── Topic flashcard types ──────────────────────────────────────────

export interface TopicFlashWord {
  termId: string;
  displayWord: string;
  normalizedWord: string;
  meaning: string;
  linkedWord?: IeltsCanonicalWord;
  topicId: string;
  topicName: string;
  isMatched: boolean;
}

export type TopicProgressStatus = 'new' | 'learning' | 'wrong' | 'mastered';

export interface TopicProgressRecord {
  status: TopicProgressStatus;
  spellingCorrect: boolean;
  meaningCorrect: boolean;
  wrongCount: number;
  lastUpdated: string;
  reviewCount: number;
  srsLevel: number;
  dueDate?: string;
  lastWrongAt?: string;
  firstSeenOn?: string;
  lastSeenOn?: string;
}

export type TopicProgressState = Record<string, TopicProgressRecord>;
type TopicPracticeMode = 'browse' | 'spell' | 'meaning';
type CheckResult = 'idle' | 'correct' | 'wrong';

export const TOPIC_PROGRESS_KEY = 'beiduofen_ielts_topic_progress_v2';

// ── Helpers ────────────────────────────────────────────────────────

function normalizeSpelling(value = '') {
  return value.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]/g, '').trim();
}

function hashString(value = '') {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function todayISO() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function buildFlashWords(topic: IeltsAppendixTopic, wordsByNormalized: Map<string, IeltsCanonicalWord>): TopicFlashWord[] {
  return topic.terms.map((term) => {
    const linkedWord = wordsByNormalized.get(term.normalizedTerm);
    return {
      termId: term.id,
      displayWord: term.term,
      normalizedWord: term.normalizedTerm,
      meaning: term.meaning || linkedWord?.meaning || '',
      linkedWord,
      topicId: topic.id,
      topicName: topic.topic,
      isMatched: Boolean(linkedWord),
    };
  });
}

function getPrimaryMeaningFlash(word: TopicFlashWord) {
  if (word.linkedWord) {
    return (word.linkedWord.sourceMeaning || word.linkedWord.meaning || '')
      .split(/\n|；|;/)
      .map((item) => item.trim())
      .filter(Boolean)[0] || word.meaning;
  }
  return word.meaning;
}

function cleanText(raw: string) {
  return raw.replace(/\\n/g, '；').replace(/；；+/g, '；').replace(/^[；，、\s]+/, '').replace(/[；，、\s]+$/, '');
}

function getMeaningLinesFlash(word: TopicFlashWord): string[] {
  if (word.linkedWord) {
    return (word.linkedWord.sourceMeaning || word.linkedWord.meaning || '')
      .split(/\n|；|;/)
      .map((item) => cleanText(item.trim()))
      .filter(Boolean)
      .slice(0, 5);
  }
  return word.meaning ? [cleanText(word.meaning)] : [];
}

function getPhoneticFlash(word: TopicFlashWord) {
  if (word.linkedWord?.phonetic) return `[${word.linkedWord.phonetic}]`;
  return '';
}

function getPosFlash(word: TopicFlashWord) {
  if (word.linkedWord?.pos) return word.linkedWord.pos.replace(/\//g, ' / ');
  return '';
}

function speakWord(word: string) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = 'en-GB';
  utterance.rate = 0.86;
  window.speechSynthesis.speak(utterance);
}

// ── Progress (delegates to shared planner) ─────────────────────────

function toPlannerRecord(tr: TopicProgressRecord): IeltsPlannerProgressRecord {
  return {
    status: tr.status as IeltsPlannerProgressStatus,
    lastUpdated: tr.lastUpdated,
    reviewCount: tr.reviewCount,
    spellingCorrect: tr.spellingCorrect,
    meaningCorrect: tr.meaningCorrect,
    wrongCount: tr.wrongCount,
    lastWrongAt: tr.lastWrongAt,
    dueDate: tr.dueDate,
    srsLevel: tr.srsLevel,
    firstSeenOn: tr.firstSeenOn,
    lastSeenOn: tr.lastSeenOn,
  };
}

function fromPlannerRecord(pr: IeltsPlannerProgressRecord): TopicProgressRecord {
  return {
    status: (pr.status || 'new') as TopicProgressStatus,
    lastUpdated: pr.lastUpdated || '',
    reviewCount: pr.reviewCount || 0,
    spellingCorrect: Boolean(pr.spellingCorrect),
    meaningCorrect: Boolean(pr.meaningCorrect),
    wrongCount: pr.wrongCount || 0,
    srsLevel: Number.isFinite(pr.srsLevel) ? pr.srsLevel! : 0,
    dueDate: pr.dueDate,
    lastWrongAt: pr.lastWrongAt,
    firstSeenOn: pr.firstSeenOn,
    lastSeenOn: pr.lastSeenOn,
  };
}

function topicCorrect(existing: TopicProgressRecord | undefined, dateISO: string, patch: Partial<IeltsPlannerProgressRecord> = {}, forceStatus?: IeltsPlannerProgressStatus): TopicProgressRecord {
  return fromPlannerRecord(getNextProgressForCorrect(existing ? toPlannerRecord(existing) : undefined, dateISO, patch, forceStatus));
}

function topicWrong(existing: TopicProgressRecord | undefined, dateISO: string): TopicProgressRecord {
  return fromPlannerRecord(getNextProgressForWrong(existing ? toPlannerRecord(existing) : undefined, dateISO));
}

/** Convert TopicFlashWord to IeltsTopicPlannerWord for planner integration */
export function toTopicPlannerWord(fw: TopicFlashWord): IeltsTopicPlannerWord {
  return {
    id: fw.termId,
    word: fw.displayWord,
    normalizedWord: fw.normalizedWord,
    displayWord: fw.displayWord,
    meaning: fw.meaning,
    topicId: fw.topicId,
    topicName: fw.topicName,
    isMatched: fw.isMatched,
  };
}

/** Adapter: Topic flash word → CalendarWord for PDF export */
export function mapTopicWordToCalendarWord(fw: TopicFlashWord): CalendarWord {
  const meanings = fw.linkedWord
    ? (fw.linkedWord.sourceMeaning || fw.linkedWord.meaning || '').split(/\n|；|;/).map((s) => s.trim()).filter(Boolean).slice(0, 5)
    : (fw.meaning ? [fw.meaning] : []);
  const phonetic = fw.linkedWord?.phonetic ? `[${fw.linkedWord.phonetic}]` : '';
  const example = fw.linkedWord?.examples[0];
  return {
    word: fw.displayWord,
    phonetic,
    syllables: fw.displayWord,
    syllableParts: [fw.displayWord],
    syllableColors: ['from-violet-400 to-purple-500'],
    pos: fw.linkedWord?.pos?.replace(/\//g, ' / ') || '',
    meanings: meanings.length ? meanings : [fw.meaning || ''],
    phrases: fw.linkedWord
      ? [...fw.linkedWord.memoryNotes, ...fw.linkedWord.synonyms, ...fw.linkedWord.antonyms].slice(0, 6)
      : [],
    example: example ? `${example.english} ${example.chinese}` : '',
    memoryTip: fw.linkedWord?.memoryNotes[0] || fw.linkedWord?.supplements[0] || '',
  };
}

export function loadTopicProgress(): TopicProgressState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(TOPIC_PROGRESS_KEY);
    return raw ? JSON.parse(raw) as TopicProgressState : {};
  } catch {
    return {};
  }
}

export function saveTopicProgress(progress: TopicProgressState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(TOPIC_PROGRESS_KEY, JSON.stringify(progress));
}


// ── Meaning choices for unmatched terms ────────────────────────────

function buildMeaningChoicesForTerm(
  word: TopicFlashWord,
  allTerms: TopicFlashWord[],
) {
  const correct = getPrimaryMeaningFlash(word);
  // Prefer same-topic terms, then fallback to all
  const sameTopic = allTerms.filter((t) => t.termId !== word.termId && t.topicId === word.topicId);
  const otherTopic = allTerms.filter((t) => t.termId !== word.termId && t.topicId !== word.topicId);
  const pool = sameTopic.length >= 3 ? sameTopic : [...sameTopic, ...otherTopic];

  const distractors = pool
    .map((t) => getPrimaryMeaningFlash(t))
    .filter((m) => m && m !== correct);

  const unique = [...new Set(distractors)];
  const shuffled = unique
    .map((m) => ({ choice: m, rank: hashString(`${word.termId}-${m}`) }))
    .sort((a, b) => a.rank - b.rank)
    .map((item) => item.choice)
    .slice(0, 3);

  const choices = [correct, ...shuffled];
  return choices
    .map((choice) => ({ choice, rank: hashString(`${word.termId}-${choice}`) }))
    .sort((a, b) => a.rank - b.rank)
    .map((item) => item.choice);
}

// ── Component ──────────────────────────────────────────────────────

export function TopicFlashPanel({
  topic,
  wordsByNormalized,
  allAppendixTerms,
  topicProgress,
  onTopicProgressChange,
  onClose,
}: {
  topic: IeltsAppendixTopic;
  wordsByNormalized: Map<string, IeltsCanonicalWord>;
  allAppendixTerms: TopicFlashWord[];
  topicProgress: TopicProgressState;
  onTopicProgressChange: (progress: TopicProgressState) => void;
  onClose: () => void;
}) {
  const todayDateISO = useMemo(() => todayISO(), []);
  const flashWords = useMemo(
    () => buildFlashWords(topic, wordsByNormalized),
    [topic, wordsByNormalized],
  );

  const [cardIndex, setCardIndex] = useState(0);
  const [practiceMode, setPracticeMode] = useState<TopicPracticeMode>('browse');
  const [showAnswer, setShowAnswer] = useState(false);
  const [spellingInput, setSpellingInput] = useState('');
  const [spellingResult, setSpellingResult] = useState<CheckResult>('idle');
  const [selectedMeaning, setSelectedMeaning] = useState('');
  const [meaningResult, setMeaningResult] = useState<CheckResult>('idle');

  const activeWord = flashWords[cardIndex] || flashWords[0];
  const activeProgress = activeWord ? topicProgress[activeWord.termId] : undefined;

  const meaningChoices = useMemo(
    () => activeWord ? buildMeaningChoicesForTerm(activeWord, allAppendixTerms) : [],
    [activeWord, allAppendixTerms],
  );

  const resetCardPractice = (mode: TopicPracticeMode = practiceMode) => {
    setShowAnswer(false);
    setPracticeMode(mode);
    setSpellingInput('');
    setSpellingResult('idle');
    setSelectedMeaning('');
    setMeaningResult('idle');
  };

  const updateProgress = (termId: string, patch: Partial<IeltsPlannerProgressRecord>) => {
    onTopicProgressChange({
      ...topicProgress,
      [termId]: { ...topicCorrect(topicProgress[termId], todayDateISO), ...patch },
    });
  };

  const markWrong = (termId: string) => {
    onTopicProgressChange({
      ...topicProgress,
      [termId]: topicWrong(topicProgress[termId], todayDateISO),
    });
  };

  const checkSpelling = () => {
    if (!activeWord) return;
    const target = activeWord.linkedWord
      ? normalizeSpelling(activeWord.linkedWord.word)
      : normalizeSpelling(activeWord.displayWord);
    const correct = normalizeSpelling(spellingInput) === target;
    setSpellingResult(correct ? 'correct' : 'wrong');
    if (correct) {
      updateProgress(activeWord.termId, { spellingCorrect: true });
      setShowAnswer(true);
    } else {
      markWrong(activeWord.termId);
    }
  };

  const chooseMeaning = (choice: string) => {
    if (!activeWord) return;
    setSelectedMeaning(choice);
    const correct = choice === getPrimaryMeaningFlash(activeWord);
    setMeaningResult(correct ? 'correct' : 'wrong');
    if (correct) {
      updateProgress(activeWord.termId, { meaningCorrect: true });
    } else {
      markWrong(activeWord.termId);
    }
  };

  const markStatus = (status: 'wrong' | 'mastered') => {
    if (!activeWord) return;
    onTopicProgressChange({
      ...topicProgress,
      [activeWord.termId]: status === 'mastered'
        ? topicCorrect(topicProgress[activeWord.termId], todayDateISO, { spellingCorrect: true, meaningCorrect: true }, 'mastered')
        : topicWrong(topicProgress[activeWord.termId], todayDateISO),
    });
  };

  const moveCard = (direction: 1 | -1) => {
    setCardIndex((current) => Math.min(Math.max(current + direction, 0), flashWords.length - 1));
    resetCardPractice('browse');
  };

  if (flashWords.length === 0) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur">
        <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[8px] border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="text-sm font-black text-slate-300">该主题暂无词条</div>
            <button
              type="button"
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-slate-200"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 px-4 py-6 backdrop-blur">
      <div className="relative flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-[8px] border border-white/10 bg-slate-900 shadow-2xl shadow-slate-950">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="min-w-0 flex-1">
            <div className="truncate text-xs font-black text-cyan-200">{topic.topic}</div>
            <div className="mt-1 text-sm text-slate-400">
              {cardIndex + 1}/{flashWords.length} · {topic.section}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[8px] border border-white/10 bg-white/[0.04] text-slate-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto p-5">
          {/* Mode tabs */}
          <div className="grid grid-cols-3 gap-2">
            {([
              { key: 'browse' as const, label: '浏览', icon: BookOpen },
              { key: 'spell' as const, label: '拼写', icon: PenLine },
              { key: 'meaning' as const, label: '选义', icon: CheckCircle2 },
            ]).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => resetCardPractice(item.key)}
                  className={`flex h-10 items-center justify-center gap-2 rounded-[8px] border text-sm font-black transition ${
                    practiceMode === item.key
                      ? 'border-cyan-300 bg-cyan-400/15 text-white'
                      : 'border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan-300/40'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Status tags */}
          <div className="mt-4 flex flex-wrap gap-2 text-xs">
            <span className={`rounded-full px-2.5 py-1 font-black ${activeProgress?.spellingCorrect ? 'bg-emerald-400/15 text-emerald-200' : 'bg-white/10 text-slate-300'}`}>
              拼写{activeProgress?.spellingCorrect ? '已过' : '未过'}
            </span>
            <span className={`rounded-full px-2.5 py-1 font-black ${activeProgress?.meaningCorrect ? 'bg-emerald-400/15 text-emerald-200' : 'bg-white/10 text-slate-300'}`}>
              选义{activeProgress?.meaningCorrect ? '已过' : '未过'}
            </span>
            {(activeProgress?.wrongCount || 0) > 0 && (
              <span className="rounded-full bg-amber-400/15 px-2.5 py-1 font-black text-amber-200">错 {activeProgress?.wrongCount} 次</span>
            )}
            {activeWord.isMatched && (
              <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 font-black text-cyan-200/70">已入主卡</span>
            )}
          </div>

          {/* ── Browse mode ──────────────────────────────────────── */}
          {practiceMode === 'browse' && (
            <div className="mt-4 space-y-4">
              <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-3">
                  <h2 className="break-words text-4xl font-black tracking-normal text-white">{activeWord.displayWord}</h2>
                  <button
                    type="button"
                    onClick={() => speakWord(activeWord.displayWord)}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-cyan-300 text-slate-950"
                  >
                    <Volume2 className="h-5 w-5" />
                  </button>
                </div>
                {getPhoneticFlash(activeWord) && (
                  <div className="mt-2 text-sm font-bold text-slate-400">{getPhoneticFlash(activeWord)}</div>
                )}
                {getPosFlash(activeWord) && (
                  <div className="mt-1 text-sm font-bold text-slate-400">{getPosFlash(activeWord)}</div>
                )}
              </div>

              <InfoBlock title="释义" items={getMeaningLinesFlash(activeWord)} />

              {activeWord.linkedWord?.examples.length ? (
                <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-xs font-black text-slate-400">例句</div>
                  <div className="mt-2 text-base leading-relaxed text-white">{activeWord.linkedWord.examples[0].english}</div>
                  <div className="mt-1 text-sm leading-relaxed text-slate-400">{activeWord.linkedWord.examples[0].chinese}</div>
                </div>
              ) : null}

              {activeWord.linkedWord && (
                <>
                  <InfoBlock title="记忆 / 搭配" items={[...activeWord.linkedWord.memoryNotes, ...activeWord.linkedWord.supplements].slice(0, 5)} />
                  <InfoBlock title="同反义 / 区别" items={[...activeWord.linkedWord.synonyms, ...activeWord.linkedWord.antonyms, ...activeWord.linkedWord.distinctions, ...activeWord.linkedWord.proverbs].slice(0, 8)} />
                </>
              )}

              {!activeWord.isMatched && (
                <div className="rounded-[8px] border border-amber-300/20 bg-amber-400/[0.06] p-3">
                  <div className="text-xs font-black text-amber-200">降级模式</div>
                  <div className="mt-1 text-sm text-slate-400">此词条未匹配主词库，仅显示基本释义。拼写和选义练习照常可用。</div>
                </div>
              )}
            </div>
          )}

          {/* ── Spell mode ──────────────────────────────────────── */}
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
                  className="relative min-h-[220px] transition-transform duration-500"
                  style={{ transformStyle: 'preserve-3d', transform: showAnswer ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                >
                  {/* Front: Chinese meaning */}
                  <div
                    className="absolute inset-0 rounded-[8px] border border-cyan-300/25 bg-cyan-400/10 p-5"
                    aria-hidden={showAnswer}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <div className="text-xs font-black text-cyan-200">看中文拼写英文</div>
                    <div className="mt-4 space-y-3">
                      {getMeaningLinesFlash(activeWord).map((meaning, index) => (
                        <div key={index} className="rounded-[8px] bg-slate-950/45 p-3 text-base font-bold leading-relaxed text-white">{meaning}</div>
                      ))}
                    </div>
                    <div className="mt-4 text-sm text-slate-400">点击卡片翻面查看英文。</div>
                  </div>
                  {/* Back: English answer */}
                  <div
                    className="absolute inset-0 rounded-[8px] border border-emerald-300/25 bg-emerald-400/10 p-5"
                    aria-hidden={!showAnswer}
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="break-words text-4xl font-black text-white">{activeWord.displayWord}</div>
                        {getPhoneticFlash(activeWord) && (
                          <div className="mt-2 text-sm font-bold text-emerald-100">{getPhoneticFlash(activeWord)}</div>
                        )}
                      </div>
                    </div>
                    {activeWord.linkedWord?.examples[0] && (
                      <div className="mt-5 rounded-[8px] bg-slate-950/45 p-3">
                        <div className="text-sm leading-relaxed text-white">{activeWord.linkedWord.examples[0].english}</div>
                        <div className="mt-1 text-xs leading-relaxed text-slate-400">{activeWord.linkedWord.examples[0].chinese}</div>
                      </div>
                    )}
                  </div>
                </div>
              </button>

              <div className="rounded-[8px] border border-white/10 bg-white/[0.04] p-4">
                <label className="text-xs font-black text-slate-400" htmlFor="topic-spelling-answer">拼写检查</label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input
                    id="topic-spelling-answer"
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
                    {spellingResult === 'correct' ? '拼写正确' : `拼写错误，正确答案：${activeWord.displayWord}`}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Meaning mode ────────────────────────────────────── */}
          {practiceMode === 'meaning' && (
            <div className="mt-4 rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-xs font-black text-slate-400">看英文选择中文</div>
              <div className="mt-3 flex items-start justify-between gap-3">
                <div>
                  <div className="break-words text-4xl font-black text-white">{activeWord.displayWord}</div>
                  {getPhoneticFlash(activeWord) && (
                    <div className="mt-2 text-sm text-slate-400">{getPhoneticFlash(activeWord)}</div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => speakWord(activeWord.displayWord)}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[8px] bg-cyan-300 text-slate-950"
                >
                  <Volume2 className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-5 grid gap-2">
                {meaningChoices.map((choice) => {
                  const selected = selectedMeaning === choice;
                  const correct = choice === getPrimaryMeaningFlash(activeWord);
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
              {meaningChoices.length === 0 && (
                <div className="mt-3 text-sm text-slate-400">暂无足够的释义选项。</div>
              )}
              {meaningResult !== 'idle' && (
                <div className={`mt-3 rounded-[6px] px-3 py-2 text-sm font-bold ${meaningResult === 'correct' ? 'bg-emerald-400/15 text-emerald-200' : 'bg-amber-400/15 text-amber-200'}`}>
                  {meaningResult === 'correct' ? '选择正确' : `选择错误，正确答案：${getPrimaryMeaningFlash(activeWord)}`}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => markStatus('wrong')}
              className="flex h-10 items-center justify-center gap-2 rounded-[8px] border border-rose-300/30 bg-rose-400/10 px-3 text-sm font-black text-rose-100"
            >
              <XCircle className="h-4 w-4" />
              错词
            </button>
            <button
              type="button"
              onClick={() => markStatus('mastered')}
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
              disabled={cardIndex === flashWords.length - 1}
              className="flex h-10 items-center justify-center gap-2 rounded-[8px] border border-white/10 bg-white/[0.04] px-3 text-sm font-bold text-slate-200 disabled:opacity-40"
            >
              下一个
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────

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

