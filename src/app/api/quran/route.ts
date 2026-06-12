import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const profileId = searchParams.get("profileId");

    if (!profileId) {
      return NextResponse.json({ error: "profileId query param is required" }, { status: 400 });
    }

    // Verify the profile belongs to this family
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile || profile.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Invalid profile" }, { status: 403 });
    }

    const quran = await prisma.quranProgress.findMany({
      where: { profileId },
      select: { surahIndex: true, ayahs: true },
      orderBy: { surahIndex: "asc" },
    });

    return NextResponse.json(quran);
  } catch (error) {
    console.error("GET /api/quran error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { profileId, surahIndex, ayahs } = body;

    if (!profileId || surahIndex === undefined || ayahs === undefined) {
      return NextResponse.json(
        { error: "profileId, surahIndex, and ayahs are required" },
        { status: 400 }
      );
    }

    // Verify the profile belongs to this family
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile || profile.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Invalid profile" }, { status: 403 });
    }

    const upserted = await prisma.quranProgress.upsert({
      where: {
        profileId_surahIndex: { profileId, surahIndex },
      },
      update: { ayahs },
      create: { profileId, surahIndex, ayahs },
    });

    return NextResponse.json(upserted);
  } catch (error) {
    console.error("POST /api/quran error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
