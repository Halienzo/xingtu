import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../src/data');
const packFiles = readdirSync(dataDir)
  .filter(file => /^dailyWisdomVerifiedPack.*\.ts$/.test(file))
  .sort();
const source = packFiles.map(file => readFileSync(resolve(dataDir, file), 'utf8')).join('\n');

const entries = [...source.matchAll(/id:\s*'([^']+)'[\s\S]*?sourceUrl:\s*'([^']+)'/g)].map(match => ({
  id: match[1],
  url: match[2],
}));

const concurrency = Number(process.env.DAILY_WISDOM_SOURCE_CONCURRENCY || 6);
const timeoutMs = Number(process.env.DAILY_WISDOM_SOURCE_TIMEOUT || 25000);

async function checkEntry(entry) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(entry.url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'Mozilla/5.0 daily-wisdom-source-check',
        accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
    });
    clearTimeout(timer);
    return {
      ...entry,
      status: response.status,
      ok: response.status >= 200 && response.status < 400,
      finalUrl: response.url,
    };
  } catch (error) {
    clearTimeout(timer);
    return {
      ...entry,
      status: 0,
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown fetch error',
    };
  }
}

async function run() {
  const results = [];
  let cursor = 0;
  async function worker() {
    while (cursor < entries.length) {
      const entry = entries[cursor];
      cursor += 1;
      results.push(await checkEntry(entry));
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  const failures = results.filter(result => !result.ok);
  const report = {
    packFiles,
    checked: results.length,
    ok: results.length - failures.length,
    failed: failures.length,
    failures: failures.map(({ id, url, status, error }) => ({ id, url, status, error })),
  };
  console.log(JSON.stringify(report, null, 2));
  if (failures.length > 0) process.exitCode = 1;
}

run();
