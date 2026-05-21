import type { AppState, Section } from '../App';
import type { Question } from '../data/questions';
import { categories, categoryIcons, categoryDescriptions, categoryColors } from '../data/questions';
import { Zap, Target, TrendingUp, Award, BookOpen } from 'lucide-react';

interface HomeProps {
  navigate: (section: Section, cat?: string) => void;
  state: AppState;
  questions: Question[];
  navigateKnowledge?: (tab: string) => void;
}

export function Home({ navigate, state, questions }: HomeProps) {
  const totalAnswered = Object.keys(state.userAnswers).length;
  const correctCount = Object.values(state.userAnswers).filter(a => a.isCorrect).length;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;
  const wrongCount = totalAnswered - correctCount;

  const _recentWrong = Object.values(state.userAnswers)
    .filter(a => !a.isCorrect)
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 5);
  void _recentWrong;

  const categoryStats = Object.entries(categories).map(([key, label]) => {
    const catQuestions = questions.filter(q => q.category === key);
    const answered = catQuestions.filter(q => state.userAnswers[q.id]);
    const correct = answered.filter(q => state.userAnswers[q.id]?.isCorrect);
    return {
      key,
      label,
      icon: categoryIcons[key],
      desc: categoryDescriptions[key],
      color: categoryColors[key],
      total: catQuestions.length,
      answered: answered.length,
      correct: correct.length,
      accuracy: answered.length > 0 ? Math.round((correct.length / answered.length) * 100) : 0,
    };
  }).filter(c => c.total > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 md:py-10">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 md:p-10 mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4" />
        <div className="relative">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                梵星
              </h1>
              <p className="text-slate-400 text-sm md:text-base">云南中考 & 小升初英语语法通关</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
            350+精选真题与模拟题，覆盖名词、冠词、代词、动词、形容词、副词、介词、连词、句子等全部语法知识点。每题配有详细解析和陷阱分析，助你攻克中考英语语法难关。
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate('practice')}
              className="px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              开始练习
            </button>
            <button
              onClick={() => navigate('exam')}
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-2"
            >
              <Target className="w-4 h-4" />
              模拟考试
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
        {[
          { label: '总题数', value: questions.length, icon: BookOpen, color: 'blue' },
          { label: '已答题', value: totalAnswered, icon: TrendingUp, color: 'green' },
          { label: '正确率', value: `${accuracy}%`, icon: Award, color: 'amber' },
          { label: '学习天数', value: state.studyDays, icon: Target, color: 'purple' },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
              </div>
              <span className="text-slate-400 text-sm">{stat.label}</span>
            </div>
            <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
            {stat.label === '正确率' && totalAnswered > 0 && (
              <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${accuracy >= 80 ? 'bg-green-400' : accuracy >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                  style={{ width: `${accuracy}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-8">
        {[
          { title: '继续练习', desc: '从上次中断的地方继续', action: () => navigate('practice'), color: 'blue', icon: '▶️' },
          { title: '错题复习', desc: `${wrongCount}道错题待复习`, action: () => navigate('wrong'), color: 'red', icon: '❌' },
          { title: '语法知识库', desc: '系统学习语法知识点', action: () => navigate('knowledge'), color: 'purple', icon: '📖' },
        ].map((item, i) => (
          <button
            key={i}
            onClick={item.action}
            className={`text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-${item.color}-400/50 hover:bg-${item.color}-500/5 transition-all group`}
          >
            <span className="text-2xl mb-2 block">{item.icon}</span>
            <h3 className="text-white font-semibold mb-1">{item.title}</h3>
            <p className="text-slate-400 text-sm">{item.desc}</p>
          </button>
        ))}
      </div>

      {/* Categories */}
      <h2 className="text-xl md:text-2xl font-bold mb-4">语法分类练习</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-8">
        {categoryStats.map(cat => (
          <button
            key={cat.key}
            onClick={() => navigate('practice', cat.key)}
            className="text-left p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/30 hover:bg-white/10 transition-all group"
          >
            <div className="flex items-start justify-between mb-3">
              <span className="text-3xl">{cat.icon}</span>
              <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded-lg">{cat.total}题</span>
            </div>
            <h3 className="text-white font-semibold mb-1">{cat.label}</h3>
            <p className="text-slate-400 text-xs mb-3">{cat.desc}</p>
            {cat.answered > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${cat.accuracy >= 80 ? 'bg-green-400' : cat.accuracy >= 60 ? 'bg-amber-400' : 'bg-red-400'}`}
                    style={{ width: `${cat.accuracy}%` }}
                  />
                </div>
                <span className="text-xs text-slate-400">{cat.accuracy}%</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* High Frequency Traps */}
      <h2 className="text-xl md:text-2xl font-bold mb-4">高频陷阱速览</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-8">
        {[
          { title: 'European 前面用 a 不用 an', desc: '看发音不看字母！European 以 /j/ 开头', category: '冠词' },
          { title: 'although 和 but 不能同时使用', desc: '两者只能保留一个！', category: '连词' },
          { title: 'used to do vs be used to doing', desc: '前者是"过去常常"，后者是"习惯于"', category: '动词' },
          { title: 'hard vs hardly 完全不同', desc: 'hard=努力地，hardly=几乎不', category: '副词' },
          { title: '-ing 形容词修饰物，-ed 修饰人', desc: 'interesting 修饰物，interested 修饰人', category: '形容词' },
          { title: '宾语从句必须用陈述语序', desc: 'Can you tell me where he lives?', category: '连词' },
          { title: 'the + 姓氏复数 = 一家人', desc: 'The Greens = the Green family', category: '冠词' },
          { title: 'many a + 单数名词 + 单数谓语', desc: 'many a student has...', category: '限定词' },
        ].map((trap, i) => (
          <div key={i} className="bg-red-500/5 border border-red-500/20 rounded-2xl p-4">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-lg shrink-0">⚠️</span>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">{trap.title}</h3>
                <p className="text-slate-400 text-xs">{trap.desc}</p>
                <span className="inline-block mt-2 px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-xs">{trap.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
