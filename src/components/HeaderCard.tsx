import React from 'react';
import { motion } from 'motion/react';
import { AppConfig } from '../types';
import { PropertyNLogo } from './PropertyNLogo';

interface HeaderCardProps {
  config: AppConfig;
}

export function HeaderCard({ config }: HeaderCardProps) {
  return (
    <div className="w-full flex flex-col items-center text-center space-y-4 py-2">
      {/* Top Best Application Crown Emblem Logo */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="cursor-pointer drop-shadow-[0_0_20px_rgba(255,215,0,0.3)]"
      >
        <PropertyNLogo className="w-32 h-32 sm:w-40 sm:h-40" />
      </motion.div>

      {/* Neon Green Border Capsule Pill: "Best Online Earning" */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="w-full max-w-xs sm:max-w-sm rounded-full bg-black/80 border-2 border-[#00ff66] shadow-[0_0_20px_rgba(0,255,102,0.4)] py-2.5 px-6 sm:py-3.5 sm:px-8 text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center justify-center gap-2">
          <span className="text-[#00ff66] drop-shadow-[0_0_8px_rgba(0,255,102,0.8)]">Best</span>
          <span className="text-white">Online Earning</span>
        </h1>
      </motion.div>

      {/* Subheading: "BEST EARNING Platform" */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#00ff66] tracking-wide drop-shadow-[0_0_12px_rgba(0,255,102,0.6)]">
          {config.title && config.title !== "PropertyN Official" ? config.title : "BEST EARNING Platform"}
        </h2>
      </motion.div>

      {/* Platform Features Section */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="w-full max-w-md mx-auto space-y-2.5 pt-1 px-2"
      >
        <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide">
          Why Download Our Earning Platform?
        </h3>

        <div className="text-white font-extrabold text-base sm:text-lg leading-relaxed flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 px-2">
          <span className="flex items-center gap-1">
            <span className="text-white text-xs">●</span> Easy Daily Tasks
          </span>
          <span className="flex items-center gap-1">
            <span className="text-white text-xs">●</span> Instant Profit
          </span>
          <span className="flex items-center gap-1">
            <span className="text-white text-xs">●</span> 100% Secure Platform
          </span>
          <span className="flex items-center gap-1">
            <span className="text-white text-xs">●</span> Zero Investment Needed
          </span>
          <span className="flex items-center gap-1">
            <span className="text-white text-xs">●</span> Start Earning From Day One
          </span>
        </div>
      </motion.div>
    </div>
  );
}
