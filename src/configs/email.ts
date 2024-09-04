import { EMAIL_TEMPLATE } from "./email-template";

const nodemailer = require("nodemailer");

export const transporter = (email: string, paasword: string) =>
  nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 465,
    secure: true,
    auth: {
      user: email,
      pass: paasword,
    },
  });

// Email options
export const mailOptions = {
  from: "dileep.r@webllisto.com",
  to: "ddr.dileepraloti@gmail.com,",
  subject: "Node.js Email Test",
  html: EMAIL_TEMPLATE,
};
