const express = require("express");
const cors = require("cors");
const os = require("os");
const { readFileSync, promises: fsPromises } = require("fs");
const app = express();
const port = process.env.PORT || 3000;

// Set up CORS
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

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
    const arr = syncReadFile("backend/data/liste_francais_utf8.txt");
    return arr;
}

function getWord() {
    const arr = getWordList();
    const seed = getSeedByDay();
    const word = arr[Math.floor(seed * arr.length)];
    return word;
}

app.get("/firstHint", (req, res) => {
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

app.get("/isWord", (req, res) => {
    const guess = req.query.guess;
    const wordList = getWordList();
    const isWord = wordList.includes(guess);
    res.status(200).json({ isWord: isWord });
});

app.get("/health", (req, res) => {
    res.send("ok");
});

app.get("/guess", (req, res) => {
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
    res.status(200).json({ guess: guessArr, hint: hint });
});

app.get("/port", (req, res) => {
    res.send("Motus app listening on " + os.hostname() + " port " + port);
});

app.get("/path", (req, res) => {
    res.send("Path Motus app listening on " + os.hostname() + " port " + port);
});

app.get("/anotherpath", (req, res) => {
    res.send(
        "AnotherPath Motus app listening on " + os.hostname() + " port " + port
    );
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});