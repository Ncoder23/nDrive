import { 
  int, 
  text, 
  mysqlTable as singlestoreTable,
  bigint 
} from "drizzle-orm/mysql-core";

export const users = singlestoreTable("users_table", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});
