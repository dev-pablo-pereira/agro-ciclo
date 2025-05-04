import db from "./InitDataBase";
import UserRepository from "./UserRepository";

export type Area = {
  id?: number;
  name: string;
  color: string;
  id_user: number
};

export default class AreaRepository {
  constructor() {
    this.up;
  }

  public async up() {
    await db.runAsync(
      `CREATE TABLE IF NOT EXISTS areas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        color TEXT,
        id_user INTEGER NOT NULL,
        FOREIGN KEY (id_user) REFERENCES users(id))`
    );
  }

  public async down() {
    await db.runAsync(`DROP TABLE areas;`);
  }

  public async create(area: Area) {
    const result = await db.runAsync(
        `INSERT INTO areas (name, color) values (?, ?, ?);`,
        [area.name, area.color, area.id_user]
    );
    return result.lastInsertRowId;
  }

  public async all() {
    const result = await db.getAllAsync<Area>("SELECT * FROM areas");
    return result;
  }
}
