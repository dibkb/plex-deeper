import axios from "axios";
import { ScrapedResultsSchema } from "./types/google-search-results";
import { Status } from "./types/status";
import { EXTENSION_ID } from "@/const";

export async function scrapeWebsite(
  urls: string[],
  status: Status | undefined = Status.PENDING_WEB_SCRAPING,
  id: string
) {
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
