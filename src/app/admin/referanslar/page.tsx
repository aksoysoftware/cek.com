'use client';

import { useState, useEffect, FormEvent } from 'react';
import { slugify } from '@/lib/utils';
import { IconPlus, IconEdit, IconTrash } from '@/components/ui/Icons';

interface ReferenceRow {
  id: string;
  title: string;
  slug: string;
  category: string;
  status: string;
  imageUrl: string | null;
  description: string | null;
  isActive: boolean;
}

const categoryLabels: Record<string, string> = {
  otomasyon: 'Otomasyon',
  satis: 'Satış & Montaj',
  servis: 'Servis & Bakım',
};

const statusLabels: Record<string, string> = {
  biten: 'Tamamlandı',
  devam: 'Devam Ediyor',
};

export default function AdminReferences() {
  const [references, setReferences] = useState<ReferenceRow[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    category: 'otomasyon',
    status: 'biten',
    description: '',
    imageUrl: '',
  });

  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const fetchReferences = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/references');
      const data = await res.json();
      if (Array.isArray(data)) setReferences(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferences();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'otomasyon',
      status: 'biten',
      description: '',
      imageUrl: '',
    });
    setUploadFile(null);
    setEditId(null);
  };

  const handleOpenModal = (ref?: ReferenceRow) => {
    if (ref) {
      setEditId(ref.id);
      setFormData({
        title: ref.title,
        category: ref.category,
        status: ref.status,
        description: ref.description || '',
        imageUrl: ref.imageUrl || '',
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
      let finalImageUrl = formData.imageUrl;

      // Handle file upload if exists
      if (uploadFile) {
        const fileData = new FormData();
        fileData.append('file', uploadFile);
        fileData.append('folder', 'references');
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: fileData,
        });

        if (uploadRes.ok) {
          const { url } = await uploadRes.json();
          finalImageUrl = url;
        } else {
          const err = await uploadRes.json();
          alert('Upload failed: ' + err.error);
          setIsSubmitting(false);
          return;
        }
      }

      const payload = {
        title: formData.title,
        slug: slugify(formData.title),
        category: formData.category,
        status: formData.status,
        description: formData.description,
        imageUrl: finalImageUrl,
      };

      const endpoint = editId ? `/api/references/${editId}` : '/api/references';
      const method = editId ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        handleCloseModal();
        fetchReferences();
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

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`${title} referansını silmek istediğinize emin misiniz?`)) return;
    
    try {
      const res = await fetch(`/api/references/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchReferences();
      } else {
        alert('Silinemedi.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div id="admin-references">
      <h1 className="admin-page-title">Referans Yönetimi</h1>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 style={{ fontSize: 'var(--text-lg)' }}>Referanslar ({references.length})</h3>
          <button className="btn btn-primary btn-sm" onClick={() => handleOpenModal()} id="add-reference-btn">
            <IconPlus size={14} /> Yeni Referans
          </button>
        </div>

        {loading ? (
          <div style={{ padding: '20px', textAlign: 'center' }}>Yükleniyor...</div>
        ) : (
        <div className="admin-table-responsive">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Görsel</th>
                <th>Başlık</th>
                <th>Kategori</th>
                <th>Durum</th>
                <th>Aktif</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {references.map((ref) => (
                <tr key={ref.id}>
                  <td>
                    {ref.imageUrl ? (
                      <img src={ref.imageUrl} alt={ref.title} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: 40, height: 40, background: 'var(--color-bg-secondary)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</div>
                    )}
                  </td>
                  <td style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>{ref.title}</td>
                  <td><span className="badge">{categoryLabels[ref.category]}</span></td>
                  <td>
                    <span style={{ color: ref.status === 'biten' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                      {ref.status === 'biten' ? '●' : '◐'} {statusLabels[ref.status]}
                    </span>
                  </td>
                  <td><span style={{ color: ref.isActive ? 'var(--color-success)' : 'var(--color-error)' }}>{ref.isActive ? '●' : '○'}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button className="btn btn-secondary btn-sm" onClick={() => handleOpenModal(ref)} id={`edit-ref-${ref.id}`}><IconEdit size={14} /></button>
                      <button className="btn btn-sm" style={{ background: 'rgba(248, 113, 113, 0.08)', color: 'var(--color-error)', border: '1px solid rgba(248, 113, 113, 0.15)' }} onClick={() => handleDelete(ref.id, ref.title)} id={`delete-ref-${ref.id}`}><IconTrash size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {references.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-4)' }}>Kayıt bulunamadı.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal} id="reference-modal-overlay">
          <div className="modal" onClick={(e) => e.stopPropagation()} id="reference-modal">
            <h3>{editId ? 'Referans Düzenle' : 'Yeni Referans Ekle'}</h3>

            <form onSubmit={handleSave}>
              <div className="form-group">
                <label className="label">Başlık</label>
                <input required className="input" type="text" placeholder="Proje adı" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="label">Kategori</label>
                  <select className="input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="otomasyon">Otomasyon</option>
                    <option value="satis">Satış & Montaj</option>
                    <option value="servis">Servis & Bakım</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Durum</label>
                  <select className="input" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                    <option value="devam">Devam Ediyor</option>
                    <option value="biten">Tamamlandı</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="label">Açıklama</label>
                <textarea className="input" placeholder="Proje açıklaması..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="form-group">
                <label className="label">Görsel (JPG, PNG. Max 10MB)</label>
                <input className="input" type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setUploadFile(e.target.files[0]);
                  }
                }} />
                {formData.imageUrl && !uploadFile && (
                  <p style={{ fontSize: '12px', marginTop: '4px', color:'var(--color-primary)' }}>Mevcut görsel: {formData.imageUrl}</p>
                )}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
                <button type="button" className="btn btn-secondary" disabled={isSubmitting} onClick={handleCloseModal}>İptal</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting} id="save-reference-btn">
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
