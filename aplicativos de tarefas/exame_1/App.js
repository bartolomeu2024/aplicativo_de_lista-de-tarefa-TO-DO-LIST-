document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');
    const filterAll = document.getElementById('filter-all');
    const filterActive = document.getElementById('filter-active');
    const filterCompleted = document.getElementById('filter-completed');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let filter = 'all';

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    function renderTasks() {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
            return true;
        });
        filteredTasks.forEach(task => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div>
                    <button class="complete-btn">${task.completed ? 'Cancelar' : 'Completar'}</button>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </div>
            `;
            taskList.appendChild(li);

            li.querySelector('.complete-btn').addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            li.querySelector('.edit-btn').addEventListener('click', () => {
                const newText = prompt('Edit task', task.text);
                if (newText) {
                    task.text = newText;
                    saveTasks();
                    renderTasks();
                }
            });

            li.querySelector('.delete-btn').addEventListener('click', () => {
             tasks = tasks.filter(t => t !== task);
                saveTasks();
                renderTasks();
            });
        });
    }

    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }else{
            alert("ERRO, Campo vazio, preencha o campo!")
        }
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTaskButton.click();
        }
    });

    filterAll.addEventListener('click', () => {
        filter = 'all';
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        filterAll.classList.add('active');
        renderTasks();
    });

    filterActive.addEventListener('click', () => {
        filter = 'active';
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        filterActive.classList.add('active');
        renderTasks();
    });

    filterCompleted.addEventListener('click', () => {
       filter = 'completed';
        document.querySelectorAll('.filters button').forEach(btn => btn.classList.remove('active'));
        filterCompleted.classList.add('active');
        renderTasks();
    });

});
