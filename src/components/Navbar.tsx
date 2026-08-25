import React from 'react';
import { Terminal, BookOpen, Radio, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenPythonModal: () => void;
  onOpenInfoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPythonModal,
  onOpenInfoModal,
}) => {
  return (
    <header className="w-full text-[#1c1917] relative select-none">
      {/* Top Broadsheet Masthead Block */}
      <div className="pt-4 pb-2 px-4 sm:px-8 border-b-2 border-[#1c1917] relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Empty spacer on left for desktop balance (or subtle issue tag) */}
          <div className="hidden lg:block w-52 shrink-0 text-left">
            <div className="text-[10px] font-typewriter text-[#78716c] uppercase tracking-widest leading-tight">
              VOL. CXXVIII • NO. 44,102<br />
              LATE CITY EDITION • TWO CENTS
            </div>
          </div>

          {/* Central Authentic Gothic Masthead */}
          <div className="flex-1 text-center px-2">
            <h1 className="font-medieval text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-[#1c1917] tracking-tight leading-none drop-shadow-[1px_2px_0px_rgba(40,30,20,0.25)] select-none py-1">
              The SAhiKya Gazette.
            </h1>
            <div className="mt-1 flex items-center justify-center space-x-2">
              <span className="h-px bg-[#1c1917]/40 flex-1 max-w-[80px] hidden sm:inline-block" />
              <p className="font-headline font-black text-xs sm:text-sm md:text-base lg:text-lg text-[#1c1917] uppercase tracking-[0.25em] sm:tracking-[0.35em] whitespace-nowrap">
                IMPARTIAL TRUTH & FACT-CHECKING ENGINE
              </p>
              <span className="h-px bg-[#1c1917]/40 flex-1 max-w-[80px] hidden sm:inline-block" />
            </div>
            <div className="text-right max-w-2xl mx-auto -mt-1 pr-2">
              <span className="text-[9px] sm:text-[10px] font-typewriter text-[#78716c] uppercase tracking-widest font-semibold">
                ESTABLISHED 1898
              </span>
            </div>
          </div>

          {/* Right Weather Forecast Distressed Ear Box */}
          <div className="w-full md:w-56 lg:w-60 shrink-0 border-2 border-[#1c1917] bg-[#fbf6ea]/95 p-2.5 text-center shadow-[2px_2px_0px_#1c1917] relative">
            <div className="font-headline text-xs sm:text-[13px] text-[#1c1917] leading-snug">
              <span className="font-bold block mb-0.5">Today's forecast:</span>
              <span className="italic block text-[#292524] text-[11px] sm:text-xs">
                100% chance I'm ignoring the weather report and wearing shorts in a blizzard.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Segmented Sub-Nav Bar with Cells */}
      <div className="border-b-2 border-[#1c1917] bg-[#f5ecda] text-xs font-typewriter font-bold text-[#1c1917]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x-2 divide-[#1c1917] border-x-0 md:border-x-2 border-[#1c1917]">
          {/* Cell 1: SahiKya Engine Brand */}
          <div className="md:col-span-5 px-3 py-1.5 flex items-center space-x-2 justify-center md:justify-start">
            <span className="w-4 h-4 rounded-full bg-[#1c1917] text-[#fdfbf7] flex items-center justify-center text-[10px] font-bold">
              P
            </span>
            <span className="tracking-wider uppercase text-[11px]">
              SAHIKYA <span className="bg-[#1c1917] text-white px-1 py-0.2 text-[9px] rounded-xs">s.e.a. 6</span> IMPARTIAL TRUTH & FACT-CHECKING ENGINE
            </span>
          </div>

          {/* Cell 2: Telegraph Line */}
          <div className="md:col-span-3 px-3 py-1.5 flex items-center justify-center space-x-2 text-[11px] text-[#44403c]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="uppercase tracking-wide">
              TELEGRAPH LINE: <strong className="text-[#1c1917]">Gemini Flash Connected</strong>
            </span>
          </div>

          {/* Cell 3: Python app.py Button */}
          <button
            type="button"
            onClick={onOpenPythonModal}
            className="md:col-span-2 px-3 py-1.5 flex items-center justify-center space-x-1.5 bg-[#f0e4d0] hover:bg-[#e4d4bd] transition cursor-pointer text-[11px] font-mono text-[#1c1917]"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>&gt;_ - Python app.py</span>
          </button>

          {/* Cell 4: Methodology Button */}
          <button
            type="button"
            onClick={onOpenInfoModal}
            className="md:col-span-2 px-3 py-1.5 flex items-center justify-center space-x-1.5 bg-[#f0e4d0] hover:bg-[#e4d4bd] transition cursor-pointer text-[11px] font-typewriter uppercase text-[#1c1917]"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>METHODOLOGY</span>
          </button>
        </div>
      </div>

      {/* Wire Ticker Strip underneath */}
      <div className="border-b-2 border-[#1c1917] bg-[#f9f4ea] py-1 px-3 text-[11px] font-typewriter text-[#44403c] overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="ticker-wrap w-full overflow-hidden flex items-center">
            <div className="ticker-move space-x-8 text-[#1c1917]">
              <span>★ Verified fact-checking protocols Standardized for Wire Services</span>
              <span>• AP BULLETIN: James Webb Space Telescope Verifies Atmospheric Spectrometry On Exoplanets</span>
              <span>• FINANCIAL GAZETTE: Gold Bullion Crosses Historic Highs Amid Central Bank Accumulation</span>
              <span>• HEALTH CHRONICLE: Peer-Reviewed Lancet Meta-Analysis Disproves Viral Superfood Myth</span>
              <span>• TELETYPE NOTICE: Cross-Reference All Claims Against Primary Institutional Registries</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
