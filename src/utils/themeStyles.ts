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
    name: 'Clean White (Default)',
    bgGradient: 'from-slate-100 via-sky-50 to-slate-200',
    cardBg: 'bg-white/95 backdrop-blur-2xl text-slate-900',
    cardBorder: 'border-slate-200/90 shadow-[0_20px_50px_rgba(0,0,0,0.08)]',
    headerBg: 'bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-slate-200/80',
    headerText: 'text-slate-900',
    headerIconBg: 'bg-gradient-to-tr from-blue-500 via-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20',
    badgeBg: 'bg-slate-100 hover:bg-slate-200/80 transition-all',
    badgeBorder: 'border-slate-200 hover:border-slate-300',
    badgeText: 'text-slate-800',
    buttonBg: 'bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:to-green-700 text-white',
    buttonText: 'text-white font-black',
    buttonGlow: 'shadow-[0_0_25px_rgba(37,211,102,0.4)]',
    accentColor: 'emerald'
  },
  'red-emerald': {
    name: 'Classic White & Emerald',
    bgGradient: 'from-emerald-50 via-slate-100 to-sky-50',
    cardBg: 'bg-white/95 backdrop-blur-xl text-slate-900',
    cardBorder: 'border-slate-200',
    headerBg: 'bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700',
    headerText: 'text-white',
    headerIconBg: 'bg-amber-400 text-slate-950',
    badgeBg: 'bg-stone-100 hover:bg-stone-200/80',
    badgeBorder: 'border-stone-200/80',
    badgeText: 'text-stone-800',
    buttonBg: 'bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 hover:from-emerald-500 hover:to-green-600',
    buttonText: 'text-white',
    buttonGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.35)]',
    accentColor: 'emerald'
  },
  'cyan-blue': {
    name: 'Bright Sky Blue',
    bgGradient: 'from-sky-100 via-blue-50 to-slate-100',
    cardBg: 'bg-white/95 backdrop-blur-xl text-slate-900',
    cardBorder: 'border-sky-200',
    headerBg: 'bg-gradient-to-r from-sky-500 to-blue-600',
    headerText: 'text-white',
    headerIconBg: 'bg-white text-blue-600',
    badgeBg: 'bg-slate-100 hover:bg-slate-200',
    badgeBorder: 'border-slate-200',
    badgeText: 'text-slate-800',
    buttonBg: 'bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-sky-400',
    buttonText: 'text-white',
    buttonGlow: 'shadow-[0_0_25px_rgba(56,189,248,0.4)]',
    accentColor: 'sky'
  },
  'purple-gold': {
    name: 'Luxury White & Gold',
    bgGradient: 'from-purple-50 via-slate-100 to-amber-50',
    cardBg: 'bg-white/95 backdrop-blur-xl text-slate-900',
    cardBorder: 'border-amber-200',
    headerBg: 'bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800',
    headerText: 'text-amber-300',
    headerIconBg: 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-purple-950',
    badgeBg: 'bg-purple-50 hover:bg-purple-100',
    badgeBorder: 'border-purple-200',
    badgeText: 'text-purple-900',
    buttonBg: 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:from-amber-400 hover:to-yellow-400',
    buttonText: 'text-slate-950 font-black',
    buttonGlow: 'shadow-[0_0_25px_rgba(251,191,36,0.4)]',
    accentColor: 'amber'
  },
  'neon-dark': {
    name: 'Pure White Minimal',
    bgGradient: 'from-slate-50 via-zinc-100 to-slate-200',
    cardBg: 'bg-white backdrop-blur-xl text-slate-900',
    cardBorder: 'border-slate-300',
    headerBg: 'bg-slate-100 border-b border-slate-200',
    headerText: 'text-slate-900',
    headerIconBg: 'bg-emerald-600 text-white',
    badgeBg: 'bg-slate-100 hover:bg-slate-200',
    badgeBorder: 'border-slate-200',
    badgeText: 'text-slate-800',
    buttonBg: 'bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 hover:from-emerald-500 hover:to-teal-400',
    buttonText: 'text-white font-extrabold',
    buttonGlow: 'shadow-[0_0_25px_rgba(16,185,129,0.3)]',
    accentColor: 'emerald'
  },
  'sunset-fire': {
    name: 'Sunset White & Amber',
    bgGradient: 'from-amber-50 via-orange-50 to-slate-100',
    cardBg: 'bg-white/95 backdrop-blur-xl text-slate-900',
    cardBorder: 'border-amber-200',
    headerBg: 'bg-gradient-to-r from-amber-500 to-orange-500',
    headerText: 'text-white',
    headerIconBg: 'bg-amber-300 text-orange-950',
    badgeBg: 'bg-amber-50 hover:bg-amber-100/80',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-slate-800',
    buttonBg: 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400',
    buttonText: 'text-slate-950 font-black',
    buttonGlow: 'shadow-[0_0_25px_rgba(245,158,11,0.4)]',
    accentColor: 'amber'
  }
};
