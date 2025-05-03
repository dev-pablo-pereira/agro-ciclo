import { SQLiteDatabase } from "expo-sqlite";

export async function initDataBase(db: SQLiteDatabase) {

    await db.execAsync(`
        PRAGMA foreign_keys = ON;

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS areas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            color TEXT,
            id_user INTEGER NOT NULL,
            FOREIGN KEY (id_user) REFERENCES users(id)
        )
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS coordinate (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            latitude REAL NOT NULL,
            longitude  REAL NOT NULL,
            id_area INTEGER NOT NULL,
            FOREIGN KEY (id_area) REFERENCES areas(id)  
        )
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            spacing REAL NOT NULL,
            germination INTEGER NOT NULL,
            population_ha INTEGER NOT NULL
        )    
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS harvests (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            season TEXT NOT NULL,
            start DATE NOT NULL,
            end DATE NOT NULL
        )    
    `);

    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS cultivation (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            id_area INTEGER NOT NULL,
            id_product INTEGER NOT NULL,
            id_harvest INTEGER NOT NULL,
            planting_date DATE NOT NULL,
            FOREIGN KEY (id_area) REFERENCES areas(id)
            FOREIGN KEY (id_product) REFERENCES products(id)
            FOREIGN KEY (id_harvest) REFERENCES harvests(id)
        )
    `)
}
