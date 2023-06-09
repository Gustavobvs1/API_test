const tasksModel = require("../models/tasksModel");

async function getAll(req, res) {
  const tasks = await tasksModel.getAll();

  return res.status(200).json(tasks);
}

async function createTask(req, res) {
  const createdTask = await tasksModel.createTask(req.body);

  return res.status(201).json(createdTask);
}

module.exports = {
  getAll,
};
