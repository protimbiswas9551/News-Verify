import React, { useState } from 'react';
import { X, Copy, Check, Download, Terminal, Play, AlertCircle } from 'lucide-react';
import { STREAMLIT_APP_CODE } from '../pythonCode';

interface PythonScriptModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PythonScriptModal: React.FC<PythonScriptModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(STREAMLIT_APP_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([STREAMLIT_APP_CODE], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[#121214] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-[#0A0A0C]">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center space-x-2">
                <span>Python Streamlit Implementation (<code className="text-amber-400 font-mono">app.py</code>)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Complete, production-ready Python script using <code className="text-blue-300 font-mono">google-genai</code> and Streamlit.
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

        {/* Setup Banner */}
        <div className="p-4 bg-[#0A0A0C] border-b border-white/5 text-xs text-slate-300 space-y-2">
          <div className="flex items-center space-x-2 text-amber-400 font-mono font-semibold">
            <Play className="w-3.5 h-3.5" />
            <span>How to run this Python script locally:</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 font-mono text-[11px]">
            <div className="p-2.5 bg-[#050505] rounded-lg border border-white/5 shadow-inner">
              <span className="text-slate-500"># 1. Install dependencies</span>
              <div className="text-emerald-400 mt-0.5">pip install streamlit google-genai</div>
            </div>
            <div className="p-2.5 bg-[#050505] rounded-lg border border-white/5 shadow-inner">
              <span className="text-slate-500"># 2. Run Streamlit App</span>
              <div className="text-emerald-400 mt-0.5">streamlit run app.py</div>
            </div>
          </div>
        </div>

        {/* Code Content */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-[#050505] text-slate-300 leading-relaxed select-all">
          <pre className="p-4 bg-[#0A0A0C] rounded-xl border border-white/5 overflow-x-auto whitespace-pre leading-relaxed">
            {STREAMLIT_APP_CODE}
          </pre>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0A0A0C] flex items-center justify-between">
          <span className="text-xs text-slate-500 font-mono">
            Uses Google Gemini 2.5/3.7 Flash SDK + Tavily Web Search API
          </span>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#1a1a1e] hover:bg-[#25252c] border border-white/10 text-xs font-mono font-semibold text-white transition"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-mono font-semibold text-white shadow-lg shadow-blue-900/30 transition"
            >
              <Download className="w-4 h-4" />
              <span>Download app.py</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
