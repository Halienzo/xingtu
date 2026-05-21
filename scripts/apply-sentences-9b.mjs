import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

const batch1 = JSON.parse(fs.readFileSync('scripts/sentences-9b-batch1.json', 'utf8'));
const batch2 = JSON.parse(fs.readFileSync('scripts/sentences-9b-batch2.json', 'utf8'));
const batch3 = JSON.parse(fs.readFileSync('scripts/sentences-9b-batch3.json', 'utf8'));
const batch4 = JSON.parse(fs.readFileSync('scripts/sentences-9b-batch4.json', 'utf8'));
const sentences = { ...batch1, ...batch2, ...batch3, ...batch4 };

let applied = 0;
let notFound = [];

for (const day of data['9b'].days) {
  for (const w of day.words) {
    const s = sentences[w.word];
    if (s) {
      w.example = s.example;
      w.posDetails = [{
        pos: s.pos || w.pos,
        meaning: s.meanings ? s.meanings[0] : (w.meanings?.[0] || ''),
        example: s.example,
        exampleCn: s.exampleCn,
      }];
      applied++;
    } else {
      notFound.push(w.word);
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');

console.log('Applied sentences to', applied, 'words in 9b');
console.log('Not in batch:', notFound.length, 'words');
if (notFound.length > 0) {
  console.log('First 20:', notFound.slice(0, 20).join(', '));
}
