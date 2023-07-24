"use client";

import React, { useState } from "react";
import Image from "next/image";
import { NewTodo } from "@/lib/drizzle";
import { useRouter } from "next/navigation";

async function update(id:NewTodo, completed:NewTodo) {
await   
}






export default function DeleteTodo({ item }) {
  return (
    <>
      <input type="checkbox" onChange={(e) => update(item.id,e.target.checked)} />
      <p className="text-lg font-medium">{item.task}</p>
      <button>Delete</button>
    </>
  );
}
