# Syllable And Example Audit

Generated: 2026-05-21T01:02:52.669Z

## Batch 1 Policy

- Batch 1 uses phonetic syllable counts first, then high-confidence dictionary corrections, then written-form heuristics.
- Rows whose written parts still disagree with phonetic counts or produce one-letter vowel fragments are kept in the review list.
- Generated calendarData.json is rebuilt from source candidates; direct hand edits to generated JSON are avoided.
- Batch 1 replaces generic examples with Yunnan writing-topic contexts.
- High-frequency words use natural topic sentences when safe.
- Uncertain words use quoted meta examples so the sentence remains grammatically safe while still tied to writing topics.

## Yunnan Writing Topic Bank

| Topic | Chinese scope | English scope |
| --- | --- | --- |
| nature | 接近自然、研学旅行、劳动实践、保护环境 | getting close to nature |
| housework | 做家务、家庭责任、亲情陪伴 | doing housework and family responsibility |
| school | 校园生活、英语俱乐部、班级活动、毕业回忆 | school life and class activities |
| volunteer | 志愿服务、帮助他人、城市公园清洁 | volunteering and helping others |
| health | 运动健康、坚持锻炼、积极生活 | health, sports and active living |
| culture | 传统文化、节日、家乡云南与中国故事 | traditional culture and hometown Yunnan |
| future | 梦想、职业、未来计划 | dreams and future plans |
| safety | 安全、网络使用、规则意识 | safety, rules and online learning |

## Syllable Stats

- Total generated word records: 11595
- Dictionary corrections: 488
- Acronym/letter-name splits: 23
- Phrase splits: 3832
- Phonetic single-syllable locks: 3081
- Phonetic-guided heuristic splits: 4057
- Written fallback splits: 114
- Needs manual review: 225

## Example Stats

- Total generated examples: 21136
- Natural overrides: 130
- Topic templates: 15487
- Safe meta templates: 5519

## Review Samples

| Word | Phonetic | Parts | Reasons |
| --- | --- | --- | --- |
| sour | [ˈsauə] | sour | phonetic-count-2-vs-parts-1 |
| fire | [ˈfaiə] | fire | phonetic-count-2-vs-parts-1 |
| flour | [ˈflauə] | flour | phonetic-count-2-vs-parts-1 |
| hour | [ˈauə] | hour | phonetic-count-2-vs-parts-1 |
| choir | [ˈkwaiə] | choir | phonetic-count-2-vs-parts-1 |
| saying | /ˈseɪɪŋ/ | saying | phonetic-count-2-vs-parts-1 |
| relaxing |  | rel·ax·ing | no-phonetic-written-fallback |
| Mr | [ˈmɪstə(r)] | Mr | phonetic-count-2-vs-parts-1 |
| our | [ˈaʊə(r)] | our | phonetic-count-2-vs-parts-1 |
| moving |  | mov·ing | no-phonetic-written-fallback |
| tiring | /ˈtaɪərɪŋ/ | tiring | phonetic-count-3-vs-parts-1 |
| help | /yourself/ | help | phonetic-count-2-vs-parts-1 |
| Dr | /ˈdɒktə(r)/ | Dr | phonetic-count-2-vs-parts-1 |
| maybe | /ˈmeɪbi/ | maybe | phonetic-count-2-vs-parts-1 |
| ours | /aʊəz/ | ours | phonetic-count-2-vs-parts-1 |
| tiring | /ˈtaɪərɪŋ/ | tiring | phonetic-count-3-vs-parts-1 |
| diary | /ˈdaɪəri/ | diary | phonetic-count-3-vs-parts-1 |
| anyone | /ˈeniwʌn/ | anyone | phonetic-count-3-vs-parts-1 |
| help | /yourself/ | help | phonetic-count-2-vs-parts-1 |
| koala | [kəʊ'ɑːlə] | koala | phonetic-count-3-vs-parts-1 |
| Hard | /ˌhɑːd ˈwɜːkɪŋ/ | Hard | phonetic-count-3-vs-parts-1 |
| humid |  | hum·id | no-phonetic-written-fallback |
| Negro |  | Neg·ro | no-phonetic-written-fallback |
| fire | ['faɪə(r)] | fire | phonetic-count-2-vs-parts-1 |
| Fly | /come/ | Fly | phonetic-count-2-vs-parts-1 |
| so | /so...that.../ | so | phonetic-count-2-vs-parts-1 |
| Let | /make/ | Let | phonetic-count-2-vs-parts-1 |
| Saying | /ˈseɪɪŋ/ | Saying | phonetic-count-2-vs-parts-1 |
| who | /ˌdʌbljuː eɪtʃ ˈəʊ/ | who | phonetic-count-3-vs-parts-1 |
| hard | /ˌhɑːd ˈwɜːkɪŋ/ | hard | phonetic-count-3-vs-parts-1 |
| as | /æz æz/ | as | phonetic-count-2-vs-parts-1 |
| Julie |  | Jul·ie | no-phonetic-written-fallback |
| Diana | /daɪ'ænə/ | Diana | phonetic-count-3-vs-parts-1 |
| flour | /ˈflaʊə(r)/ | flour | phonetic-count-2-vs-parts-1 |
| sour | /ˈsaʊə(r)/ | sour | phonetic-count-2-vs-parts-1 |
| recipe | /ˈresəpi/ | recipe | phonetic-count-3-vs-parts-1 |
| help | /yourself/ | help | phonetic-count-2-vs-parts-1 |
| anyone | /ˈeniwʌn/ | anyone | phonetic-count-3-vs-parts-1 |
| diary | ['daɪəri] | diary | phonetic-count-3-vs-parts-1 |
| maybe | ['meɪbi] | maybe | phonetic-count-2-vs-parts-1 |
| sitcom |  | sit·com | no-phonetic-written-fallback |
| too | [təˈnaɪt] | too | phonetic-count-2-vs-parts-1 |
| fly | /come/ | fly | phonetic-count-2-vs-parts-1 |
| buildings |  | buil·dings | no-phonetic-written-fallback |
| humans |  | hum·ans | no-phonetic-written-fallback |
| Let | /make/ | Let | phonetic-count-2-vs-parts-1 |
| relaxing |  | rel·ax·ing | no-phonetic-written-fallback |
| colorfuler |  | col·or·ful·er | no-phonetic-written-fallback |
| steamed |  | steam·ed | no-phonetic-written-fallback |
| Satisfied |  | Sat·is·fied | no-phonetic-written-fallback |
| poem | /ˈpəʊɪm/ | poem | phonetic-count-2-vs-parts-1 |
| Maya | /ˈmaɪə/ | Maya | phonetic-count-2-vs-parts-1 |
| player | /ˈpleɪə(r)/ | player | phonetic-count-2-vs-parts-1 |
| namaste |  | nam·as·te | no-phonetic-written-fallback |
| so | /so...that.../ | so | phonetic-count-2-vs-parts-1 |
| merci |  | mer·ci | no-phonetic-written-fallback |
| Kaito |  | Kai·to | no-phonetic-written-fallback |
| Turkiye | /ˈtɜ:kijeɪ/ | Turkiye | phonetic-count-3-vs-parts-1 |
| society | /səˈsaɪəti/ | society | phonetic-count-4-vs-parts-1 |
| who | /ˌdʌbljuː eɪtʃ ˈəʊ/ | who | phonetic-count-3-vs-parts-1 |
| anyway |  | an·yw·ay | no-phonetic-written-fallback |
| sandstorm |  | sands·torm | no-phonetic-written-fallback |
| adj.shocked |  | adj.s·hoc·ked | no-phonetic-written-fallback |
| challenge | [ˈtʃælɪndʒɪŋ] | challenge | phonetic-count-3-vs-parts-1 |
| allergy |  | al·ler·gy | no-phonetic-written-fallback |
| help | /yourself/ | help | phonetic-count-2-vs-parts-1 |
| speaking |  | speak·ing | no-phonetic-written-fallback |
| excited |  | ex·cit·ed | no-phonetic-written-fallback |
| too | [təˈnaɪt] | too | phonetic-count-2-vs-parts-1 |
| suggestions |  | sug·ges·tions | no-phonetic-written-fallback |
| Who | /ˌdʌbljuː eɪtʃ ˈəʊ/ | Who | phonetic-count-3-vs-parts-1 |
| so | /so...that.../ | so | phonetic-count-2-vs-parts-1 |
| unexpected |  | un·ex·pec·ted | no-phonetic-written-fallback |
| oversleep |  | ov·ers·leep | no-phonetic-written-fallback |
| believable |  | bel·iev·ab·le | no-phonetic-written-fallback |
| harmonious |  | har·mon·ious | no-phonetic-written-fallback |
| civilized |  | civ·il·iz·ed | no-phonetic-written-fallback |
| credible |  | cred·ib·le | no-phonetic-written-fallback |
| cherish |  | cher·ish | no-phonetic-written-fallback |
| accessible | [əkˈsesɪb(ə)l] | accessible | phonetic-count-4-vs-parts-1 |
