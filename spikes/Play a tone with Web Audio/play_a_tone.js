const toneContext = new AudioContext();

function tone_oscillator() {
  const oscillator = toneContext.createOscillator();
  oscillator.connect(toneContext.destination);
  oscillator.start();
  oscillator.stop(toneContext.currentTime + 2);
}

const playButton = document.querySelector("#play-a-tone");
playButton.addEventListener('click', tone_oscillator);