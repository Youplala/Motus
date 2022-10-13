const express = require("express");
const cors = require("cors");
const os = require("os");
const { readFileSync, promises: fsPromises } = require("fs");
const app = express();
const port = process.env.PORT || 3000;

var dbRoutes = require("./routes/database");
var motusRoutes = require("./routes/motus");
var authRoutes = require("./routes/auth");
var scoreRoutes = require("./routes/score");

// Set up CORS
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/db", dbRoutes);
app.use("/motus", motusRoutes);
app.use("/auth", authRoutes);
app.use("/score", scoreRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
