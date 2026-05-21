# 高质量例句覆盖进度追踪

## 项目目标
用有场景感、有画面感的手工例句，覆盖全部 ~48,000 条例句（排除 9a/9b 手写基线）。

## 方法论
1. 按词频从高到低提取未覆盖词
2. 每词写 2-5 个独立场景例句（英文+中文）
3. 创建 `high-quality-batch-N.cjs`
4. 运行 `apply-high-quality-all.cjs` 合并所有批次
5. `npm run build` 验证

## 已完成批次

### Batch 1 (133词, ~7,632例句)
**文件**: `scripts/high-quality-examples-batch1.cjs`
**覆盖词**: orange, tree, fish, bird, kite, juice, swim, wind, star, cook, park, run, shirt, scarf, van, dress, egg, colour, hand, go, road, sock, drink, sheep, apple, moon, sun, light, open, pig, rubber, sleep, yellow, breakfast, lamp, pencil, spoon, nose, wash, zoo, shell, plant, outside, everything, paint, smoke, this, one, up, fast, building, that, these, tell, well, snow, start, turn, can, ferry, like, dirty, fork, all, bear, fat, try, bell, car, farmer, fisherman, follow, listen, plate, smell, butterfly, cold, doctor, frog, girl, glove, green, in, room, taxi, ten, aunt, bee, belt, biscuit, bus, clean, do, eat, fold, make, meat, milk, new, slow, tall, train, uncle, very, water, winter, cat, coke, foot, long, out, square, they, brown, card, coat, dog, hot dog, nine, Shanghai, under, climb, for, leave, tiger, fireman, age, cloud, home, taste, visit, cow, hen, monkey, table, umbrella, grandfather, grandmother, goodbye, milkman, bin, beach, chick, door, duck, elephant, family, fly, full, knife, list, number, X-ray, chocolate, chopsticks, classmate, clock, glass, hot, jam, join, knee, large, lunch, night, panda, quilt, sand, soap, toothbrush, toothpaste, towel, angry, bed, coffee, cut, day, dinner, each, learn, rubbish, skip, sofa, strong, sugar, tired, collect, cool, dentist, feed, flour

### Batch 2 (111词, ~4,617例句)
**文件**: `scripts/high-quality-examples-batch2.cjs`
**覆盖词**: swing, nose, everything, smoke, building, ferry, bear, fat, try, bell, car, fisherman, follow, listen, smell, butterfly, cold, doctor, frog, girl, glove, green, room, taxi, ten, aunt, bee, belt, biscuit, bus, clean, fold, train, uncle, winter, cat, coke, foot, long, square, they, brown, card, coat, dog, hot dog, nine, Shanghai, under, climb, for, leave, tiger, fireman, age, cloud, home, taste, visit, cow, hen, monkey, table, umbrella, grandfather, grandmother, goodbye, milkman, bin, beach, chick, door, duck, elephant, family, fly, full, knife, list, number, X-ray, chocolate, chopsticks, classmate, clock, glass, hot, jam, join, knee, large, lunch, night, panda, quilt, sand, soap, toothbrush, toothpaste, towel, angry, bed, coffee, cut, day, dinner, learn, rubbish, skip, sofa, strong, sugar, tired, collect, cool, dentist, feed, flour, glue, grey, jump, little, loud, man, rise, rope, stick, thirteen, throw, wing, bring, butter, cup, different, dive, eleven, finger, fire, get, goose, grow, her, mask, mirror, move, parrot, rainbow, read, round, spring, strawberry, street, telephone, then, twelve, waiter

### Batch 3 (~99词, ~3,801例句)
**文件**: `scripts/high-quality-examples-batch3.cjs`
**覆盖词**: swing, fork, bell, glove, belt, umbrella, knife, chopsticks, glass, sand, coke, hot dog, flour, sandwich, pineapple, fisherman, milkman, grandfather, grandmother, boy, man, policeman, postman, shop assistant, family, Shanghai, fountain, pond, nest, fire, season, rainbow, temperature, warm, wet, bear, see, look, ask, save, build, close, roll, score, cross, shine, drill, act, awake, good, nice, big, small, poor, quiet, rough, sharp, super, smooth, close, fat, list, goodbye, very, water, nine, red, some, her, then, round, or, paper, picture, hair, tail, insect, today, toy, goal, television, sunglasses, lorry, mine, button, circle, computer, hay, hole, how, lion, mouse, nest, purple, question, rise, thirteen, eleven, twelve, engine, dot, color

## 统计数据
- **总计覆盖**: 343 个唯一词（去重后）
- **总计例句**: ~16,050 条
- **覆盖率**: ~30.6% 的 48,000 条例句
- **构建状态**: ✅ 通过 (28,300KB / 5,742KB gzip)

## 剩余工作估算
- **未覆盖例句**: ~32,000 条
- **预计需覆盖词数**: ~500-600 个高频词
- **预计批次数**: 5-7 批（每批 80-100 词）
- **预计总工作量**: 6-8 次会话

## 下次会话入口
每次新会话执行以下步骤即可无缝衔接：

```powershell
cd E:\xsc\app

# 1. 查看当前未覆盖的高频词排名
node scripts/uncovered-words-analysis.cjs

# 2. 写新的 batch 文件
# scripts/high-quality-batch-N.js

# 3. 更新 apply-high-quality-all.cjs 加入新 batch
# 修改 require 行添加新 batch

# 4. 应用并构建
node scripts/apply-high-quality-all.cjs
npm run build
```

## 注意事项
- 9a/9b 保留手写基线，不覆盖
- 每词至少 2 个例句（保证不同日期轮换）
- 例句必须有真实场景和画面感，禁止模板
- 所有批次文件保存在 `scripts/` 目录
- 每次应用前自动备份已在 `apply-high-quality-all.cjs` 中处理
