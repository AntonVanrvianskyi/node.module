"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const email_enum_1 = require("../enums/email.enum");
const error_interface_1 = require("../interfaces/error.interface");
const User_model_1 = require("../models/User.model");
class UserMiddleware {
    emailCheck(type) {
        return async (req, res, next) => {
            try {
                const { email } = req.body;
                const userEmail = await User_model_1.User.findOne({ email });
                switch (type) {
                    case email_enum_1.EEmail.Register: {
                        if (userEmail) {
                            throw new error_interface_1.ApiError("Користувач вже існує", 401);
                        }
                        break;
                    }
                    case email_enum_1.EEmail.Forgot: {
                        if (!userEmail) {
                            throw new error_interface_1.ApiError("User not found", 400);
                        }
                        break;
                    }
                }
                req.body = userEmail;
                next();
            }
            catch (e) {
                next(e);
            }
        };
    }
}
exports.userMiddleware = new UserMiddleware();
