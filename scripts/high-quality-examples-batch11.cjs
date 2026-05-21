/**
 * Batch 11: 继续修复多词性词词性覆盖（第七批剩余高频多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[], int:[]}
 */

const highQualityExamples = {

  // ===== across (prep/adv) =====
  'across': {
    prep: [
      { en: 'The old bridge stretches across the wide river.', cn: '老桥横跨在宽阔的河面上。' },
      { en: 'She walked across the street to buy some milk.', cn: '她穿过街道去买牛奶。' }
    ],
    adv: [
      { en: 'The river is about twenty meters across at this point.', cn: '这条河在此处大约二十米宽。' }
    ]
  },

  // ===== another (adj/pron) =====
  'another': {
    adj: [
      { en: 'Would you like another cup of tea?', cn: '你想再来一杯茶吗？' },
      { en: 'That is another reason why I love this city.', cn: '那是我喜爱这座城市的另一个原因。' }
    ],
    pron: [
      { en: 'One person left, and another took his place.', cn: '一个人离开了，另一个人接替了他的位置。' }
    ]
  },

  // ===== awful (adj/adv) =====
  'awful': {
    adj: [
      { en: 'The weather was awful during our beach holiday.', cn: '我们海滩度假期间天气糟透了。' },
      { en: 'There was an awful smell coming from the kitchen.', cn: '厨房里传来一股可怕的气味。' }
    ],
    adv: [
      { en: 'I feel awful tired after the long journey.', cn: '长途旅行后我感到非常疲倦。' }
    ]
  },

  // ===== behave (verb/noun) =====
  'behave': {
    verb: [
      { en: 'Please behave yourself during the school assembly.', cn: '请在学校的集会上守规矩。' },
      { en: 'The dog behaves well when visitors come to the house.', cn: '有客人来家里时，这只狗表现很好。' }
    ]
  },

  // ===== besides (prep/adv) =====
  'besides': {
    prep: [
      { en: 'Besides English, she can also speak French and German.', cn: '除了英语，她还会说法语和德语。' }
    ],
    adv: [
      { en: 'I do not want to go out; besides, it is raining.', cn: '我不想出去；而且，天在下雨。' }
    ]
  },

  // ===== boil (verb/noun) =====
  'boil': {
    verb: [
      { en: 'Please boil the water before making the tea.', cn: '泡茶前请把水烧开。' },
      { en: 'The soup began to boil on the stove.', cn: '汤开始在炉子上沸腾。' }
    ],
    noun: [
      { en: 'Bring the water to a boil before adding the pasta.', cn: '把水煮沸后再加入意大利面。' }
    ]
  },

  // ===== both (adj/pron) =====
  'both': {
    adj: [
      { en: 'Both children went to bed early last night.', cn: '两个孩子昨晚都很早就上床睡觉了。' }
    ],
    pron: [
      { en: 'Both of them agreed that the movie was excellent.', cn: '他们两人都认为这部电影非常棒。' }
    ]
  },

  // ===== break (noun/verb) =====
  'break': {
    verb: [
      { en: 'Be careful not to break the glass vase.', cn: '小心别打碎玻璃花瓶。' },
      { en: 'The bad news broke her heart.', cn: '这个坏消息让她心碎。' }
    ],
    noun: [
      { en: 'We took a short break after two hours of study.', cn: '学习了两个小时后，我们休息了一会儿。' },
      { en: 'There was a break in the pipe, and water flooded the kitchen.', cn: '管道破裂了，水淹了厨房。' }
    ]
  },

  // ===== coast (noun/adj) =====
  'coast': {
    noun: [
      { en: 'We drove along the beautiful coast at sunset.', cn: '日落时分，我们沿着美丽的海岸开车。' },
      { en: 'Many ships sail along the coast during the summer.', cn: '夏天许多船只沿海岸航行。' }
    ]
  },

  // ===== complete (adj/verb) =====
  'complete': {
    adj: [
      { en: 'The project was a complete success from start to finish.', cn: '这个项目从头到尾都取得了圆满成功。' },
      { en: 'Please write your complete address on the form.', cn: '请在表格上写上你的完整地址。' }
    ],
    verb: [
      { en: 'I need to complete my homework before dinner.', cn: '我需要在晚饭前完成作业。' },
      { en: 'The bridge was completed after five years of construction.', cn: '这座桥经过五年的建设后完工了。' }
    ]
  },

  // ===== correct (adj/verb) =====
  'correct': {
    adj: [
      { en: 'Your answer is correct; well done!', cn: '你的答案是正确的，做得好！' },
      { en: 'Please use the correct form of the verb in the sentence.', cn: '请在句子中使用动词的正确形式。' }
    ],
    verb: [
      { en: 'The teacher will correct our tests tomorrow.', cn: '老师明天会批改我们的试卷。' },
      { en: 'Please correct any mistakes you find in the report.', cn: '请改正你在报告中发现的任何错误。' }
    ]
  },

  // ===== count (verb/noun) =====
  'count': {
    verb: [
      { en: 'Can you count to one hundred in English?', cn: '你能用英语数到一百吗？' },
      { en: 'Every vote counts in a democratic election.', cn: '在民主选举中，每一票都很重要。' }
    ],
    noun: [
      { en: 'The body count after the earthquake was very high.', cn: '地震后的死亡人数非常高。' }
    ]
  },

  // ===== culture (noun/adj) =====
  'culture': {
    noun: [
      { en: 'Chinese culture has a history of thousands of years.', cn: '中国文化有数千年的历史。' },
      { en: 'We studied the culture of ancient Egypt in history class.', cn: '我们在历史课上研究了古埃及文化。' }
    ]
  },

  // ===== doubt (noun/verb) =====
  'doubt': {
    noun: [
      { en: 'There is no doubt that she will win the competition.', cn: '毫无疑问，她会赢得比赛。' }
    ],
    verb: [
      { en: 'I doubt that he will come to the party on time.', cn: '我怀疑他是否能准时来参加聚会。' }
    ]
  },

  // ===== enter (verb/noun) =====
  'enter': {
    verb: [
      { en: 'Please do not enter the room without knocking.', cn: '请不要不敲门就进入房间。' },
      { en: 'She decided to enter the singing competition.', cn: '她决定参加歌唱比赛。' }
    ]
  },

  // ===== fair (adj/noun) =====
  'fair': {
    adj: [
      { en: 'The teacher gave fair grades to all the students.', cn: '老师给所有学生打了公平的分数。' },
      { en: 'It is not fair to blame her for everything.', cn: '把所有事情都怪在她身上是不公平的。' }
    ],
    noun: [
      { en: 'We had fun at the summer fair last weekend.', cn: '上周末我们在夏季集市上玩得很开心。' }
    ]
  },

  // ===== fault (noun/verb) =====
  'fault': {
    noun: [
      { en: 'It is my fault that we missed the bus.', cn: '我们错过公交车是我的错。' },
      { en: 'The earthquake was caused by a fault in the earth\'s crust.', cn: '地震是由地壳断层引起的。' }
    ],
    verb: [
      { en: 'I cannot fault her for trying her best.', cn: '我无法指责她尽了最大努力。' }
    ]
  },

  // ===== fit (adj/verb) =====
  'fit': {
    adj: [
      { en: 'Regular exercise keeps you fit and healthy.', cn: '规律的运动让你保持健康和健壮。' },
      { en: 'The dress is a perfect fit for the wedding.', cn: '这条裙子非常适合婚礼穿。' }
    ],
    verb: [
      { en: 'The big sofa will not fit through the narrow door.', cn: '大沙发无法通过那扇窄门。' },
      { en: 'Please fit the new battery into the remote control.', cn: '请把新电池装入遥控器。' }
    ]
  },

  // ===== free (adj/adv/verb) =====
  'free': {
    adj: [
      { en: 'Admission to the museum is free on Sundays.', cn: '博物馆周日免费入场。' },
      { en: 'The prisoner was finally set free after twenty years.', cn: '这名囚犯二十年后终于获释。' }
    ],
    verb: [
      { en: 'We must free the birds from their cages.', cn: '我们必须把鸟儿从笼子里放出来。' }
    ]
  },

  // ===== guard (noun/verb) =====
  'guard': {
    noun: [
      { en: 'The security guard checked our bags at the entrance.', cn: '保安在入口处检查了我们的包。' },
      { en: 'The soldier stood guard at the gate all night.', cn: '士兵整夜在门口站岗。' }
    ],
    verb: [
      { en: 'The dog guards the house when the family is away.', cn: '家人外出时，狗看守房子。' }
    ]
  },

  // ===== hate (verb/noun) =====
  'hate': {
    verb: [
      { en: 'I hate waking up early on cold winter mornings.', cn: '我讨厌在寒冷的冬天早晨早起。' },
      { en: 'She hates it when people are late for meetings.', cn: '她讨厌人们开会迟到。' }
    ],
    noun: [
      { en: 'His eyes were full of hate as he spoke.', cn: '他说话时眼中充满了仇恨。' }
    ]
  },

  // ===== influence (noun/verb) =====
  'influence': {
    noun: [
      { en: 'My parents had a big influence on my career choice.', cn: '我的父母对我的职业选择影响很大。' },
      { en: 'The movie had a strong influence on popular culture.', cn: '这部电影对流行文化产生了强烈影响。' }
    ],
    verb: [
      { en: 'The weather can influence people\'s moods.', cn: '天气会影响人们的情绪。' },
      { en: 'Her speech influenced many young people to volunteer.', cn: '她的演讲影响了許多年轻人去做志愿者。' }
    ]
  },

  // ===== interview (noun/verb) =====
  'interview': {
    noun: [
      { en: 'I have a job interview at nine o\'clock tomorrow morning.', cn: '我明天早上九点有一个工作面试。' }
    ],
    verb: [
      { en: 'The police interviewed several witnesses at the scene.', cn: '警方在现场询问了几名证人。' }
    ]
  },

  // ===== invent (verb) =====
  'invent': {
    verb: [
      { en: 'Alexander Graham Bell invented the telephone in eighteen seventy-six.', cn: '亚历山大·格雷厄姆·贝尔于1876年发明了电话。' },
      { en: 'Children love to invent stories about magical creatures.', cn: '孩子们喜欢编造关于魔法生物的故事。' }
    ]
  },

  // ===== magic (noun/adj) =====
  'magic': {
    noun: [
      { en: 'The children believed that the old tree had magic powers.', cn: '孩子们相信这棵老树有魔力。' },
      { en: 'The magician performed amazing magic tricks on stage.', cn: '魔术师在舞台上表演了惊人的魔术。' }
    ],
    adj: [
      { en: 'The evening had a magic quality that we will never forget.', cn: '那个夜晚有一种我们永远不会忘记的魔力。' }
    ]
  },

  // ===== mail (noun/verb) =====
  'mail': {
    noun: [
      { en: 'I check my mail every morning before work.', cn: '我每天上班前查看邮件。' }
    ],
    verb: [
      { en: 'Please mail this package to my grandmother.', cn: '请把这个包裹寄给我奶奶。' }
    ]
  },

  // ===== manage (verb/noun) =====
  'manage': {
    verb: [
      { en: 'She manages a small team of ten people at the office.', cn: '她在办公室管理着一个十人小团队。' },
      { en: 'We managed to finish the project before the deadline.', cn: '我们设法在截止日期前完成了项目。' }
    ]
  },

  // ===== master (noun/verb) =====
  'master': {
    noun: [
      { en: 'The old master taught his students the art of painting.', cn: '老师傅把他的学生教授绘画艺术。' },
      { en: 'He received a master\'s degree from the university.', cn: '他从大学获得了硕士学位。' }
    ],
    verb: [
      { en: 'It takes years to master a musical instrument.', cn: '掌握一种乐器需要多年时间。' }
    ]
  },

  // ===== mind (noun/verb) =====
  'mind': {
    noun: [
      { en: 'Keep an open mind when you listen to different opinions.', cn: '听取不同意见时保持开放的心态。' },
      { en: 'The beautiful scenery blew my mind.', cn: '美丽的风景让我惊叹不已。' }
    ],
    verb: [
      { en: 'Do you mind if I open the window?', cn: '你介意我打开窗户吗？' },
      { en: 'Please mind your step on the wet floor.', cn: '请在潮湿的地板上小心走路。' }
    ]
  },

  // ===== nearby (adj/adv) =====
  'nearby': {
    adj: [
      { en: 'We found a nearby restaurant for lunch.', cn: '我们找了一家附近的餐厅吃午饭。' }
    ],
    adv: [
      { en: 'The old man lives nearby, so he walks to work.', cn: '老人住在附近，所以他走路去上班。' }
    ]
  },

  // ===== need (noun/verb) =====
  'need': {
    noun: [
      { en: 'There is a great need for clean water in the village.', cn: '这个村庄非常需要干净的水。' }
    ],
    verb: [
      { en: 'I need to buy some new shoes for school.', cn: '我需要买一双新鞋上学穿。' },
      { en: 'Plants need sunlight and water to grow.', cn: '植物需要阳光和水才能生长。' }
    ]
  },

  // ===== own (adj/pron/verb) =====
  'own': {
    adj: [
      { en: 'I want to have my own room when I grow up.', cn: '我长大后想有自己的房间。' }
    ],
    pron: [
      { en: 'The house is my own; I bought it last year.', cn: '这房子是我自己的；我去年买的。' }
    ],
    verb: [
      { en: 'My family owns a small farm in the countryside.', cn: '我家在乡下有一个小农场。' }
    ]
  },

  // ===== patient (noun/adj) =====
  'patient': {
    noun: [
      { en: 'The doctor saw ten patients before lunch.', cn: '医生在午饭前看了十个病人。' }
    ],
    adj: [
      { en: 'You need to be patient when teaching young children.', cn: '教小孩子时你需要有耐心。' }
    ]
  },

  // ===== prepare (verb/noun) =====
  'prepare': {
    verb: [
      { en: 'Mom is preparing dinner in the kitchen.', cn: '妈妈正在厨房准备晚餐。' },
      { en: 'We need to prepare for the exam next week.', cn: '我们需要为下周的考试做准备。' }
    ]
  },

  // ===== process (noun/verb) =====
  'process': {
    noun: [
      { en: 'Learning a language is a slow process.', cn: '学习语言是一个缓慢的过程。' },
      { en: 'The factory uses a special process to make the paper.', cn: '工厂使用特殊的工艺来造纸。' }
    ],
    verb: [
      { en: 'It takes time to process all the application forms.', cn: '处理所有申请表需要时间。' }
    ]
  },

  // ===== regret (noun/verb) =====
  'regret': {
    noun: [
      { en: 'My biggest regret is not studying harder at school.', cn: '我最大的遗憾是在学校时没有更努力学习。' }
    ],
    verb: [
      { en: 'I regret telling everyone about her secret.', cn: '我后悔把她的秘密告诉了所有人。' },
      { en: 'You will regret missing this opportunity.', cn: '你会后悔错过这个机会的。' }
    ]
  },

  // ===== remain (verb/noun) =====
  'remain': {
    verb: [
      { en: 'Please remain seated until the plane stops.', cn: '请保持就座，直到飞机停稳。' },
      { en: 'Only a few old houses remain in the village.', cn: '村里只剩下几座老房子了。' }
    ]
  },

  // ===== review (noun/verb) =====
  'review': {
    noun: [
      { en: 'The film received excellent reviews from critics.', cn: '这部电影获得了评论家极好的评价。' }
    ],
    verb: [
      { en: 'Please review your answers before handing in the test.', cn: '交卷前请检查你的答案。' }
    ]
  },

  // ===== rush (verb/noun) =====
  'rush': {
    verb: [
      { en: 'Do not rush; we have plenty of time.', cn: '别着急，我们有足够的时间。' },
      { en: 'The students rushed out of the classroom when the bell rang.', cn: '铃响时，学生们冲出教室。' }
    ],
    noun: [
      { en: 'There was a rush for the best seats in the theater.', cn: '剧院里最好的座位一阵争抢。' },
      { en: 'The morning rush makes the subway very crowded.', cn: '早高峰让地铁非常拥挤。' }
    ]
  },

  // ===== since (prep/adv/conj) =====
  'since': {
    prep: [
      { en: 'I have not seen her since last summer.', cn: '自去年夏天以来我就没见过她。' }
    ],
    adv: [
      { en: 'He left home two years ago and has not returned since.', cn: '他两年前离家，此后一直没有回来。' }
    ],
    conj: [
      { en: 'Since you are here, you can help me with the dishes.', cn: '既然你在这里，你可以帮我洗碗。' }
    ]
  },

  // ===== sound (noun/verb) =====
  'sound': {
    noun: [
      { en: 'The sound of rain on the roof helped me fall asleep.', cn: '屋顶上的雨声帮助我入睡。' },
      { en: 'Please do not make so much sound during the concert.', cn: '音乐会期间请不要发出这么大的声音。' }
    ],
    verb: [
      { en: 'Your plan sounds like a good idea to me.', cn: '你的计划对我来说听起来是个好主意。' },
      { en: 'The alarm sounded when the fire broke out.', cn: '火灾爆发时警报响了。' }
    ]
  },

  // ===== spare (adj/verb) =====
  'spare': {
    adj: [
      { en: 'Do you have a spare pen I could borrow?', cn: '你有 spare 的笔可以借给我吗？' }
    ],
    verb: [
      { en: 'Can you spare five minutes to help me?', cn: '你能抽出五分钟帮我吗？' }
    ]
  },

  // ===== steal (verb/noun) =====
  'steal': {
    verb: [
      { en: 'It is wrong to steal anything from others.', cn: '偷别人的东西是不对的。' },
      { en: 'The thief tried to steal jewelry from the store.', cn: '小偷试图从商店偷珠宝。' }
    ]
  },

  // ===== store (noun/verb) =====
  'store': {
    noun: [
      { en: 'The grocery store near my house is open twenty-four hours.', cn: '我家附近的杂货店二十四小时营业。' }
    ],
    verb: [
      { en: 'Please store the medicine in a cool, dry place.', cn: '请将药物存放在阴凉干燥的地方。' }
    ]
  },

  // ===== sudden (adj/noun) =====
  'sudden': {
    adj: [
      { en: 'The sudden noise frightened the sleeping cat.', cn: '突然的响声吓到了正在睡觉的猫。' },
      { en: 'His sudden decision surprised everyone in the office.', cn: '他突然的决定让办公室里的每个人都感到惊讶。' }
    ],
    noun: [
      { en: 'All of a sudden, the lights went out in the building.', cn: '突然，大楼里的灯全灭了。' }
    ]
  },

  // ===== support (verb/noun) =====
  'support': {
    verb: [
      { en: 'My parents always support my decisions.', cn: '我的父母总是支持我的决定。' },
      { en: 'These pillars support the weight of the roof.', cn: '这些柱子支撑着屋顶的重量。' }
    ],
    noun: [
      { en: 'Thank you for your support during the difficult time.', cn: '感谢你在困难时期给予的支持。' }
    ]
  },

  // ===== surprise (noun/verb/adj) =====
  'surprise': {
    noun: [
      { en: 'The surprise party was a great success.', cn: '惊喜派对非常成功。' },
      { en: 'What a nice surprise to see you here!', cn: '在这里见到你真是个惊喜！' }
    ],
    verb: [
      { en: 'The loud thunder surprised everyone in the room.', cn: '巨大的雷声让房间里的每个人都吃了一惊。' }
    ]
  },

  // ===== while (noun/conj) =====
  'while': {
    conj: [
      { en: 'I like to listen to music while I do my homework.', cn: '我喜欢在做作业时听音乐。' },
      { en: 'While it was raining, we stayed inside and read books.', cn: '下雨的时候，我们待在屋里看书。' }
    ]
  }

};

module.exports = { highQualityExamples };
