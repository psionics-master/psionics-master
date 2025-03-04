const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

let userStats = { energy: 100, karma: 0, psionicCoins: 0 };

app.post("/buy-energy", (req, res) => {
    // Simulating Telegram Payment API (Replace with actual integration)
    userStats.energy += 20;
    res.json({ energy: 20 });
});

app.listen(3000, () => console.log("Server running on port 3000"));
