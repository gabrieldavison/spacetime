import { bc } from "./broadcastChannel.js";

// Global Variables

let notes = ["c", "eb", "f", "g", "ab"];
let octave = 4;
const lowOctave = 4;
const highOctave = 5;
let note = 0;
let step = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let steps = 16;
let playPosition = 0;
let editPosition = 0;
let tickRate = 200;
let highRate = 200;
let lowRate = 600;
let playing = true;

const actions = [
  inc,
  dec,
  bottom,
  top,
  noteRand,
  metroFast,
  metroSlow,
  positionRand,
];

const action = ["+", "-", "<", ">", "*", "M", "m", "#"];

window.addEventListener("keydown", (e) => handleKeydown(e));

function handleKeydown(e) {
  const usedKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"];
  if (usedKeys.includes(e.key)) {
    e.preventDefault();
  }

  switch (e.key) {
    case "ArrowLeft":
      editPosition === 0
        ? (editPosition = step.length - 1)
        : (editPosition -= 1);
      draw();
      break;
    case "ArrowRight":
      editPosition === step.length - 1
        ? (editPosition = 0)
        : (editPosition += 1);
      draw();
      break;
    case "ArrowUp":
      step[editPosition] === 7
        ? (step[editPosition] = 0)
        : (step[editPosition] += 1);
      draw();
      break;
    case "ArrowDown":
      step[editPosition] === 0
        ? (step[editPosition] = 7)
        : (step[editPosition] -= 1);
      draw();
      break;
    case " ":
      playing = !playing;
      draw();
      break;
  }
}

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//creates timer loop
function timer() {
  console.log("starting timer");

  let timeToTick = Date.now();
  function nextTick() {
    const now = Date.now();
    if (timeToTick <= now && playing == true) {
      tick();
      timeToTick = now + tickRate;
    }
    requestAnimationFrame(nextTick);
  }
  nextTick();
}
timer();

function tick() {
  playPosition == steps - 1 ? (playPosition = 0) : (playPosition += 1);

  actions[step[playPosition]]();
  playNote();
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const widthUnit = canvas.width / 10;
  const textSpacing = (canvas.width - widthUnit * 2) / 16;

  let x = widthUnit;
  const y = canvas.height / 2;

  for (let i = 0; i < 16; i++) {
    ctx.font = "40px serif";
    ctx.fillStyle = "black";
    if (i === editPosition) {
      ctx.fillStyle = "red";
    }
    ctx.fillText(action[step[i]], x, y);
    if (i === playPosition) {
      const rectangeWidth = ctx.measureText(step[i]).width;
      ctx.beginPath();
      ctx.rect(x, y - (rectangeWidth - 20), rectangeWidth, 3);
      ctx.stroke();
    }

    x += textSpacing;
  }
}

//****Actions******

//Increments note
function inc() {
  if (note + 1 <= notes.length - 1) {
    note += 1;
  } else if (note + 1 > notes.length - 1 && octave < highOctave) {
    octave += 1;
    note = 0;
  }
}

//Decrements note
function dec() {
  console.log("dec");
  if (note - 1 >= 0) {
    note -= 1;
  } else if (note - 1 < 0 && octave > lowOctave) {
    octave -= 1;
    note = notes.length - 1;
  }
}

//Skips to bottom note
function bottom() {
  note = 0;
  octave = lowOctave;
}

//Skips to top note
function top() {
  note = notes.length - 1;
  octave = highOctave;
}

//Skips to random note in current octave
function noteRand() {
  note = randomIntFromInterval(0, notes.length - 1);
}

function metroFast() {
  tickRate = highRate;
}

function metroSlow() {
  tickRate = lowRate;
}

function positionRand() {
  playPosition = randomIntFromInterval(0, step.length - 1);
}

//*****UTILS********

function playNote() {
  console.log(notes[note] + octave);
  bc.postMessage([notes[note] + octave, "4n"]);
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
