'use client';

import { useState, useEffect, useCallback } from 'react';
import { SURAHS } from '@/lib/curriculum';
import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import { toast } from '@/components/Toast';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface QuranEntry {
  surahIndex: number;
  ayahs: number;
}

// Juz Amma order: surahs 78-114, then 1
const JUZ_AMMA_ORDER = [
  77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101,
  102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114,
];

export default function QuranPage() {
  const [children, setChildren] = useState<Profile[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [quranData, setQuranData] = useState<QuranEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch children list
  useEffect(() => {
    fetch('/api/family')
      .then((r) => r.json())
      .then((data) => {
        const kids = (data.profiles || []).filter((p: Profile) => p.role === 'STUDENT');
        setChildren(kids);
        if (kids.length > 0) setSelectedChild(kids[0].id);
      })
      .catch(console.error);
  }, []);

  // Fetch Quran data for selected child
  const fetchQuran = useCallback(async () => {
    if (!selectedChild) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/quran?profileId=${selectedChild}`);
      if (res.ok) {
        setQuranData(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch Quran data:', err);
    }
    setLoading(false);
  }, [selectedChild]);

  useEffect(() => {
    fetchQuran();
  }, [fetchQuran]);

  const getAyahs = (surahIndex: number) => {
    return quranData.find((q) => q.surahIndex === surahIndex)?.ayahs || 0;
  };

  const totalSurahsDone = quranData.filter((q) => q.ayahs >= SURAHS[q.surahIndex][1]).length;
  const totalAyahs = quranData.reduce((sum, q) => sum + q.ayahs, 0);
  const totalQuranAyahs = 6236;
  const percentQuran = Math.round((totalAyahs / totalQuranAyahs) * 100);

  const handleAdjust = async (surahIndex: number, delta: number) => {
    const current = getAyahs(surahIndex);
    const total = SURAHS[surahIndex][1];
    const newCount = Math.max(0, Math.min(total, current + delta));

    try {
      await fetch('/api/quran', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: selectedChild, surahIndex, ayahs: newCount }),
      });
      fetchQuran();
    } catch (err) {
      console.error('Failed to update Quran progress:', err);
    }
  };

  const handleFull = async (surahIndex: number) => {
    const total = SURAHS[surahIndex][1];
    try {
      await fetch('/api/quran', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: selectedChild, surahIndex, ayahs: total }),
      });
      toast("Masha'Allah! Surah complete 🎉");
      fetchQuran();
    } catch (err) {
      console.error('Failed to update Quran progress:', err);
    }
  };

  if (children.length === 0 && !loading) {
    return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>No children profiles found.</div>;
  }

  return (
    <div>
      {/* Child Tabs */}
      <div className="tabs">
        {children.map((child) => (
          <button
            key={child.id}
            className={`tab${selectedChild === child.id ? ' sel' : ''}`}
            onClick={() => setSelectedChild(child.id)}
          >
            {child.avatar} {child.name}
          </button>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-stats">
        <StatCard value={totalSurahsDone} label="Surahs Memorized" />
        <StatCard value={totalAyahs} label="Ayahs Memorized" />
        <StatCard value={`${percentQuran}%`} label="of Quran" />
        <StatCard value={SURAHS.length} label="Total Surahs" />
      </div>

      {/* Surah List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
      ) : (
        <div className="card">
          {JUZ_AMMA_ORDER.map((surahIndex) => {
            const [name, totalAyahs] = SURAHS[surahIndex];
            const memorized = getAyahs(surahIndex);
            const pct = totalAyahs > 0 ? Math.round((memorized / totalAyahs) * 100) : 0;

            return (
              <div key={surahIndex} className="row" style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border, #eee)', alignItems: 'center' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600 }}>{name}</div>
                  <div className="muted" style={{ fontSize: '0.85em' }}>
                    {memorized}/{totalAyahs} ayahs
                  </div>
                </div>
                <div style={{ flex: 2, minWidth: '100px' }}>
                  <ProgressBar percent={pct} />
                </div>
                <div className="row" style={{ gap: '4px' }}>
                  <button
                    className="btn btn-sm btn-soft"
                    onClick={() => handleAdjust(surahIndex, -1)}
                    disabled={memorized <= 0}
                  >
                    −
                  </button>
                  <button
                    className="btn btn-sm btn-soft"
                    onClick={() => handleAdjust(surahIndex, 1)}
                    disabled={memorized >= totalAyahs}
                  >
                    ＋
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleFull(surahIndex)}
                    disabled={memorized >= totalAyahs}
                  >
                    ✓ Full
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
