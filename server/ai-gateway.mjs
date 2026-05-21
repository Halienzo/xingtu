import http from 'node:http';

const PORT = Number(process.env.XSC_AI_PORT || 8787);

const PROVIDERS = {
  deepseek: {
    label: 'DeepSeek',
    keyNames: ['DEEPSEEK_API_KEY'],
    baseUrl: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
    model: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  },
  kimi: {
    label: 'Kimi',
    keyNames: ['KIMI_API_KEY', 'MOONSHOT_API_KEY'],
    baseUrl: process.env.KIMI_BASE_URL || process.env.MOONSHOT_BASE_URL || 'https://api.moonshot.ai/v1',
    model: process.env.KIMI_MODEL || process.env.MOONSHOT_MODEL || 'moonshot-v1-8k',
  },
};

const TASK_PROMPTS = {
  essay: '你是一个温柔但严格的英语作文批改老师。请从内容完整度、语法、词汇、句式、逻辑、考试得分点和可直接替换的高分表达进行批改。反馈要共情青春期学生，指出问题时给出可执行改法。',
  grammar: '你是英语语法诊断老师。请定位句子中的语法问题，解释规则，给出正确版本，并说明为什么这样改。',
  content: '你是英语学习内容生成助手。请围绕用户给出的主题生成可用于初高中学习的例句、解释、练习题和答案，语气温暖、准确、可考试迁移。',
};

function readJson(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON body'));
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, status, payload) {
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'access-control-allow-origin': process.env.XSC_ALLOWED_ORIGIN || '*',
    'access-control-allow-methods': 'GET,POST,OPTIONS',
    'access-control-allow-headers': 'content-type,authorization',
  });
  res.end(JSON.stringify(payload));
}

function getApiKey(provider) {
  for (const keyName of provider.keyNames) {
    if (process.env[keyName]) return process.env[keyName];
  }
  return '';
}

function chatEndpoint(baseUrl) {
  const clean = baseUrl.replace(/\/+$/, '');
  if (clean.endsWith('/chat/completions')) return clean;
  return `${clean}/chat/completions`;
}

function buildMessages(task, content, context) {
  const system = TASK_PROMPTS[task] || TASK_PROMPTS.essay;
  const contextText = context ? `\n\n补充背景：\n${context}` : '';
  return [
    { role: 'system', content: system },
    {
      role: 'user',
      content: `请处理以下内容：\n\n${content}${contextText}\n\n输出格式：\n1. 总体判断\n2. 主要问题\n3. 逐句或分点修改\n4. 可直接背诵/迁移的高分版本\n5. 下一步练习建议`,
    },
  ];
}

async function handleAiReview(req, res) {
  try {
    const body = await readJson(req);
    const providerKey = body.provider === 'kimi' ? 'kimi' : 'deepseek';
    const provider = PROVIDERS[providerKey];
    const apiKey = getApiKey(provider);

    if (!apiKey) {
      sendJson(res, 400, {
        ok: false,
        error: `${provider.label} API Key is not configured.`,
        hint: `Set ${provider.keyNames.join(' or ')} before starting npm run ai:gateway.`,
      });
      return;
    }

    if (!body.content || typeof body.content !== 'string') {
      sendJson(res, 400, { ok: false, error: 'content is required.' });
      return;
    }

    const response = await fetch(chatEndpoint(provider.baseUrl), {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: body.model || provider.model,
        messages: buildMessages(body.task, body.content, body.context),
        temperature: Number.isFinite(Number(body.temperature)) ? Number(body.temperature) : 0.3,
        stream: false,
      }),
    });

    const text = await response.text();
    let payload;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { raw: text };
    }

    if (!response.ok) {
      sendJson(res, response.status, {
        ok: false,
        provider: providerKey,
        error: payload?.error?.message || payload?.message || `Provider returned HTTP ${response.status}`,
        providerPayload: payload,
      });
      return;
    }

    sendJson(res, 200, {
      ok: true,
      provider: providerKey,
      model: body.model || provider.model,
      result: payload?.choices?.[0]?.message?.content || '',
      providerPayload: payload,
    });
  } catch (error) {
    sendJson(res, 500, { ok: false, error: error instanceof Error ? error.message : 'Unknown server error' });
  }
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    sendJson(res, 204, {});
    return;
  }

  const url = new URL(req.url || '/', `http://${req.headers.host || '127.0.0.1'}`);

  if (req.method === 'GET' && url.pathname === '/health') {
    sendJson(res, 200, {
      ok: true,
      providers: Object.fromEntries(
        Object.entries(PROVIDERS).map(([key, provider]) => [key, {
          configured: Boolean(getApiKey(provider)),
          baseUrl: provider.baseUrl,
          model: provider.model,
        }]),
      ),
    });
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/ai/review') {
    handleAiReview(req, res);
    return;
  }

  sendJson(res, 404, { ok: false, error: 'Not found' });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[xsc-ai-gateway] http://127.0.0.1:${PORT}`);
});
