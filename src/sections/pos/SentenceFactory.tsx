// ============================================
// 句子工厂 (SentenceFactory) - 第三期完善版
// 拖拽造句 + 句子扩展 + 句型特训
// ============================================
import { useState, useCallback } from 'react';
import { sentencePatterns, getPattern } from '../../data/sentencePatterns';
import { patternTemplates, wordPool, expansionPieces, patternDrills } from '../../data/sentenceFactoryData';
import { ArrowRight, Check, RotateCcw, Puzzle, Expand, Target, GripVertical } from 'lucide-react';
import { saveMistake } from '../../lib/posMistakeStore';

type FactoryTab = 'drag' | 'expand' | 'drill';

// ========== 拖拽造句 ==========
interface DroppedWord {
  text: string;
  pos: string;
  role: string;
}

function DragSentenceBuilder() {
  const [selectedPattern, setSelectedPattern] = useState('SVO');
  const [slots, setSlots] = useState<(DroppedWord | null)[]>([]);
  const [draggedWord, setDraggedWord] = useState<{ text: string; pos: string; role: string } | null>(null);
  const [showCheck, setShowCheck] = useState(false);
  const [feedback, setFeedback] = useState('');

  const template = patternTemplates.find(p => p.code === selectedPattern);
  const pattern = getPattern(selectedPattern);

  // 初始化槽位
  const initSlots = useCallback((code: string) => {
    const t = patternTemplates.find(p => p.code === code);
    setSlots(t ? new Array(t.slots.length).fill(null) : []);
    setShowCheck(false);
    setFeedback('');
  }, []);

  const handleDragStart = (word: { text: string; pos: string; role: string }) => {
    setDraggedWord(word);
  };

  const handleDrop = (slotIndex: number) => {
    if (!draggedWord || !template) return;
    const slotRole = template.slots[slotIndex].role;
    // 允许放置：词的 role 匹配槽位 role，或通用匹配
    const isMatch = draggedWord.role === slotRole ||
      (slotRole === 'O' && draggedWord.role === 'DO') ||
      (slotRole === 'DO' && draggedWord.role === 'O') ||
      (slotRole === 'IO' && draggedWord.role === 'O');

    const newSlots = [...slots];
    newSlots[slotIndex] = { ...draggedWord };
    setSlots(newSlots);
    setDraggedWord(null);

    if (!isMatch) {
      setFeedback(`⚠️ 注意：${draggedWord.text} (${draggedWord.pos}) 通常不放在 ${slotRole} 位置`);
    } else {
      setFeedback('');
    }
  };

  const handleCheck = () => {
    if (!template || !pattern) return;
    const filled = slots.filter(Boolean).length;
    if (filled < template.slots.length) {
      setFeedback('❌ 还有空槽位未填满');
      setShowCheck(true);
      return;
    }

    // 构建句子
    const sentence = slots.map(s => s?.text).join(' ') + '.';
    setFeedback(`✓ 句子：${sentence}`);
    setShowCheck(true);
  };

  const handleReset = () => {
    initSlots(selectedPattern);
  };

  // 过滤候选词：只显示与当前句型相关的词
  const relevantWords = wordPool.filter(w => {
    if (!template) return true;
    const slotRoles = template.slots.map(s => s.role);
    return slotRoles.includes(w.role as any) || slotRoles.some(r => r === 'O' && w.role === 'IO');
  });

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-400">拖拽词汇到正确槽位，组成完整句子</div>

      {/* 句型选择 */}
      <div className="flex flex-wrap gap-2">
        {sentencePatterns.map(p => (
          <button
            key={p.code}
            onClick={() => { setSelectedPattern(p.code); initSlots(p.code); }}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              p.code === selectedPattern
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border border-white/10'
            }`}
          >
            <span className="font-mono mr-1">{p.code}</span>
            {p.label}
          </button>
        ))}
      </div>

      {template && (
        <>
          {/* 槽位区 */}
          <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-3 justify-center min-h-[80px]">
              {template.slots.map((slot, i) => (
                <div key={slot.role} className="flex items-center gap-2">
                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => handleDrop(i)}
                    className={`min-w-[100px] min-h-[48px] rounded-lg border-2 border-dashed flex flex-col items-center justify-center px-3 py-2 transition-all ${
                      slots[i]
                        ? `${slot.color} border-solid`
                        : 'border-slate-600 bg-slate-800/50 text-slate-500'
                    }`}
                  >
                    {slots[i] ? (
                      <>
                        <span className="text-sm font-medium">{slots[i]?.text}</span>
                        <span className="text-[10px] opacity-70">{slots[i]?.pos}</span>
                      </>
                    ) : (
                      <>
                        <span className="text-xs font-medium">{slot.role}</span>
                        <span className="text-[10px] opacity-60">{slot.label}</span>
                      </>
                    )}
                  </div>
                  {i < template.slots.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                  )}
                </div>
              ))}
            </div>

            {/* 控制按钮 */}
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={handleCheck}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg border border-emerald-500/30 text-sm hover:bg-emerald-500/30"
              >
                <Check className="w-4 h-4" /> 检查
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 text-slate-400 rounded-lg border border-white/10 text-sm hover:text-white"
              >
                <RotateCcw className="w-4 h-4" /> 重置
              </button>
            </div>

            {feedback && (
              <div className={`mt-3 text-sm text-center px-3 py-2 rounded-lg ${
                feedback.startsWith('✓') ? 'bg-emerald-500/10 text-emerald-300' :
                feedback.startsWith('❌') ? 'bg-rose-500/10 text-rose-300' :
                'bg-amber-500/10 text-amber-300'
              }`}>
                {feedback}
              </div>
            )}

            {showCheck && pattern && (
              <div className="mt-3 bg-slate-800/50 rounded-lg p-3 text-xs space-y-1">
                <p className="text-slate-400">句型：{pattern.label}（{pattern.structure}）</p>
                <p className="text-slate-500">💡 {pattern.traps[0]?.title}</p>
              </div>
            )}
          </div>

          {/* 候选词池 */}
          <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4">
            <h4 className="text-xs text-slate-500 mb-3 flex items-center gap-1">
              <GripVertical className="w-3 h-3" /> 拖拽词汇到上方槽位
            </h4>
            <div className="flex flex-wrap gap-2">
              {relevantWords.map((word, idx) => (
                <div
                  key={`${word.text}-${idx}`}
                  draggable
                  onDragStart={() => handleDragStart(word)}
                  className="cursor-grab active:cursor-grabbing px-3 py-2 rounded-lg bg-slate-800 border border-white/10 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all select-none"
                >
                  <span className="text-sm text-white">{word.text}</span>
                  <span className="text-[10px] text-slate-500 ml-1.5">{word.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ========== 句子扩展 ==========
function SentenceExpander() {
  const [baseSentence, setBaseSentence] = useState('The flower blooms.');
  const [expandedSentence, setExpandedSentence] = useState('The flower blooms.');
  const [addedPieces, setAddedPieces] = useState<string[]>([]);
  const [annotations, setAnnotations] = useState<{ text: string; label: string; color: string }[]>([]);

  const baseSentences = [
    'The flower blooms.',
    'She reads books.',
    'He is a doctor.',
    'The sun rises.',
    'They live here.',
  ];

  const handleAddPiece = (piece: typeof expansionPieces[0]) => {
    if (addedPieces.includes(piece.label)) return;

    const newAdded = [...addedPieces, piece.label];
    setAddedPieces(newAdded);

    // 根据类型简单扩展句子（演示用）
    let newSentence = expandedSentence;
    let newAnnotations = [...annotations];

    if (piece.type === 'attribute') {
      if (piece.label.includes('形容词')) {
        newSentence = expandedSentence.replace('The flower', 'The [beautiful] flower');
        newAnnotations.push({ text: 'beautiful', label: '定语(adj)', color: 'bg-amber-500/20 text-amber-300' });
      } else {
        newSentence = expandedSentence.replace('blooms', 'blooms [in the garden]');
        newAnnotations.push({ text: 'in the garden', label: '定语(PrepP)', color: 'bg-rose-500/20 text-rose-300' });
      }
    } else if (piece.type === 'adverbial') {
      if (piece.label.includes('时间')) {
        newSentence = expandedSentence.replace('.', ' [every morning].');
        newAnnotations.push({ text: 'every morning', label: '状语(时间)', color: 'bg-purple-500/20 text-purple-300' });
      } else if (piece.label.includes('地点')) {
        newSentence = expandedSentence.replace('.', ' [in the garden].');
        newAnnotations.push({ text: 'in the garden', label: '状语(地点)', color: 'bg-purple-500/20 text-purple-300' });
      } else {
        newSentence = expandedSentence.replace('.', ' [carefully].');
        newAnnotations.push({ text: 'carefully', label: '状语(方式)', color: 'bg-purple-500/20 text-purple-300' });
      }
    } else if (piece.type === 'clause') {
      newSentence = expandedSentence.replace('The flower', 'The flower [that I planted]');
      newAnnotations.push({ text: 'that I planted', label: '定语从句', color: 'bg-cyan-500/20 text-cyan-300' });
    }

    setExpandedSentence(newSentence);
    setAnnotations(newAnnotations);
  };

  const handleReset = () => {
    setExpandedSentence(baseSentence);
    setAddedPieces([]);
    setAnnotations([]);
  };

  const handleChangeBase = (s: string) => {
    setBaseSentence(s);
    setExpandedSentence(s);
    setAddedPieces([]);
    setAnnotations([]);
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-400">从一个简单句出发，逐步添加定语、状语、从句，观察句子如何变复杂</div>

      {/* 基础句选择 */}
      <div className="flex flex-wrap gap-2">
        {baseSentences.map(s => (
          <button
            key={s}
            onClick={() => handleChangeBase(s)}
            className={`px-3 py-1.5 rounded-lg text-xs transition-all ${
              baseSentence === s
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border border-white/10'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 句子展示区 */}
      <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4 md:p-6">
        <h4 className="text-xs text-slate-500 mb-2">当前句子</h4>
        <div className="text-lg text-white leading-relaxed">
          {expandedSentence.split(/\[(.*?)\]/).map((part, i) => {
            if (i % 2 === 0) {
              return <span key={i}>{part}</span>;
            }
            const anno = annotations.find(a => a.text === part);
            return (
              <span key={i} className={`inline-block mx-0.5 px-1.5 py-0.5 rounded text-sm ${anno?.color || 'bg-amber-500/20 text-amber-300'}`}>
                {part}
              </span>
            );
          })}
        </div>

        {annotations.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {annotations.map((a, i) => (
              <span key={i} className={`text-[10px] px-2 py-0.5 rounded ${a.color}`}>
                {a.text} → {a.label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 扩展成分选择 */}
      <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4">
        <h4 className="text-xs text-slate-500 mb-3">点击添加扩展成分</h4>
        <div className="grid sm:grid-cols-2 gap-2">
          {expansionPieces.map(piece => (
            <button
              key={piece.label}
              onClick={() => handleAddPiece(piece)}
              disabled={addedPieces.includes(piece.label)}
              className={`text-left px-3 py-2 rounded-lg border text-xs transition-all ${
                addedPieces.includes(piece.label)
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300 opacity-60'
                  : 'bg-slate-800 border-white/10 hover:border-amber-500/30 text-slate-300'
              }`}
            >
              <div className="font-medium">{piece.label}</div>
              <div className="text-slate-500 mt-0.5">{piece.description}</div>
              <div className="text-slate-600 mt-1 italic">{piece.example}</div>
            </button>
          ))}
        </div>

        <button
          onClick={handleReset}
          className="mt-3 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 text-slate-400 rounded-lg border border-white/10 text-xs hover:text-white transition-colors"
        >
          <RotateCcw className="w-3 h-3" /> 重置句子
        </button>
      </div>
    </div>
  );
}

// ========== 句型特训 ==========
function PatternDrills() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all'
    ? patternDrills
    : patternDrills.filter(d => d.pattern === filter);

  const drill = filtered[currentIdx];

  const handleAnswer = (option: string) => {
    if (showResult) return;
    setSelectedOption(option);
    setShowResult(true);
    const correctAnswer = drill.blanks[0]?.answer;
    const correct = option === correctAnswer;
    if (correct) {
      setScore(s => s + 1);
    } else {
      saveMistake({
        type: 'drill',
        patternCode: drill.pattern,
        userAnswer: option,
        correctInfo: `${correctAnswer} — ${drill.explanation}`,
      });
    }
    setAnswered(prev => new Set(prev).add(drill.id));
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentIdx((currentIdx + 1) % filtered.length);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Set());
  };

  if (!drill) return <div className="text-center text-slate-500">暂无题目</div>;

  return (
    <div className="space-y-4">
      <div className="text-sm text-slate-400">针对每种句型的专项练习</div>

      {/* 统计 */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-300">得分: {score} / {answered.size}</span>
        <button onClick={handleReset} className="text-xs text-slate-500 hover:text-white flex items-center gap-1">
          <RotateCcw className="w-3 h-3" /> 重置
        </button>
      </div>

      {/* 句型筛选 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setFilter('all'); setCurrentIdx(0); setShowResult(false); }}
          className={`text-xs px-3 py-1.5 rounded-lg ${filter === 'all' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400'}`}
        >
          全部
        </button>
        {['SV', 'SVC', 'SVO', 'SVOO', 'SVOC', 'SVA'].map(p => (
          <button
            key={p}
            onClick={() => { setFilter(p); setCurrentIdx(0); setShowResult(false); }}
            className={`text-xs px-3 py-1.5 rounded-lg ${filter === p ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-400'}`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* 题目 */}
      <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4 md:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-400 font-mono">{drill.pattern}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">CEFR {drill.ceferLevel}</span>
          </div>
          <span className="text-xs text-slate-500">{currentIdx + 1} / {filtered.length}</span>
        </div>

        <p className="text-sm font-medium text-white">{drill.instruction}</p>

        {drill.sentence && (
          <div className="bg-slate-800/50 rounded-lg px-4 py-3 text-sm text-white">
            {drill.sentence}
          </div>
        )}

        <div className="space-y-2">
          {drill.options.map((opt, idx) => {
            let btnClass = 'bg-slate-800 hover:bg-slate-700 border-white/10 text-slate-300';
            if (showResult) {
              const correctAnswer = drill.blanks[0]?.answer;
              if (opt === correctAnswer) {
                btnClass = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
              } else if (opt === selectedOption) {
                btnClass = 'bg-rose-500/15 border-rose-500/40 text-rose-300';
              } else {
                btnClass = 'bg-slate-800/50 border-white/5 text-slate-500';
              }
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(opt)}
                disabled={showResult}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${btnClass}`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-700 inline-flex items-center justify-center text-xs mr-2 shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                {opt}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className={`rounded-lg p-4 border ${
            selectedOption === drill.blanks[0]?.answer
              ? 'bg-emerald-500/5 border-emerald-500/20'
              : 'bg-rose-500/5 border-rose-500/20'
          }`}>
            <p className={`text-sm font-medium ${
              selectedOption === drill.blanks[0]?.answer ? 'text-emerald-300' : 'text-rose-300'
            }`}>
              {selectedOption === drill.blanks[0]?.answer ? '✓ 回答正确' : '❌ 回答错误'}
            </p>
            <p className="text-sm text-slate-300 mt-2">{drill.explanation}</p>
          </div>
        )}

        {showResult && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 mx-auto px-5 py-2 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30 text-sm hover:bg-amber-500/30"
          >
            下一题 <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// ========== 主组件 ==========
export function SentenceFactory() {
  const [activeTab, setActiveTab] = useState<FactoryTab>('drag');

  const tabs: { id: FactoryTab; label: string; icon: React.ReactNode; desc: string }[] = [
    { id: 'drag', label: '拖拽造句', icon: <Puzzle className="w-4 h-4" />, desc: '把词拖到正确槽位' },
    { id: 'expand', label: '句子扩展', icon: <Expand className="w-4 h-4" />, desc: '简单句→复杂句' },
    { id: 'drill', label: '句型特训', icon: <Target className="w-4 h-4" />, desc: '七种句型专项练' },
  ];

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">3</span>
          句子工厂
        </h2>
        <p className="text-sm text-slate-400 mt-1">从词到短语到句子，亲手构建英语句子</p>
      </div>

      {/* 子标签 */}
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border border-white/10 hover:border-white/20'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            <span className="text-[10px] text-slate-500 hidden sm:inline">{tab.desc}</span>
          </button>
        ))}
      </div>

      {/* 内容区 */}
      {activeTab === 'drag' && <DragSentenceBuilder />}
      {activeTab === 'expand' && <SentenceExpander />}
      {activeTab === 'drill' && <PatternDrills />}
    </div>
  );
}
