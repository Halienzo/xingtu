const fs = require('fs');

console.log('Loading calendarData.json...');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
let fixCount = 0;

function hashWord(word, extra) {
  let h = 0;
  const s = (word + (extra || '')).toLowerCase();
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

// ============================================================
// 复合词语义分类系统
// ============================================================
function classifyCompound(word, pos, meaning) {
  const w = word.toLowerCase();
  const m = (meaning || '').toLowerCase();
  const p = (pos || '').toLowerCase();

  // 1. 动词短语 (v. / vi. / vt. 开头，或释义含"动词/动")
  if (/^(vi?\.?\s|vt\.?\s|v\.\/|v\.|be |get |go |come |take |make |look |keep |help |tell |talk |stay |pick |wait |blow |ride |watch |read |work |learn |speak |write |live |raise |start |act |fall |dress |put |do |run |walk |dance |sing |draw |paint |cook |clean |wash |study |teach |drive |fly |climb |jump |play |turn |cut |set |let |hit |hold |give |send |find |think |know |say |call |try |ask |show |hear |feel |leave |move |open |close |bring |buy |pay |meet |build |break |stand |lose |pay |meet |beat |become |begin |choose |draw |drive |eat |feed |fight |forget |forgive |freeze |grow |hide |lay |lead |lie |mean |ring |rise |shake |shine |shoot |shut |sing |sink |sit |sleep |smell |spell |spend |spill |spin |spit |split |spoil |spread |spring |stand |steal |stick |strike |swear |sweep |swim |swing |teach |tear |tell |think |throw |understand |wake |wear |weave |weep |win |wind |withdraw |write)/.test(w)) {
    if (p.startsWith('v') || /动/.test(m) || w.includes(' ')) return 'verb_phrase';
  }

  // 2. 介词短语
  if (/^(in |on |at |under |over |from |to |with |without |next to|across from|in front of|behind |before |after |above |below |between |among |through |during |into |out of|up |down |off |away |back |forward |around |about |against |along |among |around |as |beside |beyond |but |by |concerning |despite |except |for |inside |like |near |of |outside |past |regarding |round |since |than |throughout |till |toward |towards |underneath |until |upon |via |within)/.test(w)) {
    return 'prep_phrase';
  }

  // 3. 形容词/描述性复合词
  if (p.startsWith('adj') || /的$/.test(m) || /[- ]/.test(w) && (/-going|-handed|-wing|-hearted|-blooded|-known|-stop|-violent|-going|-minded|-eyed|-eared|-nosed|-legged|-footed|-armed|-headed|-bodied|-willed|-tempered|-mannered|-natured|-spirited|-styled|-fashioned|-shaped|-sized|-colored|-aged/.test(w))) {
    return 'adjective';
  }

  // 4. 量词/数量短语
  if (/^(a |an |the |some |many |much |more |most |few |little |less |least |several |various |all |both |each |every |either |neither |one |two |three |four |five |six |seven |eight |nine |ten |hundred |thousand |million |billion |dozen |score |pair |piece |slice |bit |lot |kind |sort |type |group |bunch |batch |heap |pile |stack |load |ton |deal |amount |number |quantity |portion |share |half |quarter |third |fifth |tenth |percent |percentage |proportion |ratio |rate)/.test(w)) {
    return 'quantifier';
  }

  // 5. 专有名词（地名、人名）
  if (/^[A-Z]/.test(word) && (/york|kong|zealand|africa|east|russia|arctic|antarctic|atlantic|pacific|shakespeare|nightingale|beijing|shanghai|guangzhou|shenzhen|chengdu|xian|nanjing|hangzhou|wuhan|changsha|kunming|dali|lishi|xishuangbanna|hong|china|japan|korea|india|france|germany|italy|spain|portugal|greece|turkey|egypt|israel|iran|iraq|syria|jordan|lebanon|cyprus|malta|iceland|ireland|scotland|wales|denmark|norway|sweden|finland|poland|czech|hungary|romania|bulgaria|ukraine|belarus|lithuania|latvia|estonia|armenia|georgia|azerbaijan|kazakhstan|afghanistan|pakistan|nepal|bhutan|bangladesh|myanmar|laos|cambodia|thailand|vietnam|malaysia|singapore|indonesia|philippines|australia|canada|mexico|brazil|argentina|chile|peru|colombia|venezuela/.test(w) || word.includes(' '))) {
    // 进一步确认：大写开头 + 空格，或者已知专有名词
    if (/^[A-Z][a-z]+( [A-Z][a-z]+)*$/.test(word) || /(york|kong|zealand|africa|russia|arctic|antarctic|atlantic|pacific|shakespeare|nightingale)/.test(w)) {
      return 'proper';
    }
  }

  // 6. 食物类名词
  if (/juice|milk|noodle|cake|bread|hot[- ]?dog|ice[- ]?cream|moon[- ]?cake|beef[- ]?noodle|tofu|wing|chicken|beef|fish|tomato|apple|melon|orange|lemon|lime|fruit|drink|snack|dairy|soya|potato|chip|fries|pizza|burger|salad|sandwich|cookie|candy|chocolate|popcorn|sausage|bacon|ham|steak|lamb|pork|duck|egg|rice|soup|tea|coffee|sugar|salt|honey|jam|pie|cheese|butter|meat|grain|cereal|pasta|grain|food|sauce|oil|vinegar|soy|wine|beer|water|cola|soda|pepsi|sprite|fanta|mango|banana|grape|peach|pear|plum|cherry|berry|strawberry|blueberry|raspberry|blackberry|cranberry|gooseberry|mulberry|elderberry|boysenberry|loganberry|youngberry|dewberry|cloudberry|bearberry|bilberry|whortleberry|huckleberry|lingonberry|crowberry|cowberry|foxberry|wolfberry|goji|acai|pomegranate|fig|date|raisin|currant|sultana|prune|apricot|avocado|papaya|guava|lychee|longan|rambutan|durian|jackfruit|breadfruit|plantain|date|fig|olive|pickle|relish|chutney|salsa|dip|spread|paste|puree|sauce|gravy|dressing|marinade|glaze|icing|frosting|topping|filling|stuffing|coating|batter|dough|crust|pastry|puff|flaky|phyllo|strudel|croissant|danish|brioche|baguette|focaccia|ciabatta|pita|naan|chapati|roti|paratha|tortilla|arepa|empanada|pupusa|taco|burrito|enchilada|quesadilla|tostada|nacho|fajita|tamale|mole|salsa|guacamole|pico de gallo|sour cream|crema|queso|cheese|cheddar|mozzarella|parmesan|provolone|gouda|brie|camembert|feta|goat|sheep|swiss|emmental|gruyere|havarti|gjetost|jarlsberg|limburger|muenster|port salut|roquefort|stilton|gorgonzola|blue|bleu|mascarpone|ricotta|cottage|cream|neufchatel|fromage|quark|cream|half-and-half|whipping|heavy|light|evaporated|condensed|powdered|buttermilk|kefir|yogurt|yoghurt|skyr|labneh|clabber|junket|curds|whey/.test(w)) {
    return 'food';
  }

  // 7. 地点/设施类
  if (/room|hall|stop|pool|zoo|park|house|building|corner|site|station|estate|club|store|shop|booth|desk|box|office|yard|farm|garden|forest|mountain|river|lake|ocean|sea|beach|island|city|town|village|country|street|road|bridge|gate|door|window|wall|roof|floor|kitchen|bedroom|bathroom|toilet|living[- ]?room|dining[- ]?room|sitting[- ]?room|classroom|library|gym|stadium|theater|cinema|museum|palace|castle|temple|church|harbor|port|dock|booth|yard|field|court|track|lane|alley|avenue|boulevard|highway|freeway|motorway|expressway|turnpike|tollway|parkway|causeway|overpass|underpass|crosswalk|sidewalk|pavement|path|trail|route|course|channel|canal|aqueduct|viaduct|tunnel|cave|cavern|grotto|den|lair|nest|burrow|hole|hollow|cavity|pit|crater|valley|canyon|ravine|gorge|pass|gap|notch|saddle|ridge|crest|spur|bluff|cliff|escarpment|scarp|precipice|brink|edge|brim|rim|lip|verge|margin|border|frontier|boundary|limit|bounds|confines|periphery|outskirts|suburbs|environs|vicinity|neighborhood|locality|district|quarter|sector|zone|area|region|territory|domain|realm|sphere|world|globe|earth|planet|sphere|orbit|circuit|lap|loop|cycle|round|turn|revolution|rotation|spin|twirl|whirl/.test(w)) {
    return 'place';
  }

  // 8. 人物关系
  if (/worker|friend|passer|leaver|assistant|mother|father|parent|sister|brother|sibling|cousin|uncle|aunt|nephew|niece|grand|child|son|daughter|husband|wife|spouse|partner|colleague|classmate|schoolmate|roommate|neighbor|stranger|foreigner|visitor|guest|host|hostess|customer|client|patient|doctor|nurse|teacher|student|pupil|professor|principal|head|president|manager|director|officer|official|leader|boss|chief|captain|commander|general|soldier|warrior|fighter|guard|police|detective|spy|agent|ambassador|minister|secretary|clerk|receptionist|operator|driver|pilot|sailor|crew|passenger|traveler|tourist|explorer|adventurer|pioneer|settler|immigrant|emigrant|refugee|victim|survivor|witness|observer|spectator|audience|crowd/.test(w)) {
    return 'person';
  }

  // 9. 物品/工具
  if (/phone|mobile|recorder|tape|shirt|pen|pencil|bat|instrument|whiteboard|board|smart|computer|machine|device|tool|equipment|gear|kit|set|pack|bag|case|box|container|bottle|cup|mug|glass|bowl|plate|dish|tray|pan|pot|kettle|bucket|barrel|keg|cask|vat|tub|tank|pipe|tube|hose|cord|cable|wire|line|rope|string|thread|yarn|fiber|filament|strand|strip|band|ribbon|tape|belt|strap|chain|link|ring|circle|loop|hoop|wheel|disk|disc|plate/.test(w)) {
    return 'object';
  }

  // 10. 节日/时间
  if (/festival|new[- ]?year|christmas|thanksgiving|easter|halloween|birthday|holiday|vacation|day|age|century|decade|era|period|epoch|time|season|spring|summer|autumn|winter|january|february|march|april|may|june|july|august|september|october|november|december|monday|tuesday|wednesday|thursday|friday|saturday|sunday|weekend|weekday|morning|afternoon|evening|night|noon|midnight|dawn|dusk|sunrise|sunset/.test(w)) {
    return 'time';
  }

  // 11. 活动/运动/游戏（未被前面捕获的名词性活动）
  if (/game|race|sport|skat|hockey|jump|basketball|ping[- ]?pong|tennis|chess|guitar|piano|violin|hike|trip|photo|joke|film|bike|swim|exercise|conversation|flag|activity|event|match|competition|contest|tournament|championship|league|series|round|bout|heat|trial|qualifier|semi[- ]?final|final|play[- ]?off|derby|classic|open|invitational|exhibition|friendly|practice|training|drill|workout|session|class|lesson|course|program|schedule|routine|regimen|diet|plan|scheme|project|task|job|duty|responsibility|role|function|purpose|aim|goal|objective|target|mission|vision|dream|ambition|aspiration|hope|wish|desire|want|need|requirement|demand|request|appeal|petition|plea|application|proposal|suggestion|recommendation|advice|tip|hint|clue|lead|pointer|guideline|rule|regulation|law|act|bill|statute|ordinance|decree|edict|order|command|directive|instruction|direction|guidance|counsel|consultation|conference|meeting|assembly|gathering|rally|protest|demonstration|march|parade|procession|cortege|caravan|convoy|fleet|flotilla|armada|squadron|wing|group|formation|team|crew|staff|personnel|force|unit|division|corps|regiment|battalion|company|platoon|squad|patrol|guard|watch|shift|turn|trick|stint|spell|stretch|span|duration|length|period|term|tenure|incumbency|occupancy|possession|ownership|property|belongings|effects|goods|wares|merchandise|commodities|products|produce|stock|inventory|supply|provision|ration|allowance|quota|allocation|allotment|apportionment|share|portion|part|piece|section|segment|sector|division|branch|department|office|bureau|agency|service|facility|plant|factory|mill|works|foundry|forge|smithy|shop|studio|atelier|workshop|laboratory|lab|research|center|centre|institute|academy|school|college|university|seminary|conservatory|institution|organization|organisation|association|society|club|union|league|guild|fraternity|sorority|fellowship|scholarship|grant|award|prize|trophy|medal|ribbon|badge|pin|button|emblem|symbol|sign|mark|token|stamp|seal|signet|crest|coat of arms|shield|banner|flag|standard|colors|ensign|pennant|streamer|banderole|jack|burgee|guidon|oriflamme|gonfalon/.test(w)) {
    return 'activity_noun';
  }

  // 默认：根据词性判断
  if (p.startsWith('v')) return 'verb_phrase';
  if (p.startsWith('adj')) return 'adjective';
  if (p.startsWith('prep')) return 'prep_phrase';
  if (p.startsWith('adv')) return 'adverb';
  if (p.startsWith('num')) return 'quantifier';
  if (p.startsWith('pron')) return 'pronoun';
  if (p.startsWith('conj')) return 'conjunction';
  if (p.startsWith('art')) return 'article';
  if (p.startsWith('int')) return 'interjection';

  // 默认名词
  return 'noun_general';
}

// ============================================================
// 各类别有意义的例句模板
// ============================================================

const templates = {
  // 动词短语
  verb_phrase: [
    {en: 'I {word} every morning.', cn: '我每天早上{meaning}。'},
    {en: 'She likes to {word} with her friends.', cn: '她喜欢和朋友一起{meaning}。'},
    {en: 'We {word} together after school.', cn: '我们放学后一起{meaning}。'},
    {en: 'He will {word} tomorrow.', cn: '他明天会{meaning}。'},
    {en: 'Please {word} now.', cn: '请现在{meaning}。'},
    {en: 'They {word} every Sunday.', cn: '他们每个星期天都{meaning}。'},
    {en: 'I need to {word} right now.', cn: '我现在需要{meaning}。'},
    {en: 'She decided to {word} today.', cn: '她决定今天{meaning}。'},
    {en: 'He loves to {word} in the garden.', cn: '他喜欢在花园里{meaning}。'},
    {en: 'We {word} before breakfast.', cn: '我们早餐前{meaning}。'},
    {en: 'I usually {word} after dinner.', cn: '我通常晚饭后{meaning}。'},
    {en: 'She plans to {word} next month.', cn: '她计划下个月{meaning}。'},
    {en: 'He forgot to {word} yesterday.', cn: '他昨天忘记{meaning}了。'},
    {en: 'We {word} to stay healthy.', cn: '我们{meaning}来保持健康。'},
    {en: 'I learned to {word} last year.', cn: '我去年学会了{meaning}。'},
    {en: 'She continues to {word} every day.', cn: '她每天坚持{meaning}。'},
    {en: 'He asked me to {word} with him.', cn: '他让我和他一起{meaning}。'},
    {en: 'We {word} to improve our skills.', cn: '我们{meaning}来提高技能。'},
    {en: 'I prefer to {word} in the morning.', cn: '我喜欢在早上{meaning}。'},
    {en: 'She managed to {word} successfully.', cn: '她成功地{meaning}了。'}
  ],

  // 介词短语
  prep_phrase: [
    {en: 'The cat is sitting {word} the table.', cn: '猫正坐在桌子{meaning}。'},
    {en: 'I put the book {word} the shelf.', cn: '我把书放{meaning}书架。'},
    {en: 'We met {word} the school gate.', cn: '我们在校门口{meaning}见面。'},
    {en: 'She lives {word} the river.', cn: '她住{meaning}河边。'},
    {en: 'The picture is hanging {word} the wall.', cn: '画挂在墙{meaning}。'},
    {en: 'Please wait {word} me.', cn: '请{meaning}等我。'},
    {en: 'I come {word} Yunnan.', cn: '我来{meaning}云南。'},
    {en: 'He jumped {word} the pool.', cn: '他跳{meaning}泳池。'},
    {en: 'The bus stopped {word} the station.', cn: '公交车{meaning}车站停了。'},
    {en: 'She looked {word} the window.', cn: '她{meaning}窗外看。'},
    {en: 'I walked {word} the bridge.', cn: '我{meaning}桥走。'},
    {en: 'He put his hands {word} his head.', cn: '他把双手放{meaning}头上。'},
    {en: 'The sign is {word} the entrance.', cn: '标志在入口{meaning}。'},
    {en: 'I sat {word} my best friend.', cn: '我坐在最好的朋友{meaning}。'},
    {en: 'She threw the ball {word} me.', cn: '她把球扔{meaning}我。'}
  ],

  // 形容词复合词
  adjective: [
    {en: 'He is a {word} person.', cn: '他是一个{meaning}的人。'},
    {en: 'She seems very {word}.', cn: '她看起来很{meaning}。'},
    {en: 'The {word} animal lives in the jungle.', cn: '{meaning}的动物生活在丛林里。'},
    {en: 'I like {word} people.', cn: '我喜欢{meaning}的人。'},
    {en: 'My teacher is {word} and patient.', cn: '我的老师很{meaning}也很有耐心。'},
    {en: 'The story describes a {word} hero.', cn: '这个故事描述了一个{meaning}的英雄。'},
    {en: 'We should be {word} to everyone.', cn: '我们应该对每个人都{meaning}。'},
    {en: 'His {word} attitude makes me happy.', cn: '他{meaning}的态度让我很开心。'},
    {en: 'She has a {word} personality.', cn: '她有{meaning}的性格。'},
    {en: 'The {word} team won the game.', cn: '{meaning}的队伍赢得了比赛。'}
  ],

  // 量词短语
  quantifier: [
    {en: 'I have {word} books at home.', cn: '我家里有{meaning}书。'},
    {en: 'There are {word} students in my class.', cn: '我们班有{meaning}学生。'},
    {en: 'She ate {word} cake.', cn: '她吃了{meaning}蛋糕。'},
    {en: 'We walked {word} kilometers.', cn: '我们走了{meaning}公里。'},
    {en: 'I waited for {word} minutes.', cn: '我等了{meaning}分钟。'},
    {en: 'He scored {word} points in the game.', cn: '他在比赛中得了{meaning}分。'},
    {en: 'There are {word} apples on the table.', cn: '桌子上有{meaning}苹果。'},
    {en: 'I read {word} stories last night.', cn: '我昨晚读了{meaning}故事。'}
  ],

  // 专有名词
  proper: [
    {en: 'I want to visit {word} someday.', cn: '我想有一天去参观{meaning}。'},
    {en: '{word} is famous around the world.', cn: '{meaning}在全世界都很有名。'},
    {en: 'We learned about {word} in history class.', cn: '我们在历史课上学习了{meaning}。'},
    {en: 'Many people travel to {word} every year.', cn: '每年都有很多人去{meaning}旅游。'},
    {en: '{word} has a long history.', cn: '{meaning}有悠久的历史。'},
    {en: 'I read a book about {word}.', cn: '我读了一本关于{meaning}的书。'},
    {en: 'The story of {word} is very interesting.', cn: '{meaning}的故事非常有趣。'},
    {en: 'I dream of going to {word}.', cn: '我梦想去{meaning}。'}
  ],

  // 食物类
  food: [
    {en: 'I like eating {word}.', cn: '我喜欢吃{meaning}。'},
    {en: 'The {word} tastes delicious.', cn: '这个{meaning}尝起来很美味。'},
    {en: 'We had {word} for lunch today.', cn: '我们今天午餐吃了{meaning}。'},
    {en: 'My mother knows how to make {word}.', cn: '我妈妈知道怎么做{meaning}。'},
    {en: 'Can I have some {word}, please?', cn: '请给我一些{meaning}好吗？'},
    {en: '{word} is my favorite snack.', cn: '{meaning}是我最喜欢的零食。'},
    {en: 'We bought {word} at the market.', cn: '我们在市场买了{meaning}。'},
    {en: 'I shared the {word} with my friends.', cn: '我和朋友分享了{meaning}。'}
  ],

  // 地点类
  place: [
    {en: 'We went to the {word} after school.', cn: '我们放学后去了{meaning}。'},
    {en: 'The {word} is near my home.', cn: '{meaning}在我家附近。'},
    {en: 'I often visit the {word} on weekends.', cn: '我周末经常去{meaning}。'},
    {en: 'There is a new {word} in our neighborhood.', cn: '我们社区有一个新的{meaning}。'},
    {en: 'We met at the {word} yesterday.', cn: '我们昨天在{meaning}见面了。'},
    {en: 'The {word} is very beautiful.', cn: '{meaning}很漂亮。'},
    {en: 'I can see the {word} from my window.', cn: '我从窗户可以看到{meaning}。'},
    {en: 'We need to clean the {word} today.', cn: '我们今天需要打扫{meaning}。'}
  ],

  // 人物关系
  person: [
    {en: 'My {word} works in a hospital.', cn: '我的{meaning}在医院工作。'},
    {en: 'I have a {word} who lives in Beijing.', cn: '我有一个住在北京的{meaning}。'},
    {en: 'She introduced me to her {word}.', cn: '她把我介绍给了她的{meaning}。'},
    {en: 'My {word} is very kind to me.', cn: '我的{meaning}对我很好。'},
    {en: 'I wrote a letter to my {word}.', cn: '我给我的{meaning}写了一封信。'},
    {en: 'We had dinner with my {word}.', cn: '我们和{meaning}一起吃了晚饭。'},
    {en: 'My {word} teaches English.', cn: '我的{meaning}教英语。'},
    {en: 'I miss my {word} very much.', cn: '我非常想念我的{meaning}。'}
  ],

  // 物品/工具
  object: [
    {en: 'I use the {word} every day.', cn: '我每天使用{meaning}。'},
    {en: 'She bought a new {word} last week.', cn: '她上周买了一个新{meaning}。'},
    {en: 'The {word} is on my desk.', cn: '{meaning}在我的书桌上。'},
    {en: 'Can I borrow your {word}?', cn: '我可以借你的{meaning}吗？'},
    {en: 'I need to fix my {word}.', cn: '我需要修理我的{meaning}。'},
    {en: 'He showed me his {word}.', cn: '他给我看了他的{meaning}。'},
    {en: 'The {word} is very useful for students.', cn: '{meaning}对学生很有用。'},
    {en: 'I put the {word} in my bag.', cn: '我把{meaning}放进了包里。'}
  ],

  // 节日/时间
  time: [
    {en: 'We celebrate {word} with our family.', cn: '我们和家人一起庆祝{meaning}。'},
    {en: 'I love the food during {word}.', cn: '我喜欢{meaning}期间的食物。'},
    {en: '{word} is my favorite holiday.', cn: '{meaning}是我最喜欢的节日。'},
    {en: 'We had a big dinner on {word}.', cn: '我们在{meaning}吃了一顿大餐。'},
    {en: 'I received many gifts during {word}.', cn: '我在{meaning}期间收到了很多礼物。'},
    {en: 'Every year, {word} comes in winter.', cn: '每年{meaning}都在冬天到来。'},
    {en: 'We visited my grandparents during {word}.', cn: '我们在{meaning}期间去看望了祖父母。'},
    {en: 'The streets are beautiful during {word}.', cn: '{meaning}期间街道很漂亮。'}
  ],

  // 活动名词
  activity_noun: [
    {en: 'I like {word} very much.', cn: '我非常喜欢{meaning}。'},
    {en: 'We had a {word} yesterday.', cn: '我们昨天举行了一场{meaning}。'},
    {en: 'She won the {word} last year.', cn: '她去年赢得了{meaning}。'},
    {en: 'The {word} was very exciting.', cn: '这场{meaning}非常精彩。'},
    {en: 'I watched the {word} on TV.', cn: '我在电视上观看了{meaning}。'},
    {en: 'We joined the {word} together.', cn: '我们一起参加了{meaning}。'},
    {en: 'He trains hard for the {word}.', cn: '他为{meaning}刻苦训练。'},
    {en: 'The {word} starts at nine.', cn: '{meaning}九点开始。'}
  ],

  // 一般名词
  noun_general: [
    {en: 'I like {word}.', cn: '我喜欢{meaning}。'},
    {en: 'The {word} is very beautiful.', cn: '这个{meaning}很漂亮。'},
    {en: 'She bought a {word} yesterday.', cn: '她昨天买了一个{meaning}。'},
    {en: 'We saw many {word}s in the park.', cn: '我们在公园里看到很多{meaning}。'},
    {en: 'My favorite {word} is red.', cn: '我最喜欢的{meaning}是红色的。'},
    {en: 'I want to buy a {word}.', cn: '我想买一个{meaning}。'},
    {en: 'The {word} is on the table.', cn: '{meaning}在桌子上。'},
    {en: 'He gave me a {word}.', cn: '他给了我一个{meaning}。'},
    {en: 'This {word} is very useful.', cn: '这个{meaning}很有用。'},
    {en: 'I found a {word} in my bag.', cn: '我在包里找到了一个{meaning}。'}
  ],

  // 副词
  adverb: [
    {en: 'She speaks {word}.', cn: '她说话{meaning}。'},
    {en: 'He runs very {word}.', cn: '他跑得{meaning}。'},
    {en: 'The train arrived {word}.', cn: '火车{meaning}到达了。'},
    {en: 'Please sit {word}.', cn: '请{meaning}坐。'},
    {en: 'She sings {word}.', cn: '她唱得{meaning}。'}
  ],

  // 代词
  pronoun: [
    {en: '{word} is my best friend.', cn: '{meaning}是我最好的朋友。'},
    {en: 'I gave the book to {word}.', cn: '我把书给了{meaning}。'},
    {en: '{word} helped me a lot.', cn: '{meaning}帮了我很多。'}
  ],

  // 连词
  conjunction: [
    {en: 'I like apples {word} oranges.', cn: '我喜欢苹果{meaning}橙子。'},
    {en: 'She is tired, {word} she keeps working.', cn: '她很累，{meaning}她继续工作。'},
    {en: 'You can stay {word} go now.', cn: '你可以留下{meaning}现在走。'}
  ],

  // 冠词
  article: [
    {en: 'I have {word} new bike.', cn: '我有{meaning}新自行车。'},
    {en: 'She is {word} honest girl.', cn: '她是{meaning}诚实的女孩。'},
    {en: '{word} sun is very bright today.', cn: '今天{meaning}太阳很明亮。'}
  ],

  // 感叹词
  interjection: [
    {en: '{word}! That is amazing!', cn: '{meaning}！太神奇了！'},
    {en: '{word}! Be careful!', cn: '{meaning}！小心！'},
    {en: '{word}! What a beautiful day!', cn: '{meaning}！多么美好的一天！'}
  ]
};

function getCompoundTemplate(word, pos, meaning, semester, dayIndex, wordIndex) {
  const category = classifyCompound(word, pos, meaning);
  const templateList = templates[category] || templates.noun_general;
  
  const hash = hashWord(word + semester + String(dayIndex), String(wordIndex));
  const template = templateList[hash % templateList.length];
  
  const cnMeaning = meaning ? meaning.split(/[;；]/)[0].trim() : word;
  
  return {
    en: template.en.replace(/{word}/g, word),
    cn: template.cn.replace(/{meaning}/g, cnMeaning),
    category
  };
}

// ============================================================
// 主修复逻辑
// ============================================================
const keys = Object.keys(data).sort().filter(k => k !== '9a' && k !== '9b');
const semDayTracker = {};

for (const key of keys) {
  const sem = data[key];
  for (let dayIdx = 0; dayIdx < sem.days.length; dayIdx++) {
    const day = sem.days[dayIdx];
    const dayKey = key + '_day' + day.day;
    semDayTracker[dayKey] = new Set();
    
    for (let wordIdx = 0; wordIdx < day.words.length; wordIdx++) {
      const w = day.words[wordIdx];
      const word = w.word;
      
      // 只处理复合词
      if (!word.includes(' ') && !word.includes('-') && !word.includes('...')) continue;
      
      if (!w.posDetails) continue;
      
      for (const pd of w.posDetails) {
        const ex = pd.example || '';
        const meaning = pd.meaning || w.meanings?.[0] || w.meaning || '';
        const pos = pd.pos || w.pos || 'unknown';
        
        let result = getCompoundTemplate(word, pos, meaning, key, dayIdx, wordIdx);
        
        // 避免同一天重复
        let attempts = 0;
        while (semDayTracker[dayKey].has(result.en) && attempts < 5) {
          const hash = hashWord(word + key + String(dayIdx) + String(attempts), String(wordIdx));
          const templateList = templates[result.category] || templates.noun_general;
          const t = templateList[hash % templateList.length];
          const cnMeaning = meaning ? meaning.split(/[;；]/)[0].trim() : word;
          result = {
            en: t.en.replace(/{word}/g, word),
            cn: t.cn.replace(/{meaning}/g, cnMeaning),
            category: result.category
          };
          attempts++;
        }
        
        semDayTracker[dayKey].add(result.en);
        
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

console.log(`Fixed ${fixCount} compound word examples.`);

console.log('Writing back to calendarData.json...');
fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data));
console.log('Done.');
