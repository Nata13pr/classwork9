module.exports = {
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "asd",
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || "qwe",
  FORGOT_PASS_ACTION_SECRET: process.env.FORGOT_PASS_ACTION_SECRET || "fg_pass",

  NO_REPLY_EMAIL: process.env.NO_REPLY_EMAIL || "nata13pr@gmail.com",
  NO_REPLY_PASSWORD: process.env.NO_REPLY_PASSWORD || "Nata5121991",

  AWS_S3_BUCKET: process.env.AWS_S3_BUCKET,
  AWS_S3_REGION: process.env.AWS_S3_REGION,
  AWS_S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
  AWS_S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
};
