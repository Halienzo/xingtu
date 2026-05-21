// ============================================
// 单词身份卡 (WordIdentityCard)
// 支持搜索任意系统词汇，展示其所有"合法身份"
// ============================================
import { useState, useEffect, useCallback, useRef } from 'react';
import { wordPosProfiles, getWordProfile, searchAllWords, lookupWordProfile } from '../../data/wordPosProfiles';
import { Volume2, AlertTriangle, ChevronDown, ChevronUp, Star, Eye, EyeOff, Search, Loader2 } from 'lucide-react';
import type { WordPosProfile } from '../../data/wordPosProfiles';

interface WordIdentityCardProps {
  selectedWord: string;
  onSelectWord: (word: string) => void;
}

export function WordIdentityCard({ selectedWord, onSelectWord }: WordIdentityCardProps) {
  const [profile, setProfile] = useState<WordPosProfile | undefined>(() => getWordProfile(selectedWord));
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(0);
  const [showHidden, setShowHidden] = useState(false);
  const [stats, setStats] = useState({ total: 0, multiPos: 0 });
  const searchRef = useRef<HTMLInputElement>(null);

  // 加载选中词的 profile（支持硬编码 + 自动生成索引）
  useEffect(() => {
    let cancelled = false;
    async function load() {
      // 先显示硬编码（如果有）
      const hardcoded = getWordProfile(selectedWord);
      if (hardcoded) {
        setProfile(hardcoded);
        return;
      }
      // 再查索引
      const indexed = await lookupWordProfile(selectedWord);
      if (!cancelled) {
        setProfile(indexed);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [selectedWord]);

  // 加载统计
  useEffect(() => {
    async function loadStats() {
      const idx = await import('../../data/posWordIndex');
      const s = idx.getIndexStats();
      setStats({
        total: s.posDetailCoverage,
        multiPos: s.multiPosWords,
      });
    }
    loadStats();
  }, []);

  // 搜索防抖
  const debouncedSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }
    setIsSearching(true);
    const results = await searchAllWords(query, 15);
    setSearchResults(results);
    setIsSearching(false);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => debouncedSearch(searchQuery), 200);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  const visibleIdentities = showHidden
    ? profile?.identities || []
    : profile?.identities.filter(i => !i.hidden) || [];

  return (
    <div className="space-y-6">
      {/* 标题 */}
      <div>
        <h2 className="text-lg font-bold flex items-center gap-2 mb-2">
          <span className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs">2</span>
          单词身份卡
        </h2>
        <p className="text-sm text-slate-400">
          搜索任意系统词汇，查看其多词性身份
          {stats.total > 0 && (
            <span className="text-slate-500 ml-1">
              （已索引 {stats.total.toLocaleString()} 词，{stats.multiPos.toLocaleString()} 个多词性词）
            </span>
          )}
        </p>
      </div>

      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="搜索任意单词，如 close / light / water..."
          className="w-full bg-slate-800 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-amber-500/40"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-400 animate-spin" />
        )}

        {/* 搜索结果下拉 */}
        {searchResults.length > 0 && searchQuery.trim() && (
          <div className="absolute z-10 left-0 right-0 mt-1 bg-slate-800 border border-white/10 rounded-lg shadow-xl max-h-60 overflow-y-auto">
            {searchResults.map(word => (
              <button
                key={word}
                onClick={() => {
                  onSelectWord(word);
                  setSearchQuery('');
                  setSearchResults([]);
                  setExpandedId(0);
                }}
                className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{word}</span>
                {wordPosProfiles.some(p => p.word === word) && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">样板</span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 样板词快捷入口 */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs text-slate-500 py-1.5">样板词：</span>
        {wordPosProfiles.map(p => (
          <button
            key={p.word}
            onClick={() => {
              onSelectWord(p.word);
              setExpandedId(0);
            }}
            className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
              p.word === selectedWord
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-slate-800 text-slate-400 border border-white/10 hover:border-white/20'
            }`}
          >
            {p.word}
            {p.identities.length > 1 && (
              <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-slate-700 text-slate-500">
                {p.identities.length}性
              </span>
            )}
          </button>
        ))}
      </div>

      {/* 未找到提示 */}
      {!profile && (
        <div className="text-center py-12 text-slate-500 bg-slate-900/30 rounded-xl border border-white/5">
          <p>未找到单词 "{selectedWord}" 的身份卡</p>
          <p className="text-sm mt-2">该词可能不在系统词汇中，或暂无词性数据</p>
        </div>
      )}

      {profile && (
        <>
          {/* 单词头部信息 */}
          <div className="bg-slate-900/50 rounded-xl border border-white/10 p-4 md:p-5">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-2xl font-bold text-white">{profile.word}</h3>
              <span className="text-lg text-slate-400 font-mono">{profile.phonetic}</span>
              <button className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors" title="播放发音">
                <Volume2 className="w-4 h-4 text-amber-400" />
              </button>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">
                CEFR {profile.ceferLevel}
              </span>
              {profile.identities.length > 1 && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
                  {profile.identities.length} 个身份
                </span>
              )}
            </div>

            {profile.notes.length > 0 && (
              <div className="text-sm text-amber-400/80 bg-amber-500/5 rounded-lg px-3 py-2 mb-3 border border-amber-500/10">
                {profile.notes.map((note, i) => (
                  <div key={i}>💡 {note}</div>
                ))}
              </div>
            )}

            {profile.wordForms.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                <span className="text-xs text-slate-500">变形：</span>
                {profile.wordForms.map((form, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {form}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* 身份列表 */}
          <div className="space-y-3">
            {visibleIdentities.map((identity, idx) => (
              <div
                key={idx}
                className={`border rounded-xl transition-all ${
                  identity.priority === 1
                    ? 'border-amber-500/30 bg-amber-500/5'
                    : 'border-white/10 bg-slate-900/30'
                }`}
              >
                {/* 身份头部 */}
                <button
                  onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <span className={`shrink-0 text-xs font-bold px-2 py-1 rounded-lg ${
                    identity.posCode === 'n' ? 'bg-blue-500/20 text-blue-300' :
                    identity.posCode === 'v' ? 'bg-emerald-500/20 text-emerald-300' :
                    identity.posCode === 'adj' ? 'bg-amber-500/20 text-amber-300' :
                    identity.posCode === 'adv' ? 'bg-purple-500/20 text-purple-300' :
                    'bg-slate-500/20 text-slate-300'
                  }`}>
                    {identity.pos}
                  </span>

                  <span className="flex-1 text-sm text-white">{identity.meaning}</span>

                  {identity.priority === 1 && (
                    <span className="shrink-0 flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                      <Star className="w-3 h-3" />
                      最常见
                    </span>
                  )}

                  <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-400">
                    {identity.ceferLevel}
                  </span>

                  {expandedId === idx ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {/* 展开的详细内容 */}
                {expandedId === idx && (
                  <div className="px-4 pb-4 space-y-3 border-t border-white/5 pt-3">
                    {/* 句法位置 */}
                    <div>
                      <span className="text-xs text-slate-500">句法位置：</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {identity.sentenceRoles.map(role => (
                          <span key={role} className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 例句 */}
                    {identity.examples.length > 0 && (
                      <div>
                        <span className="text-xs text-slate-500">例句：</span>
                        <div className="space-y-2 mt-1">
                          {identity.examples.map((ex, i) => (
                            <div key={i} className="bg-slate-800/50 rounded-lg px-3 py-2">
                              <div className="text-sm text-white">{ex.en}</div>
                              <div className="text-xs text-slate-500 mt-0.5">{ex.cn}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 搭配 */}
                    {identity.collocations.length > 0 && (
                      <div>
                        <span className="text-xs text-slate-500">常见搭配：</span>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {identity.collocations.map(col => (
                            <span key={col} className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {col}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 陷阱 */}
                    {identity.traps.length > 0 && (
                      <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg px-3 py-2">
                        <div className="flex items-center gap-1.5 mb-1">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                          <span className="text-xs font-medium text-rose-300">常见陷阱</span>
                        </div>
                        {identity.traps.map((trap, i) => (
                          <div key={i} className="text-xs text-rose-400/80">• {trap}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 隐藏身份切换 */}
          {profile.identities.some(i => i.hidden) && (
            <button
              onClick={() => setShowHidden(!showHidden)}
              className="flex items-center gap-2 text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              {showHidden ? '隐藏拓展义项' : `显示 ${profile.identities.filter(i => i.hidden).length} 个拓展义项`}
            </button>
          )}
        </>
      )}
    </div>
  );
}
