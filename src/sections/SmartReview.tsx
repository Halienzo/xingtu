// ============================================
// Starry Starry Night - 错题智能回顾系统
// 基于艾宾浩斯遗忘曲线的智能复习提醒
// ============================================
import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Brain, Clock, TrendingUp, AlertTriangle, CheckCircle, Sparkles, ChevronRight, BookOpen } from 'lucide-react';
import { FadeInSection, AnimatedCard } from '../components/AnimatedCard';
import { playCorrectSound, playClickSound } from '../utils/soundSystem';

interface WrongItem {
  id: number;
  question: string;
  answer: string;
  explanation: string;
  category: string;
  wrongCount: number;
  lastWrong: number;
  reviewStage: number;
  nextReview: number;
}

// 艾宾浩斯复习间隔（分钟）
const EBBINGHAUS_INTERVALS = [5, 30, 12 * 60, 24 * 60, 48 * 60, 168 * 60, 336 * 60]; // 5分, 30分, 12小时, 1天, 2天, 7天, 14天

function getReviewStatus(item: WrongItem): { status: 'due' | 'upcoming' | 'mastered' | 'new'; nextInMinutes: number } {
  const now = Date.now();
  const next = item.nextReview;
  const diff = next - now;
  if (item.reviewStage >= EBBINGHAUS_INTERVALS.length) return { status: 'mastered', nextInMinutes: Infinity };
  if (diff <= 0) return { status: 'due', nextInMinutes: 0 };
  if (item.reviewStage === 0 && item.wrongCount === 1) return { status: 'new', nextInMinutes: Math.ceil(diff / 60000) };
  return { status: 'upcoming', nextInMinutes: Math.ceil(diff / 60000) };
}

function formatMinutes(mins: number): string {
  if (mins === Infinity) return '已掌握';
  if (mins <= 0) return '现在复习';
  if (mins < 60) return `${mins}分钟后`;
  if (mins < 1440) return `${Math.floor(mins / 60)}小时后`;
  return `${Math.floor(mins / 1440)}天后`;
}

function loadWrongItems(): WrongItem[] {
  try {
    const saved = localStorage.getItem('starry_wrong_items');
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
}

function saveWrongItems(items: WrongItem[]) {
  localStorage.setItem('starry_wrong_items', JSON.stringify(items));
}

// 生成模拟错题数据
function generateDemoData(): WrongItem[] {
  const now = Date.now();
  return [
    { id: 1, question: '英文并列词语之间用什么标点？', answer: '逗号（,）', explanation: '英文没有顿号，并列词语一律用逗号分隔。', category: '顿号', wrongCount: 3, lastWrong: now - 2 * 24 * 3600000, reviewStage: 3, nextReview: now - 3600000 },
    { id: 2, question: 'FANBOYS连接两个独立句时，前面必须加逗号。', answer: '正确', explanation: 'For, And, Nor, But, Or, Yet, So连接两个独立句时，前面加逗号。', category: '复合句', wrongCount: 2, lastWrong: now - 24 * 3600000, reviewStage: 2, nextReview: now + 2 * 3600000 },
    { id: 3, question: '"that"不能用于非限制性从句', answer: '正确', explanation: '"that"不能用于非限制性从句（逗号+that=错误），应改为which。', category: '定语从句', wrongCount: 4, lastWrong: now - 5 * 3600000, reviewStage: 1, nextReview: now - 30 * 60000 },
    { id: 4, question: '英文省略号有几个点？', answer: '3个', explanation: '英文省略号3个点（...），中文省略号6个点（……）。', category: '省略号', wrongCount: 1, lastWrong: now - 3600000, reviewStage: 0, nextReview: now + 3 * 60000 },
    { id: 5, question: '间接疑问句后面不加问号。', answer: '正确', explanation: '间接疑问句（She asked if...）不用问号，用句号。', category: '问号', wrongCount: 2, lastWrong: now - 12 * 3600000, reviewStage: 2, nextReview: now - 5 * 3600000 },
    { id: 6, question: '"however"是副词不是连词，不能用逗号连接独立句。', answer: '正确', explanation: '"however"是副词，用分号或句号连接独立句。', category: '分号', wrongCount: 3, lastWrong: now - 3 * 24 * 3600000, reviewStage: 4, nextReview: now + 24 * 3600000 },
    { id: 7, question: '英文书名号用斜体或引号', answer: '正确', explanation: '英文书名用斜体（Harry Potter）或引号（"Harry Potter"），不用书名号。', category: '书名号', wrongCount: 1, lastWrong: now - 10 * 3600000, reviewStage: 1, nextReview: now + 10 * 60000 },
    { id: 8, question: '非限制性定语从句前后都有逗号。', answer: '正确', explanation: '非限制性定语从句用逗号"夹住"，像夹心饼干。', category: '定语从句', wrongCount: 5, lastWrong: now - 3600000, reviewStage: 0, nextReview: now + 2 * 60000 },
  ];
}

export default function SmartReview() {
  const [items, setItems] = useState<WrongItem[]>(() => {
    const saved = loadWrongItems();
    return saved.length > 0 ? saved : generateDemoData();
  });
  const [currentReview, setCurrentReview] = useState<WrongItem | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [filter, setFilter] = useState<'all' | 'due' | 'upcoming' | 'mastered'>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    saveWrongItems(items);
  }, [items]);

  const statusMap = useMemo(() => {
    const map = new Map<number, { status: 'due' | 'upcoming' | 'mastered' | 'new'; nextInMinutes: number }>();
    items.forEach(item => {
      map.set(item.id, getReviewStatus(item));
    });
    return map;
  }, [items]);

  const stats = useMemo(() => {
    const due = items.filter(i => statusMap.get(i.id)?.status === 'due').length;
    const upcoming = items.filter(i => statusMap.get(i.id)?.status === 'upcoming').length;
    const mastered = items.filter(i => statusMap.get(i.id)?.status === 'mastered').length;
    const newItems = items.filter(i => statusMap.get(i.id)?.status === 'new').length;
    const totalWrong = items.reduce((sum, i) => sum + i.wrongCount, 0);
    return { due, upcoming, mastered, newItems, total: items.length, totalWrong };
  }, [items, statusMap]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') return items;
    return items.filter(i => statusMap.get(i.id)?.status === filter);
  }, [items, filter, statusMap]);

  const handleMarkCorrect = (item: WrongItem) => {
    const newStage = item.reviewStage + 1;
    const now = Date.now();
    const nextInterval = EBBINGHAUS_INTERVALS[Math.min(newStage, EBBINGHAUS_INTERVALS.length - 1)] || 336 * 60;
    const updated = items.map(i =>
      i.id === item.id
        ? { ...i, reviewStage: newStage, nextReview: now + nextInterval * 60000 }
        : i
    );
    setItems(updated);
    setCurrentReview(null);
    setShowAnswer(false);
    playCorrectSound();
  };

  const handleMarkWrong = (item: WrongItem) => {
    const now = Date.now();
    // 答错重置到第一阶段
    const updated = items.map(i =>
      i.id === item.id
        ? { ...i, wrongCount: i.wrongCount + 1, lastWrong: now, reviewStage: 0, nextReview: now + 5 * 60000 }
        : i
    );
    setItems(updated);
    setCurrentReview(null);
    setShowAnswer(false);
  };

  const handleReview = (item: WrongItem) => {
    setCurrentReview(item);
    setShowAnswer(false);
    playClickSound();
  };

  const getStatusBadge = (item: WrongItem) => {
    const s = statusMap.get(item.id);
    if (!s) return null;
    const styles = {
      due: 'bg-red-500/20 text-red-400 border-red-500/30',
      upcoming: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      mastered: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      new: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    };
    const labels = {
      due: '待复习',
      upcoming: ' upcoming',
      mastered: '已掌握',
      new: '新错题',
    };
    return (
      <span className={`text-xs px-2 py-0.5 rounded-full border ${styles[s.status]}`}>
        {labels[s.status]}
        {s.nextInMinutes < Infinity && ` · ${formatMinutes(s.nextInMinutes)}`}
      </span>
    );
  };

  const progressPct = Math.round((stats.mastered / Math.max(stats.total, 1)) * 100);

  if (!mounted) return null;

  // 复习模式
  if (currentReview) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-4 py-6"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="p-6 rounded-2xl bg-slate-800/80 border border-amber-500/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Brain className="text-amber-400" size={20} />
            <h3 className="text-white font-bold">错题复习</h3>
            <span className="text-xs text-slate-500 ml-auto">第 {currentReview.reviewStage + 1} 轮复习</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{currentReview.category}</span>
              <span className="text-xs text-slate-500">错过 {currentReview.wrongCount} 次</span>
            </div>
            <p className="text-white text-lg leading-relaxed">{currentReview.question}</p>
          </div>

          {!showAnswer && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAnswer(true)}
              className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold transition-colors mb-4"
            >
              显示答案
            </motion.button>
          )}

          {showAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4"
            >
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 mb-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-1">
                  <CheckCircle size={14} /> 正确答案
                </div>
                <p className="text-emerald-300 text-lg font-medium">{currentReview.answer}</p>
              </div>
              <div className="p-3 rounded-lg bg-slate-900/50">
                <p className="text-slate-400 text-sm">{currentReview.explanation}</p>
              </div>
            </motion.div>
          )}

          {showAnswer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMarkWrong(currentReview)}
                className="flex-1 py-2.5 rounded-xl bg-red-600/20 border border-red-500/30 text-red-400 font-semibold hover:bg-red-600/30 transition-colors"
              >
                还是不会
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleMarkCorrect(currentReview)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle size={16} /> 记住了
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <FadeInSection>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
            <Brain className="text-amber-400" size={22} />
            错题智能回顾
          </h2>
          <p className="text-slate-400 text-sm">基于艾宾浩斯遗忘曲线，科学安排复习间隔</p>
        </div>
      </FadeInSection>

      {/* 统计卡片 */}
      <FadeInSection delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: '待复习', value: stats.due, icon: AlertTriangle, color: 'red' },
            { label: '即将复习', value: stats.upcoming, icon: Clock, color: 'amber' },
            { label: '已掌握', value: stats.mastered, icon: CheckCircle, color: 'emerald' },
            { label: '总错题', value: stats.total, icon: BookOpen, color: 'blue' },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.03, y: -2 }}
              className={`p-4 rounded-xl bg-${s.color}-500/10 border border-${s.color}-500/20 text-center`}
            >
              <s.icon className={`mx-auto text-${s.color}-400 mb-1`} size={18} />
              <div className="text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-slate-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </FadeInSection>

      {/* 掌握进度 */}
      <FadeInSection delay={0.2}>
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-300 flex items-center gap-2">
              <TrendingUp size={14} className="text-emerald-400" />
              掌握进度
            </span>
            <span className="text-sm font-bold text-emerald-400">{progressPct}%</span>
          </div>
          <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-amber-500"
            />
          </div>
        </div>
      </FadeInSection>

      {/* 筛选 */}
      <FadeInSection delay={0.3}>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {[
            { key: 'all', label: '全部' },
            { key: 'due', label: '待复习' },
            { key: 'upcoming', label: '即将复习' },
            { key: 'mastered', label: '已掌握' },
          ].map(f => (
            <motion.button
              key={f.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(f.key as any)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                filter === f.key
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {f.label}
            </motion.button>
          ))}
        </div>
      </FadeInSection>

      {/* 错题列表 */}
      <div className="space-y-2">
        {filteredItems.map((item, i) => (
          <AnimatedCard key={item.id} delay={i * 0.05} glowColor="rgba(218, 165, 32, 0.1)">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/30 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded">{item.category}</span>
                    {getStatusBadge(item)}
                  </div>
                  <p className="text-white text-sm">{item.question}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleReview(item)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shrink-0 ${
                    statusMap.get(item.id)?.status === 'due'
                      ? 'bg-red-600 text-white hover:bg-red-500'
                      : statusMap.get(item.id)?.status === 'mastered'
                      ? 'bg-emerald-600/20 text-emerald-400'
                      : 'bg-amber-600 text-white hover:bg-amber-500'
                  }`}
                >
                  {statusMap.get(item.id)?.status === 'due' ? '立即复习' : statusMap.get(item.id)?.status === 'mastered' ? '已掌握' : '复习'}
                </motion.button>
              </div>
            </motion.div>
          </AnimatedCard>
        ))}
      </div>

      {/* 艾宾浩斯说明 */}
      <FadeInSection delay={0.5}>
        <div className="mt-8 p-4 rounded-2xl bg-slate-800/30 border border-slate-700">
          <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
            <Sparkles size={14} className="text-amber-400" />
            艾宾浩斯复习间隔
          </h3>
          <div className="flex items-center gap-1 flex-wrap">
            {EBBINGHAUS_INTERVALS.map((mins, i) => (
              <div key={i} className="flex items-center">
                <div className="px-2 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700">
                  {mins < 60 ? `${mins}分` : mins < 1440 ? `${Math.floor(mins / 60)}小时` : `${Math.floor(mins / 1440)}天`}
                </div>
                {i < EBBINGHAUS_INTERVALS.length - 1 && (
                  <ChevronRight size={12} className="text-slate-600 mx-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>
    </div>
  );
}
