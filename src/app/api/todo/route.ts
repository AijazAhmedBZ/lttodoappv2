import { NextRequest, NextResponse } from "next/server";
import { Todo, NewTodo, db, todoTable } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";

export async function POST(request: NextRequest) {
  const req = await request.json();
  try {
    if (req.task) {
      const res: NewTodo[] = await db
        .insert(todoTable)
        .values({
          task: req.task,// task is column of database and req.task is user input
          completed: false,
        })
        .returning();//whatever data we insert it will return in returning
      // console.log(res)
      return NextResponse.json({
        data: res,
        message: "Data added successfully",
      });
    } else throw new Error("Task field is required");
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: "string" }).message,
    });
  }
}

export const GET = async (request: NextRequest) => {
  try {
    await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, task varchar(255), completed boolean);`;
    const res: Todo[] = await db.select().from(todoTable).execute();
    return NextResponse.json({ data: res });
    // console.log(res)
  } catch (err) {
    console.log((err as { message: string }).message);
    return NextResponse.json({ message: "Something went wrong" });
  }
};

export const DELETE = async (request: NextRequest) => {
  const req = await request.json();
  try {
    if (req.task) {
      await db
        .delete(todoTable)
        .returning();
      return NextResponse.json({
        message: "All todos deleted successfully.",
      });
    } else throw new Error("Task field is required");
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: "string" }).message,
    });
  }
};

export const PUT = async (
  request: NextRequest
) => {
  const req = await request.json();
   try {
    if (req.task) {
      await db
        .update(todoTable)
        .set({completed: false })
        .returning();
      return NextResponse.json({
        message: "All todos updated successfully.", req});
    } else throw new Error("Task field is required");
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: "string" }).message,
    });
  }
};
