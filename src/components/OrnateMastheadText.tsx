import React from 'react';

export const OrnateMastheadText: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center select-none py-1 overflow-visible">
      <svg
        viewBox="0 0 760 170"
        className="w-full max-w-[680px] h-auto text-[#181411] overflow-visible drop-shadow-[1px_1px_1px_rgba(40,30,20,0.2)]"
      >
        <defs>
          {/* Ornate Crosshatch Pattern for medieval letter fills */}
          <pattern id="crosshatch" width="4" height="4" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="4" y2="4" stroke="#251e18" strokeWidth="0.8" />
            <line x1="4" y1="0" x2="0" y2="4" stroke="#251e18" strokeWidth="0.8" />
          </pattern>
          
          {/* Subtle woodcut leaf shading */}
          <pattern id="diagonalHatch" width="3" height="3" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="3" y2="3" stroke="#362b22" strokeWidth="0.7" opacity="0.6" />
          </pattern>
        </defs>

        {/* --- Background Intricate Botanical Acanthus & Scrollwork Flourishes --- */}
        <g className="opacity-80" stroke="#1f1a16" fill="none" strokeWidth="1.2">
          {/* Left decorative flourishes surrounding 'The' and 'S' */}
          <path d="M15 75 Q30 30 70 45 Q110 60 90 95 Q70 130 35 110 Q10 90 25 60 Q35 40 60 35" fill="url(#diagonalHatch)" />
          <path d="M50 40 Q80 15 120 30 Q150 45 130 85 Q110 120 70 115" />
          <path d="M30 115 Q60 145 105 135 Q145 125 150 90 Q155 60 120 50" />
          <path d="M75 25 C100 10 135 15 145 45 C155 75 130 105 95 110" />

          {/* Central floral vine flourishes intertwining letters */}
          <path d="M180 40 Q215 15 255 35 Q290 55 270 95 Q250 135 205 120 Q170 105 190 70" fill="url(#diagonalHatch)" />
          <path d="M260 35 Q300 10 345 25 Q380 40 370 80 Q360 120 315 125" />
          <path d="M350 45 Q390 20 435 35 Q470 50 460 90 Q450 130 405 125" fill="url(#diagonalHatch)" />
          <path d="M440 35 Q485 10 530 25 Q570 40 560 85 Q550 125 500 125" />

          {/* Right acanthus scrolls wrapping 'Kya' */}
          <path d="M540 30 Q585 10 635 25 Q680 40 670 90 Q660 140 600 130 Q560 120 575 80" fill="url(#diagonalHatch)" />
          <path d="M620 35 Q670 15 720 35 Q750 55 745 95 Q740 135 690 135" fill="url(#diagonalHatch)" />
          <path d="M660 110 Q710 145 745 115 Q760 90 730 65" />

          {/* Detailed leaf veins & scroll spirals */}
          <path d="M40 75 Q60 65 75 80 Q90 95 80 110" strokeWidth="0.8" />
          <path d="M110 50 Q130 70 115 90 Q100 110 85 95" strokeWidth="0.8" />
          <path d="M220 50 Q240 70 230 90" strokeWidth="0.8" />
          <path d="M300 45 Q320 65 310 90" strokeWidth="0.8" />
          <path d="M380 50 Q400 70 390 90" strokeWidth="0.8" />
          <path d="M480 45 Q500 65 490 90" strokeWidth="0.8" />
          <path d="M590 45 Q620 70 605 100" strokeWidth="0.8" />
          <path d="M680 50 Q710 75 695 105" strokeWidth="0.8" />
        </g>

        {/* --- Foreground Ornate Engraved Text: "The SahiKya" --- */}
        <g>
          {/* Ornate 'The' in illuminated gothic style */}
          <text
            x="75"
            y="108"
            fontFamily="'UnifrakturCook', 'Grenze Gotisch', 'Old English Text MT', serif"
            fontSize="54"
            fontWeight="700"
            fill="#181411"
            stroke="#181411"
            strokeWidth="1.2"
          >
            The
          </text>

          {/* Giant Ornate Illuminated Capital 'S' with crosshatch shading & double outline */}
          <g transform="translate(195, 20)">
            {/* Shadow / background volume */}
            <text
              x="3"
              y="98"
              fontFamily="'UnifrakturCook', 'Grenze Gotisch', 'Old English Text MT', serif"
              fontSize="128"
              fontWeight="900"
              fill="#181411"
            >
              S
            </text>
            {/* Crosshatch fill */}
            <text
              x="0"
              y="95"
              fontFamily="'UnifrakturCook', 'Grenze Gotisch', 'Old English Text MT', serif"
              fontSize="128"
              fontWeight="900"
              fill="url(#crosshatch)"
              stroke="#181411"
              strokeWidth="2.5"
            >
              S
            </text>
            {/* Inner highlight line */}
            <text
              x="0"
              y="95"
              fontFamily="'UnifrakturCook', 'Grenze Gotisch', 'Old English Text MT', serif"
              fontSize="128"
              fontWeight="900"
              fill="none"
              stroke="#f7eedc"
              strokeWidth="1"
              strokeDasharray="2,3"
            >
              S
            </text>
          </g>

          {/* 'ahi' in ornate illuminated blackletter */}
          <text
            x="290"
            y="112"
            fontFamily="'UnifrakturCook', 'Grenze Gotisch', 'Old English Text MT', serif"
            fontSize="90"
            fontWeight="700"
            fill="#181411"
            stroke="#181411"
            strokeWidth="1.5"
            letterSpacing="2"
          >
            ahi
          </text>

          {/* Giant Ornate Illuminated Capital 'K' with crosshatch & engraving */}
          <g transform="translate(460, 20)">
            <text
              x="3"
              y="98"
              fontFamily="'UnifrakturCook', 'Grenze Gotisch', 'Old English Text MT', serif"
              fontSize="124"
              fontWeight="900"
              fill="#181411"
            >
              K
            </text>
            <text
              x="0"
              y="95"
              fontFamily="'UnifrakturCook', 'Grenze Gotisch', 'Old English Text MT', serif"
              fontSize="124"
              fontWeight="900"
              fill="url(#crosshatch)"
              stroke="#181411"
              strokeWidth="2.5"
            >
              K
            </text>
          </g>

          {/* 'ya' in ornate illuminated blackletter */}
          <text
            x="575"
            y="112"
            fontFamily="'UnifrakturCook', 'Grenze Gotisch', 'Old English Text MT', serif"
            fontSize="90"
            fontWeight="700"
            fill="#181411"
            stroke="#181411"
            strokeWidth="1.5"
            letterSpacing="2"
          >
            ya
          </text>
        </g>
      </svg>
    </div>
  );
};
