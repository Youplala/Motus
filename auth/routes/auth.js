const { Client } = require("pg");
const { uuid } = require("uuidv4");
var { JWTService } = require("./JWT");
const fetch = require("node-fetch");

var express = require("express");
const router = express.Router();

const client = new Client();
client.connect();

const loki_uri = process.env.LOKI || "http://127.0.0.1:3100";

const { createLogger, transports } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
      host: loki_uri,
    }),
  ],
};

const logger = createLogger(options);

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
  logger.info({
    message: "URL " + req.url,
    labels: { url: req.url, user: req.query.username },
  });

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
    res.status(200).json({ auth: true });
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
    res.status(200).json({ auth: true, token: token });
  }
});

router.get("/checkToken", async (req, res) => {
  const token = req.query.token;
  const jwtService = JWTService("secret");
  if (!jwtService.isTokenValid(token)) {
    res.status(200).json({ valid: false });
  } else {
    const data = jwtService.getTokenData(token);
    res.status(200).json({ valid: true, id: data.id });
  }
});

module.exports = router;
