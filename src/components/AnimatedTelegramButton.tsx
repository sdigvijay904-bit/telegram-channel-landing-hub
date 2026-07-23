import React from 'react';
import { motion } from 'motion/react';
import { Send, Rocket, Shield, Sparkles, MessageCircle, ExternalLink, CheckCircle2 } from 'lucide-react';
import { AnimationType, ThemeColor } from '../types';
import { themePresets } from '../utils/themeStyles';
import { getMetaDirectLink, isMetaInAppBrowser } from '../utils/telegramHelper';

interface AnimatedTelegramButtonProps {
  telegramLink?: string;
  buttonText: string;
  buttonSubtext: string;
  secondaryButtonText?: string;
  whatsappLink?: string;
  showWhatsapp?: boolean;
  animationType: AnimationType;
  themeColor: ThemeColor;
  onClick: () => void;
  onWhatsappClick?: () => void;
  totalClicks?: number;
}

export function AnimatedTelegramButton({
  telegramLink = '',
  buttonText,
  buttonSubtext,
  secondaryButtonText,
  whatsappLink,
  showWhatsapp,
  animationType,
  themeColor,
  onClick,
  onWhatsappClick,
  totalClicks
}: AnimatedTelegramButtonProps) {
  const theme = themePresets[themeColor] || themePresets['red-emerald'];
  const directHref = getMetaDirectLink(telegramLink);

  // Button Animation Variants
  const getAnimationProps = () => {
    switch (animationType) {
      case 'bounce':
        return {
          animate: {
            scale: [1, 1.04, 1, 1.03, 1],
            y: [0, -3, 0, -2, 0]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop" as const,
            ease: "easeInOut"
          }
        };
      case 'ripple-ring':
        return {
          animate: {
            scale: [1, 1.025, 1]
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop" as const
          }
        };
      case 'neon-breath':
        return {
          animate: {
            boxShadow: [
              '0 0 15px rgba(16,185,129,0.3)',
              '0 0 45px rgba(16,185,129,0.85)',
              '0 0 15px rgba(16,185,129,0.3)'
            ]
          },
          transition: {
            duration: 2,
            repeat: Infinity,
            repeatType: "loop" as const
          }
        };
      case 'shimmer':
      case 'pulse-glow':
      default:
        return {
          animate: {
            scale: [1, 1.03, 1]
          },
          transition: {
            duration: 2.2,
            repeat: Infinity,
            repeatType: "loop" as const,
            ease: "easeInOut"
          }
        };
    }
  };

  const animProps = getAnimationProps();

  return (
    <div className="w-full space-y-2.5 my-3">
      {/* Main Telegram CTA Button Box with Radar Rings */}
      <div className="relative group w-full">
        {/* Glowing Radar Rings Background */}
        <span className="absolute -inset-1 rounded-2xl bg-sky-400/50 blur-md animate-pulse opacity-80 pointer-events-none" />
        <span className="absolute -inset-2 rounded-2xl bg-cyan-400/20 animate-ping opacity-40 pointer-events-none" />

        <motion.a
          href={directHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!telegramLink || directHref === '#') {
              e.preventDefault();
              if (onClick) onClick();
              return;
            }
            if (onClick) onClick();
          }}
          {...animProps}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          className="relative w-full overflow-hidden rounded-2xl py-3.5 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-[#0088cc] via-[#2AABEE] to-[#0088cc] hover:from-[#0077b5] hover:to-[#229ED9] text-white border-2 border-sky-200/60 font-black tracking-wide shadow-[0_10px_30px_rgba(0,136,204,0.7)] transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 no-underline block"
        >
          {/* Shimmer Light Beam Effect */}
          <motion.div
            initial={{ x: '-150%' }}
            animate={{ x: '250%' }}
            transition={{
              repeat: Infinity,
              duration: 2,
              repeatDelay: 0.5,
              ease: 'easeInOut'
            }}
            className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-12 pointer-events-none"
          />

          {/* Main Action Text & Icon */}
          <div className="flex items-center justify-center space-x-2.5 text-base sm:text-lg md:text-xl font-black drop-shadow-md text-white">
            <motion.div
              animate={{ y: [0, -3, 0], rotate: [0, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="shrink-0 text-white"
            >
              <Send className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
            </motion.div>
            <span className="text-center font-black tracking-wide uppercase">
              {buttonText || "JOIN TELEGRAM CHANNEL NOW"}
            </span>
          </div>
        </motion.a>
      </div>

      {/* Secondary WhatsApp Button if enabled */}
      {showWhatsapp && (
        <motion.button
          onClick={onWhatsappClick || (() => window.open(whatsappLink || "https://wa.me/", "_blank"))}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md border border-emerald-400/30 flex items-center justify-center space-x-1.5 transition-all"
        >
          <MessageCircle className="w-4 h-4 fill-white/20 text-white" />
          <span>{secondaryButtonText || "JOIN WHATSAPP NOW"}</span>
        </motion.button>
      )}

      {/* Real-time Click Count or Trust Pill */}
      {totalClicks !== undefined && totalClicks > 0 && (
        <div className="flex items-center justify-center text-[11px] font-semibold text-blue-200/80 gap-1.5 pt-0.5">
          <Rocket className="w-3 h-3 text-cyan-400 animate-bounce" />
          <span><strong className="text-cyan-300">{totalClicks.toLocaleString()}</strong> Telegram Redirects Completed Today</span>
        </div>
      )}
    </div>
  );
}

