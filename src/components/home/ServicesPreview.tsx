'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { IconSnowflake, IconWind, IconBolt, IconWrench } from '@/components/ui/Icons';
import React from 'react';

const services = [
  {
    icon: <IconSnowflake />,
    title: 'Klima & Soğutma',
    description:
      'Endüstriyel ve ticari klima sistemlerinin satış, montaj ve bakım hizmetleri. VRF, split ve merkezi sistemler.',
  },
  {
    icon: <IconWind />,
    title: 'Havalandırma',
    description:
      'Mekanik havalandırma sistemleri tasarım, uygulama ve bakım çözümleri. Temiz hava, taze yaşam alanları.',
  },
  {
    icon: <IconBolt />,
    title: 'Otomasyon',
    description:
      'Bina otomasyon sistemleri ve otomatik kontrol teknolojileri kurulumu. Akıllı bina çözümleri.',
  },
  {
    icon: <IconWrench />,
    title: 'Servis & Bakım',
    description:
      '7/24 teknik servis desteği, periyodik bakım ve arıza giderme hizmetleri. Hızlı müdahale garantisi.',
  },
];

export default function ServicesPreview() {
  return (
    <section className="services-section section" id="services-section">
      <div className="container">
        <ScrollReveal>
          <div className="services-header">
            <div className="section-divider"></div>
            <h2 className="gradient-text">Hizmetlerimiz</h2>
            <p>
              Profesyonel ekibimizle kapsamlı iklimlendirme ve otomasyon çözümleri sunuyoruz.
            </p>
          </div>
        </ScrollReveal>

        <div className="services-grid">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index + 1}>
              <div className="service-card" id={`service-card-${index}`}>
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
