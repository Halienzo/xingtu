/**
 * Batch 10: 继续修复多词性词词性覆盖（第六批剩余高频多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[], int:[]}
 */

const highQualityExamples = {

  // ===== ahead (adv) =====
  'ahead': {
    adv: [
      { en: 'Go straight ahead and you will see the train station.', cn: '一直往前走，你就会看到火车站。' },
      { en: 'We finished the project two days ahead of schedule.', cn: '我们提前两天完成了项目。' }
    ]
  },

  // ===== attend (verb/noun) =====
  'attend': {
    verb: [
      { en: 'All students must attend the morning assembly on time.', cn: '所有学生必须准时参加晨会。' },
      { en: 'The nurse attends to the needs of elderly patients.', cn: '护士照料老年病人的需求。' }
    ]
  },

  // ===== anybody (pron/noun) =====
  'anybody': {
    pron: [
      { en: 'Is there anybody who can help me with this box?', cn: '有人能帮我搬这个箱子吗？' },
      { en: 'Anybody can learn to swim with enough practice.', cn: '只要有足够的练习，任何人都能学会游泳。' }
    ]
  },

  // ===== choice (noun/verb) =====
  'choice': {
    noun: [
      { en: 'You have the choice to stay or leave.', cn: '你可以选择留下或离开。' },
      { en: 'The blue dress was her first choice for the party.', cn: '蓝色裙子是她参加聚会的首选。' }
    ]
  },

  // ===== create (verb) =====
  'create': {
    verb: [
      { en: 'The artist used clay to create a beautiful sculpture.', cn: '艺术家用黏土创作了一座美丽的雕塑。' },
      { en: 'We need to create a plan before starting the project.', cn: '在开始项目之前，我们需要制定一个计划。' }
    ]
  },

  // ===== daily (adj/noun) =====
  'daily': {
    adj: [
      { en: 'Daily exercise is good for your health.', cn: '每天锻炼对你的健康有益。' },
      { en: 'She wrote in her daily journal every night before bed.', cn: '她每晚睡前都在日记里写东西。' }
    ],
    noun: [
      { en: 'The local daily reported the news on the front page.', cn: '当地日报在头版报道了这则新闻。' }
    ]
  },

  // ===== deal (noun/verb) =====
  'deal': {
    noun: [
      { en: 'We got a great deal on tickets for the concert.', cn: '我们买音乐会门票时得到了很划算的价格。' },
      { en: 'The two companies made a deal to work together.', cn: '两家公司达成了合作协议。' }
    ],
    verb: [
      { en: 'The teacher will deal with the problem after class.', cn: '老师会在课后处理这个问题。' },
      { en: 'It is my turn to deal the cards.', cn: '轮到我发牌了。' }
    ]
  },

  // ===== decide (verb) =====
  'decide': {
    verb: [
      { en: 'I need to decide what to wear for the interview.', cn: '我需要决定面试时穿什么。' },
      { en: 'The judges will decide the winner tomorrow.', cn: '评委们将于明天决定获胜者。' }
    ]
  },

  // ===== diet (noun/verb) =====
  'diet': {
    noun: [
      { en: 'A balanced diet is important for growing children.', cn: '均衡的饮食对成长中的孩子很重要。' },
      { en: 'The doctor recommended a low-salt diet for Grandpa.', cn: '医生建议爷爷采用低盐饮食。' }
    ],
    verb: [
      { en: 'She decided to diet before the summer holiday.', cn: '她决定在暑假前节食。' }
    ]
  },

  // ===== dream (noun/verb) =====
  'dream': {
    noun: [
      { en: 'My dream is to become a doctor and help sick people.', cn: '我的梦想是成为一名医生，帮助病人。' },
      { en: 'I had a strange dream about flying last night.', cn: '昨晚我做了一个关于飞翔的奇怪的梦。' }
    ],
    verb: [
      { en: 'The little girl dreams of visiting Paris one day.', cn: '小女孩梦想着有一天能去巴黎。' },
      { en: 'I never dreamed that I would win the competition.', cn: '我从未想过我会赢得比赛。' }
    ]
  },

  // ===== else (adj/adv) =====
  'else': {
    adj: [
      { en: 'Does anyone else want to join our team?', cn: '还有其他人想加入我们的队伍吗？' }
    ],
    adv: [
      { en: 'What else do you need from the supermarket?', cn: '你还需要从超市买什么别的吗？' }
    ]
  },

  // ===== exactly (adv) =====
  'exactly': {
    adv: [
      { en: 'That is exactly what I was thinking.', cn: '那正是我所想的。' },
      { en: 'The train arrived at exactly three o\'clock.', cn: '火车正好三点到达。' }
    ]
  },

  // ===== famous (adj/noun) =====
  'famous': {
    adj: [
      { en: 'The famous writer gave a speech at our school.', cn: '那位著名作家在我们学校发表了演讲。' },
      { en: 'This restaurant is famous for its spicy noodles.', cn: '这家餐厅以其麻辣面条而闻名。' }
    ]
  },

  // ===== form (noun/verb) =====
  'form': {
    noun: [
      { en: 'Please fill out this form with your personal information.', cn: '请填写这份表格，写上你的个人信息。' },
      { en: 'Ice will form on the lake when the temperature drops.', cn: '温度下降时，湖面上会结冰。' }
    ],
    verb: [
      { en: 'The children formed a circle around the teacher.', cn: '孩子们围着老师站成一个圈。' },
      { en: 'Clouds began to form in the clear sky.', cn: '晴朗的天空中开始形成云朵。' }
    ]
  },

  // ===== honest (adj/noun) =====
  'honest': {
    adj: [
      { en: 'It is important to be honest with your friends.', cn: '对朋友诚实很重要。' },
      { en: 'She gave an honest opinion about the movie.', cn: '她对这部电影给出了诚实的看法。' }
    ]
  },

  // ===== hope (noun/verb) =====
  'hope': {
    noun: [
      { en: 'There is still hope that we can finish on time.', cn: '我们仍然有望按时完成。' },
      { en: 'She held onto hope during the difficult times.', cn: '她在困难时期坚持着希望。' }
    ],
    verb: [
      { en: 'I hope you have a wonderful holiday.', cn: '我希望你有一个愉快的假期。' },
      { en: 'We hope to visit the museum next weekend.', cn: '我们希望下周末参观博物馆。' }
    ]
  },

  // ===== international (adj/noun) =====
  'international': {
    adj: [
      { en: 'English is an international language spoken around the world.', cn: '英语是一门在世界各地使用的国际语言。' },
      { en: 'The airport handles many international flights every day.', cn: '这座机场每天处理许多国际航班。' }
    ]
  },

  // ===== local (adj/noun) =====
  'local': {
    adj: [
      { en: 'We bought fresh vegetables from the local farmers.', cn: '我们从当地农民那里购买了新鲜蔬菜。' },
      { en: 'The local news reported the traffic accident.', cn: '当地新闻报道了这起交通事故。' }
    ],
    noun: [
      { en: 'The locals are very friendly to visitors.', cn: '当地人对游客非常友好。' }
    ]
  },

  // ===== medical (adj/noun) =====
  'medical': {
    adj: [
      { en: 'The patient received excellent medical care at the hospital.', cn: '病人在这家医院得到了 excellent 的医疗护理。' },
      { en: 'She is studying medical science at university.', cn: '她在大学学习医学科学。' }
    ]
  },

  // ===== modal (noun/adj) =====
  'modal': {
    noun: [
      { en: 'Can and may are examples of modal verbs in English.', cn: 'Can 和 may 是英语中情态动词的例子。' }
    ]
  },

  // ===== most (adv/adj/pron) =====
  'most': {
    adj: [
      { en: 'Most students passed the final exam.', cn: '大多数学生通过了期末考试。' }
    ],
    adv: [
      { en: 'This is the most interesting book I have ever read.', cn: '这是我读过的最有趣的书。' }
    ],
    pron: [
      { en: 'Most of the cake was eaten at the party.', cn: '蛋糕的大部分在聚会上被吃掉了。' }
    ]
  },

  // ===== nature (noun/adj) =====
  'nature': {
    noun: [
      { en: 'We should protect nature for future generations.', cn: '我们应该为后代保护自然。' },
      { en: 'The nature of the problem is quite complex.', cn: '这个问题的本质相当复杂。' }
    ]
  },

  // ===== next (adj/noun) =====
  'next': {
    adj: [
      { en: 'The next bus will arrive in ten minutes.', cn: '下一班公交车将在十分钟后到达。' },
      { en: 'Please turn to the next page of the textbook.', cn: '请翻到课本的下一页。' }
    ],
    noun: [
      { en: 'The tall man was standing next to me in line.', cn: '那个高个子男人排队时站在我旁边。' }
    ]
  },

  // ===== normal (adj/noun) =====
  'normal': {
    adj: [
      { en: 'It is normal to feel nervous before an exam.', cn: '考试前感到紧张是正常的。' },
      { en: 'Life returned to normal after the storm passed.', cn: '暴风雨过后，生活恢复了正常。' }
    ],
    noun: [
      { en: 'His temperature is above normal.', cn: '他的体温高于正常水平。' }
    ]
  },

  // ===== pay (verb/noun) =====
  'pay': {
    verb: [
      { en: 'I need to pay the electricity bill by Friday.', cn: '我需要在周五前支付电费。' },
      { en: 'Hard work will pay off in the end.', cn: '努力工作最终会得到回报。' }
    ],
    noun: [
      { en: 'The job offers good pay and excellent benefits.', cn: '这份工作薪酬优厚，福利也很好。' }
    ]
  },

  // ===== perform (verb/noun) =====
  'perform': {
    verb: [
      { en: 'The band will perform at the school festival next week.', cn: '乐队将于下周在学校节上演出。' },
      { en: 'The new machine performs better than the old one.', cn: '这台新机器比旧机器性能更好。' }
    ]
  },

  // ===== pin (noun/verb) =====
  'pin': {
    noun: [
      { en: 'She wore a gold pin on her jacket.', cn: '她在夹克上别了一枚金色胸针。' }
    ],
    verb: [
      { en: 'Please pin the notice on the bulletin board.', cn: '请把通知钉在布告栏上。' }
    ]
  },

  // ===== pleasure (noun) =====
  'pleasure': {
    noun: [
      { en: 'It is my pleasure to help you with your luggage.', cn: '很高兴帮您提行李。' },
      { en: 'She read books for pleasure during the holiday.', cn: '假期她读书消遣。' }
    ]
  },

  // ===== public (adj/noun) =====
  'public': {
    adj: [
      { en: 'Smoking is not allowed in public places.', cn: '公共场所不允许吸烟。' },
      { en: 'The government provides free public education.', cn: '政府提供免费公共教育。' }
    ],
    noun: [
      { en: 'The museum is open to the public every day.', cn: '博物馆每天对公众开放。' }
    ]
  },

  // ===== second (num/noun) =====
  'second': {
    num: [
      { en: 'February is the second month of the year.', cn: '二月是一年中的第二个月。' }
    ],
    noun: [
      { en: 'Wait a second; I need to tie my shoelaces.', cn: '等一下，我需要系鞋带。' },
      { en: 'The runner finished the race in under ten seconds.', cn: '跑步选手在十秒内完成了比赛。' }
    ]
  },

  // ===== somewhere (adv/pron) =====
  'somewhere': {
    adv: [
      { en: 'I left my keys somewhere in the house.', cn: '我把钥匙落在屋里的某个地方了。' },
      { en: 'Let us go somewhere fun this weekend.', cn: '这个周末我们去某个好玩的地方吧。' }
    ]
  },

  // ===== such (adj/pron) =====
  'such': {
    adj: [
      { en: 'It was such a beautiful day that we went to the park.', cn: '天气如此美好，所以我们去了公园。' }
    ],
    pron: [
      { en: 'Such is life; we must accept both good and bad times.', cn: '人生就是这样；我们必须接受顺境和逆境。' }
    ]
  },

  // ===== task (noun) =====
  'task': {
    noun: [
      { en: 'Cleaning the classroom is the task of the day.', cn: '打扫教室是今天的任务。' },
      { en: 'The difficult task took us three hours to complete.', cn: '这项困难的任务花了我们三个小时完成。' }
    ]
  },

  // ===== text (noun/verb) =====
  'text': {
    noun: [
      { en: 'Please read the text carefully before answering the questions.', cn: '回答问题前请仔细阅读课文。' },
      { en: 'I sent her a text to let her know I was running late.', cn: '我给她发了一条短信，告诉她我要迟到了。' }
    ],
    verb: [
      { en: 'I will text you the address when I get home.', cn: '我到家后会把地址发短信给你。' }
    ]
  },

  // ===== treat (verb/noun) =====
  'treat': {
    verb: [
      { en: 'The doctor will treat your illness with special medicine.', cn: '医生会用特殊药物治疗你的疾病。' },
      { en: 'Please treat everyone with kindness and respect.', cn: '请用善良和尊重对待每一个人。' }
    ],
    noun: [
      { en: 'Ice cream is a special treat for the children.', cn: '冰淇淋是孩子们特别的美食款待。' }
    ]
  },

  // ===== unhealthy (adj) =====
  'unhealthy': {
    adj: [
      { en: 'Eating too much junk food is unhealthy.', cn: '吃太多垃圾食品是不健康的。' },
      { en: 'The unhealthy air in the city worried the doctors.', cn: '城市里不健康的空气让医生们担忧。' }
    ]
  },

  // ===== volleyball (noun) =====
  'volleyball': {
    noun: [
      { en: 'We play volleyball on the beach every summer.', cn: '我们每年夏天都在沙滩上打排球。' }
    ]
  },

  // ===== yet (adv/conj) =====
  'yet': {
    adv: [
      { en: 'I have not finished my homework yet.', cn: '我还没做完作业。' },
      { en: 'The best is yet to come.', cn: '最好的还没有到来。' }
    ],
    conj: [
      { en: 'It was raining, yet we still went for a walk.', cn: '天在下雨，但我们仍然去散步了。' }
    ]
  }

};

module.exports = { highQualityExamples };
