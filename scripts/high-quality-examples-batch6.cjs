/**
 * Batch 6: 继续修复多词性词词性覆盖（第二批剩余高频多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[]}
 */

const highQualityExamples = {

  // ===== behind (adv/prep) =====
  'behind': {
    adv: [
      { en: 'The dog ran behind and could not catch up with us.', cn: '狗跑在后面，追不上我们。' }
    ],
    prep: [
      { en: 'The little girl hid behind the door during the game.', cn: '小女孩在游戏中躲在门后面。' },
      { en: 'There is a beautiful garden behind our school building.', cn: '我们学校教学楼后面有一个美丽的花园。' }
    ]
  },

  // ===== book (noun/verb) =====
  'book': {
    noun: [
      { en: 'I borrowed an interesting book about space from the library.', cn: '我从图书馆借了一本关于太空的有趣的书。' },
      { en: 'Grandma keeps a photo book of all the family memories.', cn: '奶奶保存着一本记录所有家庭回忆的相册。' }
    ],
    verb: [
      { en: 'We need to book tickets for the train in advance.', cn: '我们需要提前预订火车票。' },
      { en: 'She booked a table at the restaurant for her birthday dinner.', cn: '她在餐厅预订了一张桌子用来举办生日晚餐。' }
    ]
  },

  // ===== bow (verb/noun) =====
  'bow': {
    verb: [
      { en: 'The performers bowed to the audience after the wonderful show.', cn: '演出结束后，演员们向观众鞠躬。' },
      { en: 'The old tree bowed under the weight of heavy snow.', cn: '老树在大雪的重压下弯下了腰。' }
    ],
    noun: [
      { en: 'She tied her hair with a red bow for the school party.', cn: '她为学校聚会用红色蝴蝶结扎起了头发。' },
      { en: 'The little girl learned to shoot arrows with a bow and arrow.', cn: '小女孩学会了用弓箭射箭。' }
    ]
  },

  // ===== brush (noun/verb) =====
  'brush': {
    noun: [
      { en: 'I need a new toothbrush because my old one is worn out.', cn: '我需要一把新牙刷，因为旧的已经磨损了。' },
      { en: 'The artist dipped the brush into blue paint.', cn: '艺术家把画笔蘸进了蓝色颜料里。' }
    ],
    verb: [
      { en: 'Please brush your teeth twice a day to keep them healthy.', cn: '请每天刷两次牙以保持牙齿健康。' },
      { en: 'She gently brushed the dust off the old photo frame.', cn: '她轻轻拂去旧相框上的灰尘。' }
    ]
  },

  // ===== cheap (adj/adv) =====
  'cheap': {
    adj: [
      { en: 'This restaurant serves delicious but cheap food.', cn: '这家餐厅提供美味但便宜的食物。' },
      { en: 'Cheap shoes often wear out after only a few months.', cn: '便宜的鞋子往往几个月后就穿坏了。' }
    ],
    adv: [
      { en: 'I bought these vegetables cheap at the morning market.', cn: '我在早市便宜地买到了这些蔬菜。' }
    ]
  },

  // ===== dance (verb/noun) =====
  'dance': {
    verb: [
      { en: 'The children love to dance to the happy music.', cn: '孩子们喜欢随着欢快的音乐跳舞。' },
      { en: 'They danced under the moonlight at the outdoor party.', cn: '他们在户外聚会的月光下翩翩起舞。' }
    ],
    noun: [
      { en: 'The traditional dance of this region is very beautiful.', cn: '这个地区的传统舞蹈非常优美。' },
      { en: 'May I have the next dance with you?', cn: '下一支舞可以和你跳吗？' }
    ]
  },

  // ===== dead (adj/adv/noun) =====
  'dead': {
    adj: [
      { en: 'The battery is dead, so I need to charge my phone.', cn: '电池没电了，所以我需要给手机充电。' },
      { en: 'A dead leaf fell from the tree and floated to the ground.', cn: '一片枯叶从树上飘落，飘到了地面。' }
    ],
    adv: [
      { en: 'The town was dead quiet after midnight.', cn: '午夜过后，小镇一片死寂。' },
      { en: 'You are dead right about that problem.', cn: '关于那个问题，你完全正确。' }
    ]
  },

  // ===== down (adv/prep/noun) =====
  'down': {
    adv: [
      { en: 'Please sit down and make yourself comfortable.', cn: '请坐下，让自己舒服一点。' },
      { en: 'The sun went down and the stars began to appear.', cn: '太阳落山了，星星开始出现。' }
    ],
    prep: [
      { en: 'We walked down the street to the old bookstore.', cn: '我们沿着街道走到那家旧书店。' }
    ],
    noun: [
      { en: 'Life has its ups and downs, but we keep moving forward.', cn: '生活有起有落，但我们继续前进。' }
    ]
  },

  // ===== drive (verb/noun) =====
  'drive': {
    verb: [
      { en: 'My father taught me how to drive when I turned eighteen.', cn: '我十八岁时，爸爸教我开车。' },
      { en: 'Hard work will drive you toward your goals.', cn: '努力工作会驱使你朝着目标前进。' }
    ],
    noun: [
      { en: 'The scenic drive along the coast took about two hours.', cn: '沿着海岸的风景驾车旅行大约花了两个小时。' },
      { en: 'The drive to succeed pushed her to study every night.', cn: '对成功的渴望驱使她每晚都学习。' }
    ]
  },

  // ===== dry (adj/verb) =====
  'dry': {
    adj: [
      { en: 'The dry leaves crunched under our feet as we walked.', cn: '我们走路时，干枯的叶子在脚下咔嚓作响。' },
      { en: 'This summer has been unusually dry with very little rain.', cn: '今年夏天异常干燥，雨水很少。' }
    ],
    verb: [
      { en: 'Please dry your hands with the towel before dinner.', cn: '晚饭前请用毛巾擦干手。' },
      { en: 'Grandma hung the clothes outside to dry in the sun.', cn: '奶奶把衣服挂在外面阳光下晒干。' }
    ]
  },

  // ===== empty (adj/verb/noun) =====
  'empty': {
    adj: [
      { en: 'The empty bottle rolled across the floor in the wind.', cn: '空瓶子在风中滚过地板。' },
      { en: 'The theater was almost empty on Monday morning.', cn: '周一早上剧院几乎是空的。' }
    ],
    verb: [
      { en: 'Please empty the trash before you leave the room.', cn: '离开房间前请把垃圾倒掉。' },
      { en: 'The children emptied their pockets of sand on the porch.', cn: '孩子们把口袋里的沙子都倒在了门廊上。' }
    ]
  },

  // ===== end (noun/verb) =====
  'end': {
    noun: [
      { en: 'The end of the movie surprised everyone in the theater.', cn: '电影的结局让影院里的每个人都感到惊讶。' },
      { en: 'Please write your name at the end of the letter.', cn: '请在信的末尾写上你的名字。' }
    ],
    verb: [
      { en: 'The concert will end at ten o\'clock tonight.', cn: '音乐会将于今晚十点结束。' },
      { en: 'We must end this argument and find a solution.', cn: '我们必须结束这场争论，找到解决办法。' }
    ]
  },

  // ===== fine (adj/noun/verb) =====
  'fine': {
    adj: [
      { en: 'The weather is fine today, perfect for a picnic.', cn: '今天天气很好，非常适合野餐。' },
      { en: 'Do not worry, everything will be fine in the end.', cn: '别担心，最终一切都会好起来的。' }
    ],
    noun: [
      { en: 'You must pay a fine if you return the book late.', cn: '如果你逾期还书，必须缴纳罚款。' }
    ],
    verb: [
      { en: 'The court fined him five hundred dollars for speeding.', cn: '法庭因超速对他处以五百美元罚款。' }
    ]
  },

  // ===== giant (adj/noun) =====
  'giant': {
    adj: [
      { en: 'A giant wave crashed against the side of the ship.', cn: '一个巨浪拍打着船舷。' },
      { en: 'The giant panda is a national treasure of China.', cn: '大熊猫是中国的国宝。' }
    ],
    noun: [
      { en: 'The fairy tale told of a gentle giant who lived in the mountains.', cn: '童话故事讲述了一个住在山里的温柔巨人。' }
    ]
  },

  // ===== glove (noun/verb) =====
  'glove': {
    noun: [
      { en: 'I put on my warm gloves before going out in the snow.', cn: '下雪天出门前，我戴上了保暖的手套。' },
      { en: 'The baseball player caught the ball with his leather glove.', cn: '棒球运动员用他的皮手套接住了球。' }
    ]
  },

  // ===== head (noun/verb) =====
  'head': {
    noun: [
      { en: 'She put on a warm hat to cover her head in the cold wind.', cn: '寒风中，她戴上了一顶保暖的帽子遮住头。' },
      { en: 'The head of the school gave a speech at the opening ceremony.', cn: '校长在开学典礼上发表了讲话。' }
    ],
    verb: [
      { en: 'We will head to the mountains early tomorrow morning.', cn: '我们明天一早将前往山区。' },
      { en: 'The ship headed toward the distant island on the horizon.', cn: '船朝着地平线上遥远的岛屿驶去。' }
    ]
  },

  // ===== heat (noun/verb) =====
  'heat': {
    noun: [
      { en: 'The heat of the summer sun made everyone seek shade.', cn: '夏日烈日的酷热让每个人都去寻找阴凉。' },
      { en: 'Please turn up the heat if you feel cold at night.', cn: '如果你晚上觉得冷，请把暖气调大。' }
    ],
    verb: [
      { en: 'Please heat the milk in the microwave for thirty seconds.', cn: '请把牛奶在微波炉里加热三十秒。' },
      { en: 'The argument heated up as both sides refused to compromise.', cn: '随着双方拒绝妥协，争论变得越来越激烈。' }
    ]
  },

  // ===== help (verb/noun/adj/adv) =====
  'help': {
    verb: [
      { en: 'Can you help me carry these heavy boxes upstairs?', cn: '你能帮我把这些沉重的箱子上楼吗？' },
      { en: 'Regular exercise helps you stay healthy and energetic.', cn: '规律的运动帮助你保持健康和精力充沛。' },
      { en: 'I could not help laughing at the funny puppy.', cn: '看到那只滑稽的小狗，我忍不住笑了。' }
    ],
    noun: [
      { en: 'Thank you for your help with the school project.', cn: '感谢你在这个学校项目上的帮助。' },
      { en: 'The rescue team arrived and was a great help to the villagers.', cn: '救援队赶到后，对村民来说是极大的帮助。' }
    ]
  },

  // ===== just (adj/adv) =====
  'just': {
    adj: [
      { en: 'The court made a just decision based on the evidence.', cn: '法庭根据证据做出了公正的判决。' }
    ],
    adv: [
      { en: 'I just finished my homework five minutes ago.', cn: '我五分钟前刚做完作业。' },
      { en: 'The test was just as difficult as we expected.', cn: '这次考试正如我们预料的那样难。' }
    ]
  },

  // ===== lift (verb/noun) =====
  'lift': {
    verb: [
      { en: 'Please lift the box carefully; it is full of glass bottles.', cn: '请小心抬起这个箱子，里面装满了玻璃瓶。' },
      { en: 'The good news lifted everyone\'s spirits.', cn: '这个好消息振奋了每个人的精神。' }
    ],
    noun: [
      { en: 'We took the lift to the tenth floor of the building.', cn: '我们乘电梯到了大楼的十楼。' },
      { en: 'Can you give me a lift to the train station?', cn: '你能载我去火车站吗？' }
    ]
  },

  // ===== may (verb/noun) =====
  'may': {
    verb: [
      { en: 'You may leave the classroom when you finish the test.', cn: '你考完试后可以离开教室。' },
      { en: 'It may rain this afternoon, so take an umbrella.', cn: '今天下午可能会下雨，所以带把伞吧。' }
    ],
    noun: [
      { en: 'The flowers bloom beautifully in May every year.', cn: '每年五月花都开得很美。' }
    ]
  },

  // ===== mop (verb/noun) =====
  'mop': {
    noun: [
      { en: 'I need to buy a new mop to clean the kitchen floor.', cn: '我需要买一把新拖把来清洁厨房地板。' }
    ],
    verb: [
      { en: 'She mopped the spilled juice from the floor.', cn: '她把洒在地上的果汁拖干净了。' }
    ]
  },

  // ===== name (noun/verb) =====
  'name': {
    noun: [
      { en: 'What is your name? I do not think we have met before.', cn: '你叫什么名字？我想我们以前没见过。' },
      { en: 'The name of this beautiful lake means "mirror of the sky."', cn: '这个美丽湖泊的名字意思是"天空之镜"。' }
    ],
    verb: [
      { en: 'They decided to name their daughter Lily after the flower.', cn: '他们决定以花为名，给女儿取名莉莉。' },
      { en: 'Can you name all the capital cities in Europe?', cn: '你能说出欧洲所有的首都城市吗？' }
    ]
  },

  // ===== near (adj/prep/adv) =====
  'near': {
    adj: [
      { en: 'The near future looks bright for our small business.', cn: '我们小企业的近期前景看起来很光明。' }
    ],
    prep: [
      { en: 'There is a lovely park near my grandmother\'s house.', cn: '奶奶家附近有一个可爱的公园。' },
      { en: 'We sat near the window to enjoy the sunshine.', cn: '我们坐在窗边享受阳光。' }
    ],
    adv: [
      { en: 'The exam date is drawing near, and I need to study harder.', cn: '考试日期临近了，我需要更努力学习。' }
    ]
  },

  // ===== nod (verb/noun) =====
  'nod': {
    verb: [
      { en: 'The teacher nodded with approval when I gave the correct answer.', cn: '当我给出正确答案时，老师赞许地点了点头。' },
      { en: 'Grandpa nodded off in his chair after lunch.', cn: '午饭后爷爷在椅子上打起了瞌睡。' }
    ],
    noun: [
      { en: 'She gave me a nod to show that she understood.', cn: '她向我点了点头，表示她明白了。' }
    ]
  },

  // ===== note (noun/verb) =====
  'note': {
    noun: [
      { en: 'I left a note on the fridge to remind Mom about the meeting.', cn: '我在冰箱上留了一张便条提醒妈妈开会的事。' },
      { en: 'The singer hit a high note that gave everyone goosebumps.', cn: '歌手唱出了一个高音，让每个人都起了鸡皮疙瘩。' }
    ],
    verb: [
      { en: 'Please note that the library closes early on Fridays.', cn: '请注意图书馆周五提前关门。' },
      { en: 'She noted the changes in her diary every evening.', cn: '她每天晚上在日记里记录变化。' }
    ]
  },

  // ===== now (adv/conj) =====
  'now': {
    adv: [
      { en: 'I am busy right now, but I can help you later.', cn: '我现在很忙，但我稍后可以帮助你。' },
      { en: 'From now on, I will exercise every morning.', cn: '从现在起，我每天早上都会锻炼。' }
    ],
    conj: [
      { en: 'Now that you are here, we can start the meeting.', cn: '既然你来了，我们可以开始会议了。' }
    ]
  },

  // ===== pink (adj/noun) =====
  'pink': {
    adj: [
      { en: 'The pink cherry blossoms covered the trees in spring.', cn: '春天粉色的樱花覆盖了整棵树。' },
      { en: 'She wore a pink sweater that matched her rosy cheeks.', cn: '她穿了一件粉色毛衣，和她红润的脸颊很配。' }
    ],
    noun: [
      { en: 'Pink is often associated with sweetness and romance.', cn: '粉色常与甜美和浪漫联系在一起。' }
    ]
  },

  // ===== place (noun/verb) =====
  'place': {
    noun: [
      { en: 'This is my favorite place to read books on rainy days.', cn: '这是我在雨天最喜欢看书的地方。' },
      { en: 'She finished in first place at the swimming competition.', cn: '她在游泳比赛中获得了第一名。' }
    ],
    verb: [
      { en: 'Please place the vase carefully on the shelf.', cn: '请小心地把花瓶放在架子上。' },
      { en: 'I placed my trust in him, and he did not let me down.', cn: '我把信任寄托在他身上，他没有让我失望。' }
    ]
  },

  // ===== play (verb/noun) =====
  'play': {
    verb: [
      { en: 'The children play happily in the park every afternoon.', cn: '孩子们每天下午在公园里开心地玩耍。' },
      { en: 'She learned to play the violin when she was seven years old.', cn: '她七岁时学会了拉小提琴。' }
    ],
    noun: [
      { en: 'We watched a wonderful play at the city theater last night.', cn: '昨晚我们在市剧院观看了一场精彩的戏剧。' },
      { en: 'That was a clever play in the final minutes of the game.', cn: '那是比赛最后几分钟的一次巧妙配合。' }
    ]
  },

  // ===== point (verb/noun) =====
  'point': {
    verb: [
      { en: 'Please point to the correct answer on the map.', cn: '请在地图上指出正确答案。' },
      { en: 'The needle points north on the compass.', cn: '指南针上的指针指向北方。' }
    ],
    noun: [
      { en: 'At this point, we need to make an important decision.', cn: '在这一点上，我们需要做出一个重要决定。' },
      { en: 'The sharp point of the pencil broke when it fell.', cn: '铅笔掉下来时，尖锐的笔尖断了。' }
    ]
  },

  // ===== salt (noun/adj) =====
  'salt': {
    noun: [
      { en: 'Please pass me the salt from across the table.', cn: '请把桌子对面的盐递给我。' },
      { en: 'Too much salt in your diet is bad for your health.', cn: '饮食中过多的盐对健康有害。' }
    ],
    adj: [
      { en: 'The salt water of the ocean stung my eyes.', cn: '海里的咸水刺痛了我的眼睛。' }
    ]
  },

  // ===== shake (verb/noun) =====
  'shake': {
    verb: [
      { en: 'The earthquake made the ground shake violently.', cn: '地震使地面剧烈摇晃。' },
      { en: 'Please shake the bottle well before drinking.', cn: '喝之前请把瓶子充分摇匀。' },
      { en: 'They shook hands and made peace after the argument.', cn: '争论过后，他们握手言和。' }
    ],
    noun: [
      { en: 'I would like a chocolate milk shake, please.', cn: '请给我来一杯巧克力奶昔。' }
    ]
  },

  // ===== shape (noun/verb) =====
  'shape': {
    noun: [
      { en: 'The cookies were cut into the shape of stars and hearts.', cn: '饼干被切成星星和心形。' },
      { en: 'The old house was in bad shape after the storm.', cn: '暴风雨过后，这座旧房子状况很糟糕。' }
    ],
    verb: [
      { en: 'Parents help shape their children\'s character and values.', cn: '父母帮助塑造孩子的性格和价值观。' },
      { en: 'The potter shaped the clay into a beautiful vase.', cn: '陶工把黏土塑造成一个美丽的花瓶。' }
    ]
  },

  // ===== shop (noun/verb) =====
  'shop': {
    noun: [
      { en: 'There is a small flower shop at the corner of the street.', cn: '街角有一家小花店。' },
      { en: 'The repair shop fixed my bicycle in just one hour.', cn: '修理店仅用一小时就修好了我的自行车。' }
    ],
    verb: [
      { en: 'I usually shop for groceries on Saturday mornings.', cn: '我通常在周六上午购买杂货。' },
      { en: 'We went to shop for new school clothes before the term started.', cn: '学期开始前，我们去买新的校服。' }
    ]
  },

  // ===== show (verb/noun) =====
  'show': {
    verb: [
      { en: 'Can you show me how to solve this math problem?', cn: '你能给我展示如何解这道数学题吗？' },
      { en: 'The test results show that he has made great progress.', cn: '测试结果显示他取得了很大进步。' }
    ],
    noun: [
      { en: 'The fashion show attracted thousands of visitors.', cn: '时装秀吸引了成千上万的观众。' },
      { en: 'The puppet show delighted the children in the audience.', cn: '木偶戏让在场的孩子们很高兴。' }
    ]
  },

  // ===== shout (verb/noun) =====
  'shout': {
    verb: [
      { en: 'Please do not shout in the library; people are reading.', cn: '请不要在图书馆里大喊大叫，人们在看书。' },
      { en: 'He shouted for help when he saw the fire.', cn: '他看到火灾时大声呼救。' }
    ],
    noun: [
      { en: 'A loud shout came from the playground.', cn: '从操场传来一声大喊。' }
    ]
  },

  // ===== sign (verb/noun) =====
  'sign': {
    verb: [
      { en: 'Please sign your name at the bottom of the form.', cn: '请在表格底部签上你的名字。' },
      { en: 'The team signed a new player for the upcoming season.', cn: '球队为即将到来的赛季签下了一名新球员。' }
    ],
    noun: [
      { en: 'The stop sign at the corner is hidden by the tree.', cn: '拐角处的停车标志被树挡住了。' },
      { en: 'Dark clouds are a sign that rain is coming.', cn: '乌云是下雨的征兆。' }
    ]
  },

  // ===== slide (noun/verb) =====
  'slide': {
    noun: [
      { en: 'The children laughed as they went down the slide at the park.', cn: '孩子们在公园玩滑梯时笑得很开心。' },
      { en: 'The slide in my science presentation showed the life cycle of a butterfly.', cn: '我科学演示文稿中的一张幻灯片展示了蝴蝶的生命周期。' }
    ],
    verb: [
      { en: 'Be careful not to slide on the icy sidewalk.', cn: '小心别在结冰的人行道上滑倒。' },
      { en: 'The drawer slides open smoothly after I fixed it.', cn: '我修好抽屉后，它能顺畅地滑开。' }
    ]
  },

  // ===== south (noun/adj/adv) =====
  'south': {
    noun: [
      { en: 'The warm wind blew from the south across the fields.', cn: '暖风从南方吹过田野。' },
      { en: 'Canada lies to the north of the United States.', cn: '加拿大位于美国的北边（美国位于加拿大的南边）。' }
    ],
    adj: [
      { en: 'The south side of the house gets more sunlight.', cn: '房子的南面获得更多阳光。' }
    ],
    adv: [
      { en: 'The birds fly south before winter comes.', cn: '鸟儿在冬天来临前飞往南方。' }
    ]
  },

  // ===== spin (verb/noun) =====
  'spin': {
    verb: [
      { en: 'The washing machine will spin the clothes dry.', cn: '洗衣机会把衣服甩干。' },
      { en: 'The dancer began to spin faster and faster.', cn: '舞者开始越转越快。' }
    ],
    noun: [
      { en: 'Let\'s go for a spin in my new car.', cn: '我们开我的新车去兜风吧。' }
    ]
  },

  // ===== stand (noun/verb) =====
  'stand': {
    verb: [
      { en: 'Please stand in line and wait for your turn.', cn: '请排队站着等轮到你。' },
      { en: 'The old house has stood here for over two hundred years.', cn: '这座老房子已经在这里矗立了两百多年。' },
      { en: 'I cannot stand the noise from the construction site.', cn: '我无法忍受建筑工地的噪音。' }
    ],
    noun: [
      { en: 'There is a fruit stand at the entrance of the market.', cn: '市场入口处有一个水果摊。' },
      { en: 'The team made a brave stand against the stronger opponent.', cn: '这支队伍勇敢地抵抗了更强大的对手。' }
    ]
  },

  // ===== step (noun/verb) =====
  'step': {
    noun: [
      { en: 'Mind the step when you enter the old house.', cn: '进老房子时注意台阶。' },
      { en: 'The first step to learning a language is practice.', cn: '学习语言的第一步是练习。' }
    ],
    verb: [
      { en: 'Please step aside and let the elderly pass first.', cn: '请站到一边，让老人先过。' },
      { en: 'She stepped carefully over the puddle on the path.', cn: '她小心地跨过小路上的水坑。' }
    ]
  },

  // ===== stop (noun/verb) =====
  'stop': {
    verb: [
      { en: 'The bus will stop at the corner in five minutes.', cn: '公交车五分钟后会在拐角处停靠。' },
      { en: 'Please stop talking and listen to the teacher.', cn: '请停止讲话，听老师讲课。' }
    ],
    noun: [
      { en: 'Our hotel is just two bus stops from the train station.', cn: '我们的酒店离火车站只有两站公交车的距离。' },
      { en: 'The car came to a sudden stop at the red light.', cn: '汽车在红灯处突然停了下来。' }
    ]
  },

  // ===== swing (verb/noun) =====
  'swing': {
    verb: [
      { en: 'The monkey swung from branch to branch in the tall tree.', cn: '猴子在高大的树间从一根树枝荡到另一根树枝。' },
      { en: 'The door swung open when the wind blew.', cn: '风吹来时，门荡开了。' }
    ],
    noun: [
      { en: 'The children took turns on the swing at the playground.', cn: '孩子们在操场上轮流玩秋千。' },
      { en: 'There has been a big swing in public opinion lately.', cn: '最近舆论发生了很大的转变。' }
    ]
  },

  // ===== talk (verb/noun) =====
  'talk': {
    verb: [
      { en: 'We need to talk about your plans for the summer holiday.', cn: '我们需要谈谈你的暑假计划。' },
      { en: 'The baby is learning to talk and says "mama" now.', cn: '宝宝正在学说话，现在会说"妈妈"了。' }
    ],
    noun: [
      { en: 'The teacher gave us a serious talk about honesty.', cn: '老师给我们做了一次关于诚实的严肃谈话。' },
      { en: 'There is going to be a peace talk between the two countries.', cn: '两国之间将举行和平会谈。' }
    ]
  },

  // ===== thick (adv/adj) =====
  'thick': {
    adj: [
      { en: 'The thick fog made it hard to see the road ahead.', cn: '浓雾使人难以看清前方的路。' },
      { en: 'This thick sweater will keep you warm in winter.', cn: '这件厚毛衣会让你在冬天保持温暖。' }
    ],
    adv: [
      { en: 'The flowers grew thick along the riverbank.', cn: '花朵沿着河岸茂密地生长。' }
    ]
  },

  // ===== thin (adj/noun) =====
  'thin': {
    adj: [
      { en: 'The ice on the lake is too thin to skate on.', cn: '湖上的冰太薄了，不能在上面滑冰。' },
      { en: 'She sliced the meat into thin strips for the stir-fry.', cn: '她把肉切成薄片用来炒菜。' }
    ]
  },

  // ===== thunder (noun/verb) =====
  'thunder': {
    noun: [
      { en: 'The thunder roared loudly during the summer storm.', cn: '夏日暴风雨中雷声轰鸣。' },
      { en: 'We heard the roll of thunder in the distance.', cn: '我们听到远处隆隆的雷声。' }
    ],
    verb: [
      { en: 'The crowd thundered their applause for the winning team.', cn: '人群为获胜的队伍爆发出雷鸣般的掌声。' }
    ]
  },

  // ===== tie (noun/verb) =====
  'tie': {
    noun: [
      { en: 'He wore a blue tie to match his suit for the interview.', cn: '他戴了一条蓝色领带来搭配面试时的西装。' },
      { en: 'The game ended in a tie with both teams scoring two goals.', cn: '比赛以平局结束，两队各进两球。' }
    ],
    verb: [
      { en: 'Please tie your shoelaces before you trip and fall.', cn: '请系好鞋带，以免绊倒。' },
      { en: 'She learned to tie a bow on gift boxes.', cn: '她学会了在礼盒上系蝴蝶结。' }
    ]
  },

  // ===== uniform (adj/noun) =====
  'uniform': {
    adj: [
      { en: 'The walls were a uniform shade of white throughout the building.', cn: '整栋建筑的墙面都是统一的白色。' }
    ],
    noun: [
      { en: 'All students must wear the school uniform on weekdays.', cn: '所有学生平日都必须穿校服。' },
      { en: 'The soldier\'s uniform was clean and neatly pressed.', cn: '士兵的制服干净整齐，熨得笔挺。' }
    ]
  },

  // ===== violet (adj/noun) =====
  'violet': {
    adj: [
      { en: 'The sky turned a soft violet as the sun set.', cn: '日落时天空变成了柔和的紫罗兰色。' }
    ],
    noun: [
      { en: 'She picked a small violet from the garden and put it in her hair.', cn: '她从花园里摘了一朵小紫罗兰别在头发上。' },
      { en: 'Violet is my grandmother\'s favorite color.', cn: '紫罗兰色是我奶奶最喜欢的颜色。' }
    ]
  },

  // ===== watch (verb/noun) =====
  'watch': {
    verb: [
      { en: 'I like to watch the sunset from my bedroom window.', cn: '我喜欢从卧室的窗户看日落。' },
      { en: 'Please watch your step on the wet floor.', cn: '请在潮湿的地板上小心走路。' }
    ],
    noun: [
      { en: 'My grandfather gave me his old pocket watch as a gift.', cn: '爷爷把他的旧怀表作为礼物送给了我。' },
      { en: 'The soldier kept watch by the campfire all night.', cn: '士兵整夜在篝火旁站岗。' }
    ]
  },

  // ===== wave (verb/noun) =====
  'wave': {
    verb: [
      { en: 'She waved goodbye as the bus pulled away from the station.', cn: '公交车驶离车站时，她挥手告别。' },
      { en: 'The wheat waved gently in the summer breeze.', cn: '麦子在夏日的微风中轻轻摇曳。' }
    ],
    noun: [
      { en: 'A huge wave crashed over the rocks on the shore.', cn: '一个巨浪拍打在岸边的岩石上。' },
      { en: 'The crowd greeted the hero with a wave of applause.', cn: '人群以一阵掌声迎接英雄。' }
    ]
  },

  // ===== wear (verb/noun) =====
  'wear': {
    verb: [
      { en: 'You should wear a helmet when riding a bicycle.', cn: '骑自行车时你应该戴头盔。' },
      { en: 'The old carpet began to wear thin after years of use.', cn: '这条旧地毯用了多年后开始磨损变薄。' }
    ],
    noun: [
      { en: 'This casual wear is perfect for a weekend picnic.', cn: '这套休闲装非常适合周末野餐。' },
      { en: 'The store sells evening wear for special occasions.', cn: '这家店出售特殊场合穿的晚装。' }
    ]
  },

  // ===== wonder (verb/noun) =====
  'wonder': {
    verb: [
      { en: 'I wonder what life will be like in the year 2050.', cn: '我想知道2050年的生活会是什么样子。' },
      { en: 'We wondered why the train was so delayed.', cn: '我们想知道火车为什么这么晚点。' }
    ],
    noun: [
      { en: 'The Great Wall is one of the wonders of the world.', cn: '长城是世界奇观之一。' },
      { en: 'The baby looked at the Christmas lights in wonder.', cn: '宝宝惊奇地看着圣诞彩灯。' }
    ]
  },

  // ===== write (verb/noun) =====
  'write': {
    verb: [
      { en: 'I write in my diary every night before going to bed.', cn: '我每晚睡觉前都在日记里写东西。' },
      { en: 'The famous poet wrote a beautiful poem about spring.', cn: '这位著名诗人写了一首关于春天的优美诗歌。' }
    ]
  }

};

module.exports = { highQualityExamples };
