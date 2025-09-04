ALTER TABLE "query_results" DROP COLUMN "detailedDescription";
ALTER TABLE "query_results" ADD COLUMN "detailedDescription" jsonb DEFAULT '[]'::jsonb NOT NULL;