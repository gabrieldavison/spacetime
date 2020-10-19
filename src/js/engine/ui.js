export default class UIController {
  constructor(synth) {
    this.synth = synth;
  }

  setValue(id, value) {
    switch (id) {
      case "mod-index":
        this.synth.setModulationIndex(value);
        break;
      case "harmonicity":
        this.synth.setHarmonicity(scaleBetween(value, 0, 40, 0, 100));
        break;
      case "noise":
        this.synth.setNoise(scaleBetween(value, -60, 10, 0, 100));
        break;
      case "cutoff":
        this.synth.setCutoff(scaleBetween(value, 20, 8000, 0, 100));
        break;
      case "resonance":
        this.synth.setResonance(scaleBetween(value, 0, 50, 0, 100));
        break;
      case "attack":
        this.synth.setAttack(scaleBetween(value, 0, 2, 0, 100));
        break;
      case "release":
        this.synth.setRelease(scaleBetween(value, 0.1, 2, 0, 100));
        break;
      case "level":
        this.synth.setLevel(scaleBetween(value, -60, 10, 0, 100));
        break;
      case "delay":
        this.synth.setDelay(scaleBetween(value, 0, 1, 0, 100));
        break;
      case "delay-feedback":
        this.synth.setDelayFeedback(scaleBetween(value, 0, 1, 0, 100));
        break;
      case "delay-level":
        this.synth.setDelayLevel(scaleBetween(value, 0, 1, 0, 100));
        break;
    }
  }
  toggleValue(id, val) {
    switch (id) {
      case "bitcrusher":
        val == 0 ? this.synth.setBitcrusher(0) : this.synth.setBitcrusher(1);
        break;
      case "phaser":
        val == 0 ? this.synth.setPhaser(0) : this.synth.setPhaser(0.7);
        break;
      case "mute":
        val == 0
          ? this.synth.setMasterVolume(0)
          : this.synth.setMasterVolume(-60);
        break;
    }
  }
}

function scaleBetween(unscaledNum, minAllowed, maxAllowed, min, max) {
  return (
    ((maxAllowed - minAllowed) * (unscaledNum - min)) / (max - min) + minAllowed
  );
}
