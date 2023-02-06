const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todosEl = document.querySelector(".todos") as HTMLDivElement;
const todoInput = document.querySelector(".todoInput") as HTMLInputElement;
const todosInfoEl = document.querySelector(".todos-info") as HTMLHeadingElement;
const clearBtn = document.querySelector(".clear-btn") as HTMLButtonElement;

interface TodoInterface {
    id: number;
    title: string;
    create_new_todo?(id: number, title: string): void;
    add_todo_to_ls?(todo: any): void;
    get_todos_from_ls?(): any[];
    show_all_todos?(): void;
}

abstract class Ls implements TodoInterface {
    constructor (public id: number, public title: string) {}
    add_todo_to_ls(): void {
        let todos = this.get_todos_from_ls();
        localStorage.setItem(
            "todo",
            JSON.stringify([...todos, {id: this.id, title: this.title}])
        )
    }
    remove_todo_from_ls(id: number): void {
        let todos = this.get_todos_from_ls();
        localStorage.setItem("todo", JSON.stringify(
            todos.filter(todo => todo.id !== id)
        ));
    }
    get_todos_from_ls(): ({id: number, title: string})[] {
        let todos =  JSON.parse(localStorage.getItem("todo") as string);
        return localStorage.getItem("todo") === null ? [] : todos;
    }
}

class Ui extends Ls implements TodoInterface {
    constructor (id: number, title: string) {
        super(id, title);
    }
    create_new_todo(id: number, title: string): void {
        let todoEl = document.createElement("div");
        todoEl.className = "todo";

        let todoTitleEl = document.createElement("h3");
        todoTitleEl.className = "todo-title";
        todoTitleEl.innerText = title;
        todoEl.appendChild(todoTitleEl);

        let deleteBtn = document.createElement("button");
        deleteBtn.className = "fa-solid fa-trash delete-btn";
        todoEl.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            this.remove_todo_from_ls(id);
            this.show_all_todos();
            this.get_todos_info();
        });

        todosEl.appendChild(todoEl);
    }
    show_all_todos(): void {
        todosEl.innerHTML = "";
        let todos = this.get_todos_from_ls();
        todos.forEach(todo => this.create_new_todo(todo.id, todo.title));
    }
    fixedInput(): void {
        todoInput.value = "";
        todoInput.focus();
    }
    get_todos_info():void {
        let todosLength: number = this.get_todos_from_ls().length;
        todosInfoEl.innerHTML = `You have ${todosLength} pendding tasks`;
    }
}

let generalUiTodo = new Ui(Math.random(), todoInput.value);

generalUiTodo.get_todos_info();

generalUiTodo.show_all_todos();

todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let newUiTodo = new Ui(Math.random(), todoInput.value);
    newUiTodo.add_todo_to_ls();
    newUiTodo.show_all_todos();
    newUiTodo.fixedInput();
    newUiTodo.get_todos_info();
});

clearBtn.addEventListener("click", function () {
    localStorage.clear();
    generalUiTodo.show_all_todos();
    generalUiTodo.get_todos_info();
});