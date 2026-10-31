/**
 * Auth Services
 * Bertanggung jawab untuk mengorkestrasi semua logika pembuatan, 
 * pengambilan, dan manipulasi pada alur otentikasi.
 */

import type { Database } from "@/infrastructures/persistance/database";

export class AuthService {

    constructor(private readonly db: Database) {}
}