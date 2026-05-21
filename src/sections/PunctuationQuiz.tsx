import { useState, useCallback } from 'react';
import { ArrowLeft, CheckCircle, XCircle, RefreshCw, Trophy, Zap, BookOpen, Clock, Star, ChevronRight, Filter } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { shuffleQuestions, getQuizStats } from '../data/quizData';
import type { QuizQuestion } from '../data/punctuationData';
import { motion } from 'framer-motion';
import CelebrationEffect from '../components/CelebrationEffect';
import { BreathingText } from '../components/AnimatedCard';
import { playCorrectSound, playWrongSound, playComboSound } from '../utils/soundSystem';
import { triggerCelebration } from '../components/CelebrationEffect';

export default function PunctuationQuiz() {
  const [mode, setMode] = useState<'menu' | 'quiz' | 'result'>('menu');
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['single', 'judge', 'fill']);
  const [selectedDifficulties, setSelectedDifficulties] = useState<number[]>([1, 2]);
  const [questionCount, setQuestionCount] = useState(10);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(0);
  const [quizTime, setQuizTime] = useState(0);

  const stats = getQuizStats();

  const startQuiz = useCallback(() => {
    let filtered = QUIZ_QUESTIONS.filter(q => selectedTypes.includes(q.type) && selectedDifficulties.includes(q.difficulty));
    filtered = shuffleQuestions(filtered);
    const selected = filtered.slice(0, Math.min(questionCount, filtered.length));
    setQuestions(selected);
    setCurrentIndex(0);
    setAnswers({});
    setShowExplanation(false);
    setMode('quiz');
    setQuizStartTime(Date.now());
    setQuizTime(0);
  }, [selectedTypes, selectedDifficulties, questionCount]);

  const handleAnswer = (answer: string) => {
    const q = questions[currentIndex];
    const isCorrect = answer === q.answer;
    const newAnswers = { ...answers, [q.id]: answer };
    setAnswers(newAnswers);
    setShowExplanation(true);

    // 音效 + 庆祝效果
    if (isCorrect) {
      playCorrectSound();
      const correctCount = Object.entries(newAnswers).filter(([id, ans]) => {
        const qq = questions.find(qq => qq.id === Number(id));
        return qq && ans === qq.answer;
      }).length;
      if (correctCount >= 3 && correctCount % 3 === 0) {
        playComboSound(correctCount);
        triggerCelebration('combo', correctCount);
      } else if (correctCount >= 5) {
        triggerCelebration('spell', correctCount);
      }
    } else {
      playWrongSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(i => i + 1);
      setShowExplanation(false);
    } else {
      setQuizTime(Math.floor((Date.now() - quizStartTime) / 1000));
      setMode('result');
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setShowExplanation(true); // 已答过的题显示解析
    }
  };

  const getScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.answer) correct++;
    });
    return correct;
  };

  const getGrade = (score: number, total: number) => {
    const pct = (score / total) * 100;
    if (pct >= 90) return { grade: 'A', label: '优秀', color: 'text-emerald-400' };
    if (pct >= 80) return { grade: 'B', label: '良好', color: 'text-blue-400' };
    if (pct >= 70) return { grade: 'C', label: '中等', color: 'text-amber-400' };
    if (pct >= 60) return { grade: 'D', label: '及格', color: 'text-orange-400' };
    return { grade: 'F', label: '需努力', color: 'text-red-400' };
  };

  // Menu mode
  if (mode === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-4">
            <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> 返回
            </a>
            <div className="flex items-center gap-2">
              <Zap className="text-amber-400" size={22} />
              <div className="flex flex-col">
                <BreathingText className="text-lg font-bold" duration={5}>
                  <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                    Starry Starry Night
                  </span>
                </BreathingText>
                <span className="text-xs text-amber-400/50">梵星 · 标点符号题库</span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <StatCard label="总题数" value={`${stats.total}题`} icon={BookOpen} color="blue" />
            <StatCard label="单选题" value={`${stats.byType.single}题`} icon={Star} color="violet" />
            <StatCard label="判断题" value={`${stats.byType.judge}题`} icon={CheckCircle} color="emerald" />
            <StatCard label="综合题" value={`${stats.byType.apply}题`} icon={Zap} color="amber" />
          </div>

          {/* Settings */}
          <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Filter size={18} className="text-violet-400" /> 练习设置
            </h2>

            {/* Question types */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 mb-2 block">题型选择</label>
              <div className="flex flex-wrap gap-2">
                {[
                  { key: 'single', label: '单选题', count: stats.byType.single },
                  { key: 'judge', label: '判断题', count: stats.byType.judge },
                  { key: 'fill', label: '填空题', count: stats.byType.fill },
                  { key: 'correct', label: '改错题', count: stats.byType.correct },
                  { key: 'compare', label: '对比题', count: stats.byType.compare },
                  { key: 'apply', label: '应用题', count: stats.byType.apply },
                ].map(t => (
                  <button
                    key={t.key}
                    onClick={() => setSelectedTypes(prev => prev.includes(t.key) ? prev.filter(x => x !== t.key) : [...prev, t.key])}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedTypes.includes(t.key)
                        ? 'bg-violet-600 text-white'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {t.label} ({t.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 mb-2 block">难度选择</label>
              <div className="flex gap-2">
                {[
                  { key: 1, label: '简单', color: 'emerald' },
                  { key: 2, label: '中等', color: 'amber' },
                  { key: 3, label: '困难', color: 'red' },
                ].map(d => (
                  <button
                    key={d.key}
                    onClick={() => setSelectedDifficulties(prev => prev.includes(d.key) ? prev.filter(x => x !== d.key) : [...prev, d.key])}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedDifficulties.includes(d.key)
                        ? `bg-${d.color}-600 text-white`
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Question count */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-slate-300 mb-2 block">题目数量</label>
              <div className="flex gap-2">
                {[5, 10, 15, 20, 30].map(c => (
                  <button
                    key={c}
                    onClick={() => setQuestionCount(c)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      questionCount === c
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-700 text-slate-400 hover:bg-slate-600'
                    }`}
                  >
                    {c}题
                  </button>
                ))}
              </div>
            </div>

            {/* Start button */}
            <button
              onClick={startQuiz}
              disabled={selectedTypes.length === 0 || selectedDifficulties.length === 0}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-violet-500/40 transition-all disabled:opacity-40 active:scale-[0.98]"
            >
              <Zap size={18} className="inline mr-2" /> 开始练习
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz mode
  if (mode === 'quiz' && questions.length > 0) {
    const q = questions[currentIndex];
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.answer;
    const isAnswered = !!userAnswer;
    const diffLabels = { 1: '简单', 2: '中等', 3: '困难' };
    const diffColors = { 1: 'text-emerald-400', 2: 'text-amber-400', 3: 'text-red-400' };
    const typeLabels: Record<string, string> = { single: '单选', judge: '判断', fill: '填空', correct: '改错', compare: '对比', apply: '应用' };

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        {/* Progress bar */}
        <div className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-700">
          <div className="max-w-4xl mx-auto px-4 py-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">{currentIndex + 1} / {questions.length}</span>
              <span className="text-sm text-slate-400">{typeLabels[q.type]} · <span className={diffColors[q.difficulty]}>{diffLabels[q.difficulty]}</span></span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Category tag */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{q.category}</span>
            {q.tags.map(tag => (
              <span key={tag} className="text-xs bg-slate-800 text-slate-500 px-2 py-0.5 rounded">{tag}</span>
            ))}
          </div>

          {/* Question */}
          <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700 mb-4">
            <h2 className="text-lg font-semibold text-white leading-relaxed">{q.question}</h2>
          </div>

          {/* Answer options */}
          {!isAnswered && q.options && (
            <div className="space-y-2 mb-4">
              {q.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(String.fromCharCode(65 + i))}
                  className="w-full text-left p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500 hover:bg-slate-750 transition-all"
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-700 text-slate-300 text-sm font-bold mr-3">{String.fromCharCode(65 + i)}</span>
                  <span className="text-slate-300">{opt}</span>
                </button>
              ))}
            </div>
          )}

          {!isAnswered && q.type === 'judge' && (
            <div className="flex gap-3 mb-4">
              <button onClick={() => handleAnswer('正确')} className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all text-center text-emerald-400 font-semibold">
                <CheckCircle size={20} className="inline mr-2" /> 正确
              </button>
              <button onClick={() => handleAnswer('错误')} className="flex-1 p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-red-500 hover:bg-red-500/10 transition-all text-center text-red-400 font-semibold">
                <XCircle size={20} className="inline mr-2" /> 错误
              </button>
            </div>
          )}

          {!isAnswered && (q.type === 'fill' || q.type === 'correct' || q.type === 'apply') && (
            <div className="mb-4">
              <textarea
                placeholder="输入你的答案..."
                onBlur={e => handleAnswer(e.target.value.trim())}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-violet-500 placeholder-slate-500 resize-none"
                rows={3}
              />
              <button onClick={() => {
                const val = (document.querySelector('textarea') as HTMLTextAreaElement)?.value.trim();
                if (val) handleAnswer(val);
              }} className="mt-2 px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors">
                提交答案
              </button>
            </div>
          )}

          {/* Explanation */}
          {showExplanation && (
            <div className={`p-5 rounded-2xl border mb-4 ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? <CheckCircle className="text-emerald-400" size={20} /> : <XCircle className="text-red-400" size={20} />}
                <span className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                  {isCorrect ? '回答正确！' : '回答错误'}
                </span>
                {!isCorrect && <span className="text-slate-400 text-sm ml-2">正确答案：{q.answer}</span>}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3">
            {currentIndex > 0 && (
              <button onClick={handlePrev} className="px-5 py-2.5 rounded-xl bg-slate-700 text-slate-300 font-semibold hover:bg-slate-600 transition-colors">
                上一题
              </button>
            )}
            {isAnswered && (
              <button onClick={handleNext} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:shadow-violet-500/40 transition-all flex items-center justify-center gap-2">
                {currentIndex < questions.length - 1 ? '下一题' : '查看结果'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Result mode
  if (mode === 'result') {
    const score = getScore();
    const grade = getGrade(score, questions.length);
    const pct = Math.round((score / questions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
        {pct >= 80 && <CelebrationEffect trigger={true} type={pct >= 100 ? 'spell' : 'correct'} />}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="max-w-md w-full p-6 rounded-2xl bg-slate-800 border border-amber-500/20 text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <Trophy className="mx-auto text-amber-400 mb-3" size={48} />
          </motion.div>
          <h2 className="text-2xl font-bold text-white mb-1">练习完成！</h2>

          <div className="my-6">
            <div className="text-5xl font-bold text-white mb-1">{pct}<span className="text-2xl text-slate-500">%</span></div>
            <div className={`text-xl font-bold ${grade.color}`}>{grade.grade} · {grade.label}</div>
            <div className="text-slate-400 text-sm mt-1">答对 {score} / {questions.length} 题</div>
            {quizTime > 0 && (
              <div className="flex items-center justify-center gap-1 text-slate-500 text-sm mt-1">
                <Clock size={12} /> 用时 {Math.floor(quizTime / 60)}分{quizTime % 60}秒
              </div>
            )}
          </div>

          {/* Answer review */}
          <div className="text-left mb-4 max-h-40 overflow-y-auto space-y-1">
            {questions.map((q, i) => {
              const correct = answers[q.id] === q.answer;
              return (
                <div key={q.id} className={`flex items-center gap-2 text-sm px-2 py-1 rounded ${correct ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                  {correct ? <CheckCircle size={12} className="text-emerald-400 shrink-0" /> : <XCircle size={12} className="text-red-400 shrink-0" />}
                  <span className="text-slate-400">{i + 1}.</span>
                  <span className="text-slate-300 truncate">{q.question.substring(0, 30)}...</span>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3">
            <button onClick={() => setMode('menu')} className="flex-1 py-2.5 rounded-xl bg-slate-700 text-slate-300 font-semibold hover:bg-slate-600 transition-colors">
              返回菜单
            </button>
            <button onClick={startQuiz} className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold hover:shadow-violet-500/40 transition-colors flex items-center justify-center gap-1">
              <RefreshCw size={14} /> 再来一次
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return null;
}

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: any; color: string }) {
  return (
    <div className={`p-4 rounded-xl bg-${color}-500/10 border border-${color}-500/20 text-center`}>
      <Icon className={`mx-auto text-${color}-400 mb-1`} size={20} />
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-xs text-slate-400">{label}</div>
    </div>
  );
}
