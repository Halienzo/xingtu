// ============================================
// 星图 - 时态语态总入口
// 时态矩阵 | 把字句 | 被字句 | 虚拟句 | 专项题库
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Hammer, Shield, Ghost, BookOpen } from 'lucide-react';
import VerbAspectDetail from './VerbAspectDetail';

const TABS = [
  { key: 'matrix',  label: '时态矩阵', icon: Clock,    desc: '全部16种时态组合' },
  { key: 'ba',      label: '把字句',   icon: Hammer,   desc: '全部用法+例句' },
  { key: 'bei',     label: '被字句',   icon: Shield,   desc: '全部用法+例句' },
  { key: 'virtual', label: '虚拟句',   icon: Ghost,    desc: '标准+混合用法' },
  { key: 'quiz',    label: '专项题库', icon: BookOpen, desc: '题型丰富的题库' },
];

export default function VerbAspectHub() {
  const [activeTab, setActiveTab] = useState('matrix');

  return (
    <div>
      {/* 子Tab */}
      <div className="sticky top-[88px] z-30 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {TABS.map(tab => (
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          <VerbAspectDetail activeTab={activeTab} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
