/**
 * Batch 4: 修复 batch 1+2 中多词性词的词性覆盖
 * 按词性分组格式 {noun:[], verb:[], adj:[]}
 */

const highQualityExamples = {
  // ===== orange (adj/noun) - 已有覆盖，改新格式 =====
  'orange': {
    adj: [
      { en: 'The orange tree in our yard is full of fruit this autumn.', cn: '我们院子里的橘子树今年秋天结满了果实。' },
      { en: 'She squeezed fresh orange juice for breakfast this morning.', cn: '她今天早上榨了新鲜的橙汁当早餐。' }
    ],
    noun: [
      { en: 'Grandpa peeled a sweet orange for me after lunch.', cn: '午饭后爷爷给我剥了一个甜橘子。' },
      { en: 'I love the smell of orange blossoms in the spring air.', cn: '我喜欢春天空气中橘子花的香味。' }
    ]
  },

  // ===== fish (noun/verb) - 缺动词 =====
  'fish': {
    noun: [
      { en: 'Dad caught a big fish by the river yesterday afternoon.', cn: '爸爸昨天下午在河边钓到了一条大鱼。' },
      { en: 'We watched colorful fish swim through the coral reef at the aquarium.', cn: '我们在水族馆里看着五颜六色的鱼游过珊瑚礁。' }
    ],
    verb: [
      { en: 'Grandpa taught me how to fish by the quiet lake near our village.', cn: '爷爷教我在村子附近的静湖边钓鱼。' },
      { en: 'The boys went to fish in the stream behind the old mill.', cn: '男孩们去老磨坊后面的小溪钓鱼。' }
    ]
  },

  // ===== wind (noun/verb/adj) - 缺动词、形容词 =====
  'wind': {
    noun: [
      { en: 'Strong wind blew my hat off as I crossed the bridge.', cn: '我过桥时一阵大风吹掉了我的帽子。' },
      { en: 'The wind carried the sweet smell of flowers from the valley below.', cn: '风从下面的山谷带来了花香。' }
    ],
    verb: [
      { en: 'The mountain road winds through thick forests for miles.', cn: '山路蜿蜒穿过茂密的森林，绵延数英里。' },
      { en: 'She wound the old clock carefully before going to bed.', cn: '她睡前仔细地给老钟上紧了发条。' }
    ],
    adj: [
      { en: 'The wind turbine turned slowly on top of the green hill.', cn: '风力发电机在青山顶上缓缓转动。' }
    ]
  },

  // ===== cook (noun/verb) - 缺名词 =====
  'cook': {
    noun: [
      { en: 'The cook in the village restaurant makes the best noodles.', cn: '村里餐馆的厨师做的面条最好吃。' },
      { en: 'My aunt worked as a cook on a ship for five years.', cn: '我姑姑在一艘船上当了五年厨师。' }
    ],
    verb: [
      { en: 'Mom cooks delicious noodles for the family every weekend.', cn: '妈妈每周末给家人做美味的面条。' },
      { en: 'My brother learned to cook fried rice by watching online videos.', cn: '我哥哥通过看网络视频学会了做炒饭。' },
      { en: 'The chef cooks with fresh ingredients from the local market.', cn: '厨师用当地市场的新鲜食材烹饪。' }
    ]
  },

  // ===== run (noun/verb) - 缺名词 =====
  'run': {
    noun: [
      { en: 'I go for a morning run along the river every day.', cn: '我每天早上去河边跑步。' },
      { en: 'The play had a successful run of fifty shows in the theater.', cn: '这部剧在剧院成功上演了五十场。' }
    ],
    verb: [
      { en: 'I run around the lake every morning to stay healthy.', cn: '我每天早上绕湖跑步保持健康。' },
      { en: 'The dog ran after the ball and brought it back happily.', cn: '狗追着球跑，开心地把它带了回来。' },
      { en: 'Water began to run down the window during the heavy storm.', cn: '暴风雨中，雨水开始顺着窗户流下来。' }
    ]
  },

  // ===== ride (noun/verb) - 缺名词 =====
  'ride': {
    noun: [
      { en: 'The bus ride to the mountain took about two hours.', cn: '乘公交车去山里大约花了两个小时。' },
      { en: 'Can you give me a ride to the train station tomorrow?', cn: '明天你能载我去火车站吗？' }
    ],
    verb: [
      { en: 'I ride my bicycle to school when the weather is nice.', cn: '天气好的时候，我骑自行车上学。' },
      { en: 'The cowboy rode his horse across the open prairie.', cn: '牛仔骑着马穿过开阔的草原。' },
      { en: 'We rode the Ferris wheel and saw the whole city from above.', cn: '我们坐了摩天轮，从上面看到了整座城市。' }
    ]
  },

  // ===== dress (noun/verb) - 已有覆盖，改新格式 =====
  'dress': {
    noun: [
      { en: 'She wore a beautiful red dress to the school celebration.', cn: '她穿了一条漂亮的红裙子参加学校庆典。' },
      { en: 'The window display showed a silk dress that caught everyone\'s eye.', cn: '橱窗里展示的一条丝绸裙子吸引了所有人的目光。' }
    ],
    verb: [
      { en: 'Mom helped me dress warmly before I went out in the snow.', cn: '下雪天出门前，妈妈帮我穿得暖暖的。' },
      { en: 'The little girl learned to dress herself at the age of four.', cn: '小女孩四岁就学会了自己穿衣服。' }
    ]
  },

  // ===== hand (noun/verb) - 缺动词 =====
  'hand': {
    noun: [
      { en: 'The little girl held her mother\'s hand tightly as they crossed the street.', cn: '小女孩过马路时紧紧握着妈妈的手。' },
      { en: 'He raised his hand to answer the teacher\'s question.', cn: '他举手回答老师的问题。' },
      { en: 'The clock on the tower has a golden hand that shines in the sun.', cn: '塔上的钟有一只金色的指针，在阳光下闪闪发光。' }
    ],
    verb: [
      { en: 'Please hand me the salt from across the table.', cn: '请把桌子对面的盐递给我。' },
      { en: 'She handed the letter to the postman with a grateful smile.', cn: '她带着感激的微笑把信交给了邮递员。' }
    ]
  },

  // ===== go (noun/verb) - 缺名词 =====
  'go': {
    noun: [
      { en: 'It\'s your go now, so roll the dice and move your piece.', cn: '现在轮到你了，掷骰子然后移动你的棋子。' },
      { en: 'The project was a go after the manager gave her approval.', cn: '经理批准后，项目就开始了。' }
    ],
    verb: [
      { en: 'I go to the library every Saturday to borrow new books.', cn: '我每个周六都去图书馆借新书。' },
      { en: 'Where did you go during the winter holiday?', cn: '寒假你去了哪里？' },
      { en: 'The old saying goes that practice makes perfect.', cn: '俗话说熟能生巧。' }
    ]
  },

  // ===== drink (noun/verb) - 缺名词 =====
  'drink': {
    noun: [
      { en: 'Would you like a cold drink on this hot afternoon?', cn: '这么热的下午，你想来杯冷饮吗？' },
      { en: 'My favorite drink is fresh lemonade on summer days.', cn: '夏天我最喜欢喝新鲜柠檬水。' }
    ],
    verb: [
      { en: 'Please drink some water after running in the hot sun.', cn: '在烈日下跑步后，请喝点水。' },
      { en: 'The camel can drink a hundred liters of water at one time.', cn: '骆驼一次能喝一百升水。' },
      { en: 'Grandpa drinks tea while reading the newspaper every morning.', cn: '爷爷每天早上一边喝茶一边看报纸。' }
    ]
  },

  // ===== sun (noun/adj) - 缺形容词 =====
  'sun': {
    noun: [
      { en: 'The sun rose above the mountains and painted the sky in gold.', cn: '太阳从山上升起，把天空染成了金色。' },
      { en: 'We sat in the warm sun and enjoyed the gentle breeze.', cn: '我们坐在温暖的阳光下，享受着轻柔的微风。' }
    ],
    adj: [
      { en: 'The sun room faces south and gets plenty of light all day.', cn: '阳光房朝南，全天都能获得充足的光线。' },
      { en: 'She put on sun cream before going to the beach.', cn: '她去海滩前涂了防晒霜。' }
    ]
  },

  // ===== light (noun/adj/verb) - 已有部分覆盖，改新格式并补充 =====
  'light': {
    noun: [
      { en: 'A soft light came through the curtains in the early morning.', cn: '清晨，柔和的光线透过窗帘照进来。' },
      { en: 'Please turn off the light when you leave the room.', cn: '离开房间时请关灯。' }
    ],
    adj: [
      { en: 'The suitcase was surprisingly light, so I carried it easily.', cn: '行李箱出奇地轻，所以我轻松地提了起来。' },
      { en: 'She prefers light colors like white and pale blue.', cn: '她喜欢浅色，比如白色和淡蓝色。' }
    ],
    verb: [
      { en: 'The candles lit up the room and lightened the dark corner.', cn: '蜡烛照亮了房间，也照亮了黑暗的角落。' },
      { en: 'A single match was enough to light the campfire.', cn: '一根火柴就足以点燃篝火。' }
    ]
  },

  // ===== sleep (noun/verb) - 缺名词 =====
  'sleep': {
    noun: [
      { en: 'A good night\'s sleep helps you stay focused during the day.', cn: '一夜好眠能帮助你在白天保持专注。' },
      { en: 'The baby woke up from a short sleep and started crying.', cn: '宝宝从短暂的睡眠中醒来，开始哭泣。' }
    ],
    verb: [
      { en: 'I usually sleep eight hours every night to stay healthy.', cn: '我通常每晚睡八小时来保持健康。' },
      { en: 'The tired farmer slept soundly after a long day in the fields.', cn: '劳累的农民在田间劳作了一整天后睡得很香。' },
      { en: 'The old cat sleeps on the warm windowsill all afternoon.', cn: '老猫整个下午都睡在温暖的窗台上。' }
    ]
  },

  // ===== yellow (adj/noun) - 已有覆盖，改新格式 =====
  'yellow': {
    adj: [
      { en: 'The yellow sunflowers turned toward the sun in the garden.', cn: '花园里的黄色向日葵朝着太阳转动。' },
      { en: 'She wore a yellow raincoat on the grey, rainy morning.', cn: '她在灰蒙蒙的雨天早晨穿了一件黄色雨衣。' }
    ],
    noun: [
      { en: 'Yellow is the color of hope and happiness in many cultures.', cn: '在许多文化中，黄色是希望和幸福的颜色。' },
      { en: 'The artist mixed blue and yellow to create a bright green.', cn: '艺术家把蓝色和黄色混合，调出了鲜绿色。' }
    ]
  },

  // ===== plant (noun/verb) - 已有部分覆盖，改新格式 =====
  'plant': {
    noun: [
      { en: 'Grandma has a green plant on every windowsill in her house.', cn: '奶奶家里的每个窗台上都有一盆绿色植物。' },
      { en: 'The tomato plant in our garden grew taller than my shoulder.', cn: '我们花园里的番茄植株长得比我的肩膀还高。' }
    ],
    verb: [
      { en: 'We plant seeds in the garden every spring and watch them grow.', cn: '我们每年春天在花园里播种，看着它们生长。' },
      { en: 'The villagers plant trees along the river to stop soil erosion.', cn: '村民们沿着河岸种树以防止水土流失。' }
    ]
  },

  // ===== paint (noun/verb) - 已有部分覆盖，改新格式 =====
  'paint': {
    noun: [
      { en: 'The paint on the old door was peeling off after years of rain.', cn: '经过多年的雨水冲刷，旧门上的油漆正在剥落。' },
      { en: 'We need to buy some white paint to freshen up the walls.', cn: '我们需要买些白漆来刷新墙壁。' }
    ],
    verb: [
      { en: 'The artist began to paint the mountain landscape at dawn.', cn: '艺术家黎明时分开始画山水画。' },
      { en: 'The children love to paint colorful pictures in art class.', cn: '孩子们喜欢在美术课上画五颜六色的画。' }
    ]
  },

  // ===== smoke (verb/noun) - 缺名词 =====
  'smoke': {
    noun: [
      { en: 'Thick smoke rose from the chimney of the old cottage.', cn: '浓烟从旧小屋的烟囱里升起。' },
      { en: 'The room filled with smoke when the toast burned in the oven.', cn: '吐司在烤箱里烤焦时，房间里充满了烟雾。' }
    ],
    verb: [
      { en: 'It is not allowed to smoke inside the school building.', cn: '教学楼内禁止吸烟。' },
      { en: 'The wood stove smoked a little when we first lit the fire.', cn: '我们第一次生火时，木炉有点冒烟。' }
    ]
  },

  // ===== turn (noun/verb) - 已有部分覆盖，改新格式 =====
  'turn': {
    noun: [
      { en: 'Wait for your turn in line; everyone will get a chance.', cn: '排队等着轮到你，每个人都有机会。' },
      { en: 'The road took a sharp turn to the left after the bridge.', cn: '过了桥，路向左急转。' }
    ],
    verb: [
      { en: 'Please turn right at the traffic lights and you will see the school.', cn: '请在红绿灯处右转，你就会看到学校。' },
      { en: 'The leaves begin to turn yellow when autumn arrives.', cn: '秋天到来时，树叶开始变黄。' },
      { en: 'Do not forget to turn off the lights when you leave.', cn: '离开时别忘了关灯。' }
    ]
  },

  // ===== can (noun/verb) - 已有部分覆盖，改新格式 =====
  'can': {
    noun: [
      { en: 'Mom bought a can of tomato soup at the supermarket.', cn: '妈妈在超市买了一罐番茄汤。' },
      { en: 'Please put the empty can in the recycling bin.', cn: '请把空罐子放进回收箱。' }
    ],
    verb: [
      { en: 'Birds can fly high in the sky without any effort.', cn: '鸟儿能毫不费力地在高空飞翔。' },
      { en: 'Can you help me carry these heavy boxes upstairs?', cn: '你能帮我把这些沉重的箱子上楼吗？' },
      { en: 'With enough practice, anyone can learn to play an instrument.', cn: '只要有足够的练习，任何人都能学会演奏乐器。' }
    ]
  },

  // ===== like (prep/verb) - 已有部分覆盖，改新格式 =====
  'like': {
    prep: [
      { en: 'She looks like her mother, with the same bright smile.', cn: '她长得像妈妈，有着同样灿烂的笑容。' },
      { en: 'It feels like summer even though it is only May.', cn: '虽然才五月，但感觉就像夏天一样。' }
    ],
    verb: [
      { en: 'I like to read books by the window on rainy afternoons.', cn: '我喜欢在下雨的下午靠窗读书。' },
      { en: 'The children like to play hide and seek in the garden.', cn: '孩子们喜欢在花园里玩捉迷藏。' }
    ]
  },

  // ===== nurse (noun/verb) - 缺动词！用户特别指出 =====
  'nurse': {
    noun: [
      { en: 'The nurse checked my temperature with a gentle smile.', cn: '护士带着温柔的微笑给我量了体温。' },
      { en: 'A kind nurse sat by the old man\'s bed all night long.', cn: '一位善良的护士整夜坐在老人的床边。' }
    ],
    verb: [
      { en: 'She nursed the injured bird back to health in a small box.', cn: '她把受伤的小鸟放在一个小盒子里照料，直到它康复。' },
      { en: 'Grandma nursed me carefully when I had a high fever.', cn: '我发高烧时，奶奶细心地照顾我。' }
    ]
  },

  // ===== taxi (noun/verb) - 缺动词 =====
  'taxi': {
    noun: [
      { en: 'We took a taxi to the airport because the bus was too slow.', cn: '我们乘出租车去机场，因为公交车太慢了。' },
      { en: 'The yellow taxi stopped at the corner and the passenger got out.', cn: '黄色出租车在拐角处停下，乘客下了车。' }
    ],
    verb: [
      { en: 'The plane taxied to the runway before taking off into the sky.', cn: '飞机滑向跑道，然后起飞升入天空。' }
    ]
  },

  // ===== taste (noun/verb) - 已有部分覆盖，改新格式 =====
  'taste': {
    noun: [
      { en: 'The cake had a wonderful taste of chocolate and vanilla.', cn: '蛋糕有着巧克力和香草的绝妙味道。' },
      { en: 'Everyone has a different taste in music and art.', cn: '每个人在音乐和艺术方面都有不同的品味。' }
    ],
    verb: [
      { en: 'I tasted the soup and added a little more salt.', cn: '我尝了尝汤，又加了一点盐。' },
      { en: 'You should taste the local dishes when you visit Yunnan.', cn: '你来云南时应该尝尝当地的菜肴。' }
    ]
  },

  // ===== fly (noun/verb) - 已有部分覆盖，改新格式 =====
  'fly': {
    noun: [
      { en: 'A fly buzzed around the room and landed on the window.', cn: '一只苍蝇在房间里嗡嗡叫，然后落在了窗户上。' },
      { en: 'He went on a fishing trip and caught nothing but flies.', cn: '他去钓鱼，结果除了苍蝇什么都没钓到。' }
    ],
    verb: [
      { en: 'The bird flew south before winter arrived.', cn: '冬天来临前，鸟儿飞往南方。' },
      { en: 'I will fly to Beijing to visit my grandparents next month.', cn: '下个月我要飞到北京看望祖父母。' },
      { en: 'Paper planes flew across the classroom during the break.', cn: '课间休息时，纸飞机飞过教室。' }
    ]
  },

  // ===== spring (noun/verb) - 已有部分覆盖，改新格式 =====
  'spring': {
    noun: [
      { en: 'Cherry blossoms bloom in spring and cover the hills in pink.', cn: '樱花在春天盛开，把山丘染成粉色。' },
      { en: 'The old sofa has a broken spring that pokes through the fabric.', cn: '旧沙发的弹簧断了，从布料里戳了出来。' }
    ],
    verb: [
      { en: 'The cat sprang onto the table and knocked over the vase.', cn: '猫跳上了桌子，打翻了花瓶。' },
      { en: 'Tears sprang to her eyes when she heard the good news.', cn: '听到好消息时，她的眼里涌出了泪水。' }
    ]
  },

  // ===== rain (noun/verb/adj) - 已有部分覆盖，改新格式 =====
  'rain': {
    noun: [
      { en: 'Heavy rain poured down and flooded the narrow streets.', cn: '大雨倾盆而下，淹没了狭窄的街道。' },
      { en: 'Farmers welcome the spring rain that helps the crops grow.', cn: '农民欢迎有助于庄稼生长的春雨。' }
    ],
    verb: [
      { en: 'It began to rain just as we stepped out of the house.', cn: '我们刚走出房子，天就开始下雨了。' },
      { en: 'Tears rained down her cheeks when she heard the sad story.', cn: '听到那个悲伤的故事时，泪水从她脸颊上落下。' }
    ],
    adj: [
      { en: 'We stayed indoors on the rainy afternoon and read books.', cn: '下雨的下午，我们待在屋里看书。' }
    ]
  }
};

module.exports = { highQualityExamples };
