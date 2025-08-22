import { NextResponse } from "next/server";
import { searchEngineAutoCompleteAgent } from "@/src/mastra/agents/auto-complete";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { z } from "zod";
const schema = z.object({
  suggestions: z.array(z.string()).min(5),
});
export type AutoCompleteResponse = z.infer<typeof schema>;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }
  const response = await searchEngineAutoCompleteAgent.generate(
    [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Instructions: ${query}`,
          },
        ],
      },
    ],
    {
      experimental_output: {
        type: "object",
        properties: {
          suggestions: {
            type: "array",
            items: { type: "string" },
            minItems: 5,
          },
        },
        required: ["suggestions"],
        additionalProperties: false,
      } as any,
    }
  );
  const parsed = schema.safeParse(response.object);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
  return NextResponse.json(parsed.data);
}
