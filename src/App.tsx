import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HeaderCard } from './components/HeaderCard';
import { AnimatedTelegramButton } from './components/AnimatedTelegramButton';
import { AppConfig } from './types';

// Lazy load AdminPanelModal to keep main bundle tiny & ultra-fast for ad traffic
const AdminPanelModal = lazy(() =>
  import('./components/AdminPanelModal').then(m => ({ default: m.AdminPanelModal }))
);

const defaultConfig: AppConfig = {
  telegramLink: "https://t.me/+BIHzLUxxu2swNDk1",
  title: "COIN SATHI",
  subtitle: "OFFICIAL CHANNEL",
  officialTag: "OFFICIAL CHANNEL",
  badges: [],
  buttonText: "JOIN TELEGRAM NOW",
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
  copyrightText: "© 2026 COIN SATHI. All Rights Reserved."
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

  const copyrightText = config.copyrightText || `© 2026 ${config.title || 'COIN SATHI'}. All Rights Reserved.`;

  return (
    <div className="relative min-h-[100dvh] w-full bg-gradient-to-b from-[#1c0836] via-[#120524] to-[#090214] text-white flex flex-col justify-between items-center px-3 py-6 sm:px-6 sm:py-10 font-sans overflow-x-hidden selection:bg-fuchsia-500 selection:text-white">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-fuchsia-600/10 rounded-full blur-[90px] pointer-events-none" />
      </div>

      {/* Main Center Card Container */}
      <main className="relative z-10 w-full max-w-md mx-auto bg-[#180a32]/85 border border-purple-800/40 rounded-3xl sm:rounded-[36px] p-5 sm:p-7 shadow-[0_0_50px_rgba(112,26,117,0.3)] backdrop-blur-2xl flex flex-col items-center text-center space-y-4 my-auto shrink-0">
        {/* Header Section (Circle Logo, Title, Subtitle, Stats, Checklist) */}
        <HeaderCard config={config} />

        {/* Action Button */}
        <AnimatedTelegramButton
          telegramLink={config.telegramLink}
          buttonText={config.buttonText}
          whatsappLink={config.whatsappLink}
          animationType={config.animationType}
          onClick={handleButtonClick}
        />

        {/* Footer inside card or at bottom */}
        <p className="text-[11px] sm:text-xs text-purple-300/60 font-medium tracking-wide pt-1">
          {copyrightText}
        </p>
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
        <span className="text-[10px] text-purple-400/30 hover:text-purple-300 transition-colors">
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
