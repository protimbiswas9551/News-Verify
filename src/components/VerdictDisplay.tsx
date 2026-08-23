import React from 'react';
import { FactCheckResult, VerdictType } from '../types';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Shield,
  Layers,
  Sparkles,
  Share2,
  Download,
  Copy,
  Check,
  Award
} from 'lucide-react';

interface VerdictDisplayProps {
  result: FactCheckResult;
  onExportMarkdown: () => void;
  onExportJSON: () => void;
}

export const VerdictDisplay: React.FC<VerdictDisplayProps> = ({
  result,
  onExportMarkdown,
  onExportJSON,
}) => {
  const [copied, setCopied] = React.useState(false);

  const getVerdictTheme = (verdict: VerdictType) => {
    switch (verdict) {
      case 'True':
        return {
          stampClass: 'verdict-stamp-true',
          badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
          accentColor: '#10b981',
          progressColor: 'bg-emerald-500',
          icon: CheckCircle2,
          headline: 'VERIFIED TRUE',
          subtitle: 'Corroborated by primary documentation and Tier-1 wire reporting.',
        };
      case 'False':
        return {
          stampClass: 'verdict-stamp-false',
          badgeBg: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
          accentColor: '#f43f5e',
          progressColor: 'bg-rose-500',
          icon: XCircle,
          headline: 'VERIFIED FALSE',
          subtitle: 'Directly contradicted by empirical data, official sources, and fact-checking records.',
        };
      case 'Misleading':
        return {
          stampClass: 'verdict-stamp-misleading',
          badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
          accentColor: '#f59e0b',
          progressColor: 'bg-amber-500',
          icon: AlertTriangle,
          headline: 'MISLEADING / DECONTEXTUALIZED',
          subtitle: 'Contains a grain of truth but distorts timeline, causation, or key caveats.',
        };
      case 'Unverifiable':
      default:
        return {
          stampClass: 'verdict-stamp-unverifiable',
          badgeBg: 'bg-slate-500/10 text-slate-400 border-slate-500/30',
          accentColor: '#94a3b8',
          progressColor: 'bg-slate-500',
          icon: HelpCircle,
          headline: 'UNVERIFIABLE',
          subtitle: 'Insufficient primary evidence or conflicting unverifiable accounts at this time.',
        };
    }
  };

  const theme = getVerdictTheme(result.verdict);
  const VerdictIcon = theme.icon;
  const truthPct = typeof result.truth_percentage === 'number' ? result.truth_percentage.toFixed(1) : '50.0';

  const handleCopySummary = () => {
    const text = `🔍 Fact-Check Verdict: ${result.verdict.toUpperCase()} (${truthPct}% Confidence)\n\nClaim: "${result.claim_analyzed}"\n\nReasoning: ${result.reasoning}\n\nDependency Analysis: ${result.dependency_analysis}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl bg-[#121214] border border-white/10 p-6 sm:p-8 text-white space-y-6 shadow-2xl animate-fadeIn">
      {/* Top Bar: Analyzed Header & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/5">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
              Investigation Report
            </span>
            {result.bias_rating && (
              <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-[#1a1a1e] text-slate-300 rounded border border-white/10">
                {result.bias_rating}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-referenced with live web citations • {result.search_method_used || 'Google Search Grounding'}
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            id="btn-copy-summary"
            onClick={handleCopySummary}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1e] hover:bg-[#222228] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition"
            title="Copy concise verdict text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            id="btn-export-markdown"
            onClick={onExportMarkdown}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#1a1a1e] hover:bg-[#222228] border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Claim Analysed Box */}
      <div className="p-4 rounded-xl bg-[#0A0A0C] border border-white/5 shadow-inner">
        <div className="flex items-center space-x-2 text-[11px] font-mono font-semibold text-blue-400 mb-1.5 uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Core Claim Analyzed</span>
        </div>
        <p className="text-base sm:text-lg font-medium text-slate-100 leading-relaxed">
          "{result.claim_analyzed}"
        </p>
      </div>

      {/* Main Verdict & Truth Percentage Skeuomorphic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Big Skeuomorphic Stamp */}
        <div className={`lg:col-span-2 p-6 rounded-2xl ${theme.stampClass} flex flex-col justify-between transition-all duration-300`}>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-80">
                Official Investigative Verdict
              </span>
              <div className="p-1.5 rounded-lg bg-black/20 backdrop-blur-sm border border-white/10">
                <VerdictIcon className="w-6 h-6" />
              </div>
            </div>

            <div className="mt-4 mb-2">
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                {theme.headline}
              </h2>
              <p className="text-sm opacity-90 mt-1 max-w-xl leading-relaxed">
                {theme.subtitle}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <span className="opacity-75">Classification: {result.verdict}</span>
            <span className="font-semibold px-2.5 py-0.5 rounded-full bg-black/30 border border-white/10">
              Confidence: {truthPct}%
            </span>
          </div>
        </div>

        {/* Right Col: Truth Gauge & Metric Widget */}
        <div className="p-6 rounded-2xl bg-[#16161a] border border-white/5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono font-semibold text-slate-400 mb-4 tracking-wider">
              <span>TRUTH CONFIDENCE</span>
              <Award className="w-4 h-4 text-blue-400" />
            </div>

            <div className="flex items-baseline space-x-2">
              <span className="text-4xl sm:text-5xl font-mono font-black text-white tracking-tight">
                {truthPct}
              </span>
              <span className="text-xl font-mono font-bold text-slate-400">%</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="mt-4 w-full bg-[#0A0A0C] h-3 rounded-full overflow-hidden border border-white/5 p-0.5">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${theme.progressColor}`}
                style={{ width: `${Math.min(Math.max(Number(truthPct), 3), 100)}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-2">
              <span>0% (Refuted)</span>
              <span>50% (Uncertain)</span>
              <span>100% (Confirmed)</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/5">
            <div className="text-[11px] text-slate-400">
              Corroboration Score based on wire service consensus and empirical records.
            </div>
          </div>
        </div>
      </div>

      {/* Impartial Reasoning */}
      <div className="p-5 sm:p-6 rounded-xl bg-[#0A0A0C] border border-white/5 space-y-2 shadow-inner">
        <div className="flex items-center space-x-2 text-[11px] font-mono font-semibold text-slate-300 uppercase tracking-wider">
          <Shield className="w-4 h-4 text-blue-400" />
          <span>Investigative Reasoning & Evidence Summary</span>
        </div>
        <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
          {result.reasoning}
        </p>
      </div>

      {/* Dependency Analysis */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#0A0A0C] border border-white/5 flex items-start space-x-3 shadow-inner">
        <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0 mt-0.5">
          <Layers className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <h4 className="text-[11px] font-mono font-bold text-slate-200 uppercase tracking-wide">
            Source Dependency & Credibility Evaluation
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            {result.dependency_analysis}
          </p>
        </div>
      </div>
    </div>
  );
};
