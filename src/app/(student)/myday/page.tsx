'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { todayStr, completionPercent } from '@/lib/utils';
import { subj } from '@/lib/curriculum';
import ProgressBar from '@/components/ProgressBar';
import { toast } from '@/components/Toast';
import { celebrate } from '@/components/Confetti';

interface Task {
  id: string;
  title: string;
  subject: string;
  slot: string;
  status: string;
  score: number | null;
  notes: string;
}

const PRAISES = [
  "Masha'Allah! 🌟",
  "Allahumma barik! 💚",
  "Amazing work! 🎉",
  "You did it! 🚀",
  "Superstar! ⭐",
  "Barakallahu feek! 🌙",
];

export default function MyDayPage() {
  const { data: session } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [streakCount, setStreakCount] = useState(0);

  const fetchTasks = useCallback(async () => {
    if (!session?.user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/tasks?date=${todayStr(0)}&profileId=${session.user.id}`);
      if (res.ok) {
        const data = await res.json();
        setTasks(data);
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
    setLoading(false);
  }, [session?.user]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Simple streak calculation (check today + yesterday)
  useEffect(() => {
    if (!session?.user) return;
    const calculateStreak = async () => {
      let streak = 0;
      const today = todayStr(0);
      try {
        const res = await fetch(`/api/tasks?date=${today}&profileId=${session.user.id}`);
        if (res.ok) {
          const todayTasks = await res.json();
          if (todayTasks.length > 0 && todayTasks.every((t: Task) => t.status === 'DONE')) {
            streak = 1;
            // Check yesterday
            const yesterday = todayStr(-1);
            const res2 = await fetch(`/api/tasks?date=${yesterday}&profileId=${session.user.id}`);
            if (res2.ok) {
              const yesterdayTasks = await res2.json();
              if (yesterdayTasks.length > 0 && yesterdayTasks.every((t: Task) => t.status === 'DONE')) {
                streak = 2;
              }
            }
          }
        }
      } catch (err) {
        console.error('Failed to calculate streak:', err);
      }
      setStreakCount(streak);
    };
    calculateStreak();
  }, [session?.user, tasks]);

  const handleToggleTask = async (task: Task) => {
    const isDone = task.status === 'DONE';
    const newStatus = isDone ? 'PLANNED' : 'DONE';

    try {
      await fetch(`/api/tasks/${task.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!isDone) {
        // Just completed a task
        celebrate();
        const praise = PRAISES[Math.floor(Math.random() * PRAISES.length)];
        toast(praise);
      }

      fetchTasks();
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const pct = completionPercent(tasks);
  const allDone = tasks.length > 0 && pct === 100;
  const doneCount = tasks.filter((t) => t.status === 'DONE').length;

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="kid-hero">
        <div style={{ fontSize: '3rem' }}>{session?.user?.avatar}</div>
        <h1 style={{ margin: '0.5rem 0 0' }}>
          Assalamu alaikum, {session?.user?.name?.split(' ')[0]}! 👋
        </h1>
        <div className="kid-streak">
          <span>🔥 {streakCount} day streak</span>
        </div>
      </div>

      {/* Perfect Day Banner */}
      {allDone && (
        <div className="celebrate-banner">
          🎉 Masha&apos;Allah! Perfect Day! 🎉
        </div>
      )}

      {/* Progress Card */}
      {tasks.length > 0 ? (
        <div className="card" style={{ marginBottom: '1rem' }}>
          <div className="spread" style={{ marginBottom: '0.5rem' }}>
            <strong>{doneCount} of {tasks.length} done</strong>
            {pct !== null && <span className="muted">{pct}%</span>}
          </div>
          <ProgressBar percent={pct} />
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>☀️</div>
          <p className="muted">No tasks today. Enjoy your day!</p>
        </div>
      )}

      {/* Task Cards */}
      {tasks.map((task) => {
        const subject = subj(task.subject);
        const isDone = task.status === 'DONE';

        return (
          <div
            key={task.id}
            className="kid-task"
            onClick={() => handleToggleTask(task)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleToggleTask(task);
              }
            }}
            style={{ opacity: isDone ? 0.7 : 1 }}
          >
            <div className={`kt-check${isDone ? ' done' : ''}`}>
              {isDone ? '✓' : ''}
            </div>
            <div className="kt-title">{task.title}</div>
            <div className="kt-sub">
              {subject.name}
              {task.slot ? ` · ${task.slot}` : ''}
            </div>
            <div className="kt-ico">{subject.icon}</div>
          </div>
        );
      })}
    </div>
  );
}
