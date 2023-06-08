"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const error_interface_1 = require("../interfaces/error.interface");
const user_service_1 = require("../services/user.service");
const user_validator_1 = require("../validators/user.validator");
const User_model_1 = require("../models/User.model");
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
            const { id } = req.params;
            const findUser = await user_service_1.userService.findById(id);
            if (!findUser) {
                throw new error_interface_1.ApiError("User not found", 400);
            }
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
            console.log(req.id);
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async isDeleteValid(req, res, next) {
        try {
            const { id } = req.params;
            const findUser = await User_model_1.User.findById(id);
            if (!findUser) {
                throw new error_interface_1.ApiError("User not found", 400);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
