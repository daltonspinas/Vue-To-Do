"use strict";

const db = require("./database");
const List = require("./List");
const Task = require("./Task");

// This file sets up the associations between Lists and Tasks within the database

Task.belongsTo(List);
List.hasMany(Task);

module.exports = {
  db,
  List,
  Task,
};
