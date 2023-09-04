const express = require("express");
const cors = require("cors");
require("./config/db");

//import Router
const mainRouter = require("./routes/router");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Use Router
app.use(mainRouter);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});

//Default Route
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

// Server Error
app.use((req, res, next) => {
  res.status(404).json({ message: "Server Error" });
});

module.exports = app;
