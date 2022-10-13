const { Client } = require("pg");
const { uuid } = require("uuidv4");
var { JWTService } = require("./JWT");
const fetch = require("node-fetch");

var express = require("express");
const router = express.Router();

const client = new Client();
client.connect();

function getConfigurations(dataModel) {
  const configurations = {
    data: dataModel,
    secretKey: "secret",
    expireDate: {
      expiresIn: "1h",
    },
  };
  return configurations;
}

router.get("/register", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  // Check if username already exists
  const existingRows = await client.query(
    "SELECT * from auth WHERE username = $1",
    [username]
  );
  if (existingRows.rows.length > 0) {
    res.status(200).json({ auth: false });
  } else {
    await client.query(
      "INSERT INTO auth (id, username, password) VALUES ($1, $2, $3)",
      [uuid(), username, password]
    );
    //redirect to login
    fetch(
      "http://localhost/auth/login?username=" +
        username +
        "&password=" +
        password
    ).then((data) => {
      res.status(200).json({ auth: true, token: data.token });
    });
  }
});

router.get("/login", async (req, res) => {
  const username = req.query.username;
  const password = req.query.password;
  const existingRows = await client.query(
    "SELECT * from auth WHERE username = $1 AND password = $2",
    [username, password]
  );
  if (existingRows.rows.length == 0) {
    res.status(200).json({ auth: false });
  } else {
    const model = {
      id: existingRows.rows[0].id,
    };
    const configurations = getConfigurations(model);
    const jwtService = JWTService(configurations.secretKey);
    const token = jwtService.generateToken(configurations);
    await client.query("INSERT INTO tokens ( id, token) VALUES ($1, $2)", [
      existingRows.rows[0].id,
      token,
    ]);
    res.status(200).json({ auth: true, token: token });
  }
});

router.get("/checkToken", async (req, res) => {
  const token = req.query.token;
  const existingRows = await client.query(
    "SELECT * from tokens WHERE token = $1",
    [token]
  );
  if (existingRows.rows.length == 0) {
    res.status(200).json({ valid: false });
  } else {
    const jwtService = JWTService("secret");
    if (!jwtService.isTokenValid(token)) {
      res.status(200).json({ valid: false });
    } else {
      const data = jwtService.getTokenData(token);
      res.status(200).json({ valid: true, id: data.id });
    }
  }
});

module.exports = router;
