const taskRouter = require("express").Router();
const Task = require("../db/Task");
const List = require("../db/List");

taskRouter.post("/", async (req, res, next) => {
  try {
    const newTask = req.body;
    const createdTask = await Task.create({
      name: newTask.name,
      completed: false,
      listId: newTask.listId,
    });
    res.json(createdTask);
  } catch (err) {
    next(err);
  }
});

taskRouter.put("/", async (req, res, next) => {
  try {
    const id = req.body.id;
    const newTask = req.body;
    const updatedTask = await Task.update(
      {
        name: newTask.name,
        completed: newTask.completed,
        listId: newTask.listId,
      },
      { where: { id } }
    );
    res.json(updatedTask);
  } catch (err) {
    next(err);
  }
});

taskRouter.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.findAll({ include: [List] });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

taskRouter.delete("/:taskId", async (req, res, next) => {
  try {
    const id = req.params.taskId;
    console.log(id);
    await Task.destroy({ where: { id: id } });
    res.end();
  } catch (err) {
    next(err);
  }
});

module.exports = taskRouter;
