/**
 * Student Routes
 * Bertanggung jawab membuat objek rute sekaligus DI container
 */

import { Router } from "express";
import { StudentController } from "./student.controllers";
import { StudentService } from "./student.services";
import { db } from "../../infrastructures/persistances/db";

// inisiasi route
const studentRouter = Router();

/**
 * Manual Dependecy Injection - scoped lifetime:
 * 1. Buat objek service dan teruskan objek database ke dalamnya
 * 2. Buat objek controller dan teruskan objek service ke dalamnya
 */
const service = new StudentService(db);
const controller = new StudentController(service);

// buat rute POST dan masukan controller student
studentRouter.post("/", controller.create.bind(controller));

// buat rute GET dan masukan controller student
studentRouter.get("/name/:name", controller.getByName.bind(controller));
studentRouter.get("/list", controller.getAll.bind(controller));

export default studentRouter;