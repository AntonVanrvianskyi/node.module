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
    try {
      return User.findOneAndUpdate(
        { _id: id },
        { ...data },
        { returnDocument: "after" }
      );
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
  async deleteById(id: string) {
    try {
      return User.deleteOne({ _id: id });
    } catch (e) {
      throw new ApiError(e.message, e.status);
    }
  }
}

export const userService = new UserService();
