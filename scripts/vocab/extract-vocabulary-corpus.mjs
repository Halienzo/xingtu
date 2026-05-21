import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import mammoth from 'mammoth';
import {
  extractMeanings,
  extractPos,
  extractPosMeaningDetails,
  isPosOnlyToken,
} from './pos-meaning-utils.mjs';

const require = createRequire(import.meta.url);
const xlsx = require('xlsx');
const { PDFParse } = require('pdf-parse');

const appRoot = process.cwd();
const workspaceRoot = path.resolve(appRoot, '..');
const outRoot = path.join(appRoot, 'generated', 'vocabulary');
const textCacheRoot = path.join(outRoot, 'text-cache');
const legacyDocTextRoot = path.join(outRoot, 'legacy-doc-text');

const inputRoots = [
  path.join(workspaceRoot, '01-初中单词与短语默写'),
  path.join(workspaceRoot, '02-人教版初中英语知识点汇总'),
  path.join(workspaceRoot, '03-初中中考英语语法专项训练'),
  path.join(workspaceRoot, '小学词汇1166（1-6年级+P35）.docx'),
  path.join(workspaceRoot, '小学词汇1166（1-6年级+P35）.doc'),
  path.join(workspaceRoot, '3-高中3500词汇 - 带音标.docx'),
];

const SUPPORTED_EXTS = new Set(['.doc', '.docx', '.xls', '.xlsx', '.pdf', '.xml']);
const EN_WORD = String.raw`[A-Za-z][A-Za-z'’.-]*`;
const STOP_LEADING_RE = /^(unit|section|page|class|name|grade|topic|lesson|module|revision|test|answer|answers)\b/i;
const BAD_WORDS = new Set([
  'unit', 'section', 'page', 'class', 'name', 'grade', 'topic', 'lesson', 'module',
  'test', 'answer', 'answers', 'teacher', 'student', '版', '解析版', '原卷版',
  'n', 'v', 'vt', 'vi', 'adj', 'adv', 'prep', 'pron', 'conj', 'num', 'int',
  'interj', 'art', 'abbr', 'aux', 'modal', 'modalv', 'modal v',
]);
const PRIMARY_REPAIR_ROWS = new Map([
  [1125, { word: 'tell a lie', phonetic: '[tel ə lai]', meaning: '说谎' }],
  [1126, { word: 'look after', phonetic: '[luk ˈɑ:ftə]', meaning: '照顾; 照看; 照料' }],
  [1127, { word: 'might', phonetic: '[mait]', meaning: 'aux. 可能; 也许 aux.&v. ...' }],
  [1128, { word: 'others', phonetic: '', meaning: 'prep. 另外的人 pron. 其他人' }],
  [1129, { word: 'phone', phonetic: '[fəun]', meaning: 'v. 打电话 n. 电话' }],
  [1130, { word: 'pick up', phonetic: '[pik ʌp]', meaning: '拣起; (车等)中途搭人' }],
  [1131, { word: 'playtime', phonetic: '[ˈpleɪtaɪm]', meaning: 'n. 玩的时候; 课间休息的时候; 休闲...' }],
  [1132, { word: 'promise', phonetic: '[ˈprɔmis]', meaning: 'vt. 允诺; 答应; 有希望 n. 承...' }],
  [1133, { word: 'keep a promise', phonetic: '[kip e ˈprɑm]', meaning: '守信用; 遵守诺言' }],
  [1134, { word: 'solve', phonetic: '[sɔlv]', meaning: 'vt. 解决; 解答(难题)' }],
  [1135, { word: 'someone', phonetic: '[ˈsʌmwʌn]', meaning: 'pron. 某人; 某些人; 有人' }],
  [1136, { word: 'sum', phonetic: '[sʌm]', meaning: 'n.&v. 总数; 和; 总计...' }],
  [1137, { word: 'time', phonetic: '[taim]', meaning: 'n. 时间; 次数; 次; 时期' }],
  [1138, { word: 'tonight', phonetic: '[təˈnait]', meaning: 'adv. 今晚; 今夜 n. 今天晚上' }],
  [1139, { word: 'very much', phonetic: '[ˈveri mʌtʃ]', meaning: '非常地' }],
  [1140, { word: 'yet', phonetic: '[jet]', meaning: 'adv. 到目前为止; 还; 仍然' }],
  [1141, { word: 'badminton', phonetic: '[ˈbædmintən]', meaning: 'n. 羽毛球(运动)' }],
  [1142, { word: 'cost', phonetic: '[kɔst]', meaning: 'v.&n. 值(多少钱); 费...' }],
  [1143, { word: 'department', phonetic: '[diˈpɑ:tmənt]', meaning: '百货商店' }],
  [1144, { word: 'idea', phonetic: '[aiˈdiə]', meaning: 'n. 想法; 思想; 意见' }],
  [1145, { word: 'mall', phonetic: '[mɔ:l]', meaning: 'n. 购物街; 大型购物中心' }],
  [1146, { word: 'market', phonetic: '[ˈmɑ:kit]', meaning: 'vt. 销售 n. 市场; 集市; 销路...' }],
  [1147, { word: 'somewhere', phonetic: '[ˈsʌm(h)wɛə]', meaning: 'adv. 某个地方; 某些地方; 在某处...' }],
  [1148, { word: 'bank', phonetic: '[bæŋk]', meaning: 'n. 岸; 银行' }],
  [1149, { word: 'businessman', phonetic: '[ˈbɪznɪsˌmæn]', meaning: 'n. (男)商人' }],
  [1150, { word: 'businesswoman', phonetic: '[ˈbɪznɪsˌwʊmə]', meaning: 'n. 女商人' }],
  [1151, { word: 'clerk', phonetic: '[klɑ:k]', meaning: 'n. 职员; 店员; 办事员' }],
  [1152, { word: 'finish', phonetic: '[ˈfiniʃ]', meaning: 'vt. 完成; 结束 n. 结束; 最后...' }],
  [1153, { word: 'if', phonetic: '[if]', meaning: 'conj. 如果; 假使; 是否' }],
  [1154, { word: 'project', phonetic: '[prəˈdʒekt]', meaning: 'v. 投射; 伸出 n. 方案; 计划;...' }],
  [1155, { word: 'secretary', phonetic: '[ˈsekrətəri]', meaning: 'n. 秘书; 书记; 部长; 大臣' }],
]);

async function main() {
  await fs.mkdir(outRoot, { recursive: true });
  await fs.mkdir(textCacheRoot, { recursive: true });

  const files = [];
  for (const root of inputRoots) {
    const stat = await statOrNull(root);
    if (!stat) continue;
    if (stat.isDirectory()) {
      files.push(...await walk(root));
    } else if (stat.isFile()) {
      files.push(root);
    }
  }

  const targetFiles = files
    .filter((file) => SUPPORTED_EXTS.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, 'zh-CN'));

  const legacyManifest = await readLegacyManifest();
  const inventory = [];
  const candidates = [];
  const textSummaries = [];

  for (const file of targetFiles) {
    const metadata = inferMetadata(file);
    const fileHash = await sha1File(file);
    const entry = {
      file,
      relativePath: path.relative(workspaceRoot, file),
      ext: path.extname(file).toLowerCase(),
      size: (await fs.stat(file)).size,
      hash: fileHash,
      ...metadata,
      extractionStatus: 'pending',
      extractedChars: 0,
      candidateCount: 0,
      error: null,
    };

    try {
      const text = await extractText(file, fileHash, legacyManifest);
      entry.extractionStatus = text.trim() ? 'ok' : 'empty';
      entry.extractedChars = text.length;

      const summary = summarizeText(text);
      textSummaries.push({
        file: entry.relativePath,
        chars: text.length,
        lines: summary.lines,
        firstLines: summary.firstLines,
      });

      const found = extractCandidates(text, entry);
      entry.candidateCount = found.length;
      candidates.push(...found);
    } catch (error) {
      entry.extractionStatus = 'failed';
      entry.error = error instanceof Error ? error.message : String(error);
    }

    inventory.push(entry);
  }

  const deduped = dedupeCandidates(candidates);
  const audit = buildAudit(inventory, candidates, deduped);

  await writeJson(path.join(outRoot, 'source-inventory.json'), inventory);
  await writeJson(path.join(outRoot, 'text-summaries.json'), textSummaries);
  await writeJson(path.join(outRoot, 'word-candidates.raw.json'), candidates);
  await writeJson(path.join(outRoot, 'word-candidates.deduped.json'), deduped);
  await writeJson(path.join(outRoot, 'audit-report.json'), audit);
  await writeMarkdownReport(path.join(outRoot, 'audit-report.md'), audit);

  console.log(`Scanned files: ${inventory.length}`);
  console.log(`Extracted candidate rows: ${candidates.length}`);
  console.log(`Deduped candidate words/phrases: ${deduped.length}`);
  console.log(`Output: ${outRoot}`);
}

async function walk(root) {
  const out = [];
  const entries = await fs.readdir(root, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      out.push(...await walk(full));
    } else if (entry.isFile()) {
      out.push(full);
    }
  }
  return out;
}

async function statOrNull(file) {
  try {
    return await fs.stat(file);
  } catch {
    return null;
  }
}

async function sha1File(file) {
  const buf = await fs.readFile(file);
  return crypto.createHash('sha1').update(buf).digest('hex');
}

async function readLegacyManifest() {
  const manifestPath = path.join(legacyDocTextRoot, 'manifest.json');
  try {
    const raw = await fs.readFile(manifestPath, 'utf8');
    const rows = JSON.parse(raw);
    const map = new Map();
    for (const row of Array.isArray(rows) ? rows : [rows]) {
      if (row.hash && row.textPath && row.status !== 'failed') {
        map.set(row.hash.toLowerCase(), row.textPath);
      }
    }
    return map;
  } catch {
    return new Map();
  }
}

async function extractText(file, hash, legacyManifest) {
  const ext = path.extname(file).toLowerCase();
  const cachePath = path.join(textCacheRoot, `${hash}.txt`);
  const cached = await statOrNull(cachePath);
  if (cached && ext !== '.doc') return fs.readFile(cachePath, 'utf8');

  let text = '';
  if (ext === '.docx') {
    const result = await mammoth.extractRawText({ path: file });
    text = result.value || '';
  } else if (ext === '.xlsx' || ext === '.xls') {
    const workbook = xlsx.readFile(file, { cellDates: false, raw: false });
    const chunks = [];
    for (const name of workbook.SheetNames) {
      const sheet = workbook.Sheets[name];
      const rows = xlsx.utils.sheet_to_json(sheet, { header: 1, blankrows: false, defval: '' });
      chunks.push(`[[SHEET:${name}]]`);
      for (const row of rows) {
        chunks.push(row.map((cell) => String(cell).trim()).join('\t'));
      }
    }
    text = chunks.join('\n');
  } else if (ext === '.pdf') {
    const data = await fs.readFile(file);
    const parser = new PDFParse({ data });
    const result = await parser.getText();
    await parser.destroy?.();
    text = result.text || '';
  } else if (ext === '.xml') {
    text = await fs.readFile(file, 'utf8');
    text = stripXml(text);
  } else if (ext === '.doc') {
    const textPath = legacyManifest.get(hash.toLowerCase());
    if (!textPath) {
      throw new Error('Legacy .doc requires conversion: run npm run vocab:convert-doc first');
    }
    text = await fs.readFile(textPath, 'utf8');
  }

  text = normalizeText(text);
  await fs.writeFile(cachePath, text, 'utf8');
  return text;
}

function stripXml(xml) {
  return xml
    .replace(/<[^>]+>/g, '\n')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"');
}

function normalizeText(text) {
  return text
    .replace(/\r/g, '\n')
    .replace(/\u00a0/g, ' ')
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function summarizeText(text) {
  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  return {
    lines: lines.length,
    firstLines: lines.slice(0, 8),
  };
}

function inferMetadata(file) {
  const rel = path.relative(workspaceRoot, file);
  const lower = rel.toLowerCase();
  const normalized = rel.replace(/\\/g, '/');
  const fileName = path.basename(file);

  let stage = 'unknown';
  let grade = null;
  let term = null;

  if (normalized.includes('小学词汇1166')) {
    stage = 'primary';
  } else if (normalized.includes('高中3500')) {
    stage = 'senior';
  } else if (/初中|中考|7上|7下|8上|8下|9年|七年级|八年级|九年级/.test(normalized)) {
    stage = 'junior';
  }

  const gradePatterns = [
    [/1年级|一年级/, 1], [/2年级|二年级/, 2], [/3年级|三年级/, 3],
    [/4年级|四年级/, 4], [/5年级|五年级/, 5], [/6年级|六年级/, 6],
    [/7上|7下|7年级|七年级|七上|七下/, 7],
    [/8上|8下|8年级|八年级|八上|八下/, 8],
    [/9年级|九年级|九上|九下/, 9],
  ];
  for (const [re, value] of gradePatterns) {
    if (re.test(normalized)) {
      grade = value;
      break;
    }
  }

  if (/上册|上学期|7上|8上|七上|八上|25秋|秋季/.test(normalized)) term = '上学期';
  if (/下册|下学期|7下|8下|七下|八下|春|25春/.test(normalized)) term = '下学期';
  if (/9年级|九年级|全一册|全册/.test(normalized) && !term) term = '上学期';

  let sourceKind = 'other';
  if (/单词|词汇|英译汉|汉译英|对照|3500|1166/.test(fileName)) sourceKind = 'vocabulary';
  if (/短语|句型/.test(fileName)) sourceKind = 'phrase';
  if (/知识|讲义|归纳|梳理/.test(fileName)) sourceKind = 'knowledge';
  if (/语法|专项|练习|真题|时态|从句|词类/.test(fileName) || normalized.includes('03-')) sourceKind = 'grammar';

  let version = 'unknown';
  if (/新版|新人教|2025|25秋|25春|2024|24新版/.test(normalized)) version = 'new';
  if (/旧版/.test(normalized)) version = 'old';

  let priority = 3;
  if (sourceKind === 'vocabulary' && version === 'new') priority = 1;
  else if (sourceKind === 'vocabulary') priority = 2;
  else if (sourceKind === 'phrase' || sourceKind === 'knowledge') priority = 3;
  else if (sourceKind === 'grammar') priority = 4;
  if (version === 'old') priority += 2;

  return { stage, grade, term, sourceKind, version, priority };
}

function extractCandidates(text, source) {
  if (source.stage === 'primary' && source.relativePath.includes('小学词汇1166')) {
    return extractPrimaryTableCandidates(text, source);
  }

  const lines = text.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  const candidates = [];
  let index = 0;

  for (const line of lines) {
    for (const parsed of parseLine(line, source)) {
      candidates.push({
        id: `${source.hash.slice(0, 10)}-${index++}`,
        ...parsed,
        sourceFile: source.relativePath,
        sourceKind: source.sourceKind,
        stage: source.stage,
        grade: source.grade,
        term: source.term,
        version: source.version,
        priority: source.priority,
      });
    }
  }

  return candidates;
}

function extractPrimaryTableCandidates(text, source) {
  const cells = text
    .split(/[\u0007\n]+/)
    .map((cell) => cleanupLine(cell.replace(/\f/g, '')))
    .filter(Boolean);
  const rowStarts = [];
  for (let i = 0; i < cells.length; i += 1) {
    if (/^\d{1,4}$/.test(cells[i])) rowStarts.push(i);
  }

  const candidates = [];
  let currentGrade = null;
  let currentTerm = null;

  for (let rowIndex = 0; rowIndex < rowStarts.length; rowIndex += 1) {
    const start = rowStarts[rowIndex];
    const end = rowStarts[rowIndex + 1] ?? cells.length;
    const row = cells.slice(start, end);
    const serial = Number(row[0]);
    const repaired = PRIMARY_REPAIR_ROWS.get(serial);
    if (repaired) {
      candidates.push(createPrimaryCandidate(source, candidates.length, serial, repaired, currentGrade, currentTerm));
      continue;
    }
    if (row.length < 3) continue;

    const markerCell = row.find((cell) => /年级/.test(cell)) || '';
    const marker = parsePrimaryMarker(markerCell);
    if (marker && !/结束/.test(markerCell)) {
      currentGrade = marker.grade;
      currentTerm = marker.term;
    } else if (marker && currentGrade === null) {
      currentGrade = marker.grade;
      currentTerm = marker.term;
    }

    const word = cleanupWord(row[1]);
    if (!validPrimaryWord(word)) continue;

    const detailCells = row.slice(2).filter((cell) => !/年级/.test(cell));
    const detailText = detailCells.join(' ');
    let phonetic = extractPhonetic(detailText);
    let meaningText = detailText;

    if (phonetic) {
      meaningText = detailText.replace(phonetic, ' ');
    } else if (detailCells[0]?.startsWith('[')) {
      phonetic = detailCells[0].includes(']') ? detailCells[0] : `${detailCells[0]}]`;
      meaningText = detailCells.slice(1).join(' ');
    }

    const pos = extractPos(meaningText);
    const meanings = extractMeanings(meaningText);
    const posDetails = extractPosMeaningDetails(meaningText);

    candidates.push(createPrimaryCandidate(source, candidates.length, serial, {
      word,
      phonetic,
      meaning: meaningText,
      rawLine: row.join('\t'),
      pos,
      meanings,
      posDetails,
    }, currentGrade, currentTerm));
  }

  return candidates;
}

function createPrimaryCandidate(source, index, serial, item, grade, term) {
  const word = cleanupWord(item.word);
  const meaningText = item.meaning || '';
  return {
    id: `${source.hash.slice(0, 10)}-${index}`,
    word,
    normalized: normalizeWordKey(word),
    type: word.includes(' ') ? 'phrase' : 'word',
    phonetic: item.phonetic || '',
    pos: item.pos || extractPos(meaningText),
    meanings: item.meanings || extractMeanings(meaningText),
    posDetails: item.posDetails || extractPosMeaningDetails(meaningText || item.rawLine || ''),
    rawLine: item.rawLine || `${serial}\t${word}\t${item.phonetic || ''}\t${meaningText}`,
    sourceFile: source.relativePath,
    sourceKind: source.sourceKind,
    stage: source.stage,
    grade,
    term,
    version: source.version,
    priority: source.priority,
  };
}

function parsePrimaryMarker(cell) {
  const match = cell.match(/([一二三四五六])年级[（(](上|下)[）)]/);
  if (!match) return null;
  const gradeMap = new Map([
    ['一', 1],
    ['二', 2],
    ['三', 3],
    ['四', 4],
    ['五', 5],
    ['六', 6],
  ]);
  return {
    grade: gradeMap.get(match[1]) ?? null,
    term: match[2] === '上' ? '上学期' : '下学期',
  };
}

function parseLine(rawLine, source) {
  const line = cleanupLine(rawLine);
  if (!line || line.length > 500) return [];
  if (STOP_LEADING_RE.test(line)) return [];
  if (!/[A-Za-z]/.test(line)) return [];

  const hasChinese = /[\u3400-\u9fff]/.test(line);
  const phonetic = extractPhonetic(line);
  const pos = extractPos(line);
  const tabCells = rawLine.split('\t').map((cell) => cleanupLine(cell)).filter(Boolean);

  if (tabCells.length >= 2) {
    const parsed = parseCells(tabCells, line, source, phonetic, pos);
    if (parsed) return [parsed];
  }

  const compact = line
    .replace(/^[\d一二三四五六七八九十]+[.)、．]?\s*/, '')
    .replace(/^\([A-D]\)\s*/i, '')
    .trim();

  if (looksLikeSentence(compact) && !phonetic && !pos && source.sourceKind !== 'vocabulary') return [];

  const leading = compact.match(new RegExp(`^(${EN_WORD}(?:\\s+${EN_WORD}){0,4})\\b`));
  if (!leading) return [];

  const phrase = cleanupWord(leading[1]);
  if (!validWordOrPhrase(phrase)) return [];

  const rest = compact.slice(leading[0].length).trim();
  const meanings = extractMeanings(rest || compact);
  const posDetails = extractPosMeaningDetails(rest || compact);
  if (!hasChinese && !phonetic && !pos && source.sourceKind !== 'vocabulary') return [];

  return [{
    word: phrase,
    normalized: normalizeWordKey(phrase),
    type: phrase.includes(' ') ? 'phrase' : 'word',
    phonetic: phonetic || '',
    pos: pos || '',
    meanings,
    posDetails,
    rawLine: line,
  }];
}

function parseCells(cells, rawLine, source, phonetic, pos) {
  const englishCell = cells.find((cell) => /^[A-Za-z]/.test(cell) && !STOP_LEADING_RE.test(cell));
  if (!englishCell) return null;
  const wordMatch = englishCell.match(new RegExp(`^(${EN_WORD}(?:\\s+${EN_WORD}){0,4})\\b`));
  if (!wordMatch) return null;
  const word = cleanupWord(wordMatch[1]);
  if (!validWordOrPhrase(word)) return null;

  const meaningCell = cells.find((cell) => /[\u3400-\u9fff]/.test(cell)) || rawLine;
  const meanings = extractMeanings(meaningCell);
  const posDetails = extractPosMeaningDetails(meaningCell || rawLine);
  if (meanings.length === 0 && !phonetic && !pos && source.sourceKind !== 'vocabulary') return null;

  return {
    word,
    normalized: normalizeWordKey(word),
    type: word.includes(' ') ? 'phrase' : 'word',
    phonetic: phonetic || extractPhonetic(englishCell) || '',
    pos: pos || extractPos(englishCell) || '',
    meanings,
    posDetails,
    rawLine,
  };
}

function cleanupLine(line) {
  return line
    .replace(/[\u0000\u000e]/g, '')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanupWord(word) {
  return word
    .replace(/[()[\]{}]/g, '')
    .replace(/^[.,;:!?]+|[.,;:!?]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeWordKey(word) {
  return word.toLowerCase().replace(/\s+/g, ' ').trim();
}

function validWordOrPhrase(word) {
  if (!word || word.length < 1 || word.length > 60) return false;
  const lower = normalizeWordKey(word);
  if (BAD_WORDS.has(lower)) return false;
  if (isPosOnlyToken(lower)) return false;
  if (/^\d+$/.test(word)) return false;
  const parts = lower.split(/\s+/);
  if (parts.length > 5) return false;
  if (parts.some((part) => BAD_WORDS.has(part))) return false;
  return /^[A-Za-z][A-Za-z'’./\-\s]*$/.test(word);
}

function validPrimaryWord(word) {
  if (!word || word.length < 1 || word.length > 80) return false;
  if (isPosOnlyToken(word)) return false;
  if (/^\d+$/.test(word)) return false;
  return /^[A-Za-z][A-Za-z'’./\-\s]*$/.test(word);
}

function looksLikeSentence(line) {
  const englishTokens = line.match(/[A-Za-z][A-Za-z'’-]*/g) || [];
  return englishTokens.length >= 7 || /[?。！？]/.test(line);
}

function extractPhonetic(line) {
  const slash = line.match(/\/[^/\n]{1,80}\//);
  if (slash) return slash[0];
  const bracket = line.match(/\[[^\]\n]{1,80}\]/);
  return bracket ? bracket[0] : '';
}

function dedupeCandidates(candidates) {
  const grouped = new Map();
  for (const item of candidates) {
    const key = item.normalized;
    const existing = grouped.get(key);
    if (!existing) {
      grouped.set(key, {
        word: item.word,
        normalized: item.normalized,
        type: item.type,
        phonetic: item.phonetic,
        pos: item.pos,
        meanings: item.meanings,
        posDetails: item.posDetails,
        bestStage: item.stage,
        bestGrade: item.grade,
        bestTerm: item.term,
        bestPriority: item.priority,
        sources: [sourceRef(item)],
      });
      continue;
    }

    existing.sources.push(sourceRef(item));
    if (item.priority < existing.bestPriority) {
      existing.word = item.word;
      existing.phonetic = item.phonetic || existing.phonetic;
      existing.pos = item.pos || existing.pos;
      existing.meanings = item.meanings.length ? item.meanings : existing.meanings;
      existing.posDetails = item.posDetails?.length ? item.posDetails : existing.posDetails;
      existing.bestStage = item.stage;
      existing.bestGrade = item.grade;
      existing.bestTerm = item.term;
      existing.bestPriority = item.priority;
    } else {
      if (!existing.phonetic && item.phonetic) existing.phonetic = item.phonetic;
      if (!existing.pos && item.pos) existing.pos = item.pos;
      if (existing.meanings.length === 0 && item.meanings.length) existing.meanings = item.meanings;
      if ((!existing.posDetails || existing.posDetails.length === 0) && item.posDetails?.length) existing.posDetails = item.posDetails;
    }
  }

  return Array.from(grouped.values()).sort((a, b) => {
    const gradeA = a.bestGrade ?? 99;
    const gradeB = b.bestGrade ?? 99;
    if (gradeA !== gradeB) return gradeA - gradeB;
    return a.normalized.localeCompare(b.normalized);
  });
}

function sourceRef(item) {
  return {
    file: item.sourceFile,
    sourceKind: item.sourceKind,
    stage: item.stage,
    grade: item.grade,
    term: item.term,
    version: item.version,
    priority: item.priority,
    posDetails: item.posDetails,
    rawLine: item.rawLine,
  };
}

function buildAudit(inventory, rawCandidates, deduped) {
  const byExt = countBy(inventory, (x) => x.ext);
  const byStatus = countBy(inventory, (x) => x.extractionStatus);
  const byKind = countBy(inventory, (x) => x.sourceKind);
  const byGradeTerm = countBy(rawCandidates, (x) => `${x.stage || 'unknown'}-${x.grade || 'unknown'}-${x.term || 'unknown'}`);
  const failedFiles = inventory.filter((x) => x.extractionStatus === 'failed');
  const emptyFiles = inventory.filter((x) => x.extractionStatus === 'empty');
  const missingCore = deduped.filter((x) => !x.meanings.length || !x.pos || !x.phonetic).slice(0, 200);

  return {
    generatedAt: new Date().toISOString(),
    inputRoots,
    totals: {
      files: inventory.length,
      extractedOk: inventory.filter((x) => x.extractionStatus === 'ok').length,
      rawCandidates: rawCandidates.length,
      dedupedCandidates: deduped.length,
      words: deduped.filter((x) => x.type === 'word').length,
      phrases: deduped.filter((x) => x.type === 'phrase').length,
    },
    byExt,
    byStatus,
    byKind,
    byGradeTerm,
    failedFiles,
    emptyFiles,
    missingCore,
  };
}

function countBy(rows, keyFn) {
  const counts = {};
  for (const row of rows) {
    const key = keyFn(row);
    counts[key] = (counts[key] || 0) + 1;
  }
  return Object.fromEntries(Object.entries(counts).sort((a, b) => String(a[0]).localeCompare(String(b[0]), 'zh-CN')));
}

async function writeJson(file, data) {
  await fs.writeFile(file, `${JSON.stringify(data, null, 2)}\n`, 'utf8');
}

async function writeMarkdownReport(file, audit) {
  const lines = [];
  lines.push('# Vocabulary Extraction Audit');
  lines.push('');
  lines.push(`Generated: ${audit.generatedAt}`);
  lines.push('');
  lines.push('## Totals');
  lines.push('');
  for (const [key, value] of Object.entries(audit.totals)) {
    lines.push(`- ${key}: ${value}`);
  }
  lines.push('');
  lines.push('## Files By Extension');
  lines.push('');
  for (const [key, value] of Object.entries(audit.byExt)) lines.push(`- ${key}: ${value}`);
  lines.push('');
  lines.push('## Extraction Status');
  lines.push('');
  for (const [key, value] of Object.entries(audit.byStatus)) lines.push(`- ${key}: ${value}`);
  lines.push('');
  lines.push('## Candidate Rows By Grade/Term');
  lines.push('');
  for (const [key, value] of Object.entries(audit.byGradeTerm)) lines.push(`- ${key}: ${value}`);
  lines.push('');
  lines.push('## Failed Files');
  lines.push('');
  if (audit.failedFiles.length === 0) {
    lines.push('- None');
  } else {
    for (const f of audit.failedFiles) lines.push(`- ${f.relativePath}: ${f.error}`);
  }
  lines.push('');
  lines.push('## Empty Files');
  lines.push('');
  if (audit.emptyFiles.length === 0) {
    lines.push('- None');
  } else {
    for (const f of audit.emptyFiles.slice(0, 100)) lines.push(`- ${f.relativePath}`);
  }
  await fs.writeFile(file, `${lines.join('\n')}\n`, 'utf8');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
