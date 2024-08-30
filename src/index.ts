import express, { Request, Response } from "express";
import { config } from "dotenv";
import { databaseConnection } from "./configs/db-config";

// env and app configuration
config();
databaseConnection();
const app = express();
const port: string = process.env.APPLICATION_PROT || "8000";

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
