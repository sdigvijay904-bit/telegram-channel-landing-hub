import { ThemeColor } from '../types';

export interface ThemePreset {
  name: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  headerBg: string;
  headerText: string;
  headerIconBg: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  buttonBg: string;
  buttonText: string;
  buttonGlow: string;
  accentColor: string;
}

export const themePresets: Record<ThemeColor, ThemePreset> = {
  'frosted-glass': {
    name: 'Frosted Glass (Default)',
    bgGradient: 'from-slate-900 via-[#0f172a] to-slate-950',
    cardBg: 'bg-slate-900/95 backdrop-blur-2xl text-white',
    cardBorder: 'border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
    headerBg: 'bg-white/10 backdrop-blur-xl border border-white/20',
    headerText: 'text-white',
    headerIconBg: 'bg-gradient-to-tr from-blue-400 via-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/40',
    badgeBg: 'bg-white/10 backdrop-blur-md hover:bg-white/15 transition-all',
    badgeBorder: 'border-white/15 hover:border-white/30',
    badgeText: 'text-blue-100',
    buttonBg: 'bg-gradient-to-r from-sky-400 via-blue-500 to-cyan-400 hover:from-sky-300 hover:to-blue-400 text-white',
    buttonText: 'text-white font-black',
    buttonGlow: 'shadow-[0_0_35px_rgba(56,189,248,0.6)]',
    accentColor: 'sky'
  },
  'red-emerald': {
    name: 'Classic Royal Blue & Emerald',
    bgGradient: 'from-slate-900 via-[#0f172a] to-slate-950',
    cardBg: 'bg-slate-900/95 backdrop-blur-xl text-white',
    cardBorder: 'border-white/20',
    headerBg: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700',
    headerText: 'text-white',
    headerIconBg: 'bg-amber-400 text-slate-950',
    badgeBg: 'bg-stone-50 hover:bg-stone-100/80',
    badgeBorder: 'border-stone-200/80',
    badgeText: 'text-stone-800',
    buttonBg: 'bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-600',
    buttonText: 'text-white',
    buttonGlow: 'shadow-[0_0_35px_rgba(16,185,129,0.55)]',
    accentColor: 'emerald'
  },
  'cyan-blue': {
    name: 'Telegram Electric Blue',
    bgGradient: 'from-sky-500 via-blue-600 to-indigo-700',
    cardBg: 'bg-slate-900/90 backdrop-blur-xl text-white',
    cardBorder: 'border-sky-500/30',
    headerBg: 'bg-gradient-to-r from-sky-500 to-blue-600',
    headerText: 'text-white',
    headerIconBg: 'bg-white text-blue-600',
    badgeBg: 'bg-slate-800/80 hover:bg-slate-800',
    badgeBorder: 'border-slate-700/80',
    badgeText: 'text-slate-100',
    buttonBg: 'bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600 hover:from-cyan-300 hover:to-sky-400',
    buttonText: 'text-white',
    buttonGlow: 'shadow-[0_0_35px_rgba(56,189,248,0.6)]',
    accentColor: 'sky'
  },
  'purple-gold': {
    name: 'Luxury VIP Purple & Gold',
    bgGradient: 'from-purple-900 via-indigo-900 to-slate-950',
    cardBg: 'bg-slate-900/95 backdrop-blur-xl text-white',
    cardBorder: 'border-amber-500/30',
    headerBg: 'bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800',
    headerText: 'text-amber-300',
    headerIconBg: 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-purple-950',
    badgeBg: 'bg-purple-950/40 hover:bg-purple-950/60',
    badgeBorder: 'border-purple-800/50',
    badgeText: 'text-purple-100',
    buttonBg: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300',
    buttonText: 'text-purple-950 font-black',
    buttonGlow: 'shadow-[0_0_35px_rgba(251,191,36,0.6)]',
    accentColor: 'amber'
  },
  'neon-dark': {
    name: 'Cyber Neon Dark Mode',
    bgGradient: 'from-zinc-950 via-zinc-900 to-black',
    cardBg: 'bg-zinc-900/95 backdrop-blur-xl text-white',
    cardBorder: 'border-emerald-500/40',
    headerBg: 'bg-zinc-800/90 border-b border-emerald-500/40',
    headerText: 'text-emerald-400',
    headerIconBg: 'bg-emerald-500 text-black',
    badgeBg: 'bg-zinc-950/80 hover:bg-zinc-950',
    badgeBorder: 'border-zinc-800 hover:border-emerald-500/30',
    badgeText: 'text-zinc-200',
    buttonBg: 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300',
    buttonText: 'text-black font-extrabold',
    buttonGlow: 'shadow-[0_0_40px_rgba(16,185,129,0.7)]',
    accentColor: 'emerald'
  },
  'sunset-fire': {
    name: 'Sunset Gold & Amber',
    bgGradient: 'from-slate-900 via-amber-950 to-slate-950',
    cardBg: 'bg-stone-900/95 backdrop-blur-xl text-white',
    cardBorder: 'border-amber-500/30',
    headerBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
    headerText: 'text-white',
    headerIconBg: 'bg-amber-300 text-orange-950',
    badgeBg: 'bg-stone-800/80 hover:bg-stone-800',
    badgeBorder: 'border-stone-700',
    badgeText: 'text-stone-100',
    buttonBg: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400',
    buttonText: 'text-stone-950 font-black',
    buttonGlow: 'shadow-[0_0_35px_rgba(245,158,11,0.6)]',
    accentColor: 'amber'
  }
};
