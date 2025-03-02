const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
let currentColorIndex = 0;

// Function to spin the color
function spinColor() {
    const body = document.getElementById('body');
    const spinner = document.getElementById('colorSpinner');
    
    // Remove the previous color
    body.classList.remove(...colors);
    
    // Apply the next color
    const newColor = colors[currentColorIndex];
    body.classList.add(newColor);
    
    // Add a spin animation to the icon
    spinner.classList.add('animate-spin');
    setTimeout(() => {
        spinner.classList.remove('animate-spin');
    }, 500); // Stop spinning after 0.5s

    // Move to the next color in the array
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

// Attach event listener to the spinner icon
document.getElementById('colorSpinner').addEventListener('click', spinColor);

// Counter and Task Tracking
let count = 23; // Initial count value

// Function to update count in the navbar
function incrementCounter() {
    count++;
    document.getElementById('navbarTaskCount').textContent = count;
    updateActivityLog(`Increased counter to ${count}`);
}

// Change background color function (no changes)
function changeColor(colorClass) {
    document.getElementById('body').className = `transition-all duration-500 ${colorClass}`;
    updateActivityLog(`Changed background color to ${colorClass}`);
}

// Function to update activity log
function updateActivityLog(message) {
    const log = document.getElementById('activityLog');
    const newLog = document.createElement('li');
    newLog.className = "text-sm text-gray-600";
    newLog.textContent = message;
    log.appendChild(newLog);
}

// Toggle color palette visibility
document.querySelector('.relative').addEventListener('click', function() {
    document.getElementById('colorPalette').classList.toggle('hidden');
});

// Format and display today's date
const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById('current-date').textContent = formattedDate;

// Redirect to blog page on card click
document.getElementById("clickable-card").addEventListener("click", function () {
    window.location.href = "blog.html";
});

// Task completion functionality
const completedButtons = document.querySelectorAll('button');
const taskAssigned = document.getElementById('taskAssigned');
const activityLog = document.getElementById('activityLog');

// Loop through all "Completed" buttons and add event listeners
completedButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Increment the task counter in the navbar
        incrementCounter(); // Call to increment the task count

        // Safely handle task count in the navbar (decrement taskAssigned count)
        if (taskAssigned) {
            const currentCount = parseInt(taskAssigned.textContent) || 0; // Default to 0 if NaN
            taskAssigned.textContent = currentCount - 1; // Decrement task count
        }

        // Disable the button and update its styles
        button.classList.add('bg-blue-500', 'text-white', 'cursor-not-allowed', 'opacity-50');
        button.classList.remove('hover:bg-blue-600');

        // Log the task completion activity
        const taskTitle = button.closest('.bg-white').querySelector('h3');
        if (taskTitle) {
            const logItem = document.createElement('li');
            logItem.textContent = `Task completed: "${taskTitle.textContent}"`;
            activityLog.insertBefore(logItem, activityLog.firstChild); // Add to the top of the activity log
        }

        // Show the success alert when the task is completed
        alert("Board updated successfully!");
    });
});

// Event listener for the "Back to Desk" button
document.getElementById("backButton").addEventListener("click", function () {
    window.location.href = "index.html";
});

// Event listener for the "Clear History" button
document.getElementById("clearHistory").addEventListener("click", function () {
    activityLog.innerHTML = ""; // Clears the activity log
    updateActivityLog("Activity log cleared.");
});
