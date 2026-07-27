import React from 'react';

interface PropertyNLogoProps {
  className?: string;
}

export function PropertyNLogo({ className = "w-16 h-16 sm:w-20 sm:h-20" }: PropertyNLogoProps) {
  return (
    <div className={`relative rounded-full shadow-md shadow-emerald-500/20 shrink-0 ${className}`}>
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full rounded-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Teal/Green Gradient Background */}
          <radialGradient id="tealGrad" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#008a74" />
            <stop offset="60%" stopColor="#005d4f" />
            <stop offset="100%" stopColor="#003d33" />
          </radialGradient>

          {/* Pill Badge Gradient */}
          <linearGradient id="pillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00a88f" />
            <stop offset="50%" stopColor="#00d1b2" />
            <stop offset="100%" stopColor="#00a88f" />
          </linearGradient>

          {/* Building Silhouette Mask/Gradient */}
          <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#f0fdfa" />
          </linearGradient>
        </defs>

        {/* Base Background Circle */}
        <circle cx="250" cy="250" r="240" fill="url(#tealGrad)" />

        {/* Outer White Border Ring */}
        <circle cx="250" cy="250" r="236" fill="none" stroke="#ffffff" strokeWidth="5" opacity="0.9" />

        {/* Inner Thin White Ring */}
        <circle cx="250" cy="250" r="226" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.7" />

        {/* Bottom City Skyline Silhouette */}
        <g opacity="0.15" fill="#ffffff">
          <rect x="120" y="380" width="20" height="70" />
          <rect x="145" y="360" width="25" height="90" />
          <rect x="175" y="390" width="18" height="60" />
          <rect x="200" y="340" width="30" height="110" />
          <rect x="235" y="370" width="22" height="80" />
          <rect x="262" y="350" width="28" height="100" />
          <rect x="295" y="385" width="20" height="65" />
          <rect x="320" y="365" width="25" height="85" />
          <rect x="350" y="395" width="18" height="55" />
        </g>

        {/* Top N1B Building Logo Mark */}
        <g transform="translate(145, 70)">
          {/* Left Angle N pillar */}
          <path
            d="M20,160 L20,80 L55,160 L55,80 L80,80 L80,160 Z"
            fill="url(#buildingGrad)"
          />
          {/* Middle High Tower '1' */}
          <path
            d="M85,160 L85,30 L115,10 L140,10 L140,160 Z"
            fill="url(#buildingGrad)"
          />
          {/* Right Tower 'B' with Windows */}
          <path
            d="M148,160 L148,45 L200,45 C210,45 210,75 200,75 C212,75 212,110 200,110 C212,110 212,160 195,160 Z"
            fill="url(#buildingGrad)"
          />
          {/* Window Cutouts on Tower */}
          <rect x="165" y="60" width="12" height="12" rx="2" fill="#005d4f" />
          <rect x="165" y="85" width="12" height="12" rx="2" fill="#005d4f" />
          <rect x="165" y="110" width="12" height="12" rx="2" fill="#005d4f" />
          <rect x="165" y="135" width="12" height="12" rx="2" fill="#005d4f" />
        </g>

        {/* Brand Text: PropertyN */}
        <text
          x="250"
          y="310"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          fontWeight="900"
          fontSize="64"
          letterSpacing="-1"
        >
          PropertyN
        </text>

        {/* "EARNING" Green Pill Badge */}
        <g transform="translate(170, 328)">
          <rect x="0" y="0" width="160" height="34" rx="17" fill="url(#pillGrad)" />
          <text
            x="80"
            y="23"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="18"
            letterSpacing="3"
          >
            EARNING
          </text>
        </g>

        {/* Thin Separator Line with House Icon */}
        <line x1="130" y1="380" x2="235" y2="380" stroke="#ffffff" strokeWidth="1" opacity="0.6" />
        {/* House Icon */}
        <path d="M250,372 L258,380 L255,380 L255,386 L245,386 L245,380 L242,380 Z" fill="#ffffff" opacity="0.9" />
        <line x1="265" y1="380" x2="370" y2="380" stroke="#ffffff" strokeWidth="1" opacity="0.6" />

        {/* Subtitle: Premium Real-Estate Sponsoring */}
        <text
          x="250"
          y="404"
          textAnchor="middle"
          fill="#ffffff"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="18"
          letterSpacing="0.5"
          opacity="0.95"
        >
          Premium Real-Estate Sponsoring
        </text>
      </svg>
    </div>
  );
}
