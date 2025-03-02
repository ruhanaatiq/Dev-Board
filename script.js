const colors = ['bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500', 'bg-pink-500'];
let currentColorIndex = 0;

// Function to spin the color
function spinColor() {
    const body = document.getElementById('body');
    const spinner = document.getElementById('colorSpinner');
    
    body.classList.remove(...colors);
    
    const newColor = colors[currentColorIndex];
    body.classList.add(newColor);
    
    spinner.classList.add('animate-spin');
    setTimeout(() => {
        spinner.classList.remove('animate-spin');
    }, 500); 
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

document.getElementById('colorSpinner').addEventListener('click', spinColor);

let count = 23; // Initial count value

function incrementCounter() {
    count++;
    document.getElementById('navbarTaskCount').textContent = count;
    updateActivityLog(`Increased counter to ${count}`);
}

function changeColor(colorClass) {
    document.getElementById('body').className = `transition-all duration-500 ${colorClass}`;
    updateActivityLog(`Changed background color to ${colorClass}`);
}

function updateActivityLog(message) {
    const log = document.getElementById('activityLog');
    const newLog = document.createElement('li');
    newLog.className = "text-sm text-gray-600";
    newLog.textContent = message;
    log.appendChild(newLog);
}

document.querySelector('.relative').addEventListener('click', function() {
    document.getElementById('colorPalette').classList.toggle('hidden');
});

const today = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
const formattedDate = today.toLocaleDateString('en-US', options);
document.getElementById('current-date').textContent = formattedDate;

document.getElementById("clickable-card").addEventListener("click", function () {
    window.location.href = "blog.html";
});

const completedButtons = document.querySelectorAll('button');
const taskAssigned = document.getElementById('taskAssigned');
const activityLog = document.getElementById('activityLog');

completedButtons.forEach(button => {
    button.addEventListener('click', () => {
        incrementCounter(); 

        
        if (taskAssigned) {
            const currentCount = parseInt(taskAssigned.textContent) || 0; 
            taskAssigned.textContent = currentCount - 1; 
        }

        button.classList.add('bg-blue-500', 'text-white', 'cursor-not-allowed', 'opacity-50');
        button.classList.remove('hover:bg-blue-600');

        // Log the task completion   
        const taskTitle = button.closest('.bg-white').querySelector('h3');
        if (taskTitle) {
            const logItem = document.createElement('li');
            logItem.textContent = `Task completed: "${taskTitle.textContent}"`;
            activityLog.insertBefore(logItem, activityLog.firstChild); 
        }

        alert("Board updated successfully!");
    });
});

document.getElementById("backButton").addEventListener("click", function () {
    window.location.href = "index.html";
});

document.getElementById("clearHistory").addEventListener("click", function () {
    activityLog.innerHTML = ""; 
    updateActivityLog("Activity log cleared.");
});
