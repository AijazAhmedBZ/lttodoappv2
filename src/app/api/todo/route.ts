import { NextRequest, NextResponse } from "next/server";
import {Todo, NewTodo, db, toddoTable} from "@/lib/drizzle"
import { sql } from '@vercel/postgres';


export async function GET(request:NextRequest){
 
 try{
    await sql`CREATE TABLE IF NOT EXISTS Todos(id serial, task varchar(255), isDone boolean);`
    const res = await db.select().from(toddoTable).execute()

    res
    return NextResponse.json({ data: res})
    console.log(res)
} catch (err) {
    console.log((err as {message: "string"}).message)
    return NextResponse.json({message:"Something went wtong"})
} 
}

export async function POST(request:NextRequest){
 const req = await request.json();
try {
    if (req.task){
        const res = await db.insert(toddoTable).values({
            task:req.task,
        }).returning()
        console.log(res)
        return NextResponse.json({message: "Data added successfully", data: res})
    }else
    throw new Error ("Task field is required")
} catch (error) {
    return NextResponse.json({message: (error as {message:"string"}).message})
    
}
}