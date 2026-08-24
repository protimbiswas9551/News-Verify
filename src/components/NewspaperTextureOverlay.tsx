import React from 'react';

export const NewspaperTextureOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Full-screen authentic newspaper background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-95"
        style={{
          backgroundImage: `url('/newspaper_bg.jpg')`,
          backgroundAttachment: 'fixed',
        }}
      />

      {/* 2. Warm antique sepia & amber tone balancing overlay */}
      <div
        className="absolute inset-0 mix-blend-multiply opacity-25"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(254, 249, 235, 0.4) 0%, rgba(217, 185, 142, 0.7) 100%)',
        }}
      />

      {/* 3. Aged paper edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 50%, transparent 60%, rgba(110, 80, 48, 0.15) 85%, rgba(68, 48, 25, 0.3) 100%)
          `,
        }}
      />
    </div>
  );
};
