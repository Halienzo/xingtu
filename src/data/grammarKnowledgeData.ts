export interface SearchNavigationTarget {
  section: 'knowledge' | 'vocabulary' | 'practice' | 'pos';
  tab?: 'grammar' | 'punctuation' | 'verbaspect' | 'relative';
  semKey?: string;
  day?: number;
  category?: string;
  questionId?: number;
  word?: string;
  label: string;
}

export interface GrammarKnowledgeCard {
  id: string;
  kind: string;
  title: string;
  subtitle: string;
  details: string[];
  tags: string[];
  aliases?: string[];
  footer: string;
  target: SearchNavigationTarget;
}

export const grammarKnowledgeCards: GrammarKnowledgeCard[] = [
  {
    id: 'grammar:participles',
    kind: '语法知识点',
    title: '进行态形式 / 完成态形式',
    subtitle: '儿童化理解：doing 表示动作正在发生，done 表示动作完成或被动关系。',
    details: [
      '进行态形式：常见形式是 doing，可表达正在进行、主动、伴随动作。',
      '完成态形式：常见形式是 done，可表达完成、被动、状态。',
      '严格语法上它们不是“时态”，而是非谓语动词形式；系统用儿童化标签帮助先建立动作逻辑。',
    ],
    tags: ['进行态形式', '完成态形式', 'doing', 'done', '非谓语动词', '进行态', '完成态'],
    aliases: ['现在分词', '过去分词', 'present participle', 'past participle'],
    footer: '知识库 · 非谓语动词',
    target: { section: 'knowledge', tab: 'grammar', label: '进入语法体系' },
  },
  {
    id: 'grammar:passive',
    kind: '语法知识点',
    title: '被动语态',
    subtitle: 'be + 完成态形式(done)：主语是动作的承受者。',
    details: [
      '核心结构：be 动词随着时态变化，后面的 done 表示动作落在主语身上。',
      '例：The window was broken. 窗户被打破了。',
      '判断方法：先问“谁做动作”，再问“主语是不是被动作影响”。',
    ],
    tags: ['被动', '语态', 'be done', '完成态形式'],
    aliases: ['过去分词', 'past participle'],
    footer: '知识库 · 语态',
    target: { section: 'knowledge', tab: 'verbaspect', label: '进入时态语态' },
  },
  {
    id: 'grammar:clauses',
    kind: '语法知识点',
    title: '从句系统',
    subtitle: '一个句子放进另一个句子里，承担名词、形容词或副词作用。',
    details: [
      '名词性从句：相当于一个名词，可作主语、宾语、表语或同位语。',
      '定语从句：修饰名词，常见关系词有 that, which, who, whose。',
      '状语从句：说明时间、原因、条件、让步、目的、结果、比较、方式、地点等关系。',
      '系统已扩展：主语从句、宾语从句、表语从句、同位语从句、限制/非限制定语从句、介词+关系代词、关系副词、九类状语从句。',
    ],
    tags: ['从句', '从句系统', '定语从句', '名词性从句', '状语从句', '主语从句', '宾语从句', '表语从句', '同位语从句', '限制性定语从句', '非限制性定语从句', '时间状语从句', '原因状语从句', '条件状语从句', '让步状语从句', '目的状语从句', '结果状语从句', '比较状语从句', '方式状语从句', '地点状语从句', 'that', 'which'],
    footer: '知识库 · 从句',
    target: { section: 'knowledge', tab: 'relative', label: '进入从句系统' },
  },
];
