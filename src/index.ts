import express from "express";
import { config } from "dotenv";
import { databaseConnection } from "./configs/db-config";
import rootRouter from "./routers";

// env and app configuration
config();
databaseConnection();
const app = express();
app.use(express.json());
const port: string = process.env.APPLICATION_PROT || "8000";

app.use("/api/v1", rootRouter); // root router

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
