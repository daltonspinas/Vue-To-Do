"use strict";

const cors = require("cors");
const express = require("express");
const path = require("path");
const volleyball = require("volleyball");
const { db } = require("./db");
const PORT = 1337;

const app = express();

// logging middleware
app.use(volleyball);

// body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static middleware
app.use(express.static(path.join(__dirname, "../public")));

//allow access to server
app.use(cors());

app.use("/api", require("./api")); // include routes

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
}); // Send index.html for any other requests

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

db.sync() // need to drop tables and re-create them if there are changes to db schema
  .then(() => {
    console.log("db synced");
    app.listen(PORT, () => console.log(`Your app is running on ${PORT}`));
  });

module.exports = app;
