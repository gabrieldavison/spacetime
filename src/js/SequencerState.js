export default class SequencerState {
  constructor(sequencers) {
    // Object containing sequencers
    this.sequencers = sequencers;
    // Key for selected sequencer
    this._selectedSequencer = 1;

    this.playPosition = 0;
    this.editPosition = 0;

    this.currentNoteIndex = 0;
    this.currentOctave = this.activeSequencer.octaveLow;

    this.currentSpeed = this.activeSequencer.speedFast;
    this.playing = false;
  }

  get activeSequencer() {
    return this.sequencers[this.selectedSequencer];
  }

  get currentNote() {
    return (
      this.activeSequencer.notes[this.currentNoteIndex] + this.currentOctave
    );
  }

  get notes() {
    return this.activeSequencer.notes;
  }

  get octaveLow() {
    return this.activeSequencer.octaveLow;
  }
  get octaveHigh() {
    return this.activeSequencer.octaveHigh;
  }
  get pattern() {
    return this.activeSequencer.pattern;
  }
  get length() {
    return this.activeSequencer.length;
  }
  get speedFast() {
    return this.activeSequencer.speedFast;
  }
  get speedSlow() {
    return this.activeSequencer.speedSlow;
  }
  get selectedSequencer() {
    return this._selectedSequencer;
  }

  set selectedSequencer(val) {
    this.playPosition = 0;
    this._selectedSequencer = val;
  }

  resetPositions() {
    this.playPosition = 0;
    this.currentNoteIndex = 0;
    this.currentOctave = this.activeSequencer.octaveLow;
  }

  // printConfig() {
  //   return `
  //     {
  //       "notes": "${this.notes}",
  //       "octaveLow": ${this.octaveLow},
  //       "octaveHigh": ${this.octaveHigh},
  //       "speedSlow": ${this.speedSlow},
  //       "speedFast": ${this.speedFast}
  //     }
  //   `;
  // }

  // parseConfig(str) {
  //   console.log(validate(str));
  // }
}
