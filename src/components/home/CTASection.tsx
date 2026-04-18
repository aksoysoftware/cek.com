'use client';

import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { IconMail, IconPhone } from '@/components/ui/Icons';

export default function CTASection() {
  return (
    <section className="cta-section" id="cta-section">
      <div className="container">
        <ScrollReveal>
          <div className="cta-card">
            <h2>
              Projeniz İçin{' '}
              <span className="gradient-text">Çözüm Ortağınız</span>
            </h2>
            <p>
              İklimlendirme ve otomasyon ihtiyaçlarınız için bize ulaşın, en uygun
              çözümü birlikte bulalım.
            </p>
            <div className="cta-actions">
              <Link href="/iletisim" className="btn btn-primary btn-lg" id="cta-contact">
                <IconMail size={18} /> Hemen İletişime Geçin
              </Link>
              <a href="tel:+903124816423" className="btn btn-secondary btn-lg" id="cta-phone">
                <IconPhone size={18} /> +90 312 481 64 23
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
