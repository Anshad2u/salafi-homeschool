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
    const date = searchParams.get("date");
    const profileId = searchParams.get("profileId");

    if (!date) {
      return NextResponse.json({ error: "date query param is required" }, { status: 400 });
    }

    const where: any = {
      familyId: session.user.familyId,
      date,
    };

    if (profileId) {
      where.profileId = profileId;
    }

    const tasks = await prisma.task.findMany({
      where,
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("GET /api/tasks error:", error);
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
    const { profileId, subject, title, slot, date, notes } = body;

    if (!profileId || !subject || !title || !date) {
      return NextResponse.json(
        { error: "profileId, subject, title, and date are required" },
        { status: 400 }
      );
    }

    // Verify the profile belongs to this family
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile || profile.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Invalid profile" }, { status: 403 });
    }

    const task = await prisma.task.create({
      data: {
        familyId: session.user.familyId,
        profileId,
        subject,
        title,
        slot: slot || "",
        date,
        notes: notes || "",
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
