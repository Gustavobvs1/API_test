const connection = require("./connection");

async function getAll() {
  const [tasks] = await connection.execute("SELECT * FROM TASKS");
  return tasks;
}

async function createTask(task) {
  const { title } = task;
  const insertQuery =
    "INSERT INTO tasks(title, status, created_at) VALUES(?,?,?)";
  const dateUTC = new Date(Date.now()).toUTCString();

  const createdTask = await connection.execute(insertQuery, [
    title,
    "pendente",
    dateUTC,
  ]);

  return { insertId: createdTask.insertId };
}

module.exports = {
  getAll,
  createTask,
};
