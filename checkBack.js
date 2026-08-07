const express = require('express');
const app = express();

// 1. CUSTOM MIDDLEWARE: A Logger Station
const loggerMiddleware = (req, res, next) => {
    console.log(`New Request! Method: ${req.method} | URL: ${req.url}`);
    
    // IMPORTANT: Hand control off to the next station!
    next(); 
};

// 2. TELL EXPRESS TO USE THIS MIDDLEWARE FOR ALL REQUESTS
app.use(loggerMiddleware);

// 3. FINAL DESTINATION (Route Handler)
app.get('/home', (req, res) => {
    res.send("Welcome Home!");
});

app.listen(3000);