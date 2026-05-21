// 每个词性的独立信息（多词性支持）
export interface PosEntry {
  pos: string;        // 词性，如 "n.", "v.", "adj."
  meaning: string;    // 该词性的中文意思
  example: string;    // 体现社会主义核心价值观/云南中考主题的英文例句
  exampleCn: string;  // 例句中文翻译
}

export interface WordEntry {
  word: string;
  phonetic: string;
  syllables: string;       // ap·ple 带音节切分
  syllableColors: string[]; // 每个音节的颜色
  pos: string;             // 主词性（兼容旧数据），如 "n." 或 "adj./n."
  meanings: string[];      // 多义词义
  phrases: string[];       // 相关短语
  root?: string;           // 词根（可选）
  prefix?: string;         // 前缀（可选）
  suffix?: string;         // 后缀（可选）
  relatedWords: string[];  // 关联词（词族）
  example: string;         // 例句（兼容旧数据）
  level: string;           // 课标级别：核心/认知/拓展
  difficulty: string;      // 基础/进阶/培优
  examTag: string[];       // 常考/易错/易混/陷阱
  theme: string;           // 主题标签
  memoryTip: string;       // 记忆提示
  // 多词性支持：拆分后的每个词性详情
  posDetails?: PosEntry[];
}

export interface PhraseEntry {
  phrase: string;
  meaning: string;
  example: string;
  type: string;            // 动词短语/介词短语/习语
  related?: string;        // 近义短语
}

export interface AffixEntry {
  affix: string;
  type: "prefix" | "suffix" | "root";
  meaning: string;
  category: string;
  examples: { word: string; meaning: string }[];
  relatedWords: string[];
  examFrequency: number;   // 中考频率 1-5
}

// 小学词汇（PEP 3-6年级，精选480词按学期单元排列）
export const elementaryWords: WordEntry[][] = [
  // 三年级上 Unit 1-3（第1-15天）
  [
    { word: "ruler", phonetic: "/ˈruːlə/", syllables: "ru·ler", syllableColors: ["#60A5FA", "#F472B6"], pos: "n.", meanings: ["尺子"], phrases: ["a ruler 一把尺子"], relatedWords: ["rule 规则", "ruling 裁决"], example: "I have a long ruler.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "文具", memoryTip: "rule(规则)+r → 画规则的尺子" },
    { word: "pencil", phonetic: "/ˈpensl/", syllables: "pen·cil", syllableColors: ["#34D399", "#A78BFA"], pos: "n.", meanings: ["铅笔"], phrases: ["a pencil case 铅笔盒", "a box of pencils 一盒铅笔"], relatedWords: ["pen 钢笔"], example: "Write with a pencil.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "文具", memoryTip: "pen(笔)+cil → 铅笔" },
    { word: "eraser", phonetic: "/ɪˈreɪzə/", syllables: "e·ra·ser", syllableColors: ["#FBBF24", "#60A5FA", "#F472B6"], pos: "n.", meanings: ["橡皮"], phrases: ["an eraser 一块橡皮"], relatedWords: ["erase 擦除", "erasable 可擦除的"], suffix: "-er(名词后缀)", example: "I need an eraser.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "文具", memoryTip: "erase(擦除)+r → 橡皮" },
    { word: "crayon", phonetic: "/ˈkreɪən/", syllables: "cray·on", syllableColors: ["#F472B6", "#34D399"], pos: "n.", meanings: ["蜡笔"], phrases: ["a box of crayons 一盒蜡笔"], relatedWords: ["cray 蜡", "draw 画"], example: "Color with crayons.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "文具", memoryTip: "cray(蜡)+on → 蜡笔" },
    { word: "bag", phonetic: "/bæɡ/", syllables: "bag", syllableColors: ["#60A5FA"], pos: "n.", meanings: ["书包；包"], phrases: ["school bag 书包", "a bag of... 一袋..."], relatedWords: ["backpack 背包", "handbag 手提包"], example: "Open your bag.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "文具", memoryTip: "书包像ba(g)一样挂在背上" },
    { word: "pen", phonetic: "/pen/", syllables: "pen", syllableColors: ["#34D399"], pos: "n.", meanings: ["钢笔"], phrases: ["a pen 一支钢笔", "pen pal 笔友"], relatedWords: ["pencil 铅笔", "penny 便士"], example: "This is my pen.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "文具", memoryTip: "pen和pencil(铅笔)都有pen" },
    { word: "book", phonetic: "/bʊk/", syllables: "book", syllableColors: ["#A78BFA"], pos: "n.", meanings: ["书"], phrases: ["a book 一本书", "read a book 看书", "bookshop 书店"], relatedWords: ["notebook 笔记本", "textbook 课本"], example: "I like this book.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "文具", memoryTip: "book(书)→bookmark(书签)" },
    { word: "pencil-box", phonetic: "/ˈpensl bɒks/", syllables: "pen·cil-box", syllableColors: ["#34D399", "#A78BFA", "#FBBF24"], pos: "n.", meanings: ["铅笔盒"], phrases: ["in the pencil-box 在铅笔盒里"], relatedWords: ["pencil 铅笔", "box 盒子"], example: "My pencil-box is blue.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "文具", memoryTip: "pencil(铅笔)+box(盒子)" },
    { word: "school", phonetic: "/skuːl/", syllables: "school", syllableColors: ["#60A5FA"], pos: "n.", meanings: ["学校"], phrases: ["go to school 上学", "at school 在学校", "after school 放学后"], relatedWords: ["schoolbag 书包", "classroom 教室"], example: "I go to school every day.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "学校", memoryTip: "scho-o-l 像school bus的声音" },
    { word: "face", phonetic: "/feɪs/", syllables: "face", syllableColors: ["#F472B6"], pos: "n.", meanings: ["脸；面对"], phrases: ["face to face 面对面", "make a face 做鬼脸"], relatedWords: ["surface 表面", "interface 界面"], example: "Wash your face.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "身体", memoryTip: "face(脸)→facial(面部的)" },
    { word: "ear", phonetic: "/ɪə/", syllables: "ear", syllableColors: ["#34D399"], pos: "n.", meanings: ["耳朵"], phrases: ["an ear 一只耳朵"], relatedWords: ["hear 听", "earring 耳环"], example: "He has big ears.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "身体", memoryTip: "ear(耳朵)→hear(听)" },
    { word: "eye", phonetic: "/aɪ/", syllables: "eye", syllableColors: ["#60A5FA"], pos: "n.", meanings: ["眼睛"], phrases: ["an eye 一只眼睛"], relatedWords: ["eyesight 视力", "eyebrow 眉毛"], example: "She has beautiful eyes.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "身体", memoryTip: "eye像两个e就是眼睛" },
    { word: "nose", phonetic: "/nəʊz/", syllables: "nose", syllableColors: ["#FBBF24"], pos: "n.", meanings: ["鼻子"], phrases: ["blow one's nose 擤鼻涕"], relatedWords: ["nasal 鼻的"], example: "His nose is red.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "身体", memoryTip: "no+se → 鼻子(no)在脸部中间" },
    { word: "mouth", phonetic: "/maʊθ/", syllables: "mouth", syllableColors: ["#F472B6"], pos: "n.", meanings: ["嘴"], phrases: ["open one's mouth 张开嘴"], relatedWords: ["mouthful 满口"], example: "Open your mouth.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "身体", memoryTip: "mou-th → 嘴巴(mou)像th发音时张开" },
    { word: "arm", phonetic: "/ɑːm/", syllables: "arm", syllableColors: ["#A78BFA"], pos: "n.", meanings: ["胳膊"], phrases: ["arm in arm 臂挽臂"], relatedWords: ["army 军队", "armchair 扶手椅"], example: "Raise your arm.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "身体", memoryTip: "arm(胳膊)→army(军队)用胳膊打仗" },
    { word: "hand", phonetic: "/hænd/", syllables: "hand", syllableColors: ["#34D399"], pos: "n.", meanings: ["手"], phrases: ["hand in hand 手拉手", "by hand 手工", "on the one hand 一方面"], relatedWords: ["handbag 手提包", "handwriting 书写"], example: "Wash your hands.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "身体", memoryTip: "hand(手)→hand+y= handy(方便的)" },
    { word: "leg", phonetic: "/leɡ/", syllables: "leg", syllableColors: ["#60A5FA"], pos: "n.", meanings: ["腿"], phrases: ["a leg 一条腿"], relatedWords: ["legend 传奇(源自leg)"], example: "He broke his leg.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "身体", memoryTip: "leg(腿)跑起来像leap(跳)" },
    { word: "foot", phonetic: "/fʊt/", syllables: "foot", syllableColors: ["#FBBF24"], pos: "n.", meanings: ["脚；英尺"], phrases: ["on foot 步行", "at the foot of 在...脚下"], relatedWords: ["feet(复数) 脚/英尺", "football 足球"], example: "I go to school on foot.", level: "核心", difficulty: "基础", examTag: ["常考", "易错"], theme: "身体", memoryTip: "foot→feet(不规则复数)" },
    { word: "red", phonetic: "/red/", syllables: "red", syllableColors: ["#EF4444"], pos: "adj./n.", meanings: ["红色的；红色"], phrases: ["in red 穿红色"], relatedWords: ["reddish 微红的"], example: "I like red.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "颜色", memoryTip: "red(红色)→read(读)同音" },
    { word: "green", phonetic: "/ɡriːn/", syllables: "green", syllableColors: ["#10B981"], pos: "adj./n.", meanings: ["绿色的；绿色"], phrases: ["green hand 新手", "go green 环保"], relatedWords: ["greenery 绿植"], example: "The leaves are green.", level: "核心", difficulty: "基础", examTag: ["常考"], theme: "颜色", memoryTip: "green hand=新手(绿色=没经验)" },
  ],
];

// 小学短语（按学期排列）
export const elementaryPhrases: PhraseEntry[][] = [
  [
    { phrase: "go to school", meaning: "去上学", example: "I go to school every day.", type: "动词短语" },
    { phrase: "open your book", meaning: "打开你的书", example: "Please open your book.", type: "动词短语" },
    { phrase: "close your eyes", meaning: "闭上眼睛", example: "Close your eyes and count.", type: "动词短语" },
    { phrase: "on foot", meaning: "步行", example: "I come to school on foot.", type: "介词短语", related: "by bus/car" },
    { phrase: "in the morning", meaning: "在早上", example: "I study English in the morning.", type: "介词短语" },
    { phrase: "face to face", meaning: "面对面", example: "Let's talk face to face.", type: "习语" },
    { phrase: "hand in hand", meaning: "手拉手", example: "We walked hand in hand.", type: "习语" },
    { phrase: "a piece of cake", meaning: "小菜一碟", example: "This test is a piece of cake.", type: "习语" },
    { phrase: "go green", meaning: "环保", example: "We should go green.", type: "习语" },
    { phrase: "look at", meaning: "看...", example: "Look at the blackboard.", type: "动词短语" },
    { phrase: "listen to", meaning: "听...", example: "Listen to the teacher.", type: "动词短语" },
    { phrase: "get up", meaning: "起床", example: "I get up at 7 o'clock.", type: "动词短语" },
    { phrase: "go home", meaning: "回家", example: "Let's go home.", type: "动词短语" },
    { phrase: "have lunch", meaning: "吃午饭", example: "I have lunch at school.", type: "动词短语" },
    { phrase: "play football", meaning: "踢足球", example: "They play football after school.", type: "动词短语" },
  ],
];

// 初中词汇（精选600词）
export const middleWords: WordEntry[][] = [
  [
    { word: "achievement", phonetic: "/əˈtʃiːvmənt/", syllables: "a·chieve·ment", syllableColors: ["#60A5FA", "#34D399", "#F472B6"], pos: "n.", meanings: ["成就；成绩"], phrases: ["make an achievement 取得成就"], root: "chieve(达到)", suffix: "-ment(名词后缀)", relatedWords: ["achieve v.达到", "achievable adj.可达到的"], example: "His achievement is remarkable.", level: "核心", difficulty: "进阶", examTag: ["常考"], theme: "学习", memoryTip: "achieve(达到)+ment(名词后缀)=achievement" },
    { word: "abandon", phonetic: "/əˈbændən/", syllables: "a·ban·don", syllableColors: ["#FBBF24", "#A78BFA", "#34D399"], pos: "v.", meanings: ["放弃；抛弃"], phrases: ["abandon one's plan 放弃计划"], relatedWords: ["abandoned adj.被抛弃的"], example: "Don't abandon your dreams.", level: "核心", difficulty: "培优", examTag: ["常考"], theme: "学习", memoryTip: "a+band(带子)+on → 把带子放上去=放弃" },
    { word: "absolute", phonetic: "/ˈæbsəluːt/", syllables: "ab·so·lute", syllableColors: ["#60A5FA", "#F472B6", "#34D399"], pos: "adj.", meanings: ["绝对的；完全的"], phrases: ["absolute zero 绝对零度"], prefix: "ab-(离开)", root: "solute(松开)", relatedWords: ["absolutely adv.绝对地"], example: "That's absolute nonsense.", level: "拓展", difficulty: "培优", examTag: ["常考"], theme: "抽象", memoryTip: "ab(离开)+solute(松开)=绝对放开=绝对的" },
    { word: "accept", phonetic: "/əkˈsept/", syllables: "ac·cept", syllableColors: ["#A78BFA", "#FBBF24"], pos: "v.", meanings: ["接受；认可"], phrases: ["accept an invitation 接受邀请", "accept the fact 接受事实"], prefix: "ac-(向)", root: "cept(拿)", relatedWords: ["except prep.除...外", "acceptance n.接受", "acceptable adj.可接受的"], example: "I accept your apology.", level: "核心", difficulty: "进阶", examTag: ["常考", "易混"], theme: "交际", memoryTip: "accept(接受) vs except(除了) → ac+cept=向里拿=接受" },
    { word: "accident", phonetic: "/ˈæksɪdənt/", syllables: "ac·ci·dent", syllableColors: ["#60A5FA", "#34D399", "#F472B6"], pos: "n.", meanings: ["事故；意外"], phrases: ["by accident 偶然", "traffic accident 交通事故", "have an accident 出事故"], prefix: "ac-(向)", root: "cid(落下)", suffix: "-ent(名词后缀)", relatedWords: ["accidental adj.偶然的", "accidentally adv.偶然地"], example: "I met her by accident.", level: "核心", difficulty: "进阶", examTag: ["常考"], theme: "安全", memoryTip: "ac(向)+cid(落下)+ent=落到头上=意外" },
    { word: "accommodation", phonetic: "/əˌkɒməˈdeɪʃn/", syllables: "ac·com·mo·da·tion", syllableColors: ["#FBBF24", "#A78BFA", "#34D399", "#F472B6", "#60A5FA"], pos: "n.", meanings: ["住处；食宿；适应"], phrases: ["find accommodation 找住处"], prefix: "ac-(向)", root: "commod(方便)", suffix: "-ation(名词后缀)", relatedWords: ["accommodate v.容纳/适应"], example: "We need to find accommodation.", level: "核心", difficulty: "培优", examTag: ["常考"], theme: "旅行", memoryTip: "ac+commod(方便)+ation=提供便利=住处" },
  ],
];

// 初中短语
export const middlePhrases: PhraseEntry[][] = [
  [
    { phrase: "look forward to", meaning: "期待...（to是介词，后接doing）", example: "I look forward to seeing you.", type: "动词短语" },
    { phrase: "be good at", meaning: "擅长...（at是介词，后接doing）", example: "She is good at dancing.", type: "动词短语" },
    { phrase: "pay attention to", meaning: "注意...（to是介词）", example: "Pay attention to your spelling.", type: "动词短语" },
    { phrase: "take part in", meaning: "参加...", example: "I took part in the competition.", type: "动词短语" },
    { phrase: "be proud of", meaning: "为...感到骄傲", example: "I'm proud of my son.", type: "介词短语" },
    { phrase: "be interested in", meaning: "对...感兴趣", example: "He's interested in science.", type: "介词短语" },
    { phrase: "be afraid of", meaning: "害怕...", example: "Don't be afraid of difficulties.", type: "介词短语" },
    { phrase: "be famous for", meaning: "因...著名", example: "Kunming is famous for flowers.", type: "介词短语" },
    { phrase: "be different from", meaning: "与...不同", example: "Life here is different from home.", type: "介词短语" },
    { phrase: "be similar to", meaning: "与...相似", example: "Your bag is similar to mine.", type: "介词短语" },
    { phrase: "as soon as", meaning: "一...就...", example: "I'll call you as soon as I arrive.", type: "连词短语" },
    { phrase: "so...that...", meaning: "如此...以至于...", example: "He was so tired that he fell asleep.", type: "连词短语" },
    { phrase: "not only...but also...", meaning: "不但...而且...（就近原则）", example: "She not only sings but also dances.", type: "连词短语" },
    { phrase: "either...or...", meaning: "要么...要么...（就近原则）", example: "Either you or he is wrong.", type: "连词短语" },
    { phrase: "neither...nor...", meaning: "既不...也不...（就近原则）", example: "Neither Tom nor Mary likes math.", type: "连词短语" },
  ],
];

// 词根词缀数据
export const affixData: AffixEntry[] = [
  // 前缀 - 否定类
  { affix: "un-", type: "prefix", meaning: "不，相反", category: "否定", examples: [{ word: "unhappy", meaning: "不高兴的" }, { word: "unable", meaning: "不能的" }, { word: "unfair", meaning: "不公平的" }], relatedWords: ["unhappy", "unable", "unfair", "unlike", "undress", "untie"], examFrequency: 5 },
  { affix: "dis-", type: "prefix", meaning: "不，否定", category: "否定", examples: [{ word: "dislike", meaning: "不喜欢" }, { word: "disagree", meaning: "不同意" }, { word: "disappear", meaning: "消失" }], relatedWords: ["dislike", "disagree", "disappear", "dishonest", "disobey"], examFrequency: 5 },
  { affix: "in-/im-/il-/ir-", type: "prefix", meaning: "不（同化变体）", category: "否定", examples: [{ word: "incorrect", meaning: "不正确的" }, { word: "impossible", meaning: "不可能的" }, { word: "illegal", meaning: "非法的" }], relatedWords: ["incorrect", "impossible", "illegal", "irregular", "invisible"], examFrequency: 5 },
  { affix: "mis-", type: "prefix", meaning: "错误地", category: "否定", examples: [{ word: "misunderstand", meaning: "误解" }, { word: "mistake", meaning: "错误" }, { word: "mislead", meaning: "误导" }], relatedWords: ["misunderstand", "mistake", "mislead", "misuse", "mispronounce"], examFrequency: 4 },
  // 前缀 - 方向
  { affix: "pre-", type: "prefix", meaning: "前，预先", category: "方向", examples: [{ word: "predict", meaning: "预言" }, { word: "prepare", meaning: "准备" }, { word: "preview", meaning: "预习" }], relatedWords: ["predict", "prepare", "preview", "prefix", "prevent"], examFrequency: 4 },
  { affix: "re-", type: "prefix", meaning: "再，重新", category: "方向", examples: [{ word: "rewrite", meaning: "重写" }, { word: "return", meaning: "返回" }, { word: "recycle", meaning: "回收" }], relatedWords: ["rewrite", "return", "recycle", "review", "rebuild"], examFrequency: 5 },
  { affix: "inter-", type: "prefix", meaning: "在...之间", category: "方向", examples: [{ word: "international", meaning: "国际的" }, { word: "interview", meaning: "采访" }, { word: "internet", meaning: "互联网" }], relatedWords: ["international", "interview", "internet", "interact"], examFrequency: 4 },
  // 前缀 - 数量
  { affix: "bi-", type: "prefix", meaning: "二", category: "数量", examples: [{ word: "bicycle", meaning: "自行车" }, { word: "bilingual", meaning: "双语的" }], relatedWords: ["bicycle", "bilingual", "biweekly"], examFrequency: 3 },
  // 后缀 - 名词化
  { affix: "-tion/-sion", type: "suffix", meaning: "行为/状态", category: "名词化", examples: [{ word: "education", meaning: "教育" }, { word: "decision", meaning: "决定" }, { word: "discussion", meaning: "讨论" }], relatedWords: ["education", "decision", "discussion", "invitation", "information"], examFrequency: 5 },
  { affix: "-ment", type: "suffix", meaning: "行为/结果", category: "名词化", examples: [{ word: "movement", meaning: "运动" }, { word: "achievement", meaning: "成就" }, { word: "development", meaning: "发展" }], relatedWords: ["movement", "achievement", "development", "agreement", "improvement"], examFrequency: 5 },
  { affix: "-ness", type: "suffix", meaning: "性质/状态", category: "名词化", examples: [{ word: "happiness", meaning: "幸福" }, { word: "kindness", meaning: "善良" }, { word: "illness", meaning: "疾病" }], relatedWords: ["happiness", "kindness", "illness", "darkness", "weakness"], examFrequency: 5 },
  { affix: "-er/-or", type: "suffix", meaning: "执行者", category: "名词化", examples: [{ word: "teacher", meaning: "教师" }, { word: "actor", meaning: "演员" }, { word: "visitor", meaning: "访客" }], relatedWords: ["teacher", "actor", "visitor", "worker", "writer"], examFrequency: 5 },
  // 后缀 - 形容词化
  { affix: "-ful", type: "suffix", meaning: "充满...的", category: "形容词化", examples: [{ word: "careful", meaning: "仔细的" }, { word: "helpful", meaning: "有帮助的" }, { word: "beautiful", meaning: "美丽的" }], relatedWords: ["careful", "helpful", "beautiful", "useful", "hopeful"], examFrequency: 5 },
  { affix: "-less", type: "suffix", meaning: "无...的", category: "形容词化", examples: [{ word: "careless", meaning: "粗心的" }, { word: "homeless", meaning: "无家可归的" }, { word: "hopeless", meaning: "无望的" }], relatedWords: ["careless", "homeless", "hopeless", "useless", "endless"], examFrequency: 5 },
  { affix: "-able/-ible", type: "suffix", meaning: "可...的", category: "形容词化", examples: [{ word: "comfortable", meaning: "舒适的" }, { word: "valuable", meaning: "有价值的" }, { word: "accessible", meaning: "可进入的" }], relatedWords: ["comfortable", "valuable", "accessible", "reasonable"], examFrequency: 4 },
  { affix: "-ous", type: "suffix", meaning: "具有...的", category: "形容词化", examples: [{ word: "dangerous", meaning: "危险的" }, { word: "famous", meaning: "著名的" }, { word: "mysterious", meaning: "神秘的" }], relatedWords: ["dangerous", "famous", "mysterious", "nervous", "generous"], examFrequency: 4 },
  // 词根
  { affix: "dict", type: "root", meaning: "说", category: "动作", examples: [{ word: "predict", meaning: "预言(pre前+dict说)" }, { word: "dictionary", meaning: "字典" }, { word: "contradict", meaning: "反驳" }], relatedWords: ["predict", "dictionary", "contradict", "dictate", "verdict"], examFrequency: 4 },
  { affix: "port", type: "root", meaning: "携带，运", category: "动作", examples: [{ word: "transport", meaning: "运输(trans转移+port运)" }, { word: "import", meaning: "进口" }, { word: "export", meaning: "出口" }], relatedWords: ["transport", "import", "export", "report", "support"], examFrequency: 4 },
  { affix: "spect", type: "root", meaning: "看", category: "动作", examples: [{ word: "inspect", meaning: "检查(in向内+spect看)" }, { word: "respect", meaning: "尊重" }, { word: "expect", meaning: "期待" }], relatedWords: ["inspect", "respect", "expect", "suspect", "prospect"], examFrequency: 4 },
  { affix: "duc/duct", type: "root", meaning: "引导", category: "动作", examples: [{ word: "introduce", meaning: "介绍(intro向内+duc引导)" }, { word: "produce", meaning: "生产" }, { word: "educate", meaning: "教育" }], relatedWords: ["introduce", "produce", "educate", "reduce", "conduct"], examFrequency: 4 },
  { affix: "vid/vis", type: "root", meaning: "看", category: "认知", examples: [{ word: "video", meaning: "视频" }, { word: "visit", meaning: "参观" }, { word: "visible", meaning: "可见的" }], relatedWords: ["video", "visit", "visible", "advice", "provide"], examFrequency: 4 },
  { affix: "form", type: "root", meaning: "形式", category: "认知", examples: [{ word: "form", meaning: "形式" }, { word: "inform", meaning: "通知" }, { word: "transform", meaning: "变形" }], relatedWords: ["form", "inform", "transform", "perform", "reform"], examFrequency: 4 },
  { affix: "struct", type: "root", meaning: "建造", category: "认知", examples: [{ word: "structure", meaning: "结构" }, { word: "construct", meaning: "建造" }, { word: "instruct", meaning: "指导" }], relatedWords: ["structure", "construct", "instruct", "destroy", "instrument"], examFrequency: 3 },
  { affix: "cent", type: "root", meaning: "百", category: "数量", examples: [{ word: "century", meaning: "世纪" }, { word: "percent", meaning: "百分比" }, { word: "centimeter", meaning: "厘米" }], relatedWords: ["century", "percent", "centimeter", "centennial"], examFrequency: 3 },
  { affix: "graph/gram", type: "root", meaning: "写，画，记录", category: "认知", examples: [{ word: "autograph", meaning: "亲笔签名(auto自己+graph写)" }, { word: "photograph", meaning: "照片" }, { word: "grammar", meaning: "语法" }], relatedWords: ["autograph", "photograph", "grammar", "biography", "programme"], examFrequency: 3 },
  { affix: "phon", type: "root", meaning: "声音", category: "认知", examples: [{ word: "telephone", meaning: "电话(tele远+phon声音)" }, { word: "symphony", meaning: "交响乐" }, { word: "microphone", meaning: "麦克风" }], relatedWords: ["telephone", "symphony", "microphone", "phonics"], examFrequency: 3 },
  { affix: "meter/metr", type: "root", meaning: "测量", category: "度量", examples: [{ word: "thermometer", meaning: "温度计(therm热+meter测量)" }, { word: "diameter", meaning: "直径" }, { word: "centimeter", meaning: "厘米" }], relatedWords: ["thermometer", "diameter", "centimeter", "geometry"], examFrequency: 3 },
];

// 学期列表
export const elementarySemesters = [
  { grade: "三年级", term: "上册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"] },
  { grade: "三年级", term: "下册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"] },
  { grade: "四年级", term: "上册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"] },
  { grade: "四年级", term: "下册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"] },
  { grade: "五年级", term: "上册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"] },
  { grade: "五年级", term: "下册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"] },
  { grade: "六年级", term: "上册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6"] },
  { grade: "六年级", term: "下册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4"] },
];

export const middleSemesters = [
  { grade: "七年级", term: "上册", units: ["Starter U1-3", "Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6", "Unit 7", "Unit 8", "Unit 9"] },
  { grade: "七年级", term: "下册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6", "Unit 7", "Unit 8", "Unit 9", "Unit 10", "Unit 11", "Unit 12"] },
  { grade: "八年级", term: "上册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6", "Unit 7", "Unit 8", "Unit 9", "Unit 10"] },
  { grade: "八年级", term: "下册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6", "Unit 7", "Unit 8", "Unit 9", "Unit 10"] },
  { grade: "九年级", term: "全一册", units: ["Unit 1", "Unit 2", "Unit 3", "Unit 4", "Unit 5", "Unit 6", "Unit 7", "Unit 8", "Unit 9", "Unit 10", "Unit 11", "Unit 12", "Unit 13", "Unit 14"] },
];
