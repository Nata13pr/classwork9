const userRouter = require("express").Router();

const { FORGOT_PASSWORD } = require("../constants/email.action.enum");
const authController = require("../controllers/auth.controller");
const authMdlwr = require("../middlewares/auth.middleware");
const userMdlwr = require("../middlewares/user.middleware");

userRouter.post("/login", userMdlwr.checkIsUserPresent, authController.login);
userRouter.post(
  "/refresh",
  authMdlwr.checkRefreshToken,
  authController.refreshToken
);
userRouter.post(
  "/password/forgot",
  userMdlwr.checkIsUserPresent,
  authController.forgotPassword
);
userRouter.post(
  "/password/forgot/set",
  authMdlwr.checkActionToken(FORGOT_PASSWORD),
  authController.setForgotPassword
);

module.exports = userRouter;
