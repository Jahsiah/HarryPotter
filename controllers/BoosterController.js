const prisma = require("../config/prisma");

class BoosterController {
  async openBooster(req, res) {
    try {
      const { booster, id } = req.user;

      // 1. Vérifier si tu es autorisé à ouvrir le booster
      const dateNextBooster = Number(booster) - Date.now();

      if (dateNextBooster > 0)
        return res.status(400).json({ message: "Your booster is not ready !" });

      const response = await fetch("https://hp-api.lainocs.fr/characters");
      const cardsData = await response.json();

      const cards = [];

      const numberOfCards = 5;

      // Générer 5 nombres aléatoires entre [1, cardsData.length]
      for (let i = 0; i < numberOfCards; i++) {
        const minCeiled = Math.ceil(1);
        const maxFloored = Math.floor(cardsData.length);
        // Generer le randomId
        const randomId = Math.floor(
          Math.random() * (maxFloored - minCeiled) + minCeiled
        );

        // Vérifier si l'utilisateur possède la carte dont est le randomId
        const hasCard = await prisma.userCard.findFirst({
          where: {
            cardId: randomId,
            userId: id,
          },
        });

        // Si il a la carte
        if (hasCard) {
          // On incrémente la quantité de 1
          await prisma.userCard.update({
            where: {
              userId_cardId: {
                cardId: hasCard.cardId,
                userId: id,
              },
            },
            data: {
              quantity: {
                increment: 1,
              },
            },
          });

          cards.push(cardsData[randomId - 1]);
        } else {
          await prisma.userCard.create({
            data: {
              cardId: randomId,
              userId: id,
            },
          });

          cards.push(cardsData[randomId - 1]);
        }
      }

      // Maintenant qu'on a créé les relations entre les cartes
      // On update le timer pour le prochain booster.

      const nextBooster = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          booster: (Date.now() + 1000 * 60 * 60 * 24).toString(),
        },
        select: {
          booster: true,
        },
      });

      return res.status(200).json({ cards, booster: nextBooster });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
  async resetBooster(req, res) {
    try {
      const { id } = req.user;

      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          booster: "0",
        },
      });

      return res
        .status(200)
        .json({ success: "The booster has been successfully reseted !" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new BoosterController();
