import fs from 'fs';

const raw = fs.readFileSync('src/data/calendarData.json', 'utf8');
const data = JSON.parse(raw);

// ========== CLEANING RULES ==========

// 1. Remove grammar-note meanings (not real definitions)
const grammarNotePatterns = [
  /^课标词汇/,
  /^注意/,
  /^语法词汇/,
  /^重点短语/,
  /^核心单词/,
  /^其后接/,
  /^表示去过/,
  /^表示某人已去/,
  /^作形容词，意为/,
  /^的其他用法/,
  /^的比较级/,
  /^(单数|复数|原形|过去式|过去分词|现在分词)/,
  /^用于构成/,
  /^第三人称单数/,
  /^主格/,
  /^宾格/,
  /^(n\.|v\.|adj\.|adv\.|prep\.|pron\.|conj\.|art\.|num\.)\s*$/,
];

function isGrammarNote(meaning) {
  return grammarNotePatterns.some(p => p.test(meaning));
}

// 2. Check if a meaning is likely related to the word (simple heuristic)
function isLikelyRelated(word, meaning) {
  if (!word || !meaning) return false;
  const w = word.toLowerCase();
  const m = meaning.toLowerCase();
  
  // Direct substring match
  if (m.includes(w) || w.includes(m)) return true;
  
  // Common meaning keywords for common words
  const commonWordMap = {
    'festival': ['节日', '庆典', '庆祝'],
    'mooncake': ['月饼'],
    'lantern': ['灯笼'],
    'stranger': ['陌生人', '陌生'],
    'pound': ['磅', '英镑', '重击'],
    'steal': ['偷', '窃取'],
    'tradition': ['传统', '惯例'],
    'trick': ['花招', '把戏', '诡计', '技巧'],
    'novel': ['小说', '新颖'],
    'warn': ['警告', '警戒', '提醒'],
    'relative': ['亲戚', '亲属', '相对'],
    'garden': ['花园', '园子', '园艺'],
    'admire': ['欣赏', '仰慕', '钦佩'],
    'tie': ['领带', '捆', '系', '绑', '平局'],
    'haunted': ['闹鬼', '出没'],
    'treat': ['款待', '招待', '治疗', '对待'],
    'fool': ['蠢人', '傻瓜', '愚弄', '愚蠢'],
    'dead': ['死', '失去生命'],
    'business': ['生意', '商业', '事务'],
    'punish': ['处罚', '惩罚'],
    'present': ['现在', '礼物', '目前的', '出席'],
    'warmth': ['温暖', '暖和', '热情'],
    'spread': ['传播', '展开', '蔓延', '涂抹'],
    'from': ['从', '来自', '由'],
    'throw': ['扔', '抛', '投', '掷'],
  };
  
  if (commonWordMap[w]) {
    return commonWordMap[w].some(kw => m.includes(kw));
  }
  
  return true; // Default: keep if no specific rule
}

// 3. Merge split phrase meanings
function mergeSplitMeanings(word, meanings) {
  if (!word || !meanings || meanings.length <= 1) return meanings;
  
  // If word is a phrase and meanings are very short, merge them
  if (word.includes(' ') && meanings.length >= 2) {
    const avgLen = meanings.reduce((sum, m) => sum + m.length, 0) / meanings.length;
    if (avgLen < 6) {
      return [meanings.join('')];
    }
  }
  
  return meanings;
}

// ========== PROCESS ALL WORDS ==========

const stats = {
  total: 0,
  grammarNotesRemoved: 0,
  meaningsMerged: 0,
  unrelatedRemoved: 0,
  emptyMeanings: 0,
  needsReview: [],
};

for (const [semKey, sem] of Object.entries(data)) {
  for (const day of sem.days) {
    for (const w of day.words) {
      stats.total++;
      
      let meanings = w.meanings || [];
      const originalWord = w.word;
      
      // Step 1: Remove grammar-note meanings
      const beforeFilter = meanings.length;
      meanings = meanings.filter(m => {
        if (isGrammarNote(m)) {
          stats.grammarNotesRemoved++;
          return false;
        }
        return true;
      });
      
      // Step 2: Merge split phrase meanings
      const beforeMerge = meanings.length;
      meanings = mergeSplitMeanings(originalWord, meanings);
      if (meanings.length < beforeMerge) {
        stats.meaningsMerged++;
      }
      
      // Step 3: Filter unrelated meanings (for known words)
      const beforeUnrelated = meanings.length;
      meanings = meanings.filter(m => isLikelyRelated(originalWord, m));
      if (meanings.length < beforeUnrelated) {
        stats.unrelatedRemoved += (beforeUnrelated - meanings.length);
      }
      
      // Step 4: If empty after filtering, mark for review
      if (meanings.length === 0) {
        stats.emptyMeanings++;
        stats.needsReview.push({
          sem: semKey,
          word: originalWord,
          pos: w.pos,
          originalMeanings: w.meanings,
        });
      }
      
      w.meanings = meanings;
    }
  }
}

fs.writeFileSync('src/data/calendarData.json', JSON.stringify(data), 'utf8');
fs.writeFileSync('scripts/clean-report-step2.json', JSON.stringify({
  stats,
  needsReview: stats.needsReview.slice(0, 100),
}, null, 2), 'utf8');

console.log('=== Step 2: Meaning cleaning complete ===');
console.log('Total words:', stats.total);
console.log('Grammar notes removed:', stats.grammarNotesRemoved);
console.log('Meanings merged:', stats.meaningsMerged);
console.log('Unrelated meanings removed:', stats.unrelatedRemoved);
console.log('Words with empty meanings after cleaning:', stats.emptyMeanings);
console.log('Words needing review:', stats.needsReview.length);
console.log('\nFirst 20 words needing review:');
for (const item of stats.needsReview.slice(0, 20)) {
  console.log(`  [${item.sem}] ${item.word} | pos="${item.pos}" | original=${JSON.stringify(item.originalMeanings)}`);
}
