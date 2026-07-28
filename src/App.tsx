import React, { useState, useEffect } from 'react';
import { HeaderCard } from './components/HeaderCard';
import { BadgeList } from './components/BadgeList';
import { AnimatedTelegramButton } from './components/AnimatedTelegramButton';
import { RedirectModal } from './components/RedirectModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { TrustFooter } from './components/TrustFooter';
import { AppConfig, AnimationType, ThemeColor } from './types';
import { themePresets } from './utils/themeStyles';
import { openTelegramInApp } from './utils/telegramHelper';
import { Settings, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

const defaultConfig: AppConfig = {
  telegramLink: "",
  title: "PropertyN Official",
  subtitle: "Join the Official PropertyN Community for Updates & Announcements",
  badges: [
    { id: "1", text: "Join Official WhatsApp Group", icon: "CheckCircle2", color: "emerald" },
    { id: "2", text: "Explore Available Plans & Platform Features", icon: "Banknote", color: "amber" },
    { id: "3", text: "New Members Welcome", icon: "Flame", color: "rose" },
    { id: "4", text: "Community Updates & Support", icon: "Zap", color: "blue" }
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

function sanitizeConfig(cfg: any): any {
  if (!cfg) return cfg;
  const updated = { ...cfg, showWhatsapp: false };
  if (!updated.title || updated.title === "Telegram Official") {
    updated.title = "PropertyN Official";
  }
  if (!updated.subtitle || updated.subtitle.includes("Most Trusted Telegram")) {
    updated.subtitle = "Join the Official PropertyN Community for Updates & Announcements";
  }
  if (updated.badges && Array.isArray(updated.badges)) {
    updated.badges = updated.badges
      .filter((b: any) => !b.text.includes("100% Free VIP"))
      .map((b: any) => {
        let text = b.text;
        if (text.includes("Telegram Group Join Karo") || text.includes("Telegram")) {
          text = "Join Official WhatsApp Group";
        } else if (text.includes("Daily ₹") || text.includes("Daily 1000")) {
          text = "Explore Available Plans & Platform Features";
        } else if (text.includes("Limited Seats")) {
          text = "New Members Welcome";
        } else if (text.includes("Instant Payment")) {
          text = "Community Updates & Support";
        }
        return { ...b, text };
      });
  }
  if (updated.themeColor === 'red-emerald') {
    updated.themeColor = 'frosted-glass';
  }
  if (!updated.buttonText || updated.buttonText === "JOIN GROUP" || updated.buttonText === "JOIN TELEGRAM CHANNEL NOW" || updated.buttonText === "JOIN NOW FAST") {
    updated.buttonText = "CONTINUE";
  }
  return updated;
}

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    const local = localStorage.getItem('tg_app_config');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        const sanitized = sanitizeConfig(parsed);
        return { ...defaultConfig, ...sanitized };
      } catch (e) {
        console.error("Local config parse error", e);
      }
    }
    return defaultConfig;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRedirectOpen, setIsRedirectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Handle Telegram Button Click (Record Analytics)
  const handleTelegramClick = () => {
    try {
      fetch('/api/click', { method: 'POST' }).then(res => {
        if (res.ok) {
          return res.json();
        }
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
            const cleanServerConfig = sanitizeConfig(data.config);
            setConfig(prev => {
              const serverLink = cleanServerConfig.telegramLink;
              
              // Determine active link: preference to valid server link, or fallback to local
              let activeLink = serverLink || '';
              if (!serverLink && prev.telegramLink && prev.telegramLink !== 'https://t.me/example_channel') {
                activeLink = prev.telegramLink;
                // Background auto-sync local link to server so all other devices see it
                fetch('/api/admin/update', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    passcode: 'admin123',
                    newConfig: { telegramLink: prev.telegramLink }
                  })
                }).catch(() => {});
              }

              const updated = { ...prev, ...cleanServerConfig, telegramLink: activeLink };
              localStorage.setItem('tg_app_config', JSON.stringify(updated));
              return updated;
            });
          }
        }
      } catch (err) {
        console.warn('Backend endpoint unavailable, using localStorage/default state:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchConfig();
  }, []);

  // Save Settings from Admin
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

  const theme = themePresets[config.themeColor] || themePresets['red-emerald'];

  return (
    <div className={`relative min-h-screen w-full bg-gradient-to-b ${theme.bgGradient} flex flex-col items-center justify-center p-2 sm:p-4 transition-colors duration-500 font-sans overflow-hidden selection:bg-cyan-400 selection:text-black`}>
      {/* Background Mesh Blur Orbs */}
      <div className="absolute top-[-100px] left-[-100px] w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] bg-sky-300 rounded-full blur-[120px] opacity-25 pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-50px] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-emerald-300 rounded-full blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute top-[250px] right-[-100px] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-blue-300 rounded-full blur-[110px] opacity-20 pointer-events-none" />

      {/* Main Container Card (Compact Single Screen Design) */}
      <main className={`relative z-10 w-full max-w-sm sm:max-w-md ${theme.cardBg} rounded-[28px] p-3.5 sm:p-5 shadow-2xl border ${theme.cardBorder} flex flex-col items-center text-center my-auto transition-all duration-300`}>
        
        {/* Header Card */}
        <HeaderCard config={config} />

        {/* Highlight Badges */}
        <BadgeList badges={config.badges} themeColor={config.themeColor} />

        {/* Animated Telegram Action Button */}
        <AnimatedTelegramButton
          telegramLink={config.telegramLink}
          buttonText={config.buttonText}
          buttonSubtext={config.buttonSubtext}
          secondaryButtonText={config.secondaryButtonText}
          whatsappLink={config.whatsappLink}
          showWhatsapp={config.showWhatsapp}
          animationType={config.animationType}
          themeColor={config.themeColor}
          onClick={handleTelegramClick}
          totalClicks={config.totalClicks}
        />

        {/* Trust Footer */}
        <TrustFooter
          channelTitle={config.title}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </main>

      {/* Redirect Popup Modal */}
      <RedirectModal
        isOpen={isRedirectOpen}
        telegramLink={config.telegramLink}
        channelTitle={config.title}
        onClose={() => setIsRedirectOpen(false)}
      />

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
