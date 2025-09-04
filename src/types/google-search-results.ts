import { z } from "zod";
export interface GoogleSearchResults {
  title: string;
  link: string;
  snippet: string;
  formattedUrl: string;
}
export const ScrapedResultsSchema = z.array(
  z.object({
    title: z.string(),
    url: z.string(),
    content: z.string(),
    image: z.array(z.string()),
  })
);
export type ScrapedResults = z.infer<typeof ScrapedResultsSchema>;
