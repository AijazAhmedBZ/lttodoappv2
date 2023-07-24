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
export const toddoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  task: varchar("task", { length: 255 }).notNull(),
  completed: boolean("completed").default(false),
});

export type Todo = InferModel<typeof toddoTable>;
export type NewTodo = InferModel<typeof toddoTable, "insert">;

export const db = drizzle(sql);

db.insert(toddoTable).values;
