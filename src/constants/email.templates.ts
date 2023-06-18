import { EmailEnum } from "../enums/email.enum";

export const emailTemplates = {
  [EmailEnum.WELCOME]: {
    templateName: "register",
    subject: "Hello is my first email",
  },
};