import React from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '../types';
import { PropertyNLogo } from './PropertyNLogo';

interface HeaderCardProps {
  config: AppConfig;
}

export function HeaderCard({ config }: HeaderCardProps) {
  return (
    <div className="w-full flex flex-col items-center text-center space-y-2.5 sm:space-y-3.5 py-1">
      {/* Top Best Application Crown Emblem Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer drop-shadow-[0_0_20px_rgba(255,215,0,0.4)] shrink-0"
      >
        <PropertyNLogo className="w-28 h-28 sm:w-36 sm:h-36" />
      </motion.div>

      {/* Neon Green Border Capsule Pill: "Best Online Earning" */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="w-full max-w-[310px] sm:max-w-sm rounded-full bg-black/90 border-2 border-[#00ff66] shadow-[0_0_18px_rgba(0,255,102,0.5)] py-2 px-5 text-center shrink-0"
      >
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center justify-center gap-2">
          <span className="text-[#00ff66] drop-shadow-[0_0_8px_rgba(0,255,102,0.9)]">Best</span>
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
        <h2 className="text-xl sm:text-3xl font-black text-[#00ff66] tracking-wide drop-shadow-[0_0_12px_rgba(0,255,102,0.7)] uppercase">
          {config.title && config.title !== "PropertyN Official" ? config.title : "BEST EARNING PLATFORM"}
        </h2>
      </motion.div>

      {/* Platform Features Section */}
      <motion.div
        initial={{ y: 5, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="w-full max-w-md mx-auto space-y-1.5 pt-1 px-1 shrink-0"
      >
        <h3 className="text-base sm:text-lg font-extrabold text-white tracking-wide">
          Why Download Our Earning Platform?
        </h3>

        <div className="text-white font-bold text-sm sm:text-base leading-snug flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 px-1">
          <span className="flex items-center gap-1.5">
            <span className="text-[#00ff66] text-[12px]">●</span> Easy Daily Tasks
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#00ff66] text-[12px]">●</span> Instant Profit
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#00ff66] text-[12px]">●</span> 100% Secure Platform
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#00ff66] text-[12px]">●</span> Zero Investment Needed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#00ff66] text-[12px]">●</span> Start Earning From Day One
          </span>
        </div>
      </motion.div>
    </div>
  );
}
