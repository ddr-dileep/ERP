import express, { Request, Response } from "express";
import { config } from "dotenv";
import { databaseConnection } from "./configs/db-config";
import rootRouter from "./routers";
import { apiErrorResponse } from "./configs/api/api.response.config";
import { mailOptions, transporter } from "./configs/email";
import cron from "node-cron";
import cros from "cors";

// env and app configuration
config();
databaseConnection();
const app = express();
app.use(cros());
app.use(express.json());
const port: string = process.env.APPLICATION_PROT || "8000";
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_EMAIL_SECURITY = process.env.SENDER_EMAIL_SECURITY;

app.use("/api/v1", rootRouter); // root router

// if route or method is defined (i.e. not found api)
app.use((req: Request, res: Response) => {
  res
    .status(404)
    .json(apiErrorResponse("not-found", "Route or method not found"));
});

function logMessage() {
  transporter(SENDER_EMAIL!, SENDER_EMAIL_SECURITY!).sendMail(
    mailOptions,
    async (error: any, info: any) => {
      if (error) {
        return console.log(`Error: ${error}`);
      }
      console.log(`Message Sent: ${info.response}`);
    }
  );
}

// every-day 10 am mon-fri
cron.schedule("0 10 * * 1-5", () => {
  logMessage();
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
