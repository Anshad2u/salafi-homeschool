import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();

    // Verify book belongs to user's family via profile
    const existing = await prisma.book.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const profile = await prisma.profile.findUnique({ where: { id: existing.profileId } });
    if (!profile || profile.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const data: any = {};
    if (body.title !== undefined) data.title = body.title;
    if (body.author !== undefined) data.author = body.author;
    if (body.status !== undefined) data.status = body.status;
    if (body.rating !== undefined) data.rating = body.rating;

    const updated = await prisma.book.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/books/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;

    // Verify book belongs to user's family via profile
    const existing = await prisma.book.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    const profile = await prisma.profile.findUnique({ where: { id: existing.profileId } });
    if (!profile || profile.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    await prisma.book.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/books/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
