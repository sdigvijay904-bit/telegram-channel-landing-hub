import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, ExternalLink, Loader2, ShieldCheck, X } from 'lucide-react';

interface RedirectModalProps {
  isOpen: boolean;
  telegramLink: string;
  channelTitle: string;
  onClose: () => void;
}

export function RedirectModal({ isOpen, telegramLink, channelTitle, onClose }: RedirectModalProps) {
  const [countdown, setCountdown] = useState(2);
  const [isRedirected, setIsRedirected] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(2);
      setIsRedirected(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          triggerRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 800);

    return () => clearInterval(timer);
  }, [isOpen]);

  const triggerRedirect = () => {
    setIsRedirected(true);
    // Open telegram link
    if (telegramLink) {
      window.open(telegramLink, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-sm rounded-3xl bg-slate-900 border border-slate-700/80 p-6 text-center text-white shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated Telegram Pulse Icon */}
          <div className="relative mx-auto w-20 h-20 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-sky-500/30 rounded-full animate-ping" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/50">
              <Send className="w-8 h-8 fill-current animate-bounce" />
            </div>
          </div>

          <h3 className="text-xl font-black text-white mb-1">
            Opening Telegram App...
          </h3>

          <p className="text-xs text-slate-300 font-medium mb-4">
            Connecting you to <span className="text-amber-400 font-bold">{channelTitle || "Telegram Channel"}</span>
          </p>

          {/* Countdown & Spinner status */}
          <div className="bg-slate-800/80 rounded-xl p-3.5 border border-slate-700 mb-5 flex items-center justify-center space-x-2">
            {!isRedirected ? (
              <>
                <Loader2 className="w-5 h-5 text-sky-400 animate-spin" />
                <span className="text-xs font-semibold text-sky-200">
                  Redirecting in <strong className="text-amber-400 text-sm font-black">{countdown}s</strong>...
                </span>
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">
                  Telegram Opened!
                </span>
              </>
            )}
          </div>

          {/* Direct Fallback Button */}
          <motion.a
            href={telegramLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setIsRedirected(true);
            }}
            className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white font-black text-sm shadow-lg flex items-center justify-center space-x-2"
          >
            <span>CLICK HERE IF NOT OPENING</span>
            <ExternalLink className="w-4 h-4" />
          </motion.a>

          <div className="mt-4 flex items-center justify-center text-[11px] text-slate-400 gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>100% Safe & Instant Telegram Redirect</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
