import React from 'react';
import { KeyEvidence } from '../types';
import { CheckCircle2, XCircle, Info, Sparkles } from 'lucide-react';

interface EvidenceSectionProps {
  evidenceList?: KeyEvidence[];
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({ evidenceList }) => {
  if (!evidenceList || evidenceList.length === 0) return null;

  return (
    <div className="w-full rounded-2xl bg-[#121214] border border-white/5 p-6 text-white space-y-4 shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200">
            Key Investigative Evidence & Findings
          </h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">
          {evidenceList.length} Key Finding{evidenceList.length > 1 ? 's' : ''}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {evidenceList.map((item, idx) => {
          const isSupporting = item.type === 'supporting';
          const isRefuting = item.type === 'refuting';

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition flex items-start space-x-3 ${
                isSupporting
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-100'
                  : isRefuting
                  ? 'bg-rose-950/20 border-rose-500/30 text-rose-100'
                  : 'bg-[#0A0A0C] border-white/5 text-slate-200'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isSupporting && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                {isRefuting && <XCircle className="w-4 h-4 text-rose-400" />}
                {!isSupporting && !isRefuting && <Info className="w-4 h-4 text-blue-400" />}
              </div>
              <div className="space-y-1 flex-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                      isSupporting
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isRefuting
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    {item.type}
                  </span>
                  {item.source_title && (
                    <span className="text-[10px] font-mono text-slate-400 truncate max-w-[140px]">
                      {item.source_title}
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-0.5">
                  {item.point}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
