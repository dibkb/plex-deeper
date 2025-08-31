import { googleSearch } from "@/src/tools/google-search";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("search");
  if (!query) {
    return NextResponse.json({ error: "Query is required" }, { status: 400 });
  }
  const response = await googleSearch(query);
  return NextResponse.json(response);
}
