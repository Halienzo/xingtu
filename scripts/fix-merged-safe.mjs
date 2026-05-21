import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

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

function countChinese(str) {
  return (str.match(/[\u4e00-\u9fa5]/g) || []).length;
}

const report = {
  len3MergedFixed: 0,
  len2MergedFixed: 0,
  len1MergedFixed: 0,
  samples: [],
};

for (const day of data['9a'].days) {
  for (const w of day.words) {
    if (!w.meanings) continue;
    let changed = false;
    
    // Fix length=3 merged: keep only first meaning
    if (w.meanings.length === 3 && !isRelated(w.meanings)) {
      w.meanings = [w.meanings[0]];
      report.len3MergedFixed++;
      changed = true;
    }
    
    // Fix length=2 merged: keep only first meaning
    else if (w.meanings.length === 2 && !isRelated(w.meanings)) {
      w.meanings = [w.meanings[0]];
      report.len2MergedFixed++;
      changed = true;
    }
    
    // Fix length=1 merged: extract first Chinese phrase
    else if (w.meanings.length === 1) {
      const m = w.meanings[0];
      if (countChinese(m) >= 6 && /[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}/.test(m)) {
        // Skip grammar-like explanations
        if (!/表示|其后接|从句|谓语动词|时态|短语|意思|含义|用法|结构|句型|语法/.test(m) || m.length <= 15) {
          // Split by delimiters and keep first meaningful part
          const parts = m.split(/；|----|---|--|\//).map(p => p.trim()).filter(p => p.length > 0);
          if (parts.length > 1) {
            // Keep the first part that has Chinese characters
            const firstValid = parts.find(p => countChinese(p) >= 2);
            if (firstValid && firstValid !== m) {
              w.meanings = [firstValid];
              report.len1MergedFixed++;
              changed = true;
            }
          }
        }
      }
    }
    
    if (changed && report.samples.length < 20) {
      report.samples.push({word: w.word, after: w.meanings});
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');

console.log('Length=3 merged fixed:', report.len3MergedFixed);
console.log('Length=2 merged fixed:', report.len2MergedFixed);
console.log('Length=1 merged fixed:', report.len1MergedFixed);
console.log('\nSample fixes:');
for (const s of report.samples) {
  console.log('  ' + s.word + ' → ' + JSON.stringify(s.after));
}

// Stats
let total = 0, empty = 0, merged = 0;
for (const day of data['9a'].days) {
  for (const w of day.words) {
    total++;
    if (!w.meanings || w.meanings.length === 0) empty++;
    else if (w.meanings.length === 1 && countChinese(w.meanings[0]) >= 6 && /[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}[^\u4e00-\u9fa5]*[\u4e00-\u9fa5]{2,}/.test(w.meanings[0])) merged++;
  }
}
console.log('\n=== After Fix ===');
console.log('Total:', total);
console.log('Empty:', empty);
console.log('Merged:', merged);
console.log('Clean:', total - empty - merged);
