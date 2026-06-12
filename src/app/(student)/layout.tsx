'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import Topbar from '@/components/Topbar';
import Navbar from '@/components/Navbar';
import { signOut } from 'next-auth/react';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Extract active route from pathname: /student/X → X
  const activeRoute = pathname.replace(/^\/student\//, '').split('/')[0] || 'myday';

  useEffect(() => {
    document.body.setAttribute('data-theme', 'student');
  }, []);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  if (!session?.user) return null;

  const handleNavigate = (route: string) => {
    router.push('/student/' + route);
  };

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <>
      <Topbar
        user={{
          name: session.user.name,
          avatar: session.user.avatar,
          role: session.user.role,
        }}
        onLogout={handleLogout}
      />
      <Navbar
        role="student"
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
      />
      <div className="container">
        {children}
      </div>
    </>
  );
}
