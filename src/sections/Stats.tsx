import { useMemo } from 'react';
import type { AppState } from '../App';
import type { Question } from '../data/questions';
import { categories, categoryIcons } from '../data/questions';
import { TrendingUp, Award, Clock, Target, CheckCircle, XCircle, Zap, BookOpen } from 'lucide-react';

interface StatsProps {
  questions: Question[];
  state: AppState;
}

export function Stats({ questions, state }: StatsProps) {
  const totalAnswered = Object.keys(state.userAnswers).length;
  const correctCount = Object.values(state.userAnswers).filter(a => a.isCorrect).length;
  const wrongCount = totalAnswered - correctCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  const recentActivity = useMemo(() => {
    return Object.values(state.userAnswers)
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 20);
  }, [state.userAnswers]);

  const categoryStats = useMemo(() => {
    return Object.entries(categories).map(([key, label]) => {
      const catQuestions = questions.filter(q => q.category === key);
      const answered = catQuestions.filter(q => state.userAnswers[q.id]);
      const correct = answered.filter(q => state.userAnswers[q.id]?.isCorrect);
      return {
        key,
        label,
        icon: categoryIcons[key],
        total: catQuestions.length,
        answered: answered.length,
        correct: correct.length,
        accuracy: answered.length > 0 ? Math.round((correct.length / answered.length) * 100) : 0,
      };
    }).filter(c => c.total > 0);
  }, [questions, state.userAnswers]);

  const difficultyStats = useMemo(() => {
    const stats: Record<number, { total: number; answered: number; correct: number }> = {};
    questions.forEach(q => {
      if (!stats[q.difficulty]) stats[q.difficulty] = { total: 0, answered: 0, correct: 0 };
      stats[q.difficulty].total++;
      if (state.userAnswers[q.id]) {
        stats[q.difficulty].answered++;
        if (state.userAnswers[q.id].isCorrect) stats[q.difficulty].correct++;
      }
    });
    return stats;
  }, [questions, state.userAnswers]);

  const todayAnswered = useMemo(() => {
    const today = new Date().toDateString();
    return Object.values(state.userAnswers).filter(a => new Date(a.timestamp).toDateString() === today).length;
  }, [state.userAnswers]);

  const streak = useMemo(() => {
    let days = 0;
    const now = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      const hasActivity = Object.values(state.userAnswers).some(a => new Date(a.timestamp).toDateString() === dateStr);
      if (hasActivity) days++;
      else break;
    }
    return days;
  }, [state.userAnswers]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">学习统计</h1>
        <p className="text-slate-400">追踪你的学习进度和正确率</p>
      </div>

      {/* Top Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        {[
          { label: '总题数', value: questions.length, icon: BookOpen, color: 'blue' },
          { label: '已答题', value: totalAnswered, icon: TrendingUp, color: 'green' },
          { label: '正确率', value: `${accuracy}%`, icon: Award, color: 'amber' },
          { label: '今日答题', value: todayAnswered, icon: Zap, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <span className="text-slate-400 text-sm">{stat.label}</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        <div className="bg-green-500/5 border border-green-500/20 rounded-2xl p-5 flex items-center gap-4">
          <CheckCircle className="w-10 h-10 text-green-400" />
          <div>
            <p className="text-2xl font-bold text-green-400">{correctCount}</p>
            <p className="text-green-400/60 text-sm">正确题数</p>
          </div>
        </div>
        <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5 flex items-center gap-4">
          <XCircle className="w-10 h-10 text-red-400" />
          <div>
            <p className="text-2xl font-bold text-red-400">{wrongCount}</p>
            <p className="text-red-400/60 text-sm">错误题数</p>
          </div>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 flex items-center gap-4">
          <Target className="w-10 h-10 text-blue-400" />
          <div>
            <p className="text-2xl font-bold text-blue-400">{streak}</p>
            <p className="text-blue-400/60 text-sm">连续学习天数</p>
          </div>
        </div>
      </div>

      {/* Accuracy Bar */}
      {totalAnswered > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-8">
          <h3 className="text-white font-semibold mb-4">总体正确率</h3>
          <div className="h-4 bg-white/10 rounded-full overflow-hidden mb-2">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${accuracy >= 80 ? 'bg-green-400' : accuracy >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
              style={{ width: `${accuracy}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">0%</span>
            <span className={`font-bold ${accuracy >= 80 ? 'text-green-400' : accuracy >= 60 ? 'text-amber-400' : 'text-red-400'}`}>{accuracy}%</span>
            <span className="text-slate-400">100%</span>
          </div>
        </div>
      )}

      {/* Category Stats */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          各分类正确率
        </h3>
        <div className="space-y-3">
          {categoryStats.map(cat => (
            <div key={cat.key} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span>{cat.icon}</span>
                  <span className="text-white font-medium">{cat.label}</span>
                  <span className="text-slate-500 text-sm">{cat.answered}/{cat.total}题</span>
                </div>
                <span className={`font-bold ${cat.accuracy >= 80 ? 'text-green-400' : cat.accuracy >= 60 ? 'text-amber-400' : 'text-red-400'}`}>
                  {cat.answered > 0 ? `${cat.accuracy}%` : '-'}
                </span>
              </div>
              {cat.answered > 0 && (
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.accuracy >= 80 ? 'bg-green-400' : cat.accuracy >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                    style={{ width: `${cat.accuracy}%` }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Stats */}
      <div className="mb-8">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          各难度正确率
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {[1, 2, 3, 4, 5].map(level => {
            const stat = difficultyStats[level];
            const accuracy = stat?.answered > 0 ? Math.round((stat.correct / stat.answered) * 100) : 0;
            return (
              <div key={level} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="flex justify-center mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg key={i} className={`w-4 h-4 ${i < level ? 'text-amber-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-lg font-bold text-white">{stat?.answered > 0 ? `${accuracy}%` : '-'}</p>
                <p className="text-xs text-slate-400">{stat?.answered || 0}题</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            最近答题记录
          </h3>
          <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            {recentActivity.map((a, i) => {
              const q = questions.find(q => q.id === a.questionId);
              if (!q) return null;
              return (
                <div key={i} className={`flex items-center justify-between px-4 py-3 ${i < recentActivity.length - 1 ? 'border-b border-white/5' : ''}`}>
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${a.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                      {a.isCorrect ? <CheckCircle className="w-4 h-4 text-green-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-white text-sm truncate">{q.subcategory} - {q.question.substring(0, 30)}...</p>
                      <p className="text-slate-500 text-xs">{categories[q.category]} | {q.type}</p>
                    </div>
                  </div>
                  <span className="text-slate-500 text-xs shrink-0 ml-2">
                    {new Date(a.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
