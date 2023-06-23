import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import * as path from "path";

import { emailTemplates } from "../constants/email.templates";
import { EmailEnum } from "../enums/email.enum";

class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      from: "No-reply",
      service: "gmail",
      auth: {
        user: "varvanskijanton7@gmail.com",
        pass: "gzdugpnmqbrrwekg",
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
    const { templateName, subject } = emailTemplates[emailAction];
    const mailOptions = {
      to: email,
      subject,
      template: templateName,
      context,
    };
    return this.transporter.sendMail(mailOptions);
  }
}

export const emailService = new EmailService();
