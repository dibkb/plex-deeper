import { createWorkflow } from "@mastra/core/workflows";
import { WorkflowType } from "../../type";
import {
  DetailedDescriptionWorkflowInputSchema,
  markdownGenerationInputSchema,
} from "./schema";
import { descriptionGenerationStep, markdownGenerationStep } from "./step";

export const detailedDescriptionWorkflow = createWorkflow({
  id: WorkflowType.DETAILED_DESCRIPTION,
  inputSchema: DetailedDescriptionWorkflowInputSchema,
  outputSchema: markdownGenerationInputSchema,
})
  .then(descriptionGenerationStep)
  .then(markdownGenerationStep)
  .commit();
