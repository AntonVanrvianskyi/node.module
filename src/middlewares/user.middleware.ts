import { NextFunction, Request, Response } from "express";

import { ApiError } from "../interfaces/error.interface";
import { User } from "../models/User.model";

class UserMiddleware {
  public async emailCheck(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const userEmail = await User.findOne({ email });
      if (userEmail) {
        throw new ApiError("Користувач вже існує", 401);
      }
      next();
    } catch (e) {
      next(e);
    }
  }

}

export const userMiddleware = new UserMiddleware();
