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
    async create(data) {
        try {
            return User_model_1.User.create(data);
        }
        catch (e) {
            throw new error_interface_1.ApiError(e.message, e.status);
        }
    }
    async updateById(id, data) {
        try {
            return User_model_1.User.findOneAndUpdate({ _id: id }, { ...data }, { returnDocument: "after" });
        }
        catch (e) {
            throw new error_interface_1.ApiError(e.message, e.status);
        }
    }
    async deleteById(id) {
        try {
            return User_model_1.User.deleteOne({ _id: id });
        }
        catch (e) {
            throw new error_interface_1.ApiError(e.message, e.status);
        }
    }
}
exports.userService = new UserService();
