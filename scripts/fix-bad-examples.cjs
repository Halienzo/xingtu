const fs = require('fs');

console.log('Loading calendarData.json...');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
let fixCount = 0;

// ========== FIX 1: "in front of" grammar errors (33条) ==========
const inFrontOfFixes = [
  { sem: '5b', days: [1,13,25,37,50,62,74,86,98,110,123,135,147,159,171,183,196,208,220,232,244,256,269,281,293,305,317,329,342,354] },
  { sem: '7a', days: [22,221] },
  { sem: '7b', days: [121] }
];

for (const { sem, days } of inFrontOfFixes) {
  for (const dayNum of days) {
    const day = data[sem].days.find(d => d.day === dayNum);
    if (day) {
      for (const w of day.words) {
        if (w.word === 'in front of' && w.posDetails) {
          for (const pd of w.posDetails) {
            if (pd.example === 'We often in front of to keep our life balanced.') {
              pd.example = 'I often meet my friends in front of the school gate.';
              pd.exampleCn = '我经常在校门口遇见朋友。';
              fixCount++;
            }
          }
        }
      }
    }
  }
}
console.log(`Fixed ${fixCount} "in front of" grammar errors.`);

// ========== FIX 2: 7b Day96 word="n. T" ==========
const day7b96 = data['7b'].days.find(d => d.day === 96);
if (day7b96) {
  for (const w of day7b96.words) {
    if (w.word === 'n. T' && w.posDetails) {
      for (const pd of w.posDetails) {
        if (pd.example === 'A good n. T can make a big difference.') {
          pd.example = 'This T-shirt is very comfortable for summer wear.';
          pd.exampleCn = '这件T恤衫夏天穿很舒适。';
          fixCount++;
        }
      }
    }
  }
}

// ========== FIX 3: 7b Day152 word="it is adj. to do" ==========
const day7b152 = data['7b'].days.find(d => d.day === 152);
if (day7b152) {
  for (const w of day7b152.words) {
    if (w.word === 'it is adj. to do' && w.posDetails) {
      for (const pd of w.posDetails) {
        if (pd.example === 'It feels it is adj. to do to help others in need.') {
          pd.example = 'It is important to help others when they are in need.';
          pd.exampleCn = '在别人需要帮助时伸出援手是很重要的。';
          fixCount++;
        }
      }
    }
  }
}

// ========== FIX 4: 8b Day1 & Day324 placeholders ==========
for (const dayNum of [1, 324]) {
  const day = data['8b'].days.find(d => d.day === dayNum);
  if (day) {
    for (const w of day.words) {
      if (!w.posDetails) continue;
      for (const pd of w.posDetails) {
        if (w.word === 'n. X' && pd.example === 'We should value the n. X around us.') {
          pd.example = 'She took many beautiful photos during the school trip.';
          pd.exampleCn = '她在学校旅行期间拍了很多漂亮的照片。';
          fixCount++;
        }
        if (w.word === 'adv.' && pd.example === 'She loves to adv. with her friends every day.') {
          pd.example = 'He came back from Beijing last week.';
          pd.exampleCn = '他上周从北京回来了。';
          fixCount++;
        }
        if (w.word === 'n.' && pd.example === 'We should value the n. around us.') {
          pd.example = 'She is learning Japanese because she loves Japanese culture.';
          pd.exampleCn = '她正在学日语，因为她喜欢日本文化。';
          fixCount++;
        }
      }
    }
  }
}

console.log(`Total fixes: ${fixCount}`);

// Write back
console.log('Writing back to calendarData.json...');
fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data));
console.log('Done.');
