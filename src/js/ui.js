import { validate } from "./utils/validate";
import { isEmpty } from "lodash";

export default class UI {
  constructor(sequencerState) {
    this.sequencerState = sequencerState;
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.modal = document.getElementById("configure-modal");
    this.modalVisible = false;
    this.errorDisplay = document.getElementById("error-display");
    this.action = ["+", "-", "<", ">", "*", "f", "s", "#", "_", "="];
    this.widthUnit = this.canvas.width / 10;
    this.heightUnit = this.canvas.height / 10;
    this.textSpacing = (this.canvas.width - this.widthUnit * 2) / 16;
    this.font = "40px serif";
    this.configErrors = undefined;
  }

  handleKeydown(e) {
    const usedKeys = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      " ",
      "1",
      "2",
      "3",
      "4",
      "c",
    ];
    if (usedKeys.includes(e.key) && this.modalVisible === false) {
      e.preventDefault();
      switch (e.key) {
        case "ArrowLeft":
          this.sequencerState.editPosition === 0
            ? (this.sequencerState.editPosition =
                this.sequencerState.pattern.length - 1)
            : (this.sequencerState.editPosition -= 1);
          this.draw();
          break;
        case "ArrowRight":
          this.sequencerState.editPosition ===
          this.sequencerState.pattern.length - 1
            ? (this.sequencerState.editPosition = 0)
            : (this.sequencerState.editPosition += 1);
          this.draw();
          break;
        case "ArrowUp":
          this.sequencerState.pattern[this.sequencerState.editPosition] ===
          this.action.length - 1
            ? (this.sequencerState.pattern[
                this.sequencerState.editPosition
              ] = 0)
            : (this.sequencerState.pattern[
                this.sequencerState.editPosition
              ] += 1);
          this.draw();
          break;
        case "ArrowDown":
          this.sequencerState.pattern[this.sequencerState.editPosition] === 0
            ? (this.sequencerState.pattern[this.sequencerState.editPosition] =
                this.action.length - 1)
            : (this.sequencerState.pattern[
                this.sequencerState.editPosition
              ] -= 1);
          this.draw();
          break;
        case " ":
          this.sequencerState.playing = !this.sequencerState.playing;
          this.draw();
          break;
        case "1":
          this.sequencerState.selectedSequencer = 1;
          this.draw();
          console.log("1");
          break;
        case "2":
          this.sequencerState.selectedSequencer = 2;
          this.draw();
          break;
        case "3":
          this.sequencerState.selectedSequencer = 3;
          this.draw();
          break;
        case "4":
          this.sequencerState.selectedSequencer = 4;
          this.draw();
          break;
      }
    }
    if (e.key === "Escape") {
      this.toggleModal();
    }
  }

  draw() {
    this.clear();
    this.drawSequencer();
    this.drawSequencerIndicator();
    this.drawCurrentNote();
    this.drawPlaying();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawSequencer() {
    let x = this.widthUnit;
    const y = this.canvas.height / 2;

    for (let i = 0; i < 16; i++) {
      this.ctx.font = this.font;
      this.ctx.fillStyle = "black";
      if (i === this.sequencerState.editPosition) {
        this.ctx.fillStyle = "red";
      }
      this.ctx.fillText(this.action[this.sequencerState.pattern[i]], x, y);
      if (i === this.sequencerState.playPosition) {
        const rectangleWidth = this.ctx.measureText(
          this.sequencerState.pattern[i]
        ).width;
        this.ctx.beginPath();
        this.ctx.rect(x, y - (rectangleWidth - 20), rectangleWidth, 3);
        this.ctx.stroke();
      }

      x += this.textSpacing;
    }
  }

  drawSequencerIndicator() {
    let x = this.widthUnit;
    let y = this.heightUnit * 2;
    for (let i = 1; i <= 4; i++) {
      this.ctx.fillStyle = "black";
      if (i === this.sequencerState.selectedSequencer) {
        this.ctx.fillStyle = "red";
      }
      this.ctx.fillText(i, x, y);
      x += this.textSpacing;
    }
  }

  drawCurrentNote() {
    let x = this.widthUnit;
    let y = this.heightUnit * 3;
    this.ctx.fillStyle = "black";
    this.ctx.fillText(this.sequencerState.currentNote, x, y);
  }

  drawPlaying() {
    let x = this.widthUnit;
    let y = this.heightUnit * 4;
    this.ctx.fillStyle = "black";
    this.sequencerState.playing
      ? this.ctx.fillText("►", x, y)
      : this.ctx.fillText("⏸", x, y);
  }

  toggleModal() {
    // Checks for errors before toggling modal off
    if (this.errorDisplay.childNodes.length === 0) {
      this.modal.classList.toggle("hidden");
      this.modal.classList.toggle("visible");
    }
    this.modalVisible = !this.modalVisible;
  }

  printConfig() {
    return `
      {
        "notes": "${this.sequencerState.notes}",
        "octaveLow": ${this.sequencerState.octaveLow},
        "octaveHigh": ${this.sequencerState.octaveHigh},
        "speedSlow": ${this.sequencerState.speedSlow},
        "speedFast": ${this.sequencerState.speedFast}
      }
    `;
  }

  parseConfig(str) {
    try {
      const dataJSON = JSON.parse(str);
      dataJSON.notes = dataJSON.notes.split(",");
      console.log(dataJSON);
      const errors = validate(dataJSON);
      this.displayErrors(errors);
      if (isEmpty(errors)) {
        this.sequencerState.loadConfig(dataJSON);
      }
    } catch (err) {
      console.log("parse error");
      this.displayErrors([err]);
    }
  }

  displayErrors(errors) {
    let errorHTML = "";
    if (!isEmpty(errors)) {
      errorHTML = errors.reduce((acc, error) => {
        return acc + `<li>${error}</li>`;
      }, "");
      this.errorDisplay.innerHTML = errorHTML;
    } else this.errorDisplay.innerHTML = "";
  }
}
