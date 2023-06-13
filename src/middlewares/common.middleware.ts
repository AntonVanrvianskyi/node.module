import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";

import { ApiError } from "../interfaces/error.interface";
import { userService } from "../services/user.service";
import { UserValidator } from "../validators/user.validator";

class CommonMiddleware {
  public isBodyValid(validator: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const { value, error } = validator.validate(req.body);
        if (error) {
          throw new ApiError(error.message, 400);
        }
        req.res.locals = value;
        next();
      } catch (e) {
        next(e);
      }
    };
  }
  public isValidUpdate(req: Request, res: Response, next: NextFunction) {
    try {
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
      next();
    } catch (e) {
      next(e);
    }
  }

  public async userChecked(req: any, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const user = await userService.findOne(email);
      req.user = user;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
