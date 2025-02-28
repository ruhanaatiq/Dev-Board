


        let count = 0;
        function incrementCounter() {
            count++;
            document.getElementById('counter').textContent = count;
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