const url = "http://localhost:3000/task";
const tbody = document.querySelector("tbody");
const addForm = document.querySelector(".add-form");
const inputTasks = document.querySelector(".input-task");

async function fetchTasks() {
  const res = await fetch(url);
  const tasks = await res.json();
  return tasks;
}

async function addTask(event) {
  event.preventDefault();

  const task = {
    title: inputTasks.value,
  };
  await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(task),
  });

  renderTasks();
  inputTasks.value = "";
}

async function deleteTask(id) {
  await fetch(`${url}/${id}`, {
    method: "DELETE",
  });

  renderTasks();
}

async function updateTask({ id, title, status }) {
  await fetch(`${url}/${id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ title, status }),
  });

  renderTasks();
}

function formatDate(dateUTC) {
  const options = { dateStyle: "long", timeStyle: "short" };
  const date = new Date(dateUTC).toLocaleString("pt-br", options);
  return date;
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

function createSelect(value) {
  const options = `
  <option value="pendente">Pendente</option>
  <option value="em andamento">Em andamento</option>
  <option value="concluida">Concluida</option>`;
  const select = createElement("select", "", options);
  select.value = value;
  return select;
}

function createRow(task) {
  const { id, title, status, created_at } = task;

  const tr = createElement("tr");
  const tdTitle = createElement("td", title);
  const tdStatus = createElement("td");
  const tdCreatedAt = createElement("td", formatDate(created_at));
  const tdActions = createElement("td");

  const select = createSelect(status);

  select.addEventListener("change", ({ target }) =>
    updateTask({ ...task, status: target.value })
  );

  const editButton = createElement(
    "button",
    "",
    ' <span class="material-symbols-outlined"> edit </span>'
  );
  const deleteButton = createElement(
    "button",
    "",
    '<span class="material-symbols-outlined"> delete </span>'
  );

  const editForm = createElement("form");
  const editInput = createElement("input");

  editInput.value = title;
  editForm.appendChild(editInput);

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    updateTask({ id, title: editInput.value, status });
  });

  editButton.addEventListener("click", () => {
    tdTitle.innerText = "";
    tdTitle.appendChild(editForm);
  });
  deleteButton.addEventListener("click", () => deleteTask(id));
  editButton.classList.add("btn-action");
  deleteButton.classList.add("btn-action");

  tdStatus.appendChild(select);

  tdActions.appendChild(editButton);
  tdActions.appendChild(deleteButton);

  tr.appendChild(tdTitle);
  tr.appendChild(tdCreatedAt);
  tr.appendChild(tdStatus);
  tr.appendChild(tdActions);

  return tr;
}

async function renderTasks() {
  const tasks = await fetchTasks();
  tbody.innerHTML = "";

  tasks.forEach((element) => {
    const tr = createRow(element);
    tbody.appendChild(tr);
  });
}

addForm.addEventListener("submit", addTask);

renderTasks();
