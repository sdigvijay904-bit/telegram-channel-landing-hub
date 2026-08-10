import React from 'react';

interface CoinsathiLogoProps {
  className?: string;
  logoUrl?: string;
}

export function CoinsathiLogo({ className = "w-32 h-32", logoUrl }: CoinsathiLogoProps) {
  if (logoUrl && logoUrl.trim()) {
    return (
      <div className={`relative rounded-full overflow-hidden shrink-0 ${className}`}>
        <img
          src={logoUrl}
          alt="Money Master Hub Logo"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative rounded-full shrink-0 flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full rounded-full drop-shadow-[0_0_25px_rgba(234,179,8,0.5)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Metallic Gradients */}
          <linearGradient id="mmGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A1" />
            <stop offset="30%" stopColor="#FFD700" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>

          <linearGradient id="mmSilverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="70%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>

          <linearGradient id="greenBarGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="50%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>

          <radialGradient id="mmDarkBg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#111115" />
            <stop offset="70%" stopColor="#08080a" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          <filter id="goldGlowEffect" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Outer Black Background Circle */}
        <circle cx="250" cy="250" r="240" fill="url(#mmDarkBg)" />

        {/* Outer Double Gold Ring */}
        <circle cx="250" cy="250" r="236" fill="none" stroke="url(#mmGoldGradient)" strokeWidth="10" />
        <circle cx="250" cy="250" r="224" fill="none" stroke="url(#mmGoldGradient)" strokeWidth="2" opacity="0.7" />

        {/* --- DUAL METALLIC MM LOGO SYMBOL --- */}
        <g filter="url(#goldGlowEffect)" transform="translate(0, 5)">
          
          {/* Left Gold 'M' Letter */}
          <path
            d="M 120 200 L 120 70 L 160 70 L 200 135 L 240 70 L 255 70 L 210 145 L 210 200 Z"
            fill="url(#mmGoldGradient)"
          />
          <path
            d="M 120 70 L 145 70 L 180 130 L 160 130 Z"
            fill="#FFF"
            opacity="0.3"
          />

          {/* Right Silver 'M' Letter */}
          <path
            d="M 235 200 L 235 70 L 250 70 L 290 135 L 330 70 L 370 70 L 370 200 L 330 200 L 330 115 L 290 180 L 275 180 L 235 115 Z"
            fill="url(#mmSilverGradient)"
          />

          {/* Ascending Gold Arrow across MM */}
          <path
            d="M 160 215 L 185 180 L 215 195 L 350 90 L 330 140 L 395 90 L 380 155 L 360 100 L 215 210 Z"
            fill="url(#mmGoldGradient)"
          />

          {/* Left Side: Gold Money Bag & Coins */}
          <g transform="translate(80, 160)">
            {/* Bag Body */}
            <path
              d="M 25 35 C 10 40 5 65 10 85 C 15 100 45 105 55 100 C 65 95 65 65 55 45 C 45 35 35 30 25 35 Z"
              fill="url(#mmGoldGradient)"
            />
            {/* Bag Tie */}
            <path d="M 20 35 L 40 32 L 35 25 L 15 28 Z" fill="#92400E" />
            <text x="32" y="75" textAnchor="middle" fill="#451A03" fontSize="28" fontWeight="900" fontFamily="sans-serif">$</text>
            
            {/* Stacked Coins */}
            <g transform="translate(45, 55)">
              <ellipse cx="25" cy="40" rx="16" ry="7" fill="url(#mmGoldGradient)" stroke="#78350F" strokeWidth="1" />
              <ellipse cx="25" cy="34" rx="16" ry="7" fill="url(#mmGoldGradient)" stroke="#78350F" strokeWidth="1" />
              <ellipse cx="25" cy="28" rx="16" ry="7" fill="url(#mmGoldGradient)" stroke="#78350F" strokeWidth="1" />
              {/* Front Coin */}
              <circle cx="10" cy="38" r="14" fill="url(#mmGoldGradient)" stroke="#FFF" strokeWidth="1" />
              <text x="10" y="43" textAnchor="middle" fill="#451A03" fontSize="16" fontWeight="900">$</text>
            </g>
          </g>

          {/* Right Side: Green 3D Bar Graph */}
          <g transform="translate(290, 120)">
            <rect x="10" y="110" width="14" height="25" rx="2" fill="url(#greenBarGradient)" />
            <rect x="28" y="95" width="14" height="40" rx="2" fill="url(#greenBarGradient)" />
            <rect x="46" y="80" width="14" height="55" rx="2" fill="url(#greenBarGradient)" />
            <rect x="64" y="60" width="14" height="75" rx="2" fill="url(#greenBarGradient)" />
            <rect x="82" y="40" width="14" height="95" rx="2" fill="url(#greenBarGradient)" />
            <rect x="100" y="15" width="14" height="120" rx="2" fill="url(#greenBarGradient)" />
          </g>
        </g>

        {/* --- MAIN TITLE: MONEY MASTER HUB --- */}
        <g transform="translate(250, 310)">
          {/* MONEY Text (White) */}
          <text
            x="0"
            y="0"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="54"
            fontWeight="900"
            fontFamily="Impact, Arial Black, sans-serif"
            letterSpacing="2"
          >
            MONEY
          </text>

          {/* MASTER HUB Text (Gold) */}
          <text
            x="0"
            y="52"
            textAnchor="middle"
            fill="url(#mmGoldGradient)"
            fontSize="46"
            fontWeight="900"
            fontFamily="Impact, Arial Black, sans-serif"
            letterSpacing="2"
            filter="url(#goldGlowEffect)"
          >
            MASTER HUB
          </text>
        </g>

        {/* --- DIVIDER LINE WITH DIAMOND --- */}
        <g transform="translate(250, 382)">
          <line x1="-180" y1="0" x2="180" y2="0" stroke="url(#mmGoldGradient)" strokeWidth="1.5" opacity="0.8" />
          <polygon points="0,-6 6,0 0,6 -6,0" fill="url(#mmGoldGradient)" />
        </g>

        {/* --- BOTTOM ROW: EARN MORE | SAVE MORE | GROW MORE --- */}
        <g transform="translate(250, 420)">
          {/* EARN MORE */}
          <g transform="translate(-130, 0)">
            <circle cx="-32" cy="-4" r="12" fill="#15803D" stroke="#4ADE80" strokeWidth="1" />
            <path d="M -37 -1 L -33 -5 L -30 -2 L -26 -8" stroke="#FFF" strokeWidth="2" fill="none" strokeLinecap="round" />
            <text x="-14" y="0" textAnchor="start" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">
              EARN MORE
            </text>
          </g>

          <text x="-22" y="0" textAnchor="middle" fill="url(#mmGoldGradient)" fontSize="14" fontWeight="300">|</text>

          {/* SAVE MORE */}
          <g transform="translate(0, 0)">
            <circle cx="-32" cy="-4" r="12" fill="#B45309" stroke="#FBBF24" strokeWidth="1" />
            <text x="-32" y="0" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="900">$</text>
            <text x="-14" y="0" textAnchor="start" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">
              SAVE MORE
            </text>
          </g>

          <text x="96" y="0" textAnchor="middle" fill="url(#mmGoldGradient)" fontSize="14" fontWeight="300">|</text>

          {/* GROW MORE */}
          <g transform="translate(120, 0)">
            <circle cx="-30" cy="-4" r="12" fill="#15803D" stroke="#4ADE80" strokeWidth="1" />
            <rect x="-35" y="-7" width="10" height="7" rx="1" fill="#FFF" />
            <text x="-12" y="0" textAnchor="start" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="sans-serif">
              GROW MORE
            </text>
          </g>
        </g>

        {/* THREE GOLD STARS AT BOTTOM */}
        <g transform="translate(250, 452)">
          <path d="M -100 0 A 110 20 0 0 0 -30 6" fill="none" stroke="url(#mmGoldGradient)" strokeWidth="1" />
          <path d="M 100 0 A 110 20 0 0 1 30 6" fill="none" stroke="url(#mmGoldGradient)" strokeWidth="1" />
          {/* Left star */}
          <polygon points="-24,2 -20,-7 -16,2 -23,-4 -17,-4" fill="url(#mmGoldGradient)" />
          {/* Center star (bigger) */}
          <polygon points="0,0 5,-12 10,0 1,-8 9,-8" fill="url(#mmGoldGradient)" transform="translate(-5,0)" />
          {/* Right star */}
          <polygon points="16,2 20,-7 24,2 17,-4 23,-4" fill="url(#mmGoldGradient)" />
        </g>
      </svg>
    </div>
  );
}

