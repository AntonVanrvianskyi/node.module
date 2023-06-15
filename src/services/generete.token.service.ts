import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../interfaces/error.interface";

class GenerateTokenService {
  public create(payload: any) {
    const access = jwt.sign(payload, configs.SECRET_ACCESS, {
      expiresIn: "15s",
    });
    const refresh = jwt.sign(payload, configs.SECRET_REFRESH, {
      expiresIn: "15d",
    });
    return {
      access,
      refresh,
    };
  }

  public checkToken(token: string, secretWord: string) {
    try {
      return jwt.verify(token, secretWord);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const generateToken = new GenerateTokenService();
