import React from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '../types';
import { CoinsathiLogo } from './CoinsathiLogo';

interface HeaderCardProps {
  config: AppConfig;
}

export function HeaderCard({ config }: HeaderCardProps) {
  const displayTitle = config.title || "COIN SATHI";
  const displayOfficialTag = config.officialTag || "OFFICIAL CHANNEL";

  const stat1Value = config.stat1Value || "1.5M";
  const stat1Label = config.stat1Label || "SUBSCRIBERS";

  const stat2Value = config.stat2Value || "99%";
  const stat2Label = config.stat2Label || "ACCURACY";

  const stat3Value = config.stat3Value || "24/7";
  const stat3Label = config.stat3Label || "SUPPORT";

  const features = config.features && config.features.length > 0 ? config.features : [
    "Daily free predictions & analysis",
    "High accuracy session reports",
    "Verified winning strategies"
  ];

  return (
    <div className="w-full flex flex-col items-center text-center space-y-4">
      {/* Top Circular Logo with Cyan/Blue Glow Ring */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ scale: 1.04 }}
        className="relative p-[3px] rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-fuchsia-500 shadow-[0_0_35px_rgba(6,182,212,0.6)] shrink-0 mx-auto"
      >
        <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#0a0518] p-1 overflow-hidden flex items-center justify-center">
          <CoinsathiLogo logoUrl={config.logoUrl} className="w-full h-full" />
        </div>
      </motion.div>

      {/* Main Title Name */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="shrink-0 px-1 pt-1"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider uppercase drop-shadow-md font-sans">
          {displayTitle}
        </h1>
      </motion.div>

      {/* Official Channel Pill Badge */}
      <motion.div
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="shrink-0"
      >
        <div className="inline-block px-5 py-1.5 rounded-full bg-[#3c1361]/80 border border-fuchsia-500/40 text-fuchsia-200 text-xs sm:text-sm font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(168,85,247,0.3)]">
          {displayOfficialTag}
        </div>
      </motion.div>

      {/* Stats Metric Row (3 Columns) */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="w-full grid grid-cols-3 gap-2 pt-2 px-1"
      >
        <div className="flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
            {stat1Value}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-purple-200/70 tracking-widest uppercase mt-0.5">
            {stat1Label}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center border-x border-purple-800/40 px-1">
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
            {stat2Value}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-purple-200/70 tracking-widest uppercase mt-0.5">
            {stat2Label}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <span className="text-xl sm:text-2xl font-black text-white tracking-tight drop-shadow-sm">
            {stat3Value}
          </span>
          <span className="text-[10px] sm:text-xs font-semibold text-purple-200/70 tracking-widest uppercase mt-0.5">
            {stat3Label}
          </span>
        </div>
      </motion.div>

      {/* Horizontal Divider Line */}
      <div className="w-full h-[1px] bg-purple-800/35 my-1" />

      {/* Feature Checklist (3 items with icons) */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="w-full space-y-3 pt-1 text-left px-2 sm:px-4"
      >
        {/* Item 1: Checkmark in Circle */}
        <div className="flex items-center gap-3 text-slate-100 text-sm sm:text-base font-medium">
          <div className="w-6 h-6 rounded-full border border-purple-400/50 bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-300">
            <svg className="w-4 h-4 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <span>{features[0]}</span>
        </div>

        {/* Item 2: Upward Trend Chart Icon */}
        <div className="flex items-center gap-3 text-slate-100 text-sm sm:text-base font-medium">
          <div className="w-6 h-6 rounded-full border border-purple-400/50 bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-300">
            <svg className="w-4 h-4 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a.5.5 0 00.71 0L21.75 8M21.75 8H16.5m5.25 0v5.25" />
            </svg>
          </div>
          <span>{features[1]}</span>
        </div>

        {/* Item 3: Shield Icon */}
        <div className="flex items-center gap-3 text-slate-100 text-sm sm:text-base font-medium">
          <div className="w-6 h-6 rounded-full border border-purple-400/50 bg-purple-950/60 flex items-center justify-center shrink-0 text-purple-300">
            <svg className="w-4 h-4 stroke-current fill-none stroke-[2.5]" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
          </div>
          <span>{features[2]}</span>
        </div>
      </motion.div>
    </div>
  );
}
