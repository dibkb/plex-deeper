import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { jsonb, pgTable, timestamp, varchar, text } from "drizzle-orm/pg-core";
import {
  GoogleSearchResults,
  ScrapedResults,
} from "./types/google-search-results";
import { Status } from "./types/status";

const tableName = "query_results" as const;

export const queryResultsTable = pgTable(tableName, {
  id: varchar({ length: 255 }).primaryKey(),
  status: varchar({ length: 255 })
    .$type<Status>()
    .notNull()
    .default(Status.PENDING),
  query: varchar({ length: 255 }).notNull(),
  scrapedResults: jsonb().$type<ScrapedResults>().default([]),
  searchResults: jsonb().$type<GoogleSearchResults[]>().notNull(),
  shortDescription: text().notNull().default(""),
  createdAt: timestamp().notNull().defaultNow(),
});

export type QueryResult = InferSelectModel<typeof queryResultsTable>;
export type NewQueryResult = InferInsertModel<typeof queryResultsTable>;
