"use client";

import { useRouter } from "next/navigation";

interface TopbarProps {
  user: { name: string; avatar: string; role: string };
  onLogout: () => void;
}

export default function Topbar({ user, onLogout }: TopbarProps) {
  const router = useRouter();

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <div className="brand" onClick={() => router.push("/")} role="button" tabIndex={0}>
          🕌 Salafi Homeschool
        </div>
        <div className="userbox">
          <span className="avatar">{user.avatar}</span>
          <span className="uname">{user.name}</span>
          <button className="btn btn-ghost btn-sm" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
