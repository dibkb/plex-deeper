import { z } from "zod";

export const autoCompleteSchema = z.object({
  suggestions: z.array(z.string()).min(5),
});

export type AutoCompleteResponse = z.infer<typeof autoCompleteSchema>;
