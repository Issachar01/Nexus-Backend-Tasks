function validateTaskTitle(title, existingTasks) {
    const trimmedTitle = title.trim();

    if (trimmedTitle === "") {
        return { isValid: false, message: "Task cannot be empty" };
    }

    if (trimmedTitle.length < 3) {
        return { isValid: false, message: "Task must be at least 3 characters long" };
    }

    const isDuplicate = existingTasks.some(
        task => task.title.toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (isDuplicate) {
        return { isValid: false, message: "A task with this title already exists" };
    }

    return { isValid: true, message: "" };
}