import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, ExternalLink, Loader2, ShieldCheck, X, Copy, Check } from 'lucide-react';
import { openTelegramInApp, parseTelegramUrl, isMetaInAppBrowser, getSmartTelegramLink } from '../utils/telegramHelper';

interface RedirectModalProps {
  isOpen: boolean;
  telegramLink: string;
  channelTitle: string;
  onClose: () => void;
}

export function RedirectModal({ isOpen, telegramLink, channelTitle, onClose }: RedirectModalProps) {
  const [countdown, setCountdown] = useState(1);
  const [isRedirected, setIsRedirected] = useState(false);
  const [copied, setCopied] = useState(false);

  const inMeta = isMetaInAppBrowser();
  const parsed = parseTelegramUrl(telegramLink);
  const smartHref = getSmartTelegramLink(telegramLink);

  useEffect(() => {
    if (!isOpen) {
      setCountdown(1);
      setIsRedirected(false);
      setCopied(false);
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
    }, 600);

    return () => clearInterval(timer);
  }, [isOpen, telegramLink]);

  const triggerRedirect = () => {
    setIsRedirected(true);
    if (telegramLink) {
      openTelegramInApp(telegramLink);
    }
  };

  const handleCopy = () => {
    if (parsed.formattedHttps) {
      navigator.clipboard.writeText(parsed.formattedHttps);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
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

          <p className="text-xs text-slate-300 font-medium mb-3">
            Connecting you to <span className="text-amber-400 font-bold">{channelTitle || "Telegram Channel"}</span>
          </p>

          {inMeta && (
            <div className="mb-3 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-300 font-semibold flex items-center justify-center gap-1.5">
              <span>⚡ Instagram/Facebook In-App Browser Detected</span>
            </div>
          )}

          {/* Countdown & Spinner status */}
          <div className="bg-slate-800/80 rounded-xl p-3 border border-slate-700 mb-4 flex items-center justify-center space-x-2">
            {!isRedirected ? (
              <>
                <Loader2 className="w-4 h-4 text-sky-400 animate-spin" />
                <span className="text-xs font-semibold text-sky-200">
                  Redirecting in <strong className="text-amber-400 text-sm font-black">{countdown}s</strong>...
                </span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-semibold text-emerald-300">
                  Telegram Launch Triggered!
                </span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <motion.a
              href={smartHref}
              target="_self"
              rel="noopener noreferrer"
              onClick={() => {
                triggerRedirect();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-black text-xs sm:text-sm shadow-lg shadow-sky-500/30 flex items-center justify-center space-x-2 cursor-pointer no-underline block"
            >
              <Send className="w-4 h-4 fill-current" />
              <span>OPEN IN TELEGRAM APP NOW</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-bold border border-slate-700 flex items-center justify-center space-x-2 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied! Paste in Telegram Search</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>Copy Link to Open Manually</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center text-[11px] text-slate-400 gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>Direct Deep-Link Integration for Meta Ads</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

