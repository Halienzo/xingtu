// ============================================
// 词性地图 (PosMap)
// SVO骨架 + 词性→成分映射 + 短语类地图 + Open/Closed Classes
// ============================================
import { useState } from 'react';
import { getPosByCategory } from '../../data/posConcepts';
import { sentencePatterns } from '../../data/sentencePatterns';
import { ChevronDown, ChevronUp, Info, Circle, Square, Triangle, Hexagon } from 'lucide-react';

export function PosMap() {
  const [expandedPattern, setExpandedPattern] = useState<string | null>('SVO');
  const [expandedPos, setExpandedPos] = useState<string | null>(null);

  const openClass = getPosByCategory('open');
  const closedClass = getPosByCategory('closed');

  return (
    <div className="space-y-8">
      {/* 标题 */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">1</span>
          句子岗位图
        </h2>
        <p className="text-sm text-slate-400 mt-1">词性 → 短语 → 从句 → 句子成分</p>
      </div>

      {/* SVO 骨架可视化 */}
      <SvoSkeleton />

      {/* 七种句型 */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <Triangle className="w-4 h-4 text-emerald-400" />
          七种核心句型（动词决定骨架）
        </h3>
        <div className="grid gap-2">
          {sentencePatterns.map(p => (
            <div
              key={p.code}
              className={`border rounded-lg transition-all cursor-pointer ${
                expandedPattern === p.code
                  ? 'border-amber-500/40 bg-amber-500/5'
                  : 'border-white/10 bg-slate-900/30 hover:border-white/20'
              }`}
              onClick={() => setExpandedPattern(expandedPattern === p.code ? null : p.code)}
            >
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-700 text-slate-300">{p.code}</span>
                  <span className="text-sm font-medium">{p.label}</span>
                  <span className="text-xs text-slate-500 hidden sm:inline">{p.structure}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700/50 text-slate-400">{p.ceferLevel}</span>
                </div>
                {expandedPattern === p.code ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </div>
              {expandedPattern === p.code && (
                <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                  <div className="flex flex-wrap gap-2">
                    {p.slots.map(slot => (
                      <div key={slot.role} className="bg-slate-800 rounded-lg px-3 py-2 text-xs">
                        <span className="font-semibold text-amber-300">{slot.role}</span>
                        <span className="text-slate-400 ml-2">{slot.label}</span>
                        <div className="text-slate-500 mt-1">{slot.accepts.join(' / ')}</div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    {p.examples.map((ex, i) => (
                      <div key={i} className="text-sm">
                        <span className="text-white">{ex.en}</span>
                        <span className="text-slate-500 ml-2">{ex.cn}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <span className="text-[10px] text-slate-500">常见动词：</span>
                    {p.commonVerbs.map(v => (
                      <span key={v} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">{v}</span>
                    ))}
                  </div>
                  {p.traps.map((trap, i) => (
                    <div key={i} className="text-xs bg-rose-500/10 border border-rose-500/20 rounded-lg px-3 py-2">
                      <span className="text-rose-300 font-medium">陷阱：{trap.title}</span>
                      <div className="text-rose-400/70 mt-1">✗ {trap.wrong}</div>
                      <div className="text-emerald-400/70">✓ {trap.right}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 词性 → 句子成分映射 */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <Square className="w-4 h-4 text-blue-400" />
          词性 → 句子成分映射
        </h3>
        <div className="bg-slate-900/50 rounded-lg border border-white/10 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-800/50 text-slate-400 text-xs">
                <th className="text-left px-4 py-2">句子成分</th>
                <th className="text-left px-4 py-2">可由什么承担</th>
                <th className="text-left px-4 py-2 hidden md:table-cell">示例</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { role: '主语(S)', accepts: '名词 / 代词 / 动名词 / 名词性从句', example: 'Swimming is fun. / What he said is true.' },
                { role: '谓语(V)', accepts: '动词（核心）', example: 'She reads books.' },
                { role: '宾语(O)', accepts: '名词 / 代词 / 不定式 / 动名词 / 从句', example: 'I want to go. / I enjoy reading.' },
                { role: '表语(C)', accepts: '名词 / 形容词 / 介词短语 / 从句', example: 'He is a teacher / happy / in bed.' },
                { role: '定语', accepts: '形容词 / 介词短语 / 从句 / 分词', example: 'The red car / The man in black' },
                { role: '状语(A)', accepts: '副词 / 介词短语 / 从句 / 分词', example: 'He runs fast / In the morning' },
                { role: '补语', accepts: '名词 / 形容词 / 介词短语 / 不定式', example: 'We made him captain.' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-white/5">
                  <td className="px-4 py-2.5 font-medium text-amber-300">{row.role}</td>
                  <td className="px-4 py-2.5 text-slate-300">{row.accepts}</td>
                  <td className="px-4 py-2.5 text-slate-500 hidden md:table-cell text-xs">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 短语类地图 */}
      <PhraseClassMap />

      {/* Open vs Closed Classes */}
      <div>
        <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
          <Hexagon className="w-4 h-4 text-purple-400" />
          开放类 vs 封闭类
        </h3>
        <div className="grid md:grid-cols-2 gap-3">
          {/* Open */}
          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Circle className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-emerald-300">开放类 Open Classes</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">成员数量庞大，可随时新增，承载句子的主要内容</p>
            <div className="space-y-2">
              {openClass.map(pos => (
                <button
                  key={pos.code}
                  onClick={() => setExpandedPos(expandedPos === pos.code ? null : pos.code)}
                  className="w-full text-left bg-slate-900/50 rounded-lg px-3 py-2 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${pos.color}`} />
                    <span className="text-sm font-medium">{pos.label}</span>
                    <span className="text-xs text-slate-500">{pos.labelEn}</span>
                    <span className="text-[10px] px-1 py-0.5 rounded bg-slate-700 text-slate-400 ml-auto">{pos.ceferLevel}</span>
                  </div>
                  {expandedPos === pos.code && (
                    <div className="mt-2 text-xs text-slate-400 space-y-1 pl-4">
                      <div>功能：{pos.functions.join('、')}</div>
                      <div>可修饰：{pos.canModify.join('、')}</div>
                      <div>能被：{pos.canBeModifiedBy.join('、')}修饰</div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Closed */}
          <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Square className="w-4 h-4 text-indigo-400" />
              <span className="font-semibold text-indigo-300">封闭类 Closed Classes</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">成员数量有限且固定，提供语法结构和关系</p>
            <div className="space-y-2">
              {closedClass.map(pos => (
                <button
                  key={pos.code}
                  onClick={() => setExpandedPos(expandedPos === pos.code ? null : pos.code)}
                  className="w-full text-left bg-slate-900/50 rounded-lg px-3 py-2 hover:bg-slate-800/50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${pos.color}`} />
                    <span className="text-sm font-medium">{pos.label}</span>
                    <span className="text-xs text-slate-500">{pos.labelEn}</span>
                    <span className="text-[10px] px-1 py-0.5 rounded bg-slate-700 text-slate-400 ml-auto">{pos.ceferLevel}</span>
                  </div>
                  {expandedPos === pos.code && (
                    <div className="mt-2 text-xs text-slate-400 space-y-1 pl-4">
                      <div>功能：{pos.functions.join('、')}</div>
                      <div>常见陷阱：</div>
                      {pos.traps.slice(0, 1).map((trap, i) => (
                        <div key={i} className="text-rose-400/70">• {trap.title}</div>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 核心原理 */}
      <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-300">
            <span className="font-semibold text-amber-300">核心原理：</span>
            英语句子的核心是<span className="text-emerald-300">动词(V)</span>，动词类型决定句子骨架。
            主语(S)和宾语(O)从一个词扩展到短语再到从句。定语、状语、补语也是如此。
            掌握词性，就是掌握"谁能放在哪个岗位上"。
          </div>
        </div>
      </div>
    </div>
  );
}

// SVO 骨架可视化
function SvoSkeleton() {
  return (
    <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4 md:p-6">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        {/* Subject */}
        <div className="text-center">
          <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg px-4 py-3 min-w-[100px]">
            <div className="text-xs text-blue-400 mb-1">Subject 主语</div>
            <div className="text-sm font-medium">名词 / 代词</div>
            <div className="text-xs text-slate-500">动名词 / 从句</div>
          </div>
        </div>

        {/* Arrow */}
        <div className="text-slate-600 text-lg hidden md:block">→</div>
        <div className="text-slate-600 text-lg md:hidden">↓</div>

        {/* Verb */}
        <div className="text-center">
          <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg px-4 py-3 min-w-[100px]">
            <div className="text-xs text-emerald-400 mb-1">Verb 谓语</div>
            <div className="text-sm font-medium">动词</div>
            <div className="text-xs text-slate-500">决定句型</div>
          </div>
          <div className="mt-2 flex gap-1 justify-center flex-wrap">
            {['vi→SV', 'vt→SVO', 'link→SVC', 'ditrans→SVOO', 'complex→SVOC'].map(tag => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-500">{tag}</span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="text-slate-600 text-lg hidden md:block">→</div>
        <div className="text-slate-600 text-lg md:hidden">↓</div>

        {/* Object/Complement/Adverbial */}
        <div className="text-center">
          <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg px-4 py-3 min-w-[100px]">
            <div className="text-xs text-amber-400 mb-1">O / C / A</div>
            <div className="text-sm font-medium">宾 / 表 / 状</div>
            <div className="text-xs text-slate-500">视动词而定</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 短语类地图
function PhraseClassMap() {
  const phrases = [
    { name: '名词短语 NP', head: '名词', color: 'bg-blue-500', example: '[That old] box [you left]', desc: '限定词+形容词+名词+后置修饰' },
    { name: '动词短语 VP', head: '动词', color: 'bg-emerald-500', example: 'has been reading [a book]', desc: '助动词+情态动词+主动词+宾/补/状' },
    { name: '形容词短语 AdjP', head: '形容词', color: 'bg-amber-500', example: '[very] happy', desc: '程度副词+形容词' },
    { name: '副词短语 AdvP', head: '副词', color: 'bg-purple-500', example: '[quite] slowly', desc: '程度副词+副词' },
    { name: '介词短语 PrepP', head: '介词', color: 'bg-rose-500', example: 'on [the table]', desc: '介词+名词短语' },
  ];

  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
        <Circle className="w-4 h-4 text-cyan-400" />
        短语类地图（基于 Cambridge Phrase Classes）
      </h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {phrases.map(p => (
          <div key={p.name} className="bg-slate-900/50 rounded-lg border border-white/10 p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className={`w-2 h-2 rounded-full ${p.color}`} />
              <span className="text-sm font-medium">{p.name}</span>
            </div>
            <div className="text-xs text-slate-400 mb-1">head: <span className="text-slate-300">{p.head}</span></div>
            <div className="text-xs text-slate-500 mb-2">{p.desc}</div>
            <div className="text-xs text-slate-400 bg-slate-800/50 rounded px-2 py-1">{p.example}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
