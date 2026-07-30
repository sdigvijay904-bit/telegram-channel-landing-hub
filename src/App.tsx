import React, { useState, useEffect } from 'react';
import { HeaderCard } from './components/HeaderCard';
import { AnimatedTelegramButton } from './components/AnimatedTelegramButton';
import { AdminPanelModal } from './components/AdminPanelModal';
import { AppConfig } from './types';

const defaultConfig: AppConfig = {
  telegramLink: "",
  title: "BEST EARNING Platform",
  subtitle: "Why Download Our Earning Platform?",
  badges: [
    { id: "1", text: "Easy Daily Tasks", icon: "CheckCircle2", color: "emerald" },
    { id: "2", text: "Instant Profit", icon: "Banknote", color: "amber" },
    { id: "3", text: "100% Secure Platform", icon: "Shield", color: "rose" },
    { id: "4", text: "Zero Investment Needed", icon: "Zap", color: "blue" },
    { id: "5", text: "Start Earning From Day One", icon: "Flame", color: "emerald" }
  ],
  buttonText: "Join Whatsapp Group",
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
              const updated = { ...prev, ...data.config };
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
        if (data.config) {
          const merged = { ...updatedFullConfig, ...data.config };
          setConfig(merged);
          localStorage.setItem('tg_app_config', JSON.stringify(merged));
        }
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
    <div className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-between p-4 sm:p-6 font-sans overflow-x-hidden selection:bg-[#00ff66] selection:text-black">
      
      {/* Floating Neon Green Particles in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[12%] left-[15%] w-1.5 h-1.5 bg-[#00ff66] rounded-full blur-[0.5px] opacity-70 animate-pulse" />
        <div className="absolute top-[25%] right-[20%] w-2 h-2 bg-[#00ff66] rounded-full blur-[0.5px] opacity-80 animate-ping duration-1000" />
        <div className="absolute top-[40%] left-[8%] w-2.5 h-2.5 bg-[#00ff66] rounded-full blur-[0.5px] opacity-60 animate-pulse" />
        <div className="absolute top-[65%] right-[12%] w-1.5 h-1.5 bg-[#00ff66] rounded-full blur-[0.5px] opacity-90 animate-pulse" />
        <div className="absolute top-[80%] left-[25%] w-2 h-2 bg-[#00ff66] rounded-full blur-[0.5px] opacity-70 animate-ping" />
        <div className="absolute top-[90%] right-[30%] w-1.5 h-1.5 bg-[#00ff66] rounded-full blur-[0.5px] opacity-80 animate-pulse" />
      </div>

      {/* Main Center Layout Container */}
      <main className="relative z-10 w-full max-w-lg mx-auto flex flex-col items-center text-center my-auto space-y-3">
        {/* Header Section (Red Emblem, Best Online Earning Badge, Platform Title & Bullets) */}
        <HeaderCard config={config} />

        {/* Action Button & Countdown Timer Section */}
        <AnimatedTelegramButton
          telegramLink={config.telegramLink}
          buttonText={config.buttonText}
          whatsappLink={config.whatsappLink}
          onClick={handleButtonClick}
        />
      </main>

      {/* Footer without visible Admin button (Hidden secret access via Ctrl+Shift+A or ?admin=1 or 3-taps) */}
      <footer
        className="relative z-20 w-full py-2 flex justify-center items-center text-xs text-zinc-700 select-none cursor-default"
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
        <span className="text-[11px] text-zinc-600/80 font-medium">© 2026 Best Earning Platform</span>
      </footer>

      {/* Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
