const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todosEl = document.querySelector(".todos") as HTMLDivElement;
const todoInput = document.querySelector(".todoInput") as HTMLInputElement;
const todosInfoEl = document.querySelector(".todos-info") as HTMLHeadingElement;
const clearBtn = document.querySelector<HTMLButtonElement>(".clear-btn");

type Task = {
    id: number;
    title: string;
    completed: boolean;
}

todoForm.addEventListener("submit", e => {
    e.preventDefault();

    if (todoInput?.value == "" || todoInput?.value == null) return;

    let newTask: Task = {
        id: Math.random(),
        title: todoInput.value,
        completed: false,
    }

    add_todo_to_ls(newTask);

    show_all_todos();

    fixedInput();
});

clearBtn?.addEventListener("click", function () {
    localStorage.clear();
    show_all_todos();
    get_todos_info();
});

function show_all_todos() {
    todosEl.innerHTML = "";
    let tasks = get_todos_from_ls();
    tasks.forEach(task => create_new_todo(task));
    get_todos_info();
}

show_all_todos();

function create_new_todo(task: Task): void {
    let todoEl = document.createElement("div");
    todoEl.className = "todo";

    let label = document.createElement("label");
    label.className = "label";
    label.setAttribute("for", task.title);

    let checkInput = document.createElement("input");
    checkInput.type = "checkbox";
    checkInput.id = task.title;
    checkInput.checked = task.completed;
    todoEl.appendChild(checkInput);

    checkInput.addEventListener("change", _ => {
        task.completed = checkInput.checked;
        add_checked_task_to_ls(task);
    });
    
    label.append(task.title);
    todoEl.appendChild(label);

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "fa-solid fa-trash delete-btn";
    todoEl.appendChild(deleteBtn);

    deleteBtn.addEventListener("click", () => {
        remove_todo_from_ls(task.id);
        show_all_todos();
        get_todos_info();
    });

    todosEl?.appendChild(todoEl);
}

function get_todos_info(): void {
    let tasksLength: number = get_todos_from_ls().length;
    todosInfoEl.innerHTML = `You have ${tasksLength} tasks`;
}

function fixedInput() {
    todoInput.value = "";
    todoInput.focus();
}

function add_todo_to_ls(task: Task): void {
    let tasks = get_todos_from_ls();
    localStorage.setItem("tasks", JSON.stringify([...tasks, task]));
}

function remove_todo_from_ls(id: number): void {
    let tasks = get_todos_from_ls();
    localStorage.setItem("tasks", JSON.stringify(
        tasks.filter(task => task.id !== id)
    ));
}

function add_checked_task_to_ls(task: Task) {
    let tasks = get_todos_from_ls();

    tasks.forEach((taskObj) => {
        if (taskObj.id === task.id) taskObj.completed = task.completed;
    });
   
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function get_todos_from_ls(): Task[] {
    let tasks = JSON.parse(localStorage.getItem("tasks") as string);
    return localStorage.getItem("tasks") === null ? [] : tasks;
}
