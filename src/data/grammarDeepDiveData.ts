export interface GrammarExample {
  en: string;
  cn: string;
  note: string;
}

export interface GrammarPattern {
  label: string;
  formula: string;
  explanation: string;
  examples: GrammarExample[];
}

export interface GrammarVisualPart {
  label: string;
  text: string;
  role: string;
}

export interface GrammarExamTrap {
  title: string;
  trap: string;
  wrong: string;
  right: string;
  explanation: string;
}

export interface GrammarExamFocus {
  yunnanFocus: string;
  mustKnow: string[];
  traps: GrammarExamTrap[];
  microDrills?: GrammarExample[];
}

export interface GrammarDetail {
  title: string;
  subtitle: string;
  overview: string;
  steps: string[];
  patterns: GrammarPattern[];
  pitfalls: string[];
  visualParts?: GrammarVisualPart[];
}

export const grammarDeepDiveDetails: Record<string, GrammarDetail> = {
  'full-inversion': {
    title: '完全倒装',
    subtitle: '把整个谓语放到主语前，常见于地点、方向、存在结构。',
    overview: '完全倒装不是装饰，而是把场景先推到眼前，再让主语登场。适合地点副词、方向副词、there be、表语前置等结构。',
    steps: [
      '先找句首是否是地点、方向或表语。',
      '再判断动词是否是不及物动词或 be 动词。',
      '最后把谓语整体放在主语前：地点/方向 + 谓语 + 主语。',
    ],
    patterns: [
      {
        label: 'Here/There/Now/Then 句首',
        formula: 'Here/There/Now/Then + come/go/be + 主语',
        explanation: '当主语是名词时可完全倒装；当主语是代词时通常不倒装。',
        examples: [
          { en: 'Here comes the bus.', cn: '公交车来了。', note: 'the bus 是名词，所以 comes 在主语前。' },
          { en: 'Here it comes.', cn: '它来了。', note: 'it 是代词，不倒装。' },
        ],
      },
      {
        label: '地点状语前置',
        formula: '地点状语 + stand/lie/sit/live + 主语',
        explanation: '先给画面位置，再出现主体。',
        examples: [
          { en: 'On the wall hangs a picture of our class.', cn: '墙上挂着一张我们班的照片。', note: '地点在前，谓语 hangs 前置。' },
          { en: 'Beside the window sat a quiet boy.', cn: '窗边坐着一个安静的男孩。', note: '文学和描写类句子常见。' },
        ],
      },
      {
        label: '表语前置',
        formula: '形容词/分词/介词短语 + be + 主语',
        explanation: '把情绪、状态、地点放在前面加强语气。',
        examples: [
          { en: 'Gone are the days when I hid my voice.', cn: '我隐藏声音的日子已经过去了。', note: 'Gone 是表语，are 提到主语前。' },
        ],
      },
    ],
    pitfalls: [
      '主语是代词时通常不用完全倒装：Here he comes.',
      '完全倒装常用一般现在/过去，复杂助动词结构要谨慎。',
      '不要把所有地点状语前置都机械倒装，普通语序也常见。',
    ],
  },
  'partial-inversion': {
    title: '部分倒装总表',
    subtitle: '只把助动词、情态动词或 be 动词提前，主语后面保留实义动词。',
    overview: '部分倒装的核心是“触发词在句首”。触发词通常是否定、限制、only、so/such、比较或省略 if 的虚拟条件。',
    steps: [
      '确认句首是否有触发词。',
      '找原句助动词；没有助动词时加 do/does/did。',
      '形成：触发词 + 助动词/be/情态动词 + 主语 + 谓语剩余部分。',
    ],
    patterns: [
      {
        label: '否定副词句首',
        formula: 'Never/Seldom/Rarely/Little + 助动词 + 主语 + 谓语',
        explanation: '否定或半否定词移到句首时，主句部分倒装。',
        examples: [
          { en: 'Never have I felt so strongly that I should be heard.', cn: '我从未如此强烈地感到自己应该被听见。', note: 'Never 触发 have I。' },
          { en: 'Little did he know how much his words hurt her.', cn: '他几乎不知道自己的话伤她多深。', note: '原句没有助动词，补 did。' },
        ],
      },
      {
        label: 'Only + 状语句首',
        formula: 'Only + 状语 + 助动词 + 主语 + 谓语',
        explanation: 'only 修饰状语时，主句倒装；only 修饰主语时不倒装。',
        examples: [
          { en: 'Only when I spoke honestly did they understand me.', cn: '只有当我诚实表达时，他们才理解我。', note: 'Only when 引导状语，主句 did they understand。' },
          { en: 'Only I understood the note.', cn: '只有我理解那张纸条。', note: 'Only 修饰主语 I，不倒装。' },
        ],
      },
      {
        label: 'So/Such 句首',
        formula: 'So/Such + 被强调部分 + 助动词/be + 主语 + that...',
        explanation: '把程度推到句首，主句部分倒装。',
        examples: [
          { en: 'So warm were her words that I read them twice.', cn: '她的话如此温暖，以至于我读了两遍。', note: 'So warm 触发 were her words。' },
        ],
      },
    ],
    pitfalls: [
      'Only if/only when 后面不是从句倒装，而是主句倒装。',
      '否定词在句中不触发倒装，移到句首才触发。',
      '疑问句语序和倒装相似，但倒装不是提问。',
    ],
  },
  'nor-neither-so-inversion': {
    title: 'nor / neither / so 小触发词倒装',
    subtitle: '小到一个 nor，也会改变后半句语序。',
    overview: '这类倒装用于“我也如此 / 我也不如此”的承接结构。关键是前句肯定用 so，前句否定用 neither/nor。',
    steps: [
      '看前句肯定还是否定。',
      '肯定承接用 so + 助动词/be/情态动词 + 主语。',
      '否定承接用 neither/nor + 助动词/be/情态动词 + 主语。',
    ],
    patterns: [
      {
        label: 'So 表示“也一样”',
        formula: 'So + 助动词/be/情态动词 + 主语',
        explanation: '前句肯定，后句表示另一人也这样。',
        examples: [
          { en: 'She wants to be understood, and so do I.', cn: '她想被理解，我也一样。', note: 'want 是实义动词，承接时用 do。' },
        ],
      },
      {
        label: 'Neither/Nor 表示“也不”',
        formula: 'Neither/Nor + 助动词/be/情态动词 + 主语',
        explanation: '前句否定，后句表示另一人也不这样。',
        examples: [
          { en: 'He did not laugh at her dream, nor did I.', cn: '他没有嘲笑她的梦想，我也没有。', note: 'nor did I 是完整倒装承接。' },
          { en: 'I am not ready to give up, neither is she.', cn: '我还没准备放弃，她也没有。', note: 'be 动词直接提前。' },
        ],
      },
    ],
    pitfalls: [
      'So do I 表示“我也如此”；So I do 表示“确实如此”，不是倒装承接。',
      'nor 后面要倒装：nor did I，不是 nor I did。',
      '前句助动词要匹配时态：did/can/have/is。',
    ],
  },
  'negative-fronting': {
    title: '否定词前置倒装',
    subtitle: 'Never, seldom, hardly, no sooner, not until 等放句首时触发部分倒装。',
    overview: '否定前置是考试高频。它不是把整句倒过来，而是把助动词提前。难点在于 no sooner/hardly/not until 的主从句分工。',
    steps: [
      '圈出否定触发词。',
      '判断倒装发生在主句还是后句。',
      '保持从句陈述语序，只倒装被触发的主句。',
    ],
    patterns: [
      {
        label: 'Not until',
        formula: 'Not until + 时间/从句 + 助动词 + 主语 + 谓语',
        explanation: 'not until 放句首时，倒装发生在主句。',
        examples: [
          { en: 'Not until I wrote it down did I understand my feelings.', cn: '直到我把它写下来，我才理解自己的感受。', note: 'I wrote it down 不倒装，did I understand 倒装。' },
        ],
      },
      {
        label: 'No sooner...than',
        formula: 'No sooner had + 主语 + done than + 一般过去时',
        explanation: '表示“一……就……”，前半句倒装。',
        examples: [
          { en: 'No sooner had she entered the room than everyone became quiet.', cn: '她一进房间，大家就安静了。', note: 'No sooner 固定接 had + 主语 + done。' },
        ],
      },
      {
        label: 'Hardly/Scarcely...when',
        formula: 'Hardly/Scarcely had + 主语 + done when + 一般过去时',
        explanation: '与 no sooner 类似，表达动作紧接发生。',
        examples: [
          { en: 'Hardly had I finished speaking when she nodded gently.', cn: '我刚说完，她就温柔地点了点头。', note: 'Hardly 触发 had I finished。' },
        ],
      },
    ],
    pitfalls: [
      'Not until 的 until 从句不倒装。',
      'No sooner 搭配 than，Hardly/Scarcely 搭配 when。',
      'No sooner/Hardly 通常与过去完成时连用。',
    ],
  },
  'only-fronting': {
    title: 'Only 前置倒装',
    subtitle: 'Only 修饰状语时，后面的主句要部分倒装。',
    overview: 'Only 倒装帮助学生表达“只有在某个条件、时间、方式下才发生”。它很适合写作中表达成长、理解和被看见。',
    steps: [
      '确认 only 后面是时间、条件、方式还是地点状语。',
      '让 only 短语保持陈述语序。',
      '倒装后面的主句。',
    ],
    patterns: [
      {
        label: 'Only when',
        formula: 'Only when + 从句 + 助动词 + 主语 + 谓语',
        explanation: '只有当某事发生时，主句才成立。',
        examples: [
          { en: 'Only when I stopped pretending did I feel seen.', cn: '只有当我停止假装时，我才感到被看见。', note: '温情主题写作可用。' },
        ],
      },
      {
        label: 'Only by',
        formula: 'Only by + doing + 助动词 + 主语 + 谓语',
        explanation: '只有通过某种方式，才会有结果。',
        examples: [
          { en: 'Only by listening patiently can we understand a teenager.', cn: '只有耐心倾听，我们才能理解一个青春期孩子。', note: 'by doing 作方式状语。' },
        ],
      },
    ],
    pitfalls: [
      'Only + 主语不倒装：Only she knew the truth.',
      'Only then/there/in this way 后面的主句倒装。',
      '不要把 only 从句内部改成疑问语序。',
    ],
  },
  'not-until-inversion': {
    title: 'Not until 倒装',
    subtitle: '直到某一刻才终于看见、理解或改变。',
    overview: 'Not until 是写成长主题时非常好用的结构：它天然表达“迟来的理解”。',
    steps: [
      '写出普通句：I did not understand until...',
      '把 Not until... 放到句首。',
      '主句改为助动词倒装：did I understand。',
    ],
    patterns: [
      {
        label: '时间短语',
        formula: 'Not until + 时间短语 + did + 主语 + do',
        explanation: '直到某个时间点才发生。',
        examples: [
          { en: 'Not until that evening did I realize he had been protecting me.', cn: '直到那天晚上，我才意识到他一直在保护我。', note: 'that evening 是时间短语。' },
        ],
      },
      {
        label: '时间从句',
        formula: 'Not until + 从句 + did + 主语 + do',
        explanation: 'until 后面的从句保持陈述语序。',
        examples: [
          { en: 'Not until my mother sat beside me did I dare to cry.', cn: '直到妈妈坐到我身边，我才敢哭出来。', note: 'my mother sat beside me 不倒装。' },
        ],
      },
    ],
    pitfalls: [
      'Not until 后的从句不倒装。',
      '主句已经有 be/情态动词时，直接提前。',
      '不要重复否定：Not until... did not... 是错的。',
    ],
  },
  'no-sooner-hardly': {
    title: 'No sooner / Hardly 倒装',
    subtitle: '表达“一……就……”，常用于叙事推进。',
    overview: '这组结构把两个动作压得很近，适合写突然理解、突然安静、突然被拥抱等叙事转折。',
    steps: [
      '前一个动作使用 had done。',
      'No sooner 用 than，Hardly/Scarcely 用 when。',
      '句首触发倒装：No sooner had 主语 done...',
    ],
    patterns: [
      {
        label: 'No sooner...than',
        formula: 'No sooner had + 主语 + done than + 主语 + did',
        explanation: '正式、书面，动作紧接发生。',
        examples: [
          { en: 'No sooner had I opened the letter than I felt less alone.', cn: '我刚打开信，就觉得自己没那么孤单了。', note: '前半倒装，后半正常语序。' },
        ],
      },
      {
        label: 'Hardly...when',
        formula: 'Hardly had + 主语 + done when + 主语 + did',
        explanation: '语气同样表示“刚……就……”。',
        examples: [
          { en: 'Hardly had he said sorry when her eyes softened.', cn: '他刚说抱歉，她的眼神就柔和了下来。', note: '适合叙事细节。' },
        ],
      },
    ],
    pitfalls: [
      'No sooner 不接 when。',
      'Hardly/Scarcely 不接 than。',
      '前半句用 had done，后半句通常用一般过去时。',
    ],
  },
  'so-such-inversion': {
    title: 'So / Such 程度倒装',
    subtitle: '把强烈程度推到句首，让情绪更集中。',
    overview: 'So/Such 倒装常用于强调温暖、孤独、惊讶、安静等程度。',
    steps: [
      '把 so + 形容词/副词 或 such + 名词短语放到句首。',
      '提前 be/助动词。',
      '后接 that 结果从句。',
    ],
    patterns: [
      {
        label: 'So + 形容词',
        formula: 'So + adj. + be + 主语 + that...',
        explanation: '强调某种状态的程度。',
        examples: [
          { en: 'So gentle was her voice that the room felt safe.', cn: '她的声音如此温柔，以至于房间都像安全了起来。', note: 'was her voice 是倒装。' },
        ],
      },
      {
        label: 'Such + 名词短语',
        formula: 'Such + 名词短语 + be + 主语 + that...',
        explanation: '强调名词短语本身。',
        examples: [
          { en: 'Such a quiet hope did he carry that nobody noticed it.', cn: '他怀着这样安静的希望，以至于没人注意到。', note: 'did he carry 是部分倒装。' },
        ],
      },
    ],
    pitfalls: [
      '普通 so...that 不倒装：Her voice was so gentle that...',
      '只有 so/such 前置才触发倒装。',
      'Such 后面通常接名词短语。',
    ],
  },
  'as-though-inversion': {
    title: 'as / though 让步倒装',
    subtitle: '把表语、状语或动词提前，表达“尽管”。',
    overview: '这种结构在高级写作中常见，能表达“虽然害怕、虽然年轻、虽然被误解，但仍然前行”。',
    steps: [
      '把形容词、名词、动词或副词放到句首。',
      '后接 as/though。',
      '主句保持正常语序。',
    ],
    patterns: [
      {
        label: '形容词前置',
        formula: 'Adj. + as/though + 主语 + be, 主句',
        explanation: '虽然处于某种状态，但主句仍成立。',
        examples: [
          { en: 'Afraid as he was, he still raised his hand.', cn: '尽管他害怕，他还是举起了手。', note: 'Afraid 前置，as 引导让步。' },
        ],
      },
      {
        label: '名词前置',
        formula: 'Noun + as/though + 主语 + be, 主句',
        explanation: '名词前置时通常不带冠词。',
        examples: [
          { en: 'Child as she was, she understood the silence.', cn: '尽管她还是个孩子，她懂得那份沉默。', note: 'Child 前不加 a。' },
        ],
      },
    ],
    pitfalls: [
      '名词前置时去掉 a/an。',
      'as/though 结构表达让步，不是方式状语从句。',
      '不要写成 Though afraid as he was。',
    ],
  },
  'if-omission-inversion': {
    title: '省略 if 的虚拟倒装',
    subtitle: 'Had / Were / Should 提前，表达更正式的假设。',
    overview: '这个结构常用于作文升格。它把 if 去掉，再把 had/were/should 放到句首。',
    steps: [
      '原句必须是虚拟条件句。',
      '删掉 if。',
      '把 had/were/should 提到主语前。',
    ],
    patterns: [
      {
        label: 'Had + 主语 + done',
        formula: 'Had + 主语 + done, 主语 + would have done',
        explanation: '与过去事实相反。',
        examples: [
          { en: 'Had I known she felt unseen, I would have listened longer.', cn: '如果我早知道她觉得没人看见她，我会听她说更久。', note: '= If I had known...' },
        ],
      },
      {
        label: 'Were + 主语 + ...',
        formula: 'Were + 主语 + 名词/形容词/to do, 主语 + would do',
        explanation: '与现在或将来事实相反。',
        examples: [
          { en: 'Were I in your place, I would speak to myself kindly.', cn: '如果我是你，我会温柔地和自己说话。', note: '= If I were in your place...' },
        ],
      },
      {
        label: 'Should + 主语 + do',
        formula: 'Should + 主语 + do, 祈使句/主句',
        explanation: '表示“万一”。',
        examples: [
          { en: 'Should you feel lost, remember that asking for help is brave.', cn: '万一你感到迷茫，请记住求助也是勇敢。', note: '= If you should feel lost...' },
        ],
      },
    ],
    pitfalls: [
      '只有 had/were/should 可以这样省略 if。',
      '不能写 Did I know... 来替代 If I knew...',
      'Had I known 后面主句通常用 would have done。',
    ],
  },
  'absolute-construction': {
    title: '独立主格全景',
    subtitle: '名词/代词 + 非谓语/形容词/副词/介词短语，独立说明背景。',
    overview: '独立主格不是完整句子，也不是从句。它有自己的逻辑主语，用来压缩时间、原因、条件、伴随或补充说明。',
    steps: [
      '找出独立主格自己的逻辑主语。',
      '判断后半部分是 doing、done、to do、形容词、副词还是介词短语。',
      '把它理解成一个被压缩的状语从句。',
    ],
    patterns: [
      {
        label: '名词 + doing',
        formula: 'Noun/Pronoun + doing, 主句',
        explanation: '主动、正在发生，常表示时间、原因或伴随。',
        examples: [
          { en: 'Her voice shaking, she told us the truth.', cn: '她声音发抖，说出了真相。', note: '= As her voice was shaking...' },
        ],
      },
      {
        label: '名词 + done',
        formula: 'Noun/Pronoun + done, 主句',
        explanation: '被动或完成。',
        examples: [
          { en: 'The misunderstanding cleared, they finally hugged.', cn: '误会解开后，他们终于拥抱了。', note: 'misunderstanding 与 clear 是被动/完成关系。' },
        ],
      },
      {
        label: '名词 + to do',
        formula: 'Noun/Pronoun + to do, 主句',
        explanation: '表示将要发生或计划中的动作。',
        examples: [
          { en: 'A difficult talk to begin, I took a deep breath.', cn: '一场艰难谈话即将开始，我深吸了一口气。', note: 'to begin 表示将要开始。' },
        ],
      },
      {
        label: '名词 + 形容词/副词/介词短语',
        formula: 'Noun/Pronoun + adj./adv./prep phrase, 主句',
        explanation: '说明状态、位置或伴随情景。',
        examples: [
          { en: 'His eyes full of worry, he waited outside the office.', cn: '他眼里满是担心，在办公室外等着。', note: 'full of worry 是状态。' },
          { en: 'School over, we walked home in silence.', cn: '放学后，我们沉默地走回家。', note: 'over 是副词，说明 school 的状态。' },
        ],
      },
      {
        label: 'with 复合结构',
        formula: 'with + 宾语 + doing/done/to do/adj./prep phrase',
        explanation: 'with 结构和独立主格逻辑接近，更口语也更常见。',
        examples: [
          { en: 'With everyone listening, he finally felt seen.', cn: '当所有人都在听时，他终于感到被看见。', note: 'everyone 与 listening 是主动关系。' },
        ],
      },
    ],
    pitfalls: [
      '独立主格不能单独成句。',
      '逻辑主语必须和主句主语不同，或至少需要独立说明。',
      'doing 表主动，done 表被动/完成，to do 表将来。',
    ],
  },
  'absolute-nominative': {
    title: '独立主格细分结构',
    subtitle: '从最小结构到作文可用结构，一次看清。',
    overview: '独立主格的学习重点不是背名字，而是判断“逻辑主语 + 状态/动作”的关系。',
    steps: [
      '用“谁/什么 + 怎么样”拆开。',
      '判断这个结构修饰整句，而不是修饰某个名词。',
      '尝试还原成 because/when/if/after/as 从句。',
    ],
    patterns: [
      {
        label: '原因',
        formula: 'Noun + doing/done, 主句',
        explanation: '相当于 because/as 引导的原因状语从句。',
        examples: [
          { en: 'No one understanding her, she wrote her feelings in a notebook.', cn: '因为没人理解她，她把感受写进笔记本。', note: '= Because no one understood her...' },
        ],
      },
      {
        label: '时间',
        formula: 'Noun + done, 主句',
        explanation: '相当于 after/when 引导的时间状语从句。',
        examples: [
          { en: 'The bell rung, the students walked out slowly.', cn: '铃声响过后，学生们慢慢走出去。', note: '= After the bell was rung...' },
        ],
      },
      {
        label: '伴随',
        formula: 'Noun + prep phrase/adj., 主句',
        explanation: '提供画面背景和人物状态。',
        examples: [
          { en: 'Her backpack on her shoulder, she stepped into the new classroom.', cn: '书包背在肩上，她走进新教室。', note: '画面式伴随。' },
        ],
      },
    ],
    pitfalls: [
      '不要把独立主格误判为定语从句。',
      '独立主格前后通常用逗号隔开。',
      '主句必须仍然完整。',
    ],
  },
  'long-sentence-visual': {
    title: '长难句模块拆分可视化',
    subtitle: '先抓主干，再拆修饰、从句、插入、非谓语、倒装与独立主格。',
    overview: '长难句不是“很长的单词堆”，而是多个模块嵌套。系统要让学生看到每一块在句子里承担什么功能。',
    steps: [
      '第一刀：找主语、谓语、宾语/表语，锁定主干。',
      '第二刀：圈连接词，拆从句。',
      '第三刀：圈逗号、破折号、括号，处理插入和补充。',
      '第四刀：找 doing/done/to do，判断非谓语关系。',
      '第五刀：识别倒装、独立主格、同位语和分隔结构。',
    ],
    patterns: [
      {
        label: '主干 + 定语从句 + 状语从句',
        formula: '主干 + relative clause + adverbial clause',
        explanation: '先读主干，再把从句当作补充模块。',
        examples: [
          {
            en: 'The boy who had always felt invisible smiled when his teacher remembered his name.',
            cn: '那个一直觉得自己不被看见的男孩，在老师记得他的名字时笑了。',
            note: '主干：The boy smiled；who 从句修饰 boy；when 从句说明时间。',
          },
        ],
      },
      {
        label: '独立主格 + 主干 + 非谓语',
        formula: 'Absolute construction, 主语 + 谓语 + 宾语 + non-finite phrase',
        explanation: '独立主格提供背景，非谓语补充动作。',
        examples: [
          {
            en: 'His hands trembling, he opened the letter, hoping someone had finally understood him.',
            cn: '他手发抖地打开那封信，希望终于有人理解了他。',
            note: 'His hands trembling 是独立主格；hoping 是伴随状语。',
          },
        ],
      },
      {
        label: '倒装 + 结果从句',
        formula: 'So + adj. + be + 主语 + that...',
        explanation: '先识别倒装，再还原普通语序。',
        examples: [
          {
            en: 'So quiet was the classroom that even his whisper sounded brave.',
            cn: '教室如此安静，以至于连他的低语都显得勇敢。',
            note: '还原：The classroom was so quiet that...',
          },
        ],
      },
    ],
    visualParts: [
      { label: '主干', text: 'The boy smiled', role: '句子的骨架，先抓住它就不会迷路。' },
      { label: '定语从句', text: 'who had always felt invisible', role: '修饰 the boy，说明他长期觉得不被看见。' },
      { label: '时间状语从句', text: 'when his teacher remembered his name', role: '说明 smiled 发生的时间。' },
      { label: '情绪线索', text: 'felt invisible / remembered his name', role: '连接青春期“渴望被看见”的内容主题。' },
    ],
    pitfalls: [
      '不要从第一个单词开始硬翻译，先找谓语。',
      '遇到逗号不要慌，先判断是插入、从句还是独立主格。',
      '长句拆完后要能还原主干，否则说明还没真正读懂。',
    ],
  },
};
