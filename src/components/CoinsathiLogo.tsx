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
          alt="Channel Logo"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    );
  }

  return (
    <div className={`relative rounded-full shrink-0 flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full rounded-full drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gold Metallic Gradients */}
          <linearGradient id="goldBright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2A1" />
            <stop offset="30%" stopColor="#FFD700" />
            <stop offset="60%" stopColor="#D4AF37" />
            <stop offset="90%" stopColor="#996515" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>

          <linearGradient id="goldShine" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B45309" />
            <stop offset="50%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>

          <radialGradient id="bullDarkBg" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#18181b" />
            <stop offset="70%" stopColor="#09090b" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Black Background Circle */}
        <circle cx="250" cy="230" r="210" fill="url(#bullDarkBg)" />

        {/* Gold Outer Double Ring */}
        <circle cx="250" cy="230" r="205" fill="none" stroke="url(#goldBright)" strokeWidth="10" />
        <circle cx="250" cy="230" r="192" fill="none" stroke="url(#goldShine)" strokeWidth="3" opacity="0.9" />

        {/* --- BULL SILHOUETTE & COIN ARTWORK --- */}
        <g filter="url(#goldGlow)" transform="translate(0, -10)">
          {/* Bull Horns (Gold) */}
          <path
            d="M 170 120 C 130 80 110 130 145 160 C 170 180 190 160 170 120 Z"
            fill="url(#goldBright)"
          />
          <path
            d="M 290 115 C 330 75 350 125 315 155 C 290 175 270 155 290 115 Z"
            fill="url(#goldBright)"
          />

          {/* Bull Head & Muscular Neck (Black 3D shading with Gold Highlights) */}
          <path
            d="M 150 220 C 140 180 180 145 230 145 C 280 145 320 180 310 220 C 300 260 270 300 230 310 C 190 300 160 260 150 220 Z"
            fill="#111827"
            stroke="url(#goldBright)"
            strokeWidth="3"
          />

          {/* Snort / Muzzle area */}
          <ellipse cx="230" cy="260" rx="35" ry="25" fill="#1f2937" stroke="url(#goldShine)" strokeWidth="2" />
          <circle cx="215" cy="260" r="5" fill="#000" />
          <circle cx="245" cy="260" r="5" fill="#000" />

          {/* Eyes (Glowing Gold) */}
          <polygon points="190,200 210,205 195,215" fill="url(#goldBright)" />
          <polygon points="270,200 250,205 265,215" fill="url(#goldBright)" />

          {/* Muscular Arm holding Gold Coin on Right */}
          <path
            d="M 310 230 C 350 240 370 290 340 330 C 310 350 280 330 290 300 Z"
            fill="#1f2937"
            stroke="url(#goldBright)"
            strokeWidth="2"
          />

          {/* Big Dollar Coin held by Bull */}
          <g transform="translate(325, 200)">
            <circle cx="45" cy="45" r="42" fill="url(#goldBright)" stroke="#FFF" strokeWidth="2" />
            <circle cx="45" cy="45" r="35" fill="none" stroke="#78350F" strokeWidth="2" />
            <text
              x="45"
              y="60"
              textAnchor="middle"
              fill="#451A03"
              fontSize="48"
              fontWeight="900"
              fontFamily="Impact, Arial Black, sans-serif"
            >
              $
            </text>
          </g>
        </g>

        {/* --- BRAND TEXT "Coinsathi" AT BOTTOM --- */}
        <g transform="translate(250, 440)">
          {/* Background banner backing for text */}
          <path
            d="M -160 -35 L 160 -35 L 140 15 L -140 15 Z"
            fill="#000000"
            stroke="url(#goldBright)"
            strokeWidth="3"
            rx="10"
          />
          <text
            x="0"
            y="-2"
            textAnchor="middle"
            fill="url(#goldBright)"
            fontSize="46"
            fontWeight="900"
            fontFamily="Arial Black, Impact, sans-serif"
            letterSpacing="1"
            stroke="#000"
            strokeWidth="1.5"
            filter="url(#goldGlow)"
          >
            Coinsathi
          </text>
        </g>
      </svg>
    </div>
  );
}
