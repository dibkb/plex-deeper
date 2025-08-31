import axios from "axios";

export async function googleSearch(input: string): Promise<any> {
  try {
    if (!process.env.GOOGLE_SEARCH_API_KEY) {
      throw new Error("GOOGLE_SEARCH_API_KEY is not configured");
    }
    const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
    const url = `https://www.googleapis.com/customsearch/v1`;
    const queryParams = {
      key: apiKey,
      cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
      q: input,
    };
    const response = await axios.get(url, { params: queryParams });
    if (
      !response.data ||
      !response.data.items ||
      response.data.success === false
    ) {
      throw new Error("Invalid response format from Google Search API");
    }
    const searchItems = response.data.items.map((item: any) => ({
      title: item.title,
      link: item.link,
      snippet: item.snippet,
      formattedUrl: item.formattedUrl,
    }));
    return {
      success: true,
      data: searchItems,
      error: null,
    };
  } catch (error) {
    console.error("Google Search error:", error);
    return {
      success: false,
      data: null,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
}
