import { z } from "zod";

export const DetailedDescriptionSchema = z.object({
  heading: z.string(),
  bulletPoints: z.array(z.string()).optional(),
  paragraphs: z.array(z.string()).optional(),
});
export type DetailedDescription = z.infer<typeof DetailedDescriptionSchema>;
