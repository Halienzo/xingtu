/**
 * 高质量手工例句库 - Batch 3: 第251-330高频词
 * 按词性分组：单性词用数组，多性词用对象 {noun:[], verb:[], adj:[]}
 */

const highQualityExamples = {
  // ===== 单性词：物品类 =====
  'fork': [
    { en: 'She twirled spaghetti around her fork with practiced ease.', cn: '她熟练地用叉子卷起了意大利面。' },
    { en: 'The farmer used a pitchfork to move hay into the barn.', cn: '农民用干草叉把干草搬进谷仓。' }
  ],
  'bell': [
    { en: 'The church bell rang twelve times to mark the noon hour.', cn: '教堂的钟声响了十二下，标志着正午时分。' },
    { en: 'A small brass bell hung above the door of the old shop.', cn: '一扇小铜铃挂在老店的门上方。' }
  ],
  'umbrella': [
    { en: 'I shared my umbrella with a stranger who had forgotten hers.', cn: '我和一个忘记带伞的陌生人共用了一把伞。' },
    { en: 'The colorful umbrella stood out against the grey rainy sky.', cn: '彩色的雨伞在灰蒙蒙的雨天中格外显眼。' }
  ],
  'chopsticks': [
    { en: 'Grandma taught me how to hold chopsticks when I was five.', cn: '奶奶在我五岁时教我如何拿筷子。' },
    { en: 'He picked up a single grain of rice with his chopsticks.', cn: '他用筷子夹起了一粒米。' }
  ],
  'sand': [
    { en: 'The children built a castle from wet sand at the water\'s edge.', cn: '孩子们在水边用湿沙子堆了一座城堡。' },
    { en: 'Hot sand burned my feet as I ran toward the cool ocean water.', cn: '我跑向凉爽的海水时，热沙烫着我的脚。' }
  ],

  // ===== 多性词：water (noun/verb) =====
  'water': {
    noun: [
      { en: 'Crystal clear water flowed down from the mountain spring.', cn: '清澈的水从山泉流下来。' },
      { en: 'The flowers need more water during the hot summer days.', cn: '炎热的夏日里，花儿需要更多的水。' },
      { en: 'A glass of cold water refreshed me after the long run.', cn: '长跑之后，一杯凉水让我精神一振。' }
    ],
    verb: [
      { en: 'Please water the plants on the balcony every morning.', cn: '请每天早上给阳台上的植物浇水。' },
      { en: 'Grandpa waters the vegetable garden before sunrise.', cn: '爷爷在日出前给菜园浇水。' },
      { en: 'We need to water the lawn more often in this dry weather.', cn: '在这样干燥的天气里，我们需要更频繁地给草坪浇水。' }
    ]
  },

  // ===== 多性词：close (adj/adv/verb) =====
  'close': {
    adj: [
      { en: 'The two sisters are very close and share all their secrets.', cn: '这两姐妹非常亲密，分享彼此所有的秘密。' },
      { en: 'Our school is close to the river, so we often walk there.', cn: '我们的学校离河边很近，所以我们经常去那里散步。' }
    ],
    adv: [
      { en: 'Please sit close to me so I can help you with the lesson.', cn: '请坐得离我近一点，这样我可以帮你学习。' },
      { en: 'The bird flew close to the window before landing on the sill.', cn: '鸟儿飞近窗户，然后落在了窗台上。' }
    ],
    verb: [
      { en: 'Please close the door quietly so you do not wake the baby.', cn: '请轻轻关门，不要吵醒宝宝。' },
      { en: 'The old shop will close down after fifty years of business.', cn: '这家老店经营五十年后即将关门。' },
      { en: 'She closed her eyes and listened to the soft music.', cn: '她闭上眼睛，聆听着轻柔的音乐。' }
    ]
  },

  // ===== 多性词：bear (noun/verb) =====
  'bear': {
    noun: [
      { en: 'A large brown bear caught a salmon in the rushing river.', cn: '一只大棕熊在湍急的河流中抓住了一条鲑鱼。' },
      { en: 'The teddy bear sat on the child\'s bed every night.', cn: '泰迪熊每晚都坐在孩子的床上。' }
    ],
    verb: [
      { en: 'I cannot bear the loud noise from the construction site.', cn: '我无法忍受建筑工地传来的巨大噪音。' },
      { en: 'The tree trunk could bear the weight of three children climbing on it.', cn: '树干能承受三个孩子爬在上面的重量。' },
      { en: 'She bore the pain bravely and never complained.', cn: '她勇敢地忍受着疼痛，从不抱怨。' }
    ]
  },

  // ===== 多性词：look (noun/verb) =====
  'look': {
    noun: [
      { en: 'I like the look of this old house with its red roof.', cn: '我喜欢这座红顶老房子的外观。' },
      { en: 'She gave me a surprised look when I told her the news.', cn: '当我告诉她这个消息时，她惊讶地看了我一眼。' }
    ],
    verb: [
      { en: 'Look at that beautiful sunset over the western mountains.', cn: '看那西山上的美丽日落。' },
      { en: 'She looked through the window at the falling snow.', cn: '她透过窗户看着飘落的雪花。' },
      { en: 'The cat looked up at the bird in the tall tree.', cn: '猫抬头看着高树上的鸟。' }
    ]
  },

  // ===== 多性词：cross (noun/verb/prep/adv) =====
  'cross': {
    noun: [
      { en: 'The Red Cross helped thousands of people after the earthquake.', cn: '红十字会帮助了地震后的数千人。' },
      { en: 'She wore a small gold cross around her neck.', cn: '她脖子上戴着一个小小的金十字架。' }
    ],
    verb: [
      { en: 'We had to cross the busy street carefully at the zebra crossing.', cn: '我们不得不在斑马线处小心地穿过繁忙的街道。' },
      { en: 'The old stone bridge crosses the river at its narrowest point.', cn: '古老的石桥在河流最窄处横跨两岸。' },
      { en: 'Do not cross the road without looking both ways.', cn: '过马路前不看两边就不要横穿。' }
    ]
  },

  // ===== 多性词：shine (noun/verb) =====
  'shine': {
    noun: [
      { en: 'The polish gave the old table a beautiful shine.', cn: '抛光剂让旧桌子发出了美丽的光泽。' },
      { en: 'The shine of the full moon lit up the quiet village.', cn: '满月的光辉照亮了宁静的村庄。' }
    ],
    verb: [
      { en: 'The full moon shone brightly over the quiet lake.', cn: '满月明亮地照耀着宁静的湖面。' },
      { en: 'Her eyes shone with excitement when she opened the gift.', cn: '她打开礼物时，眼睛里闪烁着兴奋的光芒。' },
      { en: 'The polished floor shone like a mirror after cleaning.', cn: '擦过的地板像镜子一样闪闪发亮。' }
    ]
  },

  // ===== 多性词：act (noun/verb) =====
  'act': {
    noun: [
      { en: 'The first act of the play was full of mystery and suspense.', cn: '这部剧的第一幕充满了神秘和悬念。' },
      { en: 'Helping the old lady cross the street was a kind act.', cn: '帮助老奶奶过马路是一个善良的举动。' }
    ],
    verb: [
      { en: 'The actor had to act like a brave knight in the school play.', cn: '这位演员在学校话剧中必须扮演一位勇敢的骑士。' },
      { en: 'We must act quickly to help those affected by the flood.', cn: '我们必须迅速行动来帮助那些受洪水影响的人。' },
      { en: 'She always acts so politely around her grandparents.', cn: '她在祖父母面前总是表现得很有礼貌。' }
    ]
  },

  // ===== 多性词：awake (adj/verb) =====
  'awake': {
    adj: [
      { en: 'I lay awake for hours, thinking about tomorrow\'s exam.', cn: '我躺了几个小时睡不着，想着明天的考试。' },
      { en: 'The baby was wide awake at midnight, playing with her toys.', cn: '宝宝在午夜时分完全醒着，玩着她的玩具。' }
    ],
    verb: [
      { en: 'The loud thunder awoke everyone in the house.', cn: '巨大的雷声把房子里所有人都吵醒了。' },
      { en: 'The smell of fresh coffee awoke my sleepy mind.', cn: '新鲜咖啡的香气唤醒了我昏睡的头脑。' }
    ]
  },

  // ===== 多性词：good (adj/noun) =====
  'good': {
    adj: [
      { en: 'A good friend is always there when you need help.', cn: '好朋友总是在你需要帮助时出现。' },
      { en: 'This is a good place to watch the sunset over the river.', cn: '这是观赏河上日落的好地方。' },
      { en: 'Grandma makes good dumplings that everyone loves.', cn: '奶奶包的饺子很好吃，大家都喜欢。' }
    ],
    noun: [
      { en: 'The good of the community matters more than individual profit.', cn: '社区的公共利益比个人利益更重要。' },
      { en: 'He devoted his life to doing good for others.', cn: '他毕生致力于为他人做好事。' }
    ]
  },

  // ===== 单性词：fat 已在两词性上覆盖，但用新格式更清晰 =====
  'fat': {
    adj: [
      { en: 'The fat cat slept all day on the warm kitchen floor.', cn: '那只肥猫整天睡在温暖的厨房地板上。' }
    ],
    noun: [
      { en: 'The chef trimmed the fat from the meat before cooking it.', cn: '厨师烹饪前把肉上的脂肪修剪掉了。' }
    ]
  },

  // ===== 多性词：list (noun/verb) =====
  'list': {
    noun: [
      { en: 'I made a shopping list before going to the supermarket.', cn: '我去超市之前列了一张购物清单。' },
      { en: 'Her name was at the top of the honor list this semester.', cn: '她的名字在本学期荣誉名单的最上方。' }
    ],
    verb: [
      { en: 'Please list all the items you need for the camping trip.', cn: '请列出露营旅行你需要的所有物品。' },
      { en: 'The guidebook lists the best restaurants in the old town.', cn: '这本指南列出了老城里最好的餐厅。' }
    ]
  },

  // ===== 多性词：nine (num/noun) =====
  'nine': {
    num: [
      { en: 'I counted nine birds sitting on the telephone wire.', cn: '我数了数，有九只鸟停在电话线上。' }
    ],
    noun: [
      { en: 'The cat has nine lives, or so the old saying goes.', cn: '俗话说猫有九条命。' }
    ]
  },

  // ===== 多性词：red (adj/noun) =====
  'red': {
    adj: [
      { en: 'The red lanterns lit up the street during the Spring Festival.', cn: '春节期间，红灯笼照亮了街道。' },
      { en: 'She wore a red ribbon in her hair for the school performance.', cn: '她在学校演出时头发上系了一条红丝带。' }
    ],
    noun: [
      { en: 'The artist mixed red and blue to create a beautiful purple.', cn: '艺术家把红色和蓝色混合，调出了一种漂亮的紫色。' },
      { en: 'Her favorite colour is red because it reminds her of roses.', cn: '她最喜欢的颜色是红色，因为它让她想起玫瑰。' }
    ]
  },

  // ===== 多性词：some (adj/pron) =====
  'some': {
    adj: [
      { en: 'Some students stayed behind to help clean the classroom.', cn: '一些学生留下来帮忙打扫教室。' },
      { en: 'We need some fresh air after staying indoors all day.', cn: '在屋里待了一整天后，我们需要一些新鲜空气。' }
    ],
    pron: [
      { en: 'Would you like some tea while we wait for the rain to stop?', cn: '我们等雨停的时候，你想喝点茶吗？' },
      { en: 'If you need money, I can lend you some.', cn: '如果你需要钱，我可以借你一些。' }
    ]
  },

  // ===== 多性词：her (pron/noun) =====
  'her': {
    pron: [
      { en: 'I gave the book back to her after finishing reading it.', cn: '我读完后把书还给了她。' },
      { en: 'The teacher praised her for her excellent essay.', cn: '老师表扬了她出色的作文。' }
    ],
    noun: [
      { en: 'The ship sank to the bottom of the sea, and we mourned for her.', cn: '船沉到了海底，我们为她哀悼。' }
    ]
  },

  // ===== 多性词：round (adj/adv/prep) =====
  'round': {
    adj: [
      { en: 'The Earth is round, even though it looks flat from where we stand.', cn: '地球是圆的，尽管从我们所站的地方看起来是平的。' }
    ],
    prep: [
      { en: 'We walked round the lake, enjoying the fresh morning air.', cn: '我们绕着湖走，享受着清新的晨风。' },
      { en: 'The children sat round the campfire, singing songs.', cn: '孩子们围坐在篝火旁唱歌。' }
    ]
  },

  // ===== 多性词：today (noun/adv) =====
  'today': {
    noun: [
      { en: 'Today is the first day of the rest of your life.', cn: '今天是你余生的第一天。' },
      { en: 'I will never forget today because it was my graduation.', cn: '我永远不会忘记今天，因为那是我的毕业典礼。' }
    ],
    adv: [
      { en: 'The weather today is perfect for a picnic in the park.', cn: '今天的天气非常适合在公园野餐。' },
      { en: 'Are you free today to help me move the furniture?', cn: '你今天有空帮我搬家具吗？' }
    ]
  },

  // ===== 多性词：television (noun/verb) =====
  'television': {
    noun: [
      { en: 'The whole family watched television together after dinner.', cn: '全家人晚饭后一起看电视。' },
      { en: 'Grandpa fell asleep in his chair while watching television.', cn: '爷爷看电视时在椅子上睡着了。' }
    ],
    verb: [
      { en: 'The event was televised live to millions of viewers around the world.', cn: '这一活动通过电视向全世界数百万观众直播。' }
    ]
  },

  // ===== 多性词：mine (noun/pron) =====
  'mine': {
    noun: [
      { en: 'The old gold mine has been closed for over fifty years.', cn: '那座老金矿已经关闭了五十多年。' }
    ],
    pron: [
      { en: 'This book is mine, but you can borrow it if you like.', cn: '这本书是我的，但如果你喜欢可以借走。' },
      { en: 'That blue bicycle over there is hers, not mine.', cn: '那边那辆蓝色自行车是她的，不是我的。' }
    ]
  },

  // ===== 多性词：button (noun/verb) =====
  'button': {
    noun: [
      { en: 'I sewed a new button onto my shirt where the old one had fallen off.', cn: '我在衬衫旧纽扣脱落的地方缝了一颗新纽扣。' },
      { en: 'Press the red button to start the machine.', cn: '按下红色按钮启动机器。' }
    ],
    verb: [
      { en: 'Please button up your coat before going out in the cold.', cn: '天冷出去前请把外套纽扣扣好。' },
      { en: 'She quickly buttoned her shirt and ran to answer the door.', cn: '她迅速扣好衬衫，跑去开门。' }
    ]
  },

  // ===== 多性词：circle (noun/verb) =====
  'circle': {
    noun: [
      { en: 'The children sat in a circle on the grass, playing a game.', cn: '孩子们围成一圈坐在草地上玩游戏。' },
      { en: 'Draw a circle around the correct answer on the test paper.', cn: '在试卷上正确答案周围画一个圈。' }
    ],
    verb: [
      { en: 'The vultures began to circle high above the desert.', cn: '秃鹫开始在沙漠上空盘旋。' },
      { en: 'We circled the building three times before finding the entrance.', cn: '我们围着大楼转了三圈才找到入口。' }
    ]
  },

  // ===== 多性词：how (adv/verb) =====
  'how': {
    adv: [
      { en: 'How did you learn to play the piano so beautifully?', cn: '你是怎么学会把钢琴弹得这么动听的？' },
      { en: 'I do not know how to solve this math problem.', cn: '我不知道怎么解这道数学题。' }
    ],
    verb: [
      { en: 'The wind howled through the narrow streets all night long.', cn: '风整夜在狭窄的街道上呼啸。' }
    ]
  },

  // ===== 多性词：purple (adj/noun) =====
  'purple': {
    adj: [
      { en: 'She wore a purple scarf that matched the flowers in her hair.', cn: '她戴了一条紫色围巾，和她头发上的花很配。' }
    ],
    noun: [
      { en: 'The sunset painted the clouds in shades of purple and gold.', cn: '日落把云朵染成了紫色和金色。' },
      { en: 'Purple is often associated with royalty and wisdom.', cn: '紫色常与皇室和智慧联系在一起。' }
    ]
  },

  // ===== 多性词：rise (verb/noun) =====
  'rise': {
    verb: [
      { en: 'The hot air balloon began to rise slowly into the clear sky.', cn: '热气球开始缓缓升入晴朗的天空。' },
      { en: 'Prices continue to rise every year, making life more expensive.', cn: '物价每年持续上涨，让生活变得更加昂贵。' }
    ],
    noun: [
      { en: 'The rise of the sun painted the mountains in warm gold.', cn: '太阳的升起把群山染成了温暖的金色。' },
      { en: 'There has been a sharp rise in temperature this week.', cn: '本周气温急剧上升。' }
    ]
  },

  // ===== 多性词：thirteen (num/noun) =====
  'thirteen': {
    num: [
      { en: 'There are thirteen students in our school\'s English club.', cn: '我们学校的英语俱乐部有十三名学生。' }
    ],
    noun: [
      { en: 'In many Western countries, thirteen is considered an unlucky number.', cn: '在许多西方国家，十三被认为是不吉利的数字。' }
    ]
  },

  // ===== 多性词：eleven (num/noun) =====
  'eleven': {
    num: [
      { en: 'The clock struck eleven as I finished my homework last night.', cn: '昨晚我做完作业时，钟敲了十一点。' }
    ],
    noun: [
      { en: 'Eleven players form a football team on the field.', cn: '十一名球员组成一支足球队在场上比赛。' }
    ]
  },

  // ===== 多性词：twelve (num/noun) =====
  'twelve': {
    num: [
      { en: 'There are twelve months in a year, each with its own beauty.', cn: '一年有十二个月，每个月都有各自的美。' }
    ],
    noun: [
      { en: 'The clock in the tower rings twelve times at noon and midnight.', cn: '塔上的钟在正午和午夜各响十二下。' }
    ]
  },

  // ===== 单性词（继续） =====
  'glass': [
    { en: 'Sunlight streamed through the stained glass window, painting rainbows on the floor.', cn: '阳光透过彩色玻璃窗洒进来，在地板上画出了彩虹。' },
    { en: 'Be careful not to break the glass when washing the window.', cn: '擦窗户时小心别打碎玻璃。' }
  ],
  'coke': [
    { en: 'He opened a can of ice-cold coke on the hot summer afternoon.', cn: '他在炎热的夏日下午打开了一罐冰凉的可乐。' },
    { en: 'The bubbles in the coke tickled my nose when I drank too fast.', cn: '我喝得太快时，可乐里的气泡让我鼻子发痒。' }
  ],
  'hot dog': [
    { en: 'The street vendor grilled hot dogs with onions and mustard.', cn: '街头小贩烤着热狗，配上了洋葱和芥末。' },
    { en: 'I bought a hot dog from the cart outside the stadium before the game.', cn: '比赛前，我在体育场外的推车上买了一个热狗。' }
  ],
  'flour': [
    { en: 'White flour dusted the kitchen counter as Mom kneaded the dough.', cn: '妈妈揉面团时，白色的面粉撒满了厨房台面。' },
    { en: 'We need three cups of flour to make this birthday cake.', cn: '我们做这个生日蛋糕需要三杯面粉。' }
  ],
  'sandwich': [
    { en: 'Mom packed a turkey sandwich in my lunch box every morning.', cn: '妈妈每天早上都在我的午餐盒里装一个火鸡三明治。' },
    { en: 'He cut the sandwich into neat triangles for the picnic.', cn: '他把三明治切成整齐的三角形，带去野餐。' }
  ],
  'pineapple': [
    { en: 'The sweet smell of ripe pineapple filled the tropical market.', cn: '成熟菠萝的甜香弥漫了整个热带市场。' },
    { en: 'She carefully cut the spiky skin off the fresh pineapple.', cn: '她小心地把新鲜菠萝带刺的皮削掉。' }
  ],
  'fisherman': [
    { en: 'The fisherman mended his nets on the dock as the sun rose.', cn: '日出时，渔民在码头上修补着他的渔网。' },
    { en: 'A local fisherman sold us fresh shrimp straight from his boat.', cn: '一位当地渔民直接从船上卖给我们新鲜虾。' }
  ],
  'milkman': [
    { en: 'The milkman delivered bottles of fresh milk to every door at dawn.', cn: '送奶工黎明时分把一瓶瓶新鲜牛奶送到每家每户。' },
    { en: 'We left an empty bottle by the door for the milkman to replace.', cn: '我们在门边放了一个空瓶子，让送奶工来换。' }
  ],
  'grandfather': [
    { en: 'My grandfather told stories of the old days by the fireplace.', cn: '爷爷在壁炉旁讲述着往昔的故事。' },
    { en: 'Grandfather woke up at five every morning to tend his garden.', cn: '爷爷每天早上五点起床照料他的花园。' }
  ],
  'grandmother': [
    { en: 'Grandmother knitted a warm scarf for me before winter came.', cn: '冬天来临前，奶奶给我织了一条温暖的围巾。' },
    { en: 'My grandmother\'s cooking is the best I have ever tasted.', cn: '奶奶做的饭是我吃过的最好吃的。' }
  ],
  'boy': [
    { en: 'A young boy flew a red kite on the windy hilltop.', cn: '一个小男孩在多风的山顶上放着红色的风筝。' },
    { en: 'The boy carefully carried the injured bird home in his hands.', cn: '男孩小心地把受伤的鸟儿捧在手里带回家。' }
  ],
  'man': [
    { en: 'An old man sat on the park bench feeding pigeons every afternoon.', cn: '一位老人每天下午坐在公园长椅上喂鸽子。' },
    { en: 'The man at the bookstore recommended a wonderful novel to me.', cn: '书店里的那位男士向我推荐了一本精彩的小说。' }
  ],
  'policeman': [
    { en: 'The policeman helped the lost child find her parents in the crowd.', cn: '警察帮助迷路的孩子在人群中找到了父母。' },
    { en: 'A friendly policeman directed traffic during the morning rush hour.', cn: '一位友善的警察在早高峰期间指挥交通。' }
  ],
  'postman': [
    { en: 'The postman delivers letters on his bicycle even on rainy days.', cn: '邮递员即使在雨天也骑着自行车送信。' },
    { en: 'We waved at the postman as he passed by our house.', cn: '邮递员经过我们家时，我们向他挥手致意。' }
  ],
  'shop assistant': [
    { en: 'The shop assistant patiently helped me choose the right size.', cn: '售货员耐心地帮我挑选了合适的尺码。' },
    { en: 'A kind shop assistant wrapped the gift in beautiful paper.', cn: '一位善良的售货员用漂亮的纸把礼物包好。' }
  ],
  'family': [
    { en: 'My whole family gathered for the Spring Festival reunion dinner.', cn: '我们全家人聚在一起吃春节团圆饭。' },
    { en: 'The family photo on the wall was taken ten years ago.', cn: '墙上的全家福是十年前拍的。' }
  ],
  'Shanghai': [
    { en: 'Shanghai\'s skyline glowed beautifully against the night sky.', cn: '上海的天际线在夜空中美丽地闪耀着。' },
    { en: 'We took the high-speed train to Shanghai for the summer holiday.', cn: '我们乘高铁去上海过暑假。' }
  ],
  'fountain': [
    { en: 'Coins glittered at the bottom of the wishing fountain.', cn: '许愿池底部的硬币闪闪发光。' },
    { en: 'Water sprayed from the fountain in graceful arcs across the plaza.', cn: '水从喷泉中喷出，在广场上空划出优美的弧线。' }
  ],
  'pond': [
    { en: 'Frogs croaked loudly around the village pond at dusk.', cn: '黄昏时分，青蛙在村边池塘周围大声呱呱叫。' },
    { en: 'Golden fish swam lazily beneath the lily pads in the pond.', cn: '金鱼在池塘的荷叶下懒洋洋地游动。' }
  ],
  'nest': [
    { en: 'The bird built its nest from twigs and feathers in the apple tree.', cn: '鸟儿用树枝和羽毛在苹果树上筑了巢。' },
    { en: 'We found an empty bird\'s nest fallen on the ground after the storm.', cn: '暴风雨后，我们在地上发现了一个掉落的空巢。' }
  ],
  'fire': [
    { en: 'The campers sat around the crackling fire telling ghost stories.', cn: '露营者们围坐在噼啪作响的篝火旁讲鬼故事。' },
    { en: 'The fire in the old building was put out by brave firefighters.', cn: '老楼里的大火被勇敢的消防员扑灭了。' }
  ],
  'season': [
    { en: 'My favorite season is autumn when the leaves turn golden.', cn: '我最喜欢的季节是秋天，那时树叶变成金黄色。' },
    { en: 'Each season brings different fruits and vegetables to the market.', cn: '每个季节都给市场带来不同的水果和蔬菜。' }
  ],
  'rainbow': [
    { en: 'A double rainbow appeared after the afternoon thunderstorm.', cn: '午后雷雨后出现了一道双彩虹。' },
    { en: 'The children pointed at the rainbow and made wishes.', cn: '孩子们指着彩虹许愿。' }
  ],
  'temperature': [
    { en: 'The temperature dropped sharply after sunset in the mountains.', cn: '山区日落后气温急剧下降。' },
    { en: 'I checked the temperature before deciding what to wear.', cn: '我决定穿什么之前先查看了温度。' }
  ],
  'warm': [
    { en: 'The warm sunlight melted the frost on the grass.', cn: '温暖的阳光融化了草地上的霜。' },
    { en: 'She wrapped herself in a warm blanket by the fireplace.', cn: '她在壁炉旁用温暖的毯子裹住了自己。' }
  ],
  'wet': [
    { en: 'My clothes were completely wet after walking home in the rain.', cn: '冒雨走回家后，我的衣服全湿了。' },
    { en: 'The dog shook its wet fur, spraying water everywhere.', cn: '狗抖了抖湿漉漉的皮毛，把水溅得到处都是。' }
  ],
  'see': [
    { en: 'From the hilltop, we could see the entire village spread below.', cn: '从山顶上，我们可以看到整个村庄铺展在下方。' },
    { en: 'I was happy to see my old friend at the train station.', cn: '在火车站看到老朋友，我很高兴。' }
  ],
  'ask': [
    { en: 'Do not be afraid to ask questions when you do not understand.', cn: '不懂的时候不要害怕提问。' },
    { en: 'I asked the shopkeeper where I could find the nearest post office.', cn: '我问店主最近的邮局在哪里。' }
  ],
  'save': [
    { en: 'The lifeguard dove into the water to save the drowning child.', cn: '救生员跳入水中去救溺水的孩子。' },
    { en: 'I save my pocket money to buy books I really want.', cn: '我把零花钱存起来买真正想要的书。' }
  ],
  'build': [
    { en: 'The workers worked day and night to build the new bridge.', cn: '工人们日夜工作来建造新桥。' },
    { en: 'Children love to build sandcastles on the beach.', cn: '孩子们喜欢在沙滩上堆沙堡。' }
  ],
  'roll': {
    verb: [
      { en: 'The ball rolled down the hill and landed in the stream.', cn: '球滚下山坡，掉进了小溪里。' },
      { en: 'Grandma taught me how to roll dough for homemade dumplings.', cn: '奶奶教我如何擀饺子皮。' }
    ],
    noun: [
      { en: 'She ate a fresh bread roll with butter for breakfast.', cn: '她早餐吃了一个涂黄油的新鲜面包卷。' },
      { en: 'I wrote my name on the attendance roll at the beginning of class.', cn: '上课开始时我在点名册上写下了自己的名字。' }
    ]
  },
  'score': {
    noun: [
      { en: 'The final score was three to two in favor of our team.', cn: '最终比分是三比二，我们队赢了。' },
      { en: 'What was your score on the math test?', cn: '你数学考试得了多少分？' }
    ],
    verb: [
      { en: 'He kicked the ball hard and scored the winning goal.', cn: '他用力踢球，射进了制胜一球。' },
      { en: 'She scored full marks in the English listening exam.', cn: '她在英语听力考试中得了满分。' }
    ]
  },
  'drill': [
    { en: 'The dentist used a small drill to fix the cavity in my tooth.', cn: '牙医用小钻头修补了我牙齿上的蛀洞。' },
    { en: 'Firefighters practice rescue drills every month.', cn: '消防员每月都进行救援演练。' }
  ],
  'nice': [
    { en: 'It was nice of you to help carry my heavy bags.', cn: '你帮我提沉重的袋子，真是太好了。' },
    { en: 'We had a nice picnic by the lake on Saturday afternoon.', cn: '周六下午我们在湖边进行了一次愉快的野餐。' }
  ],
  'big': [
    { en: 'A big dog guarded the entrance to the farmhouse.', cn: '一只大狗看守着农舍的入口。' },
    { en: 'My little sister has big dreams of becoming an astronaut.', cn: '我的小妹妹有着成为宇航员的大梦想。' }
  ],
  'small': [
    { en: 'A small stream ran through the back of our garden.', cn: '一条小溪流过我们花园的后方。' },
    { en: 'Even small acts of kindness can make a big difference.', cn: '即使是小小的善举也能带来巨大的改变。' }
  ],
  'poor': {
    adj: [
      { en: 'The poor stray cat looked hungry and cold on the street.', cn: '那只可怜的流浪猫在街上看起来又饿又冷。' }
    ],
    noun: [
      { en: 'The church collects money to help the poor in the community.', cn: '教堂募集钱来帮助社区里的穷人。' }
    ]
  },
  'quiet': [
    { en: 'The library was so quiet that you could hear a pin drop.', cn: '图书馆里安静得连一根针掉在地上都能听见。' },
    { en: 'We walked through the quiet forest, listening to bird songs.', cn: '我们穿过安静的森林，聆听着鸟儿的歌声。' }
  ],
  'rough': [
    { en: 'The rough surface of the stone wall scratched my hand.', cn: '石墙粗糙的表面划伤了我的手。' },
    { en: 'Sailors faced rough seas during the winter voyage.', cn: '水手们在冬季航行中面对着汹涌的大海。' }
  ],
  'sharp': [
    { en: 'Be careful, that knife is very sharp.', cn: '小心，那把刀非常锋利。' },
    { en: 'The eagle has sharp eyes that can spot prey from high above.', cn: '鹰有锐利的眼睛，能从高空发现猎物。' }
  ],
  'super': {
    adj: [
      { en: 'The super moon looked enormous as it rose above the horizon.', cn: '超级月亮从地平线升起时看起来巨大无比。' }
    ],
    adv: [
      { en: 'We had a super time at the school\'s annual sports day.', cn: '我们在学校一年一度的运动会上玩得很开心。' }
    ]
  },
  'smooth': {
    adj: [
      { en: 'The smooth surface of the lake reflected the stars perfectly.', cn: '光滑的湖面完美地倒映着星星。' },
      { en: 'Smooth pebbles lined the bottom of the clear stream.', cn: '光滑的鹅卵石铺满了清澈溪流的底部。' }
    ],
    verb: [
      { en: 'She smoothed the wrinkles out of her dress before the party.', cn: '她在聚会前把裙子上的皱褶抚平。' }
    ]
  },
  'goodbye': [
    { en: 'We waved goodbye as the train slowly pulled away from the station.', cn: '火车缓缓驶离车站时，我们挥手告别。' },
    { en: 'It is never easy to say goodbye to a dear friend.', cn: '和亲爱的朋友告别从来都不是容易的事。' }
  ],
  'very': [
    { en: 'The mountain path was very steep and difficult to climb.', cn: '山路非常陡峭，很难攀爬。' },
    { en: 'I am very grateful for your help during the difficult time.', cn: '我非常感谢你在困难时期给予的帮助。' }
  ],
  'paper': [
    { en: 'I folded the paper into a crane and placed it on her desk.', cn: '我把纸折成一只鹤，放在她的书桌上。' },
    { en: 'The old paper yellowed with age in the attic box.', cn: '旧纸在阁楼箱子里因年代久远而变黄了。' }
  ],
  'picture': [
    { en: 'The old picture on the wall shows my grandparents as young people.', cn: '墙上的老照片显示了我祖父母年轻时的样子。' },
    { en: 'She drew a beautiful picture of our village for the art contest.', cn: '她为艺术比赛画了一幅我们村庄的美丽图画。' }
  ],
  'hair': [
    { en: 'The wind blew her long hair across her face as she walked.', cn: '她走路时，风把她长长的头发吹到了脸上。' },
    { en: 'Grandpa\'s hair turned completely white over the winter.', cn: '爷爷的头发一个冬天就全白了。' }
  ],
  'tail': [
    { en: 'The excited dog wagged its tail when its owner came home.', cn: '主人回家时，兴奋的狗摇着尾巴。' },
    { en: 'A comet\'s bright tail stretched across the night sky.', cn: '彗星的明亮尾巴横跨夜空。' }
  ],
  'insect': [
    { en: 'A strange insect with golden wings landed on the flower.', cn: '一只长着金色翅膀的奇怪昆虫落在了花朵上。' },
    { en: 'The biologist studied the insect under a microscope.', cn: '生物学家在显微镜下研究这只昆虫。' }
  ],
  'toy': [
    { en: 'The child clutched his favorite toy bear as he fell asleep.', cn: '孩子抱着他最喜欢的玩具熊睡着了。' },
    { en: 'We donated old toys to the orphanage before the New Year.', cn: '新年之前，我们把旧玩具捐给了孤儿院。' }
  ],
  'goal': [
    { en: 'He kicked the ball toward the goal with all his strength.', cn: '他用力把球踢向球门。' },
    { en: 'My goal this year is to read fifty books.', cn: '我今年目标是读五十本书。' }
  ],
  'sunglasses': [
    { en: 'She put on her sunglasses before stepping into the bright sunlight.', cn: '她戴上太阳镜，然后走进了明亮的阳光中。' },
    { en: 'I forgot my sunglasses and had to squint in the strong glare.', cn: '我忘了带太阳镜，不得不在强光下眯着眼睛。' }
  ],
  'lorry': [
    { en: 'A large lorry carrying vegetables arrived at the market before dawn.', cn: '一辆运载蔬菜的大卡车在黎明前到达了市场。' },
    { en: 'The lorry got stuck under the low bridge and blocked traffic.', cn: '卡车卡在低桥下，阻断了交通。' }
  ],
  'hay': [
    { en: 'The farmer stacked bales of hay in the barn for winter feed.', cn: '农民把干草捆堆在谷仓里，作为冬季饲料。' },
    { en: 'We jumped from the hayloft into the soft pile below.', cn: '我们从干草棚跳进下面柔软的干草堆里。' }
  ],
  'hole': [
    { en: 'The dog dug a deep hole in the garden to hide his bone.', cn: '狗在花园里挖了一个深洞来藏他的骨头。' },
    { en: 'There is a small hole in my sock that I need to mend.', cn: '我的袜子上有一个小洞需要补。' }
  ],
  'lion': [
    { en: 'The lion roared loudly across the African savanna at dawn.', cn: '黎明时分，狮子在非洲大草原上大声咆哮。' },
    { en: 'A lion cub played with its mother\'s tail in the tall grass.', cn: '一只小狮子在高草丛中玩着妈妈的尾巴。' }
  ],
  'mouse': [
    { en: 'A tiny mouse scurried across the kitchen floor at night.', cn: '晚上，一只小老鼠匆匆穿过厨房地板。' },
    { en: 'The cat waited patiently by the hole for the mouse to appear.', cn: '猫耐心地守在洞口等待老鼠出现。' }
  ],
  'question': [
    { en: 'The student raised her hand to ask a difficult question.', cn: '学生举手问了一个难题。' },
    { en: 'That is an interesting question that I have never thought about.', cn: '那是一个我从来没想过有趣的问题。' }
  ],
  'engine': [
    { en: 'The car engine made a strange noise and then stopped completely.', cn: '汽车引擎发出奇怪的声音，然后完全熄火了。' },
    { en: 'The engineer checked the train engine before it left the station.', cn: '工程师在火车离站前检查了引擎。' }
  ],
  'dot': [
    { en: 'Connect the dots to reveal the hidden picture.', cn: '把点连起来，就能揭示隐藏的图画。' },
    { en: 'A ladybug has black dots on its bright red back.', cn: '瓢虫鲜红的背上有黑色斑点。' }
  ]
};

module.exports = { highQualityExamples };
