import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

let count = 0;
for (const day of data['9a'].days) {
  for (const w of day.words) {
    const cleaned = w.word
      .replace(/\s+(n|v|adj|adv|pron|prep|conj|art|num|interj)\.$/, '')
      .replace(/\s+(n|v|adj|adv|pron|prep|conj|art|num|interj)$/, '')
      .trim();
    if (cleaned !== w.word) {
      w.word = cleaned;
      count++;
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');
console.log('Cleaned', count, 'word suffixes in 9a');
