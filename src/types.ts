export interface BadgeItem {
  id: string;
  text: string;
  icon: string;
  color: string;
}

export type AnimationType = 'pulse-glow' | 'shimmer' | 'bounce' | 'ripple-ring' | 'neon-breath';
export type ThemeColor = 'frosted-glass' | 'red-emerald' | 'cyan-blue' | 'purple-gold' | 'neon-dark' | 'sunset-fire';

export interface AppConfig {
  telegramLink: string;
  title: string;
  subtitle: string;
  badges: BadgeItem[];
  buttonText: string;
  buttonSubtext: string;
  secondaryButtonText?: string;
  whatsappLink?: string;
  showWhatsapp?: boolean;
  animationType: AnimationType;
  themeColor: ThemeColor;
  memberCount: number;
  timerMinutes: number;
  totalClicks?: number;
  clickHistory?: Array<{ timestamp: string; userAgent?: string }>;
  officialTag?: string;
  stat1Value?: string;
  stat1Label?: string;
  stat2Value?: string;
  stat2Label?: string;
  stat3Value?: string;
  stat3Label?: string;
  features?: string[];
  copyrightText?: string;
  logoUrl?: string;
}

export interface AdminAuth {
  isAuthenticated: boolean;
  passcode: string;
}
