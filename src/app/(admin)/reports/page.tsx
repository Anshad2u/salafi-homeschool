"use client";

import { useEffect, useState, useMemo } from "react";
import StatCard from "@/components/StatCard";
import ProgressBar from "@/components/ProgressBar";
import { todayStr, dateOffset, completionPercent } from "@/lib/utils";
import { SURAHS, SUBJECTS, SKILLS, LEVELS, BADGE_DEFS, REC_BOOKS } from "@/lib/curriculum";
import { celebrate } from "@/components/Confetti";

interface Profile {
  id: string;
  name: string;
  avatar: string;
  role: string;
  age?: number | null;
  grade?: string | null;
}

interface QuranEntry {
  surahIndex: number;
  ayahs: number;
}

interface SkillEntry {
  subject: string;
  skillIndex: number;
  level: number;
}

interface BookEntry {
  id: string;
  title: string;
  author: string;
  status: string;
  rating: number;
}

interface Task {
  id: string;
  status: string;
  date: string;
  profileId: string;
}

export default function ReportsPage() {
  const [children, setChildren] = useState<Profile[]>([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [loading, setLoading] = useState(true);

  // Data for selected child
  const [quran, setQuran] = useState<QuranEntry[]>([]);
  const [skills, setSkills] = useState<SkillEntry[]>([]);
  const [books, setBooks] = useState<BookEntry[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("/api/family")
      .then((r) => r.json())
      .then((data) => {
        const profiles: Profile[] = data.profiles ?? data ?? [];
        const childProfiles = profiles.filter(
          (p) => p.role.toUpperCase() === "STUDENT"
        );
        setChildren(childProfiles);
        if (childProfiles.length > 0) {
          setSelectedChild(childProfiles[0].id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!selectedChild) return;

    // Fetch child-specific data
    Promise.all([
      fetch(`/api/quran?profileId=${selectedChild}`).then((r) => r.json()),
      fetch(`/api/skills?profileId=${selectedChild}`).then((r) => r.json()),
      fetch(`/api/books?profileId=${selectedChild}`).then((r) => r.json()),
    ])
      .then(([quranData, skillsData, booksData]) => {
        setQuran(quranData.quran ?? quranData ?? []);
        setSkills(skillsData.skills ?? skillsData ?? []);
        setBooks(booksData.books ?? booksData ?? []);
      })
      .catch(() => {});

    // Fetch tasks for last 30 days for this child
    const taskFetches: Promise<void>[] = [];
    const allT: Task[] = [];
    for (let i = 0; i < 30; i++) {
      const date = dateOffset(-i);
      taskFetches.push(
        fetch(`/api/tasks?date=${date}&profileId=${selectedChild}`)
          .then((r) => r.json())
          .then((data) => {
            const tasks: Task[] = data.tasks ?? data ?? [];
            allT.push(...tasks);
          })
          .catch(() => {})
      );
    }
    Promise.all(taskFetches).then(() => setAllTasks(allT));
  }, [selectedChild]);

  // Compute stats
  const stats = useMemo(() => {
    // Group tasks by date for completion calculation
    const tasksByDate: Record<string, Task[]> = {};
    allTasks.forEach((t) => {
      if (!tasksByDate[t.date]) tasksByDate[t.date] = [];
      tasksByDate[t.date].push(t);
    });

    const dates = Object.keys(tasksByDate);
    const avgCompletion =
      dates.length > 0
        ? Math.round(
            dates.reduce(
              (sum, d) => sum + (completionPercent(tasksByDate[d]) ?? 0),
              0
            ) / dates.length
          )
        : 0;

    const surahsMemorized = quran.filter((q) => q.ayahs > 0).length;
    const skillsMastered = skills.filter((s) => s.level === 3).length;
    const booksFinished = books.filter((b) => b.status === "FINISHED").length;

    return { avgCompletion, surahsMemorized, skillsMastered, booksFinished };
  }, [allTasks, quran, skills, books]);

  // Earned badges
  const earnedBadges = useMemo(() => {
    const earned: string[] = [];
    if (stats.surahsMemorized >= 1) earned.push("first");
    if (stats.booksFinished >= 1) earned.push("first");
    if (stats.surahsMemorized >= 3) earned.push("surah3");
    if (stats.surahsMemorized >= 10) earned.push("surah10");
    if (stats.booksFinished >= 3) earned.push("book3");
    if (stats.skillsMastered >= 5) earned.push("master5");
    // Check for perfect days
    const tasksByDate: Record<string, Task[]> = {};
    allTasks.forEach((t) => {
      if (!tasksByDate[t.date]) tasksByDate[t.date] = [];
      tasksByDate[t.date].push(t);
    });
    const perfectDays = Object.values(tasksByDate).filter(
      (t) => completionPercent(t) === 100
    ).length;
    if (perfectDays >= 1) earned.push("perfect");
    if (perfectDays >= 3) earned.push("streak3");
    if (perfectDays >= 7) earned.push("streak7");
    return earned;
  }, [stats, allTasks]);

  // Skills grouped by subject
  const skillsBySubject = useMemo(() => {
    const grouped: Record<string, SkillEntry[]> = {};
    SUBJECTS.forEach((s) => {
      grouped[s.id] = skills.filter((sk) => sk.subject === s.id);
    });
    return grouped;
  }, [skills]);

  const handlePrint = () => {
    window.print();
  };

  const selectedProfile = children.find((c) => c.id === selectedChild);

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 40 }}>
        <p className="muted">Loading reports...</p>
      </div>
    );
  }

  return (
    <>
      <div className="spread no-print" style={{ marginBottom: 14 }}>
        <h1>Reports</h1>
        <button className="btn btn-sm" onClick={handlePrint}>
          🖨️ Print
        </button>
      </div>

      {/* Child selector */}
      <div className="no-print" style={{ marginBottom: 14 }}>
        <select
          value={selectedChild}
          onChange={(e) => setSelectedChild(e.target.value)}
        >
          {children.map((c) => (
            <option key={c.id} value={c.id}>
              {c.avatar} {c.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProfile && (
        <div className="row" style={{ marginBottom: 14, gap: 12 }}>
          <span style={{ fontSize: "2rem" }}>{selectedProfile.avatar}</span>
          <div>
            <div style={{ fontWeight: 800 }}>{selectedProfile.name}</div>
            <div className="muted">
              {selectedProfile.grade || "No grade"} ·{" "}
              {selectedProfile.age ? `Age ${selectedProfile.age}` : ""}
            </div>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-stats" style={{ marginBottom: 14 }}>
        <StatCard value={`${stats.avgCompletion}%`} label="30-day avg completion" />
        <StatCard value={stats.surahsMemorized} label="Surahs memorized" />
        <StatCard value={stats.skillsMastered} label="Skills mastered" />
        <StatCard value={stats.booksFinished} label="Books finished" />
      </div>

      {/* Quran Progress */}
      <div className="card">
        <h2>Quran Progress</h2>
        {quran.length === 0 ? (
          <p className="muted">No Quran progress recorded yet</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Surah</th>
                  <th>Ayahs</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                {quran.map((q) => {
                  const [name, totalAyahs] = SURAHS[q.surahIndex] ?? [
                    `Surah ${q.surahIndex + 1}`,
                    1,
                  ];
                  const pct = Math.round((q.ayahs / totalAyahs) * 100);
                  return (
                    <tr key={q.surahIndex}>
                      <td>
                        {q.surahIndex + 1}. {name}
                      </td>
                      <td>
                        {q.ayahs}/{totalAyahs}
                      </td>
                      <td style={{ minWidth: 100 }}>
                        <ProgressBar percent={pct} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Skill Mastery */}
      {SUBJECTS.filter((s) => SKILLS[s.id]?.length).map((subject) => (
        <div className="card" key={subject.id}>
          <h2>
            {subject.icon} {subject.name} Skills
          </h2>
          {(skillsBySubject[subject.id] ?? []).length === 0 ? (
            <p className="muted">No skills tracked yet</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead>
                  <tr>
                    <th>Skill</th>
                    <th>Level</th>
                  </tr>
                </thead>
                <tbody>
                  {(SKILLS[subject.id] ?? []).map((skillName, idx) => {
                    const entry = skillsBySubject[subject.id]?.find(
                      (s) => s.skillIndex === idx
                    );
                    const level = entry?.level ?? 0;
                    return (
                      <tr key={idx}>
                        <td>{skillName}</td>
                        <td>
                          <span
                            className={`chip on-${level}`}
                            style={{ fontSize: "0.75rem" }}
                          >
                            {LEVELS[level]}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}

      {/* Reading Log */}
      <div className="card">
        <h2>📚 Reading Log</h2>
        {books.length === 0 ? (
          <p className="muted">No books logged yet</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Status</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {books.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontWeight: 700 }}>{b.title}</td>
                    <td className="muted">{b.author}</td>
                    <td>
                      <span
                        className={`tag ${
                          b.status === "FINISHED"
                            ? "tag-done"
                            : b.status === "READING"
                            ? "tag-taught"
                            : "tag-planned"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td>{b.rating > 0 ? "⭐".repeat(b.rating) : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="card">
        <h2>🏆 Badges</h2>
        <div className="badge-grid">
          {BADGE_DEFS.map((badge) => {
            const earned = earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`badge-tile${earned ? "" : " locked"}`}
                onClick={() => earned && celebrate()}
                role="button"
                tabIndex={0}
              >
                <div className="b-ico">{badge.icon}</div>
                <div className="b-name">{badge.name}</div>
                <div className="b-desc">{badge.desc}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
