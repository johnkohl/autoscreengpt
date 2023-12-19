require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 3000;
const sharp = require('sharp');

const MAX_SCREENSHOTS = 10;
const screenshotsDir = path.join(__dirname, 'screenshots');
const screenshots = []; // Array to store screenshot filenames

// Ensure the screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir);
}

// CORS options
const corsOptions = {
    origin: `chrome-extension://${process.env.EXTENSION_ID}`, // Use the EXTENSION_ID from .env
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));

app.post('/api/upload', (req, res) => {
    const screenshotData = req.body.image;
    const base64Data = screenshotData.replace(/^data:image\/png;base64,/, "");

    const filename = `screenshot-${Date.now()}.png`;
    const filepath = path.join(screenshotsDir, filename);

    // Convert base64 to buffer for processing
    const buffer = Buffer.from(base64Data, 'base64');

    // Resize the image using sharp
    sharp(buffer)
        .resize(1024, 1024, {
            fit: 'inside', // Maintains aspect ratio
            withoutEnlargement: true // Prevents enlarging smaller images
        })
        .sharpen()
        .toBuffer()
        .then(resizedBuffer => {
            // Save the resized image
            fs.writeFile(filepath, resizedBuffer, function(err) {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ status: 'error', message: 'Failed to save screenshot' });
                }

                console.log("Screenshot saved", filename);

                // Manage screenshot array
                screenshots.push(filename);
                if (screenshots.length > MAX_SCREENSHOTS) {
                    const oldFile = screenshots.shift();
                    fs.unlink(path.join(screenshotsDir, oldFile), (err) => {
                        if (err) console.error(err);
                        else console.log(`Deleted old screenshot: ${oldFile}`);
                    });
                }

                res.json({ status: 'success', message: 'Screenshot received' });
            });
        })
        .catch(err => {
            console.error(err);
            return res.status(500).json({ status: 'error', message: 'Failed to process image' });
        });
});


// GET endpoint to retrieve the most recent screenshot
app.get('/api/screenshot', (req, res) => {
    if (screenshots.length === 0) {
        return res.status(404).json({ status: 'error', message: 'No screenshots available' });
    }

    const latestScreenshot = screenshots[screenshots.length - 1];
    res.sendFile(path.join(screenshotsDir, latestScreenshot));
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
