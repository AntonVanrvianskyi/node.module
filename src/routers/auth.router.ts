import { Router } from "express";

import { authController } from "../controlers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.emailCheck,
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  commonMiddleware.userChecked,
  authController.login
);
router.post("/refresh", authController.refresh)

export const authRouter = router;
