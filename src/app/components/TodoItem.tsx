"use client";

import { useRouter } from "next/navigation";

async function update(id, completed, refresh) {
  await fetch(`/api/todo?id=${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, completed }),
  });

  refresh();
}

async function deleteTodo(id, refresh) {
  await fetch(`/api/todo?id=${id}`, {
    method: "DELETE",
  });

  refresh();
}

export default function Todo({ todo }) {
  const router = useRouter();

  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => update(todo.id, e.target.checked, router.refresh)}
        checked={todo.completed}
      />
      <span>{todo.task}</span>
      <button onClick={() => deleteTodo(todo.id, router.refresh)}>
        Delete
      </button>
    </>
  );
}
