"use client";

import { useEffect, useState, useMemo } from "react";
import StatCard from "@/components/StatCard";
import AlertBox from "@/components/AlertBox";
import WeekChart from "@/components/WeekChart";
import ProgressBar from "@/components/ProgressBar";
import { todayStr, dateOffset, fmtDate, completionPercent } from "@/lib/utils";
import { subj, SURAHS } from "@/lib/curriculum";

interface Task {
  id: string;
  title: string;
  subject: string;
  slot?: string;
  status: string;
  score?: number | null;
  notes?: string;
  profileId: string;
  date: string;
}

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  age?: number | null;
  grade?: string | null;
}

export default function AdminDashboard() {
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [children, setChildren] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch family profiles
        const famRes = await fetch("/api/family");
        const famData = await famRes.json();
        const profiles: Profile[] = Array.isArray(famData.profiles)
          ? famData.profiles
          : Array.isArray(famData)
            ? famData
            : [];
        const childProfiles = profiles.filter(
          (p) => p.role.toUpperCase() === "STUDENT"
        );
        setChildren(childProfiles);

        // Fetch tasks for last 7 days
        const allTasks: Record<string, Task[]> = {};
        const fetches: Promise<void>[] = [];
        for (let i = -6; i <= 0; i++) {
          const date = dateOffset(i);
          fetches.push(
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
          );
        }
        await Promise.all(fetches);
        setTasks(allTasks);
      } catch {
        // Handle error silently
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const today = todayStr(0);
  const todayTasks = tasks[today] ?? [];

  // Compute stats
  const totalTasksToday = todayTasks.length;
  const completedToday = todayTasks.filter((t) => t.status === "DONE").length;
  const completionPct = completionPercent(todayTasks);

  // Total surahs memorized across all children
  const totalSurahs = useMemo(() => {
    // This would come from /api/quran, but we approximate from task data
    // For now, count unique quran tasks marked done
    let count = 0;
    Object.values(tasks).forEach((dayTasks) => {
      dayTasks.forEach((t) => {
        if (t.subject === "quran" && t.status === "DONE") count++;
      });
    });
    return count;
  }, [tasks]);

  // Best streak across all children
  const bestStreak = useMemo(() => {
    let maxStreak = 0;
    children.forEach((child) => {
      let s = 0;
      for (let i = 0; i <= 30; i++) {
        const date = dateOffset(-i);
        const dayTasks = (tasks[date] ?? []).filter(
          (t) => t.profileId === child.id
        );
        if (dayTasks.length === 0 && i > 0) break;
        if (completionPercent(dayTasks) === 100) {
          s++;
        } else if (i > 0) {
          break;
        }
      }
      if (s > maxStreak) maxStreak = s;
    });
    return maxStreak;
  }, [tasks, children]);

  // Alerts
  const alerts: string[] = [];
  children.forEach((child) => {
    const childToday = todayTasks.filter((t) => t.profileId === child.id);
    if (childToday.length > 0 && (completionPercent(childToday) ?? 0) < 50) {
      alerts.push(
        `${child.name} is falling behind — only ${completionPercent(childToday)}% complete today`
      );
    }
  });

  // Week chart data
  const getCompletionForDate = (date: string): number | null => {
    const dayTasks = tasks[date] ?? [];
    return completionPercent(dayTasks);
  };

  // Recent activity (last 8 completed tasks)
  const recentActivity = useMemo(() => {
    const completed: Task[] = [];
    const dates = Object.keys(tasks).sort().reverse();
    dates.forEach((date) => {
      tasks[date].forEach((t) => {
        if (t.status === "DONE") completed.push(t);
      });
    });
    return completed.slice(0, 8);
  }, [tasks]);

  // Per-child stats
  const childStats = useMemo(() => {
    return children.map((child) => {
      const childTasks = todayTasks.filter((t) => t.profileId === child.id);
      const childCompleted = childTasks.filter((t) => t.status === "DONE").length;
      const childPct = completionPercent(childTasks);

      // Streak for this child
      let s = 0;
      for (let i = 0; i <= 30; i++) {
        const date = dateOffset(-i);
        const dayTasks = (tasks[date] ?? []).filter(
          (t) => t.profileId === child.id
        );
        if (dayTasks.length === 0 && i > 0) break;
        if (completionPercent(dayTasks) === 100) {
          s++;
        } else if (i > 0) {
          break;
        }
      }

      return {
        ...child,
        totalTasks: childTasks.length,
        completed: childCompleted,
        pct: childPct,
        streak: s,
      };
    });
  }, [children, todayTasks, tasks]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 40 }}>
        <p className="muted">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <div className="spread" style={{ marginBottom: 14 }}>
        <h1>Family Dashboard</h1>
        <span className="muted">{fmtDate(today)}</span>
      </div>

      <div className="grid grid-stats" style={{ marginBottom: 14 }}>
        <StatCard value={totalTasksToday} label="Tasks today" />
        <StatCard
          value={completionPct !== null ? `${completionPct}%` : "—"}
          label="Completed"
        />
        <StatCard value={totalSurahs} label="Surahs covered" />
        <StatCard value={bestStreak} label="Best streak" />
      </div>

      {alerts.length > 0 && <AlertBox messages={alerts} />}

      <div className="card">
        <h2>7-Day Completion</h2>
        <WeekChart getData={getCompletionForDate} />
      </div>

      {childStats.length > 0 && (
        <div className="grid grid-2" style={{ marginTop: 14 }}>
          {childStats.map((child) => (
            <div className="card" key={child.id}>
              <div className="row" style={{ marginBottom: 10 }}>
                <span style={{ fontSize: "1.8rem" }}>{child.avatar}</span>
                <div>
                  <div style={{ fontWeight: 800 }}>{child.name}</div>
                  <div className="muted">
                    {child.grade || "No grade"} · Streak: {child.streak}🔥
                  </div>
                </div>
              </div>
              <div className="row spread" style={{ marginBottom: 6 }}>
                <span className="muted">
                  {child.completed}/{child.totalTasks} tasks
                </span>
                <span className="muted">
                  {child.pct !== null ? `${child.pct}%` : "No tasks"}
                </span>
              </div>
              <ProgressBar percent={child.pct} />
            </div>
          ))}
        </div>
      )}

      {recentActivity.length > 0 && (
        <div className="card" style={{ marginTop: 14 }}>
          <h2>Recent Activity</h2>
          {recentActivity.map((t) => {
            const s = subj(t.subject);
            return (
              <div className="task" key={t.id}>
                <span className="t-ico">{s.icon}</span>
                <div className="t-main">
                  <div className="t-title">{t.title}</div>
                  <div className="t-sub">
                    {s.name} · {fmtDate(t.date)}
                  </div>
                </div>
                <span className="tag tag-done">done</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
