//selectors
const todoBtn = document.querySelector(".todo-button");
const todoInput = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

//event listeners
todoBtn.addEventListener("click", addTask);
todoList.addEventListener("click", checkOrDelete);

// Load tasks from localStorage if available
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks) {
    tasks.forEach((task) => {
      createTaskElement(task.taskName, task.completed);
    });
  }
});

//functions
function addTask(e) {
  e.preventDefault();

  const taskName = todoInput.value;

  if (taskName.trim() !== "") {
    createTaskElement(taskName, false);
    saveTasksToLocalStorage(taskName, false);
    todoInput.value = "";
  }
}

function createTaskElement(taskName, completed) {
  const todoli = document.createElement("li");
  todoli.classList.add("todo");

  const tododiv = document.createElement("div");
  tododiv.classList.add("todo-item");
  tododiv.innerText = taskName;

  const completeBtn = document.createElement("button");
  completeBtn.classList.add("complete-btn");
  completeBtn.innerHTML = '<i class="fas fa-check"></i>';

  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.innerHTML = '<i class="fas fa-trash"></i>';

  todoli.appendChild(tododiv);
  todoli.appendChild(completeBtn);
  todoli.appendChild(trashBtn);

  if (completed) {
    todoli.classList.add("completed");
  }

  todoList.appendChild(todoli);
}

function checkOrDelete(e) {
  const item = e.target;
  const todo = item.parentElement;

  if (item.classList.contains("complete-btn")) {
    todo.classList.toggle("completed");
    updateTaskStatus(todo);
  }

  if (item.classList.contains("trash-btn")) {
    todo.classList.add("fall");
    todo.addEventListener("transitionend", () => {
      todo.remove();
      removeTaskFromLocalStorage(todo);
    });
  }
}

function saveTasksToLocalStorage(taskName, completed) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ taskName, completed });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(todo) {
  const taskName = todo.querySelector(".todo-item").innerText;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const updatedTasks = tasks.filter((task) => task.taskName !== taskName);
  localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function updateTaskStatus(todo) {
  const taskName = todo.querySelector(".todo-item").innerText;
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    if (task.taskName === taskName) {
      task.completed = todo.classList.contains("completed");
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}