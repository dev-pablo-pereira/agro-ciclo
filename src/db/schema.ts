import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  password: text().notNull().unique(),
});

export const areas = sqliteTable("areas", {
  id: int().primaryKey({ autoIncrement: true }),
  id_user: int()
    .references(() => users.id)
    .notNull(),
  name: text().notNull(),
  color: text(),
});

export const coordinates = sqliteTable("coordinates", {
  id: int().primaryKey({ autoIncrement: true }),
  id_area: int()
    .references(() => areas.id)
    .notNull(),
  latitude: int().notNull(),
  longitude: int().notNull(),
});

export const products = sqliteTable("products", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  spacing: int().notNull(),
  germination: int().notNull(),
  population_ha: int().notNull(),
});
