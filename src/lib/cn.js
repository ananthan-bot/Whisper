import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility to merge Tailwind classes safely without conflicts.
 * Combines clsx (conditional classes) with tailwind-merge (deduplication).
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
