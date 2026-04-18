// Type definitions for CEK website

export interface Reference {
  id: string;
  title: string;
  slug: string;
  category: 'otomasyon' | 'satis' | 'servis';
  status: 'biten' | 'devam';
  imageUrl: string | null;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  fileUrl: string;
  validUntil: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

export interface StatItem {
  icon: string;
  number: string;
  label: string;
}

export interface WhyItem {
  icon: string;
  title: string;
  text: string;
}

// i18n types
export type Locale = 'tr' | 'en';

export interface TranslationKeys {
  [key: string]: string | TranslationKeys;
}
