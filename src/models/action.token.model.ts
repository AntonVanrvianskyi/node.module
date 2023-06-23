import { model, Schema, Types } from "mongoose";

import { ActionTokenTypeEnum } from "../enums/action.token.type.enum";
import { User } from "./User.model";

const actionTokenModel = new Schema({
  token: {
    type: String,
    required: true,
  },
  tokenType: {
    type: String,
    required: true,
    enum: ActionTokenTypeEnum,
  },
  _userId: {
    type: Types.ObjectId,
    ref: User,
  },
});

export const ActionToken = model("action", actionTokenModel);
