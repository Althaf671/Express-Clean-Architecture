/**
 * Entry point middleware
 * Berjalan dengan sequence
 */

import express, { Express } from "express";
import { useRateLimiting } from "./useRateLimiting";

export const useMiddleware = (app: Express) => {
    app.use(express.json());
    app.use(useRateLimiting),
    app.use(useRateLimiting)
}