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

    // Verify task belongs to user's family
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const data: any = {};
    if (body.status !== undefined) {
      data.status = body.status;
      data.doneAt = body.status === "DONE" ? new Date() : null;
    }
    if (body.score !== undefined) {
      data.score = body.score;
    }
    if (body.notes !== undefined) {
      data.notes = body.notes;
    }

    const updated = await prisma.task.update({
      where: { id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PATCH /api/tasks/[id] error:", error);
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

    // Verify task belongs to user's family
    const existing = await prisma.task.findUnique({ where: { id } });
    if (!existing || existing.familyId !== session.user.familyId) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    await prisma.task.delete({ where: { id } });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/tasks/[id] error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
