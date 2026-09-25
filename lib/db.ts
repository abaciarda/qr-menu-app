import "dotenv/config";
import "temporal-polyfill/full/global";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "@/prisma/contract.d";
import contractJson from "@/prisma/contract.json" with { type: "json" };

function createDb() {
  const url = process.env["DATABASE_URL"];
  if (!url) throw new Error("DATABASE_URL NOT DEFINED.");
  return postgres<Contract>({ contractJson, url });
}

const globalForDb = globalThis as unknown as { db?: ReturnType<typeof createDb> };

export const db = globalForDb.db ?? createDb();
if (process.env.NODE_ENV !== "production") globalForDb.db = db;