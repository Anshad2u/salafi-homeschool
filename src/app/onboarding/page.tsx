'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

type Profile = { id: string; name: string; role: string; avatar: string; age: number | null; };
type CurriculumTopic = { id: string; subject: string; strand: string; level: number; ageGroup: string; title: string; description: string; category: string; };

const AGE_OPTIONS = [
  { age: 0, label: 'Baby (0-1 year)', emoji: '👶' },
  { age: 1, label: 'Toddler (1-2 years)', emoji: '🧒' },
  { age: 2, label: 'Early Preschool (2-3 years)', emoji: '👶' },
  { age: 3, label: 'Preschool (3-4 years)', emoji: '🧒' },
  { age: 4, label: 'Pre-K (4-5 years)', emoji: '🧒' },
  { age: 5, label: 'Kindergarten (5-6 years)', emoji: '👦' },
  { age: 6, label: 'Grade 1 (6-7 years)', emoji: '👦' },
  { age: 7, label: 'Grade 2 (7-8 years)', emoji: '👦' },
];

const SUBJECT_GROUPS: Record<string, { label: string; emoji: string }> = {
  quran: { label: 'Quran', emoji: '📖' },
  tajweed: { label: 'Tajweed', emoji: '🎙️' },
  tafsir: { label: 'Tafsir', emoji: '📘' },
  aqeedah: { label: 'Aqeedah', emoji: '🕌' },
  fiqh: { label: 'Fiqh', emoji: '📜' },
  seerah: { label: 'Seerah', emoji: '📚' },
  akhlaq: { label: 'Akhlaq', emoji: '🤲' },
  arabic: { label: 'Arabic', emoji: '✍️' },
  english: { label: 'English', emoji: '🔤' },
  mathematics: { label: 'Mathematics', emoji: '🔢' },
  science: { label: 'Science', emoji: '🔬' },
  'social-studies': { label: 'Social Studies', emoji: '🌍' },
  'art-music': { label: 'Art & Music', emoji: '🎨' },
  'physical-education': { label: 'Physical Education', emoji: '🏃' },
  'life-skills': { label: 'Life Skills', emoji: '🌟' },
};

export default function OnboardingPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [step, setStep] = useState<'select' | 'age' | 'topics' | 'generating' | 'done'>('select');
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [selectedAge, setSelectedAge] = useState<number>(3);
  const [topics, setTopics] = useState<CurriculumTopic[]>([]);
  const [knownTopicIds, setKnownTopicIds] = useState<Set<string>>(new Set());
  const [filterSubject, setFilterSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    fetch('/api/family').then(r => r.json()).then(data => {
      const students = (data.profiles || []).filter((p: Profile) => p.role === 'STUDENT');
      setProfiles(students);
    });
  }, []);

  useEffect(() => {
    if (selectedAge >= 0) {
      fetch(`/api/curriculum?level=${selectedAge}`).then(r => r.json()).then(data => {
        setTopics(data.topics || []);
      });
    }
  }, [selectedAge]);

  const filteredTopics = topics.filter(t => {
    if (filterSubject !== 'all' && t.subject !== filterSubject) return false;
    if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const toggleKnown = (topicId: string) => {
    setKnownTopicIds(prev => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  const handleGenerate = async () => {
    if (!selectedProfile) return;
    setStep('generating');

    try {
      const res = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profileId: selectedProfile.id,
          age: selectedAge,
          knownTopicIds: Array.from(knownTopicIds),
        }),
      });
      const data = await res.json();
      setResult(data);
      setStep('done');
    } catch (err) {
      alert('Error generating plan. Please try again.');
      setStep('topics');
    }
  };

  // Step 1: Select student
  if (step === 'select') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-bold text-emerald-800 mb-2">🎓 Curriculum Onboarding</h1>
          <p className="text-gray-600 mb-6">Set up a personalized 365-day learning plan for each child.</p>

          <h2 className="text-lg font-semibold text-gray-700 mb-3">Choose a Student</h2>
          <div className="grid gap-3">
            {profiles.map(p => (
              <button
                key={p.id}
                onClick={() => { setSelectedProfile(p); setStep('age'); }}
                className="flex items-center gap-4 p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-emerald-400 hover:shadow-md transition text-left"
              >
                <span className="text-3xl">{p.avatar}</span>
                <div>
                  <div className="font-semibold text-gray-800">{p.name}</div>
                  <div className="text-sm text-gray-500">{p.age ? `Age: ${p.age}` : 'Age not set'}</div>
                </div>
                <span className="ml-auto text-emerald-500">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2: Select age
  if (step === 'age') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-2xl mx-auto">
          <button onClick={() => setStep('select')} className="text-emerald-600 hover:underline mb-4">← Back</button>
          <h1 className="text-2xl font-bold text-emerald-800 mb-2">
            {selectedProfile?.avatar} {selectedProfile?.name}&apos;s Learning Level
          </h1>
          <p className="text-gray-600 mb-6">Select their current age to determine the curriculum level.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AGE_OPTIONS.map(opt => (
              <button
                key={opt.age}
                onClick={() => setSelectedAge(opt.age)}
                className={`p-4 rounded-xl border-2 transition text-center ${
                  selectedAge === opt.age
                    ? 'border-emerald-500 bg-emerald-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-emerald-300'
                }`}
              >
                <div className="text-3xl mb-1">{opt.emoji}</div>
                <div className="text-sm font-medium text-gray-700">{opt.label}</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => setStep('topics')}
            className="mt-6 w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Continue →
          </button>
        </div>
      </div>
    );
  }

  // Step 3: Mark known topics
  if (step === 'topics') {
    const subjects = Array.from(new Set(topics.map(t => t.subject)));
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => setStep('age')} className="text-emerald-600 hover:underline mb-4">← Back</button>
          <h1 className="text-2xl font-bold text-emerald-800 mb-2">
            {selectedProfile?.avatar} Mark What {selectedProfile?.name} Already Knows
          </h1>
          <p className="text-gray-600 mb-4">
            Tap topics your child already knows. These will be skipped in the daily plan.
            {knownTopicIds.size > 0 && (
              <span className="ml-2 text-emerald-600 font-semibold">({knownTopicIds.size} marked as known)</span>
            )}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setFilterSubject('all')}
              className={`px-3 py-1 rounded-full text-sm ${filterSubject === 'all' ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300'}`}
            >All ({topics.length})</button>
            {subjects.map(s => {
              const info = SUBJECT_GROUPS[s] || { label: s, emoji: '📚' };
              const count = topics.filter(t => t.subject === s).length;
              return (
                <button key={s} onClick={() => setFilterSubject(s)}
                  className={`px-3 py-1 rounded-full text-sm ${filterSubject === s ? 'bg-emerald-600 text-white' : 'bg-white border border-gray-300'}`}
                >{info.emoji} {info.label} ({count})</button>
              );
            })}
          </div>

          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg mb-4"
          />

          <div className="max-h-[50vh] overflow-y-auto space-y-1 mb-4">
            {filteredTopics.map(t => {
              const info = SUBJECT_GROUPS[t.subject] || { label: t.subject, emoji: '📚' };
              const isKnown = knownTopicIds.has(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggleKnown(t.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left transition ${
                    isKnown
                      ? 'bg-emerald-50 border-emerald-300 opacity-70'
                      : 'bg-white border-gray-200 hover:border-emerald-300'
                  }`}
                >
                  <span className="text-lg">{isKnown ? '✅' : '⬜'}</span>
                  <span className="text-sm">{info.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm text-gray-800 truncate">{t.title}</div>
                    <div className="text-xs text-gray-500 truncate">{t.description}</div>
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap">L{t.level}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleGenerate}
            className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            Generate 365-Day Plan ({topics.length - knownTopicIds.size} new topics)
          </button>
        </div>
      </div>
    );
  }

  // Step 4: Generating
  if (step === 'generating') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4 animate-bounce">📚</div>
          <h2 className="text-xl font-bold text-emerald-800">Generating Your 365-Day Plan...</h2>
          <p className="text-gray-600 mt-2">Distributing {topics.length - knownTopicIds.size} topics across 365 days</p>
        </div>
      </div>
    );
  }

  // Step 5: Done
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-emerald-800 mb-2">Plan Generated!</h1>
        <p className="text-gray-600 mb-6">
          {selectedProfile?.name}&apos;s 365-day curriculum plan is ready.
        </p>

        {result && (
          <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-200 mb-6">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-emerald-600">{result.totalDays}</div>
                <div className="text-sm text-gray-500">Days Planned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{result.totalTasks}</div>
                <div className="text-sm text-gray-500">Total Tasks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">{knownTopicIds.size}</div>
                <div className="text-sm text-gray-500">Topics Skipped</div>
              </div>
            </div>
          </div>
        )}

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => router.push('/today')}
            className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition"
          >
            View Today&apos;s Plan →
          </button>
          <button
            onClick={() => { setStep('select'); setSelectedProfile(null); setResult(null); setKnownTopicIds(new Set()); }}
            className="px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition"
          >
            Set Up Another Child
          </button>
        </div>
      </div>
    </div>
  );
}
