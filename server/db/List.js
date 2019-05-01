const Sequelize = require("sequelize");
const db = require("./database");

const List = db.define("list", {
  name: { type: Sequelize.STRING, allowNull: false },
});

module.exports = List;
