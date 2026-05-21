const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
const keys = Object.keys(data).sort().filter(k => k !== '9a' && k !== '9b');

const patterns = {};
for (const key of keys) {
  const sem = data[key];
  for (const day of sem.days) {
    for (const w of day.words) {
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          const ex = pd.example || '';
          if (ex.includes('essay about')) {
            const p = ex.replace(new RegExp(w.word, 'g'), '{word}').replace(/".*?"/g, '"{word}"').substring(0, 120);
            patterns[p] = (patterns[p] || 0) + 1;
          }
        }
      }
    }
  }
}

console.log('Essay about template patterns:');
Object.entries(patterns).sort((a,b) => b[1]-a[1]).forEach(([p,c]) => {
  console.log('  (' + c + ') ' + p);
});
