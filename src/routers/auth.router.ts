import { Router } from "express";

import { authController } from "../controlers/auth.controller";
import { EEmail } from "../enums/email.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { userMiddleware } from "../middlewares/user.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  commonMiddleware.isBodyValid(UserValidator.create),
  userMiddleware.emailCheck(EEmail.Register),
  authController.register
);
router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  commonMiddleware.userChecked,
  authController.login
);
router.post("/refresh", authMiddleware.checkRefresh, authController.refresh);
router.post(
  "/changePassword",
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  authMiddleware.checkAccessToken,
  authController.changePassword
);
router.post(
  "/activate-account/:token",
  authMiddleware.checkActionToken,
  authController.activate
);
router.post(
  "/forgot",
  commonMiddleware.isBodyValid(UserValidator.forgot),
  userMiddleware.emailCheck(EEmail.Forgot),
  authController.forgot
);
router.post(
  "/forgot/:token",
  authMiddleware.checkActionToken,
  commonMiddleware.isBodyValid(UserValidator.setForgot),
  authController.setForgot
);
export const authRouter = router;
