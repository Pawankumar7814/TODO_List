//
const tasks = [];
const taskList = document.getElementById("list");
const addTaskInput = document.getElementById("add");
const tasksCounter = document.getElementById("tasks-counter");

// To append the task list in front-end
function addTaskToDom(task) {
    const li = document.createElement("li");
    li.innerHTML = `
            <input type="checkbox" id="${task.id}" ${task.done?'checked':''} class="custom-checkbox">
            <label for="${task.id}">"${task.text}"</label>
            <button data-id="${task.id}" class="delete"><i class="fa-duotone fas fa-trash"></i></button>
            
    `;
    taskList.append(li);
}

// To render the list of task
function renderList() {
    taskList.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        addTaskToDom(tasks[i]);
        console.log(tasks);
    }

    tasksCounter.innerHTML = tasks.length;
}

// To mark the task as complete
function markTaskComplete(taskId) {
    const task = tasks.filter(function(task) {
        return task.id === taskId;
    });
    if (task.length > 0) {
        const currentTask = task[0];
        currentTask.done = !currentTask.done;
        renderList();
        showNotification("Task has been completed successfully.");
    }
    showNotification("Couldn't mark as complete the task");
}

// To delete the task
function deleteTask(taskId) {
    const newTask = tasks.filter(function(task) {
        return task.id !== taskId;
    });

    tasks = newTask;
    renderList();
    showNotification("Task has been deleted Successfully");
    return;
}

// To add a task
function addTask(task) {
    if (task) {
        tasks.push(task);
        renderList();
        showNotification("Task added sucessully");
        return;
    }
    showNotification("Task cannot be added");
    return;
}

// To show the notification
function showNotification(text) {
    alert(text);
}

// TO handle the input text
function handleInputKeyPress(e) {
    if (e.key === "Enter" || e.keyCode === 13) {
        const text = e.target.value;
        if (!text) {
            showNotification("Task cann not be empty");
            return;
        }

        const task = {
            text: text,
            id: Date.now().toString(),
            done: false,
        };
        // console.log("Task: ", task);

        e.target.value = "";
        addTask(task);
    }
}

addTaskInput.addEventListener("keyup", handleInputKeyPress);