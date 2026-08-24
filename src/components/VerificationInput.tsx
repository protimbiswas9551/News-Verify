import React, { useState } from 'react';
import { Search, Link as LinkIcon, Sliders, RefreshCw, Key, Globe, Shield } from 'lucide-react';
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
  };

  // Curated 4 column briefs matching the reference photo
  const defaultBriefs = [
    {
      category: 'Science',
      headline: 'NASA James Webb Space detected atmospheric...',
      quote: '"NASA’s James Webb Space Telescope confirmed signatures of water vapor and chemical disequilibria in habitable exoplanet zone."',
      tags: ['Science', 'Astrophysics'],
      claim: 'NASA James Webb Space Telescope detected atmospheric water vapor and potential biosignatures on exoplanet K2-18b.',
    },
    {
      category: 'Economy',
      headline: 'The Federal Reserve announced emergency to...',
      quote: '"The Federal Reserve announced an emergency policy rate cut exception, reported live across Reuters and primary financial wires."',
      tags: ['Health', 'Economy', 'Politics'],
      claim: 'The Federal Reserve announced an unexpected emergency interest rate cut during unannounced weekend session.',
    },
    {
      category: 'Health',
      headline: 'Drinking raw celery juice every morning permanently...',
      quote: '"Drinking raw celery juice every morning permanently cures all autoimmune conditions, every organ, and eliminates all disease."',
      tags: ['Health', 'Nutrition'],
      claim: 'Drinking raw celery juice every morning on an empty stomach permanently cures autoimmune diseases and detoxifies the liver.',
    },
    {
      category: 'Politics',
      headline: 'OpenAI and Microsoft agreed a pact to deploy...',
      quote: '"United Nations passed a binding resolution granting artificial intelligence systems full sovereign autonomy."',
      tags: ['Politics', 'AI Regulation'],
      claim: 'United Nations passed a binding resolution granting autonomous artificial intelligence legal personhood.',
    },
  ];

  return (
    <div className="newsprint-paper p-5 sm:p-7 text-[#1c1917] space-y-6 relative overflow-hidden">
      {/* Decorative ink smudges for authentic texture */}
      <div className="ink-blot-speck top-4 left-6" />
      <div className="ink-blot-speck bottom-8 right-12 opacity-30" />

      {/* Top Banner Tag */}
      <div>
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-[#f4eee1] border border-[#1c1917] font-typewriter text-xs font-bold uppercase tracking-wider text-[#1c1917] shadow-[2px_2px_0px_#1c1917] mb-3">
          <span className="w-2 h-2 rounded-full bg-[#1c1917]" />
          <span>AI OSINT & FACT-CHECKING PLATFORM</span>
        </div>

        {/* Big Bold Headline matching photo */}
        <h2 className="font-headline font-black text-2xl sm:text-4xl md:text-5xl text-[#1c1917] tracking-tight uppercase leading-[1.1]">
          NEWS VERIFICATION & FACT-CHECKING: <br />
          AN ENGINE FOR THE TRUTH
        </h2>
        <p className="font-body-news text-base sm:text-lg text-[#44403c] italic mt-1.5 leading-relaxed">
          Cross-examine any news claim, rumor, article excerpt, and peer-checking grounding.
        </p>
      </div>

      {/* Main Input Box & Investigation Options Box Grid */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5">
          {/* Left Text Input Area */}
          <div className="lg:col-span-9 relative">
            <textarea
              id="input-claim-text"
              rows={4}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                  handleSubmit();
                }
              }}
              placeholder="Enter or paste any headline, rumor or empirical assertion to verify (e.g. 'NASA detected water vapor on exoplanet zone')..."
              className="w-full h-full min-h-[120px] p-4 bg-[#fcf9f2] border-2 border-[#1c1917] font-body-news text-base text-[#1c1917] placeholder-[#78716c] focus:outline-none focus:bg-white resize-none leading-relaxed shadow-[3px_3px_0px_#1c1917]"
            />
          </div>

          {/* Right: Vintage Woodcut "Investigation Options" Box */}
          <div
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="lg:col-span-3 bg-[#f6eee0] border-2 border-[#1c1917] p-3 flex flex-col justify-between items-center text-center cursor-pointer hover:bg-[#f0e4d0] transition shadow-[3px_3px_0px_#1c1917] group"
          >
            <div className="w-full pb-1 border-b border-[#1c1917]">
              <span className="font-headline font-bold text-xs uppercase tracking-wider text-[#1c1917]">
                Investigation Options
              </span>
            </div>

            {/* Vintage engraving illustration of Magnifying Glass & Globe */}
            <div className="my-2 relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-2 border-[#1c1917] bg-[#fcf7ec] flex items-center justify-center shadow-inner relative group-hover:scale-105 transition">
                <Globe className="w-10 h-10 text-[#44403c] stroke-[1.2]" />
                <div className="absolute -bottom-1 -right-1 p-1 bg-[#1c1917] text-[#fdfbf7] rounded-full">
                  <Search className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <span className="font-typewriter text-[10px] text-[#57534e] group-hover:text-[#1c1917] font-semibold">
              {showAdvanced ? '[-] Close Depth Controls' : '[+] Wire Calibration'}
            </span>
          </div>
        </div>

        {/* Advanced Calibration drawer if opened */}
        {showAdvanced && (
          <div className="p-4 bg-[#f4eee1] border-2 border-[#1c1917] space-y-3 animate-fadeIn">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-[11px] font-typewriter font-bold uppercase tracking-wider text-[#1c1917] mb-1">
                  Custom Tavily API Key (Optional Deep Web Scraper)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716c]">
                    <Key className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={customTavilyKey}
                    onChange={(e) => setCustomTavilyKey(e.target.value)}
                    placeholder="tvly-xxxxxxxx (uses default Gemini 3.7 Search if empty)"
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
                  <option value="deep">Deep Primary Cross-Check</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Status Line and RUN VERIFICATION Rubber Stamp Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center space-x-2 font-typewriter text-xs font-semibold text-[#1c1917]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#1c1917]" />
            <span>Gemini 3.7 Flash + Live Google Search Grounding</span>
          </div>

          <button
            id="btn-run-verification"
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="btn-newspaper-stamp cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Teletype Investigating...</span>
              </>
            ) : (
              <span>RUN VERIFICATION</span>
            )}
          </button>
        </div>
      </form>

      {/* QUICK TEST SCENARIOS & Latest Briefs matching the photo */}
      <div className="pt-5 border-t-2 border-[#1c1917] space-y-3">
        <div className="flex items-center justify-between border-b border-[#1c1917] pb-1">
          <span className="font-typewriter font-bold text-xs uppercase tracking-wider text-[#1c1917]">
            QUICK TEST SCENARIOS
          </span>
          <span className="font-typewriter text-xs text-[#57534e]">Select to verify</span>
        </div>

        <h3 className="font-headline font-bold text-lg text-[#1c1917]">
          Latest Briefs
        </h3>

        {/* 4 Column Briefs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {defaultBriefs.map((brief, idx) => (
            <div
              key={idx}
              onClick={() => {
                setInputText(brief.claim);
              }}
              className="newsprint-card p-3 flex flex-col justify-between space-y-2 cursor-pointer hover:bg-[#f5ecda] transition group"
            >
              <div>
                {/* Category Pill Tag */}
                <span className="inline-block px-1.5 py-0.5 border border-[#1c1917] bg-[#fcf9f2] font-typewriter text-[9px] font-bold uppercase text-[#1c1917] mb-1.5">
                  {brief.category}
                </span>

                <h4 className="font-headline font-bold text-xs text-[#1c1917] leading-snug group-hover:underline">
                  {brief.headline}
                </h4>

                <p className="font-body-news text-xs text-[#44403c] italic leading-snug mt-1 line-clamp-3">
                  {brief.quote}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="flex flex-wrap gap-1 pt-1.5 border-t border-[#1c1917]/20">
                {brief.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-1 py-0.2 border border-[#78716c] font-typewriter text-[8px] uppercase text-[#57534e]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


