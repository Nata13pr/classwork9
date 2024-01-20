const { WELCOME, FORGOT_PASSWORD } = require("../constants/email.action.enum");
const OAuth = require("../dataBase/OAuth");
const User = require("../dataBase/User");
const ActionTokens = require("../dataBase/ActionTokens");
const emailService = require("../services/email.service");
const {
  generateAuthTokens,
  generateActionToken,
} = require("../services/token.service");
const passwordService = require("../services/password.service");

module.exports = {
  login: async (req, res, next) => {
    try {
      const { password: hashPassword, _id, name } = req.user;
      const { password, email } = req.body;

      await emailService.sendEmail("nata13pr@gmail.com", WELCOME, {
        userName: name,
      });
      // await emailService.sendEmail(email, WELCOME); //так правильно

      await passwordService.comparePassword(hashPassword, password);

      // await req.user.comparePasswords();з user  методи.

      const tokens = generateAuthTokens();

      await OAuth.create({
        userId: _id,
        ...tokens,
      });

      res.json({
        user: req.user,
        ...tokens,
      });
    } catch (e) {
      next(e);
    }
  },

  refreshToken: async (req, res, next) => {
    try {
      const { refresh_token } = req.user;

      const tokenInfo = await OAuth.findOne({ refresh_token }).populate(
        "userId"
      );

      if (!tokenInfo) {
        return res.status(401).json({ error: "Invalid refresh token" });
      }

      const { userId } = tokenInfo;

      const tokens = generateAuthTokens();

      await OAuth.findOneAndUpdate({ userId }, { ...tokens }, { new: true });

      await OAuth.findOneAndDelete({ refresh_token });

      res.json({
        user: req.user,
        ...tokens,
      });
    } catch (e) {
      next(e);
    }
  },

  forgotPassword: async (req, res, next) => {
    try {
      const { _id, name } = req.user;
      const token = generateActionToken(FORGOT_PASSWORD, { name, _id });
      console.log("111111111111111111", token);

      await ActionTokens.create({
        userId: _id,
        token,
        actionType: FORGOT_PASSWORD,
      });

      await emailService.sendEmail("nata13pr@gmail.com", FORGOT_PASSWORD, {
        userName: name,
        token,
      });

      res.json("ok");
    } catch (e) {
      next(e);
    }
  },
  setForgotPassword: async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { password } = req.body;

      const hashPassword = await passwordService.hashPassword(password);
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        { password: hashPassword },
        { new: true }
      );

      await ActionTokens.deleteOne({
        actionType: FORGOT_PASSWORD,
        userId: _id,
      });
      res.json(updatedUser);
    } catch (e) {
      next(e);
    }
  },
};
