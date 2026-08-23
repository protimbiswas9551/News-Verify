import React, { useState } from 'react';
import { SourceItem } from '../types';
import { ExternalLink, Globe, ShieldCheck, Newspaper, FileText, CheckCircle } from 'lucide-react';

interface SourcesGridProps {
  sources: SourceItem[];
}

export const SourcesGrid: React.FC<SourcesGridProps> = ({ sources }) => {
  const [selectedTier, setSelectedTier] = useState<'all' | '1' | '2' | '3'>('all');

  if (!sources || sources.length === 0) {
    return (
      <div className="w-full rounded-2xl skeuo-card p-6 text-center text-slate-400">
        <Globe className="w-8 h-8 mx-auto text-slate-600 mb-2" />
        <p className="text-sm">No external citations found for this claim.</p>
      </div>
    );
  }

  const filteredSources = sources.filter((s) => {
    if (selectedTier === 'all') return true;
    return String(s.domain_tier) === selectedTier;
  });

  const tier1Count = sources.filter((s) => s.domain_tier === 1).length;
  const tier2Count = sources.filter((s) => s.domain_tier === 2).length;
  const tier3Count = sources.filter((s) => s.domain_tier === 3).length;

  const getTierBadge = (tier: 1 | 2 | 3) => {
    switch (tier) {
      case 1:
        return {
          label: 'Tier 1 • Wire / Primary',
          colorClass: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
          icon: ShieldCheck,
        };
      case 2:
        return {
          label: 'Tier 2 • Mainstream Verified',
          colorClass: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
          icon: Newspaper,
        };
      case 3:
      default:
        return {
          label: 'Tier 3 • Secondary / Blog',
          colorClass: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
          icon: FileText,
        };
    }
  };

  return (
    <div className="w-full rounded-2xl bg-[#121214] border border-white/5 p-6 text-white space-y-5 shadow-2xl">
      {/* Header & Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center space-x-2">
            <Globe className="w-4 h-4 text-blue-400" />
            <span>Verified Sources & Evidence Citations</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Classified by institutional authority and editorial standards
          </p>
        </div>

        {/* Tier filter tabs */}
        <div className="flex items-center space-x-1 p-1 bg-[#050505] rounded-xl border border-white/10 text-xs">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition ${
              selectedTier === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({sources.length})
          </button>
          <button
            onClick={() => setSelectedTier('1')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition ${
              selectedTier === '1' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier 1 ({tier1Count})
          </button>
          <button
            onClick={() => setSelectedTier('2')}
            className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition ${
              selectedTier === '2' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tier 2 ({tier2Count})
          </button>
          {tier3Count > 0 && (
            <button
              onClick={() => setSelectedTier('3')}
              className={`px-2.5 py-1 rounded-lg font-mono text-[11px] font-semibold transition ${
                selectedTier === '3' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tier 3 ({tier3Count})
            </button>
          )}
        </div>
      </div>

      {/* Grid of Clickable Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSources.map((source, idx) => {
          const badge = getTierBadge(source.domain_tier);
          const BadgeIcon = badge.icon;
          let hostname = source.publisher;
          if (!hostname) {
            try {
              hostname = new URL(source.url).hostname.replace('www.', '');
            } catch {
              hostname = 'Web Citation';
            }
          }

          return (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-4 rounded-xl bg-[#0A0A0C] hover:bg-[#16161a] border border-white/5 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between space-y-3 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`inline-flex items-center space-x-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badge.colorClass}`}>
                    <BadgeIcon className="w-3 h-3" />
                    <span>{badge.label}</span>
                  </span>

                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-blue-300 transition flex items-center space-x-1">
                    <span>{hostname}</span>
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
                  </span>
                </div>

                <h4 className="text-sm font-semibold text-slate-100 group-hover:text-blue-300 transition line-clamp-2 leading-snug">
                  {source.title || source.url}
                </h4>

                {source.snippet && (
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {source.snippet}
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <span className="truncate max-w-[200px]">{source.url}</span>
                <span className="text-blue-400 font-medium group-hover:underline flex items-center space-x-0.5">
                  <span>Read Article</span>
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};
