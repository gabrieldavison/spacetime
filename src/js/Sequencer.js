class Sequencer {
  constructor({
    pattern,
    length,
    notes,
    octaveLow,
    octaveHigh,
    metroSlow,
    metroFast,
  }) {
    this.pattern = pattern;
    this.length = length;
    this.notes = notes;
    this.octaveLow = octaveLow;
    this.octaveHigh = octaveHigh;
    this.metroSlow = metroSlow;
    this.metroFast = metroFast;
  }
}
