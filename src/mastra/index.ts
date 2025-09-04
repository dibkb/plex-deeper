import { Mastra } from "@mastra/core/mastra";
import { searchEngineAutoCompleteAgent } from "./agents/auto-complete";
import { detailedDescriptionWorkflow } from "./workflows/detailed-description/main";
export const mastra = new Mastra({
  agents: { searchEngineAutoCompleteAgent },
  workflows: { detailedDescriptionWorkflow },
});
