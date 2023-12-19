const express = require('express');
const app = express();
const port = 3000;
const MAX_SCREENSHOTS = 10;
const screenshots = []; // Array to store screenshots

app.use(express.json({ limit: '50mb' }));

app.post('/api/upload', (req, res) => {
    const screenshot = req.body.image;

    // Add new screenshot to the array
    screenshots.push(screenshot);
    console.log("Screenshot received", screenshot);

    // Remove the oldest screenshot if limit exceeds
    if (screenshots.length > MAX_SCREENSHOTS) {
        screenshots.shift();
    }

    res.json({ status: 'success', message: 'Screenshot received' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
