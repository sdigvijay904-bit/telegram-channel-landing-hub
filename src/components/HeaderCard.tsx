import React from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '../types';
import { PropertyNLogo } from './PropertyNLogo';

interface HeaderCardProps {
  config: AppConfig;
}

export function HeaderCard({ config }: HeaderCardProps) {
  return (
    <div className="w-full flex flex-col items-center text-center space-y-2 py-0">
      {/* Top Best Application Crown Emblem Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer drop-shadow-[0_0_15px_rgba(255,215,0,0.3)] shrink-0"
      >
        <PropertyNLogo className="w-22 h-22 sm:w-28 sm:h-28" />
      </motion.div>

      {/* Neon Green Border Capsule Pill: "Best Online Earning" */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="w-full max-w-[280px] sm:max-w-xs rounded-full bg-black/90 border-2 border-[#00ff66] shadow-[0_0_15px_rgba(0,255,102,0.4)] py-1.5 px-4 text-center shrink-0"
      >
        <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight flex items-center justify-center gap-1.5">
          <span className="text-[#00ff66] drop-shadow-[0_0_6px_rgba(0,255,102,0.8)]">Best</span>
          <span className="text-white">Online Earning</span>
        </h1>
      </motion.div>

      {/* Subheading: "BEST EARNING Platform" */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.3 }}
        className="shrink-0"
      >
        <h2 className="text-lg sm:text-2xl font-extrabold text-[#00ff66] tracking-wide drop-shadow-[0_0_10px_rgba(0,255,102,0.6)] uppercase">
          {config.title && config.title !== "PropertyN Official" ? config.title : "BEST EARNING PLATFORM"}
        </h2>
      </motion.div>

      {/* Platform Features Section */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="w-full max-w-sm mx-auto space-y-1 pt-0.5 px-1 shrink-0"
      >
        <h3 className="text-sm sm:text-base font-extrabold text-white tracking-wide">
          Why Download Our Earning Platform?
        </h3>

        <div className="text-white font-bold text-xs sm:text-sm leading-tight flex flex-wrap items-center justify-center gap-x-2 gap-y-1 px-1">
          <span className="flex items-center gap-1">
            <span className="text-white text-[10px]">●</span> Easy Daily Tasks
          </span>
          <span className="flex items-center gap-1">
            <span className="text-white text-[10px]">●</span> Instant Profit
          </span>
          <span className="flex items-center gap-1">
            <span className="text-white text-[10px]">●</span> 100% Secure Platform
          </span>
          <span className="flex items-center gap-1">
            <span className="text-white text-[10px]">●</span> Zero Investment Needed
          </span>
          <span className="flex items-center gap-1">
            <span className="text-white text-[10px]">●</span> Start Earning From Day One
          </span>
        </div>
      </motion.div>
    </div>
  );
}
