const { db } = require("./db");
const List = require("./db/List");
const Task = require("./db/Task");

const seed = async () => {
  await db.sync({ force: true });

  // seed the database here

  //Lists
  const list1 = await List.create({
    name: "Household Chores",
  });
  const list2 = await List.create({
    name: "Work Tasks",
  });
  const list3 = await List.create({
    name: "Workout",
  });

  //Tasks
  const task1 = await Task.create({
    name: "mow lawn",
    completed: false,
    listId: list1.id,
  });
  const task2 = await Task.create({
    name: "do dishes",
    completed: false,
    listId: list1.id,
  });
  const task3 = await Task.create({
    name: "take out trash",
    completed: true,
    listId: list1.id,
  });
  const task4 = await Task.create({
    name: "reply to emails",
    completed: true,
    listId: list2.id,
  });
  const task5 = await Task.create({
    name: "fix bugs",
    completed: false,
    listId: list2.id,
  });
  const task6 = await Task.create({
    name: "squats",
    completed: false,
    listId: list3.id,
  });
  const task7 = await Task.create({
    name: "push-ups",
    completed: false,
    listId: list3.id,
  });
  const task8 = await Task.create({
    name: "run a mile",
    completed: true,
    listId: list3.id,
  });
  const task9 = await Task.create({
    name: "kettlebell swings",
    completed: false,
    listId: list3.id,
  });
  const task10 = await Task.create({
    name: "treadmill",
    completed: true,
    listId: list3.id,
  });

  console.log("Seeding success!");
  db.close();
};

seed().catch(err => {
  console.error("Something went wrong!");
  console.error(err);
  db.close();
});
