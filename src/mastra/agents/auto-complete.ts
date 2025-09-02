import { openai } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { models } from "../models";

export const searchEngineAutoCompleteAgent = new Agent({
  name: "Search Engine Auto Complete Agent",
  instructions: `
  You are a search engine auto complete model. Given the  word/phrase, generate 5 suggestions completing it.
`,
  model: openai(models.OPENAI.GPT_41_NANO),
});

export const shortDescriptionAgent = new Agent({
  name: "Short Query Explanation",
  instructions: `
  You are a short query explanation model. Given the snippets of a google search, generate a short explanation expalining the user's query.
  Output should be in markdown format.
  `,
  model: openai(models.OPENAI.GPT_41_NANO),
});
