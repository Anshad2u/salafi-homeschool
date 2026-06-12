import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Public endpoint — returns profiles for the login screen.
 * No auth required. Does NOT expose PINs.
 */
export async function GET() {
  try {
    const profiles = await prisma.profile.findMany({
      select: {
        id: true,
        name: true,
        avatar: true,
        role: true,
        grade: true,
        age: true,
      },
      orderBy: { role: "asc" },
    });

    return NextResponse.json(profiles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load profiles" },
      { status: 500 }
    );
  }
}
