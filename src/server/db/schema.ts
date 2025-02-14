import "server-only";

import { 
  int, 
  text, 
  mysqlTable as singlestoreTable,
  bigint,
  index,
} from "drizzle-orm/mysql-core";

// export const users = singlestoreTable("users_table", {
//   id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//   name: text("name"),
//   age: int("age"),
// });


export const files = singlestoreTable("files_table", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  url: text("url").notNull(),
  size: bigint("size", { mode: "number" }).notNull(),
  parent: bigint("parent", { mode: "number" }).notNull(),
}, (t) => ({
  parentIdx: index("parent_idx").on(t.parent),
}));

export const folders = singlestoreTable("folders_table", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name").notNull(),
  parent: bigint("parent", { mode: "number" }),
}, (t) => ({
  parentIdx: index("parent_idx").on(t.parent),
}));

