import { Router } from "express";

import { userController } from "../controlers/user.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.get("/", userController.findAll);
router.post(
  "/",
  commonMiddleware.isBodyValid(UserValidator.create),
  userController.create
);

router.patch(
  "/:id",
  commonMiddleware.isIdValid,
  commonMiddleware.isValidUpdate,
  userController.updateById
);
router.delete("/:id", commonMiddleware.isIdValid, userController.deleteById);

export const userRouter = router;
