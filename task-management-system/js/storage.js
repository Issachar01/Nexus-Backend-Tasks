function saveTasksToStorage(tasks){
    const tasksJSON = JSON.stringify(tasks);
    localStorage.setItem("nexus_tasks", tasksJSON)
}
function loadTasksFromStorage() {
    const tasksJSON = localStorage.getItem("nexus_tasks");
    if (tasksJSON) { // Capitalize the 'N'
        return JSON.parse(tasksJSON);
    }
    return [];
}