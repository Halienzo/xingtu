/**
 * Batch 9: 继续修复多词性词词性覆盖（第五批剩余高频多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[], int:[]}
 */

const highQualityExamples = {

  // ===== adult (adj/noun) =====
  'adult': {
    adj: [
      { en: 'This movie is for adult audiences only.', cn: '这部电影仅供成年观众观看。' }
    ],
    noun: [
      { en: 'Children must be accompanied by an adult in the museum.', cn: '儿童在博物馆内必须由成年人陪同。' }
    ]
  },

  // ===== answer (noun/verb) =====
  'answer': {
    noun: [
      { en: 'The correct answer is written at the back of the book.', cn: '正确答案写在书的背面。' },
      { en: 'I waited for an answer to my email all morning.', cn: '我整个上午都在等待我邮件的回复。' }
    ],
    verb: [
      { en: 'Please answer the question in complete sentences.', cn: '请用完整的句子回答问题。' },
      { en: 'Nobody answered when I knocked on the door.', cn: '我敲门时没有人应答。' }
    ]
  },

  // ===== between (prep) =====
  'between': {
    prep: [
      { en: 'The small river runs between the two green hills.', cn: '这条小河在两座青山之间流淌。' },
      { en: 'Please choose between the red dress and the blue one.', cn: '请在红色裙子和蓝色裙子之间做出选择。' }
    ]
  },

  // ===== care (noun/verb) =====
  'care': {
    noun: [
      { en: 'The nurse took good care of the sick child.', cn: '护士悉心照料生病的孩子。' },
      { en: 'Handle this glass vase with care; it is very fragile.', cn: '小心处理这个玻璃花瓶，它很易碎。' }
    ],
    verb: [
      { en: 'I really care about the environment and want to protect it.', cn: '我非常关心环境，想要保护它。' },
      { en: 'She cares for her elderly grandmother every weekend.', cn: '她每个周末都照顾年迈的奶奶。' }
    ]
  },

  // ===== cycle (noun/verb) =====
  'cycle': {
    noun: [
      { en: 'The water cycle is an important topic in science class.', cn: '水循环是科学课上重要的主题。' },
      { en: 'I ride my cycle to school when the weather is nice.', cn: '天气好的时候，我骑自行车上学。' }
    ],
    verb: [
      { en: 'We cycle through the park every Sunday morning.', cn: '我们每个周日早上骑自行车穿过公园。' }
    ]
  },

  // ===== discovery (noun) =====
  'discovery': {
    noun: [
      { en: 'The discovery of penicillin saved millions of lives.', cn: '青霉素的发现拯救了数百万人的生命。' }
    ]
  },

  // ===== few (adj/pron) =====
  'few': {
    adj: [
      { en: 'Only a few students passed the difficult exam.', cn: '只有少数学生通过了这场困难的考试。' },
      { en: 'There are few apples left in the basket.', cn: '篮子里剩下的苹果不多了。' }
    ],
    pron: [
      { en: 'Few of us understood the complex math problem.', cn: '我们中很少有人理解这道复杂的数学题。' }
    ]
  },

  // ===== healthy (adj/adv) =====
  'healthy': {
    adj: [
      { en: 'Eating vegetables every day keeps you healthy.', cn: '每天吃蔬菜让你保持健康。' },
      { en: 'The healthy puppy ran around the garden all day.', cn: '那只健康的小狗整天在花园里跑来跑去。' }
    ]
  },

  // ===== helpful (adj) =====
  'helpful': {
    adj: [
      { en: 'The librarian was very helpful in finding the right book.', cn: '图书管理员在找到合适的书方面非常乐于助人。' },
      { en: 'It is helpful to make a list before going shopping.', cn: '购物前列个清单是很有帮助的。' }
    ]
  },

  // ===== increase (noun/verb) =====
  'increase': {
    noun: [
      { en: 'There has been a sharp increase in food prices this month.', cn: '本月食品价格大幅上涨。' }
    ],
    verb: [
      { en: 'The company plans to increase production next year.', cn: '公司计划明年增加产量。' },
      { en: 'Regular exercise can increase your energy levels.', cn: '规律的运动可以提高你的精力水平。' }
    ]
  },

  // ===== instead (adv/noun) =====
  'instead': {
    adv: [
      { en: 'I did not take the bus; I walked instead.', cn: '我没有坐公交车，而是走路去的。' },
      { en: 'Let us eat at home instead of going to a restaurant.', cn: '我们在家吃饭吧，不要去餐馆了。' }
    ]
  },

  // ===== instruction (noun) =====
  'instruction': {
    noun: [
      { en: 'Please read the instruction manual before using the machine.', cn: '使用机器前请阅读说明书。' },
      { en: 'The teacher gave clear instructions for the homework.', cn: '老师对作业给出了明确的指示。' }
    ]
  },

  // ===== last (adj/adv/noun/verb) =====
  'last': {
    adj: [
      { en: 'December is the last month of the year.', cn: '十二月是一年中的最后一个月。' },
      { en: 'This is the last piece of cake; who wants it?', cn: '这是最后一块蛋糕，谁要？' }
    ],
    adv: [
      { en: 'When did you last see your grandparents?', cn: '你上次见到祖父母是什么时候？' }
    ],
    noun: [
      { en: 'These shoes were made to last.', cn: '这些鞋子经久耐用。' }
    ]
  },

  // ===== left (adj/adv/noun) =====
  'left': {
    adj: [
      { en: 'There is no milk left in the refrigerator.', cn: '冰箱里没有牛奶了。' },
      { en: 'My left hand is not as strong as my right hand.', cn: '我的左手不如右手有力。' }
    ],
    adv: [
      { en: 'Turn left at the corner and you will see the hospital.', cn: '在拐角处向左转，你就会看到医院。' }
    ],
    noun: [
      { en: 'The political left supports more social programs.', cn: '政治左派支持更多的社会福利项目。' }
    ]
  },

  // ===== lock (noun/verb) =====
  'lock': {
    noun: [
      { en: 'The lock on the old door was rusted and difficult to open.', cn: '旧门上的锁生锈了，很难打开。' }
    ],
    verb: [
      { en: 'Please lock the door when you leave the house.', cn: '离开家时请锁门。' },
      { en: 'The two friends locked arms and walked down the street.', cn: '两个朋友挽着胳膊走在街上。' }
    ]
  },

  // ===== lot (noun/pron) =====
  'lot': {
    noun: [
      { en: 'We bought a vacant lot to build our new house.', cn: '我们买了一块空地来建造我们的新房子。' }
    ],
    pron: [
      { en: 'A lot of people came to the concert last night.', cn: '昨晚很多人来听了音乐会。' },
      { en: 'I have a lot to do before the deadline.', cn: '在截止日期前我有很多事情要做。' }
    ]
  },

  // ===== low (adj/adv/noun) =====
  'low': {
    adj: [
      { en: 'The plane flew at a low altitude over the village.', cn: '飞机在村庄上空低飞。' },
      { en: 'My phone battery is low; I need to charge it.', cn: '我的手机电量低了，我需要充电。' }
    ],
    adv: [
      { en: 'Please speak low so you do not wake the baby.', cn: '请小声说话，不要吵醒宝宝。' }
    ],
    noun: [
      { en: 'Temperatures reached a new low this winter.', cn: '今年冬天气温创下了新低。' }
    ]
  },

  // ===== manner (noun) =====
  'manner': {
    noun: [
      { en: 'Good manners are important when visiting someone\'s home.', cn: '拜访别人家时，良好的举止很重要。' },
      { en: 'She spoke in a calm and friendly manner.', cn: '她以平静友好的方式说话。' }
    ]
  },

  // ===== minute (noun/adj) =====
  'minute': {
    noun: [
      { en: 'Wait a minute; I need to find my keys.', cn: '等一下，我需要找到我的钥匙。' },
      { en: 'The meeting lasted exactly sixty minutes.', cn: '会议持续了整整六十分钟。' }
    ],
    adj: [
      { en: 'A minute difference in temperature can affect the experiment.', cn: '温度的微小差异会影响实验结果。' }
    ]
  },

  // ===== national (adj/noun) =====
  'national': {
    adj: [
      { en: 'The national flag was raised at sunrise.', cn: '国旗在日出时升起。' },
      { en: 'We visited the national museum during our trip.', cn: '旅途中我们参观了国家博物馆。' }
    ]
  },

  // ===== north (noun/adj/adv) =====
  'north': {
    noun: [
      { en: 'Canada lies to the north of the United States.', cn: '加拿大位于美国的北面。' }
    ],
    adj: [
      { en: 'The north side of the building gets more sunshine.', cn: '建筑物的北面获得更多阳光。' }
    ],
    adv: [
      { en: 'The birds fly north in spring to build their nests.', cn: '鸟儿春天飞往北方筑巢。' }
    ]
  },

  // ===== only (adj/adv) =====
  'only': {
    adj: [
      { en: 'She is the only child in her family.', cn: '她是家里唯一的孩子。' },
      { en: 'This is the only copy of the book left in the store.', cn: '这是店里剩下的唯一一本这种书。' }
    ],
    adv: [
      { en: 'I only ate breakfast this morning and skipped lunch.', cn: '我今天早上只吃了早餐，没吃午饭。' },
      { en: 'The movie is only showing for one more week.', cn: '这部电影只再上映一周了。' }
    ]
  },

  // ===== parachute (noun/verb) =====
  'parachute': {
    noun: [
      { en: 'The pilot escaped from the burning plane using a parachute.', cn: '飞行员用降落伞从燃烧的飞机中逃生。' }
    ],
    verb: [
      { en: 'Supplies were parachuted into the disaster area.', cn: '物资被空投到灾区。' }
    ]
  },

  // ===== race (noun/verb) =====
  'race': {
    noun: [
      { en: 'The horse race attracted thousands of spectators.', cn: '赛马比赛吸引了成千上万的观众。' },
      { en: 'Humans belong to the same race regardless of skin color.', cn: '无论肤色如何，人类都属于同一种族。' }
    ],
    verb: [
      { en: 'The two boys raced to the top of the hill.', cn: '两个男孩比赛跑到山顶。' },
      { en: 'She raced against time to finish the project before the deadline.', cn: '她与时间赛跑，想在截止日期前完成项目。' }
    ]
  },

  // ===== recycle (verb/noun) =====
  'recycle': {
    verb: [
      { en: 'We should recycle paper, plastic, and glass to protect the earth.', cn: '我们应该回收纸张、塑料和玻璃来保护地球。' },
      { en: 'The factory recycles old tires into playground surfaces.', cn: '这家工厂把旧轮胎回收制成游乐场地面。' }
    ],
    noun: [
      { en: 'Recycle is an important part of waste management.', cn: '回收利用是废物管理的重要部分。' }
    ]
  },

  // ===== share (verb/noun) =====
  'share': {
    verb: [
      { en: 'Please share your toys with your little brother.', cn: '请和你的弟弟分享你的玩具。' },
      { en: 'I want to share my happiness with all my friends.', cn: '我想和所有的朋友分享我的快乐。' }
    ],
    noun: [
      { en: 'He bought a share in the family business.', cn: '他购买了家族企业的一份股份。' }
    ]
  },

  // ===== skate (verb/noun) =====
  'skate': {
    verb: [
      { en: 'The children love to skate on the frozen pond in winter.', cn: '冬天孩子们喜欢在结冰的池塘上滑冰。' }
    ],
    noun: [
      { en: 'I need to buy a new pair of ice skates before the trip.', cn: '旅行前我需要买一双新的冰鞋。' }
    ]
  },

  // ===== skin (noun/verb) =====
  'skin': {
    noun: [
      { en: 'The snake shed its skin under the rock.', cn: '蛇在岩石下蜕皮。' },
      { en: 'Please wear sunscreen to protect your skin from the sun.', cn: '请涂防晒霜保护你的皮肤免受阳光伤害。' }
    ],
    verb: [
      { en: 'Be careful not to skin your knee on the rough ground.', cn: '小心别在粗糙的地面上擦破膝盖。' }
    ]
  },

  // ===== slice (noun/verb) =====
  'slice': {
    noun: [
      { en: 'Would you like a slice of watermelon on this hot day?', cn: '这么热的天，你想来一片西瓜吗？' },
      { en: 'Cut the bread into thin slices for the sandwiches.', cn: '把面包切成薄片做三明治。' }
    ],
    verb: [
      { en: 'Please slice the tomatoes carefully with a sharp knife.', cn: '请用锋利的刀小心地把西红柿切片。' }
    ]
  },

  // ===== stamp (noun/verb) =====
  'stamp': {
    noun: [
      { en: 'I collect colorful stamps from different countries.', cn: '我收集来自不同国家的彩色邮票。' },
      { en: 'Please put a stamp on the envelope before mailing it.', cn: '邮寄前请在信封上贴邮票。' }
    ],
    verb: [
      { en: 'The angry customer stamped his foot on the floor.', cn: '愤怒的顾客在地上跺脚。' }
    ]
  },

  // ===== sum (noun/verb) =====
  'sum': {
    noun: [
      { en: 'The sum of two and three is five.', cn: '二加三的和是五。' },
      { en: 'He paid a large sum of money for the antique vase.', cn: '他为这个古董花瓶支付了一大笔钱。' }
    ],
    verb: [
      { en: 'To sum up, we need to work harder to achieve our goal.', cn: '总而言之，我们需要更加努力工作来实现目标。' }
    ]
  },

  // ===== toast (noun/verb) =====
  'toast': {
    noun: [
      { en: 'I had buttered toast and orange juice for breakfast.', cn: '我早餐吃了涂黄油的吐司和橙汁。' }
    ],
    verb: [
      { en: 'We toasted the bride and groom at the wedding.', cn: '我们在婚礼上为新娘新郎干杯。' },
      { en: 'Please toast the bread until it is golden brown.', cn: '请把面包烤到金黄色。' }
    ]
  },

  // ===== total (noun/adj/adv/verb) =====
  'total': {
    adj: [
      { en: 'The total cost of the trip was five thousand yuan.', cn: '这次旅行的总费用是五千元。' }
    ],
    noun: [
      { en: 'The total came to more than I expected.', cn: '总数比我预期的要多。' }
    ],
    verb: [
      { en: 'The costs total more than our budget allows.', cn: '费用总额超过了我们的预算。' }
    ]
  },

  // ===== video (noun/verb) =====
  'video': {
    noun: [
      { en: 'We watched a funny video on the internet last night.', cn: '昨晚我们在网上看了一个有趣的视频。' },
      { en: 'The security video helped the police find the thief.', cn: '监控录像帮助警察找到了小偷。' }
    ],
    verb: [
      { en: 'She videoed the beautiful sunset with her phone.', cn: '她用手机拍摄了美丽的日落。' }
    ]
  },

  // ===== will (noun/verb) =====
  'will': {
    noun: [
      { en: 'Grandfather wrote his will before he passed away.', cn: '祖父去世前写下了遗嘱。' },
      { en: 'She has a strong will to succeed against all difficulties.', cn: '她有克服一切困难取得成功的坚强意志。' }
    ],
    verb: [
      { en: 'I will help you finish the project on time.', cn: '我会帮你按时完成项目。' },
      { en: 'The meeting will begin at nine o\'clock tomorrow.', cn: '会议将于明天九点开始。' }
    ]
  },

  // ===== wink (noun/verb) =====
  'wink': {
    verb: [
      { en: 'She winked at me to let me know everything was fine.', cn: '她向我眨了眨眼，让我知道一切都没问题。' }
    ],
    noun: [
      { en: 'He gave me a knowing wink before telling the joke.', cn: '他在讲笑话之前给了我一个会意的眨眼。' }
    ]
  },

  // ===== yesterday (noun/adv) =====
  'yesterday': {
    noun: [
      { en: 'Yesterday was the hottest day of the summer so far.', cn: '昨天是今年夏天到目前为止最热的一天。' }
    ],
    adv: [
      { en: 'I met an old friend yesterday at the bookstore.', cn: '我昨天在书店遇到了一位老朋友。' }
    ]
  }

};

module.exports = { highQualityExamples };
