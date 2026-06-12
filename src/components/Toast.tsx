"use client";

/**
 * Show a floating toast notification.
 * Creates a div, appends to body, removes after 1600ms.
 */
export function toast(msg: string) {
  if (typeof document === "undefined") return;

  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  document.body.appendChild(el);

  setTimeout(() => {
    el.remove();
  }, 1600);
}

/**
 * ToastContainer — renders a portal target div for toasts.
 */
export function ToastContainer() {
  return <div id="toast-root" />;
}
