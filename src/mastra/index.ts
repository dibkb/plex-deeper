import { Mastra } from "@mastra/core/mastra";
import { searchEngineAutoCompleteAgent } from "./agents/auto-complete";
import { detailedDescriptionWorkflow } from "./workflows/detailed-description/main";
import { markdownGenerationAgent } from "./workflows/detailed-description/agent";
export const mastra = new Mastra({
  agents: { searchEngineAutoCompleteAgent, markdownGenerationAgent },
  workflows: { detailedDescriptionWorkflow },
});
