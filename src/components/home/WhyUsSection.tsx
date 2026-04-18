'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import {
  IconTrophy, IconShield, IconUsers, IconHeadphones,
  IconMicroscope, IconHandshake, IconDollar, IconCheck,
} from '@/components/ui/Icons';
import React from 'react';

const reasons = [
  { icon: <IconTrophy />, title: '35+ Yıl Deneyim', text: '1990\'dan beri sektörde' },
  { icon: <IconShield />, title: 'Kalite Garantisi', text: 'ISO standartlarında hizmet' },
  { icon: <IconUsers />, title: 'Uzman Ekip', text: 'Deneyimli mühendis kadrosu' },
  { icon: <IconHeadphones />, title: '7/24 Destek', text: 'Kesintisiz teknik servis' },
  { icon: <IconMicroscope />, title: 'İleri Teknoloji', text: 'Güncel ekipman ve yöntemler' },
  { icon: <IconHandshake />, title: 'Müşteri Memnuniyeti', text: 'Her projede memnuniyet' },
  { icon: <IconDollar />, title: 'Uygun Fiyat', text: 'Rekabetçi fiyat politikası' },
  { icon: <IconCheck />, title: 'Güvenilirlik', text: 'Zamanında ve kaliteli teslimat' },
];

export default function WhyUsSection() {
  return (
    <section className="why-section" id="why-us-section">
      <div className="container">
        <ScrollReveal>
          <div className="why-header">
            <div className="section-divider" style={{ margin: '0 auto var(--space-4)' }}></div>
            <h2 className="gradient-text">Neden Biz?</h2>
            <p>
              35 yılı aşkın tecrübemiz ve kalite anlayışımızla sektörde güvenilen bir markayız.
            </p>
          </div>
        </ScrollReveal>

        <div className="why-grid">
          {reasons.map((reason, index) => (
            <ScrollReveal key={reason.title} delay={(index % 4) + 1}>
              <div className="why-card" id={`why-card-${index}`}>
                <div className="why-icon">{reason.icon}</div>
                <h4 className="why-title">{reason.title}</h4>
                <p className="why-text">{reason.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
