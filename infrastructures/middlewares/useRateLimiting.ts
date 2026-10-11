/**
 * Middleware untuk rate limiting
 */

import { Request, Response, NextFunction} from "express";

export const useRateLimiting = (
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    next();
}