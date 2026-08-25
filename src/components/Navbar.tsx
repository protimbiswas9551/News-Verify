import React from 'react';
import { Newspaper, Terminal, BookOpen, ShieldCheck, Radio } from 'lucide-react';
import mastheadImage from '../assets/images/sahikya_masthead_1787667610971.jpg';

interface NavbarProps {
  onOpenPythonModal: () => void;
  onOpenInfoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPythonModal,
  onOpenInfoModal,
}) => {
  return (
    <header className="w-full bg-[#fdfbf7] border-b-2 border-[#1c1917] shadow-sm">
      {/* Top Medieval Masthead Title Banner seamlessly blended into the vintage broadsheet header */}
      <div className="border-b-2 border-[#1c1917] py-2 sm:py-3 px-3 sm:px-6 text-center bg-[#f7f1e1] relative overflow-hidden">
        {/* Subtle vintage newspaper issue dateline bar above */}
        <div className="max-w-6xl mx-auto flex items-center justify-between text-[10px] sm:text-xs font-typewriter text-[#57534e] border-b border-[#1c1917]/20 pb-1 mb-2 px-2 uppercase tracking-widest relative z-10">
          <span className="hidden sm:inline">VOL. CXXVIII • NO. 44,102</span>
          <span className="font-bold text-[#1c1917]">THE IMPARTIAL TRUTH & FACT-CHECKING GAZETTE</span>
          <span className="hidden sm:inline">LATE CITY EDITION • PRICE TWO CENTS</span>
        </div>

        {/* Full-bleed seamless Ornate Medieval Engraved Masthead Title */}
        <div className="relative w-full flex items-center justify-center py-1 sm:py-2">
          {/* Subtle parchment texture overlay behind image */}
          <div className="w-full max-w-5xl mx-auto flex items-center justify-center">
            <img
              src={mastheadImage}
              alt="SahiKya - Ornate Medieval Masthead"
              referrerPolicy="no-referrer"
              className="w-full h-auto max-h-36 sm:max-h-48 md:max-h-56 lg:max-h-64 object-cover object-center mix-blend-multiply select-none [mask-image:linear-gradient(to_right,transparent_0%,black_8%,black_92%,transparent_100%)] contrast-[1.12] brightness-[0.98]"
            />
          </div>
        </div>
      </div>

      {/* Sub-bar with pills & actions like the photo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: SahiKya Badge */}
        <div className="flex items-center space-x-2 px-2.5 py-1 bg-[#f4eee1] border border-[#1c1917] font-typewriter text-xs text-[#1c1917] shadow-[1px_1px_0px_#1c1917]">
          <div className="w-4 h-4 rounded-full bg-[#1c1917] text-[#fdfbf7] flex items-center justify-center font-bold text-[9px]">
            S
          </div>
          <span className="font-bold">• SAHIKYA</span>
          <span className="text-[10px] px-1 py-0.2 bg-[#1c1917] text-white font-mono">v2.4.0</span>
          <span className="hidden md:inline text-[#57534e]">IMPARTIAL TRUTH & FACT-CHECKING ENGINE</span>
        </div>

        {/* Right: Status and buttons */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#f0fdf4] border border-[#166534] text-[11px] font-typewriter text-[#15803d]">
            <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse" />
            <span className="font-bold">GEMINI_FLASH_CONNECTED</span>
          </div>

          <button
            id="btn-python-script"
            onClick={onOpenPythonModal}
            className="flex items-center space-x-1.5 px-3 py-1 bg-[#fcf9f2] hover:bg-[#efe6d5] border border-[#1c1917] text-xs font-typewriter font-bold text-[#1c1917] transition shadow-[2px_2px_0px_#1c1917] cursor-pointer"
            title="View Python Script (app.py)"
          >
            <Terminal className="w-3.5 h-3.5 text-[#854d0e]" />
            <span>&gt;_ Python app.py</span>
          </button>

          <button
            id="btn-info-modal"
            onClick={onOpenInfoModal}
            className="flex items-center space-x-1.5 px-3 py-1 bg-[#fdfbf7] hover:bg-[#efe6d5] border border-[#1c1917] text-[#1c1917] text-xs font-typewriter font-bold transition shadow-[2px_2px_0px_#1c1917] cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Methodology</span>
          </button>
        </div>
      </div>
    </header>
  );
};



