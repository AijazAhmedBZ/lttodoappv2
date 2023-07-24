import { NewTodo, db, toddoTable } from "@/lib/drizzle";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request:NextRequest, {params}: {params:{id:NewTodo}}){
    const req = await request.json();
const id= params.id
    try {
       if (req.task){
           const res = await db.update(toddoTable).set({
               task:req.task,
           }).returning()
        //    console.log(res)
           return NextResponse.json({message: "Data updated successfully. updated ID: "+id, data: res})
       }else
       throw new Error ("Task field is required")
   } catch (error) {
       return NextResponse.json({message: (error as {message:"string"}).message})
       
   }
   }

// export const PUT = async (
//   request: NextRequest,
//   { params }: { params: { id: NewTodo } }
// ) => {
// const id = params.id
//     return NextResponse.json({message:"PUT request successful. Id updqated is:" 
// +id})
// }

// export const DELETE = async (
//     request: NextRequest,
//     { params }: { params: { id: NewTodo } }
//   ) => {
//   const id = params.id
//   console.log(id, "yeh yo dekho")
//       return NextResponse.json({message:"Delete request successful. Id updqated is:" 
//   +id})
//   }


//   const req = await request.json();
//   try {
//     if (req.task) {
//       const res = await db
//         .update(toddoTable)
//         .set({
//           task: req.task,
//           completed: req.completed,
//         })
//         .returning();
//       console.log(res);
//       return NextResponse.json({
//         message: "Data updated successfully",
//         data: res,
//       });
//     } else throw new Error("Task field is required");
//   } catch (error) {
//     return NextResponse.json({
//       message: (error as { message: "string" }).message,
//     });
//   }
// };
// export default PUT;
