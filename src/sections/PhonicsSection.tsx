// ============================================
// 自然拼读 Phonics Section
// ============================================
import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PHONICS_PHASES,
  PHONICS_LESSONS,
  type PhonicsLesson,
  type PhonicsPhase,
  getLessonsByPhase,
} from '../data/phonicsData';
import { speakEnglish } from '../lib/ttsService';
import { Volume2, ArrowLeft, CheckCircle2, Circle, Play, BookOpen, Award } from 'lucide-react';

// ---- local storage helpers ----
const LS_KEY = 'phonics_completed';
function loadCompleted(): number[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch {
    return [];
  }
}
function saveCompleted(ids: number[]) {
  localStorage.setItem(LS_KEY, JSON.stringify(ids));
}

// ---- quiz builder ----
interface QuizQuestion {
  correct: string;
  options: string[];
}

function buildQuiz(words: string[], maxQuestions = 10): QuizQuestion[] {
  const usable = words.filter(w => w.length >= 2);
  if (usable.length < 4) return [];
  const pool = usable.slice(0, Math.min(usable.length, 30));
  const qs: QuizQuestion[] = [];
  const used = new Set<string>();
  while (qs.length < maxQuestions && used.size < pool.length) {
    const remaining = pool.filter(w => !used.has(w));
    if (remaining.length === 0) break;
    const correct = remaining[Math.floor(Math.random() * remaining.length)];
    used.add(correct);
    const distractors = pool.filter(w => w !== correct).sort(() => Math.random() - 0.5).slice(0, 3);
    if (distractors.length < 3) continue;
    const options = [correct, ...distractors].sort(() => Math.random() - 0.5);
    qs.push({ correct, options });
  }
  return qs;
}

// ---- sub-components ----

function PhasePills({
  phases,
  active,
  onSelect,
}: {
  phases: PhonicsPhase[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-5">
      {phases.map(p => {
        const isActive = p.id === active;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`
              px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
              border whitespace-nowrap
              ${isActive
                ? 'bg-teal-600 text-white border-teal-500 shadow-md shadow-teal-900/40'
                : 'bg-slate-800/60 text-teal-200 border-teal-500/20 hover:bg-teal-900/30 hover:border-teal-500/40'}
            `}
            title={p.desc}
          >
            {p.name}
          </button>
        );
      })}
    </div>
  );
}

function LessonCard({
  lesson,
  completed,
  onClick,
}: {
  lesson: PhonicsLesson;
  completed: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer w-full
        ${completed
          ? 'bg-emerald-950/20 border-emerald-500/30 hover:border-emerald-500/50'
          : 'bg-slate-800/50 border-slate-700/40 hover:border-teal-500/40 hover:bg-slate-800/80'}
      `}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-[10px] text-slate-400 mb-1">第 {lesson.id} 课</div>
          <div className="text-sm font-bold text-slate-100 leading-tight">{lesson.topic}</div>
          <div className="text-xs text-slate-400 mt-1.5">
            {lesson.words.length} 词 · {lesson.sentences.length} 句
          </div>
        </div>
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        ) : (
          <Circle className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
        )}
      </div>
    </motion.button>
  );
}

function WordChip({ word, onSpeak }: { word: string; onSpeak: (w: string) => void }) {
  return (
    <button
      onClick={() => onSpeak(word)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/8 border border-teal-500/20 text-sm text-slate-200 hover:bg-teal-500/15 hover:border-teal-500/40 hover:scale-105 transition-all duration-200 cursor-pointer"
    >
      <span>{word}</span>
      <Volume2 className="w-3 h-3 text-teal-400 opacity-70" />
    </button>
  );
}

function SentenceItem({ text, onSpeak }: { text: string; onSpeak: (t: string) => void }) {
  return (
    <button
      onClick={() => onSpeak(text)}
      className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 hover:bg-teal-500/5 hover:border-teal-500/20 transition-all duration-200 cursor-pointer"
    >
      <Volume2 className="w-4 h-4 text-teal-400 shrink-0" />
      <span className="text-sm text-slate-200 leading-relaxed">{text}</span>
    </button>
  );
}

function QuizPanel({
  questions,
  onComplete,
  onExit,
}: {
  questions: QuizQuestion[];
  onComplete: (score: number, total: number) => void;
  onExit: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[idx];

  const speakCurrent = useCallback(() => {
    if (q) speakEnglish(q.correct, { rate: 0.85 });
  }, [q]);

  useEffect(() => {
    const t = setTimeout(speakCurrent, 400);
    return () => clearTimeout(t);
  }, [idx, speakCurrent]);

  const handlePick = (choice: string) => {
    if (answered) return;
    setSelected(choice);
    setAnswered(true);
    const isCorrect = choice === q.correct;
    if (isCorrect) setScore(s => s + 1);

    if (idx + 1 < questions.length) {
      setTimeout(() => {
        setIdx(i => i + 1);
        setSelected(null);
        setAnswered(false);
      }, 1200);
    } else {
      setTimeout(() => {
        setFinished(true);
        onComplete(isCorrect ? score + 1 : score, questions.length);
      }, 1200);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="p-6 rounded-xl border border-dashed border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-teal-500/5 text-center">
        <Award className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <div className="text-lg font-bold text-amber-300 mb-1">
          练习完成！{score}/{questions.length}
        </div>
        <div className="text-sm text-slate-400 mb-4">正确率 {pct}%</div>
        <button
          onClick={onExit}
          className="px-5 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          返回课程
        </button>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl border border-dashed border-teal-500/25 bg-gradient-to-br from-teal-500/5 to-amber-500/[0.03]">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-bold text-amber-300 flex items-center gap-2">
          <Play className="w-4 h-4" />
          听音选词
        </div>
        <div className="text-xs text-slate-400">
          {idx + 1} / {questions.length}
        </div>
      </div>

      {/* progress */}
      <div className="h-1 bg-white/10 rounded-full overflow-hidden mb-5">
        <motion.div
          className="h-full bg-gradient-to-r from-teal-500 to-amber-400 rounded-full"
          initial={false}
          animate={{ width: `${((idx + (answered ? 1 : 0)) / questions.length) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* replay button */}
      <button
        onClick={speakCurrent}
        className="mx-auto mb-5 flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-sm hover:bg-teal-500/20 transition-colors cursor-pointer"
      >
        <Volume2 className="w-4 h-4" />
        再次播放
      </button>

      {/* options */}
      <div className="grid grid-cols-2 gap-3">
        {q.options.map(opt => {
          let stateClass = 'bg-amber-500/5 border-amber-500/25 text-amber-200/90 hover:bg-amber-500/10 hover:border-amber-500/50';
          if (answered) {
            if (opt === q.correct) {
              stateClass = 'bg-emerald-500/15 border-emerald-500/70 text-emerald-300';
            } else if (opt === selected) {
              stateClass = 'bg-red-500/15 border-red-500/60 text-red-300';
            } else {
              stateClass = 'bg-amber-500/[0.03] border-amber-500/10 text-slate-500';
            }
          }
          return (
            <button
              key={opt}
              onClick={() => handlePick(opt)}
              disabled={answered}
              className={`py-3 px-4 rounded-xl border-2 text-center text-sm font-medium transition-all duration-200 cursor-pointer ${stateClass}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- main component ----

export default function PhonicsSection() {
  const [phase, setPhase] = useState('foundations');
  const [currentLesson, setCurrentLesson] = useState<PhonicsLesson | null>(null);
  const [completed, setCompleted] = useState<number[]>(loadCompleted);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizKey, setQuizKey] = useState(0);

  const lessons = useMemo(() => getLessonsByPhase(phase), [phase]);

  const openLesson = useCallback((lesson: PhonicsLesson) => {
    setCurrentLesson(lesson);
    setShowQuiz(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const backToGrid = useCallback(() => {
    setCurrentLesson(null);
    setShowQuiz(false);
  }, []);

  const startQuiz = useCallback((lesson: PhonicsLesson) => {
    const qs = buildQuiz(lesson.words);
    if (qs.length === 0) return;
    setQuizQuestions(qs);
    setShowQuiz(true);
    setQuizKey(k => k + 1);
  }, []);

  const handleQuizComplete = useCallback((score: number, total: number) => {
    if (currentLesson && score >= total * 0.6) {
      setCompleted(prev => {
        if (prev.includes(currentLesson.id)) return prev;
        const next = [...prev, currentLesson.id];
        saveCompleted(next);
        return next;
      });
    }
  }, [currentLesson]);

  const handleSpeak = useCallback((text: string) => {
    speakEnglish(text, { rate: 0.85 });
  }, []);

  // --- Lesson Detail View ---
  if (currentLesson) {
    const isCompleted = completed.includes(currentLesson.id);
    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        <button
          onClick={backToGrid}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-teal-300 transition-colors mb-5 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          返回课程列表
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-800/50 border border-teal-500/20 rounded-2xl p-5 md:p-6 mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs text-slate-400 mb-1">第 {currentLesson.id} 课</div>
              <h2 className="text-lg font-bold text-teal-300">{currentLesson.topic}</h2>
            </div>
            {isCompleted && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
          </div>

          {/* Words */}
          <div className="mb-5">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              单词 ({currentLesson.words.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {currentLesson.words.map(w => (
                <WordChip key={w} word={w} onSpeak={handleSpeak} />
              ))}
            </div>
          </div>

          {/* Sentences */}
          {currentLesson.sentences.length > 0 && (
            <div className="mb-5">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                句子 ({currentLesson.sentences.length})
              </div>
              <div className="flex flex-col gap-2">
                {currentLesson.sentences.map((s, i) => (
                  <SentenceItem key={i} text={s} onSpeak={handleSpeak} />
                ))}
              </div>
            </div>
          )}

          {/* Start Quiz */}
          {!showQuiz && currentLesson.words.length >= 4 && (
            <button
              onClick={() => startQuiz(currentLesson)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-semibold text-sm shadow-lg shadow-amber-900/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-4 h-4" />
              开始听音选词练习
            </button>
          )}
        </motion.div>

        {/* Quiz */}
        <AnimatePresence>
          {showQuiz && (
            <motion.div
              key={quizKey}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <QuizPanel
                questions={quizQuestions}
                onComplete={handleQuizComplete}
                onExit={() => setShowQuiz(false)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // --- Grid View ---
  const phaseInfo = PHONICS_PHASES.find(p => p.id === phase);
  const completedInPhase = lessons.filter(l => completed.includes(l.id)).length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-teal-300 mb-1">自然拼读</h1>
        <p className="text-sm text-slate-400">
          共 {PHONICS_LESSONS.length} 课 · {PHONICS_PHASES.length} 个阶段 · 从基础发音到综合运用
        </p>
      </div>

      <PhasePills phases={PHONICS_PHASES} active={phase} onSelect={setPhase} />

      {phaseInfo && (
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-slate-300">
            <span className="font-semibold text-teal-300">{phaseInfo.name}</span>
            <span className="text-slate-500 mx-2">·</span>
            <span className="text-slate-400">{phaseInfo.desc}</span>
          </div>
          <div className="text-xs text-slate-500">
            {completedInPhase}/{lessons.length} 已完成
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <AnimatePresence mode="popLayout">
          {lessons.map(lesson => (
            <motion.div
              key={lesson.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <LessonCard
                lesson={lesson}
                completed={completed.includes(lesson.id)}
                onClick={() => openLesson(lesson)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {lessons.length === 0 && (
        <div className="text-center py-16 text-slate-500 text-sm">该阶段暂无课程</div>
      )}
    </div>
  );
}
