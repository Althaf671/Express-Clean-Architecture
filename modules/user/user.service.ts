/**
 * User Services
 * Bertanggung jawab untuk mengorkestrasi semua logika pembuatan, 
 * pengambilan, dan manipulasi.
 */

import type { Database } from "@/infrastructures/persistance/db";

export class UserService {
    
    constructor(private readonly db: Database) {}
}