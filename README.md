# 🕌 Salafi Homeschool — Islamic Homeschooling Tracker

A comprehensive, mobile-first homeschool tracker for Muslim families, inspired by IXL (skill mastery) and Little Lit (reading logs). Fully functional, role-based, and runs entirely in the browser with no build step.

## 🚀 Run it

- **Locally**: open `index.html` in any browser, or run `npx serve .` for a local server.
- **GitLab Pages**: deploys automatically from the default branch via `.gitlab-ci.yml`.

All data is stored in the browser (localStorage) and ships with realistic demo data. Use **Settings → Reset demo data** to start fresh.

## 🔑 Demo logins (PIN-based)

| Role | User | PIN |
|------|------|-----|
| 🧔 Admin (Father) | Abu Yusuf | `1234` |
| 🧕 Teacher (Mother) | Umm Yusuf | `1234` |
| 👦 Student | Yusuf | `1111` |
| 👧 Student | Maryam | `2222` |
| 🧒 Student | Ibrahim | `3333` |

## 👥 Roles & features

### 🧔 Father — Admin
- **Dashboard**: family-wide stats, 7-day completion chart, per-child progress cards, falling-behind alerts, recent activity feed.
- **Planning**: plan lessons per child (or all children) by date, subject and prayer-time slot; one-tap “standard day” template; 7-day planning board. Planned tasks flow straight to the mother’s and kids’ pages.
- **Reports**: printable per-child progress report (30-day completion, Quran progress, skill mastery, reading log, badges).
- **Settings**: manage children and PINs, parent PINs, prayer-time day structure, streak rewards, and demo-data reset.

### 🧕 Mother — Teacher
- **Today**: the day’s teaching plan grouped per child; mark lessons *taught* or *done*, log assessment scores, add lesson notes, quick-add tasks, browse other days.
- **Quran**: surah/ayah-level memorization tracker for all 114 surahs.
- **Skills**: IXL-style mastery levels (Not started → Practicing → Proficient → Mastered) across Math, Science, English, Arabic, Tajweed and Islamic Studies.
- **Reading**: per-child reading log with ratings, plus a recommended Islamic children’s book list.

### 👦👧 Kids — Students
- **My Day**: their own big, colorful checklist they tick off themselves — with confetti, praise messages, streak flames and a perfect-day celebration.
- **My Stars**: earned badges (streaks, surahs, books, mastery), personal stats and weekly chart.

## 🎨 Design

- Mobile-first with bottom navigation; responsive up to desktop.
- Distinct theme per role: professional teal for the admin, warm rose for the teacher, playful purple for kids.
- Islamic-inspired geometric header pattern; print-friendly report styling.

## 🗂 Structure

```
index.html        app shell
css/styles.css    themes, components, print styles
js/data.js        curriculum data (114 surahs, skills, books) + demo seed
js/store.js       localStorage state + domain logic (streaks, badges, mastery)
js/auth.js        role-based PIN login
js/views/         admin, teacher and kid views
js/app.js         router, nav, toast and confetti
```
