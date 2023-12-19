const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json({limit: '2mb'})); // for parsing application/json

let screenshots = [];

app.post('/upload', (req, res) => {
    const screenshot = req.body.image; // assuming image is sent in base64
    if (screenshots.length >= 10) {
        screenshots.shift(); // remove the oldest screenshot
    }
    screenshots.push(screenshot); // save the latest screenshot
    // Save to disk or process further as needed
    res.send('Screenshot received');
});

app.get('/query', (req, res) => {
    // Process the query with the latest screenshot
    // For now, just return a simple message
    res.send('Query processed');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
