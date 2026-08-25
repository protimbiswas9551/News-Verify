import React from 'react';

export const NewspaperTextureOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. Authentic Newspaper Collage Wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
        style={{
          backgroundImage: `url('/vintage_newsprint_bg.jpg')`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />

      {/* 2. Warm antique tea-stain & sepia balancing wash */}
      <div
        className="absolute inset-0 mix-blend-multiply opacity-35"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(255, 252, 245, 0.4) 0%, rgba(220, 195, 155, 0.7) 100%)',
        }}
      />

      {/* 3. Subtle soft vignette to maintain clean high-contrast legibility in center */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, rgba(254, 251, 243, 0.25) 30%, transparent 75%, rgba(65, 45, 20, 0.2) 100%)',
        }}
      />
    </div>
  );
};

