import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { CalendarWord } from '../sections/VocabularyCalendar';

// ============================================
// PDF生成核心引擎 - 词汇板块
// ============================================

export type ExportType = 'memory' | 'exercise' | 'test';

export interface PDFExportOptions {
  words: CalendarWord[];
  exportType: ExportType;
  studentName: string;
  date: string;
  semesterName: string;
  dayRange?: string; // 如 "9月12日" 或 "9月10日-15日" 或 "9月全月"
}

// 鼓励语库
const ENCOURAGEMENTS: Record<ExportType, string[]> = {
  memory: [
    'Keep going! Every word you learn opens a new door! 每天进步一点点，成功离你更近一点！',
    "You're doing great! Consistency is the key to success! 坚持就是胜利，你比昨天更优秀！",
    'Believe in yourself! You can master English! 相信自己，你一定能学好英语！',
    'Practice makes perfect! Keep memorizing! 熟能生巧，继续加油记单词！',
    'Small steps lead to big progress! 积少成多，每一步都算数！',
    "Learning is a journey, enjoy every step! 学习是一段旅程，享受每一步！",
    'Your effort today builds your success tomorrow! 今天的努力，明天的成功！',
    'Never give up! You are getting better every day! 永不放弃，你每天都在进步！',
    'Words are the building blocks of language! 单词是语言的基石，继续积累！',
    'A little progress each day adds up to big results! 每天一点进步，终将成就大事！',
  ],
  exercise: [
    'Challenge yourself! You can do it! 挑战自我，你能做到！',
    'Mistakes help you learn! Keep trying! 错误帮助你学习，继续尝试！',
    'The harder you practice, the luckier you get! 越努力练习，越幸运！',
    "Don't stop until you're proud! 努力到让自己骄傲为止！",
    'Focus and do your best! 专注并做到最好！',
    'Every exercise makes you stronger! 每次练习都让你更强大！',
    'Stay positive, work hard, make it happen! 保持积极，努力付出，让梦想成真！',
    'Great things come from hard work! 伟大的成就来自努力工作！',
    'Push yourself because no one else will! 推动自己，因为别人不会！',
    'Success starts with self-discipline! 成功始于自律！',
  ],
  test: [
    'Stay calm and do your best! 保持冷静，发挥最佳水平！',
    "You've prepared well. Show what you know! 你已经准备充分，展示你的实力！",
    'Confidence is half the victory! 自信是成功的一半！',
    'Read carefully, think clearly! 仔细阅读，清晰思考！',
    'Believe in your preparation! 相信你的准备！',
    'Do your best and forget the rest! 尽你所能，其余随它！',
    'This test is a stepping stone to success! 这次测验是通往成功的垫脚石！',
    'You are capable of amazing things! 你有能力创造惊人的成就！',
    'Take a deep breath and begin! 深呼吸，开始吧！',
    "Success is the sum of small efforts! 成功是小努力的总和，你已经准备好了！",
  ],
};

function getRandomEncouragement(type: ExportType): string {
  const list = ENCOURAGEMENTS[type];
  return list[Math.floor(Math.random() * list.length)];
}

// 8色调色板（用于音节颜色）
const SYLLABLE_COLORS = ['#F97316', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B'];

function getSyllableHtml(word: CalendarWord): string {
  const parts = word.syllableParts || [word.word];
  const colors = word.syllableColors || SYLLABLE_COLORS;
  if (parts.length <= 1) {
    return `<span style="color:${colors[0] || '#F97316'};font-weight:800;">${word.word}</span>`;
  }
  return parts.map((p, i) =>
    `<span style="color:${colors[i] || SYLLABLE_COLORS[i % 8]};font-weight:800;">${p}</span>${i < parts.length - 1 ? '<span style="color:#999;">·</span>' : ''}`
  ).join('');
}

function escapeHtml(value: string): string {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateAcademicSheet(options: PDFExportOptions): string {
  const { words, exportType, studentName, date, semesterName, dayRange } = options;
  const rangeText = dayRange || date;
  const titleMap: Record<ExportType, string> = {
    memory: 'Academic Vocabulary List',
    exercise: 'Vocabulary Translation Practice',
    test: 'Vocabulary Test',
  };
  const cnTitleMap: Record<ExportType, string> = {
    memory: '学术词汇清单',
    exercise: '词汇互译练习',
    test: '词汇测试卷',
  };

  const infoRows = words.map((w, i) => `
    <tr>
      <td class="num">${i + 1}</td>
      <td class="word">${escapeHtml(w.word)}</td>
      <td>${escapeHtml(w.phonetic || '')}</td>
      <td>${escapeHtml(w.pos || '')}</td>
      <td>${escapeHtml((w.meanings || []).join('；'))}</td>
    </tr>`).join('');

  const cnToEnRows = words.map((w, i) => `
    <tr>
      <td class="num">${i + 1}</td>
      <td>${escapeHtml((w.meanings || []).join('；'))}</td>
      <td class="blank">${exportType === 'memory' ? escapeHtml(w.word) : ''}</td>
      <td>${escapeHtml(w.pos || '')}</td>
    </tr>`).join('');

  const enToCnRows = words.map((w, i) => `
    <tr>
      <td class="num">${i + 1}</td>
      <td class="word">${escapeHtml(w.word)}</td>
      <td class="blank">${exportType === 'memory' ? escapeHtml((w.meanings || []).join('；')) : ''}</td>
      <td>${escapeHtml(w.pos || '')}</td>
    </tr>`).join('');

  const answerRows = exportType === 'memory' ? '' : `
    <div class="page">
      <div class="header">
        <div>
          <div class="title">Answer Key</div>
          <div class="subtitle">答案页 · ${escapeHtml(semesterName)} · ${escapeHtml(rangeText)}</div>
        </div>
      </div>
      <table>
        <thead><tr><th>No.</th><th>English</th><th>Chinese</th><th>Part of Speech</th></tr></thead>
        <tbody>${infoRows}</tbody>
      </table>
      <div class="footer">Generated ${escapeHtml(date)} · ${escapeHtml(studentName || '')}</div>
    </div>`;

  return `<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  body { margin: 0; color: #111827; background: #fff; font-family: "Times New Roman", "Microsoft YaHei", serif; font-size: 10pt; }
  .page { width: 190mm; min-height: 277mm; padding: 12mm 10mm; page-break-after: always; position: relative; }
  .page:last-child { page-break-after: auto; }
  .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1.5px solid #111827; padding-bottom: 8px; margin-bottom: 10px; }
  .title { font-size: 18pt; font-weight: 700; letter-spacing: .2px; }
  .cn-title { font-size: 13pt; font-weight: 700; margin-top: 2px; }
  .subtitle { color: #4b5563; font-size: 9pt; margin-top: 4px; }
  .meta { text-align: right; color: #374151; font-size: 9pt; line-height: 1.7; }
  .section { margin: 12px 0 6px; font-size: 12pt; font-weight: 700; border-left: 3px solid #111827; padding-left: 8px; }
  table { width: 100%; border-collapse: collapse; margin-top: 6px; page-break-inside: auto; }
  th { background: #f3f4f6; color: #111827; font-weight: 700; border: 1px solid #9ca3af; padding: 5px 6px; text-align: left; }
  td { border: 1px solid #d1d5db; padding: 5px 6px; vertical-align: top; }
  tr { page-break-inside: avoid; }
  .num { width: 9mm; text-align: center; color: #374151; }
  .word { font-weight: 700; font-family: Georgia, "Times New Roman", serif; }
  .blank { min-width: 40mm; height: 18px; }
  .footer { position: absolute; left: 10mm; right: 10mm; bottom: 8mm; border-top: 1px solid #d1d5db; padding-top: 5px; color: #6b7280; font-size: 8pt; display: flex; justify-content: space-between; }
</style>
</head>
<body>
  <div class="page">
    <div class="header">
      <div>
        <div class="title">${titleMap[exportType]}</div>
        <div class="cn-title">${cnTitleMap[exportType]}</div>
        <div class="subtitle">${escapeHtml(semesterName)} · ${escapeHtml(rangeText)} · ${words.length} words</div>
      </div>
      <div class="meta">
        Student: ${escapeHtml(studentName || '________________')}<br />
        Date: ${escapeHtml(date)}
      </div>
    </div>

    <div class="section">I. Vocabulary Reference</div>
    <table>
      <thead><tr><th>No.</th><th>English</th><th>Phonetic</th><th>Part of Speech</th><th>Chinese Meaning</th></tr></thead>
      <tbody>${infoRows}</tbody>
    </table>
    <div class="footer"><span>${escapeHtml(semesterName)}</span><span>Page 1</span></div>
  </div>

  <div class="page">
    <div class="header">
      <div>
        <div class="title">Translation Tasks</div>
        <div class="cn-title">中英互译</div>
        <div class="subtitle">${escapeHtml(rangeText)}</div>
      </div>
      <div class="meta">Student: ${escapeHtml(studentName || '________________')}</div>
    </div>
    <div class="section">II. Chinese to English</div>
    <table>
      <thead><tr><th>No.</th><th>Chinese</th><th>English</th><th>Part of Speech</th></tr></thead>
      <tbody>${cnToEnRows}</tbody>
    </table>
    <div class="section">III. English to Chinese</div>
    <table>
      <thead><tr><th>No.</th><th>English</th><th>Chinese</th><th>Part of Speech</th></tr></thead>
      <tbody>${enToCnRows}</tbody>
    </table>
    <div class="footer"><span>${escapeHtml(semesterName)}</span><span>Page 2</span></div>
  </div>

  ${answerRows}
</body>
</html>`;
}

// ============================================
// 模板1：记背单
// ============================================
function generateMemorySheet(options: PDFExportOptions): string {
  return generateAcademicSheet(options);
  const { words, studentName, date, semesterName, dayRange } = options;
  const encouragement = getRandomEncouragement('memory');
  const rangeText = dayRange || date;

  const wordCards = words.map((w, i) => {
    const phrases = w.phrases?.slice(0, 2).join('<br>') || '';
    return `
    <div class="word-card">
      <div class="word-num">${i + 1}</div>
      <div class="word-title">${getSyllableHtml(w)}</div>
      <div class="word-phonetic">${w.phonetic}</div>
      <div class="word-pos">${w.pos}</div>
      <div class="word-meaning">${w.meanings?.join('；') || ''}</div>
      <div class="word-phrases">${phrases}</div>
      <div class="word-example">${w.example || ''}</div>
      ${w.memoryTip ? `<div class="word-tip">💡 ${w.memoryTip}</div>` : ''}
    </div>`;
  }).join('');

  // 自我检测区（只看中文写英文）
  const selfTestRows = words.map((w, i) =>
    `<tr><td class="td-num">${i + 1}</td><td class="td-cn">${w.meanings?.[0] || ''}</td><td class="td-blank">________________</td><td class="td-blank">________________</td></tr>`
  ).join('');

  // 听写栏
  const dictationRows = Array.from({ length: Math.ceil(words.length / 2) }, (_, i) => {
    const w1 = words[i * 2];
    const w2 = words[i * 2 + 1];
    return `<tr>
      <td class="td-num">${i * 2 + 1}</td><td class="td-blank-large">${w1 ? '中文:________  英文:________  音标:________' : ''}</td>
      ${w2 ? `<td class="td-num">${i * 2 + 2}</td><td class="td-blank-large">中文:________  英文:________  音标:________</td>` : '<td></td><td></td>'}
    </tr>`;
  }).join('');

  // 艾宾浩斯复习打卡
  const ebbinghausDays = [1, 2, 4, 7, 15, 30];
  const ebbinghausHtml = ebbinghausDays.map((d) =>
    `<div class="eh-item"><div class="eh-checkbox">☐</div><div class="eh-label">第${d}天</div></div>`
  ).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", sans-serif; color: #333; background: #fff; font-size: 10pt; line-height: 1.5; }
.page { width: 190mm; min-height: 277mm; padding: 8mm; page-break-after: always; position: relative; }
.page:last-child { page-break-after: auto; }

/* 页眉 */
.header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #3B82F6; padding-bottom: 4px; margin-bottom: 6px; }
.header-left { display: flex; align-items: center; gap: 8px; }
.header-logo { width: 28px; height: 28px; background: linear-gradient(135deg, #3B82F6, #8B5CF6); border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 10pt; }
.header-title { font-size: 14pt; font-weight: 800; color: #1e293b; }
.header-right { font-size: 8pt; color: #64748b; text-align: right; }

/* 信息栏 */
.info-bar { display: flex; gap: 20px; font-size: 9pt; color: #475569; margin-bottom: 6px; flex-wrap: wrap; }
.info-bar span { display: inline-flex; align-items: center; gap: 4px; }
.info-bar .label { color: #94a3b8; }
.info-bar .value { font-weight: 600; color: #334155; border-bottom: 1px solid #cbd5e1; min-width: 60px; padding: 0 4px; }

/* 鼓励语 */
.encourage { background: linear-gradient(135deg, #dbeafe, #ede9fe); border-radius: 8px; padding: 6px 10px; font-size: 8pt; color: #4c1d95; text-align: center; margin-bottom: 8px; font-style: italic; }

/* 单词卡片网格 */
.word-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin-bottom: 8px; }
.word-card { border: 1.5px solid #e2e8f0; border-radius: 8px; padding: 6px 8px; background: #fafbfc; page-break-inside: avoid; }
.word-num { display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; background: #3B82F6; color: white; border-radius: 50%; font-size: 8pt; font-weight: 700; margin-bottom: 2px; }
.word-title { font-size: 14pt; letter-spacing: 0.5px; margin-bottom: 1px; }
.word-phonetic { font-size: 9pt; color: #64748b; font-style: italic; margin-bottom: 1px; }
.word-pos { font-size: 7pt; color: #94a3b8; margin-bottom: 1px; }
.word-meaning { font-size: 10pt; color: #dc2626; font-weight: 600; margin-bottom: 2px; }
.word-phrases { font-size: 7.5pt; color: #059669; margin-bottom: 1px; line-height: 1.3; }
.word-example { font-size: 7.5pt; color: #475569; font-style: italic; line-height: 1.3; }
.word-tip { font-size: 7pt; color: #d97706; margin-top: 2px; padding-top: 2px; border-top: 1px dashed #e2e8f0; }

/* 自我检测区 */
.section-title { font-size: 11pt; font-weight: 700; color: #1e293b; margin: 8px 0 4px; padding-left: 8px; border-left: 3px solid #3B82F6; }
.test-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 6px; }
.test-table th { background: #f1f5f9; padding: 4px 6px; text-align: left; font-size: 8pt; color: #475569; border: 1px solid #cbd5e1; }
.test-table td { padding: 5px 6px; border: 1px solid #e2e8f0; }
.td-num { width: 24px; text-align: center; font-weight: 700; color: #3B82F6; }
.td-cn { color: #dc2626; font-weight: 500; }
.td-blank { color: #cbd5e1; font-style: italic; }
.td-blank-large { color: #cbd5e1; font-style: italic; font-size: 8pt; }

/* 艾宾浩斯打卡 */
.eh-section { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 6px; padding: 6px; background: #f8fafc; border-radius: 6px; }
.eh-item { display: flex; align-items: center; gap: 3px; font-size: 8pt; color: #475569; }
.eh-checkbox { width: 14px; height: 14px; border: 1.5px solid #94a3b8; border-radius: 3px; }

/* 底部 */
.footer { position: absolute; bottom: 6mm; left: 8mm; right: 8mm; display: flex; justify-content: space-between; font-size: 7pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 4px; }

/* 页脚鼓励语 */
.footer-encourage { text-align: center; font-size: 9pt; color: #7c3aed; font-weight: 600; margin-top: 8px; padding: 6px; background: #f5f3ff; border-radius: 6px; }
</style>
</head><body>

<!-- 第1页：单词卡片 -->
<div class="page">
  <div class="header">
    <div class="header-left">
      <div class="header-logo">EN</div>
      <div class="header-title">英语词汇记背单</div>
    </div>
    <div class="header-right">人教版PEP · ${semesterName}</div>
  </div>
  
  <div class="info-bar">
    <span><span class="label">姓名</span><span class="value">${studentName || '________'}</span></span>
    <span><span class="label">范围</span><span class="value">${rangeText}</span></span>
    <span><span class="label">词汇数</span><span class="value">${words.length}</span></span>
    <span><span class="label">日期</span><span class="value">${date}</span></span>
  </div>
  
  <div class="encourage">${encouragement}</div>
  
  <div class="word-grid">
    ${wordCards}
  </div>
  
  <div class="footer">
    <span>英语提分平台 · 记背单</span>
    <span>第 1 页</span>
  </div>
</div>

<!-- 第2页：自我检测 + 听写 + 艾宾浩斯 -->
<div class="page">
  <div class="header">
    <div class="header-left">
      <div class="header-logo">EN</div>
      <div class="header-title">自我检测 & 听写练习</div>
    </div>
    <div class="header-right">${rangeText}</div>
  </div>
  
  <div class="section-title">看中文写英文（遮住上一页，独立完成）</div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>中文释义</th><th>英文单词</th><th>自我评分 ✓/✗</th></tr>
    ${selfTestRows}
  </table>
  
  <div class="section-title">听写栏（请家长或老师报中文，学生写出英文+音标）</div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>听写区</th><th style="width:30px">No.</th><th>听写区</th></tr>
    ${dictationRows}
  </table>
  
  <div class="section-title">艾宾浩斯遗忘曲线复习打卡</div>
  <div style="font-size: 8pt; color: #64748b; margin-bottom: 6px;">请在对应复习日期完成后打勾 ✓</div>
  <div class="eh-section">
    ${ebbinghausHtml}
  </div>
  
  <div class="footer-encourage">${getRandomEncouragement('memory')}</div>
  
  <div style="margin-top: 12px; display: flex; justify-content: space-between; font-size: 9pt; color: #475569;">
    <span>完成时间：____________</span>
    <span>家长签字：____________</span>
  </div>
  
  <div class="footer">
    <span>英语提分平台 · 记背单</span>
    <span>第 2 页</span>
  </div>
</div>

</body></html>`;
}

// ============================================
// 模板2：练习单
// ============================================
function generateExerciseSheet(options: PDFExportOptions): string {
  return generateAcademicSheet(options);
  const { words, studentName, date, semesterName, dayRange } = options;
  const encouragement = getRandomEncouragement('exercise');
  const rangeText = dayRange || date;

  // 一、看音标写单词
  const section1Rows = words.slice(0, 6).map((w, i) =>
    `<tr><td class="td-num">${i + 1}</td><td class="td-phonetic">${w.phonetic}</td><td class="td-blank-large">________________________</td></tr>`
  ).join('');

  // 二、看中文写英文
  const section2Rows = words.slice(0, 6).map((w, i) =>
    `<tr><td class="td-num">${i + 1}</td><td class="td-cn">${w.meanings?.[0] || ''}</td><td class="td-blank-large">________________________</td></tr>`
  ).join('');

  // 三、选择正确释义（生成选择题）
  const section3Items = words.slice(0, 5).map((w, i) => {
    // 从其他词中随机选3个错误释义
    const otherMeanings = words.filter(ow => ow.word !== w.word).map(ow => ow.meanings?.[0]).filter(Boolean);
    const shuffled = [w.meanings?.[0], ...otherMeanings.sort(() => 0.5 - Math.random()).slice(0, 3)].sort(() => 0.5 - Math.random());
    const opts = ['A', 'B', 'C', 'D'];
    return `<div class="choice-item">
      <span class="td-num">${i + 1}</span>
      <span style="font-weight:700;color:#1e293b;">${w.word}</span>
      <span style="margin-left: 12px;">${opts.map((opt, j) => `<span style="margin-right: 10px;">${opt}. ${shuffled[j]}</span>`).join('')}</span>
    </div>`;
  }).join('');

  // 四、补全短语
  const section4Items = words.filter(w => w.phrases && w.phrases.length > 0).slice(0, 4).map((w, i) => {
    const phrase = w.phrases[0];
    // 把单词部分替换为下划线
    const blanked = phrase.replace(new RegExp(w.word, 'gi'), '________');
    return `<tr><td class="td-num">${i + 1}</td><td>${blanked}</td></tr>`;
  }).join('');

  // 五、连词成句（用例句打散）
  const section5Items = words.filter(w => w.example).slice(0, 3).map((w, i) => {
    const words_arr = w.example.replace(/[.!?]/, '').split(/\s+/).filter(s => s.length > 0);
    const shuffled = [...words_arr].sort(() => 0.5 - Math.random());
    return `<tr>
      <td class="td-num">${i + 1}</td>
      <td><span style="color: #475569;">${shuffled.join(' / ')} (${w.example.includes('.') ? '.' : ''})</span></td>
      <td class="td-blank-large" style="min-width: 200px;">________________________________</td>
    </tr>`;
  }).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", sans-serif; color: #333; background: #fff; font-size: 10pt; line-height: 1.5; }
.page { width: 190mm; min-height: 277mm; padding: 8mm; page-break-after: always; position: relative; }
.page:last-child { page-break-after: auto; }

.header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #10B981; padding-bottom: 4px; margin-bottom: 6px; }
.header-left { display: flex; align-items: center; gap: 8px; }
.header-logo { width: 28px; height: 28px; background: linear-gradient(135deg, #10B981, #06B6D4); border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 10pt; }
.header-title { font-size: 14pt; font-weight: 800; color: #1e293b; }
.header-right { font-size: 8pt; color: #64748b; text-align: right; }

.info-bar { display: flex; gap: 20px; font-size: 9pt; color: #475569; margin-bottom: 6px; flex-wrap: wrap; }
.info-bar span { display: inline-flex; align-items: center; gap: 4px; }
.info-bar .label { color: #94a3b8; }
.info-bar .value { font-weight: 600; color: #334155; border-bottom: 1px solid #cbd5e1; min-width: 60px; padding: 0 4px; }

.encourage { background: linear-gradient(135deg, #d1fae5, #ccfbf1); border-radius: 8px; padding: 6px 10px; font-size: 8pt; color: #065f46; text-align: center; margin-bottom: 8px; font-style: italic; }

.section-title { font-size: 11pt; font-weight: 700; color: #1e293b; margin: 8px 0 4px; padding-left: 8px; border-left: 3px solid #10B981; display: flex; justify-content: space-between; }
.section-score { font-size: 9pt; color: #64748b; font-weight: 400; }

.test-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 6px; }
.test-table th { background: #f0fdf4; padding: 4px 6px; text-align: left; font-size: 8pt; color: #475569; border: 1px solid #bbf7d0; }
.test-table td { padding: 5px 6px; border: 1px solid #e2e8f0; }
.td-num { width: 28px; text-align: center; font-weight: 700; color: #10B981; font-size: 10pt; }
.td-phonetic { font-style: italic; color: #64748b; }
.td-cn { color: #dc2626; font-weight: 500; }
.td-blank-large { color: #cbd5e1; font-style: italic; min-width: 150px; }

.choice-item { padding: 6px 8px; margin-bottom: 4px; background: #f8fafc; border-radius: 4px; border: 1px solid #e2e8f0; font-size: 9pt; }

.footer { position: absolute; bottom: 6mm; left: 8mm; right: 8mm; display: flex; justify-content: space-between; font-size: 7pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 4px; }

/* 答案页 */
.answer-page { background: #fef2f2; }
.answer-banner { background: #dc2626; color: white; text-align: center; padding: 8px; font-size: 12pt; font-weight: 700; border-radius: 6px; margin-bottom: 8px; }
.answer-title { font-size: 9pt; color: #991b1b; text-align: center; margin-bottom: 6px; font-weight: 600; }
.answer-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
.answer-table th { background: #fecaca; padding: 4px 6px; text-align: left; border: 1px solid #f87171; color: #991b1b; }
.answer-table td { padding: 4px 6px; border: 1px solid #fecaca; }
</style>
</head><body>

<!-- 第1页：练习题 -->
<div class="page">
  <div class="header">
    <div class="header-left">
      <div class="header-logo">EN</div>
      <div class="header-title">英语词汇练习单</div>
    </div>
    <div class="header-right">人教版PEP · ${semesterName}</div>
  </div>
  
  <div class="info-bar">
    <span><span class="label">姓名</span><span class="value">${studentName || '________'}</span></span>
    <span><span class="label">范围</span><span class="value">${rangeText}</span></span>
    <span><span class="label">用时</span><span class="value">________</span></span>
    <span><span class="label">得分</span><span class="value">____/100</span></span>
    <span><span class="label">日期</span><span class="value">${date}</span></span>
  </div>
  
  <div class="encourage">${encouragement}</div>
  
  <div class="section-title">一、看音标写单词 <span class="section-score">(20分)</span></div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>音标</th><th>单词</th></tr>
    ${section1Rows}
  </table>
  
  <div class="section-title">二、看中文写英文 <span class="section-score">(20分)</span></div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>中文</th><th>英文单词</th></tr>
    ${section2Rows}
  </table>
  
  <div class="section-title">三、选择正确的中文释义 <span class="section-score">(20分)</span></div>
  ${section3Items}
  
  <div class="section-title">四、补全短语 <span class="section-score">(20分)</span></div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>补全下列短语</th></tr>
    ${section4Items}
  </table>
  
  <div class="section-title">五、连词成句 <span class="section-score">(20分)</span></div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>打乱顺序</th><th>连成正确句子</th></tr>
    ${section5Items}
  </table>
  
  <div class="footer">
    <span>英语提分平台 · 练习单</span>
    <span>第 1 页 · 共 2 页</span>
  </div>
</div>

<!-- 第2页：答案 -->
<div class="page answer-page">
  <div class="answer-banner">答 案 页</div>
  <div class="answer-title">教师专用 / 家长批改用 · 学生完成前请勿翻阅</div>
  
  <div class="section-title" style="border-left-color: #dc2626;">一、看音标写单词 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>音标</th><th>答案</th><th>中文</th></tr>
    ${words.slice(0, 6).map((w, i) => `<tr><td class="td-num">${i + 1}</td><td>${w.phonetic}</td><td style="font-weight:700;color:#166534;">${w.word}</td><td>${w.meanings?.[0]}</td></tr>`).join('')}
  </table>
  
  <div class="section-title" style="border-left-color: #dc2626;">二、看中文写英文 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>中文</th><th>答案</th><th>音标</th></tr>
    ${words.slice(0, 6).map((w, i) => `<tr><td class="td-num">${i + 1}</td><td>${w.meanings?.[0]}</td><td style="font-weight:700;color:#166534;">${w.word}</td><td>${w.phonetic}</td></tr>`).join('')}
  </table>
  
  <div class="section-title" style="border-left-color: #dc2626;">三、选择题 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>单词</th><th>正确答案</th></tr>
    ${words.slice(0, 5).map((w, i) => `<tr><td class="td-num">${i + 1}</td><td>${w.word}</td><td style="font-weight:700;color:#166534;">${w.meanings?.[0]}</td></tr>`).join('')}
  </table>
  
  <div class="section-title" style="border-left-color: #dc2626;">四、补全短语 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>完整短语</th><th>中文</th></tr>
    ${words.filter(w => w.phrases?.length).slice(0, 4).map((w, i) => `<tr><td class="td-num">${i + 1}</td><td style="font-weight:700;color:#166534;">${w.phrases[0]}</td><td>${w.meanings?.[0]}</td></tr>`).join('')}
  </table>
  
  <div class="section-title" style="border-left-color: #dc2626;">五、连词成句 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>正确句子</th><th>中文</th></tr>
    ${words.filter(w => w.example).slice(0, 3).map((w, i) => `<tr><td class="td-num">${i + 1}</td><td style="font-weight:700;color:#166534;">${w.example}</td><td>${w.meanings?.[0]}</td></tr>`).join('')}
  </table>
  
  <div class="footer">
    <span>英语提分平台 · 练习单答案</span>
    <span>第 2 页 · 共 2 页</span>
  </div>
</div>

</body></html>`;
}

// ============================================
// 模板3：测试单
// ============================================
function generateTestSheet(options: PDFExportOptions): string {
  return generateAcademicSheet(options);
  const { words, studentName, date, semesterName, dayRange } = options;
  const encouragement = getRandomEncouragement('test');
  const rangeText = dayRange || date;
  const totalWords = words.length;

  // 一、英译中
  const s1Rows = words.slice(0, Math.min(totalWords, 8)).map((w, i) =>
    `<tr><td class="td-num">${i + 1}</td><td style="font-weight:600;">${w.word}</td><td class="td-blank">________________________</td></tr>`
  ).join('');

  // 二、中译英+音标
  const s2Rows = words.slice(0, Math.min(totalWords, 8)).map((w, i) =>
    `<tr><td class="td-num">${i + 1}</td><td style="color:#dc2626;font-weight:500;">${w.meanings?.[0] || ''}</td><td class="td-blank">________</td><td class="td-blank">/________/</td></tr>`
  ).join('');

  // 三、音标写词
  const s3Rows = words.slice(0, 6).map((w, i) =>
    `<tr><td class="td-num">${i + 1}</td><td style="font-style:italic;color:#64748b;">${w.phonetic}</td><td class="td-blank">________________________</td></tr>`
  ).join('');

  // 四、选词填空
  const s4Items = words.slice(0, 5).map((w, i) => {
    const distractors = words.filter(ow => ow.word !== w.word).sort(() => 0.5 - Math.random()).slice(0, 2);
    const choices = [w, ...distractors].sort(() => 0.5 - Math.random());
    return `<tr><td class="td-num">${i + 1}</td><td>(   ) ${w.example?.replace(w.word, '________') || '________'}</td><td>${choices.map((c, j) => `<span style="margin-right:12px;">${String.fromCharCode(65 + j)}. ${c.word}</span>`).join('')}</td></tr>`;
  }).join('');

  // 五、按要求写单词（复数/分类）
  const s5Rows = words.slice(0, 6).map((w, i) => {
    const tasks = [
      `${w.word} (复数) ________`,
      `${w.word} (同类词再写一个) ________`,
      `${w.word} (造句) ____________________`,
      `${w.word} (反义词) ________`,
      `${w.word} (词性转换) ________`,
      `用${w.word}填空: I ________ this word.`,
    ];
    return `<tr><td class="td-num">${i + 1}</td><td>${tasks[i % tasks.length]}</td></tr>`;
  }).join('');

  // 答案页
  const answerRows1 = words.slice(0, 8).map((w, i) => `<tr><td class="td-num">${i+1}</td><td>${w.word}</td><td style="font-weight:700;color:#166534;">${w.meanings?.[0]}</td></tr>`).join('');
  const answerRows2 = words.slice(0, 8).map((w, i) => `<tr><td class="td-num">${i+1}</td><td>${w.meanings?.[0]}</td><td style="font-weight:700;color:#166534;">${w.word}</td><td>${w.phonetic}</td></tr>`).join('');
  const answerRows3 = words.slice(0, 6).map((w, i) => `<tr><td class="td-num">${i+1}</td><td>${w.phonetic}</td><td style="font-weight:700;color:#166534;">${w.word}</td></tr>`).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", sans-serif; color: #333; background: #fff; font-size: 10pt; line-height: 1.5; }
.page { width: 190mm; min-height: 277mm; padding: 8mm; page-break-after: always; position: relative; }
.page:last-child { page-break-after: auto; }

.header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #EF4444; padding-bottom: 4px; margin-bottom: 6px; }
.header-left { display: flex; align-items: center; gap: 8px; }
.header-logo { width: 28px; height: 28px; background: linear-gradient(135deg, #EF4444, #F59E0B); border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 10pt; }
.header-title { font-size: 14pt; font-weight: 800; color: #1e293b; }
.header-right { font-size: 8pt; color: #64748b; text-align: right; }

.info-bar { display: flex; gap: 20px; font-size: 9pt; color: #475569; margin-bottom: 6px; flex-wrap: wrap; }
.info-bar span { display: inline-flex; align-items: center; gap: 4px; }
.info-bar .label { color: #94a3b8; }
.info-bar .value { font-weight: 600; color: #334155; border-bottom: 1px solid #cbd5e1; min-width: 60px; padding: 0 4px; }

.test-info { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 6px; font-size: 9pt; }
.test-info-item { display: flex; gap: 6px; }
.test-info-label { color: #94a3b8; }
.test-info-value { font-weight: 600; color: #334155; border-bottom: 1px solid #cbd5e1; flex: 1; padding: 0 4px; }

.encourage { background: linear-gradient(135deg, #fee2e2, #fef3c7); border-radius: 8px; padding: 6px 10px; font-size: 8pt; color: #991b1b; text-align: center; margin-bottom: 8px; font-style: italic; }

.section-title { font-size: 11pt; font-weight: 700; color: #1e293b; margin: 8px 0 4px; padding-left: 8px; border-left: 3px solid #EF4444; display: flex; justify-content: space-between; }
.section-score { font-size: 9pt; color: #64748b; font-weight: 400; }

.test-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 6px; }
.test-table th { background: #fef2f2; padding: 4px 6px; text-align: left; font-size: 8pt; color: #475569; border: 1px solid #fecaca; }
.test-table td { padding: 5px 6px; border: 1px solid #e2e8f0; }
.td-num { width: 28px; text-align: center; font-weight: 700; color: #EF4444; font-size: 10pt; }
.td-blank { color: #cbd5e1; font-style: italic; }

.footer { position: absolute; bottom: 6mm; left: 8mm; right: 8mm; display: flex; justify-content: space-between; font-size: 7pt; color: #94a3b8; border-top: 1px solid #e2e8f0; padding-top: 4px; }

/* 评分区 */
.score-section { margin-top: 12px; padding: 8px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0; }
.score-title { font-weight: 700; color: #1e293b; margin-bottom: 6px; }
.score-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; font-size: 8pt; }
.score-item { text-align: center; padding: 4px; border-radius: 4px; }
.score-a { background: #dcfce7; color: #166534; }
.score-b { background: #dbeafe; color: #1e40af; }
.score-c { background: #fef9c3; color: #854d0e; }
.score-d { background: #ffedd5; color: #9a3412; }
.score-f { background: #fee2e2; color: #991b1b; }

/* 答案页 */
.answer-page { background: #fef2f2; }
.answer-banner { background: #dc2626; color: white; text-align: center; padding: 8px; font-size: 12pt; font-weight: 700; border-radius: 6px; margin-bottom: 8px; }
.answer-title { font-size: 9pt; color: #991b1b; text-align: center; margin-bottom: 6px; font-weight: 600; }
.answer-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
.answer-table th { background: #fecaca; padding: 4px 6px; text-align: left; border: 1px solid #f87171; color: #991b1b; }
.answer-table td { padding: 4px 6px; border: 1px solid #fecaca; }

.teacher-section { margin-top: 12px; font-size: 9pt; color: #475569; }
.teacher-section-item { margin-bottom: 8px; display: flex; gap: 8px; }
.teacher-label { color: #94a3b8; min-width: 70px; }
.teacher-line { border-bottom: 1px solid #cbd5e1; flex: 1; min-height: 20px; }
</style>
</head><body>

<!-- 第1页：试卷 -->
<div class="page">
  <div class="header">
    <div class="header-left">
      <div class="header-logo">EN</div>
      <div class="header-title">英语词汇测试单</div>
    </div>
    <div class="header-right">人教版PEP · ${semesterName}</div>
  </div>
  
  <div class="test-info">
    <div class="test-info-item"><span class="test-info-label">姓名</span><span class="test-info-value">${studentName || ''}</span></div>
    <div class="test-info-item"><span class="test-info-label">范围</span><span class="test-info-value">${rangeText}</span></div>
    <div class="test-info-item"><span class="test-info-label">日期</span><span class="test-info-value">${date}</span></div>
    <div class="test-info-item"><span class="test-info-label">得分</span><span class="test-info-value">______/100</span></div>
    <div class="test-info-item"><span class="test-info-label">等级</span><span class="test-info-value">______</span></div>
    <div class="test-info-item"><span class="test-info-label">用时</span><span class="test-info-value">______分钟</span></div>
  </div>
  
  <div class="encourage">${encouragement}</div>
  
  <div class="section-title">一、单词英译中（根据英文写中文，20分）</div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th style="width:120px">英文单词</th><th>中文释义</th></tr>
    ${s1Rows}
  </table>
  
  <div class="section-title">二、单词中译英（根据中文写英文+音标，30分）</div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>中文</th><th>英文单词</th><th>音标</th></tr>
    ${s2Rows}
  </table>
  
  <div class="section-title">三、根据音标写单词（20分）</div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>音标</th><th>单词</th></tr>
    ${s3Rows}
  </table>
  
  <div class="footer">
    <span>英语提分平台 · 测试单</span>
    <span>第 1 页 · 共 2 页</span>
  </div>
</div>

<!-- 第2页：试卷续 + 评分区 -->
<div class="page">
  <div class="header">
    <div class="header-left">
      <div class="header-logo">EN</div>
      <div class="header-title">英语词汇测试单（续）</div>
    </div>
    <div class="header-right">${rangeText}</div>
  </div>
  
  <div class="section-title">四、选词填空（15分）</div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>句子</th><th>选项</th></tr>
    ${s4Items}
  </table>
  
  <div class="section-title">五、按要求写单词（15分）</div>
  <table class="test-table">
    <tr><th style="width:30px">No.</th><th>题目</th></tr>
    ${s5Rows}
  </table>
  
  <div class="score-section">
    <div class="score-title">评分标准</div>
    <div class="score-grid">
      <div class="score-item score-a">A<br>90-100<br>优秀</div>
      <div class="score-item score-b">B<br>80-89<br>良好</div>
      <div class="score-item score-c">C<br>70-79<br>中等</div>
      <div class="score-item score-d">D<br>60-69<br>及格</div>
      <div class="score-item score-f">F<br>&lt;60<br>需努力</div>
    </div>
  </div>
  
  <div class="teacher-section">
    <div class="teacher-section-item"><span class="teacher-label">评语：</span><span class="teacher-line"></span></div>
    <div class="teacher-section-item"><span class="teacher-label">老师签字：</span><span class="teacher-line" style="max-width: 120px;"></span><span class="teacher-label" style="margin-left: 24px;">日期：</span><span class="teacher-line" style="max-width: 100px;"></span></div>
  </div>
  
  <div style="text-align: center; margin-top: 16px; font-size: 10pt; color: #7c3aed; font-weight: 600; font-style: italic;">
    "Every expert was once a beginner." 每个专家都曾是初学者，继续加油！
  </div>
  
  <div class="footer">
    <span>英语提分平台 · 测试单</span>
    <span>第 2 页 · 共 3 页</span>
  </div>
</div>

<!-- 第3页：答案 -->
<div class="page answer-page">
  <div class="answer-banner">答 案 页</div>
  <div class="answer-title">教师专用 / 家长批改用 · 学生完成前请勿翻阅</div>
  
  <div class="section-title" style="border-left-color: #dc2626;">一、英译中 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>英文</th><th>答案</th></tr>
    ${answerRows1}
  </table>
  
  <div class="section-title" style="border-left-color: #dc2626;">二、中译英 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>中文</th><th>英文</th><th>音标</th></tr>
    ${answerRows2}
  </table>
  
  <div class="section-title" style="border-left-color: #dc2626;">三、音标写词 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>音标</th><th>答案</th></tr>
    ${answerRows3}
  </table>
  
  <div class="section-title" style="border-left-color: #dc2626;">四、选词填空 答案</div>
  <table class="answer-table">
    <tr><th>No.</th><th>正确答案</th></tr>
    ${words.slice(0, 5).map((w, i) => `<tr><td class="td-num">${i+1}</td><td style="font-weight:700;color:#166534;">${w.word}</td></tr>`).join('')}
  </table>
  
  <div class="footer">
    <span>英语提分平台 · 测试单答案</span>
    <span>第 3 页 · 共 3 页</span>
  </div>
</div>

</body></html>`;
}

// ============================================
// 导出主函数
// ============================================
export async function generatePDF(options: PDFExportOptions): Promise<boolean> {
  const { exportType } = options;

  try {
    // 1. 生成HTML
    let html: string;
    switch (exportType) {
      case 'memory': html = generateMemorySheet(options); break;
      case 'exercise': html = generateExerciseSheet(options); break;
      case 'test': html = generateTestSheet(options); break;
      default: html = generateMemorySheet(options);
    }

    // 2. 创建临时iframe渲染HTML
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.top = '-9999px';
    iframe.style.left = '-9999px';
    iframe.style.width = '210mm';
    iframe.style.height = '297mm';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
      document.body.removeChild(iframe);
      return false;
    }

    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    // 3. 等待字体和图片加载
    await new Promise(resolve => setTimeout(resolve, 800));

    // 4. 获取所有页面元素
    const pages = iframeDoc.querySelectorAll('.page');
    if (pages.length === 0) {
      document.body.removeChild(iframe);
      return false;
    }

    // 5. 用html2canvas逐页截图
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i] as HTMLElement;

      const canvas = await html2canvas(page, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: 794,  // 210mm @ 96dpi
        height: 1123, // 297mm @ 96dpi
      });

      const imgData = canvas.toDataURL('image/png');

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    }

    // 6. 生成文件名并下载
    const fileName = getFileName(options);
    pdf.save(fileName);

    // 7. 清理
    document.body.removeChild(iframe);
    return true;

  } catch (e) {
    console.error('PDF generation error:', e);
    return false;
  }
}

function getFileName(options: PDFExportOptions): string {
  const typeMap: Record<ExportType, string> = { memory: '记背单', exercise: '练习单', test: '测试单' };
  const name = options.studentName ? `_${options.studentName}` : '';
  const range = options.dayRange ? `_${options.dayRange}` : `_${options.date}`;
  return `词汇${typeMap[options.exportType]}_${options.semesterName}${range}${name}.pdf`;
}

// 数据融合引擎：合并多天的词汇（去重）
export function mergeWordsFromDays(days: { words: CalendarWord[] }[]): CalendarWord[] {
  const seen = new Set<string>();
  const merged: CalendarWord[] = [];
  for (const day of days) {
    for (const w of day.words) {
      const key = w.word.toLowerCase().trim();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(w);
      }
    }
  }
  return merged;
}
