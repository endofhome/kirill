class AudioOutput {
    constructor(audioContext) {
      this.audioContext = audioContext;
    }

    receiveInput() {
      const oscillator = this.audioContext.createOscillator();
      oscillator.connect(this.audioContext.destination);
      oscillator.start();
    }
}

module.exports = AudioOutput;