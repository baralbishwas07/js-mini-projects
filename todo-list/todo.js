let todoLists = JSON.parse(localStorage.getItem('todoLists')) || [];
renderTodo();

function renderTodo() {
    let todoListHtml = '';
    if(todoLists.length == 0) {
        todoListHtml += "<p>No todos currently</p>";
    }

    for (let i = 0; i < todoLists.length; i++) {
        let lists = todoLists[i];
        const { name, date } = lists;
        let html = `
        <div>${name}</div>
        <div>${date}</div>
        <button onclick = "
        todoLists.splice(${i},1);
        renderTodo();
        saveToLocal();
        " class = "todo-delete">Delete</button>`;
        todoListHtml += html;
    }
    document.querySelector('.js-todo-lists')
        .innerHTML = todoListHtml;
}


function addTodo() {
    let inputElement = document.querySelector('.js-input');
    let name = inputElement.value;

    let dateInput = document.querySelector('.js-due-date');
    let date = dateInput.value;

    todoLists.push({ name, date });
    inputElement.value = '';
    renderTodo();
    saveToLocal();
}

function saveToLocal() {
    localStorage.setItem('todoLists', JSON.stringify(todoLists));
}