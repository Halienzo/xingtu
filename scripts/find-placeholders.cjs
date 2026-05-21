const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));

for (const key of ['7b','8b']) {
  const sem = data[key];
  for (const day of sem.days) {
    for (const w of day.words) {
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          const ex = pd.example || '';
          if (/n\.\s*[TX]|it is adj\. to do/.test(ex) || /n\.\s*[TX]|it is adj\. to do/.test(w.word)) {
            console.log('[' + key + ' D' + day.day + '] word="' + w.word + '" pos=' + pd.pos + ' meaning=' + pd.meaning);
            console.log('  EN: ' + pd.example);
            console.log('  CN: ' + pd.exampleCn);
          }
        }
      }
    }
  }
}
