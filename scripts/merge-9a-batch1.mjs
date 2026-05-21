import fs from 'fs';

// Read main data
const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// Read cleaned batch
const cleaned = JSON.parse(fs.readFileSync('scripts/9a-cleaned-batch1.json', 'utf8'));

// Create a map from idx -> cleaned data
const cleanedMap = new Map();
for (const item of cleaned) {
  cleanedMap.set(item.idx, item);
}

// Backup original
const backupPath = `src/data/calendarData.json.bak.${new Date().toISOString().slice(0,10).replace(/-/g,'')}`;
fs.writeFileSync(backupPath, raw, 'utf8');
console.log('Backup created:', backupPath);

// Merge into 9a
const sem = data['9a'];
let count = 0;
let replaced = 0;

for (const day of sem.days) {
  for (let i = 0; i < day.words.length; i++) {
    count++;
    if (count > 50) break;
    
    const cleanedItem = cleanedMap.get(count);
    if (cleanedItem) {
      // Replace word data while preserving fields not in cleaned data
      const original = day.words[i];
      day.words[i] = {
        word: cleanedItem.word,
        phonetic: cleanedItem.phonetic,
        syllables: cleanedItem.syllables,
        syllableParts: cleanedItem.syllableParts,
        syllableColors: cleanedItem.syllableColors,
        pos: cleanedItem.pos,
        meanings: cleanedItem.meanings,
        phrases: cleanedItem.phrases,
        example: cleanedItem.example,
        memoryTip: cleanedItem.memoryTip,
        posDetails: cleanedItem.posDetails
      };
      replaced++;
    }
  }
  if (count > 50) break;
}

// Write back
fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');
console.log(`Merged ${replaced} words into 9a (first 50 positions)`);
console.log('Total file size:', (fs.statSync('src/data/calendarData.json').size / 1024 / 1024).toFixed(2), 'MB');
