"use client";

const NAV_ITEMS: Record<string, [string, string, string][]> = {
  admin: [
    ["dashboard", "📊", "Dashboard"],
    ["planning", "🗓️", "Planning"],
    ["reports", "📑", "Reports"],
    ["settings", "⚙️", "Settings"],
  ],
  teacher: [
    ["today", "☀️", "Today"],
    ["quran", "📖", "Quran"],
    ["skills", "🎯", "Skills"],
    ["reading", "📚", "Reading"],
  ],
  student: [
    ["myday", "☀️", "My Day"],
    ["stars", "⭐", "My Stars"],
  ],
};

interface NavbarProps {
  role: string;
  activeRoute: string;
  onNavigate: (route: string) => void;
}

export default function Navbar({ role, activeRoute, onNavigate }: NavbarProps) {
  const items = NAV_ITEMS[role] ?? NAV_ITEMS.student;

  return (
    <nav className="navbar">
      {items.map(([route, icon, label]) => (
        <button
          key={route}
          className={`nav-btn${activeRoute === route ? " active" : ""}`}
          onClick={() => onNavigate(route)}
        >
          <span className="nav-ico">{icon}</span>
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}
