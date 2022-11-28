import { handleResult, handleHover } from './handlers.js';
import { colorsByLength, isDark } from './colors.js';

const colorsEl = document.querySelector('.colors');

function displayColors(colors) {
  const angle = 360 / colors.length;
  return colors
    .map(
      (color, index) =>
        `<div style="transform: rotate(${
          index * angle
        }deg)"><span class="color ${color} ${
          isDark(color) ? 'dark' : ''
        }" style="color: ${color};">${color}</span></div>`
    )
    .join('');
}

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function start() {
  // see if the browser supports this
  if (!('SpeechRecognition' in window)) {
    console.log('Your browser does not support speech recognition');
    return;
  }

  // make a new speech recognition
  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = handleResult;
  recognition.start();
}

start();
colorsEl.innerHTML = displayColors(colorsByLength);
document
  .querySelectorAll('.color')
  .forEach((el) => el.addEventListener('mouseover', handleHover));
