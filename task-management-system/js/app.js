// 1. Grab our HTML elements
const taskForm = document.querySelector('form');
const taskInput = document.querySelector('#task-input');
const priorityInput = document.querySelector('#priority-selection'); // hidden input from custom dropdown
const taskList = document.querySelector('#task-list');
const emptyError = document.querySelector('#empty-error');
const totalSpan = document.querySelector('#total');
const completedSpan = document.querySelector('#completed');
const pendingSpan = document.querySelector('#pending');
const searchInput = document.querySelector('#search-task'); // Search input element

// 2. Initialize our tasks array from localStorage (The Freezer!)
let tasks = loadTasksFromStorage();

// Function to update the stats on the screen
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalSpan.textContent = `Total: ${total}`;
    completedSpan.textContent = `Completed: ${completed}`;
    pendingSpan.textContent = `Pending: ${pending}`;
}

// Function to render tasks on the screen (takes an optional list so search can use it)
function renderTasks(tasksToRender = tasks) {
    taskList.innerHTML = ''; // Clear current list

    tasksToRender.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        li.innerHTML = `
            <input type="checkbox" class="custom-checkbox" ${task.completed ? 'checked' : ''}>
            <span class="task-title ${task.completed ? 'completed' : ''}">${task.title}</span>
            <span class="badge ${task.priority.toLowerCase()}-priority">${task.priority}</span>
            <button type="button" class="delete-btn" data-id="${task.id}">Delete</button>
        `;

        // Add event listener for checkbox toggle
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            tasks = toggleTaskStatus(tasks, task.id);
            saveTasksToStorage(tasks);
            triggerSearchRefresh(); // Refresh view keeping search active
            updateStats();
        });

        // Add event listener for delete button
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks = deleteTask(tasks, task.id);
            saveTasksToStorage(tasks);
            triggerSearchRefresh(); // Refresh view keeping search active
            updateStats();
        });

        taskList.appendChild(li);
    });
}

// 3. Listen for form submission (Adding a task)
taskForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page from refreshing

    const title = taskInput.value;
    const priority = priorityInput.value;

    // Run our validator (from validation.js)
    const validation = validateTaskTitle(title, tasks);

    if (!validation.isValid) {
        emptyError.textContent = validation.message;
        emptyError.style.display = 'block';
        return;
    }

    // Hide error if valid
    emptyError.style.display = 'none';

    // Create new task (from task.js)
    const newTask = createNewTask(title, priority);
    tasks.push(newTask);

    // Save and re-render
    saveTasksToStorage(tasks);
    triggerSearchRefresh();
    updateStats();

    // Reset input text and custom dropdown UI back to default
    taskInput.value = '';
    document.querySelector('.select-selected').textContent = 'Medium';
    priorityInput.value = 'Medium';
});

// 4. Listen for typing in the search box
searchInput.addEventListener('input', () => {
    triggerSearchRefresh();
});

// Helper function to filter tasks based on current search input value
function triggerSearchRefresh() {
    const searchTerm = searchInput.value.toLowerCase();
    
    const filteredTasks = tasks.filter(task => 
        task.title.toLowerCase().includes(searchTerm)
    );

    renderTasks(filteredTasks);
}

// Run initial render when page loads
renderTasks();
updateStats();