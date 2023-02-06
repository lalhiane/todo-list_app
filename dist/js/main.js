var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Ls = /** @class */ (function () {
    function Ls(id, title) {
        this.id = id;
        this.title = title;
    }
    Ls.prototype.add_todo_to_ls = function () {
        var todos = this.get_todos_from_ls();
        localStorage.setItem("todo", JSON.stringify(__spreadArray(__spreadArray([], todos, true), [{ id: this.id, title: this.title }], false)));
    };
    Ls.prototype.remove_todo_from_ls = function (id) {
        var todos = this.get_todos_from_ls();
        localStorage.setItem("todo", JSON.stringify(todos.filter(function (todo) { return todo.id !== id; })));
    };
    Ls.prototype.get_todos_from_ls = function () {
        var todos = JSON.parse(localStorage.getItem("todo"));
        return localStorage.getItem("todo") === null ? [] : todos;
    };
    return Ls;
}());
var Ui = /** @class */ (function (_super) {
    __extends(Ui, _super);
    function Ui(id, title) {
        return _super.call(this, id, title) || this;
    }
    Ui.prototype.create_new_todo = function (id, title) {
        var _this = this;
        var todoEl = document.createElement("div");
        todoEl.className = "todo";
        var todoTitleEl = document.createElement("h3");
        todoTitleEl.className = "todo-title";
        todoTitleEl.innerText = title;
        todoEl.appendChild(todoTitleEl);
        var deleteBtn = document.createElement("button");
        deleteBtn.className = "fa-solid fa-trash delete-btn";
        todoEl.appendChild(deleteBtn);
        deleteBtn.addEventListener("click", function () {
            _this.remove_todo_from_ls(id);
            _this.show_all_todos();
            _this.get_todos_info();
        });
        todosEl.appendChild(todoEl);
    };
    Ui.prototype.show_all_todos = function () {
        var _this = this;
        todosEl.innerHTML = "";
        var todos = this.get_todos_from_ls();
        todos.forEach(function (todo) { return _this.create_new_todo(todo.id, todo.title); });
    };
    Ui.prototype.fixedInput = function () {
        todoInput.value = "";
        todoInput.focus();
    };
    Ui.prototype.get_todos_info = function () {
        var todosLength = this.get_todos_from_ls().length;
        todosInfoEl.innerHTML = "You have ".concat(todosLength, " pendding tasks");
    };
    return Ui;
}(Ls));
var generalUiTodo = new Ui(Math.random(), todoInput.value);
generalUiTodo.get_todos_info();
generalUiTodo.show_all_todos();
todoForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var newUiTodo = new Ui(Math.random(), todoInput.value);
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

//# sourceMappingURL=main.js.map
