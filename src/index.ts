import express from "express";
import { routes } from "./routes/index";
import logger from "./utils/logger";

const app: express.Application = express();
const port = 3000; // Default port

// Adding Routes
app.use("/api", logger, routes);
app.get("/api", logger, (_req: express.Request, res: express.Response) => {
  res.send("API endpoint");
});
app.get("/", logger, (_req: express.Request, res: express.Response) => {
  res.send("Main Api");
});

// Starting Server
app.listen(port, async (): Promise<void> => {
  console.log(`Server Running at: localhost:${port}`);
});

export { app, port };
