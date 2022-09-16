const express = require("express");
const os = require("os");
const app = express();
const port = process.env.PORT || 3000;

app.get("/os", (req, res) => {
    res.send("Motus app listening on " + os.hostname() + " port " + port);
});
