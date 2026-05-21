const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
const keys = Object.keys(data).sort().filter(k => k !== '9a' && k !== '9b');

// 收集所有复合词及其信息
const compounds = [];
for (const key of keys) {
  const sem = data[key];
  for (const day of sem.days) {
    for (const w of day.words) {
      const word = w.word;
      if (!word.includes(' ') && !word.includes('-') && !word.includes('...')) continue;
      
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          compounds.push({
            word: word,
            pos: pd.pos || w.pos || '',
            meaning: pd.meaning || w.meanings?.[0] || '',
            example: pd.example,
            exampleCn: pd.exampleCn,
            semester: key,
            day: day.day
          });
        }
      }
    }
  }
}

// 去重，按word聚合
const byWord = {};
for (const c of compounds) {
  if (!byWord[c.word]) {
    byWord[c.word] = { ...c, count: 0 };
  }
  byWord[c.word].count++;
}

const uniqueCompounds = Object.values(byWord);
console.log('Total unique compound words: ' + uniqueCompounds.length);
console.log('Total compound examples: ' + compounds.length);

// 按词性分组
const byPos = {};
for (const c of uniqueCompounds) {
  const pos = c.pos || 'unknown';
  if (!byPos[pos]) byPos[pos] = [];
  byPos[pos].push(c);
}

console.log('\n=== By POS ===');
for (const [pos, words] of Object.entries(byPos).sort((a,b) => b[1].length - a[1].length)) {
  console.log('\n' + pos + ' (' + words.length + ' words):');
  words.forEach((w, i) => {
    console.log('  ' + (i+1) + '. ' + w.word + ' = ' + w.meaning + ' | ex: ' + w.example.substring(0, 80));
  });
}
