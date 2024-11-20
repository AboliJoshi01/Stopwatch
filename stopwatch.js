let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        startPause.textContent = 'Start';
        reset.disabled = false;
        lap.disabled = true;
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 100);
        startPause.textContent = 'Pause';
        reset.disabled = false;
        lap.disabled = false;
    }
    isRunning = !isRunning;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / 60000) % 60);
    
    display.textContent = `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(unit) {
    return unit.toString().padStart(2, '0');
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;
    display.textContent = '00:00:00';
    startPause.textContent = 'Start';
    reset.disabled = true;
    lap.disabled = true;
    laps.innerHTML = '';
    lapCounter = 0;
}

function recordLap() {
    lapCounter++;
    const lapTime = document.createElement('li');
    lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
    laps.appendChild(lapTime);
}

startPause.addEventListener('click', startPauseTimer);
reset.addEventListener('click', resetTimer);
lap.addEventListener('click', recordLap);
