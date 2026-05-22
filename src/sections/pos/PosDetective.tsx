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
  // ====== 词性识别 (Identify) - 15题 ======
  {
    id: 1,
    type: 'identify',
    ceferLevel: 'A1',
    question: '标出句中 "runs" 的词性：',
    sentence: 'She runs every morning.',
    targetWord: 'runs',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 1,
    explanation: 'runs 是 run 的第三人称单数形式，在此句中作谓语动词，表示"跑步"。',
  },
  {
    id: 2,
    type: 'identify',
    ceferLevel: 'A1',
    question: '标出句中 "happy" 的词性：',
    sentence: 'He is a happy boy.',
    targetWord: 'happy',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 2,
    explanation: 'happy 修饰名词 boy，描述男孩的特征，所以是形容词。',
  },
  {
    id: 3,
    type: 'identify',
    ceferLevel: 'A1',
    question: '标出句中 "quickly" 的词性：',
    sentence: 'She eats quickly.',
    targetWord: 'quickly',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 3,
    explanation: 'quickly 修饰动词 eats，说明吃的速度，以 -ly 结尾，是副词。',
  },
  {
    id: 4,
    type: 'identify',
    ceferLevel: 'A1',
    question: '标出句中 "dog" 的词性：',
    sentence: 'The dog is sleeping.',
    targetWord: 'dog',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 0,
    explanation: 'dog 表示"狗"，是具体事物的名称，在此句中作主语，是名词。',
  },
  {
    id: 5,
    type: 'identify',
    ceferLevel: 'A2',
    question: '标出句中 "swimming" 的词性：',
    sentence: 'Swimming is good exercise.',
    targetWord: 'Swimming',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 0,
    explanation: 'Swimming 在此句中作主语，是动名词，属于名词性成分。注意：动名词既有动词特征（可接宾语）又有名词特征（可作主语/宾语）。',
  },
  {
    id: 6,
    type: 'identify',
    ceferLevel: 'A2',
    question: '标出句中 "interesting" 的词性：',
    sentence: 'This is an interesting book.',
    targetWord: 'interesting',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 2,
    explanation: 'interesting 修饰名词 book，以 -ing 结尾，是形容词。注意：-ing 形式既可以是动名词/现在分词，也可以是形容词。',
  },
  {
    id: 7,
    type: 'identify',
    ceferLevel: 'A2',
    question: '标出句中 "quietly" 的词性：',
    sentence: 'Please speak quietly in the library.',
    targetWord: 'quietly',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 3,
    explanation: 'quietly 修饰动词 speak，以 -ly 结尾，是副词。',
  },
  {
    id: 8,
    type: 'identify',
    ceferLevel: 'A2',
    question: '标出句中 "was" 的词性：',
    sentence: 'He was tired yesterday.',
    targetWord: 'was',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 1,
    explanation: 'was 是 be 动词的过去式，在此句中作系动词（linking verb），连接主语和表语 tired。',
  },
  {
    id: 9,
    type: 'identify',
    ceferLevel: 'B1',
    question: '标出句中 "surprised" 的词性：',
    sentence: 'I was surprised by the news.',
    targetWord: 'surprised',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 2,
    explanation: 'surprised 在系动词 was 后作表语，描述主语的状态，是形容词（过去分词作形容词）。注意：surprise 也可作动词，但此句中 was surprised 是被动结构，surprised 在此是形容词化的过去分词。',
  },
  {
    id: 10,
    type: 'identify',
    ceferLevel: 'B1',
    question: '标出句中 "management" 的词性：',
    sentence: 'The management decided to cut costs.',
    targetWord: 'management',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 0,
    explanation: 'management 表示"管理层/管理"，以 -ment 结尾（名词后缀），在此句中作主语，是名词。',
  },
  {
    id: 11,
    type: 'identify',
    ceferLevel: 'B1',
    question: '标出句中 "increasingly" 的词性：',
    sentence: 'The problem is increasingly serious.',
    targetWord: 'increasingly',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 3,
    explanation: 'increasingly 修饰形容词 serious，表示"越来越"，是副词。',
  },
  {
    id: 12,
    type: 'identify',
    ceferLevel: 'B1',
    question: '标出句中 "consider" 的词性：',
    sentence: 'I will consider your suggestion.',
    targetWord: 'consider',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 1,
    explanation: 'consider 在此句中作谓语，后面接宾语 your suggestion，是及物动词。',
  },
  {
    id: 13,
    type: 'identify',
    ceferLevel: 'B2',
    question: '标出句中 "given" 的词性：',
    sentence: 'Given the circumstances, we agreed.',
    targetWord: 'Given',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '介词 prep.'],
    correctIndex: 3,
    explanation: 'Given 在此句中引导条件，相当于 considering，是介词/分词介词。注意：give 的过去分词也是 given，但此句中 given 后接名词短语 the circumstances，起介词作用。',
  },
  {
    id: 14,
    type: 'identify',
    ceferLevel: 'B2',
    question: '标出句中 "likely" 的词性：',
    sentence: 'It is likely to rain.',
    targetWord: 'likely',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 2,
    explanation: 'likely 在系动词 is 后作表语，表示"可能的"，是形容词。注意：likely 也可作副词（如: They will likely come），但此句中是形容词。',
  },
  {
    id: 15,
    type: 'identify',
    ceferLevel: 'B2',
    question: '标出句中 "down" 的词性：',
    sentence: 'He sat down and relaxed.',
    targetWord: 'down',
    options: ['名词 n.', '动词 v.', '形容词 adj.', '副词 adv.'],
    correctIndex: 3,
    explanation: 'down 在此句中修饰动词 sat，表示方向，是副词。注意：down 也可作介词（如 walk down the street）、形容词（如 the down escalator）或名词（如 the ups and downs）。',
  },

  // ====== 及物性判断 (Transitivity) - 15题 ======
  {
    id: 16,
    type: 'transitivity',
    ceferLevel: 'A1',
    question: '"eat" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 1,
    explanation: 'eat 是单及物动词，通常需要接宾语（如 eat an apple）。虽然偶尔可以不带宾语（如 I already ate），但它主要用作及物动词。',
  },
  {
    id: 17,
    type: 'transitivity',
    ceferLevel: 'A1',
    question: '"sleep" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 0,
    explanation: 'sleep 是不及物动词，不能接宾语。不能说 sleep a bed，只能说 sleep 或 sleep well。',
  },
  {
    id: 18,
    type: 'transitivity',
    ceferLevel: 'A1',
    question: '"be" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 3,
    explanation: 'be 是最常见的系动词，连接主语和表语（如 He is happy / a student）。',
  },
  {
    id: 19,
    type: 'transitivity',
    ceferLevel: 'A1',
    question: '"give" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 2,
    explanation: 'give 是双及物动词，可以接两个宾语：give somebody something（间接宾语+直接宾语），也可以改为 give something to somebody。',
  },
  {
    id: 20,
    type: 'transitivity',
    ceferLevel: 'A2',
    question: '"tell" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 2,
    explanation: 'tell 是双及物动词，常用结构：tell somebody something（告诉某人某事），相当于 tell something to somebody。',
  },
  {
    id: 21,
    type: 'transitivity',
    ceferLevel: 'A2',
    question: '"arrive" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 0,
    explanation: 'arrive 是不及物动词，不能直接接宾语。要说 arrive at/in + 地点，不能只说 arrive the airport。',
  },
  {
    id: 22,
    type: 'transitivity',
    ceferLevel: 'A2',
    question: '"become" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 3,
    explanation: 'become 是系动词，表示"变得"，后接形容词或名词作表语（如 become rich / a doctor）。',
  },
  {
    id: 23,
    type: 'transitivity',
    ceferLevel: 'A2',
    question: '"look" 在 "You look tired." 中是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 3,
    explanation: 'look 在此句中后接形容词 tired，是系动词，表示"看起来"。注意：look 也可作不及物动词（如 look at the picture）。',
  },
  {
    id: 24,
    type: 'transitivity',
    ceferLevel: 'A2',
    question: '"buy" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 1,
    explanation: 'buy 是单及物动词，通常接一个宾语（如 buy a book）。也可以说 buy somebody something，此时是双及物用法。',
  },
  {
    id: 25,
    type: 'transitivity',
    ceferLevel: 'B1',
    question: '"make" 在 "The movie made me sad." 中是什么类型？',
    options: ['单及物动词', '双及物动词', '复杂及物动词（宾语+宾补）', '系动词'],
    correctIndex: 2,
    explanation: 'make 在此句中接了宾语 me 和宾补 sad，是复杂及物动词（complex-transitive），构成 SVOC 句型。',
  },
  {
    id: 26,
    type: 'transitivity',
    ceferLevel: 'B1',
    question: '"depend" 是什么类型的动词？',
    options: ['不及物动词（需接介词）', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 0,
    explanation: 'depend 是不及物动词，不能直接接宾语，必须加介词 on/upon（depend on somebody/something）。',
  },
  {
    id: 27,
    type: 'transitivity',
    ceferLevel: 'B1',
    question: '"seem" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 3,
    explanation: 'seem 是系动词，表示"似乎/好像"，后接形容词或名词（如 seem happy / a good idea），也常用 seem to do 结构。',
  },
  {
    id: 28,
    type: 'transitivity',
    ceferLevel: 'B1',
    question: '"offer" 是什么类型的动词？',
    options: ['不及物动词', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 2,
    explanation: 'offer 是双及物动词，常用结构：offer somebody something（提供给某人某物），相当于 offer something to somebody。',
  },
  {
    id: 29,
    type: 'transitivity',
    ceferLevel: 'B2',
    question: '"consider" 在 "I consider him a genius." 中是什么类型？',
    options: ['单及物动词', '双及物动词', '复杂及物动词（宾语+宾补）', '系动词'],
    correctIndex: 2,
    explanation: 'consider 在此句中接了宾语 him 和宾补 a genius，是复杂及物动词，构成 SVOC 句型。',
  },
  {
    id: 30,
    type: 'transitivity',
    ceferLevel: 'B2',
    question: '"consist" 是什么类型的动词？',
    options: ['不及物动词（需接介词）', '单及物动词', '双及物动词', '系动词'],
    correctIndex: 0,
    explanation: 'consist 是不及物动词，必须加介词 of（consist of = 由……组成），不能用于被动语态。',
  },

  // ====== 搭配选择 (Collocation) - 15题 ======
  {
    id: 31,
    type: 'collocation',
    ceferLevel: 'A1',
    question: '选择正确的表达：',
    sentence: 'She is good _______ swimming.',
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 0,
    explanation: 'be good at 是固定搭配，表示"擅长……"。介词 at 后接名词或动名词。注意：不要说 be good in（除非特定语境）。',
  },
  {
    id: 32,
    type: 'collocation',
    ceferLevel: 'A1',
    question: '选择正确的表达：',
    sentence: 'I listen _______ music every day.',
    options: ['at', 'to', 'on', 'for'],
    correctIndex: 1,
    explanation: 'listen to 是固定搭配，表示"听……"。listen 是不及物动词，必须加介词 to 才能接宾语。',
  },
  {
    id: 33,
    type: 'collocation',
    ceferLevel: 'A1',
    question: '选择正确的表达：',
    sentence: 'Are you interested _______ sports?',
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 1,
    explanation: 'be interested in 是固定搭配，表示"对……感兴趣"。介词 in 后接名词或动名词。',
  },
  {
    id: 34,
    type: 'collocation',
    ceferLevel: 'A1',
    question: '选择正确的表达：',
    sentence: 'I am afraid _______ dogs.',
    options: ['at', 'in', 'of', 'with'],
    correctIndex: 2,
    explanation: 'be afraid of 是固定搭配，表示"害怕……"。of 后接名词、代词或动名词。',
  },
  {
    id: 35,
    type: 'collocation',
    ceferLevel: 'A2',
    question: '选择正确的表达：',
    sentence: 'You can depend _______ me.',
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 2,
    explanation: 'depend on 是固定搭配，表示"依赖/依靠……"。depend 是不及物动词，必须加介词 on 才能接宾语。',
  },
  {
    id: 36,
    type: 'collocation',
    ceferLevel: 'A2',
    question: '选择正确的表达：',
    sentence: "Don't be angry _______ me.",
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 3,
    explanation: 'be angry with 是固定搭配，表示"对……生气"。注意：angry at 也可以用于对事情生气，但 angry with 更常用于对人。',
  },
  {
    id: 37,
    type: 'collocation',
    ceferLevel: 'A2',
    question: '选择正确的表达：',
    sentence: 'I look forward _______ meeting you.',
    options: ['at', 'to', 'on', 'for'],
    correctIndex: 1,
    explanation: 'look forward to 是固定搭配，表示"期待……"。注意：这里的 to 是介词，后面接名词或动名词（不是动词原形）。',
  },
  {
    id: 38,
    type: 'collocation',
    ceferLevel: 'A2',
    question: '选择正确的表达：',
    sentence: 'She is worried _______ the exam.',
    options: ['at', 'about', 'on', 'with'],
    correctIndex: 1,
    explanation: 'be worried about 是固定搭配，表示"担心……"。about 后接名词、代词或从句。',
  },
  {
    id: 39,
    type: 'collocation',
    ceferLevel: 'A2',
    question: '选择正确的表达：',
    sentence: 'He spends a lot of money _______ clothes.',
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 2,
    explanation: 'spend money on 是固定搭配，表示"在……上花钱"。也可以说 spend money (in) doing something。',
  },
  {
    id: 40,
    type: 'collocation',
    ceferLevel: 'B1',
    question: '选择正确的表达：',
    sentence: 'I apologize _______ being late.',
    options: ['at', 'for', 'on', 'with'],
    correctIndex: 1,
    explanation: 'apologize for 是固定搭配，表示"为……道歉"。for 是介词，后面接名词或动名词。',
  },
  {
    id: 41,
    type: 'collocation',
    ceferLevel: 'B1',
    question: '选择正确的表达：',
    sentence: 'She succeeded _______ passing the exam.',
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 1,
    explanation: 'succeed in 是固定搭配，表示"成功做……"。in 后接名词或动名词。注意：succeed 是不及物动词。',
  },
  {
    id: 42,
    type: 'collocation',
    ceferLevel: 'B1',
    question: '选择正确的表达：',
    sentence: 'Nothing can prevent me _______ achieving my goal.',
    options: ['at', 'from', 'on', 'with'],
    correctIndex: 1,
    explanation: 'prevent somebody from 是固定搭配，表示"阻止某人做……"。from 后接动名词。',
  },
  {
    id: 43,
    type: 'collocation',
    ceferLevel: 'B1',
    question: '选择正确的表达：',
    sentence: 'I am accustomed _______ getting up early.',
    options: ['at', 'to', 'on', 'with'],
    correctIndex: 1,
    explanation: 'be accustomed to 是固定搭配，表示"习惯于……"。注意：这里的 to 是介词，后面接名词或动名词。',
  },
  {
    id: 44,
    type: 'collocation',
    ceferLevel: 'B2',
    question: '选择正确的表达：',
    sentence: "If you fail, don't resort _______ cheating.",
    options: ['at', 'to', 'on', 'with'],
    correctIndex: 1,
    explanation: 'resort to 是固定搭配，表示"诉诸/求助于……"。to 是介词，后面接名词或动名词。',
  },
  {
    id: 45,
    type: 'collocation',
    ceferLevel: 'B2',
    question: '选择正确的表达：',
    sentence: 'She confided _______ her best friend.',
    options: ['at', 'in', 'on', 'with'],
    correctIndex: 1,
    explanation: 'confide in 是固定搭配，表示"向……倾诉/信任……"。in 后接表示人的名词。',
  },

  // ====== 多词性辨析 (Polysemy) - 15题 ======
  {
    id: 46,
    type: 'polysemy',
    ceferLevel: 'A1',
    question: '"well" 在下面哪个句子中是副词？',
    options: [
      'She is well now.',
      'He plays tennis well.',
      'There is a well in the village.',
      "Well, I don't know.",
    ],
    correctIndex: 1,
    explanation: '"He plays tennis well." 中 well 修饰动词 plays，是副词，表示"打得好"。A 中 well 是形容词（健康的），C 中 well 是名词（井），D 中 well 是感叹词。',
  },
  {
    id: 47,
    type: 'polysemy',
    ceferLevel: 'A2',
    question: '"back" 在下面哪个句子中是动词？',
    options: [
      'I hurt my back.',
      'Please come back soon.',
      'She backed the car into the garage.',
      'The back door is open.',
    ],
    correctIndex: 2,
    explanation: '"She backed the car..." 中 backed 是 back 的过去式，作动词表示"倒退"。A 中 back 是名词（背部），B 中 back 是副词（回来），D 中 back 是形容词（后面的）。',
  },
  {
    id: 48,
    type: 'polysemy',
    ceferLevel: 'A2',
    question: '"right" 在下面哪个句子中是名词？',
    options: [
      'Turn right at the corner.',
      'You are right.',
      'Everyone has the right to education.',
      'Put it in the right place.',
    ],
    correctIndex: 2,
    explanation: '"Everyone has the right..." 中 right 是名词，表示"权利"。A 中 right 是副词（向右），B 中 right 是形容词（正确的），D 中 right 是形容词（右边的/合适的）。',
  },
  {
    id: 49,
    type: 'polysemy',
    ceferLevel: 'B1',
    question: '"present" 在下面哪个句子中是动词？',
    options: [
      'I bought a present for her.',
      'All the students are present today.',
      'He will present his ideas tomorrow.',
      'We live in the present, not the past.',
    ],
    correctIndex: 2,
    explanation: '"He will present..." 中 present 作动词表示"呈现/介绍"，发音 /prɪˈzent/。A 和 D 中 present 是名词（礼物/现在），发音 /ˈpreznt/。B 中 present 是形容词（出席的）。',
  },
  {
    id: 50,
    type: 'polysemy',
    ceferLevel: 'B1',
    question: '"record" 在下面哪个句子中是动词？',
    options: [
      'This is a world record.',
      'She holds the school record.',
      'I will record the meeting.',
      'His medical records are confidential.',
    ],
    correctIndex: 2,
    explanation: '"I will record..." 中 record 作动词表示"录制"，发音 /rɪˈkɔːd/。A、B、D 中 record 是名词（纪录/记录），发音 /ˈrekɔːd/。',
  },
  {
    id: 51,
    type: 'polysemy',
    ceferLevel: 'B1',
    question: '"object" 在下面哪个句子中是动词？',
    options: [
      'What is that strange object?',
      'I object to your proposal.',
      'The object of the game is to win.',
      'He placed the object on the table.',
    ],
    correctIndex: 1,
    explanation: '"I object to..." 中 object 作动词表示"反对"，发音 /əbˈdʒekt/。A、C、D 中 object 是名词（物体/目标），发音 /ˈɒbdʒɪkt/（英式）/ ˈɑːbdʒɪkt/（美式）。',
  },
  {
    id: 52,
    type: 'polysemy',
    ceferLevel: 'B1',
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
    id: 53,
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
    explanation: '"He had to pay a fine..." 中 fine 是名词，表示"罚款"。其他句子中 fine 是形容词：A 表示"好的"，B 表示"晴朗的"，D 表示"细软的"。',
  },
  {
    id: 54,
    type: 'polysemy',
    ceferLevel: 'B1',
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
  {
    id: 55,
    type: 'polysemy',
    ceferLevel: 'B2',
    question: '"minute" 在下面哪个句子中是形容词？',
    options: [
      'Wait a minute, please.',
      'I will be there in five minutes.',
      'There are minute differences between them.',
      'The minutes of the meeting were approved.',
    ],
    correctIndex: 2,
    explanation: '"minute differences" 中 minute 是形容词，表示"微小的"，发音 /maɪˈnjuːt/。A、B、D 中 minute 是名词（分钟/会议记录），发音 /ˈmɪnɪt/。',
  },
  {
    id: 56,
    type: 'polysemy',
    ceferLevel: 'B2',
    question: '"wind" 在下面哪个句子中是动词？',
    options: [
      'The wind is blowing hard.',
      'I need to wind my watch.',
      'There is no wind today.',
      'The winds of change are coming.',
    ],
    correctIndex: 1,
    explanation: '"wind my watch" 中 wind 作动词表示"上发条/缠绕"，发音 /waɪnd/。A、C、D 中 wind 是名词（风），发音 /wɪnd/。',
  },
  {
    id: 57,
    type: 'polysemy',
    ceferLevel: 'B2',
    question: '"lead" 在下面哪个句子中是名词？',
    options: [
      'This road leads to the station.',
      'She leads the team very well.',
      'The detective has a new lead.',
      'Lead poisoning is dangerous.',
    ],
    correctIndex: 2,
    explanation: '"a new lead" 中 lead 是名词，表示"线索"，发音 /liːd/。A、B 中 lead 是动词（引领），发音 /liːd/。D 中 lead 是名词（铅），发音 /led/。',
  },
  {
    id: 58,
    type: 'polysemy',
    ceferLevel: 'B2',
    question: '"bear" 在下面哪个句子中是动词？',
    options: [
      'I saw a bear in the forest.',
      "I can't bear the noise.",
      'The bear stood on its hind legs.',
      'Teddy bears are popular toys.',
    ],
    correctIndex: 1,
    explanation: '"I can\'t bear..." 中 bear 作动词表示"忍受"，发音 /beə(r)/。A、C、D 中 bear 是名词（熊），发音相同。',
  },
  {
    id: 59,
    type: 'polysemy',
    ceferLevel: 'B2',
    question: '"still" 在下面哪个句子中是形容词？',
    options: [
      'Please sit still.',
      'The water was perfectly still.',
      'He still lives there.',
      "I still don't understand.",
    ],
    correctIndex: 1,
    explanation: '"The water was still" 中 still 是形容词，表示"静止的"，在系动词 was 后作表语。A 中 still 是副词（不动地），C、D 中 still 是副词（仍然）。',
  },
  {
    id: 60,
    type: 'polysemy',
    ceferLevel: 'B2',
    question: '"book" 在下面哪个句子中是动词？',
    options: [
      'I am reading a book.',
      'She booked a table for two.',
      'This is my favorite book.',
      'The book was written in 1990.',
    ],
    correctIndex: 1,
    explanation: '"She booked a table..." 中 booked 是 book 的过去式，作动词表示"预订"。其他句子中 book 是名词（书）。',
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
