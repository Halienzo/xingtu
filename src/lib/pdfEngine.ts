import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { CalendarWord } from '../sections/VocabularyCalendar';

// ============================================
// PDF生成核心引擎 - 词汇测试单（精简版）
// ============================================

export type ExportType = 'test';

export interface PDFExportOptions {
  words: CalendarWord[];
  exportType: ExportType;
  studentName: string;
  studentClass?: string;
  date: string;
  semesterName: string;
  dayRange?: string;
}

function escapeHtml(value: string): string {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function generateTestSheet(options: PDFExportOptions): string {
  const { words, studentName, studentClass, date, semesterName, dayRange } = options;
  const rangeText = dayRange || date;
  const total = words.length;

  // 中译英：取全部单词
  const cnToEnRows = words.map((w, i) => `
    <tr>
      <td class="num">${i + 1}</td>
      <td class="cn">${escapeHtml((w.meanings || []).join('；'))}</td>
      <td class="blank"></td>
    </tr>`).join('');

  // 英译中：取全部单词
  const enToCnRows = words.map((w, i) => `
    <tr>
      <td class="num">${i + 1}</td>
      <td class="word">${escapeHtml(w.word)}</td>
      <td class="blank"></td>
    </tr>`).join('');

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { color: #1f2937; background: #fff; font-family: "Noto Sans SC", "Microsoft YaHei", "PingFang SC", "Helvetica Neue", Arial, sans-serif; font-size: 11pt; line-height: 1.6; }
  .page { width: 190mm; min-height: 277mm; padding: 12mm 10mm; page-break-after: always; position: relative; }
  .page:last-child { page-break-after: auto; }

  /* 页眉 */
  .header { display: flex; justify-content: space-between; align-items: flex-end; border-bottom: 2px solid #1e3a5f; padding-bottom: 10px; margin-bottom: 14px; }
  .header-left { display: flex; align-items: center; gap: 10px; }
  .header-logo { width: 32px; height: 32px; background: linear-gradient(135deg, #1e3a5f, #3b82f6); border-radius: 8px; display: inline-flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 11pt; }
  .header-title { font-size: 18pt; font-weight: 800; color: #1e3a5f; letter-spacing: 0.5px; }
  .header-sub { font-size: 10pt; color: #6b7280; margin-top: 2px; }
  .header-right { text-align: right; font-size: 9pt; color: #6b7280; }

  /* 信息栏 */
  .info-bar { display: flex; gap: 24px; font-size: 10.5pt; color: #374151; margin-bottom: 16px; padding: 10px 12px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; }
  .info-item { display: flex; align-items: center; gap: 6px; }
  .info-label { color: #64748b; font-weight: 500; }
  .info-value { font-weight: 600; color: #1f2937; border-bottom: 1px solid #cbd5e1; min-width: 80px; padding: 0 4px; }

  /* 板块标题 */
  .section { margin: 16px 0 8px; font-size: 12pt; font-weight: 700; color: #1e3a5f; padding-left: 10px; border-left: 4px solid #3b82f6; display: flex; align-items: center; gap: 8px; }
  .section-num { width: 22px; height: 22px; background: #1e3a5f; color: white; border-radius: 50%; font-size: 9pt; display: inline-flex; align-items: center; justify-content: center; }

  /* 表格 */
  table { width: 100%; border-collapse: collapse; margin-top: 6px; page-break-inside: auto; }
  th { background: #f1f5f9; color: #1e3a5f; font-weight: 700; border: 1px solid #cbd5e1; padding: 7px 8px; text-align: left; font-size: 10pt; }
  td { border: 1px solid #e2e8f0; padding: 7px 8px; vertical-align: middle; }
  tr { page-break-inside: avoid; }
  .num { width: 10mm; text-align: center; color: #1e3a5f; font-weight: 700; }
  .word { font-weight: 700; font-family: Georgia, "Times New Roman", serif; color: #1f2937; }
  .cn { color: #b45309; font-weight: 500; }
  .blank { min-width: 60mm; height: 22px; }

  /* 底部 */
  .footer { position: absolute; left: 10mm; right: 10mm; bottom: 8mm; border-top: 1px solid #e2e8f0; padding-top: 6px; color: #94a3b8; font-size: 8pt; display: flex; justify-content: space-between; }

  /* 分页提示 */
  .page-note { font-size: 9pt; color: #64748b; margin-bottom: 8px; }
</style>
</head>
<body>

<!-- 第1页：测试单 -->
<div class="page">
  <div class="header">
    <div class="header-left">
      <div class="header-logo">EN</div>
      <div>
        <div class="header-title">英语词汇测试单</div>
        <div class="header-sub">${escapeHtml(semesterName)} · ${escapeHtml(rangeText)} · 共 ${total} 词</div>
      </div>
    </div>
    <div class="header-right">
      <div>英语提分平台</div>
      <div style="font-size:8pt;color:#94a3b8;margin-top:2px;">Vocabulary Test Sheet</div>
    </div>
  </div>

  <div class="info-bar">
    <div class="info-item"><span class="info-label">姓　名</span><span class="info-value">${escapeHtml(studentName || '')}</span></div>
    <div class="info-item"><span class="info-label">班　级</span><span class="info-value">${escapeHtml(studentClass || '')}</span></div>
    <div class="info-item"><span class="info-label">日　期</span><span class="info-value">${escapeHtml(date)}</span></div>
    <div class="info-item"><span class="info-label">得　分</span><span class="info-value" style="min-width:60px;">______ / ______</span></div>
  </div>

  <div class="section"><span class="section-num">1</span>中译英（根据中文释义写出对应的英文单词）</div>
  <div class="page-note">请将英文单词填写在右侧空白处。</div>
  <table>
    <thead><tr><th style="width:10mm">No.</th><th>中文释义</th><th style="min-width:70mm">英文单词</th></tr></thead>
    <tbody>${cnToEnRows}</tbody>
  </table>

  <div class="section"><span class="section-num">2</span>英译中（根据英文单词写出对应的中文释义）</div>
  <div class="page-note">请将中文意思填写在右侧空白处。</div>
  <table>
    <thead><tr><th style="width:10mm">No.</th><th>英文单词</th><th style="min-width:70mm">中文释义</th></tr></thead>
    <tbody>${enToCnRows}</tbody>
  </table>

  <div class="footer">
    <span>${escapeHtml(semesterName)} · ${escapeHtml(rangeText)}</span>
    <span>第 1 页</span>
  </div>
</div>

</body>
</html>`;
}

// ============================================
// 导出主函数
// ============================================
export async function generatePDF(options: PDFExportOptions): Promise<boolean> {
  try {
    const html = generateTestSheet(options);

    // 创建临时iframe渲染HTML
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

    // 等待字体加载
    await new Promise(resolve => setTimeout(resolve, 800));

    // 获取所有页面元素
    const pages = iframeDoc.querySelectorAll('.page');
    if (pages.length === 0) {
      document.body.removeChild(iframe);
      return false;
    }

    // 用html2canvas逐页截图
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
        width: 794,
        height: 1123,
      });

      const imgData = canvas.toDataURL('image/png');

      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297);
    }

    // 生成文件名并下载
    const fileName = getFileName(options);
    pdf.save(fileName);

    // 清理
    document.body.removeChild(iframe);
    return true;

  } catch (e) {
    console.error('PDF generation error:', e);
    return false;
  }
}

function getFileName(options: PDFExportOptions): string {
  const name = options.studentName ? `_${options.studentName}` : '';
  const cls = options.studentClass ? `_${options.studentClass}` : '';
  const range = options.dayRange ? `_${options.dayRange}` : `_${options.date}`;
  return `词汇测试单_${options.semesterName}${range}${cls}${name}.pdf`;
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
