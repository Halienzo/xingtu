// ============================================
// 词性工坊 - PartOfSpeechLab (PosLab)
// 词性认知与输出训练工作台
// ============================================
import { useState, useEffect } from 'react';
import { Map, IdCard, Factory, Search, PenTool, BookOpen, Flame, AlertTriangle, Target, FileText, RotateCcw } from 'lucide-react';
import { getPosStats, getMistakes, markReviewed, clearPosMistakes } from '../lib/posMistakeStore';
import { PosMap } from './pos/PosMap';
import { WordIdentityCard } from './pos/WordIdentityCard';
import { PosDetective } from './pos/PosDetective';
import { PosOutputLab } from './pos/PosOutputLab';
import { SentenceFactory } from './pos/SentenceFactory';

type PosTab = 'map' | 'identity' | 'factory' | 'detective' | 'output' | 'review';

interface NavItem {
  id: PosTab;
  label: string;
  icon: React.ReactNode;
  desc: string;
}

const navItems: NavItem[] = [
  { id: 'map', label: '词性地图', icon: <Map className="w-4 h-4" />, desc: '句子岗位与词性映射' },
  { id: 'identity', label: '单词身份卡', icon: <IdCard className="w-4 h-4" />, desc: '一词多性全景展示' },
  { id: 'factory', label: '句子工厂', icon: <Factory className="w-4 h-4" />, desc: '词→短语→句子构建' },
  { id: 'detective', label: '识别训练', icon: <Search className="w-4 h-4" />, desc: '词性识别与改错' },
  { id: 'output', label: '输出训练', icon: <PenTool className="w-4 h-4" />, desc: '指定词性造句' },
  { id: 'review', label: '今日复习', icon: <Flame className="w-4 h-4" />, desc: '错题与薄弱点' },
];

export function PosLab() {
  const [activeTab, setActiveTab] = useState<PosTab>('map');
  const [selectedWord, setSelectedWord] = useState('balloon');

  // 从全局搜索跳转过来时读取目标词
  useEffect(() => {
    const focusWord = sessionStorage.getItem('xsc_pos_focus');
    if (focusWord) {
      setSelectedWord(focusWord);
      setActiveTab('identity');
      sessionStorage.removeItem('xsc_pos_focus');
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'map':
        return <PosMap />;
      case 'identity':
        return <WordIdentityCard selectedWord={selectedWord} onSelectWord={setSelectedWord} />;
      case 'factory':
        return <SentenceFactory />;
      case 'detective':
        return <PosDetective />;
      case 'output':
        return <PosOutputLab />;
      case 'review':
        return <ReviewPanel />;
      default:
        return <PosMap />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* 顶部标题区 */}
      <div className="max-w-7xl mx-auto px-4 pt-6 pb-4">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-400/10 flex items-center justify-center border border-amber-500/30">
            <BookOpen className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">词性工坊</h1>
            <p className="text-xs text-slate-400">PartOfSpeechLab — 词性认知与输出训练工作台</p>
          </div>
        </div>
        <p className="text-sm text-slate-400 max-w-2xl">
          词性不是标签，而是"句子岗位资格"。掌握每个词能做什么、不能做什么，才能真正摆脱中式英语。
        </p>
      </div>

      {/* 主内容区 */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 左侧导航 */}
          <nav className="lg:w-56 shrink-0">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-white/10 p-2 sticky top-20">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                    activeTab === item.id
                      ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {item.icon}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-[10px] text-slate-500 truncate">{item.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </nav>

          {/* 主内容 */}
          <main className="flex-1 min-w-0">
            <div className="bg-slate-800/50 backdrop-blur rounded-xl border border-white/10 p-4 md:p-6">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

// 今日复习面板 — 接入 posMistakeStore
function ReviewPanel() {
  const [stats, setStats] = useState(getPosStats());
  const [mistakes, setMistakes] = useState(getMistakes());

  const refresh = () => {
    setStats(getPosStats());
    setMistakes(getMistakes());
  };

  const handleMarkReviewed = (id: string) => {
    markReviewed(id);
    refresh();
  };

  const handleClear = () => {
    if (confirm('确定清空所有词性训练错题记录吗？')) {
      clearPosMistakes();
      refresh();
    }
  };

  const recentMistakes = mistakes.slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Flame className="w-5 h-5 text-orange-400" />
          <h2 className="text-lg font-bold">今日复习</h2>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-rose-400 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> 清空记录
        </button>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: '总错题', value: stats.total, color: 'text-amber-400', icon: AlertTriangle },
          { label: '待复习', value: stats.unreviewed, color: 'text-rose-400', icon: Target },
          { label: '造句均分', value: stats.avgScore, color: 'text-emerald-400', icon: FileText },
          { label: '已掌握', value: Math.max(0, stats.total - stats.unreviewed), color: 'text-blue-400', icon: BookOpen },
        ].map(s => (
          <div key={s.label} className="bg-slate-900/50 rounded-lg p-3 text-center border border-white/5">
            <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
            <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
            <div className="text-xs text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* 薄弱点 */}
      {stats.weakPoints.length > 0 && (
        <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">薄弱点</h3>
          <div className="space-y-2">
            {stats.weakPoints.map((w, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 shrink-0" />
                  {w.label}
                </div>
                <span className="text-xs text-slate-600">{w.count} 次</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 最近错题 */}
      {recentMistakes.length > 0 && (
        <div className="bg-slate-900/50 rounded-lg p-4 border border-white/5 space-y-3">
          <h3 className="text-sm font-semibold text-slate-300">最近错题</h3>
          {recentMistakes.map(m => (
            <div key={m.id} className={`rounded-lg p-3 border ${
              m.reviewed
                ? 'bg-emerald-500/5 border-emerald-500/10 opacity-60'
                : 'bg-rose-500/5 border-rose-500/10'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
                    {m.type === 'output' ? '造句' : m.type === 'detective' ? '识别' : '句型'}
                  </span>
                  {m.word && (
                    <span className="text-xs text-amber-400 font-medium">{m.word}</span>
                  )}
                  {m.score !== undefined && (
                    <span className="text-xs text-slate-500">{m.score}分</span>
                  )}
                </div>
                <span className="text-[10px] text-slate-600">
                  {new Date(m.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-1">你的答案：{m.userAnswer}</p>
              <p className="text-xs text-slate-500">{m.correctInfo.slice(0, 80)}{m.correctInfo.length > 80 ? '...' : ''}</p>
              {!m.reviewed && (
                <button
                  onClick={() => handleMarkReviewed(m.id)}
                  className="mt-2 text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
                >
                  标记已复习
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {stats.total === 0 && (
        <div className="text-center py-12 text-slate-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">还没有错题记录</p>
          <p className="text-xs mt-1">去输出训练或识别训练中练习吧</p>
        </div>
      )}
    </div>
  );
}
