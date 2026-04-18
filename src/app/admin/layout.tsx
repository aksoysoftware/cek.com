'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';
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

function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar" id="admin-sidebar">
      <div style={{ marginBottom: 'var(--space-6)', paddingBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}>
        <Link href="/" className="header-logo" style={{ fontSize: 'var(--text-base)' }}>
          <Image src="/images/cozum-logo.svg" alt="Çözüm Elektrik Klima Logo" width={120} height={30} style={{ width: 'auto', height: '26px', objectFit: 'contain', marginRight: '8px' }} priority />
          <span>Admin</span>
        </Link>
      </div>

      <nav className="admin-sidebar-nav">
        {sidebarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
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
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <AdminGuard>
        <div className="admin-layout">
          <AdminSidebar />
          <main className="admin-main">{children}</main>
        </div>
      </AdminGuard>
    </SessionProvider>
  );
}
