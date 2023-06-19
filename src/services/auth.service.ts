import { EmailEnum } from "../enums/email.enum";
import { ApiError } from "../interfaces/error.interface";
import { ILogin } from "../interfaces/login.interface";
import { IPassword } from "../interfaces/password.interface";
import { IToken } from "../interfaces/token.interface";
import { ITokenPayload, IUser } from "../interfaces/user.interface";
import { ActionToken } from "../models/action.token.model";
import { Token } from "../models/token.model";
import { User } from "../models/User.model";
import { emailService } from "./email.service";
import { generateToken } from "./generete.token.service";
import { passwordService } from "./password.service";

class AuthService {
  public async register(data: IUser): Promise<void> {
    const hashedPassword = await passwordService.hash(data.password);
    await User.create({ ...data, password: hashedPassword });
    const actionToken = await generateToken.createActionToken(data.email);

    await emailService.send(data.email, EmailEnum.WELCOME, {
      name: data.name,
      token: actionToken,
    });
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
      ]);
      return newTokenPair;
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  public async checkedPassword(data: IPassword, userId: string): Promise<void> {
    try {
      const user = (await User.findById(userId)) as IUser;
      const isMatched = await passwordService.compare(
        data.oldPassword,
        user.password
      );
      if (!isMatched) {
        throw new ApiError("Invalid old Password", 400);
      }
      const hashNewPassword = await passwordService.hash(data.newPassword);
      await User.updateOne({ _id: userId }, { password: hashNewPassword });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }

  public async activate(userId: string): Promise<void> {
    try {
      const userEmail = await User.findById(userId).select("email");
      if (!userEmail) {
        throw new ApiError("Invalid login", 400);
      }
      await Promise.all([
        User.findByIdAndUpdate(userId, { isActivate: true }),
        ActionToken.deleteOne({ _userId: userId }),
      ]);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const authService = new AuthService();
