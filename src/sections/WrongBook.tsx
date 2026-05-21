import { useMemo } from 'react';
import type { AppState } from '../App';
import type { Question } from '../data/questions';
import { categories } from '../data/questions';
import { QuestionCard } from '../components/QuestionCard';
import { BookOpen } from 'lucide-react';

interface WrongBookProps {
  questions: Question[];
  state: AppState;
  onAnswer: (questionId: number, selectedOption: number, isCorrect: boolean) => void;
  onFavorite: (questionId: number) => void;
}

export function WrongBook({ questions, state, onAnswer, onFavorite }: WrongBookProps) {
  const wrongAnswers = useMemo(() => {
    return Object.values(state.userAnswers)
      .filter(a => !a.isCorrect)
      .sort((a, b) => b.timestamp - a.timestamp);
  }, [state.userAnswers]);

  const wrongQuestions = useMemo(() => {
    const wrongIds = new Set(wrongAnswers.map(a => a.questionId));
    return questions.filter(q => wrongIds.has(q.id));
  }, [wrongAnswers, questions]);

  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; wrong: number }> = {};
    wrongQuestions.forEach(q => {
      if (!stats[q.category]) stats[q.category] = { total: 0, wrong: 0 };
      stats[q.category].total++;
      stats[q.category].wrong++;
    });
    return stats;
  }, [wrongQuestions]);

  if (wrongQuestions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-6 md:py-10 text-center">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-10 md:p-16">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-slate-600" />
          <h2 className="text-xl font-bold mb-2">暂无错题</h2>
          <p className="text-slate-400 mb-6">你还没有答错过任何题目，开始练习吧！</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">错题本</h1>
        <p className="text-slate-400">共 {wrongQuestions.length} 道错题，逐一攻克</p>
      </div>

      {/* Category Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-6">
        {Object.entries(categoryStats).map(([cat, stat]) => (
          <div key={cat} className="bg-white/5 border border-white/10 rounded-xl p-3">
            <p className="text-slate-400 text-xs">{categories[cat] || cat}</p>
            <p className="text-red-400 font-bold text-lg">{stat.wrong} <span className="text-slate-500 text-sm">题</span></p>
          </div>
        ))}
      </div>

      {/* Wrong Questions */}
      <div>
        {wrongQuestions.map(q => (
          <QuestionCard
            key={q.id}
            question={q}
            userAnswer={state.userAnswers[q.id]}
            onAnswer={onAnswer}
            onFavorite={onFavorite}
            isFavorite={state.favorites.includes(q.id)}
            showAnswer
          />
        ))}
      </div>
    </div>
  );
}
