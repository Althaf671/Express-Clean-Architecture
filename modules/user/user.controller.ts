/**
 * User Controller
 * Bertanggung jawab atas HTTP request-response
 */


import type { UserService } from "./user.service";

export class UserController {

    constructor(private readonly service: UserService) {}
}