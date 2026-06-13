'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { todayStr, fmtDate, completionPercent } from '@/lib/utils';
import ProgressBar from '@/components/ProgressBar';
import { toast } from '@/components/Toast';

interface DailyTask {
  id: string;
  subject: string;
  status: string;
  feedback: string;
  topic: { id: string; title: string; description: string; subject: string; strand: string; category: string; };
}

interface DailyPlan {
  id: string;
  date: string;
  dayNumber: number;
  isCompleted: boolean;
  tasks: DailyTask[];
}

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

const SUBJECT_META: Record<string, { emoji: string; color: string }> = {
  quran: { emoji: '📖', color: 'bg-purple-100 text-purple-700' },
  'islamic-studies': { emoji: '🕌', color: 'bg-green-100 text-green-700' },
  english: { emoji: '🔤', color: 'bg-blue-100 text-blue-700' },
  mathematics: { emoji: '🔢', color: 'bg-orange-100 text-orange-700' },
  science: { emoji: '🔬', color: 'bg-cyan-100 text-cyan-700' },
  'social-studies': { emoji: '🌍', color: 'bg-yellow-100 text-yellow-700' },
  'art-music': { emoji: '🎨', color: 'bg-pink-100 text-pink-700' },
  'physical-education': { emoji: '🏃', color: 'bg-red-100 text-red-700' },
  'life-skills': { emoji: '🌟', color: 'bg-amber-100 text-amber-700' },
};

const STATUS_CONFIG: Record<string, { label: string; emoji: string; color: string }> = {
  pending: { label: 'Not started', emoji: '⬜', color: 'border-gray-200' },
  'carried-over': { label: 'Carried over', emoji: '🔄', color: 'border-yellow-300 bg-yellow-50' },
  completed: { label: 'Done', emoji: '✅', color: 'border-green-300 bg-green-50' },
  skipped: { label: 'Skipped', emoji: '⏭️', color: 'border-gray-300 bg-gray-50 opacity-60' },
  'not-needed': { label: 'Not needed', emoji: '🚫', color: 'border-red-200 bg-red-50 opacity-50' },
};

export default function TeacherTodayPage() {
  const router = useRouter();
  const [dateOffset, setDateOffset] = useState(0);
  const [children, setChildren] = useState<Profile[]>([]);
  const [plans, setPlans] = useState<Record<string, DailyPlan | null>>({});
  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  const currentDate = todayStr(dateOffset);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const familyRes = await fetch('/api/family');
      if (!familyRes.ok) throw new Error('Failed to fetch family');
      const familyData = await familyRes.json();
      const students = (familyData.profiles || []).filter((p: Profile) => p.role === 'STUDENT');
      setChildren(students);

      // Fetch daily plan for each student
      const planPromises = students.map(async (student: Profile) => {
        try {
          const res = await fetch(`/api/daily-plans?profileId=${student.id}&date=${currentDate}`);
          if (res.ok) {
            const data = await res.json();
            return { studentId: student.id, plan: data.plan };
          }
        } catch (e) {}
        return { studentId: student.id, plan: null };
      });

      const planResults = await Promise.all(planPromises);
      const planMap: Record<string, DailyPlan | null> = {};
      for (const r of planResults) {
        planMap[r.studentId] = r.plan;
      }
      setPlans(planMap);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  }, [currentDate]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleTaskStatus = async (taskId: string, status: string) => {
    setUpdatingTaskId(taskId);
    try {
      const res = await fetch('/api/daily-plans', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, status }),
      });
      if (res.ok) {
        toast(status === 'completed' ? '✅ Done!' : status === 'skipped' ? '⏭️ Skipped' : '🚫 Marked not needed');
        fetchData();
      }
    } catch (err) {
      toast('Failed to update task');
    }
    setUpdatingTaskId(null);
  };

  const hasAnyPlan = Object.values(plans).some(p => p !== null);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading today&apos;s plan...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Date Navigator */}
      <div className="flex items-center justify-between mb-4">
        <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200" onClick={() => setDateOffset(o => o - 1)}>
          ← Prev
        </button>
        <h2 className="text-lg font-bold text-gray-800">{fmtDate(currentDate)}</h2>
        <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200" onClick={() => setDateOffset(o => o + 1)}>
          Next →
        </button>
      </div>

      {children.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No students found. Set up profiles first.</div>
      ) : !hasAnyPlan ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4">📚</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">No Curriculum Plan Yet</h3>
          <p className="text-gray-500 mb-4">Set up a learning plan for each child to see their daily tasks here.</p>
          <button
            onClick={() => router.push('/onboarding')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700"
          >
            Set Up Curriculum Plan →
          </button>
        </div>
      ) : (
        children.map((child) => {
          const plan = plans[child.id];
          if (!plan) {
            return (
              <div key={child.id} className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">{child.avatar}</span>
                  <span className="font-bold">{child.name}</span>
                </div>
                <div className="text-sm text-gray-500 mb-2">No plan for this student yet.</div>
                <button
                  onClick={() => router.push('/onboarding')}
                  className="text-sm px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
                >
                  Set Up Plan
                </button>
              </div>
            );
          }

          const completed = plan.tasks.filter(t => t.status === 'completed').length;
          const total = plan.tasks.length;
          const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

          // Group tasks by subject
          const bySubject: Record<string, DailyTask[]> = {};
          for (const t of plan.tasks) {
            if (!bySubject[t.subject]) bySubject[t.subject] = [];
            bySubject[t.subject].push(t);
          }

          const carriedOver = plan.tasks.filter(t => t.status === 'carried-over');

          return (
            <div key={child.id} className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
              {/* Student Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{child.avatar}</span>
                  <div>
                    <div className="font-bold text-gray-800">{child.name}</div>
                    <div className="text-xs text-gray-500">Day {plan.dayNumber} of 365</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-emerald-600">{pct}%</div>
                  <div className="text-xs text-gray-500">{completed}/{total} done</div>
                </div>
              </div>

              <ProgressBar percent={pct} />

              {/* Carried Over Warning */}
              {carriedOver.length > 0 && (
                <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                  🔄 {carriedOver.length} task{carriedOver.length > 1 ? 's' : ''} carried over from previous days
                </div>
              )}

              {/* Tasks by Subject */}
              {Object.entries(bySubject).map(([subject, subjectTasks]) => {
                const meta = SUBJECT_META[subject] || { emoji: '📚', color: 'bg-gray-100 text-gray-700' };
                const subCompleted = subjectTasks.filter(t => t.status === 'completed').length;

                return (
                  <div key={subject} className="mt-3">
                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${meta.color} mb-1.5`}>
                      <span>{meta.emoji}</span>
                      <span className="font-semibold text-sm capitalize">{subject.replace('-', ' ')}</span>
                      <span className="text-xs ml-auto">{subCompleted}/{subjectTasks.length}</span>
                    </div>

                    {subjectTasks.map(task => {
                      const statusCfg = STATUS_CONFIG[task.status] || STATUS_CONFIG.pending;
                      const isUpdating = updatingTaskId === task.id;

                      return (
                        <div
                          key={task.id}
                          className={`flex items-start gap-2 p-2.5 mx-1 mb-1 rounded-lg border ${statusCfg.color} transition-all`}
                        >
                          <span className="text-base mt-0.5">{statusCfg.emoji}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-gray-800">{task.topic.title}</div>
                            <div className="text-xs text-gray-500 truncate">{task.topic.description}</div>
                          </div>

                          {task.status === 'pending' || task.status === 'carried-over' ? (
                            <div className="flex gap-1 shrink-0">
                              <button
                                disabled={isUpdating}
                                onClick={() => handleTaskStatus(task.id, 'completed')}
                                className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200 transition"
                                title="Mark as done"
                              >
                                ✅
                              </button>
                              <button
                                disabled={isUpdating}
                                onClick={() => handleTaskStatus(task.id, 'skipped')}
                                className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition"
                                title="Skip this task"
                              >
                                ⏭️
                              </button>
                              <button
                                disabled={isUpdating}
                                onClick={() => handleTaskStatus(task.id, 'not-needed')}
                                className="px-2 py-1 text-xs bg-red-100 text-red-600 rounded hover:bg-red-200 transition"
                                title="Not needed for this child"
                              >
                                🚫
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => handleTaskStatus(task.id, 'pending')}
                              className="text-xs text-gray-400 hover:text-gray-600 shrink-0"
                              title="Reset to pending"
                            >
                              ↩️
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
