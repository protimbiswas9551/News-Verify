import React from 'react';

export const VintageEngravings: React.FC = () => {
  return (
    <div className="pointer-events-none select-none z-0">
      {/* Bottom-Left Vintage Woodcut Printing Press Engraving */}
      <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 opacity-85 mix-blend-multiply max-w-[90px] sm:max-w-[120px] transition-opacity">
        <svg viewBox="0 0 100 100" className="w-full h-auto text-[#1c1917]" fill="currentColor">
          {/* Detailed stylized woodcut printing press */}
          <path d="M20 90 h60 v6 h-60 z" />
          <path d="M25 85 h10 v5 h-10 z M65 85 h10 v5 h-10 z" />
          <path d="M28 35 h8 v50 h-8 z M64 35 h8 v50 h-8 z" />
          <path d="M22 30 h56 v6 h-56 z" />
          <path d="M46 15 h8 v20 h-8 z" />
          <path d="M35 15 h30 v4 h-30 z" />
          <path d="M30 50 h40 v8 h-40 z" />
          <path d="M33 58 h34 v12 h-34 z" />
          <line x1="20" y1="92" x2="80" y2="92" stroke="#1c1917" strokeWidth="2" />
          {/* Cross hatching lines */}
          <line x1="30" y1="36" x2="34" y2="85" stroke="#1c1917" strokeWidth="1" strokeDasharray="2,2" />
          <line x1="66" y1="36" x2="70" y2="85" stroke="#1c1917" strokeWidth="1" strokeDasharray="2,2" />
        </svg>
      </div>

      {/* Bottom-Right Vintage Inkwell & Goose Feather Quill Engraving */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 opacity-85 mix-blend-multiply max-w-[85px] sm:max-w-[110px] transition-opacity">
        <svg viewBox="0 0 100 100" className="w-full h-auto text-[#1c1917]" fill="currentColor">
          {/* Inkwell Pot */}
          <path d="M40 82 h22 c2 0 4 2 4 4 v6 c0 2 -2 4 -4 4 h-22 c-2 0 -4 -2 -4 -4 v-6 c0 -2 2 -4 4 -4 z" />
          <path d="M45 76 h12 v6 h-12 z" />
          <path d="M48 72 h6 v4 h-6 z" />
          {/* Feather Quill */}
          <path d="M52 74 Q75 40 92 10 Q85 30 65 52 Q56 62 51 74 z" />
          <path d="M92 10 Q80 20 68 38 Q58 52 50 72 Q52 70 54 62 Q66 42 78 28 Q88 18 92 10" opacity="0.6" />
          <line x1="52" y1="74" x2="90" y2="12" stroke="#1c1917" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Top-Right Vintage Printing Machinery Engraving */}
      <div className="hidden xl:block fixed top-36 right-6 opacity-80 mix-blend-multiply max-w-[80px]">
        <svg viewBox="0 0 100 100" className="w-full h-auto text-[#1c1917]" fill="currentColor">
          <path d="M15 45 h70 v35 h-70 z" fill="none" stroke="#1c1917" strokeWidth="3" />
          <path d="M25 20 h50 v25 h-50 z" />
          <circle cx="35" cy="62" r="10" stroke="#1c1917" strokeWidth="2" fill="none" />
          <circle cx="65" cy="62" r="10" stroke="#1c1917" strokeWidth="2" fill="none" />
          <line x1="35" y1="62" x2="65" y2="62" stroke="#1c1917" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
};
