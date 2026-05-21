// ============================================
// 星图 - 标点符号总入口
// 合并：规则学习 | 专项题库 | 实时沙盒 | 从句拆解 | 错题回顾
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Zap, Wand2, Eye, Brain } from 'lucide-react';
import PunctuationSystem from './PunctuationSystem';
import PunctuationQuiz from './PunctuationQuiz';
import PunctuationSandbox from './PunctuationSandbox';
import ClauseVisualizer from './ClauseVisualizer';
import SmartReview from './SmartReview';

const SUB_TABS = [
  { key: 'rules',   label: '规则学习', icon: BookOpen, desc: '16种标点+从句规则+黄金法则' },
  { key: 'quiz',    label: '专项题库', icon: Zap,      desc: '448+道题，6种题型' },
  { key: 'sandbox', label: '实时沙盒', icon: Wand2,    desc: '输入英文，自动检测标点' },
  { key: 'clause',  label: '从句拆解', icon: Eye,      desc: '颜色高亮主句/从句/连接词' },
  { key: 'review',  label: '错题回顾', icon: Brain,    desc: '艾宾浩斯智能复习' },
];

export default function PunctuationHub() {
  const [activeTab, setActiveTab] = useState('rules');

  return (
    <div>
      {/* 子Tab导航 */}
      <div className="sticky top-[88px] z-30 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {SUB_TABS.map(tab => (
              <motion.button
                key={tab.key}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  activeTab === tab.key
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-amber-300'
                }`}
              >
                <tab.icon size={12} />
                <span>{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* 内容 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'rules' && <PunctuationSystem />}
          {activeTab === 'quiz' && <PunctuationQuiz />}
          {activeTab === 'sandbox' && <PunctuationSandbox />}
          {activeTab === 'clause' && <ClauseVisualizer />}
          {activeTab === 'review' && <SmartReview />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
