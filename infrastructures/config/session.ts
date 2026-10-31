import { time } from "@/modules/common/helpers/time";

//--- Session Policies -----------------------------
export const SLIDING_DURATION_WINDOW = time.inDays(3)

/**
 * @returns `new Date(time.now() + time.inDays(15))`
 */
export function getNewSessionExpirationDate(): Date {
    return new Date(time.now() + time.inDays(15))
}