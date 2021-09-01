const express = require("express");
const cors = require("cors");
const videosRoutes = require("./src/videos/routes");
const path = require("path");
const ID = require("nodejs-unique-numeric-id-generator");
const url = require("url");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.get("/", (req, res) => {
  res.json({ express: "Your Backend Service is Running" });
});

app.use("/api/v1/videos", videosRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
