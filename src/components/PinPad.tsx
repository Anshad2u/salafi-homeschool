"use client";

import { useState, useCallback } from "react";

interface PinPadProps {
  user: { id: string; name: string; avatar: string; role: string };
  onSelect: (user: any) => void;
  onCancel: () => void;
}

const PIN_KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "✕"];

export default function PinPad({ user, onSelect, onCancel }: PinPadProps) {
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);

  const triggerShake = useCallback(() => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  }, []);

  const handleKey = useCallback(
    (key: string) => {
      if (key === "✕") {
        onCancel();
        return;
      }
      if (key === "⌫") {
        setPin((prev) => prev.slice(0, -1));
        return;
      }
      if (pin.length >= 4) return;

      const next = pin + key;
      setPin(next);

      if (next.length === 4) {
        onSelect({ ...user, pin: next });
      }
    },
    [pin, user, onSelect, onCancel]
  );

  return (
    <div className="pin-overlay">
      <div className={`pin-box${shake ? " shake" : ""}`}>
        <div style={{ fontSize: "2.4rem" }}>{user.avatar}</div>
        <h3 style={{ marginTop: 8 }}>{user.name}</h3>
        <p className="muted">Enter your 4-digit PIN</p>

        <div className="pin-dots">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className={`pin-dot${i < pin.length ? " on" : ""}`} />
          ))}
        </div>

        <div className="pinpad">
          {PIN_KEYS.map((key) => (
            <button
              key={key}
              className="pin-key"
              onClick={() => handleKey(key)}
            >
              {key}
            </button>
          ))}
        </div>

        <button
          className="btn btn-soft btn-sm"
          style={{ marginTop: 14 }}
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

/** Expose triggerShake so parent can invoke it on wrong PIN */
PinPad.triggerShake = null;
