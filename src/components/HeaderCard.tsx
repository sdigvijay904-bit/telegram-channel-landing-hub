import React from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '../types';
import { PropertyNLogo } from './PropertyNLogo';

interface HeaderCardProps {
  config: AppConfig;
}

export function HeaderCard({ config }: HeaderCardProps) {
  const displayTitle = config.title || "Official Community Access";

  const displaySubtitle = config.subtitle || "Secure verification is required before continuing.\nPlease click the button below to proceed.";

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3 sm:space-y-4">
      {/* Top Gold Ring Circle Logo Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.03 }}
        className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-2 border-yellow-400/80 shadow-[0_0_25px_rgba(234,179,8,0.3)] bg-[#091322] flex items-center justify-center relative overflow-hidden shrink-0 mx-auto p-1"
      >
        <PropertyNLogo className="w-full h-full rounded-full" />
      </motion.div>

      {/* Main Title */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="shrink-0 px-1 pt-1"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
          {displayTitle}
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="w-full max-w-sm mx-auto shrink-0 px-2"
      >
        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed whitespace-pre-line">
          {displaySubtitle}
        </p>
      </motion.div>

      {/* 3 Pills Row (Secure, Fast, Verified) */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center justify-center gap-2 pt-1 shrink-0 flex-wrap"
      >
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#112238] border border-slate-700/60 text-slate-200 text-xs sm:text-sm font-medium">
          <span>🔒</span>
          <span>Secure</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#112238] border border-slate-700/60 text-slate-200 text-xs sm:text-sm font-medium">
          <span>⚡</span>
          <span>Fast</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#112238] border border-slate-700/60 text-slate-200 text-xs sm:text-sm font-medium">
          <span>✓</span>
          <span>Verified</span>
        </div>
      </motion.div>
    </div>
  );
}

