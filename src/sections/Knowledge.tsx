// ============================================
// 星图 - 知识库（重组版）
// 语法体系 | 标点符号 | 时态语态 | 从句系统
// ============================================
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, CircleDot, Clock, Search, ChevronLeft } from 'lucide-react';
import GrammarSystem from './GrammarSystem';
import PunctuationHub from './PunctuationHub';
import VerbAspectHub from './VerbAspectHub';
import RelativeClauseHub from './RelativeClauseHub';

const TABS = [
  { key: 'grammar',     label: '语法体系', icon: BookOpen,    desc: '12大语法模块' },
  { key: 'punctuation', label: '标点符号', icon: CircleDot,   desc: '16种标点+题库+沙盒' },
  { key: 'verbaspect',  label: '时态语态', icon: Clock,       desc: '时态矩阵+把被虚' },
  { key: 'relative',    label: '从句系统', icon: Search,      desc: '名词性+定语+状语' },
];

interface KnowledgeProps {
  navigate: (s: string) => void;
  initialTab?: string;
}

export function Knowledge({ navigate, initialTab = 'grammar' }: KnowledgeProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'grammar':
        return <GrammarSystem />;
      case 'punctuation':
        return <PunctuationHub />;
      case 'verbaspect':
        return <VerbAspectHub />;
      case 'relative':
        return <RelativeClauseHub />;
      default:
        return <GrammarSystem />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* 头部 */}
      <div className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-lg border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 py-3">
            <button
              onClick={() => navigate('home')}
              className="flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
            >
              <ChevronLeft size={18} />
              <span className="text-sm">返回</span>
            </button>
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-amber-400" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300 bg-clip-text text-transparent">
                梵星 · 知识库
              </h1>
            </div>
          </div>

          {/* Tab导航 */}
          <div className="flex gap-1 pb-2 overflow-x-auto">
            {TABS.map(tab => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-amber-300'
                }`}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
                <span className={`text-xs ${activeTab === tab.key ? 'text-amber-200' : 'text-slate-500'}`}>
                  {tab.desc}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 内容区 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

