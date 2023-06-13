import { ApiError } from "../interfaces/error.interface";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/User.model";

class UserService {
  async getAll(): Promise<IUser[]> {
    try {
      return User.find().select("-password");
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  async create(data: IUser) {
    try {
      return User.create(data);
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  async updateById(id: string, data: IUser) {
    await this.getOneByIdOrThrow(id);
    return User.findOneAndUpdate(
      { _id: id },
      { ...data },
      { returnDocument: "after" }
    );
  }
  async deleteById(id: string) {
    await this.getOneByIdOrThrow(id);
    return User.deleteOne({ _id: id });
  }
  private async getOneByIdOrThrow(id: string): Promise<IUser> {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError("User not found", 400);
    }
    return user;
  }
  public async findOne(email: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError("Invalid email or password", 400);
    }
    return user;
  }
}

export const userService = new UserService();
