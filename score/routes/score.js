const express = require("express");
const { Client } = require("pg");
const router = express.Router();
const fetch = require("node-fetch");

const client = new Client();
client.connect();

router.get("/push", async (req, res) => {
  const token = req.query.token;
  // Request to auth to check if token is valid
  const auth = "http://proxy/auth/checkToken?token=" + token;
  fetch(auth)
    .then((response) => response.json())
    .then(async (data) => {
      if (!data.valid) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        // get last try
        const query =
          "SELECT * FROM guess WHERE id = $1 AND day::date = NOW()::date order by nb_try desc limit 1";
        const values = [data.id];
        const last = await client.query(query, values);
        if (last.rows.length !== 0) {
          lastRow = last.rows[0];
          console.log(lastRow);
          getLast_nbTry = lastRow.nb_try;
          nbTry = getLast_nbTry + 1;
          console.log(nbTry);
        } else {
          nbTry = 1;
        }
        //   // add new try
        const query2 =
          "INSERT INTO guess (id, guess, nb_try, day, indice) VALUES ($1, $2, $3, NOW(), $4)";
        const values2 = [data.id, req.query.guess, nbTry, req.query.hint];
        const result = await client.query(query2, values2);
        res.json({ status: "OK" });
      }
    });
});

router.get("/getToday", async (req, res) => {
  const token = req.query.token;
  // Request to auth to check if token is valid
  const auth = "http://proxy/auth/checkToken?token=" + token;
  fetch(auth)
    .then((response) => response.json())
    .then(async (data) => {
      if (!data.valid) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        const query =
          "SELECT * FROM guess WHERE id = $1 AND day::date = NOW()::date";
        const values = [data.id];
        const result = await client.query(query, values);
        res.json(
          result.rows.map((row) => {
            return { guess: row.guess, nb_try: row.nb_try, indice: row.indice };
          })
        );
      }
    });
});

router.get("/getScore", async (req, res) => {
  const token = req.query.token;
  // Request to auth to check if token is valid
  const auth = "http://proxy/auth/checkToken?token=" + token;
  fetch(auth)
    .then((response) => response.json())
    .then(async (data) => {
      if (!data.valid) {
        res.status(401).json({ error: "Unauthorized" });
      } else {
        // Get the number of tries for each day if there is a indice that doesnt contain characters 0 or 1
        const query =
          "SELECT day, nb_try FROM guess WHERE id = $1 AND indice NOT LIKE '%0%' AND indice NOT LIKE '%1%' ORDER BY day";
        const values = [data.id];
        const result = await client.query(query, values);
        res.json(result.rows);
      }
    });
});

module.exports = router;
