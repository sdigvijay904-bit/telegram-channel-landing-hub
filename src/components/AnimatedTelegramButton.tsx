import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { AnimationType } from '../types';
import { getMetaDirectLink, isMetaInAppBrowser, performSmartNavigation } from '../utils/telegramHelper';

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
  buttonText = 'Continue',
  whatsappLink = '',
  onClick
}: AnimatedTelegramButtonProps) {
  // Target Link resolution: Priority to telegramLink, fallback to whatsappLink
  const cleanTelegram = (telegramLink || '').trim();
  const cleanWhatsapp = (whatsappLink || '').trim();

  const targetUrl = cleanTelegram || cleanWhatsapp || 'https://t.me/+BIHzLUxxu2swNDk1';
  const directHref = getMetaDirectLink(targetUrl);

  const isMetaBrowser = isMetaInAppBrowser();

  const [timeLeft, setTimeLeft] = useState<number>(5);
  const [hasRedirected, setHasRedirected] = useState<boolean>(false);
  const redirectTriggeredRef = useRef<boolean>(false);

  const executeRedirect = () => {
    if (redirectTriggeredRef.current) return;
    redirectTriggeredRef.current = true;
    setHasRedirected(true);

    if (onClick) onClick();

    performSmartNavigation(targetUrl);
  };

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    executeRedirect();
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      executeRedirect();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Label: Default to "Continue"
  const rawLabel = (buttonText || '').trim();
  const label = rawLabel || "Continue";

  return (
    <div className="w-full flex flex-col items-center text-center space-y-2.5 pt-0.5 w-full max-w-sm mx-auto shrink-0">
      {/* Main Action CTA Button with Pulse & Glow Animation */}
      <motion.a
        href={directHref}
        target={isMetaBrowser ? "_self" : "_blank"}
        rel="noopener noreferrer"
        onClick={handleJoinClick}
        animate={{
          scale: [1, 1.02, 1],
          boxShadow: [
            "0 4px 14px rgba(0, 112, 255, 0.35)",
            "0 6px 22px rgba(0, 112, 255, 0.65)",
            "0 4px 14px rgba(0, 112, 255, 0.35)"
          ]
        }}
        transition={{
          repeat: Infinity,
          duration: 2.2,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="relative overflow-hidden w-full py-3 px-6 sm:py-3.5 sm:px-6 rounded-xl sm:rounded-2xl bg-[#0070FF] hover:bg-[#0062D6] text-white font-extrabold text-base sm:text-lg tracking-wide flex items-center justify-center cursor-pointer transition-colors no-underline block z-10"
      >
        {/* Shimmer / Light Beam Effect */}
        <motion.div
          animate={{
            x: ['-100%', '200%']
          }}
          transition={{
            repeat: Infinity,
            repeatDelay: 1.5,
            duration: 1.8,
            ease: "easeInOut"
          }}
          className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12 pointer-events-none"
        />
        <span className="font-extrabold text-white uppercase tracking-wider relative z-10">
          {label}
        </span>
      </motion.a>

      {/* Timer Badge Capsule */}
      <div className="w-full py-2.5 px-4 rounded-xl bg-[#0d1e36] border border-slate-700/60 flex items-center justify-center gap-2 text-slate-200 text-xs sm:text-sm font-semibold shadow-inner">
        <span>00:{String(timeLeft).padStart(2, '0')}</span>
      </div>

      {/* Information Text Box */}
      <div className="w-full px-2 py-1 text-slate-300 text-xs sm:text-sm text-center font-normal leading-relaxed">
        Your access link is generated securely and redirects automatically after verification.
      </div>

      {/* Disclaimers & Footer note from screenshot */}
      <div className="w-full pt-3 mt-1">
        <p className="text-[10px] sm:text-[11px] text-slate-400 text-center leading-relaxed px-1">
          This platform is intended for informational and access purposes only. Users must be 18+. This site is not affiliated with Facebook™ or Telegram™.
        </p>
      </div>
    </div>
  );
}
