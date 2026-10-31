import { time } from "../helpers/time";

export const SCRAPING_WORKER = {
    INTERVAL: time.inHours(6),
    ATTEMP_LIMIT: 5
}