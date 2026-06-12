'use client';

import { useState, useEffect, useCallback } from 'react';
import { SUBJECTS, SKILLS, LEVELS } from '@/lib/curriculum';
import { toast } from '@/components/Toast';

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
}

interface SkillEntry {
  subject: string;
  skillIndex: number;
  level: number;
}

export default function SkillsPage() {
  const [children, setChildren] = useState<Profile[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [skillsData, setSkillsData] = useState<SkillEntry[]>([]);
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

  // Fetch skills data for selected child
  const fetchSkills = useCallback(async () => {
    if (!selectedChild) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/skills?profileId=${selectedChild}`);
      if (res.ok) {
        setSkillsData(await res.json());
      }
    } catch (err) {
      console.error('Failed to fetch skills data:', err);
    }
    setLoading(false);
  }, [selectedChild]);

  useEffect(() => {
    fetchSkills();
  }, [fetchSkills]);

  const getLevel = (subject: string, skillIndex: number) => {
    const entry = skillsData.find((s) => s.subject === subject && s.skillIndex === skillIndex);
    return entry?.level || 0;
  };

  const handleSetLevel = async (subject: string, skillIndex: number, level: number) => {
    try {
      await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileId: selectedChild, subject, skillIndex, level }),
      });
      if (level === 3) {
        toast('Skill mastered! 🏆');
      }
      fetchSkills();
    } catch (err) {
      console.error('Failed to update skill:', err);
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

      {/* Skills by Subject */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '2rem' }}>Loading...</div>
      ) : (
        SUBJECTS.map((subject) => {
          const subjectSkills = SKILLS[subject.id];
          if (!subjectSkills || subjectSkills.length === 0) return null;

          return (
            <div key={subject.id} className="card" style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 0.75rem 0' }}>
                {subject.icon} {subject.name}
              </h3>
              {subjectSkills.map((skillName, skillIndex) => {
                const currentLevel = getLevel(subject.id, skillIndex);
                return (
                  <div key={skillIndex} style={{ marginBottom: '0.5rem' }}>
                    <div className="muted" style={{ marginBottom: '0.25rem', fontSize: '0.9em' }}>
                      {skillName}
                    </div>
                    <div className="row" style={{ gap: '6px' }}>
                      {LEVELS.map((levelName, levelIndex) => (
                        <button
                          key={levelIndex}
                          className={`chip on-${levelIndex}${currentLevel === levelIndex ? ' sel' : ''}`}
                          onClick={() => handleSetLevel(subject.id, skillIndex, levelIndex)}
                        >
                          {levelName}
                        </button>
                      ))}
                    </div>
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
