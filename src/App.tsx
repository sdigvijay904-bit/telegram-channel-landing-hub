import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HeaderCard } from './components/HeaderCard';
import { AnimatedTelegramButton } from './components/AnimatedTelegramButton';
import { AppConfig } from './types';
import { performSmartNavigation } from './utils/telegramHelper';

// Lazy load AdminPanelModal to keep main bundle tiny & ultra-fast for ad traffic
const AdminPanelModal = lazy(() =>
  import('./components/AdminPanelModal').then(m => ({ default: m.AdminPanelModal }))
);

const defaultConfig: AppConfig = {
  telegramLink: "https://t.me/+BIHzLUxxu2swNDk1",
  title: "MONEY MASTER HUB",
  subtitle: "OFFICIAL CHANNEL",
  officialTag: "OFFICIAL CHANNEL",
  badges: [],
  buttonText: "Continue",
  buttonSubtext: "",
  showWhatsapp: false,
  animationType: "pulse-glow",
  themeColor: "purple-gold",
  memberCount: 1500000,
  timerMinutes: 0,
  totalClicks: 1240,
  stat1Value: "1.5M",
  stat1Label: "SUBSCRIBERS",
  stat2Value: "99%",
  stat2Label: "ACCURACY",
  stat3Value: "24/7",
  stat3Label: "SUPPORT",
  features: [
    "Daily free predictions & analysis",
    "High accuracy session reports",
    "Verified winning strategies"
  ],
  copyrightText: "© 2026 MONEY MASTER HUB. All Rights Reserved."
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    const local = localStorage.getItem('tg_app_config');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        return { ...defaultConfig, ...parsed };
      } catch (e) {
        console.error("Local config parse error", e);
      }
    }
    return defaultConfig;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Handle Button Click (Record Analytics)
  const handleButtonClick = () => {
    try {
      fetch('/api/click', { method: 'POST' }).then(res => {
        if (res.ok) return res.json();
      }).then(data => {
        if (data && data.totalClicks) {
          setConfig(prev => ({
            ...prev,
            totalClicks: data.totalClicks
          }));
        }
      });
    } catch (e) {
      console.warn('Click logging offline:', e);
    }
  };

  // Fetch server config on mount
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch('/api/config');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.config) {
            setConfig(prev => {
              const serverConfig = data.config;
              const mergedTelegramLink = (serverConfig.telegramLink && serverConfig.telegramLink.trim())
                ? serverConfig.telegramLink.trim()
                : (prev.telegramLink && prev.telegramLink.trim())
                  ? prev.telegramLink.trim()
                  : "https://t.me/+BIHzLUxxu2swNDk1";

              const mergedWhatsappLink = (serverConfig.whatsappLink && serverConfig.whatsappLink.trim())
                ? serverConfig.whatsappLink.trim()
                : (prev.whatsappLink && prev.whatsappLink.trim())
                  ? prev.whatsappLink.trim()
                  : "";

              const updated: AppConfig = {
                ...defaultConfig,
                ...prev,
                ...serverConfig,
                telegramLink: mergedTelegramLink,
                whatsappLink: mergedWhatsappLink,
                buttonText: serverConfig.buttonText || prev.buttonText || "JOIN TELEGRAM NOW"
              };

              localStorage.setItem('tg_app_config', JSON.stringify(updated));
              return updated;
            });
          }
        }
      } catch (err) {
        console.warn('Backend endpoint unavailable, using local state:', err);
      }
    }

    fetchConfig();
  }, []);

  // Save Settings from Admin Panel
  const handleSaveConfig = async (updatedFields: Partial<AppConfig>, newPasscode?: string, currentPasscode?: string): Promise<boolean> => {
    const updatedFullConfig = { ...config, ...updatedFields };
    setConfig(updatedFullConfig);
    localStorage.setItem('tg_app_config', JSON.stringify(updatedFullConfig));

    try {
      const res = await fetch('/api/admin/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          passcode: currentPasscode || 'admin123',
          newConfig: {
            ...updatedFields,
            ...(newPasscode ? { newPasscode } : {})
          }
        })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.config) {
          const merged = { ...updatedFullConfig, ...data.config };
          setConfig(merged);
          localStorage.setItem('tg_app_config', JSON.stringify(merged));
          return true;
        }
      } else {
        console.error('Server update failed response');
        return false;
      }
    } catch (err) {
      console.warn('Server sync failed, saved locally:', err);
    }

    return true;
  };

  // Check URL params or key press for secret admin access
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('admin') === '1' || urlParams.get('admin') === 'true') {
      setIsAdminOpen(true);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const [secondsLeft, setSecondsLeft] = useState(300);

  // Auto Redirect on Page Load (5 Minutes Countdown)
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isAdmin = urlParams.get('admin') === '1' || urlParams.get('admin') === 'true';
    const noRedirect = urlParams.get('noredirect') === '1' || urlParams.get('no_redirect') === '1';

    if (isAdmin || isAdminOpen || noRedirect) return;

    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          handleButtonClick();
          const targetUrl = config.telegramLink || "https://t.me/+BIHzLUxxu2swNDk1";
          performSmartNavigation(targetUrl);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [config.telegramLink, isAdminOpen]);

  const copyrightText = config.copyrightText || `© 2026 ${config.title || 'MONEY MASTER HUB'}. All Rights Reserved.`;

  return (
    <div className="relative min-h-[100dvh] w-full bg-gradient-to-b from-[#091528] via-[#050d1a] to-[#02060e] text-white flex flex-col justify-between items-center px-2.5 py-4 sm:px-6 sm:py-8 font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-600/10 rounded-full blur-[90px] pointer-events-none" />
      </div>

      {/* Main Center Card Container - Slightly Larger Page Layout */}
      <main className="relative z-10 w-full max-w-[460px] sm:max-w-[520px] mx-auto bg-[#0a182e]/95 border border-[#162e52] rounded-3xl sm:rounded-[38px] p-6 sm:p-8 shadow-[0_0_70px_rgba(2,132,199,0.2)] backdrop-blur-2xl flex flex-col items-center text-center space-y-4 sm:space-y-5 my-auto shrink-0">
        {/* Header Section (Gold Circle Logo, Title, Subtitle, 3 Badges) */}
        <HeaderCard config={config} />

        {/* Action Button & Timer Banner */}
        <AnimatedTelegramButton
          telegramLink={config.telegramLink}
          buttonText={config.buttonText}
          whatsappLink={config.whatsappLink}
          animationType={config.animationType}
          secondsLeft={secondsLeft}
          onClick={handleButtonClick}
        />
      </main>

      {/* Secret Admin Panel Trigger Footer */}
      <footer
        className="relative z-20 w-full py-2 flex justify-center items-center text-xs text-slate-500 select-none cursor-pointer shrink-0 mt-2"
        onClick={() => {
          const now = Date.now();
          if ((window as any)._lastTap && now - (window as any)._lastTap < 400) {
            (window as any)._tapCount = ((window as any)._tapCount || 0) + 1;
            if ((window as any)._tapCount >= 3) {
              setIsAdminOpen(true);
              (window as any)._tapCount = 0;
            }
          } else {
            (window as any)._tapCount = 1;
          }
          (window as any)._lastTap = now;
        }}
      >
        <span className="text-[10px] text-slate-600/40 hover:text-slate-400 transition-colors">
          Admin Settings
        </span>
      </footer>

      {/* Admin Panel Modal */}
      {isAdminOpen && (
        <Suspense fallback={null}>
          <AdminPanelModal
            isOpen={isAdminOpen}
            onClose={() => setIsAdminOpen(false)}
            config={config}
            onSaveConfig={handleSaveConfig}
          />
        </Suspense>
      )}
    </div>
  );
}
