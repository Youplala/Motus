const express = require("express");
const { readFileSync, promises: fsPromises } = require("fs");
const app = express();
const port = 3000;

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
}

function getRandom() {
  return Math.random();
}

function checkDate() {
  const date = new Date();
  const day = date.getDay();
  if (day === 0 || day === 6) {
    return true;
  }
  return false;
}

function saveSeed(seed) {
  fsPromises.writeFile("seed.txt", seed);
}

function getSeed() {
  const seed = syncReadFile("seed.txt");
  return seed;
}

app.get("/word", (req, res) => {
  const arr = syncReadFile("data/liste_francais_utf8.txt");
  const word = arr[Math.floor(getRandom() * arr.length)];
  res.status(200).json({mot: word, random: getRandom()});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
