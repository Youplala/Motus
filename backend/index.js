const express = require("express");
const cors = require("cors");
const os = require("os");
const { readFileSync, promises: fsPromises } = require("fs");
const app = express();
const port = process.env.PORT || 3000;

var axios = require("axios").default;

app.get("/", (req, res) => {
  var options = {
    method: "GET",
    url: "http://localhost:8080/api/v1/db/data/noco/p_74k29q6kw8rewf/Motus/views/Motus",
    params: { offset: "0", limit: "25", where: "" },
    headers: {
      "xc-auth":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImZpcnN0bmFtZSI6bnVsbCwibGFzdG5hbWUiOm51bGwsImlkIjoidXNfN25iNjR1cWxyMHF0cnQiLCJyb2xlcyI6InVzZXIsc3VwZXIiLCJ0b2tlbl92ZXJzaW9uIjoiNGY3YzgwOGU1NTg2YzhhYWFkNTYwZjk3NDZlMDc4Y2U5OGE1ODYwNTU5YTE1MDE5MWEzYjczMzBhYzNjNTUzNTAyNDBlNjAzNWJmMjQxY2YiLCJpYXQiOjE2NjQ0NTE3NDIsImV4cCI6MTY2NDQ4Nzc0Mn0.EGq70oSQdPkG9FkmG_NkhuIEbN0qvYYC1Z4vllxrlMA",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// Set up CORS
app.use(cors());
app.use(function (req, res, next) {
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
  const arr = syncReadFile("data/liste_francais_utf8.txt");
  return arr;
}

function getWord() {
  const arr = getWordList();
  const seed = getSeedByDay();
  const word = arr[Math.floor(seed * arr.length)];
  return word;
}

app.get("/motus/firstHint", (req, res) => {
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

app.get("/motus/isWord", (req, res) => {
  const guess = req.query.guess;
  const wordList = getWordList();
  const isWord = wordList.includes(guess);
  res.status(200).json({ isWord: isWord });
});

app.get("/motus/health", (req, res) => {
  res.send("ok");
});

app.get("/motus/guess", (req, res) => {
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

app.get("/motus/port", (req, res) => {
  res.send("Motus app listening on " + os.hostname() + " port " + port);
});

app.get("/motus/path", (req, res) => {
  res.send("Path Motus app listening on " + os.hostname() + " port " + port);
});

app.get("/motus/anotherpath", (req, res) => {
  res.send(
    "AnotherPath Motus app listening on " + os.hostname() + " port " + port
  );
});

app.get("/motus/auth", (req, res) => {
  // get username from post params
  const username = req.query.username;
  // get password from post params
  const password = req.query.password;
  console.log(req.query);
  credentials = { username: username, password: password };
  credentialsList = [credentials];
  if (credentialsList.includes(credentials)) {
    res.status(200).json({ auth: true });
  } else {
    res.status(200).json({ auth: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
