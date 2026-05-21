/**
 * Batch 8: 继续修复多词性词词性覆盖（第四批剩余高频多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[], int:[]}
 */

const highQualityExamples = {

  // ===== board (noun/verb) =====
  'board': {
    noun: [
      { en: 'Please write your answer on the white board.', cn: '请把你的答案写在白板上。' },
      { en: 'The passengers waited to board the ship at the harbor.', cn: '乘客们在港口等待登船。' }
    ],
    verb: [
      { en: 'We will board the plane at gate number twelve.', cn: '我们将在十二号登机口登机。' }
    ]
  },

  // ===== begin (verb/noun) =====
  'begin': {
    verb: [
      { en: 'The concert will begin at seven o\'clock in the evening.', cn: '音乐会将于晚上七点开始。' },
      { en: 'Every journey begins with a single step.', cn: '千里之行，始于足下。' }
    ]
  },

  // ===== cave (noun/verb) =====
  'cave': {
    noun: [
      { en: 'Bears often sleep in caves during the cold winter months.', cn: '熊在寒冷的冬季经常在洞穴里睡觉。' },
      { en: 'We explored a dark cave full of stalactites during the trip.', cn: '旅途中我们探索了一个充满钟乳石的黑暗洞穴。' }
    ],
    verb: [
      { en: 'The old roof began to cave under the heavy snow.', cn: '沉重的积雪使旧屋顶开始塌陷。' }
    ]
  },

  // ===== choose (verb/noun) =====
  'choose': {
    verb: [
      { en: 'It is hard to choose between chocolate and strawberry ice cream.', cn: '在巧克力冰淇淋和草莓冰淇淋之间做出选择很难。' },
      { en: 'You can choose any book you like from the shelf.', cn: '你可以从书架上选择任何你喜欢的书。' }
    ]
  },

  // ===== crayon (noun/verb) =====
  'crayon': {
    noun: [
      { en: 'The child drew a colorful picture with her wax crayons.', cn: '孩子用她的蜡笔画了一幅色彩斑斓的画。' },
      { en: 'Please put the crayons back in the box after drawing.', cn: '画完后请把蜡笔放回盒子里。' }
    ],
    verb: [
      { en: 'She crayoned a beautiful rainbow on the paper.', cn: '她用蜡笔在纸上画了一道美丽的彩虹。' }
    ]
  },

  // ===== crisp (adj/verb) =====
  'crisp': {
    adj: [
      { en: 'The autumn air was crisp and refreshing in the morning.', cn: '秋天的早晨空气清新凉爽。' },
      { en: 'I love the crisp sound of leaves under my feet.', cn: '我喜欢脚下树叶发出的清脆声响。' }
    ],
    verb: [
      { en: 'Mother crisped the bacon in the hot pan.', cn: '妈妈在热锅里把培根煎得酥脆。' }
    ]
  },

  // ===== danger (noun) =====
  'danger': {
    noun: [
      { en: 'The sign warned swimmers of danger in the deep water.', cn: '标志警告游泳者深水区有危险。' },
      { en: 'The firefighter ran into danger to save the little girl.', cn: '消防员冲进危险中去救那个小女孩。' }
    ]
  },

  // ===== discover (verb/noun) =====
  'discover': {
    verb: [
      { en: 'Columbus discovered America in fourteen ninety-two.', cn: '哥伦布于1492年发现了美洲。' },
      { en: 'Scientists discover new species in the rainforest every year.', cn: '科学家们每年都在雨林中发现新物种。' }
    ]
  },

  // ===== enough (adv/adj/pron/noun) =====
  'enough': {
    adj: [
      { en: 'We do not have enough time to finish the whole project today.', cn: '我们今天没有足够的时间完成整个项目。' }
    ],
    adv: [
      { en: 'Is the soup hot enough for you?', cn: '这汤对你来说够热吗？' },
      { en: 'She ran fast enough to catch the last bus.', cn: '她跑得足够快，赶上了末班车。' }
    ],
    pron: [
      { en: 'Enough is enough; let us stop arguing.', cn: '够了够了，我们别再争论了。' }
    ]
  },

  // ===== favourite (adj/noun) =====
  'favourite': {
    adj: [
      { en: 'Blue is my favourite color because it reminds me of the sky.', cn: '蓝色是我最喜欢的颜色，因为它让我想起天空。' }
    ],
    noun: [
      { en: 'This book has been a favourite of readers for over fifty years.', cn: '这本书五十多年来一直是读者的最爱。' }
    ]
  },

  // ===== fight (verb/noun) =====
  'fight': {
    verb: [
      { en: 'The soldiers fought bravely to protect their homeland.', cn: '士兵们勇敢地战斗以保护他们的祖国。' },
      { en: 'We must fight against pollution to save the earth.', cn: '我们必须与污染作斗争以拯救地球。' }
    ],
    noun: [
      { en: 'The fight for freedom lasted many years.', cn: '争取自由的斗争持续了许多年。' },
      { en: 'There was a big fight between the two rival teams.', cn: '两支 rival 队伍之间发生了一场激烈的打斗。' }
    ]
  },

  // ===== foil (noun/verb) =====
  'foil': {
    noun: [
      { en: 'Mom wrapped the leftover chicken in aluminum foil.', cn: '妈妈用铝箔把剩下的鸡肉包了起来。' }
    ],
    verb: [
      { en: 'The hero managed to foil the villain\'s evil plan.', cn: '英雄设法挫败了反派的邪恶计划。' }
    ]
  },

  // ===== forward (adj/adv/noun) =====
  'forward': {
    adj: [
      { en: 'The forward players scored three goals in the match.', cn: '前锋队员在比赛中进了三个球。' }
    ],
    adv: [
      { en: 'Please step forward when your name is called.', cn: '叫到你名字时请向前走一步。' },
      { en: 'We are looking forward to your visit next month.', cn: '我们期待着您下个月的来访。' }
    ],
    noun: [
      { en: 'The soccer team needs a strong forward for the new season.', cn: '足球队新赛季需要一名强壮的前锋。' }
    ]
  },

  // ===== greet (verb/noun) =====
  'greet': {
    verb: [
      { en: 'I greeted my neighbor with a warm smile this morning.', cn: '今天早上我带着温暖的微笑向邻居打招呼。' },
      { en: 'The host greeted each guest at the door of the party.', cn: '主人在聚会门口迎接每一位客人。' }
    ]
  },

  // ===== happen (verb/noun) =====
  'happen': {
    verb: [
      { en: 'What will happen if it rains during the outdoor concert?', cn: '如果户外音乐会期间下雨会发生什么？' },
      { en: 'I happened to meet my old teacher at the supermarket.', cn: '我碰巧在超市遇到了我的老老师。' }
    ]
  },

  // ===== hard (adv/adj) =====
  'hard': {
    adj: [
      { en: 'This math problem is too hard for me to solve alone.', cn: '这道数学题对我来说太难了，无法独自解决。' },
      { en: 'The ground was frozen hard after the cold night.', cn: '寒冷的夜晚过后，地面冻得硬邦邦的。' }
    ],
    adv: [
      { en: 'She studied hard for the exam and got a perfect score.', cn: '她为考试努力学习，得了满分。' },
      { en: 'It was raining hard when we left the theater.', cn: '我们离开剧院时雨下得很大。' }
    ]
  },

  // ===== heavy (adj/adv) =====
  'heavy': {
    adj: [
      { en: 'The heavy suitcase was difficult to carry up the stairs.', cn: '沉重的行李箱很难搬上楼梯。' },
      { en: 'Dark clouds suggested that heavy rain was coming.', cn: '乌云预示着大雨即将来临。' }
    ],
    adv: [
      { en: 'The rain fell heavy on the roof throughout the night.', cn: '雨整夜重重地落在屋顶上。' }
    ]
  },

  // ===== invite (verb/noun) =====
  'invite': {
    verb: [
      { en: 'I want to invite all my friends to my birthday party.', cn: '我想邀请我所有的朋友来参加我的生日聚会。' },
      { en: 'The beautiful scenery invites visitors to stay longer.', cn: '美丽的风景吸引着游客多停留一段时间。' }
    ],
    noun: [
      { en: 'Did you receive an invite to the wedding?', cn: '你收到婚礼请柬了吗？' }
    ]
  },

  // ===== keep (verb/adj) =====
  'keep': {
    verb: [
      { en: 'Please keep quiet while the baby is sleeping.', cn: '宝宝睡觉时请保持安静。' },
      { en: 'I keep my old photos in a special wooden box.', cn: '我把旧照片放在一个特别的木盒子里。' }
    ]
  },

  // ===== litter (noun/verb) =====
  'litter': {
    noun: [
      { en: 'Please do not throw litter on the ground; use the bin.', cn: '请不要在地上乱扔垃圾，请使用垃圾桶。' },
      { en: 'The park was full of litter after the music festival.', cn: '音乐节过后，公园里到处都是垃圾。' }
    ],
    verb: [
      { en: 'It is illegal to litter in public places.', cn: '在公共场所乱扔垃圾是违法的。' }
    ]
  },

  // ===== love (noun/verb) =====
  'love': {
    noun: [
      { en: 'The love between the old couple inspired everyone around them.', cn: '这对老夫妻之间的爱感动了周围的每一个人。' },
      { en: 'My love for reading began when I was very young.', cn: '我对阅读的热爱始于我很小的时候。' }
    ],
    verb: [
      { en: 'I love to watch the sunrise from the hilltop.', cn: '我喜欢从山顶看日出。' },
      { en: 'Grandparents love their grandchildren with all their hearts.', cn: '祖父母全心全意地爱着他们的孙辈。' }
    ]
  },

  // ===== mean (verb/adj/noun) =====
  'mean': {
    verb: [
      { en: 'What does this strange word mean in English?', cn: '这个奇怪的词在英语中是什么意思？' },
      { en: 'Dark clouds usually mean that rain is coming.', cn: '乌云通常意味着要下雨了。' }
    ],
    adj: [
      { en: 'The mean dog barked at everyone who passed by.', cn: '那只凶恶的狗对每一个路过的人都吠叫。' }
    ],
    noun: [
      { en: 'Calculate the mean of these five numbers for me.', cn: '帮我算出这五个数字的平均值。' }
    ]
  },

  // ===== meet (verb/noun) =====
  'meet': {
    verb: [
      { en: 'I am excited to meet my favorite author at the book signing.', cn: '我很高兴能在签售会上见到我最喜欢的作家。' },
      { en: 'The two rivers meet near the old stone bridge.', cn: '两条河在老石桥附近汇合。' }
    ],
    noun: [
      { en: 'The swimming meet will be held at the community pool.', cn: '游泳比赛将在社区游泳池举行。' }
    ]
  },

  // ===== mix (verb/noun) =====
  'mix': {
    verb: [
      { en: 'Please mix the flour and water gently in the bowl.', cn: '请轻轻地把面粉和水在碗里混合。' },
      { en: 'The artist mixed blue and yellow to create green.', cn: '艺术家把蓝色和黄色混合，调出了绿色。' }
    ],
    noun: [
      { en: 'This cake mix only needs eggs and milk to bake.', cn: '这种蛋糕粉只需要加鸡蛋和牛奶就可以烤了。' }
    ]
  },

  // ===== narrow (adj/verb) =====
  'narrow': {
    adj: [
      { en: 'The narrow path through the forest was covered with leaves.', cn: '穿过森林的狭窄小路上铺满了树叶。' },
      { en: 'The river becomes narrow near the old village.', cn: '这条河在老村庄附近变窄了。' }
    ],
    verb: [
      { en: 'The detectives worked hard to narrow down the list of suspects.', cn: '侦探们努力缩小嫌疑人名单的范围。' }
    ]
  },

  // ===== pack (verb/noun) =====
  'pack': {
    verb: [
      { en: 'Please pack your suitcase the night before the trip.', cn: '请在旅行前一晚收拾好你的行李箱。' },
      { en: 'The crowd began to pack into the concert hall.', cn: '人群开始涌入音乐厅。' }
    ],
    noun: [
      { en: 'A pack of wolves was spotted in the mountain forest.', cn: '在山林中发现了一群狼。' },
      { en: 'He carried a heavy pack on his back during the hike.', cn: '徒步旅行时，他背着一个沉重的背包。' }
    ]
  },

  // ===== parcel (noun/verb) =====
  'parcel': {
    noun: [
      { en: 'A parcel arrived for you from your aunt in Shanghai.', cn: '一个来自你上海姑姑的包裹寄到了。' }
    ],
    verb: [
      { en: 'The farmer parceled out the land among his three sons.', cn: '农民把土地分给了他的三个儿子。' }
    ]
  },

  // ===== piano (noun/adj/adv) =====
  'piano': {
    noun: [
      { en: 'She practices the piano for one hour every evening.', cn: '她每天晚上练习一小时钢琴。' },
      { en: 'The grand piano in the hall sounded beautiful.', cn: '大厅里的三角钢琴声音很优美。' }
    ]
  },

  // ===== poster (noun/verb) =====
  'poster': {
    noun: [
      { en: 'There is a movie poster on the wall of my bedroom.', cn: '我卧室的墙上有一张电影海报。' }
    ]
  },

  // ===== prefer (verb) =====
  'prefer': {
    verb: [
      { en: 'I prefer tea to coffee in the morning.', cn: '早上我更喜欢喝茶而不是咖啡。' },
      { en: 'She prefers to study in the library rather than at home.', cn: '她更喜欢在图书馆学习，而不是在家。' }
    ]
  },

  // ===== project (noun/verb) =====
  'project': {
    noun: [
      { en: 'Our science project about plants won first prize.', cn: '我们关于植物的科学项目获得了一等奖。' },
      { en: 'The construction project will take two years to complete.', cn: '这个建筑项目需要两年时间完成。' }
    ],
    verb: [
      { en: 'The machine projects images onto the large screen.', cn: '机器将图像投射到大屏幕上。' }
    ]
  },

  // ===== pump (noun/verb) =====
  'pump': {
    noun: [
      { en: 'The water pump broke down, so we had no water for a day.', cn: '水泵坏了，所以我们一天没有水。' }
    ],
    verb: [
      { en: 'We had to pump air into the flat bicycle tire.', cn: '我们不得不给瘪了的自行车轮胎打气。' },
      { en: 'The heart pumps blood through the body continuously.', cn: '心脏持续不断地将血液泵送到全身。' }
    ]
  },

  // ===== pull (verb/noun) =====
  'pull': {
    verb: [
      { en: 'Please pull the door open; it will not push.', cn: '请把门拉开，不要推。' },
      { en: 'The magnet can pull small metal objects toward it.', cn: '磁铁可以把小金属物体吸向它。' }
    ],
    noun: [
      { en: 'Give the rope a strong pull to start the machine.', cn: '用力拉一下绳子来启动机器。' }
    ]
  },

  // ===== relative (noun/adj) =====
  'relative': {
    noun: [
      { en: 'Most of my relatives live in the countryside.', cn: '我的大多数亲戚住在乡下。' }
    ],
    adj: [
      { en: 'The relative speed of the two trains was hard to measure.', cn: '两列火车的相对速度很难测量。' }
    ]
  },

  // ===== right (adj/adv/noun) =====
  'right': {
    adj: [
      { en: 'You are right; the answer is forty-two.', cn: '你说得对，答案是四十二。' },
      { en: 'Please use your right hand to hold the pen.', cn: '请用右手拿笔。' }
    ],
    adv: [
      { en: 'I will be right back after buying some milk.', cn: '我买完牛奶马上就回来。' },
      { en: 'Turn right at the traffic lights.', cn: '在红绿灯处向右转。' }
    ],
    noun: [
      { en: 'Everyone has the right to a good education.', cn: '每个人都有接受良好教育的权利。' }
    ]
  },

  // ===== safe (adj/noun) =====
  'safe': {
    adj: [
      { en: 'Please keep your valuables in a safe place.', cn: '请把你的贵重物品放在安全的地方。' },
      { en: 'The children were safe inside the house during the storm.', cn: '暴风雨期间，孩子们在屋里是安全的。' }
    ],
    noun: [
      { en: 'Grandpa keeps his important papers in a small safe.', cn: '爷爷把他的重要文件放在一个小保险箱里。' }
    ]
  },

  // ===== secret (noun/adj) =====
  'secret': {
    noun: [
      { en: 'Can you keep a secret? I have not told anyone else.', cn: '你能保守秘密吗？我没有告诉过其他任何人。' },
      { en: 'The recipe for this soup is a family secret.', cn: '这道汤的食谱是一个家族秘密。' }
    ],
    adj: [
      { en: 'They had a secret meeting in the old cabin.', cn: '他们在旧木屋里开了一个秘密会议。' }
    ]
  },

  // ===== separate (adj/verb) =====
  'separate': {
    adj: [
      { en: 'Please keep the raw meat separate from the vegetables.', cn: '请把生肉和蔬菜分开存放。' }
    ],
    verb: [
      { en: 'The teacher asked us to separate into groups of four.', cn: '老师让我们分成四人一组。' },
      { en: 'The river separates the two small villages.', cn: '这条河把两个小村庄分隔开来。' }
    ]
  },

  // ===== solve (verb) =====
  'solve': {
    verb: [
      { en: 'Can you help me solve this difficult math problem?', cn: '你能帮我解这道难题吗？' },
      { en: 'Scientists are working hard to solve the mystery.', cn: '科学家们正在努力解开这个谜团。' }
    ]
  },

  // ===== soon (adv) =====
  'soon': {
    adv: [
      { en: 'The summer holiday will begin very soon.', cn: '暑假很快就要开始了。' },
      { en: 'Please reply to my email as soon as possible.', cn: '请尽快回复我的邮件。' }
    ]
  },

  // ===== standard (noun/adj) =====
  'standard': {
    noun: [
      { en: 'The hotel offers high standard service to all guests.', cn: '这家酒店为所有客人提供高标准的服务。' },
      { en: 'Gold is the standard by which other metals are measured.', cn: '黄金是衡量其他金属的标准。' }
    ],
    adj: [
      { en: 'This is the standard size for a school desk.', cn: '这是课桌的标准尺寸。' }
    ]
  },

  // ===== stay (verb/noun) =====
  'stay': {
    verb: [
      { en: 'I prefer to stay home and read books on rainy days.', cn: '下雨天我喜欢待在家里看书。' },
      { en: 'Please stay calm and do not panic.', cn: '请保持冷静，不要惊慌。' }
    ],
    noun: [
      { en: 'We enjoyed our stay at the seaside hotel very much.', cn: '我们在海边酒店的住宿非常愉快。' }
    ]
  },

  // ===== tap (noun/verb) =====
  'tap': {
    noun: [
      { en: 'Please turn off the tap when you finish washing your hands.', cn: '洗完手后请关掉水龙头。' }
    ],
    verb: [
      { en: 'She tapped me on the shoulder to get my attention.', cn: '她轻轻拍了拍我的肩膀以引起我的注意。' },
      { en: 'The dancer tapped her feet to the rhythm of the music.', cn: '舞者随着音乐的节奏轻敲她的脚。' }
    ]
  },

  // ===== teach (verb/noun) =====
  'teach': {
    verb: [
      { en: 'My mother taught me how to cook when I was twelve.', cn: '我妈妈在我十二岁时教我做饭。' },
      { en: 'Good teachers teach students how to think, not just what to think.', cn: '好老师教学生如何思考，而不仅仅是思考什么。' }
    ]
  },

  // ===== tomorrow (adv/noun) =====
  'tomorrow': {
    adv: [
      { en: 'I will finish the report tomorrow.', cn: '我明天会完成报告。' }
    ],
    noun: [
      { en: 'Tomorrow is another day full of new opportunities.', cn: '明天是充满新机遇的又一天。' }
    ]
  },

  // ===== value (noun/verb) =====
  'value': {
    noun: [
      { en: 'The value of this old painting is estimated at one million dollars.', cn: '这幅旧画的价值估计为一百万美元。' },
      { en: 'Honesty is a value that my parents taught me.', cn: '诚实是我父母教给我的价值观。' }
    ],
    verb: [
      { en: 'I truly value your friendship and support.', cn: '我非常珍视你的友谊和支持。' },
      { en: 'You should value your time and use it wisely.', cn: '你应该珍惜时间并明智地使用它。' }
    ]
  },

  // ===== village (noun) =====
  'village': {
    noun: [
      { en: 'The small village has only two hundred residents.', cn: '这个小村庄只有两百名居民。' },
      { en: 'Life in the mountain village is peaceful and simple.', cn: '山村里的生活宁静而简单。' }
    ]
  },

  // ===== weight (noun/verb) =====
  'weight': {
    noun: [
      { en: 'The weight of the elephant can reach several tons.', cn: '大象的体重可以达到数吨。' },
      { en: 'Carrying too much weight can hurt your back.', cn: '背负太多重量会伤害你的背部。' }
    ],
    verb: [
      { en: 'Please weight the flour carefully before adding it.', cn: '请在加入之前仔细称量面粉的重量。' }
    ]
  },

  // ===== wrong (adj/adv) =====
  'wrong': {
    adj: [
      { en: 'I am sorry, but your answer is wrong this time.', cn: '抱歉，但这次你的答案是错的。' },
      { en: 'There is nothing wrong with asking for help.', cn: '寻求帮助没有什么不对。' }
    ],
    adv: [
      { en: 'Something has gone wrong with my computer.', cn: '我的电脑出了点问题。' }
    ]
  }

};

module.exports = { highQualityExamples };
