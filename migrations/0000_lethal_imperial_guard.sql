CREATE TABLE "query_results" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "query_results_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"status" varchar(255) DEFAULT 'pending' NOT NULL,
	"query" varchar(255) NOT NULL,
	"scrapedResults" jsonb DEFAULT '[]'::jsonb,
	"searchResults" jsonb NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
