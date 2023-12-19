document.addEventListener('DOMContentLoaded', function() {
    var captureButton = document.getElementById('toggleCapture');
    var clearButton = document.getElementById('clearScreenshots');
    var captureStatus = document.getElementById('captureStatus');
    var isCapturing = false;

    captureButton.addEventListener('click', function() {
        isCapturing = !isCapturing; // Toggle capturing state
        chrome.runtime.sendMessage({command: "toggleCapture", capturing: isCapturing});
        captureButton.textContent = isCapturing ? "Stop Capture" : "Start Capture";
        captureStatus.textContent = isCapturing ? "Active" : "Inactive";
    });

    clearButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({command: "clearScreenshots"});
    });

    // Optional: Listen for messages from background.js
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.command === "updateScreenshot") {
            var screenshotPreview = document.getElementById('screenshotPreview');
            screenshotPreview.style.backgroundImage = `url(${request.dataUrl})`;
        }
    });
});
