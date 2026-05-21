// 完整词汇日历数据 - 三年级上~九年级全
// 覆盖PEP小学 + 人教版初中课标词汇

export interface CalendarWord {
  word: string;
  phonetic: string;
  syllables: string;
  syllableColors: string[];
  pos: string;
  meanings: string[];
  phrases: string[];
  example: string;
  memoryTip: string;
}

export interface CalendarDay {
  day: number;
  date: string;
  unit: string;
  words: CalendarWord[];
}

export interface SemesterPlan {
  key: string;
  name: string;
  grade: string;
  term: string;
  startMonth: number;
  days: CalendarDay[];
}


// ===== 三年级上册 =====
const sem_3a_data = {
  "key": "3a",
  "name": "三年级上册",
  "grade": "三年级",
  "term": "上册",
  "startMonth": 9,
  "days": [
    {
      "day": 1,
      "date": "9月1日",
      "unit": "U1",
      "words": [
        {
          "word": "hello",
          "phonetic": "/həˈləʊ/",
          "syllables": "hel·lo",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "你好"
          ],
          "phrases": [
            "say hello 问好"
          ],
          "example": "Hello! I'm Miss White.",
          "memoryTip": "hel-lo像哈啰"
        },
        {
          "word": "hi",
          "phonetic": "/haɪ/",
          "syllables": "hi",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "嗨"
          ],
          "phrases": [],
          "example": "Hi! I'm Sarah.",
          "memoryTip": "hi发音像嗨"
        },
        {
          "word": "I",
          "phonetic": "/aɪ/",
          "syllables": "I",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "我"
          ],
          "phrases": [],
          "example": "I have a ruler.",
          "memoryTip": "I就是我"
        },
        {
          "word": "am",
          "phonetic": "/æm/",
          "syllables": "am",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "是"
          ],
          "phrases": [
            "I am = I'm"
          ],
          "example": "I am a student.",
          "memoryTip": "am是be动词"
        },
        {
          "word": "name",
          "phonetic": "/neɪm/",
          "syllables": "name",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "名字"
          ],
          "phrases": [
            "first name 名"
          ],
          "example": "My name is John.",
          "memoryTip": "name名字"
        },
        {
          "word": "goodbye",
          "phonetic": "/ˌɡʊdˈbaɪ/",
          "syllables": "good·bye",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "再见"
          ],
          "phrases": [
            "say goodbye 道别"
          ],
          "example": "Goodbye, Miss White!",
          "memoryTip": "good+bye再见"
        }
      ]
    },
    {
      "day": 2,
      "date": "9月2日",
      "unit": "U1",
      "words": [
        {
          "word": "Miss",
          "phonetic": "/mɪs/",
          "syllables": "Miss",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "小姐"
          ],
          "phrases": [],
          "example": "Hello, Miss Green!",
          "memoryTip": "Miss小姐"
        },
        {
          "word": "Mr",
          "phonetic": "/ˈmɪstə/",
          "syllables": "Mr",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "先生"
          ],
          "phrases": [],
          "example": "Good morning, Mr Jones!",
          "memoryTip": "Mr先生"
        },
        {
          "word": "boy",
          "phonetic": "/bɔɪ/",
          "syllables": "boy",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "男孩"
          ],
          "phrases": [
            "a boy 一个男孩"
          ],
          "example": "He is a good boy.",
          "memoryTip": "boy男孩"
        },
        {
          "word": "girl",
          "phonetic": "/ɡɜːl/",
          "syllables": "girl",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "女孩"
          ],
          "phrases": [
            "a girl 一个女孩"
          ],
          "example": "She is a tall girl.",
          "memoryTip": "girl女孩"
        },
        {
          "word": "meet",
          "phonetic": "/miːt/",
          "syllables": "meet",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "遇见"
          ],
          "phrases": [
            "meet you 见到你"
          ],
          "example": "Nice to meet you!",
          "memoryTip": "meet遇见"
        },
        {
          "word": "too",
          "phonetic": "/tuː/",
          "syllables": "too",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "也"
          ],
          "phrases": [
            "too + adj. 太..."
          ],
          "example": "Nice to meet you, too!",
          "memoryTip": "too也"
        }
      ]
    },
    {
      "day": 3,
      "date": "9月3日",
      "unit": "U2",
      "words": [
        {
          "word": "red",
          "phonetic": "/red/",
          "syllables": "red",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "红色的"
          ],
          "phrases": [
            "in red 穿红色"
          ],
          "example": "I like red apples.",
          "memoryTip": "red红色"
        },
        {
          "word": "green",
          "phonetic": "/ɡriːn/",
          "syllables": "green",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "绿色的"
          ],
          "phrases": [
            "go green 环保"
          ],
          "example": "The grass is green.",
          "memoryTip": "green绿色"
        },
        {
          "word": "yellow",
          "phonetic": "/ˈjeləʊ/",
          "syllables": "yel·low",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "黄色的"
          ],
          "phrases": [],
          "example": "The banana is yellow.",
          "memoryTip": "yel-low黄色"
        },
        {
          "word": "blue",
          "phonetic": "/bluː/",
          "syllables": "blue",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "蓝色的"
          ],
          "phrases": [
            "feel blue 忧郁"
          ],
          "example": "The sky is blue.",
          "memoryTip": "blue蓝色"
        },
        {
          "word": "black",
          "phonetic": "/blæk/",
          "syllables": "black",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "黑色的"
          ],
          "phrases": [
            "blackboard 黑板"
          ],
          "example": "The cat is black.",
          "memoryTip": "black黑色"
        },
        {
          "word": "white",
          "phonetic": "/waɪt/",
          "syllables": "white",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "白色的"
          ],
          "phrases": [
            "white paper 白纸"
          ],
          "example": "The snow is white.",
          "memoryTip": "white白色"
        }
      ]
    },
    {
      "day": 4,
      "date": "9月4日",
      "unit": "U2",
      "words": [
        {
          "word": "orange",
          "phonetic": "/ˈɒrɪndʒ/",
          "syllables": "o·range",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "橙色的"
          ],
          "phrases": [
            "orange juice 橙汁"
          ],
          "example": "I like orange juice.",
          "memoryTip": "orange橙子"
        },
        {
          "word": "brown",
          "phonetic": "/braʊn/",
          "syllables": "brown",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "棕色的"
          ],
          "phrases": [],
          "example": "The bear is brown.",
          "memoryTip": "brown棕色"
        },
        {
          "word": "colour",
          "phonetic": "/ˈkʌlə/",
          "syllables": "co·lour",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "颜色"
          ],
          "phrases": [
            "what colour 什么颜色"
          ],
          "example": "What colour is it?",
          "memoryTip": "co-lour颜色"
        },
        {
          "word": "OK",
          "phonetic": "/əʊˈkeɪ/",
          "syllables": "O·K",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "好的"
          ],
          "phrases": [],
          "example": "OK! Let us go.",
          "memoryTip": "OK好的"
        },
        {
          "word": "now",
          "phonetic": "/naʊ/",
          "syllables": "now",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "现在"
          ],
          "phrases": [
            "right now 现在"
          ],
          "example": "What colour is it now?",
          "memoryTip": "now现在"
        },
        {
          "word": "see",
          "phonetic": "/siː/",
          "syllables": "see",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "看见"
          ],
          "phrases": [
            "see you 再见"
          ],
          "example": "I can see red.",
          "memoryTip": "see看见"
        }
      ]
    },
    {
      "day": 5,
      "date": "9月5日",
      "unit": "U3",
      "words": [
        {
          "word": "face",
          "phonetic": "/feɪs/",
          "syllables": "face",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "脸"
          ],
          "phrases": [
            "face to face 面对面"
          ],
          "example": "Wash your face.",
          "memoryTip": "face脸"
        },
        {
          "word": "ear",
          "phonetic": "/ɪə/",
          "syllables": "ear",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "耳朵"
          ],
          "phrases": [],
          "example": "Touch your ear.",
          "memoryTip": "ear耳朵"
        },
        {
          "word": "eye",
          "phonetic": "/aɪ/",
          "syllables": "eye",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "眼睛"
          ],
          "phrases": [
            "an eye 一只眼睛"
          ],
          "example": "Open your eyes.",
          "memoryTip": "eye两个e就是眼睛"
        },
        {
          "word": "nose",
          "phonetic": "/nəʊz/",
          "syllables": "nose",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "鼻子"
          ],
          "phrases": [
            "blow nose 擤鼻涕"
          ],
          "example": "Touch your nose.",
          "memoryTip": "nose鼻子"
        },
        {
          "word": "mouth",
          "phonetic": "/maʊθ/",
          "syllables": "mouth",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "嘴"
          ],
          "phrases": [],
          "example": "Open your mouth.",
          "memoryTip": "mouth嘴"
        },
        {
          "word": "arm",
          "phonetic": "/ɑːm/",
          "syllables": "arm",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "胳膊"
          ],
          "phrases": [
            "arm in arm 臂挽臂"
          ],
          "example": "Raise your arm.",
          "memoryTip": "arm胳膊"
        }
      ]
    },
    {
      "day": 6,
      "date": "9月6日",
      "unit": "U3",
      "words": [
        {
          "word": "hand",
          "phonetic": "/hænd/",
          "syllables": "hand",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "手"
          ],
          "phrases": [
            "hand in hand 手拉手"
          ],
          "example": "Wash your hands.",
          "memoryTip": "hand手"
        },
        {
          "word": "head",
          "phonetic": "/hed/",
          "syllables": "head",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "头"
          ],
          "phrases": [
            "head teacher 校长"
          ],
          "example": "Shake your head.",
          "memoryTip": "head头"
        },
        {
          "word": "body",
          "phonetic": "/ˈbɒdi/",
          "syllables": "bo·dy",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "身体"
          ],
          "phrases": [
            "body language 肢体语言"
          ],
          "example": "Move your body.",
          "memoryTip": "bo-dy身体"
        },
        {
          "word": "leg",
          "phonetic": "/leɡ/",
          "syllables": "leg",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "腿"
          ],
          "phrases": [],
          "example": "This is my leg.",
          "memoryTip": "leg腿"
        },
        {
          "word": "foot",
          "phonetic": "/fʊt/",
          "syllables": "foot",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "脚"
          ],
          "phrases": [
            "on foot 步行"
          ],
          "example": "Stamp your foot.",
          "memoryTip": "foot脚"
        },
        {
          "word": "school",
          "phonetic": "/skuːl/",
          "syllables": "school",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "学校"
          ],
          "phrases": [
            "at school 在学校"
          ],
          "example": "Let us go to school.",
          "memoryTip": "school学校"
        }
      ]
    },
    {
      "day": 7,
      "date": "9月7日",
      "unit": "U4",
      "words": [
        {
          "word": "cat",
          "phonetic": "/kæt/",
          "syllables": "cat",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "猫"
          ],
          "phrases": [
            "a cat 一只猫"
          ],
          "example": "I have a cat.",
          "memoryTip": "cat猫"
        },
        {
          "word": "dog",
          "phonetic": "/dɒɡ/",
          "syllables": "dog",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "狗"
          ],
          "phrases": [
            "a hot dog 热狗"
          ],
          "example": "The dog is cute.",
          "memoryTip": "dog狗"
        },
        {
          "word": "bird",
          "phonetic": "/bɜːd/",
          "syllables": "bird",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "鸟"
          ],
          "phrases": [
            "a bird 一只鸟"
          ],
          "example": "A bird can fly.",
          "memoryTip": "bird鸟"
        },
        {
          "word": "duck",
          "phonetic": "/dʌk/",
          "syllables": "duck",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "鸭子"
          ],
          "phrases": [],
          "example": "The duck can swim.",
          "memoryTip": "duck鸭子"
        },
        {
          "word": "pig",
          "phonetic": "/pɪɡ/",
          "syllables": "pig",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "猪"
          ],
          "phrases": [],
          "example": "The pig is fat.",
          "memoryTip": "pig猪"
        },
        {
          "word": "bear",
          "phonetic": "/beə/",
          "syllables": "bear",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "熊"
          ],
          "phrases": [],
          "example": "The bear is big.",
          "memoryTip": "bear熊"
        }
      ]
    },
    {
      "day": 8,
      "date": "9月8日",
      "unit": "U4",
      "words": [
        {
          "word": "elephant",
          "phonetic": "/ˈelɪfənt/",
          "syllables": "e·le·phant",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "大象"
          ],
          "phrases": [
            "an elephant 一头大象"
          ],
          "example": "The elephant is big.",
          "memoryTip": "e-le-phant大象"
        },
        {
          "word": "monkey",
          "phonetic": "/ˈmʌŋki/",
          "syllables": "mon·key",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "猴子"
          ],
          "phrases": [],
          "example": "The monkey is funny.",
          "memoryTip": "mon-key猴子"
        },
        {
          "word": "tiger",
          "phonetic": "/ˈtaɪɡə/",
          "syllables": "ti·ger",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "老虎"
          ],
          "phrases": [],
          "example": "The tiger is strong.",
          "memoryTip": "ti-ger老虎"
        },
        {
          "word": "panda",
          "phonetic": "/ˈpændə/",
          "syllables": "pan·da",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "熊猫"
          ],
          "phrases": [],
          "example": "I like the panda.",
          "memoryTip": "pan-da熊猫"
        },
        {
          "word": "zoo",
          "phonetic": "/zuː/",
          "syllables": "zoo",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "动物园"
          ],
          "phrases": [
            "at the zoo 在动物园"
          ],
          "example": "Let us go to the zoo.",
          "memoryTip": "zoo动物园"
        },
        {
          "word": "funny",
          "phonetic": "/ˈfʌni/",
          "syllables": "fun·ny",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "滑稽的"
          ],
          "phrases": [],
          "example": "The monkey is funny.",
          "memoryTip": "fun+ny有趣的"
        }
      ]
    },
    {
      "day": 9,
      "date": "9月9日",
      "unit": "U5",
      "words": [
        {
          "word": "rice",
          "phonetic": "/raɪs/",
          "syllables": "rice",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "米饭"
          ],
          "phrases": [
            "cook rice 煮饭"
          ],
          "example": "I would like some rice.",
          "memoryTip": "rice米饭"
        },
        {
          "word": "bread",
          "phonetic": "/bred/",
          "syllables": "bread",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "面包"
          ],
          "phrases": [
            "a piece of bread 一片面包"
          ],
          "example": "Have some bread.",
          "memoryTip": "bread面包"
        },
        {
          "word": "juice",
          "phonetic": "/dʒuːs/",
          "syllables": "juice",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "果汁"
          ],
          "phrases": [
            "orange juice 橙汁"
          ],
          "example": "I would like some juice.",
          "memoryTip": "juice果汁"
        },
        {
          "word": "milk",
          "phonetic": "/mɪlk/",
          "syllables": "milk",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "牛奶"
          ],
          "phrases": [
            "a glass of milk 一杯牛奶"
          ],
          "example": "Drink some milk.",
          "memoryTip": "milk牛奶"
        },
        {
          "word": "water",
          "phonetic": "/ˈwɔːtə/",
          "syllables": "wa·ter",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "水"
          ],
          "phrases": [
            "drink water 喝水"
          ],
          "example": "I would like some water.",
          "memoryTip": "wa-ter水"
        },
        {
          "word": "egg",
          "phonetic": "/eɡ/",
          "syllables": "egg",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "鸡蛋"
          ],
          "phrases": [
            "an egg 一个鸡蛋"
          ],
          "example": "Have an egg.",
          "memoryTip": "egg鸡蛋"
        }
      ]
    },
    {
      "day": 10,
      "date": "9月10日",
      "unit": "U5",
      "words": [
        {
          "word": "cake",
          "phonetic": "/keɪk/",
          "syllables": "cake",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "蛋糕"
          ],
          "phrases": [
            "a birthday cake 生日蛋糕"
          ],
          "example": "I would like some cake.",
          "memoryTip": "cake蛋糕"
        },
        {
          "word": "fish",
          "phonetic": "/fɪʃ/",
          "syllables": "fish",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "鱼"
          ],
          "phrases": [
            "catch fish 钓鱼"
          ],
          "example": "I like fish.",
          "memoryTip": "fish鱼"
        },
        {
          "word": "eat",
          "phonetic": "/iːt/",
          "syllables": "eat",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "吃"
          ],
          "phrases": [
            "eat breakfast 吃早餐"
          ],
          "example": "Let us eat!",
          "memoryTip": "eat吃"
        },
        {
          "word": "drink",
          "phonetic": "/drɪŋk/",
          "syllables": "drink",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "喝"
          ],
          "phrases": [
            "have a drink 喝一杯"
          ],
          "example": "Drink some water.",
          "memoryTip": "drink喝"
        },
        {
          "word": "hungry",
          "phonetic": "/ˈhʌŋɡri/",
          "syllables": "hun·gry",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "饥饿的"
          ],
          "phrases": [],
          "example": "I am hungry.",
          "memoryTip": "hun-gry饥饿的"
        },
        {
          "word": "please",
          "phonetic": "/pliːz/",
          "syllables": "please",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "请"
          ],
          "phrases": [],
          "example": "Have some rice, please.",
          "memoryTip": "please请"
        }
      ]
    },
    {
      "day": 11,
      "date": "9月11日",
      "unit": "U6",
      "words": [
        {
          "word": "one",
          "phonetic": "/wʌn/",
          "syllables": "one",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "一"
          ],
          "phrases": [],
          "example": "I have one pen.",
          "memoryTip": "one一"
        },
        {
          "word": "two",
          "phonetic": "/tuː/",
          "syllables": "two",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "二"
          ],
          "phrases": [],
          "example": "I have two books.",
          "memoryTip": "two二"
        },
        {
          "word": "three",
          "phonetic": "/θriː/",
          "syllables": "three",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "三"
          ],
          "phrases": [],
          "example": "I am three years old.",
          "memoryTip": "three三"
        },
        {
          "word": "four",
          "phonetic": "/fɔː/",
          "syllables": "four",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "四"
          ],
          "phrases": [],
          "example": "I have four pencils.",
          "memoryTip": "four四"
        },
        {
          "word": "five",
          "phonetic": "/faɪv/",
          "syllables": "five",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "五"
          ],
          "phrases": [],
          "example": "I have five fingers.",
          "memoryTip": "five五"
        },
        {
          "word": "six",
          "phonetic": "/sɪks/",
          "syllables": "six",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "六"
          ],
          "phrases": [],
          "example": "I am six years old.",
          "memoryTip": "six六"
        }
      ]
    },
    {
      "day": 12,
      "date": "9月12日",
      "unit": "U6",
      "words": [
        {
          "word": "seven",
          "phonetic": "/ˈsevən/",
          "syllables": "se·ven",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "七"
          ],
          "phrases": [],
          "example": "There are seven days.",
          "memoryTip": "se-ven七"
        },
        {
          "word": "eight",
          "phonetic": "/eɪt/",
          "syllables": "eight",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "八"
          ],
          "phrases": [],
          "example": "I have eight apples.",
          "memoryTip": "eight八"
        },
        {
          "word": "nine",
          "phonetic": "/naɪn/",
          "syllables": "nine",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "九"
          ],
          "phrases": [],
          "example": "Nine students are here.",
          "memoryTip": "nine九"
        },
        {
          "word": "ten",
          "phonetic": "/ten/",
          "syllables": "ten",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十"
          ],
          "phrases": [],
          "example": "I have ten fingers.",
          "memoryTip": "ten十"
        },
        {
          "word": "old",
          "phonetic": "/əʊld/",
          "syllables": "old",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "老的"
          ],
          "phrases": [
            "how old 多大"
          ],
          "example": "I am six years old.",
          "memoryTip": "old老的"
        },
        {
          "word": "happy",
          "phonetic": "/ˈhæpi/",
          "syllables": "ha·ppy",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "高兴的"
          ],
          "phrases": [
            "be happy 开心"
          ],
          "example": "Happy birthday!",
          "memoryTip": "ha+ppy快乐"
        }
      ]
    }
  ]
};
export const semester_3a = sem_3a_data as SemesterPlan;

// ===== 三年级下册 =====
const sem_3b_data = {
  "key": "3b",
  "name": "三年级下册",
  "grade": "三年级",
  "term": "下册",
  "startMonth": 3,
  "days": [
    {
      "day": 1,
      "date": "3月1日",
      "unit": "U1",
      "words": [
        {
          "word": "UK",
          "phonetic": "/ˌjuːˈkeɪ/",
          "syllables": "U·K",
          "syllableColors": [],
          "pos": "abbr.",
          "meanings": [
            "英国"
          ],
          "phrases": [
            "the UK 英国"
          ],
          "example": "I am from the UK.",
          "memoryTip": "UK英国"
        },
        {
          "word": "USA",
          "phonetic": "/ˌjuːesˈeɪ/",
          "syllables": "U·S·A",
          "syllableColors": [],
          "pos": "abbr.",
          "meanings": [
            "美国"
          ],
          "phrases": [
            "the USA 美国"
          ],
          "example": "I am from the USA.",
          "memoryTip": "USA美国"
        },
        {
          "word": "Canada",
          "phonetic": "/ˈkænədə/",
          "syllables": "Ca·na·da",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "加拿大"
          ],
          "phrases": [],
          "example": "She is from Canada.",
          "memoryTip": "Ca-na-da加拿大"
        },
        {
          "word": "China",
          "phonetic": "/ˈtʃaɪnə/",
          "syllables": "Chi·na",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "中国"
          ],
          "phrases": [
            "in China 在中国"
          ],
          "example": "I am from China.",
          "memoryTip": "Chi-na中国"
        },
        {
          "word": "from",
          "phonetic": "/frɒm/",
          "syllables": "from",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "从"
          ],
          "phrases": [
            "be from 来自"
          ],
          "example": "Where are you from?",
          "memoryTip": "from来自"
        },
        {
          "word": "about",
          "phonetic": "/əˈbaʊt/",
          "syllables": "a·bout",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "关于"
          ],
          "phrases": [
            "What about...? ...怎么样？"
          ],
          "example": "Tell me about China.",
          "memoryTip": "a-bout关于"
        }
      ]
    },
    {
      "day": 2,
      "date": "3月2日",
      "unit": "U1",
      "words": [
        {
          "word": "today",
          "phonetic": "/təˈdeɪ/",
          "syllables": "to·day",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "今天"
          ],
          "phrases": [
            "today 今天"
          ],
          "example": "Today is Monday.",
          "memoryTip": "to+day今天"
        },
        {
          "word": "teacher",
          "phonetic": "/ˈtiːtʃə/",
          "syllables": "tea·cher",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "老师"
          ],
          "phrases": [
            "head teacher 校长"
          ],
          "example": "He is a teacher.",
          "memoryTip": "tea+cher老师"
        },
        {
          "word": "student",
          "phonetic": "/ˈstjuːdənt/",
          "syllables": "stu·dent",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "学生"
          ],
          "phrases": [],
          "example": "I am a student.",
          "memoryTip": "stu-dent学生"
        },
        {
          "word": "pupil",
          "phonetic": "/ˈpjuːpl/",
          "syllables": "pu·pil",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "小学生"
          ],
          "phrases": [],
          "example": "I am a pupil.",
          "memoryTip": "pu-pil小学生"
        },
        {
          "word": "she",
          "phonetic": "/ʃiː/",
          "syllables": "she",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "她"
          ],
          "phrases": [],
          "example": "She is a girl.",
          "memoryTip": "she她"
        },
        {
          "word": "he",
          "phonetic": "/hiː/",
          "syllables": "he",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "他"
          ],
          "phrases": [],
          "example": "He is a boy.",
          "memoryTip": "he他"
        }
      ]
    },
    {
      "day": 3,
      "date": "3月3日",
      "unit": "U2",
      "words": [
        {
          "word": "father",
          "phonetic": "/ˈfɑːðə/",
          "syllables": "fa·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "父亲"
          ],
          "phrases": [
            "Father Day 父亲节"
          ],
          "example": "This is my father.",
          "memoryTip": "fa-ther父亲"
        },
        {
          "word": "mother",
          "phonetic": "/ˈmʌðə/",
          "syllables": "mo·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "母亲"
          ],
          "phrases": [
            "Mother Day 母亲节"
          ],
          "example": "I love my mother.",
          "memoryTip": "mo-ther母亲"
        },
        {
          "word": "brother",
          "phonetic": "/ˈbrʌðə/",
          "syllables": "bro·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "兄弟"
          ],
          "phrases": [
            "big brother 哥哥"
          ],
          "example": "He is my brother.",
          "memoryTip": "bro-ther兄弟"
        },
        {
          "word": "sister",
          "phonetic": "/ˈsɪstə/",
          "syllables": "sis·ter",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "姐妹"
          ],
          "phrases": [
            "little sister 妹妹"
          ],
          "example": "She is my sister.",
          "memoryTip": "sis-ter姐妹"
        },
        {
          "word": "grandfather",
          "phonetic": "/ˈɡrændfɑːðə/",
          "syllables": "grand·fa·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "祖父"
          ],
          "phrases": [],
          "example": "This is my grandfather.",
          "memoryTip": "grand+father祖父"
        },
        {
          "word": "grandmother",
          "phonetic": "/ˈɡrænmʌðə/",
          "syllables": "grand·mo·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "祖母"
          ],
          "phrases": [],
          "example": "She is my grandmother.",
          "memoryTip": "grand+mother祖母"
        }
      ]
    },
    {
      "day": 4,
      "date": "3月4日",
      "unit": "U2",
      "words": [
        {
          "word": "man",
          "phonetic": "/mæn/",
          "syllables": "man",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "男人"
          ],
          "phrases": [],
          "example": "That man is my father.",
          "memoryTip": "man男人"
        },
        {
          "word": "woman",
          "phonetic": "/ˈwʊmən/",
          "syllables": "wo·man",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "女人"
          ],
          "phrases": [],
          "example": "That woman is my mother.",
          "memoryTip": "wo-man女人"
        },
        {
          "word": "is",
          "phonetic": "/ɪz/",
          "syllables": "is",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "是"
          ],
          "phrases": [],
          "example": "She is a teacher.",
          "memoryTip": "is是"
        },
        {
          "word": "this",
          "phonetic": "/ðɪs/",
          "syllables": "this",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "这"
          ],
          "phrases": [],
          "example": "This is my family.",
          "memoryTip": "this这"
        },
        {
          "word": "that",
          "phonetic": "/ðæt/",
          "syllables": "that",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "那"
          ],
          "phrases": [],
          "example": "That is my father.",
          "memoryTip": "that那"
        },
        {
          "word": "who",
          "phonetic": "/huː/",
          "syllables": "who",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "谁"
          ],
          "phrases": [],
          "example": "Who is that man?",
          "memoryTip": "who谁"
        }
      ]
    },
    {
      "day": 5,
      "date": "3月5日",
      "unit": "U3",
      "words": [
        {
          "word": "thin",
          "phonetic": "/θɪn/",
          "syllables": "thin",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "瘦的"
          ],
          "phrases": [],
          "example": "The monkey is thin.",
          "memoryTip": "thin瘦的"
        },
        {
          "word": "fat",
          "phonetic": "/fæt/",
          "syllables": "fat",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "胖的"
          ],
          "phrases": [],
          "example": "The pig is fat.",
          "memoryTip": "fat胖的"
        },
        {
          "word": "tall",
          "phonetic": "/tɔːl/",
          "syllables": "tall",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "高的"
          ],
          "phrases": [],
          "example": "The giraffe is tall.",
          "memoryTip": "tall高的"
        },
        {
          "word": "short",
          "phonetic": "/ʃɔːt/",
          "syllables": "short",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "矮的"
          ],
          "phrases": [],
          "example": "The penguin is short.",
          "memoryTip": "short矮的"
        },
        {
          "word": "long",
          "phonetic": "/lɒŋ/",
          "syllables": "long",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "长的"
          ],
          "phrases": [],
          "example": "The snake is long.",
          "memoryTip": "long长的"
        },
        {
          "word": "small",
          "phonetic": "/smɔːl/",
          "syllables": "small",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "小的"
          ],
          "phrases": [],
          "example": "The ant is small.",
          "memoryTip": "small小的"
        }
      ]
    },
    {
      "day": 6,
      "date": "3月6日",
      "unit": "U3",
      "words": [
        {
          "word": "big",
          "phonetic": "/bɪɡ/",
          "syllables": "big",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "大的"
          ],
          "phrases": [],
          "example": "The elephant is big.",
          "memoryTip": "big大的"
        },
        {
          "word": "giraffe",
          "phonetic": "/dʒɪˈrɑːf/",
          "syllables": "gi·raffe",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "长颈鹿"
          ],
          "phrases": [],
          "example": "The giraffe is so tall.",
          "memoryTip": "gi-raffe长颈鹿"
        },
        {
          "word": "so",
          "phonetic": "/səʊ/",
          "syllables": "so",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "这么"
          ],
          "phrases": [],
          "example": "It is so tall!",
          "memoryTip": "so这么"
        },
        {
          "word": "children",
          "phonetic": "/ˈtʃɪldrən/",
          "syllables": "chil·dren",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "孩子们"
          ],
          "phrases": [],
          "example": "The children are happy.",
          "memoryTip": "chil-dren孩子们"
        },
        {
          "word": "tail",
          "phonetic": "/teɪl/",
          "syllables": "tail",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "尾巴"
          ],
          "phrases": [],
          "example": "The monkey has a long tail.",
          "memoryTip": "tail尾巴"
        },
        {
          "word": "has",
          "phonetic": "/hæz/",
          "syllables": "has",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "有"
          ],
          "phrases": [],
          "example": "It has a long nose.",
          "memoryTip": "has有"
        }
      ]
    },
    {
      "day": 7,
      "date": "3月7日",
      "unit": "U4",
      "words": [
        {
          "word": "on",
          "phonetic": "/ɒn/",
          "syllables": "on",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "在...上"
          ],
          "phrases": [
            "on the table 在桌上"
          ],
          "example": "The book is on the desk.",
          "memoryTip": "on在...上"
        },
        {
          "word": "in",
          "phonetic": "/ɪn/",
          "syllables": "in",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "在...里"
          ],
          "phrases": [
            "in the room 在房间里"
          ],
          "example": "The pen is in the box.",
          "memoryTip": "in在...里"
        },
        {
          "word": "under",
          "phonetic": "/ˈʌndə/",
          "syllables": "un·der",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "在...下面"
          ],
          "phrases": [],
          "example": "The ball is under the chair.",
          "memoryTip": "un-der在...下"
        },
        {
          "word": "desk",
          "phonetic": "/desk/",
          "syllables": "desk",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "书桌"
          ],
          "phrases": [],
          "example": "The book is on the desk.",
          "memoryTip": "desk书桌"
        },
        {
          "word": "chair",
          "phonetic": "/tʃeə/",
          "syllables": "chair",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "椅子"
          ],
          "phrases": [],
          "example": "Sit on the chair.",
          "memoryTip": "chair椅子"
        },
        {
          "word": "cap",
          "phonetic": "/kæp/",
          "syllables": "cap",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "帽子"
          ],
          "phrases": [],
          "example": "Put on your cap.",
          "memoryTip": "cap帽子"
        }
      ]
    },
    {
      "day": 8,
      "date": "3月8日",
      "unit": "U4",
      "words": [
        {
          "word": "ball",
          "phonetic": "/bɔːl/",
          "syllables": "ball",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "球"
          ],
          "phrases": [],
          "example": "Where is my ball?",
          "memoryTip": "ball球"
        },
        {
          "word": "car",
          "phonetic": "/kɑː/",
          "syllables": "car",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "小汽车"
          ],
          "phrases": [],
          "example": "The car is red.",
          "memoryTip": "car小汽车"
        },
        {
          "word": "boat",
          "phonetic": "/bəʊt/",
          "syllables": "boat",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "小船"
          ],
          "phrases": [],
          "example": "Row a boat.",
          "memoryTip": "boat小船"
        },
        {
          "word": "map",
          "phonetic": "/mæp/",
          "syllables": "map",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "地图"
          ],
          "phrases": [],
          "example": "This is a map of China.",
          "memoryTip": "map地图"
        },
        {
          "word": "toy",
          "phonetic": "/tɔɪ/",
          "syllables": "toy",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "玩具"
          ],
          "phrases": [],
          "example": "Where is my toy?",
          "memoryTip": "toy玩具"
        },
        {
          "word": "box",
          "phonetic": "/bɒks/",
          "syllables": "box",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "盒子"
          ],
          "phrases": [],
          "example": "The cat is in the box.",
          "memoryTip": "box盒子"
        }
      ]
    },
    {
      "day": 9,
      "date": "3月9日",
      "unit": "U5",
      "words": [
        {
          "word": "pear",
          "phonetic": "/peə/",
          "syllables": "pear",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "梨"
          ],
          "phrases": [],
          "example": "Do you like pears?",
          "memoryTip": "pear梨"
        },
        {
          "word": "apple",
          "phonetic": "/ˈæpl/",
          "syllables": "ap·ple",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "苹果"
          ],
          "phrases": [],
          "example": "I like apples.",
          "memoryTip": "ap-ple苹果"
        },
        {
          "word": "banana",
          "phonetic": "/bəˈnɑːnə/",
          "syllables": "ba·na·na",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "香蕉"
          ],
          "phrases": [],
          "example": "I like bananas.",
          "memoryTip": "ba-na-na香蕉"
        },
        {
          "word": "grape",
          "phonetic": "/ɡreɪp/",
          "syllables": "grape",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "葡萄"
          ],
          "phrases": [],
          "example": "I like grapes.",
          "memoryTip": "grape葡萄"
        },
        {
          "word": "watermelon",
          "phonetic": "/ˈwɔːtəmelən/",
          "syllables": "wa·ter·me·lon",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "西瓜"
          ],
          "phrases": [],
          "example": "The watermelon is big.",
          "memoryTip": "water+melon西瓜"
        },
        {
          "word": "strawberry",
          "phonetic": "/ˈstrɔːbəri/",
          "syllables": "straw·ber·ry",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "草莓"
          ],
          "phrases": [],
          "example": "I like strawberries.",
          "memoryTip": "straw+berry草莓"
        }
      ]
    },
    {
      "day": 10,
      "date": "3月10日",
      "unit": "U5",
      "words": [
        {
          "word": "like",
          "phonetic": "/laɪk/",
          "syllables": "like",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "喜欢"
          ],
          "phrases": [],
          "example": "Do you like apples?",
          "memoryTip": "like喜欢"
        },
        {
          "word": "buy",
          "phonetic": "/baɪ/",
          "syllables": "buy",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "买"
          ],
          "phrases": [],
          "example": "Let us buy some fruit.",
          "memoryTip": "buy买"
        },
        {
          "word": "fruit",
          "phonetic": "/fruːt/",
          "syllables": "fruit",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "水果"
          ],
          "phrases": [],
          "example": "I like fruit.",
          "memoryTip": "fruit水果"
        },
        {
          "word": "sorry",
          "phonetic": "/ˈsɒri/",
          "syllables": "sor·ry",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "对不起"
          ],
          "phrases": [],
          "example": "Sorry, I do not like it.",
          "memoryTip": "sor-ry对不起"
        },
        {
          "word": "orange",
          "phonetic": "/ˈɒrɪndʒ/",
          "syllables": "o·range",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "橙子"
          ],
          "phrases": [],
          "example": "I like oranges.",
          "memoryTip": "o-range橙子"
        },
        {
          "word": "thanks",
          "phonetic": "/θæŋks/",
          "syllables": "thanks",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "谢谢"
          ],
          "phrases": [],
          "example": "No, thanks.",
          "memoryTip": "thanks谢谢"
        }
      ]
    },
    {
      "day": 11,
      "date": "3月11日",
      "unit": "U6",
      "words": [
        {
          "word": "eleven",
          "phonetic": "/ɪˈlevən/",
          "syllables": "e·le·ven",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十一"
          ],
          "phrases": [],
          "example": "I have eleven books.",
          "memoryTip": "e-le-ven十一"
        },
        {
          "word": "twelve",
          "phonetic": "/twelv/",
          "syllables": "twelve",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十二"
          ],
          "phrases": [],
          "example": "I am twelve years old.",
          "memoryTip": "twelve十二"
        },
        {
          "word": "thirteen",
          "phonetic": "/ˌθɜːˈtiːn/",
          "syllables": "thir·teen",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十三"
          ],
          "phrases": [],
          "example": "There are thirteen cats.",
          "memoryTip": "thir+teen十三"
        },
        {
          "word": "fourteen",
          "phonetic": "/ˌfɔːˈtiːn/",
          "syllables": "four·teen",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十四"
          ],
          "phrases": [],
          "example": "I have fourteen pencils.",
          "memoryTip": "four+teen十四"
        },
        {
          "word": "fifteen",
          "phonetic": "/ˌfɪfˈtiːn/",
          "syllables": "fif·teen",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十五"
          ],
          "phrases": [],
          "example": "Fifteen apples, please.",
          "memoryTip": "fif+teen十五"
        },
        {
          "word": "sixteen",
          "phonetic": "/ˌsɪksˈtiːn/",
          "syllables": "six·teen",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十六"
          ],
          "phrases": [],
          "example": "I see sixteen birds.",
          "memoryTip": "six+teen十六"
        }
      ]
    },
    {
      "day": 12,
      "date": "3月12日",
      "unit": "U6",
      "words": [
        {
          "word": "seventeen",
          "phonetic": "/ˌsevənˈtiːn/",
          "syllables": "se·ven·teen",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十七"
          ],
          "phrases": [],
          "example": "There are seventeen boys.",
          "memoryTip": "seven+teen十七"
        },
        {
          "word": "eighteen",
          "phonetic": "/ˌeɪˈtiːn/",
          "syllables": "eigh·teen",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十八"
          ],
          "phrases": [],
          "example": "I am eighteen years old.",
          "memoryTip": "eigh+teen十八"
        },
        {
          "word": "nineteen",
          "phonetic": "/ˌnaɪnˈtiːn/",
          "syllables": "nine·teen",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "十九"
          ],
          "phrases": [],
          "example": "Nineteen girls are here.",
          "memoryTip": "nine+teen十九"
        },
        {
          "word": "twenty",
          "phonetic": "/ˈtwenti/",
          "syllables": "twen·ty",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "二十"
          ],
          "phrases": [],
          "example": "I have twenty fingers.",
          "memoryTip": "twen+ty二十"
        },
        {
          "word": "kite",
          "phonetic": "/kaɪt/",
          "syllables": "kite",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "风筝"
          ],
          "phrases": [],
          "example": "I can fly a kite.",
          "memoryTip": "kite风筝"
        },
        {
          "word": "beautiful",
          "phonetic": "/ˈbjuːtɪfl/",
          "syllables": "beau·ti·ful",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "美丽的"
          ],
          "phrases": [],
          "example": "What a beautiful kite!",
          "memoryTip": "beau-ti-ful美丽的"
        }
      ]
    }
  ]
};
export const semester_3b = sem_3b_data as SemesterPlan;

// ===== 四年级上册 =====
const sem_4a_data = {
  "key": "4a",
  "name": "四年级上册",
  "grade": "四年级",
  "term": "上册",
  "startMonth": 9,
  "days": [
    {
      "day": 1,
      "date": "9月1日",
      "unit": "U1",
      "words": [
        {
          "word": "classroom",
          "phonetic": "/ˈklɑːsruːm/",
          "syllables": "class·room",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "教室"
          ],
          "phrases": [
            "in the classroom 在教室里"
          ],
          "example": "This is my classroom.",
          "memoryTip": "class+room教室"
        },
        {
          "word": "window",
          "phonetic": "/ˈwɪndəʊ/",
          "syllables": "win·dow",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "窗户"
          ],
          "phrases": [
            "close the window 关窗"
          ],
          "example": "Open the window.",
          "memoryTip": "win+dow窗户"
        },
        {
          "word": "blackboard",
          "phonetic": "/ˈblækbɔːd/",
          "syllables": "black·board",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "黑板"
          ],
          "phrases": [],
          "example": "Look at the blackboard.",
          "memoryTip": "black+board黑板"
        },
        {
          "word": "light",
          "phonetic": "/laɪt/",
          "syllables": "light",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "电灯"
          ],
          "phrases": [
            "traffic light 交通灯"
          ],
          "example": "Turn on the light.",
          "memoryTip": "light灯"
        },
        {
          "word": "picture",
          "phonetic": "/ˈpɪktʃə/",
          "syllables": "pic·ture",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "图画"
          ],
          "phrases": [
            "take a picture 拍照"
          ],
          "example": "There is a picture.",
          "memoryTip": "pic-ture图画"
        },
        {
          "word": "door",
          "phonetic": "/dɔː/",
          "syllables": "door",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "门"
          ],
          "phrases": [
            "close the door 关门"
          ],
          "example": "Open the door.",
          "memoryTip": "door门"
        }
      ]
    },
    {
      "day": 2,
      "date": "9月2日",
      "unit": "U1",
      "words": [
        {
          "word": "computer",
          "phonetic": "/kəmˈpjuːtə/",
          "syllables": "com·pu·ter",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "电脑"
          ],
          "phrases": [
            "computer room 电脑室"
          ],
          "example": "I have a computer.",
          "memoryTip": "com-pu-ter电脑"
        },
        {
          "word": "fan",
          "phonetic": "/fæn/",
          "syllables": "fan",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "风扇"
          ],
          "phrases": [],
          "example": "Turn on the fan.",
          "memoryTip": "fan风扇"
        },
        {
          "word": "wall",
          "phonetic": "/wɔːl/",
          "syllables": "wall",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "墙壁"
          ],
          "phrases": [],
          "example": "The picture is on the wall.",
          "memoryTip": "wall墙壁"
        },
        {
          "word": "floor",
          "phonetic": "/flɔː/",
          "syllables": "floor",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "地板"
          ],
          "phrases": [],
          "example": "The book is on the floor.",
          "memoryTip": "floor地板"
        },
        {
          "word": "really",
          "phonetic": "/ˈrɪəli/",
          "syllables": "rea·lly",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "真的"
          ],
          "phrases": [],
          "example": "Really? Let me see.",
          "memoryTip": "rea-lly真的"
        },
        {
          "word": "near",
          "phonetic": "/nɪə/",
          "syllables": "near",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "靠近"
          ],
          "phrases": [
            "near here 在这附近"
          ],
          "example": "It is near the door.",
          "memoryTip": "near靠近"
        }
      ]
    },
    {
      "day": 3,
      "date": "9月3日",
      "unit": "U2",
      "words": [
        {
          "word": "schoolbag",
          "phonetic": "/ˈskuːlbæɡ/",
          "syllables": "school·bag",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "书包"
          ],
          "phrases": [],
          "example": "I have a new schoolbag.",
          "memoryTip": "school+bag书包"
        },
        {
          "word": "maths",
          "phonetic": "/mæθs/",
          "syllables": "maths",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "数学"
          ],
          "phrases": [
            "maths book 数学书"
          ],
          "example": "I like maths.",
          "memoryTip": "maths数学"
        },
        {
          "word": "English",
          "phonetic": "/ˈɪŋɡlɪʃ/",
          "syllables": "Eng·lish",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "英语"
          ],
          "phrases": [
            "in English 用英语"
          ],
          "example": "I like English.",
          "memoryTip": "Eng-lish英语"
        },
        {
          "word": "Chinese",
          "phonetic": "/ˌtʃaɪˈniːz/",
          "syllables": "Chi·nese",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "语文"
          ],
          "phrases": [],
          "example": "I like Chinese.",
          "memoryTip": "Chi-nese语文"
        },
        {
          "word": "storybook",
          "phonetic": "/ˈstɔːribʊk/",
          "syllables": "sto·ry·book",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "故事书"
          ],
          "phrases": [
            "read a storybook 读故事书"
          ],
          "example": "I have a storybook.",
          "memoryTip": "sto-ry-book故事书"
        },
        {
          "word": "candy",
          "phonetic": "/ˈkændi/",
          "syllables": "can·dy",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "糖果"
          ],
          "phrases": [],
          "example": "I have some candy.",
          "memoryTip": "can-dy糖果"
        }
      ]
    },
    {
      "day": 4,
      "date": "9月4日",
      "unit": "U2",
      "words": [
        {
          "word": "notebook",
          "phonetic": "/ˈnəʊtbʊk/",
          "syllables": "note·book",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "笔记本"
          ],
          "phrases": [],
          "example": "Write in your notebook.",
          "memoryTip": "note+book笔记本"
        },
        {
          "word": "toy",
          "phonetic": "/tɔɪ/",
          "syllables": "toy",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "玩具"
          ],
          "phrases": [],
          "example": "I have a toy.",
          "memoryTip": "toy玩具"
        },
        {
          "word": "key",
          "phonetic": "/kiː/",
          "syllables": "key",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "钥匙"
          ],
          "phrases": [],
          "example": "Where is my key?",
          "memoryTip": "key钥匙"
        },
        {
          "word": "wow",
          "phonetic": "/waʊ/",
          "syllables": "wow",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "哇"
          ],
          "phrases": [],
          "example": "Wow! It is so big!",
          "memoryTip": "wow哇"
        },
        {
          "word": "lost",
          "phonetic": "/lɒst/",
          "syllables": "lost",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "丢失的"
          ],
          "phrases": [
            "get lost 迷路"
          ],
          "example": "My book is lost.",
          "memoryTip": "lost丢失的"
        },
        {
          "word": "cute",
          "phonetic": "/kjuːt/",
          "syllables": "cute",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "可爱的"
          ],
          "phrases": [],
          "example": "What a cute dog!",
          "memoryTip": "cute可爱的"
        }
      ]
    },
    {
      "day": 5,
      "date": "9月5日",
      "unit": "U3",
      "words": [
        {
          "word": "strong",
          "phonetic": "/strɒŋ/",
          "syllables": "strong",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "强壮的"
          ],
          "phrases": [],
          "example": "He is strong.",
          "memoryTip": "strong强壮的"
        },
        {
          "word": "friendly",
          "phonetic": "/ˈfrendli/",
          "syllables": "friend·ly",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "友好的"
          ],
          "phrases": [
            "be friendly to 对...友好"
          ],
          "example": "She is friendly.",
          "memoryTip": "friend+ly友好的"
        },
        {
          "word": "quiet",
          "phonetic": "/ˈkwaɪət/",
          "syllables": "qui·et",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "安静的"
          ],
          "phrases": [
            "keep quiet 保持安静"
          ],
          "example": "The girl is quiet.",
          "memoryTip": "qui-et安静的"
        },
        {
          "word": "hair",
          "phonetic": "/heə/",
          "syllables": "hair",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "头发"
          ],
          "phrases": [
            "short hair 短发"
          ],
          "example": "She has long hair.",
          "memoryTip": "hair头发"
        },
        {
          "word": "shoe",
          "phonetic": "/ʃuː/",
          "syllables": "shoe",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "鞋"
          ],
          "phrases": [
            "a pair of shoes 一双鞋"
          ],
          "example": "Put on your shoes.",
          "memoryTip": "shoe鞋"
        },
        {
          "word": "glasses",
          "phonetic": "/ˈɡlɑːsɪz/",
          "syllables": "gla·sses",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "眼镜"
          ],
          "phrases": [
            "a pair of glasses 一副眼镜"
          ],
          "example": "He wears glasses.",
          "memoryTip": "gla-sses眼镜"
        }
      ]
    },
    {
      "day": 6,
      "date": "9月6日",
      "unit": "U3",
      "words": [
        {
          "word": "his",
          "phonetic": "/hɪz/",
          "syllables": "his",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "他的"
          ],
          "phrases": [],
          "example": "This is his bag.",
          "memoryTip": "his他的"
        },
        {
          "word": "her",
          "phonetic": "/hɜː/",
          "syllables": "her",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "她的"
          ],
          "phrases": [],
          "example": "This is her book.",
          "memoryTip": "her她的"
        },
        {
          "word": "or",
          "phonetic": "/ɔː/",
          "syllables": "or",
          "syllableColors": [],
          "pos": "conj.",
          "meanings": [
            "或者"
          ],
          "phrases": [],
          "example": "Is it big or small?",
          "memoryTip": "or或者"
        },
        {
          "word": "right",
          "phonetic": "/raɪt/",
          "syllables": "right",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "正确的"
          ],
          "phrases": [
            "turn right 向右转"
          ],
          "example": "You are right.",
          "memoryTip": "right正确的"
        },
        {
          "word": "hat",
          "phonetic": "/hæt/",
          "syllables": "hat",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "帽子"
          ],
          "phrases": [],
          "example": "I have a new hat.",
          "memoryTip": "hat帽子"
        },
        {
          "word": "help",
          "phonetic": "/help/",
          "syllables": "help",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "帮助"
          ],
          "phrases": [],
          "example": "Can you help me?",
          "memoryTip": "help帮助"
        }
      ]
    },
    {
      "day": 7,
      "date": "9月7日",
      "unit": "U4",
      "words": [
        {
          "word": "bedroom",
          "phonetic": "/ˈbedruːm/",
          "syllables": "bed·room",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "卧室"
          ],
          "phrases": [],
          "example": "This is my bedroom.",
          "memoryTip": "bed+room卧室"
        },
        {
          "word": "living",
          "phonetic": "/ˈlɪvɪŋ/",
          "syllables": "li·ving",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "生活的"
          ],
          "phrases": [],
          "example": "This is the living room.",
          "memoryTip": "li-ving生活的"
        },
        {
          "word": "study",
          "phonetic": "/ˈstʌdi/",
          "syllables": "stu·dy",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "书房"
          ],
          "phrases": [],
          "example": "I read in the study.",
          "memoryTip": "stu-dy学习"
        },
        {
          "word": "kitchen",
          "phonetic": "/ˈkɪtʃɪn/",
          "syllables": "kit·chen",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "厨房"
          ],
          "phrases": [],
          "example": "My mother is in the kitchen.",
          "memoryTip": "kit-chen厨房"
        },
        {
          "word": "bathroom",
          "phonetic": "/ˈbɑːθruːm/",
          "syllables": "bath·room",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "浴室"
          ],
          "phrases": [],
          "example": "The cat is in the bathroom.",
          "memoryTip": "bath+room浴室"
        },
        {
          "word": "phone",
          "phonetic": "/fəʊn/",
          "syllables": "phone",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "电话"
          ],
          "phrases": [],
          "example": "Answer the phone.",
          "memoryTip": "phone电话"
        }
      ]
    },
    {
      "day": 8,
      "date": "9月8日",
      "unit": "U4",
      "words": [
        {
          "word": "bed",
          "phonetic": "/bed/",
          "syllables": "bed",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "床"
          ],
          "phrases": [],
          "example": "The cat is on the bed.",
          "memoryTip": "bed床"
        },
        {
          "word": "sofa",
          "phonetic": "/ˈsəʊfə/",
          "syllables": "so·fa",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "沙发"
          ],
          "phrases": [],
          "example": "The sofa is soft.",
          "memoryTip": "so-fa沙发"
        },
        {
          "word": "fridge",
          "phonetic": "/frɪdʒ/",
          "syllables": "fridge",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "冰箱"
          ],
          "phrases": [],
          "example": "The milk is in the fridge.",
          "memoryTip": "fridge冰箱"
        },
        {
          "word": "table",
          "phonetic": "/ˈteɪbl/",
          "syllables": "ta·ble",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "桌子"
          ],
          "phrases": [],
          "example": "The book is on the table.",
          "memoryTip": "ta-ble桌子"
        },
        {
          "word": "dinner",
          "phonetic": "/ˈdɪnə/",
          "syllables": "din·ner",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "晚餐"
          ],
          "phrases": [],
          "example": "What is for dinner?",
          "memoryTip": "din-ner晚餐"
        },
        {
          "word": "find",
          "phonetic": "/faɪnd/",
          "syllables": "find",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "找到"
          ],
          "phrases": [],
          "example": "I cannot find my pen.",
          "memoryTip": "find找到"
        }
      ]
    },
    {
      "day": 9,
      "date": "9月9日",
      "unit": "U5",
      "words": [
        {
          "word": "beef",
          "phonetic": "/biːf/",
          "syllables": "beef",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "牛肉"
          ],
          "phrases": [],
          "example": "I would like some beef.",
          "memoryTip": "beef牛肉"
        },
        {
          "word": "chicken",
          "phonetic": "/ˈtʃɪkɪn/",
          "syllables": "chick·en",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "鸡肉"
          ],
          "phrases": [],
          "example": "I like chicken.",
          "memoryTip": "chick+en鸡肉"
        },
        {
          "word": "noodles",
          "phonetic": "/ˈnuːdlz/",
          "syllables": "noo·dles",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "面条"
          ],
          "phrases": [],
          "example": "I would like some noodles.",
          "memoryTip": "noo-dles面条"
        },
        {
          "word": "soup",
          "phonetic": "/suːp/",
          "syllables": "soup",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "汤"
          ],
          "phrases": [],
          "example": "I would like some soup.",
          "memoryTip": "soup汤"
        },
        {
          "word": "vegetable",
          "phonetic": "/ˈvedʒtəbl/",
          "syllables": "ve·ge·ta·ble",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "蔬菜"
          ],
          "phrases": [],
          "example": "Eat more vegetables.",
          "memoryTip": "ve-ge-ta-ble蔬菜"
        },
        {
          "word": "chopsticks",
          "phonetic": "/ˈtʃɒpstɪks/",
          "syllables": "chop·sticks",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "筷子"
          ],
          "phrases": [],
          "example": "I can use chopsticks.",
          "memoryTip": "chop+sticks筷子"
        }
      ]
    },
    {
      "day": 10,
      "date": "9月10日",
      "unit": "U5",
      "words": [
        {
          "word": "bowl",
          "phonetic": "/bəʊl/",
          "syllables": "bowl",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "碗"
          ],
          "phrases": [],
          "example": "Pass me the bowl.",
          "memoryTip": "bowl碗"
        },
        {
          "word": "fork",
          "phonetic": "/fɔːk/",
          "syllables": "fork",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "餐叉"
          ],
          "phrases": [],
          "example": "I need a fork.",
          "memoryTip": "fork叉子"
        },
        {
          "word": "knife",
          "phonetic": "/naɪf/",
          "syllables": "knife",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "刀"
          ],
          "phrases": [],
          "example": "Be careful with the knife.",
          "memoryTip": "knife刀"
        },
        {
          "word": "spoon",
          "phonetic": "/spuːn/",
          "syllables": "spoon",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "勺"
          ],
          "phrases": [],
          "example": "I need a spoon.",
          "memoryTip": "spoon勺子"
        },
        {
          "word": "ready",
          "phonetic": "/ˈredi/",
          "syllables": "rea·dy",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "准备好的"
          ],
          "phrases": [],
          "example": "Dinner is ready!",
          "memoryTip": "rea-dy准备好的"
        },
        {
          "word": "pass",
          "phonetic": "/pɑːs/",
          "syllables": "pass",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "递"
          ],
          "phrases": [],
          "example": "Pass me the bowl.",
          "memoryTip": "pass递"
        }
      ]
    },
    {
      "day": 11,
      "date": "9月11日",
      "unit": "U6",
      "words": [
        {
          "word": "parents",
          "phonetic": "/ˈpeərənts/",
          "syllables": "pa·rents",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "父母"
          ],
          "phrases": [],
          "example": "My parents are teachers.",
          "memoryTip": "pa-rents父母"
        },
        {
          "word": "uncle",
          "phonetic": "/ˈʌŋkl/",
          "syllables": "un·cle",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "叔叔"
          ],
          "phrases": [],
          "example": "My uncle is tall.",
          "memoryTip": "un-cle叔叔"
        },
        {
          "word": "aunt",
          "phonetic": "/ɑːnt/",
          "syllables": "aunt",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "阿姨"
          ],
          "phrases": [],
          "example": "My aunt is kind.",
          "memoryTip": "aunt阿姨"
        },
        {
          "word": "baby",
          "phonetic": "/ˈbeɪbi/",
          "syllables": "ba·by",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "婴儿"
          ],
          "phrases": [],
          "example": "The baby is cute.",
          "memoryTip": "ba-by婴儿"
        },
        {
          "word": "doctor",
          "phonetic": "/ˈdɒktə/",
          "syllables": "doc·tor",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "医生"
          ],
          "phrases": [],
          "example": "My father is a doctor.",
          "memoryTip": "doc-tor医生"
        },
        {
          "word": "cook",
          "phonetic": "/kʊk/",
          "syllables": "cook",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "厨师"
          ],
          "phrases": [],
          "example": "My mother is a cook.",
          "memoryTip": "cook厨师"
        }
      ]
    },
    {
      "day": 12,
      "date": "9月12日",
      "unit": "U6",
      "words": [
        {
          "word": "driver",
          "phonetic": "/ˈdraɪvə/",
          "syllables": "dri·ver",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "司机"
          ],
          "phrases": [],
          "example": "He is a bus driver.",
          "memoryTip": "dri-ver司机"
        },
        {
          "word": "farmer",
          "phonetic": "/ˈfɑːmə/",
          "syllables": "far·mer",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "农民"
          ],
          "phrases": [],
          "example": "My grandpa is a farmer.",
          "memoryTip": "far+mer农民"
        },
        {
          "word": "nurse",
          "phonetic": "/nɜːs/",
          "syllables": "nurse",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "护士"
          ],
          "phrases": [],
          "example": "My aunt is a nurse.",
          "memoryTip": "nurse护士"
        },
        {
          "word": "people",
          "phonetic": "/ˈpiːpl/",
          "syllables": "peo·ple",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "人们"
          ],
          "phrases": [],
          "example": "How many people?",
          "memoryTip": "peo-ple人们"
        },
        {
          "word": "job",
          "phonetic": "/dʒɒb/",
          "syllables": "job",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "工作"
          ],
          "phrases": [],
          "example": "What is his job?",
          "memoryTip": "job工作"
        },
        {
          "word": "baseball",
          "phonetic": "/ˈbeɪsbɔːl/",
          "syllables": "base·ball",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "棒球"
          ],
          "phrases": [],
          "example": "He plays baseball.",
          "memoryTip": "base+ball棒球"
        }
      ]
    }
  ]
};
export const semester_4a = sem_4a_data as SemesterPlan;

// ===== 四年级下册 =====
const sem_4b_data = {
  "key": "4b",
  "name": "四年级下册",
  "grade": "四年级",
  "term": "下册",
  "startMonth": 3,
  "days": [
    {
      "day": 1,
      "date": "3月1日",
      "unit": "U1",
      "words": [
        {
          "word": "first",
          "phonetic": "/fɜːst/",
          "syllables": "first",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "第一"
          ],
          "phrases": [
            "at first 首先"
          ],
          "example": "The library is on the first floor.",
          "memoryTip": "first第一"
        },
        {
          "word": "second",
          "phonetic": "/ˈsekənd/",
          "syllables": "se·cond",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "第二"
          ],
          "phrases": [],
          "example": "The art room is on the second floor.",
          "memoryTip": "se-cond第二"
        },
        {
          "word": "library",
          "phonetic": "/ˈlaɪbrəri/",
          "syllables": "li·bra·ry",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "图书馆"
          ],
          "phrases": [
            "in the library 在图书馆"
          ],
          "example": "The library is big.",
          "memoryTip": "li-bra-ry图书馆"
        },
        {
          "word": "playground",
          "phonetic": "/ˈpleɪɡraʊnd/",
          "syllables": "play·ground",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "操场"
          ],
          "phrases": [],
          "example": "Let us go to the playground.",
          "memoryTip": "play+ground操场"
        },
        {
          "word": "art",
          "phonetic": "/ɑːt/",
          "syllables": "art",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "美术"
          ],
          "phrases": [],
          "example": "I like art class.",
          "memoryTip": "art美术"
        },
        {
          "word": "music",
          "phonetic": "/ˈmjuːzɪk/",
          "syllables": "mu·sic",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "音乐"
          ],
          "phrases": [],
          "example": "I like music.",
          "memoryTip": "mu-sic音乐"
        }
      ]
    },
    {
      "day": 2,
      "date": "3月2日",
      "unit": "U1",
      "words": [
        {
          "word": "next to",
          "phonetic": "/ˈnekst tə/",
          "syllables": "next·to",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "紧邻"
          ],
          "phrases": [],
          "example": "It is next to the art room.",
          "memoryTip": "next+to紧邻"
        },
        {
          "word": "homework",
          "phonetic": "/ˈhəʊmwɜːk/",
          "syllables": "home·work",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "作业"
          ],
          "phrases": [],
          "example": "Do your homework.",
          "memoryTip": "home+work作业"
        },
        {
          "word": "class",
          "phonetic": "/klɑːs/",
          "syllables": "class",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "班级"
          ],
          "phrases": [],
          "example": "We have English class.",
          "memoryTip": "class班级"
        },
        {
          "word": "forty",
          "phonetic": "/ˈfɔːti/",
          "syllables": "for·ty",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "四十"
          ],
          "phrases": [],
          "example": "There are forty students.",
          "memoryTip": "for+ty四十"
        },
        {
          "word": "way",
          "phonetic": "/weɪ/",
          "syllables": "way",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "路"
          ],
          "phrases": [],
          "example": "This way, please.",
          "memoryTip": "way路"
        },
        {
          "word": "computer room",
          "phonetic": "/kəmˈpjuːtə ruːm/",
          "syllables": "com·pu·ter·room",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "电脑室"
          ],
          "phrases": [],
          "example": "The computer room is big.",
          "memoryTip": "com-pu-ter-room电脑室"
        }
      ]
    },
    {
      "day": 3,
      "date": "3月3日",
      "unit": "U2",
      "words": [
        {
          "word": "breakfast",
          "phonetic": "/ˈbrekfəst/",
          "syllables": "break·fast",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "早餐"
          ],
          "phrases": [
            "have breakfast 吃早餐"
          ],
          "example": "It is time for breakfast.",
          "memoryTip": "break+fast早餐"
        },
        {
          "word": "lunch",
          "phonetic": "/lʌntʃ/",
          "syllables": "lunch",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "午餐"
          ],
          "phrases": [
            "have lunch 吃午饭"
          ],
          "example": "It is time for lunch.",
          "memoryTip": "lunch午餐"
        },
        {
          "word": "dinner",
          "phonetic": "/ˈdɪnə/",
          "syllables": "din·ner",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "晚餐"
          ],
          "phrases": [
            "have dinner 吃晚餐"
          ],
          "example": "It is time for dinner.",
          "memoryTip": "din-ner晚餐"
        },
        {
          "word": "English class",
          "phonetic": "/ˈɪŋɡlɪʃ klɑːs/",
          "syllables": "Eng·lish·class",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "英语课"
          ],
          "phrases": [],
          "example": "It is time for English class.",
          "memoryTip": "Eng-lish-class英语课"
        },
        {
          "word": "music class",
          "phonetic": "/ˈmjuːzɪk klɑːs/",
          "syllables": "mu·sic·class",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "音乐课"
          ],
          "phrases": [],
          "example": "It is time for music class.",
          "memoryTip": "mu-sic-class音乐课"
        },
        {
          "word": "PE class",
          "phonetic": "/ˌpiːˈiː klɑːs/",
          "syllables": "P·E·class",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "体育课"
          ],
          "phrases": [],
          "example": "It is time for PE class.",
          "memoryTip": "P.E.+class体育课"
        }
      ]
    },
    {
      "day": 4,
      "date": "3月4日",
      "unit": "U2",
      "words": [
        {
          "word": "get up",
          "phonetic": "/ɡet ʌp/",
          "syllables": "get·up",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "起床"
          ],
          "phrases": [
            "get up early 早起"
          ],
          "example": "It is time to get up.",
          "memoryTip": "get+up起床"
        },
        {
          "word": "go to school",
          "phonetic": "/ɡəʊ tə skuːl/",
          "syllables": "go·to·school",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "去上学"
          ],
          "phrases": [],
          "example": "It is time to go to school.",
          "memoryTip": "go+to+school去上学"
        },
        {
          "word": "go home",
          "phonetic": "/ɡəʊ həʊm/",
          "syllables": "go·home",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "回家"
          ],
          "phrases": [],
          "example": "It is time to go home.",
          "memoryTip": "go+home回家"
        },
        {
          "word": "go to bed",
          "phonetic": "/ɡəʊ tə bed/",
          "syllables": "go·to·bed",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "上床睡觉"
          ],
          "phrases": [],
          "example": "It is time to go to bed.",
          "memoryTip": "go+to+bed上床睡觉"
        },
        {
          "word": "o'clock",
          "phonetic": "/əˈklɒk/",
          "syllables": "o'clock",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "点钟"
          ],
          "phrases": [],
          "example": "It is 8 o'clock.",
          "memoryTip": "o'clock点钟"
        },
        {
          "word": "over",
          "phonetic": "/ˈəʊvə/",
          "syllables": "o·ver",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "结束"
          ],
          "phrases": [],
          "example": "Class is over.",
          "memoryTip": "o-ver结束"
        }
      ]
    },
    {
      "day": 5,
      "date": "3月5日",
      "unit": "U3",
      "words": [
        {
          "word": "cold",
          "phonetic": "/kəʊld/",
          "syllables": "cold",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "冷的"
          ],
          "phrases": [
            "have a cold 感冒"
          ],
          "example": "It is cold today.",
          "memoryTip": "cold冷的"
        },
        {
          "word": "cool",
          "phonetic": "/kuːl/",
          "syllables": "cool",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "凉爽的"
          ],
          "phrases": [],
          "example": "It is cool in autumn.",
          "memoryTip": "cool凉爽的"
        },
        {
          "word": "warm",
          "phonetic": "/wɔːm/",
          "syllables": "warm",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "温暖的"
          ],
          "phrases": [],
          "example": "It is warm in spring.",
          "memoryTip": "warm温暖的"
        },
        {
          "word": "hot",
          "phonetic": "/hɒt/",
          "syllables": "hot",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "热的"
          ],
          "phrases": [],
          "example": "It is hot in summer.",
          "memoryTip": "hot热的"
        },
        {
          "word": "sunny",
          "phonetic": "/ˈsʌni/",
          "syllables": "sun·ny",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "晴朗的"
          ],
          "phrases": [],
          "example": "It is sunny today.",
          "memoryTip": "sun+ny晴朗的"
        },
        {
          "word": "windy",
          "phonetic": "/ˈwɪndi/",
          "syllables": "win·dy",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "多风的"
          ],
          "phrases": [],
          "example": "It is windy today.",
          "memoryTip": "wind+y多风的"
        }
      ]
    },
    {
      "day": 6,
      "date": "3月6日",
      "unit": "U3",
      "words": [
        {
          "word": "cloudy",
          "phonetic": "/ˈklaʊdi/",
          "syllables": "cloud·y",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "多云的"
          ],
          "phrases": [],
          "example": "It is cloudy.",
          "memoryTip": "cloud+y多云的"
        },
        {
          "word": "snowy",
          "phonetic": "/ˈsnəʊi/",
          "syllables": "snow·y",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "下雪的"
          ],
          "phrases": [],
          "example": "It is snowy in winter.",
          "memoryTip": "snow+y下雪的"
        },
        {
          "word": "rainy",
          "phonetic": "/ˈreɪni/",
          "syllables": "rain·y",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "下雨的"
          ],
          "phrases": [],
          "example": "It is rainy.",
          "memoryTip": "rain+y下雨的"
        },
        {
          "word": "outside",
          "phonetic": "/ˌaʊtˈsaɪd/",
          "syllables": "out·side",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "在户外"
          ],
          "phrases": [],
          "example": "Can I go outside?",
          "memoryTip": "out+side外面"
        },
        {
          "word": "weather",
          "phonetic": "/ˈweðə/",
          "syllables": "wea·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "天气"
          ],
          "phrases": [],
          "example": "What is the weather like?",
          "memoryTip": "wea-ther天气"
        },
        {
          "word": "degree",
          "phonetic": "/dɪˈɡriː/",
          "syllables": "de·gree",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "度"
          ],
          "phrases": [],
          "example": "It is 25 degrees.",
          "memoryTip": "de-gree度"
        }
      ]
    },
    {
      "day": 7,
      "date": "3月7日",
      "unit": "U4",
      "words": [
        {
          "word": "tomato",
          "phonetic": "/təˈmɑːtəʊ/",
          "syllables": "to·ma·to",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "西红柿"
          ],
          "phrases": [],
          "example": "These are tomatoes.",
          "memoryTip": "to-ma-to西红柿"
        },
        {
          "word": "potato",
          "phonetic": "/pəˈteɪtəʊ/",
          "syllables": "po·ta·to",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "土豆"
          ],
          "phrases": [],
          "example": "I like potatoes.",
          "memoryTip": "po-ta-to土豆"
        },
        {
          "word": "carrot",
          "phonetic": "/ˈkærət/",
          "syllables": "ca·rrot",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "胡萝卜"
          ],
          "phrases": [],
          "example": "The rabbit likes carrots.",
          "memoryTip": "ca-rrot胡萝卜"
        },
        {
          "word": "green beans",
          "phonetic": "/ɡriːn biːnz/",
          "syllables": "green·beans",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "豆角"
          ],
          "phrases": [],
          "example": "These are green beans.",
          "memoryTip": "green+beans豆角"
        },
        {
          "word": "onion",
          "phonetic": "/ˈʌnjən/",
          "syllables": "o·nion",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "洋葱"
          ],
          "phrases": [],
          "example": "I do not like onions.",
          "memoryTip": "o-nion洋葱"
        },
        {
          "word": "horse",
          "phonetic": "/hɔːs/",
          "syllables": "horse",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "马"
          ],
          "phrases": [],
          "example": "The horse is strong.",
          "memoryTip": "horse马"
        }
      ]
    },
    {
      "day": 8,
      "date": "3月8日",
      "unit": "U4",
      "words": [
        {
          "word": "cow",
          "phonetic": "/kaʊ/",
          "syllables": "cow",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "奶牛"
          ],
          "phrases": [],
          "example": "The cow is white.",
          "memoryTip": "cow奶牛"
        },
        {
          "word": "sheep",
          "phonetic": "/ʃiːp/",
          "syllables": "sheep",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "绵羊"
          ],
          "phrases": [],
          "example": "The sheep is white.",
          "memoryTip": "sheep绵羊"
        },
        {
          "word": "hen",
          "phonetic": "/hen/",
          "syllables": "hen",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "母鸡"
          ],
          "phrases": [],
          "example": "The hen is small.",
          "memoryTip": "hen母鸡"
        },
        {
          "word": "these",
          "phonetic": "/ðiːz/",
          "syllables": "these",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "这些"
          ],
          "phrases": [],
          "example": "These are carrots.",
          "memoryTip": "these这些"
        },
        {
          "word": "those",
          "phonetic": "/ðəʊz/",
          "syllables": "those",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "那些"
          ],
          "phrases": [],
          "example": "Those are horses.",
          "memoryTip": "those那些"
        },
        {
          "word": "animal",
          "phonetic": "/ˈænɪml/",
          "syllables": "a·ni·mal",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "动物"
          ],
          "phrases": [],
          "example": "What animals do you like?",
          "memoryTip": "a-ni-mal动物"
        }
      ]
    },
    {
      "day": 9,
      "date": "3月9日",
      "unit": "U5",
      "words": [
        {
          "word": "clothes",
          "phonetic": "/kləʊðz/",
          "syllables": "clothes",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "衣服"
          ],
          "phrases": [],
          "example": "These are my clothes.",
          "memoryTip": "clothes衣服"
        },
        {
          "word": "pants",
          "phonetic": "/pænts/",
          "syllables": "pants",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "裤子"
          ],
          "phrases": [],
          "example": "These are my pants.",
          "memoryTip": "pants裤子"
        },
        {
          "word": "hat",
          "phonetic": "/hæt/",
          "syllables": "hat",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "帽子"
          ],
          "phrases": [],
          "example": "This is my hat.",
          "memoryTip": "hat帽子"
        },
        {
          "word": "dress",
          "phonetic": "/dres/",
          "syllables": "dress",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "连衣裙"
          ],
          "phrases": [],
          "example": "I like this dress.",
          "memoryTip": "dress连衣裙"
        },
        {
          "word": "skirt",
          "phonetic": "/skɜːt/",
          "syllables": "skirt",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "女裙"
          ],
          "phrases": [],
          "example": "The skirt is pretty.",
          "memoryTip": "skirt裙子"
        },
        {
          "word": "coat",
          "phonetic": "/kəʊt/",
          "syllables": "coat",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "外套"
          ],
          "phrases": [],
          "example": "Put on your coat.",
          "memoryTip": "coat外套"
        }
      ]
    },
    {
      "day": 10,
      "date": "3月10日",
      "unit": "U5",
      "words": [
        {
          "word": "sweater",
          "phonetic": "/ˈswetə/",
          "syllables": "swea·ter",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "毛衣"
          ],
          "phrases": [],
          "example": "The sweater is warm.",
          "memoryTip": "swea-ter毛衣"
        },
        {
          "word": "sock",
          "phonetic": "/sɒk/",
          "syllables": "sock",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "短袜"
          ],
          "phrases": [],
          "example": "These are my socks.",
          "memoryTip": "sock袜子"
        },
        {
          "word": "shorts",
          "phonetic": "/ʃɔːts/",
          "syllables": "shorts",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "短裤"
          ],
          "phrases": [],
          "example": "These are my shorts.",
          "memoryTip": "short+s短裤"
        },
        {
          "word": "jacket",
          "phonetic": "/ˈdʒækɪt/",
          "syllables": "jack·et",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "夹克衫"
          ],
          "phrases": [],
          "example": "Put on your jacket.",
          "memoryTip": "jack-et夹克衫"
        },
        {
          "word": "shirt",
          "phonetic": "/ʃɜːt/",
          "syllables": "shirt",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "衬衫"
          ],
          "phrases": [],
          "example": "This is my shirt.",
          "memoryTip": "shirt衬衫"
        },
        {
          "word": "yours",
          "phonetic": "/jɔːz/",
          "syllables": "yours",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "你的"
          ],
          "phrases": [],
          "example": "Is this yours?",
          "memoryTip": "yours你的"
        }
      ]
    },
    {
      "day": 11,
      "date": "3月11日",
      "unit": "U6",
      "words": [
        {
          "word": "gloves",
          "phonetic": "/ɡlʌvz/",
          "syllables": "glo·ves",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "手套"
          ],
          "phrases": [],
          "example": "The gloves are nice.",
          "memoryTip": "glo-ves手套"
        },
        {
          "word": "umbrella",
          "phonetic": "/ʌmˈbrelə/",
          "syllables": "um·brel·la",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "雨伞"
          ],
          "phrases": [],
          "example": "Take an umbrella.",
          "memoryTip": "um-brel-la雨伞"
        },
        {
          "word": "sunglasses",
          "phonetic": "/ˈsʌnɡlɑːsɪz/",
          "syllables": "sun·gla·sses",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "太阳镜"
          ],
          "phrases": [],
          "example": "The sunglasses are cool.",
          "memoryTip": "sun+glasses太阳镜"
        },
        {
          "word": "scarf",
          "phonetic": "/skɑːf/",
          "syllables": "scarf",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "围巾"
          ],
          "phrases": [],
          "example": "The scarf is pretty.",
          "memoryTip": "scarf围巾"
        },
        {
          "word": "expensive",
          "phonetic": "/ɪkˈspensɪv/",
          "syllables": "ex·pen·sive",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "昂贵的"
          ],
          "phrases": [],
          "example": "The coat is expensive.",
          "memoryTip": "ex-pen-sive昂贵的"
        },
        {
          "word": "cheap",
          "phonetic": "/tʃiːp/",
          "syllables": "cheap",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "便宜的"
          ],
          "phrases": [],
          "example": "The pen is cheap.",
          "memoryTip": "cheap便宜的"
        }
      ]
    },
    {
      "day": 12,
      "date": "3月12日",
      "unit": "U6",
      "words": [
        {
          "word": "nice",
          "phonetic": "/naɪs/",
          "syllables": "nice",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "美好的"
          ],
          "phrases": [],
          "example": "The gloves are nice.",
          "memoryTip": "nice美好的"
        },
        {
          "word": "pretty",
          "phonetic": "/ˈprɪti/",
          "syllables": "pret·ty",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "美观的"
          ],
          "phrases": [],
          "example": "The skirt is pretty.",
          "memoryTip": "pret-ty美观的"
        },
        {
          "word": "try on",
          "phonetic": "/traɪ ɒn/",
          "syllables": "try·on",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "试穿"
          ],
          "phrases": [],
          "example": "Can I try them on?",
          "memoryTip": "try+on试穿"
        },
        {
          "word": "size",
          "phonetic": "/saɪz/",
          "syllables": "size",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "尺码"
          ],
          "phrases": [],
          "example": "What size?",
          "memoryTip": "size尺码"
        },
        {
          "word": "of course",
          "phonetic": "/əv kɔːs/",
          "syllables": "of·course",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "当然"
          ],
          "phrases": [],
          "example": "Of course. Here you are.",
          "memoryTip": "of+course当然"
        },
        {
          "word": "too",
          "phonetic": "/tuː/",
          "syllables": "too",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "太"
          ],
          "phrases": [],
          "example": "It is too expensive.",
          "memoryTip": "too太"
        }
      ]
    }
  ]
};
export const semester_4b = sem_4b_data as SemesterPlan;

// ===== 五年级上册 =====
const sem_5a_data = {
  "key": "5a",
  "name": "五年级上册",
  "grade": "五年级",
  "term": "上册",
  "startMonth": 9,
  "days": [
    {
      "day": 1,
      "date": "9月1日",
      "unit": "U1",
      "words": [
        {
          "word": "young",
          "phonetic": "/jʌŋ/",
          "syllables": "young",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "年轻的"
          ],
          "phrases": [],
          "example": "She is young.",
          "memoryTip": "young年轻的"
        },
        {
          "word": "old",
          "phonetic": "/əʊld/",
          "syllables": "old",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "年老的"
          ],
          "phrases": [],
          "example": "He is old.",
          "memoryTip": "old年老的"
        },
        {
          "word": "funny",
          "phonetic": "/ˈfʌni/",
          "syllables": "fun·ny",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "滑稽的"
          ],
          "phrases": [],
          "example": "He is funny.",
          "memoryTip": "fun+ny滑稽的"
        },
        {
          "word": "kind",
          "phonetic": "/kaɪnd/",
          "syllables": "kind",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "和蔼的"
          ],
          "phrases": [
            "be kind to 对...和蔼"
          ],
          "example": "She is kind.",
          "memoryTip": "kind和蔼的"
        },
        {
          "word": "strict",
          "phonetic": "/strɪkt/",
          "syllables": "strict",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "严厉的"
          ],
          "phrases": [],
          "example": "He is strict.",
          "memoryTip": "strict严厉的"
        },
        {
          "word": "polite",
          "phonetic": "/pəˈlaɪt/",
          "syllables": "po·lite",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "有礼貌的"
          ],
          "phrases": [],
          "example": "He is polite.",
          "memoryTip": "po-lite有礼貌的"
        }
      ]
    },
    {
      "day": 2,
      "date": "9月2日",
      "unit": "U1",
      "words": [
        {
          "word": "helpful",
          "phonetic": "/ˈhelpfl/",
          "syllables": "help·ful",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "有用的"
          ],
          "phrases": [],
          "example": "She is helpful.",
          "memoryTip": "help+ful有用的"
        },
        {
          "word": "clever",
          "phonetic": "/ˈklevə/",
          "syllables": "cle·ver",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "聪明的"
          ],
          "phrases": [],
          "example": "He is clever.",
          "memoryTip": "cle-ver聪明的"
        },
        {
          "word": "shy",
          "phonetic": "/ʃaɪ/",
          "syllables": "shy",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "羞怯的"
          ],
          "phrases": [],
          "example": "She is shy.",
          "memoryTip": "shy羞怯的"
        },
        {
          "word": "know",
          "phonetic": "/nəʊ/",
          "syllables": "know",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "知道"
          ],
          "phrases": [],
          "example": "I know him.",
          "memoryTip": "know知道"
        },
        {
          "word": "our",
          "phonetic": "/ˈaʊə/",
          "syllables": "our",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "我们的"
          ],
          "phrases": [],
          "example": "This is our teacher.",
          "memoryTip": "our我们的"
        },
        {
          "word": "Ms",
          "phonetic": "/mɪz/",
          "syllables": "Ms",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "女士"
          ],
          "phrases": [],
          "example": "Hello, Ms Wang.",
          "memoryTip": "Ms女士"
        }
      ]
    },
    {
      "day": 3,
      "date": "9月3日",
      "unit": "U2",
      "words": [
        {
          "word": "Monday",
          "phonetic": "/ˈmʌndeɪ/",
          "syllables": "Mon·day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "星期一"
          ],
          "phrases": [],
          "example": "I have Chinese on Monday.",
          "memoryTip": "Mon-day星期一"
        },
        {
          "word": "Tuesday",
          "phonetic": "/ˈtjuːzdeɪ/",
          "syllables": "Tues·day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "星期二"
          ],
          "phrases": [],
          "example": "I have maths on Tuesday.",
          "memoryTip": "Tues-day星期二"
        },
        {
          "word": "Wednesday",
          "phonetic": "/ˈwenzdeɪ/",
          "syllables": "Wednes·day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "星期三"
          ],
          "phrases": [],
          "example": "I have English on Wednesday.",
          "memoryTip": "Wednes-day星期三"
        },
        {
          "word": "Thursday",
          "phonetic": "/ˈθɜːzdeɪ/",
          "syllables": "Thurs·day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "星期四"
          ],
          "phrases": [],
          "example": "I have art on Thursday.",
          "memoryTip": "Thurs-day星期四"
        },
        {
          "word": "Friday",
          "phonetic": "/ˈfraɪdeɪ/",
          "syllables": "Fri·day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "星期五"
          ],
          "phrases": [],
          "example": "I have PE on Friday.",
          "memoryTip": "Fri-day星期五"
        },
        {
          "word": "Saturday",
          "phonetic": "/ˈsætədeɪ/",
          "syllables": "Satur·day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "星期六"
          ],
          "phrases": [],
          "example": "I play on Saturday.",
          "memoryTip": "Satur-day星期六"
        }
      ]
    },
    {
      "day": 4,
      "date": "9月4日",
      "unit": "U2",
      "words": [
        {
          "word": "Sunday",
          "phonetic": "/ˈsʌndeɪ/",
          "syllables": "Sun·day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "星期日"
          ],
          "phrases": [],
          "example": "I rest on Sunday.",
          "memoryTip": "Sun-day星期日"
        },
        {
          "word": "weekend",
          "phonetic": "/ˌwiːkˈend/",
          "syllables": "week·end",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "周末"
          ],
          "phrases": [],
          "example": "I love the weekend.",
          "memoryTip": "week+end周末"
        },
        {
          "word": "wash",
          "phonetic": "/wɒʃ/",
          "syllables": "wash",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "洗"
          ],
          "phrases": [
            "wash clothes 洗衣服"
          ],
          "example": "I wash my clothes.",
          "memoryTip": "wash洗"
        },
        {
          "word": "watch",
          "phonetic": "/wɒtʃ/",
          "syllables": "watch",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "看"
          ],
          "phrases": [
            "watch TV 看电视"
          ],
          "example": "I watch TV.",
          "memoryTip": "watch看"
        },
        {
          "word": "read",
          "phonetic": "/riːd/",
          "syllables": "read",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "看；读"
          ],
          "phrases": [
            "read books 看书"
          ],
          "example": "I read books.",
          "memoryTip": "read读"
        },
        {
          "word": "play",
          "phonetic": "/pleɪ/",
          "syllables": "play",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "踢；玩"
          ],
          "phrases": [
            "play football 踢足球"
          ],
          "example": "I play football.",
          "memoryTip": "play玩"
        }
      ]
    },
    {
      "day": 5,
      "date": "9月5日",
      "unit": "U3",
      "words": [
        {
          "word": "sandwich",
          "phonetic": "/ˈsænwɪtʃ/",
          "syllables": "sand·wich",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "三明治"
          ],
          "phrases": [],
          "example": "I would like a sandwich.",
          "memoryTip": "sand+wich三明治"
        },
        {
          "word": "salad",
          "phonetic": "/ˈsæləd/",
          "syllables": "sa·lad",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "沙拉"
          ],
          "phrases": [],
          "example": "I would like some salad.",
          "memoryTip": "sa-lad沙拉"
        },
        {
          "word": "hamburger",
          "phonetic": "/ˈhæmbɜːɡə/",
          "syllables": "ham·bur·ger",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "汉堡包"
          ],
          "phrases": [],
          "example": "I would like a hamburger.",
          "memoryTip": "ham-bur-ger汉堡包"
        },
        {
          "word": "ice cream",
          "phonetic": "/ˌaɪs ˈkriːm/",
          "syllables": "ice·cream",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "冰激凌"
          ],
          "phrases": [],
          "example": "I would like ice cream.",
          "memoryTip": "ice+cream冰激凌"
        },
        {
          "word": "tea",
          "phonetic": "/tiː/",
          "syllables": "tea",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "茶"
          ],
          "phrases": [],
          "example": "I would like some tea.",
          "memoryTip": "tea茶"
        },
        {
          "word": "fresh",
          "phonetic": "/freʃ/",
          "syllables": "fresh",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "新鲜的"
          ],
          "phrases": [],
          "example": "The fish is fresh.",
          "memoryTip": "fresh新鲜的"
        }
      ]
    },
    {
      "day": 6,
      "date": "9月6日",
      "unit": "U3",
      "words": [
        {
          "word": "healthy",
          "phonetic": "/ˈhelθi/",
          "syllables": "hel·thy",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "健康的"
          ],
          "phrases": [],
          "example": "It is healthy.",
          "memoryTip": "hel-thy健康的"
        },
        {
          "word": "delicious",
          "phonetic": "/dɪˈlɪʃəs/",
          "syllables": "de·li·cious",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "美味的"
          ],
          "phrases": [],
          "example": "It is delicious.",
          "memoryTip": "de-li-cious美味的"
        },
        {
          "word": "hot",
          "phonetic": "/hɒt/",
          "syllables": "hot",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "辣的"
          ],
          "phrases": [],
          "example": "It is too hot.",
          "memoryTip": "hot辣的"
        },
        {
          "word": "sweet",
          "phonetic": "/swiːt/",
          "syllables": "sweet",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "甜的"
          ],
          "phrases": [],
          "example": "The cake is sweet.",
          "memoryTip": "sweet甜的"
        },
        {
          "word": "favourite",
          "phonetic": "/ˈfeɪvərɪt/",
          "syllables": "fa·vou·rite",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "最喜欢的"
          ],
          "phrases": [],
          "example": "What is your favourite food?",
          "memoryTip": "fa-vou-rite最喜欢的"
        },
        {
          "word": "food",
          "phonetic": "/fuːd/",
          "syllables": "food",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "食物"
          ],
          "phrases": [],
          "example": "I like Chinese food.",
          "memoryTip": "food食物"
        }
      ]
    },
    {
      "day": 7,
      "date": "9月7日",
      "unit": "U4",
      "words": [
        {
          "word": "sing",
          "phonetic": "/sɪŋ/",
          "syllables": "sing",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "唱"
          ],
          "phrases": [
            "sing songs 唱歌"
          ],
          "example": "I can sing.",
          "memoryTip": "sing唱"
        },
        {
          "word": "song",
          "phonetic": "/sɒŋ/",
          "syllables": "song",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "歌曲"
          ],
          "phrases": [],
          "example": "I like this song.",
          "memoryTip": "song歌曲"
        },
        {
          "word": "dance",
          "phonetic": "/dɑːns/",
          "syllables": "dance",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "跳舞"
          ],
          "phrases": [],
          "example": "I can dance.",
          "memoryTip": "dance跳舞"
        },
        {
          "word": "draw",
          "phonetic": "/drɔː/",
          "syllables": "draw",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "画"
          ],
          "phrases": [
            "draw pictures 画画"
          ],
          "example": "I can draw.",
          "memoryTip": "draw画"
        },
        {
          "word": "cartoon",
          "phonetic": "/kɑːˈtuːn/",
          "syllables": "car·toon",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "漫画"
          ],
          "phrases": [],
          "example": "I can draw cartoons.",
          "memoryTip": "car-toon漫画"
        },
        {
          "word": "cook",
          "phonetic": "/kʊk/",
          "syllables": "cook",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "烹调"
          ],
          "phrases": [
            "cook dinner 做晚饭"
          ],
          "example": "I can cook.",
          "memoryTip": "cook做饭"
        }
      ]
    },
    {
      "day": 8,
      "date": "9月8日",
      "unit": "U4",
      "words": [
        {
          "word": "swim",
          "phonetic": "/swɪm/",
          "syllables": "swim",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "游泳"
          ],
          "phrases": [],
          "example": "I can swim.",
          "memoryTip": "swim游泳"
        },
        {
          "word": "speak",
          "phonetic": "/spiːk/",
          "syllables": "speak",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "会说"
          ],
          "phrases": [
            "speak English 说英语"
          ],
          "example": "I can speak English.",
          "memoryTip": "speak说"
        },
        {
          "word": "party",
          "phonetic": "/ˈpɑːti/",
          "syllables": "par·ty",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "聚会"
          ],
          "phrases": [
            "birthday party 生日聚会"
          ],
          "example": "We have a party.",
          "memoryTip": "par-ty聚会"
        },
        {
          "word": "wonderful",
          "phonetic": "/ˈwʌndəfl/",
          "syllables": "won·der·ful",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "极好的"
          ],
          "phrases": [],
          "example": "That is wonderful!",
          "memoryTip": "won-der-ful极好的"
        },
        {
          "word": "email",
          "phonetic": "/ˈiːmeɪl/",
          "syllables": "e·mail",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "电子邮件"
          ],
          "phrases": [],
          "example": "Send me an email.",
          "memoryTip": "e+mail电子邮件"
        },
        {
          "word": "kung fu",
          "phonetic": "/ˌkʌŋ ˈfuː/",
          "syllables": "kung·fu",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "功夫"
          ],
          "phrases": [],
          "example": "I can do kung fu.",
          "memoryTip": "kung+fu功夫"
        }
      ]
    },
    {
      "day": 9,
      "date": "9月9日",
      "unit": "U5",
      "words": [
        {
          "word": "clock",
          "phonetic": "/klɒk/",
          "syllables": "clock",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "时钟"
          ],
          "phrases": [],
          "example": "There is a clock.",
          "memoryTip": "clock时钟"
        },
        {
          "word": "plant",
          "phonetic": "/plɑːnt/",
          "syllables": "plant",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "植物"
          ],
          "phrases": [],
          "example": "There is a plant.",
          "memoryTip": "plant植物"
        },
        {
          "word": "bottle",
          "phonetic": "/ˈbɒtl/",
          "syllables": "bo·ttle",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "瓶子"
          ],
          "phrases": [],
          "example": "There is a bottle.",
          "memoryTip": "bo-ttle瓶子"
        },
        {
          "word": "water bottle",
          "phonetic": "/ˈwɔːtə bɒtl/",
          "syllables": "wa·ter·bo·ttle",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "水瓶"
          ],
          "phrases": [],
          "example": "This is my water bottle.",
          "memoryTip": "water+bottle水瓶"
        },
        {
          "word": "bike",
          "phonetic": "/baɪk/",
          "syllables": "bike",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "自行车"
          ],
          "phrases": [],
          "example": "There is a bike.",
          "memoryTip": "bike自行车"
        },
        {
          "word": "photo",
          "phonetic": "/ˈfəʊtəʊ/",
          "syllables": "pho·to",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "照片"
          ],
          "phrases": [
            "take a photo 拍照"
          ],
          "example": "There is a photo.",
          "memoryTip": "pho-to照片"
        }
      ]
    },
    {
      "day": 10,
      "date": "9月10日",
      "unit": "U5",
      "words": [
        {
          "word": "front",
          "phonetic": "/frʌnt/",
          "syllables": "front",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "正面"
          ],
          "phrases": [
            "in front of 在...前面"
          ],
          "example": "It is in front of me.",
          "memoryTip": "front正面"
        },
        {
          "word": "above",
          "phonetic": "/əˈbʌv/",
          "syllables": "a·bove",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "在...上方"
          ],
          "phrases": [],
          "example": "It is above the desk.",
          "memoryTip": "a-bove在...上方"
        },
        {
          "word": "beside",
          "phonetic": "/bɪˈsaɪd/",
          "syllables": "be·side",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "在旁边"
          ],
          "phrases": [],
          "example": "It is beside the window.",
          "memoryTip": "be-side在旁边"
        },
        {
          "word": "between",
          "phonetic": "/bɪˈtwiːn/",
          "syllables": "be·tween",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "在中间"
          ],
          "phrases": [],
          "example": "It is between the desks.",
          "memoryTip": "be-tween在中间"
        },
        {
          "word": "behind",
          "phonetic": "/bɪˈhaɪnd/",
          "syllables": "be·hind",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "在后面"
          ],
          "phrases": [],
          "example": "It is behind the door.",
          "memoryTip": "be-hind在后面"
        },
        {
          "word": "there",
          "phonetic": "/ðeə/",
          "syllables": "there",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "那里"
          ],
          "phrases": [
            "there is 有"
          ],
          "example": "There is a book.",
          "memoryTip": "there那里"
        }
      ]
    },
    {
      "day": 11,
      "date": "9月11日",
      "unit": "U6",
      "words": [
        {
          "word": "river",
          "phonetic": "/ˈrɪvə/",
          "syllables": "ri·ver",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "河"
          ],
          "phrases": [],
          "example": "There is a river.",
          "memoryTip": "ri-ver河"
        },
        {
          "word": "lake",
          "phonetic": "/leɪk/",
          "syllables": "lake",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "湖"
          ],
          "phrases": [],
          "example": "There is a lake.",
          "memoryTip": "lake湖"
        },
        {
          "word": "mountain",
          "phonetic": "/ˈmaʊntən/",
          "syllables": "moun·tain",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "山"
          ],
          "phrases": [],
          "example": "There are mountains.",
          "memoryTip": "moun-tain山"
        },
        {
          "word": "hill",
          "phonetic": "/hɪl/",
          "syllables": "hill",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "小山"
          ],
          "phrases": [],
          "example": "There is a hill.",
          "memoryTip": "hill小山"
        },
        {
          "word": "tree",
          "phonetic": "/triː/",
          "syllables": "tree",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "树"
          ],
          "phrases": [],
          "example": "There are trees.",
          "memoryTip": "tree树"
        },
        {
          "word": "bridge",
          "phonetic": "/brɪdʒ/",
          "syllables": "bridge",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "桥"
          ],
          "phrases": [],
          "example": "There is a bridge.",
          "memoryTip": "bridge桥"
        }
      ]
    },
    {
      "day": 12,
      "date": "9月12日",
      "unit": "U6",
      "words": [
        {
          "word": "building",
          "phonetic": "/ˈbɪldɪŋ/",
          "syllables": "buil·ding",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "建筑物"
          ],
          "phrases": [],
          "example": "There are buildings.",
          "memoryTip": "buil-ding建筑物"
        },
        {
          "word": "village",
          "phonetic": "/ˈvɪlɪdʒ/",
          "syllables": "vil·lage",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "村庄"
          ],
          "phrases": [],
          "example": "It is a small village.",
          "memoryTip": "vil-lage村庄"
        },
        {
          "word": "house",
          "phonetic": "/haʊs/",
          "syllables": "house",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "房子"
          ],
          "phrases": [],
          "example": "There is a house.",
          "memoryTip": "house房子"
        },
        {
          "word": "road",
          "phonetic": "/rəʊd/",
          "syllables": "road",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "路"
          ],
          "phrases": [],
          "example": "There is a road.",
          "memoryTip": "road路"
        },
        {
          "word": "go boating",
          "phonetic": "/ɡəʊ ˈbəʊtɪŋ/",
          "syllables": "go·boa·ting",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "去划船"
          ],
          "phrases": [],
          "example": "Let us go boating.",
          "memoryTip": "go+boating去划船"
        },
        {
          "word": "nature",
          "phonetic": "/ˈneɪtʃə/",
          "syllables": "na·ture",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "自然界"
          ],
          "phrases": [],
          "example": "The nature park is nice.",
          "memoryTip": "na-ture自然界"
        }
      ]
    }
  ]
};
export const semester_5a = sem_5a_data as SemesterPlan;

// ===== 五年级下册 =====
const sem_5b_data = {
  "key": "5b",
  "name": "五年级下册",
  "grade": "五年级",
  "term": "下册",
  "startMonth": 3,
  "days": [
    {
      "day": 1,
      "date": "3月1日",
      "unit": "U1",
      "words": [
        {
          "word": "eat breakfast",
          "phonetic": "/iːt ˈbrekfəst/",
          "syllables": "eat·break·fast",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "吃早餐"
          ],
          "phrases": [],
          "example": "I eat breakfast at 7.",
          "memoryTip": "eat+breakfast吃早餐"
        },
        {
          "word": "eat lunch",
          "phonetic": "/iːt lʌntʃ/",
          "syllables": "eat·lunch",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "吃午餐"
          ],
          "phrases": [],
          "example": "I eat lunch at school.",
          "memoryTip": "eat+lunch吃午餐"
        },
        {
          "word": "eat dinner",
          "phonetic": "/iːt ˈdɪnə/",
          "syllables": "eat·din·ner",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "吃晚餐"
          ],
          "phrases": [],
          "example": "I eat dinner at home.",
          "memoryTip": "eat+dinner吃晚餐"
        },
        {
          "word": "have English class",
          "phonetic": "/hæv ˈɪŋɡlɪʃ klɑːs/",
          "syllables": "have·Eng·lish·class",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "上英语课"
          ],
          "phrases": [],
          "example": "I have English class.",
          "memoryTip": "have+English+class上英语课"
        },
        {
          "word": "play sports",
          "phonetic": "/pleɪ spɔːts/",
          "syllables": "play·sports",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "做运动"
          ],
          "phrases": [],
          "example": "I play sports.",
          "memoryTip": "play+sports做运动"
        },
        {
          "word": "exercise",
          "phonetic": "/ˈeksəsaɪz/",
          "syllables": "ex·er·cise",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "活动"
          ],
          "phrases": [],
          "example": "I do exercise.",
          "memoryTip": "ex-er-cise活动"
        }
      ]
    },
    {
      "day": 2,
      "date": "3月2日",
      "unit": "U1",
      "words": [
        {
          "word": "do morning exercises",
          "phonetic": "/duː ˈmɔːnɪŋ ˈeksəsaɪzɪz/",
          "syllables": "do·mor·ning·ex·er·ci·ses",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "做早操"
          ],
          "phrases": [],
          "example": "I do morning exercises.",
          "memoryTip": "do+morning+exercises做早操"
        },
        {
          "word": "do homework",
          "phonetic": "/duː ˈhəʊmwɜːk/",
          "syllables": "do·home·work",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "做作业"
          ],
          "phrases": [],
          "example": "I do homework.",
          "memoryTip": "do+homework做作业"
        },
        {
          "word": "clean my room",
          "phonetic": "/kliːn maɪ ruːm/",
          "syllables": "clean·my·room",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "打扫房间"
          ],
          "phrases": [],
          "example": "I clean my room.",
          "memoryTip": "clean+my+room打扫房间"
        },
        {
          "word": "go for a walk",
          "phonetic": "/ɡəʊ fɔː ə wɔːk/",
          "syllables": "go·for·a·walk",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "散步"
          ],
          "phrases": [],
          "example": "I go for a walk.",
          "memoryTip": "go+for+a+walk散步"
        },
        {
          "word": "go shopping",
          "phonetic": "/ɡəʊ ˈʃɒpɪŋ/",
          "syllables": "go·shop·ping",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "去买东西"
          ],
          "phrases": [],
          "example": "I go shopping.",
          "memoryTip": "go+shopping去购物"
        },
        {
          "word": "take",
          "phonetic": "/teɪk/",
          "syllables": "take",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "上（课）"
          ],
          "phrases": [],
          "example": "I take a dancing class.",
          "memoryTip": "take上"
        }
      ]
    },
    {
      "day": 3,
      "date": "3月3日",
      "unit": "U2",
      "words": [
        {
          "word": "spring",
          "phonetic": "/sprɪŋ/",
          "syllables": "spring",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "春天"
          ],
          "phrases": [],
          "example": "I like spring.",
          "memoryTip": "spring春天"
        },
        {
          "word": "summer",
          "phonetic": "/ˈsʌmə/",
          "syllables": "sum·mer",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "夏天"
          ],
          "phrases": [],
          "example": "I like summer.",
          "memoryTip": "sum-mer夏天"
        },
        {
          "word": "autumn",
          "phonetic": "/ˈɔːtəm/",
          "syllables": "au·tumn",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "秋天"
          ],
          "phrases": [],
          "example": "I like autumn.",
          "memoryTip": "au-tumn秋天"
        },
        {
          "word": "winter",
          "phonetic": "/ˈwɪntə/",
          "syllables": "win·ter",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "冬天"
          ],
          "phrases": [],
          "example": "I like winter.",
          "memoryTip": "win-ter冬天"
        },
        {
          "word": "season",
          "phonetic": "/ˈsiːzn/",
          "syllables": "sea·son",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "季节"
          ],
          "phrases": [],
          "example": "My favourite season is spring.",
          "memoryTip": "sea-son季节"
        },
        {
          "word": "which",
          "phonetic": "/wɪtʃ/",
          "syllables": "which",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "哪一个"
          ],
          "phrases": [],
          "example": "Which season do you like?",
          "memoryTip": "which哪一个"
        }
      ]
    },
    {
      "day": 4,
      "date": "3月4日",
      "unit": "U2",
      "words": [
        {
          "word": "best",
          "phonetic": "/best/",
          "syllables": "best",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "最"
          ],
          "phrases": [],
          "example": "I like spring best.",
          "memoryTip": "best最"
        },
        {
          "word": "snow",
          "phonetic": "/snəʊ/",
          "syllables": "snow",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "雪"
          ],
          "phrases": [
            "play in the snow 玩雪"
          ],
          "example": "I like snow.",
          "memoryTip": "snow雪"
        },
        {
          "word": "good job",
          "phonetic": "/ɡʊd dʒɒb/",
          "syllables": "good·job",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "做得好"
          ],
          "phrases": [],
          "example": "Good job!",
          "memoryTip": "good+job做得好"
        },
        {
          "word": "leaf",
          "phonetic": "/liːf/",
          "syllables": "leaf",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "叶子"
          ],
          "phrases": [],
          "example": "The leaves fall.",
          "memoryTip": "leaf叶子"
        },
        {
          "word": "fall",
          "phonetic": "/fɔːl/",
          "syllables": "fall",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "秋天"
          ],
          "phrases": [],
          "example": "Leaves fall in fall.",
          "memoryTip": "fall秋天"
        },
        {
          "word": "paint",
          "phonetic": "/peɪnt/",
          "syllables": "paint",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "用颜料绘画"
          ],
          "phrases": [],
          "example": "Let us paint.",
          "memoryTip": "paint绘画"
        }
      ]
    },
    {
      "day": 5,
      "date": "3月5日",
      "unit": "U3",
      "words": [
        {
          "word": "January",
          "phonetic": "/ˈdʒænjuəri/",
          "syllables": "Ja·nua·ry",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "一月"
          ],
          "phrases": [],
          "example": "My birthday is in January.",
          "memoryTip": "Ja-nua-ry一月"
        },
        {
          "word": "February",
          "phonetic": "/ˈfebruəri/",
          "syllables": "Fe·brua·ry",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "二月"
          ],
          "phrases": [],
          "example": "My birthday is in February.",
          "memoryTip": "Fe-brua-ry二月"
        },
        {
          "word": "March",
          "phonetic": "/mɑːtʃ/",
          "syllables": "March",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "三月"
          ],
          "phrases": [],
          "example": "My birthday is in March.",
          "memoryTip": "March三月"
        },
        {
          "word": "April",
          "phonetic": "/ˈeɪprəl/",
          "syllables": "A·pril",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "四月"
          ],
          "phrases": [],
          "example": "My birthday is in April.",
          "memoryTip": "A-pril四月"
        },
        {
          "word": "May",
          "phonetic": "/meɪ/",
          "syllables": "May",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "五月"
          ],
          "phrases": [],
          "example": "My birthday is in May.",
          "memoryTip": "May五月"
        },
        {
          "word": "June",
          "phonetic": "/dʒuːn/",
          "syllables": "June",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "六月"
          ],
          "phrases": [],
          "example": "My birthday is in June.",
          "memoryTip": "June六月"
        }
      ]
    },
    {
      "day": 6,
      "date": "3月6日",
      "unit": "U3",
      "words": [
        {
          "word": "July",
          "phonetic": "/dʒuˈlaɪ/",
          "syllables": "Ju·ly",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "七月"
          ],
          "phrases": [],
          "example": "My birthday is in July.",
          "memoryTip": "Ju-ly七月"
        },
        {
          "word": "August",
          "phonetic": "/ˈɔːɡəst/",
          "syllables": "Au·gust",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "八月"
          ],
          "phrases": [],
          "example": "My birthday is in August.",
          "memoryTip": "Au-gust八月"
        },
        {
          "word": "September",
          "phonetic": "/sepˈtembə/",
          "syllables": "Sep·tem·ber",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "九月"
          ],
          "phrases": [],
          "example": "School starts in September.",
          "memoryTip": "Sep-tem-ber九月"
        },
        {
          "word": "October",
          "phonetic": "/ɒkˈtəʊbə/",
          "syllables": "Oc·to·ber",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "十月"
          ],
          "phrases": [],
          "example": "My birthday is in October.",
          "memoryTip": "Oc-to-ber十月"
        },
        {
          "word": "November",
          "phonetic": "/nəʊˈvembə/",
          "syllables": "No·vem·ber",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "十一月"
          ],
          "phrases": [],
          "example": "My birthday is in November.",
          "memoryTip": "No-vem-ber十一月"
        },
        {
          "word": "December",
          "phonetic": "/dɪˈsembə/",
          "syllables": "De·cem·ber",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "十二月"
          ],
          "phrases": [],
          "example": "My birthday is in December.",
          "memoryTip": "De-cem-ber十二月"
        }
      ]
    },
    {
      "day": 7,
      "date": "3月7日",
      "unit": "U4",
      "words": [
        {
          "word": "first",
          "phonetic": "/fɜːst/",
          "syllables": "first",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第一"
          ],
          "phrases": [],
          "example": "January is the first month.",
          "memoryTip": "first第一"
        },
        {
          "word": "second",
          "phonetic": "/ˈsekənd/",
          "syllables": "se·cond",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第二"
          ],
          "phrases": [],
          "example": "February is the second month.",
          "memoryTip": "se-cond第二"
        },
        {
          "word": "third",
          "phonetic": "/θɜːd/",
          "syllables": "third",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第三"
          ],
          "phrases": [],
          "example": "March is the third month.",
          "memoryTip": "third第三"
        },
        {
          "word": "fifth",
          "phonetic": "/fɪfθ/",
          "syllables": "fifth",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第五"
          ],
          "phrases": [],
          "example": "May is the fifth month.",
          "memoryTip": "fifth第五"
        },
        {
          "word": "twelfth",
          "phonetic": "/twelfθ/",
          "syllables": "twelfth",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第十二"
          ],
          "phrases": [],
          "example": "December is the twelfth month.",
          "memoryTip": "twelfth第十二"
        },
        {
          "word": "twentieth",
          "phonetic": "/ˈtwentiəθ/",
          "syllables": "twen·ti·eth",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第二十"
          ],
          "phrases": [],
          "example": "The twentieth is my birthday.",
          "memoryTip": "twen-ti-eth第二十"
        }
      ]
    },
    {
      "day": 8,
      "date": "3月8日",
      "unit": "U4",
      "words": [
        {
          "word": "twenty-first",
          "phonetic": "/ˌtwenti ˈfɜːst/",
          "syllables": "twen·ty·first",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第二十一"
          ],
          "phrases": [],
          "example": "It is on July 21st.",
          "memoryTip": "twen-ty-first第二十一"
        },
        {
          "word": "twenty-third",
          "phonetic": "/ˌtwenti ˈθɜːd/",
          "syllables": "twen·ty·third",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第二十三"
          ],
          "phrases": [],
          "example": "It is on August 23rd.",
          "memoryTip": "twen-ty-third第二十三"
        },
        {
          "word": "thirtieth",
          "phonetic": "/ˈθɜːtiəθ/",
          "syllables": "thir·ti·eth",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "第三十"
          ],
          "phrases": [],
          "example": "It is on April 30th.",
          "memoryTip": "thir-ti-eth第三十"
        },
        {
          "word": "date",
          "phonetic": "/deɪt/",
          "syllables": "date",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "日期"
          ],
          "phrases": [],
          "example": "What is the date?",
          "memoryTip": "date日期"
        },
        {
          "word": "when",
          "phonetic": "/wen/",
          "syllables": "when",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "什么时候"
          ],
          "phrases": [],
          "example": "When is your birthday?",
          "memoryTip": "when什么时候"
        },
        {
          "word": "both",
          "phonetic": "/bəʊθ/",
          "syllables": "both",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "两个都"
          ],
          "phrases": [],
          "example": "We both like PE.",
          "memoryTip": "both两个都"
        }
      ]
    },
    {
      "day": 9,
      "date": "3月9日",
      "unit": "U5",
      "words": [
        {
          "word": "mine",
          "phonetic": "/maɪn/",
          "syllables": "mine",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "我的"
          ],
          "phrases": [],
          "example": "This book is mine.",
          "memoryTip": "mine我的"
        },
        {
          "word": "yours",
          "phonetic": "/jɔːz/",
          "syllables": "yours",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "你的"
          ],
          "phrases": [],
          "example": "That book is yours.",
          "memoryTip": "yours你的"
        },
        {
          "word": "his",
          "phonetic": "/hɪz/",
          "syllables": "his",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "他的"
          ],
          "phrases": [],
          "example": "This pen is his.",
          "memoryTip": "his他的"
        },
        {
          "word": "hers",
          "phonetic": "/hɜːz/",
          "syllables": "hers",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "她的"
          ],
          "phrases": [],
          "example": "That pen is hers.",
          "memoryTip": "hers她的"
        },
        {
          "word": "theirs",
          "phonetic": "/ðeəz/",
          "syllables": "theirs",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "他们的"
          ],
          "phrases": [],
          "example": "These books are theirs.",
          "memoryTip": "theirs他们的"
        },
        {
          "word": "ours",
          "phonetic": "/ˈaʊəz/",
          "syllables": "ours",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "我们的"
          ],
          "phrases": [],
          "example": "This classroom is ours.",
          "memoryTip": "ours我们的"
        }
      ]
    },
    {
      "day": 10,
      "date": "3月10日",
      "unit": "U5",
      "words": [
        {
          "word": "climbing",
          "phonetic": "/ˈklaɪmɪŋ/",
          "syllables": "climb·ing",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "攀爬"
          ],
          "phrases": [],
          "example": "I like climbing.",
          "memoryTip": "climb+ing攀爬"
        },
        {
          "word": "eating",
          "phonetic": "/ˈiːtɪŋ/",
          "syllables": "eat·ing",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "吃"
          ],
          "phrases": [],
          "example": "The cat is eating.",
          "memoryTip": "eat+ing吃"
        },
        {
          "word": "playing",
          "phonetic": "/ˈpleɪɪŋ/",
          "syllables": "play·ing",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "玩"
          ],
          "phrases": [],
          "example": "The dog is playing.",
          "memoryTip": "play+ing玩"
        },
        {
          "word": "jumping",
          "phonetic": "/ˈdʒʌmpɪŋ/",
          "syllables": "jump·ing",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "跳"
          ],
          "phrases": [],
          "example": "The rabbit is jumping.",
          "memoryTip": "jump+ing跳"
        },
        {
          "word": "drinking",
          "phonetic": "/ˈdrɪŋkɪŋ/",
          "syllables": "drink·ing",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "喝"
          ],
          "phrases": [],
          "example": "The elephant is drinking.",
          "memoryTip": "drink+ing喝"
        },
        {
          "word": "sleeping",
          "phonetic": "/ˈsliːpɪŋ/",
          "syllables": "sleep·ing",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "睡觉"
          ],
          "phrases": [],
          "example": "The cat is sleeping.",
          "memoryTip": "sleep+ing睡觉"
        }
      ]
    },
    {
      "day": 11,
      "date": "3月11日",
      "unit": "U6",
      "words": [
        {
          "word": "keep",
          "phonetic": "/kiːp/",
          "syllables": "keep",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "保持"
          ],
          "phrases": [
            "keep clean 保持干净"
          ],
          "example": "Keep your desk clean.",
          "memoryTip": "keep保持"
        },
        {
          "word": "turn",
          "phonetic": "/tɜːn/",
          "syllables": "turn",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "顺序"
          ],
          "phrases": [
            "turn right 向右转"
          ],
          "example": "Take turns.",
          "memoryTip": "turn顺序"
        },
        {
          "word": "show",
          "phonetic": "/ʃəʊ/",
          "syllables": "show",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "给人看"
          ],
          "phrases": [],
          "example": "Show me your book.",
          "memoryTip": "show展示"
        },
        {
          "word": "anything",
          "phonetic": "/ˈeniθɪŋ/",
          "syllables": "a·ny·thing",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "任何事情"
          ],
          "phrases": [],
          "example": "Do not eat anything.",
          "memoryTip": "a-ny-thing任何事情"
        },
        {
          "word": "else",
          "phonetic": "/els/",
          "syllables": "else",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "另外"
          ],
          "phrases": [],
          "example": "What else?",
          "memoryTip": "else另外"
        },
        {
          "word": "excited",
          "phonetic": "/ɪkˈsaɪtɪd/",
          "syllables": "ex·ci·ted",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "兴奋的"
          ],
          "phrases": [],
          "example": "I am excited.",
          "memoryTip": "ex-ci-ted兴奋的"
        }
      ]
    },
    {
      "day": 12,
      "date": "3月12日",
      "unit": "U6",
      "words": [
        {
          "word": "like",
          "phonetic": "/laɪk/",
          "syllables": "like",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "像"
          ],
          "phrases": [],
          "example": "It is like a bird.",
          "memoryTip": "like像"
        },
        {
          "word": "drink",
          "phonetic": "/drɪŋk/",
          "syllables": "drink",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "喝"
          ],
          "phrases": [],
          "example": "Drink some water.",
          "memoryTip": "drink喝"
        },
        {
          "word": "hooray",
          "phonetic": "/huˈreɪ/",
          "syllables": "hoo·ray",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "好哇"
          ],
          "phrases": [],
          "example": "Hooray!",
          "memoryTip": "hoo-ray好哇"
        },
        {
          "word": "quiet",
          "phonetic": "/ˈkwaɪət/",
          "syllables": "qui·et",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "安静的"
          ],
          "phrases": [],
          "example": "Be quiet!",
          "memoryTip": "qui-et安静的"
        },
        {
          "word": "made",
          "phonetic": "/meɪd/",
          "syllables": "made",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "做"
          ],
          "phrases": [],
          "example": "He made a robot.",
          "memoryTip": "made做"
        },
        {
          "word": "cute",
          "phonetic": "/kjuːt/",
          "syllables": "cute",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "可爱的"
          ],
          "phrases": [],
          "example": "What a cute dog!",
          "memoryTip": "cute可爱的"
        }
      ]
    }
  ]
};
export const semester_5b = sem_5b_data as SemesterPlan;

// ===== 六年级上册 =====
const sem_6a_data = {
  "key": "6a",
  "name": "六年级上册",
  "grade": "六年级",
  "term": "上册",
  "startMonth": 9,
  "days": [
    {
      "day": 1,
      "date": "9月1日",
      "unit": "U1",
      "words": [
        {
          "word": "science",
          "phonetic": "/ˈsaɪəns/",
          "syllables": "sci·ence",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "科学"
          ],
          "phrases": [
            "science museum 科学博物馆"
          ],
          "example": "I like science.",
          "memoryTip": "sci-ence科学"
        },
        {
          "word": "museum",
          "phonetic": "/mjuˈziːəm/",
          "syllables": "mu·se·um",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "博物馆"
          ],
          "phrases": [],
          "example": "Let us go to the museum.",
          "memoryTip": "mu-se-um博物馆"
        },
        {
          "word": "post office",
          "phonetic": "/ˈpəʊst ˈɒfɪs/",
          "syllables": "post·o·ffice",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "邮局"
          ],
          "phrases": [],
          "example": "Where is the post office?",
          "memoryTip": "post+office邮局"
        },
        {
          "word": "bookstore",
          "phonetic": "/ˈbʊkstɔː/",
          "syllables": "book·store",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "书店"
          ],
          "phrases": [],
          "example": "Where is the bookstore?",
          "memoryTip": "book+store书店"
        },
        {
          "word": "cinema",
          "phonetic": "/ˈsɪnəmə/",
          "syllables": "ci·ne·ma",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "电影院"
          ],
          "phrases": [],
          "example": "Let us go to the cinema.",
          "memoryTip": "ci-ne-ma电影院"
        },
        {
          "word": "hospital",
          "phonetic": "/ˈhɒspɪtl/",
          "syllables": "hos·pi·tal",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "医院"
          ],
          "phrases": [],
          "example": "Where is the hospital?",
          "memoryTip": "hos-pi-tal医院"
        }
      ]
    },
    {
      "day": 2,
      "date": "9月2日",
      "unit": "U1",
      "words": [
        {
          "word": "crossing",
          "phonetic": "/ˈkrɒsɪŋ/",
          "syllables": "cros·sing",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "十字路口"
          ],
          "phrases": [],
          "example": "Turn left at the crossing.",
          "memoryTip": "cros-sing十字路口"
        },
        {
          "word": "turn",
          "phonetic": "/tɜːn/",
          "syllables": "turn",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "转弯"
          ],
          "phrases": [],
          "example": "Turn left here.",
          "memoryTip": "turn转弯"
        },
        {
          "word": "left",
          "phonetic": "/left/",
          "syllables": "left",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "左"
          ],
          "phrases": [],
          "example": "Turn left.",
          "memoryTip": "left左"
        },
        {
          "word": "right",
          "phonetic": "/raɪt/",
          "syllables": "right",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "右"
          ],
          "phrases": [],
          "example": "Turn right.",
          "memoryTip": "right右"
        },
        {
          "word": "straight",
          "phonetic": "/streɪt/",
          "syllables": "straight",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "笔直地"
          ],
          "phrases": [],
          "example": "Go straight.",
          "memoryTip": "straight笔直地"
        },
        {
          "word": "ask",
          "phonetic": "/ɑːsk/",
          "syllables": "ask",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "问"
          ],
          "phrases": [],
          "example": "Ask the policeman.",
          "memoryTip": "ask问"
        }
      ]
    },
    {
      "day": 3,
      "date": "9月3日",
      "unit": "U2",
      "words": [
        {
          "word": "on foot",
          "phonetic": "/ɒn fʊt/",
          "syllables": "on·foot",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "步行"
          ],
          "phrases": [],
          "example": "I come on foot.",
          "memoryTip": "on+foot步行"
        },
        {
          "word": "by",
          "phonetic": "/baɪ/",
          "syllables": "by",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "乘"
          ],
          "phrases": [],
          "example": "I come by bus.",
          "memoryTip": "by乘"
        },
        {
          "word": "bus",
          "phonetic": "/bʌs/",
          "syllables": "bus",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "公共汽车"
          ],
          "phrases": [],
          "example": "I take a bus.",
          "memoryTip": "bus公共汽车"
        },
        {
          "word": "plane",
          "phonetic": "/pleɪn/",
          "syllables": "plane",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "飞机"
          ],
          "phrases": [],
          "example": "I go by plane.",
          "memoryTip": "plane飞机"
        },
        {
          "word": "taxi",
          "phonetic": "/ˈtæksi/",
          "syllables": "ta·xi",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "出租汽车"
          ],
          "phrases": [],
          "example": "I take a taxi.",
          "memoryTip": "ta-xi出租车"
        },
        {
          "word": "ship",
          "phonetic": "/ʃɪp/",
          "syllables": "ship",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "轮船"
          ],
          "phrases": [],
          "example": "I go by ship.",
          "memoryTip": "ship轮船"
        }
      ]
    },
    {
      "day": 4,
      "date": "9月4日",
      "unit": "U2",
      "words": [
        {
          "word": "subway",
          "phonetic": "/ˈsʌbweɪ/",
          "syllables": "sub·way",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "地铁"
          ],
          "phrases": [],
          "example": "I go by subway.",
          "memoryTip": "sub+way地铁"
        },
        {
          "word": "train",
          "phonetic": "/treɪn/",
          "syllables": "train",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "火车"
          ],
          "phrases": [],
          "example": "I go by train.",
          "memoryTip": "train火车"
        },
        {
          "word": "slow",
          "phonetic": "/sləʊ/",
          "syllables": "slow",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "慢的"
          ],
          "phrases": [],
          "example": "The bus is slow.",
          "memoryTip": "slow慢的"
        },
        {
          "word": "down",
          "phonetic": "/daʊn/",
          "syllables": "down",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "降低"
          ],
          "phrases": [],
          "example": "Slow down.",
          "memoryTip": "down降低"
        },
        {
          "word": "slow down",
          "phonetic": "/sləʊ daʊn/",
          "syllables": "slow·down",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "慢下来"
          ],
          "phrases": [],
          "example": "Slow down, please.",
          "memoryTip": "slow+down慢下来"
        },
        {
          "word": "stop",
          "phonetic": "/stɒp/",
          "syllables": "stop",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "停下"
          ],
          "phrases": [
            "bus stop 公交站"
          ],
          "example": "Stop at the light.",
          "memoryTip": "stop停下"
        }
      ]
    },
    {
      "day": 5,
      "date": "9月5日",
      "unit": "U3",
      "words": [
        {
          "word": "visit",
          "phonetic": "/ˈvɪzɪt/",
          "syllables": "vi·sit",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "拜访"
          ],
          "phrases": [],
          "example": "I am going to visit.",
          "memoryTip": "vi-sit拜访"
        },
        {
          "word": "film",
          "phonetic": "/fɪlm/",
          "syllables": "film",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "电影"
          ],
          "phrases": [],
          "example": "I am going to see a film.",
          "memoryTip": "film电影"
        },
        {
          "word": "see a film",
          "phonetic": "/siː ə fɪlm/",
          "syllables": "see·a·film",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "看电影"
          ],
          "phrases": [],
          "example": "Let us see a film.",
          "memoryTip": "see+a+film看电影"
        },
        {
          "word": "trip",
          "phonetic": "/trɪp/",
          "syllables": "trip",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "旅行"
          ],
          "phrases": [],
          "example": "I am going on a trip.",
          "memoryTip": "trip旅行"
        },
        {
          "word": "take a trip",
          "phonetic": "/teɪk ə trɪp/",
          "syllables": "take·a·trip",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "去旅行"
          ],
          "phrases": [],
          "example": "I am going to take a trip.",
          "memoryTip": "take+a+trip去旅行"
        },
        {
          "word": "supermarket",
          "phonetic": "/ˈsuːpəmɑːkɪt/",
          "syllables": "su·per·mar·ket",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "超市"
          ],
          "phrases": [],
          "example": "I am going to the supermarket.",
          "memoryTip": "su-per-mar-ket超市"
        }
      ]
    },
    {
      "day": 6,
      "date": "9月6日",
      "unit": "U3",
      "words": [
        {
          "word": "evening",
          "phonetic": "/ˈiːvnɪŋ/",
          "syllables": "eve·ning",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "晚上"
          ],
          "phrases": [],
          "example": "I am going this evening.",
          "memoryTip": "eve-ning晚上"
        },
        {
          "word": "tonight",
          "phonetic": "/təˈnaɪt/",
          "syllables": "to·night",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "在今晚"
          ],
          "phrases": [],
          "example": "I am going tonight.",
          "memoryTip": "to+night今晚"
        },
        {
          "word": "next week",
          "phonetic": "/ˈnekst wiːk/",
          "syllables": "next·week",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "下周"
          ],
          "phrases": [],
          "example": "I am going next week.",
          "memoryTip": "next+week下周"
        },
        {
          "word": "tomorrow",
          "phonetic": "/təˈmɒrəʊ/",
          "syllables": "to·mor·row",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "明天"
          ],
          "phrases": [],
          "example": "I am going tomorrow.",
          "memoryTip": "to-mor-row明天"
        },
        {
          "word": "dictionary",
          "phonetic": "/ˈdɪkʃənri/",
          "syllables": "dic·tio·na·ry",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "词典"
          ],
          "phrases": [],
          "example": "I need a dictionary.",
          "memoryTip": "dic-tio-na-ry词典"
        },
        {
          "word": "comic",
          "phonetic": "/ˈkɒmɪk/",
          "syllables": "co·mic",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "滑稽的"
          ],
          "phrases": [],
          "example": "I like comic books.",
          "memoryTip": "co-mic滑稽的"
        }
      ]
    },
    {
      "day": 7,
      "date": "9月7日",
      "unit": "U4",
      "words": [
        {
          "word": "word",
          "phonetic": "/wɜːd/",
          "syllables": "word",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "单词"
          ],
          "phrases": [],
          "example": "Learn these words.",
          "memoryTip": "word单词"
        },
        {
          "word": "puzzle",
          "phonetic": "/ˈpʌzl/",
          "syllables": "puz·zle",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "谜"
          ],
          "phrases": [],
          "example": "I like puzzles.",
          "memoryTip": "puz-zle谜"
        },
        {
          "word": "hiking",
          "phonetic": "/ˈhaɪkɪŋ/",
          "syllables": "hi·king",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "远足"
          ],
          "phrases": [],
          "example": "I like hiking.",
          "memoryTip": "hi-king远足"
        },
        {
          "word": "goal",
          "phonetic": "/ɡəʊl/",
          "syllables": "goal",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "射门"
          ],
          "phrases": [],
          "example": "He scores a goal.",
          "memoryTip": "goal射门"
        },
        {
          "word": "join",
          "phonetic": "/dʒɔɪn/",
          "syllables": "join",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "加入"
          ],
          "phrases": [],
          "example": "Join our club!",
          "memoryTip": "join加入"
        },
        {
          "word": "club",
          "phonetic": "/klʌb/",
          "syllables": "club",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "俱乐部"
          ],
          "phrases": [],
          "example": "Join our club.",
          "memoryTip": "club俱乐部"
        }
      ]
    },
    {
      "day": 8,
      "date": "9月8日",
      "unit": "U4",
      "words": [
        {
          "word": "share",
          "phonetic": "/ʃeə/",
          "syllables": "share",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "分享"
          ],
          "phrases": [],
          "example": "We share books.",
          "memoryTip": "share分享"
        },
        {
          "word": "challenge",
          "phonetic": "/ˈtʃælɪndʒ/",
          "syllables": "chal·lenge",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "挑战"
          ],
          "phrases": [],
          "example": "I like a challenge.",
          "memoryTip": "chal-lenge挑战"
        },
        {
          "word": "different",
          "phonetic": "/ˈdɪfrənt/",
          "syllables": "di·ffe·rent",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "不同的"
          ],
          "phrases": [],
          "example": "We are different.",
          "memoryTip": "di-ffe-rent不同的"
        },
        {
          "word": "active",
          "phonetic": "/ˈæktɪv/",
          "syllables": "ac·tive",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "积极的"
          ],
          "phrases": [],
          "example": "He is active.",
          "memoryTip": "ac-tive积极的"
        },
        {
          "word": "together",
          "phonetic": "/təˈɡeðə/",
          "syllables": "to·ge·ther",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "一起"
          ],
          "phrases": [],
          "example": "Let us work together.",
          "memoryTip": "to-ge-ther一起"
        },
        {
          "word": " Studies",
          "phonetic": "/ˈstʌdiz/",
          "syllables": "stu·dies",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "学习"
          ],
          "phrases": [],
          "example": "He studies hard.",
          "memoryTip": "stu-dies学习"
        }
      ]
    },
    {
      "day": 9,
      "date": "9月9日",
      "unit": "U5",
      "words": [
        {
          "word": "angry",
          "phonetic": "/ˈæŋɡri/",
          "syllables": "an·gry",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "生气的"
          ],
          "phrases": [],
          "example": "He is angry.",
          "memoryTip": "an-gry生气的"
        },
        {
          "word": "afraid",
          "phonetic": "/əˈfreɪd/",
          "syllables": "a·fraid",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "害怕"
          ],
          "phrases": [],
          "example": "She is afraid.",
          "memoryTip": "a-fraid害怕"
        },
        {
          "word": "sad",
          "phonetic": "/sæd/",
          "syllables": "sad",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "难过的"
          ],
          "phrases": [],
          "example": "I am sad.",
          "memoryTip": "sad难过的"
        },
        {
          "word": "worried",
          "phonetic": "/ˈwʌrid/",
          "syllables": "wor·ried",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "担心的"
          ],
          "phrases": [],
          "example": "I am worried.",
          "memoryTip": "wor-ried担心的"
        },
        {
          "word": "happy",
          "phonetic": "/ˈhæpi/",
          "syllables": "ha·ppy",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "高兴的"
          ],
          "phrases": [],
          "example": "I am happy.",
          "memoryTip": "ha-ppy高兴的"
        },
        {
          "word": "ill",
          "phonetic": "/ɪl/",
          "syllables": "ill",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "有病"
          ],
          "phrases": [],
          "example": "He is ill.",
          "memoryTip": "ill有病"
        }
      ]
    },
    {
      "day": 10,
      "date": "9月10日",
      "unit": "U5",
      "words": [
        {
          "word": "wrong",
          "phonetic": "/rɒŋ/",
          "syllables": "wrong",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "有毛病"
          ],
          "phrases": [],
          "example": "What is wrong?",
          "memoryTip": "wrong有毛病"
        },
        {
          "word": "feel",
          "phonetic": "/fiːl/",
          "syllables": "feel",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "觉得"
          ],
          "phrases": [],
          "example": "I feel happy.",
          "memoryTip": "feel觉得"
        },
        {
          "word": "should",
          "phonetic": "/ʃʊd/",
          "syllables": "should",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "应该"
          ],
          "phrases": [],
          "example": "You should rest.",
          "memoryTip": "should应该"
        },
        {
          "word": "see a doctor",
          "phonetic": "/siː ə ˈdɒktə/",
          "syllables": "see·a·doc·tor",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "看病"
          ],
          "phrases": [],
          "example": "You should see a doctor.",
          "memoryTip": "see+a+doc-tor看病"
        },
        {
          "word": "wear",
          "phonetic": "/weə/",
          "syllables": "wear",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "穿"
          ],
          "phrases": [],
          "example": "Wear warm clothes.",
          "memoryTip": "wear穿"
        },
        {
          "word": "more",
          "phonetic": "/mɔː/",
          "syllables": "more",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "更多的"
          ],
          "phrases": [],
          "example": "Drink more water.",
          "memoryTip": "more更多的"
        }
      ]
    },
    {
      "day": 11,
      "date": "9月11日",
      "unit": "U6",
      "words": [
        {
          "word": "bread",
          "phonetic": "/bred/",
          "syllables": "bread",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "面包"
          ],
          "phrases": [],
          "example": "I would like some bread.",
          "memoryTip": "bread面包"
        },
        {
          "word": "hamburger",
          "phonetic": "/ˈhæmbɜːɡə/",
          "syllables": "ham·bur·ger",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "汉堡包"
          ],
          "phrases": [],
          "example": "I would like a hamburger.",
          "memoryTip": "ham-bur-ger汉堡包"
        },
        {
          "word": "salad",
          "phonetic": "/ˈsæləd/",
          "syllables": "sa·lad",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "沙拉"
          ],
          "phrases": [],
          "example": "I would like some salad.",
          "memoryTip": "sa-lad沙拉"
        },
        {
          "word": "soup",
          "phonetic": "/suːp/",
          "syllables": "soup",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "汤"
          ],
          "phrases": [],
          "example": "I would like some soup.",
          "memoryTip": "soup汤"
        },
        {
          "word": "ice cream",
          "phonetic": "/ˌaɪs ˈkriːm/",
          "syllables": "ice·cream",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "冰淇淋"
          ],
          "phrases": [],
          "example": "I would like ice cream.",
          "memoryTip": "ice+cream冰淇淋"
        },
        {
          "word": "spaghetti",
          "phonetic": "/spəˈɡeti/",
          "syllables": "spa·ghet·ti",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "意大利面"
          ],
          "phrases": [],
          "example": "I would like spaghetti.",
          "memoryTip": "spa-ghet-ti意大利面"
        }
      ]
    },
    {
      "day": 12,
      "date": "9月12日",
      "unit": "U6",
      "words": [
        {
          "word": "chicken",
          "phonetic": "/ˈtʃɪkɪn/",
          "syllables": "chick·en",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "鸡肉"
          ],
          "phrases": [],
          "example": "I would like some chicken.",
          "memoryTip": "chick+en鸡肉"
        },
        {
          "word": "onion",
          "phonetic": "/ˈʌnjən/",
          "syllables": "o·nion",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "洋葱"
          ],
          "phrases": [],
          "example": "I do not like onions.",
          "memoryTip": "o-nion洋葱"
        },
        {
          "word": "sandwich",
          "phonetic": "/ˈsænwɪtʃ/",
          "syllables": "sand·wich",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "三明治"
          ],
          "phrases": [],
          "example": "I would like a sandwich.",
          "memoryTip": "sand+wich三明治"
        },
        {
          "word": "pizza",
          "phonetic": "/ˈpiːtsə/",
          "syllables": "pi·zza",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "比萨饼"
          ],
          "phrases": [],
          "example": "I would like pizza.",
          "memoryTip": "pi-zza比萨饼"
        },
        {
          "word": "delicious",
          "phonetic": "/dɪˈlɪʃəs/",
          "syllables": "de·li·cious",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "美味的"
          ],
          "phrases": [],
          "example": "It is delicious.",
          "memoryTip": "de-li-cious美味的"
        },
        {
          "word": "sweet",
          "phonetic": "/swiːt/",
          "syllables": "sweet",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "甜的"
          ],
          "phrases": [],
          "example": "The cake is sweet.",
          "memoryTip": "sweet甜的"
        }
      ]
    }
  ]
};
export const semester_6a = sem_6a_data as SemesterPlan;

// ===== 六年级下册 =====
const sem_6b_data = {
  "key": "6b",
  "name": "六年级下册",
  "grade": "六年级",
  "term": "下册",
  "startMonth": 3,
  "days": [
    {
      "day": 1,
      "date": "3月1日",
      "unit": "U1",
      "words": [
        {
          "word": "taller",
          "phonetic": "/ˈtɔːlə/",
          "syllables": "tal·ler",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更高的"
          ],
          "phrases": [],
          "example": "I am taller.",
          "memoryTip": "tal+ler更高的"
        },
        {
          "word": "shorter",
          "phonetic": "/ˈʃɔːtə/",
          "syllables": "shor·ter",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更矮的"
          ],
          "phrases": [],
          "example": "I am shorter.",
          "memoryTip": "shor+ter更矮的"
        },
        {
          "word": "longer",
          "phonetic": "/ˈlɒŋɡə/",
          "syllables": "lon·ger",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更长的"
          ],
          "phrases": [],
          "example": "The line is longer.",
          "memoryTip": "lon+ger更长的"
        },
        {
          "word": "stronger",
          "phonetic": "/ˈstrɒŋɡə/",
          "syllables": "stron·ger",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更强壮的"
          ],
          "phrases": [],
          "example": "He is stronger.",
          "memoryTip": "stron+ger更强壮的"
        },
        {
          "word": "older",
          "phonetic": "/ˈəʊldə/",
          "syllables": "ol·der",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更年长的"
          ],
          "phrases": [],
          "example": "I am older.",
          "memoryTip": "ol+der更年长的"
        },
        {
          "word": "younger",
          "phonetic": "/ˈjʌŋɡə/",
          "syllables": "yon·ger",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更年轻的"
          ],
          "phrases": [],
          "example": "I am younger.",
          "memoryTip": "yon+ger更年轻的"
        }
      ]
    },
    {
      "day": 2,
      "date": "3月2日",
      "unit": "U1",
      "words": [
        {
          "word": "bigger",
          "phonetic": "/ˈbɪɡə/",
          "syllables": "big·ger",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更大的"
          ],
          "phrases": [],
          "example": "It is bigger.",
          "memoryTip": "big+ger更大的"
        },
        {
          "word": "smaller",
          "phonetic": "/ˈsmɔːlə/",
          "syllables": "smal·ler",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更小的"
          ],
          "phrases": [],
          "example": "It is smaller.",
          "memoryTip": "smal+ler更小的"
        },
        {
          "word": "metre",
          "phonetic": "/ˈmiːtə/",
          "syllables": "me·tre",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "米"
          ],
          "phrases": [],
          "example": "I am 1.5 metres.",
          "memoryTip": "me-tre米"
        },
        {
          "word": "kilogram",
          "phonetic": "/ˈkɪləɡræm/",
          "syllables": "ki·lo·gram",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "千克"
          ],
          "phrases": [],
          "example": "I am 40 kilograms.",
          "memoryTip": "ki-lo-gram千克"
        },
        {
          "word": "both",
          "phonetic": "/bəʊθ/",
          "syllables": "both",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "两个都"
          ],
          "phrases": [],
          "example": "We are both tall.",
          "memoryTip": "both两个都"
        },
        {
          "word": "size",
          "phonetic": "/saɪz/",
          "syllables": "size",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "号码"
          ],
          "phrases": [],
          "example": "What size?",
          "memoryTip": "size尺码"
        }
      ]
    },
    {
      "day": 3,
      "date": "3月3日",
      "unit": "U2",
      "words": [
        {
          "word": "cleaned",
          "phonetic": "/kliːnd/",
          "syllables": "cleaned",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "打扫"
          ],
          "phrases": [],
          "example": "I cleaned my room.",
          "memoryTip": "clean+ed打扫"
        },
        {
          "word": "stayed",
          "phonetic": "/steɪd/",
          "syllables": "stayed",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "停留"
          ],
          "phrases": [],
          "example": "I stayed at home.",
          "memoryTip": "stay+ed停留"
        },
        {
          "word": "washed",
          "phonetic": "/wɒʃt/",
          "syllables": "washed",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "洗"
          ],
          "phrases": [],
          "example": "I washed clothes.",
          "memoryTip": "wash+ed洗"
        },
        {
          "word": "watched",
          "phonetic": "/wɒtʃt/",
          "syllables": "watched",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "看"
          ],
          "phrases": [],
          "example": "I watched TV.",
          "memoryTip": "watch+ed看"
        },
        {
          "word": "had",
          "phonetic": "/hæd/",
          "syllables": "had",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "有"
          ],
          "phrases": [],
          "example": "I had a cold.",
          "memoryTip": "had有"
        },
        {
          "word": "slept",
          "phonetic": "/slept/",
          "syllables": "slept",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "睡觉"
          ],
          "phrases": [],
          "example": "I slept late.",
          "memoryTip": "slept睡觉"
        }
      ]
    },
    {
      "day": 4,
      "date": "3月4日",
      "unit": "U2",
      "words": [
        {
          "word": "read",
          "phonetic": "/red/",
          "syllables": "read",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "读"
          ],
          "phrases": [],
          "example": "I read a book.",
          "memoryTip": "read读"
        },
        {
          "word": "saw",
          "phonetic": "/sɔː/",
          "syllables": "saw",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "看见"
          ],
          "phrases": [],
          "example": "I saw a film.",
          "memoryTip": "saw看见"
        },
        {
          "word": "last",
          "phonetic": "/lɑːst/",
          "syllables": "last",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "最近的"
          ],
          "phrases": [],
          "example": "I went last week.",
          "memoryTip": "last最近的"
        },
        {
          "word": "yesterday",
          "phonetic": "/ˈjestədeɪ/",
          "syllables": "yes·ter·day",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "昨天"
          ],
          "phrases": [],
          "example": "I went yesterday.",
          "memoryTip": "yes-ter-day昨天"
        },
        {
          "word": "before",
          "phonetic": "/bɪˈfɔː/",
          "syllables": "be·fore",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "在...之前"
          ],
          "phrases": [],
          "example": "I went before.",
          "memoryTip": "be-fore之前"
        },
        {
          "word": "ago",
          "phonetic": "/əˈɡəʊ/",
          "syllables": "a·go",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "以前"
          ],
          "phrases": [],
          "example": "Two days ago.",
          "memoryTip": "a-go以前"
        }
      ]
    },
    {
      "day": 5,
      "date": "3月5日",
      "unit": "U3",
      "words": [
        {
          "word": "went",
          "phonetic": "/went/",
          "syllables": "went",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "去"
          ],
          "phrases": [],
          "example": "I went to Sanya.",
          "memoryTip": "went去"
        },
        {
          "word": "camp",
          "phonetic": "/kæmp/",
          "syllables": "camp",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "野营"
          ],
          "phrases": [
            "go camping 去野营"
          ],
          "example": "I went camping.",
          "memoryTip": "camp野营"
        },
        {
          "word": "went camping",
          "phonetic": "/went ˈkæmpɪŋ/",
          "syllables": "went·cam·ping",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "去野营"
          ],
          "phrases": [],
          "example": "I went camping.",
          "memoryTip": "went+camping去野营"
        },
        {
          "word": "fish",
          "phonetic": "/fɪʃ/",
          "syllables": "fish",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "钓鱼"
          ],
          "phrases": [],
          "example": "I went fishing.",
          "memoryTip": "fish钓鱼"
        },
        {
          "word": "went fishing",
          "phonetic": "/went ˈfɪʃɪŋ/",
          "syllables": "went·fi·shing",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "去钓鱼"
          ],
          "phrases": [],
          "example": "I went fishing.",
          "memoryTip": "went+fi-shing去钓鱼"
        },
        {
          "word": "rode",
          "phonetic": "/rəʊd/",
          "syllables": "rode",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "骑"
          ],
          "phrases": [],
          "example": "I rode a horse.",
          "memoryTip": "rode骑"
        }
      ]
    },
    {
      "day": 6,
      "date": "3月6日",
      "unit": "U3",
      "words": [
        {
          "word": "hurt",
          "phonetic": "/hɜːt/",
          "syllables": "hurt",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "受伤"
          ],
          "phrases": [],
          "example": "I hurt my foot.",
          "memoryTip": "hurt受伤"
        },
        {
          "word": "ate",
          "phonetic": "/et/",
          "syllables": "ate",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "吃"
          ],
          "phrases": [],
          "example": "I ate fresh food.",
          "memoryTip": "ate吃"
        },
        {
          "word": "took",
          "phonetic": "/tʊk/",
          "syllables": "took",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "拍照"
          ],
          "phrases": [],
          "example": "I took pictures.",
          "memoryTip": "took拍照"
        },
        {
          "word": "took pictures",
          "phonetic": "/tʊk ˈpɪktʃəz/",
          "syllables": "took·pic·tures",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "拍照"
          ],
          "phrases": [],
          "example": "I took lots of pictures.",
          "memoryTip": "took+pic-tures拍照"
        },
        {
          "word": "bought",
          "phonetic": "/bɔːt/",
          "syllables": "bought",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "买"
          ],
          "phrases": [],
          "example": "I bought gifts.",
          "memoryTip": "bought买"
        },
        {
          "word": "gift",
          "phonetic": "/ɡɪft/",
          "syllables": "gift",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "礼物"
          ],
          "phrases": [],
          "example": "I bought gifts.",
          "memoryTip": "gift礼物"
        }
      ]
    },
    {
      "day": 7,
      "date": "3月7日",
      "unit": "U4",
      "words": [
        {
          "word": "rode a bike",
          "phonetic": "/rəʊd ə baɪk/",
          "syllables": "rode·a·bike",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "骑自行车"
          ],
          "phrases": [],
          "example": "I rode a bike.",
          "memoryTip": "rode+a+bike骑自行车"
        },
        {
          "word": "went swimming",
          "phonetic": "/went ˈswɪmɪŋ/",
          "syllables": "went·swim·ming",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "去游泳"
          ],
          "phrases": [],
          "example": "I went swimming.",
          "memoryTip": "went+swim-ming去游泳"
        },
        {
          "word": "basket",
          "phonetic": "/ˈbɑːskɪt/",
          "syllables": "bas·ket",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "篮"
          ],
          "phrases": [],
          "example": "Put it in the basket.",
          "memoryTip": "bas-ket篮子"
        },
        {
          "word": "part",
          "phonetic": "/pɑːt/",
          "syllables": "part",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "角色"
          ],
          "phrases": [],
          "example": "I played a part.",
          "memoryTip": "part角色"
        },
        {
          "word": "licked",
          "phonetic": "/lɪkt/",
          "syllables": "licked",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "舔"
          ],
          "phrases": [],
          "example": "The dog licked me.",
          "memoryTip": "lick+ed舔"
        },
        {
          "word": "laughed",
          "phonetic": "/lɑːft/",
          "syllables": "laughed",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "笑"
          ],
          "phrases": [],
          "example": "We laughed.",
          "memoryTip": "laugh+ed笑"
        }
      ]
    },
    {
      "day": 8,
      "date": "3月8日",
      "unit": "U4",
      "words": [
        {
          "word": "fixed",
          "phonetic": "/fɪkst/",
          "syllables": "fixed",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "修理"
          ],
          "phrases": [],
          "example": "I fixed the bike.",
          "memoryTip": "fix+ed修理"
        },
        {
          "word": "could",
          "phonetic": "/kʊd/",
          "syllables": "could",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "能"
          ],
          "phrases": [],
          "example": "I could swim.",
          "memoryTip": "could能"
        },
        {
          "word": "till",
          "phonetic": "/tɪl/",
          "syllables": "till",
          "syllableColors": [],
          "pos": "prep.",
          "meanings": [
            "直到"
          ],
          "phrases": [],
          "example": "Wait till later.",
          "memoryTip": "till直到"
        },
        {
          "word": "beach",
          "phonetic": "/biːtʃ/",
          "syllables": "beach",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "海滩"
          ],
          "phrases": [],
          "example": "I went to the beach.",
          "memoryTip": "beach海滩"
        },
        {
          "word": "summer holiday",
          "phonetic": "/ˈsʌmə ˈhɒlədeɪ/",
          "syllables": "sum·mer·ho·li·day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "暑假"
          ],
          "phrases": [],
          "example": "Over the summer holiday.",
          "memoryTip": "sum-mer-ho-li-day暑假"
        },
        {
          "word": "Labour Day",
          "phonetic": "/ˈleɪbə deɪ/",
          "syllables": "La·bour·Day",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "劳动节"
          ],
          "phrases": [],
          "example": "On Labour Day.",
          "memoryTip": "La-bour-Day劳动节"
        }
      ]
    }
  ]
};
export const semester_6b = sem_6b_data as SemesterPlan;

// ===== 七年级上册 =====
const sem_7a_data = {
  "key": "7a",
  "name": "七年级上册",
  "grade": "七年级",
  "term": "上册",
  "startMonth": 9,
  "days": [
    {
      "day": 1,
      "date": "9月1日",
      "unit": "U1",
      "words": [
        {
          "word": "good",
          "phonetic": "/ɡʊd/",
          "syllables": "good",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "好的"
          ],
          "phrases": [],
          "example": "Good morning!",
          "memoryTip": "good好的"
        },
        {
          "word": "morning",
          "phonetic": "/ˈmɔːnɪŋ/",
          "syllables": "mor·ning",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "早晨"
          ],
          "phrases": [],
          "example": "Good morning!",
          "memoryTip": "mor-ning早晨"
        },
        {
          "word": "afternoon",
          "phonetic": "/ˌɑːftəˈnuːn/",
          "syllables": "af·ter·noon",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "下午"
          ],
          "phrases": [],
          "example": "Good afternoon!",
          "memoryTip": "af-ter-noon下午"
        },
        {
          "word": "evening",
          "phonetic": "/ˈiːvnɪŋ/",
          "syllables": "eve·ning",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "晚上"
          ],
          "phrases": [],
          "example": "Good evening!",
          "memoryTip": "eve-ning晚上"
        },
        {
          "word": "how",
          "phonetic": "/haʊ/",
          "syllables": "how",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "怎样"
          ],
          "phrases": [],
          "example": "How are you?",
          "memoryTip": "how怎样"
        },
        {
          "word": "are",
          "phonetic": "/ɑː/",
          "syllables": "are",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "是"
          ],
          "phrases": [],
          "example": "How are you?",
          "memoryTip": "are是"
        }
      ]
    },
    {
      "day": 2,
      "date": "9月2日",
      "unit": "U1",
      "words": [
        {
          "word": "you",
          "phonetic": "/juː/",
          "syllables": "you",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "你"
          ],
          "phrases": [],
          "example": "How are you?",
          "memoryTip": "you你"
        },
        {
          "word": "fine",
          "phonetic": "/faɪn/",
          "syllables": "fine",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "健康的"
          ],
          "phrases": [],
          "example": "I am fine.",
          "memoryTip": "fine健康的"
        },
        {
          "word": "hello",
          "phonetic": "/həˈləʊ/",
          "syllables": "hel·lo",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "你好"
          ],
          "phrases": [],
          "example": "Hello!",
          "memoryTip": "hel-lo你好"
        },
        {
          "word": "hi",
          "phonetic": "/haɪ/",
          "syllables": "hi",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "嗨"
          ],
          "phrases": [],
          "example": "Hi!",
          "memoryTip": "hi嗨"
        },
        {
          "word": "I",
          "phonetic": "/aɪ/",
          "syllables": "I",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "我"
          ],
          "phrases": [],
          "example": "I am fine.",
          "memoryTip": "I我"
        },
        {
          "word": "am",
          "phonetic": "/æm/",
          "syllables": "am",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "是"
          ],
          "phrases": [],
          "example": "I am fine.",
          "memoryTip": "am是"
        }
      ]
    },
    {
      "day": 3,
      "date": "9月3日",
      "unit": "U1",
      "words": [
        {
          "word": "is",
          "phonetic": "/ɪz/",
          "syllables": "is",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "是"
          ],
          "phrases": [],
          "example": "She is fine.",
          "memoryTip": "is是"
        },
        {
          "word": "name",
          "phonetic": "/neɪm/",
          "syllables": "name",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "名字"
          ],
          "phrases": [],
          "example": "My name is Gina.",
          "memoryTip": "name名字"
        },
        {
          "word": "list",
          "phonetic": "/lɪst/",
          "syllables": "list",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "名单"
          ],
          "phrases": [],
          "example": "Here is a list.",
          "memoryTip": "list名单"
        },
        {
          "word": "friend",
          "phonetic": "/frend/",
          "syllables": "friend",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "朋友"
          ],
          "phrases": [],
          "example": "He is my friend.",
          "memoryTip": "friend朋友"
        },
        {
          "word": "nice",
          "phonetic": "/naɪs/",
          "syllables": "nice",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "令人愉快的"
          ],
          "phrases": [],
          "example": "Nice to meet you.",
          "memoryTip": "nice令人愉快的"
        },
        {
          "word": "meet",
          "phonetic": "/miːt/",
          "syllables": "meet",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "遇见"
          ],
          "phrases": [],
          "example": "Nice to meet you.",
          "memoryTip": "meet遇见"
        }
      ]
    },
    {
      "day": 4,
      "date": "9月4日",
      "unit": "U2",
      "words": [
        {
          "word": "sister",
          "phonetic": "/ˈsɪstə/",
          "syllables": "sis·ter",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "姐妹"
          ],
          "phrases": [],
          "example": "This is my sister.",
          "memoryTip": "sis-ter姐妹"
        },
        {
          "word": "mother",
          "phonetic": "/ˈmʌðə/",
          "syllables": "mo·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "母亲"
          ],
          "phrases": [],
          "example": "This is my mother.",
          "memoryTip": "mo-ther母亲"
        },
        {
          "word": "father",
          "phonetic": "/ˈfɑːðə/",
          "syllables": "fa·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "父亲"
          ],
          "phrases": [],
          "example": "This is my father.",
          "memoryTip": "fa-ther父亲"
        },
        {
          "word": "parent",
          "phonetic": "/ˈpeərənt/",
          "syllables": "pa·rent",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "父/母亲"
          ],
          "phrases": [],
          "example": "These are my parents.",
          "memoryTip": "pa-rent父亲/母亲"
        },
        {
          "word": "brother",
          "phonetic": "/ˈbrʌðə/",
          "syllables": "bro·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "兄弟"
          ],
          "phrases": [],
          "example": "This is my brother.",
          "memoryTip": "bro-ther兄弟"
        },
        {
          "word": "grandmother",
          "phonetic": "/ˈɡrænmʌðə/",
          "syllables": "grand·mo·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "祖母"
          ],
          "phrases": [],
          "example": "This is my grandmother.",
          "memoryTip": "grand+mother祖母"
        }
      ]
    },
    {
      "day": 5,
      "date": "9月5日",
      "unit": "U2",
      "words": [
        {
          "word": "grandfather",
          "phonetic": "/ˈɡrændfɑːðə/",
          "syllables": "grand·fa·ther",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "祖父"
          ],
          "phrases": [],
          "example": "This is my grandfather.",
          "memoryTip": "grand+father祖父"
        },
        {
          "word": "family",
          "phonetic": "/ˈfæmɪli/",
          "syllables": "fa·mi·ly",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "家庭"
          ],
          "phrases": [],
          "example": "This is my family.",
          "memoryTip": "fa-mi-ly家庭"
        },
        {
          "word": "those",
          "phonetic": "/ðəʊz/",
          "syllables": "those",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "那些"
          ],
          "phrases": [],
          "example": "Who are those?",
          "memoryTip": "those那些"
        },
        {
          "word": "who",
          "phonetic": "/huː/",
          "syllables": "who",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "谁"
          ],
          "phrases": [],
          "example": "Who is she?",
          "memoryTip": "who谁"
        },
        {
          "word": "these",
          "phonetic": "/ðiːz/",
          "syllables": "these",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "这些"
          ],
          "phrases": [],
          "example": "These are my books.",
          "memoryTip": "these这些"
        },
        {
          "word": "they",
          "phonetic": "/ðeɪ/",
          "syllables": "they",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "他们"
          ],
          "phrases": [],
          "example": "They are my friends.",
          "memoryTip": "they他们"
        }
      ]
    },
    {
      "day": 6,
      "date": "9月6日",
      "unit": "U3",
      "words": [
        {
          "word": "where",
          "phonetic": "/weə/",
          "syllables": "where",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "哪里"
          ],
          "phrases": [],
          "example": "Where is my book?",
          "memoryTip": "where哪里"
        },
        {
          "word": "table",
          "phonetic": "/ˈteɪbl/",
          "syllables": "ta·ble",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "桌子"
          ],
          "phrases": [],
          "example": "It is on the table.",
          "memoryTip": "ta-ble桌子"
        },
        {
          "word": "bed",
          "phonetic": "/bed/",
          "syllables": "bed",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "床"
          ],
          "phrases": [],
          "example": "It is under the bed.",
          "memoryTip": "bed床"
        },
        {
          "word": "bookcase",
          "phonetic": "/ˈbʊkkeɪs/",
          "syllables": "book·case",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "书架"
          ],
          "phrases": [],
          "example": "It is in the bookcase.",
          "memoryTip": "book+case书架"
        },
        {
          "word": "sofa",
          "phonetic": "/ˈsəʊfə/",
          "syllables": "so·fa",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "沙发"
          ],
          "phrases": [],
          "example": "It is on the sofa.",
          "memoryTip": "so-fa沙发"
        },
        {
          "word": "chair",
          "phonetic": "/tʃeə/",
          "syllables": "chair",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "椅子"
          ],
          "phrases": [],
          "example": "It is on the chair.",
          "memoryTip": "chair椅子"
        }
      ]
    },
    {
      "day": 7,
      "date": "9月7日",
      "unit": "U3",
      "words": [
        {
          "word": "desk",
          "phonetic": "/desk/",
          "syllables": "desk",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "书桌"
          ],
          "phrases": [],
          "example": "It is on the desk.",
          "memoryTip": "desk书桌"
        },
        {
          "word": "room",
          "phonetic": "/ruːm/",
          "syllables": "room",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "房间"
          ],
          "phrases": [],
          "example": "This is my room.",
          "memoryTip": "room房间"
        },
        {
          "word": "hat",
          "phonetic": "/hæt/",
          "syllables": "hat",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "帽子"
          ],
          "phrases": [],
          "example": "The hat is on the head.",
          "memoryTip": "hat帽子"
        },
        {
          "word": "radio",
          "phonetic": "/ˈreɪdiəʊ/",
          "syllables": "ra·dio",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "收音机"
          ],
          "phrases": [],
          "example": "The radio is on the desk.",
          "memoryTip": "ra-dio收音机"
        },
        {
          "word": "clock",
          "phonetic": "/klɒk/",
          "syllables": "clock",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "时钟"
          ],
          "phrases": [],
          "example": "The clock is on the wall.",
          "memoryTip": "clock时钟"
        },
        {
          "word": "tape",
          "phonetic": "/teɪp/",
          "syllables": "tape",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "磁带"
          ],
          "phrases": [],
          "example": "The tape is in the box.",
          "memoryTip": "tape磁带"
        }
      ]
    },
    {
      "day": 8,
      "date": "9月8日",
      "unit": "U3",
      "words": [
        {
          "word": "player",
          "phonetic": "/ˈpleɪə/",
          "syllables": "pla·yer",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "播放机"
          ],
          "phrases": [],
          "example": "The tape player.",
          "memoryTip": "pla-yer播放机"
        },
        {
          "word": "model",
          "phonetic": "/ˈmɒdl/",
          "syllables": "mo·del",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "模型"
          ],
          "phrases": [],
          "example": "A model plane.",
          "memoryTip": "mo-del模型"
        },
        {
          "word": "plane",
          "phonetic": "/pleɪn/",
          "syllables": "plane",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "飞机"
          ],
          "phrases": [],
          "example": "A model plane.",
          "memoryTip": "plane飞机"
        },
        {
          "word": "tidy",
          "phonetic": "/ˈtaɪdi/",
          "syllables": "ti·dy",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "整洁的"
          ],
          "phrases": [],
          "example": "The room is tidy.",
          "memoryTip": "ti-dy整洁的"
        },
        {
          "word": "but",
          "phonetic": "/bʌt/",
          "syllables": "but",
          "syllableColors": [],
          "pos": "conj.",
          "meanings": [
            "但是"
          ],
          "phrases": [],
          "example": "It is small but nice.",
          "memoryTip": "but但是"
        },
        {
          "word": "everywhere",
          "phonetic": "/ˈevriweə/",
          "syllables": "e·very·where",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "到处"
          ],
          "phrases": [],
          "example": "Books are everywhere.",
          "memoryTip": "e-very-where到处"
        }
      ]
    }
  ]
};
export const semester_7a = sem_7a_data as SemesterPlan;

// ===== 七年级下册 =====
const sem_7b_data = {
  "key": "7b",
  "name": "七年级下册",
  "grade": "七年级",
  "term": "下册",
  "startMonth": 3,
  "days": [
    {
      "day": 1,
      "date": "3月1日",
      "unit": "U1",
      "words": [
        {
          "word": "guitar",
          "phonetic": "/ɡɪˈtɑː/",
          "syllables": "gui·tar",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "吉他"
          ],
          "phrases": [],
          "example": "Can you play the guitar?",
          "memoryTip": "gui-tar吉他"
        },
        {
          "word": "sing",
          "phonetic": "/sɪŋ/",
          "syllables": "sing",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "唱歌"
          ],
          "phrases": [],
          "example": "I can sing.",
          "memoryTip": "sing唱歌"
        },
        {
          "word": "swim",
          "phonetic": "/swɪm/",
          "syllables": "swim",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "游泳"
          ],
          "phrases": [],
          "example": "I can swim.",
          "memoryTip": "swim游泳"
        },
        {
          "word": "dance",
          "phonetic": "/dɑːns/",
          "syllables": "dance",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "跳舞"
          ],
          "phrases": [],
          "example": "Can you dance?",
          "memoryTip": "dance跳舞"
        },
        {
          "word": "draw",
          "phonetic": "/drɔː/",
          "syllables": "draw",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "画"
          ],
          "phrases": [],
          "example": "I can draw.",
          "memoryTip": "draw画"
        },
        {
          "word": "chess",
          "phonetic": "/tʃes/",
          "syllables": "chess",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "象棋"
          ],
          "phrases": [],
          "example": "I can play chess.",
          "memoryTip": "chess象棋"
        }
      ]
    },
    {
      "day": 2,
      "date": "3月2日",
      "unit": "U1",
      "words": [
        {
          "word": "speak",
          "phonetic": "/spiːk/",
          "syllables": "speak",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "说"
          ],
          "phrases": [],
          "example": "Can you speak English?",
          "memoryTip": "speak说"
        },
        {
          "word": "join",
          "phonetic": "/dʒɔɪn/",
          "syllables": "join",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "参加"
          ],
          "phrases": [],
          "example": "Join the club.",
          "memoryTip": "join参加"
        },
        {
          "word": "club",
          "phonetic": "/klʌb/",
          "syllables": "club",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "俱乐部"
          ],
          "phrases": [],
          "example": "Join the club.",
          "memoryTip": "club俱乐部"
        },
        {
          "word": "tell",
          "phonetic": "/tel/",
          "syllables": "tell",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "讲述"
          ],
          "phrases": [],
          "example": "Tell a story.",
          "memoryTip": "tell讲述"
        },
        {
          "word": "story",
          "phonetic": "/ˈstɔːri/",
          "syllables": "sto·ry",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "故事"
          ],
          "phrases": [],
          "example": "Tell a story.",
          "memoryTip": "sto-ry故事"
        },
        {
          "word": "write",
          "phonetic": "/raɪt/",
          "syllables": "write",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "写作"
          ],
          "phrases": [],
          "example": "Write a story.",
          "memoryTip": "write写作"
        }
      ]
    },
    {
      "day": 3,
      "date": "3月3日",
      "unit": "U2",
      "words": [
        {
          "word": "up",
          "phonetic": "/ʌp/",
          "syllables": "up",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "向上"
          ],
          "phrases": [],
          "example": "Get up.",
          "memoryTip": "up向上"
        },
        {
          "word": "dress",
          "phonetic": "/dres/",
          "syllables": "dress",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "穿衣服"
          ],
          "phrases": [],
          "example": "Get dressed.",
          "memoryTip": "dress穿衣服"
        },
        {
          "word": "brush",
          "phonetic": "/brʌʃ/",
          "syllables": "brush",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "刷"
          ],
          "phrases": [],
          "example": "Brush your teeth.",
          "memoryTip": "brush刷"
        },
        {
          "word": "tooth",
          "phonetic": "/tuːθ/",
          "syllables": "tooth",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "牙齿"
          ],
          "phrases": [],
          "example": "Brush your teeth.",
          "memoryTip": "tooth牙齿"
        },
        {
          "word": "shower",
          "phonetic": "/ˈʃaʊə/",
          "syllables": "sho·wer",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "淋浴"
          ],
          "phrases": [],
          "example": "Take a shower.",
          "memoryTip": "sho-wer淋浴"
        },
        {
          "word": "usually",
          "phonetic": "/ˈjuːʒuəli/",
          "syllables": "u·sua·lly",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "通常"
          ],
          "phrases": [],
          "example": "I usually get up early.",
          "memoryTip": "u-sua-lly通常"
        }
      ]
    },
    {
      "day": 4,
      "date": "3月4日",
      "unit": "U2",
      "words": [
        {
          "word": "forty",
          "phonetic": "/ˈfɔːti/",
          "syllables": "for·ty",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "四十"
          ],
          "phrases": [],
          "example": "It is forty.",
          "memoryTip": "for+ty四十"
        },
        {
          "word": "wow",
          "phonetic": "/waʊ/",
          "syllables": "wow",
          "syllableColors": [],
          "pos": "int.",
          "meanings": [
            "哇"
          ],
          "phrases": [],
          "example": "Wow!",
          "memoryTip": "wow哇"
        },
        {
          "word": "never",
          "phonetic": "/ˈnevə/",
          "syllables": "ne·ver",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "从不"
          ],
          "phrases": [],
          "example": "I am never late.",
          "memoryTip": "ne-ver从不"
        },
        {
          "word": "early",
          "phonetic": "/ˈɜːli/",
          "syllables": "ear·ly",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "早"
          ],
          "phrases": [],
          "example": "I get up early.",
          "memoryTip": "ear-ly早"
        },
        {
          "word": "fifty",
          "phonetic": "/ˈfɪfti/",
          "syllables": "fif·ty",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "五十"
          ],
          "phrases": [],
          "example": "It is fifty.",
          "memoryTip": "fif+ty五十"
        },
        {
          "word": "job",
          "phonetic": "/dʒɒb/",
          "syllables": "job",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "工作"
          ],
          "phrases": [],
          "example": "What is your job?",
          "memoryTip": "job工作"
        }
      ]
    },
    {
      "day": 5,
      "date": "3月5日",
      "unit": "U3",
      "words": [
        {
          "word": "subway",
          "phonetic": "/ˈsʌbweɪ/",
          "syllables": "sub·way",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "地铁"
          ],
          "phrases": [],
          "example": "Take the subway.",
          "memoryTip": "sub+way地铁"
        },
        {
          "word": "train",
          "phonetic": "/treɪn/",
          "syllables": "train",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "火车"
          ],
          "phrases": [],
          "example": "Take the train.",
          "memoryTip": "train火车"
        },
        {
          "word": "ride",
          "phonetic": "/raɪd/",
          "syllables": "ride",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "骑"
          ],
          "phrases": [],
          "example": "Ride a bike.",
          "memoryTip": "ride骑"
        },
        {
          "word": "bike",
          "phonetic": "/baɪk/",
          "syllables": "bike",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "自行车"
          ],
          "phrases": [],
          "example": "Ride a bike.",
          "memoryTip": "bike自行车"
        },
        {
          "word": "sixty",
          "phonetic": "/ˈsɪksti/",
          "syllables": "six·ty",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "六十"
          ],
          "phrases": [],
          "example": "Sixty minutes.",
          "memoryTip": "six+ty六十"
        },
        {
          "word": "seventy",
          "phonetic": "/ˈsevənti/",
          "syllables": "se·ven·ty",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "七十"
          ],
          "phrases": [],
          "example": "Seventy students.",
          "memoryTip": "se-ven+ty七十"
        }
      ]
    },
    {
      "day": 6,
      "date": "3月6日",
      "unit": "U3",
      "words": [
        {
          "word": "eighty",
          "phonetic": "/ˈeɪti/",
          "syllables": "eigh·ty",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "八十"
          ],
          "phrases": [],
          "example": "Eighty books.",
          "memoryTip": "eigh+ty八十"
        },
        {
          "word": "ninety",
          "phonetic": "/ˈnaɪnti/",
          "syllables": "nine·ty",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "九十"
          ],
          "phrases": [],
          "example": "Ninety people.",
          "memoryTip": "nine+ty九十"
        },
        {
          "word": "hundred",
          "phonetic": "/ˈhʌndrəd/",
          "syllables": "hun·dred",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "一百"
          ],
          "phrases": [],
          "example": "A hundred.",
          "memoryTip": "hun+dred一百"
        },
        {
          "word": "minute",
          "phonetic": "/ˈmɪnɪt/",
          "syllables": "mi·nute",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "分钟"
          ],
          "phrases": [],
          "example": "Five minutes.",
          "memoryTip": "mi-nute分钟"
        },
        {
          "word": "far",
          "phonetic": "/fɑː/",
          "syllables": "far",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "远"
          ],
          "phrases": [],
          "example": "It is far.",
          "memoryTip": "far远"
        },
        {
          "word": "kilometer",
          "phonetic": "/kɪˈlɒmɪtə/",
          "syllables": "ki·lo·me·ter",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "千米"
          ],
          "phrases": [],
          "example": "Two kilometers.",
          "memoryTip": "ki-lo-me-ter千米"
        }
      ]
    }
  ]
};
export const semester_7b = sem_7b_data as SemesterPlan;

// ===== 八年级上册 =====
const sem_8a_data = {
  "key": "8a",
  "name": "八年级上册",
  "grade": "八年级",
  "term": "上册",
  "startMonth": 9,
  "days": [
    {
      "day": 1,
      "date": "9月1日",
      "unit": "U1",
      "words": [
        {
          "word": "anyone",
          "phonetic": "/ˈeniwʌn/",
          "syllables": "a·ny·one",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "任何人"
          ],
          "phrases": [],
          "example": "Did anyone go?",
          "memoryTip": "a-ny-one任何人"
        },
        {
          "word": "anywhere",
          "phonetic": "/ˈeniweə/",
          "syllables": "a·ny·where",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "任何地方"
          ],
          "phrases": [],
          "example": "Go anywhere.",
          "memoryTip": "a-ny-where任何地方"
        },
        {
          "word": "wonderful",
          "phonetic": "/ˈwʌndəfl/",
          "syllables": "won·der·ful",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "精彩的"
          ],
          "phrases": [],
          "example": "It is wonderful.",
          "memoryTip": "won-der-ful精彩的"
        },
        {
          "word": "few",
          "phonetic": "/fjuː/",
          "syllables": "few",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "很少的"
          ],
          "phrases": [],
          "example": "Few people.",
          "memoryTip": "few很少的"
        },
        {
          "word": "quite",
          "phonetic": "/kwaɪt/",
          "syllables": "quite",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "相当"
          ],
          "phrases": [],
          "example": "Quite a few.",
          "memoryTip": "quite相当"
        },
        {
          "word": "most",
          "phonetic": "/məʊst/",
          "syllables": "most",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "最多的"
          ],
          "phrases": [],
          "example": "Most students.",
          "memoryTip": "most最多的"
        }
      ]
    },
    {
      "day": 2,
      "date": "9月2日",
      "unit": "U1",
      "words": [
        {
          "word": "something",
          "phonetic": "/ˈsʌmθɪŋ/",
          "syllables": "some·thing",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "某事"
          ],
          "phrases": [],
          "example": "Something new.",
          "memoryTip": "some-thing某事"
        },
        {
          "word": "nothing",
          "phonetic": "/ˈnʌθɪŋ/",
          "syllables": "no·thing",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "没有什么"
          ],
          "phrases": [],
          "example": "Nothing much.",
          "memoryTip": "no-thing没有什么"
        },
        {
          "word": "everyone",
          "phonetic": "/ˈevriwʌn/",
          "syllables": "e·very·one",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "每人"
          ],
          "phrases": [],
          "example": "Everyone came.",
          "memoryTip": "e-very-one每人"
        },
        {
          "word": "myself",
          "phonetic": "/maɪˈself/",
          "syllables": "my·self",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "我自己"
          ],
          "phrases": [],
          "example": "I did it myself.",
          "memoryTip": "my+self我自己"
        },
        {
          "word": "yourself",
          "phonetic": "/jɔːˈself/",
          "syllables": "your·self",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "你自己"
          ],
          "phrases": [],
          "example": "Help yourself.",
          "memoryTip": "your+self你自己"
        },
        {
          "word": "seem",
          "phonetic": "/siːm/",
          "syllables": "seem",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "好像"
          ],
          "phrases": [],
          "example": "It seems good.",
          "memoryTip": "seem好像"
        }
      ]
    },
    {
      "day": 3,
      "date": "9月3日",
      "unit": "U2",
      "words": [
        {
          "word": "housework",
          "phonetic": "/ˈhaʊswɜːk/",
          "syllables": "house·work",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "家务"
          ],
          "phrases": [],
          "example": "Do housework.",
          "memoryTip": "house+work家务"
        },
        {
          "word": "hardly",
          "phonetic": "/ˈhɑːdli/",
          "syllables": "hard·ly",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "几乎不"
          ],
          "phrases": [],
          "example": "Hardly ever.",
          "memoryTip": "hard+ly几乎不"
        },
        {
          "word": "ever",
          "phonetic": "/ˈevə/",
          "syllables": "e·ver",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "曾经"
          ],
          "phrases": [],
          "example": "Have you ever?",
          "memoryTip": "e-ver曾经"
        },
        {
          "word": "once",
          "phonetic": "/wʌns/",
          "syllables": "once",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "一次"
          ],
          "phrases": [],
          "example": "Once a week.",
          "memoryTip": "once一次"
        },
        {
          "word": "twice",
          "phonetic": "/twaɪs/",
          "syllables": "twice",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "两次"
          ],
          "phrases": [],
          "example": "Twice a week.",
          "memoryTip": "twice两次"
        },
        {
          "word": "Internet",
          "phonetic": "/ˈɪntənet/",
          "syllables": "In·ter·net",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "互联网"
          ],
          "phrases": [],
          "example": "On the Internet.",
          "memoryTip": "In-ter-net互联网"
        }
      ]
    },
    {
      "day": 4,
      "date": "9月4日",
      "unit": "U2",
      "words": [
        {
          "word": "program",
          "phonetic": "/ˈprəʊɡræm/",
          "syllables": "pro·gram",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "节目"
          ],
          "phrases": [],
          "example": "TV program.",
          "memoryTip": "pro-gram节目"
        },
        {
          "word": "full",
          "phonetic": "/fʊl/",
          "syllables": "full",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "满的"
          ],
          "phrases": [],
          "example": "Full of energy.",
          "memoryTip": "full满的"
        },
        {
          "word": "maybe",
          "phonetic": "/ˈmeɪbi/",
          "syllables": "ma·ybe",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "大概"
          ],
          "phrases": [],
          "example": "Maybe tomorrow.",
          "memoryTip": "ma-ybe大概"
        },
        {
          "word": "least",
          "phonetic": "/liːst/",
          "syllables": "least",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "最少的"
          ],
          "phrases": [],
          "example": "At least.",
          "memoryTip": "least最少的"
        },
        {
          "word": "health",
          "phonetic": "/helθ/",
          "syllables": "health",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "健康"
          ],
          "phrases": [],
          "example": "Good health.",
          "memoryTip": "health健康"
        },
        {
          "word": "result",
          "phonetic": "/rɪˈzʌlt/",
          "syllables": "re·sult",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "结果"
          ],
          "phrases": [],
          "example": "The result is good.",
          "memoryTip": "re-sult结果"
        }
      ]
    },
    {
      "day": 5,
      "date": "9月5日",
      "unit": "U3",
      "words": [
        {
          "word": "outgoing",
          "phonetic": "/ˈaʊtɡəʊɪŋ/",
          "syllables": "out·go·ing",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "外向的"
          ],
          "phrases": [],
          "example": "She is outgoing.",
          "memoryTip": "out+go-ing外向的"
        },
        {
          "word": "better",
          "phonetic": "/ˈbetə/",
          "syllables": "bet·ter",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "更好的"
          ],
          "phrases": [],
          "example": "Much better.",
          "memoryTip": "bet+ter更好的"
        },
        {
          "word": "loudly",
          "phonetic": "/ˈlaʊdli/",
          "syllables": "loud·ly",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "大声地"
          ],
          "phrases": [],
          "example": "Speak loudly.",
          "memoryTip": "loud+ly大声地"
        },
        {
          "word": "quietly",
          "phonetic": "/ˈkwaɪətli/",
          "syllables": "qui·et·ly",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "安静地"
          ],
          "phrases": [],
          "example": "Sit quietly.",
          "memoryTip": "qui-et+ly安静地"
        },
        {
          "word": "hard-working",
          "phonetic": "/ˌhɑːd ˈwɜːkɪŋ/",
          "syllables": "hard·wor·king",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "勤奋的"
          ],
          "phrases": [],
          "example": "She is hard-working.",
          "memoryTip": "hard+wor-king勤奋的"
        },
        {
          "word": "competition",
          "phonetic": "/ˌkɒmpəˈtɪʃn/",
          "syllables": "com·pe·ti·tion",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "比赛"
          ],
          "phrases": [],
          "example": "A singing competition.",
          "memoryTip": "com-pe-ti-tion比赛"
        }
      ]
    },
    {
      "day": 6,
      "date": "9月6日",
      "unit": "U3",
      "words": [
        {
          "word": "fantastic",
          "phonetic": "/fænˈtæstɪk/",
          "syllables": "fan·tas·tic",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "极好的"
          ],
          "phrases": [],
          "example": "That is fantastic!",
          "memoryTip": "fan-tas-tic极好的"
        },
        {
          "word": "which",
          "phonetic": "/wɪtʃ/",
          "syllables": "which",
          "syllableColors": [],
          "pos": "pron.",
          "meanings": [
            "哪一个"
          ],
          "phrases": [],
          "example": "Which one?",
          "memoryTip": "which哪一个"
        },
        {
          "word": "clearly",
          "phonetic": "/ˈklɪəli/",
          "syllables": "clear·ly",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "清楚地"
          ],
          "phrases": [],
          "example": "Speak clearly.",
          "memoryTip": "clear+ly清楚地"
        },
        {
          "word": "win",
          "phonetic": "/wɪn/",
          "syllables": "win",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "赢"
          ],
          "phrases": [],
          "example": "Win the game.",
          "memoryTip": "win赢"
        },
        {
          "word": "though",
          "phonetic": "/ðəʊ/",
          "syllables": "though",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "不过"
          ],
          "phrases": [],
          "example": "It is hard, though.",
          "memoryTip": "though不过"
        },
        {
          "word": "talented",
          "phonetic": "/ˈtæləntɪd/",
          "syllables": "ta·len·ted",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "有才能的"
          ],
          "phrases": [],
          "example": "She is talented.",
          "memoryTip": "ta-len-ted有才能的"
        }
      ]
    }
  ]
};
export const semester_8a = sem_8a_data as SemesterPlan;

// ===== 八年级下册 =====
const sem_8b_data = {
  "key": "8b",
  "name": "八年级下册",
  "grade": "八年级",
  "term": "下册",
  "startMonth": 3,
  "days": [
    {
      "day": 1,
      "date": "3月1日",
      "unit": "U1",
      "words": [
        {
          "word": "matter",
          "phonetic": "/ˈmætə/",
          "syllables": "mat·ter",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "问题"
          ],
          "phrases": [],
          "example": "What is the matter?",
          "memoryTip": "mat-ter问题"
        },
        {
          "word": "stomachache",
          "phonetic": "/ˈstʌməkeɪk/",
          "syllables": "sto·mach·ache",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "胃痛"
          ],
          "phrases": [],
          "example": "I have a stomachache.",
          "memoryTip": "sto-mach-ache胃痛"
        },
        {
          "word": "foot",
          "phonetic": "/fʊt/",
          "syllables": "foot",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "脚"
          ],
          "phrases": [],
          "example": "My foot hurts.",
          "memoryTip": "foot脚"
        },
        {
          "word": "neck",
          "phonetic": "/nek/",
          "syllables": "neck",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "脖子"
          ],
          "phrases": [],
          "example": "My neck hurts.",
          "memoryTip": "neck脖子"
        },
        {
          "word": "stomach",
          "phonetic": "/ˈstʌmək/",
          "syllables": "sto·mach",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "胃"
          ],
          "phrases": [],
          "example": "My stomach hurts.",
          "memoryTip": "sto-mach胃"
        },
        {
          "word": "throat",
          "phonetic": "/θrəʊt/",
          "syllables": "throat",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "喉咙"
          ],
          "phrases": [],
          "example": "My throat hurts.",
          "memoryTip": "throat喉咙"
        }
      ]
    },
    {
      "day": 2,
      "date": "3月2日",
      "unit": "U1",
      "words": [
        {
          "word": "fever",
          "phonetic": "/ˈfiːvə/",
          "syllables": "fe·ver",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "发烧"
          ],
          "phrases": [],
          "example": "I have a fever.",
          "memoryTip": "fe-ver发烧"
        },
        {
          "word": "lie",
          "phonetic": "/laɪ/",
          "syllables": "lie",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "躺"
          ],
          "phrases": [],
          "example": "Lie down.",
          "memoryTip": "lie躺"
        },
        {
          "word": "rest",
          "phonetic": "/rest/",
          "syllables": "rest",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "休息"
          ],
          "phrases": [],
          "example": "Have a rest.",
          "memoryTip": "rest休息"
        },
        {
          "word": "cough",
          "phonetic": "/kɒf/",
          "syllables": "cough",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "咳嗽"
          ],
          "phrases": [],
          "example": "I have a cough.",
          "memoryTip": "cough咳嗽"
        },
        {
          "word": "toothache",
          "phonetic": "/ˈtuːθeɪk/",
          "syllables": "tooth·ache",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "牙痛"
          ],
          "phrases": [],
          "example": "I have a toothache.",
          "memoryTip": "tooth+ache牙痛"
        },
        {
          "word": "headache",
          "phonetic": "/ˈhedeɪk/",
          "syllables": "head·ache",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "头痛"
          ],
          "phrases": [],
          "example": "I have a headache.",
          "memoryTip": "head+ache头痛"
        }
      ]
    },
    {
      "day": 3,
      "date": "3月3日",
      "unit": "U2",
      "words": [
        {
          "word": "litter",
          "phonetic": "/ˈlɪtə/",
          "syllables": "lit·ter",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "乱扔"
          ],
          "phrases": [],
          "example": "Do not litter.",
          "memoryTip": "lit-ter乱扔"
        },
        {
          "word": "bottom",
          "phonetic": "/ˈbɒtəm/",
          "syllables": "bo·ttom",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "底部"
          ],
          "phrases": [],
          "example": "At the bottom.",
          "memoryTip": "bo-ttom底部"
        },
        {
          "word": "coast",
          "phonetic": "/kəʊst/",
          "syllables": "coast",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "海岸"
          ],
          "phrases": [],
          "example": "On the coast.",
          "memoryTip": "coast海岸"
        },
        {
          "word": "public",
          "phonetic": "/ˈpʌblɪk/",
          "syllables": "pu·blic",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "公众的"
          ],
          "phrases": [],
          "example": "Public place.",
          "memoryTip": "pu-blic公众的"
        },
        {
          "word": "ugly",
          "phonetic": "/ˈʌɡli/",
          "syllables": "ug·ly",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "丑陋的"
          ],
          "phrases": [],
          "example": "It is ugly.",
          "memoryTip": "ug-ly丑陋的"
        },
        {
          "word": "advantage",
          "phonetic": "/ədˈvɑːntɪdʒ/",
          "syllables": "ad·van·tage",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "优点"
          ],
          "phrases": [],
          "example": "An advantage.",
          "memoryTip": "ad-van-tage优点"
        }
      ]
    },
    {
      "day": 4,
      "date": "3月4日",
      "unit": "U2",
      "words": [
        {
          "word": "cost",
          "phonetic": "/kɒst/",
          "syllables": "cost",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "花费"
          ],
          "phrases": [],
          "example": "It costs much.",
          "memoryTip": "cost花费"
        },
        {
          "word": "wooden",
          "phonetic": "/ˈwʊdn/",
          "syllables": "woo·den",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "木制的"
          ],
          "phrases": [],
          "example": "A wooden house.",
          "memoryTip": "woo-den木制的"
        },
        {
          "word": "plastic",
          "phonetic": "/ˈplæstɪk/",
          "syllables": "plas·tic",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "塑料的"
          ],
          "phrases": [],
          "example": "Plastic bag.",
          "memoryTip": "plas-tic塑料的"
        },
        {
          "word": "industry",
          "phonetic": "/ˈɪndəstri/",
          "syllables": "in·du·stry",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "工业"
          ],
          "phrases": [],
          "example": "The industry.",
          "memoryTip": "in-du-stry工业"
        },
        {
          "word": "law",
          "phonetic": "/lɔː/",
          "syllables": "law",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "法律"
          ],
          "phrases": [],
          "example": "A law.",
          "memoryTip": "law法律"
        },
        {
          "word": "zero",
          "phonetic": "/ˈzɪərəʊ/",
          "syllables": "ze·ro",
          "syllableColors": [],
          "pos": "num.",
          "meanings": [
            "零"
          ],
          "phrases": [],
          "example": "Zero waste.",
          "memoryTip": "ze-ro零"
        }
      ]
    },
    {
      "day": 5,
      "date": "3月5日",
      "unit": "U3",
      "words": [
        {
          "word": "stamp",
          "phonetic": "/stæmp/",
          "syllables": "stamp",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "邮票"
          ],
          "phrases": [],
          "example": "Collect stamps.",
          "memoryTip": "stamp邮票"
        },
        {
          "word": "shelf",
          "phonetic": "/ʃelf/",
          "syllables": "shelf",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "隔板"
          ],
          "phrases": [],
          "example": "On the shelf.",
          "memoryTip": "shelf隔板"
        },
        {
          "word": "pound",
          "phonetic": "/paʊnd/",
          "syllables": "pound",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "磅"
          ],
          "phrases": [],
          "example": "One pound.",
          "memoryTip": "pound磅"
        },
        {
          "word": "cent",
          "phonetic": "/sent/",
          "syllables": "cent",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "分"
          ],
          "phrases": [],
          "example": "Fifty cents.",
          "memoryTip": "cent分"
        },
        {
          "word": "must",
          "phonetic": "/mʌst/",
          "syllables": "must",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "必须"
          ],
          "phrases": [],
          "example": "You must go.",
          "memoryTip": "must必须"
        },
        {
          "word": "value",
          "phonetic": "/ˈvæljuː/",
          "syllables": "va·lue",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "价值"
          ],
          "phrases": [],
          "example": "The value.",
          "memoryTip": "va-lue价值"
        }
      ]
    },
    {
      "day": 6,
      "date": "3月6日",
      "unit": "U3",
      "words": [
        {
          "word": "person",
          "phonetic": "/ˈpɜːsn/",
          "syllables": "per·son",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "人"
          ],
          "phrases": [],
          "example": "A person.",
          "memoryTip": "per-son人"
        },
        {
          "word": "while",
          "phonetic": "/waɪl/",
          "syllables": "while",
          "syllableColors": [],
          "pos": "conj.",
          "meanings": [
            "一段时间"
          ],
          "phrases": [],
          "example": "For a while.",
          "memoryTip": "while一段时间"
        },
        {
          "word": "regret",
          "phonetic": "/rɪˈɡret/",
          "syllables": "re·gret",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "感到遗憾"
          ],
          "phrases": [],
          "example": "I regret it.",
          "memoryTip": "re-gret遗憾"
        },
        {
          "word": "pity",
          "phonetic": "/ˈpɪti/",
          "syllables": "pi·ty",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "怜悯"
          ],
          "phrases": [],
          "example": "What a pity!",
          "memoryTip": "pi-ty怜悯"
        },
        {
          "word": "object",
          "phonetic": "/ˈɒbdʒɪkt/",
          "syllables": "ob·ject",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "物体"
          ],
          "phrases": [],
          "example": "An object.",
          "memoryTip": "ob-ject物体"
        },
        {
          "word": "count",
          "phonetic": "/kaʊnt/",
          "syllables": "count",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "数数"
          ],
          "phrases": [],
          "example": "Count to ten.",
          "memoryTip": "count数数"
        }
      ]
    }
  ]
};
export const semester_8b = sem_8b_data as SemesterPlan;

// ===== 九年级全册 =====
const sem_9a_data = {
  "key": "9a",
  "name": "九年级全册",
  "grade": "九年级",
  "term": "全册",
  "startMonth": 9,
  "days": [
    {
      "day": 1,
      "date": "9月1日",
      "unit": "U1",
      "words": [
        {
          "word": "textbook",
          "phonetic": "/ˈtekstbʊk/",
          "syllables": "text·book",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "课本"
          ],
          "phrases": [],
          "example": "Open the textbook.",
          "memoryTip": "text+book课本"
        },
        {
          "word": "conversation",
          "phonetic": "/ˌkɒnvəˈseɪʃn/",
          "syllables": "con·ver·sa·tion",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "交谈"
          ],
          "phrases": [],
          "example": "A conversation.",
          "memoryTip": "con-ver-sa-tion交谈"
        },
        {
          "word": "aloud",
          "phonetic": "/əˈlaʊd/",
          "syllables": "a·loud",
          "syllableColors": [],
          "pos": "adv.",
          "meanings": [
            "大声地"
          ],
          "phrases": [],
          "example": "Read aloud.",
          "memoryTip": "a+loud大声地"
        },
        {
          "word": "pronunciation",
          "phonetic": "/prəˌnʌnsiˈeɪʃn/",
          "syllables": "pro·nun·cia·tion",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "发音"
          ],
          "phrases": [],
          "example": "Good pronunciation.",
          "memoryTip": "pro-nun-cia-tion发音"
        },
        {
          "word": "sentence",
          "phonetic": "/ˈsentəns/",
          "syllables": "sen·tence",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "句子"
          ],
          "phrases": [],
          "example": "Make a sentence.",
          "memoryTip": "sen-tence句子"
        },
        {
          "word": "patient",
          "phonetic": "/ˈpeɪʃnt/",
          "syllables": "pa·tient",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "有耐心的"
          ],
          "phrases": [],
          "example": "Be patient.",
          "memoryTip": "pa-tient耐心的"
        }
      ]
    },
    {
      "day": 2,
      "date": "9月2日",
      "unit": "U1",
      "words": [
        {
          "word": "expression",
          "phonetic": "/ɪkˈspreʃn/",
          "syllables": "ex·pres·sion",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "表情"
          ],
          "phrases": [],
          "example": "Facial expression.",
          "memoryTip": "ex-pres-sion表情"
        },
        {
          "word": "discover",
          "phonetic": "/dɪˈskʌvə/",
          "syllables": "dis·co·ver",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "发现"
          ],
          "phrases": [],
          "example": "Discover new things.",
          "memoryTip": "dis-co-ver发现"
        },
        {
          "word": "secret",
          "phonetic": "/ˈsiːkrət/",
          "syllables": "se·cret",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "秘密"
          ],
          "phrases": [],
          "example": "The secret is...",
          "memoryTip": "se-cret秘密"
        },
        {
          "word": "grammar",
          "phonetic": "/ˈɡræmə/",
          "syllables": "gram·mar",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "语法"
          ],
          "phrases": [],
          "example": "Learn grammar.",
          "memoryTip": "gram-mar语法"
        },
        {
          "word": "repeat",
          "phonetic": "/rɪˈpiːt/",
          "syllables": "re·peat",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "重复"
          ],
          "phrases": [],
          "example": "Repeat after me.",
          "memoryTip": "re-peat重复"
        },
        {
          "word": "note",
          "phonetic": "/nəʊt/",
          "syllables": "note",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "笔记"
          ],
          "phrases": [],
          "example": "Take notes.",
          "memoryTip": "note笔记"
        }
      ]
    },
    {
      "day": 3,
      "date": "9月3日",
      "unit": "U2",
      "words": [
        {
          "word": "moon",
          "phonetic": "/muːn/",
          "syllables": "moon",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "月亮"
          ],
          "phrases": [],
          "example": "The moon.",
          "memoryTip": "moon月亮"
        },
        {
          "word": "full",
          "phonetic": "/fʊl/",
          "syllables": "full",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "圆的"
          ],
          "phrases": [],
          "example": "A full moon.",
          "memoryTip": "full圆的"
        },
        {
          "word": "shower",
          "phonetic": "/ˈʃaʊə/",
          "syllables": "sho·wer",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "阵雨"
          ],
          "phrases": [],
          "example": "A shower.",
          "memoryTip": "sho-wer阵雨"
        },
        {
          "word": "storm",
          "phonetic": "/stɔːm/",
          "syllables": "storm",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "暴风雨"
          ],
          "phrases": [],
          "example": "A storm.",
          "memoryTip": "storm暴风雨"
        },
        {
          "word": "rise",
          "phonetic": "/raɪz/",
          "syllables": "rise",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "升起"
          ],
          "phrases": [],
          "example": "The sun rises.",
          "memoryTip": "rise升起"
        },
        {
          "word": "set",
          "phonetic": "/set/",
          "syllables": "set",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "落下"
          ],
          "phrases": [],
          "example": "The sun sets.",
          "memoryTip": "set落下"
        }
      ]
    },
    {
      "day": 4,
      "date": "9月4日",
      "unit": "U2",
      "words": [
        {
          "word": "advice",
          "phonetic": "/ədˈvaɪs/",
          "syllables": "ad·vice",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "建议"
          ],
          "phrases": [],
          "example": "Give advice.",
          "memoryTip": "ad-vice建议"
        },
        {
          "word": "background",
          "phonetic": "/ˈbækɡraʊnd/",
          "syllables": "back·ground",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "背景"
          ],
          "phrases": [],
          "example": "The background.",
          "memoryTip": "back+ground背景"
        },
        {
          "word": "pass",
          "phonetic": "/pɑːs/",
          "syllables": "pass",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "通过"
          ],
          "phrases": [],
          "example": "Pass the exam.",
          "memoryTip": "pass通过"
        },
        {
          "word": "wish",
          "phonetic": "/wɪʃ/",
          "syllables": "wish",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "希望"
          ],
          "phrases": [],
          "example": "I wish you luck.",
          "memoryTip": "wish希望"
        },
        {
          "word": "tie",
          "phonetic": "/taɪ/",
          "syllables": "tie",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "捆"
          ],
          "phrases": [],
          "example": "Tie it.",
          "memoryTip": "tie系"
        },
        {
          "word": "graduation",
          "phonetic": "/ˌɡrædʒuˈeɪʃn/",
          "syllables": "gra·du·a·tion",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "毕业"
          ],
          "phrases": [],
          "example": "After graduation.",
          "memoryTip": "gra-du-a-tion毕业"
        }
      ]
    },
    {
      "day": 5,
      "date": "9月5日",
      "unit": "U3",
      "words": [
        {
          "word": "chairman",
          "phonetic": "/ˈtʃeəmən/",
          "syllables": "chair·man",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "主席"
          ],
          "phrases": [],
          "example": "The chairman.",
          "memoryTip": "chair+man主席"
        },
        {
          "word": "rush",
          "phonetic": "/rʌʃ/",
          "syllables": "rush",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "冲"
          ],
          "phrases": [],
          "example": "Rush to do.",
          "memoryTip": "rush冲"
        },
        {
          "word": "traffic",
          "phonetic": "/ˈtræfɪk/",
          "syllables": "tra·ffic",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "交通"
          ],
          "phrases": [],
          "example": "Traffic jam.",
          "memoryTip": "tra-ffic交通"
        },
        {
          "word": "north",
          "phonetic": "/nɔːθ/",
          "syllables": "north",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "北部"
          ],
          "phrases": [],
          "example": "In the north.",
          "memoryTip": "north北部"
        },
        {
          "word": "east",
          "phonetic": "/iːst/",
          "syllables": "east",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "东部"
          ],
          "phrases": [],
          "example": "In the east.",
          "memoryTip": "east东部"
        },
        {
          "word": "south",
          "phonetic": "/saʊθ/",
          "syllables": "south",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "南部"
          ],
          "phrases": [],
          "example": "In the south.",
          "memoryTip": "south南部"
        }
      ]
    },
    {
      "day": 6,
      "date": "9月6日",
      "unit": "U3",
      "words": [
        {
          "word": "west",
          "phonetic": "/west/",
          "syllables": "west",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "西部"
          ],
          "phrases": [],
          "example": "In the west.",
          "memoryTip": "west西部"
        },
        {
          "word": "miss",
          "phonetic": "/mɪs/",
          "syllables": "miss",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "怀念"
          ],
          "phrases": [],
          "example": "I miss you.",
          "memoryTip": "miss怀念"
        },
        {
          "word": "cents",
          "phonetic": "/sents/",
          "syllables": "cents",
          "syllableColors": [],
          "pos": "n.",
          "meanings": [
            "分"
          ],
          "phrases": [],
          "example": "Fifty cents.",
          "memoryTip": "cents分"
        },
        {
          "word": "proud",
          "phonetic": "/praʊd/",
          "syllables": "proud",
          "syllableColors": [],
          "pos": "adj.",
          "meanings": [
            "自豪的"
          ],
          "phrases": [],
          "example": "Be proud of.",
          "memoryTip": "proud自豪的"
        },
        {
          "word": "suggest",
          "phonetic": "/səˈdʒest/",
          "syllables": "sug·gest",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "建议"
          ],
          "phrases": [],
          "example": "I suggest...",
          "memoryTip": "sug-gest建议"
        },
        {
          "word": "finish",
          "phonetic": "/ˈfɪnɪʃ/",
          "syllables": "fi·nish",
          "syllableColors": [],
          "pos": "v.",
          "meanings": [
            "完成"
          ],
          "phrases": [],
          "example": "Finish it.",
          "memoryTip": "fi-nish完成"
        }
      ]
    }
  ]
};
export const semester_9a = sem_9a_data as SemesterPlan;

// ==================== 导出 ====================
export const calendarSemesters: SemesterPlan[] = [
  semester_3a, semester_3b,
  semester_4a, semester_4b,
  semester_5a, semester_5b,
  semester_6a, semester_6b,
  semester_7a, semester_7b,
  semester_8a, semester_8b,
  semester_9a,
];

export const gradeGroups = [
  { grade: '三年级', semesters: [semester_3a, semester_3b] },
  { grade: '四年级', semesters: [semester_4a, semester_4b] },
  { grade: '五年级', semesters: [semester_5a, semester_5b] },
  { grade: '六年级', semesters: [semester_6a, semester_6b] },
  { grade: '七年级', semesters: [semester_7a, semester_7b] },
  { grade: '八年级', semesters: [semester_8a, semester_8b] },
  { grade: '九年级', semesters: [semester_9a] },
];

export const semesterMap: Record<string, SemesterPlan> = {
  '3a': semester_3a, '3b': semester_3b,
  '4a': semester_4a, '4b': semester_4b,
  '5a': semester_5a, '5b': semester_5b,
  '6a': semester_6a, '6b': semester_6b,
  '7a': semester_7a, '7b': semester_7b,
  '8a': semester_8a, '8b': semester_8b,
  '9a': semester_9a,
};

