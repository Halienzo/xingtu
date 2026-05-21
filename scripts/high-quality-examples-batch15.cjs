/**
 * Batch 15: 继续修复多词性词词性覆盖（第十一批真正有价值多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[]}
 */

const highQualityExamples = {

  // ===== above (prep/adv) =====
  'above': {
    prep: [
      { en: 'The temperature stayed above thirty degrees all day.', cn: '气温一整天都保持在三十度以上。' }
    ],
    adv: [
      { en: 'The apartment above is always very noisy.', cn: '楼上的公寓总是很吵。' }
    ]
  },

  // ===== ache (noun/verb) =====
  'ache': {
    noun: [
      { en: 'I have a terrible ache in my back.', cn: '我的背部疼得厉害。' }
    ],
    verb: [
      { en: 'My legs ache after the long hike.', cn: '长途徒步后我的腿很疼。' }
    ]
  },

  // ===== alike (adj/adv) =====
  'alike': {
    adj: [
      { en: 'The two sisters look very much alike.', cn: '这两姐妹长得很像。' }
    ],
    adv: [
      { en: 'The twins dress alike and talk alike.', cn: '这对双胞胎穿着相似，说话也相似。' }
    ]
  },

  // ===== average (noun/adj) =====
  'average': {
    noun: [
      { en: 'His score was well above the class average.', cn: '他的分数远高于班级平均分。' }
    ],
    adj: [
      { en: 'The average age of the students is fifteen.', cn: '学生的平均年龄是十五岁。' }
    ]
  },

  // ===== beautiful (adj) =====
  'beautiful': {
    adj: [
      { en: 'The sunset over the ocean was beautiful.', cn: '海上的日落很美。' }
    ]
  },

  // ===== block (noun/verb) =====
  'block': {
    noun: [
      { en: 'There is a post office on the next block.', cn: '下一条街区有一个邮局。' }
    ],
    verb: [
      { en: 'A fallen tree blocked the road after the storm.', cn: '暴风雨后一棵倒下的树挡住了道路。' }
    ]
  },

  // ===== budget (noun/verb) =====
  'budget': {
    noun: [
      { en: 'We need to stay within our budget for the trip.', cn: '我们需要在旅行预算内消费。' }
    ],
    verb: [
      { en: 'The family budgets carefully every month.', cn: '这家人每个月都仔细做预算。' }
    ]
  },

  // ===== camp (noun/verb) =====
  'camp': {
    noun: [
      { en: 'We set up camp by the river for the night.', cn: '我们在河边扎营过夜。' }
    ],
    verb: [
      { en: 'The family loves to camp in the mountains during summer.', cn: '这家人喜欢夏天在山里露营。' }
    ]
  },

  // ===== cough (noun/verb) =====
  'cough': {
    noun: [
      { en: 'His cough kept him awake all night.', cn: '他的咳嗽让他整夜无法入睡。' }
    ],
    verb: [
      { en: 'Please cover your mouth when you cough.', cn: '咳嗽时请捂住嘴。' }
    ]
  },

  // ===== encourage (verb) =====
  'encourage': {
    verb: [
      { en: 'Teachers should encourage students to ask questions.', cn: '老师应该鼓励学生提问。' },
      { en: 'Her parents always encourage her to follow her dreams.', cn: '她的父母总是鼓励她追寻梦想。' }
    ]
  },

  // ===== Europe (noun) =====
  'europe': {
    noun: [
      { en: 'Europe is known for its rich history and culture.', cn: '欧洲以其丰富的历史和文化而闻名。' }
    ]
  },

  // ===== excuse (noun/verb) =====
  'excuse': {
    noun: [
      { en: 'That is no excuse for being late.', cn: '那不是迟到的借口。' }
    ],
    verb: [
      { en: 'Please excuse me; I need to take this call.', cn: '请原谅我，我需要接这个电话。' }
    ]
  },

  // ===== here (adv/noun) =====
  'here': {
    adv: [
      { en: 'Please come here; I need your help.', cn: '请过来，我需要你的帮助。' }
    ],
    noun: [
      { en: 'From here, you can see the whole city.', cn: '从这里你可以看到整座城市。' }
    ]
  },

  // ===== host (noun/verb) =====
  'host': {
    noun: [
      { en: 'The host welcomed all the guests at the door.', cn: '主人在门口欢迎了所有客人。' }
    ],
    verb: [
      { en: 'Our school will host the music competition next month.', cn: '我们学校下个月将主办音乐比赛。' }
    ]
  },

  // ===== imagine (verb) =====
  'imagine': {
    verb: [
      { en: 'Can you imagine life without electricity?', cn: '你能想象没有电的生活吗？' },
      { en: 'I never imagined that I would win first prize.', cn: '我从未想过我会获得一等奖。' }
    ]
  },

  // ===== improve (verb) =====
  'improve': {
    verb: [
      { en: 'Your English will improve if you practice every day.', cn: '如果你每天练习，你的英语会提高。' },
      { en: 'We need to improve the quality of our products.', cn: '我们需要提高产品质量。' }
    ]
  },

  // ===== painting (noun) =====
  'painting': {
    noun: [
      { en: 'The painting in the museum is over five hundred years old.', cn: '博物馆里的这幅画已有五百多年历史。' }
    ]
  },

  // ===== relaxed (adj) =====
  'relaxed': {
    adj: [
      { en: 'I feel so relaxed after a long vacation.', cn: '长假过后我感到很放松。' }
    ]
  },

  // ===== sad (adj) =====
  'sad': {
    adj: [
      { en: 'It is sad to say goodbye to good friends.', cn: '和好朋友道别是令人难过的。' },
      { en: 'The movie had a sad ending that made me cry.', cn: '这部电影有一个悲伤的结局，让我哭了。' }
    ]
  },

  // ===== silly (adj) =====
  'silly': {
    adj: [
      { en: 'Do not be silly; of course you can do it.', cn: '别傻了，你当然能做到。' }
    ]
  },

  // ===== state (noun/verb) =====
  'state': {
    noun: [
      { en: 'The state provides free education to all children.', cn: '国家为所有儿童提供免费教育。' }
    ],
    verb: [
      { en: 'Please state your name and address clearly.', cn: '请清楚地说出你的姓名和地址。' }
    ]
  },

  // ===== stove (noun) =====
  'stove': {
    noun: [
      { en: 'She put the kettle on the stove to boil water.', cn: '她把水壶放在炉子上烧水。' }
    ]
  },

  // ===== travel (verb/noun) =====
  'travel': {
    verb: [
      { en: 'I love to travel and explore new places.', cn: '我喜欢旅行和探索新地方。' }
    ],
    noun: [
      { en: 'Air travel has become much faster than before.', cn: '航空旅行比以前快多了。' }
    ]
  },

  // ===== unhappy (adj) =====
  'unhappy': {
    adj: [
      { en: 'The unhappy child sat alone in the corner.', cn: '这个不高兴的孩子独自坐在角落里。' }
    ]
  },

  // ===== vacation (noun) =====
  'vacation': {
    noun: [
      { en: 'We are going on vacation to the beach next week.', cn: '我们下周要去海滩度假。' }
    ]
  },

  // ===== wake (verb) =====
  'wake': {
    verb: [
      { en: 'I usually wake up at six in the morning.', cn: '我通常早上六点醒来。' },
      { en: 'The loud noise woke the whole neighborhood.', cn: '巨大的噪音吵醒了整个街区。' }
    ]
  },

  // ===== western (adj) =====
  'western': {
    adj: [
      { en: 'Western culture has influenced many countries.', cn: '西方文化影响了许多国家。' }
    ]
  },

  // ===== wherever (adv/conj) =====
  'wherever': {
    adv: [
      { en: 'Wherever you go, I will follow.', cn: '无论你去哪里，我都会跟随。' }
    ]
  }

};

module.exports = { highQualityExamples };
