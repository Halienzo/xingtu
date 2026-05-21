import { useState, useEffect, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Volume2, RotateCcw, X, Upload, Brain, FileDown } from 'lucide-react';
import { generatePDF, mergeWordsFromDays } from '../lib/pdfEngine';
import calendarDataJson from '../data/calendarData.json';

// ============= TYPES =============
// 每个词性的独立信息（多词性支持）
export interface PosDetail {
  pos: string;       // 词性，如 "n.", "v.", "adj."
  meaning: string;   // 该词性的中文意思
  example: string;   // 体现社会主义核心价值观/云南中考主题的英文例句
  exampleCn: string; // 例句中文翻译
}

export interface CalendarWord {
  word: string;
  phonetic: string;
  syllables: string;
  syllableParts: string[];
  syllableColors: string[];
  pos: string;           // 词性（兼容旧数据），如 "n." 或 "adj./n."
  meanings: string[];    // 中文释义列表
  phrases: string[];     // 相关短语
  example: string;       // 默认例句（兼容旧数据）
  memoryTip: string;     // 记忆提示
  posDetails?: PosDetail[]; // 多词性详情（每个词性配中文意思+例句）
}

interface CalendarDay {
  day: number;
  date: string;
  dateISO?: string;
  month?: number;
  dayOfMonth?: number;
  weekdayCn?: string;
  weekdayEn?: string;
  holidayCn?: string;
  holidayEn?: string;
  unit: string;
  words: CalendarWord[];
}

interface SemesterPlan {
  key: string;
  name: string;
  grade: string;
  term: string;
  year?: number;
  sourceNote?: string;
  startMonth: number;
  months: number[];
  days: CalendarDay[];
}

type PracticeStep = 'whole' | 'syllable' | 'drag';

interface WordPracticeRecord {
  word: string;
  correctSteps: PracticeStep[];
  wrongSteps: PracticeStep[];
  lastStatus: 'new' | 'in-progress' | 'wrong' | 'mastered';
  lastUpdated: string;
}

interface DayPracticeRecord {
  completedWordKeys: string[];
  wrongWordKeys: string[];
  words: Record<string, WordPracticeRecord>;
  lastUpdated: string;
}

type VocabularyPracticeState = Record<string, DayPracticeRecord>;

// ============= TTS Engine (Cross-Platform) =============

// 全局语音缓存
let cachedVoices: SpeechSynthesisVoice[] = [];
let ttsReady = false;
let ttsInitAttempts = 0;
let currentVocabularyAudio: HTMLAudioElement | null = null;
const MAX_INIT_ATTEMPTS = 10;

// 检测平台
function detectPlatform(): { isAndroid: boolean; isIOS: boolean; isPad: boolean; isMobile: boolean } {
  if (typeof window === 'undefined' || !navigator) {
    return { isAndroid: false, isIOS: false, isPad: false, isMobile: false };
  }
  const ua = navigator.userAgent.toLowerCase();
  return {
    isAndroid: /android/.test(ua),
    isIOS: /iphone|ipad|ipod/.test(ua),
    isPad: /ipad/.test(ua) || (/android/.test(ua) && !/mobile/.test(ua)),
    isMobile: /android|iphone|ipad|ipod/.test(ua),
  };
}

// 预热语音引擎（解决移动端首次播放问题）
function warmUpTTS() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  
  // iOS Safari 和 Android 都需要预热
  const platform = detectPlatform();
  
  // 部分浏览器需要resume()
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
  }
  
  // Android Chrome 特殊处理：有时需要speak一个空utterance来唤醒
  if (platform.isAndroid && !ttsReady) {
    try {
      const dummy = new SpeechSynthesisUtterance('');
      dummy.volume = 0;
      window.speechSynthesis.speak(dummy);
      window.speechSynthesis.cancel();
    } catch (e) {
      // 静默失败
    }
  }
}

// 加载并选择最佳语音
function loadVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  
  let voices = window.speechSynthesis.getVoices() || [];
  
  // 按优先级排序：Google UK English > 其他en-GB > Google US English > 其他en-US > 任何英语
  const voicePriority = (v: SpeechSynthesisVoice): number => {
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase();
    if (name.includes('google') && lang.includes('en-gb')) return 100;
    if (lang.includes('en-gb')) return 90;
    if (name.includes('google') && lang.includes('en-us')) return 80;
    if (name.includes('samantha') && lang.includes('en')) return 75; // iOS
    if (name.includes('daniel') && lang.includes('en')) return 74; // iOS
    if (name.includes('karen') && lang.includes('en')) return 73; // iOS
    if (name.includes('tessa') && lang.includes('en')) return 72; // iOS
    if (name.includes('fred') && lang.includes('en')) return 71; // iOS
    if (lang.includes('en-us')) return 70;
    if (lang.includes('en')) return 60;
    return 0;
  };
  
  voices = voices.filter(v => voicePriority(v) > 0).sort((a, b) => voicePriority(b) - voicePriority(a));
  
  return voices;
}

// 初始化TTS（在组件挂载时调用）
function initTTS(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve(false);
      return;
    }
    
    const tryLoad = () => {
      cachedVoices = loadVoices();
      if (cachedVoices.length > 0 || ttsInitAttempts >= MAX_INIT_ATTEMPTS) {
        ttsReady = true;
        warmUpTTS();
        resolve(cachedVoices.length > 0);
        return;
      }
      ttsInitAttempts++;
      setTimeout(tryLoad, 200);
    };
    
    // Chrome 语音是异步加载的
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        cachedVoices = loadVoices();
        ttsReady = true;
        warmUpTTS();
        resolve(cachedVoices.length > 0);
      };
      // 超时保护
      setTimeout(() => {
        if (!ttsReady) tryLoad();
      }, 2000);
    } else {
      tryLoad();
    }
  });
}

// 核心发音函数
function speak(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(false);
      return;
    }
    
    try {
      if (currentVocabularyAudio) {
        currentVocabularyAudio.pause();
        currentVocabularyAudio.currentTime = 0;
        currentVocabularyAudio = null;
      }
      if (window.speechSynthesis && (window.speechSynthesis.speaking || window.speechSynthesis.pending || window.speechSynthesis.paused)) {
        window.speechSynthesis.cancel();
      }

      const audio = new Audio(`https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(text)}&type=1`);
      currentVocabularyAudio = audio;
      audio.playbackRate = 1;
      audio.onended = () => resolve(true);
      audio.onerror = () => {
        tryFallbackTTS(text).then(resolve).catch(() => resolve(false));
      };
      audio.play().then(() => {
        window.setTimeout(() => resolve(true), 1800);
      }).catch(() => {
        tryFallbackTTS(text).then(resolve).catch(() => resolve(false));
      });
    } catch (e) {
      console.error('TTS error:', e);
      tryFallbackTTS(text).then(resolve).catch(() => resolve(false));
    }
  });
}

// 备用TTS方案
async function tryFallbackTTS(text: string): Promise<boolean> {
  // 尝试使用任何可用的语音
  try {
    const allVoices = window.speechSynthesis?.getVoices() || [];
    const anyVoice = allVoices.find(v => v.lang.toLowerCase().startsWith('en')) || allVoices[0];
    if (anyVoice && window.speechSynthesis) {
      if (window.speechSynthesis.speaking || window.speechSynthesis.pending || window.speechSynthesis.paused) {
        window.speechSynthesis.cancel();
      }
      const u = new SpeechSynthesisUtterance(text);
      u.voice = anyVoice;
      u.lang = anyVoice.lang;
      u.rate = 0.85;
      u.volume = 1;
      window.speechSynthesis.speak(u);
      return true;
    }
  } catch (e) {
    console.error('Fallback TTS failed:', e);
  }
  return false;
}

// ============= 艾宾浩斯记忆曲线 =============
const EBBINGHAUS_INTERVALS = [1, 2, 4, 7, 15, 30]; // 复习间隔天数

function getReviewDays(dayNum: number): number[] {
  const reviews: number[] = [];
  for (const interval of EBBINGHAUS_INTERVALS) {
    const reviewDay = dayNum + interval;
    if (reviewDay <= 120) reviews.push(reviewDay);
  }
  return reviews;
}

// ============= 日期学习进度 =============
const VOCAB_PROGRESS_STORAGE_KEY = 'xsc_vocab_day_progress_v1';

function normalizeWordKey(word: string): string {
  return word.trim().toLowerCase();
}

function getWordKey(word: CalendarWord): string {
  return normalizeWordKey(word.word);
}

function getRequiredPracticeSteps(word: CalendarWord): PracticeStep[] {
  return (word.syllableParts?.length || 0) > 1 ? ['whole', 'syllable', 'drag'] : ['whole'];
}

function getDayProgressKey(semKey: string, day: CalendarDay): string {
  return `${semKey}:${day.dateISO || day.day}`;
}

function isPastCalendarDay(day: CalendarDay, todayISO: string): boolean {
  return Boolean(day.dateISO && day.dateISO < todayISO);
}

function isDayFullyMastered(day: CalendarDay, record?: DayPracticeRecord): boolean {
  if (!record || day.words.length === 0) return false;
  const completed = new Set(record.completedWordKeys);
  return day.words.every(word => completed.has(getWordKey(word)));
}

function getWrongWordsForDay(day: CalendarDay, record?: DayPracticeRecord): CalendarWord[] {
  if (!record) return [];
  const wrongKeys = new Set(record.wrongWordKeys);
  return day.words.filter(word => wrongKeys.has(getWordKey(word)));
}

function loadVocabularyProgress(): VocabularyPracticeState {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(VOCAB_PROGRESS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed as VocabularyPracticeState : {};
  } catch {
    return {};
  }
}

function saveVocabularyProgress(state: VocabularyPracticeState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(VOCAB_PROGRESS_STORAGE_KEY, JSON.stringify(state));
}

// ============= 彩色音节 =============
// ============= 词性背景色 =============
// 单一词性的样式（用于拆分后显示）
const SINGLE_POS_BG: Record<string, string> = {
  'n.': 'bg-blue-500/20 border-blue-400/40',
  'v.': 'bg-emerald-500/20 border-emerald-400/40',
  'adj.': 'bg-amber-500/20 border-amber-400/40',
  'adv.': 'bg-purple-500/20 border-purple-400/40',
  'pron.': 'bg-pink-500/20 border-pink-400/40',
  'prep.': 'bg-cyan-500/20 border-cyan-400/40',
  'conj.': 'bg-slate-500/20 border-slate-400/40',
  'int.': 'bg-orange-500/20 border-orange-400/40',
  'num.': 'bg-teal-500/20 border-teal-400/40',
  'abbr.': 'bg-violet-500/20 border-violet-400/40',
  'art.': 'bg-rose-500/20 border-rose-400/40',
};

const SINGLE_POS_LABEL: Record<string, string> = {
  'n.': '名词', 'v.': '动词', 'adj.': '形容词', 'adv.': '副词', 'pron.': '代词',
  'prep.': '介词', 'conj.': '连词', 'int.': '感叹词', 'num.': '数词', 'abbr.': '缩写',
  'art.': '冠词',
};

// 兼容旧数据：复合词性的样式
const POS_BG: Record<string, string> = {
  ...SINGLE_POS_BG,
  'n./v.': 'bg-gradient-to-r from-blue-500/20 to-emerald-500/20 border-blue-400/30',
  'adj./n.': 'bg-gradient-to-r from-amber-500/20 to-blue-500/20 border-amber-400/30',
  'v./n.': 'bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border-emerald-400/30',
  'adv./adj.': 'bg-gradient-to-r from-purple-500/20 to-amber-500/20 border-purple-400/30',
};

const POS_LABEL: Record<string, string> = {
  ...SINGLE_POS_LABEL,
  'n./v.': '名/动', 'adj./n.': '形/名', 'v./n.': '动/名', 'adv./adj.': '副/形',
};

// 拆分复合词性："adj./n./v." → ["adj.", "n.", "v."]
function splitPos(pos: string): string[] {
  if (!pos) return ['n.'];
  return pos.split(/\//).map(p => p.trim()).filter(Boolean);
}

// 获取词性的背景样式（支持复合词性取第一个）
function getPosBg(pos: string): string {
  const parts = splitPos(pos);
  if (parts.length === 1) return SINGLE_POS_BG[parts[0]] || SINGLE_POS_BG['n.'];
  // 多词性使用渐变
  const colors = parts.map(p => {
    const bg = SINGLE_POS_BG[p] || '';
    const match = bg.match(/from-(\w+-\d+)/);
    return match ? match[1] : 'slate-500';
  }).filter(Boolean);
  if (colors.length >= 2) {
    return `bg-gradient-to-r from-${colors[0]}/20 to-${colors[1]}/20 border-${colors[0]}/30`;
  }
  return POS_BG[pos] || 'bg-slate-500/20 border-slate-400/30';
}

// 获取词性中文标签（支持复合词性）
function getPosLabel(pos: string): string {
  if (POS_LABEL[pos]) return POS_LABEL[pos];
  const parts = splitPos(pos);
  return parts.map(p => SINGLE_POS_LABEL[p] || p).join('/');
}

// ============= 拼写验证反馈 =============
function SpellingFeedback({ status }: { status: 'correct' | 'wrong' | 'idle' }) {
  if (status === 'idle') return null;
  if (status === 'correct') return (
    <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold animate-bounce mt-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15"/><path d="M6 10L9 13L14 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      拼写正确!
    </div>
  );
  return (
    <div className="flex items-center justify-center gap-2 text-red-400 font-bold mt-2">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="currentColor" fillOpacity="0.15"/><path d="M7 7L13 13M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
      拼写错误，请重试
    </div>
  );
}

// ============= 完整单词拼写输入 =============
function WholeWordInput({ word, onCorrect, onWrong }: { word: CalendarWord; onCorrect: () => void; onWrong?: () => void }) {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'correct' | 'wrong' | 'idle'>('idle');

  const check = () => {
    const trimmed = input.trim().toLowerCase();
    if (trimmed === word.word.toLowerCase()) {
      setStatus('correct');
      onCorrect();
    } else {
      setStatus('wrong');
      onWrong?.();
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-bold text-white flex items-center gap-2">
        <span className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-xs text-white font-black">1</span>
        完整单词拼写
      </label>
      <p className="text-xs text-slate-400">提示: {word.meanings[0]}</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => { setInput(e.target.value); setStatus('idle'); }}
          onKeyDown={e => e.key === 'Enter' && check()}
          placeholder="输入完整单词"
          className={`flex-1 px-4 py-2.5 rounded-xl border-2 bg-slate-800/80 text-white font-mono text-lg tracking-wider placeholder:text-slate-500 focus:outline-none transition-all ${status === 'correct' ? 'border-emerald-500 bg-emerald-500/10' : status === 'wrong' ? 'border-red-500 bg-red-500/10' : 'border-slate-600 focus:border-cyan-500'}`}
        />
        <button onClick={check} className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white font-bold text-sm hover:shadow-lg hover:shadow-cyan-500/25 transition-all">
          提交
        </button>
      </div>
      <SpellingFeedback status={status} />
    </div>
  );
}

// ============= 闪卡弹窗 =============
function FlashCard({ words, currentIndex, onClose, onNavigate, onPracticeEvent }: {
  words: CalendarWord[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
  onPracticeEvent: (word: CalendarWord, step: PracticeStep, result: 'correct' | 'wrong') => void;
}) {
  const [cardStage, setCardStage] = useState<0 | 1>(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [cardKey, setCardKey] = useState(0);
  const [toast, setToast] = useState<{msg: string; type: 'success' | 'error'} | null>(null);
  const [showCorrectSpelling, setShowCorrectSpelling] = useState(false);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2000);
  };

  const word = words[currentIndex];
  const total = words.length;
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const flipToStage = (nextStage: 0 | 1) => {
    setIsFlipping(true);
    setTimeout(() => {
      setCardStage(nextStage);
      setCardKey(k => k + 1);
      setTimeout(() => setIsFlipping(false), 160);
    }, 160);
  };

  const autoNext = () => {
    setTimeout(() => {
      if (!isLast) {
        onNavigate(currentIndex + 1);
        resetState();
      } else {
        onClose();
      }
    }, 1500);
  };

  const handlePrev = () => {
    if (!isFirst) {
      onNavigate(currentIndex - 1);
      resetState();
    }
  };

  const handleNext = () => {
    if (!isLast) {
      onNavigate(currentIndex + 1);
      resetState();
    }
  };

  const resetState = () => {
    setCardStage(0);
    setIsFlipping(false);
    // reset
    setShowCorrectSpelling(false);
    setCardKey(k => k + 1);
  };

  // 当外部words/currentIndex变化时也重置
  useEffect(() => {
    resetState();
  }, [currentIndex]);

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* 关闭按钮 */}
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-white z-10"><X size={22} /></button>

        {/* 进度指示器 1/6 */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={handlePrev}
            disabled={isFirst}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="text-center">
            <span className="text-2xl font-black text-cyan-400">{currentIndex + 1}</span>
            <span className="text-lg text-slate-500 mx-1">/</span>
            <span className="text-lg text-slate-400">{total}</span>
          </div>
          <button
            onClick={handleNext}
            disabled={isLast}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* 进度条 */}
        <div className="flex gap-1 mb-4 px-4">
          {words.map((_, i) => (
            <button
              key={i}
              onClick={() => { onNavigate(i); resetState(); }}
              className={`flex-1 h-2 rounded-full transition-all ${
                i === currentIndex ? 'bg-cyan-500 shadow-lg shadow-cyan-500/50' :
                i < currentIndex ? 'bg-emerald-500/60' : 'bg-slate-700'
              }`}
              title={words[i].word}
            />
          ))}
        </div>

        <div
          key={cardKey}
          className="transition-transform duration-300"
          style={{ transform: isFlipping ? 'rotateY(90deg)' : 'rotateY(0deg)', transformStyle: 'preserve-3d' }}
        >
          {cardStage === 0 && (
            <div className="text-center space-y-5 py-4">
              <div className="flex items-center justify-center gap-3">
                <h3 className="text-5xl font-black text-white tracking-wide">{word.word}</h3>
                <button onClick={() => { speak(word.word).then(ok => { if (!ok) showToast('语音播放失败', 'error'); }); }} className="p-2.5 rounded-full bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors active:scale-90" title="点击发音"><Volume2 size={22} /></button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                {splitPos(word.pos).map((p, i) => (
                  <span key={i} className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg text-sm font-bold border bg-white/10 text-white`}>
                    <span>{getPosLabel(p)}</span>
                    <span className="text-white/60 text-xs">({p})</span>
                  </span>
                ))}
              </div>

              <button onClick={() => flipToStage(1)} className="mt-4 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-bold text-white hover:shadow-lg hover:shadow-cyan-500/25 transition-all text-base">
                开始拼写
              </button>
            </div>
          )}

          {cardStage === 1 && (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white">拼写检验</h3>
                <p className="text-sm text-slate-400">{word.meanings?.[0] || ''}</p>
              </div>
              <WholeWordInput
                key={cardKey}
                word={word}
                onCorrect={() => {
                  onPracticeEvent(word, 'whole', 'correct');
                  showToast('拼写正确！');
                  autoNext();
                }}
                onWrong={() => {
                  onPracticeEvent(word, 'whole', 'wrong');
                  showToast('拼写错误', 'error');
                  setShowCorrectSpelling(true);
                  autoNext();
                }}
              />
              {showCorrectSpelling && (
                <div className="text-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <p className="text-sm text-emerald-300">正确拼写：<span className="font-bold text-emerald-200">{word.word}</span></p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
        {/* Toast 通知 */}
        {toast && (
          <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-xl text-sm font-bold shadow-lg backdrop-blur-md border animate-bounce ${
            toast.type === 'error'
              ? 'bg-red-500/90 border-red-400 text-white'
              : 'bg-emerald-500/90 border-emerald-400 text-white'
          }`}>
            {toast.msg}
          </div>
        )}
    </div>
  );
}

const PRACTICE_STEP_LABELS: Record<PracticeStep, string> = {
  whole: '完整拼写',
  syllable: '音节拼写',
  drag: '音节拖入',
};

function WrongWordsModal({ day, record, onClose, onStartWrongWords }: {
  day: CalendarDay;
  record?: DayPracticeRecord;
  onClose: () => void;
  onStartWrongWords: (words: CalendarWord[]) => void;
}) {
  const wrongWords = getWrongWordsForDay(day, record);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div className="relative w-full max-w-xl rounded-2xl border border-orange-400/30 bg-slate-950 p-5 shadow-2xl shadow-orange-950/30" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-3 right-3 text-slate-400 hover:text-white"><X size={22} /></button>
        <div className="pr-8">
          <div className="text-xs font-black uppercase tracking-[0.18em] text-orange-300">Wrong Words</div>
          <h3 className="mt-1 text-xl font-black text-white">{day.date} 错词回看</h3>
          <p className="mt-1 text-sm text-slate-400">这些词还没有完全修正，点击后可只练当天错词。</p>
        </div>

        {wrongWords.length > 0 ? (
          <div className="mt-4 space-y-3">
            {wrongWords.map(word => {
              const wordRecord = record?.words[getWordKey(word)];
              const wrongSteps = wordRecord?.wrongSteps || [];
              return (
                <div key={word.word} className="rounded-xl border border-slate-700/70 bg-slate-900/80 p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-lg font-black text-white">{word.word}</div>
                      <div className="text-xs font-mono text-cyan-300">{word.phonetic}</div>
                    </div>
                    <div className="rounded-lg border border-orange-400/30 bg-orange-500/10 px-2 py-1 text-xs font-bold text-orange-200">
                      {wrongSteps.length > 0 ? wrongSteps.map(step => PRACTICE_STEP_LABELS[step]).join(' / ') : '需重新确认'}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-slate-300">{word.meanings?.join('；')}</div>
                </div>
              );
            })}
            <button
              onClick={() => onStartWrongWords(wrongWords)}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 text-sm font-black text-white shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/35 active:scale-[0.99]"
            >
              只练这 {wrongWords.length} 个错词
            </button>
          </div>
        ) : (
          <div className="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-500/10 p-4 text-center">
            <div className="text-lg font-black text-emerald-300">错词已清空</div>
            <p className="mt-1 text-sm text-emerald-100/70">当天错词已经被修正，可以返回日历继续复习。</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ============= 词汇导入组件 =============
function ImportPanel({ onImport }: { onImport: (semKey: string, words: CalendarWord[]) => void }) {
  const [jsonText, setJsonText] = useState('');
  const [targetSem, setTargetSem] = useState('3a');

  const handleImport = () => {
    try {
      const data = JSON.parse(jsonText);
      const words = Array.isArray(data) ? data : data.words;
      if (words && words.length > 0) {
        onImport(targetSem, words);
        setJsonText('');
        alert(`成功导入 ${words.length} 个单词到 ${targetSem}`);
      }
    } catch {
      alert('JSON格式错误，请检查');
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 mb-4">
      <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2"><Upload size={14} /> 词汇导入接口</h3>
      <div className="flex gap-2 mb-2">
        <select value={targetSem} onChange={e => setTargetSem(e.target.value)} className="bg-slate-900 border border-slate-600 rounded-lg px-2 py-1 text-xs text-white">
          {['1a','1b','2a','2b','3a','3b','4a','4b','5a','5b','6a','6b','7a','7b','8a','8b','9a','9b','10a','10b','11a','11b','12a','12b'].map(k => (
            <option key={k} value={k}>{k}</option>
          ))}
        </select>
        <button onClick={handleImport} className="px-3 py-1 bg-cyan-600 rounded-lg text-xs font-bold text-white hover:bg-cyan-500">导入</button>
      </div>
      <textarea value={jsonText} onChange={e => setJsonText(e.target.value)} placeholder={`[{"word":"...","phonetic":"...","syllables":"...","pos":"...","meanings":["..."],"phrases":["..."],"example":"...","memoryTip":"..."}]`} className="w-full h-20 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white placeholder-slate-500 font-mono resize-none" />
    </div>
  );
}

// ============= 词测模式 =============
type VocabularyTestScope = 'day' | 'week' | 'month';

interface VocabularyTestAnswer {
  spelling: string;
  meaning: string;
  pos: string;
  sentence: string;
}

const TEST_SCOPE_META: Record<VocabularyTestScope, { label: string; desc: string; limit: number }> = {
  day: { label: '每天测', desc: '当天词汇，适合课前课后5分钟快测', limit: 8 },
  week: { label: '每周测', desc: '近7天词汇，适合周末复盘', limit: 18 },
  month: { label: '每月测', desc: '本月词汇抽测，适合阶段诊断', limit: 30 },
};

function normalizeAnswer(value: string) {
  return value.toLowerCase().replace(/[\s.,;:!?'"“”‘’\-_/，。；：！？、（）()]/g, '');
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getMeaningAnswer(word: CalendarWord) {
  return (word.meanings || []).join('；');
}

function collectUniqueWords(days: CalendarDay[]) {
  const seen = new Set<string>();
  const words: CalendarWord[] = [];
  days.forEach(day => {
    day.words.forEach(word => {
      const key = word.word.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      words.push(word);
    });
  });
  return words;
}

function getTestDays(scope: VocabularyTestScope, monthDays: CalendarDay[]) {
  if (monthDays.length === 0) return [];
  const today = new Date();
  const todayISO = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  const todayIndex = monthDays.findIndex(day => day.dateISO === todayISO);
  const anchorIndex = todayIndex >= 0 ? todayIndex : 0;

  if (scope === 'day') return [monthDays[anchorIndex]];
  if (scope === 'week') {
    const start = Math.max(0, anchorIndex - 6);
    return monthDays.slice(start, anchorIndex + 1);
  }
  return monthDays;
}

function createDefaultAnswer(word: CalendarWord): VocabularyTestAnswer {
  return {
    spelling: '',
    meaning: '',
    pos: splitPos(word.pos)[0] || 'n.',
    sentence: '',
  };
}

function scoreVocabularyAnswer(word: CalendarWord, answer: VocabularyTestAnswer) {
  const targetSpelling = normalizeAnswer(word.word);
  const spellingOk = normalizeAnswer(answer.spelling) === targetSpelling;

  const answerMeaning = normalizeAnswer(answer.meaning);
  const meaningOk = answerMeaning.length > 0 && (word.meanings || []).some(meaning => {
    const normalizedMeaning = normalizeAnswer(meaning);
    return normalizedMeaning.includes(answerMeaning) || answerMeaning.includes(normalizedMeaning);
  });

  const validPos = splitPos(word.pos);
  const posOk = validPos.includes(answer.pos);

  const sentence = answer.sentence.trim();
  const sentenceWordPattern = new RegExp(`\\b${escapeRegExp(word.word)}(?:s|es|ed|ing)?\\b`, 'i');
  const sentenceHasWord = sentenceWordPattern.test(sentence);
  const sentenceHasShape = sentence.split(/\s+/).filter(Boolean).length >= 6 && /[.!?]?$/.test(sentence);
  const sentenceHasGrammarSignal = /\b(am|is|are|was|were|be|been|being|do|does|did|have|has|had|can|could|will|would|should|may|might|must)\b/i.test(sentence)
    || /\b[a-z]+(?:s|ed|ing)\b/i.test(sentence);
  const sentenceScore = Math.min(25,
    (sentenceHasWord ? 10 : 0) +
    (sentenceHasShape ? 7 : 0) +
    (sentenceHasGrammarSignal ? 5 : 0) +
    (posOk && sentenceHasWord ? 3 : 0)
  );

  const total = (spellingOk ? 30 : 0) + (meaningOk ? 25 : 0) + (posOk ? 20 : 0) + sentenceScore;
  return {
    total,
    spellingOk,
    meaningOk,
    posOk,
    sentenceScore,
    sentenceHasWord,
    sentenceHasShape,
    sentenceHasGrammarSignal,
  };
}

function VocabularyTestMode({
  semesterPlan,
  currentMonthDays,
  monthLabel,
}: {
  semesterPlan?: SemesterPlan;
  currentMonthDays: CalendarDay[];
  monthLabel: string;
}) {
  const [scope, setScope] = useState<VocabularyTestScope>('day');
  const [answers, setAnswers] = useState<Record<string, VocabularyTestAnswer>>({});
  const [submitted, setSubmitted] = useState(false);

  const testDays = useMemo(() => getTestDays(scope, currentMonthDays), [scope, currentMonthDays]);
  const testWords = useMemo(() => {
    const limit = TEST_SCOPE_META[scope].limit;
    return collectUniqueWords(testDays).slice(0, limit);
  }, [scope, testDays]);

  const testKey = testWords.map(word => word.word).join('|');

  useEffect(() => {
    const nextAnswers: Record<string, VocabularyTestAnswer> = {};
    testWords.forEach(word => {
      nextAnswers[word.word] = answers[word.word] || createDefaultAnswer(word);
    });
    setAnswers(nextAnswers);
    setSubmitted(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testKey, scope]);

  const result = useMemo(() => {
    const perWord = testWords.map(word => ({
      word,
      answer: answers[word.word] || createDefaultAnswer(word),
      score: scoreVocabularyAnswer(word, answers[word.word] || createDefaultAnswer(word)),
    }));
    const total = perWord.reduce((sum, item) => sum + item.score.total, 0);
    const max = perWord.length * 100;
    return {
      perWord,
      total,
      max,
      percent: max ? Math.round((total / max) * 100) : 0,
    };
  }, [answers, testWords]);

  const updateAnswer = (word: CalendarWord, patch: Partial<VocabularyTestAnswer>) => {
    setAnswers(prev => ({
      ...prev,
      [word.word]: {
        ...(prev[word.word] || createDefaultAnswer(word)),
        ...patch,
      },
    }));
  };

  if (!semesterPlan) {
    return (
      <div className="rounded-2xl border border-slate-700 bg-slate-900/60 p-6 text-center text-slate-400">
        暂无词汇数据，无法生成词测。
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Vocabulary Test</div>
            <h2 className="mt-1 text-xl font-black text-white">词测模式</h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">
              拼写、中文意思、词性为基础得分；用目标词和正确词性造句为高阶得分。当前范围：{semesterPlan.name} · {monthLabel}。
            </p>
          </div>
          <div className="rounded-xl border border-amber-300/25 bg-amber-300/10 px-4 py-3 text-right">
            <div className="text-xs text-amber-100/70">本次词量</div>
            <div className="text-2xl font-black text-amber-100">{testWords.length}</div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-3">
          {(['day', 'week', 'month'] as VocabularyTestScope[]).map(item => (
            <button
              key={item}
              type="button"
              onClick={() => setScope(item)}
              className={`rounded-xl border p-3 text-left transition-all ${
                scope === item
                  ? 'border-cyan-300/60 bg-cyan-400/15 shadow-lg shadow-cyan-950/30'
                  : 'border-slate-700 bg-slate-800/55 hover:border-slate-500 hover:bg-slate-800'
              }`}
            >
              <div className="text-sm font-black text-white">{TEST_SCOPE_META[item].label}</div>
              <p className="mt-1 text-xs leading-5 text-slate-400">{TEST_SCOPE_META[item].desc}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {result.perWord.map(({ word, answer, score }, index) => {
          const posOptions = splitPos(word.pos);
          return (
            <div key={`${word.word}-${index}`} className="rounded-2xl border border-slate-700 bg-slate-900/60 p-4">
              <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xl font-black text-white">{index + 1}. {word.word}</span>
                    <button
                      type="button"
                      onClick={() => { speak(word.word); }}
                      className="grid h-9 w-9 place-items-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-cyan-200 transition-all hover:bg-cyan-400/20"
                      title="听发音"
                    >
                      <Volume2 size={18} />
                    </button>
                    <span className={`rounded-full border px-2 py-1 text-xs font-black text-white ${getPosBg(word.pos)}`}>{word.pos}</span>
                  </div>
                  <div className="mt-1 text-xs font-mono text-cyan-200">{word.phonetic || '暂无音标'}</div>
                </div>
                {submitted && (
                  <div className="rounded-xl border border-slate-600 bg-slate-950/70 px-3 py-2 text-right">
                    <div className="text-[10px] text-slate-400">本词得分</div>
                    <div className={`text-xl font-black ${score.total >= 80 ? 'text-emerald-300' : score.total >= 60 ? 'text-amber-300' : 'text-rose-300'}`}>{score.total}/100</div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <label className="space-y-1">
                  <span className="text-xs font-bold text-slate-300">1. 拼写</span>
                  <input
                    value={answer.spelling}
                    onChange={e => updateAnswer(word, { spelling: e.target.value })}
                    placeholder="听音或看中文后输入英文"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-all focus:border-cyan-400"
                  />
                  {submitted && <span className={`text-xs ${score.spellingOk ? 'text-emerald-300' : 'text-rose-300'}`}>{score.spellingOk ? '拼写正确 +30' : `正确拼写：${word.word}`}</span>}
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold text-slate-300">2. 中文意思</span>
                  <input
                    value={answer.meaning}
                    onChange={e => updateAnswer(word, { meaning: e.target.value })}
                    placeholder="输入一个核心中文释义"
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-all focus:border-cyan-400"
                  />
                  {submitted && <span className={`text-xs ${score.meaningOk ? 'text-emerald-300' : 'text-rose-300'}`}>{score.meaningOk ? '释义命中 +25' : `参考：${getMeaningAnswer(word)}`}</span>}
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold text-slate-300">3. 词性</span>
                  <select
                    value={answer.pos}
                    onChange={e => updateAnswer(word, { pos: e.target.value })}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-all focus:border-cyan-400"
                  >
                    {posOptions.map(pos => (
                      <option key={pos} value={pos}>{pos} · {getPosLabel(pos)}</option>
                    ))}
                  </select>
                  {submitted && <span className={`text-xs ${score.posOk ? 'text-emerald-300' : 'text-rose-300'}`}>{score.posOk ? '词性正确 +20' : `应为：${word.pos}`}</span>}
                </label>
                <label className="space-y-1">
                  <span className="text-xs font-bold text-slate-300">4. 高阶造句</span>
                  <input
                    value={answer.sentence}
                    onChange={e => updateAnswer(word, { sentence: e.target.value })}
                    placeholder={`用 ${word.word} 写一个完整英文句子`}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition-all focus:border-cyan-400"
                  />
                  {submitted && (
                    <span className={`text-xs ${score.sentenceScore >= 18 ? 'text-emerald-300' : score.sentenceScore > 0 ? 'text-amber-300' : 'text-rose-300'}`}>
                      造句 {score.sentenceScore}/25：{score.sentenceHasWord ? '含目标词' : '未含目标词'} · {score.sentenceHasGrammarSignal ? '有谓语信号' : '谓语不清'} · 参考例句：{word.example || word.posDetails?.[0]?.example || '待补充'}
                    </span>
                  )}
                </label>
              </div>
            </div>
          );
        })}
      </div>

      <div className="sticky bottom-4 z-20 rounded-2xl border border-slate-700 bg-slate-950/90 p-3 shadow-2xl shadow-black/40 backdrop-blur">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-xs text-slate-400">评分结构：拼写30 · 中文25 · 词性20 · 造句25</div>
            {submitted && (
              <div className={`mt-1 text-xl font-black ${result.percent >= 85 ? 'text-emerald-300' : result.percent >= 65 ? 'text-amber-300' : 'text-rose-300'}`}>
                总分 {result.total}/{result.max} · {result.percent}%
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                const next: Record<string, VocabularyTestAnswer> = {};
                testWords.forEach(word => { next[word.word] = createDefaultAnswer(word); });
                setAnswers(next);
                setSubmitted(false);
              }}
              className="rounded-xl border border-slate-600 bg-slate-800 px-4 py-2 text-sm font-bold text-slate-200 transition-all hover:bg-slate-700"
            >
              重置
            </button>
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/35 active:scale-[0.99]"
            >
              提交评分
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= 主组件 =============
const GRADE_GROUPS = [
  { label: '一年级', semesters: [
    { key: '1a', label: '一年级上' },
    { key: '1b', label: '一年级下' },
  ]},
  { label: '二年级', semesters: [
    { key: '2a', label: '二年级上' },
    { key: '2b', label: '二年级下' },
  ]},
  { label: '三年级', semesters: [
    { key: '3a', label: '三年级上' },
    { key: '3b', label: '三年级下' },
  ]},
  { label: '四年级', semesters: [
    { key: '4a', label: '四年级上' },
    { key: '4b', label: '四年级下' },
  ]},
  { label: '五年级', semesters: [
    { key: '5a', label: '五年级上' },
    { key: '5b', label: '五年级下' },
  ]},
  { label: '六年级', semesters: [
    { key: '6a', label: '六年级上' },
    { key: '6b', label: '六年级下' },
  ]},
  { label: '七年级', semesters: [
    { key: '7a', label: '七年级上' },
    { key: '7b', label: '七年级下' },
  ]},
  { label: '八年级', semesters: [
    { key: '8a', label: '八年级上' },
    { key: '8b', label: '八年级下' },
  ]},
  { label: '九年级', semesters: [
    { key: '9a', label: '九年级上' },
    { key: '9b', label: '九年级下' },
  ]},
  { label: '十年级', semesters: [
    { key: '10a', label: '十年级上' },
    { key: '10b', label: '十年级下' },
  ]},
  { label: '十一年级', semesters: [
    { key: '11a', label: '十一年级上' },
    { key: '11b', label: '十一年级下' },
  ]},
  { label: '十二年级', semesters: [
    { key: '12a', label: '十二年级上' },
    { key: '12b', label: '十二年级下' },
  ]},
];

const GRADE_STAGE_GROUPS = [
  { id: 'primary', label: '小学', range: '1-6年级', desc: '先打稳自然拼读和基础高频词', grades: GRADE_GROUPS.slice(0, 6) },
  { id: 'middle', label: '初中', range: '7-9年级', desc: '面向中考语境、短语和写作表达', grades: GRADE_GROUPS.slice(6, 9) },
  { id: 'high', label: '高中', range: '10-12年级', desc: '提升长难句、语篇和高考写作词汇', grades: GRADE_GROUPS.slice(9, 12) },
];

function getStageForSemester(key: string) {
  const grade = Number(key.match(/^\d+/)?.[0] || 3);
  if (grade <= 6) return 'primary';
  if (grade <= 9) return 'middle';
  return 'high';
}

export function VocabularyCalendar() {
  const [semKey, setSemKey] = useState('3a');
  const [gradeStage, setGradeStage] = useState(() => getStageForSemester('3a'));
  const [monthIndex, setMonthIndex] = useState(0);
  const [flashWords, setFlashWords] = useState<CalendarWord[]>([]);
  const [flashIndex, setFlashIndex] = useState(0);
  const [activeDay, setActiveDay] = useState<CalendarDay | null>(null);
  const [wrongListDay, setWrongListDay] = useState<CalendarDay | null>(null);
  const [practiceState, setPracticeState] = useState<VocabularyPracticeState>(() => loadVocabularyProgress());
  const [semesterData, setSemesterData] = useState<Record<string, SemesterPlan>>({});
  // PDF导出
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showImport, setShowImport] = useState(false);
  const [vocabMode, setVocabMode] = useState<'calendar' | 'test'>('calendar');

  // 加载数据 + 初始化TTS
  useEffect(() => {
    setSemesterData(calendarDataJson as Record<string, SemesterPlan>);
    setLoading(false);
    // 预初始化语音引擎（移动端必须提前加载语音列表）
    initTTS().then(ok => {
      if (ok) console.log('[TTS] Voice engine ready');
    });
  }, []);

  useEffect(() => {
    saveVocabularyProgress(practiceState);
  }, [practiceState]);

  const currentSem = semesterData[semKey];
  const months = currentSem?.months || [];
  const currentGradeStage = GRADE_STAGE_GROUPS.find(stage => stage.id === gradeStage) || GRADE_STAGE_GROUPS[0];

  const handlePrevMonth = () => setMonthIndex(m => Math.max(0, m - 1));
  const handleNextMonth = () => setMonthIndex(m => Math.min((months.length || 1) - 1, m + 1));

  const handleSemesterChange = (key: string) => {
    setSemKey(key);
    setGradeStage(getStageForSemester(key));
    setMonthIndex(0);
    setFlashWords([]);
    setFlashIndex(0);
    setActiveDay(null);
    setWrongListDay(null);
  };

  // 获取当前月的日期
  const currentMonthDays = useMemo(() => {
    if (!currentSem) return [];
    const currentMonth = months[monthIndex];
    return currentSem.days.filter((day: CalendarDay) => (day.month || Number(day.date.match(/^(\d+)月/)?.[1])) === currentMonth);
  }, [currentSem, monthIndex, months]);

  // 计算本月新词数和复习数
  const monthStats = useMemo(() => {
    if (!currentSem) return { newWords: 0, reviewDays: 0 };
    const startDayNum = currentMonthDays[0]?.day || 1;
    const endDayNum = currentMonthDays[currentMonthDays.length - 1]?.day || startDayNum;
    let reviewCount = 0;
    currentMonthDays.forEach((d: CalendarDay) => {
      const reviews = getReviewDays(d.day);
      reviews.forEach(r => {
        if (r >= startDayNum && r <= endDayNum) reviewCount++;
      });
    });
    return { newWords: currentMonthDays.length * 6, reviewDays: reviewCount };
  }, [currentSem, monthIndex, currentMonthDays]);

  const leadingBlankDays = useMemo(() => {
    const first = currentMonthDays[0];
    if (!first?.dateISO) return 0;
    const weekday = new Date(first.dateISO).getDay();
    return (weekday + 6) % 7;
  }, [currentMonthDays]);

  const todayISO = useMemo(() => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  }, []);

  const openFlashForDay = useCallback((day: CalendarDay) => {
    setActiveDay(day);
    setFlashWords(day.words);
    setFlashIndex(0);
  }, []);

  const applyVocabularyFocus = useCallback(() => {
    if (!Object.keys(semesterData).length) return;
    const raw = sessionStorage.getItem('xsc_vocab_focus');
    if (!raw) return;
    try {
      const focus = JSON.parse(raw) as { semKey?: string; day?: number };
      if (!focus.semKey || !focus.day) return;
      const sem = semesterData[focus.semKey];
      const targetDay = sem?.days.find(day => day.day === focus.day);
      if (!sem || !targetDay) return;
      setSemKey(focus.semKey);
      setGradeStage(getStageForSemester(focus.semKey));
      const targetMonth = targetDay.month || Number(targetDay.date.match(/^(\d+)月/)?.[1]);
      setMonthIndex(Math.max(0, sem.months.indexOf(targetMonth)));
      window.setTimeout(() => openFlashForDay(targetDay), 80);
    } catch {
      // Ignore stale focus payloads from older builds.
    } finally {
      sessionStorage.removeItem('xsc_vocab_focus');
    }
  }, [semesterData, openFlashForDay]);

  useEffect(() => {
    applyVocabularyFocus();
    window.addEventListener('xsc_vocab_focus_change', applyVocabularyFocus);
    return () => window.removeEventListener('xsc_vocab_focus_change', applyVocabularyFocus);
  }, [applyVocabularyFocus]);

  const closeFlash = useCallback(() => {
    setFlashWords([]);
    setFlashIndex(0);
    setActiveDay(null);
  }, []);

  const handleStartWrongWords = useCallback((day: CalendarDay, words: CalendarWord[]) => {
    setWrongListDay(null);
    setActiveDay(day);
    setFlashWords(words);
    setFlashIndex(0);
  }, []);

  const handlePracticeEvent = useCallback((word: CalendarWord, step: PracticeStep, result: 'correct' | 'wrong') => {
    if (!activeDay) return;
    const dayKey = getDayProgressKey(semKey, activeDay);
    const wordKey = getWordKey(word);
    const now = new Date().toISOString();

    setPracticeState(prev => {
      const previousDay = prev[dayKey] || {
        completedWordKeys: [],
        wrongWordKeys: [],
        words: {},
        lastUpdated: now,
      };
      const previousWord = previousDay.words[wordKey] || {
        word: word.word,
        correctSteps: [],
        wrongSteps: [],
        lastStatus: 'new' as const,
        lastUpdated: now,
      };
      const correctSteps = new Set(previousWord.correctSteps);
      const wrongSteps = new Set(previousWord.wrongSteps);
      const completedWordKeys = new Set(previousDay.completedWordKeys);
      const wrongWordKeys = new Set(previousDay.wrongWordKeys);

      if (result === 'correct') {
        correctSteps.add(step);
      } else {
        wrongSteps.add(step);
        wrongWordKeys.add(wordKey);
        completedWordKeys.delete(wordKey);
      }

      const mastered = result === 'correct' && getRequiredPracticeSteps(word).every(requiredStep => correctSteps.has(requiredStep));
      if (mastered) {
        completedWordKeys.add(wordKey);
        wrongWordKeys.delete(wordKey);
      }

      const lastStatus = mastered ? 'mastered' : wrongWordKeys.has(wordKey) ? 'wrong' : 'in-progress';
      const nextWordRecord: WordPracticeRecord = {
        word: word.word,
        correctSteps: Array.from(correctSteps),
        wrongSteps: Array.from(wrongSteps),
        lastStatus,
        lastUpdated: now,
      };

      return {
        ...prev,
        [dayKey]: {
          completedWordKeys: Array.from(completedWordKeys),
          wrongWordKeys: Array.from(wrongWordKeys),
          words: {
            ...previousDay.words,
            [wordKey]: nextWordRecord,
          },
          lastUpdated: now,
        },
      };
    });
  }, [activeDay, semKey]);

  // 导入词汇
  const handleImport = useCallback((targetSem: string, words: CalendarWord[]) => {
    setSemesterData(prev => {
      const copy = { ...prev };
      if (copy[targetSem]) {
        const sem = { ...copy[targetSem], days: [...copy[targetSem].days] };
        let wIdx = 0;
        sem.days = sem.days.map(d => {
          if (wIdx < words.length) {
            const newWords = [...d.words];
            const slots = Math.min(6, words.length - wIdx);
            for (let i = 0; i < slots && wIdx < words.length; i++) {
              if (!newWords[i] || newWords[i].word.startsWith('x')) {
                newWords[i] = words[wIdx];
              }
              wIdx++;
            }
            return { ...d, words: newWords };
          }
          return d;
        });
        copy[targetSem] = sem;
      }
      return copy;
    });
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center h-96"><div className="text-cyan-400 text-lg animate-pulse">正在加载词汇数据...</div></div>;
  }

  return (
    <div className="space-y-4 max-w-6xl mx-auto px-4 py-6">
      {/* 标题 */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          词汇记背日历
        </h1>
        <p className="text-sm text-slate-400 mt-1">每天6词 · 艾宾浩斯记忆曲线 · 彩色音节 · 闪卡翻转 · 音节拼图</p>
      </div>

      {/* 年级选择 */}
      <div className="rounded-2xl border border-slate-700 bg-slate-900/55 p-4">
        <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Vocabulary Track</div>
            <h2 className="mt-1 text-lg font-black text-white">按学段选择词汇</h2>
            <p className="mt-1 text-xs text-slate-400">先选学段，再选年级卡片中的上/下学期，避免 24 个学期混在一排。</p>
          </div>
          {currentSem && (
            <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-right">
              <div className="text-xs text-cyan-200">当前</div>
              <div className="text-sm font-black text-white">{currentSem.name}</div>
              <div className="text-[10px] text-cyan-100/60">{currentSem.days.length} 天 · {(currentSem.days.length * 6).toLocaleString()} 词位</div>
            </div>
          )}
        </div>

        <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-3">
          {GRADE_STAGE_GROUPS.map(stage => (
            <button
              key={stage.id}
              type="button"
              onClick={() => setGradeStage(stage.id)}
              className={`rounded-xl border p-3 text-left transition-all ${
                gradeStage === stage.id
                  ? 'border-cyan-300/60 bg-cyan-400/15 shadow-lg shadow-cyan-950/30'
                  : 'border-slate-700 bg-slate-800/55 hover:border-slate-500 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-base font-black text-white">{stage.label}</span>
                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${gradeStage === stage.id ? 'bg-cyan-300/20 text-cyan-100' : 'bg-slate-700 text-slate-400'}`}>{stage.range}</span>
              </div>
              <p className="mt-1 text-xs leading-5 text-slate-400">{stage.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {currentGradeStage.grades.map(g => (
            <div key={g.label} className="rounded-xl border border-slate-700 bg-slate-800/50 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-black text-white">{g.label}</span>
                <span className="text-[10px] text-slate-500">{currentGradeStage.label}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {g.semesters.map(s => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => handleSemesterChange(s.key)}
                    className={`rounded-lg px-3 py-2 text-xs font-black transition-all ${
                      semKey === s.key
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-slate-900 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    {s.label.endsWith('上') ? '上学期' : '下学期'}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 月份导航 */}
      {currentSem && (
        <div className="flex items-center justify-between bg-slate-800/50 rounded-xl px-4 py-2 border border-slate-700">
          <button onClick={handlePrevMonth} disabled={monthIndex === 0} className="p-2 rounded-lg bg-slate-700 text-white disabled:opacity-30 hover:bg-slate-600 transition-colors"><ChevronLeft size={18} /></button>
          <div className="text-center">
            <div className="text-lg font-black text-white">{currentSem.name} — {months[monthIndex] || ''}月</div>
            <div className="text-xs text-slate-400 flex items-center gap-3 justify-center mt-1">
              <span className="flex items-center gap-1"><Brain size={12} className="text-cyan-400" /> 本月新词: <strong className="text-cyan-400">{monthStats.newWords}</strong></span>
              <span className="flex items-center gap-1"><RotateCcw size={12} className="text-amber-400" /> 复习节点: <strong className="text-amber-400">{monthStats.reviewDays}</strong></span>
            </div>
          </div>
          <button onClick={handleNextMonth} disabled={monthIndex >= months.length - 1} className="p-2 rounded-lg bg-slate-700 text-white disabled:opacity-30 hover:bg-slate-600 transition-colors"><ChevronRight size={18} /></button>
        </div>
      )}

      {/* 记背 / 词测模式切换 */}
      <div className="mx-auto grid max-w-xl grid-cols-2 gap-2 rounded-2xl border border-slate-700 bg-slate-900/70 p-2">
        {[
          { key: 'calendar' as const, label: '日历记背', desc: '日期块、闪卡、错词复练' },
          { key: 'test' as const, label: '词测模式', desc: '日测、周测、月测' },
        ].map(mode => (
          <button
            key={mode.key}
            type="button"
            onClick={() => setVocabMode(mode.key)}
            className={`rounded-xl px-3 py-2 text-left transition-all ${
              vocabMode === mode.key
                ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <div className="text-sm font-black">{mode.label}</div>
            <div className="text-[10px] opacity-75">{mode.desc}</div>
          </button>
        ))}
      </div>

      {vocabMode === 'test' && (
        <VocabularyTestMode
          semesterPlan={currentSem}
          currentMonthDays={currentMonthDays}
          monthLabel={`${months[monthIndex] || ''}月`}
        />
      )}

      {/* PDF导出按钮 */}
      {vocabMode === 'calendar' && <div className="flex justify-center">
        <button
          onClick={() => setShowPdfModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-sm shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:from-violet-500 hover:to-purple-500 transition-all active:scale-95"
        >
          <FileDown size={16} /> 导出PDF词单
        </button>
      </div>}

      {/* 艾宾浩斯图例 */}
      {vocabMode === 'calendar' && <div className="flex gap-3 justify-center text-xs">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500"></span> 新词</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500"></span> 复习日</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-emerald-500/60 border border-emerald-300"></span> 过日且6词完成</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-orange-500/70 border border-orange-300 animate-pulse"></span> 错词数</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-slate-700 border border-slate-600"></span> 正常</span>
      </div>}

      {/* 导入按钮 */}
      {vocabMode === 'calendar' && <div className="text-center">
        <button onClick={() => setShowImport(!showImport)} className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 mx-auto">
          <Upload size={12} /> {showImport ? '隐藏导入面板' : '导入自定义词汇'}
        </button>
      </div>}
      {vocabMode === 'calendar' && showImport && <ImportPanel onImport={handleImport} />}

      {/* 日历网格 */}
      {vocabMode === 'calendar' && currentSem && (
        <div className="grid grid-cols-7 gap-1.5">
          {['周一', '周二', '周三', '周四', '周五', '周六', '周日'].map(d => (
            <div key={d} className="text-center text-xs font-bold text-slate-400 py-1">{d}</div>
          ))}
          {Array.from({ length: leadingBlankDays }).map((_, i) => (
            <div key={`blank-${i}`} className="min-h-[154px] rounded-xl border border-slate-800/50 bg-slate-950/20" />
          ))}
          {currentMonthDays.map((day: CalendarDay) => {
            const isNew = day.dateISO === todayISO;
            const isReview = false;
            const progressKey = getDayProgressKey(semKey, day);
            const progressRecord = practiceState[progressKey];
            const wrongWords = getWrongWordsForDay(day, progressRecord);
            const wrongCount = wrongWords.length;
            const completedCount = progressRecord?.completedWordKeys?.filter(key => day.words.some(word => getWordKey(word) === key)).length || 0;
            const fullyMastered = isDayFullyMastered(day, progressRecord);
            const completePastDay = isPastCalendarDay(day, todayISO) && fullyMastered;
            const tileTone = completePastDay
              ? 'border-emerald-400/70 bg-emerald-500/15 ring-1 ring-emerald-400/30 shadow-emerald-950/30'
              : wrongCount > 0
                ? 'border-orange-400/60 bg-orange-500/10 ring-1 ring-orange-400/20'
                : isNew
                  ? 'border-emerald-500/40 bg-emerald-500/5'
                  : isReview
                    ? 'border-amber-500/40 bg-amber-500/5'
                    : 'border-slate-700/50 bg-slate-800/30';
            return (
              <div
                key={day.day}
                role="button"
                tabIndex={0}
                onClick={() => openFlashForDay(day)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openFlashForDay(day);
                  }
                }}
                className={`relative min-h-[100px] cursor-pointer rounded-xl border p-2 pb-8 flex flex-col gap-2 text-left transition-all hover:shadow-lg hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-cyan-400/70 ${tileTone}`}
                title="点击开始当日6词闪卡"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`text-2xl font-black ${completePastDay ? 'text-emerald-300' : wrongCount > 0 ? 'text-orange-300' : isNew ? 'text-emerald-400' : isReview ? 'text-amber-400' : 'text-white'}`}>{day.dayOfMonth || day.day}</span>
                  <span className="text-[10px] text-slate-500 text-right leading-tight">{day.weekdayCn}<br />{day.weekdayEn}</span>
                </div>
                <div className="space-y-1">
                  <div className="text-xs text-slate-400">{day.date}</div>
                  {(day.holidayCn || day.holidayEn) ? (
                    <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-2 py-1">
                      <div className="text-xs font-bold text-cyan-200">{day.holidayCn}</div>
                      <div className="text-[10px] text-cyan-100/70 leading-tight">{day.holidayEn}</div>
                    </div>
                  ) : (
                    <div className="text-[10px] text-slate-500">已背 {completedCount}/{day.words.length || 6}</div>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 flex items-center gap-1">
                  {wrongCount > 0 && (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setWrongListDay(day);
                      }}
                      className="h-7 min-w-7 rounded-full border border-orange-300/70 bg-orange-500/20 px-2 text-center text-sm font-black text-orange-200 shadow-lg shadow-orange-500/20 animate-pulse transition-all hover:bg-orange-500/35 hover:text-white"
                      title={`查看 ${wrongCount} 个错词`}
                      aria-label={`查看 ${wrongCount} 个错词`}
                    >
                      {wrongCount}
                    </button>
                  )}
                  <span className="grid h-7 min-w-7 place-items-center rounded-full border border-emerald-400/60 bg-emerald-500/15 px-2 text-sm font-black text-emerald-200 shadow-sm shadow-emerald-900/30" title="每日6个单词">
                    {day.words.length || 6}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 闪卡弹窗 */}
      {flashWords.length > 0 && (
        <FlashCard
          words={flashWords}
          currentIndex={flashIndex}
          onClose={closeFlash}
          onNavigate={(i) => setFlashIndex(i)}
          onPracticeEvent={handlePracticeEvent}
        />
      )}

      {/* 错词清单弹窗 */}
      {wrongListDay && (
        <WrongWordsModal
          day={wrongListDay}
          record={practiceState[getDayProgressKey(semKey, wrongListDay)]}
          onClose={() => setWrongListDay(null)}
          onStartWrongWords={(words) => handleStartWrongWords(wrongListDay, words)}
        />
      )}

      {/* PDF导出弹窗 */}
      {showPdfModal && (
        <PDFExportModal
          semesterName={semesterData[semKey]?.name || semKey}
          currentMonthIndex={monthIndex}
          months={months}
          semesterPlan={semesterData[semKey]}
          onClose={() => setShowPdfModal(false)}
        />
      )}
    </div>
  );
}

// ============================================
// PDF导出弹窗组件
// ============================================
function PDFExportModal({
  semesterName,
  currentMonthIndex,
  months,
  semesterPlan,
  onClose,
}: {
  semesterName: string;
  currentMonthIndex: number;
  months: number[];
  semesterPlan?: SemesterPlan;
  onClose: () => void;
}) {
  const currentMonth = months[currentMonthIndex];
  const currentMonthDays = semesterPlan?.days.filter((day) => day.month === currentMonth) || [];
  const currentDay = currentMonthDays[0]?.day || 1;
  const [pdfRange, setPdfRange] = useState<'day' | 'week' | 'month' | 'custom' | 'selected'>('day');
  const [pdfDayStart, setPdfDayStart] = useState(currentDay);
  const [pdfDayEnd, setPdfDayEnd] = useState(currentDay);
  const [pdfSelectedDays, setPdfSelectedDays] = useState<number[]>(currentDay ? [currentDay] : []);
  const [pdfStudentName, setPdfStudentName] = useState('');
  const [pdfStudentClass, setPdfStudentClass] = useState('');
  const [pdfGenerating, setPdfGenerating] = useState(false);

  const handleGenerate = async () => {
    if (!semesterPlan) return;
    setPdfGenerating(true);
    try {
      let startDay = pdfDayStart;
      let endDay = pdfDayEnd;
      let selectedDays: CalendarDay[] | null = null;
      const today = new Date().toLocaleDateString('zh-CN');

      if (pdfRange === 'day') {
        startDay = currentDay;
        endDay = currentDay;
      } else if (pdfRange === 'week') {
        startDay = Math.max(1, currentDay - 6);
        endDay = currentDay;
      } else if (pdfRange === 'month') {
        startDay = currentMonthDays[0]?.day || 1;
        endDay = currentMonthDays[currentMonthDays.length - 1]?.day || startDay;
      } else if (pdfRange === 'selected') {
        selectedDays = semesterPlan.days.filter((day) => pdfSelectedDays.includes(day.day));
      }

      const days = selectedDays || semesterPlan.days.slice(startDay - 1, endDay);
      const words = mergeWordsFromDays(days);

      if (words.length === 0) {
        alert('选定范围内没有词汇');
        setPdfGenerating(false);
        return;
      }

      let dayRangeText: string;
      if (pdfRange === 'selected') {
        dayRangeText = days.map((day) => day.date).join('、');
      } else if (startDay === endDay) {
        dayRangeText = semesterPlan.days[startDay - 1]?.date || `第${startDay}天`;
      } else {
        const sDate = semesterPlan.days[startDay - 1]?.date || `第${startDay}天`;
        const eDate = semesterPlan.days[endDay - 1]?.date || `第${endDay}天`;
        dayRangeText = `${sDate}-${eDate}`;
      }

      const success = await generatePDF({
        words,
        exportType: 'test',
        studentName: pdfStudentName,
        studentClass: pdfStudentClass,
        date: today,
        semesterName,
        dayRange: dayRangeText,
      });

      if (success) {
        onClose();
      } else {
        alert('PDF生成失败，请重试');
      }
    } catch (e) {
      console.error(e);
      alert('PDF生成出错');
    }
    setPdfGenerating(false);
  };

  const totalDays = semesterPlan?.days.length || 120;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-slate-800 rounded-2xl shadow-2xl max-w-lg w-[90%] max-h-[90vh] overflow-y-auto border border-slate-700" onClick={e => e.stopPropagation()}>
        <div className="sticky top-0 bg-slate-800 rounded-t-2xl p-5 border-b border-slate-700 flex items-center justify-between z-10">
          <h3 className="text-xl font-bold text-white flex items-center gap-2"><FileDown size={20} className="text-violet-400" /> 导出词汇测试单</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
        </div>

        <div className="p-5 space-y-5">
          {/* 时间范围 */}
          <div>
            <label className="text-sm font-semibold text-slate-300 mb-2 block">选择时间范围</label>
            <div className="grid grid-cols-5 gap-2 mb-2">
              {[
                { key: 'day' as const, label: '当天', desc: `第${currentDay}天` },
                { key: 'week' as const, label: '本周', desc: `近7天` },
                { key: 'month' as const, label: '当月', desc: `${months[currentMonthIndex]}月` },
                { key: 'selected' as const, label: '多日期', desc: '自由选' },
                { key: 'custom' as const, label: '自定义', desc: '选天数' },
              ].map(r => (
                <button key={r.key} onClick={() => setPdfRange(r.key)}
                  className={`p-2 rounded-lg text-center transition-all ${pdfRange === r.key ? 'bg-violet-600 text-white' : 'bg-slate-700 text-slate-400 hover:bg-slate-600'}`}
                >
                  <div className="text-xs font-bold">{r.label}</div>
                  <div className="text-[10px] opacity-70">{r.desc}</div>
                </button>
              ))}
            </div>
            {pdfRange === 'selected' && (
              <div className="bg-slate-700/50 rounded-lg p-3">
                <div className="text-xs text-slate-400 mb-2">自由选择当前月份日期，可多选</div>
                <div className="grid grid-cols-7 gap-1.5">
                  {currentMonthDays.map((day) => {
                    const active = pdfSelectedDays.includes(day.day);
                    return (
                      <button
                        key={day.day}
                        onClick={() => setPdfSelectedDays(prev => active ? prev.filter(x => x !== day.day) : [...prev, day.day].sort((a, b) => a - b))}
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
                  <input type="number" min={1} max={totalDays} value={pdfDayStart} onChange={e => setPdfDayStart(Math.max(1, Math.min(totalDays, parseInt(e.target.value) || 1)))} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-violet-500" />
                </div>
                <span className="text-slate-500 mt-5">~</span>
                <div className="flex-1">
                  <label className="text-xs text-slate-400 block mb-1">结束天</label>
                  <input type="number" min={pdfDayStart} max={totalDays} value={pdfDayEnd} onChange={e => setPdfDayEnd(Math.max(pdfDayStart, Math.min(totalDays, parseInt(e.target.value) || pdfDayStart)))} className="w-full bg-slate-900 border border-slate-600 rounded-lg px-3 py-1.5 text-white text-sm focus:outline-none focus:border-violet-500" />
                </div>
              </div>
            )}
          </div>

          {/* 学生信息 */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">姓名</label>
              <input type="text" value={pdfStudentName} onChange={e => setPdfStudentName(e.target.value)} placeholder="学生姓名" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 placeholder-slate-500" />
            </div>
            <div>
              <label className="text-sm font-semibold text-slate-300 mb-2 block">班级</label>
              <input type="text" value={pdfStudentClass} onChange={e => setPdfStudentClass(e.target.value)} placeholder="如：七年级3班" className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 placeholder-slate-500" />
            </div>
          </div>

          {/* 确认信息 */}
          <div className="bg-slate-700/30 rounded-xl p-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-slate-400">学期</span><span className="text-white font-medium">{semesterName}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">导出类型</span><span className="text-white font-medium">词汇测试单</span></div>
            <div className="flex justify-between"><span className="text-slate-400">时间范围</span><span className="text-white font-medium">
              {pdfRange === 'day' ? `第${currentDay}天` : pdfRange === 'week' ? `第${Math.max(1, currentDay - 6)}-${currentDay}天` : pdfRange === 'month' ? `${months[currentMonthIndex]}月` : pdfRange === 'selected' ? `${pdfSelectedDays.length}个日期` : `第${pdfDayStart}-${pdfDayEnd}天`}
            </span></div>
            <div className="flex justify-between"><span className="text-slate-400">姓名</span><span className="text-white font-medium">{pdfStudentName || '未填写'}</span></div>
            <div className="flex justify-between"><span className="text-slate-400">班级</span><span className="text-white font-medium">{pdfStudentClass || '未填写'}</span></div>
          </div>

          {/* 操作按钮 */}
          <div className="flex gap-3 pt-2">
            <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-slate-700 text-slate-300 font-semibold hover:bg-slate-600 transition-colors">取消</button>
            <button onClick={handleGenerate} disabled={pdfGenerating} className={`flex-[2] py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2 ${pdfGenerating ? 'opacity-60' : 'hover:from-violet-500 hover:to-purple-500 active:scale-95'}`}>
              {pdfGenerating ? '正在生成PDF...' : (<><FileDown size={16} /> 生成并下载测试单</>)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
