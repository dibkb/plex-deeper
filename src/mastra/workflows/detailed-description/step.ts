import { createStep } from "@mastra/core/workflows";
import { DETAILED_DESCRIPTION_STEPS, WorkflowType } from "../../type";
import {
  DetailedDescriptionWorkflowInputSchema,
  DetailedDescriptionWorkflowOutputSchema,
  markdownGenerationInputSchema,
} from "./schema";

export const descriptionGenerationStep = createStep({
  id: DETAILED_DESCRIPTION_STEPS["description-generation"],
  description: "Generates a detailed description of the query",
  inputSchema: DetailedDescriptionWorkflowInputSchema,
  outputSchema: DetailedDescriptionWorkflowOutputSchema,
  execute: async ({ inputData }) => {
    try {
      return {
        detailedDescription: "",
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
      return {
        markdownContent: "",
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
