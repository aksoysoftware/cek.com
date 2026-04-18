import type { Metadata } from 'next';
import ThemeProvider from '@/components/ui/ThemeProvider';
import AmbientBackground from '@/components/ui/AmbientBackground';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://cek.com.tr'),
  title: {
    default: 'ÇEK - Çözüm Elektrik Klima | İklimlendirme ve Otomasyon',
    template: '%s | ÇEK - Çözüm Elektrik Klima',
  },
  description:
    'Çözüm Elektrik Klima - 1990\'dan bu yana ısıtma, soğutma, klima, havalandırma ve otomasyon alanlarında profesyonel çözümler. Ankara.',
  keywords: ['iklimlendirme', 'otomasyon', 'klima', 'havalandırma', 'ankara', 'çözüm elektrik'],
  openGraph: {
    title: 'ÇEK - Çözüm Elektrik Klima',
    description: 'İklimlendirme ve otomasyon çözüm ortağınız. 35+ yıl deneyim.',
    type: 'website',
    locale: 'tr_TR',
    siteName: 'ÇEK',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 547,
        alt: 'Çözüm Elektrik Klima Logo',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/cozum-favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <ThemeProvider>
          <AmbientBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
