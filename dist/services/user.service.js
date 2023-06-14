"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const error_interface_1 = require("../interfaces/error.interface");
const User_model_1 = require("../models/User.model");
class UserService {
    async getAll() {
        try {
            return User_model_1.User.find().select("-password");
        }
        catch (e) {
            throw new error_interface_1.ApiError(e.message, e.status);
        }
    }
    async updateById(id, data) {
        await this.getOneByIdOrThrow(id);
        return User_model_1.User.findOneAndUpdate({ _id: id }, { ...data }, { returnDocument: "after" });
    }
    async deleteById(id) {
        await this.getOneByIdOrThrow(id);
        return User_model_1.User.deleteOne({ _id: id });
    }
    async getOneByIdOrThrow(id) {
        const user = await User_model_1.User.findById(id);
        if (!user) {
            throw new error_interface_1.ApiError("User not found", 400);
        }
        return user;
    }
    async findOne(email) {
        const user = await User_model_1.User.findOne({ email });
        return user;
    }
}
exports.userService = new UserService();
