"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonMiddleware = void 0;
const error_interface_1 = require("../interfaces/error.interface");
const user_service_1 = require("../services/user.service");
const user_validator_1 = require("../validators/user.validator");
class CommonMiddleware {
    isBodyValid(validator) {
        return (req, res, next) => {
            try {
                const { value, error } = validator.validate(req.body);
                if (error) {
                    throw new error_interface_1.ApiError(error.message, 400);
                }
                req.res.locals = value;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
    isValidUpdate(req, res, next) {
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
    async userChecked(req, res, next) {
        try {
            const { email } = req.body;
            const user = await user_service_1.userService.findOne(email);
            req.user = user;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.commonMiddleware = new CommonMiddleware();