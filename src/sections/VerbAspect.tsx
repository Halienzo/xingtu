import { useState } from 'react';
import { tenseMatrix, aspectExplanation } from '../data/verbAspectData';
import type { TenseEntry } from '../data/verbAspectData';
import { BookOpen, Grid3X3, Lightbulb, AlertCircle } from 'lucide-react';

interface VerbAspectProps {
  navigate: (s: string, cat?: string) => void;
}

export function VerbAspect({ navigate: _navigate }: VerbAspectProps) {
  const [tab, setTab] = useState<'matrix' | 'aspects' | 'differences'>('matrix');
  const [selectedAspect, setSelectedAspect] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const aspects = ['常态', '进行态', '完成态', '完成进行态', '不定态'];
  const times = ['现在', '过去', '将来'];

  // 获取时态单元格
  const getTenseCell = (aspect: string, time: string): TenseEntry | undefined => {
    return tenseMatrix.find(t => t.aspect === aspect && t.time === time);
  };

  // 获取单元格背景色
  const getCellColor = (aspect: string) => {
    const colors: Record<string, string> = {
      '常态': 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
      '进行态': 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
      '完成态': 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
      '完成进行态': 'from-red-500/20 to-red-600/10 border-red-500/30',
      '不定态': 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
    };
    return colors[aspect] || 'from-slate-500/20 to-slate-600/10 border-slate-500/30';
  };

  const getAspectHeaderColor = (aspect: string) => {
    const colors: Record<string, string> = {
      '常态': 'text-blue-300 bg-blue-500/20',
      '进行态': 'text-emerald-300 bg-emerald-500/20',
      '完成态': 'text-amber-300 bg-amber-500/20',
      '完成进行态': 'text-red-300 bg-red-500/20',
      '不定态': 'text-purple-300 bg-purple-500/20',
    };
    return colors[aspect] || 'text-slate-300 bg-slate-500/20';
  };

  // 例句中亮橙色高亮
  const renderExample = (example: string, highlight: string) => {
    if (!highlight) return <span>{example}</span>;
    const parts = example.split(new RegExp(`(\\*\\*${highlight}\\*\\*)`, 'g'));
    return parts.map((part, i) => {
      const clean = part.replace(/\*\*/g, '');
      if (part.includes(`**${highlight}**`)) {
        return <span key={i} className="text-orange-400 font-extrabold">{clean}</span>;
      }
      return <span key={i}>{clean}</span>;
    });
  };

  // 选中某个时态的详细信息
  const selectedTense = selectedAspect && selectedTime
    ? getTenseCell(selectedAspect, selectedTime)
    : null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* 标题 */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
          动词「态」×「时」矩阵
        </h1>
        <p className="text-slate-400">五态 × 三时 = 16种时态组合 · 不定态详解 · be to do / be to be</p>
      </div>

      {/* 标签切换 */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-slate-800 rounded-xl p-1 border border-slate-700">
          <button
            onClick={() => setTab('matrix')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              tab === 'matrix' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Grid3X3 className="w-4 h-4 inline mr-1" />
            16种时态矩阵
          </button>
          <button
            onClick={() => setTab('aspects')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              tab === 'aspects' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4 inline mr-1" />
            五态详解
          </button>
          <button
            onClick={() => setTab('differences')}
            className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              tab === 'differences' ? 'bg-indigo-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <AlertCircle className="w-4 h-4 inline mr-1" />
            易混辨析
          </button>
        </div>
      </div>

      {/* ===== 16种时态矩阵 ===== */}
      {tab === 'matrix' && (
        <div>
          {/* 矩阵表格 */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-slate-400 text-sm font-bold border border-slate-700 bg-slate-800/80">
                    态 \ 时
                  </th>
                  {times.map(t => (
                    <th key={t} className="p-3 text-center text-slate-300 text-sm font-bold border border-slate-700 bg-slate-800/80">
                      {t}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {aspects.map(aspect => (
                  <tr key={aspect}>
                    {/* 态名称 */}
                    <td className={`p-3 text-center font-extrabold text-sm border border-slate-700 ${getAspectHeaderColor(aspect)}`}>
                      {aspect}
                    </td>
                    {/* 时态单元格 */}
                    {times.map(time => {
                      const tense = getTenseCell(aspect, time);
                      return (
                        <td key={`${aspect}-${time}`} className="p-2 border border-slate-700">
                          {tense ? (
                            <button
                              onClick={() => {
                                setSelectedAspect(aspect);
                              setSelectedTime(time);
                              }}
                              className={`w-full p-3 rounded-xl bg-slate-800 border border-slate-700 hover:border-indigo-400 transition-all text-left ${
                                selectedAspect === aspect && selectedTime === time
                                  ? 'ring-2 ring-indigo-500'
                                  : ''
                              }`}
                            >
                              <p className="text-xs text-slate-400 mb-1">{tense.name}</p>
                              <p className="text-[10px] font-black uppercase tracking-wide text-amber-300/80 mb-1">{tense.englishName}</p>
                              <p className="text-sm font-bold text-white mb-1">{tense.structure}</p>
                              <p className="text-xs text-slate-500 line-clamp-2">
                                {renderExample(tense.example, tense.highlight)}
                              </p>
                            </button>
                          ) : (
                            <div className="w-full h-full min-h-[80px] flex items-center justify-center text-slate-600 text-xs">
                              —
                            </div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 选中时态详情 */}
          {selectedTense && (
            <div className={`bg-slate-800 border border-slate-700 rounded-2xl p-6 bg-gradient-to-r ${getCellColor(selectedTense.aspect)}`}>
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <h3 className="text-2xl font-extrabold text-white">{selectedTense.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getAspectHeaderColor(selectedTense.aspect)}`}>
                  {selectedTense.aspect} × {selectedTense.time}
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-300/10 text-xs font-black uppercase tracking-wide text-amber-200">
                  {selectedTense.englishName}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 主动结构 */}
                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">主动语态</p>
                  <p className="text-lg font-bold text-emerald-300 font-mono">{selectedTense.structure}</p>
                </div>

                {/* 被动结构 */}
                <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-1">被动语态</p>
                  <p className="text-lg font-bold text-purple-300 font-mono">
                    {selectedTense.passive || '—'}
                  </p>
                </div>

                {/* 例句 */}
                <div className="md:col-span-2 bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-xs text-slate-400 mb-2">例句</p>
                  <p className="text-base text-slate-200 italic leading-relaxed">
                    {renderExample(selectedTense.example, selectedTense.highlight)}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    <Lightbulb className="w-3 h-3 inline mr-1" />
                    {selectedTense.useCase}
                  </p>
                </div>

                <div className="md:col-span-2 rounded-xl border border-rose-300/20 bg-rose-300/10 p-4">
                  <p className="text-xs font-black tracking-[0.16em] text-rose-200">被看见的语法</p>
                  <p className="mt-2 text-sm leading-relaxed text-rose-50/90">{selectedTense.warmExplanation}</p>
                </div>
              </div>

              {/* be to be 特别说明 */}
              {selectedTense.structure.includes('to be') && (
                <div className="mt-4 p-4 rounded-xl border border-orange-500/30 bg-orange-500/10">
                  <p className="text-orange-300 font-bold text-sm mb-1">
                    <AlertCircle className="w-4 h-4 inline mr-1" />
                    不定态被动 be to be done 详解
                  </p>
                  <p className="text-slate-300 text-sm">
                    be to be done 是「不定态」的被动形式，表示"按计划要被……"。
                    注意区分：be to be done（按计划被动） vs be going to be done（口语中将要被动）。
                    例：A new school <span className="text-orange-400 font-bold">is to be built</span> here.
                  </p>
                </div>
              )}
            </div>
          )}

          {!selectedTense && (
            <div className="text-center py-12 text-slate-500">
              <p className="text-4xl mb-4">🎯</p>
              <p>点击上方矩阵中的任意单元格查看详细解析</p>
            </div>
          )}
        </div>
      )}

      {/* ===== 五态详解 ===== */}
      {tab === 'aspects' && (
        <div className="space-y-6">
          {aspectExplanation.aspects.map((aspect, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-700 p-6"
              style={{ background: `linear-gradient(135deg, ${aspect.color}15, ${aspect.color}08)` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: aspect.color }}
                />
                <h3 className="text-2xl font-extrabold" style={{ color: aspect.color }}>
                  {aspect.name}
                </h3>
              </div>

              <p className="text-slate-300 mb-4 leading-relaxed">{aspect.description}</p>

              {/* 特征标签 */}
              <div className="flex flex-wrap gap-2 mb-4">
                {aspect.features.map((f, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-bold"
                    style={{ backgroundColor: `${aspect.color}25`, color: aspect.color, border: `1px solid ${aspect.color}40` }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* 例句 */}
              <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50 space-y-2">
                <p className="text-xs text-slate-400">典型例句：</p>
                {aspect.examples.map((ex, i) => (
                  <p key={i} className="text-slate-300 text-sm font-mono">
                    • {ex}
                  </p>
                ))}
              </div>

              {/* beToBeNote 特别说明 */}
              {(aspect as { beToBeNote?: string }).beToBeNote && (
                <div className="mt-4 p-4 rounded-xl border border-orange-500/30 bg-orange-500/10">
                  <p className="text-orange-300 text-sm font-bold mb-1">不定态特别说明</p>
                  <p className="text-slate-300 text-sm">{(aspect as { beToBeNote?: string }).beToBeNote}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ===== 易混辨析 ===== */}
      {tab === 'differences' && (
        <div className="space-y-4">
          {aspectExplanation.keyDifference.map((item, idx) => (
            <div key={idx} className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-sm font-bold">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-white">{item.compare}</h3>
              </div>
              <div className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                <p className="text-amber-300 text-sm font-bold mb-1">区别</p>
                <p className="text-slate-300 text-sm leading-relaxed">{item.diff}</p>
              </div>
            </div>
          ))}

          {/* 补充说明 */}
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">不定态 be to do 使用场景总结</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { scene: '正式计划/安排', example: 'The meeting is to be held tomorrow.' },
                { scene: '命令/职责', example: 'You are to finish this by 5 PM.' },
                { scene: '命中注定', example: 'They were never to meet again.' },
                { scene: '过去原定(未实现)', example: 'I was to start at 9, but the bus was late.' },
                { scene: '公告/新闻', example: 'The president is to visit China.' },
                { scene: '规则/规定', example: 'All students are to wear uniforms.' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-900/60 rounded-xl p-4 border border-slate-700/50">
                  <p className="text-orange-300 font-bold text-sm mb-1">{item.scene}</p>
                  <p className="text-slate-400 text-sm font-mono">{item.example}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30">
              <p className="text-red-300 text-sm font-bold">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                注意：不定态本身已包含将来含义，因此不设计 "will be to do" 的形式。这是常见的错误表达！
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
