import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ReferencesContent from './ReferencesContent';

export const metadata: Metadata = {
  title: 'Referanslar',
  description:
    'CEK Çözüm Elektrik Klima referansları - Otomasyon, satış, montaj ve servis projelerimiz.',
};

export default function ReferanslarPage() {
  return (
    <>
      <Header />
      <main>
        <ReferencesContent />
      </main>
      <Footer />
    </>
  );
}
