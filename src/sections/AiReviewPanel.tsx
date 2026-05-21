import { useMemo, useState } from 'react';
import { Bot, CheckCircle, Loader2, Send, Settings, Sparkles } from 'lucide-react';

type Provider = 'deepseek' | 'kimi';
type TaskType = 'essay' | 'grammar' | 'content';

const PROVIDERS: { key: Provider; label: string; desc: string }[] = [
  { key: 'deepseek', label: 'DeepSeek', desc: '适合语法诊断、作文批改和结构化推理' },
  { key: 'kimi', label: 'Kimi', desc: '适合长文本理解、内容润色和作文反馈' },
];

const TASKS: { key: TaskType; label: string; desc: string; placeholder: string }[] = [
  {
    key: 'essay',
    label: '作文批改',
    desc: '内容、结构、语法、词汇、句式和考试得分点',
    placeholder: '粘贴学生英语作文，或输入作文题目 + 学生答案...',
  },
  {
    key: 'grammar',
    label: '语法诊断',
    desc: '定位句子错误，解释规则并给出改法',
    placeholder: '输入需要诊断的英文句子或段落...',
  },
  {
    key: 'content',
    label: '内容生成',
    desc: '生成例句、知识点讲解、练习题和答案',
    placeholder: '输入知识点、主题或作文方向，例如：青春期渴望被理解的倒装句例句...',
  },
];

function joinGatewayUrl(base: string) {
  const clean = base.trim().replace(/\/+$/, '');
  return clean ? `${clean}/api/ai/review` : '/api/ai/review';
}

export default function AiReviewPanel() {
  const [provider, setProvider] = useState<Provider>('deepseek');
  const [task, setTask] = useState<TaskType>('essay');
  const [gatewayUrl, setGatewayUrl] = useState(() => localStorage.getItem('xsc_ai_gateway_url') || '');
  const [model, setModel] = useState('');
  const [context, setContext] = useState('目标：初高中英语学习；反馈语气：温柔、共情、准确、可直接修改。');
  const [content, setContent] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const activeTask = useMemo(() => TASKS.find(item => item.key === task) || TASKS[0], [task]);
  const endpoint = joinGatewayUrl(gatewayUrl);

  const handleSubmit = async () => {
    if (!content.trim()) {
      setError('请先输入需要批改或生成的内容。');
      return;
    }

    setLoading(true);
    setError('');
    setResult('');
    localStorage.setItem('xsc_ai_gateway_url', gatewayUrl.trim());

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          provider,
          task,
          model: model.trim() || undefined,
          context,
          content,
        }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.hint || payload.error || `接口返回 ${response.status}`);
      }
      setResult(payload.result || '接口已返回，但没有生成文本。');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'AI接口调用失败。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <div className="mb-2 flex items-center gap-2 text-cyan-300">
            <Bot size={20} />
            <span className="text-xs font-black uppercase tracking-[0.2em]">AI Gateway</span>
          </div>
          <h1 className="text-3xl font-black text-white">DeepSeek / Kimi 批改接口端</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            前端只调用本地代理接口，API Key 放在后端环境变量中。用于今后的作文批改、语法诊断、内容生成和知识点扩展。
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-white">
                <Sparkles size={16} className="text-amber-300" />
                选择模型供应商
              </h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {PROVIDERS.map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setProvider(item.key)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      provider === item.key
                        ? 'border-cyan-300/60 bg-cyan-400/15'
                        : 'border-slate-700 bg-slate-800/55 hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-white">{item.label}</span>
                      {provider === item.key && <CheckCircle size={16} className="text-cyan-300" />}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-slate-400">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
              <h2 className="mb-3 text-sm font-black text-white">任务类型</h2>
              <div className="space-y-2">
                {TASKS.map(item => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setTask(item.key)}
                    className={`w-full rounded-xl border px-3 py-2 text-left transition-all ${
                      task === item.key
                        ? 'border-amber-300/60 bg-amber-400/15'
                        : 'border-slate-700 bg-slate-800/55 hover:border-slate-500'
                    }`}
                  >
                    <div className="font-bold text-white">{item.label}</div>
                    <div className="text-xs text-slate-400">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
              <h2 className="mb-3 flex items-center gap-2 text-sm font-black text-white">
                <Settings size={16} className="text-slate-300" />
                接口配置
              </h2>
              <label className="mb-3 block">
                <span className="mb-1 block text-xs font-bold text-slate-400">Gateway URL（留空使用 /api/ai/review）</span>
                <input
                  value={gatewayUrl}
                  onChange={event => setGatewayUrl(event.target.value)}
                  placeholder="http://127.0.0.1:8787"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-bold text-slate-400">模型名（可选，留空走后端默认）</span>
                <input
                  value={model}
                  onChange={event => setModel(event.target.value)}
                  placeholder={provider === 'deepseek' ? 'deepseek-chat' : 'moonshot-v1-8k'}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                />
              </label>
              <div className="mt-3 rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3 text-xs leading-5 text-cyan-50/80">
                后端脚本：<code>npm run ai:gateway</code>。环境变量模板在 <code>.env.example</code>。
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="rounded-2xl border border-slate-700 bg-slate-900/70 p-4">
              <h2 className="mb-3 text-sm font-black text-white">{activeTask.label}</h2>
              <textarea
                value={content}
                onChange={event => setContent(event.target.value)}
                placeholder={activeTask.placeholder}
                className="min-h-[220px] w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm leading-7 text-white placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
              />
              <label className="mt-3 block">
                <span className="mb-1 block text-xs font-bold text-slate-400">批改/生成背景</span>
                <textarea
                  value={context}
                  onChange={event => setContext(event.target.value)}
                  className="min-h-[82px] w-full resize-y rounded-xl border border-slate-700 bg-slate-950 p-3 text-xs leading-6 text-slate-200 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none"
                />
              </label>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="mt-3 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-cyan-500/20 transition-all hover:shadow-cyan-500/35 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                {loading ? '正在调用接口' : '提交到 AI 接口'}
              </button>
            </div>

            {(error || result) && (
              <div className={`rounded-2xl border p-4 ${error ? 'border-rose-400/30 bg-rose-500/10' : 'border-emerald-400/30 bg-emerald-500/10'}`}>
                <h2 className={`mb-2 text-sm font-black ${error ? 'text-rose-200' : 'text-emerald-200'}`}>
                  {error ? '接口提示' : 'AI 返回结果'}
                </h2>
                <pre className="whitespace-pre-wrap break-words text-sm leading-7 text-slate-100">
                  {error || result}
                </pre>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
