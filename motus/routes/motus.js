const express = require("express");
const { Pool, Client } = require("pg");

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
  const arr = syncReadFile("../data/liste_francais_utf8.txt");
  return arr;
}

function getWord() {
  const arr = getWordList();
  const seed = getSeedByDay();
  const word = arr[Math.floor(seed * arr.length)];
  return word;
}

router.get("/auth", async (req, res) => {
  const a = await client.query("SELECT * from auth");
  res.json(a.rows);
});

router.get("/firstHint", (req, res) => {
  const word = getWord();
  const firstHint = word[0];
  const arr = [firstHint];
  const hint = [2];
  for (let i = 1; i < word.length; i++) {
    arr.push("_");
    hint.push(0);
  }
  console.log(word);
  res.status(200).json({ firstHint: arr, hint: hint });
});

router.get("/isWord", (req, res) => {
  const guess = req.query.guess;
  const wordList = getWordList();
  const isWord = wordList.includes(guess);
  res.status(200).json({ isWord: isWord });
});

router.get("/health", (req, res) => {
  res.send("ok");
});

router.get("/guess", (req, res) => {
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
});

router.get("/port", (req, res) => {
  res.send("Motus app listening on " + os.hostname() + " port " + port);
});

router.get("/path", (req, res) => {
  res.send("Path Motus app listening on " + os.hostname() + " port " + port);
});

router.get("/anotherpath", (req, res) => {
  res.send(
    "AnotherPath Motus app listening on " + os.hostname() + " port " + port
  );
});

module.exports = router;
