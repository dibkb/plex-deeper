import { Mastra } from "@mastra/core/mastra";
import { searchEngineAutoCompleteAgent } from "./agents/auto-complete";
export const mastra = new Mastra({
  agents: { searchEngineAutoCompleteAgent },
});
