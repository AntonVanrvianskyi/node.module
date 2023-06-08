import { NextFunction, Request, Response } from "express";

import { ApiError } from "../interfaces/error.interface";
import { userService } from "../services/user.service";
import { UserValidator } from "../validators/user.validator";
import {User} from "../models/User.model";

class UserMiddleware {
  public isValidCreate(req: Request, res: Response, next: NextFunction) {
    try {
      const { error, value } = UserValidator.create.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }
      req.res.locals = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isValidUpdate(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const findUser = await userService.findById(id);
      if (!findUser) {
        throw new ApiError("User not found", 400);
      }
      const { error, value } = UserValidator.update.validate(req.body);
      if (error) {
        throw new Error(error.message);
      }
      req.res.locals = value;
      next();
    } catch (e) {
      next(e);
    }
  }
  public isIdValid(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { error, value } = UserValidator.checkedID.validate(id);
      if (error) {
        throw new Error(error.message);
      }
      req.id = value;
      console.log(req.id);
      next();
    } catch (e) {
      next(e);
    }
  }
  public async isDeleteValid(req: any, res: Response, next: NextFunction){
    try {
      const { id } = req.params;
      const findUser = await User.findById(id);
      if (!findUser) {
        throw new ApiError("User not found", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
