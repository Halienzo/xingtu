import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
const sem = data['9a'];

const samples = [];
let idx = 0;
for (const day of sem.days) {
  for (const w of day.words) {
    idx++;
    if ([1, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000].includes(idx)) {
      samples.push({
        idx,
        word: w.word,
        pos: w.pos,
        meanings: w.meanings,
        example: (w.example || '').substring(0, 100),
        posDetails: (w.posDetails || []).map(p => ({ pos: p.pos, meaning: p.meaning, ex: (p.example || '').substring(0, 60) }))
      });
    }
  }
}

for (const s of samples) {
  console.log(`\n#${s.idx}: word="${s.word}" pos="${s.pos}"`);
  console.log(`  meanings: ${s.meanings.join(' | ')}`);
  console.log(`  example: ${s.example}`);
  console.log(`  posDetails:`);
  for (const pd of s.posDetails) {
    console.log(`    [${pd.pos}] ${pd.meaning} | ${pd.ex}`);
  }
}

let badWordField = 0;
let goodWordField = 0;
for (const day of sem.days) {
  for (const w of day.words) {
    const word = w.word;
    if (!word || word.includes(' ') || /\d/.test(word) || word.length > 20) {
      badWordField++;
    } else {
      goodWordField++;
    }
  }
}
console.log(`\n=== word field quality ===`);
console.log(`Bad word fields: ${badWordField}`);
console.log(`Good word fields: ${goodWordField}`);
