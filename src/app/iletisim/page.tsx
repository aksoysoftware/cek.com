import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'CEK Çözüm Elektrik Klima ile iletişime geçin. Ankara Çankaya - Telefon: +90 312 481 64 23, E-posta: cozum@cek.com.tr',
};

export default function IletisimPage() {
  return (
    <>
      <Header />
      <main>
        <ContactContent />
      </main>
      <Footer />
    </>
  );
}
