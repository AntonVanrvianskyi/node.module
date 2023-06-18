import { model, Schema, Types } from "mongoose";

import { User } from "./User.model";

const actionTokenModel = new Schema({
  token: {
    type: String,
    required: true,
  },

  _userId: {
    type: Types.ObjectId,
    ref: User,
  },
});

export const ActionToken = model("action", actionTokenModel);
