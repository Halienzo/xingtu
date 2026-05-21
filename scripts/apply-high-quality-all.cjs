const fs = require('fs');
const batch1 = require('./high-quality-examples-batch1.cjs');
const batch2 = require('./high-quality-examples-batch2.cjs');
const batch3 = require('./high-quality-examples-batch3.cjs');

console.log('Loading calendarData.json...');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
let fixCount = 0;

// Merge all batches
const highQualityExamples = { 
  ...batch1.highQualityExamples, 
  ...batch2.highQualityExamples,
  ...batch3.highQualityExamples
};

const keys = Object.keys(data).sort().filter(k => k !== '9a' && k !== '9b');
const wordUsageCounters = {};

for (const key of keys) {
  const sem = data[key];
  for (let dayIdx = 0; dayIdx < sem.days.length; dayIdx++) {
    const day = sem.days[dayIdx];
    for (let wordIdx = 0; wordIdx < day.words.length; wordIdx++) {
      const w = day.words[wordIdx];
      if (!w.posDetails) continue;
      
      const examples = highQualityExamples[w.word];
      if (!examples || examples.length === 0) continue;
      
      if (!wordUsageCounters[w.word]) wordUsageCounters[w.word] = 0;
      const idx = wordUsageCounters[w.word] % examples.length;
      wordUsageCounters[w.word]++;
      
      const ex = examples[idx];
      
      for (const pd of w.posDetails) {
        const oldEx = pd.example || '';
        pd.example = ex.en;
        pd.exampleCn = ex.cn;
        
        if (w.example === oldEx) {
          w.example = ex.en;
        }
        
        fixCount++;
      }
    }
  }
}

console.log(`Applied high-quality examples to ${fixCount} entries.`);
console.log('Total words covered: ' + Object.keys(wordUsageCounters).length);

console.log('\nWriting back to calendarData.json...');
fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data));
console.log('Done.');
