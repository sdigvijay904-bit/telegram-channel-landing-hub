import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Link,
  Save,
  CheckCircle,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
  Settings,
  Palette,
  BarChart2,
  Globe,
  ExternalLink,
  MessageCircle,
  RefreshCw,
  Lock,
  Shield,
  Key
} from 'lucide-react';
import { AppConfig, AnimationType, ThemeColor, BadgeItem } from '../types';
import { availableIcons } from '../utils/iconHelper';
import { themePresets } from '../utils/themeStyles';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AppConfig;
  onSaveConfig: (updatedConfig: Partial<AppConfig>, newPasscode?: string, currentPasscode?: string) => Promise<boolean>;
}

function formatTelegramUrl(input: string): string {
  let trimmed = input.trim();
  if (!trimmed) return '';
  trimmed = trimmed.replace(/[> <'"]/g, '');
  if (trimmed.startsWith('https://') || trimmed.startsWith('http://')) {
    return trimmed;
  }
  if (trimmed.startsWith('t.me/') || trimmed.startsWith('telegram.me/')) {
    return `https://${trimmed}`;
  }
  if (trimmed.startsWith('@')) {
    return `https://t.me/${trimmed.substring(1)}`;
  }
  return `https://t.me/${trimmed}`;
}

export function AdminPanelModal({ isOpen, onClose, config, onSaveConfig }: AdminPanelModalProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'link' | 'appearance' | 'badges' | 'stats' | 'security'>('link');

  // Form local state
  const [telegramLink, setTelegramLink] = useState(
    config.telegramLink === "https://t.me/example_channel" ? "" : (config.telegramLink || "")
  );
  const [whatsappLink, setWhatsappLink] = useState(config.whatsappLink || '');
  const [showWhatsapp, setShowWhatsapp] = useState(config.showWhatsapp || false);
  const [title, setTitle] = useState(config.title || '');
  const [subtitle, setSubtitle] = useState(config.subtitle || '');
  const [buttonText, setButtonText] = useState(config.buttonText || '');
  const [buttonSubtext, setButtonSubtext] = useState(config.buttonSubtext || '');
  const [animationType, setAnimationType] = useState<AnimationType>(config.animationType || 'pulse-glow');
  const [themeColor, setThemeColor] = useState<ThemeColor>(config.themeColor || 'frosted-glass');
  const [memberCount, setMemberCount] = useState(config.memberCount || 48520);
  const [badges, setBadges] = useState<BadgeItem[]>(config.badges || []);
  const [newPasscode, setNewPasscode] = useState('');

  // Sync state when modal is opened or config updates
  useEffect(() => {
    if (isOpen && config) {
      const cleanLink = config.telegramLink === "https://t.me/example_channel" ? "" : (config.telegramLink || "");
      setTelegramLink(cleanLink);
      setWhatsappLink(config.whatsappLink || '');
      setShowWhatsapp(config.showWhatsapp || false);
      setTitle(config.title || '');
      setSubtitle(config.subtitle || '');
      setButtonText(config.buttonText || '');
      setButtonSubtext(config.buttonSubtext || '');
      setAnimationType(config.animationType || 'pulse-glow');
      setThemeColor(config.themeColor || 'frosted-glass');
      setMemberCount(config.memberCount || 48520);
      setBadges(config.badges || []);
    }
  }, [isOpen, config]);

  // Badge edit helpers
  const [newBadgeText, setNewBadgeText] = useState('');
  const [newBadgeIcon, setNewBadgeIcon] = useState('CheckCircle2');
  const [newBadgeColor, setNewBadgeColor] = useState('emerald');

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) {
      setErrorMsg('Kripya passcode enter karein!');
      return;
    }

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setIsAuthenticated(true);
          setErrorMsg('');
          return;
        }
      }
    } catch (e) {
      console.warn('Server auth offline, checking fallback');
    }

    // Fallback default password check
    if (passcode === 'admin123' || passcode === '1234') {
      setIsAuthenticated(true);
      setErrorMsg('');
    } else {
      setErrorMsg('Galt passcode! Kripya sahi passcode enter karein.');
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setErrorMsg('');
    setSuccessMsg('');

    const formattedLink = formatTelegramUrl(telegramLink);
    setTelegramLink(formattedLink);

    const updatedData: Partial<AppConfig> = {
      telegramLink: formattedLink,
      whatsappLink,
      showWhatsapp,
      title,
      subtitle,
      buttonText,
      buttonSubtext,
      animationType,
      themeColor,
      memberCount: Number(memberCount),
      badges
    };

    const success = await onSaveConfig(updatedData, newPasscode ? newPasscode : undefined, passcode);

    setIsSaving(false);
    if (success) {
      setSuccessMsg('✅ Telegram Link & Settings Successfully Saved!');
      setNewPasscode('');
      setTimeout(() => setSuccessMsg(''), 4000);
    } else {
      setErrorMsg('Save fail ho gaya. Kripya punah prayas karein.');
    }
  };

  const addBadge = () => {
    if (!newBadgeText.trim()) return;
    const item: BadgeItem = {
      id: Date.now().toString(),
      text: newBadgeText,
      icon: newBadgeIcon,
      color: newBadgeColor
    };
    setBadges([...badges, item]);
    setNewBadgeText('');
  };

  const removeBadge = (id: string) => {
    setBadges(badges.filter(b => b.id !== id));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-lg overflow-y-auto">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl text-white shadow-2xl overflow-hidden my-6"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-slate-800/90 border-b border-slate-700">
            <div className="flex items-center space-x-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
              <div>
                <h2 className="text-lg font-black tracking-wide text-white">
                  Admin Control Panel
                </h2>
                <p className="text-xs text-slate-400">
                  Secure settings & Telegram channel link manager
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* Secure Passcode Login View */
            <div className="p-6 sm:p-10 max-w-md mx-auto text-center space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-600 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-sky-500/20 border border-sky-300/30">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-black text-white tracking-wide">Enter Admin Passcode</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Access is restricted to channel administrators only.
                </p>
              </div>

              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-bold flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Passcode Enter Karein"
                  className="w-full px-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-sky-400 text-center font-mono text-xl tracking-widest"
                  autoFocus
                />

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-black text-sm shadow-lg shadow-sky-500/30 flex items-center justify-center space-x-2 transition"
                >
                  <Key className="w-4 h-4" />
                  <span>Unlock Admin Panel</span>
                </button>
              </form>
            </div>
          ) : (
            /* Authenticated Admin View */
            <div className="flex flex-col h-[75vh] max-h-[650px]">
              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-800 bg-slate-950/50 p-2 overflow-x-auto gap-1">
                <button
                  onClick={() => setActiveTab('link')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
                    activeTab === 'link'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Link className="w-4 h-4" />
                  <span>Telegram Link</span>
                </button>

                <button
                  onClick={() => setActiveTab('appearance')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
                    activeTab === 'appearance'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Palette className="w-4 h-4" />
                  <span>UI & Animations</span>
                </button>

                <button
                  onClick={() => setActiveTab('badges')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
                    activeTab === 'badges'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Badges ({badges.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('stats')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
                    activeTab === 'stats'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <BarChart2 className="w-4 h-4" />
                  <span>Analytics</span>
                </button>

                <button
                  onClick={() => setActiveTab('security')}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 whitespace-nowrap transition ${
                    activeTab === 'security'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  <span>Passcode</span>
                </button>
              </div>

              {/* Tab Content Body */}
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-5">
                {successMsg && (
                  <div className="p-3.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-bold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0 text-emerald-400" />
                    <span>{successMsg}</span>
                  </div>
                )}

                {/* TAB 1: TELEGRAM LINK */}
                {activeTab === 'link' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-3">
                      <label className="block text-xs font-bold uppercase tracking-wider text-amber-400">
                        ⚡ Main Telegram Channel / Group Link
                      </label>
                      <p className="text-xs text-slate-300">
                        Enter your public or invite link (e.g. <code className="text-emerald-400 font-mono">https://t.me/your_channel_name</code> or <code className="text-emerald-400 font-mono">https://t.me/+AbCdEfGh</code>)
                      </p>

                      <div className="relative">
                        <input
                          type="text"
                          value={telegramLink}
                          onChange={(e) => setTelegramLink(e.target.value)}
                          onBlur={(e) => {
                            if (e.target.value) {
                              setTelegramLink(formatTelegramUrl(e.target.value));
                            }
                          }}
                          placeholder="https://t.me/your_channel_name or @username"
                          className="w-full pl-10 pr-24 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-amber-400"
                        />
                        <Globe className="w-5 h-5 text-slate-500 absolute left-3 top-3.5" />

                        <a
                          href={formatTelegramUrl(telegramLink) || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute right-2 top-2 px-3 py-1.5 rounded-lg bg-sky-500/20 text-sky-300 hover:bg-sky-500/30 border border-sky-500/40 text-xs font-bold flex items-center gap-1"
                        >
                          <span>Test</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    {/* Optional Secondary WhatsApp Link */}
                    <div className="p-4 rounded-2xl bg-slate-800/40 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                          <MessageCircle className="w-4 h-4" />
                          <span>Secondary WhatsApp Link (Optional)</span>
                        </label>
                        <input
                          type="checkbox"
                          checked={showWhatsapp}
                          onChange={(e) => setShowWhatsapp(e.target.checked)}
                          className="w-4 h-4 accent-emerald-500 cursor-pointer"
                        />
                      </div>

                      {showWhatsapp && (
                        <input
                          type="url"
                          value={whatsappLink}
                          onChange={(e) => setWhatsappLink(e.target.value)}
                          placeholder="https://wa.me/919876543210"
                          className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-emerald-400"
                        />
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: APPEARANCE & ANIMATIONS */}
                {activeTab === 'appearance' && (
                  <div className="space-y-4">
                    {/* Titles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                          Channel Title
                        </label>
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                          Button Text
                        </label>
                        <input
                          type="text"
                          value={buttonText}
                          onChange={(e) => setButtonText(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 font-bold"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-1">
                        Subtitle Tagline
                      </label>
                      <input
                        type="text"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    {/* Button Animation Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-amber-400 mb-2">
                        🔥 Button Animation Style
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {[
                          { id: 'pulse-glow', label: '✨ Neon Pulse Glow' },
                          { id: 'shimmer', label: '💫 Shimmer Light Beam' },
                          { id: 'bounce', label: '🚀 Icon Bounce' },
                          { id: 'ripple-ring', label: '📡 Radar Ripple Ring' },
                          { id: 'neon-breath', label: '🔮 Neon Breath' }
                        ].map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setAnimationType(item.id as AnimationType)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left transition ${
                              animationType === item.id
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md'
                                : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Theme Selector */}
                    <div>
                      <label className="block text-xs font-bold uppercase text-amber-400 mb-2">
                        🎨 Color Theme Preset
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Object.entries(themePresets).map(([key, theme]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setThemeColor(key as ThemeColor)}
                            className={`p-3 rounded-xl border text-xs font-bold text-left flex items-center justify-between transition ${
                              themeColor === key
                                ? 'bg-slate-800 border-amber-400 text-white ring-2 ring-amber-400/30'
                                : 'bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800'
                            }`}
                          >
                            <span>{theme.name}</span>
                            <span className={`w-4 h-4 rounded-full ${theme.headerBg}`} />
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: BADGES MANAGER */}
                {activeTab === 'badges' && (
                  <div className="space-y-4">
                    <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-3">
                      <label className="block text-xs font-bold uppercase text-amber-400">
                        Add New Badge / Highlight
                      </label>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={newBadgeText}
                          onChange={(e) => setNewBadgeText(e.target.value)}
                          placeholder="e.g. Daily ₹2000 Earning Proofs"
                          className="flex-1 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400"
                        />

                        <select
                          value={newBadgeIcon}
                          onChange={(e) => setNewBadgeIcon(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        >
                          {availableIcons.map(ic => (
                            <option key={ic.name} value={ic.name}>{ic.label}</option>
                          ))}
                        </select>

                        <select
                          value={newBadgeColor}
                          onChange={(e) => setNewBadgeColor(e.target.value)}
                          className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs"
                        >
                          <option value="emerald">Emerald</option>
                          <option value="amber">Amber Gold</option>
                          <option value="rose">Rose Red</option>
                          <option value="blue">Blue</option>
                          <option value="violet">Violet</option>
                        </select>

                        <button
                          type="button"
                          onClick={addBadge}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                    {/* Existing Badges List */}
                    <div className="space-y-2">
                      {badges.map((b, idx) => (
                        <div
                          key={b.id || idx}
                          className="flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-sm"
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-mono text-slate-500">#{idx + 1}</span>
                            <span className="font-semibold text-white">{b.text}</span>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeBadge(b.id)}
                            className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 4: ANALYTICS & STATS */}
                {activeTab === 'stats' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 text-center">
                        <span className="text-xs text-slate-400 font-bold uppercase">Total Clicks</span>
                        <div className="text-3xl font-black text-amber-400 mt-1">
                          {(config.totalClicks || 0).toLocaleString()}
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-slate-800/70 border border-slate-700 text-center">
                        <label className="block text-xs text-slate-400 font-bold uppercase mb-1">
                          Display Member Count
                        </label>
                        <input
                          type="number"
                          value={memberCount}
                          onChange={(e) => setMemberCount(Number(e.target.value))}
                          className="w-28 mx-auto px-2 py-1 rounded bg-slate-900 border border-slate-700 text-white font-mono text-center text-lg font-bold"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 5: SECURITY / PASSCODE */}
                {activeTab === 'security' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/70 border border-slate-700 space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-amber-400 tracking-wider">
                        🔐 Change Admin Passcode
                      </label>
                      <p className="text-xs text-slate-300 mt-1">
                        Set a new secret passcode to secure your admin panel from unauthorized access.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs text-slate-400 mb-1">New Passcode</label>
                      <input
                        type="password"
                        value={newPasscode}
                        onChange={(e) => setNewPasscode(e.target.value)}
                        placeholder="Naya Passcode Type Karein"
                        className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm font-mono focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Save Actions */}
              <div className="px-6 py-4 bg-slate-800/90 border-t border-slate-700 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
                >
                  Close
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg flex items-center space-x-2"
                >
                  {isSaving ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>SAVE SETTINGS</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
