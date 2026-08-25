import React from 'react';
import { Terminal, BookOpen } from 'lucide-react';
import mastheadFullBanner from '../assets/images/sahikya_full_masthead_1787668689249.jpg';

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
      {/* Full Top Medieval Engraved Masthead Banner with SahiKya, Dispatch, and Weather */}
      <div className="w-full border-b-2 border-[#1c1917] bg-[#f7f1e1] relative overflow-hidden flex items-center justify-center p-0">
        <img
          src={mastheadFullBanner}
          alt="SahiKya - The Impartial Truth & Fact-Checking Engine"
          referrerPolicy="no-referrer"
          className="w-full h-auto max-h-48 sm:max-h-56 md:max-h-64 lg:max-h-72 object-cover object-center select-none block"
        />
      </div>

      {/* Sub-bar with pills & actions */}
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



