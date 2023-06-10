const tasksModel = require("../models/tasksModel");

async function getAll(req, res) {
  const tasks = await tasksModel.getAll();
  return res.status(200).json(tasks);
}

async function createTask(req, res) {
  const createdTask = await tasksModel.createTask(req.body);
  return res.status(201).json(createdTask);
}

async function deleteTask(req, res) {
  const { id } = req.params;
  await tasksModel.deleteTask(id);
  return res.status(204).json();
}

async function updateTask(req, res) {
  const { id } = req.params;
  await tasksModel.updateTask(id, req.body);
  return res.status(204).json();
}

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
