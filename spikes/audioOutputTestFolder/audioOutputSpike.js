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

let freshAudioVibe = new AudioOutput(new AudioContext());
const playButton = document.querySelector("#audio-output-test");
playButton.addEventListener('click', () => { freshAudioVibe.receiveInput() });


// module.exports = AudioOutput;