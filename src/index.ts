import express from "express";
import { config } from "dotenv";
import { databaseConnection } from "./configs/db-config";
import rootRouter from "./routers";
import { apiErrorResponse } from "./configs/api/api.response.config";

// env and app configuration
config();
databaseConnection();
const app = express();
app.use(express.json());
const port: string = process.env.APPLICATION_PROT || "8000";

app.use("/api/v1", rootRouter); // root router

app.use((req, res) => {
  res.status(404).json(
    apiErrorResponse({
      message: "Route or method not found",
    })
  );
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
