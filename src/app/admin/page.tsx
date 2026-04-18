'use client';

import { useState, useEffect } from 'react';
import { IconBuilding, IconAward, IconMail, IconBolt } from '@/components/ui/Icons';
import React from 'react';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ refs: 0, certs: 0, msgs: 0 });

  useEffect(() => {
    Promise.all([
      fetch('/api/references').then(r => r.json()).catch(() => []),
      fetch('/api/certificates').then(r => r.json()).catch(() => []),
      fetch('/api/messages').then(r => r.json()).catch(() => []),
    ]).then(([refs, certs, msgs]) => {
      setCounts({
        refs: Array.isArray(refs) ? refs.length : 0,
        certs: Array.isArray(certs) ? certs.length : 0,
        msgs: Array.isArray(msgs) ? msgs.filter((m: any) => !m.isRead).length : 0,
      });
    });
  }, []);

  const stats = [
    { label: 'Toplam Referans', value: String(counts.refs), icon: <IconBuilding size={22} /> },
    { label: 'Sertifika', value: String(counts.certs), icon: <IconAward size={22} /> },
    { label: 'Okunmamış Mesaj', value: String(counts.msgs), icon: <IconMail size={22} /> },
    { label: 'Aktif Proje', value: '—', icon: <IconBolt size={22} /> },
  ];

  return (
    <div id="admin-dashboard">
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <div key={stat.label} className="admin-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
              <span style={{ color: 'var(--color-primary)', display: 'flex' }}>{stat.icon}</span>
              <span className="admin-stat-label">{stat.label}</span>
            </div>
            <div className="admin-stat-value">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="admin-table-container">
        <div className="admin-table-header">
          <h3 style={{ fontSize: 'var(--text-lg)' }}>Genel Bilgiler</h3>
        </div>
        <div style={{ padding: 'var(--space-6)', color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
          <p>Referans ve sertifikaları sol menüdan yönetebilirsiniz. Yeni kayıtlar ekleyerek web sitenizin içeriğini güncelleyin.</p>
        </div>
      </div>
    </div>
  );
}
