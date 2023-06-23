"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.configs = {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL,
    SECRET_ACCESS: process.env.JWT_ACCESS_SECRET,
    SECRET_REFRESH: process.env.JWT_REFRESH_SECRET,
    SECRET_ACTION: process.env.JWT_ACTION_SECRET,
};
