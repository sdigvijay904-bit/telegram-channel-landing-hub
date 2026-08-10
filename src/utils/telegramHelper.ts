// Smart Deep Linking Helper for WhatsApp (Group & Direct Number) and Telegram

// Helper to append default 'I am interested' prefilled text for direct WhatsApp links
function appendWhatsappMessage(url: string, defaultText: string = "I am interested"): string {
  if (!url || url === '#') return url;
  // Group invite links (chat.whatsapp.com) do not support ?text=
  if (url.includes('chat.whatsapp.com')) return url;

  // Direct WhatsApp links (wa.me, api.whatsapp.com, whatsapp://)
  if (
    url.includes('wa.me') ||
    url.includes('api.whatsapp.com') ||
    url.startsWith('whatsapp://')
  ) {
    if (!url.toLowerCase().includes('text=')) {
      const encodedMsg = encodeURIComponent(defaultText);
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}text=${encodedMsg}`;
    }
  }
  return url;
}

export function parseSmartLink(input: string, customMessage: string = "I am interested"): string {
  if (!input) return '#';
  let str = input.trim();
  if (!str || str === '#') return '#';

  let rawResult = '#';

  // 1. Extract pure WhatsApp group code if buried inside invitation text
  const waGroupMatch = str.match(/(?:https?:\/\/)?(?:www\.)?chat\.whatsapp\.com\/([A-Za-z0-9_-]{8,})/i);
  if (waGroupMatch && waGroupMatch[1]) {
    rawResult = `https://chat.whatsapp.com/${waGroupMatch[1].trim()}`;
    return rawResult;
  }

  // 2. Extract wa.me or wa.link links
  const waMeMatch = str.match(/(?:https?:\/\/)?(?:www\.)?wa\.(?:me|link)\/([A-Za-z0-9_+-]{3,})/i);
  if (waMeMatch && waMeMatch[1]) {
    rawResult = `https://wa.me/${waMeMatch[1].trim()}`;
    return appendWhatsappMessage(rawResult, customMessage);
  }

  // 3. Extract pure phone numbers (e.g. +91 9876543210, 9876543210, 919876543210)
  // Check if string contains no letters and has at least 8 digits
  const hasLetters = /[a-zA-Z]/.test(str);
  if (!hasLetters) {
    const digitsOnly = str.replace(/\D/g, '');
    if (digitsOnly.length >= 8 && digitsOnly.length <= 13) {
      // If 10 digits (e.g. 9876543210), default to India 91 prefix
      if (digitsOnly.length === 10) {
        rawResult = `https://wa.me/91${digitsOnly}`;
      } else {
        rawResult = `https://wa.me/${digitsOnly}`;
      }
      return appendWhatsappMessage(rawResult, customMessage);
    }
  }

  // 4. Extract t.me or telegram.me links
  const tgMatch = str.match(/(?:https?:\/\/)?(?:www\.)?(?:t\.me|telegram\.me|telegram\.dog)\/([A-Za-z0-9_+-]{3,})/i);
  if (tgMatch && tgMatch[1]) {
    return `https://t.me/${tgMatch[1].trim()}`;
  }

  // 5. Extract whatsapp:// scheme
  const waSchemeMatch = str.match(/whatsapp:\/\/[^\s"'<>]+/i);
  if (waSchemeMatch) {
    return appendWhatsappMessage(waSchemeMatch[0], customMessage);
  }

  // 6. Extract generic http/https URL if embedded in text
  const httpMatch = str.match(/https?:\/\/[^\s"'<>]+/i);
  if (httpMatch) {
    return appendWhatsappMessage(httpMatch[0], customMessage);
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
    return appendWhatsappMessage(trimmed, customMessage);
  }

  // If already an absolute http/https/intent/whatsapp/tg URL
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('whatsapp://') ||
    trimmed.startsWith('tg://') ||
    trimmed.startsWith('intent://')
  ) {
    return appendWhatsappMessage(trimmed, customMessage);
  }

  // Telegram handles
  if (trimmed.startsWith('@')) {
    return `https://t.me/${trimmed.substring(1)}`;
  }

  if (trimmed.startsWith('+')) {
    // Check if phone number or telegram handle
    const cleanNum = trimmed.replace(/\D/g, '');
    if (cleanNum.length >= 10 && cleanNum.length <= 13) {
      rawResult = `https://wa.me/${cleanNum}`;
      return appendWhatsappMessage(rawResult, customMessage);
    }
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

  // If pure digits remain, format as wa.me phone number
  const finalDigits = trimmed.replace(/\D/g, '');
  if (finalDigits.length >= 8) {
    if (finalDigits.length === 10) {
      rawResult = `https://wa.me/91${finalDigits}`;
    } else {
      rawResult = `https://wa.me/${finalDigits}`;
    }
    return appendWhatsappMessage(rawResult, customMessage);
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
    isInviteLink: formatted.includes('chat.whatsapp.com') || formatted.includes('wa.me') || formatted.includes('+') || formatted.includes('joinchat'),
    usernameOrHash: formatted
  };
}

export function getSmartTelegramLink(rawUrl: string, customMessage: string = "I am interested"): string {
  return parseSmartLink(rawUrl, customMessage);
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

export function getTelegramDeepLink(rawUrl: string, customMessage: string = "I am interested"): { webUrl: string; deepLink: string | null } {
  const webUrl = parseSmartLink(rawUrl, customMessage);
  if (!webUrl || webUrl === '#') {
    return { webUrl: '#', deepLink: null };
  }

  // Extract invite hash from t.me/+HASH or t.me/joinchat/HASH
  const inviteMatch = webUrl.match(/t\.me\/(?:\+|joinchat\/)([A-Za-z0-9_-]+)/i);
  if (inviteMatch && inviteMatch[1]) {
    const hash = inviteMatch[1];
    return {
      webUrl,
      deepLink: `tg://join?invite=${hash}`
    };
  }

  // Extract username from t.me/USERNAME
  const usernameMatch = webUrl.match(/t\.me\/([A-Za-z0-9_]{3,})/i);
  if (usernameMatch && usernameMatch[1]) {
    const username = usernameMatch[1];
    return {
      webUrl,
      deepLink: `tg://resolve?domain=${username}`
    };
  }

  return { webUrl, deepLink: webUrl.startsWith('tg://') ? webUrl : null };
}

export function performSmartNavigation(rawUrl: string, customMessage: string = "I am interested"): void {
  if (typeof window === 'undefined') return;

  const { webUrl, deepLink } = getTelegramDeepLink(rawUrl, customMessage);
  if (!webUrl || webUrl === '#') {
    alert("Please configure a valid link.");
    return;
  }

  const isIframe = typeof window !== 'undefined' && window.self !== window.top;

  // Inside preview iframe (e.g. AI Studio preview), open webUrl in new tab
  if (isIframe) {
    window.open(webUrl, '_blank', 'noopener,noreferrer');
    return;
  }

  // In standalone browser (outside iframe):
  // Trigger deep link (tg://join?invite=...) first to launch native Telegram app with Request to Join popup
  if (deepLink) {
    try {
      window.location.href = deepLink;
    } catch {
      // Fallback if deepLink fails
    }
    // Fallback to standard web URL after 400ms if deep link is not supported or on desktop
    setTimeout(() => {
      window.location.href = webUrl;
    }, 400);
  } else {
    window.location.href = webUrl;
  }
}

