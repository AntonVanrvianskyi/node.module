import Joi from "joi";

import { regexConstants } from "../constants/regex.constants";
import { EGenders } from "../enums/user.enum";

export class UserValidator {
  static firsName = Joi.string().min(3).max(30).trim();
  static age = Joi.number().min(10).max(80);
  static gender = Joi.valid(...Object.values(EGenders));
  static password = Joi.string().regex(regexConstants.PASSWORD).trim();
  static email = Joi.string().regex(regexConstants.EMAIL).trim();
  static checkedID = Joi.string().regex(regexConstants.ID).messages({
    "string.pattern.base": "Не коректне id",
  });

  static create = Joi.object({
    name: this.firsName.required(),
    age: this.age.required(),
    gender: this.gender.required(),
    password: this.password.required(),
    email: this.email.required(),
  });

  static update = Joi.object({
    name: this.firsName,
    age: this.age,
    gender: this.gender,
  });
  static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });
  static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
  static forgot = Joi.object({
    email: this.email.required()
  })
}
