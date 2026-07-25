import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
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
            <PropertyNLogo className="w-14 h-14 sm:w-16 sm:h-16 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
          </motion.div>

          {/* Title with Verified Badge */}
          <div className="flex items-center justify-center space-x-1 flex-wrap">
            <h1 className={`text-lg sm:text-xl font-black tracking-tight ${theme.headerText} drop-shadow-sm`}>
              {config.title || "PropertyN Official"}
            </h1>
            <span className="inline-flex items-center bg-sky-500/30 text-sky-200 px-1.5 py-0.2 rounded-full text-[9px] font-semibold border border-sky-400/40">
              <ShieldCheck className="w-2.5 h-2.5 mr-0.5 text-sky-300 fill-sky-500" />
              Verified
            </span>
          </div>

          {/* Subtitle */}
          <p className="text-[10px] sm:text-[11px] text-white/90 max-w-xs mx-auto font-medium leading-tight mt-0.5">
            {config.subtitle || "Join India's Most Trusted Telegram Channel for Daily Earnings & Instant Updates"}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
