import React from 'react';
import { X, ShieldCheck, Globe, Search, Cpu, CheckCircle2, Award } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[85vh] bg-[#121214] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0A0A0C]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Fact-Checking Methodology</h2>
              <p className="text-xs text-slate-400">
                Impartial AI Verification & Tier-1 Wire Corroboration Framework
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a1a1e] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300">
          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              <span>1. Automated Claim Extraction</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              When users input complex news articles, headlines, or URLs, Gemini isolates the primary empirical assertion that can be objectively proven or disproven.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>2. Multi-Tiered Source Classification</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 bg-[#0A0A0C] rounded-xl border border-sky-900/40">
                <span className="font-mono font-bold text-sky-400">Tier 1 — Primary Outlets & Wire Services:</span>
                <p className="text-slate-400 mt-0.5">Reuters, Associated Press (AP), Agence France-Presse (AFP), peer-reviewed scientific journals (Nature, Science), and official institutional registries (.gov / .edu).</p>
              </div>
              <div className="p-3 bg-[#0A0A0C] rounded-xl border border-indigo-900/40">
                <span className="font-mono font-bold text-indigo-400">Tier 2 — Mainstream Verified Media:</span>
                <p className="text-slate-400 mt-0.5">BBC, The New York Times, The Wall Street Journal, The Guardian, Financial Times, Bloomberg, and CNN with established editorial review.</p>
              </div>
              <div className="p-3 bg-[#0A0A0C] rounded-xl border border-white/5">
                <span className="font-mono font-bold text-slate-400">Tier 3 — Secondary / Independent / Blogs:</span>
                <p className="text-slate-500 mt-0.5">Unverified opinion pieces, social media posts, and aggregator websites lacking primary attribution.</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>3. Strict Scoring & Impartial Synthesis</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gemini acts as an impartial investigative journalist, returning one of four exact verdicts: <strong className="text-emerald-400">True</strong>, <strong className="text-rose-400">False</strong>, <strong className="text-amber-400">Misleading</strong>, or <strong className="text-slate-400">Unverifiable</strong>, paired with a calculated confidence percentage rounded to one decimal place.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0A0A0C] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono font-semibold text-white transition shadow-lg shadow-blue-900/30"
          >
            Acknowledge
          </button>
        </div>
      </div>
    </div>
  );
};
