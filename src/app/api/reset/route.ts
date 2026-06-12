import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const familyId = session.user.familyId;

    // Delete all family data in order (foreign key constraints)
    await prisma.book.deleteMany({
      where: { profile: { familyId } },
    });
    await prisma.skillProgress.deleteMany({
      where: { profile: { familyId } },
    });
    await prisma.quranProgress.deleteMany({
      where: { profile: { familyId } },
    });
    await prisma.task.deleteMany({ where: { familyId } });
    await prisma.profile.deleteMany({ where: { familyId } });

    // Re-create seed data inline (simplified)
    const STD_DAY: [string, string, string][] = [
      ["quran", "Memorize new ayahs", "After Fajr"],
      ["adhkar", "Morning adhkar", "After Fajr"],
      ["math", "Math practice", "Morning"],
      ["english", "Reading & phonics", "Morning"],
      ["arabic", "Arabic letters & words", "After Dhuhr"],
      ["islamic", "Seerah story time", "After Dhuhr"],
      ["reading", "Read a book for 15 minutes", "After Asr"],
    ];

    const dateOff = (off: number): string => {
      const d = new Date();
      d.setDate(d.getDate() + off);
      return d.toISOString().slice(0, 10);
    };

    // Create profiles
    const admin = await prisma.profile.create({
      data: { familyId, role: "ADMIN", name: "Abu Yusuf (Father)", avatar: "🧔", pin: "1234" },
    });
    const teacher = await prisma.profile.create({
      data: { familyId, role: "TEACHER", name: "Umm Yusuf (Mother)", avatar: "🧕", pin: "1234" },
    });
    const yusuf = await prisma.profile.create({
      data: { familyId, role: "STUDENT", name: "Yusuf", avatar: "👦", pin: "1111", age: 9, grade: "Grade 3" },
    });
    const maryam = await prisma.profile.create({
      data: { familyId, role: "STUDENT", name: "Maryam", avatar: "👧", pin: "2222", age: 7, grade: "Grade 1" },
    });
    const ibrahim = await prisma.profile.create({
      data: { familyId, role: "STUDENT", name: "Ibrahim", avatar: "🧒", pin: "3333", age: 5, grade: "KG" },
    });

    const kids = [yusuf, maryam, ibrahim];

    // Create tasks
    let taskCounter = 0;
    const allTasks: any[] = [];

    for (const kid of kids) {
      for (const off of [-2, -1]) {
        for (const [subject, title, slot] of STD_DAY) {
          taskCounter++;
          allTasks.push({
            familyId,
            profileId: kid.id,
            subject,
            title,
            slot,
            date: dateOff(off),
            status: "DONE",
            doneAt: new Date(Date.now() - taskCounter * 60000),
          });
        }
      }
      for (let i = 0; i < STD_DAY.length; i++) {
        const [subject, title, slot] = STD_DAY[i];
        taskCounter++;
        const status = i < 2 ? "DONE" : i < 4 ? "TAUGHT" : "PLANNED";
        allTasks.push({
          familyId,
          profileId: kid.id,
          subject,
          title,
          slot,
          date: dateOff(0),
          status,
          doneAt: status === "DONE" ? new Date(Date.now() - taskCounter * 60000) : null,
        });
      }
      for (const [subject, title, slot] of STD_DAY) {
        taskCounter++;
        allTasks.push({
          familyId,
          profileId: kid.id,
          subject,
          title,
          slot,
          date: dateOff(1),
          status: "PLANNED",
        });
      }
    }

    await prisma.task.createMany({ data: allTasks });

    // Quran progress
    const quranData: Record<string, Record<number, number>> = {
      [yusuf.id]: { 0: 7, 113: 5, 112: 4, 111: 6, 110: 3, 109: 5, 108: 3, 107: 7, 106: 4, 105: 5, 104: 2 },
      [maryam.id]: { 0: 7, 113: 5, 112: 4, 111: 6, 110: 3 },
      [ibrahim.id]: { 0: 7, 113: 5, 112: 2 },
    };

    for (const [profileId, surahs] of Object.entries(quranData)) {
      for (const [surahIndex, ayahs] of Object.entries(surahs)) {
        await prisma.quranProgress.create({
          data: { profileId, surahIndex: Number(surahIndex), ayahs },
        });
      }
    }

    // Skill mastery
    const masteryData: Record<string, Record<string, number>> = {
      [yusuf.id]: {
        "math:0": 3, "math:1": 3, "math:2": 2, "math:3": 2, "math:4": 1,
        "english:0": 3, "english:1": 3, "english:2": 2,
        "arabic:0": 3, "arabic:1": 2,
        "tajweed:0": 1,
        "islamic:0": 3, "islamic:1": 3, "islamic:2": 3,
        "science:0": 2,
      },
      [maryam.id]: {
        "math:0": 3, "math:1": 2,
        "english:0": 3, "english:1": 2,
        "arabic:0": 2,
        "islamic:0": 3, "islamic:2": 2,
        "science:0": 1,
      },
      [ibrahim.id]: {
        "math:0": 1,
        "english:0": 1,
        "arabic:0": 1,
        "islamic:0": 2,
      },
    };

    for (const [profileId, skills] of Object.entries(masteryData)) {
      for (const [key, level] of Object.entries(skills)) {
        const [subject, skillIndex] = key.split(":");
        await prisma.skillProgress.create({
          data: { profileId, subject, skillIndex: Number(skillIndex), level },
        });
      }
    }

    // Books
    await prisma.book.createMany({
      data: [
        { profileId: yusuf.id, title: "Migo and Ali: Love for the Prophets", author: "Zanib Mian", status: "FINISHED", rating: 5 },
        { profileId: yusuf.id, title: "My First Quran Storybook", author: "Saniyasnain Khan", status: "READING", rating: 0 },
        { profileId: maryam.id, title: "Ilyas and Duck Search for Allah", author: "Omar Khawaja", status: "FINISHED", rating: 4 },
        { profileId: ibrahim.id, title: "Allah Made Everything", author: "Zain Bhikha", status: "READING", rating: 0 },
      ],
    });

    return NextResponse.json({ ok: true, message: "Demo data reset complete" });
  } catch (error) {
    console.error("POST /api/reset error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
