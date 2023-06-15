"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const error_interface_1 = require("../interfaces/error.interface");
const User_model_1 = require("../models/User.model");
class UserMiddleware {
    async emailCheck(req, res, next) {
        try {
            const { email } = req.body;
            const userEmail = await User_model_1.User.findOne({ email });
            if (userEmail) {
                throw new error_interface_1.ApiError("Користувач вже існує", 401);
            }
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
