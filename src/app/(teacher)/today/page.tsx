'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { todayStr, fmtDate, completionPercent } from '@/lib/utils';
import { subj, SUBJECTS, STD_DAY } from '@/lib/curriculum';
import TaskRow from '@/components/TaskRow';
import ProgressBar from '@/components/ProgressBar';
import { toast } from '@/components/Toast';

interface Task {
  id: string;
  title: string;
  subject: string;
  slot: string;
  status: string;
  score: number | null;
  notes: string;
  profileId: string;
  date: string;
}

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

const ACADEMIC_SUBJECTS = ['math', 'science', 'english', 'arabic'];

export default function TeacherTodayPage() {
  const { data: session } = useAuth();
  const [dateOffset, setDateOffset] = useState(0);
  const [tasks, setTasks] = useState<Record<string, Task[]>>({});
  const [children, setChildren] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskSubject, setNewTaskSubject] = useState<Record<string, string>>({});
  const [newTaskTitle, setNewTaskTitle] = useState<Record<string, string>>({});

  const currentDate = todayStr(dateOffset);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [tasksRes, familyRes] = await Promise.all([
        fetch(`/api/tasks?date=${currentDate}`),
        fetch('/api/family'),
      ]);

      if (tasksRes.ok) {
        const tasksData = await tasksRes.json();
        // Group tasks by profileId
        const grouped: Record<string, Task[]> = {};
        for (const task of tasksData) {
          if (!grouped[task.profileId]) grouped[task.profileId] = [];
          grouped[task.profileId].push(task);
        }
        setTasks(grouped);
      }

      if (familyRes.ok) {
        const familyData = await familyRes.json();
        setChildren(familyData.profiles?.filter((p: Profile) => p.role === 'STUDENT') || []);
      }
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  }, [currentDate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStatusChange = async (taskId: string, value: string) => {
    if (value.startsWith('score:')) {
      const score = value.replace('score:', '');
      try {
        await fetch(`/api/tasks/${taskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ score: score === '' ? null : Number(score) }),
        });
        fetchData();
      } catch (err) {
        console.error('Failed to update score:', err);
      }
    } else if (value.startsWith('notes:')) {
      const notes = value.replace('notes:', '');
      try {
        await fetch(`/api/tasks/${taskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ notes }),
        });
        fetchData();
      } catch (err) {
        console.error('Failed to update notes:', err);
      }
    } else {
      const statusMap: Record<string, string> = {
        taught: 'TAUGHT',
        done: 'DONE',
        planned: 'PLANNED',
      };
      try {
        await fetch(`/api/tasks/${taskId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: statusMap[value] || value }),
        });
        fetchData();
      } catch (err) {
        console.error('Failed to update status:', err);
      }
    }
  };

  const handleAddTask = async (profileId: string) => {
    const subject = newTaskSubject[profileId];
    const title = newTaskTitle[profileId];
    if (!subject || !title?.trim()) {
      toast('Please select a subject and enter a task title');
      return;
    }

    try {
      await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId,
          subject,
          title: title.trim(),
          date: currentDate,
          status: 'PLANNED',
        }),
      });
      setNewTaskTitle((prev) => ({ ...prev, [profileId]: '' }));
      fetchData();
      toast('Task added! ✅');
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      fetchData();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div>
      {/* Date Navigator */}
      <div className="spread" style={{ marginBottom: '1rem' }}>
        <button className="btn btn-soft" onClick={() => setDateOffset((o) => o - 1)}>
          ← Prev
        </button>
        <h2 style={{ margin: 0 }}>{fmtDate(currentDate)}</h2>
        <button className="btn btn-soft" onClick={() => setDateOffset((o) => o + 1)}>
          Next →
        </button>
      </div>

      {children.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
          No children profiles found.
        </div>
      ) : (
        children.map((child) => {
          const childTasks = tasks[child.id] || [];
          const pct = completionPercent(childTasks);

          return (
            <div key={child.id} className="card" style={{ marginBottom: '1.5rem' }}>
              {/* Child Header */}
              <div className="spread" style={{ marginBottom: '0.75rem' }}>
                <div className="row" style={{ gap: '0.5rem', alignItems: 'center' }}>
                  <span className="avatar" style={{ fontSize: '1.5rem' }}>{child.avatar}</span>
                  <strong>{child.name}</strong>
                </div>
                {pct !== null && (
                  <span className="muted">{pct}%</span>
                )}
              </div>

              {pct !== null && <ProgressBar percent={pct} />}

              {/* Task List */}
              {childTasks.length === 0 ? (
                <div className="muted" style={{ padding: '1rem 0', textAlign: 'center' }}>
                  No tasks yet for this day
                </div>
              ) : (
                childTasks.map((task) => (
                  <TaskRow
                    key={task.id}
                    task={task}
                    showActions
                    showScore={ACADEMIC_SUBJECTS.includes(task.subject)}
                    showNotes
                    onStatusChange={handleStatusChange}
                    onDelete={handleDeleteTask}
                  />
                ))
              )}

              {/* Quick Add Form */}
              <div className="row" style={{ marginTop: '0.75rem', gap: '0.5rem', flexWrap: 'wrap' }}>
                <select
                  className="btn btn-soft"
                  value={newTaskSubject[child.id] || ''}
                  onChange={(e) =>
                    setNewTaskSubject((prev) => ({ ...prev, [child.id]: e.target.value }))
                  }
                >
                  <option value="">Subject...</option>
                  {SUBJECTS.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.name}
                    </option>
                  ))}
                </select>
                <input
                  className="btn btn-soft"
                  type="text"
                  placeholder="Task title..."
                  value={newTaskTitle[child.id] || ''}
                  onChange={(e) =>
                    setNewTaskTitle((prev) => ({ ...prev, [child.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddTask(child.id);
                  }}
                  style={{ flex: 1, minWidth: '150px' }}
                />
                <button className="btn" onClick={() => handleAddTask(child.id)}>
                  + Add
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
