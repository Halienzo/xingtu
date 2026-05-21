const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/calendarData.json', 'utf8'));
const keys = Object.keys(data).sort();

function isTemplateA(ex) { return ex.includes('can add a real detail to my essay about'); }
function isTemplateB(ex) { return ex.includes('when I write about') && ex.includes('in a Yunnan English essay'); }
function isTemplateC(ex) { return ex.includes('In a Yunnan English writing task about') && ex.includes('I can learn the word'); }
function hasPlaceholder(ex) { return /\b(n\.|v\.|adj\.|adv\.|pron\.|prep\.|conj\.|art\.|num\.|int\.)\s+[a-zA-Z]+/.test(ex); }
function hasGrammarWeird(ex) { return /We often in front of/.test(ex); }
function hasYunnanHardcoded(ex) { return /Yunnan English/.test(ex); }

// Collect unique bad examples with counts
const grammarErrors = [];
const placeholders = [];
const yunnanSamples = [];

for (const key of keys) {
  const sem = data[key];
  for (const day of sem.days) {
    for (const w of day.words) {
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          const ex = pd.example || '';
          const cn = pd.exampleCn || '';
          const word = w.word;
          if (hasGrammarWeird(ex)) {
            grammarErrors.push({ semester: key, day: day.day, word, ex, cn });
          }
          if (hasPlaceholder(ex)) {
            placeholders.push({ semester: key, day: day.day, word, ex, cn });
          }
        }
      }
    }
  }
}

console.log('=== 语法错误句（共 ' + grammarErrors.length + ' 条）===');
grammarErrors.forEach((item, i) => {
  console.log((i+1) + '. [' + item.semester + ' Day' + item.day + ' word=' + item.word + ']');
  console.log('   EN: ' + item.ex);
  console.log('   CN: ' + item.cn);
});

console.log('\n=== 占位符残留（共 ' + placeholders.length + ' 条）===');
placeholders.forEach((item, i) => {
  console.log((i+1) + '. [' + item.semester + ' Day' + item.day + ' word=' + item.word + ']');
  console.log('   EN: ' + item.ex);
  console.log('   CN: ' + item.cn);
});

// Also extract some "especially bad" template examples
console.log('\n=== 特别糟糕的模板句样本（ absurd word + template ）===');
let absurdCount = 0;
const absurdWords = ['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'of', 'for', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'among', 'are', 'is', 'was', 'were', 'be', 'been', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'shall', 'can', 'need', 'dare', 'ought', 'used', 'get', 'got', 'go', 'went', 'come', 'came', 'take', 'took', 'make', 'made', 'see', 'saw', 'know', 'knew', 'think', 'thought', 'say', 'said', 'tell', 'told', 'ask', 'give', 'gave', 'find', 'found', 'feel', 'felt', 'become', 'became', 'leave', 'left', 'put', 'mean', 'meant', 'keep', 'kept', 'let', 'begin', 'began', 'seem', 'help', 'show', 'showed', 'hear', 'heard', 'play', 'run', 'ran', 'move', 'live', 'believe', 'bring', 'brought', 'happen', 'stand', 'stood', 'lose', 'lost', 'pay', 'paid', 'meet', 'met', 'include', 'continue', 'set', 'learn', 'learnt', 'change', 'lead', 'led', 'understand', 'watched', 'follow', 'stop', 'create', 'speak', 'spoke', 'read', 'allow', 'add', 'spend', 'spent', 'grow', 'grew', 'open', 'walk', 'offer', 'remember', 'love', 'consider', 'appear', 'buy', 'bought', 'wait', 'serve', 'die', 'send', 'sent', 'expect', 'build', 'built', 'stay', 'fall', 'fell', 'cut', 'reach', 'kill', 'remain'];

for (const key of keys) {
  if (absurdCount >= 30) break;
  const sem = data[key];
  for (const day of sem.days) {
    if (absurdCount >= 30) break;
    for (const w of day.words) {
      if (absurdCount >= 30) break;
      if (w.posDetails) {
        for (const pd of w.posDetails) {
          const ex = pd.example || '';
          const word = w.word.toLowerCase();
          if ((isTemplateA(ex) || isTemplateB(ex) || isTemplateC(ex)) && absurdWords.includes(word)) {
            console.log((absurdCount+1) + '. [' + key + ' Day' + day.day + ' word=' + w.word + ']');
            console.log('   EN: ' + ex);
            console.log('   CN: ' + (pd.exampleCn || ''));
            absurdCount++;
            if (absurdCount >= 30) break;
          }
        }
      }
    }
  }
}
