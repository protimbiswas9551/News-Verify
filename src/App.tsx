import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VerificationInput } from './components/VerificationInput';
import { InvestigationProgress } from './components/InvestigationProgress';
import { VerdictDisplay } from './components/VerdictDisplay';
import { EvidenceSection } from './components/EvidenceSection';
import { SourcesGrid } from './components/SourcesGrid';
import { PythonScriptModal } from './components/PythonScriptModal';
import { ExportModal } from './components/ExportModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { FactCheckResult, SampleClaim } from './types';
import { AlertCircle, Sparkles, ShieldCheck, Newspaper, RefreshCw } from 'lucide-react';

export default function App() {
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentClaimText, setCurrentClaimText] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [sampleClaims, setSampleClaims] = useState<SampleClaim[]>([]);
  const [history, setHistory] = useState<FactCheckResult[]>([]);

  // Modals
  const [isPythonModalOpen, setIsPythonModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);

  // Load samples & history on mount
  useEffect(() => {
    fetch('/api/sample-claims')
      .then((res) => res.json())
      .then((data) => {
        if (data?.samples) setSampleClaims(data.samples);
      })
      .catch((err) => console.warn('Failed to load sample claims:', err));

    try {
      const savedHistory = localStorage.getItem('verify_news_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.warn('Could not parse history:', e);
    }
  }, []);

  const handleVerify = async (data: {
    text: string;
    url?: string;
    customTavilyKey?: string;
    depth?: 'standard' | 'deep';
  }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentClaimText(data.text);

    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || `Server responded with status ${res.status}`);
      }

      setResult(json);

      // Update history in state and localStorage
      setHistory((prev) => {
        const updated = [json, ...prev.filter((item) => item.claim_analyzed !== json.claim_analyzed)].slice(0, 10);
        try {
          localStorage.setItem('verify_news_history', JSON.stringify(updated));
        } catch (e) {
          console.warn('Storage failed:', e);
        }
        return updated;
      });

      // Smooth scroll down to results
      setTimeout(() => {
        document.getElementById('verification-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Verification error:', err);
      let msg = err.message || 'An error occurred while verifying the claim.';
      if (msg.includes('429') || msg.includes('RESOURCE_EXHAUSTED') || msg.includes('quota')) {
        msg = 'Gemini API rate limit reached (HTTP 429). The system tried to back off, but quota is temporarily limited. Please wait 15–30 seconds and retry.';
      }
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetryLast = () => {
    if (currentClaimText) {
      handleVerify({ text: currentClaimText });
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('verify_news_history');
    } catch (e) {}
  };

  return (
    <div className="min-h-screen bg-[#0A0A0C] text-slate-200 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
        onOpenInfoModal={() => setIsHowItWorksOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Newsroom Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_rgba(96,165,250,0.8)]" />
            <span>AI OSINT & FACT-CHECKING PLATFORM</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
            News Verification & Fact-Checking
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-3xl leading-relaxed">
            Cross-examine any news claim, article excerpt, or URL against live web reports, Tier-1 wire services (Reuters, AP), and peer-reviewed sources using Gemini 3.7 with real-time search grounding.
          </p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm animate-fadeIn shadow-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-mono text-xs uppercase tracking-wider font-semibold text-rose-300">Investigation Notice:</span>
                <p className="text-xs text-rose-200">{errorMessage}</p>
              </div>
            </div>
            {currentClaimText && (
              <button
                type="button"
                onClick={handleRetryLast}
                disabled={isLoading}
                className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-rose-900/50 hover:bg-rose-800/60 border border-rose-500/40 text-xs font-mono font-semibold text-rose-200 hover:text-white transition cursor-pointer shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Retry Verification</span>
              </button>
            )}
          </div>
        )}

        {/* Input Station */}
        <VerificationInput
          onVerify={handleVerify}
          isLoading={isLoading}
          sampleClaims={sampleClaims}
        />

        {/* Loading Progress State */}
        {isLoading && <InvestigationProgress claimText={currentClaimText} />}

        {/* Results Station */}
        {result && !isLoading && (
          <div id="verification-results" className="space-y-8 animate-fadeIn pt-4">
            {/* Primary Verdict & Truth Gauge */}
            <VerdictDisplay
              result={result}
              onExportMarkdown={() => setIsExportModalOpen(true)}
              onExportJSON={() => setIsExportModalOpen(true)}
            />

            {/* Key Evidence Breakdown */}
            {result.key_evidence && result.key_evidence.length > 0 && (
              <EvidenceSection evidenceList={result.key_evidence} />
            )}

            {/* Sources & Citations Tier Grid */}
            <SourcesGrid sources={result.sources} />
          </div>
        )}

        {/* Recent Investigations History Drawer */}
        {history.length > 0 && (
          <HistoryDrawer
            history={history}
            onSelectResult={(selected) => {
              setResult(selected);
              setTimeout(() => {
                document.getElementById('verification-results')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            onClearHistory={handleClearHistory}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#0A0A0C] mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 font-mono text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>VerifyNews AI • Gemini 3.7 + Live Search Grounding</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-[11px]">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="hover:text-slate-300 transition"
            >
              Methodology
            </button>
            <button
              onClick={() => setIsPythonModalOpen(true)}
              className="hover:text-amber-400 text-slate-400 transition"
            >
              Python app.py
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PythonScriptModal
        isOpen={isPythonModalOpen}
        onClose={() => setIsPythonModalOpen(false)}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        result={result}
      />

      <HowItWorksModal
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
}
