import { NextFunction, Request, Response } from "express";

import { EEmail } from "../enums/email.enum";
import { ApiError } from "../interfaces/error.interface";
import { User } from "../models/User.model";

class UserMiddleware {
  public emailCheck(type: EEmail) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email } = req.body;
        const userEmail = await User.findOne({ email });
        switch (type) {
          case EEmail.Register: {
            if (userEmail) {
              throw new ApiError("Користувач вже існує", 401);
            }
            break;
          }
          case EEmail.Forgot: {
            if (!userEmail) {
              throw new ApiError("User not found", 400);
            }
            break;
          }
          default:
            req.body = userEmail;
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }
}

export const userMiddleware = new UserMiddleware();
