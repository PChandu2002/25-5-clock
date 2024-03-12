let timer;
let sessionLength = 25;
let breakLength = 5;
let isSession = true;
let isRunning = false;
let timeLeft = sessionLength * 60;

const timerLabel = document.getElementById('timer-label');
const timeLeftDisplay = document.getElementById('time-left');
const startStopBtn = document.getElementById('start_stop');
const resetBtn = document.getElementById('reset');
const sessionLengthInput = document.getElementById('session-length');
const breakLengthInput = document.getElementById('break-length');

function formatTimeLeft(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  } else {
    timer = setInterval(() => {
      timeLeft--;
      if (timeLeft < 0) {
        if (isSession) {
          isSession = false;
          timeLeft = breakLength * 60;
          timerLabel.textContent = 'Break';
        } else {
          isSession = true;
          timeLeft = sessionLength * 60;
          timerLabel.textContent = 'Session';
        }
      }
      timeLeftDisplay.textContent = formatTimeLeft(timeLeft);
    }, 1000);
    isRunning = true;
  }
}

function resetTimer() {
  clearInterval(timer);
  sessionLength = parseInt(sessionLengthInput.value);
  breakLength = parseInt(breakLengthInput.value);
  timeLeft = sessionLength * 60;
  isSession = true;
  isRunning = false;
  timerLabel.textContent = 'Session';
  timeLeftDisplay.textContent = formatTimeLeft(timeLeft);
}

startStopBtn.addEventListener('click', toggleTimer);
resetBtn.addEventListener('click', resetTimer);
