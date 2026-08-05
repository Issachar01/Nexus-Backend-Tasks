# Task Management System

A robust, feature-rich Task Management System built using pure, vanilla JavaScript to solidify core programming fundamentals, data structures, and modular design patterns ahead of backend development with Node.js.

---

## Features

*   **Task CRUD Operations:** Easily create, update, and delete tasks.
*   **Status Tracking:** Mark tasks as completed or pending with a single click.
*   **Filtering:** Filter tasks dynamically by **All**, **Completed**, or **Pending**.
*   **Search Functionality:** Instantly search through tasks by title or content.
*   **Priority Levels:** Assign priorities (Low, Medium, High) to manage urgency.
*   **Persistence:** Automatically save and load tasks using the browser's **LocalStorage**.
*   **Task Statistics:** Real-time summary displaying total, completed, and pending task counts.
*   **Input Validation:** Robust error handling and validation for user inputs.
*   **Clean UI/UX:** Fully responsive design with separated layout and styling.

---

## Project Structure

The project follows a clean, modular architecture separating concerns between UI logic, data storage, validation, and core application flow:

```text
task-management-system/
│── index.html
│── css/
│   └── style.css
│── js/
│   ├── app.js
│   ├── task.js
│   ├── storage.js
│   └── validation.js
