import React from 'react';
import { motion } from 'motion/react';
import { BadgeItem, ThemeColor } from '../types';
import { renderBadgeIcon } from '../utils/iconHelper';

interface BadgeListProps {
  badges: BadgeItem[];
  themeColor?: ThemeColor;
}

export function BadgeList({ badges }: BadgeListProps) {
  if (!badges || badges.length === 0) return null;

  // Helper to pick vibrant emoji/icon for the reference card look
  const getBadgeEmoji = (iconName: string, text: string) => {
    const t = text.toLowerCase();
    if (t.includes('telegram') || t.includes('join') || iconName === 'CheckCircle2') return '✅';
    if (t.includes('earn') || t.includes('₹') || t.includes('1000') || iconName === 'Banknote') return '💸';
    if (t.includes('seats') || t.includes('limited') || iconName === 'Flame') return '🔥';
    if (t.includes('payment') || t.includes('proof') || t.includes('signals') || iconName === 'Zap') return '⚡';
    return null;
  };

  return (
    <div className="w-full space-y-2.5 my-3">
      {badges.map((badge, index) => {
        const emoji = getBadgeEmoji(badge.icon, badge.text);

        return (
          <motion.div
            key={badge.id || index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-between px-4 py-3 sm:py-3.5 rounded-2xl bg-stone-100/95 hover:bg-white text-slate-800 border border-slate-200/80 shadow-md hover:shadow-lg transition-all duration-200 cursor-default"
          >
            <div className="flex items-center space-x-3 text-left">
              {emoji ? (
                <span className="text-xl sm:text-2xl shrink-0 leading-none">{emoji}</span>
              ) : (
                <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 shrink-0">
                  {renderBadgeIcon(badge.icon, "w-4 h-4")}
                </div>
              )}
              <span className="text-xs sm:text-sm font-extrabold tracking-tight text-slate-800 drop-shadow-none">
                {badge.text}
              </span>
            </div>

            {/* Verification check mark icon */}
            <div className="shrink-0 text-emerald-600 bg-emerald-200/70 rounded-full p-1 ml-2">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

