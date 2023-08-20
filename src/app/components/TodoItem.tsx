"use client";

import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Todo } from "@/lib/drizzle";
async function update(id: number, completed: boolean, refresh:any) {
 await fetch(`/api/todo?id=${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, completed }),
    
  });
refresh()
}

async function deleteTodo(id: number, refresh:any) {
  await fetch(`/api/todo?id=${id}`, {
    method: "DELETE",
    body: JSON.stringify({ id }),
    
  });
  refresh()
}

export default function TodoItem({ todo }: any) {
  // const [click, setTask] = useState:<boolean>({completed:false})
  const router = useRouter()
  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => update(todo.id, e.target.checked, router.refresh)}
        // checked={todo.completed}
      />
      <span>{todo.task}</span>
      <button onClick={(e) => deleteTodo(todo.id, router.refresh)}>Delete</button>
    </>
  );
}
