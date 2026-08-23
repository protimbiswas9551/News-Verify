import React from 'react';
import { ShieldCheck, Code2, Sparkles, Globe, Terminal } from 'lucide-react';

interface NavbarProps {
  onOpenPythonModal: () => void;
  onOpenInfoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPythonModal,
  onOpenInfoModal,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0A0A0C]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-white/10">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
              <span className="font-bold text-base sm:text-lg text-white tracking-tight">VERIFY<span className="text-blue-400">_NEWS</span></span>
              <span className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                v2.4.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 uppercase tracking-widest hidden sm:block">
              Impartial Truth & Fact-Checking Engine
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#121214] border border-white/5 text-xs text-slate-300">
            <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
            <span className="font-mono text-xs text-emerald-400">GEMINI_FLASH_CONNECTED</span>
          </div>

          <button
            id="btn-python-script"
            onClick={onOpenPythonModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#121214] hover:bg-[#1a1a1e] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition shadow-sm"
            title="View Python Streamlit Source Code (app.py)"
          >
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Python <span className="text-amber-300">app.py</span></span>
          </button>

          <button
            id="btn-info-modal"
            onClick={onOpenInfoModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600/15 hover:bg-blue-600/25 border border-blue-500/30 text-xs font-medium text-blue-300 transition"
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Methodology</span>
          </button>
        </div>
      </div>
    </header>
  );
};

