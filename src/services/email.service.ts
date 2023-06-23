import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

import { emailTemplates } from "../constants/email.templates";
import { EmailEnum } from "../enums/email.enum";
import { ApiError } from "../interfaces/error.interface";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No-reply",
      service: "gmail",
      auth: {
        user: "varvanskijanton7@gmail.com",
        pass: "cphaybnsvcjymtrj",
      },
    });
    const hbsOptions = {
      viewEngine: {
        extname: ".hbs",
        defaultLayout: "main",
        layoutsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "layouts"
        ),
        partialsDir: path.join(
          process.cwd(),
          "src",
          "email-templates",
          "partials"
        ),
      },
      viewPath: path.join(process.cwd(), "src", "email-templates", "views"),
      extName: ".hbs",
    };
    this.transporter.use("compile", hbs(hbsOptions));
  }
  public async send(
    email: string,
    emailAction: EmailEnum,
    context: Record<string, string | number> = {}
  ) {
    try {
      const { templateName, subject } = emailTemplates[emailAction];
      const mailOptions = {
        to: email,
        subject,
        template: templateName,
        context,
      };
      return this.transporter.sendMail(mailOptions);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const emailService = new EmailService();
