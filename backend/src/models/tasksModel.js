const connection = require("./connection");

async function getAll() {
  const [tasks] = await connection.execute("SELECT * FROM tasks");
  return tasks;
}

async function createTask(task) {
  const { title } = task;
  const insertQuery =
    "INSERT INTO tasks(title, status, created_at) VALUES(?, ?, ?)";
  const dateUTC = new Date(Date.now()).toUTCString();

  const [createdTask] = await connection.execute(insertQuery, [
    title,
    "pendente",
    dateUTC,
  ]);

  return { insertId: createdTask.insertId };
}

async function deleteTask(taskId) {
  const deleteQuery = "DELETE FROM tasks WHERE id = ?";
  const [removedTask] = await connection.execute(deleteQuery, [taskId]);
  return removedTask;
}

async function updateTask(id, task) {
  const updateQuery = "UPDATE tasks SET status = ? WHERE id = ?";
  const { status } = task;
  const [updatedTask] = await connection.execute(updateQuery, [status, id]);

  return updatedTask;
}

module.exports = {
  getAll,
  createTask,
  deleteTask,
  updateTask,
};
