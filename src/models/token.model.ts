import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const tokenSchema = new Schema({
  access: {
    type: String,
    required: true,
  },
  refresh: {
    type: String,
    required: true,
  },
  _userId: {
    type: Types.ObjectId,
    required: true,
    ref: User,
  },
});

export const Token = model("token", tokenSchema);
