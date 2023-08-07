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
          task: req.task,
          completed: false,
        })
        .returning();
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

export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: Todo } }
) => {
  const req = await request.json();
  const taskId = params.id;
  try {
    if (req.task) {
      const res = await db
        .delete(todoTable)
        .where(eq(todoTable.id, taskId.id))
        .returning({ task: todoTable.task });
      // console.log("result", res);
      return NextResponse.json({
        message: "Data deleted successfully. updated ID: " + taskId,
        data: res,
      });
    } else throw new Error("Task field is required");
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: "string" }).message,
    });
  }
};

// export const PUT = async (
//   request: NextRequest,
//   { params }: { params: { id: Todo } }
// ) => {
//   const req = await request.json();
//   const taskId = params.id;
//   try {
//     if (req.task) {
//       const res = await db
//         .update(todoTable)
//         .set({completed: req.completed })
//         .where(eq(todoTable.id, taskId.id))
//         .returning({ task: todoTable.completed });
//       //  console.log("result", res)
//       return NextResponse.json({
//         message: "Data updated successfully. updated ID: " + taskId,
//         data: res,
//       });
//     } else throw new Error("Task field is required");
//   } catch (error) {
//     return NextResponse.json({
//       message: (error as { message: "string" }).message,
//     });
//   }
// };
