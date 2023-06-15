import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../interfaces/error.interface";
import { ITokenPayload } from "../interfaces/user.interface";


class GenerateTokenService {
  public create(payload: ITokenPayload) {
    const access = jwt.sign(payload, configs.SECRET_ACCESS, {
      expiresIn: "20s",
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
}

export const generateToken = new GenerateTokenService();
