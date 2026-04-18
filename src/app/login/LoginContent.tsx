'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function LoginContent() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result?.error) {
        setError('E-posta veya şifre hatalı.');
        setLoading(false);
      } else {
        router.push('/admin');
      }
    } catch {
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card" id="login-card">
        <Image src="/images/cozum-logo.svg" alt="Çözüm Elektrik Klima Logo" width={250} height={80} style={{ width: 'auto', height: '68px', margin: '0 auto var(--space-6)', display: 'block', objectFit: 'contain' }} priority />
        <h1>Admin Paneli</h1>
        <p className="subtitle">Yönetim paneline giriş yapın</p>
        <form onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="label" htmlFor="login-email">E-posta</label>
            <input className="input" type="email" id="login-email" placeholder="admin@cek.com.tr" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="login-password">Şifre</label>
            <input className="input" type="password" id="login-password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {error && <div className="toast toast-error" style={{ marginBottom: 'var(--space-4)' }}>{error}</div>}
          <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading} id="login-submit">
            {loading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}
