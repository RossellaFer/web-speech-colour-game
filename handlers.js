import { isValidColor, isDark, colors } from './colors.js';
import { headerEl, scoreEl } from './elements.js';

export let score = 0;

function logWords(results) {
  return results[results.length - 1][0].transcript;
}

function changeHeaderColor(color) {
  if (isDark(color)) {
    headerEl.classList.add('dark');
  } else {
    headerEl.classList.remove('dark');
  }
}

export function handleResult({ results }) {
  const words = logWords(results);
  // lowercase
  let color = words.toLowerCase();
  // check if it's a valid color
  color = color.replace(/\s/g, '');
  if (!isValidColor(color)) return;

  const colorSpan = document.querySelector(`.${color}`);
  scoreEl.classList.remove('new');
  if (!colorSpan.classList.contains('got')) {
    score += 1;
    scoreEl.textContent = score;
    scoreEl.classList.add('new');
  }
  colorSpan.classList.add('got');

  // change the background color
  document.body.style.backgroundColor = color;
  changeHeaderColor(color);
}

export function reset() {
  score = 0;
  scoreEl.textContent = 0;
  document.body.style.backgroundColor = '';
}

export function displayCurrentResult(score, highScore, element) {
  let result = '';
  if (score === 0) {
    result = "You didn't guess anything";
  } else if (score > 0 && score < 5) {
    result = `You scored ${score} point${score > 1 ? 's' : ''}.`;
  } else if (score > highScore) {
    result = `Great! scored ${score} points and you beat the record 🎉`;
  } else {
    result = `You scored ${score} points. Still ${highScore - score} point${
      score > 1 ? 's' : ''
    } to beat the record!`;
  }

  element.innerHTML = result;
}
