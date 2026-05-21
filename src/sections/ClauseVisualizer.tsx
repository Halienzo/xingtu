// ============================================
// Starry Starry Night - 从句拆解可视化
// 颜色高亮标注主句、从句、连接词
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Play, RotateCcw, ChevronDown, ChevronUp, BookOpen, Lightbulb } from 'lucide-react';
import { playClickSound } from '../utils/soundSystem';

interface ClausePart {
  text: string;
  type: 'main' | 'subordinate' | 'connector' | 'punctuation' | 'extra';
  explanation?: string;
}

interface Example {
  id: number;
  title: string;
  type: string;
  sentence: string;
  parts: ClausePart[];
  fullExplanation: string;
  translation: string;
  difficulty: 1 | 2 | 3;
}

const EXAMPLES: Example[] = [
  {
    id: 1,
    title: '状语从句（时间）',
    type: 'Adverbial Clause',
    sentence: 'When I was young, I lived in Beijing.',
    parts: [
      { text: 'When', type: 'connector', explanation: '从属连词（时间）' },
      { text: ' I was young', type: 'subordinate', explanation: '状语从句 - 时间' },
      { text: ',', type: 'punctuation', explanation: '从句在句首，后加逗号' },
      { text: ' I lived in Beijing', type: 'main', explanation: '主句' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'When引导时间状语从句在句首，后面必须用逗号与主句隔开。',
    translation: '当我年轻时，我住在北京。',
    difficulty: 1,
  },
  {
    id: 2,
    title: '定语从句（非限制性）',
    type: 'Relative Clause (Non-restrictive)',
    sentence: 'My brother, who lives in Beijing, is a doctor.',
    parts: [
      { text: 'My brother', type: 'main', explanation: '主句主语' },
      { text: ',', type: 'punctuation', explanation: '非限制性从句前逗号' },
      { text: 'who', type: 'connector', explanation: '关系代词' },
      { text: ' lives in Beijing', type: 'subordinate', explanation: '非限制性定语从句 - 附加信息（只有一个哥哥）' },
      { text: ',', type: 'punctuation', explanation: '非限制性从句后逗号（夹心饼干）' },
      { text: ' is a doctor', type: 'main', explanation: '主句谓语部分' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: '非限制性定语从句用逗号"夹住"，像夹心饼干。表示附加信息，暗示只有一个哥哥。',
    translation: '我哥哥（他住在北京）是一名医生。',
    difficulty: 1,
  },
  {
    id: 3,
    title: '定语从句（限制性）',
    type: 'Relative Clause (Restrictive)',
    sentence: 'The students who passed the exam were happy.',
    parts: [
      { text: 'The students', type: 'main', explanation: '主句主语' },
      { text: 'who', type: 'connector', explanation: '关系代词' },
      { text: ' passed the exam', type: 'subordinate', explanation: '限制性定语从句 - 限定范围（不是所有学生都通过了）' },
      { text: ' were happy', type: 'main', explanation: '主句谓语部分' },
      { text: '.', type: 'punctuation', explanation: '句号（无逗号！）' },
    ],
    fullExplanation: '限制性定语从句不用逗号，限定先行词的范围。暗示不是所有学生都通过了考试。',
    translation: '通过考试的学生们很高兴。',
    difficulty: 2,
  },
  {
    id: 4,
    title: '复合句（FANBOYS）',
    type: 'Compound Sentence',
    sentence: 'I was tired, so I went to bed.',
    parts: [
      { text: 'I was tired', type: 'main', explanation: '独立句1' },
      { text: ',', type: 'punctuation', explanation: 'FANBOYS前逗号' },
      { text: ' so', type: 'connector', explanation: 'FANBOYS连词' },
      { text: ' I went to bed', type: 'main', explanation: '独立句2' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'FANBOYS连词（so）连接两个独立句时，前面必须加逗号。',
    translation: '我累了，所以我去睡觉了。',
    difficulty: 1,
  },
  {
    id: 5,
    title: '复杂句（原因状语从句）',
    type: 'Complex Sentence',
    sentence: 'We stayed home because it was raining.',
    parts: [
      { text: 'We stayed home', type: 'main', explanation: '主句' },
      { text: ' because', type: 'connector', explanation: '从属连词（原因）' },
      { text: ' it was raining', type: 'subordinate', explanation: '原因状语从句（句尾无逗号！）' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: '状语从句在句尾时，通常不加逗号。与句首的用法不同！',
    translation: '我们待在家里，因为下雨了。',
    difficulty: 1,
  },
  {
    id: 6,
    title: '复合复杂句',
    type: 'Compound-Complex Sentence',
    sentence: 'When the bell rang, the students left, but the teacher stayed.',
    parts: [
      { text: 'When', type: 'connector', explanation: '从属连词（时间）' },
      { text: ' the bell rang', type: 'subordinate', explanation: '时间状语从句' },
      { text: ',', type: 'punctuation', explanation: '从句后逗号' },
      { text: ' the students left', type: 'main', explanation: '独立句1' },
      { text: ',', type: 'punctuation', explanation: 'FANBOYS前逗号' },
      { text: ' but', type: 'connector', explanation: 'FANBOYS连词' },
      { text: ' the teacher stayed', type: 'main', explanation: '独立句2' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: '复合复杂句：时间从句（逗号）+ FANBOYS连接两个独立句（逗号）。双重标点规则同时运用！',
    translation: '当铃声响起时，学生们离开了，但老师留了下来。',
    difficulty: 3,
  },
  {
    id: 7,
    title: '让步从句',
    type: 'Adverbial Clause (Concession)',
    sentence: 'Although it was raining, we went out.',
    parts: [
      { text: 'Although', type: 'connector', explanation: '从属连词（让步）' },
      { text: ' it was raining', type: 'subordinate', explanation: '让步状语从句' },
      { text: ',', type: 'punctuation', explanation: '从句后逗号（although在句首必加逗号）' },
      { text: ' we went out', type: 'main', explanation: '主句' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'Although引导的让步从句在句首时，逗号必须加。',
    translation: '虽然在下雨，我们还是出去了。',
    difficulty: 1,
  },
  {
    id: 8,
    title: '名词性从句（宾语从句）',
    type: 'Noun Clause (Object)',
    sentence: 'She asked if I liked English.',
    parts: [
      { text: 'She asked', type: 'main', explanation: '主句' },
      { text: ' if', type: 'connector', explanation: '从属连词（是否）' },
      { text: ' I liked English', type: 'subordinate', explanation: '宾语从句（间接疑问句，不用问号！）' },
      { text: '.', type: 'punctuation', explanation: '句号（不用问号）' },
    ],
    fullExplanation: '间接疑问句（if/whether引导的宾语从句）不用问号，用句号。',
    translation: '她问我是否喜欢英语。',
    difficulty: 2,
  },
  {
    id: 9,
    title: '分号连接（副词连接词）',
    type: 'Semicolon + Conjunctive Adverb',
    sentence: 'I like tea; however, I prefer coffee.',
    parts: [
      { text: 'I like tea', type: 'main', explanation: '独立句1' },
      { text: ';', type: 'punctuation', explanation: '分号（however是副词不是连词）' },
      { text: ' however', type: 'connector', explanation: '副词连接词（conjunctive adverb）' },
      { text: ',', type: 'punctuation', explanation: 'however后加逗号' },
      { text: ' I prefer coffee', type: 'main', explanation: '独立句2' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'However是副词不是连词，不能用逗号连接独立句。用分号或句号。however后面还要加逗号。',
    translation: '我喜欢茶；然而，我更喜欢咖啡。',
    difficulty: 2,
  },
  {
    id: 10,
    title: '同位语从句',
    type: 'Appositive Clause',
    sentence: 'The news that he had won surprised everyone.',
    parts: [
      { text: 'The news', type: 'main', explanation: '主句主语' },
      { text: ' that', type: 'connector', explanation: '从属连词（that引导同位语从句）' },
      { text: ' he had won', type: 'subordinate', explanation: '同位语从句（解释news的内容）' },
      { text: ' surprised everyone', type: 'main', explanation: '主句谓语部分' },
      { text: '.', type: 'punctuation', explanation: '句号（同位语从句前不加逗号！）' },
    ],
    fullExplanation: '同位语从句（that he had won）是对news内容的解释，前不加逗号。注意区分定语从句！',
    translation: '他获胜的消息让所有人惊讶。',
    difficulty: 3,
  },
  {
    id: 11,
    title: '名词性从句（主语从句）',
    type: 'Noun Clause (Subject)',
    sentence: 'What she needs is a chance to be heard.',
    parts: [
      { text: 'What', type: 'connector', explanation: '连接代词，引导主语从句' },
      { text: ' she needs', type: 'subordinate', explanation: '主语从句，整体作主语' },
      { text: ' is', type: 'main', explanation: '主句谓语' },
      { text: ' a chance to be heard', type: 'main', explanation: '表语' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: '主语从句整体站在主语位置，可以先理解为“她需要的东西”。从句内部仍然用陈述语序。',
    translation: '她需要的是一个被倾听的机会。',
    difficulty: 2,
  },
  {
    id: 12,
    title: '名词性从句（表语从句）',
    type: 'Noun Clause (Predicative)',
    sentence: 'The truth is that he is trying his best.',
    parts: [
      { text: 'The truth', type: 'main', explanation: '主语' },
      { text: ' is', type: 'main', explanation: '系动词' },
      { text: ' that', type: 'connector', explanation: '连接词，引导表语从句' },
      { text: ' he is trying his best', type: 'subordinate', explanation: '表语从句，解释truth的内容' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: '表语从句放在系动词后，解释主语到底是什么内容。The reason is that... 是考试常见结构。',
    translation: '事实是他正在尽最大努力。',
    difficulty: 2,
  },
  {
    id: 13,
    title: '条件状语从句',
    type: 'Adverbial Clause (Condition)',
    sentence: 'If you keep trying, you will find your voice.',
    parts: [
      { text: 'If', type: 'connector', explanation: '从属连词（条件）' },
      { text: ' you keep trying', type: 'subordinate', explanation: '条件状语从句' },
      { text: ',', type: 'punctuation', explanation: '从句在句首，后加逗号' },
      { text: ' you will find your voice', type: 'main', explanation: '主句' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'If引导条件状语从句。中考高频规则是“主将从现”：主句用will，从句用一般现在时。',
    translation: '如果你继续尝试，你会找到自己的声音。',
    difficulty: 1,
  },
  {
    id: 14,
    title: '目的状语从句',
    type: 'Adverbial Clause (Purpose)',
    sentence: 'I speak slowly so that everyone can follow me.',
    parts: [
      { text: 'I speak slowly', type: 'main', explanation: '主句' },
      { text: ' so that', type: 'connector', explanation: '从属连词（目的）' },
      { text: ' everyone can follow me', type: 'subordinate', explanation: '目的状语从句' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'so that引导目的状语从句，表示“为了/以便”。从句里常出现can/could/may/might。',
    translation: '我说慢一点，以便每个人都能跟上我。',
    difficulty: 1,
  },
  {
    id: 15,
    title: '结果状语从句',
    type: 'Adverbial Clause (Result)',
    sentence: 'The words were so warm that I read them again.',
    parts: [
      { text: 'The words were', type: 'main', explanation: '主句主语和系动词' },
      { text: ' so warm', type: 'extra', explanation: 'so + 形容词，表示程度' },
      { text: ' that', type: 'connector', explanation: '从属连词（结果）' },
      { text: ' I read them again', type: 'subordinate', explanation: '结果状语从句' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'so + adj./adv. + that 表示“如此……以至于……”。such + 名词短语 + that 是另一组常考结构。',
    translation: '那些话如此温暖，以至于我又读了一遍。',
    difficulty: 2,
  },
  {
    id: 16,
    title: '比较状语从句',
    type: 'Adverbial Clause (Comparison)',
    sentence: 'I am braver than I was yesterday.',
    parts: [
      { text: 'I am braver', type: 'main', explanation: '主句，含比较级' },
      { text: ' than', type: 'connector', explanation: '比较连接词' },
      { text: ' I was yesterday', type: 'subordinate', explanation: '比较状语从句' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'than/as...as引导比较状语从句。比较对象要平行，这里比较的是“今天的我”和“昨天的我”。',
    translation: '我比昨天的自己更勇敢。',
    difficulty: 2,
  },
  {
    id: 17,
    title: '方式状语从句',
    type: 'Adverbial Clause (Manner)',
    sentence: 'She listened as if she understood my silence.',
    parts: [
      { text: 'She listened', type: 'main', explanation: '主句' },
      { text: ' as if', type: 'connector', explanation: '从属连词（方式/样子）' },
      { text: ' she understood my silence', type: 'subordinate', explanation: '方式状语从句' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'as if/as though表示“好像”。它可以描述真实感受，也可以描述假设的情景。',
    translation: '她听着，好像理解了我的沉默。',
    difficulty: 2,
  },
  {
    id: 18,
    title: '地点状语从句',
    type: 'Adverbial Clause (Place)',
    sentence: 'Wherever you sit, keep your notebook open.',
    parts: [
      { text: 'Wherever', type: 'connector', explanation: '从属连词（地点）' },
      { text: ' you sit', type: 'subordinate', explanation: '地点状语从句' },
      { text: ',', type: 'punctuation', explanation: '从句在句首，后加逗号' },
      { text: ' keep your notebook open', type: 'main', explanation: '主句（祈使句）' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'where/wherever引导地点状语从句，修饰整个动作发生的位置；如果where修饰前面的地点名词，则更可能是定语从句。',
    translation: '无论你坐在哪里，都把笔记本打开。',
    difficulty: 2,
  },
  {
    id: 19,
    title: '倒装长句（Only when）',
    type: 'Inversion + Adverbial Clause',
    sentence: 'Only when I stopped pretending did I feel truly seen.',
    parts: [
      { text: 'Only when', type: 'connector', explanation: 'Only + 时间状语从句，触发主句倒装' },
      { text: ' I stopped pretending', type: 'subordinate', explanation: '时间状语从句，内部保持陈述语序' },
      { text: ' did I feel', type: 'main', explanation: '主句部分倒装：did + 主语 + 动词原形' },
      { text: ' truly seen', type: 'extra', explanation: '表语补足情绪状态' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: 'Only 修饰时间状语从句并放到句首时，倒装发生在后面的主句，而不是 when 从句内部。',
    translation: '只有当我停止假装时，我才真正觉得自己被看见。',
    difficulty: 3,
  },
  {
    id: 20,
    title: '独立主格（伴随背景）',
    type: 'Absolute Construction',
    sentence: 'His hands trembling, he opened the letter, hoping someone had understood him.',
    parts: [
      { text: 'His hands trembling', type: 'extra', explanation: '独立主格：逻辑主语 his hands + doing，说明伴随状态' },
      { text: ',', type: 'punctuation', explanation: '独立主格后用逗号隔开' },
      { text: ' he opened the letter', type: 'main', explanation: '主句主干' },
      { text: ',', type: 'punctuation', explanation: '非谓语伴随前的逗号' },
      { text: ' hoping', type: 'extra', explanation: '现在分词作伴随状语' },
      { text: ' someone had understood him', type: 'subordinate', explanation: '宾语从句，作 hoping 的内容' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: '这个长句先用独立主格给出画面，再用主句推进动作，最后用 hoping + 宾语从句写出内心愿望。',
    translation: '他手发抖地打开那封信，希望终于有人理解了他。',
    difficulty: 3,
  },
  {
    id: 21,
    title: '综合长难句（主干优先）',
    type: 'Long Sentence Decomposition',
    sentence: 'The girl who had felt invisible for years smiled when her teacher said that her voice mattered.',
    parts: [
      { text: 'The girl', type: 'main', explanation: '主句主语核心' },
      { text: ' who', type: 'connector', explanation: '关系代词，引导定语从句' },
      { text: ' had felt invisible for years', type: 'subordinate', explanation: '定语从句，修饰 the girl' },
      { text: ' smiled', type: 'main', explanation: '主句谓语，主干是 The girl smiled' },
      { text: ' when', type: 'connector', explanation: '时间连接词' },
      { text: ' her teacher said', type: 'subordinate', explanation: '时间状语从句的主干' },
      { text: ' that', type: 'connector', explanation: '引导宾语从句' },
      { text: ' her voice mattered', type: 'subordinate', explanation: '宾语从句，说明老师说的内容' },
      { text: '.', type: 'punctuation', explanation: '句号' },
    ],
    fullExplanation: '先抓主干 The girl smiled，再拆 who 定语从句、when 时间状语从句和 that 宾语从句。长句的情绪线是“长期不被看见”到“声音重要”。',
    translation: '那个多年来觉得自己不被看见的女孩，在老师说她的声音很重要时笑了。',
    difficulty: 3,
  },
];

const TYPE_COLORS = {
  main: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30', label: '主句' },
  subordinate: { bg: 'bg-violet-500/20', text: 'text-violet-400', border: 'border-violet-500/30', label: '从句' },
  connector: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30', label: '连接词' },
  punctuation: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', border: 'border-cyan-500/30', label: '标点' },
  extra: { bg: 'bg-slate-500/20', text: 'text-slate-400', border: 'border-slate-500/30', label: '其他' },
};

export default function ClauseVisualizer() {
  const [selectedExample, setSelectedExample] = useState<Example | null>(null);
  const [showLegend, setShowLegend] = useState(true);
  const [difficultyFilter, setDifficultyFilter] = useState<number | null>(null);

  const filtered = difficultyFilter
    ? EXAMPLES.filter(e => e.difficulty === difficultyFilter)
    : EXAMPLES;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Eye className="text-amber-400" size={22} />
          从句拆解可视化
        </h2>
        <p className="text-slate-400 text-sm">颜色高亮标注主句、从句和连接词，直观理解英文句子结构</p>
      </div>

      {/* 颜色图例 */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 p-3 rounded-xl bg-slate-800/50 border border-slate-700"
      >
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="flex items-center gap-2 text-white font-semibold text-sm mb-2 w-full"
        >
          <BookOpen size={14} className="text-amber-400" />
          颜色图例
          {showLegend ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        <AnimatePresence>
          {showLegend && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex flex-wrap gap-3 overflow-hidden"
            >
              {Object.entries(TYPE_COLORS).map(([key, colors]) => (
                <div key={key} className="flex items-center gap-1.5">
                  <span className={`px-2 py-0.5 rounded ${colors.bg} ${colors.text} text-xs font-medium border ${colors.border}`}>
                    {colors.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 难度筛选 */}
      <div className="flex gap-2 mb-4">
        {[
          { label: '全部', value: null },
          { label: '基础', value: 1 },
          { label: '进阶', value: 2 },
          { label: '挑战', value: 3 },
        ].map(f => (
          <motion.button
            key={String(f.value)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setDifficultyFilter(f.value); setSelectedExample(null); playClickSound(); }}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              difficultyFilter === f.value
                ? 'bg-amber-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* 例句列表 */}
      {!selectedExample ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-3"
        >
          {filtered.map((example, i) => (
            <motion.button
              key={example.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setSelectedExample(example); playClickSound(); }}
              className="text-left p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/40 transition-all group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  example.difficulty === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                  example.difficulty === 2 ? 'bg-amber-500/20 text-amber-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {example.difficulty === 1 ? '基础' : example.difficulty === 2 ? '进阶' : '挑战'}
                </span>
                <span className="text-xs text-slate-500">{example.type}</span>
              </div>
              <h3 className="text-white font-semibold text-sm mb-1">{example.title}</h3>
              <p className="text-slate-400 text-xs">{example.sentence}</p>
              <div className="flex items-center gap-1 mt-2 text-amber-400 text-xs group-hover:text-amber-300">
                <Play size={12} />
                点击查看拆解
              </div>
            </motion.button>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* 返回按钮 */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedExample(null)}
            className="flex items-center gap-2 text-slate-400 hover:text-amber-400 text-sm mb-4 transition-colors"
          >
            <RotateCcw size={14} />
            返回列表
          </motion.button>

          {/* 例句卡片 */}
          <div className="p-6 rounded-2xl bg-slate-800/80 border border-amber-500/20 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                selectedExample.difficulty === 1 ? 'bg-emerald-500/20 text-emerald-400' :
                selectedExample.difficulty === 2 ? 'bg-amber-500/20 text-amber-400' :
                'bg-red-500/20 text-red-400'
              }`}>
                {selectedExample.difficulty === 1 ? '基础' : selectedExample.difficulty === 2 ? '进阶' : '挑战'}
              </span>
              <h3 className="text-white font-bold text-lg">{selectedExample.title}</h3>
            </div>

            {/* 彩色拆解句子 */}
            <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700 mb-4">
              <p className="text-sm leading-loose flex flex-wrap gap-0.5">
                <AnimatePresence>
                  {selectedExample.parts.map((part, i) => {
                    const colors = TYPE_COLORS[part.type];
                    return (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 10, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
                        className={`inline-flex items-center ${colors.bg} ${colors.text} px-1.5 py-0.5 rounded border ${colors.border} cursor-help relative group/part`}
                        title={part.explanation}
                      >
                        {part.text}
                        {/* 悬浮提示 */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded-lg opacity-0 group-hover/part:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 border border-slate-700">
                          <span className={`font-semibold ${colors.text}`}>{colors.label}</span>
                          <br />
                          {part.explanation}
                        </div>
                      </motion.span>
                    );
                  })}
                </AnimatePresence>
              </p>
            </div>

            {/* 逐词解析 */}
            <div className="space-y-2 mb-4">
              <h4 className="text-white font-semibold text-sm flex items-center gap-2">
                <Eye size={14} className="text-amber-400" />
                逐部分解析
              </h4>
              {selectedExample.parts.map((part, i) => {
                const colors = TYPE_COLORS[part.type];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3 p-2 rounded-lg bg-slate-900/30"
                  >
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                      {colors.label}
                    </span>
                    <code className={`text-sm font-mono ${colors.text}`}>{part.text}</code>
                    <span className="text-slate-500 text-xs">{part.explanation}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* 完整解析 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 mb-3"
            >
              <div className="flex items-center gap-2 text-amber-400 text-sm font-semibold mb-1">
                <Lightbulb size={14} />
                规则解析
              </div>
              <p className="text-amber-300/80 text-sm">{selectedExample.fullExplanation}</p>
            </motion.div>

            {/* 翻译 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="text-slate-400 text-sm"
            >
              <span className="text-slate-500">翻译：</span>{selectedExample.translation}
            </motion.div>
          </div>

          {/* 快速跳转 */}
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.filter(e => e.id !== selectedExample.id).slice(0, 4).map(e => (
              <motion.button
                key={e.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedExample(e)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs border border-slate-700 hover:border-amber-500/40 transition-colors"
              >
                {e.title}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
