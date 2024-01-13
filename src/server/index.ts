import dotenv from "dotenv";
import express, { Express } from "express";
import path from "path";
import { pino } from "pino";

import { appRouter } from "./routes";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const logger = pino({ name: "server start" });

const app: Express = express();

app.use(appRouter);

export { app, logger };
