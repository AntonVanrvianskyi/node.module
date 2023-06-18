"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const config_1 = require("../configs/config");
const error_interface_1 = require("../interfaces/error.interface");
const action_token_model_1 = require("../models/action.token.model");
const token_model_1 = require("../models/token.model");
const generete_token_service_1 = require("../services/generete.token.service");
class AuthMiddleware {
    checkAccessToken(req, res, next) {
        try {
            const accessToken = req.get("Authorization");
            if (!accessToken) {
                throw new error_interface_1.ApiError("Token not found", 401);
            }
            const tokenPayload = generete_token_service_1.generateToken.checkToken(accessToken, config_1.configs.SECRET_ACCESS);
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
    async checkRefresh(req, res, next) {
        try {
            const refreshToken = req.get("Authorization");
            if (!refreshToken) {
                throw new error_interface_1.ApiError("No Refresh Token", 401);
            }
            const payload = generete_token_service_1.generateToken.checkToken(refreshToken, config_1.configs.SECRET_REFRESH);
            const entity = await token_model_1.Token.findOne({ refresh: refreshToken });
            if (!entity) {
                throw new error_interface_1.ApiError("Refresh token not valid", 401);
            }
            req.res.locals.oldTokenPair = entity;
            req.res.locals.tokenPayload = { _id: payload._id, name: payload.name };
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async checkActionToken(req, res, next) {
        try {
            const { token } = req.params;
            const tokenFromBd = await action_token_model_1.ActionToken.findOne({ token });
            if (!tokenFromBd) {
                throw new error_interface_1.ApiError("No Action Token", 400);
            }
            const tokenActionPayload = generete_token_service_1.generateToken.checkToken(token, config_1.configs.SECRET_ACTION);
            req.res.locals.actionTokenPayload = {
                id: tokenActionPayload._id,
            };
            next();
        }
        catch (e) {
            next(e);
        }
    }
}
exports.authMiddleware = new AuthMiddleware();
