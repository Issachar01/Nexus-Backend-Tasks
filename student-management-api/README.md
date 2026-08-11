```markdown
# Student Management REST API

A robust backend RESTful API built with **Node.js** and **Express.js** to manage student records. This project demonstrates core backend fundamentals, clean code organization, custom middleware architecture, and complete CRUD functionality without relying on an external database.

---

## Features

* **Full CRUD Operations:** Create, read, update (full via `PUT` and partial via `PATCH`), and delete student records.
* **Query Parameter Filtering:** Search and filter students dynamically by name and status (`GET /api/students?name=...&status=...`).
* **Student Statistics:** Calculate and return aggregated data including total student count and average GPA (`GET /api/students/stats`).
* **Custom Middleware:** 
  * Request logging middleware.
  * Robust input validation middleware for payloads.
  * Centralized error-handling middleware.
* **RESTful Architecture:** Clear separation of concerns with dedicated folders for routes, controllers, middleware, and data layers.

---

## Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **Development Tooling:** Nodemon

---

## Project Structure

```text
student-management-api/
├── package.json
├── server.js
├── routes/
│   └── students.js
├── controllers/
│   └── studentController.js
├── middleware/
│   ├── logger.js
│   ├── validateStudent.js
│   └── errorHandler.js
└── data/
    └── students.js

```

---

## Getting Started

### Prerequisites

* Node.js installed on your machine.

### Installation & Running

1. Clone the repository or navigate to your project directory.
2. Install dependencies:
```bash
npm install

```


3. Start the development server using Nodemon:
```bash
npm run devStart

```



---

## API Endpoints Reference

| Operation | HTTP Method | Endpoint | Description |
| --- | --- | --- | --- |
| **Get All / Filter Students** | `GET` | `/api/students` | Returns all students or filters using query params (`?name=...&status=...`) |
| **Get Student Statistics** | `GET` | `/api/students/stats` | Returns total student count and average GPA |
| **Get Single Student** | `GET` | `/api/students/:id` | Returns a single student record by ID |
| **Create Student** | `POST` | `/api/students` | Adds a new student with validation |
| **Full Update** | `PUT` | `/api/students/:id` | Replaces an entire student record |
| **Partial Update** | `PATCH` | `/api/students/:id` | Updates provided fields for a student record |
| **Delete Student** | `DELETE` | `/api/students/:id` | Removes a student record by ID |

```

```