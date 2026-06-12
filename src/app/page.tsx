import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// Role-based default pages
const ROLE_ROUTES: Record<string, string> = {
  admin: '/admin/dashboard',
  teacher: '/teacher/today',
  student: '/student/myday',
};

export default function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get('session-token')?.value;

  if (!token) {
    redirect('/login');
  }

  try {
    const parts = token.split('.');
    if (parts.length === 3) {
      const payload = JSON.parse(
        Buffer.from(parts[1], 'base64url').toString('utf-8')
      );
      const role = payload.role || payload.user?.role;
      if (role && ROLE_ROUTES[role]) {
        redirect(ROLE_ROUTES[role]);
      }
    }
    // Invalid token → redirect to login
    redirect('/login');
  } catch {
    redirect('/login');
  }
}
