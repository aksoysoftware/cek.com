'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { IconSnowflake, IconBolt, IconWrench, IconTrophy } from '@/components/ui/Icons';

const slides = [
  {
    num: '01',
    label: 'Otomasyon Sistemleri',
    title: ['AKILLI', 'BİNA', 'KONTROL'],
    hlIndex: 1,
    desc: 'BMS entegrasyonu, HVAC kontrolü ve akıllı bina otomasyon sistemlerinde 35 yıllık mühendislik deneyimi.',
    cta1: { label: 'Projelerimiz', href: '/referanslar' },
    cta2: { label: 'Detaylar', href: '/kurumsal' },
    tags: ['BMS', 'HVAC', 'Scada'],
    icon: <IconSnowflake size={180} />,
  },
  {
    num: '02',
    label: 'Endüstriyel Çözümler',
    title: ['VRF &', 'CHİLLER', 'SİSTEMLER'],
    hlIndex: 1,
    desc: 'Kurumsal ölçekli projeler için VRF, chiller ve split klima sistemleri tedarik ve kurulumu.',
    cta1: { label: 'Hizmetler', href: '/referanslar' },
    cta2: { label: 'İletişim', href: '/iletisim' },
    tags: ['VRF', 'Chiller', 'Split'],
    icon: <IconBolt size={180} />,
  },
  {
    num: '03',
    label: '7/24 Servis',
    title: ['KESİNTİSİZ', 'DESTEK', 'HİZMETİ'],
    hlIndex: 1,
    desc: 'Periyodik bakım, acil arıza müdahale ve orijinal yedek parça desteğiyle kesintisiz operasyon garantisi.',
    cta1: { label: 'Servis Talebi', href: '/iletisim' },
    cta2: { label: 'Anlaşma', href: '/iletisim' },
    tags: ['Bakım', 'Arıza', 'Yedek Parça'],
    icon: <IconWrench size={180} />,
  },
  {
    num: '04',
    label: 'Referanslar',
    title: ['500+', 'BAŞARILI', 'PROJE'],
    hlIndex: 1,
    desc: 'Hastane, AVM, fabrika ve ofis komplekslerinde tamamlanan projelerle sektörün güvenilir çözüm ortağı.',
    cta1: { label: 'Referanslar', href: '/referanslar' },
    cta2: { label: 'Sertifikalar', href: '/sertifikalar' },
    tags: ['Hastane', 'AVM', 'Fabrika'],
    icon: <IconTrophy size={180} />,
  },
];

const INTERVAL = 5000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback((n: number) => {
    if (transitioning) return;
    setTransitioning(true);
    const next = ((n % slides.length) + slides.length) % slides.length;
    setCurrent(next);
    setProgress(0);
    setTimeout(() => setTransitioning(false), 700);
  }, [transitioning]);

  useEffect(() => {
    const progInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + (100 / (INTERVAL / 50));
      });
    }, 50);

    const slideInterval = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
      setProgress(0);
    }, INTERVAL);

    return () => {
      clearInterval(progInterval);
      clearInterval(slideInterval);
    };
  }, [current]);

  return (
    <section className="hero-slider" id="hero-slider">
      <div className="hero-slider-grid-lines" />
      <div className="hero-slider-progress" style={{ width: `${progress}%` }} />
      <div className="hero-slider-counter">
        <span>{String(current + 1).padStart(2, '0')}</span> / {String(slides.length).padStart(2, '0')}
      </div>

      {slides.map((slide, i) => (
        <div key={i} className={`hero-slide ${i === current ? 'active' : ''}`}>
          <div className="hero-slide-bg-icon">{slide.icon}</div>
          <div className="hero-slide-content">
            <div className="hero-slide-num">
              {slide.num} — {slide.label}
            </div>
            <h1 className="hero-slide-title">
              {slide.title.map((line, j) => (
                <span key={j}>
                  {j === slide.hlIndex ? (
                    <span className="hl">{line}</span>
                  ) : j === 2 ? (
                    <span className="outline">{line}</span>
                  ) : (
                    line
                  )}
                  {j < slide.title.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="hero-slide-desc">{slide.desc}</p>
            <div className="hero-slide-actions">
              <Link href={slide.cta1.href} className="btn-slider-primary">{slide.cta1.label}</Link>
              <Link href={slide.cta2.href} className="btn-slider-secondary">{slide.cta2.label}</Link>
            </div>
            <div className="hero-slide-tags">
              {slide.tags.map((tag) => (
                <span key={tag} className="hero-tag">{tag}</span>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div className="hero-slider-controls">
        <div className="hero-dots">
          {slides.map((_, i) => (
            <button key={i} className={`hero-dot ${i === current ? 'active' : ''}`} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
        <div className="hero-arrows">
          <button className="hero-arrow" onClick={() => goTo(current - 1)} aria-label="Önceki">&#8592;</button>
          <button className="hero-arrow" onClick={() => goTo(current + 1)} aria-label="Sonraki">&#8594;</button>
        </div>
      </div>
    </section>
  );
}
