"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EEmail = exports.EmailEnum = void 0;
var EmailEnum;
(function (EmailEnum) {
    EmailEnum[EmailEnum["WELCOME"] = 0] = "WELCOME";
    EmailEnum[EmailEnum["Forgot"] = 1] = "Forgot";
})(EmailEnum || (exports.EmailEnum = EmailEnum = {}));
var EEmail;
(function (EEmail) {
    EEmail[EEmail["Forgot"] = 0] = "Forgot";
    EEmail[EEmail["Register"] = 1] = "Register";
})(EEmail || (exports.EEmail = EEmail = {}));
