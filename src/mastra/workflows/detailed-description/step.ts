import { createStep } from "@mastra/core/workflows";
import { DETAILED_DESCRIPTION_STEPS, WorkflowType } from "../../type";
import {
  DetailedDescriptionWorkflowInputSchema,
  DetailedDescriptionWorkflowOutputSchema,
  markdownGenerationInputSchema,
} from "./schema";
import { detailedDescriptionAgent, markdownGenerationAgent } from "./agent";

export const descriptionGenerationStep = createStep({
  id: DETAILED_DESCRIPTION_STEPS["description-generation"],
  description: "Generates a detailed description of the query",
  inputSchema: DetailedDescriptionWorkflowInputSchema,
  outputSchema: DetailedDescriptionWorkflowOutputSchema,
  execute: async ({ inputData }) => {
    try {
      const { query, scrapedResults } = inputData;

      const response = await detailedDescriptionAgent.generate(
        [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Query: ${query} \n Search Results: ${scrapedResults
                  .map((result) => `${result.title} \n ${result.content}`)
                  .join("\n")}`,
              },
            ],
          },
        ],
        {
          experimental_output: DetailedDescriptionWorkflowOutputSchema,
        }
      );
      const parsed = DetailedDescriptionWorkflowOutputSchema.safeParse(
        response.object
      );
      if (!parsed.success) {
        throw new Error(
          "Invalid response format from detailed description agent"
        );
      }
      const { detailedDescription } = parsed.data;
      return {
        detailedDescription,
      };
    } catch (error) {
      console.error(
        `Step 'description-generation' failed with agent 'descriptionGenerationAgent': ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return {
        detailedDescription: "",
      };
    }
  },
});

export const markdownGenerationStep = createStep({
  id: DETAILED_DESCRIPTION_STEPS["markdown-generation"],
  description: "Generates a markdown version of the detailed description",
  inputSchema: DetailedDescriptionWorkflowOutputSchema,
  outputSchema: markdownGenerationInputSchema,
  execute: async ({ inputData }) => {
    try {
      const { detailedDescription } = inputData;
      const response = await markdownGenerationAgent.generate(
        [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: detailedDescription,
              },
            ],
          },
        ],
        {
          experimental_output: markdownGenerationInputSchema,
        }
      );
      const parsed = markdownGenerationInputSchema.safeParse(response.object);
      if (!parsed.success) {
        throw new Error(
          "Invalid response format from markdown generation agent"
        );
      }
      const { markdownContent } = parsed.data;
      return {
        markdownContent,
      };
    } catch (error) {
      console.error(
        `Step 'markdown-generation' failed with agent 'markdownGenerationAgent': ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      return {
        markdownContent: "",
      };
    }
  },
});
