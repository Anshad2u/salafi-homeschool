"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import PinPad from "@/components/PinPad";

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  pin?: string;
}

const ROLE_ROUTES: Record<string, string> = {
  ADMIN: "/admin/dashboard",
  TEACHER: "/teacher/today",
  STUDENT: "/student/myday",
};

export default function LoginPage() {
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [pinError, setPinError] = useState(false);
  // key forces PinPad to remount (and thus reset) on error
  const [padKey, setPadKey] = useState(0);

  useEffect(() => {
    document.body.dataset.theme = "login";
  }, []);

  useEffect(() => {
    fetch("/api/profiles")
      .then((r) => r.json())
      .then((data) => {
        setProfiles(data.profiles ?? data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handlePinSelect = useCallback(
    async (user: Profile & { pin: string }) => {
      setPinError(false);
      try {
        const result = await signIn("credentials", {
          profileId: user.id,
          pin: user.pin,
          redirect: false,
        });

        if (result?.ok) {
          const role = user.role.toUpperCase();
          router.push(ROLE_ROUTES[role] || "/login");
        } else {
          setPinError(true);
          // Force PinPad to remount so it resets and re-shows with shake
          setPadKey((k) => k + 1);
        }
      } catch {
        setPinError(true);
        setPadKey((k) => k + 1);
      }
    },
    [router]
  );

  const handleCancel = useCallback(() => {
    setSelectedUser(null);
    setPinError(false);
    setPadKey(0);
  }, []);

  if (loading) {
    return (
      <div className="login-wrap">
        <div className="login-hero">
          <div className="login-logo">🕌</div>
          <h1>Salafi Homeschool</h1>
          <p className="muted">Bismillah — Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-wrap">
      <div className="login-hero">
        <div className="login-logo">🕌</div>
        <h1>Salafi Homeschool</h1>
        <p className="muted">Bismillah — Choose your profile</p>
      </div>

      <div className="user-grid">
        {profiles.map((p) => (
          <button
            key={p.id}
            className={`user-card role-${p.role.toLowerCase()}`}
            onClick={() => {
              setSelectedUser(p);
              setPinError(false);
              setPadKey(0);
            }}
          >
            <div className="user-avatar">{p.avatar}</div>
            <div className="user-name">{p.name}</div>
            <div className="user-role">{p.role}</div>
          </button>
        ))}
      </div>

      {profiles.length === 0 && !loading && (
        <div className="card" style={{ textAlign: "center", marginTop: 20 }}>
          <p className="muted">No profiles found. Please set up your family first.</p>
        </div>
      )}

      {selectedUser && (
        <PinPad
          key={padKey}
          user={selectedUser}
          onSelect={handlePinSelect}
          onCancel={handleCancel}
        />
      )}

      {pinError && (
        <div
          style={{
            position: "fixed",
            bottom: 80,
            left: "50%",
            transform: "translateX(-50%)",
            background: "var(--bad)",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: "0.85rem",
            zIndex: 60,
          }}
        >
          Incorrect PIN — try again
        </div>
      )}
    </div>
  );
}
