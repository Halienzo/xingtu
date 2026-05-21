import fs from 'fs';

const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
const sem = data['9a'];

console.log('=== 九年级上学期（9a）前50个单词原始数据 ===\n');
let count = 0;
for (const day of sem.days.slice(0, 10)) {
  for (const w of day.words) {
    count++;
    if (count > 50) break;
    console.log(`${count}. word: "${w.word}"`);
    console.log(`   pos: "${w.pos}"`);
    console.log(`   meanings: ${JSON.stringify(w.meanings)}`);
    console.log(`   example: ${(w.example || '').substring(0, 120)}`);
    console.log('');
  }
}
