"use client";
import React, { useState } from "react";
import Image from "next/image";
import { NewTodo } from "@/lib/drizzle";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [task, setTask] = useState<NewTodo| null>(null); // task is a variable for storing state, <NewTodo | null is the type of useState
  // console.log(task) this will consol onchange of task field
  
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleSubmit = async () => {
    alert(`You are about to add new task "${task?.task}"`);
    try {
      setLoading(!loading);
      if (task) {
        const res = await fetch("/api/todo", {
          method: "POST",
          body: JSON.stringify({
            task: task.task,//task"is state variable".task is database field name
          }),
        });
      }
      router.refresh();//refresh is used to refresh component
      setTask({ task: "" });
      setLoading(false);
    } catch (error) {
    } {
    }
  };

  return (
    <div>
      <form className="w-full flex gap-x-3">
        <input
          type="text"
          placeholder="Please Add Task...."
          onChange={(e) => setTask({ task: e.target.value })}//callback function
          className="rounded-full w-full py-3.5 px-5 border focus:outline-secondary"
        />
        <button
          type="button"
          onClick={handleSubmit}
          // onMouseEnter={handleSubmit} on mouse hover on button handleSubmit will call
          className="p-4 shrink-0 rounded-full bg-gradient-to-b from from-primary to to-secondary"
        >
          <Image src={"/vector.png"} width={20} height={20} alt="vector" />
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
