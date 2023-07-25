import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";
export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey().notNull(),
  task: varchar("task", { length: 255 }).notNull(),
  completed: boolean("completed").default(false),
});

export type Todo = InferModel<typeof todoTable>;
export type NewTodo = InferModel<typeof todoTable, "insert">;

export const db = drizzle(sql);

db.insert(todoTable).values;
