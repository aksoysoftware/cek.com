'use client';

import ScrollReveal from '@/components/ui/ScrollReveal';
import { IconCheck, IconTarget, IconEye } from '@/components/ui/Icons';

const qualityPoints = [
  'Verimli, etkili ve sürekli gelişime açık bir kalite yönetim sistemi uygulamak',
  'Kaliteli hizmeti ilk defasında ve her defasında yerine getirmek',
  'Müşteri ihtiyaç ve beklentilerini en iyi şekilde karşılamak',
  'Deneyimli ve eğitimli ekipler oluşturmak ve gelişimlerine imkân vermek',
  'Çalışanların sürekli gelişmeleri için eğitimlere katılmalarını sağlamak',
  'Müşteri memnuniyeti anketleri ile gerekli analiz ve değerlendirmeler yapmak',
  'Müşteri ve tedarikçilerle karşılıklı sevgi ve saygıya dayalı çalışma ortamı oluşturmak',
  'Çevreye ve doğaya zarar verilmesinin azaltılmasını sağlamak',
];

export default function KurumsalContent() {
  return (
    <>
      <section className="page-hero" id="kurumsal-hero">
        <div className="container">
          <div className="section-divider" style={{ margin: '0 auto var(--space-4)' }}></div>
          <h1>Kurumsal</h1>
          <p>1990&apos;dan bu yana güvenilir çözüm ortağınız</p>
        </div>
      </section>

      <section className="section" id="tarihce">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
              <div className="section-divider" style={{ margin: '0 auto var(--space-4)' }}></div>
              <h2>Tarihçemiz</h2>
            </div>
          </ScrollReveal>

          <div className="timeline" style={{ marginTop: 'var(--space-12)' }}>
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">1990</div>
                <h4>Kuruluş</h4>
                <p>Firmamız 1990 yılında Ankara&apos;da kurulmuştur. Elektrik taahhüt işleri ile sektöre adım attık.</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">1994</div>
                <h4>Sektör Dönüşümü</h4>
                <p>Isıtma soğutma, klima, havalandırma ve otomasyon sektörüne geçiş yaparak bu alanlarda kalıcı yerimizi aldık.</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-year">Bugün</div>
                <h4>Sektörde Lider</h4>
                <p>Deneyimli mühendis, tekniker, teknisyen kadromuzla iklimlendirme ve otomasyon sektöründe taahhüt, satış, montaj, servis hizmetlerine yüksek kalite anlayışıyla devam ediyoruz.</p>
              </div>
              <div className="timeline-dot"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="misyon-vizyon" style={{ background: 'var(--color-bg-secondary)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="mv-grid">
            <ScrollReveal>
              <div className="mv-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div className="stat-icon" style={{ width: '40px', height: '40px', margin: 0 }}><IconTarget size={20} /></div>
                  <h3 style={{ marginBottom: 0 }}>Misyonumuz</h3>
                </div>
                <p>Firmamızın özgün kalite anlayışı ve deneyimi ile müşterilerimizin ısıtma soğutma, klima, havalandırma ve otomasyon konusunda ihtiyaçlarına uygun birebir cevap veren çözümler üretmektir.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={2}>
              <div className="mv-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                  <div className="stat-icon" style={{ width: '40px', height: '40px', margin: 0 }}><IconEye size={20} /></div>
                  <h3 style={{ marginBottom: 0 }}>Vizyonumuz</h3>
                </div>
                <p>Firmamızın her konuda güvenilir imajını sürekli kılmak için zaman, malzeme ve teknolojik ekipmanları; müşteri ihtiyaç ve beklentilerine göre verimli ve etkin kullanarak, mutlak müşteri ve çalışan memnuniyeti yaratmak.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section" id="kalite-politikasi">
        <div className="container">
          <ScrollReveal>
            <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto var(--space-12)' }}>
              <div className="section-divider" style={{ margin: '0 auto var(--space-4)' }}></div>
              <h2>Kalite Politikamız</h2>
              <p>Isıtma, soğutma, havalandırma, klima, mekanik tesisat, otomasyon ve otomatik kontrol teknolojilerinde hizmet veren firmamızın kalite anlayışı:</p>
            </div>
          </ScrollReveal>

          <div className="why-grid">
            {qualityPoints.map((point, index) => (
              <ScrollReveal key={index} delay={(index % 4) + 1}>
                <div className="why-card" style={{ textAlign: 'left' }}>
                  <div className="why-icon" style={{ margin: '0 0 var(--space-3) 0' }}><IconCheck size={22} /></div>
                  <p className="why-text" style={{ color: 'var(--color-text-secondary)' }}>{point}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
