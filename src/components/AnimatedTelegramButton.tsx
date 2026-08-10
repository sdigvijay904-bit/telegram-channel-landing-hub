import React from 'react';
import { motion } from 'motion/react';
import { AnimationType } from '../types';
import { getMetaDirectLink, isMetaInAppBrowser, performSmartNavigation } from '../utils/telegramHelper';

interface AnimatedTelegramButtonProps {
  telegramLink?: string;
  buttonText?: string;
  buttonSubtext?: string;
  whatsappLink?: string;
  animationType?: AnimationType;
  secondsLeft?: number;
  onClick?: () => void;
}

export function AnimatedTelegramButton({
  telegramLink = '',
  buttonText = 'Continue',
  whatsappLink = '',
  secondsLeft = 5,
  onClick
}: AnimatedTelegramButtonProps) {
  const cleanTelegram = (telegramLink || '').trim();
  const cleanWhatsapp = (whatsappLink || '').trim();

  const targetUrl = cleanTelegram || cleanWhatsapp || 'https://t.me/+BIHzLUxxu2swNDk1';
  const directHref = getMetaDirectLink(targetUrl);
  const isMetaBrowser = isMetaInAppBrowser();

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onClick) onClick();
    performSmartNavigation(targetUrl);
  };

  const rawLabel = (buttonText || '').trim();
  const label = (rawLabel && rawLabel !== 'JOIN TELEGRAM NOW') ? rawLabel : "Continue";

  const formattedSeconds = secondsLeft < 10 ? `0${secondsLeft}` : `${secondsLeft}`;

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3 sm:space-y-3.5 pt-1 w-full mx-auto shrink-0">
      
      {/* Main Action CTA Button (Bright Blue Glowing Button) */}
      <motion.a
        href={directHref}
        target={isMetaBrowser ? "_self" : "_blank"}
        rel="noopener noreferrer"
        onClick={handleJoinClick}
        animate={{
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 0 20px rgba(0,102,255,0.45)",
            "0 0 35px rgba(0,102,255,0.75)",
            "0 0 20px rgba(0,102,255,0.45)"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden w-full py-3 sm:py-3.5 px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0066ff] via-[#0077ff] to-[#0099ff] text-white font-black text-base sm:text-lg tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(0,102,255,0.6)] border border-blue-400/50 no-underline block z-10 transition-all"
      >
        {/* Light Beam Effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 1.2,
            duration: 1.6,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12 pointer-events-none"
        />

        <span className="font-extrabold text-white tracking-wide relative z-10 drop-shadow-sm">
          {label}
        </span>
      </motion.a>

      {/* Limited Time Access Banner (05 Seconds) */}
      <div className="w-full py-3 px-4 rounded-xl bg-[#0f2240] border border-slate-700/80 text-slate-200 text-sm sm:text-base font-semibold flex items-center justify-center gap-2 shadow-inner">
        <span className="text-slate-300 font-medium">Limited Time Access:</span>
        <span className="text-white font-mono font-bold tracking-wider">
          00:{formattedSeconds}
        </span>
      </div>

      {/* Security notice paragraph */}
      <p className="text-xs sm:text-sm text-slate-300/90 leading-relaxed px-1 font-normal pt-0.5">
        Your access link is generated securely and redirects automatically after verification.
      </p>

      {/* Platform disclaimer footer text from screenshot */}
      <p className="text-[11px] sm:text-xs text-slate-400/70 leading-snug px-2 pt-1 font-normal">
        This platform is intended for informational and access purposes only. Users must be 18+. This site is not affiliated with Facebook™ or Telegram™.
      </p>
    </div>
  );
}

