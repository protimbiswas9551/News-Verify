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
      <div className="pt-5 pb-3 px-4 sm:px-8 border-b-2 border-[#11100e] bg-[#faf5e8]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left dateline box for desktop */}
          <div className="hidden lg:block w-56 shrink-0 text-left border-l-2 border-[#11100e] pl-3 py-1">
            <div className="text-[11px] font-typewriter text-[#3a3530] uppercase tracking-widest leading-relaxed font-bold">
              VOL. CXXVIII • NO. 44,102<br />
              LATE CITY EDITION • TWO CENTS
            </div>
          </div>

          {/* Central Authentic Masthead */}
          <div className="flex-1 text-center px-2">
            <h1 className="font-medieval text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#11100e] tracking-tight leading-none select-none py-1 drop-shadow-[1px_1px_0px_rgba(30,25,20,0.15)]">
              The SAhiKya Gazette.
            </h1>
            <div className="mt-1.5 flex items-center justify-center space-x-3">
              <span className="h-[1.5px] bg-[#11100e] flex-1 max-w-[100px] hidden sm:inline-block" />
              <p className="font-headline font-extrabold text-xs sm:text-sm md:text-base text-[#11100e] uppercase tracking-[0.25em] sm:tracking-[0.32em] whitespace-nowrap">
                IMPARTIAL TRUTH & FACT-CHECKING ENGINE
              </p>
              <span className="h-[1.5px] bg-[#11100e] flex-1 max-w-[100px] hidden sm:inline-block" />
            </div>
            <div className="text-center sm:text-right max-w-2xl mx-auto mt-0.5 sm:pr-4">
              <span className="text-[10px] font-typewriter text-[#57534e] uppercase tracking-widest font-bold">
                ESTABLISHED 1898
              </span>
            </div>
          </div>

          {/* Right Weather Forecast Ear Box */}
          <div className="w-full md:w-56 lg:w-64 shrink-0 border-2 border-[#11100e] bg-[#fbf6ea] p-2.5 text-center shadow-[2px_2px_0px_#11100e] relative">
            <div className="text-[#11100e]">
              <span className="font-headline font-bold text-xs uppercase tracking-wide block mb-0.5 border-b border-[#11100e]/20 pb-0.5">
                Today's Forecast
              </span>
              <span className="font-body-news italic block text-[#1a1816] text-xs leading-snug pt-0.5">
                &ldquo;100% chance I'm ignoring the weather report and wearing shorts in a blizzard.&rdquo;
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
