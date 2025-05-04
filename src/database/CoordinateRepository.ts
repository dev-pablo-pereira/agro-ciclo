import db from "./InitDataBase";

export type Coordinate = {
  id?: number;
  latitude: number;
  longitude: number;
  id_area: number
};

export default class CoordinateRepository {
  constructor() {
    this.up;
  }

  public async up() {
    await db.runAsync(
      `CREATE TABLE IF NOT EXISTS coordinates (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude REAL NOT NULL,
        longitude REAL,
        id_user INTEGER NOT NULL,
        FOREIGN KEY (id_area) REFERENCES areas(id))`
    );
  }

  public async down() {
    await db.runAsync(`DROP TABLE coordinates;`);
  }

  public async create(coordinate: Coordinate) {
    const result = await db.runAsync(
        `INSERT INTO coordinates (name, color) values (?, ?, ?);`,
        [coordinate.latitude, coordinate.longitude, coordinate.id_area]
    );
    return result.lastInsertRowId;
  }

  public async all() {
    const result = await db.getAllAsync<Coordinate>("SELECT * FROM coordinates");
    return result;
  }
}
