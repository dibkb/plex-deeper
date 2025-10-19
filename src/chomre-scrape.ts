import axios from "axios";
import { ScrapedResultsSchema } from "./types/google-search-results";
import { Status } from "./types/status";

export async function scrapeWebsite(
  urls: string[],
  status: Status | undefined = Status.PENDING_WEB_SCRAPING,
  id: string
) {
  // Check if we're in a browser environment
  if (typeof window === "undefined" || typeof chrome === "undefined") {
    console.warn("scrapeWebsite called in non-browser environment");
    return;
  }
  if (status === Status.PENDING_WEB_SCRAPING) {
    const extensionId = localStorage.getItem("QUERY_X_EXTENION_ID");
    if (!extensionId) {
      console.warn("No extension ID found in localStorage");
      return;
    }
    chrome.runtime.sendMessage(
      extensionId,
      { type: "SCRAPE_URLS", urls: urls.slice(0, 3) },
      async (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        const results = (response?.results)
          .filter((res: { ok: boolean }) => res.ok === true)
          .map(
            (result: {
              title: string;
              url: string;
              text: string;
              imgurl: string;
            }) => ({
              title: result?.title,
              url: result?.url,
              content: result?.text,
              image: result?.imgurl,
            })
          );
        const responseData = ScrapedResultsSchema.safeParse(results);
        if (responseData.success) {
          await axios.post(`/api/query/${id}`, {
            scrapedResults: responseData.data,
          });
        }
      }
    );
  }
}
