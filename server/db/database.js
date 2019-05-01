/* eslint-disable quotes */
// This file will create and establish the connection to your database

const Sequelize = require("sequelize");
const pkg = require("../package.json");

console.log("Opening database connection");

// create the database instance that can be used in other database files
const db = new Sequelize(`postgres://localhost:5432/${pkg.name}`, {
  logging: false,
});

module.exports = db;
