import { createWorkflow } from "@mastra/core/workflows";
import { WorkflowType } from "../../type";
import {
  DetailedDescriptionWorkflowInputSchema,
  DetailedDescriptionWorkflowOutputSchema,
  markdownGenerationInputSchema,
} from "./schema";
import { descriptionGenerationStep } from "./step";

export const detailedDescriptionWorkflow = createWorkflow({
  id: WorkflowType.DETAILED_DESCRIPTION,
  inputSchema: DetailedDescriptionWorkflowInputSchema,
  outputSchema: DetailedDescriptionWorkflowOutputSchema,
})
  .then(descriptionGenerationStep)
  .commit();
