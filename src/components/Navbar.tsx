import React from 'react';
import { Newspaper, Terminal, BookOpen, Feather, Shield } from 'lucide-react';

interface NavbarProps {
  onOpenPythonModal: () => void;
  onOpenInfoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPythonModal,
  onOpenInfoModal,
}) => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="w-full bg-[#fdfbf7] border-b-2 border-[#1c1917] shadow-sm">
      {/* Top micro-bar: Edition, Date, Price */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 border-b border-[#78716c]/40 flex flex-wrap items-center justify-between text-[11px] font-typewriter text-[#44403c]">
        <div className="flex items-center space-x-3">
          <span className="font-bold tracking-wider uppercase text-[#1c1917]">Vol. CXXVIII • No. 42,809</span>
          <span className="hidden sm:inline text-[#a8a29e]">|</span>
          <span className="hidden sm:inline font-semibold">{currentDate}</span>
          <span className="hidden md:inline text-[#a8a29e]">|</span>
          <span className="hidden md:inline italic">"Truth Without Fear or Favor"</span>
        </div>

        <div className="flex items-center space-x-3 text-[10px]">
          <span className="px-2 py-0.5 border border-[#1c1917] bg-[#f4eee1] font-bold uppercase tracking-wider text-[#1c1917]">
            Late City Edition
          </span>
          <span className="hidden sm:inline text-[#78716c]">Price: Gratis / Open AI</span>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Newspaper Sub-Brand */}
        <div className="flex items-center space-x-3">
          <div className="h-8 w-8 rounded-none border-2 border-[#1c1917] bg-[#1c1917] text-[#fdfbf7] flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,0.8)]">
            <Newspaper className="w-4 h-4" />
          </div>
          <div>
            <span className="font-headline font-black text-lg tracking-tight text-[#1c1917] uppercase">
              The Daily Verifier
            </span>
            <span className="text-[10px] font-typewriter text-[#78716c] ml-2 hidden sm:inline-block">
              [OSINT Intelligence Bureau]
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 bg-[#f4eee1] border border-[#78716c] text-[11px] font-typewriter text-[#1c1917]">
            <span className="w-2 h-2 rounded-full bg-[#15803d] animate-pulse" />
            <span className="font-bold">TELEGRAPH: GEMINI 3.7 ONLINE</span>
          </div>

          <button
            id="btn-python-script"
            onClick={onOpenPythonModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#fcf9f2] hover:bg-[#efe6d5] border border-[#1c1917] text-xs font-typewriter font-bold text-[#1c1917] transition shadow-[2px_2px_0px_#1c1917] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
            title="View Python Streamlit Wire Code (app.py)"
          >
            <Terminal className="w-3.5 h-3.5 text-[#854d0e]" />
            <span>Wire Script <span className="underline">app.py</span></span>
          </button>

          <button
            id="btn-info-modal"
            onClick={onOpenInfoModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] text-xs font-typewriter font-bold transition shadow-[2px_2px_0px_#78716c] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Editorial Canon</span>
          </button>
        </div>
      </div>
    </header>
  );
};


