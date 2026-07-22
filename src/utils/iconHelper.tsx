import React from 'react';
import {
  CheckCircle2,
  Banknote,
  Flame,
  Zap,
  ShieldCheck,
  Rocket,
  MessageCircle,
  Star,
  Award,
  TrendingUp,
  DollarSign,
  Bell,
  Send,
  Lock,
  Gift,
  Users,
  Check
} from 'lucide-react';

export const availableIcons = [
  { name: 'CheckCircle2', label: 'Check Circle', Icon: CheckCircle2 },
  { name: 'Banknote', label: 'Banknote / Money', Icon: Banknote },
  { name: 'Flame', label: 'Fire / Hot', Icon: Flame },
  { name: 'Zap', label: 'Lightning / Instant', Icon: Zap },
  { name: 'ShieldCheck', label: 'Shield / Verified', Icon: ShieldCheck },
  { name: 'Rocket', label: 'Rocket', Icon: Rocket },
  { name: 'Send', label: 'Telegram / Send', Icon: Send },
  { name: 'DollarSign', label: 'Dollar / Rupee', Icon: DollarSign },
  { name: 'TrendingUp', label: 'Growth / Earnings', Icon: TrendingUp },
  { name: 'Gift', label: 'Gift / Bonus', Icon: Gift },
  { name: 'Lock', label: 'Lock / VIP', Icon: Lock },
  { name: 'Bell', label: 'Notification', Icon: Bell },
  { name: 'MessageCircle', label: 'Chat / Support', Icon: MessageCircle },
  { name: 'Users', label: 'Group / Members', Icon: Users },
  { name: 'Star', label: 'Star / Top', Icon: Star },
  { name: 'Award', label: 'Badge / Award', Icon: Award }
];

export function renderBadgeIcon(iconName: string, className: string = "w-5 h-5") {
  const found = availableIcons.find(i => i.name === iconName);
  if (found) {
    const IconComponent = found.Icon;
    return <IconComponent className={className} />;
  }
  return <Check className={className} />;
}
