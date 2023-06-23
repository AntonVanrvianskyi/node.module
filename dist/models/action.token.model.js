"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionToken = void 0;
const mongoose_1 = require("mongoose");
const action_token_type_enum_1 = require("../enums/action.token.type.enum");
const User_model_1 = require("./User.model");
const actionTokenModel = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
    },
    tokenType: {
        type: String,
        required: true,
        enum: action_token_type_enum_1.ActionTokenTypeEnum,
    },
    _userId: {
        type: mongoose_1.Types.ObjectId,
        ref: User_model_1.User,
    },
});
exports.ActionToken = (0, mongoose_1.model)("action", actionTokenModel);
