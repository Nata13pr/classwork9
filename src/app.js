require("dotenv").config();
const express = require("express");
const expressFileUpload = require("express-fileupload");
const mongoose = require("mongoose");

const authRouter = require("./routes/auth.router");
const userRouter = require("./routes/user.router");
mongoose.connect("mongodb://127.0.0.1:27017/dec");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressFileUpload());
app.use("/auth", authRouter);
app.use("/users", userRouter);

app.use("*", (req, res) => {
  res.status(404).json("Route not found");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({
    error: err.message || "Unknown Error",
    code: err.status || 500,
  });
});

app.listen(4200, () => {
  console.log("Server listen 4200");
});
