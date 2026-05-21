/**
 * Batch 13: 继续修复多词性词词性覆盖（第九批真正有价值多性词）
 * 按词性分组格式 {noun:[], verb:[], adj:[], adv:[], prep:[], pron:[], conj:[]}
 */

const highQualityExamples = {

  // ===== agree (verb) =====
  'agree': {
    verb: [
      { en: 'I agree that this is the best solution.', cn: '我同意这是最好的解决方案。' },
      { en: 'We all agreed to meet at the park at noon.', cn: '我们都同意中午在公园见面。' }
    ]
  },

  // ===== any (adj/pron) =====
  'any': {
    adj: [
      { en: 'Do you have any questions about the homework?', cn: '你对作业有任何问题吗？' }
    ],
    pron: [
      { en: 'I could not find any in the store.', cn: '我在商店里一个也找不到。' }
    ]
  },

  // ===== arm (noun/verb) =====
  'arm': {
    noun: [
      { en: 'She broke her arm while skiing last winter.', cn: '去年冬天她滑雪时摔断了手臂。' }
    ],
    verb: [
      { en: 'The country armed itself for possible war.', cn: '这个国家武装自己以应对可能的战争。' }
    ]
  },

  // ===== below (prep/adv) =====
  'below': {
    prep: [
      { en: 'The temperature dropped below zero last night.', cn: '昨晚气温降到零度以下。' }
    ],
    adv: [
      { en: 'Please see the note below for more details.', cn: '详情请见下方注释。' }
    ]
  },

  // ===== challenge (noun/verb) =====
  'challenge': {
    noun: [
      { en: 'Learning a new language is a fun challenge.', cn: '学习一门新语言是一个有趣的挑战。' }
    ],
    verb: [
      { en: 'The new job will challenge you to grow.', cn: '这份新工作将挑战你成长。' }
    ]
  },

  // ===== chat (verb/noun) =====
  'chat': {
    verb: [
      { en: 'We chatted over coffee for an hour.', cn: '我们边喝咖啡边聊了一个小时。' }
    ],
    noun: [
      { en: 'Let us have a quick chat about the plan.', cn: '让我们快速聊一下这个计划。' }
    ]
  },

  // ===== cause (noun/verb) =====
  'cause': {
    noun: [
      { en: 'The cause of the fire is still unknown.', cn: '火灾的原因尚不清楚。' }
    ],
    verb: [
      { en: 'Smoking can cause serious health problems.', cn: '吸烟会导致严重的健康问题。' }
    ]
  },

  // ===== either (adv/conj) =====
  'either': {
    adv: [
      { en: 'I do not like coffee, and I do not like tea either.', cn: '我不喜欢咖啡，也不喜欢茶。' }
    ],
    conj: [
      { en: 'You can either stay or leave right now.', cn: '你要么留下，要么现在离开。' }
    ]
  },

  // ===== exercise (noun/verb) =====
  'exercise': {
    noun: [
      { en: 'Daily exercise is good for your heart.', cn: '每天锻炼对心脏有益。' }
    ],
    verb: [
      { en: 'You should exercise at least three times a week.', cn: '你应该每周至少锻炼三次。' }
    ]
  },

  // ===== exchange (noun/verb) =====
  'exchange': {
    noun: [
      { en: 'We had a cultural exchange with a French school.', cn: '我们与一所法国学校进行了文化交流。' }
    ],
    verb: [
      { en: 'They exchanged gifts at the Christmas party.', cn: '他们在圣诞派对上交换了礼物。' }
    ]
  },

  // ===== fear (noun/verb) =====
  'fear': {
    noun: [
      { en: 'The child has a fear of the dark.', cn: '这个孩子怕黑。' }
    ],
    verb: [
      { en: 'I fear that we might miss the train.', cn: '我担心我们可能会错过火车。' }
    ]
  },

  // ===== focus (noun/verb) =====
  'focus': {
    noun: [
      { en: 'The focus of the meeting was on budget cuts.', cn: '会议的重点是预算削减。' }
    ],
    verb: [
      { en: 'Please focus on your own work.', cn: '请专注于你自己的工作。' }
    ]
  },

  // ===== fun (noun/adj) =====
  'fun': {
    noun: [
      { en: 'We had a lot of fun at the amusement park.', cn: '我们在游乐园玩得很开心。' }
    ],
    adj: [
      { en: 'She is a fun person to be around.', cn: '她是一个有趣的人，和她在一起很开心。' }
    ]
  },

  // ===== guide (noun/verb) =====
  'guide': {
    noun: [
      { en: 'The tour guide showed us around the old city.', cn: '导游带我们游览了这座老城。' }
    ],
    verb: [
      { en: 'The stars guided the sailors across the ocean.', cn: '星星指引水手们穿越海洋。' }
    ]
  },

  // ===== hunt (noun/verb) =====
  'hunt': {
    noun: [
      { en: 'The wolf went on a hunt for food.', cn: '狼出去觅食了。' }
    ],
    verb: [
      { en: 'It is illegal to hunt endangered animals.', cn: '猎杀濒危动物是违法的。' }
    ]
  },

  // ===== hurry (noun/verb) =====
  'hurry': {
    noun: [
      { en: 'There is no hurry; we have plenty of time.', cn: '不用着急，我们有足够的时间。' }
    ],
    verb: [
      { en: 'Hurry up, or we will miss the bus.', cn: '快点，不然我们要错过公交车了。' }
    ]
  },

  // ===== interest (noun/verb) =====
  'interest': {
    noun: [
      { en: 'She has a strong interest in ancient history.', cn: '她对古代历史有浓厚的兴趣。' }
    ],
    verb: [
      { en: 'The story interested me from the first page.', cn: '这个故事从第一页就引起了我的兴趣。' }
    ]
  },

  // ===== joke (noun/verb) =====
  'joke': {
    noun: [
      { en: 'He told a funny joke that made everyone laugh.', cn: '他讲了一个有趣的笑话，让大家都笑了。' }
    ],
    verb: [
      { en: 'I was only joking; do not take it seriously.', cn: '我只是开玩笑，别当真。' }
    ]
  },

  // ===== line (noun/verb) =====
  'line': {
    noun: [
      { en: 'Please stand in line and wait your turn.', cn: '请排队等轮到你。' }
    ],
    verb: [
      { en: 'The street was lined with beautiful cherry trees.', cn: '街道两旁种满了美丽的樱花树。' }
    ]
  },

  // ===== live (verb/adj) =====
  'live': {
    verb: [
      { en: 'I live in a small apartment near the school.', cn: '我住在学校附近的一间小公寓里。' }
    ],
    adj: [
      { en: 'The concert will be broadcast live on television.', cn: '音乐会将在电视上直播。' }
    ]
  },

  // ===== mention (noun/verb) =====
  'mention': {
    noun: [
      { en: 'There was no mention of the problem in the report.', cn: '报告中没有提到这个问题。' }
    ],
    verb: [
      { en: 'Did she mention when she would arrive?', cn: '她提到她什么时候到吗？' }
    ]
  },

  // ===== natural (adj/noun) =====
  'natural': {
    adj: [
      { en: 'It is natural to feel nervous before an exam.', cn: '考试前感到紧张是正常的。' }
    ]
  },

  // ===== off (adv/prep) =====
  'off': {
    adv: [
      { en: 'The meeting has been put off until next week.', cn: '会议被推迟到下周。' }
    ],
    prep: [
      { en: 'The ball rolled off the table onto the floor.', cn: '球从桌上滚落到地板上。' }
    ]
  },

  // ===== once (adv/conj) =====
  'once': {
    adv: [
      { en: 'I have been to Paris once before.', cn: '我以前去过巴黎一次。' }
    ],
    conj: [
      { en: 'Once you start, you must finish the task.', cn: '一旦你开始，就必须完成任务。' }
    ]
  },

  // ===== pass (verb/noun) =====
  'pass': {
    verb: [
      { en: 'Please pass me the salt.', cn: '请把盐递给我。' }
    ],
    noun: [
      { en: 'He got a free pass to the museum.', cn: '他得到了博物馆的免费通行证。' }
    ]
  },

  // ===== practice (noun/verb) =====
  'practice': {
    noun: [
      { en: 'Practice makes perfect.', cn: '熟能生巧。' }
    ],
    verb: [
      { en: 'You need to practice the piano every day.', cn: '你需要每天练习钢琴。' }
    ]
  },

  // ===== pretty (adj/adv) =====
  'pretty': {
    adj: [
      { en: 'She wore a pretty dress to the party.', cn: '她穿了一条漂亮的裙子去参加聚会。' }
    ],
    adv: [
      { en: 'The test was pretty difficult.', cn: '这次考试相当难。' }
    ]
  },

  // ===== push (verb/noun) =====
  'push': {
    verb: [
      { en: 'Please push the door; do not pull it.', cn: '请推门，不要拉。' }
    ],
    noun: [
      { en: 'The army made a final push to win the battle.', cn: '军队发起了最后的进攻以赢得战斗。' }
    ]
  },

  // ===== record (noun/verb) =====
  'record': {
    noun: [
      { en: 'She holds the world record in the hundred-meter dash.', cn: '她保持着百米短跑的世界纪录。' }
    ],
    verb: [
      { en: 'We recorded the whole concert on video.', cn: '我们用录像记录了整个音乐会。' }
    ]
  },

  // ===== reply (noun/verb) =====
  'reply': {
    noun: [
      { en: 'I am still waiting for a reply to my email.', cn: '我仍在等待我邮件的回复。' }
    ],
    verb: [
      { en: 'She replied that she would come to the party.', cn: '她回复说她会来参加聚会。' }
    ]
  },

  // ===== research (noun/verb) =====
  'research': {
    noun: [
      { en: 'Scientific research takes a lot of time and patience.', cn: '科学研究需要大量的时间和耐心。' }
    ],
    verb: [
      { en: 'They are researching new ways to produce clean energy.', cn: '他们正在研究生产清洁能源的新方法。' }
    ]
  },

  // ===== respect (noun/verb) =====
  'respect': {
    noun: [
      { en: 'Children should show respect to their elders.', cn: '孩子应该尊敬长辈。' }
    ],
    verb: [
      { en: 'I respect her for her honesty and courage.', cn: '我因她的诚实和勇气而尊敬她。' }
    ]
  },

  // ===== return (noun/verb) =====
  'return': {
    noun: [
      { en: 'On his return from Paris, he brought me a gift.', cn: '他从巴黎回来时给我带了一件礼物。' }
    ],
    verb: [
      { en: 'Please return the book to the library by Friday.', cn: '请在周五前把书还回图书馆。' }
    ]
  },

  // ===== shoot (verb/noun) =====
  'shoot': {
    verb: [
      { en: 'The hunter aimed carefully before he shot.', cn: '猎人仔细瞄准后才开枪。' }
    ],
    noun: [
      { en: 'The bamboo shoot is a popular ingredient in Asian cooking.', cn: '竹笋是亚洲烹饪中受欢迎的食材。' }
    ]
  },

  // ===== stress (noun/verb) =====
  'stress': {
    noun: [
      { en: 'Too much stress can make you sick.', cn: '太多压力会让你生病。' }
    ],
    verb: [
      { en: 'The teacher stressed the importance of reading aloud.', cn: '老师强调了大声朗读的重要性。' }
    ]
  },

  // ===== tear (noun/verb) =====
  'tear': {
    noun: [
      { en: 'A tear rolled down her cheek when she heard the news.', cn: '听到这个消息时，一滴泪珠从她脸颊滑落。' }
    ],
    verb: [
      { en: 'Be careful not to tear the paper.', cn: '小心别把纸撕破了。' }
    ]
  },

  // ===== tip (noun/verb) =====
  'tip': {
    noun: [
      { en: 'Here is a useful tip for learning new words.', cn: '这里有一个学习新单词的有用技巧。' }
    ],
    verb: [
      { en: 'The boat tipped over in the strong wind.', cn: '船在大风中翻了。' }
    ]
  },

  // ===== transport (noun/verb) =====
  'transport': {
    noun: [
      { en: 'Public transport in the city is very convenient.', cn: '这个城市的公共交通非常便利。' }
    ],
    verb: [
      { en: 'The goods were transported by truck to the warehouse.', cn: '货物用卡车运到了仓库。' }
    ]
  },

  // ===== whenever (adv/conj) =====
  'whenever': {
    adv: [
      { en: 'Whenever I see her, she is always smiling.', cn: '每当我看到她，她总是在微笑。' }
    ]
  },

  // ===== wish (noun/verb) =====
  'wish': {
    noun: [
      { en: 'Make a wish before you blow out the candles.', cn: '吹蜡烛前许个愿。' }
    ],
    verb: [
      { en: 'I wish I could fly like a bird.', cn: '我希望我能像鸟一样飞。' }
    ]
  }

};

module.exports = { highQualityExamples };
