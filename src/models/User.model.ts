import * as mongoose from "mongoose";

import { EGenders } from "../enums/user.enum";

const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    age: {
      type: Number,
      min: [1, "min value age is 1"],
      max: 80,
    },
    gender: {
      type: String,
      enum: EGenders,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = model("users", UserSchema);
