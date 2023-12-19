const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const MAX_SCREENSHOTS = 10;
const screenshots = []; // Array to store screenshots

// CORS options
const corsOptions = {
    origin: 'chrome-extension://kknfopigokgljdgbacjmokkgpopeeceb',
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

app.post('/api/upload', (req, res) => {
    const screenshot = req.body.image;

    // Add new screenshot to the array
    screenshots.push(screenshot);
    // console.log("Screenshot received", screenshot);
    console.log("Screenshot received");

    // Remove the oldest screenshot if limit exceeds
    if (screenshots.length > MAX_SCREENSHOTS) {
        screenshots.shift();
    }

    res.json({ status: 'success', message: 'Screenshot received' });
});

// GET endpoint to retrieve the most recent screenshot
app.get('/api/screenshot', (req, res) => {
    if (screenshots.length === 0) {
        return res.status(404).json({ status: 'error', message: 'No screenshots available' });
    }

    const latestScreenshot = screenshots[screenshots.length - 1];
    res.json({ status: 'success', image: latestScreenshot });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
