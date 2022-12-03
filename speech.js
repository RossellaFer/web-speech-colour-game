import {
  handleResult,
  score,
  reset,
  displayCurrentResult,
} from './handlers.js';
import { colorsByLength, isDark } from './colors.js';
import {
  colorsEl,
  errorEl,
  timerEl,
  instructionsEl,
  highScoreEl,
} from './elements.js';

const NUMBEROFSECONDS = 30;
const highestScore = localStorage.getItem('highScore');
let recognition;
let timeoutForTimer;

function displayColors(colors) {
  return colors
    .map(
      (color, index) =>
        `<span class="color ${color} ${
          isDark(color) ? 'dark' : ''
        }" style="background-color: ${color};">${color}</span>`
    )
    .join('');
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function checkIfBrowserCompatible() {
  if (window.SpeechRecognition === undefined) {
    errorEl.textContent =
      'Sorry, your browser does not support speech recognition. Please play the game on Google Chrome.';
    errorEl.classList.add('active');
    colorsEl.style.display = 'none';
    instructionsEl.style.display = 'none';
    console.log('Your browser does not support speech recognition');
  }
}

function start() {
  // make a new speech recognition
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
  return recognition;
}

function handleStartClick(e) {
  recognition = start();
  if (recognition) {
    document.body.style = '';
    colorsEl
      .querySelectorAll('.color')
      .forEach((el) => el.classList.remove('got'));
    startTimer(NUMBEROFSECONDS, e.currentTarget);
  }
}

function stop() {
  recognition.stop();
  timerEl.addEventListener('click', handleStartClick, { once: true });
  setHighScore(score);
  displayCurrentResult(score, highestScore, highScoreEl);
  reset();
}

function timer(timeInMS, intervalInMs, element) {
  const seconds = parseInt(timeInMS / 1000);
  const milliSeconds = parseInt(timeInMS % 1000)
    .toString()
    .slice(0, 1);
  const span = document.querySelector('#timer');
  span.textContent = `${seconds}.${milliSeconds}`;
  timeInMS -= intervalInMs;
  if (timeInMS < 0) {
    clearInterval(timeoutForTimer);
    stop();
    span.textContent = `Retry`;
    return;
  }
  return timeInMS;
}

function startTimer(duration) {
  const intervalInMs = 100;
  let timeInMS = duration * 1000;
  // saving the setInterval function in a variable so we can clear the interval
  timeoutForTimer = setInterval(() => {
    timeInMS = timer(timeInMS, intervalInMs);
  }, intervalInMs);
}

function setHighScore(score) {
  if (!highestScore) {
    localStorage.setItem('highScore', score);
  }
  if (score > highestScore) {
    localStorage.setItem('highScore', score);
  }
}

checkIfBrowserCompatible();
timerEl.addEventListener('click', handleStartClick, { once: true });
colorsEl.innerHTML = displayColors(colorsByLength);
highScoreEl.innerHTML = highestScore
  ? `The highest score to beat is <strong>${highestScore}</strong>`
  : `There is no highest score yet. Play to set a new record.`;

// remove strikes from the color cards when resetting
