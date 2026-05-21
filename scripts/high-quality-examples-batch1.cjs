/**
 * 高质量手工例句库 - Batch 1: Top 50 高频词
 * 每条例句都是独立构思的，有真实场景和画面感
 */

const highQualityExamples = {
  // ===== 水果/食物类 =====
  'orange': [
    {en: 'Grandpa peeled a sweet orange for me after lunch.', cn: '午饭后爷爷给我剥了一个甜橘子。'},
    {en: 'The orange tree in our yard is full of fruit this autumn.', cn: '今年秋天，我们院子里的橘子树结满了果实。'},
    {en: 'She squeezed fresh orange juice for breakfast this morning.', cn: '她今天早上榨了新鲜的橙汁当早餐。'}
  ],
  'sweet': [
    {en: 'Grandma always keeps a jar of sweet candies in her pocket.', cn: '奶奶的口袋里总装着一罐甜甜的糖果。'},
    {en: 'The sweet smell of roses filled the whole garden.', cn: '玫瑰的甜香弥漫了整个花园。'},
    {en: 'My little sister has a sweet smile that makes everyone happy.', cn: '我妹妹有一个甜甜的笑容，让每个人都很开心。'}
  ],
  'fish': [
    {en: 'Dad caught a big fish by the river yesterday afternoon.', cn: '爸爸昨天下午在河边钓到了一条大鱼。'},
    {en: 'The goldfish in the bowl swims around in circles all day.', cn: '鱼缸里的金鱼整天一圈圈地游来游去。'},
    {en: 'We watched colorful fish swim through the coral reef at the aquarium.', cn: '我们在水族馆里看着五颜六色的鱼游过珊瑚礁。'}
  ],
  'egg': [
    {en: 'Mom boiled two eggs for my breakfast this morning.', cn: '妈妈今天早上给我煮了两个鸡蛋当早餐。'},
    {en: 'The hen laid a warm brown egg in the straw nest.', cn: '母鸡在草窝里下了一个温热的棕色鸡蛋。'},
    {en: 'I cracked an egg into the bowl and mixed it with flour.', cn: '我把鸡蛋打进碗里，和面粉搅拌在一起。'}
  ],
  'apple': [
    {en: 'I bit into a crisp red apple on my way to school.', cn: '上学的路上，我咬了一口脆甜的红苹果。'},
    {en: 'The apple tree behind our house is blooming with white flowers.', cn: '我们家后面的苹果树开满了白色的花。'},
    {en: 'Teacher gave each student a shiny apple as a reward.', cn: '老师给每个学生发了一个闪亮的苹果作为奖励。'}
  ],
  'ice-cream': [
    {en: 'The children laughed as ice-cream melted down their fingers.', cn: '孩子们笑着，冰淇淋顺着手指流下来。'},
    {en: 'We bought chocolate ice-cream from the old shop on the corner.', cn: '我们在街角的老店里买了巧克力冰淇淋。'},
    {en: 'On hot summer days, nothing beats a cold ice-cream cone.', cn: '在炎热的夏天，没有什么比得上一支冰凉的冰淇淋蛋筒。'}
  ],
  'jelly': [
    {en: 'Mom made strawberry jelly from fresh berries she picked.', cn: '妈妈用她摘的新鲜草莓做了草莓果冻。'},
    {en: 'The jelly wobbled on the plate when I touched it with my spoon.', cn: '当我用勺子碰它时，果冻在盘子上晃来晃去。'},
    {en: 'My favorite dessert is bread with peanut butter and jelly.', cn: '我最喜欢的甜点是涂了花生酱和果冻的面包。'}
  ],
  'juice': [
    {en: 'Dad poured cold watermelon juice into tall glasses for us.', cn: '爸爸把冰凉的西瓜汁倒进高脚杯里给我们喝。'},
    {en: 'The juice box in my lunch bag leaked all over my sandwich.', cn: '我午餐袋里的果汁盒漏了，洒满了三明治。'},
    {en: 'Fresh orange juice tastes much better than the bottled kind.', cn: '新鲜的橙汁比瓶装的好喝得多。'}
  ],
  'milk': [
    {en: 'The milkman delivers fresh milk to our door every morning.', cn: '送奶工每天早上把新鲜的牛奶送到我们家门口。'},
    {en: 'I poured warm milk into my coffee and watched it swirl.', cn: '我把温热的牛奶倒进咖啡里，看着它旋转。'},
    {en: 'The baby cat drank milk from a small bowl in the corner.', cn: '小猫在角落里用小碗喝着牛奶。'}
  ],
  'meat': [
    {en: 'Grandma slow-cooked the meat until it fell off the bone.', cn: '奶奶把肉慢炖到骨肉分离的程度。'},
    {en: 'The butcher wrapped the fresh meat in brown paper for us.', cn: '屠夫把新鲜的肉用牛皮纸包好给我们。'},
    {en: 'We need to put the meat in the fridge before it goes bad.', cn: '我们得在肉变质之前把它放进冰箱。'}
  ],
  'noodle': [
    {en: 'The chef pulled long noodles by hand right in front of us.', cn: '厨师就在我们面前用手拉出长长的面条。'},
    {en: 'I slurped hot noodle soup on a cold winter evening.', cn: '在一个寒冷的冬夜，我吸溜着热腾腾的汤面。'},
    {en: 'Mom adds fresh vegetables to the noodles she cooks for us.', cn: '妈妈给我们煮面条时总会加些新鲜蔬菜。'}
  ],
  'breakfast': [
    {en: 'The smell of fried eggs woke me up for breakfast.', cn: '煎鸡蛋的香味把我从睡梦中叫醒吃早餐。'},
    {en: 'We always eat breakfast together as a family on Sundays.', cn: '星期天我们总是一家人一起吃早餐。'},
    {en: 'I had bread and milk for breakfast before rushing to school.', cn: '我匆忙上学前，早餐吃了面包和牛奶。'}
  ],
  'chocolate': [
    {en: 'She unwrapped the chocolate slowly, savoring every bite.', cn: '她慢慢地剥开巧克力，细细品味每一口。'},
    {en: 'The chocolate cake on the table looked absolutely delicious.', cn: '桌上的巧克力蛋糕看起来美味极了。'},
    {en: 'My brother hid his chocolate under the pillow so no one would find it.', cn: '我哥哥把巧克力藏在枕头下面，这样谁也找不到。'}
  ],
  'jam': [
    {en: 'Grandma spreads homemade strawberry jam on toast every morning.', cn: '奶奶每天早上把自制的草莓酱涂在吐司上。'},
    {en: 'The jam jar was stuck shut, so I had to ask Dad to open it.', cn: '果酱罐子拧得太紧，我只好请爸爸帮忙打开。'},
    {en: 'We picked berries in the mountains to make wild fruit jam.', cn: '我们在山上采浆果来做野生果酱。'}
  ],
  'coffee': [
    {en: 'Dad sips his morning coffee while reading the newspaper.', cn: '爸爸一边看报纸一边喝着早咖啡。'},
    {en: 'The rich smell of coffee filled the small café on the corner.', cn: '浓郁的咖啡香弥漫了街角的那家小咖啡馆。'},
    {en: 'I brought a cup of hot coffee to my tired mother after work.', cn: '下班后，我给疲惫的妈妈端来一杯热咖啡。'}
  ],
  'sugar': [
    {en: 'Ants found the spilled sugar on the kitchen floor and swarmed around it.', cn: '蚂蚁发现了厨房地板上洒落的糖，纷纷围了过来。'},
    {en: 'She added two spoonfuls of sugar to her bitter tea.', cn: '她往苦茶里加了两勺糖。'},
    {en: 'The sugar bowl on the table has a beautiful blue pattern.', cn: '桌上的糖罐有着漂亮的蓝色花纹。'}
  ],

  // ===== 动物类 =====
  'bird': [
    {en: 'A little bird landed on my windowsill and sang a morning song.', cn: '一只小鸟落在我的窗台上，唱起了晨歌。'},
    {en: 'The children watched birds build their nest in the old tree.', cn: '孩子们看着鸟儿在老树上筑巢。'},
    {en: 'Every spring, migratory birds return to the lake near our village.', cn: '每年春天，候鸟都会回到我们村子附近的湖边。'}
  ],
  'pig': [
    {en: 'The pink pig rolled happily in the mud on the farm.', cn: '那只粉红色的猪开心地在农场的泥里打滚。'},
    {en: 'My uncle raises three pigs in a clean pen behind his house.', cn: '我叔叔在他家后面的干净猪圈里养了三头猪。'},
    {en: 'The little pig followed the farmer wherever he went.', cn: '那只小猪无论农民走到哪里都跟着他。'}
  ],
  'sheep': [
    {en: 'White sheep dotted the green hillside like cotton balls.', cn: '白色的绵羊像棉花球一样点缀在绿色的山坡上。'},
    {en: 'The shepherd led his flock of sheep down the mountain at dusk.', cn: '牧羊人在黄昏时分把羊群赶下山。'},
    {en: 'A lost sheep wandered into our yard and we helped find its owner.', cn: '一只迷路的羊走进了我们家院子，我们帮忙找到了它的主人。'}
  ],
  'duck': [
    {en: 'The mother duck led her yellow ducklings across the pond.', cn: '鸭妈妈带着她黄色的小鸭子们游过池塘。'},
    {en: 'A wild duck splashed into the lake and disappeared underwater.', cn: '一只野鸭扑通一声跳进湖里，消失在水下。'},
    {en: 'We fed bread crumbs to the ducks at the park this weekend.', cn: '这个周末我们在公园里给鸭子喂面包屑。'}
  ],
  'frog': [
    {en: 'A green frog sat on a lily pad, croaking loudly in the pond.', cn: '一只绿色的青蛙坐在荷叶上，在池塘里大声呱呱叫。'},
    {en: 'The frog jumped from one stone to another across the stream.', cn: '青蛙从一块石头跳到另一块石头，穿过了小溪。'},
    {en: 'After the rain, tiny frogs appeared everywhere on the wet ground.', cn: '雨后，潮湿的地面上到处出现了小青蛙。'}
  ],
  'butterfly': [
    {en: 'A colorful butterfly rested on the red flower for a moment.', cn: '一只五彩斑斓的蝴蝶在红花朵上停留了片刻。'},
    {en: 'The children chased butterflies through the meadow with nets.', cn: '孩子们拿着网子在草地上追逐蝴蝶。'},
    {en: 'In spring, butterflies dance among the blooming cherry blossoms.', cn: '春天，蝴蝶在盛开的樱花间翩翩起舞。'}
  ],
  'tiger': [
    {en: 'The tiger paced back and forth behind the bars of its cage.', cn: '老虎在笼子的栏杆后面来回踱步。'},
    {en: 'We saw a magnificent tiger resting in the shade at the zoo.', cn: '我们在动物园看到一只雄伟的老虎在树荫下休息。'},
    {en: 'The stripes on a tiger help it hide in tall grass when hunting.', cn: '老虎身上的条纹帮助它在捕猎时藏在高草丛中。'}
  ],
  'cow': [
    {en: 'The brown cow chewed grass slowly by the riverside.', cn: '那头棕色的牛在河边慢慢地嚼着草。'},
    {en: 'Every morning, the farmer milks the cows before sunrise.', cn: '每天早上，农民在日出前给奶牛挤奶。'},
    {en: 'A baby cow stood close to its mother in the green pasture.', cn: '一头小牛在绿色的牧场上紧紧挨着它的妈妈。'}
  ],
  'hen': [
    {en: 'The hen clucked loudly when she found a worm in the dirt.', cn: '母鸡在土里发现一条虫子时，大声咯咯叫起来。'},
    {en: 'Every dawn, the old hen wakes the whole village with her call.', cn: '每天黎明，那只老母鸡的叫声把整个村子都唤醒了。'},
    {en: 'My grandmother feeds corn to the hens in the backyard.', cn: '我奶奶在后院给母鸡喂玉米。'}
  ],
  'monkey': [
    {en: 'The clever monkey snatched a banana from the tourist\'s hand.', cn: '那只聪明的猴子从游客手里抢走了一根香蕉。'},
    {en: 'Monkeys swung from branch to branch high up in the tropical forest.', cn: '猴子们在热带雨林的高处从一根树枝荡到另一根树枝。'},
    {en: 'A baby monkey clung tightly to its mother\'s back as they traveled.', cn: '小猴子紧紧地趴在妈妈背上，一起前行。'}
  ],
  'panda': [
    {en: 'The giant panda sat in the bamboo forest, munching on fresh shoots.', cn: '那只大熊猫坐在竹林里，大口嚼着新鲜的竹笋。'},
    {en: 'We watched a baby panda tumble down a small hill at the breeding center.', cn: '我们在繁育中心看到一只熊猫宝宝从小山坡上滚下来。'},
    {en: 'Pandas spend most of their day eating bamboo and sleeping.', cn: '熊猫一天中的大部分时间都在吃竹子和睡觉。'}
  ],
  'elephant': [
    {en: 'The elephant sprayed cool water over its back with its long trunk.', cn: '大象用长长的鼻子往背上喷洒清凉的水。'},
    {en: 'A herd of elephants walked slowly across the African savanna at sunset.', cn: '日落时分，一群大象缓慢地走过非洲大草原。'},
    {en: 'The baby elephant held its mother\'s tail with its little trunk.', cn: '小象用小小的鼻子紧紧抓住妈妈的尾巴。'}
  ],
  'chick': [
    {en: 'The yellow chick followed the hen around the farmyard.', cn: '那只黄色的小鸡跟着母鸡在农家院子里转来转去。'},
    {en: 'We watched a chick break out of its eggshell in science class.', cn: '科学课上，我们看着一只小鸡破壳而出。'},
    {en: 'The fluffy chick pecked at the scattered grains on the ground.', cn: '毛茸茸的小鸡在地上啄食散落的谷粒。'}
  ],

  // ===== 自然类 =====
  'tree': [
    {en: 'We planted a small tree in the schoolyard on Arbor Day.', cn: '植树节那天，我们在校园里种了一棵小树。'},
    {en: 'The old tree in front of my house has stood there for a hundred years.', cn: '我家门前的那棵老树已经在那里站了一百年。'},
    {en: 'Autumn wind blew yellow leaves off the maple tree.', cn: '秋风把枫叶树上的黄叶吹落了下来。'}
  ],
  'wind': [
    {en: 'Strong wind blew my hat off as I crossed the bridge.', cn: '过桥时，一阵大风把我的帽子吹掉了。'},
    {en: 'The wind carried the sweet smell of flowers from the valley below.', cn: '风从下面的山谷带来了花香。'},
    {en: 'We flew kites when the spring wind blew gently across the field.', cn: '当春风轻轻吹过田野时，我们放起了风筝。'}
  ],
  'star': [
    {en: 'I lay on the grass and counted stars in the clear night sky.', cn: '我躺在草地上，数着晴朗夜空中的星星。'},
    {en: 'The first star appeared just as the sun disappeared behind the mountains.', cn: '太阳刚落到山后，第一颗星星就出现了。'},
    {en: 'My grandmother says every star in the sky is someone\'s wish.', cn: '奶奶说天上的每一颗星星都是某个人的愿望。'}
  ],
  'moon': [
    {en: 'The full moon rose slowly above the quiet lake.', cn: '满月缓缓升起，高悬在宁静的湖面之上。'},
    {en: 'We shared mooncakes under the bright Mid-Autumn moon.', cn: '我们在明亮的中秋月光下分享月饼。'},
    {en: 'The crescent moon looked like a silver boat in the dark sky.', cn: '弯弯的月牙像一艘银色的小船挂在夜空中。'}
  ],
  'sun': [
    {en: 'The morning sun painted the eastern sky in shades of gold and pink.', cn: '朝阳把东方的天空染成了金色和粉红色。'},
    {en: 'We played outside until the sun began to set behind the hills.', cn: '我们在外面玩耍，直到太阳开始落山。'},
    {en: 'The hot summer sun made everyone seek shade under the trees.', cn: '炎炎夏日让每个人都躲到树荫下乘凉。'}
  ],
  'snow': [
    {en: 'Soft snow fell silently, covering the village in white.', cn: '柔软的雪花静静飘落，把整个村庄覆盖成白色。'},
    {en: 'The children built a snowman in the front yard after school.', cn: '放学后，孩子们在前院堆了一个雪人。'},
    {en: 'I love the crunching sound of fresh snow under my boots.', cn: '我喜欢新雪在靴子下发出的咯吱声。'}
  ],
  'cloud': [
    {en: 'White clouds floated lazily across the blue summer sky.', cn: '白云懒洋洋地飘过蓝色的夏日天空。'},
    {en: 'Dark clouds gathered on the horizon before the afternoon storm.', cn: '午后暴风雨来临前，乌云在地平线上聚集。'},
    {en: 'The cloud cast a cool shadow over the picnic blanket on the grass.', cn: '云朵在草地上的野餐毯上投下了一片凉爽的阴影。'}
  ],
  'rain': [
    {en: 'Heavy rain drummed against the classroom windows during the lesson.', cn: '上课时，大雨敲打着教室的窗户。'},
    {en: 'After the rain, a beautiful rainbow appeared over the mountains.', cn: '雨后，一道美丽的彩虹出现在山峦之上。'},
    {en: 'I forgot my umbrella and got completely soaked in the sudden rain.', cn: '我忘了带伞，被突如其来的大雨淋透了。'}
  ],
  'flower': [
    {en: 'Bright red flowers bloomed all along the path to the river.', cn: '通往河边的小路上，鲜红的花朵盛开了一路。'},
    {en: 'She picked a wild flower and tucked it behind her ear.', cn: '她摘了一朵野花，别在了耳后。'},
    {en: 'The flower shop on the corner sells fresh roses every morning.', cn: '街角的花店每天早上都卖新鲜的玫瑰。'}
  ],
  'grass': [
    {en: 'Dewdrops sparkled on the green grass early in the morning.', cn: '清晨，露珠在绿草地上闪闪发光。'},
    {en: 'We sat on the soft grass and watched clouds drift by.', cn: '我们坐在柔软的草地上，看着云朵飘过。'},
    {en: 'The grass in the school field turned brown after weeks without rain.', cn: '学校操场上的草在数周无雨后变黄了。'}
  ],
  'sea': [
    {en: 'The sea stretched endlessly to the horizon, blue and calm.', cn: '大海蓝蓝的、平静地延伸到地平线。'},
    {en: 'We collected beautiful shells along the sea shore at low tide.', cn: '退潮时，我们在海边收集了漂亮的贝壳。'},
    {en: 'Sailors on the old ship sang songs as they crossed the rough sea.', cn: '老船上的水手们在穿越汹涌的大海时唱起了歌。'}
  ],
  'river': [
    {en: 'The clear river wound through the valley between green mountains.', cn: '清澈的河流蜿蜒穿过青山之间的山谷。'},
    {en: 'Local children love to swim in the shallow part of the river.', cn: '当地的孩子们喜欢在河流的浅水区游泳。'},
    {en: 'An old stone bridge has crossed this river for over five hundred years.', cn: '一座古老的石桥已经横跨这条河五百多年了。'}
  ],
  'mountain': [
    {en: 'The snow-capped mountain glowed pink in the early morning light.', cn: '雪峰在晨光中泛着粉红色的光芒。'},
    {en: 'Villagers grow tea on the terraced fields along the mountain slope.', cn: '村民们沿着山坡的梯田种茶叶。'},
    {en: 'We climbed halfway up the mountain before resting by a spring.', cn: '我们爬到半山腰，在一处泉水边休息。'}
  ],
  'beach': [
    {en: 'We built a sandcastle on the beach while waves lapped at our feet.', cn: '海浪轻拍着我们的脚，我们在沙滩上堆了一座沙堡。'},
    {en: 'The beach was crowded with families enjoying the summer holiday.', cn: '海滩上挤满了享受暑假的家庭。'},
    {en: 'I found a beautiful seashell half-buried in the wet beach sand.', cn: '我在潮湿的沙滩里发现了一个半埋着的漂亮贝壳。'}
  ],

  // ===== 物品/日常用品 =====
  'kite': [
    {en: 'My father taught me how to fly a kite on the windy hillside.', cn: '爸爸在风大的山坡上教我如何放风筝。'},
    {en: 'The colorful kite soared high above the green rice fields.', cn: '五彩斑斓的风筝高高飞在绿色的稻田上空。'},
    {en: 'When the string broke, the kite drifted away into the clouds.', cn: '线断了，风筝飘向了云端。'}
  ],
  'shirt': [
    {en: 'Dad ironed his white shirt carefully before the important meeting.', cn: '爸爸在重要会议前仔细熨平了他的白衬衫。'},
    {en: 'I spilled juice on my favorite blue shirt during lunch.', cn: '午餐时，我把果汁洒在了我最喜欢的蓝衬衫上。'},
    {en: 'Grandma sewed a button back onto my torn shirt.', cn: '奶奶把我撕破的衬衫上的纽扣缝了回去。'}
  ],
  'scarf': [
    {en: 'She wrapped a warm wool scarf around her neck before going out.', cn: '出门前，她把一条温暖的羊毛围巾围在了脖子上。'},
    {en: 'My mother knitted a red scarf for me last winter.', cn: '去年冬天，妈妈给我织了一条红围巾。'},
    {en: 'The wind blew his scarf into the air as he crossed the bridge.', cn: '过桥时，风把他的围巾吹到了空中。'}
  ],
  'sock': [
    {en: 'I could not find my matching sock anywhere in the drawer.', cn: '我在抽屉里到处都找不到配对的那只袜子。'},
    {en: 'Grandma darned a hole in my favorite striped sock.', cn: '奶奶给我最喜欢的条纹袜子补了一个洞。'},
    {en: 'The puppy dragged a dirty sock across the living room floor.', cn: '小狗拖着一只脏袜子穿过了客厅地板。'}
  ],
  'spoon': [
    {en: 'The baby held a small spoon and tried to feed himself.', cn: '小宝宝拿着一把小勺子，试图自己吃饭。'},
    {en: 'She stirred her tea slowly with a silver spoon.', cn: '她用银勺子慢慢地搅动着茶。'},
    {en: 'We only had one spoon left after the others were lost camping.', cn: '露营时其他的勺子都丢了，我们只剩下一把。'}
  ],
  'lamp': [
    {en: 'Grandma read stories by the warm glow of an old oil lamp.', cn: '奶奶在一盏旧油灯温暖的光线下读故事。'},
    {en: 'I turned on the desk lamp and started my homework after dinner.', cn: '晚饭后，我打开台灯开始做作业。'},
    {en: 'The street lamp flickered and went out on the rainy night.', cn: '雨夜中，路灯闪烁了几下就灭了。'}
  ],
  'pencil': [
    {en: 'I sharpened my pencil to a fine point before the math test.', cn: '数学考试前，我把铅笔削得尖尖的。'},
    {en: 'The artist sketched the mountain with a soft charcoal pencil.', cn: '艺术家用一支软炭笔勾勒出了山的轮廓。'},
    {en: 'My little brother chewed on his pencil while thinking hard.', cn: '我弟弟苦思冥想时咬着铅笔。'}
  ],
  'rubber': [
    {en: 'I used a rubber to erase the mistake in my drawing.', cn: '我用橡皮擦掉了画里的错误。'},
    {en: 'The rubber ball bounced high when it hit the hard floor.', cn: '橡皮球撞到硬地板时弹得很高。'},
    {en: 'Dad patched the bicycle tire with a piece of rubber.', cn: '爸爸用一块橡胶补好了自行车轮胎。'}
  ],
  'plate': [
    {en: 'Mom arranged fresh fruit beautifully on a ceramic plate.', cn: '妈妈把新鲜的水果精美地摆放在瓷盘里。'},
    {en: 'The waiter dropped a plate, and it shattered on the floor.', cn: '服务员掉了一个盘子，它在地板上摔得粉碎。'},
    {en: 'We each chose our favorite design from the stack of plates.', cn: '我们从一叠盘子中各自选了自己最喜欢的图案。'}
  ],

  // ===== 地点/场所 =====
  'park': [
    {en: 'Elderly people practice tai chi in the park every morning.', cn: '每天早上，老人们在公园里打太极拳。'},
    {en: 'We had a picnic on the grass in the city park last Sunday.', cn: '上周日，我们在城市公园的草地上野餐。'},
    {en: 'The park is full of cherry blossoms in late March.', cn: '三月下旬，公园里开满了樱花。'}
  ],
  'road': [
    {en: 'A long dirt road led from the village to the nearest town.', cn: '一条长长的土路从村子通向最近的城镇。'},
    {en: 'Workers repaired the damaged road after the heavy summer flood.', cn: '夏季大洪水后，工人们修好了受损的道路。'},
    {en: 'We walked hand in hand down the quiet country road at sunset.', cn: '日落时分，我们手牵手走在安静的乡间小路上。'}
  ],
  'zoo': [
    {en: 'The zookeeper explained how pandas live in the wild.', cn: '动物园管理员讲解了熊猫如何在野外生活。'},
    {en: 'My class visited the zoo and saw lions for the first time.', cn: '我们班参观了动物园，第一次看到了狮子。'},
    {en: 'The new baby elephant at the zoo has become very popular.', cn: '动物园里新来的小象变得非常受欢迎。'}
  ],
  'home': [
    {en: 'After school, I always feel happy to walk through my front door.', cn: '放学后，走进家门我总是感到很开心。'},
    {en: 'The smell of cooking welcomed me as I arrived home.', cn: '到家时，做饭的香味迎接了我。'},
    {en: 'No matter where I travel, home is the place I miss most.', cn: '无论我去哪里旅行，家都是我最想念的地方。'}
  ],
  'school': [
    {en: 'The school bell rang, and students rushed out of the classrooms.', cn: '学校铃声响了，学生们冲出教室。'},
    {en: 'Our school planted a hundred trees along the playground fence.', cn: '我们学校沿着操场围栏种了一百棵树。'},
    {en: 'I met my best friend on the first day of middle school.', cn: '我上初中的第一天就遇到了我最好的朋友。'}
  ],
  'hospital': [
    {en: 'The doctor at the hospital carefully examined the injured boy.', cn: '医院的医生仔细检查了受伤的男孩。'},
    {en: 'Volunteers brought flowers to patients in the children\'s hospital.', cn: '志愿者们给儿童医院里的病人带来了鲜花。'},
    {en: 'My mother works as a nurse at the local hospital.', cn: '我妈妈在当地医院当护士。'}
  ],

  // ===== 人物 =====
  'farmer': [
    {en: 'The farmer woke before sunrise to feed his animals.', cn: '农民在日出前就起床喂他的牲畜。'},
    {en: 'Local farmers sell fresh vegetables at the morning market.', cn: '当地农民在早市上卖新鲜蔬菜。'},
    {en: 'My grandfather was a farmer who worked the land for fifty years.', cn: '我爷爷是个农民，在这片土地上劳作了五十年。'}
  ],
  'doctor': [
    {en: 'The doctor listened to my heartbeat with a cold stethoscope.', cn: '医生用冰凉的听诊器听了我的心跳。'},
    {en: 'She dreams of becoming a doctor to help people in poor villages.', cn: '她梦想成为一名医生，帮助贫困村庄的人们。'},
    {en: 'The doctor prescribed medicine and told me to rest for three days.', cn: '医生开了药，让我休息三天。'}
  ],
  'nurse': [
    {en: 'The kind nurse held my hand while the doctor treated my wound.', cn: '医生处理我的伤口时，善良的护士握住了我的手。'},
    {en: 'Nurses work day and night to care for patients in the hospital.', cn: '护士们日夜工作，照顾医院里的病人。'},
    {en: 'My aunt is a nurse who specializes in caring for newborn babies.', cn: '我姑姑是一名专门照顾新生儿的护士。'}
  ],
  'girl': [
    {en: 'A little girl in a red dress waved at us from across the street.', cn: '街对面一个穿红裙子的小女孩向我们挥手。'},
    {en: 'The girl practiced piano for two hours every single day.', cn: '那个女孩每天练习钢琴两个小时。'},
    {en: 'My neighbor\'s girl loves to draw pictures of animals.', cn: '邻居家的女孩喜欢画动物。'}
  ],
  'aunt': [
    {en: 'My aunt sent me a birthday card all the way from Australia.', cn: '我阿姨从澳大利亚远道给我寄来了一张生日贺卡。'},
    {en: 'We visited my aunt\'s farm during the summer holiday.', cn: '暑假期间，我们拜访了我阿姨的农场。'},
    {en: 'Aunt Li makes the best dumplings in our whole family.', cn: '李阿姨是我们全家做饺子最好吃的人。'}
  ],
  'uncle': [
    {en: 'Uncle Wang taught me how to fish when I was seven years old.', cn: '王叔叔在我七岁时教我钓鱼。'},
    {en: 'My uncle drives a taxi and knows every street in the city.', cn: '我叔叔开出租车，认识城里的每一条街。'},
    {en: 'Uncle brought us fresh honey from his mountain bee farm.', cn: '叔叔从他的山区蜂场给我们带来了新鲜的蜂蜜。'}
  ],
  'classmate': [
    {en: 'My classmate lent me his notes when I missed school with a cold.', cn: '我感冒缺课时，同学把他的笔记借给了我。'},
    {en: 'We chose our classmate Li Hua as monitor because she is responsible.', cn: '我们选同学李华当班长，因为她很负责任。'},
    {en: 'A classmate from primary school recognized me on the bus yesterday.', cn: '昨天在公交车上，一个小学同学认出了我。'}
  ],
  'fireman': [
    {en: 'The brave fireman climbed the ladder to rescue the cat from the roof.', cn: '勇敢的消防员爬上梯子，把猫从屋顶救了下来。'},
    {en: 'Firemen arrived within minutes after someone reported the building fire.', cn: '有人报告大楼起火后，消防员几分钟内就赶到了。'},
    {en: 'We visited the fire station and the firemen showed us their equipment.', cn: '我们参观了消防站，消防员给我们展示了他们的装备。'}
  ],
  'dentist': [
    {en: 'The dentist told me to brush my teeth twice a day.', cn: '牙医告诉我每天要刷两次牙。'},
    {en: 'I was nervous before seeing the dentist, but she was very gentle.', cn: '看牙医前我很紧张，但她非常温柔。'},
    {en: 'The dentist used a small mirror to check the back of my teeth.', cn: '牙医用一个小镜子检查了我牙齿的背面。'}
  ],

  // ===== 动作/动词 =====
  'cook': [
    {en: 'Mom cooks delicious noodles for the family every weekend.', cn: '妈妈每个周末都给家人煮美味的面条。'},
    {en: 'My brother learned to cook fried rice by watching online videos.', cn: '我哥哥通过看网络视频学会了做炒饭。'},
    {en: 'The chef cooks with fresh ingredients from the local market.', cn: '厨师用当地市场的新鲜食材烹饪。'}
  ],
  'run': [
    {en: 'I run around the lake every morning to stay healthy.', cn: '我每天早上绕湖跑步来保持健康。'},
    {en: 'The dog ran after the ball and brought it back happily.', cn: '狗追着球跑，然后开心地把球带了回来。'},
    {en: 'Water began to run down the window during the heavy storm.', cn: '暴风雨中，水开始顺着窗户往下流。'}
  ],
  'swim': [
    {en: 'We swim in the river near the village every summer afternoon.', cn: '每年夏天的下午，我们都在村子附近的河里游泳。'},
    {en: 'The fish swim in circles inside the glass fishbowl.', cn: '鱼在玻璃鱼缸里转着圈游来游去。'},
    {en: 'She learned to swim when she was only four years old.', cn: '她四岁时就学会了游泳。'}
  ],
  'ride': [
    {en: 'I ride my bicycle to school when the weather is nice.', cn: '天气好的时候，我骑自行车上学。'},
    {en: 'The cowboy rode his horse across the open prairie.', cn: '牛仔骑着马穿过开阔的草原。'},
    {en: 'We rode the Ferris wheel and saw the whole city from above.', cn: '我们坐了摩天轮，从高处看到了整座城市。'}
  ],
  'wash': [
    {en: 'I wash my hands before every meal to stay clean.', cn: '我每次饭前都洗手，保持清洁。'},
    {en: 'Mom washed the dirty clothes in the river behind our house.', cn: '妈妈在房子后面的小河里洗脏衣服。'},
    {en: 'The rain washed the dust off the leaves of the old tree.', cn: '雨水冲刷掉了老树叶上的灰尘。'}
  ],
  'paint': [
    {en: 'The artist began to paint the sunset over the mountains.', cn: '艺术家开始描绘山峦上的日落。'},
    {en: 'We helped paint the classroom walls bright yellow.', cn: '我们帮忙把教室的墙漆成了明亮的黄色。'},
    {en: 'She used watercolors to paint a picture of her grandmother.', cn: '她用水彩画了一幅奶奶的画。'}
  ],
  'eat': [
    {en: 'We eat dinner together as a family every evening.', cn: '我们每天晚上都一家人一起吃晚饭。'},
    {en: 'The baby bird eats worms that its mother brings to the nest.', cn: '小鸟吃妈妈带回巢里的虫子。'},
    {en: 'I always eat an apple after finishing my homework.', cn: '我做完作业后总会吃一个苹果。'}
  ],
  'drink': [
    {en: 'Please drink some water after running in the hot sun.', cn: '在烈日下跑步后，请喝些水。'},
    {en: 'The camel can drink a hundred liters of water at one time.', cn: '骆驼一次能喝一百升水。'},
    {en: 'Grandpa drinks tea while reading the newspaper every morning.', cn: '爷爷每天早上一边看报纸一边喝茶。'}
  ],
  'sleep': [
    {en: 'The baby sleeps peacefully in the cradle beside the bed.', cn: '宝宝在床边的摇篮里安静地睡着。'},
    {en: 'I need to sleep early tonight because of the exam tomorrow.', cn: '因为明天有考试，我今晚需要早点睡觉。'},
    {en: 'The old cat sleeps in the sunny spot on the windowsill all afternoon.', cn: '那只老猫整个下午都在窗台上阳光充足的地方睡觉。'}
  ],
  'climb': [
    {en: 'The monkey climbed quickly to the top of the tall tree.', cn: '猴子迅速爬到了大树的顶端。'},
    {en: 'We climbed the stone steps to reach the ancient temple.', cn: '我们爬上了石阶，到达了那座古老的寺庙。'},
    {en: 'The vine climbed up the old wall and covered it with green leaves.', cn: '藤蔓爬上了老墙，用绿叶把它覆盖住了。'}
  ],
  'fly': [
    {en: 'The bird flew south before winter arrived.', cn: '冬天来临前，鸟儿飞向了南方。'},
    {en: 'I will fly to Beijing to visit my grandparents next month.', cn: '下个月我将飞往北京看望爷爷奶奶。'},
    {en: 'Paper planes flew across the classroom during the break.', cn: '课间休息时，纸飞机飞过教室。'}
  ],
  'skip': [
    {en: 'The little girl skipped happily down the garden path.', cn: '小女孩开心地在花园小路上蹦蹦跳跳。'},
    {en: 'We used to skip rope together during recess in primary school.', cn: '小学时，我们经常在课间休息时一起跳绳。'},
    {en: 'He decided to skip breakfast because he woke up late.', cn: '他因为起晚了，决定不吃早餐。'}
  ],
  'cut': [
    {en: 'Be careful not to cut yourself with that sharp knife.', cn: '小心别被那把锋利的刀割伤。'},
    {en: 'Dad cut the watermelon into even slices for everyone.', cn: '爸爸把西瓜切成均匀的片，分给大家。'},
    {en: 'The wind cut through my thin jacket on the mountain top.', cn: '山顶的风穿透了我单薄的外套。'}
  ],
  'feed': [
    {en: 'My grandmother feeds the chickens in the yard every morning.', cn: '奶奶每天早上在院子里喂鸡。'},
    {en: 'The mother bird feeds her babies worms from dawn to dusk.', cn: '鸟妈妈从早到晚给雏鸟喂虫子。'},
    {en: 'Please remember to feed the goldfish before you leave.', cn: '离开前请记得喂金鱼。'}
  ],
  'collect': [
    {en: 'I collect beautiful stamps from different countries.', cn: '我收集来自不同国家的漂亮邮票。'},
    {en: 'The teacher asked us to collect leaves for the science project.', cn: '老师让我们为科学项目收集树叶。'},
    {en: 'Workers collect rubbish from the streets every morning at five.', cn: '工人们每天早上五点从街上收垃圾。'}
  ],
  'learn': [
    {en: 'I want to learn how to play the guitar this summer.', cn: '今年夏天我想学习弹吉他。'},
    {en: 'The best way to learn a language is to practice every day.', cn: '学习一门语言最好的方法是每天练习。'},
    {en: 'We learn something new in every lesson with our kind teacher.', cn: '在善良的老师每节课上，我们都能学到新东西。'}
  ],

  // ===== 形容词 =====
  'yellow': [
    {en: 'The yellow sunflowers turned their faces toward the morning sun.', cn: '黄色的向日葵把脸转向了朝阳。'},
    {en: 'She wore a bright yellow dress to the spring festival party.', cn: '她穿了一条亮黄色的裙子去参加春节派对。'},
    {en: 'The old pages of the book had turned yellow with age.', cn: '书的老旧书页因年代久远而变黄了。'}
  ],
  'dirty': [
    {en: 'The dirty puppy shook water all over the clean floor.', cn: '脏兮兮的小狗把水甩得满地都是。'},
    {en: 'My shoes got dirty after walking through the muddy field.', cn: '走过泥泞的田地后，我的鞋子变脏了。'},
    {en: 'He washed his dirty hands before sitting down to eat.', cn: '他坐下吃饭前洗了脏手。'}
  ],
  'new': [
    {en: 'I bought a new dictionary to help with my English studies.', cn: '我买了一本新字典来帮助学习英语。'},
    {en: 'The new student from Shanghai joined our class today.', cn: '来自上海的新同学今天加入了我们班。'},
    {en: 'Spring brings new leaves and flowers to every tree and plant.', cn: '春天给每棵树、每株植物带来了新叶和花朵。'}
  ],
  'tall': [
    {en: 'The tall bamboo grove swayed gently in the summer breeze.', cn: '高高的竹林在夏风中轻轻摇曳。'},
    {en: 'My older brother is already taller than our father.', cn: '我哥哥已经比爸爸高了。'},
    {en: 'A tall lighthouse stood on the cliff, guiding ships at night.', cn: '一座高高的灯塔矗立在悬崖上，夜间为船只导航。'}
  ],
  'long': [
    {en: 'The long train disappeared around the bend in the mountain.', cn: '长长的火车消失在山间的弯道处。'},
    {en: 'She grew her hair long over the summer holiday.', cn: '暑假期间她把头发留长了。'},
    {en: 'We walked a long way before finding a place to rest.', cn: '我们走了很长一段路才找到休息的地方。'}
  ],
  'hot': [
    {en: 'The hot summer sun made the pavement too hot to touch.', cn: '炎热的夏日阳光让路面烫得无法触碰。'},
    {en: 'I blew on the hot soup to cool it down before eating.', cn: '我吹了吹热汤，让它凉一点再喝。'},
    {en: 'The hot spring water felt wonderful on my tired feet.', cn: '温泉水让我疲惫的双脚感到很舒服。'}
  ],
  'full': [
    {en: 'The basket was full of fresh peaches from the orchard.', cn: '篮子里装满了从果园摘来的新鲜桃子。'},
    {en: 'I am too full to eat another bite of this delicious cake.', cn: '我吃得太饱了，一口蛋糕也吃不下了。'},
    {en: 'The classroom was full of excited students on the first day.', cn: '开学第一天，教室里挤满了兴奋的学生。'}
  ],
  'large': [
    {en: 'A large oak tree provided shade for the entire playground.', cn: '一棵大橡树为整个操场提供了阴凉。'},
    {en: 'The farmer kept his vegetables in a large underground cellar.', cn: '农民把蔬菜存放在一个大地窖里。'},
    {en: 'We need a large bowl to mix all these ingredients together.', cn: '我们需要一个大碗来把所有配料混合在一起。'}
  ],
  'angry': [
    {en: 'The angry dog barked loudly at the stranger near the gate.', cn: '那只生气的狗对着大门附近的陌生人大声吠叫。'},
    {en: 'Dad was angry when he found out I had lied about my homework.', cn: '爸爸发现我作业撒谎时很生气。'},
    {en: 'The angry wind blew the roof off the old farmhouse.', cn: '狂风把老农舍的屋顶吹掉了。'}
  ],
  'cool': [
    {en: 'The cool mountain air felt refreshing after the hot city.', cn: '离开炎热的城市后，凉爽的山间空气让人感到清新。'},
    {en: 'She wore cool sunglasses and looked like a movie star.', cn: '她戴着酷酷的墨镜，看起来像个电影明星。'},
    {en: 'We sat in the cool shade of the old tree during the noon heat.', cn: '正午酷热时，我们坐在老树的阴凉里。'}
  ],
  'strong': [
    {en: 'The strong wind knocked over our garden fence last night.', cn: '昨晚大风把我们的花园围栏吹倒了。'},
    {en: 'My grandfather has strong hands from years of farm work.', cn: '爷爷因多年农活而有一双有力的手。'},
    {en: 'Drinking milk every day helps children grow strong bones.', cn: '每天喝牛奶帮助孩子们长成强壮的骨骼。'}
  ],
  'tired': [
    {en: 'The tired hiker sat down on a rock to catch his breath.', cn: '疲惫的徒步旅行者坐在石头上喘口气。'},
    {en: 'I felt tired after staying up late to finish my project.', cn: '熬夜完成项目后，我感到很疲惫。'},
    {en: 'The tired old dog slowly walked to his favorite spot in the sun.', cn: '疲惫的老狗慢慢地走到它最喜欢的阳光下。'}
  ],
  'fast': [
    {en: 'The train moved fast through the countryside, leaving fields behind.', cn: '火车快速穿过乡村，把田野抛在身后。'},
    {en: 'Cheetahs are the fastest land animals on Earth.', cn: '猎豹是地球上跑得最快的陆地动物。'},
    {en: 'Time passes fast when you are having fun with friends.', cn: '和朋友一起玩的时候，时间过得很快。'}
  ],
  'slow': [
    {en: 'The slow turtle finally reached the finish line of the race.', cn: '慢吞吞的乌龟终于到达了比赛的终点线。'},
    {en: 'Please speak slow and clear so everyone can understand.', cn: '请说慢一点、清楚一点，这样大家都能听懂。'},
    {en: 'The old clock ticked slow in the quiet empty house.', cn: '老钟在安静空旷的房子里缓慢地滴答作响。'}
  ],

  // ===== 功能词 =====
  'on': [
    {en: 'A beautiful painting hangs on the wall of our classroom.', cn: '一幅漂亮的画挂在我们教室的墙上。'},
    {en: 'The cat is sleeping on the warm roof of the car.', cn: '猫正在汽车温暖的车顶上睡觉。'},
    {en: 'We have English class on Monday and Wednesday mornings.', cn: '我们周一和周三上午有英语课。'}
  ],
  'go': [
    {en: 'I go to the library every Saturday to borrow new books.', cn: '我每个星期六去图书馆借新书。'},
    {en: 'Where did you go during the winter holiday?', cn: '寒假期间你去哪里了？'},
    {en: 'The old saying goes that practice makes perfect.', cn: '俗话说，熟能生巧。'}
  ],
  'up': [
    {en: 'The red balloon floated up into the clear blue sky.', cn: '红色的气球飘上了晴朗的蓝天。'},
    {en: 'I woke up early to watch the sunrise from the hilltop.', cn: '我早起去山顶看日出。'},
    {en: 'Please pick up your clothes from the floor and fold them.', cn: '请把地上的衣服捡起来叠好。'}
  ],
  'in': [
    {en: 'There are thirty students in our English class.', cn: '我们班英语课有三十名学生。'},
    {en: 'The keys are in the drawer next to the telephone.', cn: '钥匙在电话旁边的抽屉里。'},
    {en: 'My grandmother was born in a small village in Yunnan.', cn: '我奶奶出生在云南的一个小村庄里。'}
  ],
  'out': [
    {en: 'Please take the rubbish out before dinner.', cn: '晚饭前请把垃圾拿出去。'},
    {en: 'The fire went out after the rain started.', cn: '雨开始下后，火熄灭了。'},
    {en: 'We ate out at a new Italian restaurant last night.', cn: '昨晚我们在一家新开的意大利餐厅外面吃饭。'}
  ],
  'for': [
    {en: 'This gift is for you on your fourteenth birthday.', cn: '这是给你的十四岁生日礼物。'},
    {en: 'I have waited for the bus for twenty minutes.', cn: '我等公交车已经等了二十分钟。'},
    {en: 'Thank you for helping me carry these heavy books.', cn: '谢谢你帮我搬这些沉重的书。'}
  ],
  'under': [
    {en: 'The cat hid under the bed during the thunderstorm.', cn: '雷暴期间，猫躲在了床底下。'},
    {en: 'We found wild mushrooms growing under the old pine tree.', cn: '我们在老松树下发现了野生蘑菇。'},
    {en: 'The bridge under the railway track is over a hundred years old.', cn: '铁轨下的那座桥已经有一百多年的历史了。'}
  ],
  'over': [
    {en: 'A beautiful rainbow appeared over the field after the rain.', cn: '雨后，一道美丽的彩虹出现在田野上空。'},
    {en: 'The plane flew over the snow-capped mountains at dawn.', cn: '飞机在黎明时分飞过了雪峰。'},
    {en: 'Grandma draped a warm blanket over my shoulders.', cn: '奶奶把一条温暖的毯子搭在了我的肩膀上。'}
  ],
  'with': [
    {en: 'I went to the concert with my best friend last weekend.', cn: '上周末我和最好的朋友一起去听了音乐会。'},
    {en: 'The old man walked with a wooden cane along the river.', cn: '老人拄着一根木杖沿着河边走。'},
    {en: 'She decorated the room with colorful paper flowers.', cn: '她用彩色纸花装饰了房间。'}
  ],
  'this': [
    {en: 'This book tells the story of a brave young girl.', cn: '这本书讲述了一个勇敢小女孩的故事。'},
    {en: 'I have never tasted this kind of tea before.', cn: '我以前从未品尝过这种茶。'},
    {en: 'This is my favorite photo from our family trip to Dali.', cn: '这是我们家大理之旅中我最喜欢的一张照片。'}
  ],
  'that': [
    {en: 'The old house that stands on the hill has been empty for years.', cn: '山上的那座老房子已经空了很多年了。'},
    {en: 'Is that your brother playing basketball over there?', cn: '在那边打篮球的是你哥哥吗？'},
    {en: 'I hope that everyone can visit the beautiful Erhai Lake someday.', cn: '我希望有一天每个人都能 visit 美丽的洱海。'}
  ],
  'these': [
    {en: 'These flowers in the garden were planted by my grandmother.', cn: '花园里的这些花是我奶奶种的。'},
    {en: 'Please pass me these books on the top shelf.', cn: '请把顶层架子上的这些书递给我。'},
    {en: 'These traditional snacks taste better than anything from a shop.', cn: '这些传统小吃比商店里卖的任何东西都好吃。'}
  ],
  'they': [
    {en: 'They built a new library for the village school last year.', cn: '他们去年为村校建了一座新图书馆。'},
    {en: 'The birds returned to their nest before the storm began.', cn: '暴风雨来临前，鸟儿们回到了它们的巢里。'},
    {en: 'They say the best time to visit Xishuangbanna is in spring.', cn: '人们说游览西双版纳的最佳时间是春天。'}
  ],
  'tell': [
    {en: 'Grandma loves to tell us stories about her childhood.', cn: '奶奶喜欢给我们讲她童年的故事。'},
    {en: 'Can you tell me how to get to the train station?', cn: '你能告诉我怎么去火车站吗？'},
    {en: 'The dark clouds told us that rain was coming soon.', cn: '乌云告诉我们大雨即将来临。'}
  ],
  'well': [
    {en: 'The old village well has provided water for five generations.', cn: '村里的老井已经为五代人提供了水源。'},
    {en: 'She plays the piano very well for someone so young.', cn: '对于这么年轻的人来说，她钢琴弹得很好。'},
    {en: 'I hope you get well soon and return to school.', cn: '希望你早日康复，回到学校。'}
  ],
  'all': [
    {en: 'All the students stood up when the teacher entered the room.', cn: '老师进教室时，所有学生都站了起来。'},
    {en: 'After the picnic, we cleaned up all the rubbish from the grass.', cn: '野餐后，我们把草地上所有的垃圾都清理干净了。'},
    {en: 'Not all treasure is silver and gold, as my grandfather always says.', cn: '并非所有宝藏都是金银财宝，正如爷爷常说的那样。'}
  ],
  'each': [
    {en: 'Each student received a red envelope on the first day of school.', cn: '开学第一天，每个学生都收到了一个红包。'},
    {en: 'The teacher checked each answer carefully before returning the papers.', cn: '老师在发回试卷前仔细检查了每一道答案。'},
    {en: 'Each spring, the cherry trees along the road bloom together.', cn: '每年春天，路边的樱花树一起绽放。'}
  ],
  'every': [
    {en: 'Every morning, the baker opens his shop before sunrise.', cn: '每天早上，面包师在日出前就开了店。'},
    {en: 'She makes sure to drink water every hour during the hot summer.', cn: '炎热的夏天，她确保每小时都喝水。'},
    {en: 'Every person in our class contributed to the charity project.', cn: '我们班每个人都为慈善项目做出了贡献。'}
  ],
  'can': [
    {en: 'Birds can fly high in the sky without any effort.', cn: '鸟儿可以毫不费力地在高空飞翔。'},
    {en: 'Can you help me carry these heavy boxes upstairs?', cn: '你能帮我把这些沉重的箱子搬上楼吗？'},
    {en: 'With enough practice, anyone can learn to play an instrument.', cn: '只要有足够的练习，任何人都能学会演奏一种乐器。'}
  ],
  'like': [
    {en: 'The twins look so much alike that I cannot tell them apart.', cn: '这对双胞胎长得太像了，我分不清他们。'},
    {en: 'I would like a bowl of rice noodles with beef, please.', cn: '请给我来一碗牛肉米粉。'},
    {en: 'The cat sleeps like a small furry ball on the sofa.', cn: '猫在沙发上像一团毛茸茸的小球一样睡觉。'}
  ],

  // ===== 其他高频词 =====
  'van': [
    {en: 'The delivery van stopped in front of our building with fresh fruit.', cn: '送货面包车停在我们楼前，送来了新鲜的水果。'},
    {en: 'We rented a van to drive the whole family to the seaside.', cn: '我们租了一辆面包车，载着全家人去海边。'},
    {en: 'The white ice cream van plays music as it drives through the neighborhood.', cn: '白色的冰淇淋车穿过社区时播放着音乐。'}
  ],
  'dress': [
    {en: 'She wore a beautiful red dress to the school celebration.', cn: '她穿了一条漂亮的红裙子参加学校庆典。'},
    {en: 'Mom helped me dress warmly before I went out in the snow.', cn: '下雪天出门前，妈妈帮我穿暖和。'},
    {en: 'The window display showed a silk dress that caught everyone\'s eye.', cn: '橱窗里展示的一件丝绸连衣裙吸引了所有人的目光。'}
  ],
  'colour': [
    {en: 'What colour is your favorite T-shirt?', cn: '你最喜欢的T恤是什么颜色的？'},
    {en: 'Autumn paints the mountains in warm colours of gold and red.', cn: '秋天用金色和红色的暖色调描绘了山峦。'},
    {en: 'The artist used bright colours to show the happiness of the scene.', cn: '艺术家用明亮的色彩来表现场景的欢乐。'}
  ],
  'hand': [
    {en: 'The little girl held her mother\'s hand tightly as they crossed the street.', cn: '小女孩紧紧地拉着妈妈的手过马路。'},
    {en: 'He raised his hand to answer the teacher\'s question.', cn: '他举手回答老师的问题。'},
    {en: 'The clock on the tower has a golden hand that shines in the sun.', cn: '塔上的钟有一只金色的指针在阳光下闪闪发光。'}
  ],
  'present': [
    {en: 'I wrapped the present in blue paper with a silver ribbon.', cn: '我用蓝色包装纸和银色丝带把礼物包好。'},
    {en: 'At this moment, all the students are present in the classroom.', cn: '此刻，所有学生都在教室里。'},
    {en: 'My best friend gave me a handmade present for my birthday.', cn: '我最好的朋友送了我一份手工制作的生日礼物。'}
  ],
  'open': [
    {en: 'Please open the window and let some fresh air in.', cn: '请打开窗户，让新鲜空气进来。'},
    {en: 'The flower began to open as the morning sun warmed its petals.', cn: '随着晨阳温暖花瓣，花朵开始绽放。'},
    {en: 'The new library will open to the public next Monday.', cn: '新图书馆将于下周一向公众开放。'}
  ],
  'start': [
    {en: 'The race will start when the referee fires the starting pistol.', cn: '裁判鸣枪后比赛开始。'},
    {en: 'I like to start my day with a glass of warm water.', cn: '我喜欢用一杯温水开始我的一天。'},
    {en: 'The engine would not start because the battery was dead.', cn: '发动机无法启动，因为电池没电了。'}
  ],
  'turn': [
    {en: 'Turn left at the old temple and you will see the library.', cn: '在老庙处左转，你就会看到图书馆。'},
    {en: 'It is your turn to clean the blackboard today.', cn: '今天轮到你擦黑板了。'},
    {en: 'The leaves turn golden before falling from the trees.', cn: '树叶在从树上落下之前变成金黄色。'}
  ],
  'do': [
    {en: 'What do you want to be when you grow up?', cn: '你长大后想做什么？'},
    {en: 'I have so much homework to do before Friday.', cn: '周五之前我有很多作业要做。'},
    {en: 'The best thing to do on a rainy day is read a good book.', cn: '下雨天最该做的事就是读一本好书。'}
  ],
  'make': [
    {en: 'My mother knows how to make the best dumplings in town.', cn: '我妈妈知道怎么做全城最好吃的饺子。'},
    {en: 'Let\'s make a snowman before the sun melts all the snow.', cn: '趁太阳把雪融化之前，我们来堆个雪人吧。'},
    {en: 'The loud noise made the baby cry.', cn: '巨大的响声把宝宝吓哭了。'}
  ],
  'one': [
    {en: 'One sunny morning, a strange bird appeared in our garden.', cn: '一个阳光明媚的早晨，一只奇怪的鸟出现在我们的花园里。'},
    {en: 'I only have one yuan left in my pocket.', cn: '我口袋里只剩一元钱了。'},
    {en: 'She is the one who helped me when I fell off my bike.', cn: '她就是那个在我从自行车上摔下来时帮助我的人。'}
  ],
  'ten': [
    {en: 'I counted ten boats on the calm lake this morning.', cn: '今天早上我数了湖面上有十条船。'},
    {en: 'She has lived in this village for ten years.', cn: '她在这个村子里住了十年了。'},
    {en: 'There are ten fingers on my two hands.', cn: '我的两只手有十根手指。'}
  ],
  'light': [
    {en: 'The morning light streamed through the kitchen window.', cn: '晨光透过厨房的窗户洒进来。'},
    {en: 'Please turn off the light when you leave the room.', cn: '离开房间时请关灯。'},
    {en: 'The box was light enough for the child to carry.', cn: '这个盒子很轻，孩子也能拿得动。'}
  ],
  'nurse': [
    {en: 'The nurse checked my temperature with a thermometer.', cn: '护士用体温计给我量了体温。'},
    {en: 'A kind nurse brought me warm water during my hospital stay.', cn: '住院期间，一位善良的护士给我端来了温水。'},
    {en: 'My dream is to become a nurse and help sick people recover.', cn: '我的梦想是成为一名护士，帮助病人康复。'}
  ],
  'doctor': [
    {en: 'The doctor put a bandage on my scraped knee.', cn: '医生给我擦伤的膝盖缠上了绷带。'},
    {en: 'You should see a doctor if the fever does not go down.', cn: '如果烧不退，你应该去看医生。'},
    {en: 'The village doctor rides a bicycle to visit patients in remote areas.', cn: '乡村医生骑自行车去偏远地区看望病人。'}
  ],
  'shell': [
    {en: 'I found a beautiful spiral shell on the beach last summer.', cn: '去年夏天我在海滩上发现了一个漂亮的螺旋贝壳。'},
    {en: 'The hermit crab crawled into an empty shell for protection.', cn: '寄居蟹爬进一个空壳里寻求保护。'},
    {en: 'We collected different shells and made a wind chime together.', cn: '我们收集了不同的贝壳，一起做了一串风铃。'}
  ],
  'outside': [
    {en: 'The children played outside until their mothers called them for dinner.', cn: '孩子们在外面玩，直到妈妈们喊他们吃晚饭。'},
    {en: 'It is cold outside, so put on your coat before going out.', cn: '外面很冷，所以出去之前穿上外套。'},
    {en: 'There is a small garden outside the classroom window.', cn: '教室窗外有一个小花园。'}
  ],
  'plant': [
    {en: 'My grandfather taught me how to plant rice in the paddy field.', cn: '爷爷教我如何在水田里插秧。'},
    {en: 'This rare plant only grows high in the Yunnan mountains.', cn: '这种珍稀植物只生长在云南的高山地区。'},
    {en: 'The power plant by the river provides electricity to the whole city.', cn: '河边的那座发电厂为整座城市供电。'}
  ]
};

module.exports = { highQualityExamples };
