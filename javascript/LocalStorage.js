export let taskBtn, mdTaskBtn, settingBtn, mdSettingBtn, saveBtn, addTaskBtn, signInMessage, deleteProjectBtn, submitBtn, taskList;

let newTaskModel, cancelAllBtn, overlay, deleteProjectName, projectSettingBoxContainer, title, startDate, endDate, task, projectTitle, projectName, threeDotBtn, smallScreenProjectTitleBox, titleBox, managerBox, emailBox;

export function HTMLcontentLoad() {
    taskBtn = document.querySelector(".taskBtn");
    mdTaskBtn = document.querySelector(".mdTaskBtn");
    settingBtn = document.querySelector(".settingBtn");
    mdSettingBtn = document.querySelector(".mdSettingBtn");
    saveBtn = document.querySelector(".saveBtn");
    addTaskBtn = document.querySelector(".addTaskBtn");
    submitBtn = document.querySelector(".submitBtn");
    signInMessage = document.querySelector(".signInMessageBox");
    deleteProjectBtn = document.querySelector(".deleteProjectBtn")
    projectTitle = document.getElementById("projectTitle");
    projectName = localStorage.getItem("projectName");
    taskList = document.getElementById("taskList");
}

title = document.querySelector(".taskTitle");
startDate = document.querySelector(".startDate");
endDate = document.querySelector(".endDate");
newTaskModel = document.querySelector(".newTaskModel");
projectSettingBoxContainer = document.querySelector(".projectSettingBoxContainer");
cancelAllBtn = document.querySelectorAll(".cancelBtn, .closeBtn");
overlay = document.querySelector(".overlay");
deleteProjectName = document.querySelector(".projectName");
threeDotBtn = document.querySelector(".threeDotBtn");
smallScreenProjectTitleBox = document.querySelector(".smallScreenProjectTitleBox");
titleBox = document.querySelector(".titleBox");
managerBox = document.querySelector(".managerBox");
emailBox = document.querySelector(".emailBox");

export function showProjectName() {
    if (projectTitle) {
        if (projectName) {
            projectTitle.textContent = projectName;
        }
        else {
            projectTitle.textContent = "Untitled Project";
        }
    }
}

export function windowLoad() {
    taskBtn?.classList.add("active");
    projectSettingBoxContainer?.classList.add("hideDetails");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => renderTask(task))
}

export function saveProjectName() {
    projectName = document.getElementById("projectT").value;

    if (!titleBox.value && !managerBox.value && !emailBox.value) {
        alert("please fill all details");
    }
    else {
        localStorage.setItem("projectName", projectName);
        window.location.href = "home.html";
    }
}

export function addTaskModel() {
    if (addTaskBtn && cancelAllBtn && newTaskModel && overlay) {

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
}

export function submitSaveDetails() {
    if (!title.value || !startDate.value || !endDate.value) {
        alert("please fill required fields");
    }
    else {
        task = {
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

}

export function showTask() {
    taskList.innerHTML = "";
    taskBtn.classList.add("active");
    settingBtn.classList.remove('active');
    projectSettingBoxContainer.classList.add("hideDetails");
    taskList.classList.remove("hideDetails");
    addTaskBtn.classList.remove("hideDetails");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => renderTask(task))
}

export function renderTask(task) {
    const checkBtn = document.createElement("input");
    checkBtn.type = "checkbox";
    checkBtn.className = "checkBtn";

    const li = document.createElement("li");
    li.className = "toDoListItems";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // const start = new Date(task.startDate);
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


    divDays.appendChild(daysLeft);

    divTask.appendChild(checkBtn);
    divTask.appendChild(text);

    li.appendChild(divDays);
    li.appendChild(divTask);

    taskList?.appendChild(li);

    checkBtn.addEventListener("click", () => {
        deleteTaskById(task.id, li, days);
    })
}

export function showSetting() {
    taskBtn.classList.remove("active");
    settingBtn.classList.add('active');
    projectSettingBoxContainer.classList.remove("hideDetails");
    taskList.classList.add("hideDetails");
    addTaskBtn.classList.add("hideDetails");
}

export function hideSetting() {
    projectSettingBoxContainer?.classList.add("hideDetails");
    addTaskBtn?.classList.add("hideDetails");
}

export function deleteProject() {
    const projectName = localStorage.getItem("projectName");
    if (projectName === deleteProjectName.value) {
        localStorage.removeItem("projectName");
        localStorage.removeItem("tasks");

        window.location.href = "new_project.html";
    }
}

export function deleteTaskById(idToDelete, list, days) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const updatedTask = tasks.filter(task => task.id !== idToDelete);

    localStorage.setItem("tasks", JSON.stringify(updatedTask));

    list.remove();

    if (days < 0) {
        alert(`Task is completed ${Math.abs(days)} days late`);
    }
    else {
        alert(`Task is completed ${days} days early`);
    }
}

threeDotBtn?.addEventListener("click", () => {
    smallScreenProjectTitleBox.classList.toggle("showOverlay");
})