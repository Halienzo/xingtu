import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
const sem = data['9a'];

// Process first 50 words: clean data + rewrite sentences
let count = 0;
const rewritten = [];

for (const day of sem.days) {
  for (const w of day.words) {
    count++;
    if (count > 50) break;
    
    // Store original for reference
    rewritten.push({
      idx: count,
      original: {
        word: w.word,
        pos: w.pos,
        meanings: w.meanings,
        example: w.example,
        posDetails: w.posDetails
      },
      cleaned: null // to be filled
    });
  }
  if (count > 50) break;
}

fs.writeFileSync('scripts/9a-batch1-work.json', JSON.stringify(rewritten, null, 2), 'utf8');
console.log('Extracted first 50 words to scripts/9a-batch1-work.json');
console.log('Total:', rewritten.length);
