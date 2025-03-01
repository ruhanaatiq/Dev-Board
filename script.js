let count = 0;

function incrementCounter() {
    count++;
    const counter = document.getElementById('counter');
    if (counter) {
        counter.textContent = count;
    }
    updateActivityLog(`Increased counter to ${count}`);
}

function changeColor(colorClass) {
    const body = document.getElementById('body');
    if (body) {
        body.className = `transition-all duration-500 ${colorClass}`;
        updateActivityLog(`Changed background color to ${colorClass}`);
    }
}
document.getElementById('backButton').addEventListener('click', function() {
    window.location.href = 'index.html';
});
function updateActivityLog(message) {
    const log = document.getElementById('activityLog');
    if (!log) {
        console.error("⚠️ 'activityLog' element not found!");
        return;
    }
    
    const newLog = document.createElement('li');
    newLog.className = "text-sm text-gray-600";
    newLog.textContent = message;
    log.appendChild(newLog);
}

document.addEventListener('DOMContentLoaded', () => {
    const completedButtons = document.querySelectorAll('button');
    const taskAssigned = document.getElementById('taskAssigned');
    const activityLog = document.getElementById('activityLog');
    const clearHistoryButton = document.getElementById("clearHistoryButton");
    
    // Handle task completion
    completedButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update task count
            if (taskAssigned) {
                const currentCount = parseInt(taskAssigned.textContent) || 0;
                taskAssigned.textContent = Math.max(0, currentCount - 1); // Prevent negative values
            }

            // Mark button as completed
            button.classList.add('bg-blue-500', 'text-white', 'cursor-not-allowed', 'opacity-50');
            button.classList.remove('hover:bg-blue-600');

            // Log the activity
            const taskContainer = button.closest('.bg-white');
            if (taskContainer) {
                const taskTitle = taskContainer.querySelector('h3');
                if (taskTitle) {
                    const logItem = document.createElement('li');
                    logItem.textContent = `Task completed: "${taskTitle.textContent}"`;
                    activityLog.insertBefore(logItem, activityLog.firstChild);
                } else {
                    console.error("⚠️ Task title (h3) not found inside the task container.");
                }
            } else {
                console.error("⚠️ Button is not inside a '.bg-white' container.");
            }

            // Show the popup alert when the task is completed
            alert("Board updated successfully!");
        });
    });

    // "Clear History" Button functionality
    if (clearHistoryButton) {
        clearHistoryButton.addEventListener("click", function () {
            if (activityLog) {
                activityLog.innerHTML = ""; // Clears all content inside the activity log
                alert("🗑️ Activity log cleared successfully!");
            }
        });
    }

    // Ensure colorPalette toggle works
    const colorPaletteButton = document.querySelector('.relative');
    const colorPalette = document.getElementById('colorPalette');
    if (colorPaletteButton && colorPalette) {
        colorPaletteButton.addEventListener('click', function () {
            colorPalette.classList.toggle('hidden');
        });
    }

    // Format and display the current date
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = today.toLocaleDateString('en-US', options);
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = formattedDate;
    }

    // Handle card click navigation
    const clickableCard = document.getElementById("clickable-card");
    if (clickableCard) {
        clickableCard.addEventListener("click", function () {
            window.location.href = "blog.html"; // Change this to your desired HTML file
        });
    }
});

