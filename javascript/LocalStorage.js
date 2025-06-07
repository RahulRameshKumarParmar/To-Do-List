const newTaskModel = document.querySelector(".newTaskModel");
const addTaskBtn = document.querySelector(".addTaskBtn");
const cancelAllBtn = document.querySelectorAll(".cancelBtn, .closeBtn");
const overlay = document.querySelector(".overlay");
const taskBtn = document.querySelector(".taskBtn");
const settingBtn = document.querySelector(".settingBtn");
const taskList = document.getElementById("taskList");
const projectSettingBoxContainer = document.querySelector(".projectSettingBoxContainer");
const deleteProjectName = document.querySelector(".projectName");

let saveProjectName = () => {
    const projectName = document.getElementById("projectT").value;
    localStorage.setItem("projectName", projectName);
    window.location.href = "home.html";
}

const projectName = localStorage.getItem("projectName");
if (projectName) {
    document.getElementById("projectTitle").textContent = projectName;
}
else {
    document.getElementById("projectTitle").textContent = "Untitled Project";
}

function addTaskModel() {
    addTaskBtn.addEventListener("click", () => {
        newTaskModel.classList.add("showNewTaskModel");
        overlay.classList.add("showOverlay");
    })

    cancelAllBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            newTaskModel.classList.remove("showNewTaskModel");
            overlay.classList.remove("showOverlay");
        })
    })
}

addTaskModel();

window.onload = () => {
    taskBtn.classList.add("active");
    projectSettingBoxContainer.classList.add("hideDetails");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => renderTask(task))
}

function showTask() {
    taskList.innerHTML = "";
    taskBtn.classList.add("active");
    settingBtn.classList.remove('active');
    projectSettingBoxContainer.classList.add("hideDetails");
    taskList.classList.remove("hideDetails");
    addTaskBtn.classList.remove("hideDetails");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => renderTask(task))
}


function renderTask(task) {
    const checkBtn = document.createElement("input");
    checkBtn.type = "checkbox";
    checkBtn.className = "checkBtn";

    const li = document.createElement("li");
    li.className = "toDoListItems";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const start = new Date(task.startDate);
    const end = new Date(task.endDate);

    const diffDate = end - today;
    const days = Math.ceil(diffDate / (1000 * 60 * 60 * 24));

    const daysLeft = document.createElement("span");

    const divDays = document.createElement("div");
    const divTask = document.createElement("div");

    if (days < 0) {
        daysLeft.textContent = `Days Late: ${Math.abs(days)}`
        daysLeft.className = "redText"
    }
    else {
        daysLeft.textContent = `Days Left: ${days}`;
        daysLeft.className = "greenText"
    }

    const text = document.createTextNode(`${task.title}`);

    checkBtn.addEventListener("click", () => {
        deleteTaskById(task.id);
    })

    divDays.appendChild(daysLeft);

    divTask.appendChild(checkBtn);
    divTask.appendChild(text);

    li.appendChild(divDays);
    li.appendChild(divTask);

    taskList.appendChild(li);
}

function deleteTaskById(idToDelete) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTask = tasks.filter(task => task.id !== idToDelete);

    localStorage.setItem("tasks", JSON.stringify(updatedTask));

    location.reload();
}

function submitSaveDetails() {

    function addTask() {
        const title = document.querySelector(".taskTitle");
        const startDate = document.querySelector(".startDate");
        const endDate = document.querySelector(".endDate");

        if (!title.value || !startDate.value || !endDate.value) {
            alert("please fill required fields");
            return;
        }

        const task = {
            id: Date.now(),
            title: title.value,
            startDate: startDate.value,
            endDate: endDate.value
        };

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));

        renderTask(task);

        // Clear Fields

        task.title = "";
        task.startDate = "";
        task.endDate = "";

        newTaskModel.classList.remove("showNewTaskModel");
        overlay.classList.remove("showOverlay");
    }
    addTask();
}

function showSetting(){
    taskBtn.classList.remove("active");
    settingBtn.classList.add('active');
    projectSettingBoxContainer.classList.remove("hideDetails");
    taskList.classList.add("hideDetails");
    addTaskBtn.classList.add("hideDetails");
}

function deleteProject(){
    const projectName = localStorage.getItem("projectName");
    if(projectName === deleteProjectName.value){
        localStorage.removeItem("projectName");
        localStorage.removeItem("tasks");

        window.location.href = "new_project.html"; 
    }
}