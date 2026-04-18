'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { SessionProvider } from 'next-auth/react';
import { cn } from '@/lib/utils';
import { IconChart, IconBuilding, IconAward, IconMail, IconLogout } from '@/components/ui/Icons';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: <IconChart size={18} /> },
  { href: '/admin/referanslar', label: 'Referanslar', icon: <IconBuilding size={18} /> },
  { href: '/admin/sertifikalar', label: 'Sertifikalar', icon: <IconAward size={18} /> },
  { href: '/admin/mesajlar', label: 'Mesajlar', icon: <IconMail size={18} /> },
];

function AdminGuard({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="skeleton" style={{ width: '200px', height: '20px' }}></div>
      </div>
    );
  }

  if (!session) return null;
  return <>{children}</>;
}

function AdminSidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && <div className="admin-mobile-overlay" onClick={() => setIsOpen(false)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }} />}
      <aside className={`admin-sidebar ${isOpen ? 'mobile-open' : ''}`} id="admin-sidebar">
        <div style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" className="header-logo" style={{ fontSize: 'var(--text-base)' }}>
            <Image src="/images/cozum-logo.svg" alt="Çözüm Elektrik Klima Logo" width={120} height={30} style={{ width: 'auto', height: '26px', objectFit: 'contain', marginRight: '8px' }} priority />
            <span>Admin</span>
          </Link>
          {isOpen && (
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          )}
        </div>

        <nav className="admin-sidebar-nav">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn('admin-sidebar-link', pathname === link.href && 'active')}
              id={`admin-nav-${link.href.split('/').pop()}`}
            >
              <span className="admin-sidebar-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ position: 'absolute', bottom: 'var(--space-6)', left: 'var(--space-6)', right: 'var(--space-6)', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="admin-sidebar-link"
            style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', textAlign: 'left' }}
            id="admin-logout"
          >
            <span className="admin-sidebar-icon"><IconLogout size={18} /></span>
            Çıkış Yap
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <SessionProvider>
      <AdminGuard>
        <div className="admin-layout" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          
          {/* Mobile Header */}
          <div className="admin-mobile-header">
            <Link href="/" className="header-logo" style={{ fontSize: 'var(--text-base)' }}>
                <Image src="/images/cozum-logo.svg" alt="Çözüm Elektrik Klima Logo" width={100} height={26} style={{ width: 'auto', height: '22px', objectFit: 'contain', marginRight: '8px' }} priority />
                <span>Admin</span>
            </Link>
            <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--color-text)', cursor: 'pointer', padding: '4px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
            </button>
          </div>

          <div style={{ display: 'flex', flex: 1 }}>
            <AdminSidebar isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
            <main className="admin-main">{children}</main>
          </div>
        </div>
      </AdminGuard>
    </SessionProvider>
  );
}
