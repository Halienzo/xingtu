// ============================================
// 识别与改错训练 (PosDetective)
// 四种基础题型：词性识别、及物性判断、搭配选择、多词性辨析
// 含CEFR等级标注
// ============================================
import { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';
import { saveMistake } from '../../lib/posMistakeStore';

// 题型定义
type QuizType = 'identify' | 'transitivity' | 'collocation' | 'polysemy';

interface QuizQuestion {
  id: number;
  type: QuizType;
  ceferLevel: string;
  question: string;
  targetWord?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sentence?: string;
}

const quizData: QuizQuestion[] = [
  // ====== 词性识别 (Identify) ======
  {
    id: 1,
    type: 'identify',
    ceferLevel: 'A1',
    question: '标出句中 "booked" 的词性：',
    sentence: 'She booked a table for two.',
    targetWord: 'booked',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 1,
    explanation: 'booked 是 book 的过去式，在此句中作谓语动词，表示"预订"。注意 book 也可作名词（书），但此句中后面接了宾语 a table，所以是动词用法。',
  },
  {
    id: 2,
    type: 'identify',
    ceferLevel: 'A2',
    question: '标出句中 "close" 的词性：',
    sentence: 'The school is close to my home.',
    targetWord: 'close',
    options: ['动词 v.', '形容词 adj.', '副词 adv.', '介词 prep.'],
    correctIndex: 1,
    explanation: 'close 在系动词 is 后面作表语，说明主语 the school 的特征（近的），所以是形容词。注意发音为 /kləʊs/，不是动词的 /kləʊz/。',
  },
  {
    id: 3,
    type: 'identify',
    ceferLevel: 'B1',
    question: '标出句中 "ballooned" 的词性：',
    sentence: 'Costs ballooned during the crisis.',
    targetWord: 'ballooned',
    options: ['名词 n.', '及物动词 vt.', '不及物动词 vi.', '形容词 adj.'],
    correctIndex: 2,
    explanation: 'ballooned 在此句中作谓语，主语是 costs（成本），后面没有宾语，表示"成本激增"，所以是不及物动词 vi. 用法。',
  },

  // ====== 及物性判断 (Transitivity) ======
  {
    id: 4,
    type: 'transitivity',
    ceferLevel: 'A1',
    question: '"arrive" 是什么类型的动词？',
    options: ['及物动词（必须接宾语）', '不及物动词（不接宾语）', '系动词（后接表语）', '双及物动词（接两个宾语）'],
    correctIndex: 1,
    explanation: 'arrive 是不及物动词，不能直接接宾语。要说 arrive at/in + 地点，不能只说 arrive the airport。',
  },
  {
    id: 5,
    type: 'transitivity',
    ceferLevel: 'A2',
    question: '"give" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 2,
    explanation: 'give 是双及物动词，可以接两个宾语：give somebody something（间接宾语+直接宾语），也可以改为 give something to somebody。',
  },
  {
    id: 6,
    type: 'transitivity',
    ceferLevel: 'B1',
    question: '"make" 在 "The movie made me sad." 中是什么类型？',
    options: ['单及物动词', '双及物动词', '复杂及物动词（宾语+宾补）', '系动词'],
    correctIndex: 2,
    explanation: 'make 在此句中接了宾语 me 和宾补 sad，是复杂及物动词（complex-transitive），构成 SVOC 句型。',
  },

  // ====== 搭配选择 (Collocation) ======
  {
    id: 7,
    type: 'collocation',
    ceferLevel: 'A1',
    question: '选择正确的表达：',
    sentence: 'She sings _______.',
    options: ['beautiful', 'beautifully', 'beauty', 'more beautiful'],
    correctIndex: 1,
    explanation: 'sing 是动词，需要用副词 beautifully 来修饰。beautiful 是形容词，只能修饰名词或在系动词后作表语。',
  },
  {
    id: 8,
    type: 'collocation',
    ceferLevel: 'A2',
    question: '选择正确的表达：',
    sentence: 'I am good _______ swimming.',
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 0,
    explanation: 'be good at 是固定搭配，表示"擅长……"。介词 at 后接名词或动名词。注意：不要说 be good in（除非特定语境）。',
  },
  {
    id: 9,
    type: 'collocation',
    ceferLevel: 'B1',
    question: '选择正确的表达：',
    sentence: 'He _______ me a story yesterday.',
    options: ['spoke', 'said', 'told', 'talked'],
    correctIndex: 2,
    explanation: 'tell 是双及物动词，可以直接接间接宾语+直接宾语：tell somebody something。speak/say/talk 没有这种用法。',
  },

  // ====== 多词性辨析 (Polysemy) ======
  {
    id: 10,
    type: 'polysemy',
    ceferLevel: 'A2',
    question: '"close" 在下面哪个句子中是动词？',
    options: [
      'The store is close to my home.',
      'Please close the door.',
      'They are close friends.',
      'Come close so I can hear you.',
    ],
    correctIndex: 1,
    explanation: '"Please close the door." 中 close 是谓语动词，表示"关闭"，发音 /kləʊz/。其他句子中 close 是形容词或副词，发音 /kləʊs/。',
  },
  {
    id: 11,
    type: 'polysemy',
    ceferLevel: 'B1',
    question: '"fine" 在下面哪个句子中是名词（罚款）？',
    options: [
      'I am fine, thank you.',
      'It is a fine day today.',
      'He had to pay a fine of $100.',
      'She has fine hair.',
    ],
    correctIndex: 2,
    explanation: '"He had to pay a fine of $100." 中 fine 是名词，表示"罚款"。其他句子中 fine 是形容词：A 表示"好的"，B 表示"晴朗的"，D 表示"细软的"。',
  },
  {
    id: 12,
    type: 'polysemy',
    ceferLevel: 'B2',
    question: '"light" 在下面哪个句子中是动词（点燃）？',
    options: [
      'The light is too bright.',
      'Turn on the light, please.',
      'She lit the candle.',
      'This bag is very light.',
    ],
    correctIndex: 2,
    explanation: '"She lit the candle." 中 lit 是 light 的过去式，作动词表示"点燃"。A 和 B 中 light 是名词（灯/光），D 中 light 是形容词（轻的）。',
  },
];

const typeLabels: Record<QuizType, string> = {
  identify: '词性识别',
  transitivity: '及物性判断',
  collocation: '搭配选择',
  polysemy: '多词性辨析',
};

const typeColors: Record<QuizType, string> = {
  identify: 'bg-blue-500/20 text-blue-300',
  transitivity: 'bg-emerald-500/20 text-emerald-300',
  collocation: 'bg-amber-500/20 text-amber-300',
  polysemy: 'bg-purple-500/20 text-purple-300',
};

export function PosDetective() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<Set<number>>(new Set());
  const [filter, setFilter] = useState<QuizType | 'all'>('all');

  const filteredQuestions = filter === 'all'
    ? quizData
    : quizData.filter(q => q.type === filter);

  const question = filteredQuestions[currentIdx];
  const totalAnswered = answered.size;
  const isCorrect = selectedOption === question?.correctIndex;

  const handleAnswer = (index: number) => {
    if (showResult) return;
    setSelectedOption(index);
    setShowResult(true);
    if (index === question.correctIndex) {
      setScore(s => s + 1);
    } else {
      saveMistake({
        type: 'detective',
        word: question.targetWord,
        userAnswer: question.options[index],
        correctInfo: question.explanation,
      });
    }
    setAnswered(prev => new Set(prev).add(question.id));
  };

  const handleNext = () => {
    setSelectedOption(null);
    setShowResult(false);
    setCurrentIdx((currentIdx + 1) % filteredQuestions.length);
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setAnswered(new Set());
  };

  if (!question) {
    return (
      <div className="text-center py-12 text-slate-500">该分类下暂无题目</div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">4</span>
          识别与改错训练
        </h2>
        <p className="text-sm text-slate-400 mt-1">在语境中判断词性、及物性和搭配正确性</p>
      </div>

      {/* 统计 */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-slate-300">{score} / {totalAnswered}</span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          重置
        </button>
      </div>

      {/* 题型筛选 */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setFilter('all'); setCurrentIdx(0); setSelectedOption(null); setShowResult(false); }}
          className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
            filter === 'all' ? 'bg-white text-slate-900' : 'bg-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          全部
        </button>
        {(Object.keys(typeLabels) as QuizType[]).map(t => (
          <button
            key={t}
            onClick={() => { setFilter(t); setCurrentIdx(0); setSelectedOption(null); setShowResult(false); }}
            className={`text-xs px-3 py-1.5 rounded-lg transition-all ${
              filter === t ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {typeLabels[t]}
          </button>
        ))}
      </div>

      {/* 题目卡片 */}
      <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4 md:p-6 space-y-4">
        {/* 题头 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] px-2 py-0.5 rounded ${typeColors[question.type]}`}>
              {typeLabels[question.type]}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
              CEFR {question.ceferLevel}</span>
          </div>
          <span className="text-xs text-slate-500">
            {currentIdx + 1} / {filteredQuestions.length}
          </span>
        </div>

        {/* 题目 */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-white">{question.question}</p>
          {question.sentence && (
            <div className="bg-slate-800/50 rounded-lg px-4 py-3 text-sm">
              {question.targetWord ? (
                <span>
                  {question.sentence.split(question.targetWord).map((part, i, arr) => (
                    <span key={i}>
                      {part}
                      {i < arr.length - 1 && (
                        <span className="bg-amber-500/20 text-amber-300 px-1 rounded font-medium">
                          {question.targetWord}
                        </span>
                      )}
                    </span>
                  ))}
                </span>
              ) : (
                <span className="text-slate-300">{question.sentence}</span>
              )}
            </div>
          )}
        </div>

        {/* 选项 */}
        <div className="space-y-2">
          {question.options.map((opt, idx) => {
            let btnClass = 'bg-slate-800 hover:bg-slate-700 border-white/10 text-slate-300';
            if (showResult) {
              if (idx === question.correctIndex) {
                btnClass = 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300';
              } else if (idx === selectedOption) {
                btnClass = 'bg-rose-500/15 border-rose-500/40 text-rose-300';
              } else {
                btnClass = 'bg-slate-800/50 border-white/5 text-slate-500';
              }
            }
            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all flex items-center gap-3 ${btnClass}`}
              >
                <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs shrink-0"
                >
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{opt}</span>
                {showResult && idx === question.correctIndex && (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {showResult && idx === selectedOption && idx !== question.correctIndex && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* 结果反馈 */}
        {showResult && (
          <div className={`rounded-lg p-4 border ${
            isCorrect
              ? 'bg-emerald-500/5 border-emerald-500/20'
              : 'bg-rose-500/5 border-rose-500/20'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              {isCorrect ? (
                <>
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm font-medium text-emerald-300">回答正确！</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-400" />
                  <span className="text-sm font-medium text-rose-300">回答错误</span>
                </>
              )}
            </div>
            <p className="text-sm text-slate-300">{question.explanation}</p>
          </div>
        )}

        {/* 下一题按钮 */}
        {showResult && (
          <button
            onClick={handleNext}
            className="flex items-center gap-2 mx-auto px-5 py-2 bg-amber-500/20 text-amber-300 rounded-lg border border-amber-500/30 hover:bg-amber-500/30 transition-colors text-sm"
          >
            下一题
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
