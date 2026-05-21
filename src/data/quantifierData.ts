export interface QuantifierQuestion {
  id: number;
  category: string;
  type: string;
  difficulty: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  trap: string;
}

export const quantifierQuestions: QuantifierQuestion[] = [
  // ===== 量词搭配选择题（10道） =====
  { id: 1, category: "量词搭配", type: "选择题", difficulty: 3, question: "I need to buy _______ of bread for breakfast.", options: ["a bread", "two breads", "a loaf", "a piece"], correct: 2, explanation: "bread是不可数名词，不能直接用a或加-s。用a loaf of bread（一条面包）或a piece of bread（一片面包）。", trap: "不可数名词不能直接用a/an或变复数，必须借助量词。" },
  { id: 2, category: "量词搭配", type: "选择题", difficulty: 3, question: "She gave me _______ of advice about my study.", options: ["an advice", "some advices", "a piece", "many advices"], correct: 2, explanation: "advice是不可数名词，不能加-s，也不能用a/an。固定搭配a piece of advice（一条建议）。", trap: "advice不可数，a piece of advice是唯一正确的量化表达。" },
  { id: 3, category: "量词搭配", type: "选择题", difficulty: 3, question: "I would like _______ of coffee, please.", options: ["a coffee", "a cup", "coffees", "two coffee"], correct: 1, explanation: "coffee不可数，用a cup of coffee（一杯咖啡）。也可以说two cups of coffee。", trap: "coffee不可数，必须用量词cup/glass搭配。" },
  { id: 4, category: "量词搭配", type: "选择题", difficulty: 4, question: "There is _______ of lightning outside. It's going to rain.", options: ["a flash", "a piece", "a pair", "a sheet"], correct: 0, explanation: "lightning（闪电）的固定量词搭配是a flash of lightning（一道闪电）。", trap: "不同自然现象有固定量词搭配，需记忆。" },
  { id: 5, category: "量词搭配", type: "选择题", difficulty: 3, question: "I bought _______ of chocolate at the supermarket.", options: ["a chocolate", "a bar", "chocolates", "a piece"], correct: 1, explanation: "chocolate（巧克力）作为物质名词不可数，用a bar of chocolate（一条巧克力）。", trap: "chocolate不可数，用a bar of。如果指巧克力糖则可数a chocolate。" },
  { id: 6, category: "量词搭配", type: "选择题", difficulty: 4, question: "We saw _______ of birds flying south for the winter.", options: ["a group", "a flock", "a pair", "a set"], correct: 1, explanation: "鸟群的固定搭配是a flock of birds（一群鸟）。flock专用于鸟群和羊群。", trap: "不同动物用不同集合量词：flock(鸟/羊), herd(牛/象), pack(狼), swarm(蜂/蚁), school(鱼)。" },
  { id: 7, category: "量词搭配", type: "选择题", difficulty: 3, question: "I need to get _______ of paper to print this document.", options: ["a paper", "a piece", "papers", "a pair"], correct: 1, explanation: "paper（纸）不可数，用a piece of paper（一张纸）或a sheet of paper。", trap: "paper不可数，a piece of paper。若指报纸/论文则可数a paper。" },
  { id: 8, category: "量词搭配", type: "选择题", difficulty: 4, question: "Please give me _______ of water. I'm very thirsty.", options: ["two water", "two glass", "two glasses", "two cup of"], correct: 2, explanation: "water不可数，量词glass要变复数：two glasses of water（两杯水）。", trap: "不可数名词本身不变复数，但量词（glass/cup/bottle）要变复数。" },
  { id: 9, category: "量词搭配", type: "选择题", difficulty: 4, question: "There was _______ of thunder during the storm last night.", options: ["a clap", "a piece", "a bar", "a set"], correct: 0, explanation: "thunder（雷声）的固定搭配是a clap of thunder（一声雷）。", trap: "自然现象固定搭配：a clap of thunder, a flash of lightning, a gust of wind, a ray of sunshine。" },
  { id: 10, category: "量词搭配", type: "选择题", difficulty: 5, question: "She cut her hair and gave me _______ as a keepsake.", options: ["a hair", "a strand", "hairs", "a piece"], correct: 1, explanation: "strand专指一根头发/线。lock指一束头发。a strand of hair = 一根头发。", trap: "hair（整体，不可数）/ a hair（一根头发，可数）/ a strand of hair（一根头发）。" },

  // ===== 主谓一致选择题（10道） =====
  { id: 11, category: "量词主谓一致", type: "选择题", difficulty: 4, question: "A pair of shoes _______ on the bed. They are new.", options: ["is", "are", "was", "were"], correct: 0, explanation: "a pair of + 复数名词作主语时，谓语动词看pair（单数），所以用is。", trap: "a pair of shoes中心词是pair（单数），不是shoes。" },
  { id: 12, category: "量词主谓一致", type: "选择题", difficulty: 4, question: "Two pairs of trousers _______ in the closet.", options: ["is", "are", "was", "were"], correct: 1, explanation: "two pairs of + 复数名词，pairs是复数，所以谓语用复数are。", trap: "量词pair变复数时，谓语动词也用复数。" },
  { id: 13, category: "量词主谓一致", type: "选择题", difficulty: 4, question: "A number of students _______ absent today.", options: ["is", "are", "was", "were"], correct: 1, explanation: "a number of = 许多，后接复数名词，谓语用复数。区别于the number of（...的数量，用单数）。", trap: "a number of + 复数谓语 / the number of + 单数谓语" },
  { id: 14, category: "量词主谓一致", type: "选择题", difficulty: 4, question: "The number of books in our library _______ 10,000.", options: ["is", "are", "was", "were"], correct: 0, explanation: "the number of = ...的数量，作主语时谓语用单数。", trap: "the number of + 单数谓语。" },
  { id: 15, category: "量词主谓一致", type: "选择题", difficulty: 4, question: "A lot of water _______ wasted every day.", options: ["is", "are", "was", "were"], correct: 0, explanation: "a lot of + 不可数名词，谓语用单数。water是不可数名词。", trap: "a lot of + 不可数名词 → 单数谓语；a lot of + 可数名词 → 复数谓语。" },
  { id: 16, category: "量词主谓一致", type: "选择题", difficulty: 4, question: "A group of children _______ playing in the park.", options: ["is", "are", "was", "were"], correct: 1, explanation: "a group of + 复数名词，强调成员时谓语用复数are。", trap: "a group of 强调成员用复数，强调整体用单数。" },
  { id: 17, category: "量词主谓一致", type: "选择题", difficulty: 5, question: "Half of the apple _______ rotten. We can't eat it.", options: ["is", "are", "was", "were"], correct: 0, explanation: "half of + 不可数名词（apple此处指苹果这种物质），谓语用单数。", trap: "half of + 不可数名词 → 单数；half of + 复数名词 → 复数。" },
  { id: 18, category: "量词主谓一致", type: "选择题", difficulty: 5, question: "Half of the students in our class _______ girls.", options: ["is", "are", "was", "were"], correct: 1, explanation: "half of + 复数名词（students），谓语用复数are。", trap: "half of 后接的名词决定谓语单复数。" },
  { id: 19, category: "量词主谓一致", type: "选择题", difficulty: 4, question: "Some of the money _______ missing. We need to find it.", options: ["is", "are", "was", "were"], correct: 0, explanation: "some of + 不可数名词（money），谓语用单数is。", trap: "some of + 名词的数决定谓语。" },
  { id: 20, category: "量词主谓一致", type: "选择题", difficulty: 5, question: "Three-fourths of the surface of the earth _______ covered with water.", options: ["is", "are", "was", "were"], correct: 0, explanation: "分数+of+名词，谓语由名词决定。surface是不可数名词，用单数is。", trap: "分数/百分数 + of + 名词 → 名词的数决定谓语。" },

  // ===== 集合名词主谓一致（5道） =====
  { id: 21, category: "集合名词", type: "选择题", difficulty: 4, question: "My family _______ a large one. There are six people in it.", options: ["is", "are", "was", "were"], correct: 0, explanation: "family强调整体概念（大家庭），谓语用单数is。", trap: "集合名词强调整体→单数谓语；强调成员→复数谓语。" },
  { id: 22, category: "集合名词", type: "选择题", difficulty: 4, question: "My family _______ watching TV now. Everyone is in the living room.", options: ["is", "are", "was", "were"], correct: 1, explanation: "family强调每个成员都在看电视，谓语用复数are。", trap: "强调成员各自的动作时用复数谓语。" },
  { id: 23, category: "集合名词", type: "选择题", difficulty: 4, question: "The police _______ searching for the missing child.", options: ["is", "are", "was", "were"], correct: 1, explanation: "police是集体名词，总是接复数谓语（类似people）。The police are...", trap: "police/people/cattle等集体名词永远接复数谓语。" },
  { id: 24, category: "集合名词", type: "选择题", difficulty: 5, question: "The team _______ in high spirits after winning the championship.", options: ["is", "are", "was", "were"], correct: 1, explanation: "team强调每个队员都情绪高涨，用复数are。（英式英语）", trap: "英式英语中集合名词可接单/复数，取决于强调整体还是成员。" },
  { id: 25, category: "集合名词", type: "选择题", difficulty: 5, question: "A flock of sheep _______ grazing on the hillside.", options: ["is", "are", "was", "were"], correct: 0, explanation: "a flock of 强调整体羊群，谓语用单数is。", trap: "a flock/herd/pack of 强调整体用单数，强调个体用复数。" },

  // ===== 不可数名词量化填空题（5道） =====
  { id: 26, category: "量词填空", type: "填空题", difficulty: 3, question: "Please give me two _______(glass) of milk.", options: ["glasses"], correct: 0, explanation: "glass（玻璃杯）是可数名词，two后面用复数glasses。不可数名词milk不加-s。", trap: "不可数名词不加-s，但量词（glass）要变复数。" },
  { id: 27, category: "量词填空", type: "填空题", difficulty: 4, question: "I cut the cake into eight _______(piece).", options: ["pieces"], correct: 0, explanation: "piece是可数名词，eight后面用复数pieces。eight pieces of cake = 八块蛋糕。", trap: "piece是可数名词，可以变复数。" },
  { id: 28, category: "量词填空", type: "填空题", difficulty: 3, question: "There are three _______(bottle) of juice on the table.", options: ["bottles"], correct: 0, explanation: "bottle是可数名词，three后面用复数bottles。不可数名词juice不加-s。", trap: "不可数名词不加-s，量词bottle要变复数。" },
  { id: 29, category: "量词填空", type: "填空题", difficulty: 4, question: "She bought a _______(bar) of soap and a _______(tube) of toothpaste.", options: ["bar; tube"], correct: 0, explanation: "a bar of soap（一块肥皂）和a tube of toothpaste（一管牙膏）。bar和tube都是量词。", trap: "不同物品有不同量词搭配，需要记忆。" },
  { id: 30, category: "量词填空", type: "填空题", difficulty: 5, question: "I found a few white _______(hair) on my father's head.", options: ["hairs"], correct: 0, explanation: "hair作整体讲时不可数（My hair is long），但指几根头发时可数，用复数hairs。", trap: "hair（整体，不可数）/ a few hairs（几根，可数）。" },

  // ===== 综合陷阱题（5道） =====
  { id: 31, category: "量词陷阱", type: "选择题", difficulty: 5, question: "_______ of the students in our class _______ girls.", options: ["Two-third; is", "Two-thirds; are", "Two third; are", "Two-thirds; is"], correct: 1, explanation: "分数表达：分子用基数词，分母用序数词，分子>1时分母加-s。Two-thirds of the students = 三分之二的学生。students是复数，谓语用are。", trap: "分数表达规则+主谓一致双重考点。" },
  { id: 32, category: "量词陷阱", type: "选择题", difficulty: 5, question: "There _______ a pen, two books and three pencils on the desk.", options: ["is", "are", "have", "has"], correct: 0, explanation: "there be句型就近原则。最靠近的是a pen（单数），所以用is。", trap: "there be就近原则：看最靠近be动词的主语。" },
  { id: 33, category: "量词陷阱", type: "选择题", difficulty: 5, question: "A pair of glasses _______ on the desk. They are my father's.", options: ["is lying", "are lying", "lies", "lie"], correct: 0, explanation: "a pair of glasses中心词是pair（单数），用is lying。", trap: "glasses是复数形式，但a pair of glasses中心词是pair。" },
  { id: 34, category: "量词陷阱", type: "选择题", difficulty: 5, question: "-Would you like some _______?\n-Yes, please. Just _______.", options: ["tea; a little", "tea; little", "teas; a few", "tea; few"], correct: 0, explanation: "tea不可数，用some tea。a little修饰不可数名词表示'一点'。", trap: "some+不可数名词 / a little+不可数名词 / a few+可数名词。" },
  { id: 35, category: "量词陷阱", type: "选择题", difficulty: 5, question: "_______ of the land in that district _______ covered with trees and grass.", options: ["Two fifth; is", "Two fifths; is", "Two fifth; are", "Two fifths; are"], correct: 1, explanation: "分数表达：two fifths（五分之二）。land是不可数名词，谓语用单数is。", trap: "分数表达（分子>1分母加s）+ 不可数名词接单数谓语。" },
];

export const quantifierKnowledge = {
  title: "量词与集合名词系统",
  sections: [
    {
      title: "量词的八大分类",
      items: [
        "不定量词：some/any/no/every/each/all/both — 表示不特定的数量",
        "个体量词：a/an/one/each/every — 表示个体计数",
        "集合量词：a group of/a pair of/a team of — 表示成组成对",
        "容器量词：a bottle of/a cup of/a glass of — 用容器计量",
        "度量量词：a kilo of/a meter of/a ton of — 用度量衡计量",
        "部分量词：a piece of/a slice of/a loaf of — 表示部分整体",
        "形状量词：a bar of/a block of/a roll of — 用形状描述",
        "满溢量词：a lot of/plenty of/lots of — 表示大量",
      ],
    },
    {
      title: "不可数名词专用量词搭配",
      items: [
        "抽象类：a piece of advice/news/information/paper/furniture",
        "食物类：a slice of bread/meat/cake | a loaf of bread | a bar of chocolate/soap",
        "液体类：a bottle of water/milk/juice | a cup/glass of tea/coffee",
        "颗粒类：a grain of rice/sand/salt | a drop of water/blood/oil",
        "自然现象：a flash of lightning | a clap of thunder | a gust of wind | a ray of sunshine",
        "纸张类：a piece/sheet of paper | a roll of paper/film",
        "群体类：a flock of birds/sheep | a herd of cattle/elephants | a school of fish | a swarm of bees",
        "成对类：a pair of shoes/trousers/scissors/glasses/gloves",
        "束/捆类：a bunch of flowers/keys/grapes | a bundle of sticks/clothes",
      ],
    },
    {
      title: "量词与主谓一致规则",
      items: [
        "a number of + 复数名词 → 复数谓语（许多）",
        "the number of + 复数名词 → 单数谓语（...的数量）",
        "a pair of + 复数名词 → 单数谓语（一双）",
        "two pairs of + 复数名词 → 复数谓语（两双）",
        "a lot of/lots of/plenty of + 复数 → 复数谓语",
        "a lot of/lots of/plenty of + 不可数 → 单数谓语",
        "分数/百分数 + of + 名词 → 由名词决定谓语",
        "half of + 复数名词 → 复数谓语 | half of + 不可数 → 单数谓语",
        "some of/most of/all of + 名词 → 由名词的数决定谓语",
      ],
    },
    {
      title: "集合名词主谓一致",
      items: [
        "强调整体 → 单数谓语：The family is large. The team has won.",
        "强调成员 → 复数谓语：My family are watching TV. The team are discussing.",
        "永远复数的集合名词：police/people/cattle（The police are...）",
        "美式英语：集合名词通常接单数谓语",
        "英式英语：集合名词可接单/复数谓语（视语境）",
      ],
    },
  ],
  traps: [
    "不可数名词不能直接用a/an或变复数，必须借助量词！",
    "a pair of shoes 接单数谓语，但 two pairs of shoes 接复数谓语！",
    "the number of + 单数谓语 vs a number of + 复数谓语",
    "不可数名词不加-s，但量词（glass/bottle/cup）要变复数！",
    "hair整体不可数，但指几根时可数（a few white hairs）",
    "fruit总称不可数，fruits指多种水果时可数",
    "works（著作/工厂）可数，work（工作）不可数",
    "fish条数单复同形，fishes指鱼的种类",
  ],
  rhymes: [
    "量词搭配有规律，不可数词不能直接用数字",
    "a piece of万能配，news advice paper都能接",
    "a pair of一双对，shoes trousers scissors scissors",
    "a number of许多个，the number of数量值",
    "集合名词看整体，整体单数成员复",
    "police people cattle永远复数不犹豫",
  ],
};

export const collectiveNouns = [
  { noun: "family", meaning: "家庭", verbType: "均可", exampleS: "My family is large.", exampleP: "My family are watching TV." },
  { noun: "team", meaning: "队伍", verbType: "均可", exampleS: "The team has won.", exampleP: "The team are arguing." },
  { noun: "class", meaning: "班级", verbType: "均可", exampleS: "Class 4 is on the third floor.", exampleP: "Class 4 are unable to agree." },
  { noun: "group", meaning: "组", verbType: "均可", exampleS: "The group is small.", exampleP: "The group are discussing." },
  { noun: "committee", meaning: "委员会", verbType: "均可", exampleS: "The committee has decided.", exampleP: "The committee are divided." },
  { noun: "government", meaning: "政府", verbType: "均可", exampleS: "The government has fallen.", exampleP: "The government are discussing." },
  { noun: "staff", meaning: "员工", verbType: "均可", exampleS: "The staff is small.", exampleP: "The staff have different opinions." },
  { noun: "crew", meaning: "船员/机组", verbType: "均可", exampleS: "The crew was large.", exampleP: "The crew are working." },
  { noun: "audience", meaning: "观众", verbType: "均可", exampleS: "The audience was large.", exampleP: "The audience were clapping." },
  { noun: "police", meaning: "警察", verbType: "永远复数", exampleS: "—", exampleP: "The police are searching." },
  { noun: "people", meaning: "人们", verbType: "永远复数", exampleS: "—", exampleP: "People are talking." },
  { noun: "cattle", meaning: "牛群", verbType: "永远复数", exampleS: "—", exampleP: "The cattle are eating grass." },
  { noun: "flock", meaning: "羊群/鸟群", verbType: "整体单数", exampleS: "A flock is flying.", exampleP: "The flock are scattered." },
  { noun: "herd", meaning: "牛群/象群", verbType: "整体单数", exampleS: "A herd is grazing.", exampleP: "—" },
  { noun: "pack", meaning: "狼群", verbType: "整体单数", exampleS: "A pack is hunting.", exampleP: "—" },
  { noun: "swarm", meaning: "蜂群/蚁群", verbType: "整体单数", exampleS: "A swarm is buzzing.", exampleP: "—" },
  { noun: "school", meaning: "鱼群", verbType: "整体单数", exampleS: "A school is swimming.", exampleP: "—" },
];
