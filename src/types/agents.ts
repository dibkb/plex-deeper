import { z } from "zod";
export const ShortDescriptionSchema = z.object({
  shortDescription: z.string().min(1),
});
export type ShortDescriptionResponse = z.infer<typeof ShortDescriptionSchema>;
