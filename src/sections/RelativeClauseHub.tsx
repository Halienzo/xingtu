// ============================================
// 星图 - 从句系统深化模块
// 名词性从句 | 定语从句 | 状语从句 | that/which区别 | 同位语从句
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, AlertTriangle, Lightbulb, ChevronRight, CheckCircle } from 'lucide-react';

// ========== that/which 使用场景对照 ==========
const THAT_VS_WHICH = {
  onlyThat: [
    { rule: '先行词是 all/everything/nothing/anything/little/much', example: 'All that glitters is not gold.', cn: '闪光的未必都是金子。' },
    { rule: '先行词被序数词修饰（the first/second...）', example: 'This is the first book that I bought.', cn: '这是我买的第一本书。' },
    { rule: '先行词被最高级修饰', example: 'He is the best player that I have ever seen.', cn: '他是我见过最棒的选手。' },
    { rule: '先行词既有人又有物', example: 'The writer and his works that I know are famous.', cn: '我认识的那位作家和他的作品都很有名。' },
    { rule: '先行词被 the only/the very/the same 修饰', example: 'This is the only pen that I have.', cn: '这是我唯一的一支笔。' },
  ],
  onlyWhich: [
    { rule: '非限制性定语从句（有逗号）', example: 'My car, which is very old, broke down.', cn: '我的车（很旧了）抛锚了。', note: 'that不能用于非限制性从句！' },
    { rule: '介词后', example: 'The pen with which I write is red.', cn: '我用来写字的那支笔是红色的。', note: 'that前不能加介词！' },
    { rule: '整句作先行词（which指代整个句子）', example: 'He failed the exam, which made his parents angry.', cn: '他考试不及格，这让他的父母很生气。', note: 'which可以指代整个句子，that不行' },
  ],
  both: [
    { rule: '限制性定语从句（先行词为物）', example: 'The book that/which I bought is interesting.', cn: '我买的那本书很有趣。' },
  ],
};

// ========== 同位语从句 vs 定语从句 ==========
const APPOSITIVE_VS_RELATIVE = [
  {
    aspect: '功能',
    appositive: '解释说明先行词（抽象名词）的内容',
    relative: '修饰限定先行词',
    exampleAppositive: 'The news that he won surprised us.\n（他获胜这个消息让我们惊讶——解释news的内容）',
    exampleRelative: 'The news that he told me surprised us.\n（他告诉我的那个消息让我们惊讶——限定哪个news）',
  },
  {
    aspect: 'that的作用',
    appositive: 'that只起连接作用，不在从句中充当任何成分',
    relative: 'that在从句中充当主语、宾语等成分',
    exampleAppositive: 'The fact that he is honest is true.\n（he is honest 是完整句子，that不做成分）',
    exampleRelative: 'The fact that he mentioned is true.\n（that在从句中做mentioned的宾语）',
  },
  {
    aspect: 'that是否可省略',
    appositive: 'that一般不可省略',
    relative: 'that在从句中做宾语时可以省略',
    exampleAppositive: 'I believe the idea that we should help.\n（不可省略that）',
    exampleRelative: 'I believe the idea (that) he mentioned.\n（that做宾语可省）',
  },
  {
    aspect: '先行词类型',
    appositive: '只能是抽象名词（news/fact/idea/hope/belief等）',
    relative: '可以是任何名词（人或物，具体或抽象）',
    exampleAppositive: 'The hope that he will come keeps me alive.',
    exampleRelative: 'The man that came here is my teacher.',
  },
  {
    aspect: '是否可用which',
    appositive: '同位语从句一般不用which',
    relative: '定语从句可用which（非限制性）',
    exampleAppositive: 'The idea that he is right...\n（不能用which）',
    exampleRelative: 'The idea, which he mentioned,...\n（可用which）',
  },
];

// ========== 方位介词 + which = where ==========
const PREP_WHICH_WHERE = [
  { prep: 'in which', where: 'where', example: 'This is the house in which I lived. = This is the house where I lived.', cn: '这是我住过的房子。' },
  { prep: 'at which', where: 'where', example: 'The school at which I studied is big. = The school where I studied is big.', cn: '我就读的学校很大。' },
  { prep: 'on which', where: 'where', example: 'The table on which I put my book is clean. = The table where I put my book is clean.', cn: '我放书的那张桌子很干净。' },
  { prep: 'to which', where: 'where', example: 'The city to which we are going is beautiful. = The city where we are going is beautiful.', cn: '我们要去的城市很美。' },
  { prep: 'from which', where: 'where', example: 'The park from which I came is nearby. = The park where I came from is nearby.', cn: '我来的那个公园就在附近。' },
  { prep: 'under which', where: 'where', example: 'The tree under which I sat is tall. = The tree where I sat is tall.', cn: '我坐的那棵树下（那棵树）很高。' },
];

const CLAUSE_FAMILY = [
  {
    family: '名词性从句',
    idea: '整个从句像一个名词，可以做主语、宾语、表语或同位语。',
    color: 'cyan',
    items: [
      { type: '主语从句', structure: 'That / Whether / What ... + 谓语', example: 'What you said matters.', cn: '你说的话很重要。', key: '从句站在主语位置，后面接主句谓语。' },
      { type: '宾语从句', structure: '动词 + that/if/whether/疑问词 + 陈述语序', example: 'I wonder whether he will come.', cn: '我想知道他是否会来。', key: '间接疑问句用陈述语序，不用问号。' },
      { type: '表语从句', structure: 'be / seem / look + that/why/because/as if ...', example: 'The truth is that he needs help.', cn: '事实是他需要帮助。', key: '从句放在系动词后解释主语内容。' },
      { type: '同位语从句', structure: '抽象名词 + that/whether/how ...', example: 'The idea that we should start early is wise.', cn: '我们应该早点开始这个想法很明智。', key: '从句解释抽象名词内容，不修饰范围。' },
    ],
  },
  {
    family: '定语从句',
    idea: '整个从句像形容词，放在名词后面说明“哪一个”。',
    color: 'amber',
    items: [
      { type: '限制性定语从句', structure: '先行词 + who/that/which/whose/where/when/why ...', example: 'The girl who sits near me is kind.', cn: '坐在我旁边的女孩很友善。', key: '没有它意思不完整，不用逗号。' },
      { type: '非限制性定语从句', structure: '先行词, who/which/where/when ...,', example: 'Kunming, which is warm, is beautiful.', cn: '昆明很温暖，也很美。', key: '补充说明，用逗号夹住，不能用 that。' },
      { type: '介词 + 关系代词', structure: 'prep + which/whom', example: 'This is the room in which I studied.', cn: '这是我学习过的房间。', key: '介词后不用 that；地点常可换成 where。' },
      { type: '关系副词从句', structure: 'where / when / why', example: 'I remember the day when we met.', cn: '我记得我们相遇的那一天。', key: 'where 表地点，when 表时间，why 表原因。' },
    ],
  },
  {
    family: '状语从句',
    idea: '整个从句像副词，说明时间、原因、条件、让步、目的、结果等关系。',
    color: 'emerald',
    items: [
      { type: '时间状语从句', structure: 'when / while / before / after / until / as soon as', example: 'When I feel nervous, I take a deep breath.', cn: '当我紧张时，我深呼吸。', key: '从句在句首通常加逗号。' },
      { type: '原因状语从句', structure: 'because / since / as', example: 'I stayed because my friend needed me.', cn: '我留下来，因为朋友需要我。', key: 'because 直接说明原因；since/as 更偏已知原因。' },
      { type: '条件状语从句', structure: 'if / unless / as long as', example: 'If you try again, you may find a way.', cn: '如果你再试一次，也许会找到办法。', key: '主将从现：If it rains tomorrow, we will stay home.' },
      { type: '让步状语从句', structure: 'although / though / even if / while', example: 'Although it is hard, I will keep going.', cn: '虽然很难，我仍会继续。', key: 'although 不和 but 连用。' },
      { type: '目的状语从句', structure: 'so that / in order that', example: 'I speak slowly so that everyone can follow.', cn: '我说慢一点，好让大家跟上。', key: '常和 can/could/may/might 连用。' },
      { type: '结果状语从句', structure: 'so ... that / such ... that', example: 'He was so tired that he fell asleep.', cn: '他太累了，所以睡着了。', key: 'so 修饰形容词/副词，such 修饰名词短语。' },
      { type: '比较状语从句', structure: 'than / as ... as', example: 'She reads faster than I do.', cn: '她读得比我快。', key: '比较对象要平行。' },
      { type: '方式状语从句', structure: 'as / as if / as though', example: 'He talks as if he knows the answer.', cn: '他说话像知道答案一样。', key: 'as if 可表达真实或假设。' },
      { type: '地点状语从句', structure: 'where / wherever', example: 'You can sit wherever you feel comfortable.', cn: '你觉得哪里舒服就坐哪里。', key: '不是修饰名词时，它是地点状语从句。' },
    ],
  },
];

const NOUN_CLAUSE_DETAILS = [
  {
    type: '主语从句',
    role: '整个从句站在主语位置，回答“什么事情/谁/是否……”。',
    connectors: ['That', 'Whether', 'What', 'Who', 'Why', 'How'],
    structure: '连接词 + 完整从句 + 主句谓语',
    example: 'What she needs is a quiet chance to explain herself.',
    cn: '她需要的是一个安静解释自己的机会。',
    examPoint: '主语从句作主语时，谓语通常按单数处理：What he said is true.',
    mistake: '不要把疑问语序搬进主语从句：What does he want is... 是错的。',
  },
  {
    type: '宾语从句',
    role: '整个从句站在动词、介词或形容词后，回答“知道/相信/担心/确定什么”。',
    connectors: ['that', 'if', 'whether', 'what', 'where', 'when', 'why', 'how'],
    structure: '主句 + 谓语 + 连接词 + 陈述语序',
    example: 'I wonder whether my effort will be seen one day.',
    cn: '我想知道我的努力是否有一天会被看见。',
    examPoint: '中考高频：宾语从句必须用陈述语序，Can you tell me where he lives?',
    mistake: 'whether 可与 or not 连用；介词后通常不用 if。',
  },
  {
    type: '表语从句',
    role: '放在系动词后，解释主语的内容、原因、感觉或状态。',
    connectors: ['that', 'because', 'why', 'whether', 'as if', 'as though'],
    structure: '主语 + be/seem/look/sound + 连接词 + 从句',
    example: 'The truth is that many quiet students are trying very hard.',
    cn: '事实是，很多安静的学生都在非常努力。',
    examPoint: 'The reason is that... 不用 because；That is because... 可以解释原因。',
    mistake: 'reason 后表语从句常用 that，不写 The reason is because...',
  },
  {
    type: '同位语从句',
    role: '解释抽象名词的具体内容，不是限定“哪一个名词”。',
    connectors: ['that', 'whether', 'how', 'why'],
    structure: '抽象名词 + 连接词 + 完整从句',
    example: 'The belief that I am not alone gives me courage.',
    cn: '“我并不孤单”这个信念给了我勇气。',
    examPoint: '常跟 fact, idea, news, hope, belief, possibility, suggestion 等抽象名词。',
    mistake: '同位语从句中的 that 不作成分；定语从句里的 that 要在从句中作主语或宾语。',
  },
];

const ADVERBIAL_CLAUSE_DETAILS = [
  {
    type: '时间状语从句',
    connectors: ['when', 'while', 'before', 'after', 'until', 'as soon as', 'since'],
    logic: '说明主句动作发生的时间。',
    example: 'When I feel unseen, I write down one thing I did well.',
    cn: '当我觉得不被看见时，我写下一件自己做得好的事。',
    examPoint: '主将从现：As soon as he comes, I will tell you.',
    punctuation: '从句在句首，一般加逗号；从句在句尾，通常不加逗号。',
  },
  {
    type: '原因状语从句',
    connectors: ['because', 'since', 'as'],
    logic: '说明为什么发生主句动作。',
    example: 'I kept practicing because I wanted to be understood.',
    cn: '我坚持练习，因为我想被理解。',
    examPoint: 'because 回答直接原因；because of 后接名词或短语，不接完整句子。',
    punctuation: 'because 从句在句尾通常不加逗号。',
  },
  {
    type: '条件状语从句',
    connectors: ['if', 'unless', 'as long as', 'provided that'],
    logic: '说明主句成立需要什么条件。',
    example: 'If you keep speaking, your voice will become clearer.',
    cn: '如果你持续表达，你的声音会变得更清楚。',
    examPoint: 'if/unless 条件句也常考主将从现。',
    punctuation: '条件从句在句首加逗号；unless = if not。',
  },
  {
    type: '让步状语从句',
    connectors: ['although', 'though', 'even if', 'even though', 'while', 'however'],
    logic: '承认困难或反差，但主句仍成立。',
    example: 'Although I am quiet, I still have a bright inner world.',
    cn: '虽然我很安静，我仍然有明亮的内心世界。',
    examPoint: 'although/though 不和 but 连用。',
    punctuation: '让步从句在句首通常加逗号。',
  },
  {
    type: '目的状语从句',
    connectors: ['so that', 'in order that'],
    logic: '说明做某事是为了达到什么目的。',
    example: 'I speak slowly so that my classmates can follow me.',
    cn: '我说慢一点，以便同学们能跟上我。',
    examPoint: '常与 can/could/may/might 连用。',
    punctuation: '目的从句在句尾通常不加逗号。',
  },
  {
    type: '结果状语从句',
    connectors: ['so ... that', 'such ... that'],
    logic: '说明程度太高，所以产生结果。',
    example: 'The note was so warm that I read it again and again.',
    cn: '那张便条如此温暖，以至于我读了一遍又一遍。',
    examPoint: 'so 修饰形容词/副词；such 修饰名词短语。',
    punctuation: '结果从句通常紧跟在程度结构后。',
  },
  {
    type: '比较状语从句',
    connectors: ['than', 'as ... as', 'not as/so ... as'],
    logic: '比较两个对象在某方面的程度。',
    example: 'I am stronger than I was yesterday.',
    cn: '我比昨天的自己更坚强。',
    examPoint: '比较对象要平行：than I did / than before。',
    punctuation: '比较从句一般不单独加逗号。',
  },
  {
    type: '方式状语从句',
    connectors: ['as', 'as if', 'as though'],
    logic: '说明动作以什么方式发生，或看起来像什么。',
    example: 'She smiled as if she understood my silence.',
    cn: '她笑了，好像理解了我的沉默。',
    examPoint: 'as if 可表达真实感觉，也可表达假设。',
    punctuation: 'as if 从句常跟在 look/seem/sound/feel 后。',
  },
  {
    type: '地点状语从句',
    connectors: ['where', 'wherever'],
    logic: '说明主句动作发生在什么地方或任何地方。',
    example: 'Wherever you study, keep a small light for yourself.',
    cn: '无论你在哪里学习，都为自己留一盏小灯。',
    examPoint: 'where 若修饰前面的地点名词，多为定语从句；若修饰整个动作，多为地点状语从句。',
    punctuation: '地点从句在句首常加逗号。',
  },
];

const TABS = [
  { key: 'overview', label: '从句总览', icon: Lightbulb },
  { key: 'noun', label: '名词性从句', icon: BookOpen },
  { key: 'adverbial', label: '状语从句', icon: AlertTriangle },
  { key: 'thatwhich', label: 'that vs which', icon: Search },
  { key: 'appositive', label: '同位语从句', icon: BookOpen },
  { key: 'prepwhich', label: '介词+which=where', icon: ChevronRight },
];

export default function RelativeClauseHub() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* 标题 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
        <h1 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Search className="text-amber-400" size={22} />
          从句系统深度解析
        </h1>
        <p className="text-slate-400 text-sm">名词性从句、定语从句、状语从句，以及 that/which、同位语、介词+which 的中考高频辨析</p>
      </motion.div>

      {/* Tab */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {TABS.map(tab => (
          <motion.button
            key={tab.key}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.key
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/20'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <tab.icon size={14} />
            {tab.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ========== 从句总览 ========== */}
        {activeTab === 'overview' && (
          <motion.div key="overview" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            {CLAUSE_FAMILY.map(group => (
              <div key={group.family} className="rounded-2xl border border-slate-700 bg-slate-800/45 p-5">
                <div className="mb-4">
                  <h3 className="text-xl font-black text-white">{group.family}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-400">{group.idea}</p>
                </div>
                <div className="grid gap-3 md:grid-cols-2">
                  {group.items.map((item, index) => (
                    <motion.div
                      key={item.type}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="rounded-xl border border-slate-700/70 bg-slate-950/35 p-4"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <span className="rounded-full border border-amber-300/25 bg-amber-300/10 px-2 py-0.5 text-[10px] font-black text-amber-200">{item.type}</span>
                      </div>
                      <p className="text-xs font-mono text-cyan-200/80">{item.structure}</p>
                      <p className="mt-3 text-sm font-semibold leading-relaxed text-white">{item.example}</p>
                      <p className="mt-1 text-xs text-slate-500">{item.cn}</p>
                      <p className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-xs leading-relaxed text-slate-300">{item.key}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ========== 名词性从句 ========== */}
        {activeTab === 'noun' && (
          <motion.div key="noun" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 to-slate-800/50 p-5">
              <h3 className="text-lg font-black text-cyan-200">名词性从句的核心判断</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                如果一个从句整体能替换成“这件事 / 这个问题 / 这个事实”，并在句中充当主语、宾语、表语或同位语，它就是名词性从句。先判断它站在哪个句子位置，再看连接词是否表达“是否、什么、谁、哪里、为什么、怎样”。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {NOUN_CLAUSE_DETAILS.map((item, index) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl border border-slate-700 bg-slate-800/45 p-5"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-lg font-black text-white">{item.type}</h3>
                    <span className="rounded-full bg-cyan-400/10 px-2 py-1 text-[10px] font-black text-cyan-200">NOUN CLAUSE</span>
                  </div>
                  <p className="text-sm leading-relaxed text-slate-300">{item.role}</p>
                  <p className="mt-3 rounded-lg bg-slate-950/50 px-3 py-2 text-xs font-mono text-cyan-100">{item.structure}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.connectors.map(connector => (
                      <span key={connector} className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-bold text-cyan-100">{connector}</span>
                    ))}
                  </div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed text-white">{item.example}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.cn}</p>
                  <p className="mt-4 rounded-xl border border-amber-300/15 bg-amber-300/10 px-3 py-2 text-xs leading-relaxed text-amber-100">{item.examPoint}</p>
                  <p className="mt-2 text-xs leading-relaxed text-red-200/80">易错：{item.mistake}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========== 状语从句 ========== */}
        {activeTab === 'adverbial' && (
          <motion.div key="adverbial" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
            <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/10 to-slate-800/50 p-5">
              <h3 className="text-lg font-black text-emerald-200">状语从句的核心判断</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                状语从句不是“一个词”，而是一整段关系说明。它告诉主句：什么时候、为什么、在什么条件下、虽然怎样、为了什么、结果怎样、比较怎样、像什么方式、在哪里发生。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {ADVERBIAL_CLAUSE_DETAILS.map((item, index) => (
                <motion.div
                  key={item.type}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="rounded-2xl border border-slate-700 bg-slate-800/45 p-4"
                >
                  <div className="mb-3">
                    <h3 className="text-base font-black text-white">{item.type}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{item.logic}</p>
                  </div>
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {item.connectors.map(connector => (
                      <span key={connector} className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2 py-0.5 text-[10px] font-bold text-emerald-100">{connector}</span>
                    ))}
                  </div>
                  <p className="text-sm font-semibold leading-relaxed text-white">{item.example}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.cn}</p>
                  <p className="mt-3 rounded-lg bg-slate-950/50 px-3 py-2 text-xs leading-relaxed text-emerald-100">{item.examPoint}</p>
                  <p className="mt-2 text-xs leading-relaxed text-amber-100/80">标点：{item.punctuation}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ========== that vs which ========== */}
        {activeTab === 'thatwhich' && (
          <motion.div key="thatwhich" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            {/* 只能用that */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-amber-500/20">
              <h3 className="text-amber-400 font-bold text-lg mb-3 flex items-center gap-2">
                <CheckCircle size={18} />
                只能用 that 的5种情况
              </h3>
              <div className="space-y-3">
                {THAT_VS_WHICH.onlyThat.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <div className="flex items-start gap-2">
                      <span className="text-amber-400 font-bold text-sm shrink-0">{i + 1}.</span>
                      <div>
                        <p className="text-white text-sm font-medium mb-1">{item.rule}</p>
                        <p className="text-amber-300/80 text-sm font-mono">{item.example}</p>
                        <p className="text-slate-500 text-xs mt-1">{item.cn}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 只能用which */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-emerald-500/20">
              <h3 className="text-emerald-400 font-bold text-lg mb-3 flex items-center gap-2">
                <AlertTriangle size={18} />
                只能用 which 的3种情况
              </h3>
              <div className="space-y-3">
                {THAT_VS_WHICH.onlyWhich.map((item, i) => (
                  <div key={i} className="p-3 rounded-xl bg-slate-900/50 border border-slate-700/50">
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold text-sm shrink-0">{i + 1}.</span>
                      <div>
                        <p className="text-white text-sm font-medium mb-1">{item.rule}</p>
                        <p className="text-emerald-300/80 text-sm font-mono">{item.example}</p>
                        <p className="text-slate-500 text-xs mt-1">{item.cn}</p>
                        {item.note && (
                          <p className="text-red-400 text-xs mt-1 font-medium">{item.note}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 两者皆可 */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-600/30">
              <h3 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
                <Lightbulb size={18} className="text-amber-400" />
                that / which 两者皆可
              </h3>
              <p className="text-slate-400 text-sm mb-2">{THAT_VS_WHICH.both[0].rule}</p>
              <p className="text-amber-300/80 text-sm font-mono">{THAT_VS_WHICH.both[0].example}</p>
              <p className="text-slate-500 text-xs mt-1">{THAT_VS_WHICH.both[0].cn}</p>
            </div>
          </motion.div>
        )}

        {/* ========== 同位语从句 ========== */}
        {activeTab === 'appositive' && (
          <motion.div key="appositive" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/5 to-slate-800/50 border border-amber-500/20">
              <h3 className="text-amber-400 font-bold text-lg mb-2">什么是同位语从句？</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                同位语从句是对前面某个抽象名词的内容进行解释说明的从句。它与定语从句看起来很像（都有that），但功能和结构完全不同。
              </p>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-amber-500/10">
                <p className="text-white text-sm font-mono">The news <span className="text-amber-400">that he won</span> surprised us.</p>
                <p className="text-amber-400/60 text-xs mt-1">that he won = 同位语从句，解释the news的内容</p>
              </div>
            </div>

            {/* 对比表格 */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-amber-500/20">
                    <th className="text-left py-2 px-3 text-amber-400 font-semibold">对比维度</th>
                    <th className="text-left py-2 px-3 text-emerald-400 font-semibold">同位语从句</th>
                    <th className="text-left py-2 px-3 text-violet-400 font-semibold">定语从句</th>
                  </tr>
                </thead>
                <tbody>
                  {APPOSITIVE_VS_RELATIVE.map((row, i) => (
                    <tr key={i} className="border-b border-slate-700/30">
                      <td className="py-3 px-3 text-white font-medium whitespace-nowrap">{row.aspect}</td>
                      <td className="py-3 px-3 text-slate-300">
                        <p>{row.appositive}</p>
                        <p className="text-emerald-400/60 text-xs mt-1 font-mono">{row.exampleAppositive}</p>
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        <p>{row.relative}</p>
                        <p className="text-violet-400/60 text-xs mt-1 font-mono">{row.exampleRelative}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 常见先行词 */}
            <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700">
              <h3 className="text-white font-bold mb-3">同位语从句常见先行词</h3>
              <div className="flex flex-wrap gap-2">
                {['news', 'fact', 'idea', 'hope', 'belief', 'truth', 'possibility', 'suggestion', 'conclusion', 'doubt', 'evidence', 'message', 'report', 'thought', 'understanding'].map(word => (
                  <span key={word} className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs border border-amber-500/20">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ========== 方位介词 + which = where ========== */}
        {activeTab === 'prepwhich' && (
          <motion.div key="prepwhich" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-slate-800/50 border border-cyan-500/20">
              <h3 className="text-cyan-400 font-bold text-lg mb-2">方位介词 + which = where</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">
                当先行词是地点名词时，可以用"介词 + which"来替代 where。注意：不是随便哪个介词都可以，必须是表示方位的介词（in/at/on/to/from/under等）。
              </p>
              <div className="p-3 rounded-xl bg-slate-900/50 border border-cyan-500/10">
                <p className="text-white text-sm">
                  <span className="text-cyan-400">in/at/on/to/from + which</span> = <span className="text-amber-400">where</span>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PREP_WHICH_WHERE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-cyan-500/30 transition-all"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 text-xs font-medium">{item.prep}</span>
                    <span className="text-slate-500">=</span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-xs font-medium">{item.where}</span>
                  </div>
                  <p className="text-white text-sm font-mono leading-relaxed">{item.example}</p>
                  <p className="text-slate-500 text-xs mt-1">{item.cn}</p>
                </motion.div>
              ))}
            </div>

            {/* 易错提醒 */}
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20">
              <h3 className="text-red-400 font-bold mb-2 flex items-center gap-2">
                <AlertTriangle size={16} />
                易错提醒
              </h3>
              <ul className="space-y-2 text-slate-300 text-sm">
                <li>• <strong className="text-white">from where</strong> 是正确用法，不是 <span className="text-red-400 line-through">from which</span>（当表示"从某地"时）</li>
                <li>• <strong className="text-white">the way in which</strong> 可以替换为 <strong className="text-amber-400">the way</strong>（不加关系词）</li>
                <li>• <strong className="text-white">reason why</strong> = <strong className="text-amber-400">reason for which</strong>（不是 reason which）</li>
                <li>• 先行词必须表示<strong className="text-white">地点或位置</strong>才能用where，抽象地点（如point/situation/stage）也可以用</li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
