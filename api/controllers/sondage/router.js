const express = require("express");
const controller = require("./controller");

const sondageRouter = express.Router();

sondageRouter
  .get("/", controller.getSondages)
  .get("/:id", controller.getOneSondage)
  .post("/", controller.addSondage)
  .put("/:id", controller.updateSondage)
  .delete("/:id", controller.deleteSondage);
module.exports = sondageRouter;
