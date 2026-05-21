/**
 * Batch 14: 继续修复多词性词词性覆盖（第十批真正有价值多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[]}
 */

const highQualityExamples = {

  // ===== aid (noun/verb) =====
  'aid': {
    noun: [
      { en: 'The government sent aid to the flood victims.', cn: '政府向洪灾受害者提供了援助。' }
    ],
    verb: [
      { en: 'The new medicine aids in the treatment of the disease.', cn: '这种新药有助于治疗该疾病。' }
    ]
  },

  // ===== best (adj/adv/noun) =====
  'best': {
    adj: [
      { en: 'She is the best student in our class.', cn: '她是我们班最好的学生。' }
    ],
    adv: [
      { en: 'He works best in the morning.', cn: '他在上午工作效率最高。' }
    ],
    noun: [
      { en: 'I wish you all the best in your new job.', cn: '祝你在新工作中一切顺利。' }
    ]
  },

  // ===== check (noun/verb) =====
  'check': {
    noun: [
      { en: 'Please write a check for the full amount.', cn: '请写一张全额支票。' }
    ],
    verb: [
      { en: 'Do not forget to check your answers before submitting.', cn: '提交前别忘了检查你的答案。' }
    ]
  },

  // ===== chief (adj/noun) =====
  'chief': {
    adj: [
      { en: 'The chief reason for his success is hard work.', cn: '他成功的主要原因是努力工作。' }
    ],
    noun: [
      { en: 'The police chief gave a press conference.', cn: '警察局长举行了新闻发布会。' }
    ]
  },

  // ===== clear (adj/verb) =====
  'clear': {
    adj: [
      { en: 'The sky was clear and full of stars.', cn: '天空晴朗，繁星点点。' }
    ],
    verb: [
      { en: 'Please clear the table after dinner.', cn: '晚饭后请收拾桌子。' }
    ]
  },

  // ===== comedy (noun) =====
  'comedy': {
    noun: [
      { en: 'The new comedy movie made everyone laugh.', cn: '这部新喜剧电影让所有人都笑了。' }
    ]
  },

  // ===== control (noun/verb) =====
  'control': {
    noun: [
      { en: 'The pilot lost control of the plane in the storm.', cn: '飞行员在暴风雨中失去了对飞机的控制。' }
    ],
    verb: [
      { en: 'It is hard to control your anger sometimes.', cn: '有时很难控制你的愤怒。' }
    ]
  },

  // ===== cure (noun/verb) =====
  'cure': {
    noun: [
      { en: 'Scientists are still looking for a cure for cancer.', cn: '科学家们仍在寻找癌症的治疗方法。' }
    ],
    verb: [
      { en: 'The doctor cured his illness with a new treatment.', cn: '医生用新疗法治愈了他的病。' }
    ]
  },

  // ===== design (noun/verb) =====
  'design': {
    noun: [
      { en: 'The design of the new building is very modern.', cn: '这座新建筑的设计非常现代。' }
    ],
    verb: [
      { en: 'She designs beautiful clothes for a famous brand.', cn: '她为一家知名品牌设计漂亮的服装。' }
    ]
  },

  // ===== difference (noun) =====
  'difference': {
    noun: [
      { en: 'There is a big difference between the two plans.', cn: '这两个计划之间有很大差异。' }
    ]
  },

  // ===== direct (adj/adv/verb) =====
  'direct': {
    adj: [
      { en: 'The direct flight to Tokyo takes three hours.', cn: '直飞东京的航班需要三小时。' }
    ],
    adv: [
      { en: 'I will call you direct tomorrow morning.', cn: '我明天早上直接给你打电话。' }
    ],
    verb: [
      { en: 'The guide directed us to the nearest exit.', cn: '导游指引我们去了最近的出口。' }
    ]
  },

  // ===== easy (adj/adv) =====
  'easy': {
    adj: [
      { en: 'This math problem is not as easy as it looks.', cn: '这道数学题不像看起来那么简单。' }
    ],
    adv: [
      { en: 'Take it easy; there is no rush.', cn: '放轻松，不用着急。' }
    ]
  },

  // ===== far (adv/adj) =====
  'far': {
    adv: [
      { en: 'How far is it from here to the train station?', cn: '从这里到火车站有多远？' }
    ],
    adj: [
      { en: 'The far side of the lake is covered with trees.', cn: '湖的远端被树木覆盖。' }
    ]
  },

  // ===== farm (noun/verb) =====
  'farm': {
    noun: [
      { en: 'My grandparents live on a small farm in the countryside.', cn: '我的祖父母住在乡下一个小农场里。' }
    ],
    verb: [
      { en: 'They farm organic vegetables and sell them at the market.', cn: '他们种植有机蔬菜并在市场上销售。' }
    ]
  },

  // ===== final (adj/noun) =====
  'final': {
    adj: [
      { en: 'This is the final exam of the semester.', cn: '这是本学期的期末考试。' }
    ],
    noun: [
      { en: 'The team reached the final of the competition.', cn: '这支队伍进入了比赛的决赛。' }
    ]
  },

  // ===== human (noun/adj) =====
  'human': {
    noun: [
      { en: 'Humans have the ability to think and create.', cn: '人类具有思考和创造的能力。' }
    ],
    adj: [
      { en: 'It is important to understand human nature.', cn: '理解人性很重要。' }
    ]
  },

  // ===== less (adj/adv/pron) =====
  'less': {
    adj: [
      { en: 'I have less money than I thought.', cn: '我的钱比我想象的少。' }
    ],
    adv: [
      { en: 'She eats less now to stay healthy.', cn: '她现在吃得少了，以保持健康。' }
    ],
    pron: [
      { en: 'Less is more when it comes to design.', cn: '说到设计，少即是多。' }
    ]
  },

  // ===== offer (noun/verb) =====
  'offer': {
    noun: [
      { en: 'I received a job offer from a big company.', cn: '我收到了一家大公司的录用通知。' }
    ],
    verb: [
      { en: 'They offered to help us move the furniture.', cn: '他们主动提出帮我们搬家具。' }
    ]
  },

  // ===== order (noun/verb) =====
  'order': {
    noun: [
      { en: 'Please place your order at the counter.', cn: '请在柜台点餐。' }
    ],
    verb: [
      { en: 'I ordered a pizza for dinner.', cn: '我点了一个披萨当晚餐。' }
    ]
  },

  // ===== quality (noun/adj) =====
  'quality': {
    noun: [
      { en: 'This product is known for its high quality.', cn: '这款产品以其高品质而闻名。' }
    ]
  },

  // ===== report (noun/verb) =====
  'report': {
    noun: [
      { en: 'The weather report says it will rain tomorrow.', cn: '天气预报说明天会下雨。' }
    ],
    verb: [
      { en: 'Please report any problems to the manager.', cn: '请向经理报告任何问题。' }
    ]
  },

  // ===== ring (noun/verb) =====
  'ring': {
    noun: [
      { en: 'She wore a beautiful gold ring on her finger.', cn: '她手指上戴着一枚美丽的金戒指。' }
    ],
    verb: [
      { en: 'The phone will ring when your food is ready.', cn: '食物准备好时电话会响。' }
    ]
  },

  // ===== search (noun/verb) =====
  'search': {
    noun: [
      { en: 'The search for the missing child lasted three days.', cn: '寻找失踪儿童的搜寻持续了三天。' }
    ],
    verb: [
      { en: 'I searched everywhere but could not find my keys.', cn: '我到处找都没找到我的钥匙。' }
    ]
  },

  // ===== serious (adj/adv) =====
  'serious': {
    adj: [
      { en: 'This is a serious problem that needs immediate attention.', cn: '这是一个需要立即关注的严重问题。' }
    ]
  },

  // ===== smile (noun/verb) =====
  'smile': {
    noun: [
      { en: 'Her smile lit up the whole room.', cn: '她的微笑照亮了整个房间。' }
    ],
    verb: [
      { en: 'The baby smiled when he saw his mother.', cn: '宝宝看到妈妈时笑了。' }
    ]
  },

  // ===== speak (verb/noun) =====
  'speak': {
    verb: [
      { en: 'Do you speak English?', cn: '你说英语吗？' }
    ]
  },

  // ===== straight (adv/adj) =====
  'straight': {
    adv: [
      { en: 'Go straight ahead and you will see the hospital.', cn: '一直往前走，你就会看到医院。' }
    ],
    adj: [
      { en: 'Draw a straight line from point A to point B.', cn: '从A点到B点画一条直线。' }
    ]
  },

  // ===== study (noun/verb) =====
  'study': {
    noun: [
      { en: 'The study of history helps us understand the present.', cn: '学习历史有助于我们理解当下。' }
    ],
    verb: [
      { en: 'I need to study harder for the final exam.', cn: '我需要为期末考试更努力学习。' }
    ]
  },

  // ===== transport (noun/verb) =====
  'transport': {
    noun: [
      { en: 'Public transport in this city is very efficient.', cn: '这个城市的公共交通非常高效。' }
    ],
    verb: [
      { en: 'Goods are transported by ship across the ocean.', cn: '货物通过船只跨洋运输。' }
    ]
  },

  // ===== trouble (noun/verb) =====
  'trouble': {
    noun: [
      { en: 'The old car has been nothing but trouble.', cn: '这辆旧车一直是个麻烦。' }
    ],
    verb: [
      { en: 'I am sorry to trouble you, but could you help me?', cn: '很抱歉打扰你，但你能帮我吗？' }
    ]
  },

  // ===== voice (noun/verb) =====
  'voice': {
    noun: [
      { en: 'She has a beautiful singing voice.', cn: '她有一副美妙的歌喉。' }
    ],
    verb: [
      { en: 'Parents voiced their concerns at the school meeting.', cn: '家长们在学校会议上表达了他们的担忧。' }
    ]
  },

  // ===== warn (verb) =====
  'warn': {
    verb: [
      { en: 'The sign warns drivers of the sharp turn ahead.', cn: '标志警告驾驶员前方有急转弯。' }
    ]
  },

  // ===== waste (noun/verb) =====
  'waste': {
    noun: [
      { en: 'The factory produces a lot of industrial waste.', cn: '这家工厂产生大量工业废料。' }
    ],
    verb: [
      { en: 'Do not waste water; turn off the tap when not in use.', cn: '不要浪费水，不用时关掉水龙头。' }
    ]
  },

  // ===== worry (noun/verb) =====
  'worry': {
    noun: [
      { en: 'Money is a constant worry for many families.', cn: '金钱是许多家庭持续的担忧。' }
    ],
    verb: [
      { en: 'Do not worry; everything will be fine.', cn: '别担心，一切都会好起来的。' }
    ]
  },

  // ===== worse (adj/adv) =====
  'worse': {
    adj: [
      { en: 'The weather got worse as the day went on.', cn: '随着时间推移，天气变得更糟了。' }
    ],
    adv: [
      { en: 'She sings worse than her sister.', cn: '她唱得比她姐姐差。' }
    ]
  }

};

module.exports = { highQualityExamples };
