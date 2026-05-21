import { useState } from 'react';
import { BookOpen, ChevronRight, Lightbulb, AlertTriangle, Sparkles, ArrowLeft, Search, Wand2, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { BreathingText } from '../components/AnimatedCard';
import { playClickSound } from '../utils/soundSystem';
import PunctuationSandbox from './PunctuationSandbox';
import ClauseVisualizer from './ClauseVisualizer';
import { PUNCTUATION_RULES, CLAUSE_RULES, GOLDEN_RULES } from '../data/punctuationData';
import type { PunctuationRule, ClauseRule } from '../data/punctuationData';

export default function PunctuationSystem() {
  const [activeTab, setActiveTab] = useState<'overview' | 'punctuation' | 'clauses' | 'golden' | 'sandbox' | 'clauseviz'>('overview');
  const [selectedRule, setSelectedRule] = useState<PunctuationRule | null>(null);
  const [selectedClause, setSelectedClause] = useState<ClauseRule | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredRules = PUNCTUATION_RULES.filter(r => {
    const matchesSearch = searchTerm === '' || r.cnName.includes(searchTerm) || r.enName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || r.cnName === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const categories = ['all', ...Array.from(new Set(PUNCTUATION_RULES.map(r => r.cnName)))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-amber-500/20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 text-slate-400 hover:text-amber-400 transition-colors">
            <ArrowLeft size={18} /> 返回
          </a>
          <div className="flex items-center gap-2">
            <Sparkles className="text-amber-400" size={22} />
            <div className="flex flex-col">
              <BreathingText className="text-lg font-bold" duration={5}>
                <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                  Starry Starry Night
                </span>
              </BreathingText>
              <span className="text-xs text-amber-400/50">梵星 · 标点符号系统</span>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="max-w-6xl mx-auto px-4 pt-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { key: 'overview', label: '总览', icon: BookOpen },
            { key: 'punctuation', label: '16种标点', icon: Search },
            { key: 'clauses', label: '从句标点', icon: ChevronRight },
            { key: 'golden', label: '黄金法则', icon: Lightbulb },
            { key: 'sandbox', label: '标点沙盒', icon: Wand2 },
            { key: 'clauseviz', label: '从句拆解', icon: Eye },
          ].map(tab => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { setActiveTab(tab.key as any); setSelectedRule(null); setSelectedClause(null); playClickSound(); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.key
                  ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-lg shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-amber-300'
              }`}
            >
              <tab.icon size={14} /> {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && <OverviewTab />}

        {/* Punctuation Rules Tab */}
        {activeTab === 'punctuation' && !selectedRule && (
          <div>
            {/* Search & Filter */}
            <div className="flex gap-3 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="搜索标点符号..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-violet-500 placeholder-slate-500"
                />
              </div>
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-violet-500"
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c === 'all' ? '全部' : c}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredRules.map((rule, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedRule(rule)}
                  className="text-left p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-violet-500 hover:bg-slate-750 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-violet-400">{rule.enSymbol}</span>
                    <div>
                      <div className="text-white font-semibold">{rule.cnName} <span className="text-slate-500 text-sm">{rule.enName}</span></div>
                      <div className="text-slate-400 text-sm mt-0.5">{rule.description}</div>
                    </div>
                    <ChevronRight className="ml-auto text-slate-600 group-hover:text-violet-400 transition-colors" size={18} />
                  </div>
                  {rule.keyDifferences.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {rule.keyDifferences.slice(0, 2).map((d, i) => (
                        <span key={i} className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full truncate max-w-[200px]">{d.substring(0, 30)}...</span>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'punctuation' && selectedRule && (
          <PunctuationDetail rule={selectedRule} onBack={() => setSelectedRule(null)} />
        )}

        {/* Clauses Tab */}
        {activeTab === 'clauses' && !selectedClause && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {CLAUSE_RULES.map((clause, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedClause(clause)}
                className="text-left p-4 rounded-xl bg-slate-800 border border-slate-700 hover:border-cyan-500 hover:bg-slate-750 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold text-sm">{idx + 1}</div>
                  <div>
                    <div className="text-white font-semibold">{clause.type}</div>
                    <div className="text-slate-500 text-xs">{clause.enType}</div>
                  </div>
                  <ChevronRight className="ml-auto text-slate-600 group-hover:text-cyan-400" size={18} />
                </div>
                <p className="text-slate-400 text-sm mt-2">{clause.description.substring(0, 60)}...</p>
                <div className="mt-2 text-xs text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">{clause.examples.length} 个例句</div>
              </button>
            ))}
          </div>
        )}

        {activeTab === 'clauses' && selectedClause && (
          <ClauseDetail clause={selectedClause} onBack={() => setSelectedClause(null)} />
        )}

        {/* Punctuation Sandbox Tab */}
        {activeTab === 'sandbox' && <PunctuationSandbox />}

        {/* Clause Visualizer Tab */}
        {activeTab === 'clauseviz' && <ClauseVisualizer />}

        {/* Golden Rules Tab */}
        {activeTab === 'golden' && (
          <div className="grid grid-cols-1 gap-4">
            {GOLDEN_RULES.map((rule, idx) => (
              <div key={idx} className="p-5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="text-amber-400" size={18} />
                  <h3 className="text-amber-300 font-bold">{rule.title}</h3>
                </div>
                <p className="text-slate-300 text-sm mb-2">{rule.rule}</p>
                <div className="bg-slate-900/50 rounded-lg p-3 mb-2">
                  <code className="text-emerald-400 text-sm">{rule.example}</code>
                </div>
                <p className="text-amber-400/70 text-xs italic">{rule.note}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// 总览页
function OverviewTab() {
  return (
    <div className="space-y-6">
      {/* 核心差异TOP 10 */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20">
        <h2 className="text-lg font-bold text-red-300 flex items-center gap-2 mb-3">
          <AlertTriangle size={18} /> 中英文标点TOP 10 核心差异
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[
            '英语没有顿号 → 并列词用逗号',
            '英语句号是小圆点 → 不是圆圈',
            '英语省略号只有3个点 → 不是6个',
            '英语破折号占1个字位 → 不是2个',
            '英语书名号用斜体或引号 → 不用《》',
            '英语标点后必须空格 → 中文不空格',
            '英语引号嵌套单双交替',
            '英语有撇号(\') → 中文没有',
            '英语有连字符(-) → 复合词用',
            '英语分号更正式',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold">{i + 1}</span>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* 快速统计 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: '标点符号', value: '16种', color: 'from-blue-500 to-cyan-500' },
          { label: '从句类型', value: '6种', color: 'from-emerald-500 to-teal-500' },
          { label: '黄金法则', value: '8条', color: 'from-amber-500 to-orange-500' },
          { label: '中英差异', value: '10+处', color: 'from-violet-500 to-purple-500' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl bg-gradient-to-r ${stat.color} bg-opacity-10 border border-white/10 text-center`}>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-white/70">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* 系统架构图 */}
      <div className="p-5 rounded-2xl bg-slate-800 border border-slate-700">
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-violet-400" /> 学习路线图
        </h2>
        <div className="space-y-3">
          {[
            { step: 1, title: '标点符号基础', desc: '掌握16种中英文标点符号的写法和基本用法', color: 'blue' },
            { step: 2, title: '核心差异辨析', desc: '重点攻克逗号、顿号、分号、冒号、引号等核心差异', color: 'cyan' },
            { step: 3, title: '从句标点规则', desc: '掌握定语从句、状语从句、名词性从句的标点用法', color: 'emerald' },
            { step: 4, title: '复合复杂句标点', desc: '综合运用FANBOYS和从句标点规则', color: 'amber' },
            { step: 5, title: '实战练习', desc: '通过改错、填空、应用题巩固所学', color: 'violet' },
          ].map(item => (
            <div key={item.step} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg bg-${item.color}-500/20 text-${item.color}-400 flex items-center justify-center font-bold text-sm`}>{item.step}</div>
              <div className="flex-1">
                <div className="text-white font-medium text-sm">{item.title}</div>
                <div className="text-slate-400 text-xs">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 标点符号详情页
function PunctuationDetail({ rule, onBack }: { rule: PunctuationRule; onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
        <ArrowLeft size={16} /> 返回列表
      </button>

      <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
        {/* 头部 */}
        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-700">
          <span className="text-5xl font-bold text-violet-400">{rule.enSymbol}</span>
          <div>
            <h2 className="text-2xl font-bold text-white">{rule.cnName}</h2>
            <p className="text-slate-400">{rule.enName}</p>
          </div>
        </div>

        {/* 描述 */}
        <p className="text-slate-300 mb-4">{rule.description}</p>

        {/* 速记提示 */}
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6">
          <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold">
            <Lightbulb size={14} /> 速记口诀
          </div>
          <p className="text-amber-300/80 text-sm mt-1">{rule.quickTip}</p>
        </div>

        {/* 核心差异 */}
        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-400" /> 核心差异
        </h3>
        <div className="space-y-2 mb-6">
          {rule.keyDifferences.map((diff, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span className="w-5 h-5 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-slate-300">{diff}</span>
            </div>
          ))}
        </div>

        {/* 中文例句 */}
        <h3 className="text-white font-bold mb-2">中文例句</h3>
        <div className="space-y-2 mb-4">
          {rule.cnExamples.map((ex, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <p className="text-white text-sm">{ex.text}</p>
              <p className="text-slate-500 text-xs mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>

        {/* 英文例句 */}
        <h3 className="text-white font-bold mb-2">英文例句</h3>
        <div className="space-y-2 mb-4">
          {rule.enExamples.map((ex, i) => (
            <div key={i} className="p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <p className="text-emerald-400 text-sm font-medium">{ex.text}</p>
              <p className="text-slate-500 text-xs mt-1">{ex.explanation}</p>
            </div>
          ))}
        </div>

        {/* 常见错误 */}
        <h3 className="text-white font-bold mb-2 flex items-center gap-2">
          <AlertTriangle size={16} className="text-orange-400" /> 常见错误
        </h3>
        <div className="space-y-2">
          {rule.commonMistakes.map((err, i) => (
            <div key={i} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-red-400 line-through">{err.wrong}</span>
                <span className="text-slate-600">→</span>
                <span className="text-emerald-400 font-medium">{err.correct}</span>
              </div>
              <p className="text-orange-400/80 text-xs mt-1">{err.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 从句详情页
function ClauseDetail({ clause, onBack }: { clause: ClauseRule; onBack: () => void }) {
  return (
    <div>
      <button onClick={onBack} className="flex items-center gap-1 text-slate-400 hover:text-white text-sm mb-4 transition-colors">
        <ArrowLeft size={16} /> 返回列表
      </button>

      <div className="p-6 rounded-2xl bg-slate-800 border border-slate-700">
        <div className="mb-4 pb-4 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-white">{clause.type}</h2>
          <p className="text-cyan-400 text-sm">{clause.enType}</p>
        </div>

        <p className="text-slate-300 mb-4">{clause.description}</p>

        {/* 逗号规则 */}
        <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20 mb-6">
          <div className="flex items-center gap-2 text-cyan-400 text-sm font-semibold mb-1">
            <BookOpen size={14} /> 逗号规则
          </div>
          <p className="text-cyan-300/80 text-sm">{clause.commaRule}</p>
        </div>

        {/* 例句 */}
        <h3 className="text-white font-bold mb-3">例句</h3>
        <div className="space-y-3 mb-6">
          {clause.examples.map((ex, i) => (
            <div key={i} className="p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
              <p className="text-emerald-400 text-sm font-medium">{ex.sentence}</p>
              <p className="text-slate-400 text-xs mt-1">{ex.explanation}</p>
              <p className="text-slate-500 text-xs mt-0.5 italic">{ex.translation}</p>
            </div>
          ))}
        </div>

        {/* 常见错误 */}
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <AlertTriangle size={16} className="text-orange-400" /> 常见错误
        </h3>
        <div className="space-y-2">
          {clause.commonErrors.map((err, i) => (
            <div key={i} className="p-3 rounded-lg bg-red-500/5 border border-red-500/20">
              <div className="text-red-400 text-sm line-through">{err.wrong}</div>
              <div className="text-emerald-400 text-sm font-medium mt-1">{err.correct}</div>
              <p className="text-orange-400/80 text-xs mt-1">{err.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
