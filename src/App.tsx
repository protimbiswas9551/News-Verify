import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VerificationInput } from './components/VerificationInput';
import { FactCheckBulletin } from './components/FactCheckBulletin';
import { InvestigationProgress } from './components/InvestigationProgress';
import { VerdictDisplay } from './components/VerdictDisplay';
import { EvidenceSection } from './components/EvidenceSection';
import { SourcesGrid } from './components/SourcesGrid';
import { PythonScriptModal } from './components/PythonScriptModal';
import { ExportModal } from './components/ExportModal';
import { HowItWorksModal } from './components/HowItWorksModal';
import { HistoryDrawer } from './components/HistoryDrawer';
import { NewspaperTextureOverlay } from './components/NewspaperTextureOverlay';
import { FactCheckResult, SampleClaim } from './types';
import { AlertTriangle, Newspaper, Radio, RefreshCw } from 'lucide-react';

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
    <div className="min-h-screen bg-[#ede3d0] text-[#1c1917] flex flex-col selection:bg-[#1c1917] selection:text-[#fdfbf7] relative overflow-x-hidden">
      {/* Authentic multi-layer newspaper broadsheet texture overlay */}
      <NewspaperTextureOverlay />

      {/* Top Navigation Bar with Masthead */}
      <div className="relative z-10">
        <Navbar
          onOpenPythonModal={() => setIsPythonModalOpen(true)}
          onOpenInfoModal={() => setIsHowItWorksOpen(true)}
        />
      </div>

      {/* Retro Teletype Wire Ticker */}
      <div className="relative z-10 w-full bg-[#1c1917] text-[#f5f5f4] border-b-2 border-[#1c1917] py-1.5 overflow-hidden shadow-inner">
        <div className="ticker-wrap max-w-7xl mx-auto px-4 text-xs font-typewriter tracking-wide flex items-center">
          <div className="flex items-center space-x-2 shrink-0 bg-[#b91c1c] text-white px-2 py-0.5 mr-3 uppercase font-bold text-[10px]">
            <Radio className="w-3 h-3 animate-pulse" />
            <span>WIRE TICKER</span>
          </div>
          <div className="ticker-move space-x-8 text-[#e7e5e4] text-[11px]">
            <span>◆ REUTERS DISPATCH: Global AI Verification Protocols Standardized For Wire Services</span>
            <span>◆ AP BULLETIN: James Webb Space Telescope Verifies Atmospheric Spectrometry On Exoplanets</span>
            <span>◆ FINANCIAL GAZETTE: Gold Bullion Crosses Historic Highs Amid Central Bank Accumulation</span>
            <span>◆ HEALTH CHRONICLE: Peer-Reviewed Lancet Meta-Analysis Disproves Viral Superfood Myth</span>
            <span>◆ TELETYPE NOTICE: Cross-Reference All Claims Against Primary Institutional Registries</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Newspaper Layout matching reference photo */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error / Wire Alert Notice */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-[#fef2f2] border-2 border-[#991b1b] text-[#7f1d1d] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm shadow-[4px_4px_0px_#991b1b] animate-fadeIn">
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

        {/* 2-Column Broadsheet Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Left Section: Input Desk, Progress & Full Dossier Results */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-6">
            {/* Input Station & Quick Test Scenarios */}
            <VerificationInput
              onVerify={handleVerify}
              isLoading={isLoading}
              sampleClaims={sampleClaims}
            />

            {/* Loading / Typesetting Progress State */}
            {isLoading && <InvestigationProgress claimText={currentClaimText} />}

            {/* Detailed Results Section */}
            {result && !isLoading && (
              <div id="verification-results" className="space-y-6 animate-fadeIn pt-2">
                {/* Primary Editorial Verdict Stamp & Reasoning Column */}
                <VerdictDisplay
                  result={result}
                  onExportMarkdown={() => setIsExportModalOpen(true)}
                  onExportJSON={() => setIsExportModalOpen(true)}
                />

                {/* Key Evidence Exhibits */}
                {result.key_evidence && result.key_evidence.length > 0 && (
                  <EvidenceSection evidenceList={result.key_evidence} />
                )}

                {/* Sources & Citations Classifieds */}
                <SourcesGrid sources={result.sources} />
              </div>
            )}
          </div>

          {/* Right Sidebar: FACT-CHECK BULLETIN with Recent Investigations & Rubber Stamps */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6 lg:sticky lg:top-6">
            <FactCheckBulletin
              history={history}
              isLoading={isLoading}
              onSelectResult={(selected) => {
                setResult(selected);
                setTimeout(() => {
                  document.getElementById('verification-results')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
          </div>
        </div>

        {/* Archived Editions Drawer */}
        {history.length > 0 && (
          <div className="mt-8">
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
          </div>
        )}
      </main>

      {/* Newspaper Footer */}
      <footer className="relative z-10 border-t-2 border-[#1c1917] bg-[#fcf8ee] mt-12 py-5 text-xs text-[#57534e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 font-typewriter text-[11px] text-[#1c1917]">
            <Newspaper className="w-4 h-4" />
            <span className="font-bold uppercase tracking-wider">The Daily Verifier Press</span>
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


