// Selector
let todoInput = document.querySelector(".todoInput");
let todoButton = document.querySelector(".todoButton");
let todoList = document.querySelector(".todoList");
// let filterOption = document.querySelector(".filter-todo");

// Event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
// filterOption.addEventListener('click', filterTodo);

// Functions
function addTodo(event){
    // Prevent form from submitting
    event.preventDefault();
    // Todo Div
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create Li
    let createTodo = document.createElement('li');
    createTodo.innerText = todoInput.value;
    createTodo.classList.add('todoItem');
    todoDiv.appendChild(createTodo);
    // Add Todo To LocalStorage
    saveLocalTodos(todoInput.value);
    // Check Mark Button
    let completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('completedBtn');
    todoDiv.appendChild(completedButton);
    // Check Delete Button
    let deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('deleteBtn');
    todoDiv.appendChild(deleteButton);
    // Append To List
    todoList.appendChild(todoDiv);
    // Clear Todo Input Value
    todoInput.value = "";
}

function deleteCheck(e){
    let item = e.target;
    // Delete Todo
    if (item.classList[0] === 'deleteBtn'){
        let todo = item.parentElement;
        removeLocalTodos(todo);
        todo.remove();
    }
    // Check Mark
    if (item.classList[0] === 'completedBtn'){
        let todo = item.parentElement;
        todo.classList.toggle('completed');
        console.log(todo);
    }
}

// function filterTodo(e){
//     let todos = todoList.childNodes;
//     todos.forEach(function(todo){
//         switch(e.target.value){
//             case "all":
//                 todo.style.display = "flex";
//                 break;
//             case "completed":
//                 if(todo.classList.contains('completed')){
//                     todo.style.display = "flex";
//                 } else {
//                     todo.style.display = "none";
//                 }
//                 break;
//             case "uncompleted":
//                 if(!todo.classList.contains('completed')){
//                     todo.style.display = "flex";
//                 } else {
//                     todo.style.display = "none";
//                 }
//                 break;
//         }
//     });
// }

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //Create list
        const createTodo = document.createElement("li");
        createTodo.innerText = todo;
        createTodo.classList.add("todoItem");
        todoDiv.appendChild(createTodo);
        todoInput.value = "";
        //Create Completed Button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = `<i class="fas fa-check"></i>`;
        completedButton.classList.add("completedBtn");
        todoDiv.appendChild(completedButton);
        //Create trash button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteButton.classList.add("deleteBtn");
        todoDiv.appendChild(deleteButton);
        //attach final Todo
        todoList.appendChild(todoDiv);
      });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
