export default class SequencerState {
  constructor(sequencers, playNote) {
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
    this.playNote = playNote;
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
  set notes(val) {
    this.activeSequencer.notes = val;
  }

  get octaveLow() {
    return this.activeSequencer.octaveLow;
  }
  set octaveLow(val) {
    this.activeSequencer.octaveLow = val;
  }

  get octaveHigh() {
    return this.activeSequencer.octaveHigh;
  }
  set octaveHigh(val) {
    this.activeSequencer.octaveHigh = val;
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
  set speedFast(val) {
    this.activeSequencer.speedFast = val;
  }

  get speedSlow() {
    return this.activeSequencer.speedSlow;
  }
  set speedSlow(val) {
    this.activeSequencer.speedSlow = val;
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

  loadConfig(config) {
    console.log(config);
    this.notes = config.notes;
    this.octaveHigh = config.octaveHigh;
    this.octaveLow = config.octaveLow;
    this.speedFast = config.speedFast;
    this.speedSlow = config.speedSlow;
    this.currentNoteIndex = 0;
  }
}
