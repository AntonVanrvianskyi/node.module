import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name?: string;
  age?: number;
  email: string;
  password: string;
  gender?: string;
}
