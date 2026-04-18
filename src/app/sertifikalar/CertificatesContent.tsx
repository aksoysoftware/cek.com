'use client';

import { useState, useEffect } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { IconAward, IconDownload, IconZoomIn } from '@/components/ui/Icons';
import type { Certificate } from '@/types';

export default function CertificatesContent() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/certificates')
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setCertificates(data); })
      .catch((err) => console.error('Sertifikalar yüklenirken hata:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="page-hero" id="sertifikalar-hero">
        <div className="container">
          <div className="section-divider" style={{ margin: '0 auto var(--space-4)' }}></div>
          <h1>Sertifikalarımız</h1>
          <p>Kalite ve güvenilirliğimizi belgeleyen sertifikalarımız.</p>
        </div>
      </section>

      <section className="section" id="sertifikalar-content">
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Yükleniyor...</div>
          ) : certificates.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-12)', color: 'var(--color-text-muted)' }}>Henüz sertifika eklenmemiş.</div>
          ) : (
            <div className="certificates-grid">
              {certificates.map((cert, index) => (
                <ScrollReveal key={cert.id} delay={(index % 3) + 1}>
                  <div className="certificate-card" id={`cert-card-${cert.id}`}>
                    {cert.fileUrl && !cert.fileUrl.endsWith('.pdf') ? (
                      <div style={{ width: '100%', height: '180px', marginBottom: 'var(--space-4)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                        <img src={cert.fileUrl} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    ) : (
                      <div className="certificate-icon"><IconAward size={24} /></div>
                    )}
                    <h3 className="certificate-name">{cert.name}</h3>
                    <p className="certificate-issuer">{cert.issuer}</p>
                    {cert.validUntil && (
                      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-4)' }}>
                        Geçerlilik: {new Date(cert.validUntil).toLocaleDateString('tr-TR')}
                      </p>
                    )}
                    {cert.fileUrl && (
                      <a href={cert.fileUrl} className="btn btn-secondary btn-sm" target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto' }}>
                        {cert.fileUrl.endsWith('.pdf') ? <><IconDownload size={14} /> PDF İndir</> : <><IconZoomIn size={14} /> Büyüt</>}
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
