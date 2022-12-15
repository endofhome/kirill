console.log("Hello, Tom!");

// create a button element so the sound only occurs when button is pressed
const buttonEl = document.querySelector('button');

// Instantiate an audio context
const spikeContext = new AudioContext();

// create an oscillator function
function spike_oscillator() {
  
  // create an oscillator node
  let oscillator = spikeContext.createOscillator();
  
  // set oscillator type - can be sine, square, sawtooth, triangle
  oscillator.type = 'sine'

  // set the frequency - 220 Hz is middle A
  oscillator.frequency.value = 220;

  // You can up or down the frequency exponentially
  oscillator.frequency.exponentialRampToValueAtTime(50, spikeContext.currentTime + 1);

  // create a gain node
  let gain = spikeContext.createGain();

  // exponentially change the gain volume to zero
  gain.gain.exponentialRampToValueAtTime(0.01, spikeContext.currentTime + 0.7);

  // start the oscillator
  oscillator.start();

  // set oscillator duration

  oscillator.stop(spikeContext.currentTime + 1);

// connect our graph/input node to output node - default destination of internal speakers
oscillator.connect(gain).connect(spikeContext.destination);

}

// create a button event for our button element
buttonEl.addEventListener('click', function() {
  
    // state is suspended by default, resumes on button click only
    if (spikeContext.state === 'suspended') { 
        spikeContext.resume();
      }
    // call our spike_audio function after button is clicked
    spike_oscillator();
})