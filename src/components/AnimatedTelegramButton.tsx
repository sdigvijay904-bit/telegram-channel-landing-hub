import React, { useState, useEffect, useRef } from 'react';
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
  buttonText = 'Continue',
  whatsappLink = '',
  animationType = 'pulse-glow',
  onClick
}: AnimatedTelegramButtonProps) {
  // Target Link resolution: Priority to telegramLink, fallback to whatsappLink
  const cleanTelegram = (telegramLink || '').trim();
  const cleanWhatsapp = (whatsappLink || '').trim();

  const targetUrl = cleanTelegram || cleanWhatsapp || '';
  const directHref = getMetaDirectLink(targetUrl);

  const isMetaBrowser = isMetaInAppBrowser();

  // 5 Second Timeout State
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const startFiveSecondTimeout = () => {
    if (isRedirecting) return;
    setIsRedirecting(true);
    setSecondsLeft(5);

    let current = 5;
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      current -= 1;
      setSecondsLeft(current);

      if (current <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);

        // Redirect after 5s timeout
        if (typeof window !== 'undefined' && window.top !== window.self) {
          window.open(directHref, '_blank', 'noopener,noreferrer');
        } else {
          window.location.href = directHref;
        }
      }
    }, 1000);
  };

  const handleJoinClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onClick) onClick();

    if (!targetUrl || targetUrl === '#' || directHref === '#') {
      alert("Please configure your link in Admin Panel.");
      return;
    }

    startFiveSecondTimeout();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Determine display label - default to "Continue"
  const rawLabel = (buttonText || '').trim();
  const label = (rawLabel && !rawLabel.toLowerCase().includes('group') && rawLabel !== 'CONTINUE')
    ? rawLabel
    : "Continue";

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3.5 pt-1 w-full max-w-sm mx-auto">
      {/* Main Action Button */}
      <motion.button
        type="button"
        onClick={handleJoinClick}
        disabled={isRedirecting}
        whileHover={{ scale: isRedirecting ? 1 : 1.02 }}
        whileTap={{ scale: isRedirecting ? 1 : 0.97 }}
        className={`relative overflow-hidden w-full py-3.5 px-6 rounded-2xl text-white font-bold text-lg sm:text-xl tracking-tight flex items-center justify-center shadow-[0_4px_20px_rgba(0,112,255,0.4)] cursor-pointer transition-all border-none ${
          isRedirecting ? 'bg-[#0052C2] opacity-90' : 'bg-[#0070FF] hover:bg-[#0062D6]'
        }`}
      >
        {isRedirecting ? (
          <div className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="font-bold text-white tracking-tight">
              Verifying...
            </span>
          </div>
        ) : (
          <span className="font-bold text-white tracking-tight truncate relative z-10">
            {label}
          </span>
        )}
      </motion.button>

      {/* Limited Time Access Timer Pill with 00:05 Timeout Countdown */}
      <div className={`w-full py-2.5 px-4 rounded-xl border text-slate-200 font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 shadow-inner transition-colors ${
        isRedirecting ? 'bg-[#1e324d] border-blue-500/80 text-blue-200' : 'bg-[#132237] border-slate-700/60'
      }`}>
        <span>Limited Time Access:</span>
        <span className={`font-mono font-bold text-base ${isRedirecting ? 'text-amber-400 animate-pulse' : 'text-white'}`}>
          {formatTimer(secondsLeft)}
        </span>
      </div>

      {/* Security Note */}
      <p className="text-xs text-slate-400/90 text-center leading-relaxed px-2">
        Your access link is generated securely and redirects automatically after verification.
      </p>

      {/* Footer Disclaimer */}
      <p className="text-[10px] text-slate-500/80 text-center leading-normal px-2 pt-1">
        This platform is intended for informational and access purposes only. Users must be 18+. This site is not affiliated with Facebook™ or Telegram™.
      </p>
    </div>
  );
}


