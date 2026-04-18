import Link from 'next/link';
import Image from 'next/image';
import { IconMapPin, IconPhone, IconMail } from '@/components/ui/Icons';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link href="/" className="footer-brand-logo">
              <Image src="/images/cozum-logo-white.svg" alt="Çözüm Elektrik Klima Logo" width={150} height={40} style={{ width: 'auto', height: '34px', objectFit: 'contain', marginRight: '8px' }} priority />
              <span>ÇEK</span>
            </Link>
            <p>
              1990&apos;dan bu yana ısıtma, soğutma, klima, havalandırma ve otomasyon
              alanlarında profesyonel çözümler sunan güvenilir iş ortağınız.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h4>Hızlı Linkler</h4>
            <ul className="footer-links">
              <li><Link href="/">Ana Sayfa</Link></li>
              <li><Link href="/kurumsal">Kurumsal</Link></li>
              <li><Link href="/referanslar">Referanslar</Link></li>
              <li><Link href="/sertifikalar">Sertifikalar</Link></li>
              <li><Link href="/iletisim">İletişim</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-column">
            <h4>Hizmetler</h4>
            <ul className="footer-links">
              <li><a href="#">Klima &amp; Soğutma</a></li>
              <li><a href="#">Havalandırma</a></li>
              <li><a href="#">Otomasyon</a></li>
              <li><a href="#">Servis &amp; Bakım</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-column">
            <h4>İletişim</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><IconMapPin size={16} /></span>
              <span>A. Öveçler Mah. Kabil Cad. 1320. Sok. No:3/8 Çankaya, Ankara</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><IconPhone size={16} /></span>
              <span>
                <a href="tel:+903124816423">+90 312 481 64 23</a><br />
                <a href="tel:+903124817943">+90 312 481 79 43</a>
              </span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon"><IconMail size={16} /></span>
              <a href="mailto:cozum@cek.com.tr">cozum@cek.com.tr</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} ÇEK — Çözüm Elektrik Klima. Tüm hakları saklıdır.</span>
          <span>Ankara, Türkiye</span>
        </div>
      </div>
    </footer>
  );
}
