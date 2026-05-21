import fs from 'node:fs/promises';
import path from 'node:path';

const appRoot = process.cwd();
const publicRoot = path.join(appRoot, 'public', 'ecdict');
const distRoot = path.join(appRoot, 'dist', 'ecdict');
const sourceFiles = [
  path.join(appRoot, 'src', 'components', 'GlobalSearch.tsx'),
  path.join(appRoot, 'scripts', 'vocab', 'build-ecdict-search-index.mjs'),
];

const RAW_EXCHANGE_RE = /\b(?:s|p|i|d|3|r|t|0|1):[A-Za-z][^；，。<\]\s"]*(?:\/(?:s|p|i|d|3|r|t|0|1):[A-Za-z][^；，。<\]\s"]*)+/;
const failures = [];

await assertNoRawExchangeInSource();
await assertChunkFormat(publicRoot, 'public');
await assertChunkFormat(distRoot, 'dist');

if (failures.length > 0) {
  console.error('ECDICT display audit failed:');
  for (const item of failures) console.error(`- ${item}`);
  process.exitCode = 1;
} else {
  console.log('ECDICT display audit passed');
}

async function assertNoRawExchangeInSource() {
  for (const file of sourceFiles) {
    const raw = await fs.readFile(file, 'utf8');
    if (raw.includes('词形变化：${entry.ex}')) {
      failures.push(`${path.relative(appRoot, file)} still renders raw entry.ex`);
    }
  }
}

async function assertChunkFormat(root, label) {
  const manifestPath = path.join(root, 'manifest.json');
  try {
    await fs.access(manifestPath);
  } catch {
    failures.push(`${label} ECDICT manifest is missing`);
    return;
  }

  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const balloonChunk = manifest.chunks?.ba?.file;
  if (!balloonChunk) {
    failures.push(`${label} ECDICT ba chunk missing`);
    return;
  }

  const chunkPath = path.join(root, balloonChunk);
  const chunkRaw = await fs.readFile(chunkPath, 'utf8');
  if (chunkRaw.includes('"ex"')) {
    failures.push(`${label} chunks still expose raw ex field`);
  }
  if (RAW_EXCHANGE_RE.test(chunkRaw)) {
    failures.push(`${label} chunks still contain raw slash-delimited exchange codes`);
  }

  const chunk = JSON.parse(chunkRaw);
  const balloon = chunk.entries?.find((entry) => entry.w === 'balloon');
  if (!balloon) {
    failures.push(`${label} balloon entry missing`);
    return;
  }
  const forms = Array.isArray(balloon.forms) ? balloon.forms : [];
  for (const expected of ['复数：balloons', '过去式：ballooned', '现在分词：ballooning', '过去分词：ballooned', '第三人称单数：balloons']) {
    if (!forms.includes(expected)) failures.push(`${label} balloon forms missing ${expected}`);
  }
}
