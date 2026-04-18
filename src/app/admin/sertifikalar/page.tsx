'use client';

import { useState, useEffect, FormEvent } from 'react';
import { IconPlus, IconEdit, IconTrash } from '@/components/ui/Icons';

interface CertificateRow {
  id: string;
  name: string;
  issuer: string;
  validUntil: string | null;
  fileUrl: string;
  isActive: boolean;
}

export default function AdminCertificates() {
  const [certificates, setCertificates] = useState<CertificateRow[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    validUntil: '',
    fileUrl: '',
  });

  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const fetchCertificates = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/certificates');
      const data = await res.json();
      if (Array.isArray(data)) setCertificates(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const resetForm = () => {
    setFormData({
      name: '',
      issuer: '',
      validUntil: '',
      fileUrl: '',
    });
    setUploadFile(null);
    setEditId(null);
  };

  const handleOpenModal = (cert?: CertificateRow) => {
    if (cert) {
      setEditId(cert.id);
      setFormData({
        name: cert.name,
        issuer: cert.issuer,
        validUntil: cert.validUntil ? cert.validUntil.split('T')[0] : '', // format date for input type=date
        fileUrl: cert.fileUrl || '',
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let finalFileUrl = formData.fileUrl;

      // Handle file upload if exists
      if (uploadFile) {
        const fileData = new FormData();
        fileData.append('file', uploadFile);
        fileData.append('folder', 'certificates');
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: fileData,
        });

        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          finalFileUrl = url;
        } else {
          const err = await uploadRes.json();
          alert('Upload failed: ' + err.error);
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        name: formData.name,
        issuer: formData.issuer,
        validUntil: formData.validUntil ? new Date(formData.validUntil).toISOString() : null,
        fileUrl: finalFileUrl,
      };

      const endpoint = editId ? `/api/certificates/${editId}` : '/api/certificates';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        handleCloseModal();
        fetchCertificates();
      } else {
        alert('Kaydetme hatası!');
      }

    } catch (e) {
      console.error(e);
      alert('Beklenmeyen bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`${name} sertifikasını silmek istediğinize emin misiniz?`)) return;
    
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCertificates();
      } else {
        alert('Silinemedi.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="admin-certificates">
      <h1 className="admin-page-title">Sertifika Yönetimi</h1>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 style={{ fontSize: 'var(--text-lg)' }}>Sertifikalar ({certificates.length})</h3>
          <button className="btn btn-primary btn-sm" onClick={() => handleOpenModal()} id="add-cert-btn">
            <IconPlus size={14} /> Yeni Sertifika
          </button>
        </div>

        {loading ? (
           <div style={{ padding: '20px', textAlign: 'center' }}>Yükleniyor...</div>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Görsel</th>
                <th>Sertifika Adı</th>
                <th>Veren Kurum</th>
                <th>Geçerlilik</th>
                <th>Aktif</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert) => (
                <tr key={cert.id}>
                  <td>
                    {cert.fileUrl ? (
                      <a href={cert.fileUrl} target="_blank" rel="noopener noreferrer">
                        {cert.fileUrl.endsWith('.pdf') ? 'PDF' : <img src={cert.fileUrl} alt={cert.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px' }} />}
                      </a>
                    ) : (
                      <div style={{ width: 40, height: 40, background: 'var(--color-bg-secondary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</div>
                    )}
                  </td>
                  <td style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{cert.name}</td>
                  <td>{cert.issuer}</td>
                  <td>{cert.validUntil ? new Date(cert.validUntil).toLocaleDateString('tr-TR') : '—'}</td>
                  <td><span style={{ color: cert.isActive ? 'var(--color-success)' : 'var(--color-error)' }}>{cert.isActive ? '●' : '○'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleOpenModal(cert)} id={`edit-cert-${cert.id}`}><IconEdit size={14} /></button>
                      <button className="btn btn-sm" style={{ background: 'rgba(248, 113, 113, 0.08)', color: 'var(--color-error)', border: '1px solid rgba(248, 113, 113, 0.15)' }} onClick={() => handleDelete(cert.id, cert.name)} id={`delete-cert-${cert.id}`}><IconTrash size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {certificates.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-4)' }}>Kayıt bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal} id="certificate-modal-overlay">
          <div className="modal" onClick={(e) => e.stopPropagation()} id="certificate-modal">
            <h3>{editId ? 'Sertifika Düzenle' : 'Yeni Sertifika Ekle'}</h3>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="label">Sertifika Adı</label>
                <input required className="input" type="text" placeholder="Örn: ISO 9001:2015" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>

              <div className="form-group">
                <label className="label">Veren Kurum</label>
                <input required className="input" type="text" placeholder="Örn: TSE" value={formData.issuer} onChange={(e) => setFormData({...formData, issuer: e.target.value})} />
              </div>

              <div className="form-group">
                <label className="label">Geçerlilik Tarihi (Opsiyonel)</label>
                <input className="input" type="date" value={formData.validUntil} onChange={(e) => setFormData({...formData, validUntil: e.target.value})} />
              </div>

              <div className="form-group">
                <label className="label">Sertifika Görseli (JPG, PNG, PDF)</label>
                <input className="input" type="file" accept=".pdf,image/jpeg,image/png,image/webp" onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setUploadFile(e.target.files[0]);
                  }
                }} />
                {formData.fileUrl && !uploadFile && (
                  <p style={{ fontSize: '12px', marginTop: '4px', color:'var(--color-primary)' }}>Mevcut dosya: {formData.fileUrl}</p>
                )}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button type="button" className="btn btn-secondary" disabled={isSubmitting} onClick={handleCloseModal}>İptal</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting} id="save-cert-btn">
                  {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
