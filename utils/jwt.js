const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateAccessToken(email) {
  return jwt.sign(
    {
      data: email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "24h",
    }
  );
}

module.exports = {
  generateAccessToken,
};
