const data = JSON.parse(localStorage.getItem("data")) || [];

function saveData() {
  localStorage.setItem("data", JSON.stringify(data));
}

function completeTodo(index) {
  data.forEach((value, i) => {
    if (i === index) {
      value.isCompleted = !value.isCompleted;
    }
  });

  displayTodo();
  console.table(data);
}

function deleteTodo(index) {
  data.splice(index, 1);

  displayTodo();
}

function actionButtons() {
  const completeButtons = document.querySelectorAll(".complete-btn");
  completeButtons.forEach(function (btn, key, parent) {
    btn.addEventListener("click", () => completeTodo(key));
  });

  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach(function (btn, key, parent) {
    btn.addEventListener("click", () => deleteTodo(key));
  });
}

function displayTodo() {
  const display = document.querySelector(".todo__display");

  const newData = data.map((todo) => {
    const template = `
        <div class="todo__item">
          <p class="todo__text ${todo.isCompleted ? "todo__complete" : ""}">
            ${todo.task}
          </p>

          <div class="todo__button-wrapper">
            <button class="btn complete-btn">✔️</button>
            <button class="btn delete-btn">❌</button>
          </div>
        </div>
    `;

    return template;
  });

  if (data.length) {
    display.innerHTML = newData.join(" ");
  } else {
    display.innerHTML = ` <h2 class="todo__empty">Empty Task</h2>`;
  }
  actionButtons();
  saveData();
}

function formSubmitHandler(e) {
  e.preventDefault();
  const inputValue = e.target[0].value;

  const createTodo = {
    task: inputValue,
    isCompleted: false,
  };

  if (inputValue.trim()) {
    data.unshift(createTodo);
  } else return;

  e.target[0].value = "";

  displayTodo();
}

function initialApp() {
  displayTodo();
  const form = document.querySelector(".todo__input-container");

  form.addEventListener("submit", formSubmitHandler);
}

window.onload = initialApp;
