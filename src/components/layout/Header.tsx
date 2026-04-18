'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from '@/components/ui/ThemeProvider';
import { IconSun, IconMoon } from '@/components/ui/Icons';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/kurumsal', label: 'Kurumsal' },
  { href: '/referanslar', label: 'Referanslar' },
  { href: '/sertifikalar', label: 'Sertifikalar' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`header ${scrolled ? 'header-scrolled' : 'header-transparent'}`} id="main-header">
        <div className="header-inner">
          <Link href="/" className="header-logo" id="header-logo">
            <Image src={theme === 'dark' ? "/images/cozum-logo-white.svg" : "/images/cozum-logo.svg"} alt="Çözüm Elektrik Klima Logo" width={200} height={60} style={{ width: 'auto', height: '44px', objectFit: 'contain' }} priority />
          </Link>

          <nav className="header-nav" id="main-nav">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`header-nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label="Tema Değiştir"
              id="theme-toggle"
            >
              {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </button>

            <Link href="/iletisim" className="btn btn-primary btn-sm header-cta" id="header-cta">
              Bize Ulaşın
            </Link>

            <button
              className={`mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menü"
              id="mobile-menu-toggle"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} id="mobile-menu">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="mobile-menu-link"
            onClick={() => setMobileOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button
          className="btn btn-secondary"
          onClick={toggleTheme}
          style={{ marginTop: '16px' }}
        >
          {theme === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
          {theme === 'dark' ? 'Açık Tema' : 'Koyu Tema'}
        </button>
      </div>
    </>
  );
}
