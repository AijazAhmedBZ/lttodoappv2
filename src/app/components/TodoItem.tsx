"use client";

// import { useRouter } from "next/navigation";

async function update(id:number,completed:boolean) {
  await fetch(`/api/todo?id=${id}`, {
    method: "PUT",
    body: JSON.stringify({ id, completed}),
  });

}

async function deleteTodo(id:number) {
  await fetch(`/api/todo?id=${id}`, {
    method: "DELETE",
  });
}

export default function TodoItem({ todo }:any) {
  return (
    <>
      <input
        type="checkbox"
        onChange={(e) => update(todo.id,e.target.checked)}
        // checked={todo.completed}
      />
      <span>{todo.task}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </>
  );
}
