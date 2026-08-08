import React from 'react';

interface MoneyMasterHubLogoProps {
  className?: string;
}

export function PropertyNLogo({ className = "w-28 h-28 sm:w-36 sm:h-36" }: MoneyMasterHubLogoProps) {
  return (
    <div className={`relative rounded-full shadow-[0_0_30px_rgba(255,215,0,0.4)] shrink-0 ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full rounded-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Outer Gold Metallic Gradient */}
          <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF3A0" />
            <stop offset="25%" stopColor="#FFD700" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#F39C12" />
          </linearGradient>

          {/* Silver Metallic Gradient for 2nd M */}
          <linearGradient id="silverMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E2E8F0" />
            <stop offset="100%" stopColor="#94A3B8" />
          </linearGradient>

          {/* Green Bar Chart Gradient */}
          <linearGradient id="greenChart" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>

          {/* Dark Black Radial Background */}
          <radialGradient id="darkBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#111827" />
            <stop offset="70%" stopColor="#030712" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          {/* Drop shadow filter */}
          <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Outer Dark Background */}
        <circle cx="250" cy="250" r="246" fill="url(#darkBg)" />

        {/* Outer Gold Metallic Border Ring */}
        <circle cx="250" cy="250" r="240" fill="none" stroke="url(#goldMetallic)" strokeWidth="12" />
        <circle cx="250" cy="250" r="228" fill="none" stroke="url(#goldMetallic)" strokeWidth="2" opacity="0.8" />

        {/* --- CENTRAL LOGO ARTWORK --- */}
        {/* 1. First 'M' - Gold Metallic */}
        <path
          d="M 120 200 L 165 80 L 225 180 L 285 80 L 330 200 L 295 200 L 270 120 L 225 195 L 180 120 L 155 200 Z"
          fill="url(#goldMetallic)"
          filter="url(#shadowGlow)"
        />

        {/* 2. Second 'M' - Silver Metallic (Overlapping slightly) */}
        <path
          d="M 230 200 L 270 90 L 325 180 L 380 90 L 420 200 L 388 200 L 365 125 L 325 190 L 285 125 L 262 200 Z"
          fill="url(#silverMetallic)"
          opacity="0.95"
          filter="url(#shadowGlow)"
        />

        {/* 3. Upward Gold Growth Arrow */}
        <path
          d="M 110 210 Q 220 180 370 70 L 350 105 L 420 60 L 385 130 L 380 95 Q 240 195 110 220 Z"
          fill="url(#goldMetallic)"
          filter="url(#shadowGlow)"
        />

        {/* 4. Money Bag on Bottom Left */}
        <g transform="translate(85, 170)" filter="url(#shadowGlow)">
          {/* Bag Body */}
          <path
            d="M 35 30 C 15 30 0 45 0 70 C 0 95 20 110 45 110 C 70 110 90 95 90 70 C 90 45 75 30 55 30 Z"
            fill="url(#goldMetallic)"
          />
          {/* Bag Top Tie */}
          <path d="M 30 20 L 60 20 L 68 32 L 22 32 Z" fill="#B45309" />
          <path d="M 25 10 L 65 10 L 55 22 L 35 22 Z" fill="url(#goldMetallic)" />
          {/* Dollar Sign on Bag */}
          <text x="45" y="80" textAnchor="middle" fill="#000000" fontSize="38" fontWeight="900" fontFamily="sans-serif">$</text>
        </g>

        {/* 5. Green Financial Bar Chart on Right */}
        <g transform="translate(300, 160)" filter="url(#shadowGlow)">
          <rect x="0" y="85" width="16" height="25" rx="3" fill="url(#greenChart)" />
          <rect x="22" y="70" width="16" height="40" rx="3" fill="url(#greenChart)" />
          <rect x="44" y="50" width="16" height="60" rx="3" fill="url(#greenChart)" />
          <rect x="66" y="25" width="16" height="85" rx="3" fill="url(#greenChart)" />
          <rect x="88" y="0" width="16" height="110" rx="3" fill="url(#greenChart)" />
        </g>

        {/* --- BRAND NAME TYPOGRAPHY --- */}
        {/* "MONEY" - Large Bold White Text */}
        <text
          x="250"
          y="335"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="56"
          fontWeight="900"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="4"
          filter="url(#shadowGlow)"
        >
          MONEY
        </text>

        {/* "MASTER HUB" - Large Gold Text */}
        <text
          x="250"
          y="390"
          textAnchor="middle"
          fill="url(#goldMetallic)"
          fontSize="42"
          fontWeight="900"
          fontFamily="Arial, Helvetica, sans-serif"
          letterSpacing="3"
          filter="url(#shadowGlow)"
        >
          MASTER HUB
        </text>

        {/* Separator Gold Line with Center Diamond */}
        <line x1="80" y1="410" x2="230" y2="410" stroke="url(#goldMetallic)" strokeWidth="2" />
        <polygon points="250,405 255,410 250,415 245,410" fill="url(#goldMetallic)" />
        <line x1="270" y1="410" x2="420" y2="410" stroke="url(#goldMetallic)" strokeWidth="2" />

        {/* Bottom 3 Gold Stars */}
        <g fill="url(#goldMetallic)" transform="translate(250, 435)">
          <path d="M 0 -8 L 2.5 -2.5 L 8 -1.5 L 4 2.5 L 5 8 L 0 5 L -5 8 L -4 2.5 L -8 -1.5 L -2.5 -2.5 Z" transform="scale(1.2)" />
          <path d="M -25 -6 L -23 -1.5 L -18 -1 L -21 2 L -20 6 L -25 4 L -30 6 L -29 2 L -32 -1 L -27 -1.5 Z" />
          <path d="M 25 -6 L 27 -1.5 L 32 -1 L 29 2 L 30 6 L 25 4 L 20 6 L 21 2 L 18 -1 L 23 -1.5 Z" />
        </g>
      </svg>
    </div>
  );
}
