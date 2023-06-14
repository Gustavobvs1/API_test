const url = "http://localhost:3000/task";
const tbody = document.querySelector("tbody");

async function fetchTasks() {
  const res = await fetch(url);
  const tasks = await res.json();
  return tasks;
}

function createElement(tag, innerText = "", innerHtml = "") {
  const element = document.createElement(tag);
  if (innerHtml) {
    element.innerHTML = innerHtml;
  }
  if (innerText) {
    element.innerText = innerText;
  }

  return element;
}

const task = {
  id: 0,
  title: "api",
  status: "pendente",
  created_at: "19 do 5 de 2921",
};

function createRow(task) {
  const { id, title, status, created_at } = task;

  const tr = createElement("tr");
  const tdTitle = createElement("td", title);
  const tdStatus = createElement("td");
  const tdCreatedAt = createElement("td", created_at);
  const tdActions = createElement("td");

  const editButton = createElement("button");
}
