import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AnimationType } from '../types';
import { getMetaDirectLink } from '../utils/telegramHelper';

function WhatsAppLogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c-.001 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
    </svg>
  );
}

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
  buttonText = 'Join Whatsapp Group',
  whatsappLink = '',
  animationType = 'pulse-glow',
  onClick
}: AnimatedTelegramButtonProps) {
  // Direct Link priority: Only use whatsappLink if it's a valid link and not default 'https://wa.me/'
  const cleanWhatsapp = (whatsappLink || '').trim();
  const isValidWhatsapp = cleanWhatsapp && cleanWhatsapp !== 'https://wa.me/' && cleanWhatsapp !== 'https://wa.me';

  const targetUrl = isValidWhatsapp ? cleanWhatsapp : (telegramLink || cleanWhatsapp || '');
  const directHref = getMetaDirectLink(targetUrl);

  // Live Timer state
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleJoinClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick();

    if (!targetUrl || targetUrl === '#' || directHref === '#') {
      e.preventDefault();
      alert("Please configure your WhatsApp link or mobile number in Admin Panel.");
      return;
    }

    // In iframe environments (like AI Studio preview), handle direct window open
    if (typeof window !== 'undefined' && window.top !== window.self) {
      e.preventDefault();
      window.open(directHref, '_blank', 'noopener,noreferrer');
    }
  };

  // Determine display label
  const isPhoneNumber = directHref.includes('wa.me/91') || directHref.includes('wa.me/');
  let label = buttonText && buttonText !== "CONTINUE" ? buttonText : (isPhoneNumber ? "Chat On WhatsApp" : "Join Whatsapp Group");

  // Dynamic Motion Animation variants based on animationType
  const getButtonMotionProps = () => {
    switch (animationType) {
      case 'bounce':
        return {
          animate: {
            y: [0, -10, 0, -4, 0],
            boxShadow: [
              '0 0 15px rgba(0, 255, 102, 0.5)',
              '0 0 30px rgba(0, 255, 102, 0.9)',
              '0 0 15px rgba(0, 255, 102, 0.5)'
            ]
          },
          transition: {
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 0.3,
            ease: "easeInOut"
          }
        };

      case 'shimmer':
        return {
          animate: {
            boxShadow: [
              '0 0 15px rgba(0, 255, 102, 0.5)',
              '0 0 25px rgba(0, 255, 102, 0.8)',
              '0 0 15px rgba(0, 255, 102, 0.5)'
            ]
          },
          transition: { duration: 2, repeat: Infinity }
        };

      case 'ripple-ring':
        return {
          animate: {
            scale: [1, 1.02, 1],
            boxShadow: [
              '0 0 15px rgba(0, 255, 102, 0.5)',
              '0 0 35px rgba(0, 255, 102, 0.95)',
              '0 0 15px rgba(0, 255, 102, 0.5)'
            ]
          },
          transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' }
        };

      case 'neon-breath':
        return {
          animate: {
            scale: [1, 1.05, 1],
            filter: [
              'brightness(1) drop-shadow(0 0 10px rgba(0,255,102,0.5))',
              'brightness(1.25) drop-shadow(0 0 25px rgba(0,255,102,0.95))',
              'brightness(1) drop-shadow(0 0 10px rgba(0,255,102,0.5))'
            ]
          },
          transition: { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
        };

      case 'pulse-glow':
      default:
        return {
          animate: {
            scale: [1, 1.03, 1],
            boxShadow: [
              '0 0 12px rgba(0, 255, 102, 0.4)',
              '0 0 32px rgba(0, 255, 102, 0.95)',
              '0 0 12px rgba(0, 255, 102, 0.4)'
            ]
          },
          transition: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
        };
    }
  };

  const motionProps = getButtonMotionProps();

  return (
    <div className="w-full flex flex-col items-center text-center space-y-3 sm:space-y-4 my-2 shrink-0">
      {/* Red Urgency Text with Arrows */}
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="text-red-500 font-extrabold text-base sm:text-lg tracking-wide flex items-center justify-center gap-1.5 drop-shadow-[0_0_10px_rgba(239,68,68,0.6)]"
      >
        <span className="text-red-500 font-bold text-lg sm:text-xl">⇊</span>
        <span>Hurry Up, Limited Seats Join Now</span>
        <span className="text-red-500 font-bold text-lg sm:text-xl">⇊</span>
      </motion.div>

      {/* Main Big Neon Green Pill WhatsApp Button */}
      <div className="relative w-full max-w-[320px] sm:max-w-md px-1 flex justify-center items-center">
        {/* Ripple Ring Radar effect if selected */}
        {animationType === 'ripple-ring' && (
          <>
            <motion.div
              animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border-2 border-[#00ff66] pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: 0.4, ease: 'easeOut' }}
              className="absolute inset-0 rounded-full border border-[#00ff66] pointer-events-none"
            />
          </>
        )}

        <motion.a
          href={directHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleJoinClick}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          {...motionProps}
          className="relative overflow-hidden w-full py-3.5 px-5 sm:py-4 sm:px-8 rounded-full bg-[#00ff66] hover:bg-[#00e65c] text-black font-extrabold text-lg sm:text-2xl tracking-tight flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(0,255,102,0.7)] cursor-pointer transition-transform no-underline block z-10"
        >
          {/* Shimmer Light Beam Effect */}
          {animationType === 'shimmer' && (
            <motion.div
              animate={{ x: ['-100%', '250%'] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 w-1/3 bg-gradient-to-r from-transparent via-white/70 to-transparent skew-x-12 pointer-events-none"
            />
          )}

          <WhatsAppLogoIcon className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 text-black fill-current relative z-10" />
          <span className="font-extrabold text-black uppercase tracking-tight truncate relative z-10">
            {label}
          </span>
        </motion.a>
      </div>

      {/* Red Countdown Timer Circle Badge "00" */}
      <div className="pt-1">
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-red-600 border-2 border-red-400 text-white font-extrabold text-3xl sm:text-4xl flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.8)] mx-auto font-mono tracking-tighter"
        >
          {String(secondsLeft).padStart(2, '0')}
        </motion.div>
      </div>
    </div>
  );
}
