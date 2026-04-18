import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CertificatesContent from './CertificatesContent';

export const metadata: Metadata = {
  title: 'Sertifikalar',
  description:
    'CEK Çözüm Elektrik Klima sertifikaları - Kalite ve güvenilirliğimizi belgeleyen sertifikalarımız.',
};

export default function SertifikalarPage() {
  return (
    <>
      <Header />
      <main>
        <CertificatesContent />
      </main>
      <Footer />
    </>
  );
}
