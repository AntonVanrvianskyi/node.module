import { ApiError } from "../interfaces/error.interface";
import { ILogin } from "../interfaces/login.interface";
import { IToken } from "../interfaces/token.interface";
import { ITokenPayload, IUser } from "../interfaces/user.interface";
import { Token } from "../models/token.model";
import { User } from "../models/User.model";
import { generateToken } from "./generete.token.service";
import { passwordService } from "./password.service";


class AuthService {
  public async register(data: IUser): Promise<void> {
    const hashedPassword = await passwordService.hash(data.password);
    await User.create({ ...data, password: hashedPassword });
  }
  public async login(data: ILogin, user: IUser): Promise<IToken> {
    const isMatched = await passwordService.compare(
      data.password,
      user.password
    );
    if (!isMatched) {
      throw new ApiError("Invalid email or password", 401);
    }
    const tokensPair = generateToken.create({
      _id: user._id,
    });
    await Token.create({
      ...tokensPair,
      _userId: user._id,
    });
    return tokensPair;
  }

  public async refresh(
    oldTokenPair: IToken,
    payload: ITokenPayload
  ): Promise<IToken> {
    try {
      const newTokenPair = generateToken.create(payload);
      await Promise.all([
        await Token.create({ _userId: payload._id, ...newTokenPair }),
        await Token.deleteOne({ refresh: oldTokenPair.refresh }),
      ])
      return newTokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
