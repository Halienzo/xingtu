// ============================================
// 输出训练 (PosOutputLab) - 第四期：接入评分引擎
// 指定词性造句任务 + AI 规则评分
// ============================================
import { useState } from 'react';
import { PenTool, Check, Lightbulb, ArrowRight, Sparkles, AlertTriangle, Target, FileText } from 'lucide-react';
import { scoreSentence, type ScoringResult } from '../../lib/posScoring';
import { saveMistake } from '../../lib/posMistakeStore';

interface OutputTask {
  word: string;
  pos: string;
  posCode: string;
  patternCode: string;
  instruction: string;
  hint: string;
  example: string;
  ceferLevel: string;
}

// 预设输出任务
const outputTasks: OutputTask[] = [
  {
    word: 'book',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 book 作名词造一个 SVO 句型的句子',
    hint: 'book 作名词表示"书"，可以放在主语或宾语位置',
    example: 'I am reading an interesting book.',
    ceferLevel: 'A1',
  },
  {
    word: 'book',
    pos: 'vt.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 book 作动词造一个 SVO 句型的句子',
    hint: 'book 作动词表示"预订"，后面需要接宾语',
    example: 'I need to book a hotel room.',
    ceferLevel: 'A2',
  },
  {
    word: 'close',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 close 作动词造句，注意发音 /kləʊz/',
    hint: 'close 作动词表示"关闭"，可以是及物或不及物',
    example: 'Please close the door.',
    ceferLevel: 'A1',
  },
  {
    word: 'close',
    pos: 'adj.',
    posCode: 'adj',
    patternCode: 'SVC',
    instruction: '用 close 作形容词造一个 SVC 句型的句子',
    hint: 'close 作形容词表示"近的"，在系动词后作表语',
    example: 'The school is close to my home.',
    ceferLevel: 'A2',
  },
  {
    word: 'water',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SV',
    instruction: '用 water 作名词造句',
    hint: 'water 通常不可数，表示"水"',
    example: 'Water is essential for life.',
    ceferLevel: 'A1',
  },
  {
    word: 'water',
    pos: 'vt.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 water 作及物动词造句',
    hint: 'water 作动词表示"浇水"，后面必须接宾语',
    example: 'Please water the plants every morning.',
    ceferLevel: 'A2',
  },
  {
    word: 'light',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 light 作名词造句',
    hint: 'light 作名词可表示"光"或"灯"',
    example: 'Turn on the light, please.',
    ceferLevel: 'A1',
  },
  {
    word: 'light',
    pos: 'vt.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 light 作动词（点燃）造句',
    hint: 'light 的过去式可以是 lit 或 lighted',
    example: 'She lit the candle.',
    ceferLevel: 'A2',
  },
  {
    word: 'balloon',
    pos: 'vi.',
    posCode: 'v',
    patternCode: 'SV',
    instruction: '用 balloon 作不及物动词造句，表示"激增"',
    hint: 'balloon 作 vi. 时主语通常是"成本/债务/数量"类名词',
    example: 'Costs ballooned during the crisis.',
    ceferLevel: 'B1',
  },
  {
    word: 'fine',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 fine 作名词造句，表示"罚款"',
    hint: 'fine 作名词表示"罚款"，是可数名词',
    example: 'He had to pay a fine of $100.',
    ceferLevel: 'B1',
  },

  // ====== A1 新增 ======
  {
    word: 'run',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 run 作名词造一个 SVO 句型的句子',
    hint: 'run 作名词表示"跑步/奔跑"，可以放在宾语位置',
    example: 'I enjoy a morning run.',
    ceferLevel: 'A1',
  },
  {
    word: 'run',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 run 作动词造一个 SVO 句型的句子',
    hint: 'run 作动词表示"经营/管理"，是及物动词，后面接宾语',
    example: 'She runs her own business.',
    ceferLevel: 'A1',
  },
  {
    word: 'play',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 play 作名词造一个 SVO 句型的句子',
    hint: 'play 作名词可以表示"戏剧/剧本"',
    example: 'We watched an exciting play.',
    ceferLevel: 'A1',
  },
  {
    word: 'play',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 play 作动词造一个 SVO 句型的句子',
    hint: 'play 作动词表示"演奏/玩"，是及物动词',
    example: 'He plays the guitar every day.',
    ceferLevel: 'A1',
  },
  {
    word: 'watch',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 watch 作名词造一个 SVO 句型的句子',
    hint: 'watch 作名词表示"手表"',
    example: 'I wear a digital watch.',
    ceferLevel: 'A1',
  },
  {
    word: 'watch',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 watch 作动词造一个 SVO 句型的句子',
    hint: 'watch 作动词表示"观看"，是及物动词',
    example: 'They watch TV after dinner.',
    ceferLevel: 'A1',
  },
  {
    word: 'help',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 help 作名词造一个 SVO 句型的句子',
    hint: 'help 作名词表示"帮助"，通常作不可数名词',
    example: 'I need your help with this problem.',
    ceferLevel: 'A1',
  },
  {
    word: 'help',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 help 作动词造一个 SVO 句型的句子',
    hint: 'help 作动词表示"帮助"，后面接宾语',
    example: 'She helps her mother cook dinner.',
    ceferLevel: 'A1',
  },
  {
    word: 'kind',
    pos: 'adj.',
    posCode: 'adj',
    patternCode: 'SVC',
    instruction: '用 kind 作形容词造一个 SVC 句型的句子',
    hint: 'kind 作形容词表示"善良的"，在系动词后作表语',
    example: 'He is very kind to everyone.',
    ceferLevel: 'A1',
  },
  {
    word: 'tall',
    pos: 'adj.',
    posCode: 'adj',
    patternCode: 'SVC',
    instruction: '用 tall 作形容词造一个 SVC 句型的句子',
    hint: 'tall 作形容词表示"高的"，在系动词后作表语',
    example: 'My brother is tall and strong.',
    ceferLevel: 'A1',
  },

  // ====== A2 新增 ======
  {
    word: 'break',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 break 作名词造一个 SVO 句型的句子',
    hint: 'break 作名词表示"休息"，常用 take a break',
    example: 'I took a short break from work.',
    ceferLevel: 'A2',
  },
  {
    word: 'break',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 break 作动词造一个 SVO 句型的句子',
    hint: 'break 作动词表示"打破/违反"，是及物动词',
    example: 'Do not break the window.',
    ceferLevel: 'A2',
  },
  {
    word: 'change',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 change 作名词造一个 SVO 句型的句子',
    hint: 'change 作名词表示"改变/变化"，可以是可数或不可数',
    example: 'We need a big change in our plan.',
    ceferLevel: 'A2',
  },
  {
    word: 'change',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 change 作动词造一个 SVO 句型的句子',
    hint: 'change 作动词表示"改变/更换"，是及物动词',
    example: 'Please change your clothes.',
    ceferLevel: 'A2',
  },
  {
    word: 'study',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 study 作名词造一个 SVO 句型的句子',
    hint: 'study 作名词表示"研究/书房"',
    example: 'The study shows interesting results.',
    ceferLevel: 'A2',
  },
  {
    word: 'study',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 study 作动词造一个 SVO 句型的句子',
    hint: 'study 作动词表示"学习/研究"，是及物动词',
    example: 'I study English every morning.',
    ceferLevel: 'A2',
  },
  {
    word: 'paint',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 paint 作名词造一个 SVO 句型的句子',
    hint: 'paint 作名词表示"油漆/颜料"，通常不可数',
    example: 'I bought some paint for the wall.',
    ceferLevel: 'A2',
  },
  {
    word: 'paint',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 paint 作动词造一个 SVO 句型的句子',
    hint: 'paint 作动词表示"绘画/涂漆"，是及物动词',
    example: 'She paints beautiful landscapes.',
    ceferLevel: 'A2',
  },

  // ====== B1 新增 ======
  {
    word: 'drive',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 drive 作名词造一个 SVO 句型的句子',
    hint: 'drive 作名词表示"驾车/车程"',
    example: 'I love a Sunday drive in the countryside.',
    ceferLevel: 'B1',
  },
  {
    word: 'drive',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 drive 作动词造一个 SVO 句型的句子',
    hint: 'drive 作动词表示"驾驶"，是及物动词',
    example: 'He drives a red sports car.',
    ceferLevel: 'B1',
  },
  {
    word: 'fire',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVO',
    instruction: '用 fire 作名词造一个 SVO 句型的句子',
    hint: 'fire 作名词表示"火/火灾"',
    example: 'The fire destroyed the old building.',
    ceferLevel: 'B1',
  },
  {
    word: 'fire',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 fire 作动词造一个 SVO 句型的句子',
    hint: 'fire 作动词表示"解雇/开除"',
    example: 'The company fired three employees last week.',
    ceferLevel: 'B1',
  },
  {
    word: 'mind',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVA',
    instruction: '用 mind 作名词造一个 SVA 句型的句子',
    hint: 'mind 作名词表示"头脑/思维"，SVA = 主语+动词+状语',
    example: 'A curious mind learns faster.',
    ceferLevel: 'B1',
  },

  // ====== B2 新增 ======
  {
    word: 'bank',
    pos: 'n.',
    posCode: 'n',
    patternCode: 'SVC',
    instruction: '用 bank 作名词造一个 SVC 句型的句子',
    hint: 'bank 作名词可以表示"河岸/银行"',
    example: 'The river bank is very slippery after rain.',
    ceferLevel: 'B2',
  },
  {
    word: 'point',
    pos: 'v.',
    posCode: 'v',
    patternCode: 'SVO',
    instruction: '用 point 作动词造一个 SVO 句型的句子',
    hint: 'point 作动词表示"指向/指着"',
    example: 'She pointed the way to the station.',
    ceferLevel: 'B2',
  },
];

export function PosOutputLab() {
  const [currentTask, setCurrentTask] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(null);

  const task = outputTasks[currentTask];
  const progress = Math.round((completed.size / outputTasks.length) * 100);

  const handleSubmit = () => {
    const trimmed = userAnswer.trim();
    if (!trimmed) return;

    const result = scoreSentence(trimmed, task.word, task.pos, task.patternCode || '');
    setScoringResult(result);
    setShowCheck(true);

    if (result.passed) {
      setCompleted(prev => new Set(prev).add(currentTask));
    } else {
      saveMistake({
        type: 'output',
        word: task.word,
        pos: task.pos,
        patternCode: task.patternCode || undefined,
        userAnswer: trimmed,
        correctInfo: task.example,
        score: result.score,
        dimensions: {
          sentencePattern: result.dimensions.sentencePattern.score,
          targetWordUsage: result.dimensions.targetWordUsage.score,
          grammar: result.dimensions.grammar.score,
        },
      });
    }
  };

  const handleNext = () => {
    setCurrentTask((currentTask + 1) % outputTasks.length);
    setUserAnswer('');
    setShowHint(false);
    setShowCheck(false);
    setScoringResult(null);
  };

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">5</span>
          输出训练
        </h2>
        <p className="text-sm text-slate-400 mt-1">口语和写作任务要求"用指定词性"，不只是"用这个词"</p>
      </div>

      {/* 进度 */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-amber-500 rounded-full transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-slate-400">{completed.size}/{outputTasks.length}</span>
      </div>

      {/* 任务卡片 */}
      <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4 md:p-6 space-y-4">
        {/* 任务头部 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PenTool className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-medium text-white">任务 {currentTask + 1}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
              CEFR {task.ceferLevel}
            </span>
          </div>
          {completed.has(currentTask) && (
            <span className="text-xs text-emerald-400 flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> 已完成
            </span>
          )}
        </div>

        {/* 任务要求 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white">{task.word}</span>
            <span className={`text-xs font-bold px-2 py-1 rounded ${
              task.posCode === 'n' ? 'bg-blue-500/20 text-blue-300' :
              task.posCode === 'v' ? 'bg-emerald-500/20 text-emerald-300' :
              task.posCode === 'adj' ? 'bg-amber-500/20 text-amber-300' :
              'bg-slate-500/20 text-slate-300'
            }`}>
              {task.pos}
            </span>
          </div>
          <p className="text-sm text-slate-300">{task.instruction}</p>
        </div>

        {/* 提示 */}
        <button
          onClick={() => setShowHint(!showHint)}
          className="flex items-center gap-1.5 text-xs text-amber-400/70 hover:text-amber-400 transition-colors"
        >
          <Lightbulb className="w-3.5 h-3.5" />
          {showHint ? '隐藏提示' : '查看提示'}
        </button>
        {showHint && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg px-3 py-2">
            <p className="text-xs text-amber-400/80">{task.hint}</p>
          </div>
        )}

        {/* 输入区 */}
        <div className="space-y-2">
          <textarea
            value={userAnswer}
            onChange={(e) => { setUserAnswer(e.target.value); setShowCheck(false); }}
            placeholder="在这里输入你的句子..."
            className="w-full bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40 resize-none h-24"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30 text-sm hover:bg-amber-500/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Check className="w-4 h-4" />
              提交
            </button>
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 text-slate-400 rounded-lg border border-white/10 text-sm hover:text-white transition-colors"
            >
              下一题
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 检查结果 */}
        {showCheck && scoringResult && (
          <div className="space-y-3">
            {/* 总分 */}
            <div className={`rounded-lg p-4 border ${
              scoringResult.passed
                ? 'bg-emerald-500/5 border-emerald-500/20'
                : 'bg-rose-500/5 border-rose-500/20'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {scoringResult.passed ? (
                    <Check className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-rose-400" />
                  )}
                  <span className={`text-sm font-bold ${
                    scoringResult.passed ? 'text-emerald-300' : 'text-rose-300'
                  }`}>
                    {scoringResult.passed ? '通过' : '未通过'}（{scoringResult.score} 分）
                  </span>
                </div>
                <span className="text-xs text-slate-500">满分 100</span>
              </div>

              {/* 三个维度 */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { label: '目标词使用', score: scoringResult.dimensions.targetWordUsage.score, icon: Target },
                  { label: '句型匹配', score: scoringResult.dimensions.sentencePattern.score, icon: FileText },
                  { label: '语法', score: scoringResult.dimensions.grammar.score, icon: Sparkles },
                ].map(d => (
                  <div key={d.label} className="bg-slate-900/50 rounded-lg p-2 text-center">
                    <d.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${
                      d.score >= 80 ? 'text-emerald-400' : d.score >= 50 ? 'text-amber-400' : 'text-rose-400'
                    }`} />
                    <div className={`text-sm font-bold ${
                      d.score >= 80 ? 'text-emerald-300' : d.score >= 50 ? 'text-amber-300' : 'text-rose-300'
                    }`}>{d.score}</div>
                    <div className="text-[10px] text-slate-500">{d.label}</div>
                  </div>
                ))}
              </div>

              {/* 建议 */}
              {scoringResult.suggestions.length > 0 && (
                <div className="space-y-1">
                  {scoringResult.suggestions.map((s, i) => (
                    <p key={i} className="text-xs text-slate-400 flex items-start gap-1.5">
                      <span className="text-amber-400 mt-0.5">•</span>
                      {s}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* 参考例句 */}
            <div className="bg-slate-800/50 rounded-lg p-4">
              <p className="text-xs text-slate-500 mb-1.5">参考例句</p>
              <p className="text-sm text-white bg-slate-900/50 rounded px-3 py-2">{task.example}</p>
            </div>
          </div>
        )}
      </div>

      {/* 任务列表 */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
        {outputTasks.map((_t, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentTask(i);
              setUserAnswer('');
              setShowHint(false);
              setShowCheck(false);
            }}
            className={`aspect-square rounded-lg text-xs flex items-center justify-center transition-all ${
              i === currentTask
                ? 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                : completed.has(i)
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                  : 'bg-slate-800 border border-white/5 text-slate-500 hover:border-white/10'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
