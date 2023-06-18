"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const regex_constants_1 = require("../constants/regex.constants");
const user_enum_1 = require("../enums/user.enum");
class UserValidator {
}
exports.UserValidator = UserValidator;
_a = UserValidator;
UserValidator.firsName = joi_1.default.string().min(3).max(30).trim();
UserValidator.age = joi_1.default.number().min(10).max(80);
UserValidator.gender = joi_1.default.valid(...Object.values(user_enum_1.EGenders));
UserValidator.password = joi_1.default.string().regex(regex_constants_1.regexConstants.PASSWORD).trim();
UserValidator.email = joi_1.default.string().regex(regex_constants_1.regexConstants.EMAIL).trim();
UserValidator.checkedID = joi_1.default.string().regex(regex_constants_1.regexConstants.ID).messages({
    "string.pattern.base": "Не коректне id",
});
UserValidator.activate = joi_1.default.object({
    email: _a.email.required(),
});
UserValidator.create = joi_1.default.object({
    name: _a.firsName.required(),
    age: _a.age.required(),
    gender: _a.gender.required(),
    password: _a.password.required(),
    email: _a.email.required(),
});
UserValidator.update = joi_1.default.object({
    name: _a.firsName,
    age: _a.age,
    gender: _a.gender,
});
UserValidator.login = joi_1.default.object({
    email: _a.email.required(),
    password: _a.password.required(),
});
UserValidator.changePassword = joi_1.default.object({
    oldPassword: _a.password.required(),
    newPassword: _a.password.required(),
});
