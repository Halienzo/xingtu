import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

let removedCount = 0;
const totalBefore = data['9a'].days.reduce((s, d) => s + d.words.length, 0);

for (const day of data['9a'].days) {
  const before = day.words.length;
  day.words = day.words.filter(w => !/^[IVX]+$/.test(w.word));
  removedCount += (before - day.words.length);
}

const totalAfter = data['9a'].days.reduce((s, d) => s + d.words.length, 0);

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');

console.log('Removed', removedCount, 'roman numerals');
console.log('9a total before:', totalBefore);
console.log('9a total after:', totalAfter);
