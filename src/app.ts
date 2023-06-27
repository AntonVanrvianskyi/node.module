import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { configs } from "./configs/config";
import { croneRunner } from "./crones";
import { ApiError } from "./interfaces/error.interface";
import { authRouter } from "./routers/auth.router";
import { userRouter } from "./routers/user.router";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

const PORT = 5002;

app.listen(PORT, () => {
  mongoose.connect(configs.DB_URL);
  croneRunner();
  console.log(`Server started to ${PORT}`);
});
