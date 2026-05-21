const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
const keys = Object.keys(data).sort();

// Template patterns (string-based matching to avoid regex escaping issues)
function isTemplateA(ex) {
  return ex.includes('can add a real detail to my essay about');
}
function isTemplateB(ex) {
  return ex.includes('when I write about') && ex.includes('in a Yunnan English essay');
}
function isTemplateC(ex) {
  return ex.includes('In a Yunnan English writing task about') && ex.includes('I can learn the word');
}
function isTemplateD(ex) {
  return ex.includes('can add a real detail');
}
function isTemplateE(ex) {
  return ex.includes('when I write about');
}

// Bad patterns
function hasPlaceholder(ex) {
  return /\b(n\.|v\.|adj\.|adv\.|pron\.|prep\.|conj\.|art\.|num\.|int\.)\s+[a-zA-Z]+/.test(ex);
}
function hasGrammarWeird(ex) {
  return /We often in front of/.test(ex);
}
function hasYunnanHardcoded(ex) {
  return /Yunnan English/.test(ex);
}

const results = [];

for (const key of keys) {
  const sem = data[key];
  let totalEx = 0;
  let countA = 0, countB = 0, countC = 0, countD = 0, countE = 0;
  let countPlaceholders = 0, countGrammar = 0, countYunnan = 0;
  const samples = [];

  for (const day of sem.days) {
    for (const w of day.words) {
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          const ex = pd.example || '';
          totalEx++;
          if (isTemplateA(ex)) countA++;
          if (isTemplateB(ex)) countB++;
          if (isTemplateC(ex)) countC++;
          if (isTemplateD(ex)) countD++;
          if (isTemplateE(ex)) countE++;
          if (hasPlaceholder(ex)) countPlaceholders++;
          if (hasGrammarWeird(ex)) countGrammar++;
          if (hasYunnanHardcoded(ex)) countYunnan++;

          if ((isTemplateA(ex) || isTemplateB(ex) || isTemplateC(ex) || hasPlaceholder(ex)) && samples.length < 5) {
            samples.push(ex.substring(0, 140));
          }
        }
      }
    }
  }

  const templateTotal = countA + countB + countC;
  const templateRatio = totalEx > 0 ? ((templateTotal / totalEx) * 100).toFixed(1) : '0';
  results.push({
    key, totalEx, countA, countB, countC, countD, countE, templateTotal, templateRatio,
    countPlaceholders, countGrammar, countYunnan, samples
  });
}

console.log('='.repeat(110));
console.log('各学期模板句精确统计');
console.log('='.repeat(110));
console.log('学期   总例句  模板A   模板B   模板C   模板合计  占比%   占位符  语法错误  Yunnan硬编码');
console.log('-'.repeat(110));
let grandTotal = 0, grandTemplate = 0, grandPlaceholders = 0, grandGrammar = 0, grandYunnan = 0;
let grandA = 0, grandB = 0, grandC = 0, grandD = 0, grandE = 0;
for (const r of results) {
  grandTotal += r.totalEx;
  grandTemplate += r.templateTotal;
  grandPlaceholders += r.countPlaceholders;
  grandGrammar += r.countGrammar;
  grandYunnan += r.countYunnan;
  grandA += r.countA; grandB += r.countB; grandC += r.countC;
  grandD += r.countD; grandE += r.countE;
  console.log(
    r.key.padEnd(6) +
    String(r.totalEx).padStart(6) + '  ' +
    String(r.countA).padStart(5) + '   ' +
    String(r.countB).padStart(5) + '   ' +
    String(r.countC).padStart(5) + '   ' +
    String(r.templateTotal).padStart(6) + '     ' +
    String(r.templateRatio).padStart(5) + '   ' +
    String(r.countPlaceholders).padStart(4) + '     ' +
    String(r.countGrammar).padStart(4) + '       ' +
    String(r.countYunnan).padStart(4)
  );
}
console.log('-'.repeat(110));
const grandRatio = ((grandTemplate / grandTotal) * 100).toFixed(1);
console.log(
  '合计'.padEnd(6) +
  String(grandTotal).padStart(6) + '  ' +
  String(grandA).padStart(5) + '   ' +
  String(grandB).padStart(5) + '   ' +
  String(grandC).padStart(5) + '   ' +
  String(grandTemplate).padStart(6) + '     ' +
  String(grandRatio).padStart(5) + '   ' +
  String(grandPlaceholders).padStart(4) + '     ' +
  String(grandGrammar).padStart(4) + '       ' +
  String(grandYunnan).padStart(4)
);
console.log('='.repeat(110));

console.log('\n=== 扩展统计：模板变体 ===');
console.log('模板D (can add a real detail): ' + grandD);
console.log('模板E (when I write about): ' + grandE);

console.log('\n=== 各学期代表性坏例句样本 ===');
for (const r of results) {
  if (r.samples.length > 0) {
    console.log('\n[' + r.key + '] 坏例句样本:');
    r.samples.forEach((s, i) => console.log('  ' + (i+1) + '. ' + s));
  }
}
