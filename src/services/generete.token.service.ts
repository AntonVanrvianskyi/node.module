import * as jwt from "jsonwebtoken";

import { ApiError } from "../interfaces/error.interface";

class GenerateTokenService {
  public create(payload: any) {
    const access = jwt.sign(payload, "jwtAccess", {
      expiresIn: "15m",
    });
    const refresh = jwt.sign(payload, "jwtRefresh", {
      expiresIn: "15d",
    });
    return {
      access,
      refresh,
    };
  }

  public checkToken(token: string) {
    try {
      return jwt.verify(token, "jwtAccess");
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const generateToken = new GenerateTokenService();
