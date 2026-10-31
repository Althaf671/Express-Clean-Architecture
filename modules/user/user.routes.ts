/**
 * User Routes
 * Bertanggung jawab membuat objek rute sekaligus DI container
 */

import { Router } from "express";
import { UserService } from "./user.service";
import { db } from "@/infrastructures/persistance/db";
import { UserController } from "./user.controller";

const userRouter = Router();

const service = new UserService(db);
const controller = new UserController(service);

export default userRouter;