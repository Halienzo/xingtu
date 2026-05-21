import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

const report = { semesters: 0, suffixCleaned: 0, romanRemoved: 0, len3Fixed: 0, len2Fixed: 0 };

function isRelated(meanings) {
  const chars = meanings.map(m => {
    const c = m.match(/[\u4e00-\u9fa5]/g) || [];
    return new Set(c);
  });
  for (let i = 1; i < chars.length; i++) {
    let shared = 0;
    for (const c of chars[0]) {
      if (chars[i].has(c)) shared++;
    }
    if (shared >= 1) return true;
  }
  return false;
}

for (const [semKey, sem] of Object.entries(data)) {
  if (semKey === '9a' || semKey === '9b') continue; // Already done
  report.semesters++;
  
  // 1. Clean word suffixes
  for (const day of sem.days) {
    for (const w of day.words) {
      const cleaned = w.word
        .replace(/\s+(n|v|adj|adv|pron|prep|conj|art|num|interj)\.$/, '')
        .replace(/\s+(n|v|adj|adv|pron|prep|conj|art|num|interj)$/, '')
        .trim();
      if (cleaned !== w.word) {
        w.word = cleaned;
        report.suffixCleaned++;
      }
    }
  }
  
  // 2. Remove roman numerals
  for (const day of sem.days) {
    const before = day.words.length;
    day.words = day.words.filter(w => !/^[IVX]+$/.test(w.word));
    report.romanRemoved += (before - day.words.length);
  }
  
  // 3. Fix len3/len2 merged meanings
  for (const day of sem.days) {
    for (const w of day.words) {
      if (w.meanings?.length === 3 && !isRelated(w.meanings)) {
        w.meanings = [w.meanings[0]];
        report.len3Fixed++;
      } else if (w.meanings?.length === 2 && !isRelated(w.meanings)) {
        w.meanings = [w.meanings[0]];
        report.len2Fixed++;
      }
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');

console.log('=== All Semesters Cleaning ===');
console.log('Semesters processed:', report.semesters);
console.log('Word suffixes cleaned:', report.suffixCleaned);
console.log('Roman numerals removed:', report.romanRemoved);
console.log('Len3 merged fixed:', report.len3Fixed);
console.log('Len2 merged fixed:', report.len2Fixed);
