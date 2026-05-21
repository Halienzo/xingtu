/**
 * Batch 5: 继续修复多词性词词性覆盖（剩余高频多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], num:[], conj:[], int:[]}
 */

const highQualityExamples = {

  // ===== present (noun/adj) =====
  'present': {
    noun: [
      { en: 'I bought a beautiful present for my mother\'s birthday.', cn: '我给妈妈买了一件漂亮的生日礼物。' },
      { en: 'The children opened their presents under the Christmas tree.', cn: '孩子们在圣诞树下打开了他们的礼物。' }
    ],
    adj: [
      { en: 'All the students were present at the morning assembly.', cn: '所有学生都出席了晨会。' },
      { en: 'The president was present at the opening ceremony.', cn: '校长出席了开幕式。' }
    ]
  },

  // ===== one (num/pron) =====
  'one': {
    num: [
      { en: 'I have only one piece of cake left in the fridge.', cn: '冰箱里我只剩一块蛋糕了。' },
      { en: 'One plus one equals two.', cn: '一加一等于二。' }
    ],
    pron: [
      { en: 'This book is the one I told you about yesterday.', cn: '这本书就是我昨天跟你提到的那本。' },
      { en: 'One should always be kind to others.', cn: '人应该永远善待他人。' }
    ]
  },

  // ===== up (adv/prep/noun) =====
  'up': {
    adv: [
      { en: 'The sun came up and warmed the cold earth.', cn: '太阳升起，温暖了冰冷的大地。' },
      { en: 'Please stand up when the teacher enters the room.', cn: '老师进教室时请站起来。' }
    ],
    prep: [
      { en: 'We walked up the hill to see the view from the top.', cn: '我们走上山去山顶看风景。' },
      { en: 'The cat ran up the tree and could not get down.', cn: '猫跑上了树，下不来了。' }
    ],
    noun: [
      { en: 'Life has its ups and downs, but we must stay strong.', cn: '生活有起有落，但我们必须保持坚强。' }
    ]
  },

  // ===== that (adj/pron/conj) =====
  'that': {
    adj: [
      { en: 'That boy over there is my new classmate.', cn: '那边的那个男孩是我的新同学。' },
      { en: 'I do not like that color very much.', cn: '我不太喜欢那种颜色。' }
    ],
    pron: [
      { en: 'That is the most beautiful sunset I have ever seen.', cn: '那是我见过的最美丽的日落。' },
      { en: 'Who told you that?', cn: '谁告诉你的那件事？' }
    ],
    conj: [
      { en: 'She said that she would come to the party.', cn: '她说她会来参加聚会。' },
      { en: 'I hope that you will have a good trip.', cn: '我希望你旅途愉快。' }
    ]
  },

  // ===== tell (verb/noun) =====
  'tell': {
    verb: [
      { en: 'Grandpa loves to tell stories by the fireplace.', cn: '爷爷喜欢在壁炉旁讲故事。' },
      { en: 'Please tell me the truth about what happened.', cn: '请告诉我发生了什么的真相。' },
      { en: 'Can you tell the difference between these two paintings?', cn: '你能分辨出这两幅画的区别吗？' }
    ],
    noun: [
      { en: 'Poker players learn to read the tells of their opponents.', cn: '扑克玩家学会读懂对手的破绽。' }
    ]
  },

  // ===== well (adv/int/noun) =====
  'well': {
    adv: [
      { en: 'She speaks English very well for a beginner.', cn: '作为初学者，她英语说得很好。' },
      { en: 'I slept well last night and feel refreshed today.', cn: '我昨晚睡得很好，今天感觉精神焕发。' }
    ],
    int: [
      { en: 'Well, I did not expect to see you here!', cn: '哎呀，我没想到会在这里见到你！' },
      { en: 'Well, let me think about it for a moment.', cn: '嗯，让我想一下。' }
    ],
    noun: [
      { en: 'The village well has provided clean water for a hundred years.', cn: '村里的井已经提供干净的水一百年了。' },
      { en: 'They dug a deep well in the desert to find water.', cn: '他们在沙漠里挖了一口深井来找水。' }
    ]
  },

  // ===== snow (verb/noun/adj) =====
  'snow': {
    verb: [
      { en: 'It began to snow heavily in the late afternoon.', cn: '下午晚些时候开始下起了大雪。' },
      { en: 'We hope it will snow enough for us to build a snowman.', cn: '我们希望雪下得够大，让我们能堆雪人。' }
    ],
    noun: [
      { en: 'The ground was covered with fresh snow this morning.', cn: '今天早上地面覆盖着一层新雪。' },
      { en: 'Children love to play in the snow during winter vacation.', cn: '孩子们喜欢在寒假里玩雪。' }
    ],
    adj: [
      { en: 'The snow landscape looked like a picture postcard.', cn: '雪景看起来像一张明信片。' }
    ]
  },

  // ===== all (adj/pron) =====
  'all': {
    adj: [
      { en: 'All students must finish their homework on time.', cn: '所有学生都必须按时完成作业。' },
      { en: 'She spent all her savings on the new bicycle.', cn: '她把所有积蓄都花在了新自行车上。' }
    ],
    pron: [
      { en: 'All of us enjoyed the school trip to the museum.', cn: '我们所有人都很喜欢学校组织的博物馆之旅。' },
      { en: 'That is all I know about the story.', cn: '关于那个故事我就知道这么多。' }
    ]
  },

  // ===== cold (adj/noun) =====
  'cold': {
    adj: [
      { en: 'The winter wind was so cold that my fingers went numb.', cn: '冬天的风很冷，我的手指都冻麻了。' },
      { en: 'I prefer cold water after running in the hot sun.', cn: '在烈日下跑步后，我喜欢喝凉水。' }
    ],
    noun: [
      { en: 'I caught a cold and had to stay in bed for two days.', cn: '我感冒了，不得不卧床两天。' },
      { en: 'The cold of the mountain night woke us up.', cn: '山里的寒夜把我们冻醒了。' }
    ]
  },

  // ===== green (adj/noun) =====
  'green': {
    adj: [
      { en: 'The green leaves turned golden when autumn arrived.', cn: '秋天来临时，绿叶变成了金色。' },
      { en: 'She wore a green dress that matched her eyes.', cn: '她穿了一条绿色的裙子，和她的眼睛很配。' }
    ],
    noun: [
      { en: 'Green is the color of spring and new life.', cn: '绿色是春天和新生命的颜色。' },
      { en: 'The artist mixed yellow and blue to make green.', cn: '艺术家把黄色和蓝色混合调成绿色。' }
    ]
  },

  // ===== in (prep/art/noun) =====
  'in': {
    prep: [
      { en: 'The keys are in the drawer next to the door.', cn: '钥匙在门旁边的抽屉里。' },
      { en: 'We planted flowers in the garden last weekend.', cn: '上周末我们在花园里种了花。' }
    ],
    noun: [
      { en: 'The ins and outs of this problem are quite complicated.', cn: '这个问题的来龙去脉相当复杂。' }
    ]
  },

  // ===== clean (adj/adv/verb/noun) =====
  'clean': {
    adj: [
      { en: 'The room was spotlessly clean after the spring cleaning.', cn: '大扫除后，房间一尘不染。' },
      { en: 'Please use a clean towel to dry your hands.', cn: '请用干净的毛巾擦干手。' }
    ],
    adv: [
      { en: 'The thief got clean away before the police arrived.', cn: '小偷在警察到达之前逃得无影无踪。' }
    ],
    verb: [
      { en: 'I need to clean my room before my friends come over.', cn: '我需要在朋友来之前打扫房间。' },
      { en: 'Mom taught me how to clean fish properly.', cn: '妈妈教我如何正确地清理鱼。' }
    ],
    noun: [
      { en: 'The house needed a thorough clean after the renovation.', cn: '装修后，房子需要彻底清洁。' }
    ]
  },

  // ===== fold (verb/noun) =====
  'fold': {
    verb: [
      { en: 'Please fold the clothes neatly and put them in the drawer.', cn: '请把衣服叠整齐放进抽屉里。' },
      { en: 'She learned to fold paper cranes when she was six.', cn: '她六岁时就学会了折纸鹤。' }
    ],
    noun: [
      { en: 'The sheep hid in a fold on the hillside during the storm.', cn: '暴风雨中，羊群躲在山坡上的围栏里。' }
    ]
  },

  // ===== make (verb/noun) =====
  'make': {
    verb: [
      { en: 'Mom makes delicious dumplings every Chinese New Year.', cn: '妈妈每年春节都做美味的饺子。' },
      { en: 'The children made a big snowman in the front yard.', cn: '孩子们在前院堆了一个大雪人。' },
      { en: 'Hard work will make your dreams come true.', cn: '努力工作会让你的梦想成真。' }
    ],
    noun: [
      { en: 'This car is a Japanese make, known for its reliability.', cn: '这辆车是日本品牌，以可靠性著称。' }
    ]
  },

  // ===== milk (verb/noun) =====
  'milk': {
    verb: [
      { en: 'Farmers milk the cows early every morning.', cn: '农民每天早上很早给奶牛挤奶。' },
      { en: 'She learned to milk goats during her summer on the farm.', cn: '她在农场过暑假时学会了挤羊奶。' }
    ],
    noun: [
      { en: 'A glass of warm milk helps me sleep better at night.', cn: '一杯温牛奶帮助我晚上睡得更好。' },
      { en: 'The milk in the fridge expired yesterday.', cn: '冰箱里的牛奶昨天过期了。' }
    ]
  },

  // ===== slow (adj/adv/verb) =====
  'slow': {
    adj: [
      { en: 'The old truck was too slow to keep up with traffic.', cn: '那辆旧卡车太慢了，跟不上车流。' },
      { en: 'Progress has been slow but steady this semester.', cn: '这学期的进步缓慢但稳定。' }
    ],
    adv: [
      { en: 'Please drive slow through the school zone.', cn: '请在学校区域缓慢驾驶。' }
    ],
    verb: [
      { en: 'The heavy rain began to slow the runners on the track.', cn: '大雨开始让跑道上的跑步者慢下来。' },
      { en: 'You should slow down when you approach the crossing.', cn: '接近路口时你应该减速。' }
    ]
  },

  // ===== train (verb/noun/adj) =====
  'train': {
    verb: [
      { en: 'Athletes train hard every day to prepare for the competition.', cn: '运动员每天刻苦训练，为比赛做准备。' },
      { en: 'My uncle helped train the new employees at his company.', cn: '我叔叔帮忙培训他公司的新员工。' }
    ],
    noun: [
      { en: 'We took an overnight train to visit my grandparents.', cn: '我们乘过夜火车去看望祖父母。' },
      { en: 'The train arrived at the station ten minutes late.', cn: '火车晚点十分钟到达车站。' }
    ],
    adj: [
      { en: 'The train carriage was full of travelers during the holiday.', cn: '假期期间，火车车厢里挤满了旅客。' }
    ]
  },

  // ===== out (adv/adj) =====
  'out': {
    adv: [
      { en: 'Please go out and get some fresh air.', cn: '请出去呼吸点新鲜空气。' },
      { en: 'The fire went out after the heavy rain.', cn: '大雨后火熄灭了。' }
    ],
    adj: [
      { en: 'I am sorry, but the tickets are already sold out.', cn: '抱歉，票已经卖完了。' },
      { en: 'The secret is out, so everyone knows now.', cn: '秘密泄露了，所以现在大家都知道了。' }
    ]
  },

  // ===== square (noun/adj) =====
  'square': {
    noun: [
      { en: 'The children played football in the town square.', cn: '孩子们在城镇广场上踢足球。' },
      { en: 'Draw a square with sides of five centimeters.', cn: '画一个边长五厘米的正方形。' }
    ],
    adj: [
      { en: 'The old table had a square top and four sturdy legs.', cn: '旧桌子有正方形的桌面和四条结实的腿。' },
      { en: 'Please cut the paper into square pieces.', cn: '请把纸剪成方形小块。' }
    ]
  },

  // ===== brown (adj/noun) =====
  'brown': {
    adj: [
      { en: 'The brown bear caught a fish in the rushing river.', cn: '棕熊在湍急的河流中抓到了一条鱼。' },
      { en: 'She wore a brown coat that matched her leather boots.', cn: '她穿了一件棕色外套，和她的皮靴很配。' }
    ],
    noun: [
      { en: 'Brown is a warm color that reminds me of autumn leaves.', cn: '棕色是一种温暖的颜色，让我想起秋叶。' }
    ]
  },

  // ===== under (prep/adv) =====
  'under': {
    prep: [
      { en: 'The cat is sleeping under the warm blanket.', cn: '猫正在温暖的毯子下面睡觉。' },
      { en: 'The tunnel runs under the river to connect the two cities.', cn: '隧道从河底穿过，连接两座城市。' }
    ],
    adv: [
      { en: 'The boat went under during the terrible storm.', cn: '船在可怕的暴风雨中沉没了。' }
    ]
  },

  // ===== climb (verb/noun) =====
  'climb': {
    verb: [
      { en: 'It took us three hours to climb to the top of the hill.', cn: '我们花了三个小时爬到山顶。' },
      { en: 'The monkey climbed up the tree to pick bananas.', cn: '猴子爬上树去摘香蕉。' }
    ],
    noun: [
      { en: 'The climb to the summit was exhausting but rewarding.', cn: '攀登顶峰让人筋疲力尽，但很有成就感。' }
    ]
  },

  // ===== age (noun/verb) =====
  'age': {
    noun: [
      { en: 'At the age of ten, she could play the piano beautifully.', cn: '十岁时，她就能优美地弹奏钢琴。' },
      { en: 'We live in the age of information and technology.', cn: '我们生活在信息技术的时代。' }
    ],
    verb: [
      { en: 'Wine tends to age well if stored in a cool, dark place.', cn: '如果存放在阴凉黑暗的地方，葡萄酒往往会陈酿得很好。' }
    ]
  },

  // ===== cloud (noun/adj - cloud as adj in compounds like cloud cover) =====
  'cloud': {
    noun: [
      { en: 'A dark cloud covered the sun and the temperature dropped.', cn: '一朵乌云遮住了太阳，气温下降了。' },
      { en: 'The plane flew above the white clouds like cotton candy.', cn: '飞机飞过像棉花糖一样的白云上方。' }
    ]
  },

  // ===== home (noun/adv) =====
  'home': {
    noun: [
      { en: 'There is no place like home when you feel tired.', cn: '当你感到疲倦时，没有什么地方比家更好。' },
      { en: 'My grandparents built their home by the lake fifty years ago.', cn: '我的祖父母五十年前在湖边建了他们的家。' }
    ],
    adv: [
      { en: 'It is getting dark, so let us go home now.', cn: '天快黑了，我们现在回家吧。' },
      { en: 'She stayed home because she was not feeling well.', cn: '她待在家里，因为她感觉不舒服。' }
    ]
  },

  // ===== visit (verb/noun) =====
  'visit': {
    verb: [
      { en: 'We plan to visit the Great Wall during the summer holiday.', cn: '我们计划暑假期间去参观长城。' },
      { en: 'The doctor will visit the patient at home tomorrow.', cn: '医生明天会上门看望病人。' }
    ],
    noun: [
      { en: 'Our visit to the museum lasted the whole afternoon.', cn: '我们参观博物馆花了整个下午。' },
      { en: 'Thank you for your visit; please come again soon.', cn: '谢谢你的来访，请很快再来。' }
    ]
  },

  // ===== jam (noun/verb) =====
  'jam': {
    noun: [
      { en: 'Strawberry jam on toast is my favorite breakfast.', cn: '吐司配草莓酱是我最喜欢的早餐。' },
      { en: 'We were stuck in a traffic jam for over an hour.', cn: '我们堵车堵了一个多小时。' }
    ],
    verb: [
      { en: 'Too many papers jammed the printer, and it stopped working.', cn: '太多纸张卡住了打印机，它停止工作了。' },
      { en: 'The musicians jammed together until midnight.', cn: '音乐家们一起即兴演奏到午夜。' }
    ]
  },

  // ===== join (verb/noun) =====
  'join': {
    verb: [
      { en: 'Would you like to join our English reading club?', cn: '你想加入我们的英语阅读俱乐部吗？' },
      { en: 'The two rivers join near the old bridge.', cn: '两条河在老桥附近汇合。' }
    ],
    noun: [
      { en: 'The join between the two pipes was leaking water.', cn: '两根管子之间的连接处在漏水。' }
    ]
  },

  // ===== angry (adj/noun) =====
  'angry': {
    adj: [
      { en: 'The teacher was angry when the students broke the window.', cn: '学生们打破窗户时，老师很生气。' },
      { en: 'Do not be angry with me; I did not mean to be late.', cn: '别生我的气，我不是故意迟到的。' }
    ]
  },

  // ===== cut (verb/noun) =====
  'cut': {
    verb: [
      { en: 'Be careful not to cut yourself with that sharp knife.', cn: '小心别用那把锋利的刀割伤自己。' },
      { en: 'We need to cut the paper into equal strips.', cn: '我们需要把纸剪成等宽的条。' },
      { en: 'The wind cut through my thin jacket on the mountain.', cn: '山上的风穿透了我的薄夹克。' }
    ],
    noun: [
      { en: 'He had a deep cut on his finger from the broken glass.', cn: '他的手指被碎玻璃割了一道深深的伤口。' },
      { en: 'The barber gave me a nice cut at half the usual price.', cn: '理发师以平时一半的价格给我剪了个漂亮的发型。' }
    ]
  },

  // ===== learn (verb/noun) =====
  'learn': {
    verb: [
      { en: 'I want to learn how to play the guitar this year.', cn: '我今年想学习弹吉他。' },
      { en: 'Children learn new things faster than adults.', cn: '孩子们学新东西比成年人快。' },
      { en: 'We should learn from our mistakes and move forward.', cn: '我们应该从错误中吸取教训，继续前进。' }
    ]
  },

  // ===== strong (adj/noun/verb) =====
  'strong': {
    adj: [
      { en: 'The strong wind blew leaves all over the garden.', cn: '大风把树叶吹得满花园都是。' },
      { en: 'You need a strong body to climb that mountain.', cn: '你需要强壮的身体才能爬那座山。' }
    ]
  },

  // ===== collect (verb/noun) =====
  'collect': {
    verb: [
      { en: 'I collect stamps from different countries around the world.', cn: '我收集来自世界各国的邮票。' },
      { en: 'Please collect your luggage from the conveyor belt.', cn: '请从传送带上取走你的行李。' }
    ]
  },

  // ===== glue (noun/verb) =====
  'glue': {
    noun: [
      { en: 'I need some strong glue to fix the broken chair leg.', cn: '我需要一些强力胶水来修理断掉的椅子腿。' },
      { en: 'The glue dried quickly in the warm sunshine.', cn: '胶水在温暖的阳光下很快干了。' }
    ],
    verb: [
      { en: 'Please glue the two pieces of wood together carefully.', cn: '请小心地把两块木头粘在一起。' }
    ]
  },

  // ===== grey (adj/noun) =====
  'grey': {
    adj: [
      { en: 'The sky turned grey before the afternoon thunderstorm.', cn: '午后雷暴雨前，天空变成了灰色。' },
      { en: 'Grandpa\'s hair has gone completely grey over the years.', cn: '多年来，爷爷的头发已经完全变白了。' }
    ],
    noun: [
      { en: 'Grey is a neutral color that goes well with almost anything.', cn: '灰色是一种中性色，几乎和任何东西都很搭。' }
    ]
  },

  // ===== jump (verb/noun) =====
  'jump': {
    verb: [
      { en: 'The cat can jump over the fence with no effort.', cn: '猫能毫不费力地跳过篱笆。' },
      { en: 'Prices jumped by twenty percent after the holiday season.', cn: '假期过后物价跃升了百分之二十。' }
    ],
    noun: [
      { en: 'The long jump is my favorite event in track and field.', cn: '跳远是我田径比赛中最喜欢的项目。' },
      { en: 'There was a big jump in sales during the Spring Festival.', cn: '春节期间销售额大幅增长。' }
    ]
  },

  // ===== stick (noun/verb) =====
  'stick': {
    noun: [
      { en: 'The old man walked with a wooden stick along the path.', cn: '老人拄着一根木棍沿着小路走。' },
      { en: 'We roasted marshmallows on sticks over the campfire.', cn: '我们用树枝串着棉花糖在篝火上烤。' }
    ],
    verb: [
      { en: 'Please stick the stamp on the upper right corner of the envelope.', cn: '请把邮票贴在信封右上角。' },
      { en: 'The chewing gum stuck to the bottom of my shoe.', cn: '口香糖粘在了我的鞋底。' },
      { en: 'If you stick to your plan, you will surely succeed.', cn: '如果你坚持计划，你一定会成功。' }
    ]
  },

  // ===== throw (verb/noun) =====
  'throw': {
    verb: [
      { en: 'Please throw the ball gently to the puppy.', cn: '请轻轻地把球扔给小狗。' },
      { en: 'She threw away all the old magazines from last year.', cn: '她扔掉了去年所有的旧杂志。' },
      { en: 'The party will throw a big celebration for his birthday.', cn: '派对将为他的生日举办一场盛大的庆祝活动。' }
    ],
    noun: [
      { en: 'His throw from center field reached home plate perfectly.', cn: '他从中外野的传球完美地到达了本垒板。' }
    ]
  },

  // ===== different (adj/noun) =====
  'different': {
    adj: [
      { en: 'My twin sisters have very different personalities.', cn: '我的双胞胎姐妹有着非常不同的性格。' },
      { en: 'This school uses a different method to teach mathematics.', cn: '这所学校用不同的方法教数学。' }
    ]
  },

  // ===== dive (verb/noun) =====
  'dive': {
    verb: [
      { en: 'The swimmer prepared to dive into the clear blue pool.', cn: '游泳者准备跳入清澈的蓝色泳池。' },
      { en: 'Seagulls dive into the water to catch fish.', cn: '海鸥俯冲入水捕鱼。' }
    ],
    noun: [
      { en: 'His dive from the high board earned him a perfect score.', cn: '他从高台跳下的跳水动作为他赢得了满分。' }
    ]
  },

  // ===== mask (noun/verb) =====
  'mask': {
    noun: [
      { en: 'The doctor put on a surgical mask before entering the room.', cn: '医生进房间前戴上了医用口罩。' },
      { en: 'The children wore colorful masks at the costume party.', cn: '孩子们在化装舞会上戴着五颜六色的面具。' }
    ],
    verb: [
      { en: 'She tried to mask her sadness with a bright smile.', cn: '她试图用灿烂的笑容掩饰她的悲伤。' }
    ]
  },

  // ===== move (verb/noun) =====
  'move': {
    verb: [
      { en: 'Please move your chair closer to the table.', cn: '请把你的椅子挪近桌子一点。' },
      { en: 'The sad movie made everyone in the theater move to tears.', cn: '这部感人的电影让影院里的每个人都感动得流泪。' },
      { en: 'We plan to move to a bigger apartment next year.', cn: '我们计划明年搬到一个更大的公寓。' }
    ],
    noun: [
      { en: 'Your move in this chess game will decide the winner.', cn: '你这盘棋的这一步将决定胜负。' },
      { en: 'The move to the new office took the whole weekend.', cn: '搬到新办公室花了整个周末。' }
    ]
  },

  // ===== telephone (noun/verb) =====
  'telephone': {
    noun: [
      { en: 'The telephone rang just as I was leaving the house.', cn: '我正要出门时，电话响了。' },
      { en: 'Grandma still prefers her old rotary telephone.', cn: '奶奶仍然喜欢用她的老式旋转拨号电话。' }
    ],
    verb: [
      { en: 'I will telephone you as soon as I arrive at the station.', cn: '我一到车站就给你打电话。' }
    ]
  },

  // ===== brave (adj/verb) =====
  'brave': {
    adj: [
      { en: 'The brave firefighter ran into the burning building.', cn: '勇敢的消防员冲进了着火的大楼。' },
      { en: 'It was brave of you to speak in front of so many people.', cn: '你真勇敢，敢在这么多人面前讲话。' }
    ],
    verb: [
      { en: 'We must brave the storm and get home before dark.', cn: '我们必须冒着暴风雨赶在天黑前回家。' }
    ]
  },

  // ===== key (noun/adj) =====
  'key': {
    noun: [
      { en: 'I cannot find my key to the front door anywhere.', cn: '我到处都找不到前门的钥匙。' },
      { en: 'The key to success is hard work and patience.', cn: '成功的关键是努力和耐心。' }
    ],
    adj: [
      { en: 'Location is a key factor when choosing a school.', cn: '位置是择校时的关键因素。' },
      { en: 'She plays a key role in our team\'s project.', cn: '她在我们团队的项目中扮演着关键角色。' }
    ]
  },

  // ===== over (prep/adv) =====
  'over': {
    prep: [
      { en: 'A beautiful bridge stretches over the calm river.', cn: '一座美丽的桥横跨在平静的河面上。' },
      { en: 'The meeting lasted over two hours.', cn: '会议持续了两个小时以上。' }
    ],
    adv: [
      { en: 'The game is over, and our team won the championship.', cn: '比赛结束了，我们队赢得了冠军。' },
      { en: 'Please come over for dinner this weekend.', cn: '这个周末过来吃晚饭吧。' }
    ]
  },

  // ===== radio (noun/verb) =====
  'radio': {
    noun: [
      { en: 'I listen to the radio every morning while having breakfast.', cn: '我每天早上吃早餐时听收音机。' },
      { en: 'The news on the radio reported a traffic accident on the highway.', cn: '收音机里的新闻报道了高速公路上的一起交通事故。' }
    ],
    verb: [
      { en: 'The ship radioed for help when it hit the iceberg.', cn: '船撞到冰山时发无线电求救。' }
    ]
  },

  // ===== rich (adj/noun/verb) =====
  'rich': {
    adj: [
      { en: 'The rich soil in this valley produces the best vegetables.', cn: '这个山谷肥沃的土壤出产最好的蔬菜。' },
      { en: 'This chocolate cake is so rich that I can only eat a small piece.', cn: '这个巧克力蛋糕太浓郁了，我只能吃一小块。' }
    ]
  },

  // ===== same (adj/noun) =====
  'same': {
    adj: [
      { en: 'We go to the same school and share the same hobbies.', cn: '我们上同一所学校，有相同的爱好。' },
      { en: 'The twins wore the same clothes to the party.', cn: '双胞胎穿同样的衣服去参加聚会。' }
    ],
    noun: [
      { en: 'I would do the same if I were in your position.', cn: '如果我在你的位置上，我也会做同样的事。' }
    ]
  },

  // ===== shower (noun/verb) =====
  'shower': {
    noun: [
      { en: 'I take a shower every morning to wake myself up.', cn: '我每天早上淋浴来让自己清醒。' },
      { en: 'A sudden shower caught us on our way home.', cn: '一场突如其来的阵雨把我们淋在了回家的路上。' }
    ],
    verb: [
      { en: 'They will shower the bride with gifts at the party.', cn: '他们将在聚会上给新娘送上大量礼物。' }
    ]
  },

  // ===== snake (noun/verb) =====
  'snake': {
    noun: [
      { en: 'A green snake slithered across the path in the forest.', cn: '一条绿色的蛇在森林里的小路上蜿蜒爬行。' },
      { en: 'The snake shed its skin under the rock.', cn: '蛇在岩石下蜕皮。' }
    ],
    verb: [
      { en: 'The river snakes through the valley for miles.', cn: '这条河蜿蜒穿过山谷数英里。' }
    ]
  },

  // ===== summer (noun/adj) =====
  'summer': {
    noun: [
      { en: 'We always go swimming a lot during the hot summer.', cn: '炎热的夏天我们总是经常去游泳。' },
      { en: 'Summer is my favorite season because of the long vacation.', cn: '夏天是我最喜欢的季节，因为有长假。' }
    ],
    adj: [
      { en: 'We planted summer flowers in the garden last month.', cn: '上个月我们在花园里种了夏季花卉。' },
      { en: 'The summer heat made everyone seek shade under the trees.', cn: '夏日的炎热让每个人都在树下寻找阴凉。' }
    ]
  },

  // ===== top (noun/adj) =====
  'top': {
    noun: [
      { en: 'The flag on top of the mountain waved in the wind.', cn: '山顶上的旗帜在风中飘扬。' },
      { en: 'Please write your name at the top of the page.', cn: '请把你的名字写在页面顶部。' },
      { en: 'She reached the top of her class this semester.', cn: '她这学期达到了班级的顶尖水平。' }
    ],
    adj: [
      { en: 'The top students were awarded scholarships at the ceremony.', cn: '顶尖学生在典礼上获得了奖学金。' },
      { en: 'We stayed in a top hotel during our trip to Paris.', cn: '我们在巴黎旅行期间住了一家顶级酒店。' }
    ]
  }

};

module.exports = { highQualityExamples };
