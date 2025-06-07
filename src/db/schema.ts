import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  password: text().notNull().unique(),
});

export const areas = sqliteTable("areas", {
  id: int().primaryKey({ autoIncrement: true }),
  id_user: int().references(() => users.id).notNull(),
  name: text().notNull(),
  color: text()
});
