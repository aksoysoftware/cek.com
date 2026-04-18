import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import KurumsalContent from './KurumsalContent';

export const metadata: Metadata = {
  title: 'Kurumsal',
  description:
    'Çözüm Elektrik Klima hakkında - 1990\'dan bu yana iklimlendirme ve otomasyon sektöründe güvenilir çözüm ortağınız. Tarihçe, misyon, vizyon ve kalite politikamız.',
};

export default function KurumsalPage() {
  return (
    <>
      <Header />
      <main>
        <KurumsalContent />
      </main>
      <Footer />
    </>
  );
}
