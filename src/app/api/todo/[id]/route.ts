import { NextRequest, NextResponse } from "next/server";
import { Todo, NewTodo, db, todoTable } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const id = params.id;
  try {
    const res = await db.select().from(todoTable).where(eq(todoTable.id, id));
    return NextResponse.json({ data: res });
  } catch (err) {
    console.log((err as { message: "string" }).message);
    return NextResponse.json({ message: "Something went wtong" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  // const req = await request.json();
  const id = params.id;
  try {
    if (id) {
      const res = await db
        .delete(todoTable)
        .where(eq(todoTable.id, id))
        .returning();
      return NextResponse.json({
        message: "Data deleted successfully. deleted ID: " + id,
      });
    } else throw new Error("Task field is required");
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: "string" }).message,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  const req = await request.json();
  const id = params.id;
  const updatedValues: { task?: string; completed?: boolean } = {};
  if (req.task != null) {
    updatedValues.task = req.task;
  }
  if (req.completed != null) {
    updatedValues.completed = req.completed;
  }
  try {
    if (req.task) {
      const res = await db
        .update(todoTable)
        .set(updatedValues)
        .where(eq(todoTable.id, id))
        .returning({ id: todoTable.completed });
      //  console.log("result", res)
      return NextResponse.json({
        message: "Data updated successfully. updated ID: " + id,
        data: res,
      });
    } else throw new Error("Task field of ID is required");
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: "string" }).message,
    });
  }
}
