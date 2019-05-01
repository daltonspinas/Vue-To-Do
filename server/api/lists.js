const listRouter = require("express").Router();
const List = require("../db/List");
const Task = require("../db/Task");

listRouter.put("/", async (req, res, next) => {
  try {
    const list = req.body;
    const id = list.id;
    console.log(id);
    const updatedList = await List.update(
      {
        name: list.name,
      },
      { where: { id } }
    );
    res.json(updatedList);
  } catch (err) {
    next(err);
  }
});

listRouter.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const list = req.body;
    const newList = await List.create({
      name: list.name,
    });
    res.json(newList);
  } catch (err) {
    next(err);
  }
});

listRouter.get("/:listId", async (req, res, next) => {
  try {
    const id = req.params.listId;
    const list = await List.findByPk(id, {
      include: [Task],
    });
    res.json(list);
  } catch (err) {
    next(err);
  }
});

listRouter.get("/", async (req, res, next) => {
  try {
    const lists = await List.findAll({
      include: [Task],
      order: ["id"],
    });
    res.json(lists);
  } catch (err) {
    next(err);
  }
});

listRouter.delete("/:listId", async (req, res, next) => {
  try {
    await List.destroy({ where: { id: req.params.listId } });
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = listRouter;
