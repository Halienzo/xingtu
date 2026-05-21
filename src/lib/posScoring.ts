// ============================================
// 词性评分引擎 (PosScoring)
// 基于规则分析句子是否符合指定句型和词性要求
// ============================================

export interface ScoringResult {
  score: number; // 0-100
  passed: boolean;
  dimensions: {
    sentencePattern: { score: number; feedback: string };
    targetWordUsage: { score: number; feedback: string };
    grammar: { score: number; feedback: string };
  };
  suggestions: string[];
  highlights: { text: string; type: 'good' | 'warning' | 'error' }[];
}

/**
 * 评分：检查句子是否符合指定句型，目标词是否以正确词性使用
 */
export function scoreSentence(
  sentence: string,
  targetWord: string,
  targetPos: string,
  patternCode: string
): ScoringResult {
  const trimmed = sentence.trim();
  const lower = trimmed.toLowerCase();
  const wordLower = targetWord.toLowerCase();

  const dimensions = {
    sentencePattern: { score: 0, feedback: '' },
    targetWordUsage: { score: 0, feedback: '' },
    grammar: { score: 0, feedback: '' },
  };
  const suggestions: string[] = [];
  const highlights: { text: string; type: 'good' | 'warning' | 'error' }[] = [];

  // ====== 维度1：目标词是否出现 ======
  const hasTargetWord = lower.includes(wordLower);
  if (!hasTargetWord) {
    dimensions.targetWordUsage.score = 0;
    dimensions.targetWordUsage.feedback = `句子中未出现目标词 "${targetWord}"`;
    suggestions.push(`请在句子中使用目标词 "${targetWord}"`);
    highlights.push({ text: targetWord, type: 'error' });
  }

  // ====== 维度2：目标词的词性使用 ======
  if (hasTargetWord) {
    const posScore = analyzePosUsage(trimmed, targetWord, targetPos);
    dimensions.targetWordUsage = posScore;
    if (posScore.score < 100) {
      suggestions.push(posScore.feedback);
    }
    highlights.push({ text: targetWord, type: posScore.score >= 80 ? 'good' : posScore.score >= 50 ? 'warning' : 'error' });
  }

  // ====== 维度3：句型匹配 ======
  const patternScore = analyzePattern(trimmed, patternCode);
  dimensions.sentencePattern = patternScore;
  if (patternScore.score < 100) {
    suggestions.push(patternScore.feedback);
  }

  // ====== 维度4：基础语法检查 ======
  const grammarScore = checkBasicGrammar(trimmed);
  dimensions.grammar = grammarScore;
  if (grammarScore.score < 100) {
    suggestions.push(grammarScore.feedback);
  }

  // 总分（加权）
  const totalScore = Math.round(
    dimensions.targetWordUsage.score * 0.4 +
    dimensions.sentencePattern.score * 0.35 +
    dimensions.grammar.score * 0.25
  );

  return {
    score: totalScore,
    passed: totalScore >= 60,
    dimensions,
    suggestions: suggestions.slice(0, 3),
    highlights,
  };
}

function analyzePosUsage(sentence: string, word: string, pos: string): { score: number; feedback: string } {
  const lower = sentence.toLowerCase();
  const wordLower = word.toLowerCase();

  // 找到词在句子中的位置
  const index = lower.indexOf(wordLower);
  if (index === -1) {
    return { score: 0, feedback: `未找到目标词 "${word}"` };
  }

  // 简单规则：根据词性和句子位置判断
  const beforeText = sentence.slice(0, index).trim().toLowerCase();
  const afterText = sentence.slice(index + word.length).trim().toLowerCase();

  // 名词：前面可能有限定词/形容词，后面可能跟动词
  if (pos.startsWith('n')) {
    // 名词作主语/宾语：前面可能是句首或动词/介词
    const isAfterVerb = /\b(reads|loves|made|gave|is|looks|saw|found|told|bought|eats|drinks|wants|needs|has|had|took|put|sent)\s+$/.test(beforeText);
    const isAfterPrep = /\b(in|on|at|for|with|to|of|about|by|from)\s+$/.test(beforeText);
    const isSubject = beforeText === '' || beforeText.endsWith('.') || beforeText.endsWith(' ');

    if (isSubject || isAfterVerb || isAfterPrep) {
      return { score: 85, feedback: `"${word}" 作为名词使用，位置合理` };
    }
    return { score: 60, feedback: `"${word}" 作为名词，位置需要确认` };
  }

  // 动词
  if (pos.startsWith('v')) {
    // 动词通常在主语后面
    const hasSubject = beforeText.length > 0 && !beforeText.match(/^(is|are|was|were)\s/i);
    const hasObject = afterText.length > 0 && !afterText.startsWith('.') && !afterText.startsWith(',');

    if (pos === 'vi.' && hasObject && !afterText.match(/^(at|in|on|to|from|with|for|about|by)\b/)) {
      return { score: 40, feedback: `"${word}" 作为不及物动词，后面不能直接接宾语，需要加介词` };
    }

    if (hasSubject) {
      if (pos === 'vt.' && !hasObject) {
        return { score: 50, feedback: `"${word}" 作为及物动词，需要接宾语` };
      }
      return { score: 90, feedback: `"${word}" 作为动词使用，位置正确` };
    }
    return { score: 70, feedback: `"${word}" 作为动词，但句首位置不太自然` };
  }

  // 形容词
  if (pos.startsWith('adj')) {
    // 形容词修饰名词或在系动词后
    const isBeforeNoun = afterText.match(/^[a-z]/i);
    const isAfterLinking = /\b(is|are|was|were|looks|seems|becomes|feels|sounds|tastes|smells)\s+$/.test(beforeText);

    if (isBeforeNoun || isAfterLinking) {
      return { score: 90, feedback: `"${word}" 作为形容词使用，位置正确` };
    }
    return { score: 60, feedback: `"${word}" 作为形容词，通常修饰名词或在系动词后` };
  }

  // 副词
  if (pos.startsWith('adv')) {
    return { score: 80, feedback: `"${word}" 作为副词使用` };
  }

  return { score: 70, feedback: `"${word}" 的词性使用需要进一步确认` };
}

function analyzePattern(sentence: string, patternCode: string): { score: number; feedback: string } {
  const lower = sentence.toLowerCase().replace(/[^\w\s]/g, '');
  const words = lower.split(/\s+/).filter(Boolean);

  // 简单规则：根据句型检查基本结构
  switch (patternCode) {
    case 'SV': {
      // 检查是否只有两个主要成分且没有明显宾语
      if (words.length < 2) return { score: 40, feedback: 'SV 句型需要主语和谓语' };
      if (words.length > 4) return { score: 60, feedback: 'SV 句型通常较简短，注意是否加了不必要的成分' };
      return { score: 85, feedback: 'SV 句型结构合理' };
    }
    case 'SVC': {
      // 检查是否有系动词
      const hasLinking = /\b(is|are|was|were|looks|seems|becomes|feels|sounds|tastes|smells|appears|remains|stays)\b/i.test(sentence);
      if (!hasLinking) return { score: 50, feedback: 'SVC 句型需要系动词（be/look/seem/become 等）' };
      return { score: 85, feedback: 'SVC 句型结构合理' };
    }
    case 'SVO': {
      if (words.length < 3) return { score: 50, feedback: 'SVO 句型需要主语、谓语和宾语' };
      return { score: 85, feedback: 'SVO 句型结构合理' };
    }
    case 'SVOO': {
      if (words.length < 4) return { score: 50, feedback: 'SVOO 句型需要主语、谓语和两个宾语' };
      const hasDitransitive = /\b(gave|gives|sent|sends|told|tells|showed|shows|offered|offers|brought|brings|taught|teaches|bought|buys|passed|passes|lent|lends)\b/i.test(sentence);
      if (!hasDitransitive) return { score: 60, feedback: 'SVOO 句型通常使用双及物动词（give/tell/show/offer 等）' };
      return { score: 85, feedback: 'SVOO 句型结构合理' };
    }
    case 'SVOC': {
      if (words.length < 4) return { score: 50, feedback: 'SVOC 句型需要主语、谓语、宾语和宾补' };
      const hasComplex = /\b(made|makes|let|lets|had|has|have|saw|sees|found|finds|heard|hears|elected|elects|appointed|appoints|called|calls|named|names|kept|keeps|got|gets)\b/i.test(sentence);
      if (!hasComplex) return { score: 60, feedback: 'SVOC 句型通常使用复杂及物动词（make/let/see/find 等）' };
      return { score: 85, feedback: 'SVOC 句型结构合理' };
    }
    case 'SVA': {
      const hasLinking = /\b(is|are|was|were|seems|appears|remains)\b/i.test(sentence);
      const hasAdverbial = /\b(in|on|at|here|there|tomorrow|yesterday|today|now|then|soon)\b/i.test(sentence);
      if (!hasLinking) return { score: 50, feedback: 'SVA 句型需要系动词' };
      if (!hasAdverbial) return { score: 60, feedback: 'SVA 句型需要地点或时间状语' };
      return { score: 85, feedback: 'SVA 句型结构合理' };
    }
    default:
      return { score: 70, feedback: '句型分析完成' };
  }
}

function checkBasicGrammar(sentence: string): { score: number; feedback: string } {
  let issues: string[] = [];

  // 检查首字母大写
  if (!/^[A-Z]/.test(sentence.trim())) {
    issues.push('句子首字母应大写');
  }

  // 检查句末标点
  if (!/[.!?]$/.test(sentence.trim())) {
    issues.push('句子末尾需要标点符号');
  }

  // 检查常见错误
  if (/\b(am|is|are|was|were)\s+\w+ly\b/.test(sentence)) {
    issues.push('系动词后通常接形容词而非副词');
  }

  if (/\bvery\s+(good|bad|big|small|happy|sad|tired)\b/.test(sentence.toLowerCase())) {
    // very + 形容词 是合理的
  }

  if (issues.length === 0) {
    return { score: 95, feedback: '基础语法检查通过' };
  }
  if (issues.length === 1) {
    return { score: 80, feedback: issues[0] };
  }
  return { score: 70, feedback: issues.join('；') };
}

/**
 * 为 AI 批改构造 prompt
 */
export function buildAiReviewPrompt(
  sentence: string,
  targetWord: string,
  targetPos: string,
  patternCode: string
): string {
  const pattern = (() => {
    switch (patternCode) {
      case 'SV': return 'SV (Subject + Verb, 主谓)';
      case 'SVC': return 'SVC (Subject + Verb + Complement, 主系表)';
      case 'SVA': return 'SVA (Subject + Verb + Adverbial, 主系状)';
      case 'SVO': return 'SVO (Subject + Verb + Object, 主谓宾)';
      case 'SVOO': return 'SVOO (Subject + Verb + Indirect Object + Direct Object, 主谓双宾)';
      case 'SVOC': return 'SVOC (Subject + Verb + Object + Complement, 主谓宾补)';
      case 'SVOA': return 'SVOA (Subject + Verb + Object + Adverbial, 主谓宾状)';
      default: return patternCode;
    }
  })();

  return `请作为英语语法教师，批改以下学生造句。

【要求】
- 目标词：${targetWord}
- 目标词性：${targetPos}
- 目标句型：${pattern}

【学生句子】
${sentence}

【请按以下格式输出】
1. 总体评价（1-2句）
2. 目标词 "${targetWord}" 的词性使用是否正确（关键评分点）
3. 句型结构是否符合 ${patternCode}
4. 语法和用词建议
5. 修改后的推荐句子

请用中文回复，语气温柔共情。`;
}
