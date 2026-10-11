/**
 * Middleware untuk authentikasi dan authorisasi
 */

import { Request, Response, NextFunction} from "express";

export const useAuth = (
    req: Request, 
    res: Response, 
    next: NextFunction
): void => {
    next();
}