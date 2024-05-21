const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // console.log("Authenticating token: ", token);

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, async (err, payload) => {
    if (err) return res.sendStatus(403);

    const email = payload.data;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        booster: true,
        createdAt: true,
      },
    });

    if (!user) return res.sendStatus(403);

    req.user = user;

    next();
  });
}

module.exports = {
  authenticateToken,
};
