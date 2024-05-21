const express = require("express");
const router = require("./routes/start");
const PORT = 3000;

const app = express();
app.use(express.json());

// Sert le front à partir du serveur express
app.use(express.static("../public"));
app.use("/", router);

const initializeApp = () => {
  app.listen(PORT, () => {
    console.log(`Backend connected to http://localhost:${PORT} `);
  });
};

initializeApp();
