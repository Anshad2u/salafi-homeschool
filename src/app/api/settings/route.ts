import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const family = await prisma.family.findUnique({
      where: { id: session.user.familyId },
      select: { settings: true },
    });

    if (!family) {
      return NextResponse.json({ error: "Family not found" }, { status: 404 });
    }

    let settings: any = {};
    try {
      settings = JSON.parse(family.settings);
    } catch {
      settings = {};
    }

    return NextResponse.json(settings);
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const family = await prisma.family.findUnique({
      where: { id: session.user.familyId },
      select: { settings: true },
    });

    if (!family) {
      return NextResponse.json({ error: "Family not found" }, { status: 404 });
    }

    let existing: any = {};
    try {
      existing = JSON.parse(family.settings);
    } catch {
      existing = {};
    }

    // Merge new settings with existing
    const merged = { ...existing, ...body };

    await prisma.family.update({
      where: { id: session.user.familyId },
      data: { settings: JSON.stringify(merged) },
    });

    return NextResponse.json(merged);
  } catch (error) {
    console.error("PATCH /api/settings error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
