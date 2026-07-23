// Telegram Deep Linking & Meta Ads (Instagram / Facebook) In-App Browser Helper

export interface ParsedTelegramUrl {
  original: string;
  formattedHttps: string;
  deepLinkTg: string;
  androidIntent: string;
  isInviteLink: boolean;
  usernameOrHash: string;
}

export function parseTelegramUrl(input: string): ParsedTelegramUrl {
  let trimmed = (input || '').trim().replace(/[> <'"]/g, '');
  if (!trimmed || trimmed === '#') {
    trimmed = 'MoneyHubOfficial';
  }

  // Handle @username
  if (trimmed.startsWith('@')) {
    const username = trimmed.substring(1);
    return {
      original: input,
      formattedHttps: `https://t.me/${username}`,
      deepLinkTg: `tg://resolve?domain=${username}`,
      androidIntent: `intent://resolve?domain=${encodeURIComponent(username)}#Intent;package=org.telegram.messenger;scheme=tg;end`,
      isInviteLink: false,
      usernameOrHash: username
    };
  }

  // Strip leading protocols or domains
  let path = trimmed;
  if (path.startsWith('https://')) path = path.substring(8);
  else if (path.startsWith('http://')) path = path.substring(7);

  if (path.startsWith('t.me/')) path = path.substring(5);
  else if (path.startsWith('telegram.me/')) path = path.substring(12);
  else if (path.startsWith('telegram.dog/')) path = path.substring(13);

  // Clean trailing slashes or queries
  const cleanPath = path.split('?')[0].replace(/^\/+|\/+$/g, '');

  if (!cleanPath) {
    return {
      original: input,
      formattedHttps: 'https://t.me/MoneyHubOfficial',
      deepLinkTg: 'tg://resolve?domain=MoneyHubOfficial',
      androidIntent: 'intent://resolve?domain=MoneyHubOfficial#Intent;package=org.telegram.messenger;scheme=tg;end',
      isInviteLink: false,
      usernameOrHash: 'MoneyHubOfficial'
    };
  }

  // Case 1: Invite hash starting with '+'
  if (cleanPath.startsWith('+')) {
    const hash = cleanPath.substring(1);
    return {
      original: input,
      formattedHttps: `https://t.me/+${hash}`,
      deepLinkTg: `tg://join?invite=${hash}`,
      androidIntent: `intent://join?invite=${encodeURIComponent(hash)}#Intent;package=org.telegram.messenger;scheme=tg;end`,
      isInviteLink: true,
      usernameOrHash: hash
    };
  }

  // Case 2: Invite hash starting with 'joinchat/'
  if (cleanPath.startsWith('joinchat/')) {
    const hash = cleanPath.replace('joinchat/', '');
    return {
      original: input,
      formattedHttps: `https://t.me/joinchat/${hash}`,
      deepLinkTg: `tg://join?invite=${hash}`,
      androidIntent: `intent://join?invite=${encodeURIComponent(hash)}#Intent;package=org.telegram.messenger;scheme=tg;end`,
      isInviteLink: true,
      usernameOrHash: hash
    };
  }

  // Case 3: Standard Username (e.g. "MoneyHubOfficial")
  const username = cleanPath;
  return {
    original: input,
    formattedHttps: `https://t.me/${username}`,
    deepLinkTg: `tg://resolve?domain=${username}`,
    androidIntent: `intent://resolve?domain=${encodeURIComponent(username)}#Intent;package=org.telegram.messenger;scheme=tg;end`,
    isInviteLink: false,
    usernameOrHash: username
  };
}

export function isMetaInAppBrowser(): boolean {
  if (typeof window === 'undefined' || !navigator) return false;
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  return /Instagram|FB_IAB|FBAN|FBAV|FB4A|FBIOS|Messenger|WebView|wv/i.test(ua);
}

export function isAndroid(): boolean {
  if (typeof window === 'undefined' || !navigator) return false;
  return /Android/i.test(navigator.userAgent || '');
}

export function isIOS(): boolean {
  if (typeof window === 'undefined' || !navigator) return false;
  return /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
}

/**
 * Returns clean https://t.me/ link for direct navigation across all platforms
 * including Meta Ads, Instagram, Facebook, Chrome, and Safari.
 */
export function getSmartTelegramLink(rawUrl: string): string {
  const parsed = parseTelegramUrl(rawUrl);
  return parsed.formattedHttps || 'https://t.me/MoneyHubOfficial';
}

export const getMetaDirectLink = getSmartTelegramLink;

export function openTelegramInApp(rawUrl: string): void {
  const link = getSmartTelegramLink(rawUrl);
  if (typeof window !== 'undefined' && window.top !== window.self) {
    // If running inside an iframe (like AI Studio Preview), open in a new tab to avoid breaking the iframe
    window.open(link, '_blank');
  } else {
    window.location.href = link;
  }
}



