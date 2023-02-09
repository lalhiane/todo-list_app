var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var todoForm = document.getElementById("todo-form");
var todosEl = document.querySelector(".todos");
var todoInput = document.querySelector(".todoInput");
var todosInfoEl = document.querySelector(".todos-info");
var clearBtn = document.querySelector(".clear-btn");
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if ((todoInput === null || todoInput === void 0 ? void 0 : todoInput.value) == "" || (todoInput === null || todoInput === void 0 ? void 0 : todoInput.value) == null)
        return;
    var newTask = {
        id: Math.random(),
        title: todoInput.value,
        completed: false
    };
    add_todo_to_ls(newTask);
    show_all_todos();
    fixedInput();
});
clearBtn === null || clearBtn === void 0 ? void 0 : clearBtn.addEventListener("click", function () {
    localStorage.clear();
    show_all_todos();
    get_todos_info();
});
function show_all_todos() {
    todosEl.innerHTML = "";
    var tasks = get_todos_from_ls();
    tasks.forEach(function (task) { return create_new_todo(task); });
    get_todos_info();
}
show_all_todos();
function create_new_todo(task) {
    var todoEl = document.createElement("div");
    todoEl.className = "todo";
    var label = document.createElement("label");
    label.className = "label";
    label.setAttribute("for", task.title);
    var checkInput = document.createElement("input");
    checkInput.type = "checkbox";
    checkInput.id = task.title;
    checkInput.checked = task.completed;
    todoEl.appendChild(checkInput);
    checkInput.addEventListener("change", function (_) {
        task.completed = checkInput.checked;
        add_checked_task_to_ls(task);
    });
    label.append(task.title);
    todoEl.appendChild(label);
    var deleteBtn = document.createElement("button");
    deleteBtn.className = "fa-solid fa-trash delete-btn";
    todoEl.appendChild(deleteBtn);
    deleteBtn.addEventListener("click", function () {
        remove_todo_from_ls(task.id);
        show_all_todos();
        get_todos_info();
    });
    todosEl === null || todosEl === void 0 ? void 0 : todosEl.appendChild(todoEl);
}
function get_todos_info() {
    var tasksLength = get_todos_from_ls().length;
    todosInfoEl.innerHTML = "You have ".concat(tasksLength, " tasks");
}
function fixedInput() {
    todoInput.value = "";
    todoInput.focus();
}
function add_todo_to_ls(task) {
    var tasks = get_todos_from_ls();
    localStorage.setItem("tasks", JSON.stringify(__spreadArray(__spreadArray([], tasks, true), [task], false)));
}
function remove_todo_from_ls(id) {
    var tasks = get_todos_from_ls();
    localStorage.setItem("tasks", JSON.stringify(tasks.filter(function (task) { return task.id !== id; })));
}
function add_checked_task_to_ls(task) {
    var tasks = get_todos_from_ls();
    tasks.forEach(function (taskObj) {
        if (taskObj.id === task.id)
            taskObj.completed = task.completed;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function get_todos_from_ls() {
    var tasks = JSON.parse(localStorage.getItem("tasks"));
    return localStorage.getItem("tasks") === null ? [] : tasks;
}

//# sourceMappingURL=main.js.map
