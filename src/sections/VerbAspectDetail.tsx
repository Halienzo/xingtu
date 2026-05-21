// ============================================
// 星图 - 时态语态详细内容
// 时态矩阵 | 把字句 | 被字句 | 虚拟句 | 题库
// ============================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, CheckCircle, AlertTriangle, BookOpen, Lightbulb, Clock, Hammer, Shield, Ghost } from 'lucide-react';

interface VerbAspectDetailProps {
  activeTab: string;
}

// ========== 时态矩阵数据 ==========
const TENSE_MATRIX = [
  { time: '现在', aspects: [
    { name: '一般现在时', englishName: 'Simple Present', warmName: '现在的我也值得被看见', structure: 'do/does', example: 'I carry a quiet hope, even when nobody notices it.', cn: '即使没人注意到，我也怀着一份安静的希望。', usage: '习惯、事实、客观真理', warmExplanation: '它说的是现在真实存在的样子：不必先变得完美，你此刻就值得被认真看见。' },
    { name: '现在进行时', englishName: 'Present Continuous', warmName: '我正在长成自己的样子', structure: 'am/is/are doing', example: 'I am learning to speak before my fear becomes louder.', cn: '我正在学着开口，在恐惧变得更大之前。', usage: '此时此刻正在进行的动作', warmExplanation: '它接住“正在发生”的变化：未完成不是失败，而是成长正在路上。' },
    { name: '现在完成时', englishName: 'Present Perfect', warmName: '我已经走过一些难路', structure: 'have/has done', example: 'I have found one person who listens without laughing.', cn: '我已经找到了一个不会嘲笑我、愿意倾听的人。', usage: '过去动作对现在的影响', warmExplanation: '它把过去带到现在：那些被误解的日子，也在悄悄组成更坚韧的你。' },
    { name: '现在完成进行时', englishName: 'Present Perfect Continuous', warmName: '我一直在坚持，也需要被拥抱', structure: 'have/has been doing', example: 'I have been trying to explain myself for a long time.', cn: '我已经努力解释自己很久了。', usage: '从过去持续到现在，可能继续', warmExplanation: '它看见漫长的坚持：你不是太敏感，你只是太久没有被好好听见。' },
  ]},
  { time: '过去', aspects: [
    { name: '一般过去时', englishName: 'Simple Past', warmName: '过去的我也曾很努力', structure: 'did', example: 'I hid my tears yesterday, but I still came to school.', cn: '我昨天藏起了眼泪，但还是来到了学校。', usage: '过去某时发生的动作', warmExplanation: '它承认过去发生过的事：那些撑住自己的时刻，不该被轻轻带过。' },
    { name: '过去进行时', englishName: 'Past Continuous', warmName: '那时我正在独自撑住', structure: 'was/were doing', example: 'I was waiting outside the office when someone finally called my name.', cn: '我正在办公室外等待时，终于有人叫了我的名字。', usage: '过去某时刻正在进行的动作', warmExplanation: '它停在过去某一刻，替那个正在害怕、等待、努力的你留下证词。' },
    { name: '过去完成时', englishName: 'Past Perfect', warmName: '更早的委屈也该被温柔安放', structure: 'had done', example: 'I had lost my courage before she smiled at me.', cn: '在她对我微笑之前，我已经失去了勇气。', usage: '过去的过去', warmExplanation: '它让我们回到更早之前：有些伤不是突然出现的，也需要被慢慢理解。' },
    { name: '过去完成进行时', englishName: 'Past Perfect Continuous', warmName: '那些没人看见的坚持', structure: 'had been doing', example: 'I had been pretending to be fine before my friend noticed my silence.', cn: '在朋友注意到我的沉默之前，我一直假装自己没事。', usage: '过去的过去持续到某时', warmExplanation: '它看见长时间的忍耐：你曾经努力得很安静，但那仍然是真实的努力。' },
  ]},
  { time: '将来', aspects: [
    { name: '一般将来时', englishName: 'Simple Future', warmName: '未来会有光靠近我', structure: 'will do / be going to do', example: 'I will tell my story when I am ready.', cn: '当我准备好时，我会讲出自己的故事。', usage: '将来会发生的动作', warmExplanation: '它给未来留位置：你不必今天就解释清楚一切，但你会拥有开口的时刻。' },
    { name: '将来进行时', englishName: 'Future Continuous', warmName: '未来某刻我仍在向前', structure: 'will be doing', example: 'Tomorrow evening, I will be writing a letter to the part of me that felt unseen.', cn: '明天晚上，我会给那个觉得没人看见的自己写一封信。', usage: '将来某时刻正在进行的动作', warmExplanation: '它把镜头推到未来某一刻：那时的你仍在行动，而不是停在今天的难过里。' },
    { name: '将来完成时', englishName: 'Future Perfect', warmName: '有一天我会越过这段路', structure: 'will have done', example: 'By the end of this year, I will have learned to ask for help.', cn: '到今年结束时，我会已经学会求助。', usage: '将来某时之前完成的动作', warmExplanation: '它让你提前看见结果：最难的路不会一直难下去。' },
    { name: '将来完成进行时', englishName: 'Future Perfect Continuous', warmName: '时间会证明我没有停下', structure: 'will have been doing', example: 'By next spring, I will have been practicing brave conversations for six months.', cn: '到明年春天，我将已经练习勇敢交流六个月了。', usage: '将来某时前持续到某时的动作', warmExplanation: '它把坚持拉长来看：慢慢来，也是一种持续的勇敢。' },
  ]},
  { time: '过去将来', aspects: [
    { name: '过去将来时', englishName: 'Future in the Past', warmName: '那时我以为未来会更温柔', structure: 'would do / was going to do', example: 'I believed someone would understand me one day.', cn: '我曾相信总有一天会有人理解我。', usage: '从过去看将来', warmExplanation: '它保存过去对未来的期待：哪怕后来绕了远路，那份期待也不幼稚。' },
    { name: '过去将来进行时', englishName: 'Future Continuous in the Past', warmName: '那时想象中的我正在被听见', structure: 'would be doing', example: 'I thought I would be speaking with confidence by then.', cn: '我以为到那时自己会正自信地表达。', usage: '从过去看将来某时正在进行', warmExplanation: '它承认期待和现实之间的距离，但不责怪那个曾经期待的自己。' },
    { name: '过去将来完成时', englishName: 'Future Perfect in the Past', warmName: '那时我以为伤口会已经结痂', structure: 'would have done', example: 'I hoped I would have forgiven myself by that summer.', cn: '我曾希望到那个夏天，自己已经原谅了自己。', usage: '从过去看将来某时前完成', warmExplanation: '它让未完成的愿望也有位置：没能按时好起来，不代表你失败。' },
    { name: '过去将来完成进行时', englishName: 'Future Perfect Continuous in the Past', warmName: '那时我以为自己会一直练习勇敢', structure: 'would have been doing', example: 'I imagined I would have been learning to trust people for a whole year.', cn: '我曾想象自己会已经练习信任别人整整一年。', usage: '从过去看将来某时前持续', warmExplanation: '它看见被延迟的成长：过程慢一点，仍然算数。' },
  ]},
];

// ========== 把字句数据 ==========
const BA_SENTENCES = [
  {
    type: '基本结构',
    desc: 'Subject + 把 + Object + Verb + 其他成分',
    examples: [
      { en: 'Please put the book on the table.', cn: '请把书放在桌上。', highlight: '把书放在' },
      { en: 'She turned on the TV.', cn: '她把电视打开了。', highlight: '把电视打开' },
    ],
    rule: '把字句强调对宾语的处置或影响，英语中没有直接的"把"字对应，通常用动词短语表达',
    note: '英语用 put/turn/take/give 等动词 + 介词/副词来表达"把...怎样"',
  },
  {
    type: '把 + 宾语 + 动词 + 补语（结果补语）',
    desc: '强调动作产生的结果',
    examples: [
      { en: 'He finished the work.', cn: '他把工作做完了。', highlight: '把工作做完' },
      { en: 'She broke the glass.', cn: '她把杯子打碎了。', highlight: '把杯子打碎' },
      { en: 'I understood the problem.', cn: '我把问题弄懂了。', highlight: '把问题弄懂' },
    ],
    rule: '英语用 finish/break/understand 等及物动词直接表达',
    note: '"做完" = finish, "打碎" = break, "弄懂" = understand/figure out',
  },
  {
    type: '把 + 宾语 + 动词 + 趋向补语',
    desc: '表示移动方向',
    examples: [
      { en: 'Take out your notebook.', cn: '把你的笔记本拿出来。', highlight: '把笔记本拿出' },
      { en: 'Put away your toys.', cn: '把你的玩具收起来。', highlight: '把玩具收起' },
      { en: 'Send back the letter.', cn: '把信寄回去。', highlight: '把信寄回' },
    ],
    rule: '英语用 take out / put away / send back 等动词短语',
    note: '趋向补语"出来/进去/上来/下去/回来/回去"对应 out/in/up/down/back',
  },
  {
    type: '把 + 宾语 + 给 + 某人',
    desc: '表示给予',
    examples: [
      { en: 'Give me the book.', cn: '把书给我。', highlight: '把书给我' },
      { en: 'Hand her the pen.', cn: '把笔递给她。', highlight: '把笔递给' },
    ],
    rule: '英语用 give/hand/lend/pass 等双宾语动词',
    note: 'give sb sth = give sth to sb 两种形式都可以',
  },
  {
    type: '把 + 宾语 + 动词 + 在/到 + 地点',
    desc: '表示放置位置',
    examples: [
      { en: 'Put the bag on the chair.', cn: '把包放在椅子上。', highlight: '把包放在' },
      { en: 'Take him to school.', cn: '把他带到学校。', highlight: '把他带到' },
    ],
    rule: '英语用 put/place/take 等动词 + 介词(on/in/at/to)',
    note: '"在"对应 on/in/at，"到"对应 to',
  },
  {
    type: '把 + 宾语 + 当/作为',
    desc: '表示当作、看作',
    examples: [
      { en: 'Take this as an example.', cn: '把这个当作例子。', highlight: '把这个当作' },
      { en: 'Regard him as a friend.', cn: '把他当作朋友。', highlight: '把他当作' },
    ],
    rule: '英语用 take...as / regard...as / treat...as',
    note: '这些动词常与 as 搭配，表示"把...当作..."',
  },
  {
    type: '把 + 宾语 + 动词 + 了（完成）',
    desc: '表示动作已完成',
    examples: [
      { en: 'I have eaten the apple.', cn: '我把苹果吃了。', highlight: '把苹果吃' },
      { en: 'She finished her homework.', cn: '她把作业写完了。', highlight: '把作业写完' },
    ],
    rule: '英语用完成时态或直接过去式',
    note: '"了"表示完成，英语用 have done 或 did',
  },
  {
    type: '否定式把字句',
    desc: '把字句的否定形式',
    examples: [
      { en: 'Do not forget to bring your umbrella.', cn: '别忘了把雨伞带上。', highlight: '把雨伞带上' },
      { en: 'She did not put away her clothes.', cn: '她没把衣服收起来。', highlight: '把衣服收起' },
    ],
    rule: '英语否定式直接在动词前加 do not/did not',
    note: '否定词"没/不"放在"把"前',
  },
];

// ========== 被字句数据 ==========
const BEI_SENTENCES = [
  {
    type: '一般现在时被动',
    structure: 'am/is/are + done',
    examples: [
      { en: 'The window is cleaned every day.', cn: '窗户每天被擦。', highlight: 'is cleaned' },
      { en: 'English is spoken in many countries.', cn: '英语在许多国家被说。', highlight: 'is spoken' },
    ],
    rule: 'am/is/are + 完成态形式',
    note: '被动语态 = be动词 + 完成态形式(done)',
  },
  {
    type: '一般过去时被动',
    structure: 'was/were + done',
    examples: [
      { en: 'The letter was sent yesterday.', cn: '信昨天被寄出了。', highlight: 'was sent' },
      { en: 'The house was built in 1990.', cn: '这栋房子建于1990年。', highlight: 'was built' },
    ],
    rule: 'was/were + 完成态形式',
    note: '被动语态强调动作的承受者',
  },
  {
    type: '一般将来时被动',
    structure: 'will be + done',
    examples: [
      { en: 'The meeting will be held tomorrow.', cn: '会议明天将被举行。', highlight: 'will be held' },
      { en: 'A new school will be built here.', cn: '这里将建一所新学校。', highlight: 'will be built' },
    ],
    rule: 'will be + 完成态形式',
    note: '也可以用 be going to be done',
  },
  {
    type: '现在进行时被动',
    structure: 'am/is/are being + done',
    examples: [
      { en: 'The room is being cleaned now.', cn: '房间正在被打扫。', highlight: 'is being cleaned' },
      { en: 'A new bridge is being built.', cn: '一座新桥正在建造中。', highlight: 'is being built' },
    ],
    rule: 'am/is/are being + 完成态形式',
    note: '进行时被动 = be being done',
  },
  {
    type: '现在完成时被动',
    structure: 'have/has been + done',
    examples: [
      { en: 'The work has been finished.', cn: '工作已经被完成了。', highlight: 'has been finished' },
      { en: 'Three books have been published.', cn: '三本书已经被出版了。', highlight: 'have been published' },
    ],
    rule: 'have/has been + 完成态形式',
    note: '完成时被动 = have/has been done',
  },
  {
    type: '情态动词被动',
    structure: 'can/may/must/should + be + done',
    examples: [
      { en: 'The problem can be solved.', cn: '这个问题可以被解决。', highlight: 'can be solved' },
      { en: 'This rule must be followed.', cn: '这条规则必须被遵守。', highlight: 'must be followed' },
      { en: 'The homework should be finished on time.', cn: '作业应该按时被完成。', highlight: 'should be finished' },
    ],
    rule: '情态动词 + be + 完成态形式',
    note: '情态动词的被动结构最常用',
  },
  {
    type: '感官动词被动',
    structure: 'see/hear/watch + sb + be + done',
    examples: [
      { en: 'He was seen to enter the building.', cn: '有人看见他进了大楼。', highlight: 'was seen to' },
      { en: 'She was heard singing in the room.', cn: '有人听到她在房间里唱歌。', highlight: 'was heard singing' },
    ],
    rule: '感官动词在被动语态中要还原to',
    note: '主动：see sb do → 被动：sb be seen to do',
  },
  {
    type: '使役动词被动',
    structure: 'make/let/have + sb + be + done',
    examples: [
      { en: 'He was made to apologize.', cn: '他被迫道歉。', highlight: 'was made to' },
      { en: 'The students were made to clean the classroom.', cn: '学生们被要求打扫教室。', highlight: 'were made to' },
    ],
    rule: '使役动词make在被动语态中要还原to',
    note: '主动：make sb do → 被动：sb be made to do',
  },
  {
    type: '双宾语被动（人作主语）',
    structure: 'Sb + be + done + sth',
    examples: [
      { en: 'I was given a book.', cn: '我被给了一本书。', highlight: 'was given' },
      { en: 'She was told a story.', cn: '她被人讲了一个故事。', highlight: 'was told' },
    ],
    rule: '双宾语动词变被动时，人作主语或物作主语都可以',
    note: 'I was given a book = A book was given to me',
  },
  {
    type: '双宾语被动（物作主语）',
    structure: 'Sth + be + done + to sb',
    examples: [
      { en: 'A book was given to me.', cn: '一本书被给了我。', highlight: 'was given to' },
      { en: 'The news was told to everyone.', cn: '消息被告诉了所有人。', highlight: 'was told to' },
    ],
    rule: '物作主语时，人前面要加to/for',
    note: 'give sth to sb / buy sth for sb',
  },
];

// ========== 虚拟句数据 ==========
const VIRTUAL_SENTENCES = {
  standard: [
    {
      type: '第一类：与现在事实相反',
      condition: 'if + 主语 + 过去式（be用were）',
      main: '主语 + would/should/could/might + do',
      examples: [
        { en: 'If I were you, I would study harder.', cn: '如果我是你，我会更努力学习。', explanation: '（我不是你，这是事实）' },
        { en: 'If she had time, she would help you.', cn: '如果她有时间，她会帮你的。', explanation: '（她没有时间）' },
        { en: 'If they knew the truth, they might change their minds.', cn: '如果他们知道真相，他们可能会改变主意。', explanation: '（他们不知道真相）' },
      ],
      tip: '条件句用过去式，主句用would + 动词原形。注意：be动词一律用were（无论主语是第几人称）',
    },
    {
      type: '第二类：与过去事实相反',
      condition: 'if + 主语 + had done',
      main: '主语 + would/should/could/might + have done',
      examples: [
        { en: 'If I had studied harder, I would have passed the exam.', cn: '如果我当时更努力学习，我就能通过考试了。', explanation: '（当时没努力，所以没通过）' },
        { en: 'If she had arrived earlier, she could have caught the train.', cn: '如果她早到一点，她就能赶上火车了。', explanation: '（她到晚了，没赶上）' },
        { en: 'If they had listened to me, they would not have made that mistake.', cn: '如果他们当时听我的，就不会犯那个错误了。', explanation: '（他们没听，所以犯了错）' },
      ],
      tip: '条件句用had done，主句用would have done。这是最常见的虚拟语气形式',
    },
    {
      type: '第三类：与将来事实相反（不太可能）',
      condition: 'if + 主语 + should do / were to do / 过去式',
      main: '主语 + would/should/could/might + do',
      examples: [
        { en: 'If it should rain tomorrow, we would cancel the picnic.', cn: '万一明天下雨，我们就取消野餐。', explanation: '（明天可能不下雨，但万一呢）' },
        { en: 'If he were to come, I would be surprised.', cn: '如果他真的来了，我会很惊讶。', explanation: '（他来不太可能）' },
        { en: 'If you should meet him, please give him this letter.', cn: '万一你遇见他，请把这封信交给他。', explanation: '（遇见的可能性很小）' },
      ],
      tip: 'should do 表示"万一"，were to do 表示"如果...的话（不太可能）"',
    },
  ],
  mixed: [
    {
      type: '混合虚拟：从句与过去相反 + 主句与现在相反',
      condition: 'if + 主语 + had done（过去事实）',
      main: '主语 + would/should/could/might + do（现在结果）',
      examples: [
        { en: 'If I had studied English well (before), I would not have trouble now.', cn: '如果当初我英语学好了，现在就不会这么费劲了。', explanation: '从句=过去没学好 → 主句=现在有麻烦' },
        { en: 'If he had taken the medicine (yesterday), he would be healthy now.', cn: '如果他昨天吃了药，现在就会好了。', explanation: '从句=昨天没吃药 → 主句=现在还没好' },
      ],
      tip: '这是最常见的混合虚拟——后悔过去，影响现在',
    },
    {
      type: '混合虚拟：从句与现在相反 + 主句与过去相反',
      condition: 'if + 主语 + 过去式（现在事实）',
      main: '主语 + would/should/could/might + have done（过去结果）',
      examples: [
        { en: 'If I were more careful (now), I would not have made that mistake (before).', cn: '如果我更细心一点，我就不会犯那个错误了。', explanation: '从句=现在不细心 → 主句=过去犯了错' },
      ],
      tip: '较少见的混合虚拟——现在的性格/习惯影响过去',
    },
  ],
  special: [
    {
      type: '省略if的倒装虚拟',
      condition: 'Had/Should/Were + 主语 + ...',
      main: '(省略if，把助动词提前)',
      examples: [
        { en: 'Had I known the truth, I would have told you.', cn: '如果我知道真相，我就告诉你了。', explanation: '= If I had known the truth...' },
        { en: 'Should you see him, give him my regards.', cn: '万一你见到他，代我向他问好。', explanation: '= If you should see him...' },
        { en: 'Were I in your position, I would accept the offer.', cn: '如果我处在你的位置，我会接受这个提议。', explanation: '= If I were in your position...' },
      ],
      tip: '省略if后，把had/should/were提到句首。这是正式文体中常见的用法',
    },
    {
      type: '含蓄虚拟（没有if）',
      condition: '用 without / but for / otherwise / or 等代替if',
      main: '主句仍用虚拟语气',
      examples: [
        { en: 'Without your help, I would have failed.', cn: '没有你的帮助，我就失败了。', explanation: '= If it had not been for your help' },
        { en: 'But for the rain, we would have gone out.', cn: '要不是下雨，我们就出去了。', explanation: '= If it had not rained' },
        { en: 'I was ill that day. Otherwise, I would have attended the meeting.', cn: '那天我生病了。否则我就参加会议了。', explanation: 'otherwise = if I had not been ill' },
      ],
      tip: 'without/but for = 如果没有；otherwise/or = 否则。含蓄虚拟是考试中常考的高级形式',
    },
    {
      type: 'wish + 虚拟',
      condition: 'wish + 从句（虚拟）',
      main: '现在→过去式 / 过去→had done / 将来→would/could do',
      examples: [
        { en: 'I wish I were taller.', cn: '我希望我更高一些。', explanation: '与现在事实相反→用过去式(were)' },
        { en: 'She wishes she had studied harder.', cn: '她希望她当时更努力学习了。', explanation: '与过去事实相反→用had done' },
        { en: 'I wish you would stop talking.', cn: '我希望你能停止说话。', explanation: '与将来愿望→用would do' },
      ],
      tip: 'wish后的从句必须用虚拟语气，不能表达真实愿望',
    },
    {
      type: 'It is time + 虚拟',
      condition: "It's time (for sb) to do / It's time + 主语 + 过去式",
      main: '用过去式表示虚拟',
      examples: [
        { en: "It's time we went home.", cn: '我们该回家了。', explanation: '用went（过去式）表示虚拟' },
        { en: "It's high time you started studying.", cn: '你真该开始学习了。', explanation: "high time 语气更强，表示'早该...了'" },
      ],
      tip: "It's time + 过去式 = 该做某事了（暗示已经晚了）",
    },
  ],
};

// ========== 题库数据 ==========
const QUIZ_DATA = [
  { q: 'If I ___ (be) you, I would accept the offer.', a: 'were', type: '虚拟-现在', tip: '与现在相反，be一律用were' },
  { q: 'If she ___ (study) harder, she would have passed the exam.', a: 'had studied', type: '虚拟-过去', tip: '与过去相反，用had done' },
  { q: 'The letter ___ (send) yesterday.', a: 'was sent', type: '被字句-过去时', tip: 'was/were + done' },
  { q: 'The problem can ___ (solve) easily.', a: 'be solved', type: '被字句-情态', tip: 'can + be + done' },
  { q: 'Please ___ (put) the book on the shelf.（用把字句表达）', a: 'put', type: '把字句', tip: 'put sth on... = 把...放在...上' },
  { q: '___ I known the truth, I would have told you.（省略if倒装）', a: 'Had', type: '虚拟-倒装', tip: '省略if，Had提前' },
  { q: 'It is time we ___ (leave).', a: 'left', type: '虚拟-It is time', tip: "It's time + 过去式" },
  { q: 'The work ___ (finish) by tomorrow.', a: 'will be finished', type: '被字句-将来', tip: 'will be + done' },
  { q: 'I wish I ___ (can) speak French.', a: 'could', type: '虚拟-wish', tip: 'wish + 过去式/过去形式' },
  { q: '___ your help, I would have failed.（含蓄虚拟）', a: 'Without', type: '虚拟-含蓄', tip: 'Without = If it had not been for' },
];

// 放大显示组件
function DetailModal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-900 rounded-2xl border border-amber-500/30 shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-slate-900/95 backdrop-blur border-b border-slate-700 p-4 flex items-center justify-between z-10">
              <h2 className="text-lg font-bold text-amber-400">{title}</h2>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function VerbAspectDetail({ activeTab }: VerbAspectDetailProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [showQuizAnswer, setShowQuizAnswer] = useState<Record<number, boolean>>({});

  const openModal = (title: string, content: React.ReactNode) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };

  // ========== 时态矩阵 ==========
  if (activeTab === 'matrix') {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Clock size={20} className="text-amber-400" />
            英语16种时态矩阵
          </h2>
          <p className="text-slate-400 text-sm">4种时间 × 4种体态 = 16种时态组合</p>
        </motion.div>

        <div className="space-y-6">
          {TENSE_MATRIX.map((group, gi) => (
            <div key={gi}>
              <h3 className="text-amber-400 font-bold text-lg mb-3 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 text-xs flex items-center justify-center font-bold">{gi + 1}</span>
                {group.time}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {group.aspects.map((tense, ti) => (
                  <motion.div
                    key={ti}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: ti * 0.05 }}
                    className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/30 transition-all cursor-pointer group"
                    onClick={() => openModal(tense.name, (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                          <h4 className="text-cyan-300 font-bold mb-1">{tense.englishName}</h4>
                          <p className="text-white text-lg font-black">{tense.warmName}</p>
                          <p className="mt-2 text-sm leading-6 text-cyan-50/80">{tense.warmExplanation}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                          <h4 className="text-amber-400 font-bold mb-2">结构</h4>
                          <p className="text-white font-mono text-lg">{tense.structure}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                          <h4 className="text-emerald-400 font-bold mb-2">例句</h4>
                          <p className="text-white">{tense.example}</p>
                          <p className="text-slate-400 text-sm mt-1">{tense.cn}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20">
                          <h4 className="text-violet-400 font-bold mb-2">用法</h4>
                          <p className="text-slate-300">{tense.usage}</p>
                        </div>
                      </div>
                    ))}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="text-white font-semibold group-hover:text-amber-300 transition-colors">{tense.name}</h4>
                        <p className="mt-0.5 text-[10px] font-black uppercase tracking-wide text-cyan-300/80">{tense.englishName}</p>
                      </div>
                      <Maximize2 size={14} className="text-slate-500 group-hover:text-amber-400 transition-colors" />
                    </div>
                    <p className="mb-2 rounded-lg bg-cyan-400/10 px-2 py-1 text-xs font-bold leading-5 text-cyan-100">{tense.warmName}</p>
                    <p className="text-amber-400/80 text-sm font-mono mb-1">{tense.structure}</p>
                    <p className="text-slate-400 text-xs">{tense.example}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
          {modalContent}
        </DetailModal>
      </div>
    );
  }

  // ========== 把字句 ==========
  if (activeTab === 'ba') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Hammer size={20} className="text-amber-400" />
            把字句（全部用法 + 例句）
          </h2>
          <p className="text-slate-400 text-sm">英语中没有"把"字，通常用动词短语来表达</p>
        </motion.div>

        <div className="space-y-4">
          {BA_SENTENCES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-amber-500/30 transition-all cursor-pointer"
              onClick={() => openModal(item.type, (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <h4 className="text-amber-400 font-bold mb-1">类型</h4>
                    <p className="text-white">{item.desc}</p>
                  </div>
                  <div className="space-y-2">
                    {item.examples.map((ex, ei) => (
                      <div key={ei} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <p className="text-white font-mono">{ex.en}</p>
                        <p className="text-amber-300/80 text-sm mt-1">{ex.cn}</p>
                        <p className="text-slate-500 text-xs mt-1">重点：{ex.highlight}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <h4 className="text-emerald-400 font-bold text-sm mb-1 flex items-center gap-1">
                      <Lightbulb size={14} /> 规则
                    </h4>
                    <p className="text-slate-300 text-sm">{item.rule}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <h4 className="text-cyan-400 font-bold text-sm mb-1 flex items-center gap-1">
                      <BookOpen size={14} /> 笔记
                    </h4>
                    <p className="text-slate-300 text-sm">{item.note}</p>
                  </div>
                </div>
              ))}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <span className="text-amber-400 font-bold">{i + 1}.</span>
                  {item.type}
                </h3>
                <Maximize2 size={14} className="text-slate-500" />
              </div>
              <p className="text-slate-400 text-sm">{item.desc}</p>
              <div className="mt-2 flex gap-2">
                {item.examples.slice(0, 1).map((ex, ei) => (
                  <span key={ei} className="text-xs text-amber-400/60 font-mono truncate">{ex.en}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <DetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
          {modalContent}
        </DetailModal>
      </div>
    );
  }

  // ========== 被字句 ==========
  if (activeTab === 'bei') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Shield size={20} className="text-amber-400" />
            被字句（全部用法 + 例句）
          </h2>
          <p className="text-slate-400 text-sm">被动语态 = be + 完成态形式(done)</p>
        </motion.div>

        <div className="space-y-3">
          {BEI_SENTENCES.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-emerald-500/30 transition-all cursor-pointer"
              onClick={() => openModal(item.type, (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <h4 className="text-emerald-400 font-bold mb-1">结构</h4>
                    <p className="text-white font-mono text-lg">{item.structure}</p>
                  </div>
                  <div className="space-y-2">
                    {item.examples.map((ex, ei) => (
                      <div key={ei} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                        <p className="text-white font-mono">
                          {ex.en.split(ex.highlight).map((part, pi) => (
                            <span key={pi}>
                              {part}
                              {pi === 0 && <span className="text-emerald-400 font-bold">{ex.highlight}</span>}
                            </span>
                          ))}
                        </p>
                        <p className="text-slate-400 text-sm mt-1">{ex.cn}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <h4 className="text-amber-400 font-bold text-sm mb-1">规则</h4>
                    <p className="text-slate-300 text-sm">{item.rule}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                    <h4 className="text-cyan-400 font-bold text-sm mb-1">笔记</h4>
                    <p className="text-slate-300 text-sm">{item.note}</p>
                  </div>
                </div>
              ))}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-white font-semibold">{item.type}</h3>
                <span className="text-xs font-mono text-emerald-400/80 bg-emerald-500/10 px-2 py-0.5 rounded">{item.structure}</span>
              </div>
              <p className="text-slate-400 text-xs">{item.examples[0].cn}</p>
            </motion.div>
          ))}
        </div>

        <DetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
          {modalContent}
        </DetailModal>
      </div>
    );
  }

  // ========== 虚拟句 ==========
  if (activeTab === 'virtual') {
    return (
      <div className="max-w-5xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <Ghost size={20} className="text-amber-400" />
            虚拟句（标准用法 + 混合用法）
          </h2>
          <p className="text-slate-400 text-sm">表达与事实相反或不可能实现的愿望、假设</p>
        </motion.div>

        {/* 标准用法 */}
        <div className="mb-8">
          <h3 className="text-amber-400 font-bold text-lg mb-4 flex items-center gap-2">
            <CheckCircle size={18} />
            标准虚拟语气
          </h3>
          <div className="space-y-4">
            {VIRTUAL_SENTENCES.standard.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 hover:border-violet-500/30 transition-all cursor-pointer"
                onClick={() => openModal(item.type, (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                        <h4 className="text-violet-400 font-bold text-sm mb-1">条件句</h4>
                        <p className="text-white font-mono text-sm">{item.condition}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h4 className="text-amber-400 font-bold text-sm mb-1">主句</h4>
                        <p className="text-white font-mono text-sm">{item.main}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {item.examples.map((ex, ei) => (
                        <div key={ei} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                          <p className="text-white font-mono">{ex.en}</p>
                          <p className="text-amber-300/80 text-sm mt-1">{ex.cn}</p>
                          <p className="text-slate-500 text-xs mt-1 italic">{ex.explanation}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <Lightbulb size={14} className="text-cyan-400 inline mr-1" />
                      <span className="text-slate-300 text-sm">{item.tip}</span>
                    </div>
                  </div>
                ))}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-white font-semibold">{item.type}</h4>
                  <span className="text-xs font-mono text-violet-400/80 bg-violet-500/10 px-2 py-0.5 rounded">{item.condition.substring(0, 20)}...</span>
                </div>
                <p className="text-slate-400 text-xs">{item.examples[0].en}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 混合用法 */}
        <div className="mb-8">
          <h3 className="text-emerald-400 font-bold text-lg mb-4 flex items-center gap-2">
            <AlertTriangle size={18} />
            混合虚拟语气
          </h3>
          <div className="space-y-3">
            {VIRTUAL_SENTENCES.mixed.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-emerald-500/20 hover:border-emerald-500/40 transition-all cursor-pointer"
                onClick={() => openModal(item.type, (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                        <h4 className="text-violet-400 font-bold text-sm mb-1">条件句</h4>
                        <p className="text-white font-mono text-sm">{item.condition}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                        <h4 className="text-amber-400 font-bold text-sm mb-1">主句</h4>
                        <p className="text-white font-mono text-sm">{item.main}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {item.examples.map((ex, ei) => (
                        <div key={ei} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                          <p className="text-white font-mono">{ex.en}</p>
                          <p className="text-amber-300/80 text-sm mt-1">{ex.cn}</p>
                          <p className="text-emerald-400 text-xs mt-1 italic">{ex.explanation}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <Lightbulb size={14} className="text-cyan-400 inline mr-1" />
                      <span className="text-slate-300 text-sm">{item.tip}</span>
                    </div>
                  </div>
                ))}
              >
                <h4 className="text-white font-semibold mb-1">{item.type}</h4>
                <p className="text-emerald-400/80 text-xs">{item.examples[0].explanation}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 特殊形式 */}
        <div>
          <h3 className="text-rose-400 font-bold text-lg mb-4 flex items-center gap-2">
            <Ghost size={18} />
            特殊虚拟形式
          </h3>
          <div className="space-y-3">
            {VIRTUAL_SENTENCES.special.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-slate-800/50 border border-rose-500/20 hover:border-rose-500/40 transition-all cursor-pointer"
                onClick={() => openModal(item.type, (
                  <div className="space-y-4">
                    <div className="p-3 rounded-xl bg-violet-500/10 border border-violet-500/20">
                      <h4 className="text-violet-400 font-bold text-sm mb-1">结构</h4>
                      <p className="text-white font-mono">{item.condition}</p>
                    </div>
                    <div className="space-y-2">
                      {item.examples.map((ex, ei) => (
                        <div key={ei} className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                          <p className="text-white font-mono">{ex.en}</p>
                          <p className="text-amber-300/80 text-sm mt-1">{ex.cn}</p>
                          <p className="text-rose-400 text-xs mt-1 italic">{ex.explanation}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                      <Lightbulb size={14} className="text-cyan-400 inline mr-1" />
                      <span className="text-slate-300 text-sm">{item.tip}</span>
                    </div>
                  </div>
                ))}
              >
                <h4 className="text-white font-semibold mb-1">{item.type}</h4>
                <p className="text-slate-400 text-xs">{item.examples[0].en}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <DetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
          {modalContent}
        </DetailModal>
      </div>
    );
  }

  // ========== 专项题库 ==========
  if (activeTab === 'quiz') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
          <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
            <BookOpen size={20} className="text-amber-400" />
            时态语态专项题库
          </h2>
          <p className="text-slate-400 text-sm">被字句 · 把字句 · 虚拟句 — 填空题</p>
        </motion.div>

        <div className="space-y-4">
          {QUIZ_DATA.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-slate-800/50 border border-slate-700"
            >
              <div className="flex items-start gap-3">
                <span className="text-amber-400 font-bold text-sm shrink-0 mt-1">{i + 1}.</span>
                <div className="flex-1">
                  <p className="text-white text-sm mb-2">{q.q}</p>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={quizAnswers[i] || ''}
                      onChange={e => setQuizAnswers(prev => ({ ...prev, [i]: e.target.value }))}
                      placeholder="填写答案..."
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                    />
                    <button
                      onClick={() => setShowQuizAnswer(prev => ({ ...prev, [i]: !prev[i] }))}
                      className="px-3 py-1.5 rounded-lg bg-amber-600 text-white text-xs font-medium hover:bg-amber-500 transition-colors shrink-0"
                    >
                      {showQuizAnswer[i] ? '隐藏' : '查看'}
                    </button>
                  </div>
                  {showQuizAnswer[i] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20"
                    >
                      <p className="text-emerald-400 font-medium text-sm">答案：{q.a}</p>
                      <p className="text-slate-400 text-xs mt-1">{q.tip}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-700 text-slate-400 text-xs">{q.type}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
