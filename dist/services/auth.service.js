"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const error_interface_1 = require("../interfaces/error.interface");
const token_model_1 = require("../models/token.model");
const User_model_1 = require("../models/User.model");
const generete_token_service_1 = require("./generete.token.service");
const password_service_1 = require("./password.service");
class AuthService {
    async register(data) {
        const hashedPassword = await password_service_1.passwordService.hash(data.password);
        await User_model_1.User.create({ ...data, password: hashedPassword });
    }
    async login(data, user) {
        const isMatched = await password_service_1.passwordService.compare(data.password, user.password);
        if (!isMatched) {
            throw new error_interface_1.ApiError("Invalid email or password", 401);
        }
        const tokensPair = generete_token_service_1.generateToken.create({
            _id: user._id,
        });
        await token_model_1.Token.create({
            ...tokensPair,
            _userId: user._id,
        });
        return tokensPair;
    }
}
exports.authService = new AuthService();