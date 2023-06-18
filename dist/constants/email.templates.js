"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplates = void 0;
const email_enum_1 = require("../enums/email.enum");
exports.emailTemplates = {
    [email_enum_1.EmailEnum.WELCOME]: {
        templateName: "register",
        subject: "Hello is my first email",
    },
};
