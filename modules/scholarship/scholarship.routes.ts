/**
 * Scholarship Routes
 * Bertanggung jawab membuat objek rute sekaligus DI container
 */

import { Router } from "express";
import { ScholarshipService } from "./scholarship.service";
import { db } from "@/infrastructures/persistance/db";
import { ScholarshipController } from "./scholarship.controller";

const scholarshipRouter = Router();

const service = new ScholarshipService(db);
const controller = new ScholarshipController(service);

export default scholarshipRouter;