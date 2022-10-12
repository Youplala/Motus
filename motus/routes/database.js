const { Pool, Client } = require("pg");

var express = require("express");
router = express.Router();

router.get("/test", async (req, res) => {
  const client = new Client();
  await client.connect();
  const a = await client.query("SELECT NOW()");
  await client.end();
  res.json(a);
});

module.exports = router;
