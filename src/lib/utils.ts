import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFirstName(name: string | null): string {
  if (!name) {
    return 'User';
  }

  const firstName = name.split(' ')[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
}

