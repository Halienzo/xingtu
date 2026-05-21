import type { GrammarExamFocus } from './grammarDeepDiveData';

const trap = (
  title: string,
  trapText: string,
  wrong: string,
  right: string,
  explanation: string
) => ({ title, trap: trapText, wrong, right, explanation });

const drill = (en: string, cn: string, note: string) => ({ en, cn, note });

export const grammarExamFocusDetails: Record<string, GrammarExamFocus> = {
  nouns: {
    yunnanFocus: '云南小升初和中考常把名词放进单词填空、汉译英和完形语境里考：看似问词汇，实际考可数不可数、单复数、所有格和名词作定语。',
    mustKnow: [
      '可数单数不能裸用：要有 a/an/the/this/my 等限定词。',
      'information, advice, homework, news, weather, progress 常作不可数，不直接加 s。',
      'one of + the + 最高级 + 名词复数，是中考高频结构。',
    ],
    traps: [
      trap('不可数名词伪复数', '题干给 many/a few 等数量词，诱导学生把不可数名词硬加 s。', 'many informations', 'much information / a lot of information', 'information 是不可数名词，不能写 informations。'),
      trap('名词作定语不随意加复数', '汉语说“运动鞋、生日蛋糕”，英语前置名词通常用单数。', 'sports shoes / birthdays cake', 'sports shoes / birthday cake', 'sports 是固定复数形容词化，但 birthday cake 中 birthday 不加 s。'),
      trap('所有格和 of 结构混用', '看到“教室的门”就机械写 classroom\'s door。', 'the classroom\'s door', 'the door of the classroom', '无生命或地点归属常用 of 结构，更自然。'),
    ],
    microDrills: [
      drill('Thousands of visitors came to Yunnan during the festival.', '节日期间成千上万游客来到云南。', 'thousands of 后接可数名词复数。'),
    ],
  },
  pronouns: {
    yunnanFocus: '云南中考单项填空和单词填空常考代词格、物主代词、反身代词和不定代词，陷阱是“中文都像我/他/她”，但英语位置不同形式不同。',
    mustKnow: [
      '介词后用宾格：for us, between you and me。',
      '名词性物主代词 = 形容词性物主代词 + 名词：hers = her volleyball。',
      '反身代词必须回指主语：help yourself, teach himself。',
    ],
    traps: [
      trap('物主代词空后无名词', '空格后没有名词时，不能用 her/my/our，要用 hers/mine/ours。', 'The volleyball is her.', 'The volleyball is hers.', 'hers 已经包含 her volleyball 的意思。'),
      trap('介词后误用主格', 'between/for/to/with 后面如果接人称代词，要用宾格。', 'between you and I', 'between you and me', 'I 只能作主语，介词后用 me。'),
      trap('反身代词滥用', '不是所有“自己”都能用 myself；必须和主语对应。', 'Tom and myself went there.', 'Tom and I went there.', 'myself 不能代替 I 作并列主语。'),
    ],
    microDrills: [
      drill('She made the decision by herself.', '她自己做了这个决定。', 'by herself 表示独自完成。'),
    ],
  },
  articles: {
    yunnanFocus: '云南小升初到中考都会用冠词做“小空大坑”：a/an 看发音，the 看特指和固定结构，零冠词看泛指和习惯用法。感叹句、最高级、交通方式、乐器球类、姓氏一家人尤其容易被设计成陷阱。',
    mustKnow: [
      '26个字母按发音选冠词：an A/E/F/H/I/L/M/N/O/R/S/X；a B/C/D/G/J/K/P/Q/T/U/V/W/Y/Z。',
      'the 的核心是“双方知道/语境唯一/第二次出现”，还用于最高级、序数词、only/same、乐器、the + 形容词表示一类人、the + 复数姓氏表示一家人。',
      '零冠词常见于泛指复数/不可数、三餐、球类棋类、学科语言、by + 交通工具。',
    ],
    traps: [
      trap('a/an 按字母而不是发音', '题目放 university, hour, useful, honest, NBA, 8-year-old 让学生按首字母误选。', 'an university / a hour / a NBA player', 'a university / an hour / an NBA player', 'a/an 由后面第一个音决定，不由字母决定。'),
      trap('字母冠词专项坑', '小升初常考“一个 F / 一个 U / 一个 H”，学生以为元音字母前都用 an。', 'a F / an U / a H', 'an F / a U / an H', 'F/H 的读音以元音开头；U 的读音以 /j/ 开头。'),
      trap('the + 姓氏复数', 'Green/White/Brown 既像颜色又可作姓氏，考试会用大写和复数考一家人。', 'Green are having dinner.', 'The Greens are having dinner.', 'the Greens 表示 Green 一家人，谓语用复数。不是普通“绿色们”。'),
      trap('the + 形容词一类人', '看到 rich/poor/young/old 后没有名词，学生误以为缺 people。', 'Rich should help poor.', 'The rich should help the poor.', 'the + 形容词表示一类人，通常作复数意义。'),
      trap('乐器和球类反向混淆', 'play 后面一会儿有 the，一会儿没有 the。', 'play piano / play the basketball', 'play the piano / play basketball', '乐器前常用 the；球类、棋类通常零冠词。'),
      trap('交通方式零冠词', 'by 后接交通工具时，容易多加 a/the。', 'go to school by the bus', 'go to school by bus', 'by bus/train/bike 表方式，不加冠词；take a bus 另当别论。'),
    ],
    microDrills: [
      drill('I found an X on a useful map, and the map led us to the museum.', '我在一张有用的地图上发现了一个 X，那张地图把我们带到博物馆。', 'an X 按 /eks/；a useful 按 /ju:/；第二次 map 用 the。'),
    ],
  },
  numerals: {
    yunnanFocus: '云南小升初常把数词放在时间、日期、班级、编号、年龄和简单分数里考；云南中考会进一步放进单词填空、阅读数据、汉译英和作文细节，重点挖 hundred/thousand、序数词拼写、分数百分比主谓一致、复合形容词单复数、a/the + 序数词的意义差别。',
    mustKnow: [
      '具体数字 + hundred/thousand/million 不加 s；约数才用 hundreds/thousands/millions of。',
      '序数词通常用 the；a second/a third 表“又一、再一”，不是“第二、第三”的唯一顺序。',
      '复合形容词中名词用单数：an eight-year-old boy, a two-hour walk, a 100-word passage。',
      '分数分子大于一，分母序数词加 s：one third, two thirds；百分比主谓常看 of 后名词。',
    ],
    traps: [
      trap('hundred 加 s 陷阱', '题干给具体数字 two/five/several，诱导 students 前写 hundreds。', 'five hundreds students', 'five hundred students', '具体数字后 hundred 不加 s；hundreds of 才加 s。'),
      trap('约数漏 of', '看到“成百上千”只写 hundreds students。', 'hundreds students', 'hundreds of students', '约数表达必须有 of。'),
      trap('序数词拼写阴险题', 'ninth、twelfth、twentieth、fortieth 常被错拼。', 'nineth / twelveth / twentyth / fourtieth', 'ninth / twelfth / twentieth / fortieth', '这些是不规则或变 y 为 ie 的序数拼写。'),
      trap('a second 与 the second', '选项同时给 a/the，考意义不是机械冠词。', 'I failed, so I needed the second chance.', 'I failed, so I needed a second chance.', '这里是“再一次机会”，不是按顺序确定的第二次。'),
      trap('年龄复合形容词', 'year 被 two/eight 修饰后，学生容易加 s。', 'an eight-years-old boy', 'an eight-year-old boy', '复合形容词 year 用单数，并用连字符连接。'),
      trap('分数主谓一致', '分数/百分比后谓语不看数字大小，而看 of 后名词。', 'Two thirds of the water are clean.', 'Two thirds of the water is clean.', 'water 不可数，所以谓语用 is。'),
      trap('the number of / a number of', '两个结构只差一个冠词，谓语完全不同。', 'The number of students are 50.', 'The number of students is 50.', 'the number of 表“数量”，谓语单数；a number of 表“许多”，谓语复数。'),
      trap('日期介词和序数', '日期前用 on，月份年份前用 in，具体时刻前用 at。', 'in May 19 / on 2026', 'on May 19 / in 2026', '日期是具体某天，用 on；年份用 in。'),
    ],
    microDrills: [
      drill('A number of students wrote 100-word letters, and the number of letters was surprising.', '许多学生写了百字信，信的数量令人惊讶。', 'a number of + 复数谓语；the number of + 单数谓语；100-word 作形容词。'),
      drill('Two thirds of the class were brave enough to speak first.', '班上三分之二的人足够勇敢，先开口了。', 'class 指班级成员时可按复数意义处理。'),
    ],
  },
  adjectives: {
    yunnanFocus: '形容词是云南中考的高频考点，覆盖单词填空、单项选择、完形填空和作文。考点集中在：比较级和最高级、同级比较 as...as、系动词后表语、-ing/-ed 情感形容词辨析、复合形容词、one of the most... 结构。其中 -ing/-ed 形容词和同级比较是近年中考新增热点。',
    mustKnow: [
      '两者比较用比较级，三者及以上或范围内最高用最高级。',
      '同级比较用 as + 原级 + as；否定用 not so/as + 原级 + as。',
      'look/sound/feel/taste/smell/get/become/turn/keep/stay/seem 后接形容词作表语。',
      '-ing 形容词描述事物“令人怎样”（主动/令人），-ed 形容词描述人“感到怎样”（被动/感受）。',
      '复合形容词中名词用单数：an eight-year-old boy, a two-hour walk, a 100-word passage。',
      'one of + the + 最高级 + 名词复数：one of the most beautiful cities。',
    ],
    traps: [
      trap('最高级漏 the', '题干出现 in our class/of all/one of，常要求最高级。', 'one of most famous writers', 'one of the most famous writers', '最高级前通常用 the，one of 后名词也要复数。'),
      trap('系动词后误用副词', '看到动词就写 -ly，忽略它是系动词。', 'The soup tastes well.', 'The soup tastes good.', 'taste 作系动词时后接形容词。'),
      trap('双重比较', 'more 和 -er 同时出现是典型干扰项。', 'more easier', 'easier / more difficult', '比较级只保留一种形式。'),
      trap('同级比较误用比较级', 'as...as 中间必须用原级，不能用比较级。', 'She is as taller as her sister.', 'She is as tall as her sister.', 'as...as 是同级比较，中间用原级 tall。'),
      trap('-ing 和 -ed 形容词混淆', '学生常把“我感到无聊”写成 I am boring，把“这个故事很无聊”写成 I am bored。', 'I am boring. / The story is bored.', 'I am bored. / The story is boring.', '-ing 形容事物令人怎样；-ed 形容人感到怎样。'),
      trap('复合形容词中名词加 s', '复合形容词作定语时，中间名词必须用单数。', 'an eight-years-old boy', 'an eight-year-old boy', '复合形容词 year 用单数，加连字符。'),
    ],
    microDrills: [
      drill('The quietest student may have the strongest heart.', '最安静的学生也可能有最强大的内心。', '最高级前用 the。'),
      drill('She is as brave as any boy in her class.', '她和班上任何男孩一样勇敢。', 'as + 原级 + as 是同级比较。'),
      drill('The movie was exciting, and we all felt excited.', '电影很刺激，我们都感到兴奋。', 'exciting 描述电影令人兴奋；excited 描述我们感到兴奋。'),
      drill('This is a five-hundred-word essay about courage.', '这是一篇关于勇气的五百字文章。', 'five-hundred-word 是复合形容词，word 用单数。'),
    ],
  },
  adverbs: {
    yunnanFocus: '云南中考单词填空常考副词修饰动词、形容词或整句，尤其是 wise -> wisely、careful -> carefully 这类词形转换。',
    mustKnow: [
      '副词修饰动词、形容词、副词或整个句子。',
      '频率副词位置：be 后、实义动词前。',
      'hard/hardly, late/lately, near/nearly 是高频意义陷阱。',
    ],
    traps: [
      trap('形副转换误判', '空格前后是动词，却填形容词。', 'spend time wise', 'spend time wisely', '修饰 spend 用副词 wisely。'),
      trap('hard 与 hardly', '两个词都像 hard，但意思相反。', 'He hardly studies and gets high marks.', 'He studies hard and gets high marks.', 'hard 表努力；hardly 表几乎不。'),
      trap('enough 位置', 'enough 修饰形容词副词时放后面。', 'enough brave to speak', 'brave enough to speak', '形容词 + enough + to do。'),
    ],
    microDrills: [
      drill('She answered calmly when others misunderstood her.', '别人误解她时，她平静地回答。', 'calmly 修饰 answered。'),
    ],
  },
  prepositions: {
    yunnanFocus: '介词常出现在单项填空、汉译英和短语填空中，云南题喜欢把 by bus、be late for、in spring、介词后宾格/doing 放进生活语境。',
    mustKnow: [
      '时间：at 点，on 天，in 段。',
      '介词后接名词、代词宾格或 doing。',
      '固定搭配要整块记：be late for, be good at, be interested in, thanks to。',
    ],
    traps: [
      trap('交通方式多加冠词', 'by + 交通工具直接表方式。', 'by the bus', 'by bus', 'by bus 是固定方式；take the bus 才可带冠词。'),
      trap('介词后动词原形', '介词后接动词时必须改 doing。', 'look forward to see you', 'look forward to seeing you', 'to 在这里是介词，不是不定式符号。'),
      trap('arrive/reach 混用', '三个“到达”后面搭配不同。', 'reach to Kunming', 'reach Kunming / arrive in Kunming', 'reach 是及物动词；arrive in + 大地点。'),
    ],
    microDrills: [
      drill('We are proud of being from Yunnan.', '我们为来自云南而自豪。', 'of 后用 being。'),
    ],
  },
  conjunctions: {
    yunnanFocus: '连词在完形、阅读七选五和句子合并里考逻辑，不只考中文意思。云南题常把 although/but, because/so, if/unless, when/while 放进语境辨析。',
    mustKnow: [
      'although 和 but 通常不在同一个主从结构里重复使用。',
      'because 和 so 通常二选一，不双重标记。',
      'if 表如果，unless 表除非；unless = if not。',
    ],
    traps: [
      trap('让步和转折双连词', '中文“虽然……但是……”会诱导英式双标记。', 'Although he was tired, but he kept reading.', 'Although he was tired, he kept reading.', '英语从属连词和并列连词不能这样重复。'),
      trap('原因结果双连词', 'because 和 so 同时出现。', 'Because it rained, so we stayed home.', 'Because it rained, we stayed home.', '保留 because 或 so 一个即可。'),
      trap('unless 方向错误', 'unless 常被误当 if。', 'You will miss it unless you hurry.', 'You will miss it if you do not hurry.', 'unless = if not，含否定条件。'),
    ],
    microDrills: [
      drill('Although I was nervous, I still raised my hand.', '虽然我紧张，我还是举起了手。', 'although 引导让步从句，主句不再加 but。'),
    ],
  },
  interjections: {
    yunnanFocus: '感叹词本身不是大题，但感叹句是高频：What/How 的结构常和冠词、形容词、副词一起考。',
    mustKnow: [
      'What + a/an + adj. + 可数单数名词 + 主谓！',
      'What + adj. + 不可数名词/复数名词 + 主谓！',
      'How + adj./adv. + 主谓！',
    ],
    traps: [
      trap('What a 与 How 混用', '看到形容词就写 How，忽略后面还有可数单数名词。', 'How brave boy he is!', 'What a brave boy he is!', 'boy 是可数单数名词，用 What a。'),
      trap('不可数名词误加 a', 'news/advice/weather 前不能因为感叹就加 a。', 'What a good news!', 'What good news!', 'news 不可数，不能用 a。'),
    ],
    microDrills: [
      drill('What a warm sentence she wrote!', '她写了多温暖的一句话啊！', 'sentence 是可数单数，前面用 a。'),
    ],
  },
  verbs: {
    yunnanFocus: '动词是云南中考语法填空的绝对核心，每年必考。考点集中在：不规则动词拼写、及物不及物判断、非谓语（to do / doing）、延续非延续转换、系动词后接形容词、情态动词后接原形、短语动词搭配。动词一旦判断错，时态和语态都会跟着错。',
    mustKnow: [
      '不规则动词按三形分组记忆：cut-cut-cut，find-found-found，go-went-gone。',
      '不及物动词不能直接接宾语：arrive at/in，listen to，look at，wait for，depend on，belong to。',
      '只接 to do 的动词：want, decide, hope, plan, agree, refuse, promise, learn, manage。',
      '只接 doing 的动词：enjoy, finish, practice, mind, keep, avoid, suggest, consider。',
      'to do 和 doing 意义不同：stop to do / stop doing；remember to do / remember doing；try to do / try doing；mean to do / mean doing；regret to do / regret doing。',
      '非延续性动词不能和 for / since 直接连用，要转为延续性状态：die → be dead，leave → be away，borrow → keep，buy → have，join → be in。',
      '系动词后接形容词：look/sound/feel/taste/smell/get/become/turn/keep/stay/seem + adj.',
      '情态动词后必须用动词原形：can/could/may/might/must/should/will/would + do。',
      '短语动词要整块记忆，注意可分开和不可分开的区别。',
    ],
    traps: [
      trap('不及物动词硬接宾语', '学生常把汉语“到达车站”直译成 arrive the station，忽略了 arrive 是不及物动词。', 'I arrived the station at eight.', 'I arrived at the station at eight.', 'arrive 是不及物动词，接地点必须用 arrive at/in。'),
      trap('及物动词遗漏宾语', '及物动词后面必须有宾语，否则句子不完整。', 'She wrote carefully.', 'She wrote a letter carefully.', 'write 是及物动词，后面需要接写的对象。'),
      trap('非谓语混用', '一个简单句有两个谓语动词时，第二个要变非谓语。', 'I want go home.', 'I want to go home.', 'want 后必须接 to do，不能直接跟动词原形。'),
      trap('非延续动词和一段时间连用', 'die, leave, arrive, buy, borrow, join 等瞬间动词不能和 for/since 连用。', 'He has died for three years.', 'He has been dead for three years.', 'die 是非延续性动词，必须转换为 be dead 这种延续性状态。'),
      trap('系动词后误用副词', '系动词后接形容词作表语，不是副词。', 'The flower smells sweetly.', 'The flower smells sweet.', 'smell 是系动词，后接形容词 sweet。'),
      trap('情态动词后加 to', '情态动词后直接接动词原形，不能加 to。', 'She must to finish her homework.', 'She must finish her homework.', 'must 后接动词原形 finish，不需要 to。'),
      trap('stop to do 与 stop doing 混淆', 'stop to do 是停下来去做另一件事；stop doing 是停止正在做的事。', 'She stopped to talk because she was bored.', 'She stopped talking because she was bored.', '如果是“停止说话”，用 stop talking；如果是“停下来去说话”，用 stop to talk。'),
      trap('remember/forget 后 to do 和 doing 混淆', 'remember to do 是记得要去做；remember doing 是记得做过。forget 同理。', 'I remembered locking the door, so I went back.', 'I remembered to lock the door, so I went back.', 'remember to lock 表示“记得要去锁门”；remember locking 表示“记得已经锁过门了”。'),
      trap('介词后的 to 被误认为不定式符号', 'look forward to, be used to, get used to, pay attention to, object to 中的 to 都是介词。', 'I look forward to see you.', 'I look forward to seeing you.', 'look forward to 中的 to 是介词，后接 doing。'),
      trap('短语动词分开错误', '有些短语动词不可分开，如 look after, take care of, get on with。', 'Look the baby after while I am away.', 'Look after the baby while I am away.', 'look after 是不可分开的短语动词。'),
    ],
    microDrills: [
      drill('She enjoys reading stories and wants to write her own.', '她喜欢读故事，想写自己的故事。', 'enjoy 后接 doing；want 后接 to do。'),
      drill('He has been away from home since last Monday.', '他从上周一就离开家了。', 'leave 是非延续性动词，改用 be away 和 since 连用。'),
      drill('The soup tastes good, and the music sounds beautiful.', '汤尝起来很好，音乐听起来很美。', 'taste 和 sound 都是系动词，后接形容词。'),
      drill('You should practice speaking English every day.', '你应该每天练习说英语。', 'should 后接动词原形 practice；practice 后接 doing。'),
      drill('I tried to solve the problem, but finally gave it up.', '我努力解决这个问题，但最终还是放弃了。', 'try to do 表示努力做；give up 是短语动词，代词 it 放中间。'),
    ],
  },
  'sentence-types': {
    yunnanFocus: '句子类型在单项、汉译英和作文中体现：陈述句看语序，疑问句看助动词，祈使句看动词原形，感叹句看 What/How。',
    mustKnow: [
      '陈述句基本语序是主语 + 谓语。',
      '一般疑问句把 be/助动词/情态动词提前。',
      '祈使句通常以动词原形开头。',
    ],
    traps: [
      trap('宾语从句误用疑问语序', '题干问“你知道他什么时候来吗”，从句必须陈述语序。', 'Do you know when will he come?', 'Do you know when he will come?', '宾语从句中疑问词后用主语 + 谓语。'),
      trap('感叹句结构误配', 'What/How 由后面中心词决定。', 'What carefully she listens!', 'How carefully she listens!', 'carefully 是副词，用 How。'),
    ],
    microDrills: [
      drill('Please listen to the quiet student.', '请听听那个安静的学生。', '祈使句以动词原形 Please listen 开头。'),
    ],
  },
  'sentence-patterns': {
    yunnanFocus: '基本句型影响完形理解、长句拆分和作文稳定性。云南写作评分不会只看高级词，基本句型错会直接拉低表达准确度。',
    mustKnow: [
      'SV: 主语 + 不及物动词。',
      'SVO/SVOO/SVOC 要区分宾语、双宾语和宾补。',
      'SVC 用系动词连接主语和表语。',
    ],
    traps: [
      trap('不及物动词硬接宾语', 'arrive/listen/look 等需要介词才能接对象。', 'I listened her story.', 'I listened to her story.', 'listen 是不及物动词，接宾语前要 to。'),
      trap('宾补误当双宾语', 'make/keep/find 后常接宾语 + 补足语。', 'The news made me a sad.', 'The news made me sad.', 'sad 是宾补，不加 a。'),
    ],
    microDrills: [
      drill('Her words made me braver.', '她的话让我更勇敢。', 'me 是宾语，braver 是宾补。'),
    ],
  },
  'simple-compound-complex': {
    yunnanFocus: '并列句和复合句常在阅读长句、七选五逻辑和作文连接中出现。考点不是句子越长越好，而是连接词和从句边界要准。',
    mustKnow: [
      '简单句只有一个主谓核心。',
      '并列句用 and/but/or/so 连接平行分句。',
      '复合句含从句，从句必须有引导词或清楚的关系结构。',
    ],
    traps: [
      trap('逗号拼接两个句子', '两个完整句子只用逗号连接，是作文常见硬伤。', 'I was afraid, I still tried.', 'I was afraid, but I still tried.', '两个主谓完整的分句需要连词或分号。'),
      trap('从句缺引导词', '中文可直接说“我知道他来”，英语宾语从句常要 that 或疑问词。', 'I know he came here yesterday.', 'I know that he came here yesterday.', '口语可省 that，但教学和考试中要能识别从句边界。'),
    ],
    microDrills: [
      drill('I was quiet, but I was not weak.', '我很安静，但我并不软弱。', 'but 连接两个并列分句。'),
    ],
  },
  'long-sentence-visual': {
    yunnanFocus: '中考阅读和完形的长句不一定语法很难，但会叠加从句、非谓语、插入语和代词指代。模块拆分要帮助学生先抓主干，再看修饰。',
    mustKnow: [
      '先找主句主语和谓语，不先翻译每个词。',
      '从句看引导词，非谓语看 doing/done/to do 与主句关系。',
      '代词 this/that/it/they 要回指前文具体内容。',
    ],
    traps: [
      trap('被长定语带偏主干', '主语后接很长修饰语，学生找错谓语。', 'The boy who sat near the window and said little were kind.', 'The boy who sat near the window and said little was kind.', '真正主语是 The boy，谓语用 was。'),
      trap('分词短语误当谓语', '句中已有谓语时，doing/done 多数是修饰或状语。', 'The students standing outside were nervous.', 'The students standing outside were nervous.', 'standing outside 修饰 students，were 才是谓语。'),
    ],
    microDrills: [
      drill('The girl who felt invisible finally found a friend who listened.', '那个觉得自己不被看见的女孩终于找到了愿意倾听的朋友。', '主干是 The girl found a friend。'),
    ],
  },
  questions: {
    yunnanFocus: '疑问句高频落点是一般疑问句回答、特殊疑问词选择、反意疑问句和宾语从句陈述语序。',
    mustKnow: [
      '一般疑问句用 Yes/No 回答，助动词前后一致。',
      '特殊疑问词必须匹配信息：who 人，where 地点，why 原因，how 方式。',
      '宾语从句中的疑问句恢复陈述语序。',
    ],
    traps: [
      trap('宾语从句语序', '题目把直接问句嵌入 Do you know... 后。', 'Can you tell me where is the library?', 'Can you tell me where the library is?', 'where 引导宾语从句，后面用陈述语序。'),
      trap('反意疑问前否后肯', '前句是否定，后面要肯定。', 'She seldom speaks, doesn\'t she?', 'She seldom speaks, does she?', 'seldom 是否定意义，附加问句用肯定。'),
    ],
    microDrills: [
      drill('Do you know why she kept silent?', '你知道她为什么保持沉默吗？', 'why 后是 she kept，不是 did she keep。'),
    ],
  },
  imperatives: {
    yunnanFocus: '祈使句常在听说、情景指令、汉译英和作文建议句里出现，重点是动词原形、否定 Don\'t、Let\'s 和反意疑问。',
    mustKnow: [
      '肯定祈使句：动词原形开头。',
      '否定祈使句：Don\'t + 动词原形。',
      'Let\'s... 的反意疑问常用 shall we。',
    ],
    traps: [
      trap('祈使句误加主语', '中文“你不要……”常诱导写 You don\'t。', 'You don\'t be late.', 'Don\'t be late.', '祈使句否定用 Don\'t + 动词原形。'),
      trap('No 后接形式', '公共标识题常考 No + doing。', 'No smoke.', 'No smoking.', '禁止做某事用 No doing。'),
    ],
    microDrills: [
      drill('Let\'s give the quiet student more time, shall we?', '我们给那个安静的学生多一点时间，好吗？', 'Let\'s 的反意疑问用 shall we。'),
    ],
  },
  'present-tenses': {
    yunnanFocus: '现在时态在云南中考常和事实习惯、正在发生、so far/already/yet 标志词一起考，也会进入作文表达“现在的变化”。',
    mustKnow: [
      '一般现在时：习惯、事实、客观规律。',
      '现在进行时：此刻正在或阶段正在发生。',
      '现在完成时：过去动作对现在有影响，常见 so far, already, yet, ever, never。',
    ],
    traps: [
      trap('so far 误用过去式', '题干出现 so far/up to now，却选一般过去时。', 'I saw the film so far.', 'I have seen the film so far.', 'so far 强调到现在为止，用现在完成时。'),
      trap('第三人称单数漏 s', '主语 he/she/it 或单数名词，谓语一般现在时要变形。', 'She often help others.', 'She often helps others.', '一般现在时第三人称单数加 s/es。'),
    ],
    microDrills: [
      drill('So far, I have learned to speak more honestly.', '到目前为止，我已经学会更诚实地表达。', 'so far 对应现在完成时。'),
    ],
  },
  'past-tenses': {
    yunnanFocus: '过去时态常与 yesterday, last year, when 从句、过去进行时背景动作、过去完成时先后关系一起出现。',
    mustKnow: [
      '一般过去时表示过去发生并结束。',
      '过去进行时表示过去某时正在发生。',
      '过去完成时表示过去的过去，常和 by the time/before 搭配。',
    ],
    traps: [
      trap('when/while 进行时搭配', '一个动作正在进行，另一个动作突然发生。', 'I read when she came in.', 'I was reading when she came in.', '背景动作持续，用过去进行时。'),
      trap('过去完成时先后', '两个过去动作有明显先后，先发生用 had done。', 'By the time I arrived, the meeting started.', 'By the time I arrived, the meeting had started.', '会议先于 arrived，故用过去完成时。'),
    ],
    microDrills: [
      drill('I was writing when my teacher knocked at the door.', '老师敲门时，我正在写东西。', 'was writing 是背景动作。'),
    ],
  },
  'future-tenses': {
    yunnanFocus: '将来时常考 will、be going to、现在进行时表安排和一般现在时表时间表，云南题会把将来被动一起考。',
    mustKnow: [
      'will 表临时决定、预测或意愿。',
      'be going to 表计划或有迹象的将来。',
      '时间/条件状语从句中常用一般现在时表将来。',
    ],
    traps: [
      trap('主将从现', 'if/when/as soon as 从句里误用 will。', 'If it will rain tomorrow, we will stay home.', 'If it rains tomorrow, we will stay home.', '条件从句用一般现在时表示将来。'),
      trap('将来被动漏 be', 'will 后直接接过去分词。', 'The game will held in 2028.', 'The game will be held in 2028.', '被动结构必须 be + done。'),
    ],
    microDrills: [
      drill('If someone listens, I will speak more bravely.', '如果有人倾听，我会更勇敢地说。', 'if 从句用 listens，主句用 will speak。'),
    ],
  },
  'tense-consistency': {
    yunnanFocus: '时态一致主要在宾语从句、时间状语从句和作文叙事中扣分。题目会用主句过去时诱导从句变化，也会保留客观真理不变。',
    mustKnow: [
      '主句过去时，宾语从句通常相应后移。',
      '客观事实、真理、习惯规律不因主句过去而变化。',
      '叙事作文要保持主线时态稳定。',
    ],
    traps: [
      trap('客观真理错误后移', '老师说地球绕太阳转，不能改成 went。', 'The teacher said the earth went around the sun.', 'The teacher said the earth goes around the sun.', '客观真理仍用一般现在时。'),
      trap('叙事时态漂移', '同一段过去经历里忽然无依据切换现在时。', 'Yesterday I feel nervous and talked to her.', 'Yesterday I felt nervous and talked to her.', 'yesterday 标志过去，felt/talked 保持一致。'),
    ],
    microDrills: [
      drill('She told me that kindness matters.', '她告诉我，善意很重要。', '普遍道理可以保留一般现在时。'),
    ],
  },
  'active-passive': {
    yunnanFocus: '被动语态在云南中考单项、词形填空和阅读科技文化题里高频出现，重点是主语和动作关系：主语是承受者就用被动。',
    mustKnow: [
      '被动基本式：be + done。',
      '时态由 be 变化体现，过去分词保持 done。',
      '不知道动作执行者或强调承受者时常用被动。',
    ],
    traps: [
      trap('只看中文不看主语', '中文“举办”容易写主动，但主语是活动。', 'The meeting will hold tomorrow.', 'The meeting will be held tomorrow.', 'meeting 不能自己举办自己，用被动。'),
      trap('被动时态漏 be', '过去分词单独出现不能作谓语被动。', 'The bridge built in 2020.', 'The bridge was built in 2020.', '谓语被动需要 was built。'),
    ],
    microDrills: [
      drill('The story was written by a student who wanted to be understood.', '这个故事由一个渴望被理解的学生写成。', 'story 是承受者，用被动。'),
    ],
  },
  'passive-forms': {
    yunnanFocus: '各种时态的被动常把 will be done、has been done、is being done 混在选项里，考学生能否同时判断时间和主被动。',
    mustKnow: [
      '一般现在被动：am/is/are + done。',
      '一般过去被动：was/were + done。',
      '现在完成被动：has/have been + done；将来被动：will be + done。',
    ],
    traps: [
      trap('完成被动少 been', '看到 already/yet，既要完成又要被动。', 'The work has finished.', 'The work has been finished.', 'work 是被完成，完成被动用 has been done。'),
      trap('进行被动结构不完整', '正在被修建/正在被讨论常漏 being。', 'The road is repaired now.', 'The road is being repaired now.', 'now 强调正在被修，用 is being done。'),
    ],
    microDrills: [
      drill('My idea has been accepted by the group.', '我的想法已经被小组接受。', 'has been accepted 是现在完成被动。'),
    ],
  },
  'special-passive': {
    yunnanFocus: '特殊被动常在使役动词、感官动词和短语动词里设陷阱：主动省 to，被动还原 to；短语动词的介词不能丢。',
    mustKnow: [
      'make/see/hear/watch sb do 在被动中变为 be made/seen/heard/watched to do。',
      '短语动词被动不能丢介词：be looked after, be talked about。',
      'get done 可表示被动或结果状态，但中考先掌握 be done。',
    ],
    traps: [
      trap('感官使役被动漏 to', '主动句省 to，被动句要加回来。', 'He was made clean the room.', 'He was made to clean the room.', 'make sb do 的被动是 sb be made to do。'),
      trap('短语动词丢介词', 'look after 变被动时 after 仍保留。', 'The baby was looked well.', 'The baby was looked after well.', 'after 是短语动词的一部分。'),
    ],
    microDrills: [
      drill('She was heard to say, "I need help."', '有人听见她说：“我需要帮助。”', 'hear sb say 的被动要加 to。'),
    ],
  },
  indicative: {
    yunnanFocus: '陈述语气是所有基础题和作文的默认语气，重点是事实、习惯、计划和判断要用正常时态表达清楚。',
    mustKnow: [
      '陈述事实用陈述语气，不额外添加情态或虚拟结构。',
      '主谓一致、时态和语序是陈述句三大底盘。',
      '作文表达观点时，先保证陈述句准确，再追求高级结构。',
    ],
    traps: [
      trap('观点句缺谓语', '中文可省“是”，英语句子必须有谓语。', 'My dream important.', 'My dream is important.', '形容词 important 作表语前需要 be。'),
      trap('情态动词后动词变形', 'can/must/should 后接动词原形。', 'She can speaks English.', 'She can speak English.', '情态动词后用原形。'),
    ],
    microDrills: [
      drill('My voice matters even when it is quiet.', '即使我的声音很轻，它也重要。', '陈述语气表达事实判断。'),
    ],
  },
  'imperative-mood': {
    yunnanFocus: '祈使语气常见于建议、规则、标识和作文号召句。云南写作里用祈使句可以让建议更直接，但结构必须正确。',
    mustKnow: [
      '肯定：动词原形开头。',
      '否定：Don\'t/Never + 动词原形。',
      '礼貌建议可用 Please, Let\'s, Why not, You should。',
    ],
    traps: [
      trap('Please 后加 to', 'please 已经引出祈使句，不接 to do。', 'Please to listen carefully.', 'Please listen carefully.', '祈使句谓语用动词原形。'),
      trap('Let us 与 Let\'s 语气不同', 'Let\'s 包括说话人和听话人，Let us 可能只是请求允许我们。', 'Let us go hiking, shall we?', 'Let\'s go hiking, shall we?', '提出共同建议用 Let\'s。'),
    ],
    microDrills: [
      drill('Be kind to the student who speaks slowly.', '善待那个说话慢的学生。', 'Be + 形容词构成祈使句。'),
    ],
  },
  subjunctive: {
    yunnanFocus: '虚拟语气在中考不是最高频基础点，但会出现在阅读、完形高级句和作文加分句中。重点掌握 if 虚拟、wish、suggest/advise/order 后 should do。',
    mustKnow: [
      '与现在相反：If + 主语 + were/did, 主语 + would/could + do。',
      '与过去相反：If + had done, 主语 + would/could have done。',
      '建议命令要求后的 that 从句常用 should + 动词原形，should 可省。',
    ],
    traps: [
      trap('if 虚拟误用真实条件', '看到 if 不代表一定主将从现。', 'If I am you, I will talk to her.', 'If I were you, I would talk to her.', '与现在事实相反，用 were/would。'),
      trap('suggest 后误用 to do 从句', 'suggest that 后不是 suggest sb to do。', 'She suggested me to ask for help.', 'She suggested that I ask for help.', 'suggest 后可接 that 从句，动词用原形。'),
    ],
    microDrills: [
      drill('If I were braver, I would tell them how I feel.', '如果我更勇敢，我会告诉他们我的感受。', '与现在事实相反，用 were/would。'),
    ],
  },
  infinitives: {
    yunnanFocus: '不定式常在单项、词形填空和汉译英里考目的、宾语、宾补以及 too...to/enough to 结构。',
    mustKnow: [
      'to do 可作目的状语：in order to do。',
      'want/decide/hope/plan/learn + to do。',
      'too + adj. + to do；adj. + enough + to do。',
    ],
    traps: [
      trap('decide 后用 doing', '部分动词后只能接 to do。', 'I decided asking for help.', 'I decided to ask for help.', 'decide 后接不定式。'),
      trap('too...to 误加 not', 'too 已经含“太……以至不能”。', 'too nervous not to speak', 'too nervous to speak', 'too...to 自带否定结果。'),
    ],
    microDrills: [
      drill('I wrote a note to explain my feelings.', '我写了一张纸条来解释自己的感受。', 'to explain 表目的。'),
    ],
  },
  gerunds: {
    yunnanFocus: '动名词常和介词后形式、固定动词搭配以及作主语出现。云南题会用 look forward to、be used to、finish、enjoy 等设空。',
    mustKnow: [
      '介词后接 doing。',
      'enjoy/finish/practice/mind/avoid + doing。',
      'doing 作主语时谓语通常用单数。',
    ],
    traps: [
      trap('to 是介词还是不定式', 'look forward to/be used to 中 to 是介词。', 'I look forward to hear from you.', 'I look forward to hearing from you.', '介词后用 doing。'),
      trap('动名词作主语谓语误复数', 'doing 整体作主语按单数处理。', 'Reading books are helpful.', 'Reading books is helpful.', 'Reading books 是一件事。'),
    ],
    microDrills: [
      drill('Listening without judging is a gift.', '不评判地倾听是一份礼物。', 'Listening 作主语，谓语用 is。'),
    ],
  },
  participles: {
    yunnanFocus: '分词在阅读长句和作文中常作定语、状语或补语。考试陷阱是主动用 doing，被动/完成用 done，情感形容词 -ing/-ed 分清。',
    mustKnow: [
      'doing 表主动或正在进行。',
      'done 表被动或完成。',
      '分词短语作状语时，逻辑主语通常要和主句主语一致。',
    ],
    traps: [
      trap('主动被动分词混用', '被修饰词和动作关系决定 doing/done。', 'the story writing by Tom', 'the story written by Tom', 'story 是被写，用 written。'),
      trap('悬垂分词', '分词短语的逻辑主语不是主句主语。', 'Walking into the room, the light was bright.', 'Walking into the room, I saw the bright light.', 'walking 的执行者应是主句主语 I。'),
    ],
    microDrills: [
      drill('The words spoken by her teacher stayed with her.', '老师说过的话一直留在她心里。', 'words 是被说出的，用 spoken。'),
    ],
  },
  'absolute-construction': {
    yunnanFocus: '独立主格属于长难句高级模块，云南中考基础题少直接考名词，但阅读长句和作文提升会遇到 with 复合结构、名词 + doing/done 等简化状语。',
    mustKnow: [
      '独立主格有自己的逻辑主语，不是完整谓语句。',
      '名词/代词 + doing 表主动进行；名词/代词 + done 表被动完成。',
      'with + 宾语 + 补足语是最常见可教学入口。',
    ],
    traps: [
      trap('把独立主格当完整句', '名词 + doing 没有谓语，不能单独成句。', 'Her eyes shining with tears.', 'Her eyes shining with tears, she smiled.', '独立主格要依附主句。'),
      trap('主动被动方向错', '逻辑主语与动作关系决定 doing/done。', 'The work finishing, we went home.', 'The work finished, we went home.', 'work 是被完成，用 finished。'),
    ],
    microDrills: [
      drill('Her voice shaking, she still told the truth.', '声音颤抖着，她仍然说出了真相。', 'Her voice shaking 是独立主格，表示伴随状态。'),
    ],
  },
  'absolute-nominative': {
    yunnanFocus: '独立主格细分要服务长难句拆分：时间、原因、条件、伴随、方式都能由独立主格压缩表达，with 结构最适合初高中衔接。',
    mustKnow: [
      '时间：The class over, students left.',
      '原因：Weather permitting, we will go.',
      '伴随：with + 宾语 + doing/done/adj./prep. phrase。',
    ],
    traps: [
      trap('with 结构后误加谓语', 'with 后的宾语补足语不是完整谓语。', 'With tears were in her eyes, she smiled.', 'With tears in her eyes, she smiled.', 'with + 名词 + 介词短语，不用 were。'),
      trap('weather permitting 固定高级结构', 'permit 与 weather 是主动关系。', 'Weather permitted, we will go hiking.', 'Weather permitting, we will go hiking.', 'weather permitting 表“如果天气允许”。'),
    ],
    microDrills: [
      drill('With her notebook open, she began to write.', '笔记本打开着，她开始写。', 'open 作宾补，说明 notebook 状态。'),
    ],
  },
  'noun-clauses': {
    yunnanFocus: '名词性从句在中考最常见是宾语从句：引导词、陈述语序、时态一致。主语从句/表语从句/同位语从句用于阅读和作文提升。',
    mustKnow: [
      '宾语从句三件事：引导词、陈述语序、时态。',
      'whether/if 表是否；what/when/where/why/how 保留疑问意义。',
      'that 从句陈述事实，that 可省但结构要能识别。',
    ],
    traps: [
      trap('宾语从句疑问语序', '中考高频单项陷阱。', 'I wonder why did she leave.', 'I wonder why she left.', '从句用陈述语序。'),
      trap('if 与 whether', '介词后或 whether...or not 常不用 if。', 'It depends on if he agrees.', 'It depends on whether he agrees.', '介词 on 后用 whether 更规范。'),
    ],
    microDrills: [
      drill('I believe that every quiet student has a story.', '我相信每个安静的学生都有故事。', 'that 引导宾语从句。'),
    ],
  },
  'adjective-clauses': {
    yunnanFocus: '定语从句常出现在阅读长句和作文加分句中。中考重点是先行词、人/物、主宾成分、that/which/who/whom/whose 的选择。',
    mustKnow: [
      '先找先行词，再判断关系词在从句中作什么成分。',
      'who/that 指人，which/that 指物，whose 表所属。',
      '关系词作宾语时在限定性定语从句中可省略。',
    ],
    traps: [
      trap('whose 误换 who', '表示“谁的”要用 whose。', 'the girl who voice was quiet', 'the girl whose voice was quiet', 'voice 属于 girl，用 whose。'),
      trap('从句缺主语却省关系词', '关系词作主语不能省。', 'The book lies on the desk is mine.', 'The book that lies on the desk is mine.', 'that 作 lies 的主语，不能省。'),
    ],
    microDrills: [
      drill('I thanked the friend who listened without laughing.', '我感谢那个倾听而不嘲笑的朋友。', 'who 在从句中作主语。'),
    ],
  },
  'adverb-clauses': {
    yunnanFocus: '状语从句在中考里高频：时间、条件、原因、让步、结果。陷阱集中在主将从现、although/but、because/so 和 so...that。',
    mustKnow: [
      '时间/条件从句常用一般现在时表将来。',
      'although 不和 but 成对；because 不和 so 成对。',
      'so/such...that 表结果，too...to 表否定结果。',
    ],
    traps: [
      trap('主将从现', 'when/if/as soon as 后误用 will。', 'When he will arrive, I will call you.', 'When he arrives, I will call you.', '时间状语从句用一般现在时表将来。'),
      trap('so/such 选择', '后面中心词不同，so 修饰形副，such 修饰名词短语。', 'so a kind teacher', 'such a kind teacher', 'a kind teacher 是名词短语，用 such。'),
    ],
    microDrills: [
      drill('If you feel unseen, write one honest sentence.', '如果你觉得自己不被看见，就写一句诚实的话。', 'if 条件从句用一般现在时。'),
    ],
  },
  'full-inversion': {
    yunnanFocus: '完全倒装多用于阅读描写和高级写作，基础考试会在 Here/There 句型里考名词主语和代词主语的区别。',
    mustKnow: [
      'Here/There + come/go/be + 名词主语。',
      '主语是代词时通常不倒装：Here it is。',
      '地点状语前置 + 不及物动词 + 名词主语可完全倒装。',
    ],
    traps: [
      trap('代词主语误倒装', 'Here/There 后主语是 it/he/she 时不完全倒装。', 'Here comes it.', 'Here it comes.', '代词主语保持主谓语序。'),
      trap('及物动词误完全倒装', '完全倒装常配不及物动词或 be。', 'On the desk put a book.', 'On the desk lay a book.', 'lay/stand/sit 等不及物场景动词更自然。'),
    ],
    microDrills: [
      drill('Beside the window sat a boy with a notebook.', '窗边坐着一个拿着笔记本的男孩。', '地点状语前置，sat 在主语前。'),
    ],
  },
  'partial-inversion': {
    yunnanFocus: '部分倒装是高中衔接和长难句高频结构，中考阅读会遇到 never, only, not until, so/such 等触发词，作文可作为少量加分句。',
    mustKnow: [
      '否定/半否定词句首触发部分倒装。',
      'Only + 状语句首触发主句倒装；Only + 主语不倒装。',
      '没有助动词时补 do/does/did。',
    ],
    traps: [
      trap('否定词句首不倒装', 'Never/Seldom/Little 放句首后仍用陈述语序。', 'Never I have felt heard.', 'Never have I felt heard.', 'Never 触发 have I。'),
      trap('Only 修饰主语误倒装', 'Only I... 中 only 修饰主语，不倒装。', 'Only did I know the answer.', 'Only I knew the answer.', 'Only + 主语不触发倒装。'),
    ],
    microDrills: [
      drill('Only then did I understand her silence.', '直到那时我才理解她的沉默。', 'Only then 作状语，主句部分倒装。'),
    ],
  },
  'nor-neither-so-inversion': {
    yunnanFocus: 'nor/neither/so 小倒装常在补全对话和语法选择中出现：前一句肯定用 so，否定用 neither/nor，助动词要跟前句时态一致。',
    mustKnow: [
      'So + 助动词/be/情态动词 + 主语：某人也如此。',
      'Neither/Nor + 助动词/be/情态动词 + 主语：某人也不。',
      'So + 主语 + 助动词表示“确实如此”，不倒装意义不同。',
    ],
    traps: [
      trap('肯定否定承接错', '前句否定，却用 So。', 'I can\'t swim. So can I.', 'I can\'t swim. Neither can I.', '否定承接用 neither/nor。'),
      trap('So do I 与 So I do 混淆', '一个表示“我也如此”，一个表示“我的确如此”。', 'You like English. So I do.', 'You like English. So do I.', '表示“我也喜欢”要倒装。'),
    ],
    microDrills: [
      drill('She did not laugh at him. Neither did I.', '她没有嘲笑他。我也没有。', '否定承接用 Neither did I。'),
    ],
  },
  'negative-fronting': {
    yunnanFocus: '否定前置是长难句阅读和高级作文常见结构，触发词包括 never, seldom, rarely, little, by no means, under no circumstances。',
    mustKnow: [
      '否定词放句首，主句部分倒装。',
      'little 位于句首表示“几乎不”，不是“小”。',
      'not only 位于句首时所在分句倒装，but also 后通常不倒装。',
    ],
    traps: [
      trap('Little 词义误判', 'Little did he know 不是“小小地知道”。', 'Little he knew the truth.', 'Little did he know the truth.', 'little 句首是否定副词，触发 did he。'),
      trap('Not only 两边都倒装', '只倒装 not only 所在分句。', 'Not only did she listen, but also did she help.', 'Not only did she listen, but she also helped.', 'but also 后按普通语序。'),
    ],
    microDrills: [
      drill('Never had she felt so clearly seen.', '她从未如此清楚地感觉自己被看见。', 'Never 触发 had she。'),
    ],
  },
  'only-fronting': {
    yunnanFocus: 'Only 前置常和 when/after/by/in this way 连用，阅读中常表达条件限制，写作中可表达成长转折。',
    mustKnow: [
      'Only + 状语/状语从句在句首，主句倒装。',
      'Only 修饰主语不倒装。',
      'Only when 从句本身不倒装，后面的主句倒装。',
    ],
    traps: [
      trap('从句也倒装', 'Only when 后从句保持陈述语序。', 'Only when did I speak did they listen.', 'Only when I spoke did they listen.', 'Only when 从句不倒，主句倒。'),
      trap('Only 主语误倒装', 'Only Tom knew it 不倒装。', 'Only did Tom know it.', 'Only Tom knew it.', 'Only 修饰主语 Tom，不触发倒装。'),
    ],
    microDrills: [
      drill('Only in this way can we make quiet students feel safe.', '只有这样，我们才能让安静的学生感到安全。', 'Only in this way 作状语，can we 倒装。'),
    ],
  },
  'not-until-inversion': {
    yunnanFocus: 'Not until 是倒装陷阱中的高频细节：not until 提前后，从句不倒装，主句倒装。',
    mustKnow: [
      '普通结构：I did not understand until she cried.',
      '倒装结构：Not until she cried did I understand.',
      '强调句结构：It was not until...that...，不使用倒装。',
    ],
    traps: [
      trap('从句误倒装', 'Not until 后的时间从句不倒装。', 'Not until did she cry did I understand.', 'Not until she cried did I understand.', '倒装发生在主句 did I understand。'),
      trap('强调句和倒装混用', 'It was not until...that... 中 that 后普通语序。', 'It was not until she cried did I understand.', 'It was not until she cried that I understood.', '强调句不用 did I。'),
    ],
    microDrills: [
      drill('Not until I listened did I understand his fear.', '直到我倾听后，才理解他的害怕。', 'not until 前置，主句 did I understand。'),
    ],
  },
  'no-sooner-hardly': {
    yunnanFocus: 'No sooner/Hardly 是“一……就……”的正式表达，阅读中常见，重点是前半句过去完成倒装，后半句一般过去。',
    mustKnow: [
      'No sooner had + 主语 + done + than + 主语 + did。',
      'Hardly/Scarcely had + 主语 + done + when + 主语 + did。',
      'than 和 when 不能混错。',
    ],
    traps: [
      trap('than/when 搭配错', 'No sooner 配 than，Hardly 配 when。', 'Hardly had I sat down than the bell rang.', 'Hardly had I sat down when the bell rang.', '固定搭配要成对记。'),
      trap('前半句时态错', '前一动作先发生，要用过去完成。', 'No sooner did I arrive than she left.', 'No sooner had I arrived than she left.', 'arrive 先于 left，用 had arrived。'),
    ],
    microDrills: [
      drill('Hardly had she opened the note when tears came to her eyes.', '她刚打开纸条，眼泪就涌了上来。', 'Hardly had...when...。'),
    ],
  },
  'so-such-inversion': {
    yunnanFocus: 'So/Such 倒装和结果状语从句相关，考试会同时考 so/such 选择、冠词位置和倒装。',
    mustKnow: [
      'So + adj./adv. + be/助动词 + 主语 + that...',
      'Such + a/an + adj. + 可数单数名词 + be + 主语 + that...',
      '普通结构不倒装：She was so kind that...。',
    ],
    traps: [
      trap('so/such 冠词位置', 'such 后面带名词短语，a/an 放在 such 后。', 'So kind a teacher she was that...', 'Such a kind teacher was she that...', '正式倒装可用 Such a kind teacher was she that...。'),
      trap('普通句误倒装', 'so/such 不在句首时不倒装。', 'She so kind was that...', 'She was so kind that...', '只有 so/such 前置才倒装。'),
    ],
    microDrills: [
      drill('So gently did she speak that I stopped hiding.', '她说得如此温柔，以至于我不再躲藏。', 'So + 副词前置触发倒装。'),
    ],
  },
  'as-though-inversion': {
    yunnanFocus: 'as/though 让步倒装属于高级阅读结构，形式短但容易误读：形容词、名词或动词原形前置，表示“尽管……”。',
    mustKnow: [
      '形容词/副词 + as/though + 主语 + 谓语，表示让步。',
      '名词前置时通常不用冠词：Child as he was...',
      '动词原形 + as/though + 主语 + may/might，表示尽管努力。',
    ],
    traps: [
      trap('名词前置保留冠词', 'Child as he was 中 child 前不加 a。', 'A child as he was, he understood.', 'Child as he was, he understood.', '让步倒装中单数可数名词前置常省冠词。'),
      trap('误读为比较 as...as', 'Brave as she was 不是“和……一样勇敢”。', 'Brave as she was, she asked for help.', 'Although she was brave, she asked for help.', '这里 as = although。'),
    ],
    microDrills: [
      drill('Quiet as he was, he noticed every change.', '尽管他安静，却注意到了每个变化。', '形容词 Quiet 前置表示让步。'),
    ],
  },
  'if-omission-inversion': {
    yunnanFocus: '省略 if 的虚拟倒装在阅读高级句中出现，核心是 Had/Were/Should 提到句首。学生要先还原成 if 条件句再理解。',
    mustKnow: [
      'Had + 主语 + done = If + 主语 + had done。',
      'Were + 主语 + to do / Were + 主语 + adj. = If + 主语 + were...',
      'Should + 主语 + do = If + 主语 + should do。',
    ],
    traps: [
      trap('Had 误当过去时主句', 'Had he known... 是条件从句，不是疑问句。', 'Had he known the truth, he will help.', 'Had he known the truth, he would have helped.', '与过去相反，主句用 would have done。'),
      trap('Should 条件误译为应该', 'Should you need help 是“如果你需要帮助”。', 'Should you need help, you should call me.', 'Should you need help, call me.', '句首 Should 可表示条件，不一定是“应该”。'),
    ],
    microDrills: [
      drill('Had I known her pain, I would have listened earlier.', '如果我早知道她的痛苦，我会更早倾听。', 'Had I known = If I had known。'),
    ],
  },
  'it-cleft': {
    yunnanFocus: 'It 强调句常用于阅读判断和作文强调，不要和定语从句、形式主语混淆。判断方法是去掉 It is/was 和 that 后句子仍基本完整。',
    mustKnow: [
      '基本式：It is/was + 被强调部分 + that/who + 句子剩余部分。',
      '强调人可用 who/that，强调物/时间/地点/原因常用 that。',
      '强调句不是 It is adj. for sb to do 的形式主语结构。',
    ],
    traps: [
      trap('强调句 that 误换 where/when', '即使强调地点/时间，也常用 that。', 'It was in the classroom where I found courage.', 'It was in the classroom that I found courage.', '强调地点状语时仍用 that。'),
      trap('和形式主语混淆', 'It is important to listen 不是强调句。', 'It is important that to listen.', 'It is important to listen.', '这里 it 是形式主语，真正主语是 to listen。'),
    ],
    microDrills: [
      drill('It was her patience that helped me speak.', '正是她的耐心帮助我开口。', '强调 her patience。'),
    ],
  },
  'do-emphasis': {
    yunnanFocus: 'do 强调在口语、作文和阅读对话中常见，用来加强肯定语气。考试陷阱是 do/does/did 后动词必须用原形。',
    mustKnow: [
      '一般现在用 do/does + 动词原形。',
      '一般过去用 did + 动词原形。',
      '只强调肯定句，不用于 be 动词作谓语的普通句。',
    ],
    traps: [
      trap('did 后动词过去式', 'did 已经承担过去时。', 'She did helped me.', 'She did help me.', 'did 后用动词原形。'),
      trap('does 后第三人称单数重复', 'does 已经体现第三人称单数。', 'He does understands me.', 'He does understand me.', 'does 后谓语还原。'),
    ],
    microDrills: [
      drill('I do want to be understood.', '我真的想被理解。', 'do 加强 want 的肯定语气。'),
    ],
  },
  'ellipsis-types': {
    yunnanFocus: '省略常在对话、状语从句和并列结构中出现。中考补全对话需要理解省略的主语、谓语或重复成分。',
    mustKnow: [
      '并列结构中相同成分可省略。',
      '状语从句主语和主句主语一致且含 be 时，可省略主语 + be。',
      '对话回答常省略已知信息，但书面作文不要过度省略。',
    ],
    traps: [
      trap('状语从句省略条件不足', '主从句主语不同不能省。', 'When young, my father taught me English.', 'When I was young, my father taught me English.', 'young 的逻辑主语是 I，不是 my father。'),
      trap('比较结构省略误读', 'than 后省略不等于没有比较对象。', 'She writes better than me do.', 'She writes better than I do.', '正式比较中 I do 保持主格和助动词。'),
    ],
    microDrills: [
      drill('If possible, give him more time.', '如果可能，给他多一点时间。', 'If possible = If it is possible。'),
    ],
  },
  'statement-conversion': {
    yunnanFocus: '直接引语变间接引语在中考可能出现在句型转换或阅读理解中，重点是人称、时态、时间地点指示词。',
    mustKnow: [
      'said to sb 常变 told sb；said 后可接 that 从句。',
      '人称随转述者改变。',
      '主句过去时时态常后移：am/is -> was, will -> would, can -> could。',
    ],
    traps: [
      trap('人称不随语境变化', '直接引语中的 I 要变成说话者。', 'Tom said, "I am tired." -> Tom said I was tired.', 'Tom said that he was tired.', 'I 指 Tom，转述为 he。'),
      trap('指示词不变', 'this/these/now/today/here 常按语境变化。', 'She said this was her book.', 'She said that was her book.', '转述距离改变时 this 常变 that。'),
    ],
    microDrills: [
      drill('She said that she needed more time.', '她说她需要更多时间。', 'I need 变为 she needed。'),
    ],
  },
  'question-conversion': {
    yunnanFocus: '疑问句转间接引语和宾语从句同逻辑：是否问句用 if/whether，特殊疑问句保留疑问词，但一律改陈述语序。',
    mustKnow: [
      '一般疑问句：ask + if/whether + 陈述语序。',
      '特殊疑问句：ask + wh-word + 陈述语序。',
      '问号变句号，助动词 do/does/did 通常消失并还原时态。',
    ],
    traps: [
      trap('保留疑问语序', '间接问句不是直接问句。', 'He asked where did I live.', 'He asked where I lived.', 'where 后用陈述语序。'),
      trap('一般疑问句漏 if/whether', 'Yes/No 问句没有疑问词，需要 if/whether。', 'She asked I was okay.', 'She asked if I was okay.', '是否问句用 if/whether 引导。'),
    ],
    microDrills: [
      drill('He asked whether I felt safe in class.', '他问我在课堂上是否感到安全。', 'whether 引导间接一般疑问句。'),
    ],
  },
  'imperative-conversion': {
    yunnanFocus: '祈使句转间接引语常考 tell/ask/order/warn sb (not) to do，陷阱是不要保留原祈使句动词原形。',
    mustKnow: [
      '肯定命令/请求：tell/ask/order sb to do。',
      '否定命令/请求：tell/ask/warn sb not to do。',
      'please 语气通常体现在 ask，不直接保留 please。',
    ],
    traps: [
      trap('否定位置错误', 'not 应放在 to do 前。', 'She told me to not give up.', 'She told me not to give up.', '标准教学中常用 not to do。'),
      trap('直接保留祈使句', '间接引语需要变成不定式。', 'The teacher asked us listen carefully.', 'The teacher asked us to listen carefully.', 'ask sb to do。'),
    ],
    microDrills: [
      drill('She asked me not to hide my feelings.', '她请求我不要隐藏自己的感受。', 'not to hide 是否定不定式。'),
    ],
  },
  'subject-verb': {
    yunnanFocus: '主谓一致在单项、完形和作文里都是基础扣分点。云南题常通过就近原则、one of、there be、不可数名词、动名词作主语来设陷阱。',
    mustKnow: [
      '语法一致：单数主语配单数谓语，复数主语配复数谓语。',
      '就近原则：there be, either...or, neither...nor, not only...but also。',
      'one of + 复数名词作主语核心仍是 one，谓语用单数。',
    ],
    traps: [
      trap('one of 后谓语看错', '离谓语最近的是复数名词，但主语核心是 one。', 'One of the students are from Yunnan.', 'One of the students is from Yunnan.', 'one 是主语中心词。'),
      trap('there be 就近原则', 'be 动词看后面最近的名词。', 'There are a book and two pens.', 'There is a book and two pens.', '最近名词 a book 是单数。'),
      trap('动名词作主语', 'doing 短语作主语按单数。', 'Helping others make me happy.', 'Helping others makes me happy.', 'Helping others 是一件事。'),
    ],
    microDrills: [
      drill('One of the quiet students has a powerful voice.', '安静的学生中有一个拥有有力的声音。', 'one 作主语，谓语用 has。'),
    ],
  },
  'pronoun-reference': {
    yunnanFocus: '代词指代在阅读理解和作文衔接中很重要。云南阅读常问 it/they/this 指代什么，作文中指代混乱会影响连贯性。',
    mustKnow: [
      '代词必须有清楚先行词。',
      '单复数一致：one -> it/he/she；plural -> they/them。',
      'this/that 可指代前面整件事，但前文必须明确。',
    ],
    traps: [
      trap('单复数指代错', '前文是复数，后文用 it。', 'The students shared their stories, and it moved me.', 'The students shared their stories, and they moved me.', '若指 students，用 they；若指整件事，要改写为 this moved me。'),
      trap('this 无明确对象', '作文中连续使用 this/it，读者不知道指什么。', 'This made me sad.', 'This silence made me sad.', '把指代对象写出来更清楚。'),
    ],
    microDrills: [
      drill('Her story was simple, but it touched everyone.', '她的故事很简单，但它打动了每个人。', 'it 指 Her story。'),
    ],
  },
};
