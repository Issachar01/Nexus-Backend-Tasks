require('dotenv').config();

const express = require("express");
const app = express();

// Router
const router = require("./routes/students");

// Middleware
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");

app.use(express.json());
app.use(logger);

// Routes
app.use("/api/students", router);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server Running on port ${PORT}...`));