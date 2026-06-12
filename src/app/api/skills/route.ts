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

    const skills = await prisma.skillProgress.findMany({
      where: { profileId },
      select: { subject: true, skillIndex: true, level: true },
      orderBy: { subject: "asc" },
    });

    return NextResponse.json(skills);
  } catch (error) {
    console.error("GET /api/skills error:", error);
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
    const { profileId, subject, skillIndex, level } = body;

    if (!profileId || !subject || skillIndex === undefined || level === undefined) {
      return NextResponse.json(
        { error: "profileId, subject, skillIndex, and level are required" },
        { status: 400 }
      );
    }

    // Verify the profile belongs to this family
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile || profile.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Invalid profile" }, { status: 403 });
    }

    const upserted = await prisma.skillProgress.upsert({
      where: {
        profileId_subject_skillIndex: { profileId, subject, skillIndex },
      },
      update: { level },
      create: { profileId, subject, skillIndex, level },
    });

    return NextResponse.json(upserted);
  } catch (error) {
    console.error("POST /api/skills error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
