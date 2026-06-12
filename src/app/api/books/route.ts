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

    const books = await prisma.book.findMany({
      where: { profileId },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(books);
  } catch (error) {
    console.error("GET /api/books error:", error);
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
    const { profileId, title, author, status, rating } = body;

    if (!profileId || !title) {
      return NextResponse.json(
        { error: "profileId and title are required" },
        { status: 400 }
      );
    }

    // Verify the profile belongs to this family
    const profile = await prisma.profile.findUnique({ where: { id: profileId } });
    if (!profile || profile.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Invalid profile" }, { status: 403 });
    }

    const book = await prisma.book.create({
      data: {
        profileId,
        title,
        author: author || "",
        status: status || "READING",
        rating: rating || 0,
      },
    });

    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("POST /api/books error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
