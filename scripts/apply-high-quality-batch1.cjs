const fs = require('fs');
const { highQualityExamples } = require('./high-quality-examples-batch1.cjs');

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
      
      // Use a counter per word to cycle through different examples
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
console.log('Words covered: ' + Object.keys(wordUsageCounters).length);

// Show sample
console.log('\n=== Sample results ===');
const sampleWords = ['orange', 'bird', 'tree', 'run', 'happy'];
for (const key of ['1a', '2b', '3a']) {
  const sem = data[key];
  if (!sem) continue;
  const day = sem.days[0];
  for (const w of day.words) {
    if (sampleWords.includes(w.word) && w.posDetails) {
      for (const pd of w.posDetails) {
        console.log(`[${key} D${day.day}] ${w.word}: ${pd.example}`);
      }
    }
  }
}

console.log('\nWriting back to calendarData.json...');
fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data));
console.log('Done.');
