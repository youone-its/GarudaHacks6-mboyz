import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

export function getLevelFromXP(xp: number): number {
  // Dummy: 1000 XP per level
  return Math.floor(xp / 1000) + 1;
}

export function formatXP(xp: number): string {
  return xp.toLocaleString('en-US');
}

export function getRankIcon(rank: number): string {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return '🏅';
}
