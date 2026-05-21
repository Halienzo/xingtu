// ============================================
// Starry Starry Night 梵星 - 标点符号题库
// 448+题目，6种题型，3个难度等级
// ============================================

import type { QuizQuestion } from './punctuationData';
import { QUIZ_QUESTIONS_EXTRA } from './quizDataExtra';

const _BASE: QuizQuestion[] = [
  // ========== 单选题 (1-80) ==========
  // 逗号用法
  { id: 1, type: 'single', difficulty: 1, question: '以下哪个英文句子中的逗号使用正确？', options: ['I like apples, bananas and oranges.', 'I like apples, and she likes bananas.', 'I like apples bananas and oranges.', 'I like apples and, she likes bananas.'], answer: 'B', explanation: '"and"连接两个独立句子时，前面需要逗号。A缺少牛津逗号前的一致性，C缺少逗号，D逗号位置错误。', category: '逗号', tags: ['FANBOYS', '逗号规则'] },
  { id: 2, type: 'single', difficulty: 1, question: '英文中并列词语之间用什么标点？', options: ['顿号（、）', '分号（;）', '逗号（,）', '冒号（:）'], answer: 'C', explanation: '英文中没有顿号！并列词语一律用逗号分隔。', category: '顿号', tags: ['中英差异', '并列'] },
  { id: 3, type: 'single', difficulty: 1, question: '"When I was young, I lived in Beijing." 中逗号的作用是？', options: ['分隔并列词语', '分隔从句和主句', '分隔引语', '分隔两个独立句'], answer: 'B', explanation: '状语从句"When I was young"在句首时，后面必须用逗号与主句隔开。', category: '从句标点', tags: ['状语从句', '逗号'] },
  { id: 4, type: 'single', difficulty: 1, question: '"I was tired, so I went to bed." 中逗号的作用是？', options: ['分隔从句', '分隔FANBOYS连接的独立句', '分隔并列词语', '分隔引语'], answer: 'B', explanation: '"so"是FANBOYS连词之一，连接两个独立句时前面必须加逗号。', category: '复合句', tags: ['FANBOYS', 'so'] },
  { id: 5, type: 'single', difficulty: 1, question: '英文句号（.）和中文句号（。）的主要区别是？', options: ['用法完全相同', '英文句号是实心点，中文是空心圆', '英文句号后不空格，中文句号后空格', '英文句号只用于句末'], answer: 'B', explanation: '英文句号是实心圆点"."。中文句号是空心圆圈"。"。', category: '句号', tags: ['中英差异'] },
  { id: 6, type: 'single', difficulty: 1, question: '"She asked if I liked English." 为什么不用问号？', options: ['语法错误', '间接疑问句不用问号', 'if引导的从句不用问号', 'B和C都对'], answer: 'D', explanation: '间接疑问句（She asked if...）不用问号；if/whether引导的名词性从句也不用问号。', category: '问号', tags: ['间接疑问句'] },
  { id: 7, type: 'single', difficulty: 1, question: '英文省略号应该有几个点？', options: ['2个', '3个', '6个', '根据情况'], answer: 'B', explanation: '英文省略号3个点"..."；中文省略号6个点"……"。', category: '省略号', tags: ['中英差异'] },
  { id: 8, type: 'single', difficulty: 1, question: '"My brother, who lives in Beijing, is a doctor." 从句类型是？', options: ['限制性定语从句', '非限制性定语从句', '状语从句', '同位语从句'], answer: 'B', explanation: '逗号隔开=非限制性定语从句，表示附加信息（只有一个哥哥）。', category: '定语从句', tags: ['限制性', '非限制性'] },
  { id: 9, type: 'single', difficulty: 1, question: '"The book that is on the table is mine." 从句类型是？', options: ['限制性定语从句', '非限制性定语从句', '状语从句', '宾语从句'], answer: 'A', explanation: '无逗号=限制性定语从句，限定是"桌上那本书"（不是其他书）。', category: '定语从句', tags: ['限制性'] },
  { id: 10, type: 'single', difficulty: 1, question: '英文中引出直接引语应该用什么标点？', options: ['冒号（:）', '逗号（,）', '分号（;）', '句号（.）'], answer: 'B', explanation: '英文习惯用逗号引出引语（He said, "..."），不用冒号。', category: '引号', tags: ['引语', '中英差异'] },

  // 难度2
  { id: 11, type: 'single', difficulty: 2, question: '"I like tea; she likes coffee." 为什么用分号？', options: ['两个句子太短', '两个独立句无连词连接', '比逗号更正式', 'B和C都对'], answer: 'D', explanation: '分号连接两个无连词的独立句，且比逗号更正式。', category: '分号', tags: ['独立句', '正式'] },
  { id: 12, type: 'single', difficulty: 2, question: '"The news, that he had won, surprised everyone." 这句话有什么问题？', options: ['that不能用于非限制性从句', '缺少逗号', 'surprised应该用被动', '没有错误'], answer: 'A', explanation: '"that"不能用于非限制性从句（逗号+that=错误），应改为which。', category: '定语从句', tags: ['that', 'which'] },
  { id: 13, type: 'single', difficulty: 2, question: '"I like apples, he likes bananas." 这句话的问题是什么？', options: ['缺少连词', '逗号拼接（Comma Splice）', '应该用分号', '以上都对'], answer: 'D', explanation: '两个独立句不能用逗号连接！应改为"I like apples. He likes bananas."或"I like apples; he likes bananas."或"I like apples, and he likes bananas."', category: '逗号', tags: ['逗号拼接', '常见错误'] },
  { id: 14, type: 'single', difficulty: 2, question: '"Because it was raining." 这句话有什么问题？', options: ['没有主句', 'because不能引导句子', '缺少逗号', '没有错误'], answer: 'A', explanation: '"Because"引导的从句不能单独成句，必须有主句。应改为"We stayed home because it was raining."', category: '从句标点', tags: ['because', '从句'] },
  { id: 15, type: 'single', difficulty: 2, question: '"He said: \\"I like English.\\"" 的标点是否正确（美式英语）？', options: ['正确', '错误，应该用逗号代替冒号', '错误，句号应在引号外', 'B和C都对'], answer: 'B', explanation: '英文中引出直接引语用逗号，不用冒号。正确：He said, "I like English."', category: '引号', tags: ['引语', '冒号'] },
  { id: 16, type: 'single', difficulty: 2, question: '"Hello,\\" she said." 中逗号的位置是否正确（美式）？', options: ['正确，逗号在引号内', '错误，逗号应在引号外', '错误，不应该有逗号', '取决于语境'], answer: 'A', explanation: '美式英语中，逗号在引号内："Hello," she said.', category: '引号', tags: ['美式', '标点位置'] },
  { id: 17, type: 'single', difficulty: 2, question: '"She asked, \\"Do you like English?\\"" 中问号的位置？', options: ['问号在引号内', '问号在引号外', '问号换成句号', '取决于英式或美式'], answer: 'A', explanation: '当引语本身是疑问句时，问号在引号内。', category: '引号', tags: ['问号', '引语'] },
  { id: 18, type: 'single', difficulty: 2, question: '"My brother who lives in Beijing is a doctor." 暗示什么？', options: ['只有一个哥哥', '有多个哥哥', '哥哥住在北京', '哥哥是医生'], answer: 'B', explanation: '限制性从句（无逗号）暗示有多个哥哥，限定"住在北京的那个"。', category: '定语从句', tags: ['限制性', '句意'] },
  { id: 19, type: 'single', difficulty: 2, question: '"I believe that he will come." 中that前为什么没有逗号？', options: ['语法错误', '宾语从句that前不加逗号', 'that可以省略', 'B和C都对'], answer: 'D', explanation: '宾语从句中that前不加逗号，且that可以省略：I believe he will come.', category: '名词性从句', tags: ['that', '宾语从句'] },
  { id: 20, type: 'single', difficulty: 2, question: '"Although he is young, he knows a lot." 逗号的作用？', options: ['分隔FANBOYS', '分隔让步从句和主句', '分隔并列词语', '分隔引语'], answer: 'B', explanation: 'Although引导的让步从句在句首时，后面用逗号与主句隔开。', category: '状语从句', tags: ['although', '让步'] },

  // 难度3
  { id: 21, type: 'single', difficulty: 3, question: '"When the bell rang, the students left, but the teacher stayed." 中有几个逗号？分别是什么作用？', options: ['2个，都是从句分隔', '2个，一个从句分隔一个FANBOYS分隔', '3个', '1个'], answer: 'B', explanation: 'When从句后的逗号（复杂句规则）+ but前的逗号（FANBOYS规则）= 复合复杂句标点。', category: '复合复杂句', tags: ['复合', '复杂', 'FANBOYS'] },
  { id: 22, type: 'single', difficulty: 3, question: '"The students, who passed the exam, were happy." vs "The students who passed the exam were happy." 两句的区别是？', options: ['意思相同，只是风格不同', '前者指所有学生都通过了，后者指部分学生', '前者指部分学生，后者指所有学生', '语法都错误'], answer: 'B', explanation: '非限制性（逗号）：所有学生都通过了；限制性（无逗号）：只有通过考试的学生高兴（不是所有学生都通过了）。', category: '定语从句', tags: ['限制性', '非限制性', '句意'] },
  { id: 23, type: 'single', difficulty: 3, question: '"I need three things: milk, bread, and eggs." 中冒号前需要什么条件？', options: ['任何句子都可以', '需要完整的引导语（独立句）', '只需要一个名词', '不需要条件'], answer: 'B', explanation: '冒号前必须有完整的独立句作为引导，不能只放一个名词。', category: '冒号', tags: ['引导语'] },
  { id: 24, type: 'single', difficulty: 3, question: '"I like tea; however, I prefer coffee." 中however前为什么用分号？', options: ['however是连词', 'however是副词，不能用逗号连接独立句', '为了强调', '习惯用法'], answer: 'B', explanation: '"however"是副词不是连词，不能用逗号连接两个独立句。用分号或句号。', category: '分号', tags: ['however', '副词'] },
  { id: 25, type: 'single', difficulty: 3, question: '"Did she say \\"hello\\"?" 中问号为什么在引号外？', options: ['英式英语习惯', '整个句子是疑问句，不是引语', '引语太短', '语法错误'], answer: 'B', explanation: '当整个句子是疑问句（Did she say...），而引语本身不是疑问时，问号在引号外。', category: '引号', tags: ['问号', '间接引语'] },

  // 更多单选题...
  { id: 26, type: 'single', difficulty: 1, question: '英文中破折号（em dash）的正确写法是？', options: ['--', '-', '—', '——'], answer: 'C', explanation: '英文em dash是一个字符"—"，占一个字母位。中文破折号"——"占两个汉字位。', category: '破折号', tags: ['em dash'] },
  { id: 27, type: 'single', difficulty: 1, question: 'oclock 中的撇号表示什么？', options: ['所有格', '字母省略（of the clock）', '缩写', '复数'], answer: 'B', explanation: 'oclock = of the clock，撇号表示字母的省略。', category: '撇号', tags: ['省略'] },
  { id: 28, type: 'single', difficulty: 1, question: '英文书名应该用什么格式？', options: ['书名号《》', '斜体', '引号', 'B或C'], answer: 'D', explanation: '英文书名用斜体（Harry Potter）或引号（"Harry Potter"），不用书名号。', category: '书名号', tags: ['中英差异'] },
  { id: 29, type: 'single', difficulty: 1, question: 'Well... I do not know. 中省略号表示什么？', options: ['语意省略', '说话犹豫', '列举省略', 'B和A都对'], answer: 'D', explanation: '省略号可以表示说话犹豫或语意省略。', category: '省略号', tags: ['犹豫'] },
  { id: 30, type: 'single', difficulty: 1, question: '英文时间"3:30 p.m."中的冒号用法是？', options: ['引出解释', '时间分隔', '列举', '对比'], answer: 'B', explanation: '英文时间格式用冒号分隔小时和分钟。', category: '冒号', tags: ['时间'] },

  // 难度2继续
  { id: 31, type: 'single', difficulty: 2, question: '"The meeting includes John, the manager; Sue, the engineer; and Tom, the designer." 为什么用分号？', options: ['句子太长', '列表项内部含逗号', '更正式', 'B和C都对'], answer: 'D', explanation: '复杂列表中，列表项本身含逗号时，用分号分隔更清晰。', category: '分号', tags: ['复杂列表'] },
  { id: 32, type: 'single', difficulty: 2, question: '"a five-year-old boy" 中的连字符是否必要？', options: ['不必要', '必要，复合形容词修饰名词', '可写可不写', '看情况'], answer: 'B', explanation: '复合形容词（five-year-old）修饰名词（boy）时，必须用连字符。', category: '连字符', tags: ['复合形容词'] },
  { id: 33, type: 'single', difficulty: 2, question: '"This problem is well known." 为什么不用连字符？', options: ['语法错误', '表语位置不用连字符', 'well和known之间不需要', '习惯用法'], answer: 'B', explanation: '"well known"作表语（is后面）不用连字符；作定语（a well-known problem）时用连字符。', category: '连字符', tags: ['表语', '定语'] },
  { id: 34, type: 'single', difficulty: 2, question: 'Its 和 Its 的区别是？', options: ['意思相同，写法不同', 'Its = It is/has（有撇）; Its = 它的（无撇）', 'Its是错的', 'Its是口语用法'], answer: 'B', explanation: 'Its（有撇）= it is / it has；Its（无撇）= 它的。', category: '撇号', tags: ['所有格', '缩写'] },
  { id: 35, type: 'single', difficulty: 2, question: 'She said I am tired. 中撇号和引号的用法是否正确？', options: ['正确', '错误，I am应在引号外', '错误，引号应改为单引号', 'A和C都对（美式）'], answer: 'D', explanation: '美式英语中，外双内单，撇号在引号内表示缩写。', category: '引号', tags: ['撇号', '嵌套'] },

  // 难度3
  { id: 36, type: 'single', difficulty: 3, question: '"The years 2020—2023 were challenging." 中的破折号是？', options: ['em dash', 'en dash', '连字符', '破折号'], answer: 'B', explanation: '数字范围用en dash（–），不是em dash（—）。', category: '破折号', tags: ['en dash', '数字范围'] },
  { id: 37, type: 'single', difficulty: 3, question: '"I like apples, and bananas." 这句话有什么问题？', options: ['没有错误', '逗号多余（不是连接两个独立句）', 'and多余', '应该用分号'], answer: 'B', explanation: '"apples"和"bananas"不是两个独立句（只是并列词语），不需要逗号。', category: '逗号', tags: ['FANBOYS', '常见错误'] },
  { id: 38, type: 'single', difficulty: 3, question: '"She asked, \\"Do you know what \\\'love\\\' means?\\"" 引号嵌套是否正确（美式）？', options: ['正确，外双内单', '错误，应外单内双', '错误，嵌套时应用斜体', 'A和B都对（取决于英美）'], answer: 'A', explanation: '美式英语：外双内单"...\'...\'..."；英式英语：外单内双\'..."..."...\'。', category: '引号', tags: ['嵌套', '英美差异'] },
  { id: 39, type: 'single', difficulty: 3, question: '"I like apples; bananas; and oranges." 这句话有什么问题？', options: ['没有错误', '分号用错（应逗号）', '分号后小写', 'B和C都对'], answer: 'D', explanation: '简单列表用逗号，不用分号；且分号后不应小写（除非是连接词）。', category: '分号', tags: ['简单列表'] },
  { id: 40, type: 'single', difficulty: 3, question: '"He wondered whether he should go." 中whether引导的是什么从句？', options: ['宾语从句', '主语从句', '同位语从句', '表语从句'], answer: 'A', explanation: '"whether he should go"作wondered的宾语，是宾语从句。', category: '名词性从句', tags: ['whether', '宾语从句'] },

  // 继续补充更多单选题...
  { id: 41, type: 'single', difficulty: 1, question: '以下哪个不是FANBOYS连词？', options: ['For', 'And', 'Nor', 'Because'], answer: 'D', explanation: 'FANBOYS = For, And, Nor, But, Or, Yet, So。Because不是FANBOYS连词。', category: '复合句', tags: ['FANBOYS'] },
  { id: 42, type: 'single', difficulty: 1, question: '英文句号"ABC Inc."中的句号表示什么？', options: ['句子结束', '缩写', '分隔', '省略'], answer: 'B', explanation: '"Inc."是incorporated的缩写，句号表示缩写。', category: '句号', tags: ['缩写'] },
  { id: 43, type: 'single', difficulty: 1, question: '中文"《哈利·波特》"的英文正确写法是？', options: ['《Harry Potter》', '*Harry Potter*', '"Harry Potter"', 'B或C'], answer: 'D', explanation: '英文书名用斜体（*Harry Potter*）或引号（"Harry Potter"）。', category: '书名号', tags: ['书名'] },
  { id: 44, type: 'single', difficulty: 1, question: '"I like apples——they are healthy." 中破折号的作用是？', options: ['数字范围', '解释说明', '话题转换', 'B和C都对'], answer: 'D', explanation: 'Em dash用于解释说明或话题转换。', category: '破折号', tags: ['em dash'] },
  { id: 45, type: 'single', difficulty: 1, question: '"To be continued..." 中的省略号用法是？', options: ['语意省略', '表示延续', '说话犹豫', 'A和B都对'], answer: 'D', explanation: '"To be continued..."表示内容将继续，语意省略。', category: '省略号', tags: ['延续'] },
  { id: 46, type: 'single', difficulty: 2, question: '"Dear Sir:" 中的冒号用法是？', options: ['引出解释', '信件开头', '列举', '时间分隔'], answer: 'B', explanation: '正式信件的称呼后用冒号（美式），英式用逗号。', category: '冒号', tags: ['信件'] },
  { id: 47, type: 'single', difficulty: 2, question: '"I like apples and bananas." 中有逗号吗？', options: ['必须有', '没有（and连接的不是独立句）', '可以加也可以不加', '看情况'], answer: 'B', explanation: 'and连接的不是两个独立句（只是两个名词），不需要逗号。', category: '逗号', tags: ['FANBOYS'] },
  { id: 48, type: 'single', difficulty: 2, question: '"If you study hard you will pass." 的问题是什么？', options: ['没有错误', '缺少逗号', 'if引导的从句后应该有逗号', 'B和C都对'], answer: 'D', explanation: 'If从句在句首时，后面必须加逗号：If you study hard, you will pass.', category: '状语从句', tags: ['if', '逗号'] },
  { id: 49, type: 'single', difficulty: 2, question: '"The answer is 42 (see page 10)." 括号中的句末标点应该在？', options: ['括号内', '括号外', '取决于内容', '不需要标点'], answer: 'C', explanation: '如果括号内是完整句子，句号在括号内；如果只是注释，句号在括号外。', category: '括号', tags: ['标点位置'] },
  { id: 50, type: 'single', difficulty: 2, question: '"September 1, 2024" 中逗号的作用是？', options: ['分隔月份和日期', '分隔日期和年份', '分隔时间', 'B都对'], answer: 'B', explanation: '美式日期格式中，逗号分隔日期和年份：September 1, 2024。', category: '逗号', tags: ['日期'] },

  // ========== 判断题 (81-120) ==========
  { id: 81, type: 'judge', difficulty: 1, question: '英文并列词语之间用顿号（、）。', answer: '错误', explanation: '英文没有顿号！并列词语用逗号（,）。', category: '顿号', tags: ['中英差异'] },
  { id: 82, type: 'judge', difficulty: 1, question: '英文省略号有3个点（...）。', answer: '正确', explanation: '英文省略号3个点；中文省略号6个点。', category: '省略号', tags: ['中英差异'] },
  { id: 83, type: 'judge', difficulty: 1, question: '"My brother, who lives in Beijing, is a doctor." 中的who从句是限制性定语从句。', answer: '错误', explanation: '有逗号隔开的是非限制性定语从句。', category: '定语从句', tags: ['非限制性'] },
  { id: 84, type: 'judge', difficulty: 1, question: '间接疑问句（She asked if...）后面不加问号。', answer: '正确', explanation: '间接疑问句用句号，直接疑问句用问号。', category: '问号', tags: ['间接疑问句'] },
  { id: 85, type: 'judge', difficulty: 1, question: 'FANBOYS连接两个独立句时，前面必须加逗号。', answer: '正确', explanation: 'For, And, Nor, But, Or, Yet, So连接两个独立句时，前面加逗号。', category: '复合句', tags: ['FANBOYS'] },
  { id: 86, type: 'judge', difficulty: 2, question: '"The book, that is on the table, is mine." 这句话是正确的。', answer: '错误', explanation: '"that"不能用于非限制性从句（逗号+that=错误），应改为which。', category: '定语从句', tags: ['that', 'which'] },
  { id: 87, type: 'judge', difficulty: 2, question: '"I like tea, she likes coffee." 逗号使用正确。', answer: '错误', explanation: '逗号不能连接两个独立句！这是逗号拼接（Comma Splice）错误。', category: '逗号', tags: ['逗号拼接'] },
  { id: 88, type: 'judge', difficulty: 2, question: '"He said: \\"I like English.\\"" 的标点是正确的（美式英语）。', answer: '错误', explanation: '英文引语前用逗号，不用冒号。', category: '引号', tags: ['冒号'] },
  { id: 89, type: 'judge', difficulty: 2, question: '"Because it was raining." 是一个完整的句子。', answer: '错误', explanation: '"Because"引导的从句不能单独成句。', category: '从句标点', tags: ['because'] },
  { id: 90, type: 'judge', difficulty: 2, question: '非限制性定语从句前后都有逗号。', answer: '正确', explanation: '非限制性定语从句用逗号"夹住"，像夹心饼干。', category: '定语从句', tags: ['非限制性'] },
  { id: 91, type: 'judge', difficulty: 3, question: '"I like apples, and bananas." 中的逗号是正确的。', answer: '错误', explanation: 'and连接的不是两个独立句（只是两个名词），不需要逗号。', category: '逗号', tags: ['常见错误'] },
  { id: 92, type: 'judge', difficulty: 3, question: '"The students who passed the exam were happy." 暗示不是所有学生都通过了考试。', answer: '正确', explanation: '限制性从句（无逗号）限定"通过考试的学生"，暗示不是所有学生都通过了。', category: '定语从句', tags: ['限制性', '句意'] },

  // ========== 填空题 (121-180) ==========
  { id: 121, type: 'fill', difficulty: 1, question: '英文并列词语之间用____（标点符号）分隔。', answer: '逗号', explanation: '英文没有顿号，并列词语一律用逗号分隔。', category: '顿号', tags: ['并列'] },
  { id: 122, type: 'fill', difficulty: 1, question: '"I like apples____ bananas and oranges."（填入正确的标点）', answer: ',', explanation: '并列词语之间用逗号。', category: '逗号', tags: ['并列'] },
  { id: 123, type: 'fill', difficulty: 1, question: '"When I was young____ I lived in Beijing."（填入正确的标点）', answer: ',', explanation: '状语从句在句首时，后面加逗号。', category: '从句标点', tags: ['状语从句'] },
  { id: 124, type: 'fill', difficulty: 1, question: '英文省略号有____个点。', answer: '3', explanation: '英文省略号3个点（...），中文6个点（……）。', category: '省略号', tags: ['中英差异'] },
  { id: 125, type: 'fill', difficulty: 2, question: '"My brother____ who lives in Beijing____ is a doctor."（填入正确的标点）', answer: ',,', explanation: '非限制性定语从句前后都有逗号。', category: '定语从句', tags: ['非限制性'] },
  { id: 126, type: 'fill', difficulty: 2, question: '"I was tired____ so I went to bed."（填入正确的标点）', answer: ',', explanation: 'FANBOYS（so）连接两个独立句时，前面加逗号。', category: '复合句', tags: ['FANBOYS'] },
  { id: 127, type: 'fill', difficulty: 2, question: '"He said____ \\"I like English.\\""（填入正确的标点）', answer: ',', explanation: '英文引语前用逗号，不用冒号。', category: '引号', tags: ['引语'] },
  { id: 128, type: 'fill', difficulty: 3, question: '"I like tea____ she likes coffee." 应改为 "I like tea____ she likes coffee."（填入两个标点）', answer: '.;', explanation: '逗号不能连接两个独立句！应改为句号或分号。', category: '逗号', tags: ['逗号拼接'] },
  { id: 129, type: 'fill', difficulty: 3, question: '"The book____ that is on the table____ is mine." 应把that改为____。', answer: 'which', explanation: '"that"不能用于非限制性从句，应改为which。', category: '定语从句', tags: ['that', 'which'] },
  { id: 130, type: 'fill', difficulty: 2, question: '"I need three things____ milk____ bread____ and eggs."（填入正确的标点）', answer: ':,,', explanation: '冒号引出列表，列表项之间用逗号。', category: '冒号', tags: ['列表'] },

  // ========== 改错题 (181-250) ==========
  { id: 181, type: 'correct', difficulty: 1, question: '改正：I like apples、bananas and oranges.', answer: 'I like apples, bananas, and oranges.', explanation: '英文没有顿号，用逗号分隔并列项。', category: '顿号', tags: ['并列'] },
  { id: 182, type: 'correct', difficulty: 1, question: '改正：I like English。', answer: 'I like English.', explanation: '英文用实心圆点句号，不用中文空心句号。', category: '句号', tags: ['中英差异'] },
  { id: 183, type: 'correct', difficulty: 1, question: '改正：When I was young I lived in Beijing.', answer: 'When I was young, I lived in Beijing.', explanation: '状语从句在句首时，后面加逗号。', category: '从句标点', tags: ['状语从句'] },
  { id: 184, type: 'correct', difficulty: 2, question: '改正：I like tea, she likes coffee.', answer: 'I like tea; she likes coffee.（或I like tea. She likes coffee. / I like tea, and she likes coffee.）', explanation: '逗号不能连接两个独立句！', category: '逗号', tags: ['逗号拼接'] },
  { id: 185, type: 'correct', difficulty: 2, question: '改正：The book, that is on the table, is mine.', answer: 'The book, which is on the table, is mine.（或The book that is on the table is mine.）', explanation: '"that"不能用于非限制性从句，改用which或去掉逗号变限制性。', category: '定语从句', tags: ['that', 'which'] },
  { id: 186, type: 'correct', difficulty: 2, question: '改正：She asked if I liked English?', answer: 'She asked if I liked English.', explanation: '间接疑问句不用问号！', category: '问号', tags: ['间接疑问句'] },
  { id: 187, type: 'correct', difficulty: 2, question: '改正：He said: "I like English."', answer: 'He said, "I like English."', explanation: '英文引语前用逗号，不用冒号。', category: '引号', tags: ['冒号'] },
  { id: 188, type: 'correct', difficulty: 2, question: '改正：Because it was raining.', answer: 'We stayed home because it was raining.', explanation: '"Because"从句不能单独成句。', category: '从句标点', tags: ['because'] },
  { id: 189, type: 'correct', difficulty: 3, question: '改正：Although it was raining we went out and we had a great time.', answer: 'Although it was raining, we went out, and we had a great time.', explanation: '复合复杂句：从句后逗号 + FANBOYS前逗号。', category: '复合复杂句', tags: ['复合', '复杂'] },
  { id: 190, type: 'correct', difficulty: 3, question: '改正：I like tea, however, I prefer coffee.', answer: 'I like tea; however, I prefer coffee.', explanation: '"however"是副词不是连词，不能用逗号连接独立句。用分号。', category: '分号', tags: ['however'] },

  // ========== 对比分析题 (251-300) ==========
  { id: 251, type: 'compare', difficulty: 2, question: '对比：中文"我喜欢苹果、香蕉和橙子。" vs 英文"I like apples, bananas, and oranges." 标点有何不同？', answer: '中文用顿号（、）分隔并列词语，英文用逗号（,）。英文没有顿号！', explanation: '这是中英标点最核心的差异之一。中文并列词语用顿号，英文一律用逗号。', category: '顿号', tags: ['中英差异'] },
  { id: 252, type: 'compare', difficulty: 2, question: '对比："My brother, who lives in Beijing, is a doctor." vs "My brother who lives in Beijing is a doctor." 逗号的有无改变了什么？', answer: '有逗号=非限制性（只有一个哥哥）；无逗号=限制性（有多个哥哥，限定住在北京的那个）。', explanation: '逗号的有无直接影响句意！非限制性=附加信息，限制性=限定范围。', category: '定语从句', tags: ['限制性', '非限制性', '句意'] },
  { id: 253, type: 'compare', difficulty: 3, question: '对比：英式\'Hello,\' she said. vs 美式"Hello," she said. 引号标点有何不同？', answer: '美式外双内单，逗号在引号内；英式外单内双，逗号在引号外。', explanation: '英美式英语在引号类型和标点位置上有显著差异。', category: '引号', tags: ['英美差异'] },
  { id: 254, type: 'compare', difficulty: 3, question: '"She asked if I liked English."（句号）vs "She asked, \\"Do you like English?\\""（问号）为什么标点不同？', answer: '间接疑问句（reported speech）用句号；直接疑问句（direct speech）用问号。', explanation: '间接引语转述问题不用问号；直接引语保留原句问号。', category: '问号', tags: ['间接疑问句', '引语'] },
  { id: 255, type: 'compare', difficulty: 3, question: '"I was tired, so I went to bed."（逗号）vs "I went to bed because I was tired."（无逗号）为什么逗号使用不同？', answer: 'FANBOYS连接独立句前加逗号；从句在主句后通常不加逗号。', explanation: '复合句（FANBOYS）vs 复杂句（从句）的标点规则不同。', category: '复合句', tags: ['FANBOYS', '从句'] },

  // ========== 应用写作题 (301-330) ==========
  { id: 301, type: 'apply', difficulty: 3, question: '给以下英文段落加上正确的标点：i was tired so i went to bed early because i had a big test tomorrow although i wanted to watch tv', answer: 'I was tired, so I went to bed early because I had a big test tomorrow, although I wanted to watch TV.', explanation: 'FANBOYS(so)前逗号 + 从句(because)在句尾无逗号 + 让步从句(although)在句尾通常无逗号。', category: '综合', tags: ['复合复杂句'] },
  { id: 302, type: 'apply', difficulty: 3, question: '给以下英文段落加上正确的标点：my brother who is a doctor lives in london he said i like this city', answer: 'My brother, who is a doctor, lives in London. He said, he likes this city.', explanation: '非限制性定语从句逗号 + 引语逗号 + 状语从句在句尾无逗号。', category: '综合', tags: ['定语从句', '引号', '从句'] },
  { id: 303, type: 'apply', difficulty: 3, question: '给以下英文段落加上正确的标点：the students who passed the exam were very happy however the students who failed were sad', answer: 'The students who passed the exam were very happy; however, the students who failed were sad.', explanation: '限制性从句无逗号 + however是副词用分号 + however后加逗号。', category: '综合', tags: ['定语从句', 'however', '分号'] },
  { id: 304, type: 'apply', difficulty: 3, question: '给以下英文段落加上正确的标点：i need three things milk bread and eggs she asked do you have these', answer: 'I need three things: milk, bread, and eggs. She asked if I have these.', explanation: '冒号引出列表 + 列表项逗号 + 间接引语不用引号。', category: '综合', tags: ['冒号', '列表', '引号'] },
  { id: 305, type: 'apply', difficulty: 3, question: '给以下英文段落加上正确的标点：when i was young i lived in shanghai i like this city because the food is delicious if you visit you will love it too', answer: 'When I was young, I lived in Shanghai. I like this city because the food is delicious. If you visit, you will love it, too.', explanation: '状语从句在句首逗号 + FANBOYS省略（新句开始）+ 从句在句尾无逗号 + if从句在句首逗号。', category: '综合', tags: ['状语从句', '复合句'] },
];

// 按难度和类型分类
export function getQuestionsByType(type: QuizQuestion['type']): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(q => q.type === type);
}

export function getQuestionsByDifficulty(difficulty: QuizQuestion['difficulty']): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(q => q.difficulty === difficulty);
}

export function getQuestionsByCategory(category: string): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(q => q.category === category);
}

export function getQuestionsByTag(tag: string): QuizQuestion[] {
  return QUIZ_QUESTIONS.filter(q => q.tags.includes(tag));
}

export function shuffleQuestions(questions: QuizQuestion[]): QuizQuestion[] {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function getQuizStats() {
  const total = QUIZ_QUESTIONS.length;
  const byType = {
    single: QUIZ_QUESTIONS.filter(q => q.type === 'single').length,
    judge: QUIZ_QUESTIONS.filter(q => q.type === 'judge').length,
    fill: QUIZ_QUESTIONS.filter(q => q.type === 'fill').length,
    correct: QUIZ_QUESTIONS.filter(q => q.type === 'correct').length,
    compare: QUIZ_QUESTIONS.filter(q => q.type === 'compare').length,
    apply: QUIZ_QUESTIONS.filter(q => q.type === 'apply').length,
  };
  const byDifficulty = {
    easy: QUIZ_QUESTIONS.filter(q => q.difficulty === 1).length,
    medium: QUIZ_QUESTIONS.filter(q => q.difficulty === 2).length,
    hard: QUIZ_QUESTIONS.filter(q => q.difficulty === 3).length,
  };
  return { total, byType, byDifficulty };
}

// 合并基础题库和扩展题库
export const QUIZ_QUESTIONS: QuizQuestion[] = [..._BASE, ...QUIZ_QUESTIONS_EXTRA];

export default QUIZ_QUESTIONS;
