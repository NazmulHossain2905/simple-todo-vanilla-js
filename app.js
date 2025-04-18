const inputField = document.querySelector(".input-filed");
const formElement = document.querySelector(".form-element");
const addButton = document.querySelector(".add-btn");
const todosWrapper = document.querySelector(".todos-wrapper");
const clearCompletedButton = document.querySelector(".clear-complete");

// Todo array
let allTodos = JSON.parse(localStorage.getItem("todos")) || [];

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(allTodos));
}

let todoId;

formElement.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputValue = inputField.value;

  if (inputValue.trim() === "") {
    alert("Please enter your todo text.");

    inputField.focus();
    return;
  }

  const todoObj = {
    id: todoId || Date.now(),
    todoText: inputValue,
    completed: false,
  };

  if (todoId) {
    const updatedTodos = allTodos.map((todo, index) =>
      todo.id === todoId ? todoObj : todo
    );

    allTodos = updatedTodos;
    addButton.innerText = "Add";
    todoId = undefined;
  } else {
    allTodos.unshift(todoObj);
  }

  renderTodos();

  inputField.value = "";
});

function renderTodos() {
  let todos = "";

  for (let i = 0; i < allTodos.length; i++) {
    todos += `<div class="todo-item" id="${allTodos[i].id}">
            ${
              allTodos[i].completed
                ? '<i class="fa-solid fa-circle-check check-btn"></i>'
                : '<i class="fa-regular fa-circle check-btn"></i>'
            }

            <div class="todo-text" style="${
              allTodos[i].completed ? "text-decoration: line-through;" : ""
            }">${allTodos[i].todoText}</div>

            <div class="button-wrapper">
              <i class="fa-solid fa-pen-to-square edit-button ${
                allTodos[i].completed ? "edit-disabled" : ""
              }"></i>
              <i class="fa-solid fa-trash delete-button"></i>
            </div>
          </div> `;
  }

  if (!todos.trim().length) {
    todosWrapper.innerHTML = `<p class="empty-todo">
            <i class="fa-solid fa-box-open"></i>
            You don't have any todos
          </p>`;

    clearCompletedButton.style.display = "none";
  } else {
    todosWrapper.innerHTML = todos;
    clearCompletedButton.style.display = "flex";
  }

  actionButtons();
  saveTodos();
}

function completeTodo(id) {
  allTodos.forEach(function (todo) {
    if (todo.id === +id) {
      todo.completed = !todo.completed;
    } else todo;
  });

  renderTodos();
}

function deleteTodo(id) {
  const todoIndex = allTodos.findIndex((todo) => todo.id === Number(id));
  allTodos.splice(todoIndex, 1);
  renderTodos();
}

function editTodo(id) {
  const findTodo = allTodos.find((todo, index) => todo.id === Number(id));

  if (findTodo.completed) {
    return;
  }

  inputField.value = findTodo.todoText;
  inputField.focus();
  inputField.select();
  addButton.innerText = "Update";
  todoId = findTodo.id;
}

function actionButtons() {
  const checkButtons = document.querySelectorAll(".check-btn");

  for (let i = 0; i < checkButtons.length; i++) {
    checkButtons[i].addEventListener("click", function (event) {
      const parentElement = checkButtons[i].parentElement;
      completeTodo(parentElement.id);
    });
  }

  const deleteButtons = document.querySelectorAll(".delete-button");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function (event) {
      const parentElement = deleteButtons[i].parentElement.parentElement;

      deleteTodo(parentElement.id);
    });
  }

  const editButtons = document.querySelectorAll(".edit-button");
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener("click", function (event) {
      const parentElement = editButtons[i].parentElement.parentElement;

      editTodo(parentElement.id);
    });
  }
}

clearCompletedButton.addEventListener("click", function (e) {
  const completedTodos = allTodos.filter(function (todo) {
    return !todo.completed;
  });

  allTodos = completedTodos;

  renderTodos();
});

renderTodos();
