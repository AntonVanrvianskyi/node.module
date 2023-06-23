import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../interfaces/error.interface";
import { ITokenPayload } from "../interfaces/user.interface";
import {Types} from "mongoose";

class GenerateTokenService {
  public create(payload: ITokenPayload) {
    const access = jwt.sign(payload, configs.SECRET_ACCESS, {
      expiresIn: "60s",
    });
    const refresh = jwt.sign(payload, configs.SECRET_REFRESH, {
      expiresIn: "15d",
    });

    return {
      access,
      refresh,
    };
  }

  public checkToken(token: string, secretWord: string): ITokenPayload {
    try {
      return jwt.verify(token, secretWord) as ITokenPayload;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public createActionToken(payload: Record<string, Types.ObjectId>) {
    return jwt.sign(payload, configs.SECRET_ACTION, {
      expiresIn: "20m",
    });

  }
}

export const generateToken = new GenerateTokenService();
