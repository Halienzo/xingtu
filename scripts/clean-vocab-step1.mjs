import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// Backup
fs.writeFileSync('src/data/calendarData.json.bak.pre-clean', raw, 'utf8');

const posSuffixPattern = /\s+(n|v|adj|adv|prep|pron|conj|art|num|modal\s+v|aux\s+v)\b\.?$/i;

const report = {
  totalSemesters: 0,
  totalWords: 0,
  cleanedWords: 0,
  emptyPos: 0,
  multiPos: 0,
  phraseEntries: 0,
  grammarEntries: 0,
  chapterMarkers: 0,
  samples: []
};

for (const [semKey, sem] of Object.entries(data)) {
  report.totalSemesters++;
  for (const day of sem.days) {
    for (const w of day.words) {
      report.totalWords++;
      const originalWord = w.word;
      
      // Step 1: Remove POS suffix from word field
      const cleanedWord = originalWord.replace(posSuffixPattern, '').trim();
      if (cleanedWord !== originalWord) {
        w.word = cleanedWord;
        report.cleanedWords++;
      }
      
      // Categorize
      const word = w.word;
      if (!w.pos) report.emptyPos++;
      else if (w.pos.includes('/')) report.multiPos++;
      
      if (/^(I{1,3}|IV|V|VI|VII|VIII|IX|X)$/i.test(word)) {
        report.chapterMarkers++;
      } else if (/\s/.test(word) && word.length > 10) {
        report.phraseEntries++;
      } else if (/\s/.test(word) && /(has|have|had|be|been|being|do|does|did|will|would|can|could|may|might|must|should|shall)/i.test(word)) {
        report.grammarEntries++;
      }
      
      // Collect samples for first 100 words of 9a
      if (semKey === '9a' && report.samples.length < 100) {
        report.samples.push({
          idx: report.samples.length + 1,
          original: originalWord,
          cleaned: word,
          pos: w.pos,
          meanings: w.meanings
        });
      }
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');
fs.writeFileSync('scripts/clean-report-step1.json', JSON.stringify(report, null, 2), 'utf8');

console.log('=== Step 1: Word field cleaning complete ===');
console.log('Total semesters:', report.totalSemesters);
console.log('Total words:', report.totalWords);
console.log('Words with POS suffix removed:', report.cleanedWords);
console.log('Empty pos:', report.emptyPos);
console.log('Multi-pos:', report.multiPos);
console.log('Chapter markers (I/II/III/IV):', report.chapterMarkers);
console.log('Phrase entries:', report.phraseEntries);
console.log('Grammar entries:', report.grammarEntries);
console.log('\nFirst 20 samples from 9a:');
for (const s of report.samples.slice(0, 20)) {
  console.log(`  #${s.idx}: "${s.original}" → "${s.cleaned}" | pos="${s.pos}" | meanings=${JSON.stringify(s.meanings)}`);
}
