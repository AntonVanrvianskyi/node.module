"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
class UserController {
    async findAll(req, res, next) {
        try {
            const users = await user_service_1.userService.getAll();
            return res.json(users);
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const createdUser = await user_service_1.userService.create(req.res.locals);
            return res.status(201).json(createdUser);
        }
        catch (e) {
            next(e);
        }
    }
    async updateById(req, res, next) {
        try {
            await user_service_1.userService.updateById(req.id, req.res.locals);
            res.json({
                message: "User updated",
            });
        }
        catch (e) {
            next(e);
        }
    }
    async deleteById(req, res, next) {
        try {
            const { id } = req.params;
            await user_service_1.userService.deleteById(id);
            res.status(200).json({
                message: "User deleted",
            });
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userController = new UserController();
