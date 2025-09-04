import { createWorkflow } from "@mastra/core/workflows";
import { WorkflowType } from "../../type";
import {
  DetailedDescriptionWorkflowInputSchema,
  DetailedDescriptionWorkflowOutputSchema,
} from "./schema";
import { descriptionGenerationStep, markdownGenerationStep } from "./step";

export const detailedDescriptionWorkflow = createWorkflow({
  id: WorkflowType.DETAILED_DESCRIPTION,
  inputSchema: DetailedDescriptionWorkflowInputSchema,
  outputSchema: DetailedDescriptionWorkflowOutputSchema,
})
  .then(descriptionGenerationStep)
  .then(markdownGenerationStep)
  .commit();
