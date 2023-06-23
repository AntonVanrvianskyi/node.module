"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const config_1 = require("../configs/config");
const error_interface_1 = require("../interfaces/error.interface");
class GenerateTokenService {
    create(payload) {
        const access = jwt.sign(payload, config_1.configs.SECRET_ACCESS, {
            expiresIn: "60s",
        });
        const refresh = jwt.sign(payload, config_1.configs.SECRET_REFRESH, {
            expiresIn: "15d",
        });
        return {
            access,
            refresh,
        };
    }
    checkToken(token, secretWord) {
        try {
            return jwt.verify(token, secretWord);
        }
        catch (e) {
            throw new error_interface_1.ApiError(e.message, e.status);
        }
    }
    createActionToken(payload) {
        return jwt.sign(payload, config_1.configs.SECRET_ACTION, {
            expiresIn: "20m",
        });
    }
}
exports.generateToken = new GenerateTokenService();
