function createNewTask(title, priority)  {
    return {id: Date.now(), title: title, priority: priority, completed: false};
}

function toggleTaskStatus(tasksArray, id) {
    return tasksArray.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
}

function deleteTask(tasks, id) {
    return tasks.filter(task => task.id !== id)
}
