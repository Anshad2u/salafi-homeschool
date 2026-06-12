"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { signOut } from "next-auth/react";
import Topbar from "@/components/Topbar";
import Navbar from "@/components/Navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.dataset.theme = "admin";
    setMounted(true);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  const handleNavigate = (route: string) => {
    router.push("/admin/" + route);
  };

  // Extract active route from pathname
  const activeRoute = pathname.replace("/admin/", "").replace("/admin", "dashboard") || "dashboard";

  if (status === "loading" || !mounted) {
    return (
      <div className="container" style={{ textAlign: "center", paddingTop: 60 }}>
        <p className="muted">Loading...</p>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <>
      <Topbar
        user={{
          name: session.user.name || "Admin",
          avatar: (session.user as any).avatar || "👤",
          role: "admin",
        }}
        onLogout={handleLogout}
      />
      <Navbar role="admin" activeRoute={activeRoute} onNavigate={handleNavigate} />
      <div className="container">{children}</div>
    </>
  );
}
