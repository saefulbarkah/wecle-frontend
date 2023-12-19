import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function censorEmail(email: string) {
  const parts = email.split('@');
  const username = parts[0];
  const censoredUsername = username[0] + '*'.repeat(username.length - 1);
  const censoredEmail = censoredUsername + '@' + parts[1];
  return censoredEmail;
}

export function limitText({ text, limit }: { text: string; limit: number }) {
  if (text.length > limit) {
    const lastSpaceIndex = text.lastIndexOf(' ', limit);

    const truncatedText =
      lastSpaceIndex !== -1
        ? text.substring(0, lastSpaceIndex)
        : text.substring(0, limit);

    return truncatedText + '...';
  } else {
    return text;
  }
}

export function htmlToText(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';
}
