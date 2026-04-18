/**
 * Utility functions for CEK website
 */

/** Generate a URL-friendly slug from a Turkish string */
export function slugify(text: string): string {
  const turkishMap: Record<string, string> = {
    ç: 'c', Ç: 'C', ğ: 'g', Ğ: 'G', ı: 'i', İ: 'I',
    ö: 'o', Ö: 'O', ş: 's', Ş: 'S', ü: 'u', Ü: 'U',
  };

  return text
    .split('')
    .map((char) => turkishMap[char] || char)
    .join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Format a date to Turkish locale */
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date));
}

/** Get category display name */
export function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    otomasyon: 'Otomasyon',
    satis: 'Satış & Montaj',
    servis: 'Servis & Bakım',
  };
  return labels[category] || category;
}

/** Get status display name */
export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    biten: 'Tamamlandı',
    devam: 'Devam Ediyor',
  };
  return labels[status] || status;
}

/** Truncate text */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.substring(0, length) + '...';
}

/** Generate placeholder image URL */
export function getPlaceholderImage(width: number, height: number, text?: string): string {
  return `https://placehold.co/${width}x${height}/1B2A4A/00D4FF?text=${encodeURIComponent(text || 'CEK')}`;
}

/** cn - class name merger utility */
export function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
