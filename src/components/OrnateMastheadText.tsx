import React from 'react';

export const OrnateMastheadText: React.FC = () => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none py-1.5 w-full max-w-2xl mx-auto">
      {/* Decorative Top Accent Rule with Roman Fleurons */}
      <div className="flex items-center justify-center space-x-3 w-full mb-1 opacity-80">
        <span className="h-px bg-gradient-to-r from-transparent via-[#2b241e] to-[#2b241e] flex-1 max-w-[120px]" />
        <span className="text-xs text-[#2b241e] font-serif">✦ ❖ ✦</span>
        <span className="h-px bg-gradient-to-l from-transparent via-[#2b241e] to-[#2b241e] flex-1 max-w-[120px]" />
      </div>

      {/* Main Title: The SahiKya in Majestic Roman Broadsheet Typography */}
      <div className="relative flex items-baseline justify-center tracking-tight">
        {/* Subtle Engraved Shadow/Relief layer */}
        <h1 
          className="font-roman-masthead text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] xl:text-[6rem] text-[#1a1410] tracking-[-0.02em] leading-none text-center whitespace-nowrap font-black drop-shadow-[2px_2px_0px_rgba(215,190,150,0.8)]"
          style={{
            fontFamily: "'Bodoni Moda', 'Playfair Display', 'Cinzel', Georgia, 'Times New Roman', serif",
            textRendering: 'optimizeLegibility',
          }}
        >
          <span className="font-normal italic text-3xl sm:text-5xl md:text-6xl text-[#3d3228] mr-2 sm:mr-3 font-serif">
            The
          </span>
          <span className="text-[#15110e] font-black tracking-[-0.01em]">
            SahiKya
          </span>
        </h1>
      </div>

      {/* Underline Flourish with Double Stroke and Diamond Center */}
      <div className="flex items-center justify-center space-x-2 w-full mt-1.5 opacity-90">
        <div className="h-[2px] bg-[#1a1410] flex-1 max-w-[140px]" />
        <div className="w-2 h-2 rotate-45 border border-[#1a1410] bg-[#2b241e] shrink-0" />
        <span className="text-[11px] sm:text-xs font-serif italic text-[#382d24] px-1 font-semibold tracking-wider">
          Veritas Inquirendo
        </span>
        <div className="w-2 h-2 rotate-45 border border-[#1a1410] bg-[#2b241e] shrink-0" />
        <div className="h-[2px] bg-[#1a1410] flex-1 max-w-[140px]" />
      </div>
    </div>
  );
};
