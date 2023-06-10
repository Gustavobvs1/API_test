const axios = require("axios");

const url = "http://localhost:3000/task";

const tasks = [
  {
    title: "olá",
  },
  {
    title: "taatt",
  },
  {
    status: "concluida",
  },
  {
    status: "pendente",
  },
];

function getTasks() {
  axios
    .get(url)
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
}

function addTask(task) {
  axios
    .post(url, task)
    .then()
    .catch((err) => console.error(err));
}

function deleteTask(id) {
  axios
    .delete(`${url}/${id}`)
    .then(() => console.log(`Task ${id} deleted`))
    .catch((err) => console.log(err));
}

function updateTask(id, status) {
  axios
    .put(`${url}/${id}`, status)
    .then(() => console.log(`Task ${id} updated with status ${status}`))
    .catch((err) => console.error(err));
}

getTasks();
