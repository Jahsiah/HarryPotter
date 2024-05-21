const prisma = require("../config/prisma");

class CardsController {
  async getUserCards(req, res) {
    try {
      const { id } = req.user;

      // On récupère les cartes dans la BDD
      const userCards = await prisma.userCard.findMany({
        where: {
          userId: id,
        },
        select: {
          cardId: true,
          quantity: true,
        },
      });

      // Si il ne possède pas de carte
      if (!userCards.length)
        return res.status(404).json({ message: "You don't own any card." });

      // On initialise un total de cartes.
      let total = 0;
      userCards.forEach((card) => {
        total += card.quantity;
      });

      return res.status(200).json({ cards: userCards, total });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new CardsController();
