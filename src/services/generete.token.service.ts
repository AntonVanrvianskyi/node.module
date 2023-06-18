import * as jwt from "jsonwebtoken";

import { configs } from "../configs/config";
import { ApiError } from "../interfaces/error.interface";
import { ITokenPayload } from "../interfaces/user.interface";
import { ActionToken } from "../models/action.token.model";
import { User } from "../models/User.model";

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

  public async createActionToken(email: string): Promise<string> {
    const id = await User.findOne({ email }).select("_id");

    const token = jwt.sign({ _id: id }, configs.SECRET_ACTION, {
      expiresIn: "20m",
    });
    await ActionToken.create({ token, _userId: id });
    return token;
  }
}

export const generateToken = new GenerateTokenService();
