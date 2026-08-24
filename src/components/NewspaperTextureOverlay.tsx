import React from 'react';

export const NewspaperTextureOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* SVG Procedural Paper Fiber Turbulence Filter */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <filter id="newspaper-fiber-noise" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.04 0.95"
            numOctaves="4"
            result="noise"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.15
                    0 0 0 0 0.12
                    0 0 0 0 0.08
                    0 0 0 0.35 0"
            result="coloredNoise"
          />
          <feBlend in="SourceGraphic" in2="coloredNoise" mode="multiply" />
        </filter>

        <filter id="paper-stippling" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
            result="stipple"
          />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.1
                    0 0 0 0 0.08
                    0 0 0 0 0.05
                    0 0 0 0.22 0"
          />
        </filter>
      </svg>

      {/* 1. Global Paper Pulp Fiber Grain Layer (simulating organic cellulose fibers) */}
      <div
        className="absolute inset-0 opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }}
      />

      {/* 2. Microscopic vertical newsprint grain lines */}
      <div
        className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 40 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='fiberFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23fiberFilter)' opacity='0.6'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 800px',
        }}
      />

      {/* 3. Deep Aged Paper Perimeter Vignette (Yellowed/Browned edges) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(138, 110, 75, 0.18) 85%, rgba(87, 66, 42, 0.35) 100%),
            radial-gradient(circle at 0% 0%, rgba(94, 71, 44, 0.28) 0%, transparent 35%),
            radial-gradient(circle at 100% 0%, rgba(94, 71, 44, 0.25) 0%, transparent 35%),
            radial-gradient(circle at 0% 100%, rgba(94, 71, 44, 0.32) 0%, transparent 40%),
            radial-gradient(circle at 100% 100%, rgba(94, 71, 44, 0.3) 0%, transparent 40%)
          `,
        }}
      />

      {/* 4. Realistic Broadsheet Horizontal Paper Crease (Middle Fold) */}
      <div className="absolute top-[48%] left-0 right-0 h-[6px] pointer-events-none opacity-40">
        <div className="w-full h-[2px] bg-black/15 shadow-[0_1px_2px_rgba(0,0,0,0.2)]" />
        <div className="w-full h-[1px] bg-white/40 shadow-[0_-1px_1px_rgba(255,255,255,0.6)]" />
        <div className="w-full h-[3px] bg-amber-950/10 blur-[1px]" />
      </div>

      {/* 5. Left Printing Press Roller Ink Smudge (Exact match to authentic vintage photos) */}
      <div
        className="absolute -left-8 top-32 w-28 h-64 opacity-22 rotate-[-8deg] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 50%, #1f1408 0%, rgba(31, 20, 8, 0.6) 35%, transparent 75%)',
          filter: 'blur(6px)',
        }}
      />

      {/* 6. Right Margin Printing Ink Smudge */}
      <div
        className="absolute -right-10 top-72 w-32 h-72 opacity-20 rotate-[12deg] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, #1f1408 0%, rgba(31, 20, 8, 0.5) 40%, transparent 75%)',
          filter: 'blur(8px)',
        }}
      />

      {/* 7. Top Right Thumbprint / Inked Press Stain */}
      <div
        className="absolute right-12 top-6 w-20 h-24 opacity-15 rotate-[25deg] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, #291807 0%, rgba(41, 24, 7, 0.4) 45%, transparent 70%)',
          filter: 'blur(4px)',
        }}
      />

      {/* 8. Bottom Left Circular Water / Tea Stain Ring */}
      <div
        className="absolute left-10 bottom-16 w-36 h-36 rounded-full opacity-18 pointer-events-none rotate-12"
        style={{
          border: '3px solid #6b4c2b',
          filter: 'blur(2px)',
          background: 'radial-gradient(circle, transparent 65%, rgba(107, 76, 43, 0.15) 80%, rgba(107, 76, 43, 0.3) 100%)',
        }}
      />

      {/* 9. Dispersed Inked Printing Splatters / Pulp Specks */}
      <div className="absolute left-[8%] top-[22%] w-2 h-2.5 bg-[#26180c] rounded-full opacity-25 blur-[0.5px]" />
      <div className="absolute left-[5%] top-[55%] w-3 h-1.5 bg-[#26180c] rounded-full opacity-20 rotate-45 blur-[0.6px]" />
      <div className="absolute right-[6%] top-[38%] w-2.5 h-3 bg-[#26180c] rounded-full opacity-25 blur-[0.5px]" />
      <div className="absolute right-[11%] bottom-[28%] w-1.5 h-2 bg-[#26180c] rounded-full opacity-30 blur-[0.4px]" />
      <div className="absolute left-[15%] bottom-[12%] w-3.5 h-2 bg-[#26180c] rounded-full opacity-15 blur-[0.7px]" />
      <div className="absolute right-[22%] top-[14%] w-2 h-1.5 bg-[#26180c] rounded-full opacity-20 blur-[0.5px]" />

      {/* 10. Faint Editorial Rubber Stamp Archival Watermark in Background */}
      <div className="absolute right-24 bottom-36 opacity-7 rotate-[-18deg] pointer-events-none select-none">
        <div className="border-4 border-[#3b2716] p-4 text-[#3b2716] font-stamp text-center tracking-widest text-lg font-bold">
          <div>THE DAILY VERIFIER</div>
          <div className="text-xs mt-1">OFFICIAL GAZETTE ARCHIVE • 1926-2026</div>
        </div>
      </div>
    </div>
  );
};
