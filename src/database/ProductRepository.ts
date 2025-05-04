import db from "./InitDataBase";

export type Product = {
  id?: number;
  name: string;
  spacing: number;
  germination: number;
  population_ha: number
};

export default class ProductRepository {
  constructor() {
    this.up;
  }

  public async up() {
    await db.runAsync(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        spacing REAL NOT NULL,
        germination INTEGER NOT NULL,
        population_ha INTEGER NOT NULL`
    );
  }

  public async down() {
    await db.runAsync(`DROP TABLE products;`);
  }

  public async create(product: Product) {
    const result = await db.runAsync(
        `INSERT INTO products (name, spacing, germination, population_ha) values (?, ?, ?, ?);`,
        [product.name, product.spacing, product.germination, product.population_ha]
    );
    return result.lastInsertRowId;
  }

  public async all() {
    const result = await db.getAllAsync<Product>("SELECT * FROM products");
    return result;
  }
}
