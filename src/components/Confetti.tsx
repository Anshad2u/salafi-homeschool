"use client";

const COLORS = ["#f59e0b", "#22c55e", "#3b82f6", "#ec4899", "#8b5cf6", "#ef4444"];

/**
 * Spawn 26 confetti pieces across the viewport.
 * Each is removed after 1900ms.
 */
export function celebrate() {
  if (typeof document === "undefined") return;

  for (let i = 0; i < 26; i++) {
    const el = document.createElement("div");
    el.className = "confetti";

    const left = Math.random() * 100;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    const delay = Math.random() * 0.6;
    const size = 6 + Math.random() * 8;

    el.style.left = `${left}vw`;
    el.style.width = `${size}px`;
    el.style.height = `${size * 1.5}px`;
    el.style.background = color;
    el.style.animationDelay = `${delay}s`;
    el.style.animationDuration = `${1.2 + Math.random() * 0.8}s`;

    document.body.appendChild(el);

    setTimeout(() => {
      el.remove();
    }, 1900);
  }
}
