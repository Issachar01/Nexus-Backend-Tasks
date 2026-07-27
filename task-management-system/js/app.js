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
const filterButtons = document.querySelectorAll('.filter-buttons button');

// 2. Initialize our state
let tasks = loadTasksFromStorage();
let currentFilter = 'All'; // Track current active filter state

// Function to update the stats on the screen
function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;

    totalSpan.textContent = `Total: ${total}`;
    completedSpan.textContent = `Completed: ${completed}`;
    pendingSpan.textContent = `Pending: ${pending}`;
}

// Function to render tasks on the screen
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
            triggerSearchRefresh(); 
            updateStats();
        });

        // Add event listener for delete button
        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks = deleteTask(tasks, task.id);
            saveTasksToStorage(tasks);
            triggerSearchRefresh(); 
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

    // Run validator
    const validation = validateTaskTitle(title, tasks);

    if (!validation.isValid) {
        emptyError.textContent = validation.message;
        emptyError.style.display = 'block';
        return;
    }

    emptyError.style.display = 'none';

    // Create new task
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

// 5. Listen for filter button clicks
filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Remove active class from all buttons and add to clicked one
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        // Extract filter type from button id (e.g., "filter-Pending" -> "Pending")
        currentFilter = e.target.id.replace('filter-', '');
        
        // Refresh the view
        triggerSearchRefresh();
    });
});

// Combined filter helper function (handles both category filter and search keyword)
function triggerSearchRefresh() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Step 1: Filter by category (All, Pending, Completed)
    let result = tasks.filter(task => {
        if (currentFilter === 'Pending') return !task.completed;
        if (currentFilter === 'Completed') return task.completed;
        return true; // 'All'
    });

    // Step 2: Filter by search input keyword
    result = result.filter(task => 
        task.title.toLowerCase().includes(searchTerm)
    );

    renderTasks(result);
}

// Run initial render when page loads
renderTasks();
updateStats();