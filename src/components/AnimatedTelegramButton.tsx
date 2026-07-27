import React from 'react';
import { motion } from 'motion/react';
import { Rocket, Shield, Sparkles, MessageCircle, ExternalLink, CheckCircle2, Clock } from 'lucide-react';
import { AnimationType, ThemeColor } from '../types';
import { themePresets } from '../utils/themeStyles';
import { getMetaDirectLink, isMetaInAppBrowser } from '../utils/telegramHelper';

function WhatsAppIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

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
  timeLeft?: number;
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
  totalClicks,
  timeLeft
}: AnimatedTelegramButtonProps) {
  const theme = themePresets[themeColor] || themePresets['red-emerald'];
  const directHref = getMetaDirectLink(telegramLink);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

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
              '0 0 15px rgba(37,211,102,0.4)',
              '0 0 45px rgba(37,211,102,0.9)',
              '0 0 15px rgba(37,211,102,0.4)'
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
    <div className="w-full space-y-3 my-3">
      {/* Main WhatsApp CTA Button Box with Green Radar Rings */}
      <div className="relative group w-full">
        {/* Glowing Radar Rings Background in WhatsApp Green */}
        <span className="absolute -inset-1 rounded-2xl bg-emerald-400/60 blur-md animate-pulse opacity-80 pointer-events-none" />
        <span className="absolute -inset-2 rounded-2xl bg-green-400/30 animate-ping opacity-40 pointer-events-none" />

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
          className="relative w-full overflow-hidden rounded-2xl py-3.5 sm:py-4 px-4 sm:px-6 bg-gradient-to-r from-[#25D366] via-[#20ba5a] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0e7065] text-white border-2 border-emerald-200/80 font-black tracking-wide shadow-[0_10px_30px_rgba(37,211,102,0.65)] transition-all duration-300 flex items-center justify-center cursor-pointer active:scale-95 no-underline block"
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

          {/* Main Action Text & WhatsApp Icon */}
          <div className="flex items-center justify-center space-x-2.5 text-base sm:text-lg md:text-xl font-black drop-shadow-md text-white">
            <motion.div
              animate={{ y: [0, -3, 0], rotate: [0, -8, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              className="shrink-0 text-white"
            >
              <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
            </motion.div>
            <span className="text-center font-black tracking-wide uppercase">
              {buttonText || "JOIN GROUP"}
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
        <div className="flex items-center justify-center text-[11px] font-semibold text-slate-600 gap-1.5 pt-0.5">
          <Rocket className="w-3 h-3 text-emerald-600 animate-bounce" />
          <span><strong className="text-emerald-700 font-bold">{totalClicks.toLocaleString()}</strong> WhatsApp Group Redirects Completed Today</span>
        </div>
      )}
    </div>
  );
}

