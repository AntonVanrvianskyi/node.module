"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const error_interface_1 = require("../interfaces/error.interface");
const token_model_1 = require("../models/token.model");
const generete_token_service_1 = require("../services/generete.token.service");
class AuthMiddleware {
    checkToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new error_interface_1.ApiError("Token not found", 401);
            }
            const tokenPayload = generete_token_service_1.generateToken.checkToken(accessToken);
            const entity = token_model_1.Token.findOne({ access: accessToken });
            if (!entity) {
                throw new error_interface_1.ApiError("Token not valid", 401);
            }
            req.res.locals.tokenPayload = tokenPayload;
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
