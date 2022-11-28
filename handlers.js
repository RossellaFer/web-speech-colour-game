import { isValidColor, isDark } from './colors.js';

const headerEl = document.querySelector('h1');
const hoveredTextEl = document.querySelector('.hovered_color');

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

export function handleHover(e) {
  hoveredTextEl.textContent = e.target.textContent;
}

export function handleResult({ results }) {
  const words = logWords(results);
  // lowercase
  let color = words.toLowerCase();
  // check if it's a valid color
  color = color.replace(/\s/g, '');
  if (!isValidColor(color)) return;

  const colorSpan = document.querySelector(`.${color}`);
  colorSpan.classList.add('got');

  // change the background color
  document.querySelector('.container').style.backgroundColor = color;
  changeHeaderColor(color);
}
