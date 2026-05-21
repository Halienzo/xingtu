/**
 * Batch 12: 继续修复多词性词词性覆盖（第八批剩余高频多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[], int:[]}
 */

const highQualityExamples = {

  // ===== active (adj/verb) =====
  'active': {
    adj: [
      { en: 'The old man stays active by walking every morning.', cn: '这位老人每天早上散步来保持活力。' },
      { en: 'The volcano is still active and could erupt at any time.', cn: '这座火山仍然活跃，随时可能喷发。' }
    ]
  },

  // ===== advantage (noun/verb) =====
  'advantage': {
    noun: [
      { en: 'Knowing two languages gives you an advantage in job hunting.', cn: '懂两种语言让你在找工作时有优势。' },
      { en: 'The home team had the advantage of familiar surroundings.', cn: '主队有熟悉环境的优势。' }
    ]
  },

  // ===== afford (verb) =====
  'afford': {
    verb: [
      { en: 'We cannot afford to buy a new car this year.', cn: '今年我们买不起新车。' },
      { en: 'Can you afford to take a day off work?', cn: '你能抽得出一天不工作吗？' }
    ]
  },

  // ===== alone (adj/adv) =====
  'alone': {
    adj: [
      { en: 'The old house stood alone at the end of the road.', cn: '那座老房子独自矗立在路的尽头。' }
    ],
    adv: [
      { en: 'She lives alone but never feels lonely.', cn: '她独自生活，但从不感到孤独。' }
    ]
  },

  // ===== announce (verb) =====
  'announce': {
    verb: [
      { en: 'The school will announce the exam results tomorrow.', cn: '学校将于明天公布考试结果。' },
      { en: 'They announced their engagement at the family dinner.', cn: '他们在家庭晚餐上宣布了订婚消息。' }
    ]
  },

  // ===== around (prep/adv) =====
  'around': {
    prep: [
      { en: 'We walked around the lake enjoying the fresh air.', cn: '我们绕着湖散步，享受着清新的空气。' }
    ],
    adv: [
      { en: 'Is there a bank around here?', cn: '这附近有银行吗？' },
      { en: 'The children gathered around to hear the story.', cn: '孩子们围拢过来听故事。' }
    ]
  },

  // ===== blow (verb/noun) =====
  'blow': {
    verb: [
      { en: 'The wind began to blow harder as the storm approached.', cn: '暴风雨临近时，风开始刮得更大了。' },
      { en: 'Please blow out the candles on the birthday cake.', cn: '请吹灭生日蛋糕上的蜡烛。' }
    ],
    noun: [
      { en: 'The boxer suffered a heavy blow to his head.', cn: '拳击手头部受到了重击。' }
    ]
  },

  // ===== born (adj/verb) =====
  'born': {
    adj: [
      { en: 'She was born in a small village in the mountains.', cn: '她出生在山里的一个小村庄。' }
    ]
  },

  // ===== cancel (verb/noun) =====
  'cancel': {
    verb: [
      { en: 'We had to cancel the picnic because of the rain.', cn: '因为下雨，我们不得不取消野餐。' },
      { en: 'Please cancel my appointment for tomorrow afternoon.', cn: '请取消我明天下午的预约。' }
    ]
  },

  // ===== courage (noun) =====
  'courage': {
    noun: [
      { en: 'It takes courage to speak in front of so many people.', cn: '在这么多人面前讲话需要勇气。' },
      { en: 'The firefighter showed great courage in saving the child.', cn: '消防员在救孩子时表现出了巨大的勇气。' }
    ]
  },

  // ===== cruel (adj/noun) =====
  'cruel': {
    adj: [
      { en: 'It is cruel to leave a pet alone for too long.', cn: '把宠物单独留太久是残忍的。' },
      { en: 'The cruel winter killed many of the flowers in the garden.', cn: '严酷的冬天杀死了花园里许多花。' }
    ]
  },

  // ===== custom (noun/adj) =====
  'custom': {
    noun: [
      { en: 'It is a local custom to eat dumplings during the Spring Festival.', cn: '春节期间吃饺子是当地的风俗。' }
    ],
    adj: [
      { en: 'He had a custom suit made for the wedding.', cn: '他为婚礼定制了一套西装。' }
    ]
  },

  // ===== dark (adj/noun) =====
  'dark': {
    adj: [
      { en: 'The room was too dark to read without a lamp.', cn: '房间太暗了，没有灯无法看书。' },
      { en: 'She has beautiful dark hair and brown eyes.', cn: '她有着美丽的黑发和棕色的眼睛。' }
    ],
    noun: [
      { en: 'The street lights came on as the dark fell.', cn: '夜幕降临，街灯亮了起来。' }
    ]
  },

  // ===== date (noun/verb) =====
  'date': {
    noun: [
      { en: 'What is the date today?', cn: '今天是几号？' },
      { en: 'The expiry date on the milk carton is next Monday.', cn: '牛奶盒上的保质期是下周一。' }
    ],
    verb: [
      { en: 'The ancient coins date back to the Tang Dynasty.', cn: '这些古钱币可以追溯到唐朝。' }
    ]
  },

  // ===== enjoy (verb) =====
  'enjoy': {
    verb: [
      { en: 'I really enjoy reading books on rainy afternoons.', cn: '我非常喜欢在下雨的下午读书。' },
      { en: 'Did you enjoy the concert last night?', cn: '你喜欢昨晚的音乐会吗？' }
    ]
  },

  // ===== express (verb/noun/adj) =====
  'express': {
    verb: [
      { en: 'It is hard to express my feelings in words.', cn: '很难用言语表达我的感受。' },
      { en: 'She expressed her thanks to everyone who helped.', cn: '她向所有帮助过她的人表达了感谢。' }
    ],
    noun: [
      { en: 'I sent the package by express so it would arrive quickly.', cn: '我用快递寄了包裹，这样它能很快到达。' }
    ],
    adj: [
      { en: 'We took the express train to save time.', cn: '我们乘坐快车以节省时间。' }
    ]
  },

  // ===== fall (verb/noun) =====
  'fall': {
    verb: [
      { en: 'Be careful not to fall on the icy sidewalk.', cn: '小心别在结冰的人行道上摔倒。' },
      { en: 'The leaves begin to fall from the trees in autumn.', cn: '秋天树叶开始从树上落下。' }
    ],
    noun: [
      { en: 'The old man had a bad fall and broke his leg.', cn: '老人重重摔了一跤，摔断了腿。' },
      { en: 'Fall is my favorite season because of the colorful leaves.', cn: '秋天是我最喜欢的季节，因为树叶五彩缤纷。' }
    ]
  },

  // ===== fool (noun/verb) =====
  'fool': {
    noun: [
      { en: 'Only a fool would go out in this terrible storm.', cn: '只有傻瓜才会在这种可怕的暴风雨中出门。' }
    ],
    verb: [
      { en: 'You cannot fool me with that old trick.', cn: '你不能用那个老把戏骗我。' }
    ]
  },

  // ===== friendship (noun) =====
  'friendship': {
    noun: [
      { en: 'Their friendship began when they were in primary school.', cn: '他们的友谊始于小学时。' },
      { en: 'True friendship lasts through good times and bad.', cn: '真正的友谊经得起顺境和逆境。' }
    ]
  },

  // ===== funny (adj/noun) =====
  'funny': {
    adj: [
      { en: 'The comedian told a funny story that made everyone laugh.', cn: '喜剧演员讲了一个有趣的故事，让每个人都笑了。' },
      { en: 'There is a funny smell coming from the kitchen.', cn: '厨房里传来一股奇怪的气味。' }
    ]
  },

  // ===== honor (noun/verb) =====
  'honor': {
    noun: [
      { en: 'It is an honor to meet you, Professor Wang.', cn: '王老师，见到您很荣幸。' },
      { en: 'The soldier received a medal for his honor and bravery.', cn: '这名士兵因其荣誉和勇敢而获得勋章。' }
    ],
    verb: [
      { en: 'The school honored the retired teacher at the ceremony.', cn: '学校在典礼上向退休教师致敬。' }
    ]
  },

  // ===== later (adj/adv) =====
  'later': {
    adv: [
      { en: 'I will call you later this evening.', cn: '我今天晚上晚些时候会给你打电话。' },
      { en: 'See you later at the library.', cn: '图书馆见。' }
    ]
  },

  // ===== mark (noun/verb) =====
  'mark': {
    noun: [
      { en: 'There is a dirty mark on the wall from the bicycle tire.', cn: '墙上有一个自行车轮胎留下的脏印记。' },
      { en: 'She got full marks on the math test.', cn: '她数学考试得了满分。' }
    ],
    verb: [
      { en: 'Please mark the correct answer with a tick.', cn: '请用对号标记正确答案。' },
      { en: 'The event marked the beginning of a new era.', cn: '这一事件标志着一个新时代的开始。' }
    ]
  },

  // ===== modern (adj/noun) =====
  'modern': {
    adj: [
      { en: 'The museum has a very modern design.', cn: '这座博物馆有着非常现代的设计。' },
      { en: 'Modern technology has changed the way we live.', cn: '现代技术改变了我们的生活方式。' }
    ]
  },

  // ===== notice (noun/verb) =====
  'notice': {
    noun: [
      { en: 'There is a notice on the board about the school trip.', cn: '布告栏上有一张关于学校旅行的通知。' }
    ],
    verb: [
      { en: 'Did you notice anything strange about his behavior?', cn: '你注意到他的行为有什么奇怪的地方吗？' },
      { en: 'I noticed that she was wearing a new dress.', cn: '我注意到她穿了一条新裙子。' }
    ]
  },

  // ===== novel (noun/adj) =====
  'novel': {
    noun: [
      { en: 'She wrote a best-selling novel about life in the countryside.', cn: '她写了一本关于乡村生活的畅销小说。' }
    ],
    adj: [
      { en: 'The scientist came up with a novel solution to the problem.', cn: '科学家想出了一个新颖的解决方案。' }
    ]
  },

  // ===== pain (noun) =====
  'pain': {
    noun: [
      { en: 'I felt a sharp pain in my stomach after eating spicy food.', cn: '吃了辛辣食物后，我感到胃部一阵剧痛。' },
      { en: 'It was a pain to finish all that homework in one night.', cn: '一晚上完成所有作业真痛苦。' }
    ]
  },

  // ===== past (noun/adj/prep) =====
  'past': {
    noun: [
      { en: 'We should learn from the past and move forward.', cn: '我们应该从过去中学习并继续前进。' }
    ],
    adj: [
      { en: 'For the past three years, I have lived in this city.', cn: '在过去三年里，我一直住在这座城市。' }
    ],
    prep: [
      { en: 'The old man walked past the church every morning.', cn: '老人每天早上走过教堂。' }
    ]
  },

  // ===== plan (noun/verb) =====
  'plan': {
    noun: [
      { en: 'What is your plan for the summer holiday?', cn: '你的暑假计划是什么？' },
      { en: 'The architect drew up a detailed plan for the new building.', cn: '建筑师为这座新建筑绘制了详细的平面图。' }
    ],
    verb: [
      { en: 'We plan to visit the Great Wall next weekend.', cn: '我们计划下周末去参观长城。' },
      { en: 'She carefully planned every detail of the wedding.', cn: '她仔细策划了婚礼的每一个细节。' }
    ]
  },

  // ===== prevent (verb) =====
  'prevent': {
    verb: [
      { en: 'Wearing a seatbelt can prevent serious injuries in a car accident.', cn: '系安全带可以防止车祸中受重伤。' },
      { en: 'We must take action to prevent pollution in the river.', cn: '我们必须采取行动防止河流污染。' }
    ]
  },

  // ===== private (adj/verb) =====
  'private': {
    adj: [
      { en: 'This is a private conversation; please do not listen.', cn: '这是私人谈话，请不要听。' },
      { en: 'The celebrity values her private life very much.', cn: '这位名人非常珍视她的私生活。' }
    ]
  },

  // ===== progress (noun/verb) =====
  'progress': {
    noun: [
      { en: 'You have made great progress in English this semester.', cn: '你这学期英语进步很大。' },
      { en: 'The construction of the bridge is slow but steady progress.', cn: '桥梁的建设进展缓慢但稳定。' }
    ],
    verb: [
      { en: 'The work is progressing faster than we expected.', cn: '工作进展比我们预期的要快。' }
    ]
  },

  // ===== punish (verb/noun) =====
  'punish': {
    verb: [
      { en: 'The law will punish those who break the rules.', cn: '法律将惩罚那些违反规则的人。' }
    ]
  },

  // ===== reason (noun/verb) =====
  'reason': {
    noun: [
      { en: 'The reason I was late was the heavy traffic.', cn: '我迟到的原因是交通拥堵。' },
      { en: 'There is no reason to worry about the test.', cn: '没有理由担心考试。' }
    ],
    verb: [
      { en: 'He reasoned that the project would take two months.', cn: '他推断这个项目需要两个月。' }
    ]
  },

  // ===== receive (verb) =====
  'receive': {
    verb: [
      { en: 'Did you receive my email yesterday?', cn: '你昨天收到我的邮件了吗？' },
      { en: 'The winner received a gold medal at the ceremony.', cn: '获胜者在典礼上获得了一枚金牌。' }
    ]
  },

  // ===== reflect (verb) =====
  'reflect': {
    verb: [
      { en: 'The mirror reflects light into the dark corner.', cn: '镜子把光线反射到黑暗的角落。' },
      { en: 'Take time to reflect on what you have learned.', cn: '花时间反思你学到的东西。' }
    ]
  },

  // ===== require (verb) =====
  'require': {
    verb: [
      { en: 'The job requires three years of work experience.', cn: '这份工作需要三年的工作经验。' },
      { en: 'All passengers are required to show their tickets.', cn: '所有乘客都必须出示车票。' }
    ]
  },

  // ===== safety (noun) =====
  'safety': {
    noun: [
      { en: 'Your safety is the most important thing to us.', cn: '你的安全对我们来说是最重要的。' },
      { en: 'Please wear a helmet for your own safety.', cn: '为了你自己的安全，请戴头盔。' }
    ]
  },

  // ===== silver (adj/noun) =====
  'silver': {
    adj: [
      { en: 'Grandma has beautiful silver hair.', cn: '奶奶有一头美丽的银发。' }
    ],
    noun: [
      { en: 'The ring was made of pure silver.', cn: '这枚戒指是纯银的。' }
    ]
  },

  // ===== society (noun) =====
  'society': {
    noun: [
      { en: 'We all have a responsibility to help those in need in society.', cn: '我们都有责任帮助社会中需要帮助的人。' }
    ]
  },

  // ===== sort (noun/verb) =====
  'sort': {
    noun: [
      { en: 'What sort of music do you like to listen to?', cn: '你喜欢听哪种音乐？' }
    ],
    verb: [
      { en: 'Please sort the clothes by color before washing.', cn: '洗衣服前请按颜色分类。' }
    ]
  },

  // ===== speed (noun/verb) =====
  'speed': {
    noun: [
      { en: 'The car was traveling at a high speed on the highway.', cn: '汽车在高速公路上高速行驶。' }
    ],
    verb: [
      { en: 'The ambulance sped through the busy streets.', cn: '救护车飞驰穿过繁忙的街道。' }
    ]
  },

  // ===== strange (adj) =====
  'strange': {
    adj: [
      { en: 'There was a strange noise coming from the attic.', cn: '阁楼里传来奇怪的声音。' },
      { en: 'It feels strange to be back in my old school.', cn: '回到母校感觉很奇怪。' }
    ]
  },

  // ===== suit (noun/verb) =====
  'suit': {
    noun: [
      { en: 'He wore a dark blue suit to the interview.', cn: '他穿了一套深蓝色西装去面试。' }
    ],
    verb: [
      { en: 'The red dress suits you very well.', cn: '这条红色裙子非常适合你。' },
      { en: 'The punishment should suit the crime.', cn: '惩罚应该与罪行相称。' }
    ]
  },

  // ===== though (conj/adv) =====
  'though': {
    conj: [
      { en: 'Though it was raining, we still went hiking.', cn: '尽管下着雨，我们还是去徒步了。' }
    ],
    adv: [
      { en: 'It was hard work; I enjoyed it, though.', cn: '工作很辛苦；不过，我很喜欢。' }
    ]
  },

  // ===== till (conj/prep) =====
  'till': {
    conj: [
      { en: 'Wait here till I come back.', cn: '在这里等到我回来。' }
    ],
    prep: [
      { en: 'The shop is open from nine till six.', cn: '商店从九点营业到六点。' }
    ]
  },

  // ===== treasure (noun/verb) =====
  'treasure': {
    noun: [
      { en: 'The pirates buried their treasure on a secret island.', cn: '海盗们把宝藏埋在一个秘密岛屿上。' }
    ],
    verb: [
      { en: 'I treasure the memories of my childhood.', cn: '我珍惜童年的回忆。' }
    ]
  },

  // ===== unexpected (adj) =====
  'unexpected': {
    adj: [
      { en: 'The unexpected rain ruined our outdoor picnic.', cn: '突如其来的雨毁了我们的户外野餐。' },
      { en: 'His visit was a pleasant unexpected surprise.', cn: '他的来访是一个令人愉快的意外惊喜。' }
    ]
  },

  // ===== win (verb/noun) =====
  'win': {
    verb: [
      { en: 'Our team worked hard to win the championship.', cn: '我们队努力拼搏赢得了冠军。' },
      { en: 'You cannot win if you do not try.', cn: '如果你不尝试，就不可能赢。' }
    ],
    noun: [
      { en: 'The big win in the lottery changed his life.', cn: '彩票中大奖改变了他的生活。' }
    ]
  }

};

module.exports = { highQualityExamples };
