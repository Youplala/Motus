const express = require("express");
const { readFileSync, promises: fsPromises } = require("fs");
const app = express();
const port = 3000;

function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");
  const arr = contents.split(/\r?\n/);
  return arr;
}

function getSeedByDay() {
  const date = new Date();
  const seed = date.getDate() / 31;
  return seed;
}

function getWord() {
  const arr = syncReadFile("backend/data/liste_francais_utf8.txt");
  const seed = getSeedByDay();
  const word = arr[Math.floor(seed * arr.length)];
  return word;
}

app.get("/firstHint", (req, res) => {
  const word = getWord();
  const firstHint = word[0];
  const arr = [firstHint];
  const hint = [2]
  for (let i = 1; i < word.length; i++) {
    arr.push("_");
    hint.push(0);
  }
  res.status(200).json({firstHint: arr, hint: hint});
});

app.post("/guess", (req, res) => {
  const word = getWord();
  const guess = req.query.guess;
  const arr = word.split("");
  const guessArr = guess.split("");
  const hint = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === guessArr[i]) {
      hint.push(2);
    } else if (arr.includes(guessArr[i])) {
      hint.push(1);
    } else {
      hint.push(0);
    }
  }
  res.status(200).json({guess: arr, hint: hint});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
