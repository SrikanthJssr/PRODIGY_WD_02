let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

// Format time
function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  let formattedHH = hh.toString().padStart(2, "0");
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}.${formattedMS}`;
}

// Start / Pause toggle
function startPause() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(function printTime() {
      elapsedTime = Date.now() - startTime;
      display.innerHTML = timeToString(elapsedTime);
    }, 10);
    startPauseBtn.innerHTML = "Pause";
  } else {
    running = false;
    clearInterval(timerInterval);
    startPauseBtn.innerHTML = "Start";
  }
}

// Reset stopwatch
function reset() {
  running = false;
  clearInterval(timerInterval);
  display.innerHTML = "00:00:00.00";
  elapsedTime = 0;
  startPauseBtn.innerHTML = "Start";
  lapsContainer.innerHTML = "";
  lapCount = 0;
}

// Record lap time
function recordLap() {
  if (running) {
    lapCount++;
    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${lapCount}</span> ${timeToString(elapsedTime)}`;
    lapsContainer.appendChild(li);
  }
}

// Event Listeners
startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);
