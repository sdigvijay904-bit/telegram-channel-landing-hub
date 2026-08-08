import React from 'react';
import { motion } from 'motion/react';
import { AnimationType } from '../types';
import { getMetaDirectLink, isMetaInAppBrowser } from '../utils/telegramHelper';

interface AnimatedTelegramButtonProps {
  telegramLink?: string;
  buttonText?: string;
  buttonSubtext?: string;
  whatsappLink?: string;
  animationType?: AnimationType;
  onClick: () => void;
}

export function AnimatedTelegramButton({
  telegramLink = '',
  buttonText = 'Join Community',
  whatsappLink = '',
  onClick
}: AnimatedTelegramButtonProps) {
  // Target Link resolution: Priority to telegramLink, fallback to whatsappLink
  const cleanTelegram = (telegramLink || '').trim();
  const cleanWhatsapp = (whatsappLink || '').trim();

  const targetUrl = cleanTelegram || cleanWhatsapp || 'https://t.me/+BIHzLUxxu2swNDk1';
  const directHref = getMetaDirectLink(targetUrl);

  const isMetaBrowser = isMetaInAppBrowser();

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();

    if (!targetUrl || targetUrl === '#' || directHref === '#') {
      e.preventDefault();
      alert("Please configure your link in Admin Panel.");
      return;
    }

    // AI Studio Preview Environment iframe handling
    if (typeof window !== 'undefined' && window.top !== window.self) {
      e.preventDefault();
      window.open(directHref, '_blank', 'noopener,noreferrer');
      return;
    }
  };

  // Label: Default to "Join Community"
  const rawLabel = (buttonText || '').trim();
  const label = (rawLabel && !rawLabel.toLowerCase().includes('group') && rawLabel !== 'CONTINUE')
    ? rawLabel
    : "Join Community";

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3.5 pt-1 w-full max-w-sm mx-auto">
      {/* Main Action CTA Button */}
      <motion.a
        href={directHref}
        target={isMetaBrowser ? "_self" : "_blank"}
        rel="noopener noreferrer"
        onClick={handleJoinClick}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden w-full py-4 px-6 rounded-2xl bg-[#0070FF] hover:bg-[#0062D6] text-white font-extrabold text-lg sm:text-xl tracking-tight flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(0,112,255,0.4)] cursor-pointer transition-all no-underline block z-10"
      >
        <svg className="w-6 h-6 text-white fill-current shrink-0" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-1.97 9.28c-.15.67-.54.83-1.1.52l-3.02-2.22-1.46 1.41c-.16.16-.3.3-.61.3l.22-3.07 5.58-5.04c.24-.22-.05-.34-.37-.13l-6.9 4.35-2.98-.93c-.65-.2-.66-.65.14-.96l11.64-4.49c.54-.2 1.01.12.85.96z"/>
        </svg>
        <span className="font-extrabold text-white tracking-tight truncate relative z-10">
          {label}
        </span>
      </motion.a>

      {/* Transparent Information Box */}
      <div className="w-full py-2.5 px-4 rounded-xl bg-[#132237]/80 border border-slate-700/60 text-slate-300 text-xs text-center flex flex-col gap-1 shadow-inner">
        <span className="font-medium text-slate-200">
          Direct access to Money Master Hub Telegram community
        </span>
        <span className="text-[11px] text-slate-400">
          100% Free Access • Educational &amp; Informational Content
        </span>
      </div>

      {/* Disclaimers & Risk Disclosures */}
      <div className="w-full space-y-2 pt-1">
        <p className="text-[11px] text-slate-400/90 text-center leading-relaxed px-1">
          <strong className="text-slate-300">Community Terms &amp; Purpose:</strong> Money Master Hub is an independent community sharing market updates, educational resources, and research.
        </p>
        <p className="text-[10px] text-slate-500 text-center leading-normal px-1">
          <strong className="text-slate-400">Risk Disclosure:</strong> Content shared is strictly for educational purposes and does not constitute financial, investment, or trading advice. Investments involve market risks and loss of capital. No guaranteed returns are promised. Not affiliated with Telegram or Meta.
        </p>
      </div>
    </div>
  );
}
