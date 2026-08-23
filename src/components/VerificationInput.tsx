import React, { useState } from 'react';
import { Search, Sparkles, Link as LinkIcon, FileText, Key, Sliders, ArrowRight, RefreshCw } from 'lucide-react';
import { SampleClaim } from '../types';

interface VerificationInputProps {
  onVerify: (data: { text: string; url?: string; customTavilyKey?: string; depth?: 'standard' | 'deep' }) => void;
  isLoading: boolean;
  sampleClaims: SampleClaim[];
}

export const VerificationInput: React.FC<VerificationInputProps> = ({
  onVerify,
  isLoading,
  sampleClaims,
}) => {
  const [inputText, setInputText] = useState('');
  const [inputUrl, setInputUrl] = useState('');
  const [inputMode, setInputMode] = useState<'claim' | 'article' | 'url'>('claim');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [customTavilyKey, setCustomTavilyKey] = useState('');
  const [depth, setDepth] = useState<'standard' | 'deep'>('standard');

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !inputUrl.trim()) return;
    onVerify({
      text: inputText || inputUrl,
      url: inputUrl.trim() || undefined,
      customTavilyKey: customTavilyKey.trim() || undefined,
      depth,
    });
  };

  const handleSelectSample = (sample: SampleClaim) => {
    setInputText(sample.claim);
    setInputMode('claim');
  };

  return (
    <div className="w-full rounded-2xl bg-[#121214] border border-white/5 p-5 sm:p-7 shadow-2xl text-white">
      {/* Mode Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-white/5">
        <div className="flex items-center space-x-1 p-1 bg-[#050505] rounded-xl border border-white/10">
          <button
            type="button"
            onClick={() => setInputMode('claim')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              inputMode === 'claim'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Claim / Statement</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('article')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              inputMode === 'article'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Full Article Snippet</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              inputMode === 'url'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>News URL</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
            showAdvanced || customTavilyKey
              ? 'bg-[#1A1A1E] text-blue-400 border-blue-500/40'
              : 'bg-[#050505] text-slate-400 border-white/10 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Investigation Options</span>
          {customTavilyKey && <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_rgba(96,165,250,0.8)]" />}
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputMode === 'url' && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
              <LinkIcon className="w-4 h-4" />
            </div>
            <input
              id="input-news-url"
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://news-site.com/article/headline-breaking-story"
              className="w-full pl-10 pr-4 py-3 bg-[#050505] rounded-xl border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition font-sans shadow-inner"
            />
          </div>
        )}

        <div className="relative">
          <textarea
            id="input-claim-text"
            rows={inputMode === 'article' ? 6 : 4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                handleSubmit();
              }
            }}
            placeholder={
              inputMode === 'claim'
                ? "Enter or paste any headline, rumor, or empirical assertion to verify (e.g. 'NASA detected water vapor on an exoplanet in the habitable zone')..."
                : inputMode === 'article'
                ? "Paste the text of an entire news article or excerpt here. Gemini will isolate the core factual claim and cross-check it against live wire reporting..."
                : "Optionally add specific context or quotes from the URL above..."
            }
            className="w-full p-4 bg-[#050505] rounded-xl border border-white/10 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-y transition leading-relaxed shadow-inner"
          />
          <div className="absolute bottom-3 right-3 text-[11px] text-slate-500 pointer-events-none hidden sm:block font-mono">
            Press <kbd className="px-1.5 py-0.5 rounded bg-[#121214] border border-white/10 text-slate-400 text-[10px]">Ctrl+Enter</kbd> to verify
          </div>
        </div>

        {/* Advanced Accordion */}
        {showAdvanced && (
          <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/5 space-y-3 animate-fadeIn">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Optional Tavily AI API Key
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Key className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={customTavilyKey}
                    onChange={(e) => setCustomTavilyKey(e.target.value)}
                    placeholder="tvly-xxxxxxxxxxxx (uses Gemini Google Search if blank)"
                    className="w-full pl-9 pr-3 py-2 bg-[#050505] rounded-lg border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-400 font-mono"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Provides secondary advanced news scraping alongside Gemini's native Google Search grounding.
                </p>
              </div>

              <div className="w-full sm:w-48">
                <label className="block text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
                  Investigation Depth
                </label>
                <select
                  value={depth}
                  onChange={(e) => setDepth(e.target.value as 'standard' | 'deep')}
                  className="w-full px-3 py-2 bg-[#050505] rounded-lg border border-white/10 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-400"
                >
                  <option value="standard">Standard Fact-Check</option>
                  <option value="deep">Deep Cross-Examination</option>
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Tier 1-3 wire corroboration.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Submit Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-400 flex items-center space-x-2">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
            <span className="font-mono text-[11px] text-slate-400">Gemini 3.7 Flash + Live Google Search Grounding</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {(inputText || inputUrl) && (
              <button
                type="button"
                onClick={() => {
                  setInputText('');
                  setInputUrl('');
                }}
                disabled={isLoading}
                className="px-3.5 py-2.5 rounded-xl bg-[#1a1a1e] hover:bg-[#222228] border border-white/5 text-xs font-medium text-slate-300 transition"
              >
                Clear
              </button>
            )}

            <button
              id="btn-submit-verification"
              type="submit"
              disabled={isLoading || (!inputText.trim() && !inputUrl.trim())}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-900/30 transition active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Investigating Live Data...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>RUN VERIFICATION</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Quick Test Samples */}
      {sampleClaims.length > 0 && (
        <div className="mt-6 pt-5 border-t border-white/5">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
              Quick Test Scenarios
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Select to verify</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sampleClaims.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="group flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#0A0A0C] hover:bg-[#16161a] border border-white/5 hover:border-white/20 text-left transition"
              >
                <span
                  className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    sample.category === 'Science'
                      ? 'bg-cyan-950/60 text-cyan-400 border border-cyan-800/60'
                      : sample.category === 'Health'
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                      : sample.category === 'Economy'
                      ? 'bg-amber-950/60 text-amber-400 border border-amber-800/60'
                      : sample.category === 'Politics'
                      ? 'bg-purple-950/60 text-purple-400 border border-purple-800/60'
                      : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
                  }`}
                >
                  {sample.category}
                </span>
                <span className="text-xs text-slate-300 group-hover:text-white transition line-clamp-1 max-w-xs">
                  {sample.claim}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
