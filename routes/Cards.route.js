const express = require("express");
const { authenticateToken } = require("../middlewares/Auth");
const CardsController = require("../controllers/CardsController");

const cardsRouter = express.Router();

cardsRouter.get("/user/cards", authenticateToken, CardsController.getUserCards);

module.exports = cardsRouter;
