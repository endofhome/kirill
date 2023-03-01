function AudioOutput() {
    const audioOutputElements = document.querySelectorAll(`[data-component="audio-output"]`);

    audioOutputElements.forEach(audioOutput => {
        const power = new Power(new AudioContext());
        const powerOnButton = audioOutput.querySelector(".power-on-button");
        powerOnButton.addEventListener('click', () => {
            power.on();
            powerOnButton.setAttribute("disabled", "true");
        });
    });
}

class Power {
    constructor(audioContext) {
        this.audioContext = audioContext;
    }

    on() {
        const oscillator = this.audioContext.createOscillator();
        oscillator.connect(this.audioContext.destination);
        oscillator.start();
    }
}

module.exports = AudioOutput;