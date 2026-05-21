import type { GrammarDetail } from './grammarDeepDiveData';

export const grammarCoreDetails: Record<string, GrammarDetail> = {
  nouns: {
    title: '名词',
    subtitle: '名词负责给人、事物、地点、想法和情感命名。',
    overview: '学名词不能只背“人事物地点”。真正要判断的是：这个名词能不能数、前面要不要限定词、单复数怎么变、能不能用所有格表达归属。名词一旦判断错，后面的冠词、主谓一致、代词指代都会跟着错。',
    steps: [
      '先判断名词性质：可数单数、可数复数、不可数、专有名词还是抽象名词。',
      '再检查限定词：可数单数通常不能裸奔，要有 a/an/the/this/my 等。',
      '最后处理数量和归属：many/few 修饰可数，much/little 修饰不可数；所有格表示“谁的/属于谁”。',
    ],
    patterns: [
      {
        label: '可数单数必须有身份',
        formula: 'a/an/the/this/my + 可数单数名词',
        explanation: '英语里的可数单数名词通常不能直接裸用，因为听者需要知道它是“一个、这个、那个、我的还是某类”。可数名词有单数和复数两种形式，单数形式通常需要限定词。',
        examples: [
          { en: 'I need a notebook to write down my feelings.', cn: '我需要一个笔记本来写下我的感受。', note: 'notebook 是可数单数，前面用 a。' },
          { en: 'The answer surprised the whole class.', cn: '这个答案让全班都很惊讶。', note: 'answer 被语境限定，用 the。' },
          { en: 'This is my first time visiting Beijing.', cn: '这是我第一次来北京。', note: 'time 在这里是可数单数，前面用 this 和 my 限定。' },
          { en: 'An honest student admitted his mistake.', cn: '一个诚实的学生承认了他的错误。', note: 'student 是可数单数，honest 以元音音素开头，用 an。' },
          { en: 'She bought an umbrella and a pair of shoes.', cn: '她买了一把伞和一双鞋。', note: 'umbrella 可数单数，用 an；pair 也是可数单数，用 a。' },
        ],
      },
      {
        label: '不可数名词看作整体',
        formula: 'much/little/a piece of / a cup of / a bottle of + 不可数名词',
        explanation: 'advice, information, homework, news, weather, progress, courage 等常作不可数，不能直接加 s，也不能说 a advice。如果要量化不可数名词，需要用 a piece of, a cup of, a bottle of 等量词短语。',
        examples: [
          { en: 'She gave me a piece of advice when I felt invisible.', cn: '当我觉得没人看见我时，她给了我一条建议。', note: 'advice 不可数，要用 a piece of。' },
          { en: 'Courage grows when someone listens.', cn: '当有人倾听时，勇气会生长。', note: 'courage 是抽象不可数名词。' },
          { en: 'I have some good news for you.', cn: '我有一些好消息要告诉你。', note: 'news 不可数，虽然以 s 结尾，但表示单数意义。' },
          { en: 'There is not much water left in the bottle.', cn: '瓶子里剩下的水不多了。', note: 'water 是不可数名词，用 much 修饰。' },
          { en: 'He made great progress in English this term.', cn: '他这学期英语进步很大。', note: 'progress 是不可数名词，没有 progresses 的形式。' },
        ],
      },
    ],
    pitfalls: [
      '不要写 a homework / many information；应写 homework / much information / pieces of information。',
      '可数单数不要裸用：I bought book 是错的，应为 I bought a book。',
      '所有格不是只给人用：the door of the room 和 the room\'s door 都可能出现，但正式表达常用 of 结构。',
    ],
  },
  pronouns: {
    title: '代词',
    subtitle: '代词用来接替名词，但必须和指代对象在人称、数、性别和格上对应。',
    overview: '代词的核心不是背 I/me/my/mine，而是让读者清楚知道“它指谁”。代词错通常有两类：格错，例如 me 作主语；指代不清，例如 it/they 不知道指什么。',
    steps: [
      '先找代词替代的名词或对象。',
      '再判断位置：主语用主格，宾语用宾格，名词前用形容词性物主代词，单独使用用名词性物主代词。',
      '最后检查反身代词是否真的回指主语。',
    ],
    patterns: [
      {
        label: '格由位置决定',
        formula: '主语: I/he/she/we/they；宾语: me/him/her/us/them',
        explanation: '同一个人站在不同句子位置，代词形式会改变。主语位置用主格，动词或介词后用宾格，名词前用形容词性物主代词，单独使用用名词性物主代词。',
        examples: [
          { en: 'She listened to me after class.', cn: '课后她听我说了。', note: 'She 作主语，用主格；me 作 listen to 的宾语，用宾格。' },
          { en: 'My teacher encouraged me to trust myself.', cn: '老师鼓励我相信自己。', note: 'my 修饰 teacher；me 作宾语；myself 回指 me。' },
          { en: 'He gave his book to her, and she gave hers to him.', cn: '他把他的书给了她，她把她的书给了他。', note: 'his 是形容词性物主代词；hers 是名词性物主代词，等于 her book。' },
          { en: 'We helped them, and they thanked us warmly.', cn: '我们帮助了他们，他们热情地感谢了我们。', note: 'We 主格作主语；them 宾格作 helped 的宾语；they 主格；us 宾格。' },
          { en: 'Between you and me, this secret is safe.', cn: '就咱俩之间说，这个秘密是安全的。', note: 'between 是介词，后面用宾格 me，不是 I。' },
        ],
      },
      {
        label: '反身代词必须回到同一个对象',
        formula: '主语 + 动作 + oneself',
        explanation: '反身代词表示动作回到主语自己身上，不能随便当普通宾语。它必须和主语指同一个人。常见反身代词：myself, yourself, himself, herself, itself, ourselves, yourselves, themselves。',
        examples: [
          { en: 'I reminded myself that my voice mattered.', cn: '我提醒自己：我的声音很重要。', note: 'myself 回指 I。' },
          { en: 'She taught herself English by watching movies.', cn: '她通过看电影自学英语。', note: 'herself 回指 she，表示“自学”。' },
          { en: 'They enjoyed themselves at the party.', cn: '他们在聚会上玩得很开心。', note: 'themselves 回指 they。' },
          { en: 'You should take care of yourself.', cn: '你应该照顾好自己。', note: 'yourself 回指 you。' },
          { en: 'The cat cleaned itself after eating.', cn: '猫吃完后自己清理了身体。', note: 'itself 回指 the cat。' },
        ],
      },
    ],
    pitfalls: [
      'between you and I 是错的；介词后用宾格：between you and me。',
      'their/there/they\'re 发音相近但功能不同。',
      'it/this/that 指代整件事时，要确保前文有清楚内容可接。',
    ],
  },
  articles: {
    title: '冠词',
    subtitle: 'a/an 看发音和泛指，the 看特指、唯一、类别、固定结构，零冠词看泛指和习惯搭配。',
    overview: '冠词是英语名词系统的入口。真正要判断的不是中文里有没有“一个/这个”，而是名词是否可数、是否单数、是否已被限定、说话双方是否知道、是否表示类别或固定用法。a/an 的选择看后面第一个发音，不看首字母；the 的核心是“被锁定的对象”，也可以进入家族、群体、乐器、地理、最高级等结构；零冠词不是漏写，而是英语把某些泛指和活动看作不用限定。',
    steps: [
      '先判断名词类型：可数单数、可数复数、不可数、专有名词，确定是否必须有限定词。',
      '再判断语义身份：第一次泛指用 a/an；再次出现、语境唯一、双方知道、序数最高级等用 the；泛指复数/不可数和部分固定活动用零冠词。',
      '最后看发音和固定搭配：a/an 按音素选；the 的特殊结构和零冠词搭配必须整块记。',
    ],
    patterns: [
      {
        label: 'a/an 按发音，不按字母',
        formula: 'a + 辅音音素；an + 元音音素',
        explanation: '考试最喜欢放首字母和发音相反的词。university/useful/European/one-hour 以辅音音素开头，用 a；hour/honest/NBA/MRI/F/H/L/M/N/R/S/X 以元音音素开头，用 an。',
        examples: [
          { en: 'She is an honest student with a useful notebook.', cn: '她是一个诚实的学生，带着一本有用的笔记本。', note: 'honest 的 h 不发音，用 an；useful 以 /j/ 开头，用 a。' },
          { en: 'I found an F, an H and a U on the paper.', cn: '我在纸上发现了一个 F、一个 H 和一个 U。', note: 'F/H 读音以元音开头；U 读音以 /j/ 开头。' },
          { en: 'He is a university student and an NBA fan.', cn: '他是一名大学生，也是一名 NBA 球迷。', note: 'university 以 /j/ 开头用 a；NBA 以元音开头用 an。' },
          { en: 'It was an honor to meet you.', cn: '见到您是我的荣幸。', note: 'honor 的 h 不发音，以元音开头，用 an。' },
          { en: 'She bought a one-way ticket to Yunnan.', cn: '她买了一张去云南的单程票。', note: 'one 以 /w/ 开头，用 a。' },
        ],
      },
      {
        label: '第一次 a/an，第二次 the',
        formula: 'a/an + 名词；the + 同一个名词',
        explanation: '第一次只是引入一个对象；第二次已经变成上下文里双方都知道的对象。',
        examples: [
          { en: 'I wrote a letter. The letter helped me say what I could not speak.', cn: '我写了一封信。那封信帮我说出了我说不出口的话。', note: '第一次 a letter，第二次 the letter。' },
          { en: 'A boy stood near the door. The boy looked nervous.', cn: '一个男孩站在门边。那个男孩看起来很紧张。', note: '第二句的 boy 已被前文锁定。' },
          { en: 'I saw a cat in the garden. The cat was black and white.', cn: '我在花园里看到一只猫。那只猫是黑白相间的。', note: '第一次 a cat，第二次 the cat。' },
          { en: 'She bought a red dress. The dress fit her perfectly.', cn: '她买了一条红裙子。那条裙子非常适合她。', note: '第一次 a red dress，第二次 the dress。' },
          { en: 'An old man sat on the bench. The old man waved at me.', cn: '一位老人坐在长椅上。那位老人向我挥了挥手。', note: '第一次 an old man，第二次 the old man。' },
        ],
      },
      {
        label: 'the 锁定对象',
        formula: 'the + 已知/唯一/语境限定/序数/最高级/only/same',
        explanation: 'the 不只表示“这个”。它还表示世界唯一、场景唯一、前文已提、被后置修饰语限定、序数词和最高级等。',
        examples: [
          { en: 'The moon was bright, but the quietest student still felt unseen.', cn: '月亮很亮，但最安静的学生仍觉得没人看见自己。', note: 'moon 通常唯一；quietest 是最高级。' },
          { en: 'The girl in blue is the only one who listened.', cn: '穿蓝衣服的女孩是唯一一个倾听的人。', note: 'in blue 限定 girl；only 前常用 the。' },
          { en: 'The sun rises in the east and sets in the west.', cn: '太阳从东方升起，在西方落下。', note: 'sun, east, west 都是世界唯一。' },
          { en: 'This is the first time I have been here.', cn: '这是我第一次来这里。', note: 'first 是序数词，前面用 the。' },
          { en: 'He is the same age as my brother.', cn: '他和我哥哥同龄。', note: 'same 前通常用 the。' },
        ],
      },
      {
        label: 'the 的群体和家族',
        formula: 'the + 形容词；the + 复数姓氏',
        explanation: 'the rich/poor/young/old 表示一类人，通常作复数意义；the Greens/Browns/Whites 表示 Green/Brown/White 一家人。注意 Brown/Green/White 在这里是姓氏，不是普通颜色复数。',
        examples: [
          { en: 'The young need to be heard, not only corrected.', cn: '年轻人需要被听见，而不只是被纠正。', note: 'the young 表示年轻人这一类。' },
          { en: 'The Greens invited the quiet boy to dinner.', cn: 'Green 一家邀请那个安静的男孩吃晚饭。', note: 'the Greens 表示 Green 一家人，谓语按复数理解。' },
          { en: 'The old should be respected by the young.', cn: '老年人应该受到年轻人的尊重。', note: 'the old 和 the young 都表示一类人。' },
          { en: 'The poor need more help from society.', cn: '穷人需要社会给予更多帮助。', note: 'the poor 表示穷人这一类。' },
          { en: 'The Whites are going to move to Kunming next year.', cn: 'White 一家明年要搬到昆明。', note: 'the Whites 表示 White 一家人。' },
        ],
      },
      {
        label: 'the 的固定领域',
        formula: 'play the + 乐器；the + 地理/组织/报刊/国家特殊名',
        explanation: '乐器前常用 the；河流、海洋、山脉、群岛、沙漠、运河，含 kingdom/states/republic 或复数形式的国家名，组织、报刊、著名建筑等常用 the。',
        examples: [
          { en: 'She plays the violin and reads The Times.', cn: '她拉小提琴，也读《泰晤士报》。', note: '乐器和报刊名常用 the。' },
          { en: 'The United States lies between the Atlantic and the Pacific.', cn: '美国位于大西洋和太平洋之间。', note: '国家特殊名和海洋名前用 the。' },
          { en: 'The Himalayas are the highest mountains in the world.', cn: '喜马拉雅山脉是世界上最高的山脉。', note: '山脉名前常用 the。' },
          { en: 'The British Museum is worth visiting.', cn: '大英博物馆值得一游。', note: '著名建筑名前常用 the。' },
          { en: 'Have you ever seen the Nile River?', cn: '你见过尼罗河吗？', note: '河流名前常用 the。' },
        ],
      },
      {
        label: '零冠词不是漏写',
        formula: '泛指复数/不可数；三餐/球类/学科语言；by + 交通工具',
        explanation: '当名词表示一般类别、活动或方式时，英语常不用冠词。school/hospital/prison/church 等还要区分“功能”与“建筑”。',
        examples: [
          { en: 'Music comforts students, and basketball teaches teamwork.', cn: '音乐安慰学生，篮球教会团队合作。', note: 'music 不可数泛指；basketball 是球类活动。' },
          { en: 'He goes to school by bus, but his mother went to the school to meet his teacher.', cn: '他乘公交上学，但他妈妈去了那所学校见老师。', note: 'go to school 表上学功能；go to the school 表去建筑地点。' },
          { en: 'I have breakfast at seven and then go to work.', cn: '我七点吃早餐，然后去上班。', note: 'breakfast 是三餐，零冠词；work 表功能，零冠词。' },
          { en: 'She studies English and plays tennis every weekend.', cn: '她每周末学英语、打网球。', note: 'English 是学科；tennis 是球类，都用零冠词。' },
          { en: 'They traveled to Beijing by train.', cn: '他们乘火车去北京。', note: 'by train 是交通方式，零冠词。' },
        ],
      },
    ],
    pitfalls: [
      '26个字母前的 a/an 按字母名称发音：an A/E/F/H/I/L/M/N/O/R/S/X；a B/C/D/G/J/K/P/Q/T/U/V/W/Y/Z。',
      'the Browns/the Greens/the Whites 只有当 Brown/Green/White 作姓氏时表示一家人，不能教成普通“颜色 + s”都表示一家人。',
      'play the piano 和 play basketball 方向相反；by bus 和 take a bus 结构不同。',
      'a second chance 表“又一次机会”，the second chance 表“第二次机会”；a most useful book 可表示“非常有用的一本书”，the most useful book 是最高级。',
      '抽象名词/不可数名词泛指通常零冠词，但被限定时可用 the：love is important / the love from my teacher。',
    ],
  },
  numerals: {
    title: '数词',
    subtitle: '数词不只表示数量，还负责顺序、日期、时间、年龄、编号、分数、小数、百分比、倍数和约数。',
    overview: '数词是考试里最容易被低估的词类。小升初常考基数词、序数词、时间日期和编号；中考会把数词放进单词填空、阅读数据、听力、汉译英和作文里，考 hundred/thousand 是否加 s、序数词拼写、分数百分比主谓一致、年龄和复合形容词是否加连字符、分数小数倍数如何读写。',
    steps: [
      '先判断数词功能：数量、顺序、编号、时间日期、年龄、分数小数百分比、倍数还是约数。',
      '再判断它修饰名词还是独立作名词：修饰名词时注意单复数和连字符；作主语时注意主谓一致。',
      '最后检查考试陷阱：hundred 不加 s 还是 hundreds of，加 the 还是 a，序数词拼写，分数分母是否复数。',
    ],
    patterns: [
      {
        label: '基数词和大数',
        formula: 'one/two/three；hundred/thousand/million；hundreds of',
        explanation: '具体数字 + hundred/thousand/million 时不加 s；表示约数时用 hundreds/thousands/millions of。注意 dozen（十二个）和 score（二十个）的用法类似。',
        examples: [
          { en: 'Two hundred students joined the reading activity.', cn: '两百名学生参加了阅读活动。', note: 'two hundred 中 hundred 不加 s。' },
          { en: 'Hundreds of students wrote letters to encourage each other.', cn: '数百名学生写信互相鼓励。', note: 'hundreds of 表约数，hundreds 加 s。' },
          { en: 'There are five thousand books in our school library.', cn: '我们学校图书馆有五千本书。', note: 'five thousand 中 thousand 不加 s。' },
          { en: 'Millions of people watched the live broadcast.', cn: '数百万人观看了直播。', note: 'millions of 表约数。' },
          { en: 'Three million trees have been planted in the city.', cn: '这座城市已经种了三百万棵树。', note: 'three million 中 million 不加 s。' },
        ],
      },
      {
        label: '序数词和顺序',
        formula: 'the first/second/third；a second chance',
        explanation: '序数词表示第几，通常前面用 the；但 a second/a third 可表示“又一个/再一个”。注意 ninth, twelfth, twentieth, fortieth 等特殊拼写。',
        examples: [
          { en: 'The second answer is more careful than the first one.', cn: '第二个答案比第一个更仔细。', note: '明确顺序用 the second。' },
          { en: 'She gave herself a second chance to speak.', cn: '她给了自己又一次开口的机会。', note: 'a second chance 表“再一次机会”。' },
          { en: 'December is the twelfth month of the year.', cn: '十二月是一年中的第十二个月。', note: 'twelfth 是 twelve 的序数词，注意拼写。' },
          { en: 'He came in ninth place in the competition.', cn: '他在比赛中得了第九名。', note: 'ninth 是 nine 的序数词，注意去 e 加 th。' },
          { en: 'Today is her fortieth birthday.', cn: '今天是她四十岁生日。', note: 'fortieth 是 forty 的序数词，注意去 y 变 ie 加 th。' },
        ],
      },
      {
        label: '日期、时间、编号',
        formula: 'May 19 / May the nineteenth；Class One, Grade Seven；Room 205',
        explanation: '日期读法可用序数词；编号、班级、房间、公交等常用基数词放在名词后，首字母常大写。电话号、页码、门牌号等通常逐位读或分组读。',
        examples: [
          { en: 'The meeting is on May 19.', cn: '会议在5月19日。', note: '书写常用 May 19，朗读可读 May nineteenth。' },
          { en: 'She is in Class One, Grade Seven, and lives in Room 205.', cn: '她在七年级一班，住在205房间。', note: '班级和房间编号常用基数词。' },
          { en: 'My phone number is 138-1234-5678.', cn: '我的电话号码是138-1234-5678。', note: '电话号码通常逐位读或分组读。' },
          { en: 'Take Bus No. 12 to get to the train station.', cn: '乘12路公交车到火车站。', note: '公交编号常用 No. + 基数词。' },
          { en: 'Turn to Page 25 and read the passage.', cn: '翻到第25页，读这篇文章。', note: '页码通常用 Page + 基数词。' },
        ],
      },
      {
        label: '年龄和复合形容词',
        formula: 'an eight-year-old boy；a two-hour walk；in his twenties',
        explanation: '数词 + 单数名词 + 形容词化时，中间常加连字符，名词不加 s；表示几十多岁用 in one\'s twenties/thirties。复合形容词在句中只能作定语，不能作表语。',
        examples: [
          { en: 'An eight-year-old boy wrote a two-page letter.', cn: '一个八岁男孩写了一封两页的信。', note: 'eight-year-old 和 two-page 中 year/page 不加 s。' },
          { en: 'The teacher in her thirties understood his silence.', cn: '那位三十多岁的老师理解他的沉默。', note: 'in her thirties 表她三十多岁。' },
          { en: 'It was a three-day trip to Dali.', cn: '那是去大理的一次三天旅行。', note: 'three-day 作定语修饰 trip，day 不加 s。' },
          { en: 'My brother is ten years old. / He is a ten-year-old boy.', cn: '我弟弟十岁了。/ 他是一个十岁的男孩。', note: '作表语用 ten years old（不加连字符）；作定语用 ten-year-old。' },
          { en: 'We had a five-minute break between classes.', cn: '课间我们有五分钟的休息时间。', note: 'five-minute 作定语修饰 break，minute 不加 s。' },
        ],
      },
      {
        label: '分数、小数、百分比',
        formula: 'one third；two thirds；3.5；20 percent of...',
        explanation: '分数分子大于一时分母用复数；百分比和分数作主语时，谓语常看 of 后面的名词。小数用 point 读；百分比用 percent。',
        examples: [
          { en: 'Two thirds of the water is clean.', cn: '三分之二的水是干净的。', note: 'water 不可数，谓语用 is。' },
          { en: 'Twenty percent of the students are from this village.', cn: '百分之二十的学生来自这个村子。', note: 'students 是复数，谓语用 are。' },
          { en: 'One fourth of the class was absent yesterday.', cn: '班上四分之一的人昨天缺席了。', note: 'class 表单数意义时，谓语用 was。' },
          { en: 'The temperature is 36.5 degrees today.', cn: '今天气温36.5度。', note: '36.5 读作 thirty-six point five。' },
          { en: 'Fifty percent of the work has been finished.', cn: '百分之五十的工作已经完成了。', note: 'work 不可数，谓语用 has been finished。' },
        ],
      },
      {
        label: '倍数和次数',
        formula: 'twice/three times；as...as；once/twice a week',
        explanation: 'once, twice 是特殊次数词；三次及以上用 three times。倍数比较常见结构是 twice as...as 或 three times larger than。表示频率用“次数 + a + 时间单位”。',
        examples: [
          { en: 'She reads twice a week and writes three times a month.', cn: '她每周读两次，每月写三次。', note: '两次用 twice，三次用 three times。' },
          { en: 'This room is twice as large as that one.', cn: '这个房间是那个房间的两倍大。', note: 'twice as + 原级 + as。' },
          { en: 'He goes to the gym once every two days.', cn: '他每两天去一次健身房。', note: 'once every two days 表示频率。' },
          { en: 'The new building is three times taller than the old one.', cn: '新楼比旧楼高三倍。', note: 'three times taller than 表示倍数。' },
          { en: 'I have told him many times not to be late.', cn: '我已经告诉他很多次不要迟到了。', note: 'many times 表示“很多次”。' },
        ],
      },
    ],
    pitfalls: [
      'five hundreds students 是错的；具体数字后写 five hundred students。',
      'hundred of students 是错的；约数要写 hundreds of students。',
      'twoth, nineth, fourty 是错拼；应为 second, ninth, forty。',
      'a eight-year-old boy 是错的；eight 以元音音素开头，写 an eight-year-old boy。',
      'two-hours walk 是错的；复合形容词中 hour 用单数：a two-hour walk。',
      'two third 是错的；分子大于一，分母序数词加 s：two thirds。',
      'the number of 和 a number of 主谓不同：the number of students is；a number of students are。',
    ],
  },
  adjectives: {
    title: '形容词',
    subtitle: '形容词修饰名词或作表语，说明性质、状态和程度。比较级、最高级、同级比较、-ing/-ed 情感形容词都是中考核心考点。',
    overview: '形容词不只是“美丽的、大的”这些修饰词。它可以前置修饰名词，也可以放在系动词后作表语。比较级和最高级不是机械加 -er/-est，而是要看比较对象的数量。同级比较 as...as 也是高频考点。-ing 和 -ed 结尾的形容词本质上是“现在分词形容词化”和“过去分词形容词化”，前者表主动/令人，后者表被动/感到。',
    steps: [
      '判断形容词是在修饰名词（定语），还是在 be/seem/feel/look 后作表语。',
      '比较两者用比较级（-er/more），三者及以上或范围内最高用最高级（-est/most），同等程度用同级比较（as...as）。',
      '遇到 -ing 和 -ed 结尾的形容词，判断是“事物令人怎样”（-ing）还是“人感到怎样”（-ed）。',
      '多个形容词连用时按大致顺序：观点、大小、年龄、形状、颜色、来源、材料、用途。',
    ],
    patterns: [
      {
        label: '作定语和表语',
        formula: 'adj. + noun；linking verb + adj.',
        explanation: '同一个形容词可以放在名词前作定语，也可以放在系动词后作表语。作定语时修饰名词，作表语时说明主语的状态或性质。',
        examples: [
          { en: 'A quiet student may have a brave heart.', cn: '一个安静的学生也可能有勇敢的心。', note: 'quiet 修饰 student，brave 修饰 heart，都是定语。' },
          { en: 'His voice sounded calm, but his hands were cold.', cn: '他的声音听起来平静，但手是冷的。', note: 'calm/cold 放在系动词后作表语。' },
          { en: 'The old man told us an interesting story.', cn: '那位老人给我们讲了一个有趣的故事。', note: 'old 作定语修饰 man；interesting 作定语修饰 story。' },
          { en: 'She looks happy today.', cn: '她今天看起来很高兴。', note: 'happy 放在 looks 后作表语。' },
          { en: 'This is a useful book for middle school students.', cn: '这是一本对中学生有用的书。', note: 'useful 作定语修饰 book。' },
        ],
      },
      {
        label: '比较级表达变化',
        formula: 'become/get/turn/grow + comparative；more and more + 多音节 adj.',
        explanation: '比较级常用来写成长和变化。单音节和部分双音节形容词加 -er，多音节形容词用 more。表示“越来越”可以用比较级 + and + 比较级，或多音节用 more and more。',
        examples: [
          { en: 'I became braver after someone believed me.', cn: '有人相信我之后，我变得更勇敢了。', note: 'braver 表示和过去的自己比较。' },
          { en: 'The weather is getting colder and colder.', cn: '天气变得越来越冷了。', note: 'colder and colder 表示“越来越冷”。' },
          { en: 'She is becoming more and more confident.', cn: '她变得越来越自信了。', note: 'confident 是多音节，用 more and more。' },
          { en: 'This problem is more difficult than I thought.', cn: '这个问题比我想象的更难。', note: 'difficult 是多音节，比较级用 more difficult。' },
          { en: 'He runs faster than anyone else in his class.', cn: '他比班上任何人都跑得快。', note: 'fast 是单音节，比较级加 -er。' },
        ],
      },
      {
        label: '同级比较：as...as 和 not so/as...as',
        formula: 'as + adj.原级 + as；not so/as + adj.原级 + as',
        explanation: '同级比较表示两者程度相同，用 as...as；表示不如对方，用 not so/as...as。注意中间必须用形容词原级，不能用比较级或最高级。',
        examples: [
          { en: 'She is as tall as her mother now.', cn: '她现在和她妈妈一样高了。', note: 'as tall as 表示同级比较，tall 用原级。' },
          { en: 'This book is not so interesting as that one.', cn: '这本书不如那本有趣。', note: 'not so...as 表示不如。' },
          { en: 'He runs as fast as a professional athlete.', cn: '他跑得和专业运动员一样快。', note: 'as fast as 中 fast 用原级。' },
          { en: 'My English is not as good as hers.', cn: '我的英语不如她的好。', note: 'not as good as 表示不如，hers 是名词性物主代词。' },
          { en: 'The second story is just as moving as the first.', cn: '第二个故事和第一个一样感人。', note: 'just as...as 加强语气，表示“完全一样”。' },
        ],
      },
      {
        label: '-ing 形容词：事物令人怎样（主动/令人）',
        formula: 'V-ing + noun；sth is V-ing',
        explanation: '-ing 结尾的形容词由现在分词转化而来，表示事物具有某种性质，能够“使别人产生某种感受”。它描述的是事物的特征，而不是人的感受。常见词：interesting, boring, exciting, surprising, frightening, moving, tiring, relaxing, embarrassing, satisfying。',
        examples: [
          { en: 'This is an interesting movie.', cn: '这是一部有趣的电影。', note: 'interesting 说明 movie 具有让人感兴趣的特质。' },
          { en: 'The news was surprising to everyone.', cn: '这个消息让所有人都很惊讶。', note: 'surprising 说明消息本身令人惊讶。' },
          { en: 'Learning grammar can be exciting.', cn: '学习语法可以是令人兴奋的。', note: 'exciting 说明 learning grammar 这件事令人兴奋。' },
          { en: 'The long walk was tiring.', cn: '长途步行让人很累。', note: 'tiring 说明 walk 具有使人疲倦的特质。' },
          { en: 'His speech was very moving.', cn: '他的演讲非常感人。', note: 'moving 说明 speech 具有打动人心的力量。' },
        ],
      },
      {
        label: '-ed 形容词：人感到怎样（被动/感受）',
        formula: 'be/feel/seem + V-ed；a V-ed + person',
        explanation: '-ed 结尾的形容词由过去分词转化而来，表示人“被某种事物影响后产生的感受”。它描述的是人的主观感受，而不是事物的客观特征。常见词：interested, bored, excited, surprised, frightened, moved, tired, relaxed, embarrassed, satisfied。',
        examples: [
          { en: 'I am interested in English grammar.', cn: '我对英语语法感兴趣。', note: 'interested 描述“我”的感受，是被语法吸引后的状态。' },
          { en: 'She felt surprised by the unexpected gift.', cn: '她对意外的礼物感到惊讶。', note: 'surprised 描述 she 的感受，是被礼物影响后的状态。' },
          { en: 'The children were excited about the trip.', cn: '孩子们对这次旅行很兴奋。', note: 'excited 描述 children 的主观感受。' },
          { en: 'He seemed tired after the long meeting.', cn: '漫长会议后他似乎很累。', note: 'tired 描述 he 的感受，是被会议耗尽精力后的状态。' },
          { en: 'We were deeply moved by her story.', cn: '我们被她的故事深深打动了。', note: 'moved 描述 we 的感受，是被故事影响后的状态。' },
        ],
      },
      {
        label: '-ing 与 -ed 的成对对照',
        formula: 'interesting → interested；boring → bored；exciting → excited',
        explanation: '很多 -ing 和 -ed 形容词是成对出现的，核心区别在于：-ing 描述事物“主动令人产生某种感受”，-ed 描述人“被动感受到某种情绪”。记住口诀：-ing 令人，-ed 感到。',
        examples: [
          { en: 'The book is boring, so I feel bored.', cn: '这本书很无聊，所以我感到无聊。', note: 'boring 描述书令人无聊；bored 描述我感到无聊。' },
          { en: 'The game was exciting, and the players were excited.', cn: '比赛很激动人心，选手们很兴奋。', note: 'exciting 描述比赛令人兴奋；excited 描述选手感到兴奋。' },
          { en: 'This is a frightening story. I am frightened.', cn: '这是个吓人的故事。我很害怕。', note: 'frightening 描述故事吓人；frightened 描述我害怕。' },
          { en: 'The lesson was satisfying. The students were satisfied.', cn: '这节课令人满意。学生们感到满意。', note: 'satisfying 描述课程令人满足；satisfied 描述学生感到满足。' },
          { en: 'The situation is embarrassing. He feels embarrassed.', cn: '这个局面很尴尬。他感到尴尬。', note: 'embarrassing 描述局面令人尴尬；embarrassed 描述他感到尴尬。' },
        ],
      },
    ],
    pitfalls: [
      '形容词修饰名词，副词修饰动词/形容词/副词：speak gentle 错，应为 speak gently。',
      'more better 是双重比较，错误。',
      '-ing 多形容事物令人怎样，-ed 多形容人的感受：The book is boring, I am bored。',
      '同级比较中间必须用原级：as taller as 错，应为 as tall as。',
      'not so...as 和 not as...as 意思相同，但 not so...as 更常用于否定。',
      '系动词后接形容词作表语：The soup tastes good，不是 tastes well。',
      '比较级前通常不加 more：more easier 是双重比较错误。',
      '-ing/-ed 形容词不只描述情感，也可以描述其他性质：a broken window（破碎的），a running river（流淌的）。',
    ],
  },
  adverbs: {
    title: '副词',
    subtitle: '副词修饰动作、形容词、副词或整句话，说明时间、地点、方式、频率和程度。',
    overview: '副词的核心是回答“什么时候、在哪里、怎样、多久一次、到什么程度”。它的位置会影响语气和意义，特别是频率副词、程度副词和句子副词。',
    steps: [
      '先判断副词修饰对象：动词、形容词、副词还是整句。',
      '频率副词通常放在 be 后、实义动词前。',
      '方式副词多放在动词后，句子副词可放句首表达态度。',
    ],
    patterns: [
      {
        label: '频率副词位置',
        formula: 'be + always/often；always/often + 实义动词',
        explanation: '频率副词的位置取决于句子中的动词类型。放在 be 动词、助动词或情态动词之后，放在实义动词之前。常见频率副词：always, usually, often, sometimes, seldom, rarely, never, hardly ever。',
        examples: [
          { en: 'She is always patient with quiet students.', cn: '她总是耐心对待安静的学生。', note: 'always 放在 is 后。' },
          { en: 'He often hides his worries behind a smile.', cn: '他常把担心藏在笑容后面。', note: 'often 放在 hides 前。' },
          { en: 'I have never been to Beijing.', cn: '我从没去过北京。', note: 'never 放在 have 后、been 前。' },
          { en: 'They usually play basketball after school.', cn: '他们通常放学后打篮球。', note: 'usually 放在实义动词 play 前。' },
          { en: 'She can always find the right words.', cn: '她总能找到合适的词。', note: 'always 放在情态动词 can 后、实义动词 find 前。' },
        ],
      },
      {
        label: '句子副词',
        formula: 'Fortunately/Honestly/Clearly/Luckily/Obviously, + 句子',
        explanation: '句子副词评价整句话的态度或说话人的观点，不只是修饰一个动作。它们通常放在句首，用逗号与主句隔开。',
        examples: [
          { en: 'Honestly, I needed someone to ask if I was okay.', cn: '说实话，我需要有人问我是否还好。', note: 'Honestly 说明说话态度。' },
          { en: 'Fortunately, no one was hurt in the accident.', cn: '幸运的是，事故中没有人受伤。', note: 'Fortunately 评价整件事的幸运。' },
          { en: 'Obviously, she was not ready for the test.', cn: '显然，她没有为考试做好准备。', note: 'Obviously 表达说话人的判断。' },
          { en: 'Luckily, we arrived at the station on time.', cn: '幸运的是，我们准时到达了车站。', note: 'Luckily 评价整个事件的幸运。' },
          { en: 'Clearly, he needs more practice.', cn: '显然，他需要更多练习。', note: 'Clearly 表达说话人的明确判断。' },
        ],
      },
    ],
    pitfalls: [
      'good 是形容词，well 多作副词：do well，不是 do good。',
      'hard 和 hardly 意义不同：hard 努力/艰难，hardly 几乎不。',
      'too 表示过度，very 只是程度高：too tired to speak 含“太累以至不能”。',
    ],
  },
  prepositions: {
    title: '介词',
    subtitle: '介词连接名词/代词/动名词，建立时间、地点、方向、原因和关系。',
    overview: '介词不是逐个中文硬翻译。in/on/at 等词要按空间、时间和抽象关系来理解；介词后面如果接动词，必须用动名词形式。',
    steps: [
      '先判断介词表达时间、地点、方向、原因、方式还是固定搭配。',
      '看后面成分：介词后接名词、代词宾格或 doing。',
      '把易混介词放在同一维度比较，例如 at 点、on 面/日期、in 范围/月份年份。',
    ],
    patterns: [
      {
        label: '时间介词 at/on/in',
        formula: 'at 点；on 天；in 段',
        explanation: "at 用于具体时刻（at 7 o'clock, at noon, at midnight, at dawn），on 用于具体某天或某天的上下午（on Monday, on June 1st, on a cold morning），in 用于较长时间范围（in 2026, in summer, in the morning, in two hours）。",
        examples: [
          { en: 'At midnight, I wrote down what I was afraid to say.', cn: '午夜时，我写下了自己不敢说的话。', note: 'midnight 是时间点。' },
          { en: 'On Monday, she gave me a note.', cn: '周一，她给了我一张纸条。', note: 'Monday 是具体某天。' },
          { en: 'We met in the summer of 2024.', cn: '我们在2024年夏天相遇。', note: 'summer 是季节，用 in。' },
          { en: 'The train leaves at 3:30 in the afternoon.', cn: '火车下午三点半出发。', note: '3:30 用 at；the afternoon 用 in。' },
          { en: 'On a rainy morning, she told me her story.', cn: '在一个下雨的早晨，她给我讲了她的故事。', note: 'morning 被 rainy 修饰限定，用 on。' },
        ],
      },
      {
        label: '介词后动词用 doing',
        formula: 'preposition + doing',
        explanation: '介词后面如果接动词，必须把动词变成动名词形式（doing）。这是英语介词的基本语法规则，常见陷阱是 look forward to 中的 to 是介词而非不定式符号。',
        examples: [
          { en: 'I was afraid of being misunderstood.', cn: '我害怕被误解。', note: 'of 后用 being。' },
          { en: 'She is good at drawing portraits.', cn: '她擅长画肖像。', note: 'at 后用 drawing。' },
          { en: 'Thank you for helping me.', cn: '谢谢你帮助我。', note: 'for 后用 helping。' },
          { en: 'He insisted on finishing the work today.', cn: '他坚持今天完成这项工作。', note: 'on 后用 finishing。' },
          { en: 'Instead of complaining, try to solve the problem.', cn: '与其抱怨，不如试着解决问题。', note: 'Instead of 后用 complaining。' },
        ],
      },
    ],
    pitfalls: [
      'listen 后要接 to：listen to me。',
      'arrive at 小地点，arrive in 大地点；reach 不加 at/in。',
      'because of 后接名词/doing，because 后接完整句子。',
    ],
  },
  conjunctions: {
    title: '连词',
    subtitle: '连词连接词、短语、分句或句子，显示逻辑关系。',
    overview: '连词的重点是逻辑：并列、转折、原因、结果、条件、让步、时间。不同连词决定句子之间的关系，也决定标点和语序。',
    steps: [
      '先判断连接的两个部分是否语法层级相同。',
      '并列连词连接平行结构；从属连词引导从句。',
      '根据逻辑选择连词：because 原因，although 让步，if 条件，so 结果。',
    ],
    patterns: [
      {
        label: '并列连词连接平行结构',
        formula: 'A and/but/or B',
        explanation: '并列连词连接的两个部分应该在语法功能上平行，即词性、结构或形式要一致。常见的并列连词有 and, but, or, so, yet, for, nor。',
        examples: [
          { en: 'She was nervous but honest.', cn: '她很紧张，但很诚实。', note: 'nervous 和 honest 都是形容词，结构平行。' },
          { en: 'I like reading books and watching movies.', cn: '我喜欢读书和看电影。', note: 'reading books 和 watching movies 都是动名词短语，结构平行。' },
          { en: 'He is smart, kind, and hardworking.', cn: '他聪明、善良又勤奋。', note: 'smart, kind, hardworking 都是形容词，结构平行。' },
          { en: 'You can stay here or go home.', cn: '你可以留在这里或者回家。', note: 'stay here 和 go home 都是动词短语，结构平行。' },
          { en: 'She sings beautifully and dances gracefully.', cn: '她唱得优美，跳得优雅。', note: 'sings beautifully 和 dances gracefully 结构平行。' },
        ],
      },
      {
        label: '从属连词引导从句',
        formula: 'Although/Because/If/When/While/After/Before + 从句, 主句',
        explanation: '从属连词让一个完整的句子变成从句，依附于主句。从句不能独立存在，必须依附主句才有完整意义。不同从属连词表达不同的逻辑关系：although 让步，because 原因，if 条件，when/while/after/before 时间。',
        examples: [
          { en: 'Although he felt invisible, he still raised his hand.', cn: '尽管他觉得没人看见他，他还是举起了手。', note: 'Although 引导让步状语从句。' },
          { en: 'Because it rained heavily, we stayed indoors.', cn: '因为雨下得很大，我们待在室内。', note: 'Because 引导原因状语从句。' },
          { en: 'If you work hard, you will succeed.', cn: '如果你努力，你会成功的。', note: 'If 引导条件状语从句。' },
          { en: 'When she entered the room, everyone became quiet.', cn: '当她走进房间时，大家都安静了。', note: 'When 引导时间状语从句。' },
          { en: 'While I was reading, he was playing games.', cn: '我在读书的时候，他在玩游戏。', note: 'While 引导时间状语从句，强调两个动作同时进行。' },
        ],
      },
    ],
    pitfalls: [
      'because 和 so 通常不要在一个英语句子里重复表达同一逻辑。',
      'although 不和 but 在同一主从结构中成对使用。',
      '连接两个完整独立句不能只用逗号，要用连词、分号或句号。',
    ],
  },
  interjections: {
    title: '感叹词',
    subtitle: '感叹词表达瞬间情绪，常独立成分，不承担句子主干功能。',
    overview: '感叹词如 oh, wow, alas, hey, ouch 主要传递情绪和语气。学习重点不是大量使用，而是理解它们在口语、叙事和引号中的位置。',
    steps: [
      '先判断感叹词表达惊讶、疼痛、提醒、遗憾还是呼唤。',
      '感叹词常用逗号或感叹号与主句隔开。',
      '正式写作少用，叙事对话中可适度使用。',
    ],
    patterns: [
      {
        label: '独立表达情绪',
        formula: 'Interjection, + sentence',
        explanation: '感叹词本身不改变主句语法结构，它只表达说话人的情绪或态度。常见感叹词：oh（惊讶/意识到）、wow（赞叹）、hey（引起注意）、ouch（疼痛）、alas（遗憾）、bravo（喝彩）、hurrah（欢呼）。感叹词后面常用逗号或感叹号与主句隔开。',
        examples: [
          { en: 'Oh, I did not know you felt that way.', cn: '哦，我不知道你有那样的感受。', note: 'Oh 表示意识到或惊讶。' },
          { en: 'Hey, your voice matters too.', cn: '嘿，你的声音也很重要。', note: 'Hey 用来引起注意。' },
          { en: 'Wow, that is an amazing painting!', cn: '哇，那是一幅惊人的画！', note: 'Wow 表达赞叹和惊讶。' },
          { en: 'Ouch, I hurt my finger.', cn: '哎哟，我弄伤了手指。', note: 'Ouch 表达疼痛。' },
          { en: 'Bravo, you did it!', cn: '太棒了，你做到了！', note: 'Bravo 表达喝彩和赞扬。' },
        ],
      },
    ],
    pitfalls: [
      '不要在正式作文中过度使用 wow/oh/hey。',
      '感叹词后面的句子仍然要有完整语法。',
      'O 和 Oh 不同；现代英语常用 Oh。',
    ],
  },

  verbs: {
    title: '动词',
    subtitle: '动词是句子的发动机，负责动作、状态和变化。学动词不能只背原形，要同时掌握它的变化规则、及物性、延续性、搭配习惯和特殊功能。',
    overview: '动词是英语语法的核心枢纽。一个动词错了，时态、语态、主谓一致、非谓语都会跟着错。真正学动词，要回答五个问题：①这个动词表动作还是表状态？②它怎么变（规则还是不规则）？③它后面要不要接宾语（及物还是不及物）？④它是谓语还是非谓语？⑤它是延续性还是非延续性？这五个问题一旦理清，动词的绝大多数难题就迎刃而解。',
    steps: [
      '判断动词的功能：表动作（do/run/write）、表状态（be/seem/appear）、表变化（become/get/turn）还是表情感（love/hate/enjoy）。',
      '判断动词的变化方式：规则变化按规则推，不规则变化按类型记（三同、两同、三不同）。',
      '判断及物性：动词后必须接宾语的是及物动词；不接宾语也能完整的是不及物动词；有些动词两种用法都有。',
      '判断谓语还是非谓语：一个简单句只能有一个谓语动词，多余的动词要变成非谓语（to do / doing / done）。',
      '判断延续性：能和 how long / for two years 连用的是延续性动词；瞬间完成的是非延续性动词，需要和状态转换表达配合。',
    ],
    patterns: [
      {
        label: 'be 动词：存在、状态、等同',
        formula: 'be + 名词/形容词/介词短语/副词/现在分词/过去分词',
        explanation: 'be 不是“是”这一个意思。它可以表示存在（There is）、等同（I am a student）、状态（She is happy）、位置（It is on the desk）、被动（It is done）、进行（It is doing）。',
        examples: [
          { en: 'I am a student who wants to be heard.', cn: '我是一个想被听见的学生。', note: 'am 表示身份等同。' },
          { en: 'The key is on the desk.', cn: '钥匙在桌子上。', note: 'is 表示位置存在。' },
          { en: 'She was brave enough to speak first.', cn: '她足够勇敢，第一个开口。', note: 'was 表示状态。' },
          { en: 'The letter is being written.', cn: '信正在被写。', note: 'is being written 是进行时的被动。' },
          { en: 'To be or not to be, that is the question.', cn: '生存还是毁灭，这是个问题。', note: 'be 表示存在本身。' },
        ],
      },
      {
        label: 'do 动词：动作、完成、替代',
        formula: 'do + 名词；do + 动词原形（强调）；do = 替代动词',
        explanation: 'do 的核心是“做出一个动作”。它可以是实义动词（做某事）、助动词（构成疑问/否定/强调），也可以替代前面出现过的动词避免重复。',
        examples: [
          { en: 'I do my homework every evening.', cn: '我每天晚上做作业。', note: 'do 是实义动词，表示“做”。' },
          { en: 'Do you understand what I mean?', cn: '你理解我的意思吗？', note: 'Do 是助动词，帮助构成一般疑问句。' },
          { en: 'I do believe you.', cn: '我确实相信你。', note: 'do 放在动词前表强调。' },
          { en: 'She speaks English better than I do.', cn: '她英语说得比我好。', note: 'do 替代 speak English，避免重复。' },
          { en: 'What did you do last weekend?', cn: '你上周末做了什么？', note: 'did 是助动词，do 是实义动词“做”。' },
        ],
      },
      {
        label: '规则变化：加 s/es、ed、ing 的规律',
        formula: '三单：加 s/es；过去式/过去分词：加 ed；现在分词：去 e 加 ing / 双写加 ing',
        explanation: '规则变化有章可循。第三人称单数一般加 s，以 s/x/ch/sh/o 结尾加 es，辅音+y 变 y 为 i 加 es。过去式和过去分词一般加 ed，以 e 结尾加 d，辅音+y 变 i 加 ed，重读闭音节双写尾字母加 ed。',
        examples: [
          { en: 'She walks to school every day.', cn: '她每天步行上学。', note: 'walk 一般现在时三单加 s。' },
          { en: 'He watches the sunset quietly.', cn: '他安静地看日落。', note: 'watch 以 ch 结尾，三单加 es。' },
          { en: 'I studied hard for the exam.', cn: '我为考试努力学习。', note: 'study 辅音+y 结尾，变 i 加 ed。' },
          { en: 'They stopped talking when she entered.', cn: '她进来时，他们停止了交谈。', note: 'stop 重读闭音节，双写 p 加 ed。' },
          { en: 'The sun is rising over the mountains.', cn: '太阳正在山上升起。', note: 'rise 去 e 加 ing。' },
        ],
      },
      {
        label: '不规则变化：按形态分组记忆',
        formula: '三形相同：cut-cut-cut；两形相同：find-found-found；三形不同：go-went-gone',
        explanation: '不规则动词不能硬加 ed，要按形态分组记忆。三形相同的有 cut/hit/put/let；两形相同的有 find/buy/think/bring；三形不同的有 go/do/see/write/speak。分组记忆比逐个死记效率高得多。',
        examples: [
          { en: 'I cut the paper and put it in the envelope.', cn: '我裁了纸，放进信封里。', note: 'cut 和 put 的三形相同。' },
          { en: 'She found a note and brought it to me.', cn: '她发现一张纸条，带给我。', note: 'found 是 find 的过去式，brought 是 bring 的过去式，两形相同。' },
          { en: 'He went to the library and read a poem.', cn: '他去了图书馆，读了一首诗。', note: 'went 是 go 的过去式，三形不同。' },
          { en: 'I have written three letters this week.', cn: '我这周已经写了三封信。', note: 'written 是 write 的过去分词，三形不同。' },
          { en: 'She spoke softly, and everyone listened.', cn: '她轻声说话，所有人都听着。', note: 'spoke 是 speak 的过去式，listened 是规则变化。' },
        ],
      },
      {
        label: '及物动词：必须带宾语',
        formula: '及物动词 + 宾语（人/物/从句）',
        explanation: '及物动词后面必须有宾语，否则句子意思不完整。宾语可以是名词、代词、动名词、不定式或从句。常见及物动词：write, read, give, tell, make, find, love, want, need, see, hear。',
        examples: [
          { en: 'She wrote a letter to her future self.', cn: '她给未来的自己写了一封信。', note: 'wrote 后面必须接写的对象 a letter。' },
          { en: 'I need someone who truly listens.', cn: '我需要一个真正倾听的人。', note: 'need 是及物动词，someone 是宾语。' },
          { en: 'He told me that everything would be okay.', cn: '他告诉我一切都会好起来的。', note: 'told 接双宾语：me 和 that 从句。' },
          { en: 'We must protect the environment we live in.', cn: '我们必须保护我们生活的环境。', note: 'protect 是及物动词，environment 是宾语。' },
          { en: 'I want to believe in myself again.', cn: '我想再次相信自己。', note: 'want 接不定式 to believe 作宾语。' },
        ],
      },
      {
        label: '不及物动词：不接宾语也完整',
        formula: '不及物动词（+ 状语）',
        explanation: '不及物动词本身意义完整，不需要宾语。后面可以接状语（时间、地点、方式），但不能直接接宾语。常见不及物动词：happen, arrive, sleep, cry, laugh, run, walk, swim, rise, fall, die。',
        examples: [
          { en: 'Something wonderful happened yesterday.', cn: '昨天发生了一些美好的事。', note: 'happened 不接宾语，yesterday 是时间状语。' },
          { en: 'The sun rises in the east.', cn: '太阳从东方升起。', note: 'rises 不接宾语，in the east 是地点状语。' },
          { en: 'She cried when she heard the news.', cn: '听到消息时她哭了。', note: 'cried 不接宾语，when 引导时间状语从句。' },
          { en: 'We arrived early at the station.', cn: '我们早早到了车站。', note: 'arrived 不接宾语，early 和 at the station 是状语。' },
          { en: 'He laughed loudly at the joke.', cn: '他听了笑话大声笑了。', note: 'laughed 不接宾语，loudly 和 at the joke 是状语。' },
        ],
      },
      {
        label: '及物不及物兼有：一词两用',
        formula: 'V + 宾语 = 及物；V + 状语 = 不及物',
        explanation: '有些动词既可以做及物动词，也可以做不及物动词，意义可能相同也可能不同。关键在于后面有没有宾语。常见兼有动词：run, eat, sing, read, wash, drive, open, close, study, play。',
        examples: [
          { en: 'She runs every morning. / She runs a small bookstore.', cn: '她每天早上跑步。/ 她经营一家小书店。', note: 'run 不及物表“跑步”，及物表“经营”。' },
          { en: 'We eat at noon. / We eat rice every day.', cn: '我们中午吃饭。/ 我们每天吃米饭。', note: 'eat 不及物表“进餐”，及物表“吃某物”。' },
          { en: 'He sings beautifully. / He sings English songs.', cn: '他唱得很美。/ 他唱英文歌。', note: 'sing 不及物表“唱歌”，及物表“唱某首歌”。' },
          { en: 'The door opened slowly. / She opened the door quietly.', cn: '门慢慢开了。/ 她轻轻打开了门。', note: 'open 不及物表“自己开”，及物表“打开某物”。' },
          { en: 'I study hard. / I study English grammar.', cn: '我努力学习。/ 我学习英语语法。', note: 'study 不及物表“学习”，及物表“学习某科目”。' },
        ],
      },
      {
        label: '不及物动词 + 介词 = 及物短语',
        formula: '不及物动词 + 介词 + 宾语',
        explanation: '很多不及物动词不能直接接宾语，但加上介词后就变成了及物短语，后面必须接宾语。这些搭配要整块记忆，不能拆开。常见搭配：listen to, look at, wait for, depend on, laugh at, think about, care for, agree with, believe in, belong to。',
        examples: [
          { en: 'Please listen to me carefully.', cn: '请仔细听我说。', note: 'listen 不及物，listen to 整体相当于及物。' },
          { en: 'She looked at the photo and smiled.', cn: '她看着照片笑了。', note: 'look at 后面接看的对象 the photo。' },
          { en: 'I have been waiting for you for an hour.', cn: '我已经等了你一个小时。', note: 'wait for 接等待的对象 you。' },
          { en: 'You can depend on me whenever you need help.', cn: '无论什么时候需要帮助，你都可以依靠我。', note: 'depend on 接依赖的对象 me。' },
          { en: 'This book belongs to the school library.', cn: '这本书属于学校图书馆。', note: 'belong to 接归属对象 the school library。' },
        ],
      },
      {
        label: '谓语动词：受主语和时态双重约束',
        formula: '主语 + 谓语动词（受时态、人称、数、语态限制）',
        explanation: '谓语动词是句子的核心动作或状态，必须和主语在人称和数上一致，还要体现时态、语态和语气。一个简单句只能有一个谓语动词（并列谓语除外）。',
        examples: [
          { en: 'She writes a diary every night.', cn: '她每天晚上写日记。', note: 'writes 是谓语，受 she（三单）和现在时的约束。' },
          { en: 'They were singing when I arrived.', cn: '我到的时候，他们正在唱歌。', note: 'were singing 是谓语，过去进行时。' },
          { en: 'The letter has been read three times.', cn: '这封信已经被读了三遍。', note: 'has been read 是谓语，现在完成时的被动。' },
          { en: 'If I were you, I would speak up.', cn: '如果我是你，我会大声说出来。', note: 'were 和 would speak 是谓语，虚拟语气。' },
          { en: 'He can swim, but he does not want to today.', cn: '他会游泳，但他今天不想去。', note: 'can swim 和 does not want 是两个并列谓语。' },
        ],
      },
      {
        label: '非谓语动词：不受主语限制的三种形式',
        formula: 'to do（不定式）/ doing（动名词/现在分词）/ done（过去分词）',
        explanation: '当一个句子需要表达多个动作时，除了用从句，还可以把多余的动词变成非谓语。非谓语没有人称和数的变化，不受主语限制。不定式常表目的或将来；动名词常表抽象动作或作名词用；过去分词常表被动或完成。',
        examples: [
          { en: 'I came here to find my voice.', cn: '我来这里是为了找到自己的声音。', note: 'to find 是不定式，表目的。' },
          { en: 'Swimming is my favorite sport.', cn: '游泳是我最喜欢的运动。', note: 'Swimming 是动名词，作主语。' },
          { en: 'The boy hurt by words stayed silent.', cn: '那个被言语伤害过的男孩保持沉默。', note: 'hurt by words 是过去分词短语，作定语。' },
          { en: 'She stood there, waiting for an answer.', cn: '她站在那里，等待一个答案。', note: 'waiting 是现在分词，表伴随。' },
          { en: 'To see is to believe.', cn: '眼见为实。', note: 'To see 和 to believe 都是不定式，分别作主语和表语。' },
        ],
      },
      {
        label: '只接 to do 的动词',
        formula: 'V + to do（want, decide, hope, plan, agree, refuse, promise, learn, afford, offer, fail, manage, seem, happen）',
        explanation: '这些动词后面习惯上只接不定式，不接动名词。它们的共同特点是动作有方向性、未来性或意愿性。记的时候可以理解为“想要、决定、希望、计划、同意、拒绝、承诺、学习”都是指向未来的动作。',
        examples: [
          { en: 'I want to be understood, not just heard.', cn: '我想被理解，不只是被听到。', note: 'want 后接 to be understood。' },
          { en: 'She decided to speak up at the meeting.', cn: '她决定在会议上大声发言。', note: 'decided 后接 to speak up。' },
          { en: 'We hope to visit Yunnan next summer.', cn: '我们希望明年夏天去云南旅游。', note: 'hope 后接 to visit。' },
          { en: 'He promised to help me with my English.', cn: '他承诺帮我学英语。', note: 'promised 后接 to help。' },
          { en: 'They managed to finish the work on time.', cn: '他们设法按时完成了工作。', note: 'managed 后接 to finish。' },
        ],
      },
      {
        label: '只接 doing 的动词',
        formula: 'V + doing（enjoy, finish, practice, mind, keep, avoid, suggest, consider, imagine, miss, risk, admit, deny）',
        explanation: '这些动词后面习惯上只接动名词。它们的共同特点是动作已经在发生、在持续或抽象化。可以理解为“享受、完成、练习、介意、保持、避免、建议”都是对已有或抽象动作的态度。',
        examples: [
          { en: 'I enjoy reading books about courage.', cn: '我喜欢读关于勇气的书。', note: 'enjoy 后接 reading。' },
          { en: 'Have you finished writing the letter?', cn: '你写完那封信了吗？', note: 'finished 后接 writing。' },
          { en: 'She practices speaking English every day.', cn: '她每天练习说英语。', note: 'practices 后接 speaking。' },
          { en: 'Do you mind opening the window?', cn: '你介意打开窗户吗？', note: 'mind 后接 opening。' },
          { en: 'We should avoid making the same mistake.', cn: '我们应该避免犯同样的错误。', note: 'avoid 后接 making。' },
        ],
      },
      {
        label: 'to do 和 doing 意义不同',
        formula: 'stop / remember / forget / try / mean / regret + to do vs. + doing',
        explanation: '这些动词接 to do 和 doing 时意义截然不同。stop to do 是“停下来去做另一件事”，stop doing 是“停止正在做的事”；remember to do 是“记得要去做”，remember doing 是“记得做过”；forget 同理。try to do 是“努力做”，try doing 是“试着做”；mean to do 是“打算做”，mean doing 是“意味着”；regret to do 是“遗憾地要做”，regret doing 是“后悔做过”。',
        examples: [
          { en: 'She stopped to talk to me. / She stopped talking.', cn: '她停下来和我说话。/ 她停止了说话。', note: 'stop to talk 是停下别的事来交谈；stop talking 是停止交谈这个动作。' },
          { en: 'Remember to lock the door. / I remember locking it.', cn: '记得锁门。/ 我记得锁过门了。', note: 'remember to lock 是提醒未来动作；remember locking 是回忆过去的动作。' },
          { en: 'I tried to solve the problem. / Try doing it this way.', cn: '我努力解决这个问题。/ 试着用这种方式做。', note: 'try to solve 是努力；try doing 是尝试新方法。' },
          { en: 'I meant to call you yesterday. / Missing the bus means walking home.', cn: '我昨天打算给你打电话。/ 错过公交车意味着走回家。', note: 'meant to call 是打算；means walking 是意味着。' },
          { en: 'I regret to tell you the truth. / I regret telling him the secret.', cn: '我遗憾地告诉你真相。/ 我后悔告诉了他秘密。', note: 'regret to tell 是遗憾地要做；regret telling 是后悔做过。' },
        ],
      },
      {
        label: 'to do 和 doing 意义相同',
        formula: 'begin / start / continue / like / love / hate / prefer + to do / doing',
        explanation: '这些动词后面接 to do 或 doing 时，基本意思相同，只是语气或用法有细微差别。like/love/hate/prefer 在口语中 doing 更常见；begin/start/continue 在 begin 的进行时中常用 to do 避免重复。',
        examples: [
          { en: 'It began to rain. / It began raining.', cn: '天开始下雨了。', note: '两种表达意思相同。' },
          { en: 'She started to cry. / She started crying.', cn: '她开始哭了。', note: 'start 后 to do 和 doing 意思相同。' },
          { en: 'I like to swim in the morning. / I like swimming.', cn: '我喜欢在早上游泳。/ 我喜欢游泳。', note: 'like to swim 强调习惯性；like swimming 强调爱好本身。' },
          { en: 'He loves to read poetry. / He loves reading poetry.', cn: '他喜欢读诗。', note: '意思基本相同，语气和侧重点略有差异。' },
          { en: 'I prefer to walk alone. / I prefer walking alone.', cn: '我宁愿独自走路。', note: 'prefer 后两者皆可，意思相同。' },
        ],
      },
      {
        label: '延续性动词：可以和一段时间连用',
        formula: '延续性动词 + for / since / how long + 一段时间',
        explanation: '延续性动词表示可以持续的动作或状态，能和表示一段时间的状语连用。常见的有：live, work, study, wait, read, write, run, walk, sleep, stand, sit, keep, hold, know, have, believe。',
        examples: [
          { en: 'I have lived here for ten years.', cn: '我在这里住了十年。', note: 'live 是延续性动词，可以和 for ten years 连用。' },
          { en: 'She has worked as a teacher since 2015.', cn: '她从2015年起就当老师了。', note: 'work 是延续性动词，和 since 2015 连用。' },
          { en: 'How long have you been waiting?', cn: '你等了多久了？', note: 'wait 是延续性动词，和 how long 连用。' },
          { en: 'He has known her since childhood.', cn: '他从小就认识她。', note: 'know 是延续性动词，和 since childhood 连用。' },
          { en: 'We have believed in kindness all our lives.', cn: '我们一生都相信善良。', note: 'believe 是延续性动词，和 all our lives 连用。' },
        ],
      },
      {
        label: '非延续性动词：瞬间完成，不直接和一段时间连用',
        formula: '非延续性动词（die, leave, arrive, join, start, stop, buy, borrow, open, close, begin, finish, break, catch）',
        explanation: '非延续性动词（也叫瞬间动词）表示在极短时间内完成的动作，不能和 for two hours / since last year 等表示一段时间的状语直接连用。如果需要用现在完成时表达从过去持续到现在的影响，必须转换为相应的延续性表达。',
        examples: [
          { en: 'He died three years ago.', cn: '他三年前去世了。', note: 'die 是非延续性动词，用 ago 不用 for。' },
          { en: 'She left the room at noon.', cn: '她中午离开了房间。', note: 'leave 是非延续性动词，用 at noon 不用 for。' },
          { en: 'They arrived in Kunming yesterday.', cn: '他们昨天到达了昆明。', note: 'arrive 是非延续性动词，用 yesterday。' },
          { en: 'I bought this book last week.', cn: '我上周买了这本书。', note: 'buy 是非延续性动词，用 last week。' },
          { en: 'The meeting started at nine.', cn: '会议九点开始的。', note: 'start 是非延续性动词，用 at nine。' },
        ],
      },
      {
        label: '非延续性动词转延续性表达',
        formula: 'die → be dead；leave → be away；borrow → keep；buy → have；join → be in / be a member of；start/begin → be on；finish → be over；get married → be married；fall asleep → be asleep；catch a cold → have a cold',
        explanation: '当需要用现在完成时或表示“从过去持续到现在”时，非延续性动词要转换为对应的延续性状态表达。转换的核心思路是：把“动作发生”变成“状态持续”。',
        examples: [
          { en: 'His grandfather has been dead for five years.', cn: '他祖父已经去世五年了。', note: 'die 不能和 for five years 连用，改用 be dead。' },
          { en: 'She has been away from home since Monday.', cn: '她从周一就离开家了。', note: 'leave 改用 be away，和 since 连用。' },
          { en: 'I have kept this book for two weeks.', cn: '这本书我借了两周了。', note: 'borrow 改用 keep，和 for two weeks 连用。' },
          { en: 'He has been in the club for three years.', cn: '他加入俱乐部已经三年了。', note: 'join 改用 be in，和 for three years 连用。' },
          { en: 'They have been married since 2020.', cn: '他们从2020年就结婚了。', note: 'get married 改用 be married，和 since 连用。' },
        ],
      },
      {
        label: '系动词：连接主语和表语',
        formula: '主语 + 系动词 + 表语（名词/形容词/介词短语/副词/分词）',
        explanation: '系动词不表示具体动作，而是把主语和表语连接起来，说明主语的性质、状态或身份。分为五类：①be 动词；②感官系动词（look/sound/feel/taste/smell）；③变化系动词（get/become/turn/grow/go）；④保持系动词（keep/stay/remain）；⑤表象系动词（seem/appear）。',
        examples: [
          { en: 'The story sounds true, but I am not sure.', cn: '这个故事听起来真实，但我不确定。', note: 'sound 是感官系动词，后接形容词 true。' },
          { en: 'She felt nervous before the speech.', cn: '演讲前她感到紧张。', note: 'felt 是感官系动词，后接形容词 nervous。' },
          { en: 'The weather is getting colder.', cn: '天气正在变冷。', note: 'getting 是变化系动词，后接形容词 colder。' },
          { en: 'Keep calm and carry on.', cn: '保持冷静，继续前进。', note: 'Keep 是保持系动词，后接形容词 calm。' },
          { en: 'He seems happy today.', cn: '他今天似乎很高兴。', note: 'seems 是表象系动词，后接形容词 happy。' },
        ],
      },
      {
        label: '情态动词：能力、许可、义务、推测、意愿',
        formula: '情态动词 + 动词原形（没有人称和数的变化）',
        explanation: '情态动词不是独立的动词，而是给后面的动词添加“语气”：can/could 表能力或请求许可；may/might 表许可或可能；must 表必须或肯定推测；should 表建议或义务；will/would 表意愿或将来；shall 用于第一人称征求意见或规定。情态动词后必须接动词原形，没有人称和数的变化。',
        examples: [
          { en: 'I can swim, but I cannot fly.', cn: '我会游泳，但我不会飞。', note: 'can 表能力，否定用 cannot。' },
          { en: 'You may leave now if you want.', cn: '如果你想，现在可以走了。', note: 'may 表许可。' },
          { en: 'We must protect our planet.', cn: '我们必须保护我们的星球。', note: 'must 表义务。' },
          { en: 'It must be raining outside.', cn: '外面一定在下雨。', note: 'must 表肯定推测。' },
          { en: 'You should apologize to her.', cn: '你应该向她道歉。', note: 'should 表建议。' },
        ],
      },
      {
        label: '短语动词：动词 + 小品词',
        formula: '动词 + 副词（put on）；动词 + 介词（look after）；动词 + 副词 + 介词（look forward to）',
        explanation: '短语动词是动词和小品词（副词或介词）的固定搭配，整体意义往往不等于各部分之和。有些短语动词可分开（put on your coat / put your coat on），有些不可分开（look after the baby 不能说 look the baby after）。',
        examples: [
          { en: 'Please put on your jacket. / Please put your jacket on.', cn: '请穿上你的夹克。', note: 'put on 可分开，名词可放中间或后面。' },
          { en: 'I will look after your cat while you are away.', cn: '你不在时我会照顾你的猫。', note: 'look after 不可分开。' },
          { en: 'Turn off the lights before you leave.', cn: '离开前把灯关掉。', note: 'turn off 可分开：turn the lights off。' },
          { en: 'She gets along well with her classmates.', cn: '她和同学相处得很好。', note: 'get along with 是动词+副词+介词结构。' },
          { en: 'I am looking forward to seeing you again.', cn: '我期待再次见到你。', note: 'look forward to 中 to 是介词，后接 seeing。' },
        ],
      },
    ],
    pitfalls: [
      '不要把 be 动词和实义动词 do 混淆：be 表状态/存在，do 表动作。',
      '不及物动词不能直接接宾语：不能说 "I arrived the station"，要说 "I arrived at the station"。',
      '及物动词后面不能没有宾语：不能说 "She wrote"（除非上下文已明确），要说 "She wrote a letter"。',
      '一个简单句不能有两个谓语动词：不能说 "I want go"，要说 "I want to go"。',
      '非延续性动词不能和 for / since 直接连用：不能说 "He has died for three years"，要说 "He has been dead for three years"。',
      '情态动词后必须用动词原形：不能说 "He cans swim" 或 "She must to study"。',
      'stop to do 和 stop doing 意思相反；remember/forget/try/mean/regret 后接 to do 和 doing 意义也不同。',
      '有些短语动词不可分开：不能说 "look the baby after"，要说 "look after the baby"。',
      '介词后的动词必须用 doing：look forward to seeing，不能说 look forward to see。',
      '系动词后接形容词，不是副词：The soup tastes good，不是 tastes well。',
    ],
  },

  'sentence-types': {
    title: '句子类型',
    subtitle: '陈述、疑问、祈使、感叹分别完成说明、提问、要求和表达情绪。',
    overview: '句子类型不是标点分类，而是说话目的分类。陈述句给信息，疑问句索取信息，祈使句发出请求/命令，感叹句强化情绪。',
    steps: [
      '先判断说话目的：说明、提问、请求/命令、强烈感受。',
      '再检查语序：疑问句常有助动词提前，祈使句常省略主语 you。',
      '最后匹配标点：陈述句句号，疑问句问号，强烈感情可用感叹号。',
    ],
    patterns: [
      {
        label: '四类句子对比',
        formula: 'statement / question / imperative / exclamation',
        explanation: '同一内容可以根据目的变成不同句型。',
        examples: [
          { en: 'You are heard.', cn: '你被听见了。', note: '陈述句，提供信息。' },
          { en: 'Are you feeling unheard?', cn: '你是否觉得没人听见你？', note: '一般疑问句，be 动词提前。' },
          { en: 'Please tell me the truth.', cn: '请告诉我真相。', note: '祈使句，省略 you。' },
        ],
      },
    ],
    pitfalls: [
      '间接疑问句不用疑问语序：I wonder where he is，不是 where is he。',
      '祈使句的否定用 Don\'t + 动词原形。',
      '感叹号不能替代语法，句子仍需完整。',
    ],
  },
  'sentence-patterns': {
    title: '基本句型',
    subtitle: '英语主干通常由主语、谓语、宾语、表语、补语组合而成。',
    overview: '基本句型是读懂长句的骨架。无论句子多长，都要先找主语和谓语，再判断后面是宾语、表语、双宾语还是宾补。',
    steps: [
      '先找谓语动词，因为谓语决定句子结构。',
      '再找主语，看谁做动作或处于状态。',
      '根据动词类型判断后面接宾语、表语、双宾语还是宾补。',
    ],
    patterns: [
      {
        label: '五大基本句型',
        formula: 'SV / SVO / SVC / SVOO / SVOC',
        explanation: '不同动词带出不同结构。',
        examples: [
          { en: 'I cried.', cn: '我哭了。', note: 'SV：主语 + 不及物动词。' },
          { en: 'She gave me a chance.', cn: '她给了我一个机会。', note: 'SVOO：give + 人 + 物。' },
          { en: 'They made him confident.', cn: '他们让他变得自信。', note: 'SVOC：him 是宾语，confident 是宾补。' },
        ],
      },
    ],
    pitfalls: [
      '不要把介词短语误当宾语：listen to me 中 me 是介词宾语。',
      '系动词后接表语，不是宾语：I feel safe。',
      '双宾语可转换为 give sth to sb，但不是所有动词都能随便转换。',
    ],
  },
  'simple-compound-complex': {
    title: '简单句、并列句、复合句',
    subtitle: '看有几个主谓结构，以及它们之间是平等还是从属关系。',
    overview: '句子复杂度不是看长度，而是看主谓结构数量。一个独立主谓是简单句；两个平等独立句用并列连词连接是并列句；一个主句带从句是复合句。',
    steps: [
      '数完整主谓结构。',
      '判断每个主谓能不能独立成句。',
      '看连接方式：FANBOYS 连接并列，because/when/that/who 等引导从句。',
    ],
    patterns: [
      {
        label: '三类句子',
        formula: 'simple / compound / complex',
        explanation: '不同结构决定标点和连接词。',
        examples: [
          { en: 'I listened.', cn: '我听了。', note: '简单句，一个主谓。' },
          { en: 'I listened, and he spoke.', cn: '我听着，他说着。', note: '并列句，两个独立句用 and 连接。' },
          { en: 'I listened because he needed to be heard.', cn: '我倾听，因为他需要被听见。', note: '复合句，because 引导原因从句。' },
        ],
      },
    ],
    pitfalls: [
      '两个完整句不能只用逗号连接，这是 comma splice。',
      'because 从句不能单独当完整答案，除非在口语省略语境中。',
      '长句未必是复合句，短句也可能有从句。',
    ],
  },
  questions: {
    title: '疑问句',
    subtitle: '疑问句通过助动词、疑问词或附加问句来索取信息或确认判断。',
    overview: '疑问句的关键是语序。一般疑问句把 be/助动词/情态动词提前；特殊疑问句在前面加疑问词；反意疑问句前肯后否、前否后肯。',
    steps: [
      '判断是一般疑问、特殊疑问、选择疑问还是反意疑问。',
      '找到助动词；没有助动词时用 do/does/did。',
      '特殊疑问句保持“疑问词 + 一般疑问语序”，但主语疑问词例外。',
    ],
    patterns: [
      {
        label: '一般疑问句',
        formula: 'Aux/Be/Modal + 主语 + 谓语?',
        explanation: '把助动词、be 或情态动词放到主语前。',
        examples: [
          { en: 'Did you tell her how you felt?', cn: '你告诉她你的感受了吗？', note: 'tell 是实义动词，过去时用 did 提前。' },
        ],
      },
      {
        label: '特殊疑问句',
        formula: 'Wh-word + aux/be/modal + 主语 + 谓语?',
        explanation: '疑问词放句首，后面用疑问语序。',
        examples: [
          { en: 'Why did he hide his notebook?', cn: '他为什么把笔记本藏起来？', note: 'why 后接 did he hide。' },
        ],
      },
    ],
    pitfalls: [
      '间接疑问句用陈述语序：Can you tell me why he left?',
      'Who 作主语时不加 do：Who called you? 不是 Who did call you?',
      '反意疑问句要看前半句是否定词：He hardly speaks, does he?',
    ],
  },
  imperatives: {
    title: '祈使句',
    subtitle: '祈使句用动词原形开头，表达请求、建议、提醒、命令或禁止。',
    overview: '祈使句表面省略主语 you，但真正对象通常就是听话者。语气可以很强，也可以很温和，取决于 please、let\'s、语境和标点。',
    steps: [
      '确认句子是否省略主语 you。',
      '肯定祈使用动词原形，否定祈使用 Don\'t + 动词原形。',
      '建议类可用 Let\'s，温和请求可用 Please 或 Could you...',
    ],
    patterns: [
      {
        label: '肯定与否定',
        formula: 'Do... / Don\'t do...',
        explanation: '祈使句的动词保持原形。',
        examples: [
          { en: 'Trust your voice.', cn: '相信自己的声音。', note: 'Trust 是动词原形。' },
          { en: 'Don\'t laugh at someone\'s silence.', cn: '不要嘲笑别人的沉默。', note: '否定祈使用 Don\'t。' },
        ],
      },
      {
        label: 'Let\'s 建议',
        formula: 'Let\'s + 动词原形',
        explanation: '说话者把自己也包含进建议中。',
        examples: [
          { en: 'Let\'s listen before we judge.', cn: '让我们先倾听，再判断。', note: 'Let\'s 表示共同建议。' },
        ],
      },
    ],
    pitfalls: [
      '祈使句不是没有主语，而是省略了 you。',
      'Please 可以缓和语气，但不能修复粗暴内容。',
      'No + doing 常表示禁止：No shouting。',
    ],
  },
  'present-tenses': {
    title: '现在时态',
    subtitle: '现在时态表达现在的习惯、正在发生、已完成影响和持续过程。',
    overview: '现在时态不是只有“现在发生”。一般现在讲规律和习惯；现在进行讲此刻或阶段正在进行；现在完成讲过去对现在的影响；现在完成进行讲持续到现在的过程。',
    steps: [
      '先判断动作是习惯事实、正在发生、已经影响现在，还是持续到现在。',
      '再选择 do/does、am/is/are doing、have/has done、have/has been doing。',
      '最后检查时间标志和语境是否匹配。',
    ],
    patterns: [
      {
        label: '四种现在',
        formula: 'do/does | am/is/are doing | have/has done | have/has been doing',
        explanation: '同一主题可以用不同现在时态表达不同角度。',
        examples: [
          { en: 'I often write when I feel unheard.', cn: '当我觉得没人听见我时，我常常写下来。', note: 'often 表习惯，用一般现在时。' },
          { en: 'I am writing because I need to be honest.', cn: '我正在写，因为我需要诚实。', note: '正在发生，用现在进行时。' },
          { en: 'I have written three pages already.', cn: '我已经写了三页。', note: '结果影响现在，用现在完成时。' },
        ],
      },
    ],
    pitfalls: [
      '现在完成时不能和明确过去时间 yesterday 连用。',
      '状态动词 know/believe/like 通常少用进行时，除非特殊语境。',
      '第三人称单数一般现在时别漏 -s。',
    ],
  },
  'past-tenses': {
    title: '过去时态',
    subtitle: '过去时态表达过去发生、过去某刻正在发生、过去之前已完成和过去持续过程。',
    overview: '过去时态的重点是建立时间轴。一般过去是过去某点；过去进行是过去某时正在发生；过去完成是过去的过去；过去完成进行强调在过去某点之前持续了一段时间。',
    steps: [
      '先确定参照时间点在过去。',
      '判断动作是单次完成、当时正在进行、早于另一个过去动作，还是持续到过去某点。',
      '根据时间关系选择 did、was/were doing、had done、had been doing。',
    ],
    patterns: [
      {
        label: '过去时间轴',
        formula: 'did / was doing / had done / had been doing',
        explanation: '过去完成和过去完成进行必须有另一个过去参照点。',
        examples: [
          { en: 'I stayed quiet yesterday.', cn: '我昨天保持沉默。', note: '明确过去时间，用一般过去。' },
          { en: 'I was waiting when she came over.', cn: '她走过来时，我正在等待。', note: '过去某刻正在进行。' },
          { en: 'I had hidden the note before class began.', cn: '上课前我已经把纸条藏好了。', note: '藏纸条早于上课。' },
        ],
      },
    ],
    pitfalls: [
      '过去完成不能独立乱用，需要过去参照点。',
      'when 和 while 常提示过去进行，但仍要看动作长短。',
      'used to do 表过去习惯，现在不一定如此。',
    ],
  },
  'future-tenses': {
    title: '将来时态',
    subtitle: '将来表达预测、计划、安排、即将发生和将来某刻的状态。',
    overview: '将来不是只有 will。will 常表示预测或临时决定；be going to 表计划或有迹象；现在进行时可表示已安排的将来；将来完成表达到未来某点已经完成。',
    steps: [
      '判断是临时决定、已有计划、客观安排还是未来某点前完成。',
      '选择 will、be going to、am/is/are doing、will have done 等结构。',
      '检查时间标志：tomorrow, next week, by then, at this time tomorrow。',
    ],
    patterns: [
      {
        label: 'will 与 be going to',
        formula: 'will do / be going to do',
        explanation: 'will 偏预测或临时决定；be going to 偏计划或迹象。',
        examples: [
          { en: 'I will talk to him after class.', cn: '我课后会和他谈谈。', note: '说话时做出的决定可用 will。' },
          { en: 'She is going to cry; her eyes are full of tears.', cn: '她快要哭了；眼里满是泪水。', note: '有迹象，用 be going to。' },
        ],
      },
      {
        label: '将来完成',
        formula: 'will have done by + 将来时间',
        explanation: '强调到未来某点前已经完成。',
        examples: [
          { en: 'By Friday, I will have finished the letter.', cn: '到周五，我会已经写完那封信。', note: 'by Friday 是完成参照点。' },
        ],
      },
    ],
    pitfalls: [
      '时间/条件状语从句中常用一般现在表将来：If he comes, I will listen。',
      'be going to 不等于现在进行时；前者计划/迹象，后者常是安排。',
      'by tomorrow 常提示将来完成，不是一般将来。',
    ],
  },
  'tense-consistency': {
    title: '时态一致',
    subtitle: '主句和从句的时态要服务于同一条时间线。',
    overview: '时态一致不是机械“前后一模一样”。它要求句子里的动作关系清楚：谁先谁后，事实是否仍然成立，直接引语转间接引语时参照点是否改变。',
    steps: [
      '先画出动作时间线。',
      '主句过去时引出间接引语时，从句常作相应后移；客观真理不后移。',
      '状语从句中按真实时间关系选择时态。',
    ],
    patterns: [
      {
        label: '间接引语时态后移',
        formula: 'said/thought + 从句过去化',
        explanation: '主句谓语在过去，从句常从现在变过去、现在完成变过去完成。',
        examples: [
          { en: 'She said that she felt misunderstood.', cn: '她说她觉得被误解。', note: '直接引语 I feel... 转为 felt。' },
        ],
      },
      {
        label: '客观事实不后移',
        formula: 'The teacher said that truth matters.',
        explanation: '如果从句是普遍事实或格言，仍可用一般现在。',
        examples: [
          { en: 'He told me that the earth goes around the sun.', cn: '他告诉我地球绕着太阳转。', note: '客观真理不必改成 went。' },
        ],
      },
    ],
    pitfalls: [
      '不要把所有从句都机械改过去，先看是否客观事实。',
      'before/after 已说明先后，但完成时可强化先后关系。',
      '中文没有明显时态，翻译成英语时必须补时间线。',
    ],
  },
  'active-passive': {
    title: '主动与被动',
    subtitle: '主动强调动作发出者，被动强调动作承受者。',
    overview: '语态选择取决于表达焦点。想强调“谁做了事”用主动；想强调“谁/什么受到影响”，或动作发出者未知、不重要、不便说时，用被动。',
    steps: [
      '找动作、发出者和承受者。',
      '决定焦点在发出者还是承受者。',
      '被动结构用 be + done，be 随时态变化。',
    ],
    patterns: [
      {
        label: '主动变被动',
        formula: 'doer + verb + receiver → receiver + be done + by doer',
        explanation: '宾语升为主语，动词变 be done，原主语可放 by 后。',
        examples: [
          { en: 'The teacher encouraged him.', cn: '老师鼓励了他。', note: '主动，强调老师做了什么。' },
          { en: 'He was encouraged by the teacher.', cn: '他被老师鼓励了。', note: '被动，强调他受到鼓励。' },
        ],
      },
    ],
    pitfalls: [
      '被动不是 be + 原形，而是 be + done。',
      '不及物动词通常没有被动：happen, arrive, sleep。',
      'by 短语不是必须出现，发出者不重要时可省略。',
    ],
  },
  'passive-forms': {
    title: '各种时态的被动',
    subtitle: '被动的核心不变：be 随时态变化，done 保持完成态形式。',
    overview: '被动语态不是单独一种时态。每个时态都有自己的 be 形态：is done, was done, will be done, has been done, is being done 等。',
    steps: [
      '先确定原句时态。',
      '把 be 放进该时态中变化。',
      '后面接过去分词 done。',
    ],
    patterns: [
      {
        label: '常见被动形式',
        formula: 'be + done',
        explanation: '时态变化都体现在 be 上。',
        examples: [
          { en: 'The note is read every morning.', cn: '那张纸条每天早上都会被读。', note: '一般现在时被动：is read。' },
          { en: 'The note was read yesterday.', cn: '那张纸条昨天被读了。', note: '一般过去时被动：was read。' },
          { en: 'The note has been read many times.', cn: '那张纸条已经被读了很多次。', note: '现在完成时被动：has been read。' },
        ],
      },
    ],
    pitfalls: [
      '进行时被动是 be being done：is being discussed。',
      '完成时被动是 have/has/had been done。',
      '情态动词被动是 modal + be done：should be heard。',
    ],
  },
  'special-passive': {
    title: '特殊被动结构',
    subtitle: '感官、使役、双宾语和短语动词的被动有特殊处理。',
    overview: '特殊被动难在“变形后要补回或保留某些成分”。感官/使役动词主动中省略 to，变被动时常补 to；短语动词变被动时介词/副词不能丢。',
    steps: [
      '判断是否为感官动词、使役动词、双宾语动词或短语动词。',
      '感官/使役主动省 to，被动常还原 to。',
      '短语动词被动保留介词或副词。',
    ],
    patterns: [
      {
        label: '感官/使役被动补 to',
        formula: 'see/make sb do → sb be seen/made to do',
        explanation: '主动省略的不定式符号 to，在被动中常还原。',
        examples: [
          { en: 'They made him apologize.', cn: '他们让他道歉。', note: '主动 make sb do。' },
          { en: 'He was made to apologize.', cn: '他被要求道歉。', note: '被动补回 to。' },
        ],
      },
      {
        label: '短语动词被动',
        formula: 'look after sb → sb be looked after',
        explanation: '介词/副词是短语动词的一部分，不能丢。',
        examples: [
          { en: 'The quiet child was looked after carefully.', cn: '那个安静的孩子被细心照看。', note: 'after 必须保留。' },
        ],
      },
    ],
    pitfalls: [
      'make/see/hear sb do 变被动常为 sb be made/seen/heard to do。',
      'give 可有两种被动：I was given a chance / A chance was given to me。',
      '短语动词被动不要漏介词：be laughed at。',
    ],
  },
  indicative: {
    title: '陈述语气',
    subtitle: '陈述语气用来表达事实、观点、判断和真实可能。',
    overview: '陈述语气是英语最常用语气。它不像祈使句要求对方做事，也不像虚拟语气表达非真实假设，而是把内容当作事实或真实判断说出来。',
    steps: [
      '判断说话者是否把内容当作真实事实或观点。',
      '根据时间选择合适时态。',
      '用情态动词表达可能性、必要性或能力时，仍可属于陈述语气。',
    ],
    patterns: [
      {
        label: '事实和观点',
        formula: 'Subject + predicate',
        explanation: '陈述语气覆盖肯定、否定和真实判断。',
        examples: [
          { en: 'He feels nervous before speaking.', cn: '他说话前会紧张。', note: '陈述一个真实状态。' },
          { en: 'Her words did not hurt me as much as her silence did.', cn: '她的话没有她的沉默那么伤我。', note: '否定句也属于陈述语气。' },
        ],
      },
    ],
    pitfalls: [
      '陈述语气不等于一般现在时，所有真实时态都可用于陈述语气。',
      '观点也可以用陈述语气表达，但要注意证据和语气。',
      '不要把陈述语气和陈述句完全混同；语气是动词表达现实性的方式。',
    ],
  },
  'imperative-mood': {
    title: '祈使语气',
    subtitle: '祈使语气直接面向听者，表达请求、建议、命令或禁止。',
    overview: '祈使语气的语法特点是省略主语 you，用动词原形开头。它可以很温和，也可以很强硬，关键看用词和语境。',
    steps: [
      '确认句子是否直接对听者发出行动要求。',
      '动词用原形，否定用 Don\'t。',
      '用 please、let\'s、just 等调整语气强弱。',
    ],
    patterns: [
      {
        label: '直接请求',
        formula: 'Please + 动词原形',
        explanation: 'Please 让祈使句更礼貌，但仍然是祈使语气。',
        examples: [
          { en: 'Please listen before you judge.', cn: '请先倾听，再判断。', note: 'listen 是动词原形。' },
        ],
      },
      {
        label: '禁止',
        formula: 'Don\'t + 动词原形',
        explanation: 'Don\'t 后面不能加 to。',
        examples: [
          { en: 'Don\'t call his silence laziness.', cn: '不要把他的沉默叫作懒惰。', note: 'call 使用原形。' },
        ],
      },
    ],
    pitfalls: [
      'Don\'t to do 是错的。',
      '祈使句省略 you，但语气仍然指向听者。',
      '考试写作中命令语气要谨慎，建议可用 Let\'s 或 We should。',
    ],
  },
  subjunctive: {
    title: '虚拟语气',
    subtitle: '虚拟语气表达非真实、假设、愿望、建议或与事实相反。',
    overview: '虚拟语气不是“过去式等于过去”。在虚拟语气中，过去形式常表示距离现实更远。核心是判断这个内容是否真实发生，还是只是假设、愿望或建议。',
    steps: [
      '判断是否与现在、过去或将来事实相反。',
      '条件从句和主句分别选择对应结构。',
      '识别 wish, if only, as if, it is time, suggest/order 等触发场景。',
    ],
    patterns: [
      {
        label: 'if 条件虚拟',
        formula: 'If + 过去式, would do；If + had done, would have done',
        explanation: '现在相反用过去式，过去相反用过去完成时。',
        examples: [
          { en: 'If I were braver, I would tell her the truth.', cn: '如果我更勇敢，我会告诉她真相。', note: '与现在事实相反。' },
          { en: 'If I had listened, he would have felt less alone.', cn: '如果我当时倾听了，他就不会那么孤单。', note: '与过去事实相反。' },
        ],
      },
    ],
    pitfalls: [
      'If I was 可口语出现，但考试中 If I were 更稳妥。',
      '过去虚拟主句用 would have done，不是 would did。',
      'suggest that sb do 中 do 是原形虚拟，不按第三人称加 s。',
    ],
  },
  infinitives: {
    title: '不定式',
    subtitle: 'to do 表示目标、计划、结果、原因或将要发生的动作。',
    overview: '不定式的核心不是“to + 动词原形”，而是它在句子里承担什么功能：名词功能、形容词功能或副词功能。它常带有未来、目的和未完成意味。',
    steps: [
      '判断 to do 在句中作主语、宾语、表语、定语、状语还是宾补。',
      '看它是否表达目的、计划、结果或评价原因。',
      '注意某些动词后接 to do，某些动词后接 doing。',
    ],
    patterns: [
      {
        label: '目的状语',
        formula: 'to do = in order to do',
        explanation: '表示做某事的目的。',
        examples: [
          { en: 'I wrote the note to explain what I could not say aloud.', cn: '我写那张纸条，是为了解释我说不出口的话。', note: 'to explain 表目的。' },
        ],
      },
      {
        label: '宾语和宾补',
        formula: 'want/decide/hope to do；ask/tell sb to do',
        explanation: '不定式常表达尚未完成的打算或要求。',
        examples: [
          { en: 'She asked me to trust my voice.', cn: '她让我相信自己的声音。', note: 'to trust 作宾补。' },
        ],
      },
    ],
    pitfalls: [
      'make/let/have sb do 主动中省 to。',
      'to 后不一定都是不定式；look forward to doing 中 to 是介词。',
      'too...to... 表示“太……而不能……”。',
    ],
  },
  gerunds: {
    title: '动名词',
    subtitle: 'doing 可以像名词一样作主语、宾语、表语，也保留动作意味。',
    overview: '动名词把一个动作“名词化”。它常表示习惯、经历、一般行为，也常出现在介词后和固定动词后。',
    steps: [
      '判断 doing 是否在句中承担名词位置。',
      '检查前面是否是介词；介词后动词用 doing。',
      '区分 stop/remember/forget/regret 后接 doing 和 to do 的意义差别。',
    ],
    patterns: [
      {
        label: '作主语和宾语',
        formula: 'Doing + 谓语；verb + doing',
        explanation: '动作整体成为句子谈论对象。',
        examples: [
          { en: 'Writing helps me understand myself.', cn: '写作帮助我理解自己。', note: 'Writing 作主语。' },
          { en: 'He avoided talking about his fear.', cn: '他避免谈论自己的害怕。', note: 'avoid 后接 doing。' },
        ],
      },
      {
        label: '介词后 doing',
        formula: 'preposition + doing',
        explanation: '介词后不能直接接动词原形。',
        examples: [
          { en: 'She was tired of being misunderstood.', cn: '她厌倦了被误解。', note: 'of 后接 being。' },
        ],
      },
    ],
    pitfalls: [
      'enjoy/avoid/finish/practice 后接 doing。',
      'remember doing 表记得做过；remember to do 表记得要去做。',
      '动名词有自己的宾语：reading the letter，不是只看 reading。',
    ],
  },
  participles: {
    title: '分词',
    subtitle: 'doing 表主动/进行，done 表被动/完成，可作定语、状语、补语。',
    overview: '分词是长难句核心。现在分词 doing 常表示主动或正在进行；过去分词 done 常表示被动或完成。判断分词时要找它的逻辑主语。',
    steps: [
      '先找分词修饰谁或说明谁的动作。',
      '判断逻辑关系：主动用 doing，被动或完成用 done。',
      '看位置：名词前后作定语，句首/句中作状语，宾语后作补语。',
    ],
    patterns: [
      {
        label: '分词作定语',
        formula: 'doing/done + noun；noun + doing/done phrase',
        explanation: '单个分词常前置，分词短语常后置。',
        examples: [
          { en: 'The crying boy needed patience.', cn: '那个正在哭的男孩需要耐心。', note: 'crying 表主动进行。' },
          { en: 'The words written in the notebook were honest.', cn: '写在笔记本里的话很诚实。', note: 'written 表被动完成。' },
        ],
      },
      {
        label: '分词作状语',
        formula: 'Doing/Done..., 主句',
        explanation: '压缩时间、原因、条件、伴随等状语从句。',
        examples: [
          { en: 'Feeling unseen, he stopped raising his hand.', cn: '因为觉得没人看见，他不再举手。', note: 'Feeling 的逻辑主语是 he。' },
        ],
      },
    ],
    pitfalls: [
      '分词逻辑主语必须清楚，否则会出现悬垂分词。',
      'interesting/interested 区别：事物令人感兴趣，人感到感兴趣。',
      'done 不只表示过去，也常表示被动或完成。',
    ],
  },
  'noun-clauses': {
    title: '名词性从句',
    subtitle: '一个从句整体当名词用，可作主语、宾语、表语、同位语。',
    overview: '名词性从句的核心是“整句话占据一个名词位置”。它不是修饰名词，而是在句子里直接承担主语、宾语、表语或解释某个抽象名词的内容。',
    steps: [
      '找从句引导词：that, whether/if, what, who, why, how 等。',
      '判断整个从句在主句中作什么成分。',
      '从句内部通常用陈述语序。',
    ],
    patterns: [
      {
        label: '主语/宾语/表语从句',
        formula: 'What/That/Whether + 陈述语序',
        explanation: '名词性从句整体相当于一个名词。',
        examples: [
          { en: 'What he needed was a patient listener.', cn: '他需要的是一个有耐心的倾听者。', note: 'What he needed 作主语。' },
          { en: 'I believe that his silence has a reason.', cn: '我相信他的沉默有原因。', note: 'that 从句作 believe 的宾语。' },
        ],
      },
    ],
    pitfalls: [
      '宾语从句用陈述语序：I know where he is。',
      'whether 比 if 更正式，介词后通常用 whether。',
      'that 引导宾语从句可省，但主语从句通常不省。',
    ],
  },
  'adjective-clauses': {
    title: '定语从句',
    subtitle: '定语从句修饰名词或代词，说明“哪一个/什么样的”。',
    overview: '定语从句的核心是先行词。关系词 who/which/that/whose/where/when/why 既连接从句，又在从句中承担成分或表达关系。',
    steps: [
      '先找被修饰的先行词。',
      '判断先行词在从句里作主语、宾语、定语还是地点/时间/原因状语。',
      '选择关系词，并判断限制性还是非限制性。',
    ],
    patterns: [
      {
        label: '关系代词',
        formula: '先行词 + who/which/that/whose + 从句',
        explanation: '关系代词在从句中作主语、宾语或定语。',
        examples: [
          { en: 'The teacher who remembered my name changed my day.', cn: '那个记得我名字的老师改变了我那一天。', note: 'who 在从句中作主语。' },
          { en: 'The note that I wrote stayed in my pocket.', cn: '我写的那张纸条一直在口袋里。', note: 'that 在从句中作宾语。' },
        ],
      },
      {
        label: '非限制性定语从句',
        formula: '先行词, which/who...,',
        explanation: '用逗号补充说明，不限定范围。',
        examples: [
          { en: 'My sister, who never laughs at my fears, sat beside me.', cn: '我姐姐坐在我身边，她从不嘲笑我的害怕。', note: '逗号说明只有一个姐姐或补充信息。' },
        ],
      },
    ],
    pitfalls: [
      '非限制性定语从句不能用 that。',
      'where/when/why 是关系副词，先看从句里是否缺地点/时间/原因状语。',
      'whose 不只指人，也可指物：a book whose cover is blue。',
    ],
  },
  'adverb-clauses': {
    title: '状语从句',
    subtitle: '状语从句修饰整个动作或主句，说明时间、原因、条件、让步、目的、结果等。',
    overview: '状语从句的核心是逻辑关系。它不像定语从句修饰一个名词，而是说明主句动作发生的时间、原因、条件、方式、程度或让步背景。',
    steps: [
      '判断从句和主句的逻辑关系。',
      '选择对应连接词：when/because/if/although/so that/so...that 等。',
      '注意时态规则和标点：从句在句首通常用逗号。',
    ],
    patterns: [
      {
        label: '常见状语关系',
        formula: 'When/Because/If/Although + 从句, 主句',
        explanation: '连接词决定从句功能。',
        examples: [
          { en: 'When he finally spoke, everyone became quiet.', cn: '当他终于开口时，所有人都安静了。', note: '时间状语从句。' },
          { en: 'Although she was nervous, she told the truth.', cn: '尽管她紧张，她还是说出了真相。', note: '让步状语从句。' },
          { en: 'I wrote slowly so that my thoughts would be clear.', cn: '我慢慢写，以便思路清楚。', note: '目的状语从句。' },
        ],
      },
    ],
    pitfalls: [
      'although 不和 but 重复搭配。',
      'if 条件从句表将来时常用一般现在。',
      'because of 后接名词/doing，because 后接句子。',
    ],
  },
  'it-cleft': {
    title: 'It 强调句',
    subtitle: 'It is/was ... that/who ... 用来突出句中某个成分。',
    overview: 'It 强调句不是普通 it 作形式主语。它的功能是把被强调成分放到聚光灯下，常强调人、物、时间、地点、原因等。',
    steps: [
      '先写出普通句，确定要强调哪个成分。',
      '把被强调部分放入 It is/was ... that/who ...。',
      '去掉强调框后，剩余内容应能还原为普通句。',
    ],
    patterns: [
      {
        label: '强调人或物',
        formula: 'It is/was + 被强调部分 + that/who + 其他',
        explanation: '强调人可用 who/that，强调其他多用 that。',
        examples: [
          { en: 'It was my teacher who noticed my silence.', cn: '正是我的老师注意到了我的沉默。', note: '强调 my teacher。' },
          { en: 'It was in the notebook that I found my courage.', cn: '正是在笔记本里，我找到了勇气。', note: '强调地点状语。' },
        ],
      },
    ],
    pitfalls: [
      '强调谓语动词不用 It 强调句，通常用 do/does/did 强调。',
      '去掉 It is/was 和 that/who 后，句子应能还原。',
      'It is clear that... 是形式主语结构，不是强调句。',
    ],
  },
  'do-emphasis': {
    title: 'Do 强调',
    subtitle: 'do/does/did + 动词原形，用来强调谓语动作确实发生。',
    overview: 'Do 强调只用于肯定句中的谓语动词，表达“确实、真的”。时态由 do/does/did 承担，后面的实义动词必须用原形。',
    steps: [
      '确认要强调的是谓语动作。',
      '根据主语和时态选择 do/does/did。',
      '后面的动词恢复原形。',
    ],
    patterns: [
      {
        label: '强调谓语',
        formula: 'do/does/did + verb base',
        explanation: '常用于反驳、确认或加强语气。',
        examples: [
          { en: 'I do care about what you feel.', cn: '我真的在乎你的感受。', note: 'do 强调 care。' },
          { en: 'She did try to explain herself.', cn: '她确实努力解释过自己。', note: 'did 后 try 用原形。' },
        ],
      },
    ],
    pitfalls: [
      'did 后不要再用过去式：did tried 是错的。',
      'be 动词不能用 do 强调，通常直接加强语气或重读 be。',
      'do 强调用于肯定句，不是普通否定或疑问助动词用法。',
    ],
  },
  'ellipsis-types': {
    title: '省略',
    subtitle: '省略是在语境清楚时删去重复或可推知的成分。',
    overview: '省略不是随便少写。它要求被省略的内容能从前文、结构或语境中明确恢复。常见于并列结构、状语从句、比较结构和回答中。',
    steps: [
      '先找被省略内容能否从前文恢复。',
      '判断省略发生在并列、从句、比较还是简短回答中。',
      '检查省略后句子是否仍然清楚，不造成歧义。',
    ],
    patterns: [
      {
        label: '并列省略',
        formula: 'A does X, and B does Y → A does X, and B Y',
        explanation: '并列结构中可省略重复谓语或助动词。',
        examples: [
          { en: 'She likes reading, and I writing.', cn: '她喜欢阅读，而我喜欢写作。', note: 'I 后省略 like。正式写作中要谨慎。' },
        ],
      },
      {
        label: '状语从句省略',
        formula: 'when/while/if/though + doing/done/adj.',
        explanation: '当从句主语和主句主语一致，且从句含 be，可省略主语和 be。',
        examples: [
          { en: 'When misunderstood, he often keeps silent.', cn: '被误解时，他常常保持沉默。', note: '= When he is misunderstood。' },
        ],
      },
    ],
    pitfalls: [
      '省略必须能恢复，不能让读者猜。',
      '状语从句省略要求主从句主语一致。',
      '考试写作中复杂省略要少而准。',
    ],
  },
  'statement-conversion': {
    title: '陈述句转换',
    subtitle: '直接引语转间接引语时，人称、时态、时间地点词常要随说话视角变化。',
    overview: '直接引语保留原话，间接引语转述内容。转换时要从“现在说话现场”转到“转述者视角”，因此人称、时态、指示词和时间地点词都可能变化。',
    steps: [
      '确定说话者、听话者和转述者，调整人称。',
      '主句谓语为过去时，从句时态常后移。',
      '调整 this/that, now/then, today/that day, here/there 等指示词。',
    ],
    patterns: [
      {
        label: '陈述句转述',
        formula: 'sb said, "..." → sb said that ...',
        explanation: 'that 可引导间接陈述句，口语中可省。',
        examples: [
          { en: 'He said, "I feel invisible."', cn: '他说：“我觉得没人看见我。”', note: '直接引语。' },
          { en: 'He said that he felt invisible.', cn: '他说他觉得没人看见他。', note: 'I 变 he，feel 变 felt。' },
        ],
      },
    ],
    pitfalls: [
      '不要只改引号，必须检查人称和时间视角。',
      '客观真理可不后移。',
      '间接引语通常不用引号。',
    ],
  },
  'question-conversion': {
    title: '疑问句转换',
    subtitle: '直接疑问转间接疑问时，从句必须改为陈述语序。',
    overview: '疑问句转换最容易错在语序。间接疑问句虽然含疑问意义，但语法上是从句，要用陈述语序，并且句末标点取决于主句。',
    steps: [
      '一般疑问句用 if/whether 引导。',
      '特殊疑问句保留原疑问词。',
      '从句改陈述语序：主语在谓语前。',
    ],
    patterns: [
      {
        label: '一般疑问转 if/whether',
        formula: 'asked, "Do you...?" → asked if/whether 主语 did...',
        explanation: 'yes/no 问题转述时用 if 或 whether。',
        examples: [
          { en: 'She asked, "Do you need help?"', cn: '她问：“你需要帮助吗？”', note: '直接疑问。' },
          { en: 'She asked if I needed help.', cn: '她问我是否需要帮助。', note: 'I needed 是陈述语序。' },
        ],
      },
      {
        label: '特殊疑问保留疑问词',
        formula: 'asked, "Why did he leave?" → asked why he had left',
        explanation: 'why 保留，但 did he leave 改成 he had left。',
        examples: [
          { en: 'I wondered why he had left so quietly.', cn: '我想知道他为什么那么安静地离开。', note: 'why 后是陈述语序。' },
        ],
      },
    ],
    pitfalls: [
      '间接疑问不要倒装：why he left，不是 why did he leave。',
      '主句是陈述句时句末用句号，不用问号。',
      'whether 更适合和 or not 搭配。',
    ],
  },
  'imperative-conversion': {
    title: '祈使句转换',
    subtitle: '祈使句转间接引语常用 tell/ask/order/warn sb (not) to do。',
    overview: '祈使句本质是让对方做或不要做某事。转述时不能继续用原来的祈使语序，而要变成“动词 + 宾语 + 不定式”。',
    steps: [
      '判断语气是请求、命令、建议还是警告。',
      '选择 ask/tell/order/warn/advise 等转述动词。',
      '肯定用 to do，否定用 not to do。',
    ],
    patterns: [
      {
        label: '肯定祈使转换',
        formula: 'Please do... → asked sb to do...',
        explanation: '请求语气通常用 ask。',
        examples: [
          { en: 'She said, "Please listen to him."', cn: '她说：“请听他说。”', note: '直接祈使。' },
          { en: 'She asked us to listen to him.', cn: '她请求我们听他说。', note: 'asked us to listen。' },
        ],
      },
      {
        label: '否定祈使转换',
        formula: 'Don\'t do... → told/warned sb not to do...',
        explanation: 'not 放在 to do 前。',
        examples: [
          { en: 'The teacher told us not to laugh at mistakes.', cn: '老师告诉我们不要嘲笑错误。', note: 'not to laugh。' },
        ],
      },
    ],
    pitfalls: [
      '不要写 told us don\'t laugh。',
      'ask/tell 后必须有对象：asked me to..., told him to...。',
      'suggest 后通常不用 sb to do，可用 suggest doing 或 suggest that sb do。',
    ],
  },
  'subject-verb': {
    title: '主谓一致',
    subtitle: '谓语动词在人称和数上要和真正主语一致。',
    overview: '主谓一致的难点不是最靠近动词的名词，而是真正主语。介词短语、插入语、定语从句可能隔在主语和谓语之间，不能影响谓语单复数。',
    steps: [
      '先找真正主语，不被介词短语和插入语干扰。',
      '判断主语是单数、复数、集合名词、不可数还是由 and/or 连接。',
      '处理特殊规则：就近原则、意义一致、each/every 等。',
    ],
    patterns: [
      {
        label: '介词短语不决定谓语',
        formula: '主语 + prep phrase + 谓语',
        explanation: 'of/with/in 等介词短语里的名词不是主语核心。',
        examples: [
          { en: 'The box of letters is on the desk.', cn: '那盒信在桌上。', note: '主语核心是 box，谓语用 is。' },
        ],
      },
      {
        label: '就近原则',
        formula: 'either...or / neither...nor / not only...but also',
        explanation: '谓语常和最近的主语保持一致。',
        examples: [
          { en: 'Neither the students nor the teacher is ready to leave.', cn: '学生们和老师都还没准备离开。', note: '最近主语 teacher 单数，用 is。' },
        ],
      },
    ],
    pitfalls: [
      'There be 句型谓语看后面最近名词。',
      'each/every + 单数名词作主语，谓语用单数。',
      'A number of 用复数，the number of 用单数。',
    ],
  },
  'pronoun-reference': {
    title: '代词指代',
    subtitle: '代词必须清楚、准确地指向前文对象。',
    overview: '代词指代错误会让读者不知道 he/she/it/they/this 到底指谁。好的代词指代要做到对象明确、单复数一致、性别或身份合适。',
    steps: [
      '圈出代词，回找它指代的名词。',
      '检查单复数、人称、性别和语义是否一致。',
      '如果可能指向多个对象，就改回名词或重写句子。',
    ],
    patterns: [
      {
        label: '明确指代',
        formula: '名词先出现，代词再接替',
        explanation: '代词最好靠近被指代对象，减少歧义。',
        examples: [
          { en: 'Mia gave Anna her notebook after class.', cn: '课后 Mia 把她的笔记本给了 Anna。', note: 'her 可能指 Mia 或 Anna，存在歧义。' },
          { en: 'After class, Mia gave Anna Mia\'s notebook.', cn: '课后，Mia 把 Mia 的笔记本给了 Anna。', note: '改回名词可消除歧义。' },
        ],
      },
      {
        label: 'this/that 指代整件事',
        formula: 'This/That + noun 可减少模糊',
        explanation: 'this 单独指代整件事时，有时可加名词说明。',
        examples: [
          { en: 'He finally spoke. This moment changed the class.', cn: '他终于开口了。这个时刻改变了全班。', note: 'This moment 比 This 更清楚。' },
        ],
      },
    ],
    pitfalls: [
      '一个代词前面有两个同类名词时容易歧义。',
      'they 不能指代单数物体，除非是性别未知的人称用法。',
      'this/that 单独开头时，正式写作常加名词：this idea, this choice。',
    ],
  },
};
