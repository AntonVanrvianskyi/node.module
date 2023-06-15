import { NextFunction, Request, Response } from "express";

import { ApiError } from "../interfaces/error.interface";
import { Token } from "../models/token.model";
import { generateToken } from "../services/generete.token.service";
import { configs } from "../configs/config";

class AuthMiddleware {
  public checkToken(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.get("Authorization");
      if (!accessToken) {
        throw new ApiError("Token not found", 401);
      }

      const tokenPayload = generateToken.checkToken(
        accessToken,
        configs.SECRET_ACCESS
      );

      const entity = Token.findOne({ access: accessToken });
      if (!entity) {
        throw new ApiError("Token not valid", 401);
      }
      req.res.locals.tokenPayload = tokenPayload;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
