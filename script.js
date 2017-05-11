var TodoList = {
    todos: [],

    addTodo: function (todoText) {
        this.todos.push({
            todoText: todoText,
            completed: false
        });
    },
    changeTodo: function (position, todoText) {
        this.todos[position].todoText = todoText;
    },
    deleteTodo: function (position) {
        this.todos.splice(position, 1);
    },
    toggleAll: function () {
        var counter = 0;
        for (var i = 0; i < this.todos.length; i++) {
            if (this.todos[i].completed === true) {
                counter++;
            }
        }
        if (counter === this.todos.length) {
            for (var i = 0; i < this.todos.length; i++) {
                this.toggleCompleted(i);
            }
        } else {
            for (var i = 0; i < this.todos.length; i++) {
                this.todos[i].completed = true;
            }
        }
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    }

};


var handlers = {

    toggleAll: function () {
        TodoList.toggleAll();
        view.displayTodos();
    },
    addTodo: function () {
        TodoList.addTodo(document.getElementById("addTodoTextInput").value);
        addTodoTextInput.value = "";
        view.displayTodos();
    },
    deleteTodo: function (position) {
        TodoList.deleteTodo(position);
        view.displayTodos();
    },
    changeTodo: function () {
        TodoList.changeTodo(document.getElementById("changeTodoPosition").value, document.getElementById("changeTodoText").value);
        changeTodoPosition.value = "";
        changeTodoText.value = "";
        view.displayTodos();
    },
    toggleCompleted: function (position) {
        TodoList.toggleCompleted(position);
        togglePosition.value = "";
        view.displayTodos();
    }
};

var view = {
    displayTodos: function () {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = "";
        for (var i = 0; i < TodoList.todos.length; i++) {
            var todosLi = document.createElement('li');

            var todo = TodoList.todos[i];
            var todoTextWithCompletion = "";

            if (todo.completed === true) {
                todoTextWithCompletion = "☑ " + todo.todoText;
            } else {
                todoTextWithCompletion = "☐ " + todo.todoText;
            }

            todosLi.textContent = todoTextWithCompletion;
            todosLi.id = [i];
            todosLi.className = "listitem";
            todosLi.appendChild(this.createDeleteButton());
            todosUl.appendChild(todosLi);

        }
    },

    createDeleteButton: function () {
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "deleteButton";
        return (deleteButton);
    }
};

var todosUl = document.querySelector('ul');

todosUl.addEventListener('click', function (event) {
    var elementClicked = event.target;
    if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
    if (elementClicked.className === "listitem") {
        handlers.toggleCompleted(parseInt(elementClicked.id));
    }

});








