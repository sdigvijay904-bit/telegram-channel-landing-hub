import React from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '../types';
import { PropertyNLogo } from './PropertyNLogo';

interface HeaderCardProps {
  config: AppConfig;
}

export function HeaderCard({ config }: HeaderCardProps) {
  const displayTitle = (config.title && !config.title.toLowerCase().includes('official'))
    ? config.title
    : "Join our community";

  const displaySubtitle = (config.subtitle && !config.subtitle.toLowerCase().includes('verification'))
    ? config.subtitle
    : "Get updates, educational content and community information.";

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3">
      {/* Top Gold Ring Circle Logo Container */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.03 }}
        className="w-28 h-28 sm:w-36 sm:h-36 rounded-full border-2 border-yellow-400/80 shadow-[0_0_25px_rgba(250,204,21,0.25)] bg-[#091322] flex items-center justify-center relative overflow-hidden shrink-0 mx-auto p-1"
      >
        <PropertyNLogo className="w-full h-full rounded-full" />
      </motion.div>

      {/* Brand Label */}
      <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wider uppercase">
        Money Master Hub
      </div>

      {/* Main Title */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="shrink-0 px-2"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
          {displayTitle}
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="w-full max-w-xs sm:max-w-sm mx-auto shrink-0 px-1"
      >
        <p className="text-xs sm:text-sm text-slate-300 font-normal leading-relaxed">
          {displaySubtitle}
        </p>
      </motion.div>

      {/* Feature Pills (Clear & Transparent Purposes) */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="flex items-center justify-center gap-2 pt-1 shrink-0 flex-wrap"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16273D] border border-slate-700/60 text-slate-200 text-xs font-medium">
          <span>📚</span>
          <span>Educational Content</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16273D] border border-slate-700/60 text-slate-200 text-xs font-medium">
          <span>📈</span>
          <span>Market Updates</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16273D] border border-slate-700/60 text-slate-200 text-xs font-medium">
          <span>💬</span>
          <span>Community Discussions</span>
        </div>
      </motion.div>
    </div>
  );
}

