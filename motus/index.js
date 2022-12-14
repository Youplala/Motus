const express = require("express");
const cors = require("cors");
const os = require("os");
const { readFileSync, promises: fsPromises } = require("fs");
const app = express();
const port = process.env.PORT || 3000;

var motusRoutes = require("./routes/motus");

// Set up CORS
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get('/motus/', (req, res) => {
  res.json('Hello World!', port)
})

app.use("/motus", motusRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
