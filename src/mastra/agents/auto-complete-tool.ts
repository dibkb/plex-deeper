import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import models from "../models";

export const searchEngineAutoCompleteAgent = new Agent({
  name: "Search Engine Auto Complete Agent",
  instructions: `
  You are a search engine auto complete model. Given the  word/phrase, generate 10 suggestions completing it.
`,
  model: openai(models.OPENAI.GPT_41_NANO),
});
