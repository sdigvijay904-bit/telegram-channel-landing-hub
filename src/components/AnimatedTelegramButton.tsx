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
  onClick?: () => void;
}

export function AnimatedTelegramButton({
  telegramLink = '',
  buttonText = 'JOIN TELEGRAM NOW',
  whatsappLink = '',
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
  const label = rawLabel || "JOIN TELEGRAM NOW";

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3 pt-2 w-full max-w-sm sm:max-w-md mx-auto shrink-0">
      {/* Pink-Purple Gradient Action CTA Button */}
      <motion.a
        href={directHref}
        target={isMetaBrowser ? "_self" : "_blank"}
        rel="noopener noreferrer"
        onClick={handleJoinClick}
        animate={{
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 0 20px rgba(217,70,239,0.4)",
            "0 0 35px rgba(217,70,239,0.7)",
            "0 0 20px rgba(217,70,239,0.4)"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d946ef] via-[#a855f7] to-[#6366f1] text-white font-black text-base sm:text-lg tracking-wider flex items-center justify-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(217,70,239,0.5)] border border-fuchsia-400/40 no-underline block z-10 uppercase transition-all"
      >
        {/* Shimmer Light Beam Effect */}
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
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
        />

        {/* Paper Airplane Telegram Icon */}
        <svg
          className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white shrink-0 -rotate-12"
          viewBox="0 0 24 24"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.69-.52.36-1 .54-1.43.53-.47-.01-1.37-.26-2.05-.48-.83-.27-1.49-.42-1.43-.88.03-.24.38-.49 1.04-.75 4.08-1.78 6.81-2.95 8.19-3.53 3.9-1.63 4.71-1.91 5.24-1.92.12 0 .37.03.54.17.14.12.18.28.2.42-.01.06.01.24 0 .38z" />
        </svg>

        <span className="font-extrabold text-white uppercase tracking-wider relative z-10 drop-shadow-sm">
          {label}
        </span>
      </motion.a>
    </div>
  );
}
