import dotenv from "dotenv";
import express, { Express } from "express";
import path from "path";
import { pino } from "pino";

import { appRouter } from "@src/server/routes";
import { selectorRouter } from "@modules/selector/selectorRouter";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const logger = pino({ name: "server start" });

const app: Express = express();

app.use(appRouter);
app.use("/generate", selectorRouter);

export { app, logger };
