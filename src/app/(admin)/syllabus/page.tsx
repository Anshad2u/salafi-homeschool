'use client';

import { useState, useEffect, useCallback } from 'react';

type Child = { id: string; name: string; avatar: string; age: number | null; grade: string | null };
type ChildCoverage = { inPlan: boolean; status: string | null };
type Topic = {
  id: string; subject: string; subjectDisplay: string; subjectIcon: string;
  strand: string; level: number; ageGroup: string;
  title: string; description: string; category: string;
  estimatedSessions: number; prerequisites: string; materials: string;
  childCoverage: Record<string, ChildCoverage>;
};

const LEVEL_LABELS = ['0-1', '1-2', '2-3', '3-4', '4-5', '5-6', '6-7'];
const LEVEL_EMOJIS = ['👶', '🧒', '👶', '🧒', '🧒', '👦', '👦'];
const SUBJECT_ORDER = ['quran', 'tajweed', 'tafsir', 'aqeedah', 'fiqh', 'seerah', 'akhlaq', 'arabic', 'adhkar', 'muttoon', 'coding', 'computer', 'home-science', 'english', 'mathematics', 'science', 'social-studies', 'art-music', 'physical-education', 'life-skills'];
const SUBJECT_INFO: Record<string, { name: string; icon: string }> = {
  'quran': { name: 'Quran', icon: '📖' },
  'tajweed': { name: 'Tajweed', icon: '🎙️' },
  'tafsir': { name: 'Tafsir', icon: '📘' },
  'aqeedah': { name: 'Aqeedah', icon: '🕌' },
  'fiqh': { name: 'Fiqh', icon: '📜' },
  'seerah': { name: 'Seerah', icon: '📚' },
  'akhlaq': { name: 'Akhlaq', icon: '🤲' },
  'arabic': { name: 'Arabic', icon: '✍️' },
  'science': { name: 'Science', icon: '🔬' },
  'english': { name: 'English', icon: '📝' },
  'mathematics': { name: 'Math', icon: '🔢' },
  'social-studies': { name: 'Social Studies', icon: '🌍' },
  'art-music': { name: 'Art & Music', icon: '🎨' },
  'physical-education': { name: 'P.E.', icon: '🏃' },
  'life-skills': { name: 'Life Skills', icon: '🌟' },
  'adhkar': { name: 'Adhkar & Dua', icon: '📿' },
  'muttoon': { name: 'Muttoon', icon: '📕' },
  'coding': { name: 'Coding', icon: '💻' },
  'computer': { name: 'Computer', icon: '🖥️' },
  'home-science': { name: 'Home Science', icon: '🏠' },
};

function statusIcon(status: string | null): { emoji: string; label: string } {
  switch (status) {
    case 'completed': return { emoji: '✅', label: 'Completed' };
    case 'carried-over':
    case 'pending': return { emoji: '⏳', label: 'In progress' };
    case 'skipped':
    case 'not-needed': return { emoji: '⏭️', label: 'Skipped' };
    default: return { emoji: '⬜', label: 'Not started' };
  }
}

export default function SyllabusPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [children, setChildren] = useState<Child[]>([]);
  const [levels, setLevels] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<number>(3);
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [selectedChild, setSelectedChild] = useState<string>('all');
  const [editMode, setEditMode] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [toggling, setToggling] = useState<string | null>(null);

  const fetchData = useCallback(async (level: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/syllabus?level=${level}`);
      if (!res.ok) {
        setError('Failed to load syllabus. Please try again.');
        setLoading(false);
        return;
      }
      const data = await res.json();
      setTopics(data.topics || []);
      setChildren(data.children || []);
      if (data.levels && data.levels.length > 0) setLevels(data.levels);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedLevel);
  }, [selectedLevel, fetchData]);

  const filteredTopics = topics.filter(t => {
    if (filterSubject !== 'all' && t.subject !== filterSubject) return false;
    return true;
  });

  const handleToggleTopic = async (profileId: string, topicId: string, action: 'add' | 'remove' | 'known') => {
    setToggling(topicId);
    setMessage(null);
    try {
      const res = await fetch('/api/syllabus', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId, topicId, action }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`${action === 'remove' ? 'Removed' : action === 'known' ? 'Marked as known' : 'Added'} topic successfully. ${data.note || ''}`);
        // Refetch to update state
        await fetchData(selectedLevel);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage('Network error');
    } finally {
      setToggling(null);
    }
  };

  const handleRegenerate = async (profileId: string) => {
    setRegenerating(true);
    setMessage(null);
    try {
      const child = children.find(c => c.id === profileId);
      const name = child?.name || 'this child';
      const res = await fetch('/api/syllabus/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(`✅ ${name}: ${data.message}`);
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch {
      setMessage('Network error during regeneration');
    } finally {
      setRegenerating(false);
    }
  };

  // Get unique subjects from filtered topics, in display order
  const subjectSet = new Set(topics.map(t => t.subject));
  const subjectList = SUBJECT_ORDER.filter(s => subjectSet.has(s));

  return (
    <>
      <div className="spread" style={{ marginBottom: 14 }}>
        <h1>📚 Syllabus Overview</h1>
      </div>

      {/* Level tabs */}
      <div className="row" style={{ gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {LEVEL_LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => setSelectedLevel(i)}
            className={`btn ${selectedLevel === i ? 'btn-primary' : 'btn-soft'}`}
            style={{ fontSize: '0.85rem' }}
          >
            {LEVEL_EMOJIS[i]} Level {i} <span className="muted">({label})</span>
          </button>
        ))}
      </div>

      {/* Controls bar */}
      <div className="row spread" style={{ marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
        <div className="row" style={{ gap: 6, flexWrap: 'wrap' }}>
          <button
            onClick={() => setFilterSubject('all')}
            className={`btn btn-sm ${filterSubject === 'all' ? 'btn-primary' : 'btn-soft'}`}
          >
            All ({topics.length})
          </button>
          {subjectList.map(s => {
            const info = SUBJECT_INFO[s] || { name: s, icon: '📚' };
            const count = topics.filter(t => t.subject === s).length;
            return (
              <button
                key={s}
                onClick={() => setFilterSubject(s)}
                className={`btn btn-sm ${filterSubject === s ? 'btn-primary' : 'btn-soft'}`}
              >
                {info.icon} {info.name} ({count})
              </button>
            );
          })}
        </div>
        <div className="row" style={{ gap: 6 }}>
          {children.length > 1 && (
            <select
              value={selectedChild}
              onChange={e => setSelectedChild(e.target.value)}
              className="input"
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            >
              <option value="all">All children</option>
              {children.map(c => (
                <option key={c.id} value={c.id}>{c.avatar} {c.name}</option>
              ))}
            </select>
          )}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`btn btn-sm ${editMode ? 'btn-primary' : 'btn-soft'}`}
          >
            {editMode ? '🔒 Done Editing' : '✏️ Edit'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className="alert" style={{ marginBottom: 14 }}>
          {message}
          <button onClick={() => setMessage(null)} style={{ marginLeft: 12, cursor: 'pointer' }}>✕</button>
        </div>
      )}

      {error && (
        <div className="alert alert-error" style={{ marginBottom: 14 }}>{error}</div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', paddingTop: 40 }}>
          <p className="muted">Loading syllabus...</p>
        </div>
      ) : filteredTopics.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: 40 }}>
          <p className="muted">No topics found for this level.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {/* Group by subject */}
          {subjectList.filter(s => filterSubject === 'all' || s === filterSubject).map(subject => {
            const info = SUBJECT_INFO[subject] || { name: subject, icon: '📚' };
            const subjectTopics = filteredTopics.filter(t => t.subject === subject);

            return (
              <div key={subject} className="card" style={{ padding: '12px 16px' }}>
                <h3 style={{ marginBottom: 8, fontSize: '1.1rem' }}>
                  {info.icon} {info.name}
                  <span className="muted" style={{ fontWeight: 400, fontSize: '0.85rem', marginLeft: 8 }}>
                    {subjectTopics.length} topics
                  </span>
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {subjectTopics.map(t => {
                    const cov = t.childCoverage;

                    return (
                      <div
                        key={t.id}
                        className="row spread"
                        style={{
                          padding: '8px 10px',
                          borderRadius: 8,
                          background: '#f9fafb',
                          alignItems: 'flex-start',
                          gap: 8,
                        }}
                      >
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>{t.title}</div>
                          <div className="muted" style={{ fontSize: '0.8rem' }}>
                            {t.description}{t.category ? ` · ${t.category}` : ''}{t.estimatedSessions ? ` · ${t.estimatedSessions} ses` : ''}
                          </div>
                        </div>

                        {/* Per-child coverage */}
                        <div className="row" style={{ gap: 4, flexShrink: 0 }}>
                          {children.map(child => {
                            const coverage = cov?.[child.id];
                            const isInPlan = coverage?.inPlan ?? false;
                            const st = coverage?.status ?? null;

                            if (editMode) {
                              return (
                                <button
                                  key={child.id}
                                  onClick={() => handleToggleTopic(child.id, t.id, isInPlan ? 'remove' : 'add')}
                                  disabled={toggling === t.id}
                                  title={`${child.name}: ${isInPlan ? 'In plan — click to remove' : 'Not in plan — click to add'}`}
                                  style={{
                                    padding: '2px 6px',
                                    borderRadius: 6,
                                    border: '1px solid #d1d5db',
                                    background: isInPlan ? '#d1fae5' : '#fff',
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {child.avatar} {isInPlan ? '✓' : '+'}
                                </button>
                              );
                            }

                            return (
                              <span
                                key={child.id}
                                title={`${child.name}: ${isInPlan ? statusIcon(st).label : 'Not in plan'}`}
                                style={{ fontSize: '0.85rem', opacity: isInPlan ? 1 : 0.4 }}
                              >
                                {child.avatar}
                                {isInPlan ? (
                                  st === 'completed' ? '✅' : st === 'pending' || st === 'carried-over' ? '⏳' : st === 'skipped' || st === 'not-needed' ? '⏭️' : '📋'
                                ) : '🚫'}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Regenerate section (only in edit mode) */}
      {editMode && children.length > 0 && (
        <div className="card" style={{ marginTop: 20, padding: '16px 20px' }}>
          <h3 style={{ marginBottom: 8 }}>🔄 Apply Changes</h3>
          <p className="muted" style={{ marginBottom: 12, fontSize: '0.85rem' }}>
            After adding/removing topics, regenerate future daily plans for each child to apply changes.
            This deletes future plans and creates new ones from today.
          </p>
          <div className="row" style={{ gap: 8, flexWrap: 'wrap' }}>
            {children.map(child => (
              <button
                key={child.id}
                onClick={() => handleRegenerate(child.id)}
                disabled={regenerating}
                className="btn"
              >
                {regenerating ? '⏳...' : `🔄 ${child.avatar} ${child.name}`}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
