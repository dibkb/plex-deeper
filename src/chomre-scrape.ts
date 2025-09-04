// @ts-nocheck
import axios from "axios";
import { ScrapedResultsSchema } from "./types/google-search-results";
import { Status } from "./types/status";

export async function scrapeWebsite(
  urls: string[],
  status: Status | undefined = Status.PENDING_WEB_SCRAPING,
  id: string
) {
  const EXTENSION_ID = "hllpaboeikojhlocchflcampbcccjjaa";
  if (status === Status.PENDING_WEB_SCRAPING) {
    chrome.runtime.sendMessage(
      EXTENSION_ID,
      { type: "SCRAPE_URLS", urls: urls.slice(0, 3) },
      async (response) => {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
        const results = (response?.results)
          .filter((res: any) => res.ok === true)
          .map((result: any) => ({
            title: result?.title,
            url: result?.url,
            content: result?.text,
            image: result?.imgurl,
          }));
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
