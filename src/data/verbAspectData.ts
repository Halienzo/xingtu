export interface TenseEntry {
  aspect: string;
  time: string;
  name: string;
  englishName: string;
  structure: string;
  passive: string;
  example: string;
  highlight: string;
  useCase: string;
  warmExplanation: string;
}

export const tenseMatrix: TenseEntry[] = [
  { aspect: "常态", time: "现在", name: "一般现在时", englishName: "Simple Present", structure: "do/does", passive: "am/is/are + done", example: "The sun **rises** in the east.", highlight: "rises", useCase: "习惯性动作、客观真理、时间表", warmExplanation: "你现在的样子，也值得被认真看见。" },
  { aspect: "常态", time: "过去", name: "一般过去时", englishName: "Simple Past", structure: "did", passive: "was/were + done", example: "I **visited** Beijing last year.", highlight: "visited", useCase: "过去发生的动作", warmExplanation: "过去的你努力过，那些经历不会白白消失。" },
  { aspect: "常态", time: "将来", name: "一般将来时", englishName: "Simple Future", structure: "will do / be going to do", passive: "will be + done", example: "I **will go** to university.", highlight: "will go", useCase: "将要发生的动作", warmExplanation: "未来还没有来，但你已经可以为自己留一束光。" },
  { aspect: "进行态", time: "现在", name: "现在进行时", englishName: "Present Continuous", structure: "am/is/are + doing", passive: "am/is/are being + done", example: "She **is reading** a book now.", highlight: "is reading", useCase: "此刻正在进行的动作", warmExplanation: "你正在变化，未完成不是失败。" },
  { aspect: "进行态", time: "过去", name: "过去进行时", englishName: "Past Continuous", structure: "was/were + doing", passive: "was/were being + done", example: "I **was watching** TV at 8 last night.", highlight: "was watching", useCase: "过去某时正在进行的动作", warmExplanation: "即使那时没人理解，你也一直在努力撑住自己。" },
  { aspect: "进行态", time: "将来", name: "将来进行时", englishName: "Future Continuous", structure: "will be + doing", passive: "—", example: "I **will be waiting** for you at the station.", highlight: "will be waiting", useCase: "将来某时正在进行的动作", warmExplanation: "将来的某一刻，你会发现自己还在向前。" },
  { aspect: "完成态", time: "现在", name: "现在完成时", englishName: "Present Perfect", structure: "have/has + done", passive: "have/has been + done", example: "I **have finished** my homework already.", highlight: "have finished", useCase: "已完成并对现在有影响", warmExplanation: "你经历过的，都正在悄悄组成现在的你。" },
  { aspect: "完成态", time: "过去", name: "过去完成时", englishName: "Past Perfect", structure: "had + done", passive: "had been + done", example: "She **had left** before I came.", highlight: "had left", useCase: "过去的过去", warmExplanation: "有些委屈发生得更早，但它们也值得被温柔安放。" },
  { aspect: "完成态", time: "将来", name: "将来完成时", englishName: "Future Perfect", structure: "will have + done", passive: "will have been + done", example: "I **will have completed** it by Friday.", highlight: "will have completed", useCase: "到将来某时已完成的动作", warmExplanation: "有一天，你会回头发现最难的路已经走过。" },
  { aspect: "完成进行态", time: "现在", name: "现在完成进行时", englishName: "Present Perfect Continuous", structure: "have/has been + doing", passive: "—", example: "I **have been waiting** for two hours.", highlight: "have been waiting", useCase: "从过去持续到现在并可能继续", warmExplanation: "你坚持了很久，这本身就值得被拥抱。" },
  { aspect: "完成进行态", time: "过去", name: "过去完成进行时", englishName: "Past Perfect Continuous", structure: "had been + doing", passive: "—", example: "He **had been working** all day before he rested.", highlight: "had been working", useCase: "过去的过去持续进行", warmExplanation: "那些看不见的坚持，也曾真实支撑过你。" },
  { aspect: "完成进行态", time: "将来", name: "将来完成进行时", englishName: "Future Perfect Continuous", structure: "will have been + doing", passive: "—", example: "By next year, I **will have been studying** for 5 years.", highlight: "will have been studying", useCase: "到将来某时持续进行", warmExplanation: "当时间拉长，你会看见自己一直没有停下。" },
  { aspect: "不定态", time: "现在", name: "现在不定态", englishName: "Present Be To", structure: "am/is/are to do", passive: "am/is/are to be + done", example: "The president **is to visit** China next month.", highlight: "is to visit", useCase: "按计划安排要做的事", warmExplanation: "你也可以有自己的安排，不必总被别人定义。" },
  { aspect: "不定态", time: "过去", name: "过去不定态", englishName: "Past Be To", structure: "was/were to do", passive: "was/were to be + done", example: "I **was to start** work at 9, but the bus was late.", highlight: "was to start", useCase: "过去原计划要做的事（但未实现）", warmExplanation: "计划没能实现，不代表你不够好。" },
  { aspect: "不定态", time: "现在", name: "不定态被动", englishName: "Be To Passive", structure: "am/is/are to be + done", passive: "—", example: "A new school **is to be built** in our town.", highlight: "is to be built", useCase: "按计划要被建/做", warmExplanation: "被安排的事也能被重新理解，你仍有自己的位置。" },
  { aspect: "常态", time: "将来", name: "be going to", englishName: "Be Going To", structure: "am/is/are going to do", passive: "—", example: "It **is going to rain** — look at those clouds!", highlight: "is going to rain", useCase: "有迹象表明即将发生的事", warmExplanation: "当你看见迹象，就已经比昨天更会照顾自己。" },
];

export const aspectExplanation = {
  aspects: [
    {
      name: "常态",
      color: "#3B82F6",
      description: "表示经常性、习惯性的动作或状态，不强调进行或完成。",
      features: ["习惯性动作", "客观真理", "固定时间表", "永恒事实"],
      examples: ["I go to school every day.", "The earth goes around the sun.", "The train leaves at 9 AM."],
    },
    {
      name: "进行态",
      color: "#10B981",
      description: "表示在某一时刻或时段正在进行的动作，强调动作的'进行过程'。",
      features: ["此刻正在进行", "某段时间持续进行", "计划中的将来安排"],
      examples: ["She is reading now.", "I was watching TV at 8.", "I will be waiting for you."],
    },
    {
      name: "完成态",
      color: "#F59E0B",
      description: "表示在某一时间点之前已经完成的动作，强调动作对'参照时间点'的影响。",
      features: ["已完成+对现在影响", "过去的过去", "到将来某时已完成的动作"],
      examples: ["I have finished. (对现在的影响)", "She had left before I came.", "I will have done it by Friday."],
    },
    {
      name: "完成进行态",
      color: "#EF4444",
      description: "表示从过去某一时间点开始，持续到现在（或过去/将来的某时），并可能继续进行的动作。",
      features: ["持续进行+可能继续", "强调时间长度", "带有感情色彩"],
      examples: ["I have been waiting for 2 hours. (还在等)", "He had been working all day.", "I will have been studying for 5 years."],
    },
    {
      name: "不定态",
      color: "#8B5CF6",
      description: "表示按计划、安排、命令、职责等'预定'要做的事。注意：不定态本身包含将来含义，因此不设计'will be to do'的形式。",
      features: ["按计划安排", "命令/职责", "命中注定", "过去原定（未实现）"],
      examples: [
        "The meeting is to be held tomorrow. (按计划安排)",
        "You are to finish this by 5. (命令/职责)",
        "I was to meet him, but he didn't come. (过去原定但未实现)",
        "A bridge is to be built here. (不定态被动)",
      ],
      beToBeNote: "be to be 是不定态的被动形式，表示'按计划要被...'。注意区分：be to be done = 不定态被动；be going to be done = 将要被...（口语）",
    },
  ],
  keyDifference: [
    { compare: "have done vs have been doing", diff: "前者强调完成的结果，后者强调持续的过程" },
    { compare: "was/were to do vs was/were going to do", diff: "前者是正式安排/计划，后者是打算/意图" },
    { compare: "be to do vs will do", diff: "前者是计划安排，后者是临时决定/预测" },
    { compare: "be to be done vs will be done", diff: "前者是计划被做，后者是将来被做" },
  ],
  note: "不定态（be to do/be to be）不设计将来形式（will be to do），因为不定态本身就包含了计划性的将来含义。",
};

export const timeMarkers: Record<string, string[]> = {
  "一般现在时": ["always", "usually", "often", "sometimes", "never", "every day", "on Sundays"],
  "一般过去时": ["yesterday", "last week", "ago", "in 2020", "the other day"],
  "一般将来时": ["tomorrow", "next week", "soon", "in the future", "in 3 days"],
  "现在进行时": ["now", "at the moment", "Look!", "Listen!", "right now"],
  "过去进行时": ["at 8 last night", "at that time", "when...came", "while...was doing"],
  "将来进行时": ["at this time tomorrow", "at 8 next Monday"],
  "现在完成时": ["already", "yet", "since", "for 3 years", "ever", "never", "so far"],
  "过去完成时": ["before", "by the end of last year", "when...arrived", "after...had done"],
  "将来完成时": ["by Friday", "by the end of next month", "before...comes"],
  "现在完成进行时": ["for 2 hours", "since morning", "all day"],
  "过去完成进行时": ["all day before...", "for years before..."],
  "将来完成进行时": ["by next year", "for 5 years by..."],
  "现在不定态": ["按计划", "安排", "命令"],
  "过去不定态": ["原定", "计划"],
};
