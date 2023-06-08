import { NextFunction, Request, Response } from "express";

import { UserValidator } from "../validators/user.validator";

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
}

export const userMiddleware = new UserMiddleware();
