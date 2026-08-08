import React, { useState, useEffect, lazy, Suspense } from 'react';
import { HeaderCard } from './components/HeaderCard';
import { AnimatedTelegramButton } from './components/AnimatedTelegramButton';
import { AppConfig } from './types';

// Lazy load AdminPanelModal to keep main bundle tiny & ultra-fast for ad traffic
const AdminPanelModal = lazy(() =>
  import('./components/AdminPanelModal').then(m => ({ default: m.AdminPanelModal }))
);

const defaultConfig: AppConfig = {
  telegramLink: "",
  title: "Official Community Access",
  subtitle: "Secure verification is required before continuing. Please click the button below to proceed.",
  badges: [
    { id: "1", text: "Secure Access", icon: "Shield", color: "emerald" },
    { id: "2", text: "Verified Link", icon: "CheckCircle2", color: "amber" },
    { id: "3", text: "Fast Connection", icon: "Zap", color: "blue" }
  ],
  buttonText: "CONTINUE",
  buttonSubtext: "",
  showWhatsapp: false,
  animationType: "pulse-glow",
  themeColor: "frosted-glass",
  memberCount: 48520,
  timerMinutes: 1,
  totalClicks: 1240
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
              // Smart merge: Do not overwrite non-empty local link with empty server link
              const mergedTelegramLink = (serverConfig.telegramLink && serverConfig.telegramLink.trim())
                ? serverConfig.telegramLink.trim()
                : (prev.telegramLink && prev.telegramLink.trim())
                  ? prev.telegramLink.trim()
                  : "";

              const mergedWhatsappLink = (serverConfig.whatsappLink && serverConfig.whatsappLink.trim())
                ? serverConfig.whatsappLink.trim()
                : (prev.whatsappLink && prev.whatsappLink.trim())
                  ? prev.whatsappLink.trim()
                  : "";

              const updated: AppConfig = {
                ...prev,
                ...serverConfig,
                telegramLink: mergedTelegramLink,
                whatsappLink: mergedWhatsappLink,
                buttonText: serverConfig.buttonText || prev.buttonText || "CONTINUE"
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

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#050D1A] text-white flex flex-col justify-center items-center p-3 sm:p-6 font-sans overflow-x-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Main Center Card Container */}
      <main className="relative z-10 w-full max-w-sm sm:max-w-md mx-auto bg-[#0B1728]/95 border border-slate-800/90 rounded-[28px] sm:rounded-[36px] p-5 sm:p-8 shadow-2xl backdrop-blur-md flex flex-col items-center text-center space-y-4 my-auto">
        {/* Header Section (Circle Logo, Title, Subtitle, Badges) */}
        <HeaderCard config={config} />

        {/* Action Button, Timer Capsule, Access Note & Disclaimer */}
        <AnimatedTelegramButton
          telegramLink={config.telegramLink}
          buttonText={config.buttonText}
          whatsappLink={config.whatsappLink}
          animationType={config.animationType}
          onClick={handleButtonClick}
        />
      </main>

      {/* Secret Admin Panel Trigger Footer */}
      <footer
        className="relative z-20 w-full py-2 flex justify-center items-center text-xs text-slate-600 select-none cursor-default shrink-0 mt-2"
        onClick={() => {
          // Secret triple click detection for mobile admin access
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
        <span className="text-[10px] text-slate-700 font-medium">© Official Access Portal</span>
      </footer>

      {/* Admin Panel Modal (Loaded on demand only) */}
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
