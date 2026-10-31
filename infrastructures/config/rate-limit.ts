import { time } from "@/modules/common/helpers/time";

export const rateLimitConstraint = {
    authRequestLimit: {
        minutes: time.inMinutes(1),
        attempts: 15
    },
    dashboardRequestLimit: {
        minutes: time.inMinutes(1),
        attemps: 250
    }
} as const