const Sequelize = require("sequelize");
const db = require("./database");

const Task = db.define("task", {
  name: { type: Sequelize.STRING, allowNull: false },
  completed: { type: Sequelize.BOOLEAN },
});

module.exports = Task;
