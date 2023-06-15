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
  const tdCreatedAt = createElement("td", created_at);
  const tdActions = createElement("td");

  const select = createSelect(status);

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

  tasks.forEach((element) => {
    const tr = createRow(element);
    tbody.appendChild(tr);
  });
}
