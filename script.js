// background.js

// Function to show a notification
function showNotification(message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icons/icon48.png",
    title: "Pomodoro Timer",
    message: message,
  });
}

// Event listener for receiving messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startTimer") {
    let timeLeft = message.duration * 60; // Convert duration to seconds

    // Start the timer
    const timerInterval = setInterval(() => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;

      // Send message to popup.js to update the timer display
      chrome.runtime.sendMessage({ action: "updateTimer", minutes, seconds });

      if (timeLeft === 0) {
        clearInterval(timerInterval);
        showNotification("Pomodoro Completed!");
      }

      timeLeft--;
    }, 1000);
  } else if (message.action === "resetTimer") {
    // Send message to popup.js to reset the timer display
    chrome.runtime.sendMessage({ action: "resetTimer" });
  }
});