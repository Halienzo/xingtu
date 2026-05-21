const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));

// Fix placeholder words that have bad word fields
const fixes = [
  // 7b Day 96: word="n. T" meaning="恤衫"
  {
    sem: '7b', day: 96, word: 'n. T',
    example: 'This T-shirt is very comfortable for summer.',
    exampleCn: '这件T恤衫夏天穿很舒适。'
  },
  // 7b Day 152: word="it is adj. to do" meaning="做"
  {
    sem: '7b', day: 152, word: 'it is adj. to do',
    example: 'It is important to help others when they are in need.',
    exampleCn: '在别人需要帮助时伸出援手是很重要的。'
  },
  // 8b Day 1: word="n. X" meaning="光照片"
  {
    sem: '8b', day: 1, word: 'n. X',
    example: 'She took many beautiful photos during the school trip.',
    exampleCn: '她在学校旅行期间拍了很多漂亮的照片。'
  },
  // 8b Day 324: word="n. X" meaning="光照片"
  {
    sem: '8b', day: 324, word: 'n. X',
    example: 'Photography is a wonderful way to record memories.',
    exampleCn: '摄影是记录回忆的一种美妙方式。'
  }
];

let fixCount = 0;
for (const f of fixes) {
  const day = data[f.sem].days.find(d => d.day === f.day);
  if (!day) continue;
  for (const w of day.words) {
    if (w.word === f.word && w.posDetails) {
      for (const pd of w.posDetails) {
        pd.example = f.example;
        pd.exampleCn = f.exampleCn;
        if (w.example) w.example = f.example;
        fixCount++;
        console.log(`Fixed [${f.sem} D${f.day}] ${f.word}`);
      }
    }
  }
}

console.log(`Total fixed: ${fixCount}`);
fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data));
console.log('Done.');
