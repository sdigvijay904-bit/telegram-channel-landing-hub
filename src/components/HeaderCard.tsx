import React from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '../types';
import { CoinsathiLogo } from './CoinsathiLogo';

interface HeaderCardProps {
  config: AppConfig;
}

export function HeaderCard({ config }: HeaderCardProps) {
  const displayTitle = "Official Community Access";

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3 sm:space-y-3.5">
      {/* Top Circular Logo with Gold Glow Ring */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        whileHover={{ scale: 1.03 }}
        className="relative p-[3px] rounded-full bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-200 shadow-[0_0_35px_rgba(234,179,8,0.55)] shrink-0 mx-auto my-1"
      >
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-[#050b14] p-1 overflow-hidden flex items-center justify-center">
          <CoinsathiLogo logoUrl={config.logoUrl} className="w-full h-full" />
        </div>
      </motion.div>

      {/* Main Heading: Official Community Access */}
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.25 }}
        className="shrink-0 px-2"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
          {displayTitle}
        </h1>
      </motion.div>

      {/* Subtitle Description */}
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.12, duration: 0.25 }}
        className="text-slate-300 text-sm sm:text-base leading-relaxed px-2 font-normal"
      >
        <p>Secure verification is required before continuing.</p>
        <p>Please click the button below to proceed.</p>
      </motion.div>

      {/* 3 Security Pill Badges (Secure, Fast, Verified) */}
      <motion.div
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.16, duration: 0.25 }}
        className="flex items-center justify-center gap-2.5 sm:gap-3 w-full pt-1"
      >
        <div className="px-3.5 py-1.5 rounded-full bg-[#0d1e38] border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm">
          <span className="text-amber-400">🔒</span> Secure
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#0d1e38] border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm">
          <span className="text-yellow-400">⚡</span> Fast
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-[#0d1e38] border border-slate-700/80 text-slate-200 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm">
          <span className="text-emerald-400">✓</span> Verified
        </div>
      </motion.div>
    </div>
  );
}
