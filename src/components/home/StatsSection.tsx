'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import Counter from '@/components/ui/Counter';
import { IconTrophy, IconBuilding, IconUsers, IconWrench } from '@/components/ui/Icons';

const stats = [
  { icon: <IconTrophy />, end: 35, suffix: '+', label: 'Yıl Deneyim' },
  { icon: <IconBuilding />, end: 500, suffix: '+', label: 'Tamamlanan Proje' },
  { icon: <IconUsers />, end: 300, suffix: '+', label: 'Mutlu Müşteri' },
  { icon: <IconWrench />, end: 50, suffix: '+', label: 'Uzman Kadro' },
];

export default function StatsSection() {
  return (
    <section 
      className="stats-section section" 
      id="stats-section"
      style={{
        padding: '6rem 0',
        background: 'linear-gradient(to bottom right, var(--color-primary), var(--color-secondary), var(--color-accent))',
        color: '#fff',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '24rem',
          height: '24rem',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '50%',
          filter: 'blur(3rem)',
          animation: 'float-blob 20s infinite ease-in-out alternate'
        }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index + 1}>
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{
                    fontSize: 'var(--text-6xl)',
                    fontWeight: 800,
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  <Counter end={stat.end} suffix={stat.suffix} />
                </div>
                <div style={{ fontSize: 'var(--text-lg)', color: 'rgba(255,255,255,0.9)', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
