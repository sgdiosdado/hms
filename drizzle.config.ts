import { type Config } from "drizzle-kit";

import { env } from "~/env.server";

export default {
  schema: "./app/db/schema.server.ts",
  driver: "better-sqlite",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: ["hms_*"],
} satisfies Config;
