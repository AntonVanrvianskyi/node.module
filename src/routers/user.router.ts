import { Router } from "express";

import { userController } from "../controlers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.findAll);
router.patch(
  "/:id",
  commonMiddleware.isIdValid,
  commonMiddleware.isBodyValid(UserValidator.update),
  authMiddleware.checkToken,
  userController.updateById
);
router.delete(
  "/:id",
  commonMiddleware.isIdValid,
  authMiddleware.checkToken,
  userController.deleteById
);

export const userRouter = router;
