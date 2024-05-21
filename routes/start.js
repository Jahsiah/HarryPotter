const express = require("express");
const usersRouter = require("./Users.route");
const authRouter = require("./Auth.route");
const boosterRouter = require("./Booster.route");
const cardsRouter = require("./Cards.route");

const router = express.Router();

router.use("/", usersRouter);
router.use("/", authRouter);
router.use("/", boosterRouter);
router.use("/", cardsRouter);

module.exports = router;
