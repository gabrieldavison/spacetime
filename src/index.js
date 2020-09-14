// Global Variables

let notes = ["c", "d", "e", "f", "g", "a", "b"]
let octave = 4
let note = 0
let step = [1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1]
let steps = 16
let playPosition = 0
let editPosition = 0
let tickRate = 500
let playing = true

const actions = [
  inc,
  dec,
  bottom,
  top,
  noteRand,
  metroFast,
  metroSlow,
  positionRand
]

const action = [
  '+',
  '-',
  '<',
  '>',
  '*',
  'M',
  'm',
  '#'
]


const canvas = document.getElementById('canvas');

const ctx = canvas.getContext("2d")

//creates timer loop
function timer() {
  console.log("starting timer");

  let timeToTick = Date.now();
  function nextTick() {

    const now = Date.now();
    if (timeToTick <= now && playing == true) {
      tick()
      timeToTick = now + tickRate;
    }
    requestAnimationFrame(nextTick);
  }
  nextTick();
}
timer();


function tick() {
  console.log(playPosition)
  playPosition == steps -1 ? playPosition = 0: playPosition +=1
  action[playPosition]
  playNote()
  draw()
}



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const widthUnit = canvas.width / 10;
  const textSpacing = (canvas.width - (widthUnit * 2)) / 16

  let x = widthUnit
  const y = canvas.height / 2;


  for(let i = 0; i < 16; i++) {
    ctx.font = '40px serif';
    ctx.fillStyle = "black"
    if(i === editPosition) {
      ctx.fillStyle = "red"
    }
    ctx.fillText(action[step[i]], x, y);
    if( i === playPosition) {

      const rectangeWidth = ctx.measureText(step[i]).width
      console.log(rectangeWidth)
      ctx.beginPath()
      ctx.rect(x, y - (rectangeWidth-20), rectangeWidth, 3)
      ctx.stroke()
    }

    x += textSpacing
  }

}



//****Actions******

//Increments note
function inc() {
  if(note + 1 <= notes.length - 1) {
    note += 1
  } else if(note + 1 > notes.length - 1) {
    octave += 1
    note = 0
  }
}

//Decrements note
function dec() {
  if(note - 1 >= 0) {
    note -= 1
  } else if(note - 1 < 0) {
    octave -= 1
    note = 0
  }
}

//Skips to bottom note
function bottom() {
  note = 0
  octave = 2
}

//Skips to top note
function top() {
  note = notes.length -1
  octave = 5
}

//Skips to random note in current octave
function noteRand() {
  note=randomIntFromInterval(0, notes.length -1)
}

function metroFast() {
  time *=0.5
}

function metroSlow() {
  time *=2
}

function positionRand() {
  playPosition = randomIntFromInterval(0, steps.length -1)
}

//*****UTILS********

function playNote() {
  console.log(notes[note] + octave)
}

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}
