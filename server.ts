/**
 * Entry Program
 */

import express from "express";
import { useMiddleware } from "./infrastructures/middlewares";
import competitionRouter from "./modules/competition/competition.routes";
import scholarshipRouter from "./modules/scholarship/scholarship.routes";
import authRouter from "./modules/auth/auth.routes";
import { DataScrapperWorker } from "./infrastructures/background-worker/data-scrapper-worker";

const app = express();
const port = 8080;

// middleware
useMiddleware(app);

// routes registry
app.use("/api/auth", authRouter);
app.use("/api/competition", competitionRouter);
app.use("/api/scholarship", scholarshipRouter);

// integrations registry

// worker registry
const scrapper = new DataScrapperWorker();
scrapper.start();

/**
 * Bootstrap!
 */
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});