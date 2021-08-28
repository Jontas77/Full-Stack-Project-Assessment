const express = require("express");
const cors = require("cors");
const videosRoutes = require("./src/videos/routes");
const ID = require("nodejs-unique-numeric-id-generator");
const url = require("url");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({ express: "Your Backend Service is Running" });
});

app.use("/api/v1/videos", videosRoutes);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
