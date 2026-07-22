import React, { useState, useEffect } from 'react';
import { HeaderCard } from './components/HeaderCard';
import { BadgeList } from './components/BadgeList';
import { AnimatedTelegramButton } from './components/AnimatedTelegramButton';
import { RedirectModal } from './components/RedirectModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { TrustFooter } from './components/TrustFooter';
import { AppConfig, AnimationType, ThemeColor } from './types';
import { themePresets } from './utils/themeStyles';
import { Settings, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

const defaultConfig: AppConfig = {
  telegramLink: "https://t.me/example_channel",
  title: "Money Hub",
  subtitle: "Join India's Most Trusted Telegram Channel for Daily Earnings",
  badges: [
    { id: "1", text: "Telegram Group Join Karo", icon: "CheckCircle2", color: "emerald" },
    { id: "2", text: "Daily ₹1000 - ₹5000 Earn", icon: "Banknote", color: "amber" },
    { id: "3", text: "Limited Seats Available", icon: "Flame", color: "rose" },
    { id: "4", text: "Instant Payment Proof & Signals", icon: "Zap", color: "blue" }
  ],
  buttonText: "JOIN TELEGRAM CHANNEL NOW",
  buttonSubtext: "",
  animationType: "pulse-glow",
  themeColor: "frosted-glass",
  memberCount: 48520,
  timerMinutes: 5,
  totalClicks: 1240
};

export default function App() {
  const [config, setConfig] = useState<AppConfig>(() => {
    const local = localStorage.getItem('tg_app_config');
    if (local) {
      try {
        const parsed = JSON.parse(local);
        if (parsed.badges) {
          parsed.badges = parsed.badges.filter((b: any) => !b.text.includes("100% Free VIP"));
        }
        if (parsed.themeColor === 'red-emerald') {
          parsed.themeColor = 'frosted-glass';
        }
        return { ...defaultConfig, ...parsed };
      } catch (e) {
        console.error("Local config parse error", e);
      }
    }
    return defaultConfig;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRedirectOpen, setIsRedirectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch server config on mount
  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await fetch('/api/config');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.config) {
            setConfig(prev => {
              if (data.config.badges) {
                data.config.badges = data.config.badges.filter((b: any) => !b.text.includes("100% Free VIP"));
              }
              if (data.config.themeColor === 'red-emerald') {
                data.config.themeColor = 'frosted-glass';
              }
              const updated = { ...prev, ...data.config };
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

  // Handle Telegram Button Click (Direct Telegram Join)
  const handleTelegramClick = () => {
    let link = config.telegramLink ? config.telegramLink.trim() : '';
    if (link) {
      // Auto-format handle or URL if missing protocol
      if (!link.startsWith('http://') && !link.startsWith('https://')) {
        if (link.startsWith('@')) {
          link = `https://t.me/${link.substring(1)}`;
        } else if (link.startsWith('t.me/') || link.startsWith('telegram.me/')) {
          link = `https://${link}`;
        } else {
          link = `https://t.me/${link}`;
        }
      }
      window.open(link, '_blank', 'noopener,noreferrer') || (window.location.href = link);
    }

    // Record click on server
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
      <div className="absolute top-[-100px] left-[-100px] w-[380px] sm:w-[500px] h-[380px] sm:h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-35 pointer-events-none" />
      <div className="absolute bottom-[-50px] right-[-50px] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-purple-600 rounded-full blur-[150px] opacity-25 pointer-events-none" />
      <div className="absolute top-[250px] right-[-100px] w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-cyan-500 rounded-full blur-[110px] opacity-25 pointer-events-none" />

      {/* Main Container Card (Compact Single Screen Design) */}
      <main className={`relative z-10 w-full max-w-sm sm:max-w-md ${theme.cardBg} rounded-[28px] p-3.5 sm:p-5 shadow-2xl border ${theme.cardBorder} flex flex-col items-center text-center my-auto transition-all duration-300`}>
        
        {/* Header Card */}
        <HeaderCard config={config} />

        {/* Highlight Badges */}
        <BadgeList badges={config.badges} themeColor={config.themeColor} />

        {/* Animated Telegram Action Button */}
        <AnimatedTelegramButton
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
