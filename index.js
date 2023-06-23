let timeLeft = 25 * 60;
let timerIntervalId;


function startTimer() {
  timerIntervalId = setInterval(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;

    if (timeLeft === 0) {
      clearInterval(timerIntervalId);
      showNotification("Pomodoro Completed!");
    }

    timeLeft--;
  }, 1000);
}


function resetTimer() {
  clearInterval(timerIntervalId);
  document.getElementById("timer").textContent = "25:00"; // Reset to initial time
  timeLeft = 25 * 60; // Reset time in seconds
}


function showNotification(message) {
  // Use Chrome's notification API to show a notification
  chrome.notifications.create("", {
    type: "basic",
    iconUrl: "icons/icon48.png",
    title: "Pomodoro Timer",
    message: message,
  });
}


document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("reset").addEventListener("click", resetTimer);