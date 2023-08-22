"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

async function update(id: number, completed: boolean, refresh: any) {
  const res = await fetch(`/api/todo/${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.ok) {
    console.log("Check log", res.body, id);
  }
  refresh();
}

async function deleteTodo(id: number, refresh: any) {
  const res = await fetch(`/api/todo/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    console.log("Deleting log", res.body, id);
  }
  refresh();
}

export default function TodoItem({ todo }: any) {
  const router = useRouter();
  // const [click, setClick] = useState:<boolean>({completed:false})
  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => update(todo.id, e.target.checked, router.refresh)}
        // checked={todo.completed}
      />
      <span>{todo.task}</span>
      <button onClick={(e) => deleteTodo(todo.id, router.refresh)}>
        Delete
      </button>
    </>
  );
}
