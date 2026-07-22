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
    return {
      original: input,
      formattedHttps: `https://t.me/${username}`,
      deepLinkTg: `tg://resolve?domain=${username}`,
      androidIntent: `intent://t.me/${username}#Intent;scheme=https;package=org.telegram.messenger;end`,
      isInviteLink: false,
      usernameOrHash: username
    };
  }

  // Strip leading https:// or http:// or t.me/
  let path = trimmed;
  if (path.startsWith('https://')) path = path.substring(8);
  else if (path.startsWith('http://')) path = path.substring(7);

  if (path.startsWith('t.me/')) path = path.substring(5);
  else if (path.startsWith('telegram.me/')) path = path.substring(12);

  // Remove trailing slashes or queries
  const cleanPath = path.split('?')[0].replace(/^\/+|\/+$/g, '');

  // Case 1: Invite hash (+hash or joinchat/hash)
  if (cleanPath.startsWith('+')) {
    const hash = cleanPath.substring(1);
    return {
      original: input,
      formattedHttps: `https://t.me/+${hash}`,
      deepLinkTg: `tg://join?invite=${hash}`,
      androidIntent: `intent://t.me/+${hash}#Intent;scheme=https;package=org.telegram.messenger;end`,
      isInviteLink: true,
      usernameOrHash: hash
    };
  }

  if (cleanPath.startsWith('joinchat/')) {
    const hash = cleanPath.replace('joinchat/', '');
    return {
      original: input,
      formattedHttps: `https://t.me/joinchat/${hash}`,
      deepLinkTg: `tg://join?invite=${hash}`,
      androidIntent: `intent://t.me/joinchat/${hash}#Intent;scheme=https;package=org.telegram.messenger;end`,
      isInviteLink: true,
      usernameOrHash: hash
    };
  }

  // Case 2: Standard Username (e.g. "my_channel_name")
  const username = cleanPath;
  return {
    original: input,
    formattedHttps: `https://t.me/${username}`,
    deepLinkTg: `tg://resolve?domain=${username}`,
    androidIntent: `intent://t.me/${username}#Intent;scheme=https;package=org.telegram.messenger;end`,
    isInviteLink: false,
    usernameOrHash: username
  };
}

export function isMetaInAppBrowser(): boolean {
  if (typeof window === 'undefined' || !navigator) return false;
  const ua = navigator.userAgent || navigator.vendor || (window as any).opera || '';
  return /Instagram|FB_IAB|FBAN|FBAV/i.test(ua);
}

export function isAndroid(): boolean {
  if (typeof window === 'undefined' || !navigator) return false;
  return /Android/i.test(navigator.userAgent || '');
}

/**
 * Returns the best direct `href` attribute for HTML `<a>` tags in Meta Ads (Instagram / Facebook) in-app browsers
 */
export function getMetaDirectLink(rawUrl: string): string {
  const parsed = parseTelegramUrl(rawUrl);
  if (!parsed.formattedHttps) return '#';

  const inMeta = isMetaInAppBrowser();
  const onAndroid = isAndroid();

  if (inMeta && onAndroid) {
    // Android Intent scheme forces Instagram WebView to release navigation to Android OS / Telegram
    return parsed.androidIntent;
  }

  if (inMeta && !onAndroid) {
    // iOS Meta In-App Browser handles tg:// scheme deep link directly
    return parsed.deepLinkTg || parsed.formattedHttps;
  }

  return parsed.formattedHttps;
}

export function openTelegramInApp(rawUrl: string): void {
  const parsed = parseTelegramUrl(rawUrl);
  if (!parsed.formattedHttps) return;

  const inMeta = isMetaInAppBrowser();
  const onAndroid = isAndroid();

  if (inMeta) {
    if (onAndroid) {
      // 1. First attempt Android Intent
      window.location.href = parsed.androidIntent;

      // 2. Secondary fallback after 200ms
      setTimeout(() => {
        window.location.href = parsed.deepLinkTg;
      }, 200);

      // 3. Tertiary HTTPS fallback
      setTimeout(() => {
        window.location.href = parsed.formattedHttps;
      }, 600);
    } else {
      // iOS Meta Webview
      window.location.href = parsed.deepLinkTg;

      setTimeout(() => {
        window.location.href = parsed.formattedHttps;
      }, 300);
    }
  } else {
    // Standard Mobile or Desktop Browser
    window.location.href = parsed.formattedHttps;
  }
}

