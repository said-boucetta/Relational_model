const express = require("express");
const controller = require("./controller");

const questionRouter = express.Router();

questionRouter
  .get("/", controller.getQuestions)
  .get("/:id", controller.getOneQuestion)
  .post("/", controller.addQuestion)
  .put("/:id", controller.updateQuestion)
  .delete("/:id", controller.deleteQuestion);

module.exports = questionRouter;
