/**
 * Batch 7: 继续修复多词性词词性覆盖（第三批剩余高频多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[], int:[]}
 */

const highQualityExamples = {

  // ===== air (noun/verb) =====
  'air': {
    noun: [
      { en: 'The fresh mountain air filled my lungs with every breath.', cn: '清新的山间空气让每一次呼吸都充满肺部。' },
      { en: 'Please open the window to let some air into the room.', cn: '请打开窗户让一些空气进入房间。' }
    ],
    verb: [
      { en: 'We need to air the blankets in the sunshine to remove the musty smell.', cn: '我们需要把毯子在阳光下晒一晒，去掉霉味。' }
    ]
  },

  // ===== back (adv/adj/noun) =====
  'back': {
    adv: [
      { en: 'I will be back in ten minutes after buying some milk.', cn: '我买完牛奶后十分钟就回来。' },
      { en: 'Please put the books back on the shelf when you finish.', cn: '读完后请把书放回书架上。' }
    ],
    adj: [
      { en: 'The back door of the house leads to a beautiful garden.', cn: '房子的后门通向一个美丽的花园。' }
    ],
    noun: [
      { en: 'He carried the heavy bag on his back all the way home.', cn: '他一路把沉重的袋子背在背上回家。' }
    ]
  },

  // ===== bright (adj/adv) =====
  'bright': {
    adj: [
      { en: 'The bright stars lit up the clear night sky.', cn: '明亮的星星照亮了晴朗的夜空。' },
      { en: 'She has a bright smile that makes everyone feel welcome.', cn: '她灿烂的笑容让每个人都感到受欢迎。' }
    ],
    adv: [
      { en: 'The moon shone bright over the calm lake.', cn: '月亮明亮地照耀在平静的湖面上。' }
    ]
  },

  // ===== burn (verb/noun) =====
  'burn': {
    verb: [
      { en: 'Be careful not to burn the toast in the oven.', cn: '小心别把吐司在烤箱里烤焦了。' },
      { en: 'The campfire continued to burn brightly through the night.', cn: '营火整夜继续明亮地燃烧着。' }
    ],
    noun: [
      { en: 'He suffered a painful burn on his hand from the hot water.', cn: '他的手被热水烫伤，疼痛难忍。' }
    ]
  },

  // ===== call (verb/noun) =====
  'call': {
    verb: [
      { en: 'I will call you as soon as I arrive at the station.', cn: '我一到车站就给你打电话。' },
      { en: 'What do you call this beautiful flower in English?', cn: '这种美丽的花用英语叫什么？' }
    ],
    noun: [
      { en: 'I received an important call from my doctor this morning.', cn: '今天早上我接到了医生打来的一个重要电话。' },
      { en: 'The call of the wild birds woke me up at dawn.', cn: '野生鸟儿的叫声在黎明时把我吵醒了。' }
    ]
  },

  // ===== change (noun/verb/adj) =====
  'change': {
    noun: [
      { en: 'The city has seen a lot of change in the past ten years.', cn: '这座城市在过去十年里发生了很大变化。' },
      { en: 'Do you have any change for a twenty-dollar bill?', cn: '你能换开二十美元的零钱吗？' }
    ],
    verb: [
      { en: 'You need to change your clothes after playing in the mud.', cn: '在泥里玩完后你需要换衣服。' },
      { en: 'The leaves begin to change color when autumn arrives.', cn: '秋天来临时，树叶开始变色。' }
    ]
  },

  // ===== club (noun/verb) =====
  'club': {
    noun: [
      { en: 'I joined the chess club to improve my thinking skills.', cn: '我加入了国际象棋俱乐部来提高思维能力。' },
      { en: 'The golf club was too expensive for me to buy.', cn: '那根高尔夫球杆对我来说太贵了，买不起。' }
    ],
    verb: [
      { en: 'The hunters clubbed together to buy supplies.', cn: '猎人们凑钱购买物资。' }
    ]
  },

  // ===== cost (noun/verb) =====
  'cost': {
    noun: [
      { en: 'The cost of living in big cities is getting higher.', cn: '大城市的生活成本越来越高。' },
      { en: 'We must consider the environmental cost of our actions.', cn: '我们必须考虑我们行为的环境代价。' }
    ],
    verb: [
      { en: 'How much does this new bicycle cost?', cn: '这辆新自行车多少钱？' },
      { en: 'His mistake cost him the chance to win the competition.', cn: '他的错误使他失去了赢得比赛的机会。' }
    ]
  },

  // ===== cry (verb/noun) =====
  'cry': {
    verb: [
      { en: 'The baby began to cry when his mother left the room.', cn: '妈妈离开房间时，宝宝开始哭了起来。' },
      { en: 'I cried with joy when I heard the good news.', cn: '听到好消息时，我高兴得哭了。' }
    ],
    noun: [
      { en: 'A cry for help came from the dark alley.', cn: '从黑暗的小巷里传来呼救声。' }
    ]
  },

  // ===== dear (adj/int) =====
  'dear': {
    adj: [
      { en: 'My dear grandmother always tells me stories before bed.', cn: '我亲爱的奶奶总是在睡前给我讲故事。' },
      { en: 'Fresh vegetables are dear in winter because they are rare.', cn: '新鲜蔬菜在冬天很贵，因为它们很稀少。' }
    ],
    int: [
      { en: 'Oh dear, I forgot to bring my umbrella today!', cn: '哎呀，我今天忘记带伞了！' }
    ]
  },

  // ===== drop (verb/noun) =====
  'drop': {
    verb: [
      { en: 'Please do not drop the glass vase; it is very fragile.', cn: '请不要把玻璃花瓶掉了，它很易碎。' },
      { en: 'The temperature began to drop sharply after sunset.', cn: '日落后气温开始急剧下降。' }
    ],
    noun: [
      { en: 'A single drop of rain landed on my nose.', cn: '一滴雨落在了我的鼻子上。' },
      { en: 'There was a sudden drop in sales after the holiday.', cn: '假期过后销售额突然下降。' }
    ]
  },

  // ===== east (noun/adj) =====
  'east': {
    noun: [
      { en: 'The sun rises in the east every morning.', cn: '太阳每天早上从东方升起。' }
    ],
    adj: [
      { en: 'The east wind brought the smell of the ocean.', cn: '东风带来了大海的气息。' }
    ]
  },

  // ===== festival (noun/verb) =====
  'festival': {
    noun: [
      { en: 'The Spring Festival is the most important holiday in China.', cn: '春节是中国最重要的节日。' },
      { en: 'We enjoyed the music festival in the park last weekend.', cn: '上周末我们在公园里享受了音乐节。' }
    ]
  },

  // ===== finish (noun/verb) =====
  'finish': {
    noun: [
      { en: 'The wooden table has a beautiful smooth finish.', cn: '这张木桌有着漂亮的光滑表面。' }
    ],
    verb: [
      { en: 'I need to finish my homework before dinner.', cn: '我需要在晚饭前完成作业。' },
      { en: 'The runners sprinted to finish the race.', cn: '跑步选手们冲刺完成比赛。' }
    ]
  },

  // ===== first (adv/adj/num/noun) =====
  'first': {
    adj: [
      { en: 'Today is the first day of the new semester.', cn: '今天是新学期的第一天。' }
    ],
    adv: [
      { en: 'First, let me introduce myself to the class.', cn: '首先，让我向全班介绍一下自己。' }
    ],
    noun: [
      { en: 'He came in first in the one-hundred-meter race.', cn: '他在一百米赛跑中获得了第一名。' }
    ]
  },

  // ===== high (adv/adj) =====
  'high': {
    adj: [
      { en: 'The eagle flew high above the mountain peaks.', cn: '老鹰高高地飞越山峰。' },
      { en: 'Prices are very high at this time of year.', cn: '每年这个时候物价都很高。' }
    ],
    adv: [
      { en: 'The plane flew high above the clouds.', cn: '飞机高高地飞过云层上方。' }
    ]
  },

  // ===== hit (verb/noun) =====
  'hit': {
    verb: [
      { en: 'The ball hit the window and broke the glass.', cn: '球击中了窗户，打碎了玻璃。' },
      { en: 'The new song hit the top of the music charts.', cn: '这首新歌登上了音乐排行榜榜首。' }
    ],
    noun: [
      { en: 'The movie became a big hit all around the world.', cn: '这部电影在全世界大受欢迎。' }
    ]
  },

  // ===== however (adv/conj) =====
  'however': {
    adv: [
      { en: 'However hard I tried, I could not solve the puzzle.', cn: '无论我多么努力，我都解不开这个谜题。' }
    ],
    conj: [
      { en: 'I wanted to go; however, the heavy rain stopped me.', cn: '我想去；然而，大雨阻止了我。' }
    ]
  },

  // ===== kind (adj/noun) =====
  'kind': {
    adj: [
      { en: 'The kind old lady fed the stray cats every day.', cn: '那位善良的老太太每天喂流浪猫。' },
      { en: 'It was very kind of you to help me carry the bags.', cn: '你帮我提袋子，真是太好了。' }
    ],
    noun: [
      { en: 'What kind of music do you like to listen to?', cn: '你喜欢听哪种音乐？' },
      { en: 'Dogs are my favorite kind of pet.', cn: '狗是我最喜欢的那种宠物。' }
    ]
  },

  // ===== know (verb/noun) =====
  'know': {
    verb: [
      { en: 'Do you know the way to the nearest hospital?', cn: '你知道去最近医院的路吗？' },
      { en: 'I have known her since we were in primary school.', cn: '我从小学就认识她了。' }
    ],
    noun: [
      { en: 'He is in the know about the company\'s future plans.', cn: '他知道公司未来计划的内部消息。' }
    ]
  },

  // ===== land (noun/verb) =====
  'land': {
    noun: [
      { en: 'The farmer works hard on his land every single day.', cn: '农民每天在他的土地上辛勤工作。' },
      { en: 'We saw dry land after sailing for three weeks at sea.', cn: '在海上航行三周后，我们看到了陆地。' }
    ],
    verb: [
      { en: 'The plane will land at Beijing Capital Airport in ten minutes.', cn: '飞机将于十分钟后在北京首都机场降落。' },
      { en: 'The fisherman landed a huge fish after a long struggle.', cn: '经过长时间的搏斗，渔民钓上了一条大鱼。' }
    ]
  },

  // ===== laugh (verb/noun) =====
  'laugh': {
    verb: [
      { en: 'The children laugh happily when they play together.', cn: '孩子们一起玩时开心地笑着。' },
      { en: 'It is not polite to laugh at others\' mistakes.', cn: '嘲笑别人的错误是不礼貌的。' }
    ],
    noun: [
      { en: 'Her joke brought a big laugh from everyone at the table.', cn: '她的笑话让桌上的每个人都大笑起来。' }
    ]
  },

  // ===== letter (noun/adj) =====
  'letter': {
    noun: [
      { en: 'I received a handwritten letter from my pen pal in France.', cn: '我收到了法国笔友的一封手写信。' },
      { en: 'The word \'apple\' has five letters.', cn: '"apple"这个词有五个字母。' }
    ]
  },

  // ===== lie (verb/noun) =====
  'lie': {
    verb: [
      { en: 'The cat likes to lie in the warm sunshine all afternoon.', cn: '猫喜欢整个下午躺在温暖的阳光下。' },
      { en: 'It is wrong to lie to your parents about your grades.', cn: '关于成绩对父母撒谎是不对的。' }
    ],
    noun: [
      { en: 'The story was full of lies from beginning to end.', cn: '这个故事从头到尾充满了谎言。' }
    ]
  },

  // ===== many (adj/pron) =====
  'many': {
    adj: [
      { en: 'Many birds return to the lake every spring.', cn: '每年春天都有很多鸟回到湖边。' },
      { en: 'How many apples do you want to buy?', cn: '你想买多少个苹果？' }
    ],
    pron: [
      { en: 'Many of my classmates enjoy playing basketball.', cn: '我的很多同学喜欢打篮球。' }
    ]
  },

  // ===== market (noun/adj) =====
  'market': {
    noun: [
      { en: 'The morning market sells fresh vegetables and fruits.', cn: '早市出售新鲜的蔬菜和水果。' },
      { en: 'We went to the fish market to buy some shrimp.', cn: '我们去鱼市买了一些虾。' }
    ]
  },

  // ===== match (noun/verb) =====
  'match': {
    noun: [
      { en: 'Our team won the basketball match by ten points.', cn: '我们队以十分之差赢得了篮球比赛。' },
      { en: 'I need to buy some matches to light the candles.', cn: '我需要买些火柴来点蜡烛。' }
    ],
    verb: [
      { en: 'The color of your shoes does not match your dress.', cn: '你鞋子的颜色和你的裙子不搭配。' },
      { en: 'Her skills match the requirements of the job perfectly.', cn: '她的技能完全符合这份工作的要求。' }
    ]
  },

  // ===== matter (noun/verb) =====
  'matter': {
    noun: [
      { en: 'This is a serious matter that we need to discuss.', cn: '这是一个我们需要讨论的严肃问题。' },
      { en: 'All living things are made of organic matter.', cn: '所有生物都由有机物构成。' }
    ],
    verb: [
      { en: 'It does not matter if you are late; we will wait for you.', cn: '你迟到没关系，我们会等你。' },
      { en: 'Your health matters more than anything else.', cn: '你的健康比其他任何事情都重要。' }
    ]
  },

  // ===== part (noun/verb) =====
  'part': {
    noun: [
      { en: 'This is my favorite part of the song.', cn: '这是这首歌中我最喜欢的部分。' },
      { en: 'She played the leading part in the school play.', cn: '她在学校话剧中扮演主角。' }
    ],
    verb: [
      { en: 'We had to part ways at the crossroads.', cn: '我们不得不在十字路口分道扬镳。' }
    ]
  },

  // ===== phone (noun/verb) =====
  'phone': {
    noun: [
      { en: 'My mobile phone ran out of battery during the trip.', cn: '我的手机在旅途中没电了。' },
      { en: 'The phone rang just as I was about to leave.', cn: '我正要出门时，电话响了。' }
    ],
    verb: [
      { en: 'I will phone you tomorrow to confirm the meeting time.', cn: '我明天会给你打电话确认会议时间。' }
    ]
  },

  // ===== picnic (noun/verb) =====
  'picnic': {
    noun: [
      { en: 'We had a lovely picnic by the lake on Sunday.', cn: '周日我们在湖边进行了一次愉快的野餐。' },
      { en: 'The family brought sandwiches and fruit for the picnic.', cn: '这家人为野餐带了三明治和水果。' }
    ],
    verb: [
      { en: 'We love to picnic in the mountains during spring.', cn: '我们喜欢春天在山里野餐。' }
    ]
  },

  // ===== plastic (adj/noun) =====
  'plastic': {
    adj: [
      { en: 'Please bring a reusable bag instead of a plastic one.', cn: '请带可重复使用的袋子，而不是塑料袋。' }
    ],
    noun: [
      { en: 'This container is made of recycled plastic.', cn: '这个容器是由回收塑料制成的。' }
    ]
  },

  // ===== plum (adj/noun) =====
  'plum': {
    adj: [
      { en: 'She wore a plum dress to the evening party.', cn: '她穿了一件深紫色的裙子去参加晚会。' }
    ],
    noun: [
      { en: 'Grandma made delicious plum jam from the fruit in her garden.', cn: '奶奶用她花园里的李子做了美味的果酱。' }
    ]
  },

  // ===== post (noun/verb) =====
  'post': {
    noun: [
      { en: 'The fence was supported by strong wooden posts.', cn: '篱笆由结实的木桩支撑。' },
      { en: 'I check my social media post every morning.', cn: '我每天早上查看我的社交媒体帖子。' }
    ],
    verb: [
      { en: 'Please post this letter for me on your way to school.', cn: '请在你上学的路上帮我把这封信寄出去。' },
      { en: 'She posted a beautiful photo of the sunset online.', cn: '她在网上发布了一张美丽的日落照片。' }
    ]
  },

  // ===== promise (noun/verb) =====
  'promise': {
    noun: [
      { en: 'He made a promise to visit his grandmother every week.', cn: '他承诺每周都去看望奶奶。' },
      { en: 'The new job shows great promise for her future career.', cn: '这份新工作对她未来的事业显示出巨大的希望。' }
    ],
    verb: [
      { en: 'I promise to finish the project before the deadline.', cn: '我保证在截止日期前完成项目。' },
      { en: 'The dark clouds promise rain this afternoon.', cn: '乌云预示着今天下午要下雨。' }
    ]
  },

  // ===== quick (adj/adv) =====
  'quick': {
    adj: [
      { en: 'The quick brown fox jumped over the lazy dog.', cn: '那只敏捷的棕色狐狸跳过了那只懒狗。' },
      { en: 'We need to find a quick solution to this problem.', cn: '我们需要找到这个问题的快速解决方案。' }
    ],
    adv: [
      { en: 'Come quick, or you will miss the beginning of the movie!', cn: '快点来，不然你会错过电影的开头！' }
    ]
  },

  // ===== rainy (adj/noun) =====
  'rainy': {
    adj: [
      { en: 'We stayed indoors on the rainy afternoon and read books.', cn: '下雨的下午，我们待在屋里看书。' }
    ]
  },

  // ===== sail (noun/verb) =====
  'sail': {
    noun: [
      { en: 'The ship\'s white sail caught the strong ocean wind.', cn: '船上的白色船帆捕捉到了强劲的海风。' }
    ],
    verb: [
      { en: 'We plan to sail around the world after graduation.', cn: '我们计划毕业后环球航行。' },
      { en: 'The paper boat began to sail across the puddle.', cn: '纸船开始漂过水坑。' }
    ]
  },

  // ===== sense (noun/verb) =====
  'sense': {
    noun: [
      { en: 'Dogs have an excellent sense of smell.', cn: '狗有着极佳的嗅觉。' },
      { en: 'There is no sense in worrying about things you cannot control.', cn: '为无法控制的事情担心是没有意义的。' }
    ],
    verb: [
      { en: 'I could sense that something was wrong from her expression.', cn: '我从她的表情中感觉到有些不对劲。' }
    ]
  },

  // ===== special (adj/noun) =====
  'special': {
    adj: [
      { en: 'Today is a special day because it is my birthday.', cn: '今天是个特别的日子，因为是我的生日。' },
      { en: 'She has a special talent for playing the piano.', cn: '她有一种弹钢琴的特殊天赋。' }
    ],
    noun: [
      { en: 'The restaurant\'s lunch special includes soup and dessert.', cn: '这家餐厅的午餐特餐包括汤和甜点。' }
    ]
  },

  // ===== still (adj/adv) =====
  'still': {
    adj: [
      { en: 'The lake was perfectly still, like a mirror.', cn: '湖面完全平静，像一面镜子。' }
    ],
    adv: [
      { en: 'It is still raining outside, so take an umbrella.', cn: '外面还在下雨，所以带把伞吧。' },
      { en: 'Grandma still cooks dinner for the whole family every Sunday.', cn: '奶奶每个周日仍然为全家人做晚饭。' }
    ]
  },

  // ===== subject (noun/verb) =====
  'subject': {
    noun: [
      { en: 'My favorite subject at school is science.', cn: '我在学校最喜欢的科目是科学。' },
      { en: 'The subject of the painting is a beautiful mountain village.', cn: '这幅画的主题是一个美丽的山村。' }
    ],
    verb: [
      { en: 'The prisoners were subject to strict rules in the old castle.', cn: '囚犯们在古老的城堡里受到严格的规则约束。' }
    ]
  },

  // ===== sunny (adj/noun) =====
  'sunny': {
    adj: [
      { en: 'We went for a walk on the sunny beach after lunch.', cn: '午饭后我们在阳光明媚的海滩上散步。' }
    ]
  },

  // ===== thank (noun/adj) =====
  'thank': {
    noun: [
      { en: 'I want to express my sincere thanks for your help.', cn: '我想对你的帮助表达我诚挚的感谢。' }
    ]
  },

  // ===== tonight (adv/noun) =====
  'tonight': {
    adv: [
      { en: 'Are you free tonight to watch a movie together?', cn: '你今晚有空一起看电影吗？' }
    ],
    noun: [
      { en: 'Tonight is the night of the full moon.', cn: '今晚是满月之夜。' }
    ]
  },

  // ===== tower (noun/verb) =====
  'tower': {
    noun: [
      { en: 'The ancient tower has stood on the hill for five hundred years.', cn: '这座古老的塔已经在山上矗立了五百年。' },
      { en: 'We climbed the bell tower to see the whole city.', cn: '我们爬上了钟楼，看到了整座城市。' }
    ],
    verb: [
      { en: 'The new skyscraper towers above all the other buildings.', cn: '这座新的摩天大楼高耸于所有其他建筑之上。' }
    ]
  },

  // ===== triangle (noun/adj) =====
  'triangle': {
    noun: [
      { en: 'A triangle has three sides and three angles.', cn: '三角形有三条边和三个角。' },
      { en: 'The children formed a triangle by holding hands.', cn: '孩子们手拉手组成了一个三角形。' }
    ]
  },

  // ===== ugly (adj/noun) =====
  'ugly': {
    adj: [
      { en: 'The ugly duckling grew up to become a beautiful swan.', cn: '丑小鸭长大后变成了一只美丽的天鹅。' },
      { en: 'It is ugly to laugh at someone who is in trouble.', cn: '嘲笑遇到困难的人是丑陋的。' }
    ]
  },

  // ===== west (noun/adj/adv) =====
  'west': {
    noun: [
      { en: 'The sun sets in the west every evening.', cn: '太阳每天晚上从西边落下。' }
    ],
    adj: [
      { en: 'The west wind brought cool air from the ocean.', cn: '西风从海洋带来了凉爽的空气。' }
    ],
    adv: [
      { en: 'The house faces west, so it gets plenty of afternoon sun.', cn: '房子朝西，所以下午能获得充足的阳光。' }
    ]
  },

  // ===== without (prep/adv) =====
  'without': {
    prep: [
      { en: 'I cannot live without my morning cup of coffee.', cn: '没有早上那杯咖啡我就活不下去。' },
      { en: 'She left without saying goodbye to anyone.', cn: '她没有跟任何人道别就离开了。' }
    ]
  },

  // ===== work (noun/verb) =====
  'work': {
    noun: [
      { en: 'The artist\'s work is displayed in museums around the world.', cn: '这位艺术家的作品在世界各地的博物馆展出。' },
      { en: 'I have a lot of work to finish before Friday.', cn: '我周五之前有很多工作要完成。' }
    ],
    verb: [
      { en: 'My father works in a hospital as a doctor.', cn: '我爸爸在一家医院当医生。' },
      { en: 'This old clock does not work anymore.', cn: '这座旧钟不再走了。' }
    ]
  }

};

module.exports = { highQualityExamples };
