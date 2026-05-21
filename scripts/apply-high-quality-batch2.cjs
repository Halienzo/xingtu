const fs = require('fs');
const batch1 = require('./high-quality-examples-batch1.cjs');
const batch2 = require('./high-quality-examples-batch2.cjs');

console.log('Loading calendarData.json...');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
let fixCount = 0;
let newlyFixed = 0;

// Merge both batches
const highQualityExamples = { ...batch1.highQualityExamples, ...batch2.highQualityExamples };

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

// Show samples
console.log('\n=== Sample results ===');
const sampleWords = ['cat', 'dog', 'car', 'bed', 'cold', 'day', 'sky'];
let shown = 0;
for (const key of ['1a', '2b', '3a', '4b', '5a']) {
  if (shown >= 10) break;
  const sem = data[key];
  if (!sem) continue;
  for (const day of sem.days.slice(0, 10)) {
    if (shown >= 10) break;
    for (const w of day.words) {
      if (sampleWords.includes(w.word) && w.posDetails) {
        for (const pd of w.posDetails) {
          console.log(`[${key} D${day.day}] ${w.word}: ${pd.example}`);
          shown++;
          if (shown >= 10) break;
        }
      }
      if (shown >= 10) break;
    }
  }
}

console.log('\nWriting back to calendarData.json...');
fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data));
console.log('Done.');
