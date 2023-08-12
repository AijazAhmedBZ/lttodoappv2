import { NextRequest, NextResponse } from "next/server";
import { Todo, NewTodo, db, todoTable } from "@/lib/drizzle";
import { sql } from "@vercel/postgres";
import { eq } from "drizzle-orm";

// export async function GET(request: NextRequest) {
//   try {
//     await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, task varchar(255), isDone boolean);`;
//     const res = await db.select().from(todoTable).execute();
//     return NextResponse.json({ data: res });
//     // console.log(res)
//   } catch (err) {
//     console.log((err as { message: "string" }).message);
//     return NextResponse.json({ message: "Something went wtong" });
//   }
// }

// export async function POST(request: NextRequest) {
//   const req = await request.json();
//   try {
//     if (req.task) {
//       const res = await db
//         .insert(todoTable)
//         .values({
//           task: req.task,
//           completed: true,
//         })
//         .returning();
//       // console.log(res)
//       return NextResponse.json({
//         message: "Data added successfully",
//         data: res,
//       });
//     } else throw new Error("Task field is required");
//   } catch (error) {
//     return NextResponse.json({
//       message: (error as { message: "string" }).message,
//     });
//   }
// }

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: Todo } }
) {
  const req = await request.json();
  const id = params.id;
  try {
    if (req.task) {
      const res = await db
        .delete(todoTable)
        .where(eq(todoTable.id, id.id))
        .returning();
    //   console.log("result", res);
      return NextResponse.json({
        message: "Data deleted successfully. updated ID: " + id,
        data: res,
      });
    } else throw new Error("Task field is required");
  } catch (error) {
    return NextResponse.json({
      message: (error as { message: "string" }).message,
    });
  }
}

// export async function PUT(
//   request: NextRequest,
//   { params }: { params: { id: Todo } }
// ) {
//   const req = await request.json();
//   const id = params.id;
//   try {
//     if (req.task) {
//       const res = await db
//         .update(todoTable)
//         .set({ task: req.task, completed: req.completed })
//         .where(eq(todoTable.id, todoTable.completed))
//         .returning({ task: todoTable.task });
//       //  console.log("result", res)
//       return NextResponse.json({
//         // message: "Data updated successfully. updated ID: " + id,
//         data: res,
//       });
//     } else throw new Error("Task field is required");
//   } catch (error) {
//     return NextResponse.json({
//       message: (error as { message: "string" }).message,
//     });
//   }
// }
