import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const queryResultsTable = pgTable("query_results", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  queryId: varchar({ length: 255 }).notNull(),
  query: varchar({ length: 255 }).notNull(),
  scrapedResults: jsonb().default({}),
  searchResults: jsonb().notNull(),
  createdAt: timestamp().notNull().defaultNow(),
});
