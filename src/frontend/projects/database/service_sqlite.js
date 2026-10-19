import sqlite3InitModule from "@sqlite.org/sqlite-wasm";

let dbInstance;

export const dbReady = (async () => {
  const sqlite3 = await sqlite3InitModule();

  dbInstance = new sqlite3.oo1.DB(":memory:");

  return dbInstance;
})();

export const db = {
  async query(sql, params = []) {
    const instance = await dbReady;
    const rows = [];

    instance.exec({
      sql,
      bind: params,
      rowMode: "object",
      callback: (row) => rows.push(row),
    });

    return { rows };
  },

  async exec(sql) {
    const instance = await dbReady;
    instance.exec(sql);
  },
};
