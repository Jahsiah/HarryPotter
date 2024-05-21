const express = require("express");
const { authenticateToken } = require("../middlewares/Auth");
const BoosterController = require("../controllers/BoosterController");

const boosterRouter = express.Router();

boosterRouter.post(
  "/user/booster/open",
  authenticateToken,
  BoosterController.openBooster
);
boosterRouter.put(
  "/user/booster/reset",
  authenticateToken,
  BoosterController.resetBooster
);

module.exports = boosterRouter;
