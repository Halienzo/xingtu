import { useState } from 'react';
import type { Question } from '../data/questions';
import type { UserAnswer } from '../App';
import { Heart, BookOpen, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  userAnswer?: UserAnswer;
  onAnswer: (questionId: number, selectedOption: number, isCorrect: boolean) => void;
  onFavorite: (questionId: number) => void;
  isFavorite: boolean;
  showAnswer?: boolean;
  index?: number;
}

export function QuestionCard({ question, userAnswer, onAnswer, onFavorite, isFavorite, showAnswer: showAnswerProp = false, index }: QuestionCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(userAnswer?.selectedOption ?? null);
  const [showAnswer, setShowAnswer] = useState(showAnswerProp || !!userAnswer);
  const [isSubmitted, setIsSubmitted] = useState(!!userAnswer);

  const letters = ['A', 'B', 'C', 'D'];
  const isAnswered = isSubmitted || !!userAnswer;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null || isAnswered) return;
    const isCorrect = selectedOption === question.correct;
    onAnswer(question.id, selectedOption, isCorrect);
    setIsSubmitted(true);
    setShowAnswer(true);
  };

  const getOptionClass = (idx: number) => {
    const base = "w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-300 flex items-start gap-3";
    
    if (!isAnswered) {
      if (selectedOption === idx) {
        return `${base} border-blue-400 bg-blue-400/20 text-white`;
      }
      return `${base} border-white/10 bg-white/5 text-slate-300 hover:border-white/30 hover:bg-white/10`;
    }

    if (idx === question.correct) {
      return `${base} border-green-400 bg-green-400/20 text-white`;
    }
    if (selectedOption === idx && idx !== question.correct) {
      return `${base} border-red-400 bg-red-400/20 text-white`;
    }
    return `${base} border-white/5 bg-white/3 text-slate-500`;
  };

  const difficultyStars = Array.from({ length: 5 }, (_, i) => i < question.difficulty);

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-6 mb-4">
      <div className="flex items-start justify-between mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {index !== undefined && (
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-bold">
              {index + 1}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs font-medium">
            {question.subcategory}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 text-xs font-medium">
            {question.type}
          </span>
          {question.isReal && (
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-medium flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              {question.year} {question.exam}
            </span>
          )}
        </div>
        <button
          onClick={() => onFavorite(question.id)}
          className={`p-2 rounded-xl transition-all ${isFavorite ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-slate-400 hover:text-red-400'}`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <div className="flex items-center gap-2 mb-3">
        {difficultyStars.map((filled, i) => (
          <svg key={i} className={`w-4 h-4 ${filled ? 'text-amber-400' : 'text-slate-600'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <p className="text-white text-base md:text-lg leading-relaxed mb-5 whitespace-pre-line">{question.question}</p>

      {question.options.length > 1 ? (
        <div className="flex flex-col gap-2.5 mb-5">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={getOptionClass(idx)}
              disabled={isAnswered}
            >
              <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold shrink-0 ${
                isAnswered && idx === question.correct
                  ? 'bg-green-500 text-white'
                  : isAnswered && idx === selectedOption && idx !== question.correct
                  ? 'bg-red-500 text-white'
                  : selectedOption === idx
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-slate-400'
              }`}>
                {letters[idx]}
              </span>
              <span className="text-sm md:text-base">{opt}</span>
              {isAnswered && idx === question.correct && <CheckCircle className="w-5 h-5 text-green-400 ml-auto shrink-0" />}
              {isAnswered && idx === selectedOption && idx !== question.correct && <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-5">
          <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm">
            填空答案：{question.options[0]}
          </div>
        </div>
      )}

      {!isAnswered && selectedOption !== null && (
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all duration-300 mb-4"
        >
          提交答案
        </button>
      )}

      {showAnswer && (
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3 mb-3">
            <CheckCircle className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-green-400 font-semibold mb-1">正确答案：{letters[question.correct]}</p>
              <p className="text-slate-300 text-sm leading-relaxed">{question.explanation}</p>
            </div>
          </div>
          {question.trap && (
            <div className="mt-3 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-400 font-medium text-sm mb-0.5">陷阱分析</p>
                  <p className="text-slate-400 text-sm">{question.trap}</p>
                </div>
              </div>
            </div>
          )}
          {question.knowledge && (
            <div className="mt-3 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-blue-400 font-medium text-sm mb-0.5">知识点</p>
                <p className="text-slate-400 text-sm">{question.knowledge}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
