const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));

console.log('=== 语法错误位置详细数据 ===');
const grammarTargets = [
  { sem: '5b', day: 1 }, { sem: '5b', day: 13 }, { sem: '5b', day: 25 },
  { sem: '5b', day: 37 }, { sem: '5b', day: 50 }, { sem: '5b', day: 62 },
  { sem: '5b', day: 74 }, { sem: '5b', day: 86 }, { sem: '5b', day: 98 },
  { sem: '5b', day: 110 }, { sem: '5b', day: 123 }, { sem: '5b', day: 135 },
  { sem: '5b', day: 147 }, { sem: '5b', day: 159 }, { sem: '5b', day: 171 },
  { sem: '5b', day: 183 }, { sem: '5b', day: 196 }, { sem: '5b', day: 208 },
  { sem: '5b', day: 220 }, { sem: '5b', day: 232 }, { sem: '5b', day: 244 },
  { sem: '5b', day: 256 }, { sem: '5b', day: 269 }, { sem: '5b', day: 281 },
  { sem: '5b', day: 293 }, { sem: '5b', day: 305 }, { sem: '5b', day: 317 },
  { sem: '5b', day: 329 }, { sem: '5b', day: 342 }, { sem: '5b', day: 354 },
  { sem: '7a', day: 22 }, { sem: '7a', day: 221 },
  { sem: '7b', day: 121 }
];

for (const t of grammarTargets) {
  const sem = data[t.sem];
  const day = sem.days.find(d => d.day === t.day);
  if (day) {
    for (const w of day.words) {
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          if (pd.example && pd.example.includes('We often in front of')) {
            console.log(`[${t.sem} Day${t.day}] word="${w.word}" pos="${pd.pos}" meaning="${pd.meaning}"`);
            console.log(`  EN: ${pd.example}`);
            console.log(`  CN: ${pd.exampleCn}`);
          }
        }
      }
    }
  }
}

console.log('\n=== 占位符残留位置详细数据 ===');
const placeholderTargets = [
  { sem: '7b', day: 96 }, { sem: '7b', day: 152 },
  { sem: '8b', day: 1 }, { sem: '8b', day: 324 }
];

for (const t of placeholderTargets) {
  const sem = data[t.sem];
  const day = sem.days.find(d => d.day === t.day);
  if (day) {
    for (const w of day.words) {
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          const ex = pd.example || '';
          if (/\b(n\.|v\.|adj\.|adv\.|pron\.|prep\.|conj\.|art\.|num\.|int\.)\s+[a-zA-Z]+/.test(ex) ||
              /\b(n\.|v\.|adj\.|adv\.)\b/.test(ex)) {
            console.log(`[${t.sem} Day${t.day}] word="${w.word}" pos="${pd.pos}" meaning="${pd.meaning}"`);
            console.log(`  EN: ${pd.example}`);
            console.log(`  CN: ${pd.exampleCn}`);
          }
        }
      }
    }
  }
}

// Also check what words exist on 8b Day1 and 8b Day324
console.log('\n=== 8b Day1 所有词 ===');
const day8b1 = data['8b'].days.find(d => d.day === 1);
if (day8b1) {
  for (const w of day8b1.words) {
    console.log(`word="${w.word}" pos="${w.pos}" meaning="${w.meaning}"`);
    if (w.posDetails) {
      for (const pd of w.posDetails) {
        console.log(`  posDetail: pos="${pd.pos}" meaning="${pd.meaning}" ex="${pd.example}"`);
      }
    }
  }
}

console.log('\n=== 8b Day324 所有词 ===');
const day8b324 = data['8b'].days.find(d => d.day === 324);
if (day8b324) {
  for (const w of day8b324.words) {
    console.log(`word="${w.word}" pos="${w.pos}" meaning="${w.meaning}"`);
    if (w.posDetails) {
      for (const pd of w.posDetails) {
        console.log(`  posDetail: pos="${pd.pos}" meaning="${pd.meaning}" ex="${pd.example}"`);
      }
    }
  }
}

console.log('\n=== 7b Day96 所有词 ===');
const day7b96 = data['7b'].days.find(d => d.day === 96);
if (day7b96) {
  for (const w of day7b96.words) {
    console.log(`word="${w.word}" pos="${w.pos}" meaning="${w.meaning}"`);
    if (w.posDetails) {
      for (const pd of w.posDetails) {
        console.log(`  posDetail: pos="${pd.pos}" meaning="${pd.meaning}" ex="${pd.example}"`);
      }
    }
  }
}

console.log('\n=== 7b Day152 所有词 ===');
const day7b152 = data['7b'].days.find(d => d.day === 152);
if (day7b152) {
  for (const w of day7b152.words) {
    console.log(`word="${w.word}" pos="${w.pos}" meaning="${w.meaning}"`);
    if (w.posDetails) {
      for (const pd of w.posDetails) {
        console.log(`  posDetail: pos="${pd.pos}" meaning="${pd.meaning}" ex="${pd.example}"`);
      }
    }
  }
}
