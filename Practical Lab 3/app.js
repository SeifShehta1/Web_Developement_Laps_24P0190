let todos = [];
let currentFilter = 'all';

const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const itemsLeft = document.getElementById('itemsLeft');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const filterBtns = document.querySelectorAll('.filter-btn');

addBtn.addEventListener('click', () => {
    const text = todoInput.value.trim();
    if (text !== '') {
        const newTodo = {
            id: Date.now(),
            text: text,
            completed: false
        };
        todos.push(newTodo);
        todoInput.value = '';
        renderTodos();
    }
});

todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addBtn.click();
    }
});

function renderTodos() {
    todoList.innerHTML = '';

    const filteredTodos = todos.filter((todo) => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true;
    });

    filteredTodos.forEach((todo) => {
        const li = document.createElement('li');
        if (todo.completed) li.classList.add('completed');

        const leftDiv = document.createElement('div');
        leftDiv.className = 'task-left';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed;
        checkbox.addEventListener('change', () => {
            todo.completed = checkbox.checked;
            renderTodos();
        });

        const span = document.createElement('span');
        span.className = 'text';
        span.textContent = todo.text;

        span.addEventListener('dblclick', () => {
            const inputEdit = document.createElement('input');
            inputEdit.type = 'text';
            inputEdit.value = todo.text;
            inputEdit.className = 'edit-input';
            
            li.replaceChild(inputEdit, span);
            inputEdit.focus();

            inputEdit.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    if (inputEdit.value.trim() !== '') {
                        todo.text = inputEdit.value.trim();
                    }
                    renderTodos();
                }
            });

            inputEdit.addEventListener('blur', () => {
                if (inputEdit.value.trim() !== '') {
                    todo.text = inputEdit.value.trim();
                }
                renderTodos();
            });
        });

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.innerHTML = '🗑️';
        deleteBtn.addEventListener('click', () => {
            todos = todos.filter(t => t.id !== todo.id);
            renderTodos();
        });

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} items left`;
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter') || 'all';
        renderTodos();
    });
});

clearCompletedBtn.addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    renderTodos();
});

clearAllBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
});