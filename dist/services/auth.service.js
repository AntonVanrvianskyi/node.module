"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const email_enum_1 = require("../enums/email.enum");
const error_interface_1 = require("../interfaces/error.interface");
const action_token_model_1 = require("../models/action.token.model");
const token_model_1 = require("../models/token.model");
const User_model_1 = require("../models/User.model");
const email_service_1 = require("./email.service");
const generete_token_service_1 = require("./generete.token.service");
const password_service_1 = require("./password.service");
class AuthService {
    async register(data) {
        const hashedPassword = await password_service_1.passwordService.hash(data.password);
        await User_model_1.User.create({ ...data, password: hashedPassword });
        const actionToken = await generete_token_service_1.generateToken.createActionToken(data.email);
        await email_service_1.emailService.send(data.email, email_enum_1.EmailEnum.WELCOME, {
            name: data.name,
            token: actionToken,
        });
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
    async refresh(oldTokenPair, payload) {
        try {
            const newTokenPair = generete_token_service_1.generateToken.create(payload);
            await Promise.all([
                await token_model_1.Token.create({ _userId: payload._id, ...newTokenPair }),
                await token_model_1.Token.deleteOne({ refresh: oldTokenPair.refresh }),
            ]);
            return newTokenPair;
        }
        catch (e) {
            throw new error_interface_1.ApiError(e.message, e.status);
        }
    }
    async checkedPassword(data, userId) {
        try {
            const user = (await User_model_1.User.findById(userId));
            const isMatched = await password_service_1.passwordService.compare(data.oldPassword, user.password);
            if (!isMatched) {
                throw new error_interface_1.ApiError("Invalid old Password", 400);
            }
            const hashNewPassword = await password_service_1.passwordService.hash(data.newPassword);
            await User_model_1.User.updateOne({ _id: userId }, { password: hashNewPassword });
        }
        catch (e) {
            throw new error_interface_1.ApiError(e.message, e.status);
        }
    }
    async activate(email, userId) {
        try {
            const userEmail = await User_model_1.User.findById(userId).select("email");
            if (!userEmail) {
                throw new error_interface_1.ApiError("Invalid login", 400);
            }
            await Promise.all([
                User_model_1.User.findByIdAndUpdate(userId, { isActivate: true }),
                action_token_model_1.ActionToken.deleteOne({ _userId: userId }),
            ]);
        }
        catch (e) {
            throw new error_interface_1.ApiError(e.message, e.status);
        }
    }
}
exports.authService = new AuthService();
