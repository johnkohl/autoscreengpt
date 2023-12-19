const screenshots = [];
const MAX_SCREENSHOTS = 10;
let isCapturing = false;
let captureInterval;

function startCapturing() {
    if (isCapturing) return; // Already capturing
    isCapturing = true;
    captureInterval = setInterval(captureTab, 1000); // Start capturing every second
}

function stopCapturing() {
    if (!isCapturing) return; // Not capturing
    isCapturing = false;
    clearInterval(captureInterval); // Stop capturing
}

function captureTab() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        if (tabs.length === 0) {
            return; // No active tab found
        }
        const tab = tabs[0];
        chrome.tabs.captureVisibleTab(tab.windowId, {format: 'png'}, function(dataUrl) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }
            screenshots.push(dataUrl);
            if (screenshots.length > MAX_SCREENSHOTS) {
                screenshots.shift(); // Remove the oldest screenshot
            }
            // Optional: Send latest screenshot to popup
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
            }
            chrome.runtime.sendMessage({command: "updateScreenshot", dataUrl: dataUrl});
        });
    });
}

// Listener for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.command === "toggleCapture") {
        if (request.capturing) {
            startCapturing();
        } else {
            stopCapturing();
        }
    } else if (request.command === "clearScreenshots") {
        screenshots.length = 0; // Clear the screenshots array
    }
});
