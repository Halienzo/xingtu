# 🔄 对接指令 - 高质量例句项目（按词性分组版）

## ✅ 当前会话完成的工作
1. ✅ 设计了新的 apply-by-pos 脚本，支持按词性精确匹配
2. ✅ batch 3 已全面按词性分组重写（92词）
3. ✅ **batch 4 已创建**，覆盖 30 个最高频多词性词（orange, fish, wind, cook, run, ride, dress, hand, go, drink, sun, light, sleep, yellow, plant, paint, smoke, turn, can, like, nurse, taxi, taste, fly, spring, rain 等）
4. ✅ 构建通过 (28,303KB / 5,787KB gzip)

## 📊 当前统计数据
- 4 个 batch 已加载（1, 2, 3, 4）
- 335 个唯一词
- 15,759 条例句已应用
- **POS-matched: 2,956**（按词性精确匹配）

## 🎯 下次会话核心任务
**继续创建 batch 5+，覆盖剩余多词性词**

### 仍需要修复的多词性词（约 68 个）

**高优先级（例句数 > 40）：**
```
present(n/adj), one(n/pron/num), up(n/adv/prep), that(pron/conj/adj), 
tell(v/n), well(int/n/adv), snow(n/v/adj), all(pron/adj), cold(adj/n), 
green(adj/n), in(n/prep/art), clean(adv/adj/n/verb), fold(v/n), make(n/v), 
milk(n/v), slow(adj/v/adv), train(n/v/adj), out(adj/adv), square(adj/n), 
brown(adj/n), nine(num/n), under(prep/adv), climb(v/n), for(prep/conj), 
age(n/v), cloud(n/adj), home(adv/n), visit(n/v), jam(n/v), join(n/v), 
angry(adj/n), cut(v/n), each(pron/adj), learn(n/v), strong(adj/n/v), 
sugar(n/adj), collect(v/n), glue(n/v), grey(adj/n), jump(n/v), little(n/adj), 
stick(v/n), throw(v/n), different(adj/n), dive(v/n), mask(n/v), move(v/n), 
telephone(n/v), brave(adj/v), everywhere(adv/pron/conj), key(adj/n), 
over(prep/v/adv), radio(n/v), rich(adj/v/n), same(adj/n), shower(n/v), 
snake(n/v), summer(adj/n), top(n/adj)
```

## 📋 数据结构格式

**旧格式（单性词保留）：**
```js
'apple': [
  {en: '...', cn: '...'}
]
```

**新格式（多性词必须改为）：**
```js
'water': {
  noun: [
    {en: 'Crystal clear water flowed down from the spring.', cn: '...'},
  ],
  verb: [
    {en: 'Please water the plants every morning.', cn: '请每天早上给植物浇水。'}
  ]
}
```

## 🚀 下次会话启动步骤

**在新窗口发送：**
> "继续修复按词性分组。创建 batch 5 覆盖剩余多词性词：present, one, up, that, tell, well, snow, all, cold, green, in, clean, fold, make, milk, slow, train, out, square, brown, nine, under, climb, for, age, cloud, home, visit, jam, join, angry, cut, each, learn, strong, sugar, collect, glue, grey, jump, little, stick, throw, different, dive, mask, move, telephone, brave, everywhere, key, over, radio, rich, same, shower, snake, summer, top。"

**运行检查：**
```powershell
cd E:\xsc\app
node scripts/apply-high-quality-by-pos.cjs
npm run build
```

## 📁 关键文件
- `scripts/apply-high-quality-by-pos.cjs` — ✅ 按词性匹配的合并脚本
- `scripts/high-quality-examples-batch1.cjs` — 旧格式，被 batch 4/5 覆盖
- `scripts/high-quality-examples-batch2.cjs` — 旧格式，被 batch 4/5 覆盖
- `scripts/high-quality-examples-batch3.cjs` — ✅ 已完成
- `scripts/high-quality-examples-batch4.cjs` — ✅ 已完成（30词）
- `scripts/high-quality-examples-batch5.cjs` — 待创建
