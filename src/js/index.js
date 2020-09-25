import { bc } from "./broadcastChannel.js";
import SequencerState from "./SequencerState";
import Sequencer from "./Sequencer";
import ActionDispatcher from "./ActionDispatcher";
import UI from "./ui";
import CodeFlask from "codeflask";

// Global Variables

// let notes = ["c", "eb", "f", "g", "ab"];
// let octave = 4;
// const lowOctave = 4;
// const highOctave = 5;
// let note = 0;
// let step = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// let steps = 16;
// let playPosition = 0;
// let editPosition = 0;
// let tickRate = 200;
// let highRate = 200;
// let lowRate = 600;
// let playing = true;

//********************** */

//Creates Sequencer and state container
const sequencer1 = new Sequencer({});
const sequencer2 = new Sequencer({});
const sequencer3 = new Sequencer({});
const sequencer4 = new Sequencer({});
const sequencerState = new SequencerState(
  {
    1: sequencer1,
    2: sequencer2,
    3: sequencer3,
    4: sequencer4,
  },
  playNote
);

const actionDispatcher = new ActionDispatcher(sequencerState);

// Create UI object
const ui = new UI(sequencerState);
window.addEventListener("keydown", (e) => ui.handleKeydown(e));

// Sets up code display for config
const flaskElem = document.getElementById("codeflask");
const flask = new CodeFlask(flaskElem, { language: "js" });
flask.updateCode(ui.printConfig());
flask.onUpdate((code) => {
  ui.parseConfig(code);
});

//Creates timer loop
function timer() {
  console.log("starting timer");

  let timeToTick = Date.now();
  function nextTick() {
    const now = Date.now();
    if (timeToTick <= now && sequencerState.playing == true) {
      tick();
      timeToTick = now + sequencerState.currentSpeed;
    }
    requestAnimationFrame(nextTick);
  }
  nextTick();
}
timer();

function tick() {
  actionDispatcher.dispatch(
    sequencerState.pattern[sequencerState.playPosition]
  );
  sequencerState.playPosition == sequencerState.length - 1
    ? (sequencerState.playPosition = 0)
    : (sequencerState.playPosition += 1);

  ui.draw();
}

ui.draw();

//*****UTILS********

function playNote() {
  console.log(sequencerState.currentNote);
  bc.postMessage([sequencerState.currentNote, "4n"]);
}
