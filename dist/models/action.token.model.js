"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionToken = void 0;
const mongoose_1 = require("mongoose");
const User_model_1 = require("./User.model");
const actionTokenModel = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    _userId: {
        type: mongoose_1.Types.ObjectId,
        ref: User_model_1.User,
    },
});
exports.ActionToken = (0, mongoose_1.model)("action", actionTokenModel);
