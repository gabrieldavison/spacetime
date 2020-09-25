import randomIntFromInterval from "./utils/randomIntFromInterval";

export default class ActionDispatcher {
  constructor(sequencerState) {
    this.sequencerState = sequencerState;
    this.actions = [
      this.inc,
      this.dec,
      this.bottom,
      this.top,
      this.noteRand,
      this.metroFast,
      this.metroSlow,
      this.positionRand,
    ];
  }
  dispatch(index) {
    switch (index) {
      case 0:
        this.inc();
        break;
      case 1:
        this.dec();
        break;
      case 2:
        this.bottom();
        break;
      case 3:
        this.top();
        break;
      case 4:
        this.noteRand();
        break;
      case 5:
        this.speedFast();
        break;
      case 6:
        this.speedSlow();
        break;
      case 7:
        this.positionRand();
        break;
      case 8:
        console.log("skip");
        break;
      case 9:
        this.playCurrent();
        break;
    }
  }

  //Increments note
  inc() {
    if (
      this.sequencerState.currentNoteIndex + 1 <=
      this.sequencerState.notes.length - 1
    ) {
      this.sequencerState.currentNoteIndex += 1;
    } else if (
      this.sequencerState.currentNoteIndex + 1 >
        this.sequencerState.notes.length - 1 &&
      this.sequencerState.currentOctave < this.sequencerState.octaveHigh
    ) {
      this.sequencerState.currentOctave += 1;
      this.sequencerState.currentNoteIndex = 0;
    }
    this.sequencerState.playNote();
  }

  //Decrements note
  dec() {
    if (this.sequencerState.currentNoteIndex - 1 >= 0) {
      this.sequencerState.currentNoteIndex -= 1;
    } else if (
      this.sequencerState.currentNoteIndex - 1 < 0 &&
      this.sequencerState.currentOctave > this.sequencerState.octaveLow
    ) {
      this.sequencerState.currentOctave -= 1;
      this.sequencerState.currentNoteIndex =
        this.sequencerState.notes.length - 1;
    }
    this.sequencerState.playNote();
  }

  //Skips to bottom note
  bottom() {
    this.sequencerState.currentNoteIndex = 0;
    this.sequencerState.currentOctave = this.sequencerState.octaveLow;
    this.sequencerState.playNote();
  }

  //Skips to top note
  top() {
    this.sequencerState.currentNoteIndex = this.sequencerState.notes.length - 1;
    this.sequencerState.currentOctave = this.sequencerState.octaveHigh;
    this.sequencerState.playNote();
  }

  //Skips to random note in current octave
  noteRand() {
    this.sequencerState.currentNoteIndex = randomIntFromInterval(
      0,
      this.sequencerState.notes.length - 1
    );
    this.sequencerState.playNote();
  }

  speedFast() {
    this.sequencerState.currentSpeed = this.sequencerState.speedFast;
    this.sequencerState.playNote();
  }

  speedSlow() {
    this.sequencerState.currentSpeed = this.sequencerState.speedSlow;
    this.sequencerState.playNote();
  }

  positionRand() {
    this.sequencerState.playPosition = randomIntFromInterval(
      0,
      this.sequencerState.pattern.length - 1
    );
    this.sequencerState.playNote();
  }

  playCurrent() {
    this.sequencerState.playNote();
  }
}
// export { inc, dec, bottom, top, noteRand, metroFast, metroSlow, positionRand };
