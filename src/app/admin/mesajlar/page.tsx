'use client';

import { useState, useEffect } from 'react';
import { IconMail, IconEye, IconCheck, IconTrash } from '@/components/ui/Icons';

interface MessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessages() {
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<MessageRow | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleRead = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, isRead: !currentStatus }),
      });
      if (res.ok) {
        setMessages(messages.map((m) =>
          m.id === id ? { ...m, isRead: !currentStatus } : m
        ));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages(messages.filter((m) => m.id !== id));
        if (selectedMessage?.id === id) setSelectedMessage(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div id="admin-messages">
      <h1 className="admin-page-title">
        Mesajlar <span className="badge" style={{ marginLeft: 'var(--space-3)' }}>{unreadCount} okunmamış</span>
      </h1>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 style={{ fontSize: 'var(--text-lg)' }}>İletişim Mesajları ({messages.length})</h3>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th></th>
              <th>Gönderen</th>
              <th>Konu</th>
              <th>Tarih</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-4)' }}>Yükleniyor...</td></tr>
            ) : messages.length === 0 ? (
              <tr><td colSpan={5} style={{ textAlign: 'center', padding: 'var(--space-4)' }}>Hiç mesaj yok.</td></tr>
            ) : messages.map((msg) => (
              <tr key={msg.id} style={{ fontWeight: msg.isRead ? 400 : 600 }}>
                <td>
                  <span style={{ color: msg.isRead ? 'var(--color-text-muted)' : 'var(--color-primary)', display: 'flex' }}>
                    <IconMail size={16} />
                  </span>
                </td>
                <td style={{ color: 'var(--color-text-primary)' }}>
                  {msg.name}
                  <br />
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', fontWeight: 400 }}>{msg.email}</span>
                </td>
                <td>{msg.subject}</td>
                <td style={{ fontWeight: 400 }}>{new Date(msg.createdAt).toLocaleDateString('tr-TR')}</td>
                <td>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedMessage(msg); if (!msg.isRead) toggleRead(msg.id, false); }}><IconEye size={14} /></button>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: msg.isRead ? 'var(--color-primary-subtle)' : 'rgba(52, 211, 153, 0.08)',
                        color: msg.isRead ? 'var(--color-primary)' : 'var(--color-success)',
                        border: '1px solid transparent',
                      }}
                      onClick={() => toggleRead(msg.id, msg.isRead)}
                      title={msg.isRead ? "Okunmadı İşaretle" : "Okundu İşaretle"}
                    >
                      <IconCheck size={14} />
                    </button>
                    <button className="btn btn-sm" style={{ background: 'rgba(248, 113, 113, 0.08)', color: 'var(--color-error)' }} onClick={() => handleDelete(msg.id)}>
                      Sil
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedMessage && (
        <div className="modal-overlay" onClick={() => setSelectedMessage(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedMessage.subject}</h3>
            <div style={{ marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
              <strong>Gönderen:</strong> {selectedMessage.name} ({selectedMessage.email})<br />
              <strong>Tarih:</strong> {new Date(selectedMessage.createdAt).toLocaleString('tr-TR')}
            </div>
            <p style={{ background: 'var(--color-bg-primary)', padding: 'var(--space-4)', borderRadius: 'var(--radius-md)', lineHeight: 1.8 }}>
              {selectedMessage.message}
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
              <a href={`mailto:${selectedMessage.email}`} className="btn btn-primary btn-sm"><IconMail size={14} /> Yanıtla</a>
              <button className="btn btn-secondary btn-sm" onClick={() => setSelectedMessage(null)}>Kapat</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
