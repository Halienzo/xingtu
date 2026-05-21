import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

const report = {
  wordSuffixCleaned: 0,
  romanNumeralsRemoved: 0,
  grammarNotesRemoved: 0,
  emptyAfterClean: [],
};

// 1. Clean word suffixes
for (const day of data['9a'].days) {
  for (const w of day.words) {
    const cleaned = w.word
      .replace(/\s+(n|v|adj|adv|pron|prep|conj|art|num|interj)\.$/, '')
      .replace(/\s+(n|v|adj|adv|pron|prep|conj|art|num|interj)$/, '')
      .trim();
    if (cleaned !== w.word) {
      w.word = cleaned;
      report.wordSuffixCleaned++;
    }
  }
}

// 2. Remove roman numerals
for (const day of data['9a'].days) {
  const before = day.words.length;
  day.words = day.words.filter(w => !/^[IVX]+$/.test(w.word));
  report.romanNumeralsRemoved += (before - day.words.length);
}

// 3. Remove exact grammar note meanings
const grammarNotes = [
  '课标词汇',
  '注意英译汉',
  '语法词汇知其变',
  '注意词性变化',
  '重点短语知搭配',
  '注意固定短语的英汉互译',
  '核心单词知用法',
  '注意固定短语、句型和词块',
];

function isGrammarNote(m) {
  return grammarNotes.some(note => m.includes(note));
}

for (const day of data['9a'].days) {
  for (const w of day.words) {
    if (w.meanings) {
      const before = w.meanings.length;
      w.meanings = w.meanings.filter(m => !isGrammarNote(m));
      report.grammarNotesRemoved += (before - w.meanings.length);
      if (w.meanings.length === 0) {
        report.emptyAfterClean.push({word: w.word, pos: w.pos});
      }
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');

console.log('=== Conservative 9a Cleaning Complete ===');
console.log('Word suffixes cleaned:', report.wordSuffixCleaned);
console.log('Roman numerals removed:', report.romanNumeralsRemoved);
console.log('Grammar notes removed:', report.grammarNotesRemoved);
console.log('Empty after clean:', report.emptyAfterClean.length);
if (report.emptyAfterClean.length > 0) {
  console.log('\nEmpty entries:');
  for (const item of report.emptyAfterClean.slice(0, 30)) {
    console.log(`  ${item.word} | ${item.pos}`);
  }
}

// 4. Summary stats
let total = 0, empty = 0, merged = 0;
for (const day of data['9a'].days) {
  for (const w of day.words) {
    total++;
    if (!w.meanings || w.meanings.length === 0) empty++;
    else if (w.meanings.length === 1 && /[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}/.test(w.meanings[0])) merged++;
  }
}
console.log('\n=== Stats ===');
console.log('Total words:', total);
console.log('Empty meanings:', empty);
console.log('Merged meanings:', merged);
console.log('Clean meanings:', total - empty - merged);
