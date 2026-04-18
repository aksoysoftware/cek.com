'use client';

import { useState, FormEvent } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { IconMapPin, IconPhone, IconFax, IconMail } from '@/components/ui/Icons';

export default function ContactContent() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else { setStatus('error'); setTimeout(() => setStatus('idle'), 5000); }
    } catch { setStatus('error'); setTimeout(() => setStatus('idle'), 5000); }
  };

  return (
    <>
      <section className="page-hero" id="iletisim-hero">
        <div className="container">
          <div className="section-divider" style={{ margin: '0 auto var(--space-4)' }}></div>
          <h1>İletişim</h1>
          <p>Projeleriniz için bize ulaşın, size en uygun çözümü sunalım.</p>
        </div>
      </section>

      <section className="section" id="contact-content">
        <div className="container">
          <div className="contact-grid">
            <ScrollReveal>
              <form className="contact-form" onSubmit={handleSubmit} id="contact-form">
                <h3>Bize Yazın</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label className="label" htmlFor="contact-name">Ad Soyad</label>
                    <input className="input" type="text" id="contact-name" placeholder="Adınız Soyadınız" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="contact-email">E-posta</label>
                    <input className="input" type="email" id="contact-email" placeholder="ornek@email.com" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="label" htmlFor="contact-phone">Telefon</label>
                    <input className="input" type="tel" id="contact-phone" placeholder="+90 5XX XXX XX XX" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label className="label" htmlFor="contact-subject">Konu</label>
                    <input className="input" type="text" id="contact-subject" placeholder="Konuyu belirtin" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="label" htmlFor="contact-message">Mesajınız</label>
                  <textarea className="input" id="contact-message" placeholder="Mesajınızı yazın..." required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={status === 'sending'} id="contact-submit">
                  <IconMail size={18} />
                  {status === 'sending' ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </button>
                {status === 'success' && (
                  <div className="toast toast-success" style={{ marginTop: 'var(--space-4)' }}>Mesajınız başarıyla gönderildi!</div>
                )}
                {status === 'error' && (
                  <div className="toast toast-error" style={{ marginTop: 'var(--space-4)' }}>Bir hata oluştu, lütfen tekrar deneyin.</div>
                )}
              </form>
            </ScrollReveal>

            <ScrollReveal delay={2}>
              <div className="contact-info-cards">
                <div className="contact-info-card" id="contact-address">
                  <div className="contact-info-icon"><IconMapPin size={20} /></div>
                  <div>
                    <h4>Adres</h4>
                    <p>A. Öveçler Mahallesi Kabil Caddesi 1320. Sokak No:3/8 Çankaya, ANKARA</p>
                  </div>
                </div>
                <div className="contact-info-card" id="contact-phones">
                  <div className="contact-info-icon"><IconPhone size={20} /></div>
                  <div>
                    <h4>Telefon</h4>
                    <p><a href="tel:+903124816423">+90 312 481 64 23</a><br /><a href="tel:+903124817943">+90 312 481 79 43</a></p>
                  </div>
                </div>
                <div className="contact-info-card" id="contact-fax">
                  <div className="contact-info-icon"><IconFax size={20} /></div>
                  <div>
                    <h4>Faks</h4>
                    <p>+90 312 481 86 55</p>
                  </div>
                </div>
                <div className="contact-info-card" id="contact-email-info">
                  <div className="contact-info-icon"><IconMail size={20} /></div>
                  <div>
                    <h4>E-posta</h4>
                    <p><a href="mailto:cozum@cek.com.tr">cozum@cek.com.tr</a></p>
                  </div>
                </div>
                <div className="contact-map" id="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.5!2d32.85!3d39.9!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMznCsDU0JzAwLjAiTiAzMsKwNTEnMDAuMCJF!5e0!3m2!1str!2str!4v1"
                    loading="lazy" title="CEK Konum"
                  ></iframe>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
