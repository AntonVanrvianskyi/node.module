"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const user_validator_1 = require("../validators/user.validator");
class UserMiddleware {
    isValidCreate(req, res, next) {
        try {
            const { error, value } = user_validator_1.UserValidator.create.validate(req.body);
            if (error) {
                throw new Error(error.message);
            }
            req.res.locals = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isValidUpdate(req, res, next) {
        try {
            const { error, value } = user_validator_1.UserValidator.update.validate(req.body);
            if (error) {
                throw new Error(error.message);
            }
            req.res.locals = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
    isIdValid(req, res, next) {
        try {
            const { id } = req.params;
            const { error, value } = user_validator_1.UserValidator.checkedID.validate(id);
            if (error) {
                throw new Error(error.message);
            }
            req.id = value;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
