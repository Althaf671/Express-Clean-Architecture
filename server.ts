/**
 * Entry Program
 */

import express from "express";
import studentRouter from "./modules/student/student.routes";
import { useMiddleware } from "./infrastructures/middlewares";

const app = express();
const port = 8080;

// middleware
useMiddleware(app);

// routes registry
app.use("/api/student", studentRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});