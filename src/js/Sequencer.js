export default class Sequencer {
  constructor({
    pattern = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    length = 16,
    notes = ["c", "d", "e", "f", "g", "a", "b"],
    octaveLow = 4,
    octaveHigh = 5,
    speedSlow = 600,
    speedFast = 200,
  }) {
    this.pattern = pattern;
    this.length = length;
    this.notes = notes;
    this.octaveLow = octaveLow;
    this.octaveHigh = octaveHigh;
    this.speedSlow = speedSlow;
    this.speedFast = speedFast;
  }
}
