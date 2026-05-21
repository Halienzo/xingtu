import { useEffect, useMemo, useState } from 'react';
import type { AppState, Section } from '../App';
import type { Question } from '../data/questions';
import { categories, categoryIcons } from '../data/questions';
import { QuestionCard } from '../components/QuestionCard';
import { Search, Filter, RotateCcw } from 'lucide-react';

interface PracticeProps {
  navigate: (section: Section, cat?: string) => void;
  questions: Question[];
  state: AppState;
  onAnswer: (questionId: number, selectedOption: number, isCorrect: boolean) => void;
  onFavorite: (questionId: number) => void;
  initialCategory: string | null;
}

export function Practice({ questions, state, onAnswer, onFavorite, initialCategory }: PracticeProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'id' | 'difficulty' | 'random'>('id');

  const filteredQuestions = useMemo(() => {
    let result = [...questions];

    if (selectedCategory !== 'all') {
      result = result.filter(q => q.category === selectedCategory);
    }

    if (selectedType !== 'all') {
      result = result.filter(q => q.type === selectedType);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(q =>
        String(q.id) === query ||
        q.question.toLowerCase().includes(query) ||
        q.subcategory.toLowerCase().includes(query) ||
        q.explanation.toLowerCase().includes(query) ||
        (q.trap && q.trap.toLowerCase().includes(query))
      );
    }

    if (sortBy === 'difficulty') {
      result.sort((a, b) => a.difficulty - b.difficulty);
    } else if (sortBy === 'random') {
      result.sort(() => Math.random() - 0.5);
    }

    return result;
  }, [questions, selectedCategory, selectedType, searchQuery, sortBy]);

  const types = ['all', ...Array.from(new Set(questions.map(q => q.type)))];

  const answeredCount = filteredQuestions.filter(q => state.userAnswers[q.id]).length;
  const correctCount = filteredQuestions.filter(q => state.userAnswers[q.id]?.isCorrect).length;

  useEffect(() => {
    const applyQuestionFocus = () => {
      const raw = sessionStorage.getItem('xsc_question_focus');
      if (!raw) return;
      try {
        const focus = JSON.parse(raw) as { questionId?: number };
        const question = questions.find(q => q.id === focus.questionId);
        if (!question) return;
        setSelectedCategory(question.category);
        setSearchQuery(String(question.id));
        window.setTimeout(() => {
          document.getElementById(`question-${question.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 120);
      } catch {
        // Ignore stale focus payloads from older builds.
      } finally {
        sessionStorage.removeItem('xsc_question_focus');
      }
    };

    applyQuestionFocus();
    window.addEventListener('xsc_question_focus_change', applyQuestionFocus);
    return () => window.removeEventListener('xsc_question_focus_change', applyQuestionFocus);
  }, [questions]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 md:py-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">题库练习</h1>
        <p className="text-slate-400">共 {filteredQuestions.length} 题 | 已答 {answeredCount} 题 | 正确 {correctCount} 题</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="搜索题目、知识点..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400 focus:border-blue-400 focus:outline-none transition-all"
        />
      </div>

      {/* Category Filter */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-sm text-slate-400">分类筛选</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${selectedCategory === 'all' ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
          >
            全部
          </button>
          {Object.entries(categories).map(([key, label]) => {
            const count = questions.filter(q => q.category === key).length;
            if (count === 0) return null;
            return (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${selectedCategory === key ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
              >
                <span>{categoryIcons[key]}</span>
                {label}
                <span className="text-xs opacity-60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Type Filter & Sort */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-400"
        >
          <option value="all">全部题型</option>
          {types.filter(t => t !== 'all').map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'id' | 'difficulty' | 'random')}
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-400"
        >
          <option value="id">按题号</option>
          <option value="difficulty">按难度</option>
          <option value="random">随机排序</option>
        </select>
        <button
          onClick={() => { setSelectedCategory('all'); setSelectedType('all'); setSearchQuery(''); setSortBy('id'); }}
          className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-sm hover:bg-white/10 transition-all flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          重置
        </button>
      </div>

      {/* Questions */}
      <div>
        {filteredQuestions.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">没有找到符合条件的题目</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedType('all'); setSearchQuery(''); }}
              className="mt-4 px-4 py-2 rounded-xl bg-blue-500 text-white text-sm"
            >
              显示全部
            </button>
          </div>
        ) : (
          filteredQuestions.map((q, i) => (
            <div key={q.id} id={`question-${q.id}`}>
              <QuestionCard
                question={q}
                userAnswer={state.userAnswers[q.id]}
                onAnswer={onAnswer}
                onFavorite={onFavorite}
                isFavorite={state.favorites.includes(q.id)}
                index={i}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
