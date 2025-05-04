import db from "./InitDataBase";

export type User = {
  id?: number;
  name: string;
  password: string;
};

export default class UserRepository {
  constructor() {
    this.up;
  }

  public async up() {
    await db.runAsync(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            password TEXT NOT NULL
        )`
    );
  }

  public async down() {
    await db.runAsync(`DROP TABLE users;`);
  }

  public async create(user: User) {
    const result = await db.runAsync(
        `INSERT INTO users (name, password) values (?, ?);`,
        [user.name, user.password]
    );
    return result.lastInsertRowId;
  }

  public async all() {
    const result = await db.getAllAsync<User>("SELECT * FROM users");
    return result;
  }
}
