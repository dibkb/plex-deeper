import { DetailedDescriptionSchema } from "@/src/types/detailed-description";
import { ScrapedResultsSchema } from "@/src/types/google-search-results";
import { z } from "zod";

export const DetailedDescriptionWorkflowInputSchema = z.object({
  query: z.string(),
  scrapedResults: ScrapedResultsSchema,
});
export const markdownGenerationInputSchema = z.object({
  markdownContent: z.string(),
});
export const DetailedDescriptionWorkflowOutputSchema = z.object({
  detailedDescription: z.array(DetailedDescriptionSchema),
});
