import React, { useState } from 'react';
import { X, Copy, Check, Download, FileText, Code } from 'lucide-react';
import { FactCheckResult } from '../types';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: FactCheckResult | null;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, result }) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'json'>('markdown');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !result) return null;

  const generateMarkdown = () => {
    return `# Fact-Check Investigation Report

**Date:** ${new Date().toLocaleDateString()}
**Status:** ${result.verdict.toUpperCase()}
**Truth Score:** ${result.truth_percentage}%
**Claim Analyzed:** "${result.claim_analyzed}"

---

## 1. Investigative Verdict
- **Verdict:** ${result.verdict}
- **Confidence Rating:** ${result.truth_percentage}%
- **Framing/Bias Classification:** ${result.bias_rating || 'N/A'}

## 2. Evidence & Reasoning
${result.reasoning}

## 3. Dependency & Source Credibility Analysis
${result.dependency_analysis}

## 4. Key Evidence Points
${
  result.key_evidence && result.key_evidence.length > 0
    ? result.key_evidence.map((e) => `- [${e.type.toUpperCase()}] ${e.point}`).join('\n')
    : '_No discrete evidence points listed._'
}

## 5. Verified Citations
${
  result.sources && result.sources.length > 0
    ? result.sources.map((s, idx) => `${idx + 1}. **${s.title}** (Tier ${s.domain_tier})\n   - URL: ${s.url}\n   - Excerpt: ${s.snippet || 'N/A'}`).join('\n\n')
    : '_No external citations recorded._'
}

---
*Report generated via VerifyNews AI with Gemini 3.7 & Live Google Search Grounding.*
`;
  };

  const markdownContent = generateMarkdown();
  const jsonContent = JSON.stringify(result, null, 2);
  const activeContent = activeTab === 'markdown' ? markdownContent : jsonContent;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const ext = activeTab === 'markdown' ? 'md' : 'json';
    const mime = activeTab === 'markdown' ? 'text/markdown' : 'application/json';
    const blob = new Blob([activeContent], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fact-check-report-${Date.now()}.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[85vh] bg-[#121214] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0A0A0C]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Export Investigation Report</h2>
              <p className="text-xs text-slate-400">
                Download or copy fact-check dossiers in standard journalism formats.
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

        {/* Tab Switcher */}
        <div className="px-6 py-3 border-b border-white/5 flex items-center space-x-2 bg-[#0A0A0C]">
          <button
            onClick={() => setActiveTab('markdown')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
              activeTab === 'markdown' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Markdown Dossier (.md)</span>
          </button>

          <button
            onClick={() => setActiveTab('json')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition ${
              activeTab === 'json' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-3.5 h-3.5" />
            <span>Raw JSON (.json)</span>
          </button>
        </div>

        {/* Content Viewer */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-[#050505] text-slate-300 select-all">
          <pre className="p-4 bg-[#0A0A0C] rounded-xl border border-white/5 whitespace-pre-wrap leading-relaxed">
            {activeContent}
          </pre>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0A0A0C] flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Ready for editorial desks & archiving
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#1a1a1e] hover:bg-[#25252c] border border-white/10 text-xs font-mono font-semibold text-white transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Content'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono font-semibold text-white shadow-lg shadow-blue-900/30 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
