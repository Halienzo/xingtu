import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

const lines = [];
for (const day of data['9a'].days) {
  lines.push(`\n=== Day ${day.day} ===`);
  for (const w of day.words) {
    const meanings = w.meanings?.join(' / ') || '[EMPTY]';
    lines.push(`${w.word} | ${w.pos} | ${meanings}`);
  }
}

fs.writeFileSync('scripts/vocab-9a.txt', lines.join('\n'), 'utf8');
console.log('Extracted', data['9a'].days.reduce((s,d)=>s+d.words.length,0), 'words to vocab-9a.txt');
