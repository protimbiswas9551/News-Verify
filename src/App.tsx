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
import { AlertTriangle, Newspaper, Radio, RefreshCw, Feather, CheckCircle2 } from 'lucide-react';

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
        msg = 'Wire service quota limit reached (HTTP 429). The system tried to back off, but quota is temporarily limited. Please wait 15–30 seconds and retry.';
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
    <div className="min-h-screen bg-[#f4eee1] text-[#1c1917] flex flex-col selection:bg-[#1c1917] selection:text-[#fdfbf7]">
      {/* Top Navigation */}
      <Navbar
        onOpenPythonModal={() => setIsPythonModalOpen(true)}
        onOpenInfoModal={() => setIsHowItWorksOpen(true)}
      />

      {/* Retro Wire Ticker Tape */}
      <div className="w-full bg-[#1c1917] text-[#f5f5f4] border-b border-[#44403c] py-1.5 overflow-hidden">
        <div className="ticker-wrap max-w-7xl mx-auto px-4 text-xs font-typewriter tracking-wide flex items-center">
          <div className="flex items-center space-x-2 shrink-0 bg-[#b91c1c] text-white px-2 py-0.5 mr-3 uppercase font-bold text-[10px]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>WIRE TICKER</span>
          </div>
          <div className="ticker-move space-x-8 text-[#e7e5e4] text-[11px]">
            <span>◆ REUTERS CABLE: Global AI Verification Protocol Adopted By 40 Editorial Desks</span>
            <span>◆ AP BULLETIN: Exoplanet Atmosphere Water Vapor Confirmed By Orbital Spectrometry</span>
            <span>◆ FINANCIAL GAZETTE: Gold Bullion Crosses Historic Highs Amid Central Bank Accumulation</span>
            <span>◆ HEALTH CHRONICLE: Peer-Reviewed Lancet Meta-Analysis Disproves Viral Superfood Myth</span>
            <span>◆ TELETYPE NOTICE: Cross-Reference Your Rumors Against Primary Institutional Records</span>
          </div>
        </div>
      </div>

      {/* Main Newspaper Broadsheet Sheet */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Authentic Newspaper Masthead Banner */}
        <div className="newsprint-paper p-6 sm:p-8 text-center space-y-4">
          <div className="flex items-center justify-between border-b-2 border-[#1c1917] pb-2 text-xs font-typewriter uppercase tracking-wider text-[#44403c]">
            <span className="hidden sm:inline">"All The Facts Fit To Verify"</span>
            <span className="font-bold text-[#1c1917]">ESTABLISHED MMXXVI</span>
            <span className="hidden sm:inline">SPECIAL INVESTIGATIVE EDITION</span>
          </div>

          <div className="py-2">
            <h1 className="font-headline font-black text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#1c1917] uppercase">
              The Daily Verifier
            </h1>
            <div className="flex items-center justify-center space-x-3 my-2 text-[#78716c]">
              <span className="h-[1px] w-12 sm:w-24 bg-[#1c1917]" />
              <span className="font-typewriter text-xs sm:text-sm tracking-widest uppercase font-bold text-[#1c1917]">
                The International Fact-Checking & OSINT Gazette
              </span>
              <span className="h-[1px] w-12 sm:w-24 bg-[#1c1917]" />
            </div>
          </div>

          <div className="border-newspaper-double py-2.5 px-4 text-center">
            <p className="font-body-news text-sm sm:text-base text-[#292524] italic max-w-3xl mx-auto leading-relaxed">
              Cross-examining statements, breaking wire cables, articles, and rumors against primary archives, institutional databases, and Tier-1 wire services through Gemini 3.7 with live web search grounding.
            </p>
          </div>
        </div>

        {/* Error / Wire Alert Notice */}
        {errorMessage && (
          <div className="p-4 bg-[#fef2f2] border-2 border-[#991b1b] text-[#7f1d1d] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm shadow-[3px_3px_0px_#991b1b] animate-fadeIn">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-[#991b1b] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-typewriter text-xs uppercase tracking-wider font-bold text-[#991b1b]">
                  [DISPATCH TRANSMISSION NOTICE]:
                </span>
                <p className="font-body-news text-sm text-[#7f1d1d]">{errorMessage}</p>
              </div>
            </div>
            {currentClaimText && (
              <button
                type="button"
                onClick={handleRetryLast}
                disabled={isLoading}
                className="self-start sm:self-auto flex items-center space-x-1.5 px-3 py-1.5 bg-[#991b1b] text-white border border-[#7f1d1d] text-xs font-typewriter font-bold hover:bg-[#7f1d1d] transition cursor-pointer shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                <span>Re-transmit Inquiry</span>
              </button>
            )}
          </div>
        )}

        {/* Input Station: The Wireroom Desk */}
        <VerificationInput
          onVerify={handleVerify}
          isLoading={isLoading}
          sampleClaims={sampleClaims}
        />

        {/* Loading / Typesetting Progress State */}
        {isLoading && <InvestigationProgress claimText={currentClaimText} />}

        {/* Results Section: The Front Page Dossier */}
        {result && !isLoading && (
          <div id="verification-results" className="space-y-6 animate-fadeIn pt-2">
            {/* Primary Editorial Verdict Stamp & Column */}
            <VerdictDisplay
              result={result}
              onExportMarkdown={() => setIsExportModalOpen(true)}
              onExportJSON={() => setIsExportModalOpen(true)}
            />

            {/* Key Evidence Affidavits */}
            {result.key_evidence && result.key_evidence.length > 0 && (
              <EvidenceSection evidenceList={result.key_evidence} />
            )}

            {/* Sources & Citations Classifieds */}
            <SourcesGrid sources={result.sources} />
          </div>
        )}

        {/* Archived Editions Drawer */}
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

      {/* Newspaper Footer */}
      <footer className="border-t-2 border-[#1c1917] bg-[#fdfbf7] mt-12 py-6 text-xs text-[#57534e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 font-typewriter text-[11px] text-[#1c1917]">
            <Newspaper className="w-4 h-4" />
            <span className="font-bold">THE DAILY VERIFIER PRESS</span>
            <span className="text-[#a8a29e]">•</span>
            <span>Gemini 3.7 & Real-Time Google Search Grounding</span>
          </div>

          <div className="flex items-center space-x-4 font-typewriter text-[11px] text-[#44403c]">
            <button
              onClick={() => setIsHowItWorksOpen(true)}
              className="hover:text-[#1c1917] underline decoration-[#a8a29e] transition cursor-pointer"
            >
              Editorial Methodology
            </button>
            <button
              onClick={() => setIsPythonModalOpen(true)}
              className="hover:text-[#854d0e] font-bold text-[#854d0e] transition cursor-pointer"
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

