const input = document.querySelector("#bar-task");
const addBtn = document.querySelector(".task-add-btn");
const taskList = document.querySelector("#task-list");
const errorMsg = document.querySelector("#error-text");
const totalTaskElement = document.querySelector("#total-task");
const completedTaskElement = document.querySelector("#completed-task");
const incompletedTaskElement = document.querySelector("#incompleted-task");

const saveTasks = () => {
    localStorage.setItem("tasks", taskList.innerHTML);
};

const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
        taskList.innerHTML = savedTasks;
        updateCounters();
    }
};

const updateCounters = () => {
    const totalTasks = taskList.querySelectorAll(".task-item").length;
    const completedTasks = taskList.querySelectorAll(".task-del-text").length;
    const incompletedTasks = totalTasks - completedTasks;

    totalTaskElement.textContent = `Total: ${totalTasks}`;
    completedTaskElement.textContent = `completed: ${completedTasks}`;
    incompletedTaskElement.textContent = `incompleted: ${incompletedTasks}`;
};

document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateCounters();
    errorMsg.style.display = "none";
});

const addTask = () => {
    const taskText = input.value.trim();

    if (taskText === "") {
        errorMsg.style.display = "flex";
        return;
    }

    errorMsg.style.display = "none";

    const taskItem = document.createElement("li");
    taskItem.classList.add("task-item");

    taskItem.innerHTML = `
    <button class="task-delete-btn">X</button>
    <p class="task-text">${taskText}</p>
    <button class="task-check-btn">✔</button>
  `;

    taskList.appendChild(taskItem);
    input.value = "";

    updateCounters();
    saveTasks();
};

addBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    addTask();
});

input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        e.preventDefault();
        addTask();
    }
});

taskList.addEventListener("click", e => {
    const target = e.target;

    if (target.classList.contains("task-check-btn")) {
        const taskItem = target.closest(".task-item");
        const taskText = taskItem.querySelector(".task-text");

        if (taskText) {
            const taskTextContent = taskText.textContent;
            const delElement = document.createElement("del");
            delElement.classList.add("task-del-text");
            delElement.textContent = taskTextContent;

            taskItem.replaceChild(delElement, taskText);
        } else {
            const delText = taskItem.querySelector(".task-del-text");
            if (delText) {
                const taskTextContent = delText.textContent;
                const pElement = document.createElement("p");
                pElement.classList.add("task-text");
                pElement.textContent = taskTextContent;

                taskItem.replaceChild(pElement, delText);
            }
        }

        updateCounters();
        saveTasks();
    }

    if (target.classList.contains("task-delete-btn")) {
        const task = target.closest(".task-item");
        task.remove();

        updateCounters();
        saveTasks();
    }
});
