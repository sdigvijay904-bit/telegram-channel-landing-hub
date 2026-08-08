import React from 'react';

interface BestApplicationLogoProps {
  className?: string;
}

export function PropertyNLogo({ className = "w-28 h-28 sm:w-36 sm:h-36" }: BestApplicationLogoProps) {
  return (
    <div className={`relative rounded-full shadow-[0_0_30px_rgba(255,215,0,0.4)] shrink-0 ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full rounded-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Gold Metallic Gradient */}
          <linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff3a0" />
            <stop offset="25%" stopColor="#ffd700" />
            <stop offset="50%" stopColor="#d4af37" />
            <stop offset="75%" stopColor="#aa7c11" />
            <stop offset="100%" stopColor="#f39c12" />
          </linearGradient>

          {/* Dark Navy Radial Gradient Background */}
          <radialGradient id="navyBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#0b1b3d" />
            <stop offset="60%" stopColor="#050e24" />
            <stop offset="100%" stopColor="#020510" />
          </radialGradient>

          {/* Bright 3D Blue Gradient for 'B' */}
          <linearGradient id="blue3d" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="40%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </linearGradient>

          {/* Gold Arrow Gradient */}
          <linearGradient id="goldArrow" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>

          {/* White text 3D drop shadow */}
          <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Outer Base Dark Circle */}
        <circle cx="250" cy="250" r="246" fill="url(#navyBg)" />

        {/* Outer Gold Ring Border */}
        <circle cx="250" cy="250" r="242" fill="none" stroke="url(#goldRing)" strokeWidth="10" />

        {/* Inner Gold Ring Line */}
        <circle cx="250" cy="250" r="230" fill="none" stroke="url(#goldRing)" strokeWidth="2" opacity="0.8" />

        {/* Subtle Background Glow behind 'B' */}
        <circle cx="250" cy="180" r="100" fill="#0284c7" opacity="0.15" />

        {/* 1. TOP GOLD CROWN */}
        <g transform="translate(180, 45)" filter="url(#textGlow)">
          {/* Crown Base Band */}
          <rect x="20" y="52" width="100" height="10" rx="3" fill="url(#goldRing)" stroke="#78350f" strokeWidth="1" />
          {/* Jewels on Band */}
          <circle cx="35" cy="57" r="2.5" fill="#ef4444" />
          <circle cx="50" cy="57" r="2.5" fill="#3b82f6" />
          <circle cx="70" cy="57" r="3" fill="#10b981" />
          <circle cx="90" cy="57" r="2.5" fill="#3b82f6" />
          <circle cx="105" cy="57" r="2.5" fill="#ef4444" />

          {/* Crown Peaks Path */}
          <path
            d="M 20 52 L 10 18 L 38 38 L 70 8 L 102 38 L 130 18 L 120 52 Z"
            fill="url(#goldRing)"
            stroke="#92400e"
            strokeWidth="1.5"
          />

          {/* Crown Peak Pearls */}
          <circle cx="10" cy="16" r="4.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
          <circle cx="38" cy="36" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
          <circle cx="70" cy="6" r="5.5" fill="#ffffff" stroke="#d97706" strokeWidth="1.5" />
          <circle cx="102" cy="36" r="3.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
          <circle cx="130" cy="16" r="4.5" fill="#fef08a" stroke="#d97706" strokeWidth="1" />
        </g>

        {/* 2. CENTRAL STYLIZED 'B' & SWOOPING GOLD ARROW */}
        <g transform="translate(145, 100)">
          {/* Stylized 'B' Character */}
          <path
            d="M 40 30 L 105 30 C 145 30 165 48 165 72 C 165 90 150 102 132 108 C 158 114 175 130 175 155 C 175 185 148 205 102 205 L 40 205 Z M 78 62 L 78 100 L 102 100 C 120 100 130 92 130 81 C 130 70 120 62 102 62 Z M 78 132 L 78 173 L 106 173 C 126 173 138 163 138 152.5 C 138 142 126 132 106 132 Z"
            fill="url(#blue3d)"
            stroke="#ffffff"
            strokeWidth="3"
            filter="url(#textGlow)"
          />

          {/* Gold Swooping Ribbon Arrow wrapping around the 'B' */}
          <path
            d="M 5 170 Q 20 220 95 210 Q 180 195 205 120 Q 220 75 225 50 L 205 70 L 238 25 L 255 70 L 235 55 Q 220 100 195 145 Q 160 210 85 225 Q 10 235 -15 160 Z"
            fill="url(#goldArrow)"
            stroke="#b45309"
            strokeWidth="1.5"
            filter="url(#textGlow)"
          />
        </g>

        {/* 3. "OFFICIAL" TEXT */}
        <g transform="translate(250, 335)" filter="url(#textGlow)">
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="62"
            fontWeight="900"
            fontFamily="Arial, Helvetica, sans-serif"
            letterSpacing="3"
          >
            OFFICIAL
          </text>
        </g>

        {/* 4. "COMMUNITY ACCESS" TEXT WITH SEPARATOR LINES */}
        <g transform="translate(250, 372)">
          {/* Left Gold Line */}
          <line x1="-190" y1="-8" x2="-130" y2="-8" stroke="url(#goldRing)" strokeWidth="3" strokeLinecap="round" />
          {/* Center Text */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="url(#goldRing)"
            fontSize="22"
            fontWeight="800"
            fontFamily="Arial, Helvetica, sans-serif"
            letterSpacing="4"
          >
            COMMUNITY ACCESS
          </text>
          {/* Right Gold Line */}
          <line x1="130" y1="-8" x2="190" y2="-8" stroke="url(#goldRing)" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* 5. THREE BADGES (Secure, Fast, Reliable) */}
        <g transform="translate(0, 410)">
          {/* Badge 1: Secure (Left) */}
          <g transform="translate(125, 0)">
            <circle cx="0" cy="0" r="14" fill="#064e3b" stroke="#10b981" strokeWidth="1.5" />
            <path d="M-5 -1 L-2 2 L5 -4" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <text x="0" y="20" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="sans-serif">Secure</text>
          </g>

          {/* Vertical Divider */}
          <line x1="185" y1="-10" x2="185" y2="15" stroke="#334155" strokeWidth="1.5" />

          {/* Badge 2: Fast (Center) */}
          <g transform="translate(250, 0)">
            <circle cx="0" cy="0" r="14" fill="#083344" stroke="#06b6d4" strokeWidth="1.5" />
            {/* Rocket Icon */}
            <path d="M-2 6 C-2 6 -6 2 -5 -3 C-4 -6 0 -8 0 -8 C0 -8 4 -6 5 -3 C6 2 2 6 2 6 Z" fill="#06b6d4" />
            <text x="0" y="20" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="sans-serif">Fast</text>
          </g>

          {/* Vertical Divider */}
          <line x1="315" y1="-10" x2="315" y2="15" stroke="#334155" strokeWidth="1.5" />

          {/* Badge 3: Reliable (Right) */}
          <g transform="translate(375, 0)">
            <circle cx="0" cy="0" r="14" fill="#064e3b" stroke="#34d399" strokeWidth="1.5" />
            {/* Growth Graph Icon */}
            <path d="M-6 4 L-2 0 L2 2 L6 -4" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 -4 L6 -4 L6 -1" fill="none" stroke="#34d399" strokeWidth="2" strokeLinecap="round" />
            <text x="0" y="20" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="sans-serif">Reliable</text>
          </g>
        </g>

        {/* 6. BOTTOM TRUSTED & EASY PLATFORM SLOGAN */}
        <text
          x="250"
          y="468"
          textAnchor="middle"
          fill="#e2e8f0"
          fontSize="14"
          fontWeight="700"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="1"
          opacity="0.9"
        >
          — Trusted &amp; Easy Platform —
        </text>
      </svg>
    </div>
  );
}
