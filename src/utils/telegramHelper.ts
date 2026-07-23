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
  if (!trimmed) {
    return {
      original: '',
      formattedHttps: '',
      deepLinkTg: '',
      androidIntent: '',
      isInviteLink: false,
      usernameOrHash: ''
    };
  }

  // Handle @username
  if (trimmed.startsWith('@')) {
    const username = trimmed.substring(1);
    const encodedUser = encodeURIComponent(username);
    const fallbackHttps = encodeURIComponent(`https://t.me/${username}`);
    return {
      original: input,
      formattedHttps: `https://t.me/${username}`,
      deepLinkTg: `tg://resolve?domain=${username}`,
      androidIntent: `intent://resolve?domain=${encodedUser}#Intent;package=org.telegram.messenger;scheme=tg;S.browser_fallback_url=${fallbackHttps};end`,
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

  // Case 1: Invite hash starting with '+'
  if (cleanPath.startsWith('+')) {
    const hash = cleanPath.substring(1);
    const encodedHash = encodeURIComponent(hash);
    const fallbackHttps = encodeURIComponent(`https://t.me/+${hash}`);
    return {
      original: input,
      formattedHttps: `https://t.me/+${hash}`,
      deepLinkTg: `tg://join?invite=${hash}`,
      androidIntent: `intent://join?invite=${encodedHash}#Intent;package=org.telegram.messenger;scheme=tg;S.browser_fallback_url=${fallbackHttps};end`,
      isInviteLink: true,
      usernameOrHash: hash
    };
  }

  // Case 2: Invite hash starting with 'joinchat/'
  if (cleanPath.startsWith('joinchat/')) {
    const hash = cleanPath.replace('joinchat/', '');
    const encodedHash = encodeURIComponent(hash);
    const fallbackHttps = encodeURIComponent(`https://t.me/joinchat/${hash}`);
    return {
      original: input,
      formattedHttps: `https://t.me/joinchat/${hash}`,
      deepLinkTg: `tg://join?invite=${hash}`,
      androidIntent: `intent://join?invite=${encodedHash}#Intent;package=org.telegram.messenger;scheme=tg;S.browser_fallback_url=${fallbackHttps};end`,
      isInviteLink: true,
      usernameOrHash: hash
    };
  }

  // Case 3: Standard Username (e.g. "MoneyHubOfficial")
  const username = cleanPath;
  const encodedUser = encodeURIComponent(username);
  const fallbackHttps = encodeURIComponent(`https://t.me/${username}`);
  return {
    original: input,
    formattedHttps: `https://t.me/${username}`,
    deepLinkTg: `tg://resolve?domain=${username}`,
    androidIntent: `intent://resolve?domain=${encodedUser}#Intent;package=org.telegram.messenger;scheme=tg;S.browser_fallback_url=${fallbackHttps};end`,
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
 * Returns the best direct link for HTML <a> tags.
 * Always returns formatted HTTPS (https://t.me/...) to guarantee 100% compatibility
 * across Instagram, Facebook, Messenger, Chrome, Safari, and all mobile in-app browsers
 * without triggering "Page can't be loaded" or scheme errors on any device.
 */
export function getSmartTelegramLink(rawUrl: string): string {
  const parsed = parseTelegramUrl(rawUrl);
  return parsed.formattedHttps || '#';
}

export const getMetaDirectLink = getSmartTelegramLink;

export function openTelegramInApp(rawUrl: string): void {
  const parsed = parseTelegramUrl(rawUrl);
  if (!parsed.formattedHttps) return;

  // Navigate to standard t.me HTTPS URL
  window.location.href = parsed.formattedHttps;
}


