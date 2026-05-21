import { useState } from 'react';
import { quantifierQuestions, quantifierKnowledge } from '../data/quantifierData';
import { CheckCircle, XCircle, Lightbulb, AlertTriangle } from 'lucide-react';

interface QuantifierSectionProps {
  navigate: (s: string, cat?: string) => void;
}

export function QuantifierSection({ navigate: _navigate }: QuantifierSectionProps) {
  const [tab, setTab] = useState<'study' | 'practice'>('study');
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [, setShowExplanation] = useState(false);

  const question = quantifierQuestions[currentQ];
  const totalQuestions = quantifierQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = Object.entries(userAnswers).filter(([id, ans]) => {
    const q = quantifierQuestions.find(q => q.id === Number(id));
    return q && q.correct === ans;
  }).length;

  const handleOptionClick = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
    setUserAnswers(prev => ({ ...prev, [question.id]: idx }));
  };

  const handleNext = () => {
    if (currentQ < totalQuestions - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
      setShowExplanation(false);
    }
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
      setSelectedOption(null);
      setShowResult(false);
      setShowExplanation(false);
    }
  };

  const handleJump = (idx: number) => {
    setCurrentQ(idx);
    setSelectedOption(null);
    setShowResult(false);
    setShowExplanation(false);
  };

  const getOptionStyle = (idx: number) => {
    if (!showResult) {
      return 'bg-slate-800 border-slate-700 hover:border-indigo-500 hover:bg-slate-750';
    }
    if (idx === question.correct) {
      return 'bg-emerald-500/20 border-emerald-500';
    }
    if (idx === selectedOption && idx !== question.correct) {
      return 'bg-red-500/20 border-red-500';
    }
    return 'bg-slate-800 border-slate-700 opacity-50';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          量词与集合名词系统
        </h1>
        <p className="text-slate-400">量词搭配 · 主谓一致 · 集合名词 · 35道专项训练</p>
      </div>

      {/* 标签切换 */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
          <button
            onClick={() => setTab('study')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              tab === 'study' ? 'bg-amber-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            📚 知识学习
          </button>
          <button
            onClick={() => setTab('practice')}
            className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
              tab === 'practice' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            ✏️ 专项训练
          </button>
        </div>
      </div>

      {/* ===== 知识学习标签 ===== */}
      {tab === 'study' && (
        <div className="space-y-6">
          {/* 八大分类 */}
          {quantifierKnowledge.sections.map((section, idx) => (
            <div key={idx} className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                {section.title}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map((item, i) => (
                  <div key={i} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                    <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* 集合名词主谓一致速查表 */}
          <div className="bg-slate-800/60 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold text-rose-300 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              集合名词主谓一致速查表
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left py-3 px-4 text-slate-300">集合名词</th>
                    <th className="text-left py-3 px-4 text-slate-300">含义</th>
                    <th className="text-left py-3 px-4 text-slate-300">谓语单/复</th>
                    <th className="text-left py-3 px-4 text-slate-300">示例</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { noun: 'family', meaning: '家庭', verb: '单/复皆可', example: 'My family is/are...' },
                    { noun: 'team', meaning: '队', verb: '单/复皆可', example: 'The team is/are...' },
                    { noun: 'class', meaning: '班级', verb: '单/复皆可', example: 'The class is/are...' },
                    { noun: 'audience', meaning: '观众', verb: '单/复皆可', example: 'The audience is/are...' },
                    { noun: 'government', meaning: '政府', verb: '单/复皆可', example: 'The government is/are...' },
                    { noun: 'police', meaning: '警察', verb: '永远复数', example: 'The police are...' },
                    { noun: 'people', meaning: '人们', verb: '永远复数', example: 'People are...' },
                    { noun: 'cattle', meaning: '牛群', verb: '永远复数', example: 'Cattle are...' },
                    { noun: 'clothes', meaning: '衣服', verb: '永远复数', example: 'Clothes are...' },
                    { noun: 'scissors', meaning: '剪刀', verb: '永远复数', example: 'The scissors are...' },
                    { noun: 'glasses', meaning: '眼镜', verb: '永远复数', example: 'My glasses are...' },
                    { noun: 'shoes', meaning: '鞋（a pair of）', verb: '看pair', example: 'A pair of shoes is...' },
                    { noun: 'trousers', meaning: '裤子（a pair of）', verb: '看pair', example: 'Two pairs of trousers are...' },
                    { noun: 'a group of', meaning: '一群', verb: '单/复皆可', example: 'A group is/are...' },
                    { noun: 'a number of', meaning: '许多', verb: '永远复数', example: 'A number of students are...' },
                    { noun: 'the number of', meaning: '...的数量', verb: '永远单数', example: 'The number of books is...' },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-sky-300">{row.noun}</td>
                      <td className="py-3 px-4 text-slate-400">{row.meaning}</td>
                      <td className="py-3 px-4">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          row.verb === '永远复数' ? 'bg-rose-500/20 text-rose-300' :
                          row.verb === '永远单数' ? 'bg-emerald-500/20 text-emerald-300' :
                          'bg-amber-500/20 text-amber-300'
                        }`}>
                          {row.verb}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-500 font-mono text-xs">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===== 专项训练标签 ===== */}
      {tab === 'practice' && (
        <div>
          {/* 进度条 */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-4 mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-slate-400">进度: {answeredCount}/{totalQuestions}</span>
              <span className="text-sm text-emerald-400">正确: {correctCount}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* 题号快速导航 */}
          <div className="flex flex-wrap gap-1.5 justify-center mb-6">
            {quantifierQuestions.map((q, idx) => {
              const userAns = userAnswers[q.id];
              const isCorrect = userAns === q.correct;
              return (
                <button
                  key={q.id}
                  onClick={() => handleJump(idx)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all border ${
                    currentQ === idx
                      ? 'bg-indigo-500 border-indigo-400 text-white'
                      : userAns !== undefined
                        ? isCorrect
                          ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                          : 'bg-red-500/20 border-red-500/50 text-red-400'
                        : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* 题目卡片 */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 md:p-8">
            {/* 题头信息 */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                {question.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-700 text-slate-300 text-xs">
                {question.type}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                question.difficulty <= 3 ? 'bg-emerald-500/20 text-emerald-300' :
                question.difficulty <= 4 ? 'bg-amber-500/20 text-amber-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {'★'.repeat(question.difficulty)}
              </span>
            </div>

            {/* 题目 */}
            <h3 className="text-lg md:text-xl font-bold text-white mb-6 whitespace-pre-line">
              {currentQ + 1}. {question.question}
            </h3>

            {/* 选项 */}
            <div className="space-y-3">
              {question.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={showResult}
                  className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all font-medium ${getOptionStyle(idx)}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${
                      showResult && idx === question.correct
                        ? 'bg-emerald-500 text-white'
                        : showResult && idx === selectedOption && idx !== question.correct
                          ? 'bg-red-500 text-white'
                          : 'bg-slate-700 text-slate-300'
                    }`}>
                      {showResult && idx === question.correct ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : showResult && idx === selectedOption && idx !== question.correct ? (
                        <XCircle className="w-5 h-5" />
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </span>
                    <span className="text-slate-200">{opt}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* 解析 */}
            {showResult && (
              <div className="mt-6 space-y-4">
                <div className={`p-4 rounded-xl border ${
                  selectedOption === question.correct
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <p className={`font-bold mb-2 ${
                    selectedOption === question.correct ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {selectedOption === question.correct ? '✓ 回答正确!' : '✗ 回答错误'}
                  </p>
                  <p className="text-slate-300 text-sm leading-relaxed">{question.explanation}</p>
                </div>

                {/* 陷阱提示 */}
                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/10">
                  <p className="text-amber-300 font-bold text-sm mb-1 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    易错陷阱
                  </p>
                  <p className="text-slate-400 text-sm">{question.trap}</p>
                </div>
              </div>
            )}

            {/* 导航按钮 */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrev}
                disabled={currentQ === 0}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  currentQ === 0
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                }`}
              >
                ← 上一题
              </button>
              <span className="text-slate-400 text-sm self-center">
                {currentQ + 1} / {totalQuestions}
              </span>
              <button
                onClick={handleNext}
                disabled={currentQ === totalQuestions - 1}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${
                  currentQ === totalQuestions - 1
                    ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600'
                }`}
              >
                下一题 →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
