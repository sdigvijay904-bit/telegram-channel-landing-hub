import React from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '../types';
import { themePresets } from '../utils/themeStyles';
import { PropertyNLogo } from './PropertyNLogo';

interface HeaderCardProps {
  config: AppConfig;
}

export function HeaderCard({ config }: HeaderCardProps) {
  const theme = themePresets[config.themeColor] || themePresets['frosted-glass'];

  return (
    <div className="w-full">
      {/* Main Compact Header Card Box */}
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`relative overflow-hidden rounded-2xl p-2.5 sm:p-3 text-center shadow-lg border ${theme.headerBg} ${theme.cardBorder}`}
      >
        {/* Background glow effects */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-white/20 rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-10 -right-10 w-20 h-20 bg-amber-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* PropertyN Logo Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mb-1.5 shrink-0 transition-transform duration-200"
          >
            <PropertyNLogo className="w-14 h-14 sm:w-16 sm:h-16" />
          </motion.div>

          {/* Title */}
          <div className="flex items-center justify-center space-x-1 flex-wrap">
            <h1 className={`text-lg sm:text-xl font-black tracking-tight ${theme.headerText}`}>
              {config.title || "PropertyN Official"}
            </h1>
          </div>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-[11px] text-slate-600 max-w-xs mx-auto font-medium leading-tight mt-0.5">
            {config.subtitle || "Join the Official PropertyN Community for Updates & Announcements"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
