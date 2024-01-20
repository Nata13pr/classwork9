const path = require("path");

const EmailTemplates = require("email-templates");
const nodemailer = require("nodemailer");

const { NO_REPLY_EMAIL, NO_REPLY_PASSWORD } = require("../constants/config");
const emailTemplates = require("../email-templates");
const CustomError = require("../error/CustomError");

module.exports = {
  sendEmail: async (userMail = "", emailAction = "", locals = {}) => {
    console.log("88888888888888888", process.cwd());
    const templateParser = new EmailTemplates({
      views: {
        root: path.join(process.cwd(), "email-templates"),
      },
    });

    const templateInfo = emailTemplates[emailAction];

    if (!templateInfo) {
      throw new CustomError("Wrong email action", 500);
    }

    locals.frontendURL = "google.com";

    const html = await templateParser.render(templateInfo.template, locals);

    const transporter = nodemailer.createTransport({
      auth: {
        user: NO_REPLY_EMAIL,
        pass: NO_REPLY_PASSWORD,
      },
      service: "gmail",
    });
    console.log(process.env.NO_REPLY_EMAIL);
    return transporter.sendMail({
      from: "No reply",
      to: userMail,
      subject: templateInfo.subject,
      html,
    });
  },
};
