const { Client } = require("pg");
const { uuid } = require("uuidv4");

var express = require("express");
const router = express.Router();

const client = new Client();
client.connect();

router.get("/register", async (req, res) => {
  const id = uuid();
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
      [id, username, password]
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
    const token = uuid();
    await client.query(
      "INSERT INTO tokens ( id, token, beginning) VALUES ($1, $2, $3)",
      [existingRows.rows[0].id, token, new Date()]
    );
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
    // Check if token is expired
    const beginning = existingRows.rows[0].beginning;
    const now = new Date();
    const diff = now - beginning;
    const diffHours = diff / 1000 / 60 / 60;
    if (diffHours > 24) {
      res.status(200).json({ valid: false });
    } else {
      res.status(200).json({ valid: true });
    }
  }
});

module.exports = router;
