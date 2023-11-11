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
