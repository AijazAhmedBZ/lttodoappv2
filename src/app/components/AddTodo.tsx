"use client";
import React, { useState } from "react";
import Image from "next/image";
import { NewTodo } from "@/lib/drizzle";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [task, setTask] = useState<NewTodo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { refresh } = useRouter();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({
            task: task.task,
          }),
        });
        // console.log(res.ok);
        refresh();
        setTask({ task: " " });
      }
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="w-full flex gap-x-3">
        <input
          onChange={(e) => setTask({ task: e.target.value })}
          className="rounded-full w-full py-3.5 px-5 border focus:outline-secondary"
          type="text"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="p-4 shrink-0 rounded-full bg-gradient-to-b from from-primary to to-secondary"
        >
          <Image src={"/vector.png"} width={20} height={20} alt="vector" />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;