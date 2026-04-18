import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { IconHome } from '@/components/ui/Icons';

export default function NotFound() {
  return (
    <>
      <Header />
      <main>
        <div className="not-found-page">
          <div className="not-found-code">404</div>
          <h2 style={{ marginBottom: 'var(--space-4)' }}>Sayfa Bulunamadı</h2>
          <p className="not-found-text">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
          <Link href="/" className="btn btn-primary btn-lg" id="not-found-home">
            <IconHome size={18} /> Ana Sayfaya Dön
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
