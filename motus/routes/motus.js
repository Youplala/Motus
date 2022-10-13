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
  //remove accent and special characters
  const arr = contents
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/\r?\n/);
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
        const guess = req.query.guess
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLowerCase();
        const wordList = getWordList();
        const isWord = wordList.includes(guess);
        const sameLength = guess.length === getWord().length;
        res.status(200).json({ isWord: isWord, len: sameLength });
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
        const guess = req.query.guess
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "");
        const arr = word.split("");
        const guessArr = guess.split("");
        const hint = [];
        const lettersToGuess = word.split("");
        for (let i = 0; i < arr.length; i++) {
          if (arr[i] === guessArr[i]) {
            hint.push(2);
            // Remove current letter from lettersToGuess
            lettersToGuess.splice(lettersToGuess.indexOf(arr[i]), 1);
          } else if (lettersToGuess.includes(guessArr[i])) {
            hint.push(1);
            // Remove current letter from lettersToGuess
            lettersToGuess.splice(lettersToGuess.indexOf(guessArr[i]), 1);
          } else {
            hint.push(0);
          }
        }
        fetch(
          "http://localhost:3000/score/push/?token=" +
            token +
            "&guess=" +
            guess +
            "&hint=" +
            hint.join("")
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            res.status(200).json({ guess: guessArr, hint: hint });
          });
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
