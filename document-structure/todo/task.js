document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('task__input');
    const tasksList = document.getElementById('tasks__list');
    const addButton = document.getElementById('tasks__add');

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return; 

        const taskElement = document.createElement('div');
        taskElement.className = 'task';

        const titleElement = document.createElement('div');
        titleElement.className = 'task__title';
        titleElement.textContent = taskText;

        const removeLink = document.createElement('a');
        removeLink.href = '#';
        removeLink.className = 'task__remove';
        removeLink.innerHTML = '&times;'; // Символ "×"
        taskElement.appendChild(titleElement);
        taskElement.appendChild(removeLink);
        tasksList.appendChild(taskElement);
        taskInput.value = '';
        removeLink.addEventListener('click', function(e) {
            e.preventDefault();
            taskElement.remove();
        });
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});
