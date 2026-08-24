import React, { useState } from 'react';
import { Search, Link as LinkIcon, FileText, Key, Sliders, ArrowRight, RefreshCw, Feather, Sparkles } from 'lucide-react';
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
    <div className="newsprint-paper p-5 sm:p-7 text-[#1c1917] space-y-4">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b-2 border-[#1c1917]">
        <div className="flex items-center space-x-2">
          <Feather className="w-5 h-5 text-[#1c1917]" />
          <div>
            <h2 className="font-headline font-bold text-base sm:text-lg uppercase tracking-tight text-[#1c1917]">
              Wireroom Inquiry & Dispatch Desk
            </h2>
            <p className="text-xs font-typewriter text-[#57534e]">
              Input assertions, articles, or wire links for instant empirical cross-examination.
            </p>
          </div>
        </div>

        {/* Input Mode Selector */}
        <div className="flex items-center space-x-1 p-1 bg-[#f4eee1] border border-[#1c1917]">
          <button
            type="button"
            onClick={() => setInputMode('claim')}
            className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-typewriter font-bold transition cursor-pointer ${
              inputMode === 'claim'
                ? 'bg-[#1c1917] text-[#fdfbf7]'
                : 'text-[#44403c] hover:text-[#1c1917]'
            }`}
          >
            <span>Statement / Lead</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('article')}
            className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-typewriter font-bold transition cursor-pointer ${
              inputMode === 'article'
                ? 'bg-[#1c1917] text-[#fdfbf7]'
                : 'text-[#44403c] hover:text-[#1c1917]'
            }`}
          >
            <span>Full Excerpt</span>
          </button>

          <button
            type="button"
            onClick={() => setInputMode('url')}
            className={`flex items-center space-x-1.5 px-3 py-1 text-xs font-typewriter font-bold transition cursor-pointer ${
              inputMode === 'url'
                ? 'bg-[#1c1917] text-[#fdfbf7]'
                : 'text-[#44403c] hover:text-[#1c1917]'
            }`}
          >
            <span>Wire URL</span>
          </button>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {inputMode === 'url' && (
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#78716c]">
              <LinkIcon className="w-4 h-4" />
            </div>
            <input
              id="input-news-url"
              type="url"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="https://wire-service.com/article/breaking-investigation"
              className="w-full pl-10 pr-4 py-2.5 bg-[#fcf9f2] border-2 border-[#1c1917] font-typewriter text-xs sm:text-sm text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:bg-white shadow-[2px_2px_0px_#1c1917]"
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
                ? "Enter or paste any headline, rumor, or empirical assertion to verify (e.g., 'NASA orbital spectrometers detect signatures of water vapor in exoplanet atmosphere')..."
                : inputMode === 'article'
                ? "Paste complete news article, column, or wire transmission here. Gemini will deconstruct the central assertion and cross-check against primary archives..."
                : "Optionally add quotes or background context from the wire link above..."
            }
            className="w-full p-4 bg-[#fcf9f2] border-2 border-[#1c1917] font-body-news text-base text-[#1c1917] placeholder-[#a8a29e] focus:outline-none focus:bg-white resize-y leading-relaxed shadow-[2px_2px_0px_#1c1917]"
          />
          <div className="absolute bottom-3 right-3 text-[10px] text-[#78716c] pointer-events-none hidden sm:block font-typewriter">
            [Ctrl+Enter to Dispatch]
          </div>
        </div>

        {/* Advanced Options Bar */}
        <div className="flex items-center justify-between text-xs">
          <button
            type="button"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="flex items-center space-x-1 font-typewriter text-[#44403c] hover:text-[#1c1917] underline decoration-dotted cursor-pointer"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showAdvanced ? '[-] Conceal Wire Calibration' : '[+] Telegraph Investigation Depth & API Settings'}</span>
          </button>

          <span className="font-typewriter text-[11px] text-[#78716c]">
            Wire: Google Live Search Grounding
          </span>
        </div>

        {/* Advanced Drawer */}
        {showAdvanced && (
          <div className="p-4 bg-[#f4eee1] border border-[#1c1917] space-y-3 animate-fadeIn">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[11px] font-typewriter font-bold uppercase tracking-wider text-[#1c1917] mb-1">
                  Optional Tavily AI Key (Secondary Scraper)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716c]">
                    <Key className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={customTavilyKey}
                    onChange={(e) => setCustomTavilyKey(e.target.value)}
                    placeholder="tvly-xxxxxxxx (uses default Gemini Search if blank)"
                    className="w-full pl-9 pr-3 py-1.5 bg-[#fdfbf7] border border-[#1c1917] font-typewriter text-xs text-[#1c1917]"
                  />
                </div>
              </div>

              <div className="w-full sm:w-56">
                <label className="block text-[11px] font-typewriter font-bold uppercase tracking-wider text-[#1c1917] mb-1">
                  Investigation Depth
                </label>
                <select
                  value={depth}
                  onChange={(e) => setDepth(e.target.value as 'standard' | 'deep')}
                  className="w-full px-3 py-1.5 bg-[#fdfbf7] border border-[#1c1917] font-typewriter text-xs text-[#1c1917]"
                >
                  <option value="standard">Standard Wire Verification</option>
                  <option value="deep">Deep Primary Cross-Examination</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Submit & Control Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-[#78716c]/30">
          <div className="flex items-center space-x-2 text-[11px] font-typewriter text-[#57534e]">
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span>Engaged: Primary Institutional Archives & Tier-1 Wire Corroboration</span>
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
                className="px-3 py-2 bg-[#f4eee1] hover:bg-[#efe6d5] border border-[#1c1917] text-xs font-typewriter font-bold text-[#1c1917] transition cursor-pointer"
              >
                Clear Ink
              </button>
            )}

            <button
              id="btn-submit-verification"
              type="submit"
              disabled={isLoading || (!inputText.trim() && !inputUrl.trim())}
              className="flex-1 sm:flex-none flex items-center justify-center space-x-2 px-6 py-2.5 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] disabled:opacity-50 disabled:cursor-not-allowed text-xs font-typewriter font-bold uppercase tracking-wider shadow-[3px_3px_0px_#78716c] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Teletype Inquiring Wire...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>DISPATCH TO EDITORS</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* Front-Page Sample Headlines / Leads */}
      {sampleClaims.length > 0 && (
        <div className="mt-5 pt-4 border-t-2 border-[#1c1917]">
          <div className="flex items-center justify-between mb-2.5">
            <span className="font-headline font-bold text-xs uppercase tracking-wider text-[#1c1917] flex items-center space-x-1.5">
              <span>❧</span>
              <span>Today's Front-Page Leads to Investigate</span>
            </span>
            <span className="font-typewriter text-[10px] text-[#78716c]">Click lead to load</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {sampleClaims.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                className="newsprint-card p-2.5 text-left transition hover:bg-[#f4eee1] hover:border-[#1c1917] group flex flex-col justify-between space-y-1.5 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-typewriter font-bold uppercase px-1.5 py-0.5 bg-[#1c1917] text-[#fdfbf7]">
                    {sample.category}
                  </span>
                  <span className="font-typewriter text-[9px] text-[#78716c] group-hover:text-[#1c1917]">
                    Load &rarr;
                  </span>
                </div>
                <p className="font-headline text-xs font-semibold text-[#1c1917] line-clamp-2 leading-snug">
                  "{sample.claim}"
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

