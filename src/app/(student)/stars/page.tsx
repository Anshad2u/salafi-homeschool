'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { todayStr, dateOffset, completionPercent, streak } from '@/lib/utils';
import { BADGE_DEFS, SURAHS } from '@/lib/curriculum';
import StatCard from '@/components/StatCard';
import WeekChart from '@/components/WeekChart';

interface Task {
  status: string;
  date: string;
}

interface QuranEntry {
  surahIndex: number;
  ayahs: number;
}

interface SkillEntry {
  level: number;
}

interface Book {
  status: string;
}

export default function StarsPage() {
  const { data: session } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [quranData, setQuranData] = useState<QuranEntry[]>([]);
  const [skillsData, setSkillsData] = useState<SkillEntry[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [recentTasks, setRecentTasks] = useState<Record<string, Task[]>>({});

  const profileId = session?.user?.id;

  const fetchAllData = useCallback(async () => {
    if (!profileId) return;
    setLoading(true);
    try {
      // Fetch tasks for last 30 days
      const taskPromises: Promise<Response>[] = [];
      for (let i = 0; i < 30; i++) {
        taskPromises.push(fetch(`/api/tasks?date=${todayStr(-i)}&profileId=${profileId}`));
      }
      const taskResponses = await Promise.all(taskPromises);
      const allTasks: Task[] = [];
      const recentMap: Record<string, Task[]> = {};

      for (let i = 0; i < taskResponses.length; i++) {
        const date = todayStr(-i);
        if (taskResponses[i].ok) {
          const dayTasks = await taskResponses[i].json();
          recentMap[date] = dayTasks;
          allTasks.push(...dayTasks);
        }
      }
      setTasks(allTasks);
      setRecentTasks(recentMap);

      // Fetch Quran progress
      const quranRes = await fetch(`/api/quran?profileId=${profileId}`);
      if (quranRes.ok) setQuranData(await quranRes.json());

      // Fetch skills
      const skillsRes = await fetch(`/api/skills?profileId=${profileId}`);
      if (skillsRes.ok) setSkillsData(await skillsRes.json());

      // Fetch books
      const booksRes = await fetch(`/api/books?profileId=${profileId}`);
      if (booksRes.ok) setBooks(await booksRes.json());
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
    setLoading(false);
  }, [profileId]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  // Compute stats
  const surahsDone = quranData.filter((q) => q.ayahs >= SURAHS[q.surahIndex][1]).length;
  const totalAyahs = quranData.reduce((sum, q) => sum + q.ayahs, 0);
  const masteredCount = skillsData.filter((s) => s.level === 3).length;
  const finishedBooks = books.filter((b) => b.status === 'FINISHED').length;

  // Compute streak
  const streakCount = streak((date: string) => recentTasks[date] || []);

  // Compute badges
  const getBadgeEarned = (badgeId: string): boolean => {
    // first: any task DONE ever
    if (badgeId === 'first') {
      return tasks.some((t) => t.status === 'DONE');
    }

    // perfect: any day with 100% completion in last 30 days
    if (badgeId === 'perfect') {
      for (let i = 0; i < 30; i++) {
        const date = todayStr(-i);
        const dayTasks = recentTasks[date] || [];
        if (dayTasks.length > 0 && completionPercent(dayTasks) === 100) {
          return true;
        }
      }
      return false;
    }

    // streak3
    if (badgeId === 'streak3') {
      return streakCount >= 3;
    }

    // streak7
    if (badgeId === 'streak7') {
      return streakCount >= 7;
    }

    // surah3
    if (badgeId === 'surah3') {
      return surahsDone >= 3;
    }

    // surah10
    if (badgeId === 'surah10') {
      return surahsDone >= 10;
    }

    // book3
    if (badgeId === 'book3') {
      return finishedBooks >= 3;
    }

    // master5
    if (badgeId === 'master5') {
      return masteredCount >= 5;
    }

    return false;
  };

  // WeekChart data function
  const getDayCompletion = (date: string): number | null => {
    const dayTasks = recentTasks[date] || [];
    return completionPercent(dayTasks);
  };

  if (loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>;
  }

  return (
    <div>
      {/* Hero */}
      <div className="kid-hero">
        <h1 style={{ margin: '0 0 0.25rem 0' }}>⭐ My Stars & Badges</h1>
        <p className="muted" style={{ margin: 0 }}>Keep going, {session?.user?.name?.split(' ')[0]}!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-stats">
        <StatCard value={surahsDone} label="Surahs" />
        <StatCard value={totalAyahs} label="Ayahs" />
        <StatCard value={masteredCount} label="Skills Mastered" />
        <StatCard value={finishedBooks} label="Books" />
      </div>

      {/* Week Chart */}
      <div className="card" style={{ marginBottom: '1rem' }}>
        <h3 style={{ margin: '0 0 0.75rem 0' }}>📊 This Week</h3>
        <WeekChart getData={getDayCompletion} />
      </div>

      {/* Badge Grid */}
      <div className="card">
        <h3 style={{ margin: '0 0 0.75rem 0' }}>🏆 Badges</h3>
        <div className="badge-grid">
          {BADGE_DEFS.map((badge) => {
            const earned = getBadgeEarned(badge.id);
            return (
              <div
                key={badge.id}
                className={`badge-tile${earned ? '' : ' locked'}`}
              >
                <div className="b-ico">{badge.icon}</div>
                <div className="b-name">{badge.name}</div>
                <div className="b-desc">{badge.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
