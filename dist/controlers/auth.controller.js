"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    async register(req, res, next) {
        try {
            await auth_service_1.authService.register(req.body);
            return res.status(201).json({
                message: "user authorized",
            });
        }
        catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const tokens = await auth_service_1.authService.login(req.body, req.res.locals.user);
            return res.status(200).json({
                ...tokens,
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
