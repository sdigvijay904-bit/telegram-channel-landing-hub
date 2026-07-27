import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ExternalLink, Loader2, ShieldCheck, X, Copy, Check, MessageCircle } from 'lucide-react';
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
    if (telegramLink && telegramLink !== '#') {
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
          className="relative w-full max-w-sm rounded-3xl bg-white border border-slate-200 p-6 text-center text-slate-900 shadow-2xl"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Animated WhatsApp Pulse Icon */}
          <div className="relative mx-auto w-20 h-20 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#25D366] to-[#128C7E] flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
              <MessageCircle className="w-8 h-8 fill-current animate-bounce" />
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-900 mb-1">
            Opening WhatsApp Group...
          </h3>

          <p className="text-xs text-slate-600 font-medium mb-3">
            Connecting you to <span className="text-emerald-700 font-bold">{channelTitle || "Official Group"}</span>
          </p>

          {inMeta && (
            <div className="mb-3 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800 font-semibold flex items-center justify-center gap-1.5">
              <span>⚡ Instagram/Facebook In-App Browser Detected</span>
            </div>
          )}

          {/* Countdown & Spinner status */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 mb-4 flex items-center justify-center space-x-2">
            {!isRedirected ? (
              <>
                <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
                <span className="text-xs font-semibold text-slate-700">
                  Redirecting in <strong className="text-emerald-700 text-sm font-black">{countdown}s</strong>...
                </span>
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span className="text-xs font-semibold text-emerald-700">
                  WhatsApp Launch Triggered!
                </span>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="space-y-2">
            <motion.a
              href={smartHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                triggerRedirect();
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#25D366] via-[#20ba5a] to-[#128C7E] hover:from-[#20ba5a] hover:to-[#0e7065] text-white font-black text-xs sm:text-sm shadow-md shadow-emerald-500/20 flex items-center justify-center space-x-2 cursor-pointer no-underline block"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>OPEN WHATSAPP GROUP NOW</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-200 flex items-center justify-center space-x-2 transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-600">Group Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Link to Open Manually</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center text-[11px] text-slate-500 gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Direct Deep-Link Integration</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

