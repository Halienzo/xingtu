import { useState, useEffect, useCallback } from 'react';
import type { AppState, Section } from '../App';
import type { Question } from '../data/questions';
import { QuestionCard } from '../components/QuestionCard';
import { Timer, Play, RotateCcw, Trophy, Clock, Target, AlertTriangle } from 'lucide-react';

interface ExamProps {
  questions: Question[];
  state: AppState;
  onAnswer: (questionId: number, selectedOption: number, isCorrect: boolean) => void;
  navigate: (section: Section, cat?: string) => void;
}

type ExamMode = 'select' | 'running' | 'finished';

export function Exam({ questions, state, onAnswer, navigate }: ExamProps) {
  const [mode, setMode] = useState<ExamMode>('select');
  const [config, setConfig] = useState({ count: 30, time: 20, category: 'all' });
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const startExam = useCallback(() => {
    let pool = [...questions];
    if (config.category !== 'all') {
      pool = pool.filter(q => q.category === config.category);
    }
    // Shuffle
    pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, Math.min(config.count, pool.length));
    setExamQuestions(selected);
    setTimeLeft(config.time * 60);
    setCurrentIndex(0);
    setMode('running');
  }, [questions, config]);

  useEffect(() => {
    if (mode !== 'running' || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setMode('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [mode, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = examQuestions.filter(q => state.userAnswers[q.id]).length;
  const correctCount = examQuestions.filter(q => state.userAnswers[q.id]?.isCorrect).length;
  const wrongCount = answeredCount - correctCount;
  const score = examQuestions.length > 0 ? Math.round((correctCount / examQuestions.length) * 100) : 0;

  const isTimeLow = timeLeft < 60;

  if (mode === 'select') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">模拟考试</h1>
          <p className="text-slate-400">选择考试配置，开始模拟练习</p>
        </div>

        <div className="space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-400" />
              题目数量
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[10, 20, 30, 50, 100].map(n => (
                <button
                  key={n}
                  onClick={() => setConfig(prev => ({ ...prev, count: n }))}
                  className={`py-3 rounded-xl text-sm font-medium transition-all ${config.count === n ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                  {n}题
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              考试时间（分钟）
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[10, 15, 20, 30, 45].map(t => (
                <button
                  key={t}
                  onClick={() => setConfig(prev => ({ ...prev, time: t }))}
                  className={`py-3 rounded-xl text-sm font-medium transition-all ${config.time === t ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                >
                  {t}分钟
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-blue-400" />
              题目范围
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setConfig(prev => ({ ...prev, category: 'all' }))}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${config.category === 'all' ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                全部题目
              </button>
              <button
                onClick={() => setConfig(prev => ({ ...prev, category: 'trap' }))}
                className={`py-3 rounded-xl text-sm font-medium transition-all ${config.category === 'trap' ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                陷阱题
              </button>
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full py-4 rounded-2xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-5 h-5" />
            开始考试
          </button>
        </div>
      </div>
    );
  }

  if (mode === 'running') {
    const currentQuestion = examQuestions[currentIndex];
    if (!currentQuestion) return null;

    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Timer & Progress */}
        <div className="fixed top-16 md:top-20 left-0 right-0 z-40 bg-slate-900/95 backdrop-blur-lg border-b border-white/10">
          <div className="max-w-4xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Timer className={`w-5 h-5 ${isTimeLow ? 'text-red-400 animate-pulse' : 'text-blue-400'}`} />
                <span className={`text-xl font-bold font-mono ${isTimeLow ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              <span className="text-sm text-slate-400">
                {currentIndex + 1} / {examQuestions.length}
              </span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="pt-20">
          <QuestionCard
            question={currentQuestion}
            userAnswer={state.userAnswers[currentQuestion.id]}
            onAnswer={onAnswer}
            onFavorite={() => {}}
            isFavorite={false}
            index={currentIndex}
          />

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 text-sm disabled:opacity-30 hover:bg-white/10 transition-all"
            >
              上一题
            </button>

            <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
              {examQuestions.map((q, i) => {
                const isAnswered = !!state.userAnswers[q.id];
                return (
                  <button
                    key={q.id}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                      i === currentIndex
                        ? 'bg-blue-500 text-white'
                        : isAnswered
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-white/5 text-slate-400 hover:bg-white/10'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            {currentIndex < examQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(examQuestions.length - 1, prev + 1))}
                className="px-4 py-2 rounded-xl bg-blue-500 text-white text-sm hover:bg-blue-400 transition-all"
              >
                下一题
              </button>
            ) : (
              <button
                onClick={() => setMode('finished')}
                className="px-4 py-2 rounded-xl bg-green-500 text-white text-sm hover:bg-green-400 transition-all"
              >
                提交
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Finished
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 md:py-10">
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 text-center mb-8">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${score >= 80 ? 'text-amber-400' : score >= 60 ? 'text-blue-400' : 'text-red-400'}`} />
        <h2 className="text-3xl font-bold mb-2">考试结束</h2>
        <p className="text-slate-400 mb-6">本次模拟考试结果</p>

        <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          {score}分
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-2xl font-bold text-white">{examQuestions.length}</p>
            <p className="text-slate-400 text-sm">总题数</p>
          </div>
          <div className="bg-green-500/10 rounded-xl p-4">
            <p className="text-2xl font-bold text-green-400">{correctCount}</p>
            <p className="text-green-400/60 text-sm">正确</p>
          </div>
          <div className="bg-red-500/10 rounded-xl p-4">
            <p className="text-2xl font-bold text-red-400">{wrongCount}</p>
            <p className="text-red-400/60 text-sm">错误</p>
          </div>
        </div>

        <p className={`text-lg font-medium mb-6 ${score >= 80 ? 'text-amber-400' : score >= 60 ? 'text-blue-400' : 'text-red-400'}`}>
          {score >= 90 ? '优秀！继续保持！' : score >= 80 ? '良好！再努力一下！' : score >= 60 ? '及格！还需加强！' : '不及格！加油练习！'}
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { setMode('select'); window.scrollTo({ top: 0 }); }}
            className="px-6 py-3 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-400 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            再来一次
          </button>
          <button
            onClick={() => navigate('wrong')}
            className="px-6 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-all"
          >
            查看错题
          </button>
        </div>
      </div>

      {/* Review wrong answers */}
      {wrongCount > 0 && (
        <div>
          <h3 className="text-lg font-bold mb-4">错题回顾</h3>
          {examQuestions
            .filter(q => state.userAnswers[q.id] && !state.userAnswers[q.id].isCorrect)
            .map(q => (
              <QuestionCard
                key={q.id}
                question={q}
                userAnswer={state.userAnswers[q.id]}
                onAnswer={onAnswer}
                onFavorite={() => {}}
                isFavorite={false}
                showAnswer
              />
            ))}
        </div>
      )}
    </div>
  );
}
