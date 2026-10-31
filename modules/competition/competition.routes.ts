/**
 * Competition Routes
 * Bertanggung jawab membuat objek rute sekaligus DI container
 */

import { Router } from "express";
import { CompetitionService } from "./competition.service";
import { db } from "@infrastructure/persistance/db";
import { CompetitionController } from "./competition.controller";

const competitionRouter = Router();

const service = new CompetitionService(db);
const controller = new CompetitionController(service);

export default competitionRouter;
