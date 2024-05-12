

let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
resetButton.addEventListener('click', reset);

function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
        startButton.textContent = 'Pause';
        stopButton.disabled = false;
    } else {
        clearInterval(timerInterval);
        running = false;
        startButton.textContent = 'Resume';
    }
}

function stop() {
    clearInterval(timerInterval);
    running = false;
    startButton.textContent = 'Start';
    stopButton.disabled = true;
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    display.textContent = '00:00:00:00';
    startButton.textContent = 'Start';
    stopButton.disabled = true;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    display.textContent = formattedTime;
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}
