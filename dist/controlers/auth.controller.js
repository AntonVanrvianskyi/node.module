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
    async refresh(req, res, next) {
        const oldTokenPair = req.res.locals.oldTokenPair;
        const tokenPayload = req.res.locals.tokenPayload;
        try {
            const newTokenPair = await auth_service_1.authService.refresh(oldTokenPair, tokenPayload);
            res.status(201).json(newTokenPair);
        }
        catch (e) {
            next(e);
        }
    }
    async changePassword(req, res, next) {
        try {
            const { _id: userId } = req.res.locals.tokenPayload;
            await auth_service_1.authService.checkedPassword(req.body, userId);
            return res.sendStatus(201);
        }
        catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const { id } = req.res.locals.actionTokenPayload;
            await auth_service_1.authService.activate(req.body, id);
            return res.sendStatus(200);
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authController = new AuthController();
