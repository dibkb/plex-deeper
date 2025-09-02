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
  Given the user's query and the search results, generate a response explaining the user's query.
  Be verbose and detailed in your response. Add your own knowledge to the response. to answer the user's query. but should be grounded in the search results.
  `,
  model: openai(models.OPENAI.GPT_41_NANO),
});
