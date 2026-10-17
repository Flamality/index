import { PGlite } from "@electric-sql/pglite";

export const db = new PGlite("idb://my-database");

export const dbReady = db.waitReady;
