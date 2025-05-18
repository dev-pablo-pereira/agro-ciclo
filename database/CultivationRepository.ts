import db from "./InitDataBase";

export type Cultivation = {
  id?: number;
  planting_date: string;
  id_area: number;
  id_product: number;
  id_harvest: number;
};

export default class CultivationRepository {
  constructor() {
    this.up;
  }

  public async up() {
    await db.runAsync(
      `CREATE TABLE IF NOT EXISTS cultivations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        planting_date DATE NOT NULL,
        id_area INTEGER NOT NULL,
        id_product INTEGER NOT NULL,
        id_harvest INTEGER NOT NULL,
        FOREIGN KEY (id_area) REFERENCES areas(id)
        FOREIGN KEY (id_product) REFERENCES products(id)
        FOREIGN KEY (id_harvest) REFERENCES harvests(id)`
    );
  }

  public async down() {
    await db.runAsync(`DROP TABLE harvests;`);
  }

  public async create(cultivation: Cultivation) {
    const result = await db.runAsync(
      `INSERT INTO cultivations (planting_date, id_area, id_product, id_harvest) values (?, ?, ?, ?);`,
      [cultivation.planting_date, cultivation.id_area, cultivation.id_product, cultivation.id_harvest]
    );
    return result.lastInsertRowId;
  }

  public async all() {
    const result = await db.getAllAsync<Cultivation>("SELECT * FROM cultivations");
    return result;
  }
}
