import React from 'react';
import { History, X, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';
import { FactCheckResult } from '../types';

interface HistoryDrawerProps {
  history: FactCheckResult[];
  onSelectResult: (result: FactCheckResult) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  history,
  onSelectResult,
  onClearHistory,
}) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="w-full rounded-2xl bg-[#121214] border border-white/5 p-5 text-white space-y-4 shadow-2xl">
      <div className="flex items-center justify-between pb-3 border-b border-white/5">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Recent Investigations ({history.length})
          </h3>
        </div>

        <button
          onClick={onClearHistory}
          className="flex items-center space-x-1 font-mono text-[11px] text-slate-500 hover:text-rose-400 transition"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear History</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {history.map((item, idx) => {
          const isTrue = item.verdict === 'True';
          const isFalse = item.verdict === 'False';
          const isMisleading = item.verdict === 'Misleading';

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelectResult(item)}
              className="p-3.5 rounded-xl bg-[#0A0A0C] hover:bg-[#16161a] border border-white/5 hover:border-white/20 text-left transition group flex flex-col justify-between space-y-2 shadow-lg"
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded border ${
                    isTrue
                      ? 'bg-emerald-950/40 text-emerald-300 border-emerald-500/30'
                      : isFalse
                      ? 'bg-rose-950/40 text-rose-300 border-rose-500/30'
                      : isMisleading
                      ? 'bg-amber-950/40 text-amber-300 border-amber-500/30'
                      : 'bg-slate-900/40 text-slate-300 border-slate-500/30'
                  }`}
                >
                  {item.verdict} • {item.truth_percentage}%
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 transition" />
              </div>

              <p className="text-xs text-slate-200 line-clamp-2 font-medium">
                "{item.claim_analyzed}"
              </p>

              <span className="text-[10px] font-mono text-slate-500">
                {item.sources?.length || 0} citations • {item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recent'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
