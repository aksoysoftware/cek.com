'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { getCategoryLabel, getStatusLabel } from '@/lib/utils';
import type { Reference } from '@/types';

const filters = [
  { key: 'all', label: 'Tümü' },
  { key: 'otomasyon', label: 'Otomasyon' },
  { key: 'satis', label: 'Satış & Montaj' },
  { key: 'servis', label: 'Servis & Bakım' },
];

export default function ReferencesContent() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [references, setReferences] = useState<Reference[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/references')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setReferences(data);
        }
      })
      .catch((err) => {
         console.error('Referanslar yüklenirken hata:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered =
    activeFilter === 'all'
      ? references
      : references.filter((r) => r.category === activeFilter);

  return (
    <>
      {/* Page Hero */}
      <section className="page-hero" id="referanslar-hero">
        <div className="container">
          <div className="section-divider" style={{ margin: '0 auto var(--space-6)' }}></div>
          <h1>Referanslarımız</h1>
          <p>Başarıyla tamamladığımız ve devam eden projelerimiz.</p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="section" id="referanslar-content">
        <div className="container">
          {/* Filter Bar */}
          <div className="filter-bar" id="reference-filters">
            {filters.map((filter) => (
              <button
                key={filter.key}
                className={`filter-btn ${activeFilter === filter.key ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter.key)}
                id={`filter-${filter.key}`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {loading ? (
             <div style={{ textAlign: 'center', padding: 'var(--space-12)' }}>Yükleniyor...</div>
          ) : (
             <div className="references-grid">
               {filtered.map((ref, index) => (
                 <ScrollReveal key={ref.id} delay={(index % 3) + 1}>
                   <Link href={`/referanslar/${ref.slug}`} style={{ textDecoration: 'none' }}>
                     <div className="reference-card" id={`ref-card-${ref.id}`}>
                       <div
                         className="reference-image"
                         style={{
                           background: ref.imageUrl
                             ? `url(${ref.imageUrl}) center/cover`
                             : 'linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary))',
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           fontSize: '3rem',
                         }}
                       >
                         {!ref.imageUrl && '🏗️'}
                       </div>
                       <div className="reference-body">
                         <span className="reference-category">
                           {getCategoryLabel(ref.category)}
                         </span>
                         <h3 className="reference-title">{ref.title}</h3>
                         <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)', marginBottom: 'var(--space-2)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                           {ref.description}
                         </p>
                         <span className={`reference-status ${ref.status}`}>
                           {ref.status === 'biten' ? '●' : '◐'} {getStatusLabel(ref.status)}
                         </span>
                       </div>
                     </div>
                   </Link>
                 </ScrollReveal>
               ))}
             </div>
          )}

          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: 'var(--space-16)', color: 'var(--color-text-muted)' }}>
              Bu kategoride henüz referans bulunmamaktadır.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
