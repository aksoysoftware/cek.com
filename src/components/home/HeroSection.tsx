import Link from 'next/link';
import { IconMail, IconArrowRight } from '@/components/ui/Icons';

export default function HeroSection() {
  return (
    <section className="hero" id="hero-section">
      <div className="hero-bg" />

      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            1990&apos;dan beri hizmetinizdeyiz
          </div>

          <h1 className="hero-title">
            İklimlendirme ve Otomasyon{' '}
            <span className="gradient-text">Çözüm Ortağınız</span>
          </h1>

          <p className="hero-description">
            35 yılı aşkın deneyimimizle ısıtma, soğutma, klima, havalandırma
            ve otomasyon alanlarında profesyonel çözümler sunuyoruz.
          </p>

          <div className="hero-actions">
            <Link href="/iletisim" className="btn btn-primary btn-lg" id="hero-cta-contact">
              <IconMail size={18} /> Bize Ulaşın
            </Link>
            <Link href="/referanslar" className="btn btn-secondary btn-lg" id="hero-cta-refs">
              Referanslarımız <IconArrowRight size={18} />
            </Link>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">35+</div>
              <div className="hero-stat-label">Yıl Deneyim</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">500+</div>
              <div className="hero-stat-label">Tamamlanan Proje</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">300+</div>
              <div className="hero-stat-label">Mutlu Müşteri</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-decoration" aria-hidden="true">
        <div className="hero-deco-ring"></div>
        <div className="hero-deco-ring"></div>
        <div className="hero-deco-ring"></div>
      </div>
    </section>
  );
}
