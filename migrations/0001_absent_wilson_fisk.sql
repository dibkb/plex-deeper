ALTER TABLE "query_results" ALTER COLUMN "id" DROP IDENTITY;--> statement-breakpoint
ALTER TABLE "query_results" ALTER COLUMN "id" SET DATA TYPE varchar(255) USING "id"::varchar;