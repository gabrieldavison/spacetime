import { bc } from "./broadcastChannel.js";
import SequencerState from "./SequencerState";
import Sequencer from "./Sequencer";
import ActionDispatcher from "./ActionDispatcher";
import UI from "./ui";
import CodeFlask from "codeflask";
import SynthEngine from "./engine/sound";
import UIController from "./engine/ui";
import * as Tone from "tone";

document
  .getElementById("help-button")
  .addEventListener("click", toggleHelpModal);
document
  .getElementById("close-modal-button")
  .addEventListener("click", toggleHelpModal);
const helpModal = document.getElementById("help-modal");

function toggleHelpModal() {
  helpModal.classList.toggle("hidden");
}
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
//****************** Engine ********************* */

const startAudio = document.getElementById("start-sound");
startAudio.addEventListener("click", async () => {
  await Tone.start();
  console.log("audio is ready");
});

const synth = new SynthEngine(4);
const synthUI = new UIController(synth);

//Event listener for toggles
const synthSliders = document.querySelectorAll(".slider");
synthSliders.forEach((slider) => {
  slider.addEventListener("input", (e) => {
    synthUI.setValue(e.target.id, e.target.value);
  });
});

//Event listener for toggles
const synthToggles = document.querySelectorAll(".toggle");
synthToggles.forEach((toggle) => {
  toggle.addEventListener("change", (e) => {
    synthUI.toggleValue(e.target.id, e.target.value);
  });
});

//*****UTILS********

function playNote() {
  console.log(sequencerState.currentNote);
  bc.postMessage([sequencerState.currentNote, "4n"]);
  synth.triggerAttackRelease(sequencerState.currentNote, "4n");
}
