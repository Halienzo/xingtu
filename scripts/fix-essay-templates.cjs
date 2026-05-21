const fs = require('fs');

console.log('Loading calendarData.json...');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
let fixCount = 0;

function isEssayTemplate(ex) {
  return ex.includes('essay about') && ex.includes('helps describe');
}

function hashWordPos(word, pos) {
  let h = 0;
  const s = (word + '|' + pos).toLowerCase();
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// 功能词例句库（复用之前的，加上更多）
const functionWordExamples = {
  'a': [
    {en: 'I have a new book.', cn: '我有一本新书。'},
    {en: 'This is a beautiful day.', cn: '这是美好的一天。'},
    {en: 'She is a kind girl.', cn: '她是一个善良的女孩。'}
  ],
  'an': [
    {en: 'I ate an apple for breakfast.', cn: '我早餐吃了一个苹果。'},
    {en: 'This is an interesting story.', cn: '这是一个有趣的故事。'}
  ],
  'the': [
    {en: 'The sun rises in the east.', cn: '太阳从东方升起。'},
    {en: 'I like the color of the sky.', cn: '我喜欢天空的颜色。'},
    {en: 'The book on the desk is mine.', cn: '桌子上的书是我的。'}
  ],
  'and': [
    {en: 'I like tea and coffee.', cn: '我喜欢茶和咖啡。'},
    {en: 'She is smart and hard-working.', cn: '她聪明又勤奋。'},
    {en: 'Tom and Jerry are good friends.', cn: '汤姆和杰瑞是好朋友。'}
  ],
  'or': [
    {en: 'Do you want tea or coffee?', cn: '你想喝茶还是咖啡？'},
    {en: 'You can stay or go now.', cn: '你可以留下或者现在走。'},
    {en: 'Hurry up, or you will be late.', cn: '快点，否则你要迟到了。'}
  ],
  'but': [
    {en: 'I am tired, but I will keep going.', cn: '我很累，但我会继续。'},
    {en: 'She is small, but she is strong.', cn: '她个子小，但很强壮。'},
    {en: 'I wanted to go, but it rained.', cn: '我想去，但下雨了。'}
  ],
  'are': [
    {en: 'They are my classmates.', cn: '他们是我的同学。'},
    {en: 'You are very helpful.', cn: '你非常乐于助人。'},
    {en: 'We are ready for the test.', cn: '我们准备好考试了。'}
  ],
  'is': [
    {en: 'She is a good student.', cn: '她是一名好学生。'},
    {en: 'The weather is nice today.', cn: '今天天气很好。'},
    {en: 'My favorite color is blue.', cn: '我最喜欢的颜色是蓝色。'}
  ],
  'was': [
    {en: 'He was late for school yesterday.', cn: '他昨天上学迟到了。'},
    {en: 'The movie was very exciting.', cn: '这部电影非常精彩。'},
    {en: 'It was a wonderful day.', cn: '那是美好的一天。'}
  ],
  'were': [
    {en: 'They were happy to see us.', cn: '他们很高兴见到我们。'},
    {en: 'We were in the park last Sunday.', cn: '我们上周日在公园里。'}
  ],
  'be': [
    {en: 'I want to be a doctor.', cn: '我想成为一名医生。'},
    {en: 'It is important to be honest.', cn: '诚实很重要。'},
    {en: 'Please be quiet in the library.', cn: '请在图书馆保持安静。'}
  ],
  'been': [
    {en: 'I have been to Beijing twice.', cn: '我去过北京两次。'},
    {en: 'She has been busy lately.', cn: '她最近一直很忙。'}
  ],
  'being': [
    {en: 'He is being very kind today.', cn: '他今天非常友善。'},
    {en: 'I enjoy being with my family.', cn: '我喜欢和家人在一起。'}
  ],
  'am': [
    {en: 'I am a middle school student.', cn: '我是一名中学生。'},
    {en: 'I am glad to meet you.', cn: '很高兴见到你。'}
  ],
  'have': [
    {en: 'I have a lovely dog.', cn: '我有一只可爱的狗。'},
    {en: 'We have English class every day.', cn: '我们每天都有英语课。'}
  ],
  'has': [
    {en: 'She has long black hair.', cn: '她有一头乌黑的长发。'},
    {en: 'He has a great idea.', cn: '他有一个好主意。'}
  ],
  'had': [
    {en: 'I had a good time yesterday.', cn: '我昨天玩得很开心。'},
    {en: 'She had finished her homework.', cn: '她已经完成了作业。'}
  ],
  'do': [
    {en: 'I do my homework after school.', cn: '我放学后做作业。'},
    {en: 'What do you want to eat?', cn: '你想吃什么？'}
  ],
  'does': [
    {en: 'She does well in math.', cn: '她数学学得很好。'},
    {en: 'What does this word mean?', cn: '这个词是什么意思？'}
  ],
  'did': [
    {en: 'I did my best in the exam.', cn: '我考试尽力了。'},
    {en: 'What did you do last weekend?', cn: '你上周末做了什么？'}
  ],
  'will': [
    {en: 'I will help you with English.', cn: '我会帮你学英语。'},
    {en: 'It will rain tomorrow.', cn: '明天会下雨。'}
  ],
  'would': [
    {en: 'I would like a cup of tea.', cn: '我想要一杯茶。'},
    {en: 'She would often read books.', cn: '她以前经常读书。'}
  ],
  'could': [
    {en: 'I could swim when I was five.', cn: '我五岁时就会游泳了。'},
    {en: 'Could you help me, please?', cn: '请问你能帮我吗？'}
  ],
  'should': [
    {en: 'You should drink more water.', cn: '你应该多喝水。'},
    {en: 'We should protect the environment.', cn: '我们应该保护环境。'}
  ],
  'may': [
    {en: 'You may leave now.', cn: '你现在可以离开了。'},
    {en: 'It may rain this afternoon.', cn: '今天下午可能会下雨。'}
  ],
  'might': [
    {en: 'I might go to the cinema tonight.', cn: '我今晚可能去看电影。'},
    {en: 'She might be at home now.', cn: '她现在可能在家。'}
  ],
  'must': [
    {en: 'You must finish your homework.', cn: '你必须完成作业。'},
    {en: 'We must follow the rules.', cn: '我们必须遵守规则。'}
  ],
  'shall': [
    {en: 'Shall we go for a walk?', cn: '我们去散步好吗？'},
    {en: 'We shall meet at noon.', cn: '我们中午见面。'}
  ],
  'can': [
    {en: 'I can play the piano.', cn: '我会弹钢琴。'},
    {en: 'Birds can fly in the sky.', cn: '鸟儿可以在天空飞翔。'},
    {en: 'Can you speak English?', cn: '你会说英语吗？'}
  ],
  'need': [
    {en: 'I need your help.', cn: '我需要你的帮助。'},
    {en: 'You need to study harder.', cn: '你需要更努力学习。'}
  ],
  'dare': [
    {en: 'I dare not go out at night.', cn: '我晚上不敢出门。'},
    {en: 'How dare you say that?', cn: '你怎么敢那样说？'}
  ],
  'at': [
    {en: 'We meet at the school gate.', cn: '我们在校门口见面。'},
    {en: 'I get up at six o\'clock.', cn: '我六点起床。'},
    {en: 'Look at the blackboard, please.', cn: '请看黑板。'}
  ],
  'in': [
    {en: 'The book is in my bag.', cn: '书在我的包里。'},
    {en: 'I was born in 2010.', cn: '我出生于2010年。'},
    {en: 'She lives in Kunming.', cn: '她住在昆明。'}
  ],
  'on': [
    {en: 'The cat is on the table.', cn: '猫在桌子上。'},
    {en: 'I go to school on Monday.', cn: '我周一去上学。'},
    {en: 'Turn on the light, please.', cn: '请把灯打开。'}
  ],
  'to': [
    {en: 'I go to school every day.', cn: '我每天去上学。'},
    {en: 'I want to be a teacher.', cn: '我想成为一名老师。'},
    {en: 'Give the book to me, please.', cn: '请把书给我。'}
  ],
  'of': [
    {en: 'This is a cup of tea.', cn: '这是一杯茶。'},
    {en: 'I am proud of my team.', cn: '我为我的团队感到骄傲。'},
    {en: 'The capital of Yunnan is Kunming.', cn: '云南的省会是昆明。'}
  ],
  'for': [
    {en: 'This gift is for you.', cn: '这个礼物是给你的。'},
    {en: 'I study hard for my future.', cn: '我为我的未来努力学习。'},
    {en: 'Thank you for your help.', cn: '感谢你的帮助。'}
  ],
  'with': [
    {en: 'I go to school with my friend.', cn: '我和朋友一起去上学。'},
    {en: 'She is happy with her work.', cn: '她对自己的工作很满意。'},
    {en: 'Fill the bottle with water.', cn: '把瓶子装满水。'}
  ],
  'by': [
    {en: 'I go to school by bus.', cn: '我乘公交车上学。'},
    {en: 'The book was written by Lu Xun.', cn: '这本书是鲁迅写的。'},
    {en: 'Stand by me, please.', cn: '请站在我身边。'}
  ],
  'from': [
    {en: 'I come from Yunnan.', cn: '我来自云南。'},
    {en: 'The letter is from my teacher.', cn: '这封信来自我的老师。'},
    {en: 'I learn a lot from books.', cn: '我从书中学到很多。'}
  ],
  'up': [
    {en: 'I get up at seven.', cn: '我七点起床。'},
    {en: 'Please pick up your pen.', cn: '请拿起你的笔。'},
    {en: 'Stand up, please.', cn: '请站起来。'}
  ],
  'about': [
    {en: 'Tell me about your school.', cn: '告诉我关于你的学校。'},
    {en: 'What are you talking about?', cn: '你们在谈论什么？'},
    {en: 'This book is about nature.', cn: '这本书是关于自然的。'}
  ],
  'into': [
    {en: 'The cat jumped into the box.', cn: '猫跳进了盒子里。'},
    {en: 'Please put the books into the bag.', cn: '请把书放进包里。'}
  ],
  'through': [
    {en: 'We walked through the forest.', cn: '我们穿过了森林。'},
    {en: 'I read through the whole book.', cn: '我读完了整本书。'}
  ],
  'before': [
    {en: 'Wash your hands before dinner.', cn: '饭前要洗手。'},
    {en: 'I had never seen him before.', cn: '我以前从未见过他。'}
  ],
  'after': [
    {en: 'I play basketball after school.', cn: '我放学后打篮球。'},
    {en: 'Please close the door after you.', cn: '请随手关门。'}
  ],
  'above': [
    {en: 'The picture is above the desk.', cn: '画在书桌上方。'},
    {en: 'The temperature is above zero.', cn: '温度在零度以上。'}
  ],
  'below': [
    {en: 'The basement is below the ground.', cn: '地下室在地面以下。'},
    {en: 'Please write your name below.', cn: '请在下方写上你的名字。'}
  ],
  'between': [
    {en: 'The school is between two parks.', cn: '学校在两个公园之间。'},
    {en: 'Please sit between Tom and me.', cn: '请坐在汤姆和我之间。'}
  ],
  'among': [
    {en: 'She is popular among her friends.', cn: '她在朋友中很受欢迎。'},
    {en: 'The house stands among trees.', cn: '房子坐落在树林中。'}
  ],
  'it': [
    {en: 'It is a sunny day.', cn: '今天是晴天。'},
    {en: 'I like it very much.', cn: '我非常喜欢它。'},
    {en: 'It is important to read every day.', cn: '每天阅读很重要。'}
  ],
  'its': [
    {en: 'The dog wagged its tail.', cn: '狗摇了摇它的尾巴。'},
    {en: 'The tree lost its leaves.', cn: '树落下了它的叶子。'}
  ],
  'this': [
    {en: 'This is my favorite book.', cn: '这是我最喜欢的书。'},
    {en: 'I like this color very much.', cn: '我非常喜欢这种颜色。'}
  ],
  'that': [
    {en: 'That is a beautiful painting.', cn: '那是一幅美丽的画。'},
    {en: 'I know that he is right.', cn: '我知道他是对的。'}
  ],
  'these': [
    {en: 'These apples are very fresh.', cn: '这些苹果很新鲜。'},
    {en: 'I like these flowers.', cn: '我喜欢这些花。'}
  ],
  'those': [
    {en: 'Those students are from Class 3.', cn: '那些学生来自三班。'},
    {en: 'I prefer those shoes.', cn: '我更喜欢那双鞋。'}
  ],
  'i': [
    {en: 'I love my family.', cn: '我爱我的家人。'},
    {en: 'I am a student.', cn: '我是一名学生。'}
  ],
  'me': [
    {en: 'He gave me a pen.', cn: '他给了我一支笔。'},
    {en: 'Please help me.', cn: '请帮帮我。'}
  ],
  'my': [
    {en: 'This is my schoolbag.', cn: '这是我的书包。'},
    {en: 'My mother is a teacher.', cn: '我的妈妈是一位老师。'}
  ],
  'mine': [
    {en: 'This book is mine.', cn: '这本书是我的。'},
    {en: 'The red pen is mine.', cn: '那支红笔是我的。'}
  ],
  'myself': [
    {en: 'I did it by myself.', cn: '我自己做的。'},
    {en: 'I taught myself English.', cn: '我自学英语。'}
  ],
  'you': [
    {en: 'You are very kind.', cn: '你很善良。'},
    {en: 'I will help you.', cn: '我会帮助你的。'}
  ],
  'your': [
    {en: 'What is your name?', cn: '你叫什么名字？'},
    {en: 'Is this your book?', cn: '这是你的书吗？'}
  ],
  'yours': [
    {en: 'This pen is yours.', cn: '这支笔是你的。'},
    {en: 'Is this classroom yours?', cn: '这间教室是你们的吗？'}
  ],
  'yourself': [
    {en: 'Please help yourself.', cn: '请自便。'},
    {en: 'Believe in yourself.', cn: '相信你自己。'}
  ],
  'yourselves': [
    {en: 'Help yourselves to some tea.', cn: '请随便喝茶。'}
  ],
  'he': [
    {en: 'He is my brother.', cn: '他是我的哥哥。'},
    {en: 'He likes playing football.', cn: '他喜欢踢足球。'}
  ],
  'him': [
    {en: 'I saw him yesterday.', cn: '我昨天看见他了。'},
    {en: 'Please tell him the news.', cn: '请告诉他这个消息。'}
  ],
  'his': [
    {en: 'This is his bike.', cn: '这是他的自行车。'},
    {en: 'His dream is to travel.', cn: '他的梦想是旅行。'}
  ],
  'himself': [
    {en: 'He made the cake himself.', cn: '他自己做了蛋糕。'},
    {en: 'He hurt himself playing.', cn: '他玩的时候伤到了自己。'}
  ],
  'she': [
    {en: 'She is my best friend.', cn: '她是我最好的朋友。'},
    {en: 'She sings very well.', cn: '她唱得很好。'}
  ],
  'her': [
    {en: 'I gave her a gift.', cn: '我给了她一份礼物。'},
    {en: 'This is her room.', cn: '这是她的房间。'}
  ],
  'hers': [
    {en: 'The pink bag is hers.', cn: '那个粉色的包是她的。'}
  ],
  'herself': [
    {en: 'She made the dress herself.', cn: '她自己做了这条裙子。'},
    {en: 'She enjoyed herself at the party.', cn: '她在聚会上玩得很开心。'}
  ],
  'we': [
    {en: 'We are in the same class.', cn: '我们在同一个班级。'},
    {en: 'We won the game yesterday.', cn: '我们昨天赢了比赛。'}
  ],
  'us': [
    {en: 'He told us a story.', cn: '他给我们讲了一个故事。'},
    {en: 'Please join us.', cn: '请加入我们。'}
  ],
  'our': [
    {en: 'This is our classroom.', cn: '这是我们的教室。'},
    {en: 'Our teacher is very kind.', cn: '我们的老师很和蔼。'}
  ],
  'ours': [
    {en: 'This victory is ours.', cn: '这场胜利是我们的。'}
  ],
  'ourselves': [
    {en: 'We did it by ourselves.', cn: '我们自己完成了这件事。'},
    {en: 'We enjoyed ourselves at the park.', cn: '我们在公园玩得很开心。'}
  ],
  'they': [
    {en: 'They are my neighbors.', cn: '他们是我的邻居。'},
    {en: 'They play football every day.', cn: '他们每天踢足球。'}
  ],
  'them': [
    {en: 'I helped them with homework.', cn: '我帮他们做作业。'},
    {en: 'Please give the books to them.', cn: '请把书给他们。'}
  ],
  'their': [
    {en: 'Their house is very big.', cn: '他们的房子很大。'},
    {en: 'The students finished their work.', cn: '学生们完成了他们的作业。'}
  ],
  'theirs': [
    {en: 'The garden is theirs.', cn: '那个花园是他们的。'}
  ],
  'themselves': [
    {en: 'They built the house themselves.', cn: '他们自己建了房子。'},
    {en: 'They enjoyed themselves at the concert.', cn: '他们在音乐会上玩得很开心。'}
  ],
  'what': [
    {en: 'What is your favorite color?', cn: '你最喜欢的颜色是什么？'},
    {en: 'I know what you mean.', cn: '我明白你的意思。'}
  ],
  'which': [
    {en: 'Which book do you prefer?', cn: '你更喜欢哪本书？'},
    {en: 'This is the house which I bought.', cn: '这是我买的房子。'}
  ],
  'who': [
    {en: 'Who is that girl?', cn: '那个女孩是谁？'},
    {en: 'I know who took the book.', cn: '我知道谁拿了那本书。'}
  ],
  'whom': [
    {en: 'To whom did you speak?', cn: '你和谁说话了？'},
    {en: 'The man whom I met is kind.', cn: '我遇到的那个人很友善。'}
  ],
  'whose': [
    {en: 'Whose bag is this?', cn: '这是谁的包？'},
    {en: 'I met a boy whose dog is cute.', cn: '我遇到了一个男孩，他的狗很可爱。'}
  ],
  'when': [
    {en: 'When do you get up?', cn: '你什么时候起床？'},
    {en: 'I remember when we first met.', cn: '我记得我们第一次见面的时候。'}
  ],
  'where': [
    {en: 'Where do you live?', cn: '你住在哪里？'},
    {en: 'This is where I study.', cn: '这就是我学习的地方。'}
  ],
  'why': [
    {en: 'Why are you late?', cn: '你为什么迟到？'},
    {en: 'I understand why you are sad.', cn: '我理解你为什么难过。'}
  ],
  'how': [
    {en: 'How do you go to school?', cn: '你怎么去上学？'},
    {en: 'I know how to swim.', cn: '我知道怎么游泳。'}
  ],
  'all': [
    {en: 'All students are here.', cn: '所有学生都到了。'},
    {en: 'I ate all the cake.', cn: '我把蛋糕全吃了。'}
  ],
  'each': [
    {en: 'Each student has a book.', cn: '每个学生都有一本书。'},
    {en: 'They each have their own dream.', cn: '他们每个人都有自己的梦想。'}
  ],
  'every': [
    {en: 'I exercise every day.', cn: '我每天锻炼。'},
    {en: 'Every child loves stories.', cn: '每个孩子都喜欢故事。'}
  ],
  'both': [
    {en: 'Both answers are correct.', cn: '两个答案都是对的。'},
    {en: 'I like both of them.', cn: '他们两个我都喜欢。'}
  ],
  'few': [
    {en: 'I have a few friends here.', cn: '我在这里有几个朋友。'},
    {en: 'Few people know the truth.', cn: '很少有人知道真相。'}
  ],
  'more': [
    {en: 'I need more time.', cn: '我需要更多时间。'},
    {en: 'She is more careful than me.', cn: '她比我更细心。'}
  ],
  'most': [
    {en: 'Most students like English.', cn: '大多数学生喜欢英语。'},
    {en: 'This is the most beautiful place.', cn: '这是最美的地方。'}
  ],
  'other': [
    {en: 'Do you have any other questions?', cn: '你还有其他问题吗？'},
    {en: 'One hand washes the other.', cn: '互相帮忙。'}
  ],
  'some': [
    {en: 'I have some good news.', cn: '我有一些好消息。'},
    {en: 'Some students are absent today.', cn: '有些学生今天缺席了。'}
  ],
  'such': [
    {en: 'It is such a lovely day.', cn: '这是多么美好的一天。'},
    {en: 'I have never seen such a big tree.', cn: '我从未见过这么大的树。'}
  ],
  'no': [
    {en: 'I have no money.', cn: '我没有钱。'},
    {en: 'No smoking here.', cn: '这里禁止吸烟。'}
  ],
  'not': [
    {en: 'I do not like coffee.', cn: '我不喜欢咖啡。'},
    {en: 'She is not at home.', cn: '她不在家。'}
  ],
  'only': [
    {en: 'I have only one pen.', cn: '我只有一支笔。'},
    {en: 'She is the only child.', cn: '她是独生女。'}
  ],
  'own': [
    {en: 'I have my own room.', cn: '我有自己的房间。'},
    {en: 'She made it on her own.', cn: '她自己做的。'}
  ],
  'same': [
    {en: 'We are in the same class.', cn: '我们在同一个班级。'},
    {en: 'They look the same.', cn: '他们看起来一样。'}
  ],
  'so': [
    {en: 'I am so happy today.', cn: '我今天非常开心。'},
    {en: 'It is so cold outside.', cn: '外面太冷了。'}
  ],
  'than': [
    {en: 'She is taller than me.', cn: '她比我高。'},
    {en: 'I run faster than him.', cn: '我跑得比他快。'}
  ],
  'too': [
    {en: 'It is too hot today.', cn: '今天太热了。'},
    {en: 'I like it too.', cn: '我也喜欢它。'}
  ],
  'very': [
    {en: 'She is very beautiful.', cn: '她非常漂亮。'},
    {en: 'I am very happy.', cn: '我非常开心。'}
  ],
  'just': [
    {en: 'I just finished my homework.', cn: '我刚做完作业。'},
    {en: 'This is just what I need.', cn: '这正是我需要的。'}
  ],
  'now': [
    {en: 'I am busy now.', cn: '我现在很忙。'},
    {en: 'From now on, I will study hard.', cn: '从现在开始，我要努力学习。'}
  ],
  'then': [
    {en: 'We were young then.', cn: '那时我们很年轻。'},
    {en: 'First wash, then dry.', cn: '先洗，然后擦干。'}
  ],
  'here': [
    {en: 'Come here, please.', cn: '请过来这里。'},
    {en: 'I live here.', cn: '我住在这里。'}
  ],
  'there': [
    {en: 'There is a book on the desk.', cn: '桌子上有一本书。'},
    {en: 'I will go there tomorrow.', cn: '我明天会去那里。'}
  ],
  'once': [
    {en: 'I visit him once a week.', cn: '我每周去看他一次。'},
    {en: 'Once upon a time, there was a king.', cn: '很久以前，有一位国王。'}
  ],
  'again': [
    {en: 'Please say that again.', cn: '请再说一遍。'},
    {en: 'I will try again.', cn: '我会再试一次。'}
  ],
  'still': [
    {en: 'She is still sleeping.', cn: '她还在睡觉。'},
    {en: 'I still remember that day.', cn: '我仍然记得那一天。'}
  ],
  'also': [
    {en: 'I also like music.', cn: '我也喜欢音乐。'},
    {en: 'She is smart and also kind.', cn: '她聪明而且也很善良。'}
  ],
  'as': [
    {en: 'I work as a teacher.', cn: '我是一名教师。'},
    {en: 'She is as tall as her mother.', cn: '她和她妈妈一样高。'}
  ],
  'if': [
    {en: 'If it rains, I will stay home.', cn: '如果下雨，我就待在家里。'},
    {en: 'I wonder if he will come.', cn: '我想知道他是否会来。'}
  ],
  'because': [
    {en: 'I stayed home because I was sick.', cn: '我待在家里因为我生病了。'},
    {en: 'She cried because she was happy.', cn: '她哭了是因为她很高兴。'}
  ],
  'although': [
    {en: 'Although it rained, we went out.', cn: '尽管下雨了，我们还是出去了。'},
    {en: 'He is young, although he is wise.', cn: '他虽然年轻，但很聪明。'}
  ],
  'though': [
    {en: 'It is hard work. I enjoy it, though.', cn: '这是辛苦的工作，不过我喜欢。'},
    {en: 'Even though it was late, he came.', cn: '尽管很晚了，他还是来了。'}
  ],
  'while': [
    {en: 'I read while she sleeps.', cn: '她睡觉时我在看书。'},
    {en: 'While I was away, he called.', cn: '我不在的时候，他打电话来了。'}
  ],
  'until': [
    {en: 'Wait until I come back.', cn: '等到我回来。'},
    {en: 'I did not sleep until midnight.', cn: '我直到半夜才睡觉。'}
  ],
  'since': [
    {en: 'I have lived here since 2015.', cn: '我从2015年起就住在这里。'},
    {en: 'Since you are here, let\'s start.', cn: '既然你来了，我们开始吧。'}
  ],
  'get': [
    {en: 'I get up early every day.', cn: '我每天早起。'},
    {en: 'She got a gift from her friend.', cn: '她从朋友那里得到了一份礼物。'}
  ],
  'got': [
    {en: 'I got a letter yesterday.', cn: '我昨天收到一封信。'},
    {en: 'She got home late.', cn: '她很晚才到家。'}
  ],
  'go': [
    {en: 'I go to school by bike.', cn: '我骑自行车上学。'},
    {en: 'Let\'s go to the park.', cn: '我们去公园吧。'}
  ],
  'went': [
    {en: 'I went to Beijing last year.', cn: '我去年去了北京。'},
    {en: 'She went home after class.', cn: '她课后回家了。'}
  ],
  'come': [
    {en: 'Please come to my party.', cn: '请来参加我的派对。'},
    {en: 'Spring has come.', cn: '春天来了。'}
  ],
  'came': [
    {en: 'He came to see me yesterday.', cn: '他昨天来看我了。'},
    {en: 'The idea came to me suddenly.', cn: '我突然想到了这个主意。'}
  ]
};

// 初始化计数器
const funcWordCounters = {};
function getFunctionWordExample(word) {
  const w = word.toLowerCase();
  const examples = functionWordExamples[w];
  if (!examples || examples.length === 0) return null;
  funcWordCounters[w] = (funcWordCounters[w] || 0) % examples.length;
  const ex = examples[funcWordCounters[w]];
  funcWordCounters[w]++;
  return ex;
}

// 简化的非功能词模板（用于essay about修复）
const nounTemplates = [
  {en: 'I like {word}.', cn: '我喜欢{meaning}。'},
  {en: 'The {word} is very beautiful.', cn: '这个{meaning}很漂亮。'},
  {en: 'She bought a {word} yesterday.', cn: '她昨天买了一个{meaning}。'},
  {en: 'We saw many {word}s in the park.', cn: '我们在公园里看到很多{meaning}。'},
  {en: 'My favorite {word} is red.', cn: '我最喜欢的{meaning}是红色的。'},
  {en: 'I want to buy a {word}.', cn: '我想买一个{meaning}。'},
  {en: 'The {word} is on the table.', cn: '{meaning}在桌子上。'},
  {en: 'He gave me a {word}.', cn: '他给了我一个{meaning}。'},
  {en: 'This {word} is very useful.', cn: '这个{meaning}很有用。'},
  {en: 'I found a {word} in my bag.', cn: '我在包里找到了一个{meaning}。'},
  {en: 'Do you like this {word}?', cn: '你喜欢这个{meaning}吗？'},
  {en: 'The {word} looks new.', cn: '这个{meaning}看起来很新。'},
  {en: 'I need a {word} for school.', cn: '我上学需要一个{meaning}。'},
  {en: 'She drew a {word} on the paper.', cn: '她在纸上画了一个{meaning}。'},
  {en: 'The {word} is under the chair.', cn: '{meaning}在椅子下面。'},
  {en: 'I lost my {word} this morning.', cn: '我今天早上丢了我的{meaning}。'},
  {en: 'He found a {word} by the river.', cn: '他在河边发现了一个{meaning}。'},
  {en: 'The {word} is very expensive.', cn: '这个{meaning}很贵。'},
  {en: 'I share my {word} with friends.', cn: '我和朋友分享我的{meaning}。'},
  {en: 'The teacher showed us a {word}.', cn: '老师给我们看了一个{meaning}。'},
  {en: 'I put the {word} in the box.', cn: '我把{meaning}放进了盒子里。'},
  {en: 'The {word} fell on the floor.', cn: '{meaning}掉在了地上。'},
  {en: 'She made a {word} by hand.', cn: '她亲手做了一个{meaning}。'},
  {en: 'I keep the {word} on my desk.', cn: '我把{meaning}放在书桌上。'},
  {en: 'The {word} is my favorite gift.', cn: '这个{meaning}是我最喜欢的礼物。'},
  {en: 'He brought a {word} to class.', cn: '他带了一个{meaning}来上课。'},
  {en: 'I saw a {word} in the museum.', cn: '我在博物馆里看到一个{meaning}。'},
  {en: 'The {word} belongs to my sister.', cn: '这个{meaning}是我妹妹的。'},
  {en: 'I cleaned the {word} carefully.', cn: '我仔细清理了这个{meaning}。'},
  {en: 'She uses the {word} every day.', cn: '她每天使用这个{meaning}。'},
  {en: 'The {word} is made of wood.', cn: '这个{meaning}是木头做的。'},
  {en: 'I read about the {word} online.', cn: '我在网上读到关于{meaning}的信息。'},
  {en: 'He broke the {word} by accident.', cn: '他不小心弄坏了{meaning}。'},
  {en: 'The {word} is near the window.', cn: '{meaning}在窗户附近。'},
  {en: 'I chose the blue {word}.', cn: '我选了蓝色的{meaning}。'},
  {en: 'She sent me a {word} as a gift.', cn: '她送了我一个{meaning}作为礼物。'},
  {en: 'The {word} is very popular now.', cn: '这个{meaning}现在很流行。'},
  {en: 'I took a photo of the {word}.', cn: '我给这个{meaning}拍了张照片。'},
  {en: 'He collects {word}s as a hobby.', cn: '他把收集{meaning}当作爱好。'},
  {en: 'The {word} reminds me of home.', cn: '这个{meaning}让我想起了家。'},
  {en: 'I wrapped the {word} in paper.', cn: '我用纸包住了{meaning}。'},
  {en: 'She picked up the {word} gently.', cn: '她轻轻地拿起了{meaning}。'},
  {en: 'The {word} is on sale today.', cn: '这个{meaning}今天打折。'},
  {en: 'I received a {word} for my birthday.', cn: '我生日收到了一个{meaning}。'},
  {en: 'He described the {word} in detail.', cn: '他详细描述了这个{meaning}。'},
  {en: 'The {word} is missing from the shelf.', cn: '架子上的{meaning}不见了。'},
  {en: 'I compared two {word}s carefully.', cn: '我仔细比较了两个{meaning}。'},
  {en: 'She returned the {word} to the store.', cn: '她把{meaning}退回了商店。'},
  {en: 'The {word} is heavier than it looks.', cn: '这个{meaning}比看起来重。'},
  {en: 'I borrowed a {word} from the library.', cn: '我从图书馆借了一个{meaning}。'},
  {en: 'He searched for the {word} everywhere.', cn: '他到处找{meaning}。'},
  {en: 'The {word} is perfect for the job.', cn: '这个{meaning}非常适合这项工作。'},
  {en: 'I named my {word} Lucky.', cn: '我给{meaning}取名叫Lucky。'},
  {en: 'She repaired the broken {word}.', cn: '她修好了坏掉的{meaning}。'},
  {en: 'The {word} is older than me.', cn: '这个{meaning}比我还老。'},
  {en: 'I painted the {word} green.', cn: '我把{meaning}漆成了绿色。'},
  {en: 'He carried the {word} upstairs.', cn: '他把{meaning}搬上了楼。'},
  {en: 'The {word} is hidden behind the door.', cn: '{meaning}藏在门后面。'},
  {en: 'I ordered a {word} online yesterday.', cn: '我昨天在网上订购了一个{meaning}。'},
  {en: 'She decorated the {word} with flowers.', cn: '她用花装饰了{meaning}。'},
  {en: 'The {word} fits perfectly in my hand.', cn: '这个{meaning}正好能握在我手里。'},
  {en: 'I saved money to buy the {word}.', cn: '我存钱买了这个{meaning}。'},
  {en: 'He donated his {word} to charity.', cn: '他把{meaning}捐给了慈善机构。'},
  {en: 'The {word} is the best I have ever seen.', cn: '这个{meaning}是我见过的最好的。'},
  {en: 'I forgot where I put the {word}.', cn: '我忘记把{meaning}放哪儿了。'},
  {en: 'She designed a new {word} last month.', cn: '她上个月设计了一个新{meaning}。'},
  {en: 'The {word} was a gift from my parents.', cn: '这个{meaning}是我父母送的礼物。'},
  {en: 'I added the {word} to my collection.', cn: '我把{meaning}加进了我的收藏。'},
  {en: 'He admired the {word} for a long time.', cn: '他欣赏这个{meaning}看了很久。'},
  {en: 'The {word} came from a distant country.', cn: '这个{meaning}来自遥远的国家。'},
  {en: 'I need to repair the {word} soon.', cn: '我需要尽快修理这个{meaning}。'},
  {en: 'She chose the {word} for its color.', cn: '她因为颜色选择了这个{meaning}。'},
  {en: 'The {word} is safe in the drawer.', cn: '{meaning}在抽屉里很安全。'}
];

const verbTemplates = [
  {en: 'I {word} every morning.', cn: '我每天早上{meaning}。'},
  {en: 'She likes to {word} with her friends.', cn: '她喜欢和朋友一起{meaning}。'},
  {en: 'They {word} together after school.', cn: '他们放学后一起{meaning}。'},
  {en: 'He will {word} tomorrow.', cn: '他明天会{meaning}。'},
  {en: 'We often {word} in the classroom.', cn: '我们经常在教室里{meaning}。'},
  {en: 'I want to {word} this weekend.', cn: '这个周末我想{meaning}。'},
  {en: 'She can {word} very well.', cn: '她{meaning}得很好。'},
  {en: 'They {word} every Sunday.', cn: '他们每个星期天都{meaning}。'},
  {en: 'He tried to {word} carefully.', cn: '他试着小心地{meaning}。'},
  {en: 'We {word} when we are free.', cn: '我们有空的时候{meaning}。'},
  {en: 'I need to {word} right now.', cn: '我现在需要{meaning}。'},
  {en: 'She decided to {word} today.', cn: '她决定今天{meaning}。'},
  {en: 'They {word} for three hours.', cn: '他们{meaning}了三个小时。'},
  {en: 'He loves to {word} in the garden.', cn: '他喜欢在花园里{meaning}。'},
  {en: 'We {word} before breakfast.', cn: '我们早餐前{meaning}。'},
  {en: 'I usually {word} after dinner.', cn: '我通常晚饭后{meaning}。'},
  {en: 'She plans to {word} next month.', cn: '她计划下个月{meaning}。'},
  {en: 'They {word} during the holiday.', cn: '他们在假期里{meaning}。'},
  {en: 'He prefers to {word} alone.', cn: '他喜欢独自{meaning}。'},
  {en: 'We {word} to stay healthy.', cn: '我们{meaning}来保持健康。'},
  {en: 'I {word} with my brother.', cn: '我和我哥哥一起{meaning}。'},
  {en: 'She taught me how to {word}.', cn: '她教我如何{meaning}。'},
  {en: 'They {word} to help others.', cn: '他们{meaning}来帮助别人。'},
  {en: 'He forgot to {word} yesterday.', cn: '他昨天忘记{meaning}了。'},
  {en: 'We {word} for fun on weekends.', cn: '我们周末{meaning}取乐。'},
  {en: 'I enjoy watching people {word}.', cn: '我喜欢看别人{meaning}。'},
  {en: 'She promised to {word} on time.', cn: '她保证准时{meaning}。'},
  {en: 'They {word} to pass the exam.', cn: '他们{meaning}来通过考试。'},
  {en: 'He asked me to {word} with him.', cn: '他让我和他一起{meaning}。'},
  {en: 'We {word} to improve our skills.', cn: '我们{meaning}来提高技能。'},
  {en: 'I learned to {word} last year.', cn: '我去年学会了{meaning}。'},
  {en: 'She continues to {word} every day.', cn: '她每天坚持{meaning}。'},
  {en: 'They {word} as a team.', cn: '他们作为一个团队{meaning}。'},
  {en: 'He refused to {word} with them.', cn: '他拒绝和他们一起{meaning}。'},
  {en: 'We {word} to show our love.', cn: '我们{meaning}来表达我们的爱。'},
  {en: 'I prefer to {word} in the morning.', cn: '我喜欢在早上{meaning}。'},
  {en: 'She managed to {word} successfully.', cn: '她成功地{meaning}了。'},
  {en: 'They {word} to celebrate the win.', cn: '他们{meaning}来庆祝胜利。'},
  {en: 'He failed to {word} on time.', cn: '他没能准时{meaning}。'},
  {en: 'We {word} to prepare for the trip.', cn: '我们{meaning}来为旅行做准备。'},
  {en: 'I started to {word} at six.', cn: '我六点开始{meaning}。'},
  {en: 'She hopes to {word} better next time.', cn: '她希望下次{meaning}得更好。'},
  {en: 'They {word} to welcome the guests.', cn: '他们{meaning}来欢迎客人。'},
  {en: 'He agreed to {word} with us.', cn: '他同意和我们一起{meaning}。'},
  {en: 'We {word} to express our feelings.', cn: '我们{meaning}来表达我们的感受。'},
  {en: 'I remember how to {word}.', cn: '我记得如何{meaning}。'},
  {en: 'She stopped to {word} for a while.', cn: '她停下来{meaning}了一会儿。'},
  {en: 'They {word} to finish the project.', cn: '他们{meaning}来完成项目。'},
  {en: 'He pretended to {word} happily.', cn: '他假装开心地{meaning}。'},
  {en: 'We {word} to make new friends.', cn: '我们{meaning}来交新朋友。'},
  {en: 'I wish I could {word} like him.', cn: '我希望我能像他一样{meaning}。'},
  {en: 'She expected to {word} early.', cn: '她期望早点{meaning}。'},
  {en: 'They {word} to solve the problem.', cn: '他们{meaning}来解决问题。'},
  {en: 'He offered to {word} for us.', cn: '他主动提出为我们{meaning}。'},
  {en: 'We {word} to keep fit.', cn: '我们{meaning}来保持健康。'},
  {en: 'I used to {word} every evening.', cn: '我过去每天晚上都{meaning}。'},
  {en: 'She begged me to {word} with her.', cn: '她求我和她一起{meaning}。'},
  {en: 'They {word} to win the prize.', cn: '他们{meaning}来赢得奖品。'},
  {en: 'He prepared to {word} carefully.', cn: '他准备好小心地{meaning}。'},
  {en: 'We {word} to enjoy the sunshine.', cn: '我们{meaning}来享受阳光。'},
  {en: 'I chose to {word} instead of sleeping.', cn: '我选择了{meaning}而不是睡觉。'},
  {en: 'She waited to {word} after class.', cn: '她等着课后{meaning}。'},
  {en: 'They {word} to share their joy.', cn: '他们{meaning}来分享快乐。'},
  {en: 'He struggled to {word} correctly.', cn: '他努力正确地{meaning}。'},
  {en: 'We {word} to build a better future.', cn: '我们{meaning}来建设更美好的未来。'}
];

const adjTemplates = [
  {en: 'The flower is very {word}.', cn: '这朵花很{meaning}。'},
  {en: 'She has a {word} smile.', cn: '她有一个{meaning}的笑容。'},
  {en: 'This is a {word} day.', cn: '这是{meaning}的一天。'},
  {en: 'He looks {word} today.', cn: '他今天看起来{meaning}。'},
  {en: 'The food tastes {word}.', cn: '这食物尝起来{meaning}。'},
  {en: 'I feel {word} when I sing.', cn: '我唱歌时感到{meaning}。'},
  {en: 'The movie was very {word}.', cn: '这部电影非常{meaning}。'},
  {en: 'She bought a {word} dress.', cn: '她买了一条{meaning}的裙子。'},
  {en: 'The weather is {word} today.', cn: '今天天气{meaning}。'},
  {en: 'He is a {word} student.', cn: '他是一个{meaning}的学生。'},
  {en: 'The room is {word} and clean.', cn: '房间{meaning}又干净。'},
  {en: 'I think this idea is {word}.', cn: '我认为这个想法很{meaning}。'},
  {en: 'She seems {word} lately.', cn: '她最近看起来{meaning}。'},
  {en: 'The book is {word} to read.', cn: '这本书读起来很{meaning}。'},
  {en: 'He found the task {word}.', cn: '他觉得这项任务很{meaning}。'},
  {en: 'The music sounds {word}.', cn: '这音乐听起来很{meaning}。'},
  {en: 'I prefer {word} colors.', cn: '我喜欢{meaning}的颜色。'},
  {en: 'She has {word} hair.', cn: '她有{meaning}的头发。'},
  {en: 'The story is very {word}.', cn: '这个故事非常{meaning}。'},
  {en: 'He made a {word} mistake.', cn: '他犯了一个{meaning}的错误。'},
  {en: 'The view from here is {word}.', cn: '从这里看风景很{meaning}。'},
  {en: 'I am {word} with my progress.', cn: '我对我的进步感到{meaning}。'},
  {en: 'She looked {word} in that photo.', cn: '她在那张照片里看起来{meaning}。'},
  {en: 'The exam was {word} this time.', cn: '这次考试很{meaning}。'},
  {en: 'He has a {word} voice.', cn: '他有一副{meaning}的嗓音。'},
  {en: 'The city is {word} at night.', cn: '这座城市夜晚很{meaning}。'},
  {en: 'I find math {word} sometimes.', cn: '我有时觉得数学很{meaning}。'},
  {en: 'She felt {word} after the run.', cn: '跑步后她感到{meaning}。'},
  {en: 'The lesson was {word} for all.', cn: '这节课对所有人都很{meaning}。'},
  {en: 'He gave a {word} speech.', cn: '他做了一场{meaning}的演讲。'},
  {en: 'The painting looks {word}.', cn: '这幅画看起来{meaning}。'},
  {en: 'I stayed {word} during the test.', cn: '考试时我保持{meaning}。'},
  {en: 'She has a {word} personality.', cn: '她有{meaning}的性格。'},
  {en: 'The mountain is {word} and grand.', cn: '这座山{meaning}而雄伟。'},
  {en: 'He seems {word} about the plan.', cn: '他对这个计划似乎很{meaning}。'},
  {en: 'The soup smells {word}.', cn: '这汤闻起来很{meaning}。'},
  {en: 'I prefer {word} weather.', cn: '我喜欢{meaning}的天气。'},
  {en: 'She wore a {word} hat.', cn: '她戴了一顶{meaning}的帽子。'},
  {en: 'The trip was {word} for everyone.', cn: '这次旅行对每个人来说都很{meaning}。'},
  {en: 'He is {word} at playing chess.', cn: '他下棋很{meaning}。'},
  {en: 'The garden looks {word} in spring.', cn: '春天花园看起来很{meaning}。'},
  {en: 'I feel {word} after a good sleep.', cn: '睡个好觉后我感觉很{meaning}。'},
  {en: 'She described it as {word}.', cn: '她形容它很{meaning}。'},
  {en: 'The building is {word} and modern.', cn: '这座建筑{meaning}又现代。'},
  {en: 'He appeared {word} at the meeting.', cn: '他在会议上显得很{meaning}。'},
  {en: 'The news was {word} to hear.', cn: '听到这个消息很{meaning}。'},
  {en: 'I think she is {word} for the job.', cn: '我认为她很{meaning}这份工作。'},
  {en: 'The dog looks {word} and friendly.', cn: '这只狗看起来{meaning}又友善。'},
  {en: 'He felt {word} about winning.', cn: '他对获胜感到{meaning}。'},
  {en: 'The lake is {word} and peaceful.', cn: '湖水{meaning}而宁静。'}
];

const advTemplates = [
  {en: 'She speaks {word}.', cn: '她说话{meaning}。'},
  {en: 'He runs very {word}.', cn: '他跑得{meaning}。'},
  {en: 'I {word} agree with you.', cn: '我{meaning}同意你的看法。'},
  {en: 'The train arrived {word}.', cn: '火车{meaning}到达了。'},
  {en: 'Please sit {word}.', cn: '请{meaning}坐。'},
  {en: 'She sings {word}.', cn: '她唱得{meaning}。'},
  {en: 'He writes {word} in class.', cn: '他在课堂上写字{meaning}。'},
  {en: 'I {word} understand the lesson.', cn: '我{meaning}理解了这节课。'},
  {en: 'The bird flew {word} away.', cn: '鸟儿{meaning}飞走了。'},
  {en: 'She answered the question {word}.', cn: '她{meaning}回答了问题。'},
  {en: 'He drives {word} on the highway.', cn: '他在高速公路上开车{meaning}。'},
  {en: 'I {word} finished my homework.', cn: '我{meaning}完成了作业。'},
  {en: 'The baby slept {word} all night.', cn: '宝宝整晚睡得{meaning}。'},
  {en: 'She {word} forgot about the meeting.', cn: '她{meaning}忘记了会议。'},
  {en: 'He {word} accepted the challenge.', cn: '他{meaning}接受了挑战。'},
  {en: 'The team played {word} today.', cn: '这个队今天打得{meaning}。'},
  {en: 'I {word} recommend this book.', cn: '我{meaning}推荐这本书。'},
  {en: 'She {word} solved the problem.', cn: '她{meaning}解决了问题。'},
  {en: 'He {word} explained the rules.', cn: '他{meaning}解释了规则。'},
  {en: 'The rain fell {word} outside.', cn: '外面雨下得{meaning}。'},
  {en: 'I {word} appreciate your help.', cn: '我{meaning}感谢你的帮助。'},
  {en: 'She {word} completed the task.', cn: '她{meaning}完成了任务。'},
  {en: 'He {word} changed his mind.', cn: '他{meaning}改变了主意。'},
  {en: 'The sun rose {word} this morning.', cn: '今天早上太阳{meaning}升起。'},
  {en: 'I {word} disagree with that idea.', cn: '我{meaning}不同意那个想法。'},
  {en: 'She {word} improved her English.', cn: '她{meaning}提高了英语水平。'},
  {en: 'He {word} apologized for his mistake.', cn: '他{meaning}为自己的错误道歉。'},
  {en: 'The wind blew {word} through the trees.', cn: '风{meaning}吹过树林。'},
  {en: 'I {word} noticed the difference.', cn: '我{meaning}注意到了差别。'},
  {en: 'She {word} welcomed the new student.', cn: '她{meaning}欢迎新同学。'},
  {en: 'He {word} handed in his homework.', cn: '他{meaning}交上了作业。'},
  {en: 'The children played {word} in the yard.', cn: '孩子们在院子里{meaning}玩耍。'},
  {en: 'I {word} enjoyed the concert.', cn: '我{meaning}喜欢这场音乐会。'},
  {en: 'She {word} prepared for the exam.', cn: '她{meaning}为考试做准备。'},
  {en: 'He {word} described his experience.', cn: '他{meaning}描述了他的经历。'},
  {en: 'The snow fell {word} on the ground.', cn: '雪{meaning}落在地上。'},
  {en: 'I {word} support your decision.', cn: '我{meaning}支持你的决定。'},
  {en: 'She {word} organized the party.', cn: '她{meaning}组织了派对。'},
  {en: 'He {word} admitted his fault.', cn: '他{meaning}承认了自己的错误。'},
  {en: 'The music played {word} in the hall.', cn: '音乐在大厅里{meaning}播放。'}
];

const pronTemplates = [
  {en: '{word} is my best friend.', cn: '{meaning}是我最好的朋友。'},
  {en: 'I gave the book to {word}.', cn: '我把书给了{meaning}。'},
  {en: '{word} helped me a lot.', cn: '{meaning}帮了我很多。'},
  {en: 'This gift is for {word}.', cn: '这个礼物是给{meaning}的。'},
  {en: '{word} arrived early today.', cn: '{meaning}今天来得早。'},
  {en: 'I saw {word} at the library.', cn: '我在图书馆看到了{meaning}。'},
  {en: '{word} smiled at me warmly.', cn: '{meaning}热情地对我微笑。'},
  {en: 'The teacher praised {word}.', cn: '老师表扬了{meaning}。'},
  {en: '{word} is waiting for you.', cn: '{meaning}在等你。'},
  {en: 'I often talk to {word}.', cn: '我经常和{meaning}说话。'},
  {en: '{word} brought lunch for us.', cn: '{meaning}给我们带了午饭。'},
  {en: 'Please tell {word} the news.', cn: '请把这个消息告诉{meaning}。'},
  {en: '{word} lives next door.', cn: '{meaning}住在隔壁。'},
  {en: 'I wrote a letter to {word}.', cn: '我给{meaning}写了一封信。'},
  {en: '{word} won the first prize.', cn: '{meaning}赢得了一等奖。'},
  {en: 'We played basketball with {word}.', cn: '我们和{meaning}一起打篮球。'},
  {en: '{word} is very kind to animals.', cn: '{meaning}对动物很友善。'},
  {en: 'I borrowed a pen from {word}.', cn: '我向{meaning}借了一支笔。'},
  {en: '{word} answered correctly.', cn: '{meaning}回答正确了。'},
  {en: 'The story is about {word}.', cn: '这个故事是关于{meaning}的。'},
  {en: '{word} sat beside me.', cn: '{meaning}坐在我旁边。'},
  {en: 'I share secrets with {word}.', cn: '我和{meaning}分享秘密。'},
  {en: '{word} sings in the choir.', cn: '{meaning}在合唱团唱歌。'},
  {en: 'We invited {word} to dinner.', cn: '我们邀请{meaning}来吃晚饭。'},
  {en: '{word} runs faster than me.', cn: '{meaning}跑得比我快。'},
  {en: 'I waved goodbye to {word}.', cn: '我向{meaning}挥手告别。'},
  {en: '{word} fixed my bicycle.', cn: '{meaning}修好了我的自行车。'},
  {en: 'Everyone likes {word}.', cn: '每个人都喜欢{meaning}。'},
  {en: '{word} studies very hard.', cn: '{meaning}学习很努力。'},
  {en: 'I took a photo with {word}.', cn: '我和{meaning}拍了张照片。'}
];

const numTemplates = [
  {en: 'I have {word} books.', cn: '我有{meaning}本书。'},
  {en: 'She is {word} years old.', cn: '她{meaning}岁了。'},
  {en: 'There are {word} students.', cn: '有{meaning}个学生。'},
  {en: 'I waited for {word} minutes.', cn: '我等了{meaning}分钟。'},
  {en: 'The price is {word} yuan.', cn: '价格是{meaning}元。'},
  {en: 'I finished {word} pages today.', cn: '我今天完成了{meaning}页。'},
  {en: 'He ran {word} kilometers.', cn: '他跑了{meaning}公里。'},
  {en: 'There are {word} apples left.', cn: '还剩下{meaning}个苹果。'},
  {en: 'I got {word} correct answers.', cn: '我答对了{meaning}道题。'},
  {en: 'She scored {word} points.', cn: '她得了{meaning}分。'},
  {en: 'I ate {word} sandwiches.', cn: '我吃了{meaning}个三明治。'},
  {en: 'The building has {word} floors.', cn: '这栋楼有{meaning}层。'},
  {en: 'I practice {word} hours daily.', cn: '我每天练习{meaning}小时。'},
  {en: 'There are {word} days in a week.', cn: '一周有{meaning}天。'},
  {en: 'I bought {word} bottles of water.', cn: '我买了{meaning}瓶水。'},
  {en: 'The team has {word} members.', cn: '这个团队有{meaning}名成员。'},
  {en: 'I read {word} stories last night.', cn: '我昨晚读了{meaning}个故事。'},
  {en: 'She made {word} mistakes.', cn: '她犯了{meaning}个错误。'},
  {en: 'We walked {word} blocks.', cn: '我们走了{meaning}个街区。'},
  {en: 'The box weighs {word} kilos.', cn: '这个箱子重{meaning}公斤。'}
];

const prepTemplates = [
  {en: 'The cat is {word} the box.', cn: '猫在盒子{meaning}。'},
  {en: 'I wait {word} the bus stop.', cn: '我在公交站{meaning}等车。'},
  {en: 'She sat {word} me.', cn: '她坐在我{meaning}。'},
  {en: 'The picture is {word} the wall.', cn: '画在墙{meaning}。'},
  {en: 'I come {word} Yunnan.', cn: '我来{meaning}云南。'},
  {en: 'He walked {word} the park.', cn: '他{meaning}公园走。'},
  {en: 'The store is {word} the corner.', cn: '商店在拐角{meaning}。'},
  {en: 'I put the key {word} my pocket.', cn: '我把钥匙放{meaning}口袋里。'},
  {en: 'She lives {word} the river.', cn: '她住{meaning}河边。'},
  {en: 'The ball rolled {word} the hill.', cn: '球滚{meaning}了山。'},
  {en: 'I looked {word} the window.', cn: '我{meaning}窗外看。'},
  {en: 'He jumped {word} the pool.', cn: '他跳{meaning}了泳池。'},
  {en: 'The bird flew {word} the tree.', cn: '鸟儿飞{meaning}树。'},
  {en: 'I am standing {word} the door.', cn: '我站在门{meaning}。'},
  {en: 'She hid {word} the bed.', cn: '她躲{meaning}床底下。'},
  {en: 'The book fell {word} the shelf.', cn: '书从架子上掉{meaning}了。'},
  {en: 'I walked {word} the bridge.', cn: '我{meaning}桥走。'},
  {en: 'He put his hands {word} his head.', cn: '他把双手放{meaning}头上。'},
  {en: 'The sign is {word} the entrance.', cn: '标志在入口{meaning}。'},
  {en: 'I sat {word} my best friend.', cn: '我坐在最好的朋友{meaning}。'},
  {en: 'She threw the ball {word} me.', cn: '她把球扔{meaning}我。'},
  {en: 'The village lies {word} the mountains.', cn: '村庄坐落{meaning}群山之中。'},
  {en: 'I swam {word} the lake.', cn: '我{meaning}湖游泳。'},
  {en: 'He climbed {word} the ladder.', cn: '他爬{meaning}梯子。'},
  {en: 'The store is open {word} nine.', cn: '商店{meaning}九点开门。'},
  {en: 'I looked {word} my glasses.', cn: '我{meaning}眼镜找。'},
  {en: 'She walked {word} the crowd.', cn: '她{meaning}人群走。'},
  {en: 'The plane flew {word} the clouds.', cn: '飞机飞{meaning}云层上方。'},
  {en: 'I am {word} the team.', cn: '我{meaning}这个队。'},
  {en: 'He dived {word} the water.', cn: '他潜水{meaning}了水中。'}
];

const conjTemplates = [
  {en: 'I like apples {word} oranges.', cn: '我喜欢苹果{meaning}橙子。'},
  {en: 'She is tired, {word} she keeps working.', cn: '她很累，{meaning}她继续工作。'},
  {en: 'You can stay {word} go now.', cn: '你可以留下{meaning}现在走。'},
  {en: 'He studied hard, {word} he passed.', cn: '他学习努力，{meaning}通过了。'},
  {en: 'It is raining, {word} I brought an umbrella.', cn: '下雨了，{meaning}我带了伞。'},
  {en: 'I wanted to go, {word} I was busy.', cn: '我想去，{meaning}我很忙。'},
  {en: 'She is smart {word} kind.', cn: '她聪明{meaning}善良。'},
  {en: 'You can have tea {word} coffee.', cn: '你可以喝茶{meaning}咖啡。'},
  {en: 'He is young, {word} he is wise.', cn: '他年轻，{meaning}他很聪明。'},
  {en: 'I finished my work, {word} I went home.', cn: '我完成了工作，{meaning}回家了。'},
  {en: 'She sings {word} dances well.', cn: '她唱歌{meaning}跳舞都很好。'},
  {en: 'It is cold, {word} we still went out.', cn: '天气很冷，{meaning}我们还是出去了。'},
  {en: 'He runs fast {word} jumps high.', cn: '他跑得{meaning}跳得高。'},
  {en: 'I like him, {word} he is honest.', cn: '我喜欢他，{meaning}他很诚实。'},
  {en: 'She is poor, {word} she is happy.', cn: '她很穷，{meaning}她很快乐。'},
  {en: 'You can read {word} write here.', cn: '你可以在这里读{meaning}写。'},
  {en: 'He tried hard, {word} he failed.', cn: '他很努力，{meaning}他失败了。'},
  {en: 'I am hungry, {word} there is no food.', cn: '我饿了，{meaning}没有食物。'},
  {en: 'She is quiet {word} thoughtful.', cn: '她安静{meaning} thoughtful。'},
  {en: 'We laughed {word} cried together.', cn: '我们一起笑{meaning}哭。'}
];

const artTemplates = [
  {en: 'I have {word} new bike.', cn: '我有{meaning}新自行车。'},
  {en: 'She is {word} honest girl.', cn: '她是{meaning}诚实的女孩。'},
  {en: '{word} sun is very bright today.', cn: '今天{meaning}太阳很明亮。'},
  {en: 'I ate {word} apple just now.', cn: '我刚才吃了{meaning}苹果。'},
  {en: '{word} book on the desk is mine.', cn: '桌子上的{meaning}书是我的。'},
  {en: 'He bought {word} umbrella yesterday.', cn: '他昨天买了{meaning}雨伞。'},
  {en: '{word} moon looks beautiful tonight.', cn: '今晚{meaning}月亮看起来很美。'},
  {en: 'I saw {word} dog in the park.', cn: '我在公园里看到了{meaning}狗。'},
  {en: 'She wants to be {word} doctor.', cn: '她想成为{meaning}医生。'},
  {en: '{word} earth goes around the sun.', cn: '{meaning}地球绕着太阳转。'},
  {en: 'He is {word} university student.', cn: '他是{meaning}大学生。'},
  {en: 'I found {word} old photo.', cn: '我找到了{meaning}老照片。'},
  {en: '{word} flowers in the garden are red.', cn: '花园里的{meaning}花是红色的。'},
  {en: 'She gave me {word} useful suggestion.', cn: '她给了我{meaning}有用的建议。'},
  {en: 'I ate {word} egg for breakfast.', cn: '我早餐吃了{meaning}鸡蛋。'}
];

const intTemplates = [
  {en: '{word}! That is amazing!', cn: '{meaning}！太神奇了！'},
  {en: '{word}! I did not expect that.', cn: '{meaning}！我没想到会这样。'},
  {en: '{word}! Be careful!', cn: '{meaning}！小心！'},
  {en: '{word}! What a beautiful day!', cn: '{meaning}！多么美好的一天！'},
  {en: '{word}! I am so happy!', cn: '{meaning}！我太开心了！'},
  {en: '{word}! That hurts!', cn: '{meaning}！好疼！'},
  {en: '{word}! Look at that!', cn: '{meaning}！看那个！'},
  {en: '{word}! I totally agree.', cn: '{meaning}！我完全同意。'},
  {en: '{word}! What a surprise!', cn: '{meaning}！真是个惊喜！'},
  {en: '{word}! Thank you so much!', cn: '{meaning}！非常感谢！'},
  {en: '{word}! That is incredible!', cn: '{meaning}！太不可思议了！'},
  {en: '{word}! Watch out!', cn: '{meaning}！小心！'},
  {en: '{word}! I love it!', cn: '{meaning}！我太喜欢了！'},
  {en: '{word}! Well done!', cn: '{meaning}！干得好！'},
  {en: '{word}! That is too bad.', cn: '{meaning}！太糟糕了。'}
];

const abbrTemplates = [
  {en: 'I will meet you at {word}.', cn: '我将在{meaning}见你。'},
  {en: 'The {word} is my favorite team.', cn: '{meaning}是我最喜欢的队。'},
  {en: 'I read the {word} every morning.', cn: '我每天早上读{meaning}。'},
  {en: 'She works at {word}.', cn: '她在{meaning}工作。'},
  {en: 'The {word} stands for something important.', cn: '{meaning}代表着重要的东西。'},
  {en: 'I found {word} in the dictionary.', cn: '我在字典里查到了{meaning}。'},
  {en: 'He explained what {word} means.', cn: '他解释了{meaning}的意思。'}
];

function getTemplate(word, pos, meaning, semester, dayIndex, wordIndex) {
  const posLower = (pos || '').toLowerCase();
  const wLower = word.toLowerCase();
  
  if (functionWordExamples[wLower]) {
    return getFunctionWordExample(wLower);
  }
  
  let templateList;
  if (posLower.includes('n.') && posLower.includes('v.')) {
    templateList = verbTemplates;
  } else if (posLower.includes('v.') && posLower.includes('adj.')) {
    templateList = adjTemplates;
  } else if (posLower.includes('adj.') && posLower.includes('n.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('adv.') && posLower.includes('adj.')) {
    templateList = adjTemplates;
  } else if (posLower.includes('adv.') && posLower.includes('prep.')) {
    templateList = prepTemplates;
  } else if (posLower.includes('n.') && posLower.includes('adj.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('adv.') && posLower.includes('n.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('n.') && posLower.includes('prep.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('adj.') && posLower.includes('pron.')) {
    templateList = pronTemplates;
  } else if (posLower.includes('n.') && posLower.includes('pron.')) {
    templateList = pronTemplates;
  } else if (posLower.includes('adv.') && posLower.includes('pron.')) {
    templateList = pronTemplates;
  } else if (posLower.includes('pron.') && posLower.includes('conj.')) {
    templateList = pronTemplates;
  } else if (posLower.includes('prep.') && posLower.includes('pron.')) {
    templateList = prepTemplates;
  } else if (posLower.includes('conj.') && posLower.includes('prep.')) {
    templateList = conjTemplates;
  } else if (posLower.includes('v.') && posLower.includes('prep.')) {
    templateList = verbTemplates;
  } else if (posLower.includes('v.') && posLower.includes('adv.')) {
    templateList = verbTemplates;
  } else if (posLower.includes('n.') && posLower.includes('num.')) {
    templateList = numTemplates;
  } else if (posLower.includes('num.') && posLower.includes('pron.')) {
    templateList = numTemplates;
  } else if (posLower.includes('num.') && posLower.includes('n.')) {
    templateList = numTemplates;
  } else if (posLower.includes('n.') && posLower.includes('conj.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('int.') && posLower.includes('n.')) {
    templateList = intTemplates;
  } else if (posLower.includes('v.') && posLower.includes('num.')) {
    templateList = verbTemplates;
  } else if (posLower.includes('adj.') && posLower.includes('adv.') && posLower.includes('n.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('adj.') && posLower.includes('v.') && posLower.includes('n.')) {
    templateList = adjTemplates;
  } else if (posLower.includes('adv.') && posLower.includes('adj.') && posLower.includes('prep.')) {
    templateList = advTemplates;
  } else if (posLower.includes('n.') && posLower.includes('adj.') && posLower.includes('adv.') && posLower.includes('pron.')) {
    templateList = pronTemplates;
  } else if (posLower.includes('v.') && posLower.includes('n.') && posLower.includes('adj.')) {
    templateList = verbTemplates;
  } else if (posLower.includes('v.') && posLower.includes('adj.') && posLower.includes('adv.')) {
    templateList = adjTemplates;
  } else if (posLower.includes('adj.') && posLower.includes('n.') && posLower.includes('adv.')) {
    templateList = adjTemplates;
  } else if (posLower.includes('n.') && posLower.includes('adv.') && posLower.includes('prep.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('v.') && posLower.includes('prep.') && posLower.includes('adv.')) {
    templateList = verbTemplates;
  } else if (posLower.includes('prep.') && posLower.includes('conj.') && posLower.includes('adv.')) {
    templateList = prepTemplates;
  } else if (posLower.includes('n.') && posLower.includes('art.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('art.') && posLower.includes('n.')) {
    templateList = artTemplates;
  } else if (posLower.includes('n.') && posLower.includes('prep.') && posLower.includes('conj.')) {
    templateList = nounTemplates;
  } else if (posLower.includes('int.') && posLower.includes('n.') && posLower.includes('v.')) {
    templateList = intTemplates;
  } else if (posLower.includes('conj.') && posLower.includes('n.')) {
    templateList = conjTemplates;
  } else if (posLower.includes('abbr.')) {
    templateList = abbrTemplates;
  } else if (posLower.startsWith('n.')) {
    templateList = nounTemplates;
  } else if (posLower.startsWith('v.')) {
    templateList = verbTemplates;
  } else if (posLower.startsWith('adj.')) {
    templateList = adjTemplates;
  } else if (posLower.startsWith('adv.')) {
    templateList = advTemplates;
  } else if (posLower.startsWith('pron.')) {
    templateList = pronTemplates;
  } else if (posLower.startsWith('num.')) {
    templateList = numTemplates;
  } else if (posLower.startsWith('prep.')) {
    templateList = prepTemplates;
  } else if (posLower.startsWith('conj.')) {
    templateList = conjTemplates;
  } else if (posLower.startsWith('art.')) {
    templateList = artTemplates;
  } else if (posLower.startsWith('int.')) {
    templateList = intTemplates;
  } else {
    templateList = nounTemplates;
  }
  
  const hash = hashWordPos(word + semester + String(dayIndex), String(wordIndex));
  const template = templateList[hash % templateList.length];
  
  const cnMeaning = meaning ? meaning.split(/[;；]/)[0].trim() : word;
  
  return {
    en: template.en.replace(/{word}/g, word),
    cn: template.cn.replace(/{meaning}/g, cnMeaning)
  };
}

const keys = Object.keys(data).sort().filter(k => k !== '9a' && k !== '9b');
const semDayTemplateTracker = {};

for (const key of keys) {
  const sem = data[key];
  for (let dayIdx = 0; dayIdx < sem.days.length; dayIdx++) {
    const day = sem.days[dayIdx];
    const dayKey = key + '_day' + day.day;
    semDayTemplateTracker[dayKey] = new Set();
    
    for (let wordIdx = 0; wordIdx < day.words.length; wordIdx++) {
      const w = day.words[wordIdx];
      if (!w.posDetails) continue;
      
      for (const pd of w.posDetails) {
        const ex = pd.example || '';
        if (!isEssayTemplate(ex)) continue;
        
        const meaning = pd.meaning || w.meanings?.[0] || w.meaning || '';
        const pos = pd.pos || w.pos || 'unknown';
        
        let result = getTemplate(w.word, pos, meaning, key, dayIdx, wordIdx);
        
        let attempts = 0;
        while (semDayTemplateTracker[dayKey].has(result.en) && attempts < 5) {
          const hash = hashWordPos(w.word + key + String(dayIdx) + String(attempts), String(wordIdx));
          let templateList;
          const posLower = pos.toLowerCase();
          if (posLower.includes('v.')) templateList = verbTemplates;
          else if (posLower.includes('adj.')) templateList = adjTemplates;
          else if (posLower.includes('adv.')) templateList = advTemplates;
          else if (posLower.includes('pron.')) templateList = pronTemplates;
          else if (posLower.includes('prep.')) templateList = prepTemplates;
          else if (posLower.includes('conj.')) templateList = conjTemplates;
          else if (posLower.includes('num.')) templateList = numTemplates;
          else if (posLower.includes('art.')) templateList = artTemplates;
          else if (posLower.includes('int.')) templateList = intTemplates;
          else templateList = nounTemplates;
          
          const t = templateList[hash % templateList.length];
          const cnMeaning = meaning ? meaning.split(/[;；]/)[0].trim() : w.word;
          result = {
            en: t.en.replace(/{word}/g, w.word),
            cn: t.cn.replace(/{meaning}/g, cnMeaning)
          };
          attempts++;
        }
        
        semDayTemplateTracker[dayKey].add(result.en);
        
        pd.example = result.en;
        pd.exampleCn = result.cn;
        
        if (w.example === ex) {
          w.example = result.en;
        }
        
        fixCount++;
      }
    }
  }
}

console.log(`Fixed ${fixCount} "essay about" template examples.`);

console.log('Writing back to calendarData.json...');
fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data));
console.log('Done.');
