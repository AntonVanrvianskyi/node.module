import { NextFunction, Request, Response } from "express";

import { configs } from "../configs/config";
import { ApiError } from "../interfaces/error.interface";
import { Token } from "../models/token.model";
import { generateToken } from "../services/generete.token.service";

class AuthMiddleware {
  public checkAccessToken(req: Request, res: Response, next: NextFunction) {
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

  public async checkRefresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshToken = req.get("Authorization");
      if (!refreshToken) {
        throw new ApiError("No Refresh Token", 401);
      }

      const payload = generateToken.checkToken(
        refreshToken,
        configs.SECRET_REFRESH
      );

      const entity = await Token.findOne({ refresh: refreshToken });
      if (!entity) {
        throw new ApiError("Refresh token not valid", 401);
      }

      req.res.locals.oldTokenPair = entity;
      req.res.locals.tokenPayload = { _id: payload._id, name: payload.name };
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
