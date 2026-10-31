/**
 * Auth Routes
 * Bertanggung jawab membuat objek rute sekaligus DI container
 */

import { Router } from "express";
import { AuthService } from "./auth.service";
import { db } from "@/infrastructures/persistance/db";
import { AuthController } from "./auth.controller";

const authRouter = Router();

const service = new AuthService(db);
const controller = new AuthController(service);

export default authRouter;