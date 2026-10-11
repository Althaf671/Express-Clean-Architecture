/**
 * Entry Program
 */

import express from "express";
import studentRouter from "./modules/student/student.routes";

const app = express();
const port = 8080;

// middlewares
app.use(express.json());

// routes registry
app.use("/api/student", studentRouter)

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});