// Smart Deep Linking Helper for WhatsApp (Official & Clone Apps) and Telegram

export function parseSmartLink(input: string): string {
  if (!input) return '#';
  let str = input.trim();
  if (!str || str === '#') return '#';

  // 1. Extract pure WhatsApp group code if buried inside invitation text
  const waGroupMatch = str.match(/(?:https?:\/\/)?(?:www\.)?chat\.whatsapp\.com\/([A-Za-z0-9_-]{8,})/i);
  if (waGroupMatch && waGroupMatch[1]) {
    return `https://chat.whatsapp.com/${waGroupMatch[1].trim()}`;
  }

  // 2. Extract wa.me or wa.link links
  const waMeMatch = str.match(/(?:https?:\/\/)?(?:www\.)?wa\.(?:me|link)\/([A-Za-z0-9_+-]{3,})/i);
  if (waMeMatch && waMeMatch[1]) {
    return `https://wa.me/${waMeMatch[1].trim()}`;
  }

  // 3. Extract t.me or telegram.me links
  const tgMatch = str.match(/(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me|telegram\.dog)\/([A-Za-z0-9_+-]{3,})/i);
  if (tgMatch && tgMatch[1]) {
    return `https://t.me/${tgMatch[1].trim()}`;
  }

  // 4. Extract whatsapp:// scheme
  const waSchemeMatch = str.match(/whatsapp:\/\/[^\s"'<>]+/i);
  if (waSchemeMatch) {
    return waSchemeMatch[0];
  }

  // 5. Extract generic http/https URL if embedded in text
  const httpMatch = str.match(/https?:\/\/[^\s"'<>]+/i);
  if (httpMatch) {
    return httpMatch[0];
  }

  // Clean trailing spaces and HTML/quote characters
  let trimmed = str.replace(/[> <'"\t\r\n]/g, '');
  if (!trimmed || trimmed === '#') return '#';

  // Fix accidental double protocol like https://https:// or http://https://
  trimmed = trimmed.replace(/^(https?:\/\/)+/i, 'https://');

  // Check if link is WhatsApp (chat.whatsapp.com, wa.me, whatsapp.com, api.whatsapp.com, whatsapp://)
  if (
    trimmed.includes('chat.whatsapp.com') ||
    trimmed.includes('wa.me') ||
    trimmed.includes('whatsapp.com') ||
    trimmed.startsWith('whatsapp://')
  ) {
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('whatsapp://')) {
      trimmed = 'https://' + trimmed;
    }
    return trimmed;
  }

  // If already an absolute http/https/intent/whatsapp/tg URL
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('whatsapp://') ||
    trimmed.startsWith('tg://') ||
    trimmed.startsWith('intent://')
  ) {
    return trimmed;
  }

  // Telegram handles
  if (trimmed.startsWith('@')) {
    return `https://t.me/${trimmed.substring(1)}`;
  }

  if (trimmed.startsWith('+')) {
    return `https://t.me/+${trimmed.substring(1)}`;
  }

  if (
    trimmed.startsWith('t.me/') ||
    trimmed.startsWith('telegram.me/') ||
    trimmed.startsWith('telegram.dog/')
  ) {
    return 'https://' + trimmed;
  }

  // If it's a domain/path without protocol (e.g., mysite.com or chat.whatsapp.com)
  if (trimmed.includes('.')) {
    return 'https://' + trimmed;
  }

  // Default Telegram username fallback
  return `https://t.me/${trimmed}`;
}

export function parseTelegramUrl(input: string) {
  const formatted = parseSmartLink(input);
  return {
    original: input,
    formattedHttps: formatted,
    deepLinkTg: formatted,
    androidIntent: formatted,
    isInviteLink: formatted.includes('chat.whatsapp.com') || formatted.includes('+') || formatted.includes('joinchat'),
    usernameOrHash: formatted
  };
}

export function getSmartTelegramLink(rawUrl: string): string {
  return parseSmartLink(rawUrl);
}

export const getMetaDirectLink = getSmartTelegramLink;

export function isMetaInAppBrowser(): boolean {
  if (typeof window === 'undefined' || !navigator) return false;
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  return /Instagram|FB_IAB|FBAN|FBAV|FB4A|FBIOS|Messenger|WebView|wv/i.test(ua);
}

export function openTelegramInApp(rawUrl: string): void {
  const link = parseSmartLink(rawUrl);
  if (typeof window !== 'undefined' && window.top !== window.self) {
    window.open(link, '_blank');
  } else {
    window.location.href = link;
  }
}
