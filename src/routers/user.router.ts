import { Router } from "express";

import { userController } from "../controlers/user.controller";
import { userMiddleware } from "../middlewares/user.middleware";

const router = Router();

router.get("/", userController.findAll);
router.post("/", userMiddleware.isValidCreate, userController.create);
router.patch(
  "/:id",
  userMiddleware.isIdValid,
  userMiddleware.isValidUpdate,
  userController.updateById
);
router.delete(
  "/:id",
  userMiddleware.isIdValid,
  userMiddleware.isDeleteValid,
  userController.deleteById
);

export const userRouter = router;
