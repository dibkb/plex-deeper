import { createWorkflow } from "@mastra/core/workflows";
import { WorkflowType } from "../../type";
import {
  DetailedDescriptionWorkflowInputSchema,
  markdownGenerationInputSchema,
} from "./schema";

export const detailedDescriptionWorkflow = createWorkflow({
  id: WorkflowType.DETAILED_DESCRIPTION,
  inputSchema: DetailedDescriptionWorkflowInputSchema,
  outputSchema: markdownGenerationInputSchema,
}).commit();
