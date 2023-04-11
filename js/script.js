let addToDoButton = document.getElementById(`addTask`);
let toDoContainer = document.getElementById(`toDoContainer`);
let inputField = document.getElementById(`inputField`);

addToDoButton.addEventListener(`click`, function () {
  const listElement = document.createElement("li");
  listElement.classList.add("paragraph-styling");
  listElement.innerText = inputField.value;
  toDoContainer.appendChild(listElement);
  inputField.value = "";
  listElement.addEventListener("click", function () {
  listElement.style.textDecoration = "line-through";
  });
  listElement.addEventListener("dblclick", function () {
    toDoContainer.removeChild(listElement);
  });
});


const tasksElement = document.getElementById("getTask");
async function getTasks() {
    const response = await fetch("http://localhost:3000/tasks", {
        method: "GET"
    });
    const json = await response.json();

    renderTasks(json);
}

async function addTask() {
    const title = inputField.value;

    const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            title: title,
        }),
    });

    getTasks();
}

