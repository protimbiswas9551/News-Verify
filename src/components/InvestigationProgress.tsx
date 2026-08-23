import React, { useEffect, useState } from 'react';
import { Search, Globe, CheckCircle2, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

interface InvestigationProgressProps {
  claimText: string;
}

export const InvestigationProgress: React.FC<InvestigationProgressProps> = ({ claimText }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: 'Claim Deconstruction', desc: 'Isolating verifiable factual assertions and temporal context', icon: Cpu },
    { title: 'Live Wire & Web Retrieval', desc: 'Querying live news wires, primary databases, and web sources', icon: Globe },
    { title: 'Corroboration & Cross-Check', desc: 'Impartial cross-examination across Tier-1 and secondary reporting', icon: Search },
    { title: 'Verdict Synthesis', desc: 'Formulating objective reasoning and confidence scoring', icon: ShieldAlert },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full my-8 p-6 rounded-2xl bg-[#121214] border border-blue-500/30 text-white shadow-2xl animate-fadeIn">
      <div className="flex items-center space-x-3 mb-6">
        <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-blue-400 animate-spin" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-white flex items-center space-x-2">
            <span>Investigative Fact-Check in Progress</span>
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </h3>
          <p className="text-xs text-slate-400 truncate max-w-xl">
            Analyzing: <span className="text-blue-300 italic">"{claimText.slice(0, 80)}{claimText.length > 80 ? '...' : ''}"</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          const isDone = idx < activeStep;
          const isCurrent = idx === activeStep;

          return (
            <div
              key={idx}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                isCurrent
                  ? 'bg-blue-950/40 border-blue-500/60 shadow-lg shadow-blue-900/30 ring-1 ring-blue-500/50'
                  : isDone
                  ? 'bg-[#0A0A0C] border-emerald-500/40 opacity-90'
                  : 'bg-[#0A0A0C]/50 border-white/5 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className={`h-7 w-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    isDone
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isCurrent
                      ? 'bg-blue-500 text-white shadow-[0_0_8px_rgba(59,130,246,0.6)]'
                      : 'bg-[#1a1a1e] text-slate-400'
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className="text-[10px] font-mono text-slate-400">Step 0{idx + 1}</span>
              </div>
              <h4 className="text-xs font-semibold text-slate-200">{step.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
