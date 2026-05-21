import fs from 'node:fs/promises';
import path from 'node:path';
import {
  mergeCandidateLexicalDetails,
  splitPosList,
  SUPPLEMENTAL_POS_DETAILS,
} from './pos-meaning-utils.mjs';
import {
  loadEcdictLexicon,
  normalizeLexiconKey,
} from './ecdict-lexicon.mjs';

const appRoot = process.cwd();
const generatedRoot = path.join(appRoot, 'generated', 'vocabulary');
const sourceDataPath = path.join(generatedRoot, 'word-candidates.raw.json');
const ecdictPath = path.join(appRoot, 'external', 'ECDICT', 'ecdict.csv');
const calendarOutPath = path.join(appRoot, 'src', 'data', 'calendarData.json');
const auditOutPath = path.join(generatedRoot, 'structured-calendar-audit.json');
const auditMarkdownPath = path.join(generatedRoot, 'structured-calendar-audit.md');
const syllableAuditOutPath = path.join(generatedRoot, 'syllable-example-audit.json');
const syllableAuditMarkdownPath = path.join(generatedRoot, 'syllable-example-audit.md');

const CALENDAR_YEAR = 2026;
const DAILY_WORDS = 6;
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const TERM_LABELS = {
  a: '上学期',
  b: '下学期',
};
const GRADE_CN = {
  1: '一年级',
  2: '二年级',
  3: '三年级',
  4: '四年级',
  5: '五年级',
  6: '六年级',
  7: '七年级',
  8: '八年级',
  9: '九年级',
  10: '十年级',
  11: '十一年级',
  12: '十二年级',
};

const SOLAR_HOLIDAYS = new Map([
  ['01-01', { cn: '元旦', en: "New Year's Day" }],
  ['02-14', { cn: '情人节', en: "Valentine's Day" }],
  ['03-08', { cn: '国际妇女节', en: "International Women's Day" }],
  ['03-12', { cn: '植树节', en: 'Arbor Day' }],
  ['04-01', { cn: '愚人节', en: "April Fool's Day" }],
  ['04-22', { cn: '世界地球日', en: 'Earth Day' }],
  ['05-01', { cn: '劳动节', en: 'Labour Day' }],
  ['05-04', { cn: '青年节', en: 'Youth Day' }],
  ['06-01', { cn: '儿童节', en: "Children's Day" }],
  ['07-01', { cn: '建党节', en: 'CPC Founding Day' }],
  ['08-01', { cn: '建军节', en: 'Army Day' }],
  ['09-10', { cn: '教师节', en: "Teachers' Day" }],
  ['10-01', { cn: '国庆节', en: 'National Day' }],
  ['10-31', { cn: '万圣节前夜', en: 'Halloween' }],
  ['12-24', { cn: '平安夜', en: 'Christmas Eve' }],
  ['12-25', { cn: '圣诞节', en: 'Christmas Day' }],
]);

const WEEKDAY_CN = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const WEEKDAY_EN = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];
const SYLLABLE_COLORS = ['#E11D48', '#2563EB', '#059669', '#D97706', '#7C3AED', '#0891B2'];
const IPA_DIPHTHONGS = ['eɪ', 'aɪ', 'ɔɪ', 'aʊ', 'əʊ', 'oʊ', 'ɪə', 'eə', 'ʊə', 'ai', 'ei', 'oi', 'au', 'ou', 'əu'];
const IPA_VOWELS = new Set('aeiouæɑɒɔɪʊʌəɜɚɝɛɐ');
const WRITTEN_VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

const syllableQualityStats = {
  total: 0,
  dictionary: 0,
  acronym: 0,
  phrase: 0,
  phoneticSingle: 0,
  heuristic: 0,
  fallback: 0,
  review: 0,
};
const exampleQualityStats = {
  total: 0,
  naturalOverride: 0,
  topicTemplate: 0,
  safeMeta: 0,
};
const syllableReviewRecords = [];
let metadataByKey = new Map();
let externalLexiconByKey = new Map();

const HIGH_CONFIDENCE_SYLLABLES = new Map(Object.entries({
  'a lot of': ['a', 'lot', 'of'],
  'all kinds of': ['all', 'kinds', 'of'],
  'at home': ['at', 'home'],
  'come true': ['come', 'true'],
  'each other': ['each', 'other'],
  'english club': ['English', 'club'],
  'look after': ['look', 'after'],
  'take care of': ['take', 'care', 'of'],
  'wait for': ['wait', 'for'],
  about: ['a', 'bout'],
  accident: ['ac', 'ci', 'dent'],
  action: ['ac', 'tion'],
  activity: ['ac', 'tiv', 'i', 'ty'],
  already: ['al', 'read', 'y'],
  address: ['ad', 'dress'],
  advice: ['ad', 'vice'],
  after: ['af', 'ter'],
  afternoon: ['af', 'ter', 'noon'],
  again: ['a', 'gain'],
  agree: ['a', 'gree'],
  amazed: ['a', 'mazed'],
  airport: ['air', 'port'],
  animal: ['an', 'i', 'mal'],
  another: ['an', 'oth', 'er'],
  answer: ['an', 'swer'],
  apple: ['ap', 'ple'],
  around: ['a', 'round'],
  article: ['ar', 'ti', 'cle'],
  arrive: ['ar', 'rive'],
  autumn: ['au', 'tumn'],
  banana: ['ba', 'na', 'na'],
  beautiful: ['beau', 'ti', 'ful'],
  because: ['be', 'cause'],
  before: ['be', 'fore'],
  began: ['be', 'gan'],
  bicycle: ['bi', 'cy', 'cle'],
  biology: ['bi', 'ol', 'o', 'gy'],
  birthday: ['birth', 'day'],
  breakfast: ['break', 'fast'],
  brother: ['broth', 'er'],
  butterfly: ['but', 'ter', 'fly'],
  camera: ['cam', 'er', 'a'],
  careful: ['care', 'ful'],
  centre: ['cen', 'tre'],
  chicken: ['chick', 'en'],
  children: ['chil', 'dren'],
  cinema: ['cin', 'e', 'ma'],
  city: ['ci', 'ty'],
  chinese: ['Chi', 'nese'],
  chocolate: ['choc', 'o', 'late'],
  cloudy: ['cloud', 'y'],
  classroom: ['class', 'room'],
  classmate: ['class', 'mate'],
  computer: ['com', 'pu', 'ter'],
  constable: ['con', 'sta', 'ble'],
  crayon: ['cray', 'on'],
  dangerous: ['dan', 'ger', 'ous'],
  daughter: ['daugh', 'ter'],
  delicious: ['de', 'li', 'cious'],
  dictionary: ['dic', 'tion', 'ar', 'y'],
  diamond: ['di', 'a', 'mond'],
  diet: ['di', 'et'],
  different: ['dif', 'fer', 'ent'],
  difficult: ['dif', 'fi', 'cult'],
  dinner: ['din', 'ner'],
  doctor: ['doc', 'tor'],
  eating: ['eat', 'ing'],
  elephant: ['el', 'e', 'phant'],
  english: ['Eng', 'lish'],
  eraser: ['e', 'ras', 'er'],
  evening: ['eve', 'ning'],
  example: ['ex', 'am', 'ple'],
  exercise: ['ex', 'er', 'cise'],
  expensive: ['ex', 'pen', 'sive'],
  factory: ['fac', 'to', 'ry'],
  family: ['fam', 'i', 'ly'],
  farmer: ['farm', 'er'],
  favorite: ['fa', 'vor', 'ite'],
  favourite: ['fa', 'vour', 'ite'],
  festival: ['fes', 'ti', 'val'],
  February: ['Feb', 'ru', 'ar', 'y'],
  fisherman: ['fish', 'er', 'man'],
  flower: ['flow', 'er'],
  football: ['foot', 'ball'],
  fewer: ['few', 'er'],
  giant: ['gi', 'ant'],
  grandfather: ['grand', 'fa', 'ther'],
  grandma: ['grand', 'ma'],
  grandmother: ['grand', 'mo', 'ther'],
  homework: ['home', 'work'],
  hospital: ['hos', 'pi', 'tal'],
  housework: ['house', 'work'],
  heavy: ['hea', 'vy'],
  history: ['his', 'to', 'ry'],
  important: ['im', 'por', 'tant'],
  interesting: ['in', 'ter', 'est', 'ing'],
  internet: ['in', 'ter', 'net'],
  ingredients: ['in', 'gre', 'di', 'ents'],
  inspire: ['in', 'spire'],
  jacket: ['jack', 'et'],
  January: ['Jan', 'u', 'ar', 'y'],
  July: ['Ju', 'ly'],
  lady: ['la', 'dy'],
  library: ['li', 'brar', 'y'],
  lion: ['li', 'on'],
  litre: ['li', 'tre'],
  little: ['lit', 'tle'],
  many: ['ma', 'ny'],
  market: ['mar', 'ket'],
  menu: ['men', 'u'],
  memorable: ['mem', 'or', 'a', 'ble'],
  metre: ['me', 'tre'],
  millimetre: ['mil', 'li', 'me', 'tre'],
  morning: ['morn', 'ing'],
  mother: ['moth', 'er'],
  nature: ['na', 'ture'],
  noodle: ['noo', 'dle'],
  noisy: ['noi', 'sy'],
  notebook: ['note', 'book'],
  office: ['of', 'fice'],
  orange: ['or', 'ange'],
  others: ['oth', 'ers'],
  outside: ['out', 'side'],
  outgoing: ['out', 'go', 'ing'],
  panda: ['pan', 'da'],
  parent: ['par', 'ent'],
  people: ['peo', 'ple'],
  piano: ['pi', 'an', 'o'],
  picture: ['pic', 'ture'],
  pineapple: ['pine', 'ap', 'ple'],
  playground: ['play', 'ground'],
  potato: ['po', 'ta', 'to'],
  practice: ['prac', 'tice'],
  present: ['pres', 'ent'],
  purple: ['pur', 'ple'],
  quiet: ['qui', 'et'],
  quietly: ['qui', 'et', 'ly'],
  question: ['ques', 'tion'],
  rainy: ['rain', 'y'],
  radio: ['ra', 'di', 'o'],
  really: ['real', 'ly'],
  restaurant: ['res', 'tau', 'rant'],
  responsible: ['re', 'spon', 'si', 'ble'],
  rocket: ['rock', 'et'],
  reunion: ['re', 'un', 'ion'],
  sandwich: ['sand', 'wich'],
  sandcastle: ['sand', 'cas', 'tle'],
  Saturday: ['Sat', 'ur', 'day'],
  schoolbag: ['school', 'bag'],
  science: ['sci', 'ence'],
  scientist: ['sci', 'en', 'tist'],
  sister: ['sis', 'ter'],
  sofa: ['so', 'fa'],
  special: ['spe', 'cial'],
  station: ['sta', 'tion'],
  storybook: ['sto', 'ry', 'book'],
  story: ['sto', 'ry'],
  strawberry: ['straw', 'ber', 'ry'],
  student: ['stu', 'dent'],
  Sunday: ['Sun', 'day'],
  Sydney: ['Syd', 'ney'],
  sweater: ['sweat', 'er'],
  table: ['ta', 'ble'],
  taro: ['ta', 'ro'],
  taxi: ['ta', 'xi'],
  telephone: ['tel', 'e', 'phone'],
  theatre: ['thea', 'tre'],
  timetable: ['time', 'ta', 'ble'],
  tomorrow: ['to', 'mor', 'row'],
  tomato: ['to', 'ma', 'to'],
  toothpaste: ['tooth', 'paste'],
  traditional: ['tra', 'di', 'tion', 'al'],
  triangle: ['tri', 'an', 'gle'],
  umbrella: ['um', 'brel', 'la'],
  uncle: ['un', 'cle'],
  very: ['ve', 'ry'],
  vegetable: ['veg', 'e', 'ta', 'ble'],
  village: ['vil', 'lage'],
  visitor: ['vis', 'i', 'tor'],
  violet: ['vi', 'o', 'let'],
  violin: ['vi', 'o', 'lin'],
  violinist: ['vi', 'o', 'lin', 'ist'],
  watermelon: ['wa', 'ter', 'mel', 'on'],
  weather: ['weath', 'er'],
  whiteboard: ['white', 'board'],
  wildfire: ['wild', 'fire'],
  window: ['win', 'dow'],
  wonderful: ['won', 'der', 'ful'],
  yesterday: ['yes', 'ter', 'day'],
  zebra: ['ze', 'bra'],
}).map(([key, value]) => [normalizeSyllableKey(key), value]));

const YUNNAN_WRITING_TOPICS = [
  {
    id: 'nature',
    cn: '接近自然、研学旅行、劳动实践、保护环境',
    en: 'getting close to nature',
    keywords: ['nature', 'natural', 'mountain', 'river', 'forest', 'tree', 'flower', 'plant', 'bird', 'animal', 'earth', 'clean', 'green', 'environment', 'trip', 'travel', 'hike', 'walk'],
  },
  {
    id: 'housework',
    cn: '做家务、家庭责任、亲情陪伴',
    en: 'doing housework and family responsibility',
    keywords: ['home', 'house', 'housework', 'family', 'father', 'mother', 'grandma', 'grandmother', 'grandfather', 'parent', 'room', 'clean', 'cook', 'wash', 'share'],
  },
  {
    id: 'school',
    cn: '校园生活、英语俱乐部、班级活动、毕业回忆',
    en: 'school life and class activities',
    keywords: ['school', 'class', 'teacher', 'student', 'club', 'english', 'book', 'lesson', 'homework', 'exam', 'friend', 'team'],
  },
  {
    id: 'volunteer',
    cn: '志愿服务、帮助他人、城市公园清洁',
    en: 'volunteering and helping others',
    keywords: ['volunteer', 'help', 'kind', 'care', 'city', 'park', 'community', 'people', 'share'],
  },
  {
    id: 'health',
    cn: '运动健康、坚持锻炼、积极生活',
    en: 'health, sports and active living',
    keywords: ['sport', 'run', 'walk', 'exercise', 'healthy', 'health', 'basketball', 'football', 'swim', 'strong'],
  },
  {
    id: 'culture',
    cn: '传统文化、节日、家乡云南与中国故事',
    en: 'traditional culture and hometown Yunnan',
    keywords: ['festival', 'spring festival', 'dragon', 'china', 'chinese', 'music', 'painting', 'story', 'hometown', 'yunnan'],
  },
  {
    id: 'future',
    cn: '梦想、职业、未来计划',
    en: 'dreams and future plans',
    keywords: ['dream', 'future', 'job', 'doctor', 'teacher', 'worker', 'astronaut', 'scientist', 'hope', 'want'],
  },
  {
    id: 'safety',
    cn: '安全、网络使用、规则意识',
    en: 'safety, rules and online learning',
    keywords: ['safe', 'safety', 'rule', 'internet', 'phone', 'online', 'technology', 'careful', 'dangerous'],
  },
];

const NATURAL_EXAMPLE_OVERRIDES = new Map(Object.entries({
  grandma: {
    en: 'My grandma taught me to share housework at home.',
    cn: '奶奶教我在家分担家务。',
  },
  nature: {
    en: 'Getting close to nature in Yunnan made me feel calm and thankful.',
    cn: '在云南亲近自然让我感到平静和感恩。',
  },
  housework: {
    en: 'Doing housework made me more responsible in my family.',
    cn: '做家务让我在家庭中更有责任感。',
  },
  share: {
    en: 'I learned to share housework with my family after school.',
    cn: '放学后我学会了和家人分担家务。',
  },
  'wait for': {
    en: 'During a study trip in Yunnan, we had to wait for the next bus.',
    cn: '在云南研学旅行中，我们不得不等待下一班公交车。',
  },
  'come true': {
    en: 'I hope my dream of helping my hometown will come true.',
    cn: '我希望帮助家乡的梦想能够实现。',
  },
  'each other': {
    en: 'In our English club, we help each other write better essays.',
    cn: '在英语俱乐部里，我们互相帮助写出更好的作文。',
  },
  'english club': {
    en: 'Lisa joined an English club to improve her speaking skills.',
    cn: '丽莎加入了英语俱乐部来提高口语能力。',
  },
  family: {
    en: 'My family spent a meaningful day cleaning the city park.',
    cn: '我的家人度过了有意义的一天，一起清洁城市公园。',
  },
  school: {
    en: 'Our school held an activity about getting close to nature.',
    cn: '我们学校举办了一次亲近自然的活动。',
  },
  teacher: {
    en: 'My teacher asked us to write about a meaningful day in Yunnan.',
    cn: '老师让我们写一篇关于云南有意义一天的作文。',
  },
  friend: {
    en: 'My friend and I cleaned a park as volunteers.',
    cn: '我和朋友作为志愿者清洁了公园。',
  },
  volunteer: {
    en: 'I want to volunteer in my community during the summer holiday.',
    cn: '我想在暑假到社区做志愿服务。',
  },
  park: {
    en: 'We cleaned the park and learned that small actions can help the city.',
    cn: '我们清洁公园，并懂得小行动也能帮助城市。',
  },
  dream: {
    en: 'My dream is to make my hometown in Yunnan more beautiful.',
    cn: '我的梦想是让云南家乡更美丽。',
  },
  environment: {
    en: 'We should protect the environment when we get close to nature.',
    cn: '亲近自然时，我们应该保护环境。',
  },
  book: {
    en: 'A good book gave me ideas for my English composition.',
    cn: '一本好书给了我英语作文的思路。',
  },
  reading: {
    en: 'Reading helps me collect better ideas for school essays.',
    cn: '阅读帮助我为校园作文积累更好的想法。',
  },
  healthy: {
    en: 'A healthy life helps me study better and write with energy.',
    cn: '健康的生活帮助我更好学习，也更有精力写作。',
  },
}));

async function main() {
  const raw = JSON.parse(await fs.readFile(sourceDataPath, 'utf8'));
  externalLexiconByKey = await loadEcdictLexicon(ecdictPath, buildTargetLexiconKeys(raw));
  console.log(`External lexicon entries used: ${externalLexiconByKey.size}`);
  metadataByKey = buildMetadataIndex(raw);
  const calendarData = {};
  const audit = [];

  const addPlan = (key, grade, termCode, pool, sourceNote) => {
    const words = dedupeForProgram(pool).map(candidateToCalendarWord);
    if (words.length === 0) return;
    const plan = buildYearPlan(key, grade, termCode, words, sourceNote);
    calendarData[key] = plan;
    audit.push({
      key,
      name: plan.name,
      sourceNote,
      sourceWords: words.length,
      days: plan.days.length,
      dailyWords: DAILY_WORDS,
      generatedWordPlacements: plan.days.length * DAILY_WORDS,
    });
  };

  for (let grade = 1; grade <= 6; grade += 1) {
    for (const [termCode, term] of Object.entries(TERM_LABELS)) {
      const pool = raw.filter((row) => row.stage === 'primary' && row.grade === grade && row.term === term);
      addPlan(`${grade}${termCode}`, grade, termCode, pool, '小学词汇1166（1-6年级+P35）.doc');
    }
  }

  for (const grade of [7, 8]) {
    for (const [termCode, term] of Object.entries(TERM_LABELS)) {
      const pool = raw.filter((row) => row.stage === 'junior' && row.grade === grade && row.term === term);
      addPlan(`${grade}${termCode}`, grade, termCode, pool, '01/02/03 初中本地资料综合抽取');
    }
  }

  const gradeNine = dedupeForProgram(raw.filter((row) => row.stage === 'junior' && row.grade === 9));
  const gradeNineSplit = splitIntoChunks(gradeNine, 2);
  addPlan('9a', 9, 'a', gradeNineSplit[0] || [], '九年级本地资料前半部分');
  addPlan('9b', 9, 'b', gradeNineSplit[1] || [], '九年级本地资料后半部分');

  const senior = dedupeForProgram(raw.filter((row) => row.stage === 'senior'));
  const seniorChunks = splitIntoChunks(senior, 6);
  const seniorKeys = [
    ['10a', 10, 'a'],
    ['10b', 10, 'b'],
    ['11a', 11, 'a'],
    ['11b', 11, 'b'],
    ['12a', 12, 'a'],
    ['12b', 12, 'b'],
  ];
  seniorKeys.forEach(([key, grade, termCode], index) => {
    addPlan(key, grade, termCode, seniorChunks[index] || [], '3-高中3500词汇 - 带音标.docx');
  });

  await fs.writeFile(calendarOutPath, `${JSON.stringify(calendarData)}\n`, 'utf8');
  await fs.writeFile(auditOutPath, `${JSON.stringify(audit, null, 2)}\n`, 'utf8');
  await fs.writeFile(auditMarkdownPath, buildAuditMarkdown(audit), 'utf8');
  const syllableAudit = buildSyllableExampleAudit();
  await fs.writeFile(syllableAuditOutPath, `${JSON.stringify(syllableAudit, null, 2)}\n`, 'utf8');
  await fs.writeFile(syllableAuditMarkdownPath, buildSyllableExampleAuditMarkdown(syllableAudit), 'utf8');

  console.log(`Calendar plans: ${Object.keys(calendarData).length}`);
  console.log(`Output: ${calendarOutPath}`);
  console.log(`Audit: ${auditOutPath}`);
  console.log(`Syllable/example audit: ${syllableAuditOutPath}`);
}

function buildTargetLexiconKeys(rows) {
  return new Set((rows || [])
    .map((row) => normalizeLexiconKey(row.normalized || row.word))
    .filter(Boolean));
}

function buildYearPlan(key, grade, termCode, words, sourceNote) {
  const days = [];
  let cursor = 0;
  for (const month of MONTHS) {
    const daysInMonth = new Date(CALENDAR_YEAR, month, 0).getDate();
    for (let dayOfMonth = 1; dayOfMonth <= daysInMonth; dayOfMonth += 1) {
      const date = new Date(CALENDAR_YEAR, month - 1, dayOfMonth);
      const dayWords = [];
      for (let i = 0; i < DAILY_WORDS; i += 1) {
        dayWords.push(words[cursor % words.length]);
        cursor += 1;
      }
      const holiday = getHoliday(date);
      days.push({
        day: days.length + 1,
        date: `${month}月${dayOfMonth}日`,
        dateISO: formatDateISO(date),
        month,
        dayOfMonth,
        weekdayCn: WEEKDAY_CN[date.getDay()],
        weekdayEn: WEEKDAY_EN[date.getDay()],
        holidayCn: holiday?.cn || '',
        holidayEn: holiday?.en || '',
        unit: `${month}月`,
        words: dayWords,
      });
    }
  }

  return {
    key,
    name: `${GRADE_CN[grade]}${TERM_LABELS[termCode]}`,
    grade: GRADE_CN[grade],
    term: TERM_LABELS[termCode],
    year: CALENDAR_YEAR,
    startMonth: 1,
    months: MONTHS,
    sourceNote,
    days,
  };
}

function getHoliday(date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  const fixed = SOLAR_HOLIDAYS.get(`${month}-${day}`);
  if (fixed) return fixed;

  if (date.getMonth() === 4 && date.getDay() === 0 && Math.ceil(date.getDate() / 7) === 2) {
    return { cn: '母亲节', en: "Mother's Day" };
  }
  if (date.getMonth() === 5 && date.getDay() === 0 && Math.ceil(date.getDate() / 7) === 3) {
    return { cn: '父亲节', en: "Father's Day" };
  }
  if (date.getMonth() === 10 && date.getDay() === 4 && Math.ceil(date.getDate() / 7) === 4) {
    return { cn: '感恩节', en: 'Thanksgiving Day' };
  }
  return null;
}

function formatDateISO(date) {
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function dedupeForProgram(rows) {
  const byKey = new Map();
  for (const row of rows) {
    if (!row?.word || !row?.normalized) continue;
    if (isNoiseCandidate(row)) continue;
    if (!Array.isArray(row.meanings) || row.meanings.length === 0) continue;
    const key = normalizeSyllableKey(row.normalized);
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, { base: row, rows: [row] });
      continue;
    }
    existing.rows.push(row);
    const currentPriority = Number.isFinite(existing.base.priority) ? existing.base.priority : 99;
    const rowPriority = Number.isFinite(row.priority) ? row.priority : 99;
    if (rowPriority < currentPriority) existing.base = row;
  }
  return Array.from(byKey.values()).map((entry) => ({
    ...entry.base,
    mergedRows: entry.rows,
  }));
}

function isNoiseCandidate(row) {
  const word = String(row.word || '').trim();
  const normalized = String(row.normalized || word).trim().toLowerCase();
  if (!word) return true;
  if (/^(n|v|vt|vi|adj|adv|pron|prep|conj|interj|num|modalv|modal|pl|sing|abbr)\.?$/.test(normalized)) return true;
  if (/^(pron|adj|adv|prep|conj|interj|num|v|n)\.(pron|adj|adv|prep|conj|interj|num|v|n)$/.test(normalized)) return true;
  if (/^[a-z]+v\s+a$/.test(normalized)) return true;
  return false;
}

function splitIntoChunks(rows, count) {
  const size = Math.ceil(rows.length / count);
  return Array.from({ length: count }, (_, index) => rows.slice(index * size, (index + 1) * size));
}

function candidateToCalendarWord(row) {
  const enrichedRow = enrichCandidateRow(row);
  const posDetails = buildCalendarPosDetails(enrichedRow);
  const pos = normalizePos(enrichedRow.pos || posDetails.map((item) => item.pos).join('/'));
  const meanings = sanitizeMeanings(posDetails.length ? posDetails.map((item) => item.meaning) : enrichedRow.meanings, 8);
  const syllableAnalysis = buildSyllableAnalysis(enrichedRow);
  const parts = syllableAnalysis.parts;
  const detailCards = posDetails.length > 0
    ? posDetails.map((detail) => {
      const detailExample = buildExample(enrichedRow, detail.pos, [detail.meaning]);
      return {
        pos: detail.pos,
        meaning: detail.meaning,
        example: detailExample.en,
        exampleCn: detailExample.cn,
      };
    })
    : [];
  const example = detailCards[0]
    ? { en: detailCards[0].example, cn: detailCards[0].exampleCn }
    : buildExample(enrichedRow, pos, meanings);
  return {
    word: enrichedRow.word,
    phonetic: enrichedRow.phonetic || '',
    syllables: parts.join('·'),
    syllableParts: parts,
    syllableColors: parts.map((_, index) => SYLLABLE_COLORS[index % SYLLABLE_COLORS.length]),
    pos,
    meanings,
    phrases: enrichedRow.type === 'phrase' ? [enrichedRow.word] : [],
    example: example.en,
    memoryTip: '',
    posDetails: detailCards.length > 0 ? detailCards : [{
      pos: pos || '',
      meaning: meanings[0] || '',
      example: example.en,
      exampleCn: example.cn,
    }],
  };
}

function buildCalendarPosDetails(row) {
  const existing = Array.isArray(row.posDetails)
    ? row.posDetails
      .map((item) => ({
        pos: String(item.pos || '').trim(),
        meaning: String(item.meaning || '').trim(),
      }))
      .filter((item) => item.pos && item.meaning)
    : [];
  if (existing.length > 0) return existing;

  const posList = splitPosList(row.pos);
  const meanings = sanitizeMeanings(row.meanings, 8);
  const fallbackPos = inferFallbackPos(row);
  if (meanings.length === 0) return [];
  if (posList.length === 0) return fallbackPos ? [{ pos: fallbackPos, meaning: meanings[0] }] : [];
  if (posList.length === meanings.length) {
    return posList.map((pos, index) => ({ pos, meaning: meanings[index] }));
  }
  if (posList.length === 1) {
    return [{ pos: posList[0], meaning: meanings[0] }];
  }
  if (fallbackPos) return [{ pos: fallbackPos, meaning: meanings[0] }];
  return posList.map((pos, index) => ({ pos, meaning: meanings[index] || meanings[0] }));
}

function inferFallbackPos(row) {
  const word = String(row.word || '').trim();
  const key = normalizeSyllableKey(word);
  const meaningText = Array.isArray(row.meanings) ? row.meanings.join('；') : '';
  if (row.type === 'phrase' || /\s|\.{2,}|sth|sb/i.test(word)) return 'phr.';
  if (/^[A-Z]{2,6}$/.test(word) || /^[A-Z](?:\.[A-Z])+\.?$/.test(word) || /^[A-Za-z]$/.test(word) || /^(cd|tv|pe|p\.e|ufo|un|usa|uk|ai)$/i.test(key)) return 'abbr.';
  if (/^(hello|hey|hi|goodbye|bye|ok|okay)$/i.test(key)) return 'interj.';
  if (/动词过去式|原形/.test(meaningText) || /^(?:was|were|went|did|had|made|bought|saw|found|thought|told|said|got|came|took|gave|left|kept|felt|became|began|learnt|learned|taught|wrote|heard|laid|caught|sold|swam|met|hung)$/i.test(key)) return 'v.';
  if (/^(ve|ll|re|d)$/i.test(key)) return 'aux.';
  if (/人名|^[\u3400-\u9fff·；;（）()]{2,20}$/.test(meaningText) && /^[A-Z][A-Za-z-]+$/.test(word)) return 'n.';
  if (/名词/.test(meaningText)) return 'n.';
  if (/感叹词/.test(meaningText)) return 'interj.';
  if (/^[A-Za-z]+(?:-[A-Za-z]+){2,}$/.test(word)) return 'v.';
  if (/s$/i.test(word) && !/ss$/i.test(word)) return 'n.';
  if (/ing$/i.test(word)) return /绳|物|事|法/.test(meaningText) ? 'n.' : 'v.';
  if (/er$/i.test(word)) return 'adj.';
  if (word.includes('-')) return /^[a-z]+-[a-z]+$/i.test(word) ? 'n.' : 'phr.';
  if (/ly$/i.test(word) || /地/.test(meaningText)) return 'adv.';
  if (/(的|被覆盖|可.*的|值得.*的)/.test(meaningText) || /(able|ible|al|ive|ous|ful|less|ic|ary|ory|ed)$/i.test(word)) return 'adj.';
  return '';
}

function buildMetadataIndex(rows) {
  const byKey = new Map();
  for (const row of rows) {
    if (!row?.word) continue;
    if (isNoiseCandidate(row)) continue;
    const key = normalizeSyllableKey(row.normalized || row.word);
    const phonetic = sanitizePhonetic(row.phonetic);
    const current = byKey.get(key) || {
      word: row.word,
      phonetic: '',
      pos: '',
      meanings: [],
      posDetails: [],
      rows: [],
      bestPriority: Number.POSITIVE_INFINITY,
    };
    current.rows.push(row);
    const priority = Number.isFinite(row.priority) ? row.priority : 99;
    if (!current.phonetic && phonetic) current.phonetic = phonetic;
    if (!current.pos && row.pos) current.pos = row.pos;
    if (Array.isArray(row.meanings) && row.meanings.length > current.meanings.length) {
      current.meanings = row.meanings;
    }
    if (priority < current.bestPriority) {
      current.word = row.word;
      current.bestPriority = priority;
    }
    byKey.set(key, current);
  }
  for (const [key, current] of byKey) {
    const external = externalLexiconByKey.get(key);
    const lexicalRows = external ? [...current.rows, external] : current.rows;
    const lexical = mergeCandidateLexicalDetails(lexicalRows, SUPPLEMENTAL_POS_DETAILS.get(key));
    if (lexical.pos) current.pos = lexical.pos;
    if (lexical.meanings.length > 0) current.meanings = lexical.meanings;
    if (lexical.posDetails.length > 0) current.posDetails = lexical.posDetails;
  }
  return byKey;
}

function enrichCandidateRow(row) {
  const key = normalizeSyllableKey(row.normalized || row.word);
  const meta = metadataByKey.get(key);
  const phonetic = sanitizePhonetic(row.phonetic);
  const mergedRows = [
    ...(Array.isArray(row.mergedRows) ? row.mergedRows : [row]),
    ...(Array.isArray(meta?.rows) ? meta.rows : []),
  ];
  const external = externalLexiconByKey.get(key);
  const lexicalRows = external ? [...mergedRows, external] : mergedRows;
  const lexical = mergeCandidateLexicalDetails(lexicalRows, SUPPLEMENTAL_POS_DETAILS.get(key));
  if (!meta) {
    return {
      ...row,
      phonetic,
      pos: lexical.pos || row.pos || '',
      meanings: lexical.meanings.length > 0 ? lexical.meanings : row.meanings,
      posDetails: lexical.posDetails.length > 0 ? lexical.posDetails : row.posDetails,
    };
  }
  return {
    ...row,
    phonetic: phonetic || meta.phonetic || '',
    pos: lexical.pos || row.pos || meta.pos || '',
    meanings: lexical.meanings.length > 0
      ? lexical.meanings
      : (Array.isArray(row.meanings) && row.meanings.length > 0 ? row.meanings : meta.meanings),
    posDetails: lexical.posDetails.length > 0
      ? lexical.posDetails
      : (Array.isArray(row.posDetails) && row.posDetails.length > 0 ? row.posDetails : meta.posDetails),
  };
}

function normalizePos(pos) {
  if (!pos) return '';
  return Array.from(new Set(pos.split('/').map((part) => part.trim()).filter(Boolean))).join('/');
}

function sanitizeMeanings(meanings, max = 4) {
  return Array.from(new Set((meanings || [])
    .map((item) => String(item).replace(/\s+/g, ' ').trim())
    .filter(Boolean)))
    .slice(0, max);
}

function buildSyllableAnalysis(row) {
  const clean = String(row.word || '').trim();
  const key = normalizeSyllableKey(clean);
  const phonetic = sanitizePhonetic(row.phonetic);
  const phoneticCount = countPhoneticSyllables(phonetic, clean);
  syllableQualityStats.total += 1;

  let parts;
  let method;
  let confidence = 'medium';

  if (!clean) {
    parts = [];
    method = 'fallback';
    confidence = 'low';
  } else if (/\.{2,}/.test(clean)) {
    parts = clean.split(/\.{2,}/).map((part) => part.trim()).filter(Boolean);
    method = 'phrase';
    confidence = 'high';
  } else if (HIGH_CONFIDENCE_SYLLABLES.has(key)) {
    parts = clonePartsForOriginalCase(HIGH_CONFIDENCE_SYLLABLES.get(key), clean);
    method = 'dictionary';
    confidence = 'high';
  } else if (isLetterNameToken(clean) && phoneticCount && phoneticCount > 1) {
    parts = clean.split('');
    method = 'acronym';
    confidence = 'high';
  } else if (row.type === 'phrase' || /\s/.test(clean)) {
    parts = splitPhrase(clean);
    method = 'phrase';
    confidence = 'high';
  } else if (clean.includes('-')) {
    parts = clean.split('-').map((part) => part.trim()).filter(Boolean);
    method = 'phrase';
    confidence = 'high';
  } else if (phoneticCount === 1) {
    parts = [clean];
    method = 'phonetic-single';
    confidence = 'high';
  } else if (phoneticCount && phoneticCount > 1) {
    parts = splitByWrittenHeuristic(clean, phoneticCount);
    method = 'phonetic-heuristic';
    confidence = 'medium';
  } else {
    parts = splitByWrittenHeuristic(clean, null);
    method = 'written-fallback';
    confidence = 'low';
  }

  parts = normalizeSyllableParts(parts, clean, method === 'dictionary' || method === 'phrase');
  const reviewReasons = collectSyllableReviewReasons(parts, clean, phoneticCount, method);
  if (reviewReasons.length > 0) {
    confidence = 'low';
    syllableQualityStats.review += 1;
    syllableReviewRecords.push({
      word: clean,
      phonetic,
      parts,
      syllables: parts.join('·'),
      phoneticCount,
      method,
      reasons: reviewReasons,
      sourceFile: row.sourceFile,
    });
  }

  if (method === 'dictionary') syllableQualityStats.dictionary += 1;
  else if (method === 'acronym') syllableQualityStats.acronym += 1;
  else if (method === 'phrase') syllableQualityStats.phrase += 1;
  else if (method === 'phonetic-single') syllableQualityStats.phoneticSingle += 1;
  else if (method === 'phonetic-heuristic') syllableQualityStats.heuristic += 1;
  else syllableQualityStats.fallback += 1;

  return { parts, method, confidence, phoneticCount, reviewReasons };
}

function countPhoneticSyllables(phonetic, word) {
  const raw = sanitizePhonetic(phonetic).split(/[,，;；]/)[0];
  if (!raw.trim()) return null;
  const ipa = raw
    .toLowerCase()
    .replace(/[\/\[\]{}()]/g, '')
    .replace(/[ˈˌ'`]/g, '')
    .replace(/[ː:]/g, '')
    .replace(/\s+/g, '');
  if (!ipa) return null;

  let count = 0;
  for (let index = 0; index < ipa.length; index += 1) {
    const pair = ipa.slice(index, index + 2);
    if (IPA_DIPHTHONGS.includes(pair)) {
      count += 1;
      index += 1;
      continue;
    }
    const char = ipa[index];
    if (!IPA_VOWELS.has(char)) continue;
    count += 1;
    while (index + 1 < ipa.length && IPA_VOWELS.has(ipa[index + 1])) {
      index += 1;
    }
  }

  const lowerWord = String(word || '').toLowerCase();
  if (
    count > 0
    && /[bcdfghjklmnpqrstvwxyz]le$/.test(lowerWord)
    && !/(ale|ile|ole)$/.test(lowerWord)
    && !/ə[^aeiouæɑɒɔɪʊʌəɜɚɝɛɐ]*l$/.test(ipa)
  ) {
    count = Math.max(count + 1, 2);
  }
  if (count > 0 && /(?:tion|sion|cious|tious)$/.test(lowerWord)) {
    count = Math.max(count, estimateWrittenSyllableCount(lowerWord));
  }
  return count || null;
}

function sanitizePhonetic(value) {
  const text = String(value || '').trim();
  if (!text) return '';
  if (text.length > 60) return '';
  if (/[\u4e00-\u9fff]/.test(text)) return '';
  if (/[{}"“”]/.test(text)) return '';
  if (/[=]/.test(text)) return '';
  if (!/^[\[/(']/.test(text)) return '';
  if (/\s/.test(text) && !/[ˈˌːɑɒɔɪʊʌəɜɚɝɛæθðʃʒŋ]/.test(text)) return '';
  const phoneticChars = /[ɑɒɔɪʊʌəɜɚɝɛæθðʃʒŋˈˌː:eɡa-z]/i;
  return phoneticChars.test(text) ? text : '';
}

function splitByWrittenHeuristic(word, targetCount) {
  const clean = String(word).trim();
  if (!clean) return [];
  const lower = clean.toLowerCase();

  if (targetCount === 1) return [clean];
  if (/[bcdfghjklmnpqrstvwxyz]le$/.test(lower) && !/(ale|ile|ole)$/.test(lower)) {
    const head = clean.slice(0, -3);
    const tail = clean.slice(-3);
    if (targetCount === 2 && head) return [head, tail];
  }

  const groups = collectWrittenVowelGroups(lower, targetCount);
  if (groups.length <= 1) return [clean];
  const desired = targetCount || groups.length;
  if (desired <= 1) return [clean];
  if (groups.length < desired) return [clean];

  const selectedGroups = groups.slice(0, desired);
  const cuts = [];
  for (let index = 1; index < selectedGroups.length; index += 1) {
    const previous = selectedGroups[index - 1];
    const next = selectedGroups[index];
    const between = lower.slice(previous.end, next.start);
    let cut = next.start;
    if (between.length > 1) cut = next.start - 1;
    if (cut <= (cuts.at(-1) || 0)) cut = next.start;
    cuts.push(cut);
  }

  const parts = [];
  let start = 0;
  for (const cut of cuts) {
    parts.push(clean.slice(start, cut));
    start = cut;
  }
  parts.push(clean.slice(start));
  return parts;
}

function collectWrittenVowelGroups(lower, targetCount) {
  const groups = [];
  let index = 0;
  while (index < lower.length) {
    const char = lower[index];
    const isYVowel = char === 'y' && index > 0;
    if (!WRITTEN_VOWELS.has(char) && !isYVowel) {
      index += 1;
      continue;
    }
    const start = index;
    index += 1;
    while (index < lower.length && (WRITTEN_VOWELS.has(lower[index]) || lower[index] === 'y')) {
      index += 1;
    }
    const end = index;
    const group = lower.slice(start, end);
    const silentFinalE = group === 'e' && end === lower.length && lower.length > 2 && targetCount !== null;
    if (!silentFinalE) groups.push({ start, end, group });
  }
  return groups;
}

function estimateWrittenSyllableCount(lower) {
  return collectWrittenVowelGroups(lower, null).length || 1;
}

function normalizeSyllableParts(parts, fallbackWord, preserveEdges = false) {
  const cleanParts = (parts || [])
    .map((part) => String(part).trim())
    .filter(Boolean);
  if (cleanParts.length === 0) return [fallbackWord];
  if (preserveEdges) return cleanParts;
  return rebalanceEdgeFragments(cleanParts);
}

function rebalanceEdgeFragments(parts) {
  if (parts.length <= 1) return parts;
  const result = [...parts];
  const last = result.at(-1);
  const beforeLast = result.at(-2);
  if (/^e$/i.test(last) && beforeLast) {
    result.splice(result.length - 2, 2, `${beforeLast}${last}`);
    return result;
  }
  if (/^[aoiuy]$/i.test(last) && beforeLast && beforeLast.length > 1) {
    const moved = beforeLast.slice(-1);
    result[result.length - 2] = beforeLast.slice(0, -1);
    result[result.length - 1] = `${moved}${last}`;
    return result.filter(Boolean);
  }
  return result;
}

function collectSyllableReviewReasons(parts, word, phoneticCount, method) {
  const reasons = [];
  if (!parts.length) reasons.push('empty-parts');
  if (method !== 'phrase' && method !== 'dictionary' && method !== 'acronym' && parts.length > 1 && /^[aoiuy]$/i.test(parts.at(-1) || '')) {
    reasons.push('trailing-single-vowel-part');
  }
  if (parts.length > 1 && parts.at(-1)?.toLowerCase() === 'e') {
    reasons.push('trailing-silent-e-part');
  }
  if (phoneticCount && parts.length !== phoneticCount && method !== 'phrase' && method !== 'dictionary' && method !== 'acronym') {
    reasons.push(`phonetic-count-${phoneticCount}-vs-parts-${parts.length}`);
  }
  if (method === 'written-fallback' && parts.length > 1) {
    reasons.push('no-phonetic-written-fallback');
  }
  if (word.length > 12 && parts.length === 1 && phoneticCount && phoneticCount > 1) {
    reasons.push('long-word-unsplit');
  }
  return reasons;
}

function isLetterNameToken(value) {
  const clean = String(value || '').trim();
  if (/^[A-Z]{2,6}$/.test(clean)) return true;
  return /^(kg|km|cm|mm|am|pm|tv|pe|it|ufo|gps)$/i.test(clean);
}

function normalizeSyllableKey(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

function splitPhrase(value) {
  return String(value)
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

function clonePartsForOriginalCase(parts, original) {
  const originalWords = String(original).split(/\s+/);
  if (originalWords.length > 1) return parts;
  if (/^[A-Z][a-z]/.test(original) && parts.length > 0) {
    return [capitalize(parts[0]), ...parts.slice(1)];
  }
  return parts;
}

function capitalize(value) {
  return value ? `${value[0].toUpperCase()}${value.slice(1)}` : value;
}

function buildExample(row, pos, meanings) {
  exampleQualityStats.total += 1;
  const word = String(row.word || '').trim();
  const key = normalizeSyllableKey(word);
  const override = NATURAL_EXAMPLE_OVERRIDES.get(key);
  if (override) {
    exampleQualityStats.naturalOverride += 1;
    return override;
  }

  const topic = chooseWritingTopic(row, meanings);
  const quoted = `"${word}"`;
  const posLower = String(pos || '').toLowerCase();
  if (row.type === 'phrase') {
    exampleQualityStats.topicTemplate += 1;
    return {
      en: `In a Yunnan exam essay about ${topic.en}, I can use ${quoted} to make one sentence clearer.`,
      cn: `在云南考向的${topic.cn}作文中，可以用“${word}”让句子更清楚。`,
    };
  }
  if (posLower.includes('n.')) {
    exampleQualityStats.topicTemplate += 1;
    return {
      en: `The word ${quoted} can add a real detail to my essay about ${topic.en}.`,
      cn: `“${word}”可以给${topic.cn}作文增加一个真实细节。`,
    };
  }
  if (posLower.includes('v.')) {
    exampleQualityStats.topicTemplate += 1;
    return {
      en: `I can use ${quoted} when I write about ${topic.en} in a Yunnan English essay.`,
      cn: `写云南英语作文中的${topic.cn}主题时，可以使用“${word}”。`,
    };
  }
  if (posLower.includes('adj.')) {
    exampleQualityStats.topicTemplate += 1;
    return {
      en: `The word ${quoted} helps describe a feeling or detail in an essay about ${topic.en}.`,
      cn: `“${word}”可以在${topic.cn}作文中描写感受或细节。`,
    };
  }

  exampleQualityStats.safeMeta += 1;
  return {
    en: `In a Yunnan English writing task about ${topic.en}, I can learn the word ${quoted}.`,
    cn: `在云南英语写作的${topic.cn}主题中，可以学习“${word}”这个词。`,
  };
}

function chooseWritingTopic(row, meanings) {
  const haystack = [
    row.word,
    row.normalized,
    row.rawLine,
    ...(meanings || []),
  ].join(' ').toLowerCase();
  return YUNNAN_WRITING_TOPICS.find((topic) => topic.keywords.some((keyword) => haystack.includes(keyword))) || YUNNAN_WRITING_TOPICS[2];
}

function buildAuditMarkdown(audit) {
  const lines = [
    '# Structured Calendar Audit',
    '',
    `Generated: ${new Date().toISOString()}`,
    '',
    '| Plan | Source words | Days | Daily words | Source |',
    '| --- | ---: | ---: | ---: | --- |',
  ];
  for (const item of audit) {
    lines.push(`| ${item.name} (${item.key}) | ${item.sourceWords} | ${item.days} | ${item.dailyWords} | ${item.sourceNote} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function buildSyllableExampleAudit() {
  const sampleLimit = 200;
  return {
    generatedAt: new Date().toISOString(),
    policy: {
      syllables: [
        'Batch 1 uses phonetic syllable counts first, then high-confidence dictionary corrections, then written-form heuristics.',
        'Rows whose written parts still disagree with phonetic counts or produce one-letter vowel fragments are kept in the review list.',
        'Generated calendarData.json is rebuilt from source candidates; direct hand edits to generated JSON are avoided.',
      ],
      examples: [
        'Batch 1 replaces generic examples with Yunnan writing-topic contexts.',
        'High-frequency words use natural topic sentences when safe.',
        'Uncertain words use quoted meta examples so the sentence remains grammatically safe while still tied to writing topics.',
      ],
    },
    yunnanWritingTopicBasis: YUNNAN_WRITING_TOPICS.map(({ id, cn, en }) => ({ id, cn, en })),
    syllableQualityStats,
    exampleQualityStats,
    reviewCount: syllableReviewRecords.length,
    reviewSamples: syllableReviewRecords.slice(0, sampleLimit),
  };
}

function buildSyllableExampleAuditMarkdown(audit) {
  const lines = [
    '# Syllable And Example Audit',
    '',
    `Generated: ${audit.generatedAt}`,
    '',
    '## Batch 1 Policy',
    '',
    ...audit.policy.syllables.map((line) => `- ${line}`),
    ...audit.policy.examples.map((line) => `- ${line}`),
    '',
    '## Yunnan Writing Topic Bank',
    '',
    '| Topic | Chinese scope | English scope |',
    '| --- | --- | --- |',
  ];
  for (const topic of audit.yunnanWritingTopicBasis) {
    lines.push(`| ${topic.id} | ${topic.cn} | ${topic.en} |`);
  }
  lines.push(
    '',
    '## Syllable Stats',
    '',
    `- Total generated word records: ${audit.syllableQualityStats.total}`,
    `- Dictionary corrections: ${audit.syllableQualityStats.dictionary}`,
    `- Acronym/letter-name splits: ${audit.syllableQualityStats.acronym}`,
    `- Phrase splits: ${audit.syllableQualityStats.phrase}`,
    `- Phonetic single-syllable locks: ${audit.syllableQualityStats.phoneticSingle}`,
    `- Phonetic-guided heuristic splits: ${audit.syllableQualityStats.heuristic}`,
    `- Written fallback splits: ${audit.syllableQualityStats.fallback}`,
    `- Needs manual review: ${audit.syllableQualityStats.review}`,
    '',
    '## Example Stats',
    '',
    `- Total generated examples: ${audit.exampleQualityStats.total}`,
    `- Natural overrides: ${audit.exampleQualityStats.naturalOverride}`,
    `- Topic templates: ${audit.exampleQualityStats.topicTemplate}`,
    `- Safe meta templates: ${audit.exampleQualityStats.safeMeta}`,
    '',
    '## Review Samples',
    '',
    '| Word | Phonetic | Parts | Reasons |',
    '| --- | --- | --- | --- |',
  );
  for (const item of audit.reviewSamples.slice(0, 80)) {
    lines.push(`| ${escapeMdCell(item.word)} | ${escapeMdCell(item.phonetic)} | ${escapeMdCell(item.syllables)} | ${escapeMdCell(item.reasons.join(', '))} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function escapeMdCell(value) {
  return String(value || '').replace(/\|/g, '\\|');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
