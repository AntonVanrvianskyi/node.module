import * as jwt from "jsonwebtoken";


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
}

export const generateToken = new GenerateTokenService();
