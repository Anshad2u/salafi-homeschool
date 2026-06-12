// ── Client-side auth context ─────────────────────────────────────
// Wraps next-auth SessionProvider for use in client components

"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { type ReactNode } from "react";

/**
 * AuthProvider wraps children with NextAuth's SessionProvider.
 * Place this in your root layout to make session data available
 * to all client components.
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

/**
 * useAuth() — convenience hook returning session data.
 *
 * Usage:
 *   const { data: session, status } = useAuth();
 *   if (session?.user.role === "ADMIN") { ... }
 */
export function useAuth() {
  return useSession();
}
