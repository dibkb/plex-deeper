import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { jsonb, pgTable, timestamp, varchar, text } from "drizzle-orm/pg-core";
import {
  GoogleSearchImage,
  GoogleSearchResults,
  ScrapedResults,
} from "./types/google-search-results";
import { Status } from "./types/status";
import { DetailedDescription } from "./types/detailed-description";

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
  images: jsonb().$type<GoogleSearchImage[]>().notNull().default([]),
  detailedDescription: jsonb()
    .$type<DetailedDescription[]>()
    .notNull()
    .default([]),
  createdAt: timestamp().notNull().defaultNow(),
});

export type QueryResult = InferSelectModel<typeof queryResultsTable>;
export type NewQueryResult = InferInsertModel<typeof queryResultsTable>;
