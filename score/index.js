const express = require("express");
const cors = require("cors");
const os = require("os");
const { readFileSync, promises: fsPromises } = require("fs");
const app = express();
const port = process.env.PORT || 3002;

var scoreRoutes = require("./routes/score");

// Set up CORS
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/score/", (req, res) => {
  res.json("Hello World!", port);
});

app.use("/score", scoreRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
