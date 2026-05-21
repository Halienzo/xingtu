// ============================================
// Starry Starry Night - 实时标点检查沙盒
// 用户输入英文段落，实时检测并标记标点错误
// ============================================
import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, AlertTriangle, CheckCircle, Sparkles, RotateCcw, BookOpen } from 'lucide-react';
import { playCorrectSound } from '../utils/soundSystem';

interface PunctuationError {
  type: 'error' | 'warning' | 'tip';
  message: string;
  suggestion: string;
  position?: number;
  rule: string;
}

const PUNCTUATION_PATTERNS = [
  { pattern: /\b(However|Therefore|Moreover|Furthermore|Nevertheless|Nonetheless)\b/g, type: 'warning' as const, message: '副词连接词前应该用分号或句号', suggestion: '副词连接词前不能用逗号连接独立句', rule: '副词连接词标点规则' },
  { pattern: /\b(Because|Although|Though|While|If|Unless|When|After|Before|Since|Until|Whereas)\b[^,.]*\b(?:I|you|he|she|it|we|they)\b/gi, type: 'tip' as const, message: '从句在句首时，后面应加逗号', suggestion: '从句在句首+逗号', rule: '从句标点规则' },
  { pattern: /[a-zA-Z]+\.[A-Z]/g, type: 'warning' as const, message: '句号后应有一个空格', suggestion: '句号后加一个空格再接大写字母', rule: '空格规则' },
  { pattern: /,,/g, type: 'error' as const, message: '连续两个逗号', suggestion: '删除多余的逗号', rule: '逗号规则' },
  { pattern: /,,,/g, type: 'error' as const, message: '连续三个逗号（英文省略号应该用...）', suggestion: '英文省略号用三个点"..."', rule: '省略号规则' },
  { pattern: /《[^》]*》/g, type: 'error' as const, message: '英文中不使用中文书名号《》', suggestion: '英文书名用斜体或引号', rule: '书名号规则' },
  { pattern: /[、]/g, type: 'error' as const, message: '英文中没有顿号', suggestion: '并列词语用逗号分隔', rule: '顿号规则' },
  { pattern: /[。]/g, type: 'error' as const, message: '英文句号应该用实心点".", 不是""', suggestion: '将""改为"."', rule: '句号规则' },
  { pattern: /[！]/g, type: 'warning' as const, message: '英文感叹号用"!"', suggestion: '将"！"改为"!"', rule: '感叹号规则' },
  { pattern: /(?:^|\s)(I|you|he|she|it|we|they)\s+like[s]?\s+[^,]+(?:and|but|so|or|yet|nor|for)\s+(I|you|he|she|it|we|they)/gi, type: 'tip' as const, message: 'FANBOYS连接两个独立句时，前面应加逗号', suggestion: '在FANBOYS前加逗号', rule: 'FANBOYS规则' },
  { pattern: /\?\s*\./g, type: 'error' as const, message: '问号后不应再加句号', suggestion: '删除问号后的句号', rule: '问号规则' },
  { pattern: /:\s*"/g, type: 'tip' as const, message: '英文中引出直接引语通常用逗号，不是冒号', suggestion: '将冒号改为逗号（美式英语）', rule: '引号规则' },
  { pattern: /\b\w+ly\b,\s*\b\w+ly\b/g, type: 'warning' as const, message: '并列副词之间可能缺少逗号', suggestion: '检查并列副词是否需要逗号', rule: '逗号规则' },
  { pattern: /\.{4,}/g, type: 'warning' as const, message: '省略号应为3个点（英文）或6个点（中文）', suggestion: '英文用3个点"..."', rule: '省略号规则' },
  { pattern: /(?:He|She|They)\s+said\s*:/gi, type: 'warning' as const, message: '美式英语中，said后通常用逗号引出引语', suggestion: 'He said, "..."', rule: '引号规则' },
];

export default function PunctuationSandbox() {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState<PunctuationError[]>([]);
  const [, setIsChecking] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const checkPunctuation = useCallback((input: string) => {
    if (!input.trim()) {
      setErrors([]);
      return;
    }
    setIsChecking(true);

    const found: PunctuationError[] = [];

    PUNCTUATION_PATTERNS.forEach(({ pattern, type, message, suggestion, rule }) => {
      const matches = input.match(pattern);
      if (matches) {
        matches.forEach(() => {
          if (!found.some(e => e.message === message)) {
            found.push({ type, message, suggestion, rule });
          }
        });
      }
    });

    // 逗号拼接检测
    const commaSplicePattern = /[a-zA-Z]+\s+[a-zA-Z]+,\s+[A-Z][a-z]+\s+[a-zA-Z]+/;
    if (commaSplicePattern.test(input) && /\b(and|but|so|or|yet|nor|for)\b/.test(input) === false) {
      const sentences = input.split(/[.!?]/).filter(s => s.trim());
      sentences.forEach(s => {
        if (s.includes(',') && s.trim().split(/\s+/).length > 4) {
          if (!found.some(e => e.message.includes('逗号拼接'))) {
            found.push({
              type: 'warning',
              message: '可能存在逗号拼接（Comma Splice）',
              suggestion: '两个独立句之间用句号、分号或FANBOYS连词',
              rule: '逗号拼接规则',
            });
          }
        }
      });
    }

    // 空格检测
    if (/\.[a-zA-Z]/.test(input) && !/\.\s[a-zA-Z]/.test(input)) {
      if (!found.some(e => e.message === '句号后缺少空格')) {
        found.push({
          type: 'error',
          message: '句号后缺少空格',
          suggestion: '句号后应加一个空格再接下一个句子',
          rule: '空格规则',
        });
      }
    }

    // 首字母大写检测
    const sentences2 = input.split(/[.!?]\s+/).filter(s => s.trim());
    sentences2.forEach(s => {
      if (s.length > 0 && s[0] !== s[0].toUpperCase()) {
        if (!found.some(e => e.message === '句子首字母应大写')) {
          found.push({
            type: 'warning',
            message: '句子首字母应大写',
            suggestion: '将句子第一个字母改为大写',
            rule: '大小写规则',
          });
        }
      }
    });

    setErrors(found);
    setIsChecking(false);

    if (found.length === 0 && input.trim().length > 10) {
      playCorrectSound();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => checkPunctuation(text), 500);
    return () => clearTimeout(timer);
  }, [text, checkPunctuation]);

  const handleSample = (sample: string) => {
    setText(sample);
  };

  const handleFixAll = () => {
    let fixed = text;
    // 常见自动修复
    fixed = fixed.replace(/《/g, '"').replace(/》/g, '"');
    fixed = fixed.replace(/[。]/g, '.');
    fixed = fixed.replace(/[、]/g, ',');
    fixed = fixed.replace(/[！]/g, '!');
    fixed = fixed.replace(/,,+/g, '...');
    fixed = fixed.replace(/\?\./g, '?');
    fixed = fixed.replace(/\.(?=[A-Z])/g, '. ');
    setText(fixed);
    playCorrectSound();
  };

  const getErrorIcon = (type: string) => {
    switch (type) {
      case 'error': return <AlertTriangle className="text-red-400 shrink-0" size={16} />;
      case 'warning': return <AlertTriangle className="text-amber-400 shrink-0" size={16} />;
      default: return <Sparkles className="text-cyan-400 shrink-0" size={16} />;
    }
  };

  const getErrorBg = (type: string) => {
    switch (type) {
      case 'error': return 'bg-red-500/10 border-red-500/20';
      case 'warning': return 'bg-amber-500/10 border-amber-500/20';
      default: return 'bg-cyan-500/10 border-cyan-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
          <Wand2 className="text-amber-400" size={22} />
          实时标点检查沙盒
        </h2>
        <p className="text-slate-400 text-sm">输入英文段落，系统将自动检测标点符号使用问题并给出修改建议</p>
      </div>

      {/* 示例按钮 */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[
          { label: '示例1', text: 'I like apples、bananas and oranges, he likes grapes.' },
          { label: '示例2', text: 'When I was young I lived in Beijing。He said:"I like this city."' },
          { label: '示例3', text: 'I was tired, however, I went to work. Because I need money.' },
        ].map((sample, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSample(sample.text)}
            className="px-3 py-1.5 rounded-lg bg-slate-800 text-amber-400 text-sm border border-amber-500/20 hover:border-amber-500/40 transition-colors"
          >
            {sample.label}
          </motion.button>
        ))}
      </div>

      {/* 文本输入区 */}
      <div className="relative mb-4">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="在此输入英文段落...系统将自动检测标点问题"
          className="w-full h-40 bg-slate-800/80 border border-slate-700 rounded-2xl p-4 text-white text-sm leading-relaxed focus:outline-none focus:border-amber-500 resize-none placeholder-slate-500"
          spellCheck={false}
        />
        {text.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute bottom-3 right-3 flex gap-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleFixAll}
              className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              title="尝试自动修复常见问题"
            >
              <Sparkles size={12} /> 一键修复
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setText('')}
              className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs transition-colors"
            >
              <RotateCcw size={12} />
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* 字符统计 */}
      {text.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-4 text-xs text-slate-400"
        >
          <span>字符数: {text.length}</span>
          <span>单词数: {text.trim().split(/\s+/).filter(Boolean).length}</span>
          <span>句子数: {text.split(/[.!?]+/).filter(s => s.trim()).length}</span>
          <span className={`font-semibold ${errors.filter(e => e.type === 'error').length > 0 ? 'text-red-400' : errors.length > 0 ? 'text-amber-400' : 'text-green-400'}`}>
            {errors.filter(e => e.type === 'error').length > 0 ? `${errors.filter(e => e.type === 'error').length}个错误` : errors.length > 0 ? `${errors.length}个提示` : '暂无问题'}
          </span>
        </motion.div>
      )}

      {/* 检查结果 */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-2"
          >
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <AlertTriangle className="text-amber-400" size={16} />
              检测到的问题
            </h3>
            {errors.map((error, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-3 rounded-xl border ${getErrorBg(error.type)} flex items-start gap-3`}
              >
                {getErrorIcon(error.type)}
                <div className="flex-1">
                  <div className="text-white text-sm font-medium">{error.message}</div>
                  <div className="text-slate-400 text-xs mt-1">{error.suggestion}</div>
                  <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-700/50 text-slate-400 text-[10px]">{error.rule}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  error.type === 'error' ? 'bg-red-500/20 text-red-400' :
                  error.type === 'warning' ? 'bg-amber-500/20 text-amber-400' :
                  'bg-cyan-500/20 text-cyan-400'
                }`}>
                  {error.type === 'error' ? '错误' : error.type === 'warning' ? '警告' : '提示'}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 全部正确 */}
      <AnimatePresence>
        {errors.length === 0 && text.trim().length > 10 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <CheckCircle className="text-emerald-400" size={20} />
            <div>
              <div className="text-emerald-300 font-semibold text-sm">未发现标点问题！</div>
              <div className="text-emerald-400/60 text-xs">你的英文段落标点使用正确</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 标点速查表 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-8 p-4 rounded-2xl bg-slate-800/50 border border-slate-700"
      >
        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
          <BookOpen size={16} className="text-amber-400" />
          常见错误速查
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
          {[
            { wrong: '苹果、香蕉', correct: 'apples, bananas', rule: '英文没有顿号' },
            { wrong: 'I like。', correct: 'I like.', rule: '英文句号是实心点' },
            { wrong: 'He said: "..."', correct: 'He said, "..."', rule: '美式英语用逗号' },
            { wrong: 'I like, she likes.', correct: 'I like; she likes.', rule: '逗号不能连独立句' },
            { wrong: '《Harry Potter》', correct: '"Harry Potter"', rule: '英文用引号/斜体' },
            { wrong: '......', correct: '...', rule: '英文省略号3个点' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2 p-2 rounded-lg bg-slate-900/50"
            >
              <span className="text-red-400 line-through">{item.wrong}</span>
              <span className="text-slate-600">→</span>
              <span className="text-emerald-400">{item.correct}</span>
              <span className="text-slate-500 ml-auto">{item.rule}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
