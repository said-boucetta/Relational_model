const express = require("express");
const controller = require("./controller");

const userRouter = express.Router();

userRouter.post("/", controller.signUp).post("/login", controller.logIn);

module.exports = userRouter;
