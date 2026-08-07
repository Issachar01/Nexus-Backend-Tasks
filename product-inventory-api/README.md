```markdown
# Product Inventory REST API

A clean, modular RESTful Product Inventory API built with Node.js and Express.js using in-memory data storage (no database required).

---

## Project Structure

```text
product-inventory-api/
│── node_modules/
│── package.json
│── app.js
│
├── routes/
│   └── productRoutes.js
│
├── controllers/
│   └── productController.js
│
├── data/
│   └── products.js
│
└── README.md

```

---

## Getting Started

### Prerequisites

* Node.js installed on your machine.

### Installation & Running

1. Clone or download the project folder.
2. Install dependencies:
```bash
npm install

```


3. Start the server:
```bash
npm start

```


*(Server runs on http://localhost:8000)*

---

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | /products | View all products |
| GET | /products/value | Calculate total inventory value |
| GET | /products/low-stock | View items with quantity < 5 |
| GET | /products/search?name=... | Search products by name |
| GET | /products/category/:category | Filter products by category |
| GET | /products/price/:maxPrice | Find products under a specific price |
| GET | /products/:id | View a single product by ID |
| POST | /products | Add a new product |
| PUT | /products/:id | Update an existing product |
| DELETE | /products/:id | Delete a product |

---

## Validation Rules

When creating (POST) or updating (PUT) a product, the request body must meet the following criteria:

* name: Must be provided (string).
* price: Must be a positive number greater than 0.
* quantity: Must be 0 or greater.
* category: Must be provided (string).

```

```