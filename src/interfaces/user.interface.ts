import { Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  name?: string;
  age?: number;
  email: string;
  password: string;
  gender?: string;
  isActivate: boolean,
}

export type ITokenPayload = Pick<IUser, "_id" | "name">;
