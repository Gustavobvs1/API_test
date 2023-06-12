const url = "http://localhost:3000/task";

async function fetchTasks() {
  const res = await fetch(url);
  const tasks = await res.json();
  console.log(tasks);
}

fetchTasks();
