import React from 'react';

export const NewspaperTextureOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Subtle warm paper fiber gradient */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(254, 252, 245, 0.5) 0%, rgba(235, 224, 205, 0.4) 100%)',
        }}
      />
      {/* Soft natural edge vignette */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 75%, rgba(60, 45, 25, 0.08) 100%)',
        }}
      />
    </div>
  );
};

