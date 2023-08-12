import express from "express";
import ctrl from "../../controllers/users/index.js";
import {
  validateBody,
  isEmptyBody,
  authenticate,
} from "../../middlewares/index.js";

import {
  updateSubscriptionSchema,
  userAuthSchema,
} from "../../schemas/index.js";

const usersRouter = express.Router();

usersRouter.post(
  "/register",
  isEmptyBody,
  validateBody(userAuthSchema),
  ctrl.register
);

usersRouter.post(
  "/login",
  isEmptyBody,
  validateBody(userAuthSchema),
  ctrl.login
);

usersRouter.post("/logout", authenticate, ctrl.logout);

usersRouter.get("/current", authenticate, ctrl.current);

usersRouter.patch(
  "/",
  authenticate,
  isEmptyBody,
  validateBody(updateSubscriptionSchema),
  ctrl.updateSubscription
);

export default usersRouter;