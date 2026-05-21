import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const grammarSystemPath = path.join(root, 'src', 'sections', 'GrammarSystem.tsx');
const detailFiles = [
  path.join(root, 'src', 'data', 'grammarCoreDetails.ts'),
  path.join(root, 'src', 'data', 'grammarDeepDiveData.ts'),
];
const examFocusPath = path.join(root, 'src', 'data', 'grammarExamFocusData.ts');

const systemText = fs.readFileSync(grammarSystemPath, 'utf8');
const itemIds = [...systemText.matchAll(/\{\s*id:\s*'([^']+)'\s*,\s*title:\s*'[^']+'\s*,\s*desc:/g)]
  .map(match => match[1]);

const detailIds = new Set();
for (const file of detailFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(/^\s{2}(?:'([^']+)'|([A-Za-z][\w]*)):\s*\{/gm)) {
    detailIds.add(match[1] || match[2]);
  }
}

const missing = itemIds.filter(id => !detailIds.has(id));
const extra = [...detailIds].filter(id => !itemIds.includes(id));

const examText = fs.readFileSync(examFocusPath, 'utf8');
const examFocusIds = new Set(
  [...examText.matchAll(/^\s{2}(?:'([^']+)'|([A-Za-z][\w-]*)):\s*\{/gm)]
    .map(match => match[1] || match[2])
);
const missingExamFocus = itemIds.filter(id => !examFocusIds.has(id));
const extraExamFocus = [...examFocusIds].filter(id => !itemIds.includes(id));

const bannedPhrases = [
  '当前详情页先提供可学习的核心入口',
  '后续可继续扩展为专项题库和可视化拆分',
  '核心学习路径',
  '知识点按钮现在都会进入详情页',
  'I will turn this rule into one sentence I can use.',
  '每个知识点都保留可继续扩写的数据接口',
  '遇到空白详情时优先补数据',
];

const bannedHits = [];
for (const file of [grammarSystemPath, ...detailFiles, examFocusPath]) {
  const text = fs.readFileSync(file, 'utf8');
  for (const phrase of bannedPhrases) {
    if (text.includes(phrase)) {
      bannedHits.push(`${path.relative(root, file)} contains banned placeholder phrase: ${phrase}`);
    }
  }
}

if (missing.length || missingExamFocus.length || bannedHits.length) {
  console.error('[audit:grammar-details] failed');
  if (missing.length) console.error(`Missing details for ${missing.length} item(s): ${missing.join(', ')}`);
  if (missingExamFocus.length) console.error(`Missing exam focus for ${missingExamFocus.length} item(s): ${missingExamFocus.join(', ')}`);
  for (const hit of bannedHits) console.error(hit);
  process.exit(1);
}

console.log(`[audit:grammar-details] ok: ${itemIds.length} grammar items have dedicated details and exam-focus traps.`);
if (extra.length) {
  console.log(`[audit:grammar-details] note: ${extra.length} detail id(s) are not currently linked from GrammarSystem: ${extra.join(', ')}`);
}
if (extraExamFocus.length) {
  console.log(`[audit:grammar-details] note: ${extraExamFocus.length} exam-focus id(s) are not currently linked from GrammarSystem: ${extraExamFocus.join(', ')}`);
}
