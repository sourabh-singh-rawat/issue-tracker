import { Pool } from "pg";
import { PgContext } from "@sourabhrawatcc/core-utils";

let pool: Pool | null = null;
try {
  // TODO: env variables exists?
  pool = new Pool({
    host: "identity-pg-service",
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    user: process.env.POSTGRES_USER,
  });

  console.log("Identity service is connected with postgres server");
} catch (error) {
  // convert to custom error
  throw new Error("TODO: Pool creation error");
}

// TODO: is pool null?

export const pgContext = new PgContext(pool);