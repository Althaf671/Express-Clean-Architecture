/**
 * Auth Controller
 * Bertanggung jawab atas HTTP request-response
 */

import type { AuthService } from "./auth.service";

export class AuthController {

    constructor(private readonly service: AuthService) {}
}