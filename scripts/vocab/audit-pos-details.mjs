import fs from 'node:fs/promises';
import path from 'node:path';

const appRoot = process.cwd();
const calendarPath = path.join(appRoot, 'src', 'data', 'calendarData.json');
const outRoot = path.join(appRoot, 'generated', 'vocabulary');
const jsonOut = path.join(outRoot, 'pos-detail-audit.json');
const mdOut = path.join(outRoot, 'pos-detail-audit.md');

const data = JSON.parse(await fs.readFile(calendarPath, 'utf8'));
const placements = [];
const unique = new Map();
const invalidDetails = [];
const missingDetails = [];

for (const [planKey, plan] of Object.entries(data)) {
  for (const day of plan.days || []) {
    for (const word of day.words || []) {
      const row = {
        planKey,
        dateISO: day.dateISO,
        word: word.word,
        pos: word.pos || '',
        meanings: word.meanings || [],
        posDetails: word.posDetails || [],
      };
      placements.push(row);

      const key = String(word.word || '').trim().toLowerCase();
      const current = unique.get(key) || {
        word: word.word,
        placements: 0,
        maxPosDetails: 0,
        posSet: new Set(),
      };
      current.placements += 1;
      current.maxPosDetails = Math.max(current.maxPosDetails, row.posDetails.length);
      for (const detail of row.posDetails) current.posSet.add(detail.pos);
      unique.set(key, current);

      if (row.posDetails.length === 0) missingDetails.push(row);
      for (const detail of row.posDetails) {
        if (!detail.pos || !detail.meaning) {
          invalidDetails.push({ ...row, badDetail: detail });
        }
      }
    }
  }
}

const uniqueRows = Array.from(unique.values()).map((item) => ({
  word: item.word,
  placements: item.placements,
  maxPosDetails: item.maxPosDetails,
  pos: Array.from(item.posSet).join('/'),
}));

const balloonRows = placements.filter((row) => String(row.word || '').toLowerCase() === 'balloon');
const balloonPos = new Set(balloonRows.flatMap((row) => row.posDetails.map((detail) => detail.pos)));
const expectedBalloonPos = ['n.', 'vi.', 'vt.', 'adj.'];
const missingBalloonPos = expectedBalloonPos.filter((pos) => !balloonPos.has(pos));

const audit = {
  generatedAt: new Date().toISOString(),
  calendarPath,
  totals: {
    plans: Object.keys(data).length,
    placements: placements.length,
    uniqueWords: uniqueRows.length,
    multiPosPlacements: placements.filter((row) => row.posDetails.length > 1).length,
    multiPosUniqueWords: uniqueRows.filter((row) => row.maxPosDetails > 1).length,
    missingDetails: missingDetails.length,
    invalidDetails: invalidDetails.length,
  },
  assertions: {
    balloonExpectedPos: expectedBalloonPos,
    balloonActualPos: Array.from(balloonPos),
    balloonMissingPos: missingBalloonPos,
    balloonRows: balloonRows.slice(0, 5),
  },
  samples: {
    multiPosWords: uniqueRows
      .filter((row) => row.maxPosDetails > 1)
      .sort((a, b) => b.maxPosDetails - a.maxPosDetails || a.word.localeCompare(b.word))
      .slice(0, 80),
    missingDetails: missingDetails.slice(0, 80),
    invalidDetails: invalidDetails.slice(0, 80),
  },
};

await fs.writeFile(jsonOut, `${JSON.stringify(audit, null, 2)}\n`, 'utf8');
await fs.writeFile(mdOut, buildMarkdown(audit), 'utf8');

if (missingBalloonPos.length > 0 || invalidDetails.length > 0 || Object.keys(data).length !== 24) {
  console.error(`POS detail audit failed. Report: ${jsonOut}`);
  process.exitCode = 1;
} else {
  console.log(`POS detail audit passed. Report: ${jsonOut}`);
}

function buildMarkdown(audit) {
  const lines = [
    '# POS Detail Audit',
    '',
    `Generated: ${audit.generatedAt}`,
    '',
    '## Totals',
    '',
    `- Plans: ${audit.totals.plans}`,
    `- Word placements: ${audit.totals.placements}`,
    `- Unique words/phrases: ${audit.totals.uniqueWords}`,
    `- Multi-POS placements: ${audit.totals.multiPosPlacements}`,
    `- Multi-POS unique words/phrases: ${audit.totals.multiPosUniqueWords}`,
    `- Missing posDetails: ${audit.totals.missingDetails}`,
    `- Invalid posDetails: ${audit.totals.invalidDetails}`,
    '',
    '## Balloon Assertion',
    '',
    `- Expected: ${audit.assertions.balloonExpectedPos.join('/')}`,
    `- Actual: ${audit.assertions.balloonActualPos.join('/')}`,
    `- Missing: ${audit.assertions.balloonMissingPos.join('/') || 'None'}`,
    '',
    '## Multi-POS Samples',
    '',
    '| Word | Max POS details | POS | Placements |',
    '| --- | ---: | --- | ---: |',
  ];
  for (const item of audit.samples.multiPosWords.slice(0, 40)) {
    lines.push(`| ${escapeMd(item.word)} | ${item.maxPosDetails} | ${escapeMd(item.pos)} | ${item.placements} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function escapeMd(value) {
  return String(value || '').replace(/\|/g, '\\|');
}
