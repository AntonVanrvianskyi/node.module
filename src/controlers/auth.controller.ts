import { NextFunction, Request, Response } from "express";

import { IToken } from "../interfaces/token.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await authService.register(req.body);
      return res.status(201).json({
        message: "user authorized",
      });
    } catch (e) {
      next(e);
    }
  }
  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IToken>> {
    try {
      const tokens = await authService.login(req.body, req.res.locals.user);
      return res.status(200).json({
        ...tokens,
      });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
