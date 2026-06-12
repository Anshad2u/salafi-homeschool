"use client";

import { useEffect, useState, useCallback } from "react";
import { toast } from "@/components/Toast";
import { celebrate } from "@/components/Confetti";

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  pin: string;
  age?: number | null;
  grade?: string | null;
}

interface Settings {
  prayerSlots: { name: string; desc: string }[];
  rewards: { streakGoal: number; rewardNote: string };
}

const DEFAULT_PRAYER_SLOTS = [
  { name: "After Fajr", desc: "Morning Quran & adhkar" },
  { name: "Morning", desc: "Core subjects" },
  { name: "After Dhuhr", desc: "Arabic & Islamic studies" },
  { name: "After Asr", desc: "Reading & review" },
  { name: "After Maghrib", desc: "Evening adhkar" },
  { name: "Evening", desc: "Free reading / catch up" },
];

export default function SettingsPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [settings, setSettings] = useState<Settings>({
    prayerSlots: DEFAULT_PRAYER_SLOTS,
    rewards: { streakGoal: 7, rewardNote: "" },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New child form
  const [newName, setNewName] = useState("");
  const [newAvatar, setNewAvatar] = useState("🧒");
  const [newGrade, setNewGrade] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newPin, setNewPin] = useState("0000");

  // Parent PIN edits
  const [parentPins, setParentPins] = useState<Record<string, string>>({});

  const fetchData = useCallback(async () => {
    try {
      const [famRes, settRes] = await Promise.all([
        fetch("/api/family"),
        fetch("/api/settings"),
      ]);
      const famData = await famRes.json();
      const settData = await settRes.json();
      const profiles: Profile[] = famData.profiles ?? famData ?? [];
      setProfiles(profiles);

      // Initialize parent PINs
      const pins: Record<string, string> = {};
      profiles
        .filter((p) => p.role.toUpperCase() !== "STUDENT")
        .forEach((p) => {
          pins[p.id] = p.pin;
        });
      setParentPins(pins);

      // Merge settings
      if (settData.prayerSlots || settData.rewards) {
        setSettings({
          prayerSlots: settData.prayerSlots ?? DEFAULT_PRAYER_SLOTS,
          rewards: settData.rewards ?? { streakGoal: 7, rewardNote: "" },
        });
      }
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Save settings helper
  const saveSettings = async (newSettings: Partial<Settings>) => {
    const merged = { ...settings, ...newSettings };
    setSettings(merged);
    try {
      await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(merged),
      });
    } catch {
      toast("Failed to save settings");
    }
  };

  // Update child profile
  const updateChild = async (
    id: string,
    updates: Partial<Profile>
  ) => {
    setSaving(true);
    try {
      await fetch(`/api/family/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      setProfiles((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
      toast("Updated!");
    } catch {
      toast("Failed to update");
    } finally {
      setSaving(false);
    }
  };

  // Remove child
  const removeChild = async (id: string) => {
    if (!confirm("Remove this child? This cannot be undone.")) return;
    try {
      await fetch(`/api/family/${id}`, { method: "DELETE" });
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      toast("Child removed");
    } catch {
      toast("Failed to remove child");
    }
  };

  // Add child
  const addChild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/family", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName.trim(),
          avatar: newAvatar,
          role: "STUDENT",
          grade: newGrade || null,
          age: newAge ? parseInt(newAge) : null,
          pin: newPin,
        }),
      });
      const data = await res.json();
      if (data.profile || data.id) {
        setProfiles((prev) => [...prev, data.profile ?? data]);
        setNewName("");
        setNewGrade("");
        setNewAge("");
        setNewPin("0000");
        toast("Child added!");
        celebrate();
      }
    } catch {
      toast("Failed to add child");
    } finally {
      setSaving(false);
    }
  };

  // Update parent PIN
  const updateParentPin = async (id: string) => {
    const pin = parentPins[id];
    if (!pin || pin.length !== 4) {
      toast("PIN must be 4 digits");
      return;
    }
    try {
      await fetch(`/api/family/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });
      toast("PIN updated!");
    } catch {
      toast("Failed to update PIN");
    }
  };

  // Add prayer slot
  const addPrayerSlot = () => {
    const newSlots = [...settings.prayerSlots, { name: "New Slot", desc: "" }];
    saveSettings({ prayerSlots: newSlots });
  };

  // Remove prayer slot
  const removePrayerSlot = (index: number) => {
    const newSlots = settings.prayerSlots.filter((_, i) => i !== index);
    saveSettings({ prayerSlots: newSlots });
  };

  // Update prayer slot
  const updatePrayerSlot = (
    index: number,
    field: "name" | "desc",
    value: string
  ) => {
    const newSlots = [...settings.prayerSlots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    saveSettings({ prayerSlots: newSlots });
  };

  // Reset data
  const handleReset = async () => {
    if (
      !confirm(
        "⚠️ This will DELETE ALL DATA and cannot be undone. Are you sure?"
      )
    ) {
      return;
    }
    if (
      !confirm(
        "Final confirmation: Type YES in your mind. Click OK to proceed with deletion."
      )
    ) {
      return;
    }
    try {
      await fetch("/api/reset", { method: "POST" });
      toast("Data reset! Refreshing...");
      setTimeout(() => window.location.reload(), 1000);
    } catch {
      toast("Failed to reset data");
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 40 }}>
        <p className="muted">Loading settings...</p>
      </div>
    );
  }

  const students = profiles.filter(
    (p) => p.role.toUpperCase() === "STUDENT"
  );
  const parents = profiles.filter(
    (p) => p.role.toUpperCase() !== "STUDENT"
  );

  return (
    <>
      <h1 style={{ marginBottom: 14 }}>Settings</h1>

      {/* Children Section */}
      <div className="card">
        <h2>👧 Children</h2>
        {students.length === 0 ? (
          <p className="muted">No children added yet</p>
        ) : (
          students.map((child) => (
            <div
              key={child.id}
              className="row spread"
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #f0f3f7",
                flexWrap: "wrap",
                gap: 8,
              }}
            >
              <div className="row" style={{ gap: 8, flex: 1, minWidth: 200 }}>
                <span style={{ fontSize: "1.5rem" }}>{child.avatar}</span>
                <input
                  type="text"
                  value={child.name}
                  onChange={(e) =>
                    setProfiles((prev) =>
                      prev.map((p) =>
                        p.id === child.id ? { ...p, name: e.target.value } : p
                      )
                    )
                  }
                  onBlur={() => updateChild(child.id, { name: child.name })}
                  style={{ maxWidth: 150, fontWeight: 700 }}
                />
                <input
                  type="text"
                  placeholder="Grade"
                  value={child.grade ?? ""}
                  onChange={(e) =>
                    setProfiles((prev) =>
                      prev.map((p) =>
                        p.id === child.id ? { ...p, grade: e.target.value } : p
                      )
                    )
                  }
                  onBlur={() => updateChild(child.id, { grade: child.grade })}
                  style={{ maxWidth: 80 }}
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={child.age ?? ""}
                  onChange={(e) =>
                    setProfiles((prev) =>
                      prev.map((p) =>
                        p.id === child.id
                          ? { ...p, age: parseInt(e.target.value) || null }
                          : p
                      )
                    )
                  }
                  onBlur={() => updateChild(child.id, { age: child.age })}
                  style={{ maxWidth: 60 }}
                />
              </div>
              <div className="row" style={{ gap: 6 }}>
                <input
                  type="text"
                  placeholder="PIN"
                  value={child.pin}
                  maxLength={4}
                  onChange={(e) =>
                    setProfiles((prev) =>
                      prev.map((p) =>
                        p.id === child.id ? { ...p, pin: e.target.value } : p
                      )
                    )
                  }
                  onBlur={() => updateChild(child.id, { pin: child.pin })}
                  style={{ width: 60, textAlign: "center" }}
                />
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeChild(child.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}

        {/* Add Child Form */}
        <form
          onSubmit={addChild}
          style={{
            marginTop: 14,
            padding: 12,
            background: "#f8fafc",
            borderRadius: 12,
          }}
        >
          <h3 style={{ marginBottom: 8 }}>Add Child</h3>
          <div className="grid grid-2" style={{ marginBottom: 8 }}>
            <input
              type="text"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Avatar emoji"
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
              style={{ maxWidth: 120 }}
            />
          </div>
          <div className="grid grid-2" style={{ marginBottom: 8 }}>
            <input
              type="text"
              placeholder="Grade"
              value={newGrade}
              onChange={(e) => setNewGrade(e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={newAge}
              onChange={(e) => setNewAge(e.target.value)}
            />
          </div>
          <div className="row" style={{ gap: 8 }}>
            <input
              type="text"
              placeholder="PIN (4 digits)"
              value={newPin}
              maxLength={4}
              onChange={(e) => setNewPin(e.target.value)}
              style={{ width: 100 }}
            />
            <button className="btn btn-sm" type="submit" disabled={saving}>
              {saving ? "Adding..." : "+ Add child"}
            </button>
          </div>
        </form>
      </div>

      {/* Parent PINs Section */}
      <div className="card">
        <h2>🔑 Parent PINs</h2>
        {parents.length === 0 ? (
          <p className="muted">No parent profiles found</p>
        ) : (
          parents.map((parent) => (
            <div
              key={parent.id}
              className="row spread"
              style={{
                padding: "10px 0",
                borderBottom: "1px solid #f0f3f7",
              }}
            >
              <div className="row" style={{ gap: 8 }}>
                <span style={{ fontSize: "1.3rem" }}>{parent.avatar}</span>
                <span style={{ fontWeight: 700 }}>{parent.name}</span>
                <span className="muted">({parent.role})</span>
              </div>
              <div className="row" style={{ gap: 6 }}>
                <input
                  type="text"
                  placeholder="PIN"
                  value={parentPins[parent.id] ?? ""}
                  maxLength={4}
                  onChange={(e) =>
                    setParentPins((prev) => ({
                      ...prev,
                      [parent.id]: e.target.value,
                    }))
                  }
                  style={{ width: 70, textAlign: "center" }}
                />
                <button
                  className="btn btn-sm btn-soft"
                  onClick={() => updateParentPin(parent.id)}
                >
                  Save
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Prayer Slots Section */}
      <div className="card">
        <h2>🕐 Prayer Slots</h2>
        {settings.prayerSlots.map((slot, idx) => (
          <div
            key={idx}
            className="row spread"
            style={{
              padding: "8px 0",
              borderBottom: "1px solid #f0f3f7",
              gap: 8,
            }}
          >
            <div className="row" style={{ gap: 6, flex: 1 }}>
              <input
                type="text"
                value={slot.name}
                onChange={(e) => updatePrayerSlot(idx, "name", e.target.value)}
                style={{ fontWeight: 700, maxWidth: 160 }}
              />
              <input
                type="text"
                value={slot.desc}
                placeholder="Description"
                onChange={(e) => updatePrayerSlot(idx, "desc", e.target.value)}
                style={{ flex: 1 }}
              />
            </div>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => removePrayerSlot(idx)}
            >
              ✕
            </button>
          </div>
        ))}
        <button
          className="btn btn-sm btn-soft"
          style={{ marginTop: 10 }}
          onClick={addPrayerSlot}
        >
          + Add slot
        </button>
      </div>

      {/* Rewards Section */}
      <div className="card">
        <h2>🎁 Rewards</h2>
        <div className="grid grid-2" style={{ gap: 10 }}>
          <div>
            <label
              className="muted"
              style={{ fontSize: "0.78rem", display: "block", marginBottom: 4 }}
            >
              Streak goal (days)
            </label>
            <input
              type="number"
              min={1}
              max={30}
              value={settings.rewards.streakGoal}
              onChange={(e) =>
                saveSettings({
                  rewards: {
                    ...settings.rewards,
                    streakGoal: parseInt(e.target.value) || 7,
                  },
                })
              }
            />
          </div>
          <div>
            <label
              className="muted"
              style={{ fontSize: "0.78rem", display: "block", marginBottom: 4 }}
            >
              Reward note
            </label>
            <input
              type="text"
              placeholder="e.g. Special outing!"
              value={settings.rewards.rewardNote}
              onChange={(e) =>
                saveSettings({
                  rewards: {
                    ...settings.rewards,
                    rewardNote: e.target.value,
                  },
                })
              }
            />
          </div>
        </div>
      </div>

      {/* Data Section */}
      <div className="card" style={{ border: "1.5px solid #fecaca" }}>
        <h2>⚠️ Danger Zone</h2>
        <p className="muted" style={{ marginBottom: 10 }}>
          Reset all data — tasks, Quran progress, skills, books, and profiles
          will be permanently deleted.
        </p>
        <button className="btn btn-danger" onClick={handleReset}>
          🗑️ Reset all data
        </button>
      </div>
    </>
  );
}
