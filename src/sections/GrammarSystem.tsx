// ============================================
// 星图 - 语法体系（原知识库12模块）
// ============================================
import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, ChevronRight, Lightbulb, Network, X } from 'lucide-react';
import { grammarDeepDiveDetails, type GrammarDetail, type GrammarExamFocus } from '../data/grammarDeepDiveData';
import { grammarCoreDetails } from '../data/grammarCoreDetails';
import { grammarExamFocusDetails } from '../data/grammarExamFocusData';

interface GrammarItem {
  id: string;
  title: string;
  desc: string;
}

interface GrammarCategory {
  id: string;
  title: string;
  icon: string;
  color: string;
  items: GrammarItem[];
}

const categories: GrammarCategory[] = [
  {
    id: 'word-classes', title: '词类', icon: 'A', color: 'from-blue-500 to-cyan-500',
    items: [
      { id: 'nouns', title: '名词', desc: '可数与不可数、所有格' },
      { id: 'pronouns', title: '代词', desc: '人称、物主、反身代词' },
      { id: 'articles', title: '冠词', desc: 'a/an/the的用法' },
      { id: 'numerals', title: '数词', desc: '基数、序数、分数、倍数、日期时间' },
      { id: 'adjectives', title: '形容词', desc: '比较级、最高级' },
      { id: 'adverbs', title: '副词', desc: '频率、程度、方式副词' },
      { id: 'prepositions', title: '介词', desc: '时间、地点、方向介词' },
      { id: 'conjunctions', title: '连词', desc: '并列、从属连词' },
      { id: 'interjections', title: '感叹词', desc: '表达情感的词' },
      { id: 'verbs', title: '动词', desc: '时态变化、及物不及物、非谓语、延续非延续' },
    ]
  },
  {
    id: 'sentence-structure', title: '句子结构', icon: 'S', color: 'from-violet-500 to-purple-500',
    items: [
      { id: 'sentence-types', title: '句子类型', desc: '陈述、疑问、祈使、感叹' },
      { id: 'sentence-patterns', title: '基本句型', desc: 'SVO、SVC、SVOO等' },
      { id: 'simple-compound-complex', title: '简单、并列、复合句', desc: '从句类型和连接方式' },
      { id: 'long-sentence-visual', title: '长难句模块拆分', desc: '主干、从句、非谓语、倒装、独立主格可视化' },
      { id: 'questions', title: '疑问句', desc: '一般、特殊、选择、反意疑问' },
      { id: 'imperatives', title: '祈使句', desc: '命令、请求、建议' },
    ]
  },
  {
    id: 'tenses', title: '时态', icon: 'T', color: 'from-amber-500 to-orange-500',
    items: [
      { id: 'present-tenses', title: '现在时态', desc: '一般、进行、完成、完成进行' },
      { id: 'past-tenses', title: '过去时态', desc: '一般、进行、完成、完成进行' },
      { id: 'future-tenses', title: '将来时态', desc: 'will、be going to、进行时表将来' },
      { id: 'tense-consistency', title: '时态一致', desc: '主从句时态呼应' },
    ]
  },
  {
    id: 'voice', title: '语态', icon: 'V', color: 'from-emerald-500 to-teal-500',
    items: [
      { id: 'active-passive', title: '主动与被动', desc: '转换规则、使用场景' },
      { id: 'passive-forms', title: '各种时态的被动', desc: '不同时态的被动形式' },
      { id: 'special-passive', title: '特殊被动结构', desc: '感官、使役动词' },
    ]
  },
  {
    id: 'mood', title: '语气', icon: 'M', color: 'from-rose-500 to-pink-500',
    items: [
      { id: 'indicative', title: '陈述语气', desc: '陈述事实' },
      { id: 'imperative-mood', title: '祈使语气', desc: '命令、请求' },
      { id: 'subjunctive', title: '虚拟语气', desc: '与事实相反、愿望、建议' },
    ]
  },
  {
    id: 'non-finite-verbs', title: '非谓语动词', icon: 'N', color: 'from-sky-500 to-blue-500',
    items: [
      { id: 'infinitives', title: '不定式', desc: '作主语、宾语、状语等' },
      { id: 'gerunds', title: '动名词', desc: '作主语、宾语' },
      { id: 'participles', title: '分词', desc: '进行态形式、完成态形式作定语、状语' },
      { id: 'absolute-construction', title: '独立主格全覆盖', desc: '名词+doing/done/to do/形容词/介词短语' },
      { id: 'absolute-nominative', title: '独立主格细分场景', desc: '时间、原因、条件、伴随、with复合结构' },
    ]
  },
  {
    id: 'clauses', title: '从句', icon: 'C', color: 'from-indigo-500 to-violet-500',
    items: [
      { id: 'noun-clauses', title: '名词性从句', desc: '主语、宾语、表语、同位语从句' },
      { id: 'adjective-clauses', title: '定语从句', desc: '限定性和非限定性' },
      { id: 'adverb-clauses', title: '状语从句', desc: '时间、地点、原因、条件等' },
    ]
  },
  {
    id: 'inversion', title: '倒装', icon: 'I', color: 'from-yellow-500 to-amber-500',
    items: [
      { id: 'full-inversion', title: '完全倒装', desc: 'Here/There/地点/表语前置' },
      { id: 'partial-inversion', title: '部分倒装总表', desc: '否定词、Only、So/Such、虚拟倒装' },
      { id: 'nor-neither-so-inversion', title: 'nor / neither / so', desc: '小触发词承接倒装' },
      { id: 'negative-fronting', title: '否定前置倒装', desc: 'Never/Seldom/Not until/No sooner/Hardly' },
      { id: 'only-fronting', title: 'Only 前置倒装', desc: 'Only when/by/then/in this way' },
      { id: 'not-until-inversion', title: 'Not until 倒装', desc: '从句不倒，主句倒装' },
      { id: 'no-sooner-hardly', title: 'No sooner / Hardly', desc: '一……就……的正式结构' },
      { id: 'so-such-inversion', title: 'So / Such 倒装', desc: '程度前置 + that 结果从句' },
      { id: 'as-though-inversion', title: 'as / though 让步倒装', desc: '形容词/名词/动词前置' },
      { id: 'if-omission-inversion', title: '省略 if 的虚拟倒装', desc: 'Had/Were/Should + 主语' },
    ]
  },
  {
    id: 'emphasis', title: '强调', icon: 'E', color: 'from-red-500 to-orange-500',
    items: [
      { id: 'it-cleft', title: 'It强调句', desc: 'It is/was ... that/who' },
      { id: 'do-emphasis', title: 'Do强调', desc: 'do/does/did + 动词原形' },
    ]
  },
  {
    id: 'ellipsis', title: '省略', icon: '...', color: 'from-gray-500 to-slate-500',
    items: [
      { id: 'ellipsis-types', title: '省略类型', desc: '并列句、状语从句中的省略' },
    ]
  },
  {
    id: 'direct-indirect', title: '直接引语与间接引语', icon: 'D', color: 'from-cyan-500 to-teal-500',
    items: [
      { id: 'statement-conversion', title: '陈述句转换', desc: '时态、人称、指示词变化' },
      { id: 'question-conversion', title: '疑问句转换', desc: '一般疑问、特殊疑问' },
      { id: 'imperative-conversion', title: '祈使句转换', desc: 'tell/ask/order + to do' },
    ]
  },
  {
    id: 'agreement', title: '一致关系', icon: 'Ag', color: 'from-green-500 to-emerald-500',
    items: [
      { id: 'subject-verb', title: '主谓一致', desc: '语法一致、意义一致、就近原则' },
      { id: 'pronoun-reference', title: '代词指代', desc: '前后一致' },
    ]
  },
];

const grammarDetails: Record<string, GrammarDetail> = {
  ...grammarCoreDetails,
  ...grammarDeepDiveDetails,
};

function GrammarDetailPanel({
  detail,
  examFocus,
  category,
  onClose,
}: {
  detail: GrammarDetail;
  examFocus?: GrammarExamFocus | null;
  category: GrammarCategory;
  onClose: () => void;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="mb-5 rounded-2xl border border-amber-400/25 bg-slate-900/80 p-4 shadow-2xl shadow-black/20"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs text-amber-300">
            <BookOpen size={14} />
            <span>{category.title} · 知识点详情</span>
          </div>
          <h2 className="text-xl font-black text-white">{detail.title}</h2>
          <p className="mt-1 text-sm text-slate-300">{detail.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white"
          aria-label="关闭知识点详情"
        >
          <X size={18} />
        </button>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <div className="rounded-xl border border-slate-700 bg-slate-800/55 p-4">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-cyan-300">
              <Lightbulb size={15} />
              核心理解
            </h3>
            <p className="text-sm leading-7 text-slate-300">{detail.overview}</p>
          </div>

          <div className="rounded-xl border border-slate-700 bg-slate-800/55 p-4">
            <h3 className="mb-3 text-sm font-bold text-emerald-300">拆解流程</h3>
            <div className="space-y-2">
              {detail.steps.map((step, index) => (
                <div key={step} className="flex gap-2 text-sm text-slate-300">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-500/20 text-xs font-black text-emerald-200">
                    {index + 1}
                  </span>
                  <span className="leading-6">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {detail.patterns.map(pattern => (
            <div key={pattern.label} className="rounded-xl border border-slate-700 bg-slate-800/55 p-4">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs font-bold text-amber-200">
                  {pattern.label}
                </span>
                <code className="break-words whitespace-normal text-xs text-cyan-200">{pattern.formula}</code>
              </div>
              <p className="mb-3 text-sm leading-6 text-slate-300">{pattern.explanation}</p>
              <div className="space-y-2">
                {pattern.examples.map(example => (
                  <div key={example.en} className="rounded-lg border border-slate-700/80 bg-slate-950/40 p-3">
                    <p className="font-mono text-sm text-white">{example.en}</p>
                    <p className="mt-1 text-sm text-amber-100/85">{example.cn}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{example.note}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {detail.visualParts && (
        <div className="mt-4 rounded-xl border border-violet-400/20 bg-violet-500/10 p-4">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold text-violet-200">
            <Network size={15} />
            模块拆分可视化
          </h3>
          <div className="grid gap-2 md:grid-cols-2">
            {detail.visualParts.map(part => (
              <div key={part.label} className="rounded-lg border border-violet-300/20 bg-slate-950/35 p-3">
                <div className="mb-1 text-xs font-black text-violet-200">{part.label}</div>
                <div className="font-mono text-sm text-white">{part.text}</div>
                <div className="mt-1 text-xs leading-5 text-slate-300">{part.role}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {examFocus && (
        <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4">
          <h3 className="mb-2 text-sm font-bold text-cyan-200">云南考法与陷阱</h3>
          <p className="mb-3 text-sm leading-7 text-slate-300">{examFocus.yunnanFocus}</p>
          <div className="mb-3 flex flex-wrap gap-2">
            {examFocus.mustKnow.map(point => (
              <span
                key={point}
                className="rounded-full border border-cyan-300/20 bg-slate-950/30 px-3 py-1 text-xs leading-5 text-cyan-50/90"
              >
                {point}
              </span>
            ))}
          </div>
          <div className="grid gap-3 lg:grid-cols-2">
            {examFocus.traps.map(item => (
              <div key={item.title} className="rounded-lg border border-cyan-300/15 bg-slate-950/35 p-3">
                <div className="text-sm font-bold text-cyan-100">{item.title}</div>
                <p className="mt-1 text-xs leading-5 text-slate-300">{item.trap}</p>
                <div className="mt-2 grid gap-2 md:grid-cols-2">
                  <div className="rounded-md border border-rose-300/20 bg-rose-500/10 p-2">
                    <div className="mb-1 text-[11px] font-bold uppercase text-rose-200">Wrong</div>
                    <code className="break-words whitespace-normal text-xs text-rose-50">{item.wrong}</code>
                  </div>
                  <div className="rounded-md border border-emerald-300/20 bg-emerald-500/10 p-2">
                    <div className="mb-1 text-[11px] font-bold uppercase text-emerald-200">Right</div>
                    <code className="break-words whitespace-normal text-xs text-emerald-50">{item.right}</code>
                  </div>
                </div>
                <p className="mt-2 text-xs leading-5 text-slate-400">{item.explanation}</p>
              </div>
            ))}
          </div>
          {examFocus.microDrills && (
            <div className="mt-3 grid gap-2 md:grid-cols-2">
              {examFocus.microDrills.map(example => (
                <div key={example.en} className="rounded-lg border border-cyan-300/15 bg-slate-950/30 p-3">
                  <p className="font-mono text-sm text-white">{example.en}</p>
                  <p className="mt-1 text-sm text-cyan-50/80">{example.cn}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">{example.note}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-500/10 p-4">
        <h3 className="mb-2 text-sm font-bold text-rose-200">易错点</h3>
        <div className="grid gap-2 md:grid-cols-3">
          {detail.pitfalls.map(pitfall => (
            <div key={pitfall} className="rounded-lg bg-slate-950/30 p-3 text-xs leading-5 text-rose-50/85">
              {pitfall}
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default function GrammarSystem() {
  const [selected, setSelected] = useState<{ category: GrammarCategory; item: GrammarItem } | null>(null);

  const selectedDetail = useMemo(() => {
    if (!selected) return null;
    return grammarDetails[selected.item.id] || null;
  }, [selected]);

  const selectedExamFocus = useMemo(() => {
    if (!selected) return null;
    return grammarExamFocusDetails[selected.item.id] || null;
  }, [selected]);

  return (
    <div className="p-4">
      <AnimatePresence>
        {selected && selectedDetail && (
          <GrammarDetailPanel
            detail={selectedDetail}
            examFocus={selectedExamFocus}
            category={selected.category}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-slate-800/50 border border-slate-700 rounded-2xl p-4 hover:border-amber-500/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                {cat.icon}
              </div>
              <h2 className="text-white font-bold">{cat.title}</h2>
            </div>
            <div className="space-y-1">
              {cat.items.map(item => {
                const active = selected?.item.id === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    whileHover={{ x: 4 }}
                    onClick={() => setSelected({ category: cat, item })}
                    className={`group w-full rounded-lg px-3 py-2 text-left transition-colors ${
                      active
                        ? 'bg-amber-500/15 ring-1 ring-amber-400/30'
                        : 'hover:bg-slate-700/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={`text-sm font-medium transition-colors ${active ? 'text-amber-200' : 'text-slate-300 group-hover:text-amber-300'}`}>
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-500">{item.desc}</p>
                      </div>
                      <ChevronRight size={14} className={`mt-0.5 shrink-0 transition-colors ${active ? 'text-amber-300' : 'text-slate-600 group-hover:text-amber-400'}`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
