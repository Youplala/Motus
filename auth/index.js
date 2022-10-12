const express = require("express");
const cors = require("cors");
const os = require("os");
const { readFileSync, promises: fsPromises } = require("fs");
const app = express();
const port = process.env.PORT || 3000;

var axios = require("axios").default;

// Set up CORS
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/motus/port", (req, res) => {
  res.send("Motus app listening on " + os.hostname() + " port " + port);
});

app.get("/motus/auth", (req, res) => {
  // get username from post params
  const username = req.query.username;
  // get password from post params
  const password = req.query.password;
  console.log(req.query);
  credentials = { username: username, password: password };
  credentialsList = [credentials];
  if (credentialsList.includes(credentials)) {
    res.status(200).json({ auth: true });
  } else {
    res.status(200).json({ auth: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
