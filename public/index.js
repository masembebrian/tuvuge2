const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static("public"));

// Endpoint to get models based on make
app.get("/api/models", (req, res) => {
  const make = req.query.make;
  if (!make) {
    return res.status(400).json({ error: "Make is required" });
  }

  // Read the car data from cars.json
  fs.readFile("./data/cars.json", "utf8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to load data" });
    }

    const carData = JSON.parse(data);
    const models = carData[make] || [];
    res.json(models);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
