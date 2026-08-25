import React, { useState } from 'react';
import { Search, Globe, Key, Sliders, Atom, Landmark, HeartPulse, CircleDollarSign, ArrowRight } from 'lucide-react';
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

  const handleSelectBrief = (claimText: string) => {
    setInputText(claimText);
  };

  // 4 Curated News Briefs matching the reference image
  const latestBriefs = [
    {
      category: 'SCIENCE',
      icon: Atom,
      title: 'NASA James Webb space detected atmosphere...',
      quote: "‘NASA's James Webb Space Telescope confirmed signatures of water vapor...’",
      claim: 'NASA James Webb Space Telescope detected atmospheric water vapor and potential biosignatures on exoplanet K2-18b.',
    },
    {
      category: 'ECONOMY',
      icon: CircleDollarSign,
      title: 'The Federal Reserve announced emergency in...',
      quote: "‘The Federal Reserve announced an emergency reality rate cut exception...’",
      claim: 'The Federal Reserve announced an emergency policy rate cut exception during unannounced weekend session.',
    },
    {
      category: 'HEALTH',
      icon: HeartPulse,
      title: 'Drinking raw celery juice every morning permanently...',
      quote: "‘Drinking raw celery juice every morning permanently cures all autoimmune...’",
      claim: 'Drinking raw celery juice every morning permanently cures all autoimmune conditions and eliminates disease.',
    },
    {
      category: 'POLITICS',
      icon: Landmark,
      title: 'OpenAI and Microsoft agreed a pact to deploy...',
      quote: "‘United Nations passed a binding resolution granting artificial intelligence...’",
      claim: 'United Nations passed a binding resolution granting artificial intelligence systems full sovereign autonomy.',
    },
  ];

  return (
    <div className="space-y-6 text-[#11100e]">
      {/* Primary Headline and Subtitle in Antique Aged Parchment Paper Sheet */}
      <div className="parchment-sheet-card p-5 sm:p-6 text-[#15110e] relative overflow-hidden bg-[#fdfbf7]">
        {/* Subtle top dateline / seal banner */}
        <div className="flex items-center justify-between border-b border-[#2e2319]/30 pb-2 mb-3">
          <div className="flex items-center space-x-2">
            <span className="font-serif text-[#2e2319] text-sm">❦</span>
            <span className="font-typewriter text-[10px] sm:text-[11px] uppercase tracking-widest font-bold text-[#2e2319]">
              OFFICIAL BUREAU DISPATCH • INQUIRY DESK
            </span>
          </div>
          <span className="font-typewriter text-[10px] text-[#423326] uppercase tracking-wider font-semibold hidden sm:inline">
            PRESS PROOF N° 849
          </span>
        </div>

        <h2 className="font-headline font-black text-2xl sm:text-3xl md:text-4xl text-[#0e0a08] tracking-tight uppercase leading-tight">
          NEWS VERIFICATION &amp; FACT-CHECKING: <br className="hidden sm:inline" />
          AN ENGINE FOR THE TRUTH
        </h2>
        <p className="font-body-news italic text-base sm:text-lg text-[#1c1510] mt-2 font-medium leading-relaxed">
          Cross-examine any news claim, rumor, article excerpt, and peer-checking grounding
        </p>

        {/* Bottom subtle rule with fleuron */}
        <div className="mt-3 pt-2 border-t border-[#2e2319]/20 flex items-center justify-between text-[10px] font-typewriter text-[#423326] uppercase tracking-wider">
          <span>DEPARTMENT OF INVESTIGATION</span>
          <span className="font-serif">❧</span>
        </div>
      </div>

      {/* Main Input Form with Ledger Grid & Side Options */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
          {/* Ruled Ledger Grid Input Area */}
          <div className="md:col-span-8 relative">
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
              placeholder='Enter or paste any headline, rumor or empirical assertion to verify (e.g. "NASA detected water vapor on exoplanet zone")...'
              className="w-full h-full min-h-[145px] p-4 bg-ledger-grid border-2 border-[#11100e] font-body-news text-base text-[#11100e] placeholder-[#57534e] focus:outline-none focus:bg-[#fffffb] resize-none leading-relaxed shadow-[3px_3px_0px_#11100e] font-medium"
            />
          </div>

          {/* Side: Investigation Options Box */}
          <div className="md:col-span-4 flex flex-col justify-between gap-2.5">
            <div
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="bg-[#faf4e6] border-2 border-[#11100e] p-3 flex flex-col items-center justify-between text-center cursor-pointer hover:bg-[#f3e9d3] transition shadow-[3px_3px_0px_#11100e] h-full group"
            >
              <div className="w-full pb-1 border-b-2 border-[#11100e]">
                <span className="font-headline font-black text-xs uppercase tracking-wider text-[#11100e]">
                  INVESTIGATION OPTIONS
                </span>
              </div>

              {/* Engraving Globe Icon */}
              <div className="my-2 relative flex items-center justify-center">
                <div className="w-14 h-14 rounded-full border-2 border-[#11100e] bg-[#fdfbf7] flex items-center justify-center shadow-inner relative group-hover:scale-105 transition">
                  <Globe className="w-8 h-8 text-[#11100e] stroke-[1.6]" />
                  <div className="absolute -bottom-0.5 -right-0.5 p-1 bg-[#11100e] text-[#fdfbf7] rounded-full">
                    <Search className="w-3 h-3" />
                  </div>
                </div>
              </div>

              <span className="font-typewriter text-[11px] text-[#11100e] font-bold tracking-wide">
                {showAdvanced ? '[-] Close Settings' : '[+] Wire Verification'}
              </span>
            </div>
          </div>
        </div>

        {/* Verification Action Bar: Status on Left + RUN VERIFICATION Button on Right */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          {/* Left: Gemini & Grounding indicator */}
          <div className="flex items-center space-x-2 font-typewriter text-xs text-[#11100e]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#11100e] inline-block" />
            <span className="font-bold text-[#11100e]">Gemini 3.7 Flash</span>
            <span className="text-[#78716c]">•</span>
            <span className="font-medium text-[#292524]">Live Google Search Grounding</span>
          </div>

          {/* Right: Bold Heavy RUN VERIFICATION Button */}
          <button
            type="submit"
            disabled={isLoading || (!inputText.trim() && !inputUrl.trim())}
            className="w-full sm:w-auto px-7 py-3 bg-[#faf5e8] hover:bg-[#11100e] text-[#11100e] hover:text-[#fdfbf7] border-2 border-[#11100e] font-headline font-black text-sm uppercase tracking-widest transition shadow-[3px_3px_0px_#11100e] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#11100e] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-center"
          >
            {isLoading ? 'ANALYZING WIRE DISPATCHES...' : 'RUN VERIFICATION'}
          </button>
        </div>

        {/* Advanced Drawer if Toggled */}
        {showAdvanced && (
          <div className="p-3.5 bg-[#f4eee1] border-2 border-[#1c1917] space-y-3 animate-fadeIn mt-2">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <label className="block text-[10px] font-typewriter font-bold uppercase tracking-wider text-[#1c1917] mb-1">
                  Custom Tavily API Key (Deep Web Search)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#78716c]">
                    <Key className="w-3.5 h-3.5" />
                  </div>
                  <input
                    type="password"
                    value={customTavilyKey}
                    onChange={(e) => setCustomTavilyKey(e.target.value)}
                    placeholder="tvly-xxxxxxxx (Gemini Search used by default)"
                    className="w-full pl-8 pr-3 py-1 bg-[#fdfbf7] border border-[#1c1917] font-typewriter text-xs text-[#1c1917]"
                  />
                </div>
              </div>

              <div className="w-full sm:w-48">
                <label className="block text-[10px] font-typewriter font-bold uppercase tracking-wider text-[#1c1917] mb-1">
                  Investigation Depth
                </label>
                <select
                  value={depth}
                  onChange={(e) => setDepth(e.target.value as 'standard' | 'deep')}
                  className="w-full px-2.5 py-1 bg-[#fdfbf7] border border-[#1c1917] font-typewriter text-xs text-[#1c1917]"
                >
                  <option value="standard">Standard Wire Verification</option>
                  <option value="deep">Exhaustive Cross-Registry</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </form>

      {/* Latest Briefs - 4 Column Broadsheet Grid */}
      <div className="pt-4 border-t-2 border-[#1c1917]">
        <h3 className="font-headline font-bold text-lg sm:text-xl text-[#1c1917] mb-3">
          Latest Briefs
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-y-2 border-[#1c1917] divide-y sm:divide-y-0 sm:divide-x-2 divide-[#1c1917] bg-[#fbf6ea]">
          {latestBriefs.map((brief, idx) => {
            const IconComponent = brief.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectBrief(brief.claim)}
                className="p-3 text-left hover:bg-[#f3e7d1] transition group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Category with Icon */}
                  <div className="flex items-center justify-between border-b border-[#1c1917]/20 pb-1 mb-2">
                    <span className="font-headline font-black text-xs sm:text-sm uppercase tracking-wider text-[#1c1917]">
                      {brief.category}
                    </span>
                    <IconComponent className="w-4 h-4 text-[#57534e] group-hover:text-[#1c1917] transition" />
                  </div>

                  {/* Title & Quote */}
                  <h4 className="font-headline font-bold text-xs text-[#1c1917] leading-snug line-clamp-2 mb-1">
                    {brief.title}
                  </h4>
                  <p className="font-body-news italic text-[11px] sm:text-xs text-[#57534e] leading-relaxed line-clamp-3">
                    {brief.quote}
                  </p>
                </div>

                <div className="mt-3 pt-1 border-t border-[#1c1917]/20 flex items-center justify-between text-[10px] font-typewriter text-[#78716c] group-hover:text-[#1c1917]">
                  <span>Click to Load</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
