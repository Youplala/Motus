const express = require("express");
const { Pool, Client } = require("pg");
const { readFileSync, promises: fsPromises } = require("fs");

const app = express();
const router = express.Router();

const client = new Client();
client.connect();

function getSeedByDay() {
  const date = new Date();
  const seed = date.getDate() / 31;
  return seed;
}

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
}

function getWordList() {
  const arr = syncReadFile("data/liste_francais_utf8.txt");
  return arr;
}

function getWord() {
  const arr = getWordList();
  const seed = getSeedByDay();
  const word = arr[Math.floor(seed * arr.length)];
  return word;
}

function computeFirstHint() {
  const word = getWord();
  const firstHint = word[0];
  const arr = [firstHint];
  const hint = [2];
  for (let i = 1; i < word.length; i++) {
    arr.push("_");
    hint.push(0);
  }
  console.log(word);
  return { word, arr, hint };
}

router.get("/firstHint", (req, res) => {
  const token = req.query.token;
  // Request to auth to check if token is valid
  const auth = "http://localhost:3000/auth/checkToken?token=" + token;
  fetch(auth)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.valid) {
        // Token is valid
        const { word, arr, hint } = computeFirstHint();
        res.status(200).json({ firstHint: arr, hint: hint });
      } else {
        res.json({ error: "Invalid token" });
      }
    });
});

router.get("/isWord", (req, res) => {
  const token = req.query.token;
  // Request to auth to check if token is valid
  const auth = "http://localhost:3000/auth/checkToken?token=" + token;
  fetch(auth)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.valid) {
        const guess = req.query.guess;
        const wordList = getWordList();
        const isWord = wordList.includes(guess);
        res.status(200).json({ isWord: isWord });
        res.status(200).json({ guess: guessArr, hint: hint });
      } else {
        res.json({ error: "Invalid token" });
      }
    });
});

router.get("/health", (req, res) => {
  res.send("ok");
});

router.get("/guess", (req, res) => {
  const token = req.query.token;
  // Request to auth to check if token is valid
  const auth = "http://localhost:3000/auth/checkToken?token=" + token;
  fetch(auth)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.valid) {
        const word = getWord();
        const guess = req.query.guess;
        const arr = word.split("");
        const guessArr = guess.split("");
        const hint = [];
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === guessArr[i]) {
            hint.push(2);
          } else if (arr.includes(guessArr[i]) && hint) {
            hint.push(1);
          } else {
            hint.push(0);
          }
        }
        res.status(200).json({ guess: guessArr, hint: hint });
      } else {
        res.json({ error: "Invalid token" });
      }
    });
});

router.get("/port", (req, res) => {
  res.send("Motus app listening on " + os.hostname() + " port " + port);
});

router.get("/path", (req, res) => {
  res.send("Path Motus app listening on " + os.hostname() + " port " + port);
});

module.exports = router;
