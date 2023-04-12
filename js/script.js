const tasksElement = document.getElementById("tasks");
const inputField = document.getElementById(`inputField`);


async function getTasks() {
  const response = await fetch("http://localhost:3000/tasks", {
    method: "GET",
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


async function editTask(id) {
  const title = prompt("wie ");

  const response = await fetch("http://localhost:3000/tasks", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      title: title,
    }),
  });

  getTasks();
}

async function deleteTask(id) {
  const response = await fetch(`http://localhost:3000/task/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  });

  getTasks();
}



function renderTasks(tasks) {
  tasksElement.replaceChildren();

  tasks.forEach(function (item) {
    const liElement = document.createElement("li");
    liElement.innerText = item.title;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<img class="img" src="/images/delete.png" alt="Edit">';
    deleteButton.onclick = function () {
      deleteTask(item.id);
    };

    const editButton = document.createElement("button");
    editButton.innerHTML = '<img class="img" src="/images/edit.png" alt="Edit">';
    editButton.onclick = function () {
      editTask(item.id);
    };

    liElement.append(deleteButton);
    liElement.append(editButton);
    tasksElement.append(liElement);
  });
}