document.addEventListener('DOMContentLoaded', () => {
    const counterDisplay = document.getElementById('counter-number');
    const targetDisplay = document.getElementById('target-value');
    const addBtn = document.getElementById('add-btn');
    const resetBtn = document.getElementById('reset-btn');
    const notification = document.getElementById('notification-area');

    let count = 0;
    const target = parseInt(targetDisplay.textContent);

    // Function to update the display and check target
    const updateDisplay = () => {
        counterDisplay.textContent = count;
        
        // Check if target is reached
        if (count >= target) {
            notification.classList.remove('hidden');
        } else {
            notification.classList.add('hidden');
        }

        // Add pulse animation
        counterDisplay.classList.remove('pulse-animation');
        void counterDisplay.offsetWidth; // Trigger reflow
        counterDisplay.classList.add('pulse-animation');
    };

    // Event listener for adding count
    addBtn.addEventListener('click', () => {
        count++;
        updateDisplay();
        
        // Vibration effect (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    });

    // Event listener for resetting count
    resetBtn.addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin mereset hitungan?')) {
            count = 0;
            updateDisplay();
        }
    });

    // Keyboard shortcut (Spacebar to add)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            addBtn.click();
        }
    });
});
