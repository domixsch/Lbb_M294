const tasksElement = document.getElementById("tasks");
const inputField = document.getElementById(`inputField`);
debugger;

async function getTasks() {
    const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
    });
    const json = await response.json();

    renderTasks(json);
}

async function addTask() {
    const title = inputField.value;

    // Überprüfen, ob das Input-Feld leer ist
    if (title.trim() === "") {
        alert("Das Feld darf nicht leer sein!");
        return;
    }

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

document.forms[0].addEventListener("submit", function(event) {
    event.preventDefault();
    return false;
});
//renderTask
function renderTasks(tasks) {
    tasksElement.replaceChildren();

    tasks.forEach(function(item) {
        const liElement = document.createElement("li");
        liElement.innerText = item.title;

        //wen man auf den Text drauf klickt wird eine linie generiert, falls es schon eine linie hat, wird sie weggenommen
        liElement.addEventListener("mouseover", function(event) {
            if (liElement.tagName === "LI") {
                liElement.style.cursor = "pointer";
            }
        });

        liElement.addEventListener("mouseout", function(event) {
            if (liElement.tagName === "LI") {
                liElement.style.cursor = "default";
            }
        });

        liElement.addEventListener("click", function(event) {
            if (liElement.tagName === "LI") {
                if (liElement.style.textDecoration === "line-through") {
                    liElement.style.textDecoration = "none";
                } else {
                    liElement.style.textDecoration = "line-through";
                }
            }
        });

        const deleteButton = document.createElement("button");
        // deleteButton.innerHTML =
        //   '<img class="img" src="/images/delete.png" alt="Edit">';
        deleteButton.onclick = function() {
            deleteTask(item.id);
        };

        const editButton = document.createElement("button");
        // editButton.innerHTML =
        //   '<img class="img" src="/images/edit.png" alt="Edit">';
        editButton.onclick = function() {
            editTask(item.id);
        };

        liElement.append(deleteButton);
        liElement.append(editButton);
        tasksElement.append(liElement);
    });
}

async function logout() {
    const response = await fetch("http://localhost:3000/auth/cookie/logout", {
        credentials: "include",
        method: "POST",
    });

    if (response.ok) {
        // Redirect to login page
        window.location.href = "/html/login.html";
    } else {
        alert("Logout failed.");
    }
}