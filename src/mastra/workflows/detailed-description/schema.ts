import { ScrapedResultsSchema } from "@/src/types/google-search-results";
import { z } from "zod";

export const DetailedDescriptionWorkflowInputSchema = z.object({
  queryResult: z.string(),
  scrapedResults: ScrapedResultsSchema,
});
export const markdownGenerationInputSchema = z.object({
  markdownContent: z.string(),
});
export const DetailedDescriptionWorkflowOutputSchema = z.object({
  detailedDescription: z.string(),
});
