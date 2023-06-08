import { NextFunction, Request, Response } from "express";

import { IUser } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  async findAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const users = await userService.getAll();
      return res.json(users);
    } catch (e) {
      next(e);
    }
  }

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      const createdUser = await userService.create(req.res.locals as IUser);
      return res.status(201).json(createdUser);
    } catch (e) {
      next(e);
    }
  }

  async updateById(req: any, res: Response, next: NextFunction) {
    try {
      await userService.updateById(req.id, req.res.locals as IUser);
      res.json({
        message: "User updated",
      });
    } catch (e) {
      next(e);
    }
  }
  async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await userService.deleteById(id);
      res.status(200).json({
        message: "User deleted",
      });
    } catch (e) {
      next(e);
    }
  }
}
export const userController = new UserController();
