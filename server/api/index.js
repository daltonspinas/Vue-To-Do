"use strict";

const router = require("express").Router();
const volleyball = require("volleyball");
const taskRouter = require("./tasks");
const listRouter = require("./lists");

router.use(volleyball);
router.use("/tasks", taskRouter);
router.use("/lists", listRouter);

// Your routes go here!
// NOTE: Any routes that you put here are ALREADY mounted on `/api`
// You can put all routes in this file HOWEVER,
// this file should almost be like a table of contents for the routers you create!
// For example:
//
// For your `/api/puppies` routes:
// router.use('/puppies', require('./puppies'))
//
// And for your `/api/kittens` routes:
// router.use('/kittens', require('./kittens'))

// If someone makes a request that starts with `/api`,
// but you DON'T have a corresponding router, this piece of
// middleware will generate a 404, and send it to your
// error-handling endware!
router.use((req, res, next) => {
  const err = new Error("API route not found!" + JSON.stringify(req.body));
  err.status = 404;
  next(err);
});

module.exports = router;
