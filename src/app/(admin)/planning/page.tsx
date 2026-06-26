"use client";

import { useEffect, useState, useCallback } from "react";
import TaskRow from "@/components/TaskRow";
import { toast } from "@/components/Toast";
import { todayStr, dateOffset, fmtDate } from "@/lib/utils";
import { SUBJECTS, STD_DAY } from "@/lib/curriculum";

interface Task {
  id: string;
  title: string;
  subject: string;
  slot?: string;
  status: string;
  profileId: string;
  date: string;
  score?: number | null;
  notes?: string;
}

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

export default function PlanningPage() {
  const [children, setChildren] = useState<Profile[]>([]);
  const [tasksByDay, setTasksByDay] = useState<Record<string, Task[]>>({});
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any>(null);

  // Form state
  const [formChild, setFormChild] = useState("all");
  const [formDate, setFormDate] = useState(todayStr(0));
  const [formSubject, setFormSubject] = useState("quran");
  const [formSlot, setFormSlot] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formNotes, setFormNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Build 7-day range
  const days: string[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(dateOffset(i));
  }

  const fetchData = useCallback(async () => {
    try {
      const [famRes, settRes] = await Promise.all([
        fetch("/api/family"),
        fetch("/api/settings"),
      ]);
      const famData = await famRes.json();
      const settData = await settRes.json();
      const profiles: Profile[] = Array.isArray(famData.profiles)
        ? famData.profiles
        : Array.isArray(famData)
          ? famData
          : [];
      setChildren(profiles.filter((p) => p.role.toUpperCase() === "STUDENT"));
      setSettings(settData);

      // Fetch tasks for all 7 days
      const allTasks: Record<string, Task[]> = {};
      await Promise.all(
        days.map((date) =>
          fetch(`/api/tasks?date=${date}`)
            .then((r) => r.json())
            .then((data) => {
              allTasks[date] = Array.isArray(data)
                ? data
                : Array.isArray(data.tasks)
                  ? data.tasks
                  : [];
            })
            .catch(() => {
              allTasks[date] = [];
            })
        )
      );
      setTasksByDay(allTasks);
    } catch {
      // Handle error silently
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const prayerSlots = settings?.prayerSlots ?? [
    { name: "After Fajr", desc: "Morning Quran & adhkar" },
    { name: "Morning", desc: "Core subjects" },
    { name: "After Dhuhr", desc: "Arabic & Islamic studies" },
    { name: "After Asr", desc: "Reading & review" },
    { name: "After Maghrib", desc: "Evening adhkar" },
    { name: "Evening", desc: "Free reading / catch up" },
  ];

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;
    setSubmitting(true);

    try {
      const targetChildren =
        formChild === "all"
          ? children
          : children.filter((c) => c.id === formChild);

      for (const child of targetChildren) {
        await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            profileId: child.id,
            subject: formSubject,
            title: formTitle.trim(),
            slot: formSlot,
            date: formDate,
            notes: formNotes,
          }),
        });
      }

      toast("Task planned!");
      setFormTitle("");
      setFormNotes("");
      fetchData();
    } catch {
      toast("Failed to plan task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStandardDay = async () => {
    setSubmitting(true);
    try {
      for (const child of children) {
        for (const [subject, title, slot] of STD_DAY) {
          await fetch("/api/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              profileId: child.id,
              subject,
              title,
              slot,
              date: formDate,
            }),
          });
        }
      }
      toast("Standard day planned!");
      fetchData();
    } catch {
      toast("Failed to plan standard day");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}`, { method: "DELETE" });
      toast("Task deleted");
      fetchData();
    } catch {
      toast("Failed to delete task");
    }
  };

  const handleStatusChange = async (taskId: string, change: string) => {
    if (change.startsWith("notes:")) {
      const notes = change.slice(6);
      await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notes }),
      });
    } else if (change === "taught" || change === "done" || change === "planned") {
      await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: change.toUpperCase() }),
      });
    }
    fetchData();
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 40 }}>
        <p className="muted">Loading planner...</p>
      </div>
    );
  }

  return (
    <>
      <h1 style={{ marginBottom: 14 }}>Planning</h1>

      {/* Add Task Form */}
      <div className="card">
        <h2>Plan a Task</h2>
        <form onSubmit={handleAddTask}>
          <div className="grid grid-2" style={{ marginBottom: 10 }}>
            <div>
              <label className="muted" style={{ fontSize: "0.78rem", display: "block", marginBottom: 4 }}>
                Child
              </label>
              <select
                value={formChild}
                onChange={(e) => setFormChild(e.target.value)}
              >
                <option value="all">All children</option>
                {children.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.avatar} {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="muted" style={{ fontSize: "0.78rem", display: "block", marginBottom: 4 }}>
                Date
              </label>
              <input
                type="date"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-2" style={{ marginBottom: 10 }}>
            <div>
              <label className="muted" style={{ fontSize: "0.78rem", display: "block", marginBottom: 4 }}>
                Subject
              </label>
              <select
                value={formSubject}
                onChange={(e) => setFormSubject(e.target.value)}
              >
                {SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.icon} {s.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="muted" style={{ fontSize: "0.78rem", display: "block", marginBottom: 4 }}>
                Prayer Slot
              </label>
              <select
                value={formSlot}
                onChange={(e) => setFormSlot(e.target.value)}
              >
                <option value="">No slot</option>
                {prayerSlots.map((s: { name: string; desc: string }) => (
                  <option key={s.name} value={s.name}>
                    {s.name} — {s.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label className="muted" style={{ fontSize: "0.78rem", display: "block", marginBottom: 4 }}>
              Task Title
            </label>
            <input
              type="text"
              placeholder="e.g. Memorize Surah Al-Fatihah"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              required
            />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label className="muted" style={{ fontSize: "0.78rem", display: "block", marginBottom: 4 }}>
              Notes (optional)
            </label>
            <input
              type="text"
              placeholder="Any extra notes..."
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
            />
          </div>
          <div className="row" style={{ gap: 8 }}>
            <button
              className="btn"
              type="submit"
              disabled={submitting}
            >
              {submitting ? "Planning..." : "Plan task"}
            </button>
            <button
              className="btn btn-soft"
              type="button"
              disabled={submitting}
              onClick={handleStandardDay}
            >
              📋 Standard day
            </button>
          </div>
        </form>
      </div>

      {/* 7-Day Board */}
      <h2 style={{ marginTop: 20, marginBottom: 10 }}>7-Day Board</h2>
      {days.map((date) => {
        const dayTasks = tasksByDay[date] ?? [];
        return (
          <div className="card" key={date}>
            <div className="spread" style={{ marginBottom: 8 }}>
              <h3 style={{ margin: 0 }}>
                {date === todayStr(0) ? "📍 Today" : fmtDate(date)}
              </h3>
              <span className="muted">{dayTasks.length} tasks</span>
            </div>
            {dayTasks.length === 0 ? (
              <p className="muted">No tasks planned</p>
            ) : (
              dayTasks.map((task) => (
                <TaskRow
                  key={task.id}
                  task={task}
                  showActions={true}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>
        );
      })}
    </>
  );
}
