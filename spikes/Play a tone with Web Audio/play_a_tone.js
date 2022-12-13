console.log("Play a tone!");

const toneContext = new AudioContext();

// function tone_oscillator() {

  const oscillator = toneContext.createOscillator();

  oscillator.connect(toneContext.destination);

  oscillator.start();

  oscillator.stop(toneContext.currentTime + 2);

// }
