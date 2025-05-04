import db from "./InitDataBase";

export type Harvest = {
  id?: number;
  name: string;
  season: string;
  start: string;
  end: string;
};

export default class HarvestRepository {
  constructor() {
    this.up;
  }

  public async up() {
    await db.runAsync(
      `CREATE TABLE IF NOT EXISTS harvests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        season TEXT NOT NULL,
        start DATE NOT NULL,
        end DATE NOT NULL`
    );
  }

  public async down() {
    await db.runAsync(`DROP TABLE harvests;`);
  }

  public async create(havert: Harvest) {
    const result = await db.runAsync(
      `INSERT INTO haverts (name, season, start, end) values (?, ?, ?, ?);`,
      [havert.name, havert.season, havert.start, havert.end]
    );
    return result.lastInsertRowId;
  }

  public async all() {
    const result = await db.getAllAsync<Harvest>("SELECT * FROM haverts");
    return result;
  }
}
