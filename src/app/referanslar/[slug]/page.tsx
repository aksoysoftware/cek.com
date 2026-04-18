import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import { IconArrowRight } from '@/components/ui/Icons';

export default function ReferenceDetailPage({ params }: { params: { slug: string } }) {
  const reference = {
    title: params.slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    slug: params.slug,
    category: 'otomasyon',
    status: 'biten',
    description: 'Bu proje kapsamında bina otomasyon sistemi kurulumu, devreye alma ve eğitim hizmetleri verilmiştir. Modern kontrol teknolojileri ve enerji verimli çözümler kullanılmıştır.',
  };

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="section-divider" style={{ margin: '0 auto var(--space-4)' }}></div>
            <h1>{reference.title}</h1>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
              <span className="badge">Otomasyon</span>
              <span className="badge" style={{ background: 'rgba(52, 211, 153, 0.08)', color: 'var(--color-success)', borderColor: 'rgba(52, 211, 153, 0.15)' }}>
                ● Tamamlandı
              </span>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container" style={{ maxWidth: '800px' }}>
            <div
              className="glass-card"
              style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 'var(--space-8)',
                background: 'linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary))',
                color: 'var(--color-text-muted)',
                fontSize: 'var(--text-lg)',
              }}
            >
              Proje Görseli
            </div>

            <div className="glass-card" style={{ padding: 'var(--space-8)' }}>
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Proje Detayları</h3>
              <p style={{ lineHeight: 2 }}>
                {reference.description}
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: 'var(--space-8)' }}>
              <Link href="/referanslar" className="btn btn-secondary">
                Tüm Referansları Gör <IconArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
